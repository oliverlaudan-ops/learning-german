(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{id:`w1`,german:`Hallo`,translation:`Hello`,article:``,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w2`,german:`Guten Morgen`,translation:`Good morning`,article:``,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w3`,german:`Guten Tag`,translation:`Good day`,article:``,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w4`,german:`Guten Abend`,translation:`Good evening`,article:``,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w5`,german:`Auf Wiedersehen`,translation:`Goodbye`,article:``,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w6`,german:`Tschüss`,translation:`Bye`,article:``,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w7`,german:`Danke`,translation:`Thank you`,article:``,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w8`,german:`Bitte`,translation:`Please / You're welcome`,article:``,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w9`,german:`eins`,translation:`one`,article:``,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w10`,german:`zwei`,translation:`two`,article:``,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w11`,german:`drei`,translation:`three`,article:``,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w12`,german:`vier`,translation:`four`,article:``,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w13`,german:`fünf`,translation:`five`,article:``,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w14`,german:`sechs`,translation:`six`,article:``,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w15`,german:`sieben`,translation:`seven`,article:``,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w16`,german:`acht`,translation:`eight`,article:``,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w17`,german:`neun`,translation:`nine`,article:``,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w18`,german:`zehn`,translation:`ten`,article:``,level:`A1`,category:`Basics`,createdAt:Date.now()},{id:`w19`,german:`die Familie`,translation:`family`,article:`die`,level:`A1`,category:`Personal`,createdAt:Date.now()},{id:`w20`,german:`die Mutter`,translation:`mother`,article:`die`,level:`A1`,category:`Personal`,createdAt:Date.now()},{id:`w21`,german:`der Vater`,translation:`father`,article:`der`,level:`A1`,category:`Personal`,createdAt:Date.now()},{id:`w22`,german:`die Schwester`,translation:`sister`,article:`die`,level:`A1`,category:`Personal`,createdAt:Date.now()},{id:`w23`,german:`der Bruder`,translation:`brother`,article:`der`,level:`A1`,category:`Personal`,createdAt:Date.now()},{id:`w24`,german:`die Tochter`,translation:`daughter`,article:`die`,level:`A1`,category:`Personal`,createdAt:Date.now()},{id:`w25`,german:`der Sohn`,translation:`son`,article:`der`,level:`A1`,category:`Personal`,createdAt:Date.now()},{id:`w26`,german:`die Eltern`,translation:`parents`,article:`die`,level:`A1`,category:`Personal`,createdAt:Date.now()},{id:`w27`,german:`die Großmutter`,translation:`grandmother`,article:`die`,level:`A1`,category:`Personal`,createdAt:Date.now()},{id:`w28`,german:`der Großvater`,translation:`grandfather`,article:`der`,level:`A1`,category:`Personal`,createdAt:Date.now()},{id:`w29`,german:`das Essen`,translation:`food`,article:`das`,level:`A1`,category:`Food`,createdAt:Date.now()},{id:`w30`,german:`das Brot`,translation:`bread`,article:`das`,level:`A1`,category:`Food`,createdAt:Date.now()},{id:`w31`,german:`das Wasser`,translation:`water`,article:`das`,level:`A1`,category:`Food`,createdAt:Date.now()},{id:`w32`,german:`der Kaffee`,translation:`coffee`,article:`der`,level:`A1`,category:`Food`,createdAt:Date.now()},{id:`w33`,german:`der Tee`,translation:`tea`,article:`der`,level:`A1`,category:`Food`,createdAt:Date.now()},{id:`w34`,german:`der Apfel`,translation:`apple`,article:`der`,level:`A1`,category:`Food`,createdAt:Date.now()},{id:`w35`,german:`die Banane`,translation:`banana`,article:`die`,level:`A1`,category:`Food`,createdAt:Date.now()},{id:`w36`,german:`die Milch`,translation:`milk`,article:`die`,level:`A1`,category:`Food`,createdAt:Date.now()},{id:`w37`,german:`der Käse`,translation:`cheese`,article:`der`,level:`A1`,category:`Food`,createdAt:Date.now()},{id:`w38`,german:`das Fleisch`,translation:`meat`,article:`das`,level:`A1`,category:`Food`,createdAt:Date.now()},{id:`w39`,german:`der Fisch`,translation:`fish`,article:`der`,level:`A1`,category:`Food`,createdAt:Date.now()},{id:`w40`,german:`die Kartoffel`,translation:`potato`,article:`die`,level:`A1`,category:`Food`,createdAt:Date.now()},{id:`w41`,german:`das Frühstück`,translation:`breakfast`,article:`das`,level:`A1`,category:`Food`,createdAt:Date.now()},{id:`w42`,german:`das Mittagessen`,translation:`lunch`,article:`das`,level:`A1`,category:`Food`,createdAt:Date.now()},{id:`w43`,german:`das Abendessen`,translation:`dinner`,article:`das`,level:`A1`,category:`Food`,createdAt:Date.now()},{id:`w44`,german:`der Supermarkt`,translation:`supermarket`,article:`der`,level:`A1`,category:`Shopping`,createdAt:Date.now()},{id:`w45`,german:`der Markt`,translation:`market`,article:`der`,level:`A1`,category:`Shopping`,createdAt:Date.now()},{id:`w46`,german:`das Geschäft`,translation:`shop`,article:`das`,level:`A1`,category:`Shopping`,createdAt:Date.now()},{id:`w47`,german:`die Bäckerei`,translation:`bakery`,article:`die`,level:`A1`,category:`Shopping`,createdAt:Date.now()},{id:`w48`,german:`kaufen`,translation:`to buy`,article:``,level:`A1`,category:`Shopping`,createdAt:Date.now()},{id:`w49`,german:`bezahlen`,translation:`to pay`,article:``,level:`A1`,category:`Shopping`,createdAt:Date.now()},{id:`w50`,german:`das Geld`,translation:`money`,article:`das`,level:`A1`,category:`Shopping`,createdAt:Date.now()},{id:`w51`,german:`die Karte`,translation:`card`,article:`die`,level:`A1`,category:`Shopping`,createdAt:Date.now()},{id:`w52`,german:`bar`,translation:`in cash`,article:``,level:`A1`,category:`Shopping`,createdAt:Date.now()},{id:`w53`,german:`teuer`,translation:`expensive`,article:``,level:`A1`,category:`Shopping`,createdAt:Date.now()},{id:`w54`,german:`billig`,translation:`cheap`,article:``,level:`A1`,category:`Shopping`,createdAt:Date.now()},{id:`w55`,german:`die Tasche`,translation:`bag`,article:`die`,level:`A1`,category:`Shopping`,createdAt:Date.now()},{id:`w56`,german:`der Einkaufswagen`,translation:`shopping cart`,article:`der`,level:`A1`,category:`Shopping`,createdAt:Date.now()},{id:`w57`,german:`die Kasse`,translation:`cash register`,article:`die`,level:`A1`,category:`Shopping`,createdAt:Date.now()},{id:`w58`,german:`der Preis`,translation:`price`,article:`der`,level:`A1`,category:`Shopping`,createdAt:Date.now()},{id:`w59`,german:`der Zug`,translation:`train`,article:`der`,level:`A2`,category:`Travel`,createdAt:Date.now()},{id:`w60`,german:`die Bahn`,translation:`railway`,article:`die`,level:`A2`,category:`Travel`,createdAt:Date.now()},{id:`w61`,german:`der Bahnhof`,translation:`train station`,article:`der`,level:`A2`,category:`Travel`,createdAt:Date.now()},{id:`w62`,german:`das Flugzeug`,translation:`airplane`,article:`das`,level:`A2`,category:`Travel`,createdAt:Date.now()},{id:`w63`,german:`der Flughafen`,translation:`airport`,article:`der`,level:`A2`,category:`Travel`,createdAt:Date.now()},{id:`w64`,german:`der Bus`,translation:`bus`,article:`der`,level:`A2`,category:`Travel`,createdAt:Date.now()},{id:`w65`,german:`die U-Bahn`,translation:`subway`,article:`die`,level:`A2`,category:`Travel`,createdAt:Date.now()},{id:`w66`,german:`das Taxi`,translation:`taxi`,article:`das`,level:`A2`,category:`Travel`,createdAt:Date.now()},{id:`w67`,german:`das Auto`,translation:`car`,article:`das`,level:`A2`,category:`Travel`,createdAt:Date.now()},{id:`w68`,german:`das Fahrrad`,translation:`bicycle`,article:`das`,level:`A2`,category:`Travel`,createdAt:Date.now()},{id:`w69`,german:`die Fahrkarte`,translation:`ticket`,article:`die`,level:`A2`,category:`Travel`,createdAt:Date.now()},{id:`w70`,german:`reisen`,translation:`to travel`,article:``,level:`A2`,category:`Travel`,createdAt:Date.now()},{id:`w71`,german:`das Hotel`,translation:`hotel`,article:`das`,level:`A2`,category:`Travel`,createdAt:Date.now()},{id:`w72`,german:`die Straße`,translation:`street`,article:`die`,level:`A2`,category:`Travel`,createdAt:Date.now()},{id:`w73`,german:`die Karte`,translation:`map`,article:`die`,level:`A2`,category:`Travel`,createdAt:Date.now()},{id:`w74`,german:`die Arbeit`,translation:`work`,article:`die`,level:`A2`,category:`Work`,createdAt:Date.now()},{id:`w75`,german:`der Beruf`,translation:`profession`,article:`der`,level:`A2`,category:`Work`,createdAt:Date.now()},{id:`w76`,german:`der Lehrer`,translation:`teacher (m)`,article:`der`,level:`A2`,category:`Work`,createdAt:Date.now()},{id:`w77`,german:`die Lehrerin`,translation:`teacher (f)`,article:`die`,level:`A2`,category:`Work`,createdAt:Date.now()},{id:`w78`,german:`der Arzt`,translation:`doctor (m)`,article:`der`,level:`A2`,category:`Work`,createdAt:Date.now()},{id:`w79`,german:`die Ärztin`,translation:`doctor (f)`,article:`die`,level:`A2`,category:`Work`,createdAt:Date.now()},{id:`w80`,german:`der Ingenieur`,translation:`engineer`,article:`der`,level:`A2`,category:`Work`,createdAt:Date.now()},{id:`w81`,german:`die Bürokauffrau`,translation:`office clerk`,article:`die`,level:`A2`,category:`Work`,createdAt:Date.now()},{id:`w82`,german:`das Büro`,translation:`office`,article:`das`,level:`A2`,category:`Work`,createdAt:Date.now()},{id:`w83`,german:`der Chef`,translation:`boss`,article:`der`,level:`A2`,category:`Work`,createdAt:Date.now()},{id:`w84`,german:`der Kollege`,translation:`colleague`,article:`der`,level:`A2`,category:`Work`,createdAt:Date.now()},{id:`w85`,german:`arbeiten`,translation:`to work`,article:``,level:`A2`,category:`Work`,createdAt:Date.now()},{id:`w86`,german:`das Gehalt`,translation:`salary`,article:`das`,level:`A2`,category:`Work`,createdAt:Date.now()},{id:`w87`,german:`der Urlaub`,translation:`vacation`,article:`der`,level:`A2`,category:`Work`,createdAt:Date.now()},{id:`w88`,german:`die Pause`,translation:`break`,article:`die`,level:`A2`,category:`Work`,createdAt:Date.now()},{id:`w89`,german:`die Gesundheit`,translation:`health`,article:`die`,level:`A2`,category:`Health`,createdAt:Date.now()},{id:`w90`,german:`der Körper`,translation:`body`,article:`der`,level:`A2`,category:`Health`,createdAt:Date.now()},{id:`w91`,german:`der Kopf`,translation:`head`,article:`der`,level:`A2`,category:`Health`,createdAt:Date.now()},{id:`w92`,german:`die Hand`,translation:`hand`,article:`die`,level:`A2`,category:`Health`,createdAt:Date.now()},{id:`w93`,german:`der Fuß`,translation:`foot`,article:`der`,level:`A2`,category:`Health`,createdAt:Date.now()},{id:`w94`,german:`das Auge`,translation:`eye`,article:`das`,level:`A2`,category:`Health`,createdAt:Date.now()},{id:`w95`,german:`das Ohr`,translation:`ear`,article:`das`,level:`A2`,category:`Health`,createdAt:Date.now()},{id:`w96`,german:`die Krankheit`,translation:`illness`,article:`die`,level:`A2`,category:`Health`,createdAt:Date.now()},{id:`w97`,german:`der Schmerz`,translation:`pain`,article:`der`,level:`A2`,category:`Health`,createdAt:Date.now()},{id:`w98`,german:`das Fieber`,translation:`fever`,article:`das`,level:`A2`,category:`Health`,createdAt:Date.now()},{id:`w99`,german:`das Medikament`,translation:`medication`,article:`das`,level:`A2`,category:`Health`,createdAt:Date.now()},{id:`w100`,german:`die Apotheke`,translation:`pharmacy`,article:`die`,level:`A2`,category:`Health`,createdAt:Date.now()},{id:`w101`,german:`das Krankenhaus`,translation:`hospital`,article:`das`,level:`A2`,category:`Health`,createdAt:Date.now()},{id:`w102`,german:`der Patient`,translation:`patient`,article:`der`,level:`A2`,category:`Health`,createdAt:Date.now()},{id:`w103`,german:`gesund`,translation:`healthy`,article:``,level:`A2`,category:`Health`,createdAt:Date.now()},{id:`w104`,german:`ja`,translation:`yes`,article:``,level:`A1`,category:`Common`,createdAt:Date.now()},{id:`w105`,german:`nein`,translation:`no`,article:``,level:`A1`,category:`Common`,createdAt:Date.now()},{id:`w106`,german:`vielleicht`,translation:`maybe`,article:``,level:`A1`,category:`Common`,createdAt:Date.now()},{id:`w107`,german:`und`,translation:`and`,article:``,level:`A1`,category:`Common`,createdAt:Date.now()},{id:`w108`,german:`oder`,translation:`or`,article:``,level:`A1`,category:`Common`,createdAt:Date.now()},{id:`w109`,german:`aber`,translation:`but`,article:``,level:`A1`,category:`Common`,createdAt:Date.now()},{id:`w110`,german:`ich`,translation:`I`,article:``,level:`A1`,category:`Common`,createdAt:Date.now()},{id:`w111`,german:`du`,translation:`you (informal)`,article:``,level:`A1`,category:`Common`,createdAt:Date.now()},{id:`w112`,german:`er`,translation:`he`,article:``,level:`A1`,category:`Common`,createdAt:Date.now()},{id:`w113`,german:`sie`,translation:`she`,article:``,level:`A1`,category:`Common`,createdAt:Date.now()},{id:`w114`,german:`es`,translation:`it`,article:``,level:`A1`,category:`Common`,createdAt:Date.now()},{id:`w115`,german:`wir`,translation:`we`,article:``,level:`A1`,category:`Common`,createdAt:Date.now()},{id:`w116`,german:`ihr`,translation:`you (plural)`,article:``,level:`A1`,category:`Common`,createdAt:Date.now()},{id:`w117`,german:`heute`,translation:`today`,article:``,level:`A1`,category:`Common`,createdAt:Date.now()},{id:`w118`,german:`morgen`,translation:`tomorrow`,article:``,level:`A1`,category:`Common`,createdAt:Date.now()},{id:`w119`,german:`gestern`,translation:`yesterday`,article:``,level:`A1`,category:`Common`,createdAt:Date.now()},{id:`w120`,german:`jetzt`,translation:`now`,article:``,level:`A1`,category:`Common`,createdAt:Date.now()},{id:`w121`,german:`hier`,translation:`here`,article:``,level:`A1`,category:`Common`,createdAt:Date.now()},{id:`w122`,german:`dort`,translation:`there`,article:``,level:`A1`,category:`Common`,createdAt:Date.now()},{id:`w123`,german:`gut`,translation:`good`,article:``,level:`A1`,category:`Common`,createdAt:Date.now()}],t=[{id:`lesson-1`,title:`Greetings and Farewells`,description:`Basic greetings and goodbye phrases`,category:`Basics`,level:`A1`,wordIds:[`w1`,`w2`,`w3`,`w4`,`w5`,`w6`,`w7`,`w8`],order:1},{id:`lesson-2`,title:`Numbers`,description:`Numbers from 1 to 10`,category:`Basics`,level:`A1`,wordIds:[`w9`,`w10`,`w11`,`w12`,`w13`,`w14`,`w15`,`w16`,`w17`,`w18`],order:2},{id:`lesson-3`,title:`Family and Relationships`,description:`Family members and relationships`,category:`Personal`,level:`A1`,wordIds:[`w19`,`w20`,`w21`,`w22`,`w23`,`w24`,`w25`,`w26`,`w27`,`w28`],order:3},{id:`lesson-4`,title:`Food and Drink`,description:`Food, beverages and meals`,category:`Food`,level:`A1`,wordIds:[`w29`,`w30`,`w31`,`w32`,`w33`,`w34`,`w35`,`w36`,`w37`,`w38`,`w39`,`w40`,`w41`,`w42`,`w43`],order:4},{id:`lesson-5`,title:`Shopping`,description:`At the supermarket and market`,category:`Shopping`,level:`A1`,wordIds:[`w44`,`w45`,`w46`,`w47`,`w48`,`w49`,`w50`,`w51`,`w52`,`w53`,`w54`,`w55`,`w56`,`w57`,`w58`],order:5},{id:`lesson-6`,title:`Travel and Transport`,description:`Train station, airport, public transport`,category:`Travel`,level:`A2`,wordIds:[`w59`,`w60`,`w61`,`w62`,`w63`,`w64`,`w65`,`w66`,`w67`,`w68`,`w69`,`w70`,`w71`,`w72`,`w73`],order:6},{id:`lesson-7`,title:`Work and Profession`,description:`Jobs, workplace, business language`,category:`Work`,level:`A2`,wordIds:[`w74`,`w75`,`w76`,`w77`,`w78`,`w79`,`w80`,`w81`,`w82`,`w83`,`w84`,`w85`,`w86`,`w87`,`w88`],order:7},{id:`lesson-8`,title:`Health`,description:`Body, illnesses, at the doctor`,category:`Health`,level:`A2`,wordIds:[`w89`,`w90`,`w91`,`w92`,`w93`,`w94`,`w95`,`w96`,`w97`,`w98`,`w99`,`w100`,`w101`,`w102`,`w103`],order:8},{id:`lesson-9`,title:`Common Words`,description:`Essential everyday words`,category:`Common`,level:`A1`,wordIds:[`w104`,`w105`,`w106`,`w107`,`w108`,`w109`,`w110`,`w111`,`w112`,`w113`,`w114`,`w115`,`w116`,`w117`,`w118`,`w119`,`w120`,`w121`,`w122`,`w123`],order:9}],n=[{id:`glossary-1`,term:`Hallo`,translation:`Hello`,explanation:`Informal greeting used throughout the day. Can be used with friends, family, and peers.`,examples:[`Hallo Maria!`,`Hallo, wie geht es dir?`],level:`A1`,category:`Greetings`},{id:`glossary-2`,term:`Guten Morgen`,translation:`Good morning`,explanation:`Formal greeting used until about 11 AM. More formal than "Hallo".`,examples:[`Guten Morgen, Herr Müller!`,`Guten Morgen zusammen!`],level:`A1`,category:`Greetings`},{id:`glossary-3`,term:`Guten Tag`,translation:`Good day`,explanation:`Formal greeting used from late morning until early evening (approximately 11 AM - 6 PM).`,examples:[`Guten Tag, kann ich Ihnen helfen?`,`Guten Tag, Frau Schmidt!`],level:`A1`,category:`Greetings`},{id:`glossary-4`,term:`Auf Wiedersehen`,translation:`Goodbye`,explanation:`Formal farewell. Literally means "until we see again". Used in formal situations.`,examples:[`Auf Wiedersehen, Herr Doktor!`,`Ich wünsche Ihnen einen schönen Tag. Auf Wiedersehen!`],level:`A1`,category:`Farewells`},{id:`glossary-5`,term:`Tschüss`,translation:`Bye`,explanation:`Informal farewell used with friends, family, and people you know well.`,examples:[`Tschüss, bis morgen!`,`Tschüss, mach es gut!`],level:`A1`,category:`Farewells`},{id:`glossary-6`,term:`Danke`,translation:`Thank you`,explanation:`Expression of gratitude. Can be intensified with "schön" or "vielen".`,examples:[`Danke schön!`,`Vielen Dank für deine Hilfe!`,`Danke, das ist sehr nett.`],level:`A1`,category:`Polite Expressions`},{id:`glossary-7`,term:`Bitte`,translation:`Please / You're welcome`,explanation:`Multi-purpose word: used for "please", "you're welcome", and when offering something.`,examples:[`Bitte schön!`,`Kann ich haben...? - Bitte!`,`Bitte, nimm Platz!`],level:`A1`,category:`Polite Expressions`},{id:`glossary-8`,term:`der`,translation:`the (masculine)`,explanation:`Definite article for masculine nouns in nominative case. Changes to "den" in accusative.`,examples:[`der Mann`,`der Tisch`,`der Apfel`],level:`A1`,category:`Articles`},{id:`glossary-9`,term:`die`,translation:`the (feminine/plural)`,explanation:`Definite article for feminine nouns (singular) and all plural nouns.`,examples:[`die Frau`,`die Banane`,`die Kinder (plural)`],level:`A1`,category:`Articles`},{id:`glossary-10`,term:`das`,translation:`the (neuter)`,explanation:`Definite article for neuter nouns in nominative and accusative cases.`,examples:[`das Kind`,`das Brot`,`das Wasser`],level:`A1`,category:`Articles`}],r=[{id:`grammar-1`,title:`Articles: der, die, das`,description:`German has three grammatical genders: masculine (der), feminine (die), and neuter (das).`,level:`A1`,category:`Grammar Basics`,examples:[{german:`der Mann`,english:`the man`,explanation:`Masculine noun`},{german:`die Frau`,english:`the woman`,explanation:`Feminine noun`},{german:`das Kind`,english:`the child`,explanation:`Neuter noun`}]},{id:`grammar-2`,title:`Present Tense Conjugation`,description:`Regular verbs are conjugated by removing -en and adding personal endings.`,level:`A1`,category:`Verbs`,examples:[{german:`ich lerne`,english:`I learn`,explanation:`1st person singular`},{german:`du lernst`,english:`you learn`,explanation:`2nd person singular`},{german:`er/sie/es lernt`,english:`he/she/it learns`,explanation:`3rd person singular`},{german:`wir lernen`,english:`we learn`,explanation:`1st person plural`},{german:`ihr lernt`,english:`you (pl.) learn`,explanation:`2nd person plural`},{german:`sie/Sie lernen`,english:`they/you (formal) learn`,explanation:`3rd person plural / formal`}]},{id:`grammar-3`,title:`Sentence Structure`,description:`German word order: The verb is always in the second position in main clauses.`,level:`A1`,category:`Grammar Basics`,examples:[{german:`Ich lerne Deutsch.`,english:`I learn German.`,explanation:`Standard word order`},{german:`Heute lerne ich Deutsch.`,english:`Today I learn German.`,explanation:`Time first, then verb, then subject`},{german:`Deutsch lerne ich heute.`,english:`German I learn today.`,explanation:`Object first for emphasis`}]},{id:`grammar-4`,title:`Plural Forms`,description:`German nouns have different plural endings: -e, -er, -en, -s, or no change.`,level:`A1`,category:`Nouns`,examples:[{german:`der Apfel → die Äpfel`,english:`the apple → the apples`,explanation:`Umlaut + -er`},{german:`die Banane → die Bananen`,english:`the banana → the bananas`,explanation:`-en ending`},{german:`das Auto → die Autos`,english:`the car → the cars`,explanation:`-s ending`}]},{id:`grammar-5`,title:`Cases: Nominative, Accusative, Dative`,description:`German has four cases. The case determines the article and adjective endings.`,level:`A2`,category:`Grammar Basics`,examples:[{german:`Der Mann ist hier. (Nominative)`,english:`The man is here.`,explanation:`Subject`},{german:`Ich sehe den Mann. (Accusative)`,english:`I see the man.`,explanation:`Direct object`},{german:`Ich helfe dem Mann. (Dative)`,english:`I help the man.`,explanation:`Indirect object`}]}],i=[{id:`streak-1`,title:`Getting Started`,description:`Learn for 1 day in a row`,icon:`🌱`,condition:e=>e.currentStreak>=1,unlocked:!1,category:`streak`},{id:`streak-3`,title:`On Fire`,description:`3 day streak`,icon:`🔥`,condition:e=>e.currentStreak>=3,unlocked:!1,category:`streak`},{id:`streak-7`,title:`Week Warrior`,description:`7 day streak`,icon:`⚔️`,condition:e=>e.currentStreak>=7,unlocked:!1,category:`streak`},{id:`streak-30`,title:`Monthly Master`,description:`30 day streak`,icon:`👑`,condition:e=>e.currentStreak>=30,unlocked:!1,category:`streak`},{id:`learn-10`,title:`First Steps`,description:`Learn 10 words`,icon:`📚`,condition:e=>e.totalWordsLearned>=10,unlocked:!1,category:`learning`},{id:`learn-25`,title:`Vocabulary Builder`,description:`Learn 25 words`,icon:`📖`,condition:e=>e.totalWordsLearned>=25,unlocked:!1,category:`learning`},{id:`learn-50`,title:`Word Collector`,description:`Learn 50 words`,icon:`🎯`,condition:e=>e.totalWordsLearned>=50,unlocked:!1,category:`learning`},{id:`learn-100`,title:`Century Club`,description:`Learn 100 words`,icon:`💯`,condition:e=>e.totalWordsLearned>=100,unlocked:!1,category:`learning`},{id:`quiz-1`,title:`First Quiz`,description:`Complete your first quiz`,icon:`✅`,condition:e=>e.totalQuizCount>=1,unlocked:!1,category:`quiz`},{id:`quiz-10`,title:`Quiz Enthusiast`,description:`Complete 10 quizzes`,icon:`🎮`,condition:e=>e.totalQuizCount>=10,unlocked:!1,category:`quiz`},{id:`quiz-50`,title:`Quiz Master`,description:`Complete 50 quizzes`,icon:`🏆`,condition:e=>e.totalQuizCount>=50,unlocked:!1,category:`quiz`},{id:`accuracy-50`,title:`Halfway There`,description:`Achieve 50% average accuracy`,icon:`🎯`,condition:e=>e.averageAccuracy>=50,unlocked:!1,category:`accuracy`},{id:`accuracy-75`,title:`Sharp Shooter`,description:`Achieve 75% average accuracy`,icon:`🏹`,condition:e=>e.averageAccuracy>=75,unlocked:!1,category:`accuracy`},{id:`accuracy-90`,title:`Perfect Student`,description:`Achieve 90% average accuracy`,icon:`⭐`,condition:e=>e.averageAccuracy>=90,unlocked:!1,category:`accuracy`},{id:`special-perfect`,title:`Flawless Victory`,description:`Get 100% on a quiz with 10+ questions`,icon:`✨`,condition:e=>e.quizHistory.some(e=>e.accuracy===100&&e.total>=10),unlocked:!1,category:`special`},{id:`special-comeback`,title:`Comeback Kid`,description:`Get 100% on a quiz after scoring below 50%`,icon:`🦄`,condition:e=>{let t=e.quizHistory.some(e=>e.accuracy<50),n=e.quizHistory.some(e=>e.accuracy===100);return t&&n},unlocked:!1,category:`special`},{id:`special-marathon`,title:`Marathon Runner`,description:`Complete a 20-question quiz`,icon:`🏃`,condition:e=>e.quizHistory.some(e=>e.total>=20),unlocked:!1,category:`special`}],a=`learning-german-state`,o={totalWordsLearned:0,wordsByLevel:{A1:0,A2:0,B1:0,B2:0,C1:0,C2:0},currentStreak:0,longestStreak:0,totalQuizCount:0,averageAccuracy:0,lastActive:Date.now(),dailyGoal:10,todayLearned:0};function s(){let e=localStorage.getItem(a);if(e){let t=JSON.parse(e);return{...t,achievements:i.map(e=>({...e,unlocked:t.achievements?.find(t=>t.id===e.id)?.unlocked||!1,unlockedAt:t.achievements?.find(t=>t.id===e.id)?.unlockedAt}))}}return{progress:o,quizHistory:[],learnedWordIds:[],lastActive:Date.now(),streak:0,achievements:i.map(e=>({...e,unlocked:!1}))}}function c(e){localStorage.setItem(a,JSON.stringify(e)),d()}function l(e){let t=!1,n={...e.progress,quizHistory:e.quizHistory};e.achievements.forEach(e=>{!e.unlocked&&e.condition(n)&&(e.unlocked=!0,e.unlockedAt=Date.now(),u(e),t=!0)}),t&&c(e)}function u(e){let t=document.createElement(`div`);t.className=`achievement-notification`,t.innerHTML=`
    <div class="achievement-content">
      <span class="achievement-icon">${e.icon}</span>
      <div class="achievement-text">
        <strong>Achievement Unlocked!</strong>
        <p>${e.title}</p>
      </div>
    </div>
  `,document.body.appendChild(t),setTimeout(()=>t.classList.add(`show`),100),setTimeout(()=>{t.classList.remove(`show`),setTimeout(()=>t.remove(),300)},3e3)}function d(){let e=document.getElementById(`achievements-list`);if(!e)return;let t=f,n=t.achievements.filter(e=>e.unlocked),r=t.achievements.filter(e=>!e.unlocked);e.innerHTML=`
    ${n.length===0?`<p class="no-achievements">No achievements yet. Keep learning!</p>`:``}
    <div class="achievements-grid">
      ${n.map(e=>`
        <div class="achievement-card unlocked" title="${e.description}\nUnlocked: ${e.unlockedAt?new Date(e.unlockedAt).toLocaleDateString():``}">
          <span class="achievement-icon">${e.icon}</span>
          <span class="achievement-title">${e.title}</span>
        </div>
      `).join(``)}
      ${r.map(e=>`
        <div class="achievement-card locked" title="${e.description}">
          <span class="achievement-icon">🔒</span>
          <span class="achievement-title">${e.title}</span>
        </div>
      `).join(``)}
    </div>
  `}var f=s();function p(t,n){if(n&&!f.learnedWordIds.includes(t)){f.learnedWordIds.push(t);let n=e.find(e=>e.id===t);n&&(f.progress.totalWordsLearned=f.learnedWordIds.length,f.progress.wordsByLevel[n.level]=(f.progress.wordsByLevel[n.level]||0)+1,f.progress.todayLearned++),c(f)}}function m(n,r=10){let i=n?e.filter(e=>t.find(e=>e.id===n)?.wordIds.includes(e.id)):e;return[...i].sort(()=>Math.random()-.5).slice(0,Math.min(r,i.length)).map(t=>{let n=Math.random()>.5,r=e.filter(e=>e.id!==t.id).sort(()=>Math.random()-.5).slice(0,3).map(e=>e.german);return{word:t,type:n?`multiple-choice`:`write`,options:n?[...r,t.german].sort(()=>Math.random()-.5):void 0,correctAnswer:t.german}})}var h=[],g=0,_=0;function v(e){let t=document.getElementById(`quiz-count`);h=m(e,parseInt(t?.value||`10`)),g=0,_=0,document.getElementById(`quiz-overlay`)?.classList.remove(`hidden`),y()}function y(){let e=h[g],t=document.getElementById(`quiz-content`),n=document.querySelector(`.quiz-progress`);if(!(!t||!e))if(n&&(n.textContent=`Question ${g+1}/${h.length}`),e.type===`multiple-choice`&&e.options)t.innerHTML=`
      <div class="question">
        <button class="speak-btn" onclick="speakWord('${e.word.german.replace(/'/g,`\\'`)}')" title="Listen to pronunciation">🔊</button>
        <p class="question-word">${e.word.translation}</p>
        ${e.word.article?`<p class="question-article">${e.word.article}</p>`:``}
        <div class="options">
          ${e.options.map(e=>`<button class="option-btn" data-answer="${e}">${e}</button>`).join(``)}
        </div>
      </div>
    `,t.querySelectorAll(`.option-btn`).forEach(t=>{t.addEventListener(`click`,t=>{let n=t.target.dataset.answer;b(n||``,e)})});else{t.innerHTML=`
      <div class="question">
        <button class="speak-btn" onclick="speakWord('${e.word.german.replace(/'/g,`\\'`)}')" title="Listen to pronunciation">🔊</button>
        <p class="question-word">${e.word.translation}</p>
        ${e.word.article?`<p class="question-article">${e.word.article}</p>`:``}
        <input type="text" class="write-answer" placeholder="Your answer..." />
        <button class="btn primary submit-answer">Check Answer</button>
      </div>
    `;let n=t.querySelector(`.write-answer`);t.querySelector(`.submit-answer`)?.addEventListener(`click`,()=>b(n.value.trim(),e)),n?.addEventListener(`keypress`,t=>{t.key===`Enter`&&b(n.value.trim(),e)})}}function b(e,t){let n=e.toLowerCase()===t.correctAnswer.toLowerCase();n&&(_++,p(t.word.id,!0),l(f));let r=document.getElementById(`quiz-content`);r&&(r.innerHTML=`
    <div class="feedback ${n?`correct`:`incorrect`}">
      <p class="feedback-icon">${n?`✅`:`❌`}</p>
      <p class="feedback-text">${n?`Correct!`:`Wrong! The correct answer was: ${t.correctAnswer}`}</p>
      <button class="speak-btn speak-correct" onclick="speakWord('${t.correctAnswer.replace(/'/g,`\\'`)}')" title="Listen to pronunciation">🔊 ${t.correctAnswer}</button>
      <button class="btn primary next-question">Next</button>
    </div>
  `,r.querySelector(`.next-question`)?.addEventListener(`click`,()=>{g++,g>=h.length?x():y()}))}function x(){let e=_/h.length*100;f.quizHistory.push({lessonId:`general`,correct:_,total:h.length,accuracy:e,completedAt:Date.now(),timeSpent:0}),f.progress.totalQuizCount++,f.progress.averageAccuracy=f.quizHistory.reduce((e,t)=>e+t.accuracy,0)/f.quizHistory.length,c(f),l(f);let t=document.getElementById(`quiz-content`);t&&(t.innerHTML=`
    <div class="quiz-results">
      <h2>Quiz Complete! 🎉</h2>
      <div class="results-summary">
        <div class="result-item">
          <span class="result-value">${_}/${h.length}</span>
          <span class="result-label">Correct Answers</span>
        </div>
        <div class="result-item">
          <span class="result-value">${Math.round(e)}%</span>
          <span class="result-label">Accuracy</span>
        </div>
      </div>
      <button class="btn primary" onclick="closeQuiz()">Back to Dashboard</button>
    </div>
  `)}function S(){document.getElementById(`quiz-overlay`)?.classList.add(`hidden`),w()}function C(e){document.querySelectorAll(`.tab`).forEach(e=>e.classList.remove(`active`)),document.querySelectorAll(`[data-tab="${e}"]`).forEach(e=>e.classList.add(`active`)),document.querySelectorAll(`.tab-content`).forEach(e=>e.classList.add(`hidden`)),document.getElementById(`${e}-tab`)?.classList.remove(`hidden`)}function w(){let e=document.querySelector(`#app`),i=new Date().toDateString(),a=new Date(f.lastActive).toDateString();i!==a&&(f.streak=a===new Date(Date.now()-864e5).toDateString()?f.streak+1:0,f.lastActive=Date.now(),c(f));let o=Math.min(f.progress.todayLearned/f.progress.dailyGoal*100,100);e.innerHTML=`
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
      <button class="tab" data-tab="achievements">Achievements</button>
      </nav>
      
      <main class="tab-content" id="dashboard-tab">
        <section class="stats-grid">
          <div class="stat-card">
            <div class="stat-value">${f.progress.totalWordsLearned}</div>
            <div class="stat-label">Words Learned</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">🔥 ${f.streak}</div>
            <div class="stat-label">Day Streak</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${f.progress.totalQuizCount}</div>
            <div class="stat-label">Quizzes Completed</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${Math.round(f.progress.averageAccuracy)}%</div>
            <div class="stat-label">Ø Accuracy</div>
          </div>
        </section>
        
        <section class="daily-goal">
          <h2>Daily Goal</h2>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${o}%"></div>
          </div>
          <p>${f.progress.todayLearned} / ${f.progress.dailyGoal} words today</p>
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
            ${Object.entries(f.progress.wordsByLevel).map(([e,t])=>`
              <li><span class="level-badge">${e}</span> ${t} words</li>
            `).join(``)}
          </ul>
          <h3>Recent Quizzes</h3>
          <div class="quiz-history">
            ${f.quizHistory.slice(-5).reverse().map(e=>`
              <div class="quiz-result">
                <span>${new Date(e.completedAt).toLocaleDateString()}</span>
                <span>${e.correct}/${e.total} correct</span>
                <span>${Math.round(e.accuracy)}%</span>
              </div>
            `).join(``)}
            ${f.quizHistory.length===0?`<p>No quizzes completed yet.</p>`:``}
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
      
      <main class="tab-content hidden" id="achievements-tab">
        <h2>Achievements</h2>
        <div class="achievements-summary">
          <div class="achievement-stat">
            <span class="stat-number">${f.achievements.filter(e=>e.unlocked).length}</span>
            <span class="stat-label">Unlocked</span>
          </div>
          <div class="achievement-stat">
            <span class="stat-number">${f.achievements.length}</span>
            <span class="stat-label">Total</span>
          </div>
        </div>
        <div class="achievements-list" id="achievements-list"></div>
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
  `,d(),document.querySelectorAll(`.tab`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.target.dataset.tab;t&&C(t)})})}window.startQuiz=v,window.closeQuiz=S,window.showTab=C,window.speakWord=T;function T(e){if(`speechSynthesis`in window){let t=new SpeechSynthesisUtterance(e);t.lang=`de-DE`,t.rate=.8,t.pitch=1,speechSynthesis.speak(t)}else alert(`Speech synthesis not supported in this browser.`)}window.filterGlossary=E;function E(){let e=document.getElementById(`glossary-search-input`).value.toLowerCase();document.querySelectorAll(`.glossary-card`).forEach(t=>{let n=t.getAttribute(`data-term`)||``;t.classList.toggle(`hidden`,!n.includes(e))})}function D(){w()}D();