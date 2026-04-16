const Progress = {
  data: JSON.parse(localStorage.getItem('deutsch-progress') || '{"completed":{},"currentLevel":"A2"}'),
  
  save() {
    localStorage.setItem('deutsch-progress', JSON.stringify(this.data));
  },
  
  markComplete(section, level, lessonId) {
    const key = `${section}-${level}`;
    if (!this.data.completed[key]) this.data.completed[key] = [];
    if (!this.data.completed[key].includes(lessonId)) {
      this.data.completed[key].push(lessonId);
      this.save();
    }
  },
  
  getSectionProgress(section, level) {
    const key = `${section}-${level}`;
    return { completed: this.data.completed[key] || [] };
  },
  
  getStats() {
    let totalCompleted = 0;
    let totalLessons = 0;
    Object.keys(LESSON_DATA).forEach(section => {
      LEVELS.forEach(level => {
        const lessons = LESSON_DATA[section][level] || [];
        totalLessons += lessons.length;
        const key = `${section}-${level}`;
        totalCompleted += (this.data.completed[key] || []).length;
      });
    });
    return {
      totalCompleted,
      totalLessons,
      totalPercent: totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0,
      currentLevel: this.data.currentLevel
    };
  },
  
  setLevel(level) {
    this.data.currentLevel = level;
    this.save();
  }
};

let currentFlashcardIndex = 0;
let currentFlashcards = [];

function renderApp() {
  const app = document.getElementById('app');
  app.innerHTML = Components.header() + Components.nav();
  
  const main = document.createElement('main');
  app.appendChild(main);
  
  setupNavListeners();
}

function setupNavListeners() {
  document.querySelectorAll('nav button[data-section]').forEach(btn => {
    btn.addEventListener('click', () => {
      const section = btn.dataset.section;
      if (section === 'progress') {
        router.navigate('/progress');
      } else {
        router.navigate(`/section/${section}`);
      }
    });
  });
}

function renderHome() {
  const main = document.querySelector('main');
  main.innerHTML = `
    ${Components.levelSelector(Progress.data.currentLevel)}
    <div class="card">
      <h2>Welcome to Deutsch Lernen! 🇩🇪</h2>
      <p>Choose a section to start learning. Track your progress as you go from A2 to B2!</p>
    </div>
    ${Components.stats()}
    ${Components.homeGrid()}
  `;
  setupLevelListeners();
  setupNavigationListeners();
}

