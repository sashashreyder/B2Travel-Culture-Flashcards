const data = [
  {
    word: 'itinerary',
    prompt: 'Our ___ includes hiking and local food tours.',
    answer: 'itinerary',
    hint: 'trip schedule'
  },
  {
    word: 'accommodation',
    prompt: 'They booked their ___ months in advance.',
    answer: 'accommodation',
    hint: 'place to stay'
  },
  {
    word: 'landmark',
    prompt: 'The Colosseum is a famous Roman ___.',
    answer: 'landmark',
    hint: 'famous site'
  },
  {
    word: 'visa',
    prompt: 'Did you get your ___ for Japan yet?',
    answer: 'visa',
    hint: 'travel permission'
  },
  {
    word: 'wanderlust',
    prompt: 'Her ___ has taken her across five continents.',
    answer: 'wanderlust',
    hint: 'desire to travel'
  },
  {
    word: 'jet lag',
    prompt: 'I’m still tired — this ___ is no joke.',
    answer: 'jet lag',
    hint: 'time zone fatigue'
  },
  {
    word: 'backpacking',
    prompt: 'He spent the summer ___ around South America.',
    answer: 'backpacking',
    hint: 'budget travel'
  },
  {
    word: 'immigration',
    prompt: 'They asked questions during the ___ check.',
    answer: 'immigration',
    hint: 'border process'
  },
  {
    word: 'sightseeing',
    prompt: 'We’ve done a lot of ___ this week in Lisbon.',
    answer: 'sightseeing',
    hint: 'visiting places'
  },
  {
    word: 'cuisine',
    prompt: 'We’ve tried almost every type of local ___.',
    answer: 'cuisine',
    hint: 'regional food'
  }
];

let current = 0;
let score   = 0;

const container = document.querySelector('.card-container');

/* ---------- RENDER CARD ---------- */
function renderCard(idx) {
  const { prompt, hint } = data[idx];

  container.innerHTML = `
    <div class="card">
      <h2>${idx + 1}/${data.length}</h2>
      <p>${prompt}</p>

      <div class="input-wrap">
        <input type="text" id="answerInput" placeholder="Type your answer" />
        <span class="qmark" data-tip="${hint}">?</span>
      </div>

      <div class="button-row">
        <button id="submitBtn" class="btn">Submit</button>
        <button id="nextBtn" class="btn next">→</button>
      </div>

      <p class="feedback" id="feedback"></p>
    </div>`;

  // focus removed to prevent page jump
  // document.getElementById('answerInput').focus();

  document.getElementById('submitBtn').addEventListener('click', checkAnswer);
  document.getElementById('nextBtn').addEventListener('click', nextCard);

  // Mobile tooltip toggle
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
    const qmark = document.querySelector('.qmark');
    qmark.addEventListener('click', e => {
      document.querySelectorAll('.qmark').forEach(t => {
        if (t !== e.target) t.classList.remove('active');
      });
      qmark.classList.toggle('active');
    });
  }

  // Enter key logic
  const input = document.getElementById('answerInput');
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const feedback = document.getElementById('feedback');
      const nextBtn = document.getElementById('nextBtn');
      if (feedback.textContent) {
        nextCard();
      } else {
        checkAnswer();
      }
    }
  });
}

/* ---------- CHECK ---------- */
function checkAnswer() {
  const inp = document.getElementById('answerInput');
  const fb  = document.getElementById('feedback');
  if (!inp || fb.textContent) return; // prevent double scoring

  const user    = inp.value.trim().toLowerCase();
  const correct = data[current].answer.toLowerCase();

  fb.textContent = user === correct ? '✓ Correct!' : `✗ ${correct}`;
  fb.className   = 'feedback ' + (user === correct ? 'correct' : 'incorrect');
  if (user === correct) score++;

  document.getElementById('nextBtn').classList.add('show');
}

/* ---------- RESULT ---------- */
function showResult() {
  const msg =
    score <= 5 ? '😅 Try again!' :
    score <= 7 ? '👍 Not bad — you can do better!' :
    score <= 9 ? '✅ Well done!' :
                 '🌟 You\'re a pro!';

  container.innerHTML = `
    <div class="card result-card">
      <img src="mascot-result-unscreen.gif" alt="Mascot" class="mascot-gif" />
      <h2>${msg}</h2>
      <p>You got&nbsp;<strong>${score}</strong>&nbsp;out of&nbsp;<strong>${data.length}</strong>&nbsp;correct.</p>
      <button id="restartBtn" class="btn">🔁 Try Again</button>
    </div>`;

  document.getElementById('restartBtn').addEventListener('click', () => {
    current = 0;
    score   = 0;
    renderCard(current);
  });
}

/* ---------- NEXT ---------- */
function nextCard() {
  current++;
  current < data.length ? renderCard(current) : showResult();
}

/* ---------- INIT ---------- */
renderCard(current);














