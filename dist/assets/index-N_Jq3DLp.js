(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{id:`w1`,german:`Hallo`,translation:`Hello`,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w2`,german:`Guten Morgen`,translation:`Good morning`,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w3`,german:`Guten Tag`,translation:`Good day`,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w4`,german:`Guten Abend`,translation:`Good evening`,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w5`,german:`Auf Wiedersehen`,translation:`Goodbye`,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w6`,german:`Tschüss`,translation:`Bye`,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w7`,german:`Danke`,translation:`Thank you`,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w8`,german:`Bitte`,translation:`Please / You're welcome`,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w9`,german:`eins`,translation:`one`,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w10`,german:`zwei`,translation:`two`,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w11`,german:`drei`,translation:`three`,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w12`,german:`vier`,translation:`four`,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w13`,german:`fünf`,translation:`five`,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w14`,german:`sechs`,translation:`six`,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w15`,german:`sieben`,translation:`seven`,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w16`,german:`acht`,translation:`eight`,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w17`,german:`neun`,translation:`nine`,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w18`,german:`zehn`,translation:`ten`,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w19`,german:`die Familie`,translation:`family`,level:`A1`,category:`Personal`,createdAt:Date.now()},{id:`w20`,german:`die Mutter`,translation:`mother`,level:`A1`,category:`Personal`,createdAt:Date.now()},{id:`w21`,german:`der Vater`,translation:`father`,level:`A1`,category:`Personal`,createdAt:Date.now()},{id:`w22`,german:`die Schwester`,translation:`sister`,level:`A1`,category:`Personal`,createdAt:Date.now()},{id:`w23`,german:`der Bruder`,translation:`brother`,level:`A1`,category:`Personal`,createdAt:Date.now()},{id:`w24`,german:`das Essen`,translation:`food`,level:`A1`,category:`Food`,createdAt:Date.now()},{id:`w25`,german:`das Brot`,translation:`bread`,level:`A1`,category:`Food`,createdAt:Date.now()},{id:`w26`,german:`das Wasser`,translation:`water`,level:`A1`,category:`Food`,createdAt:Date.now()},{id:`w27`,german:`der Kaffee`,translation:`coffee`,level:`A1`,category:`Food`,createdAt:Date.now()},{id:`w28`,german:`der Tee`,translation:`tea`,level:`A1`,category:`Food`,createdAt:Date.now()},{id:`w29`,german:`der Apfel`,translation:`apple`,level:`A1`,category:`Food`,createdAt:Date.now()},{id:`w30`,german:`die Banane`,translation:`banana`,level:`A1`,category:`Food`,createdAt:Date.now()}],t=[{id:`lesson-1`,title:`Begrüßung und Verabschiedung`,description:`Grundlegende Grüße und Abschiedsformeln`,category:`Basics`,level:`A1`,wordIds:[],order:1},{id:`lesson-2`,title:`Zahlen und Zählen`,description:`Zahlen von 1 bis 100`,category:`Basics`,level:`A1`,wordIds:[],order:2},{id:`lesson-3`,title:`Familie und Beziehungen`,description:`Familienmitglieder und Beziehungen`,category:`Personal`,level:`A1`,wordIds:[],order:3},{id:`lesson-4`,title:`Essen und Trinken`,description:`Lebensmittel, Getränke und Mahlzeiten`,category:`Daily Life`,level:`A1`,wordIds:[],order:4},{id:`lesson-5`,title:`Einkaufen`,description:`Im Supermarkt und auf dem Markt`,category:`Daily Life`,level:`A1`,wordIds:[],order:5},{id:`lesson-6`,title:`Reisen und Transport`,description:`Bahnhof, Flughafen, öffentliche Verkehrsmittel`,category:`Travel`,level:`A2`,wordIds:[],order:6},{id:`lesson-7`,title:`Arbeit und Beruf`,description:`Berufe, Arbeitsplatz, Geschäftssprache`,category:`Work`,level:`A2`,wordIds:[],order:7},{id:`lesson-8`,title:`Gesundheit`,description:`Körper, Krankheiten, beim Arzt`,category:`Health`,level:`A2`,wordIds:[],order:8}],n=`learning-german-state`,r={totalWordsLearned:0,wordsByLevel:{A1:0,A2:0,B1:0,B2:0,C1:0,C2:0},currentStreak:0,longestStreak:0,totalQuizCount:0,averageAccuracy:0,lastActive:Date.now(),dailyGoal:10,todayLearned:0};function i(){let e=localStorage.getItem(n);return e?JSON.parse(e):{progress:r,quizHistory:[],learnedWordIds:[],lastActive:Date.now(),streak:0}}function a(e){localStorage.setItem(n,JSON.stringify(e))}var o=i();function s(t,n){if(n&&!o.learnedWordIds.includes(t)){o.learnedWordIds.push(t);let n=e.find(e=>e.id===t);n&&(o.progress.totalWordsLearned=o.learnedWordIds.length,o.progress.wordsByLevel[n.level]=(o.progress.wordsByLevel[n.level]||0)+1,o.progress.todayLearned++),a(o)}}function c(t,n=10){return[...e].sort(()=>Math.random()-.5).slice(0,n).map(t=>{let n=Math.random()>.5,r=e.filter(e=>e.id!==t.id).sort(()=>Math.random()-.5).slice(0,3).map(e=>e.translation);return{word:t,type:n?`multiple-choice`:`write`,options:n?[...r,t.translation].sort(()=>Math.random()-.5):void 0,correctAnswer:t.translation}})}var l=[],u=0,d=0;function f(e){let t=document.getElementById(`quiz-count`);l=c(e,parseInt(t?.value||`10`)),u=0,d=0,document.getElementById(`quiz-overlay`)?.classList.remove(`hidden`),p()}function p(){let e=l[u],t=document.getElementById(`quiz-content`),n=document.querySelector(`.quiz-progress`);if(!(!t||!e))if(n&&(n.textContent=`Question ${u+1}/${l.length}`),e.type===`multiple-choice`&&e.options)t.innerHTML=`
      <div class="question">
        <p class="question-word">${e.word.german}</p>
        ${e.word.article?`<p class="question-article">${e.word.article}</p>`:``}
        <div class="options">
          ${e.options.map(e=>`<button class="option-btn" data-answer="${e}">${e}</button>`).join(``)}
        </div>
      </div>
    `,t.querySelectorAll(`.option-btn`).forEach(t=>{t.addEventListener(`click`,t=>{let n=t.target.dataset.answer;m(n||``,e)})});else{t.innerHTML=`
      <div class="question">
        <p class="question-word">${e.word.german}</p>
        ${e.word.article?`<p class="question-article">${e.word.article}</p>`:``}
        <input type="text" class="write-answer" placeholder="Your answer..." />
        <button class="btn primary submit-answer">Check Answer</button>
      </div>
    `;let n=t.querySelector(`.write-answer`);t.querySelector(`.submit-answer`)?.addEventListener(`click`,()=>m(n.value.trim(),e)),n?.addEventListener(`keypress`,t=>{t.key===`Enter`&&m(n.value.trim(),e)})}}function m(e,t){let n=e.toLowerCase()===t.correctAnswer.toLowerCase();n&&(d++,s(t.word.id,!0));let r=document.getElementById(`quiz-content`);r&&(r.innerHTML=`
    <div class="feedback ${n?`correct`:`incorrect`}">
      <p class="feedback-icon">${n?`✅`:`❌`}</p>
      <p class="feedback-text">${n?`Correct!`:`Wrong! The correct answer was: ${t.correctAnswer}`}</p>
      <p class="feedback-word">${t.word.german} = ${t.correctAnswer}</p>
      <button class="btn primary next-question">Next</button>
    </div>
  `,r.querySelector(`.next-question`)?.addEventListener(`click`,()=>{u++,u>=l.length?h():p()}))}function h(){let e=d/l.length*100;o.quizHistory.push({lessonId:`general`,correct:d,total:l.length,accuracy:e,completedAt:Date.now(),timeSpent:0}),o.progress.totalQuizCount++,o.progress.averageAccuracy=o.quizHistory.reduce((e,t)=>e+t.accuracy,0)/o.quizHistory.length,a(o);let t=document.getElementById(`quiz-content`);t&&(t.innerHTML=`
    <div class="quiz-results">
      <h2>Quiz Complete! 🎉</h2>
      <div class="results-summary">
        <div class="result-item">
          <span class="result-value">${d}/${l.length}</span>
          <span class="result-label">Correct Answers</span>
        </div>
        <div class="result-item">
          <span class="result-value">${Math.round(e)}%</span>
          <span class="result-label">Accuracy</span>
        </div>
      </div>
      <button class="btn primary" onclick="closeQuiz()">Back to Dashboard</button>
    </div>
  `)}function g(){document.getElementById(`quiz-overlay`)?.classList.add(`hidden`),v()}function _(e){document.querySelectorAll(`.tab`).forEach(e=>e.classList.remove(`active`)),document.querySelectorAll(`[data-tab="${e}"]`).forEach(e=>e.classList.add(`active`)),document.querySelectorAll(`.tab-content`).forEach(e=>e.classList.add(`hidden`)),document.getElementById(`${e}-tab`)?.classList.remove(`hidden`)}function v(){let e=document.querySelector(`#app`),n=new Date().toDateString(),r=new Date(o.lastActive).toDateString();n!==r&&(o.streak=r===new Date(Date.now()-864e5).toDateString()?o.streak+1:0,o.lastActive=Date.now(),a(o));let i=Math.min(o.progress.todayLearned/o.progress.dailyGoal*100,100);e.innerHTML=`
    <div class="dashboard">
      <header>
        <h1>🇩🇪 Learning German</h1>
        <p class="subtitle">Your German Learning Portal</p>
      </header>
      
      <nav class="tabs">
        <button class="tab active" data-tab="dashboard">Dashboard</button>
        <button class="tab" data-tab="lessons">Lessons</button>
        <button class="tab" data-tab="practice">Practice</button>
        <button class="tab" data-tab="stats">Stats</button>
      </nav>
      
      <main class="tab-content" id="dashboard-tab">
        <section class="stats-grid">
          <div class="stat-card">
            <div class="stat-value">${o.progress.totalWordsLearned}</div>
            <div class="stat-label">Words Learned</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">🔥 ${o.streak}</div>
            <div class="stat-label">Day Streak</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${o.progress.totalQuizCount}</div>
            <div class="stat-label">Quizzes Completed</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${Math.round(o.progress.averageAccuracy)}%</div>
            <div class="stat-label">Ø Accuracy</div>
          </div>
        </section>
        
        <section class="daily-goal">
          <h2>Daily Goal</h2>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${i}%"></div>
          </div>
          <p>${o.progress.todayLearned} / ${o.progress.dailyGoal} words today</p>
        </section>
        
        <section class="quick-actions">
          <button class="btn primary" onclick="showTab('practice')">Practice Now</button>
          <button class="btn secondary" onclick="showTab('lessons')">View Lessons</button>
        </section>
      </main>
      
      <main class="tab-content hidden" id="lessons-tab">
        <h2>Lessons</h2>
        <div class="lessons-list">
          ${t.map(e=>`
            <div class="lesson-card">
              <h3>${e.title}</h3>
              <p>${e.description}</p>
              <div class="lesson-meta">
                <span class="level">${e.level}</span>
                <span class="category">${e.category}</span>
              </div>
              <button class="btn start-lesson" onclick="startQuiz()">Start</button>
            </div>
          `).join(``)}
        </div>
      </main>
      
      <main class="tab-content hidden" id="practice-tab">
        <h2>Quiz Mode</h2>
        <div class="quiz-setup">
          <label>
            <span>Select Lesson:</span>
            <select id="quiz-lesson">
              <option value="">All Lessons</option>
              ${t.map(e=>`<option value="${e.id}">${e.title}</option>`).join(``)}
            </select>
          </label>
          <label>
            <span>Number of Questions:</span>
            <select id="quiz-count">
              <option value="5">5</option>
              <option value="10" selected>10</option>
              <option value="20">20</option>
            </select>
          </label>
          <button class="btn primary" onclick="startQuiz()">Start Quiz</button>
        </div>
      </main>
      
      <main class="tab-content hidden" id="stats-tab">
        <h2>Your Statistics</h2>
        <div class="stats-detail">
          <h3>Words by Level</h3>
          <ul class="level-breakdown">
            ${Object.entries(o.progress.wordsByLevel).map(([e,t])=>`
              <li><span class="level-badge">${e}</span> ${t} words</li>
            `).join(``)}
          </ul>
          <h3>Recent Quizzes</h3>
          <div class="quiz-history">
            ${o.quizHistory.slice(-5).reverse().map(e=>`
              <div class="quiz-result">
                <span>${new Date(e.completedAt).toLocaleDateString()}</span>
                <span>${e.correct}/${e.total} correct</span>
                <span>${Math.round(e.accuracy)}%</span>
              </div>
            `).join(``)}
            ${o.quizHistory.length===0?`<p>No quizzes completed yet.</p>`:``}
          </div>
        </div>
      </main>
      
      <div class="quiz-overlay hidden" id="quiz-overlay">
        <div class="quiz-container">
          <div class="quiz-header">
            <span class="quiz-progress">Question 1/10</span>
            <button class="close-quiz" onclick="closeQuiz()">✕</button>
          </div>
          <div class="quiz-content" id="quiz-content"></div>
        </div>
      </div>
    </div>
  `,document.querySelectorAll(`.tab`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.target.dataset.tab;t&&_(t)})})}window.startQuiz=f,window.closeQuiz=g,window.showTab=_;function y(){v()}y();