function setupLevelListeners() {
  document.querySelectorAll('.level-selector button').forEach(btn => {
    btn.addEventListener('click', () => {
      const level = btn.dataset.level;
      Progress.setLevel(level);
      document.querySelectorAll('.level-selector button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

function setupNavigationListeners() {
  document.querySelectorAll('[data-navigate]').forEach(el => {
    el.addEventListener('click', () => {
      router.navigate(el.dataset.navigate);
    });
  });
}

function renderSection(sectionId) {
  const level = Progress.data.currentLevel;
  const lessons = LESSON_DATA[sectionId]?.[level] || [];
  
  const main = document.querySelector('main');
  main.innerHTML = `
    ${Components.backBtn('Home')}
    ${Components.lessonList(sectionId, level, lessons)}
  `;
  
  setupLevelListenersForSection(sectionId);
  setupLessonListeners(sectionId, level);
}

function setupLevelListenersForSection(sectionId) {
  document.querySelectorAll('.level-selector button').forEach(btn => {
    btn.addEventListener('click', () => {
      const level = btn.dataset.level;
      Progress.setLevel(level);
      renderSection(sectionId);
    });
  });
}

function setupLessonListeners(sectionId, level) {
  document.querySelectorAll('.lesson-list li').forEach(li => {
    li.addEventListener('click', () => {
      const lessonId = li.dataset.lesson;
      router.navigate(`/lesson/${sectionId}/${level}/${lessonId}`);
    });
  });
}

function renderLesson(sectionId, level, lessonId) {
  const lesson = LESSON_DATA[sectionId]?.[level]?.find(l => l.id === lessonId);
  if (!lesson) {
    router.navigate(`/section/${sectionId}`);
    return;
  }
  
  const main = document.querySelector('main');
  
  if (sectionId === 'vocabulary') {
    renderVocabularyLesson(main, lesson);
  } else if (sectionId === 'pronunciation') {
    renderPronunciationLesson(main, lesson);
  } else if (sectionId === 'everyday') {
    renderEverydayLesson(main, lesson);
  } else {
    renderGrammarLesson(main, lesson);
  }
  
  setupExerciseListeners(sectionId, level, lessonId, lesson);
}

function renderGrammarLesson(main, lesson) {
  main.innerHTML = `
    ${Components.backBtn()}
    <div class="card">
      <h2>${lesson.title}</h2>
      <div>${lesson.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>')}</div>
      ${lesson.examples ? Components.exampleBox(lesson.examples) : ''}
      ${lesson.exercise ? `
        <h3>Exercise</h3>
        <div class="exercise-container" data-type="${lesson.exercise.type}">
          <p>${lesson.exercise.question}</p>
          <input type="text" class="exercise-input" placeholder="Your answer..." data-answer="${lesson.exercise.answer}">
          <button class="btn">Check Answer</button>
          <div class="exercise-feedback"></div>
        </div>
      ` : ''}
      <button class="btn btn-secondary mark-complete">✓ Mark as Complete</button>
    </div>
  `;
}

function renderVocabularyLesson(main, lesson) {
  currentFlashcards = lesson.words;
  currentFlashcardIndex = 0;
  
  main.innerHTML = `
    ${Components.backBtn()}
    <div class="card">
      <h2>${lesson.title}</h2>
      <p>Click the card to flip it. Use buttons to navigate.</p>
      <div id="flashcard-container">${Components.flashcard(lesson.words[0])}</div>
      <div style="text-align:center;margin:1rem 0;">
        <button class="btn btn-outline" id="prev-card">← Previous</button>
        <span id="flashcard-counter">1/${lesson.words.length}</span>
        <button class="btn btn-outline" id="next-card">Next →</button>
      </div>
      <button class="btn btn-secondary mark-complete">✓ Mark as Complete</button>
    </div>
  `;
  
  setupFlashcardListeners();
}

function setupFlashcardListeners() {
  document.getElementById('prev-card')?.addEventListener('click', () => {
    if (currentFlashcardIndex > 0) {
      currentFlashcardIndex--;
      updateFlashcard();
    }
  });
  
  document.getElementById('next-card')?.addEventListener('click', () => {
    if (currentFlashcardIndex < currentFlashcards.length - 1) {
      currentFlashcardIndex++;
      updateFlashcard();
    }
  });
}

function updateFlashcard() {
  const container = document.getElementById('flashcard-container');
  const counter = document.getElementById('flashcard-counter');
  if (container && currentFlashcards[currentFlashcardIndex]) {
    container.innerHTML = Components.flashcard(currentFlashcards[currentFlashcardIndex]);
    counter.textContent = `${currentFlashcardIndex + 1}/${currentFlashcards.length}`;
  }
}

function renderPronunciationLesson(main, lesson) {
  main.innerHTML = `
    ${Components.backBtn()}
    <div class="card">
      <h2>${lesson.title}</h2>
      ${Components.pronunciationGuide(lesson.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n\n/g, '<br><br>'))}
      ${lesson.examples ? Components.exampleBox(lesson.examples) : ''}
      <button class="btn btn-secondary mark-complete">✓ Mark as Complete</button>
    </div>
  `;
}

function renderEverydayLesson(main, lesson) {
  main.innerHTML = `
    ${Components.backBtn()}
    <div class="card">
      <h2>${lesson.title}</h2>
      ${Components.scenarioBox(lesson.scenario)}
      ${Components.dialogue(lesson.dialogue)}
      <h3>Key Vocabulary</h3>
      <ul>
        ${lesson.vocabulary.map(v => `<li>${v}</li>`).join('')}
      </ul>
      <button class="btn btn-secondary mark-complete">✓ Mark as Complete</button>
    </div>
  `;
}

function setupExerciseListeners(sectionId, level, lessonId, lesson) {
  document.querySelector('.mark-complete')?.addEventListener('click', () => {
    Progress.markComplete(sectionId, level, lessonId);
    const btn = document.querySelector('.mark-complete');
    btn.textContent = '✓ Completed!';
    btn.disabled = true;
    router.navigate(`/section/${sectionId}`);
  });
  
  const exerciseContainer = document.querySelector('.exercise-container');
  if (exerciseContainer && lesson.exercise) {
    const input = exerciseContainer.querySelector('.exercise-input');
    const feedbackEl = exerciseContainer.querySelector('.exercise-feedback');
    
    exerciseContainer.querySelector('.btn').addEventListener('click', () => {
      const userAnswer = input.value.trim().toLowerCase();
      const correctAnswer = lesson.exercise.answer.toLowerCase();
      
      if (userAnswer === correctAnswer) {
        feedbackEl.innerHTML = Components.feedback(true, 'Correct! Well done! 🎉');
        input.style.borderColor = 'var(--success)';
      } else {
        feedbackEl.innerHTML = Components.feedback(false, `Not quite. The correct answer is: "${lesson.exercise.answer}"`);
        input.style.borderColor = '#e53935';
      }
    });
  }
}

function renderProgress() {
  const stats = Progress.getStats();
  
  const main = document.querySelector('main');
  main.innerHTML = `
    ${Components.backBtn('Home')}
    <div class="card">
      <h2>Your Progress 📊</h2>
      ${Components.stats()}
    </div>
    <div class="card">
      <h3>Progress by Level</h3>
      ${LEVELS.map(level => {
        let completed = 0;
        let total = 0;
        SECTIONS.forEach(section => {
          const lessons = LESSON_DATA[section.id]?.[level] || [];
          total += lessons.length;
          const progress = Progress.getSectionProgress(section.id, level);
          completed += progress.completed.length;
        });
        const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
        return `
          <div style="margin:1rem 0;">
            <strong>${level}:</strong> ${completed}/${total} lessons (${percent}%)
            ${Components.progressBar(completed, total)}
          </div>
        `;
      }).join('')}
    </div>
    <div class="card">
      <h3>Progress by Section</h3>
      ${SECTIONS.map(section => {
        let completed = 0;
        let total = 0;
        LEVELS.forEach(level => {
          const lessons = LESSON_DATA[section.id]?.[level] || [];
          total += lessons.length;
          const progress = Progress.getSectionProgress(section.id, level);
          completed += progress.completed.length;
        });
        const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
        return `
          <div style="margin:1rem 0;">
            <strong>${section.icon} ${section.name}:</strong> ${completed}/${total} lessons (${percent}%)
            ${Components.progressBar(completed, total)}
          </div>
        `;
      }).join('')}
    </div>
  `;
}

router.addRoute('/', renderHome);
router.addRoute('/section/:section', (params) => renderSection(params.get('section')));
router.addRoute('/lesson/:section/:level/:lessonId', (params) => {
  renderLesson(params.get('section'), params.get('level'), params.get('lessonId'));
});
router.addRoute('/progress', renderProgress);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(() => console.log('Service Worker registered'))
    .catch(err => console.error('SW registration failed:', err));
}

document.addEventListener('DOMContentLoaded', () => {
  renderApp();
  router.handleRoute();
});