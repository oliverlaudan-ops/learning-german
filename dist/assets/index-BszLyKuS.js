(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{id:`w1`,german:`Hallo`,translation:`Hello`,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w2`,german:`Guten Morgen`,translation:`Good morning`,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w3`,german:`Guten Tag`,translation:`Good day`,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w4`,german:`Guten Abend`,translation:`Good evening`,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w5`,german:`Auf Wiedersehen`,translation:`Goodbye`,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w6`,german:`Tschüss`,translation:`Bye`,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w7`,german:`Danke`,translation:`Thank you`,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w8`,german:`Bitte`,translation:`Please / You're welcome`,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w9`,german:`eins`,translation:`one`,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w10`,german:`zwei`,translation:`two`,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w11`,german:`drei`,translation:`three`,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w12`,german:`vier`,translation:`four`,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w13`,german:`fünf`,translation:`five`,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w14`,german:`sechs`,translation:`six`,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w15`,german:`sieben`,translation:`seven`,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w16`,german:`acht`,translation:`eight`,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w17`,german:`neun`,translation:`nine`,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w18`,german:`zehn`,translation:`ten`,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w19`,german:`die Familie`,translation:`family`,level:`A1`,category:`Personal`,createdAt:Date.now()},{id:`w20`,german:`die Mutter`,translation:`mother`,level:`A1`,category:`Personal`,createdAt:Date.now()},{id:`w21`,german:`der Vater`,translation:`father`,level:`A1`,category:`Personal`,createdAt:Date.now()},{id:`w22`,german:`die Schwester`,translation:`sister`,level:`A1`,category:`Personal`,createdAt:Date.now()},{id:`w23`,german:`der Bruder`,translation:`brother`,level:`A1`,category:`Personal`,createdAt:Date.now()},{id:`w24`,german:`das Essen`,translation:`food`,level:`A1`,category:`Food`,createdAt:Date.now()},{id:`w25`,german:`das Brot`,translation:`bread`,level:`A1`,category:`Food`,createdAt:Date.now()},{id:`w26`,german:`das Wasser`,translation:`water`,level:`A1`,category:`Food`,createdAt:Date.now()},{id:`w27`,german:`der Kaffee`,translation:`coffee`,level:`A1`,category:`Food`,createdAt:Date.now()},{id:`w28`,german:`der Tee`,translation:`tea`,level:`A1`,category:`Food`,createdAt:Date.now()},{id:`w29`,german:`der Apfel`,translation:`apple`,level:`A1`,category:`Food`,createdAt:Date.now()},{id:`w30`,german:`die Banane`,translation:`banana`,level:`A1`,category:`Food`,createdAt:Date.now()}],t=[{id:`lesson-1`,title:`Greetings and Farewells`,description:`Basic greetings and goodbye phrases`,category:`Basics`,level:`A1`,wordIds:[`w1`,`w2`,`w3`,`w4`,`w5`,`w6`,`w7`,`w8`],order:1},{id:`lesson-2`,title:`Numbers`,description:`Numbers from 1 to 10`,category:`Basics`,level:`A1`,wordIds:[`w9`,`w10`,`w11`,`w12`,`w13`,`w14`,`w15`,`w16`,`w17`,`w18`],order:2},{id:`lesson-3`,title:`Family and Relationships`,description:`Family members and relationships`,category:`Personal`,level:`A1`,wordIds:[`w19`,`w20`,`w21`,`w22`,`w23`],order:3},{id:`lesson-4`,title:`Food and Drink`,description:`Food, beverages and meals`,category:`Food`,level:`A1`,wordIds:[`w24`,`w25`,`w26`,`w27`,`w28`,`w29`,`w30`],order:4},{id:`lesson-5`,title:`Shopping`,description:`At the supermarket and market`,category:`Daily Life`,level:`A1`,wordIds:[],order:5},{id:`lesson-6`,title:`Travel and Transport`,description:`Train station, airport, public transport`,category:`Travel`,level:`A2`,wordIds:[],order:6},{id:`lesson-7`,title:`Work and Profession`,description:`Jobs, workplace, business language`,category:`Work`,level:`A2`,wordIds:[],order:7},{id:`lesson-8`,title:`Health`,description:`Body, illnesses, at the doctor`,category:`Health`,level:`A2`,wordIds:[],order:8}],n=[{id:`glossary-1`,term:`Hallo`,translation:`Hello`,explanation:`Informal greeting used throughout the day. Can be used with friends, family, and peers.`,examples:[`Hallo Maria!`,`Hallo, wie geht es dir?`],level:`A1`,category:`Greetings`},{id:`glossary-2`,term:`Guten Morgen`,translation:`Good morning`,explanation:`Formal greeting used until about 11 AM. More formal than "Hallo".`,examples:[`Guten Morgen, Herr Müller!`,`Guten Morgen zusammen!`],level:`A1`,category:`Greetings`},{id:`glossary-3`,term:`Guten Tag`,translation:`Good day`,explanation:`Formal greeting used from late morning until early evening (approximately 11 AM - 6 PM).`,examples:[`Guten Tag, kann ich Ihnen helfen?`,`Guten Tag, Frau Schmidt!`],level:`A1`,category:`Greetings`},{id:`glossary-4`,term:`Auf Wiedersehen`,translation:`Goodbye`,explanation:`Formal farewell. Literally means "until we see again". Used in formal situations.`,examples:[`Auf Wiedersehen, Herr Doktor!`,`Ich wünsche Ihnen einen schönen Tag. Auf Wiedersehen!`],level:`A1`,category:`Farewells`},{id:`glossary-5`,term:`Tschüss`,translation:`Bye`,explanation:`Informal farewell used with friends, family, and people you know well.`,examples:[`Tschüss, bis morgen!`,`Tschüss, mach es gut!`],level:`A1`,category:`Farewells`},{id:`glossary-6`,term:`Danke`,translation:`Thank you`,explanation:`Expression of gratitude. Can be intensified with "schön" or "vielen".`,examples:[`Danke schön!`,`Vielen Dank für deine Hilfe!`,`Danke, das ist sehr nett.`],level:`A1`,category:`Polite Expressions`},{id:`glossary-7`,term:`Bitte`,translation:`Please / You're welcome`,explanation:`Multi-purpose word: used for "please", "you're welcome", and when offering something.`,examples:[`Bitte schön!`,`Kann ich haben...? - Bitte!`,`Bitte, nimm Platz!`],level:`A1`,category:`Polite Expressions`},{id:`glossary-8`,term:`der`,translation:`the (masculine)`,explanation:`Definite article for masculine nouns in nominative case. Changes to "den" in accusative.`,examples:[`der Mann`,`der Tisch`,`der Apfel`],level:`A1`,category:`Articles`},{id:`glossary-9`,term:`die`,translation:`the (feminine/plural)`,explanation:`Definite article for feminine nouns (singular) and all plural nouns.`,examples:[`die Frau`,`die Banane`,`die Kinder (plural)`],level:`A1`,category:`Articles`},{id:`glossary-10`,term:`das`,translation:`the (neuter)`,explanation:`Definite article for neuter nouns in nominative and accusative cases.`,examples:[`das Kind`,`das Brot`,`das Wasser`],level:`A1`,category:`Articles`}],r=[{id:`grammar-1`,title:`Articles: der, die, das`,description:`German has three grammatical genders: masculine (der), feminine (die), and neuter (das).`,level:`A1`,category:`Grammar Basics`,examples:[{german:`der Mann`,english:`the man`,explanation:`Masculine noun`},{german:`die Frau`,english:`the woman`,explanation:`Feminine noun`},{german:`das Kind`,english:`the child`,explanation:`Neuter noun`}]},{id:`grammar-2`,title:`Present Tense Conjugation`,description:`Regular verbs are conjugated by removing -en and adding personal endings.`,level:`A1`,category:`Verbs`,examples:[{german:`ich lerne`,english:`I learn`,explanation:`1st person singular`},{german:`du lernst`,english:`you learn`,explanation:`2nd person singular`},{german:`er/sie/es lernt`,english:`he/she/it learns`,explanation:`3rd person singular`},{german:`wir lernen`,english:`we learn`,explanation:`1st person plural`},{german:`ihr lernt`,english:`you (pl.) learn`,explanation:`2nd person plural`},{german:`sie/Sie lernen`,english:`they/you (formal) learn`,explanation:`3rd person plural / formal`}]},{id:`grammar-3`,title:`Sentence Structure`,description:`German word order: The verb is always in the second position in main clauses.`,level:`A1`,category:`Grammar Basics`,examples:[{german:`Ich lerne Deutsch.`,english:`I learn German.`,explanation:`Standard word order`},{german:`Heute lerne ich Deutsch.`,english:`Today I learn German.`,explanation:`Time first, then verb, then subject`},{german:`Deutsch lerne ich heute.`,english:`German I learn today.`,explanation:`Object first for emphasis`}]},{id:`grammar-4`,title:`Plural Forms`,description:`German nouns have different plural endings: -e, -er, -en, -s, or no change.`,level:`A1`,category:`Nouns`,examples:[{german:`der Apfel → die Äpfel`,english:`the apple → the apples`,explanation:`Umlaut + -er`},{german:`die Banane → die Bananen`,english:`the banana → the bananas`,explanation:`-en ending`},{german:`das Auto → die Autos`,english:`the car → the cars`,explanation:`-s ending`}]},{id:`grammar-5`,title:`Cases: Nominative, Accusative, Dative`,description:`German has four cases. The case determines the article and adjective endings.`,level:`A2`,category:`Grammar Basics`,examples:[{german:`Der Mann ist hier. (Nominative)`,english:`The man is here.`,explanation:`Subject`},{german:`Ich sehe den Mann. (Accusative)`,english:`I see the man.`,explanation:`Direct object`},{german:`Ich helfe dem Mann. (Dative)`,english:`I help the man.`,explanation:`Indirect object`}]}],i=`learning-german-state`,a={totalWordsLearned:0,wordsByLevel:{A1:0,A2:0,B1:0,B2:0,C1:0,C2:0},currentStreak:0,longestStreak:0,totalQuizCount:0,averageAccuracy:0,lastActive:Date.now(),dailyGoal:10,todayLearned:0};function o(){let e=localStorage.getItem(i);return e?JSON.parse(e):{progress:a,quizHistory:[],learnedWordIds:[],lastActive:Date.now(),streak:0}}function s(e){localStorage.setItem(i,JSON.stringify(e))}var c=o();function l(t,n){if(n&&!c.learnedWordIds.includes(t)){c.learnedWordIds.push(t);let n=e.find(e=>e.id===t);n&&(c.progress.totalWordsLearned=c.learnedWordIds.length,c.progress.wordsByLevel[n.level]=(c.progress.wordsByLevel[n.level]||0)+1,c.progress.todayLearned++),s(c)}}function u(n,r=10){let i=n?e.filter(e=>t.find(e=>e.id===n)?.wordIds.includes(e.id)):e;return[...i].sort(()=>Math.random()-.5).slice(0,Math.min(r,i.length)).map(t=>{let n=Math.random()>.5,r=e.filter(e=>e.id!==t.id).sort(()=>Math.random()-.5).slice(0,3).map(e=>e.german);return{word:t,type:n?`multiple-choice`:`write`,options:n?[...r,t.german].sort(()=>Math.random()-.5):void 0,correctAnswer:t.german}})}var d=[],f=0,p=0;function m(e){let t=document.getElementById(`quiz-count`);d=u(e,parseInt(t?.value||`10`)),f=0,p=0,document.getElementById(`quiz-overlay`)?.classList.remove(`hidden`),h()}function h(){let e=d[f],t=document.getElementById(`quiz-content`),n=document.querySelector(`.quiz-progress`);if(!(!t||!e))if(n&&(n.textContent=`Question ${f+1}/${d.length}`),e.type===`multiple-choice`&&e.options)t.innerHTML=`
      <div class="question">
        <p class="question-word">${e.word.translation}</p>
        ${e.word.article?`<p class="question-article">${e.word.article}</p>`:``}
        <div class="options">
          ${e.options.map(e=>`<button class="option-btn" data-answer="${e}">${e}</button>`).join(``)}
        </div>
      </div>
    `,t.querySelectorAll(`.option-btn`).forEach(t=>{t.addEventListener(`click`,t=>{let n=t.target.dataset.answer;g(n||``,e)})});else{t.innerHTML=`
      <div class="question">
        <p class="question-word">${e.word.translation}</p>
        ${e.word.article?`<p class="question-article">${e.word.article}</p>`:``}
        <input type="text" class="write-answer" placeholder="Your answer..." />
        <button class="btn primary submit-answer">Check Answer</button>
      </div>
    `;let n=t.querySelector(`.write-answer`);t.querySelector(`.submit-answer`)?.addEventListener(`click`,()=>g(n.value.trim(),e)),n?.addEventListener(`keypress`,t=>{t.key===`Enter`&&g(n.value.trim(),e)})}}function g(e,t){let n=e.toLowerCase()===t.correctAnswer.toLowerCase();n&&(p++,l(t.word.id,!0));let r=document.getElementById(`quiz-content`);r&&(r.innerHTML=`
    <div class="feedback ${n?`correct`:`incorrect`}">
      <p class="feedback-icon">${n?`✅`:`❌`}</p>
      <p class="feedback-text">${n?`Correct!`:`Wrong! The correct answer was: ${t.correctAnswer}`}</p>
      <p class="feedback-word">${t.word.translation} = ${t.correctAnswer}</p>
      <button class="btn primary next-question">Next</button>
    </div>
  `,r.querySelector(`.next-question`)?.addEventListener(`click`,()=>{f++,f>=d.length?_():h()}))}function _(){let e=p/d.length*100;c.quizHistory.push({lessonId:`general`,correct:p,total:d.length,accuracy:e,completedAt:Date.now(),timeSpent:0}),c.progress.totalQuizCount++,c.progress.averageAccuracy=c.quizHistory.reduce((e,t)=>e+t.accuracy,0)/c.quizHistory.length,s(c);let t=document.getElementById(`quiz-content`);t&&(t.innerHTML=`
    <div class="quiz-results">
      <h2>Quiz Complete! 🎉</h2>
      <div class="results-summary">
        <div class="result-item">
          <span class="result-value">${p}/${d.length}</span>
          <span class="result-label">Correct Answers</span>
        </div>
        <div class="result-item">
          <span class="result-value">${Math.round(e)}%</span>
          <span class="result-label">Accuracy</span>
        </div>
      </div>
      <button class="btn primary" onclick="closeQuiz()">Back to Dashboard</button>
    </div>
  `)}function v(){document.getElementById(`quiz-overlay`)?.classList.add(`hidden`),b()}function y(e){document.querySelectorAll(`.tab`).forEach(e=>e.classList.remove(`active`)),document.querySelectorAll(`[data-tab="${e}"]`).forEach(e=>e.classList.add(`active`)),document.querySelectorAll(`.tab-content`).forEach(e=>e.classList.add(`hidden`)),document.getElementById(`${e}-tab`)?.classList.remove(`hidden`)}function b(){let e=document.querySelector(`#app`),i=new Date().toDateString(),a=new Date(c.lastActive).toDateString();i!==a&&(c.streak=a===new Date(Date.now()-864e5).toDateString()?c.streak+1:0,c.lastActive=Date.now(),s(c));let o=Math.min(c.progress.todayLearned/c.progress.dailyGoal*100,100);e.innerHTML=`
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
      <button class="tab" data-tab="grammar">Grammar</button>
      <button class="tab" data-tab="glossary">Glossary</button>
      </nav>
      
      <main class="tab-content" id="dashboard-tab">
        <section class="stats-grid">
          <div class="stat-card">
            <div class="stat-value">${c.progress.totalWordsLearned}</div>
            <div class="stat-label">Words Learned</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">🔥 ${c.streak}</div>
            <div class="stat-label">Day Streak</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${c.progress.totalQuizCount}</div>
            <div class="stat-label">Quizzes Completed</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${Math.round(c.progress.averageAccuracy)}%</div>
            <div class="stat-label">Ø Accuracy</div>
          </div>
        </section>
        
        <section class="daily-goal">
          <h2>Daily Goal</h2>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${o}%"></div>
          </div>
          <p>${c.progress.todayLearned} / ${c.progress.dailyGoal} words today</p>
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
            ${Object.entries(c.progress.wordsByLevel).map(([e,t])=>`
              <li><span class="level-badge">${e}</span> ${t} words</li>
            `).join(``)}
          </ul>
          <h3>Recent Quizzes</h3>
          <div class="quiz-history">
            ${c.quizHistory.slice(-5).reverse().map(e=>`
              <div class="quiz-result">
                <span>${new Date(e.completedAt).toLocaleDateString()}</span>
                <span>${e.correct}/${e.total} correct</span>
                <span>${Math.round(e.accuracy)}%</span>
              </div>
            `).join(``)}
            ${c.quizHistory.length===0?`<p>No quizzes completed yet.</p>`:``}
          </div>
        </div>
      </main>
      
      <main class="tab-content hidden" id="grammar-tab">
        <h2>Grammar Rules</h2>
        <div class="grammar-list">
          ${r.map(e=>`
            <div class="grammar-card">
              <h3>${e.title}</h3>
              <div class="grammar-meta">
                <span class="level">${e.level}</span>
                <span class="category">${e.category}</span>
              </div>
              <p class="grammar-desc">${e.description}</p>
              <div class="grammar-examples">
                <h4>Examples:</h4>
                <ul>
                  ${e.examples.map(e=>`
                    <li>
                      <span class="german">${e.german}</span>
                      <span class="english">${e.english}</span>
                      ${e.explanation?`<span class="explanation">${e.explanation}</span>`:``}
                    </li>
                  `).join(``)}
                </ul>
              </div>
            </div>
          `).join(``)}
        </div>
      </main>
      
      <main class="tab-content hidden" id="glossary-tab">
        <h2>Glossary</h2>
        <div class="glossary-search">
          <input type="text" id="glossary-search-input" placeholder="Search terms..." onkeyup="filterGlossary()" />
        </div>
        <div class="glossary-list" id="glossary-list">
          ${n.map(e=>`
            <div class="glossary-card" data-term="${e.term.toLowerCase()}">
              <h3>${e.term}</h3>
              <div class="glossary-meta">
                <span class="translation">${e.translation}</span>
                <span class="level">${e.level}</span>
                <span class="category">${e.category}</span>
              </div>
              <p class="glossary-explanation">${e.explanation}</p>
              <div class="glossary-examples">
                <h4>Examples:</h4>
                <ul>
                  ${e.examples.map(e=>`<li>${e}</li>`).join(``)}
                </ul>
              </div>
            </div>
          `).join(``)}
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
  `,document.querySelectorAll(`.tab`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.target.dataset.tab;t&&y(t)})})}window.startQuiz=m,window.closeQuiz=v,window.showTab=y,window.filterGlossary=x;function x(){let e=document.getElementById(`glossary-search-input`).value.toLowerCase();document.querySelectorAll(`.glossary-card`).forEach(t=>{let n=t.getAttribute(`data-term`)||``;t.classList.toggle(`hidden`,!n.includes(e))})}function S(){b()}S();