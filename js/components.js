const Components = {
  header() {
    return `
      <header>
        <h1>🦄 Deutsch Lernen</h1>
        <p>Your journey from A2 to B2 starts here!</p>
      </header>
    `;
  },

  nav(activeSection = '') {
    return `
      <nav>
        ${SECTIONS.map(s => `
          <button data-section="${s.id}" class="${activeSection === s.id ? 'active' : ''}">
            ${s.icon} ${s.name}
          </button>
        `).join('')}
        <button data-section="progress">📊 Progress</button>
      </nav>
    `;
  },

  levelSelector(activeLevel = '') {
    return `
      <div class="level-selector">
        ${LEVELS.map(level => `
          <button data-level="${level}" class="${activeLevel === level ? 'active' : ''}">
            ${level}
          </button>
        `).join('')}
      </div>
    `;
  },

  homeGrid() {
    return `
      <div class="home-grid">
        ${SECTIONS.map(s => `
          <div class="home-card" data-navigate="section/${s.id}">
            <div class="icon">${s.icon}</div>
            <h3>${s.name}</h3>
          </div>
        `).join('')}
        <div class="home-card" data-navigate="progress">
          <div class="icon">📊</div>
          <h3>Your Progress</h3>
        </div>
      </div>
    `;
  },

  lessonList(section, level, lessons) {
    const progress = Progress.getSectionProgress(section, level);
    return `
      ${Components.levelSelector(level)}
      <div class="card">
        <h2>${SECTIONS.find(s => s.id === section)?.name} - ${level}</h2>
        <ul class="lesson-list">
          ${lessons.map((lesson, idx) => {
            const completed = progress.completed.includes(lesson.id);
            return `
              <li data-lesson="${lesson.id}" class="${completed ? 'completed' : ''}">
                <span>${lesson.title}</span>
                ${completed ? '<span>✓</span>' : '<span>▶</span>'}
              </li>
            `;
          }).join('')}
        </ul>
      </div>
    `;
  },

  flashcard(word, onFlip) {
    return `
      <div class="flashcard" onclick="this.classList.toggle('flipped')">
        <div class="flashcard-inner">
          <div class="flashcard-front">
            <div class="flashcard-word">${word.german}</div>
          </div>
          <div class="flashcard-back">
            <div class="flashcard-translation">${word.english}</div>
          </div>
        </div>
      </div>
    `;
  },

  quiz(question, options, correctIndex) {
    return `
      <div class="quiz-container">
        <p class="quiz-question">${question}</p>
        <div class="quiz-options">
          ${options.map((opt, idx) => `
            <div class="quiz-option" data-index="${idx}">${opt}</div>
          `).join('')}
        </div>
      </div>
    `;
  },

  progressBar(current, total) {
    const percent = Math.round((current / total) * 100);
    return `
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${percent}%"></div>
      </div>
      <small>${current}/${total} completed (${percent}%)</small>
    `;
  },

  stats() {
    const stats = Progress.getStats();
    return `
      <div class="stats-grid">
        <div class="stat-card">
          <div class="value">${stats.totalCompleted}</div>
          <div class="label">Lessons Done</div>
        </div>
        <div class="stat-card">
          <div class="value">${stats.currentLevel}</div>
          <div class="label">Current Level</div>
        </div>
        <div class="stat-card">
          <div class="value">${stats.totalPercent}%</div>
          <div class="label">Overall Progress</div>
        </div>
      </div>
    `;
  },

  backBtn(text = 'Back') {
    return `<button class="back-btn" onclick="router.back()">← ${text}</button>`;
  },

  exampleBox(examples) {
    return `
      <div class="example-box">
        <strong>Examples:</strong>
        ${examples.map(ex => `
          <p><em>${ex.german}</em><br>${ex.english}</p>
        `).join('')}
      </div>
    `;
  },

  feedback(correct, message) {
    return `
      <div class="feedback ${correct ? 'correct' : 'incorrect'}">
        ${correct ? '✓ ' : '✗ '}${message}
      </div>
    `;
  },

  scenarioBox(scenario) {
    return `
      <div class="scenario-box">
        <p><strong>Scenario:</strong> ${scenario}</p>
      </div>
    `;
  },

  dialogue(lines) {
    return `
      <div class="dialogue">
        ${lines.map(line => `
          <div class="dialogue-line">
            <strong>${line.speaker}:</strong> ${line.german}<br>
            <small>${line.english}</small>
          </div>
        `).join('')}
      </div>
    `;
  },

  pronunciationGuide(content) {
    return `<div class="pronunciation-guide">${content}</div>`;
  }
};