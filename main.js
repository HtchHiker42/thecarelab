/* ============================================================
   THE CARE LAB — carelab.js
   Vanilla JS · No dependencies
   ============================================================ */

'use strict';

// ── DATA ─────────────────────────────────────────────────────
const LANGUAGES = [
  {
    id: 'maori',
    name: 'Te Reo Māori',
    region: 'Aotearoa New Zealand',
    flag: '🇳🇿',
    speakers: '~185,000 speakers',
    status: 'Vulnerable',
    task: 'Listen carefully. Transcribe the sounds you hear using IPA symbols.',
    word: 'Whānau',
    meaning: '"Family / Extended family"',
    ipa: '/faːnaʊ/',
    hint: 'In Māori, "wh" is pronounced like "f". The ā is a long vowel — use ː to mark length. Listen for the diphthong at the end.',
    fact: 'Te Reo Māori was nearly silenced after colonisation made English compulsory in schools. Since the 1970s, Māori communities have fought for their language through Kōhanga Reo (language nests) — immersive preschools where children grow up hearing only Māori. Today it is an official language of New Zealand.',
    learnMore: 'https://en.wikipedia.org/wiki/M%C4%81ori_language',
    speechText: 'Faah nau',
    speechLang: 'en-NZ',
    audioFile: 'audio/maori_whanau.mp3', // swap in a real file here
  },
  {
    id: 'nahuatl',
    name: 'Nāhuatl',
    region: 'Central Mexico',
    flag: '🇲🇽',
    speakers: '~1.7 million speakers',
    status: 'Vulnerable',
    task: 'This word gave English "chocolate", "avocado", and "tomato". Transcribe what you hear.',
    word: 'Xocolātl',
    meaning: '"Bitter water" (origin of "chocolate")',
    ipa: '/ʃokoˈlaːtɬ/',
    hint: 'The "x" sounds like "sh". The final "tl" is a lateral affricate — a single sound, written ɬ or tɬ in IPA. The ā is long.',
    fact: 'Nahuatl was the language of the Aztec Empire and is still spoken by 1.7 million people across Mexico, making it the most widely spoken indigenous language in the country. Dozens of everyday English words come from Nahuatl — including tomato (tomatl), avocado (āhuacatl), and coyote (coyōtl).',
    learnMore: 'https://en.wikipedia.org/wiki/Nahuatl',
    speechText: 'Sho ko la tl',
    speechLang: 'es-MX',
    audioFile: 'audio/nahuatl_xocolatl.mp3',
  },
  {
    id: 'yoruba',
    name: 'Yorùbá',
    region: 'Nigeria, Benin, Togo',
    flag: '🇳🇬',
    speakers: '~45 million speakers',
    status: 'Safe but under pressure',
    task: 'Yorùbá is a tonal language — the same syllable means different things at different pitches. Try to capture the tones with IPA tone marks.',
    word: 'Ẹ káàbọ̀',
    meaning: '"Welcome"',
    ipa: '/ɛ̀ káàbɔ̀/',
    hint: 'Marks on vowels show tones: á = high tone, à = low tone, ā = mid. The ẹ sounds like the "e" in "bed". Try ɛ for that sound.',
    fact: 'Yorùbá is spoken by around 45 million people — but linguists worry that urban children are growing up preferring English or Nigerian Pidgin. Tonal languages like Yorùbá are especially vulnerable because even near-native speakers sometimes lose the tonal distinctions, changing word meanings entirely. The same syllable "ọkọ" means "husband", "car", or "hoe" depending on tone.',
    learnMore: 'https://en.wikipedia.org/wiki/Yoruba_language',
    speechText: 'Eh kaa bo',
    speechLang: 'yo',
    audioFile: 'audio/yoruba_welcome.mp3',
  },
];

const IPA_KEYS = {
  vowels: [
    { sym: 'i', desc: 'Close front unrounded — "see"' },
    { sym: 'ɪ', desc: 'Near-close front — "bit"' },
    { sym: 'e', desc: 'Close-mid front — "say" (no glide)' },
    { sym: 'ɛ', desc: 'Open-mid front — "bed"' },
    { sym: 'æ', desc: 'Near-open front — "cat"' },
    { sym: 'a', desc: 'Open front — "father"' },
    { sym: 'ɑ', desc: 'Open back — British "bath"' },
    { sym: 'ɒ', desc: 'Open back rounded — British "lot"' },
    { sym: 'ɔ', desc: 'Open-mid back — "thought"' },
    { sym: 'o', desc: 'Close-mid back — "go" (no glide)' },
    { sym: 'ʊ', desc: 'Near-close back — "foot"' },
    { sym: 'u', desc: 'Close back — "food"' },
    { sym: 'ʌ', desc: 'Open-mid back unrounded — "cup"' },
    { sym: 'ə', desc: 'Schwa — "about" (unstressed)' },
    { sym: 'ɜ', desc: 'Open-mid central — "bird"' },
    { sym: 'y', desc: 'Close front rounded — French "tu"' },
    { sym: 'ø', desc: 'Close-mid front rounded — French "feu"' },
    { sym: 'œ', desc: 'Open-mid front rounded — French "peur"' },
    { sym: 'ɨ', desc: 'Close central — Russian "ты"' },
    { sym: 'ɵ', desc: 'Close-mid central rounded' },
  ],
  consonants: [
    { sym: 'p', desc: 'Voiceless bilabial stop — "pat"' },
    { sym: 'b', desc: 'Voiced bilabial stop — "bat"' },
    { sym: 't', desc: 'Voiceless alveolar stop — "top"' },
    { sym: 'd', desc: 'Voiced alveolar stop — "dog"' },
    { sym: 'k', desc: 'Voiceless velar stop — "cat"' },
    { sym: 'g', desc: 'Voiced velar stop — "go"' },
    { sym: 'ʔ', desc: 'Glottal stop — "uh-oh"' },
    { sym: 'm', desc: 'Bilabial nasal — "man"' },
    { sym: 'n', desc: 'Alveolar nasal — "no"' },
    { sym: 'ŋ', desc: 'Velar nasal — "sing"' },
    { sym: 'ɲ', desc: 'Palatal nasal — Spanish "ñ"' },
    { sym: 'f', desc: 'Voiceless labiodental fricative — "fat"' },
    { sym: 'v', desc: 'Voiced labiodental fricative — "vat"' },
    { sym: 'θ', desc: 'Voiceless dental — "thin"' },
    { sym: 'ð', desc: 'Voiced dental — "this"' },
    { sym: 's', desc: 'Voiceless alveolar — "sit"' },
    { sym: 'z', desc: 'Voiced alveolar — "zip"' },
    { sym: 'ʃ', desc: 'Voiceless postalveolar — "ship"' },
    { sym: 'ʒ', desc: 'Voiced postalveolar — "measure"' },
    { sym: 'h', desc: 'Voiceless glottal — "hat"' },
    { sym: 'x', desc: 'Voiceless velar — Scottish "loch"' },
    { sym: 'ɣ', desc: 'Voiced velar — Spanish "lago" (between vowels)' },
    { sym: 'ç', desc: 'Voiceless palatal — German "ich"' },
    { sym: 'ħ', desc: 'Voiceless pharyngeal — Arabic "ح"' },
    { sym: 'r', desc: 'Alveolar trill — Spanish "perro"' },
    { sym: 'ɾ', desc: 'Alveolar tap — Spanish "pero"' },
    { sym: 'l', desc: 'Lateral approximant — "leg"' },
    { sym: 'j', desc: 'Palatal approximant — "yes"' },
    { sym: 'w', desc: 'Bilabial-velar approximant — "wet"' },
  ],
  special: [
    { sym: 'ʘ', desc: 'Bilabial click' },
    { sym: 'ǀ', desc: 'Dental click — "tsk tsk"' },
    { sym: 'ǃ', desc: 'Postalveolar click' },
    { sym: 'ǁ', desc: 'Lateral click' },
    { sym: 'ǂ', desc: 'Palatal click' },
    { sym: 'ɓ', desc: 'Voiced bilabial implosive' },
    { sym: 'ɗ', desc: 'Voiced alveolar implosive' },
    { sym: 'ɠ', desc: 'Voiced velar implosive' },
    { sym: 'ɬ', desc: 'Voiceless lateral fricative — Welsh "ll"' },
    { sym: 'ɮ', desc: 'Voiced lateral fricative' },
    { sym: 'tɬ', desc: 'Lateral affricate — Nahuatl "tl"' },
    { sym: 'tʃ', desc: 'Voiceless affricate — "church"' },
    { sym: 'dʒ', desc: 'Voiced affricate — "judge"' },
    { sym: 'ts', desc: 'Voiceless dental affricate — "bits"' },
    { sym: 'ʀ', desc: 'Uvular trill — French/German "r"' },
    { sym: 'χ', desc: 'Voiceless uvular — Arabic "خ"' },
  ],
  diacritics: [
    { sym: 'ː', desc: 'Long vowel — māori ā' },
    { sym: 'ˈ', desc: 'Primary stress' },
    { sym: 'ˌ', desc: 'Secondary stress' },
    { sym: '̃', desc: 'Nasalised — Portuguese ã' },
    { sym: 'ʰ', desc: 'Aspirated — Hindi ph' },
    { sym: 'ʷ', desc: 'Labialized' },
    { sym: 'ʲ', desc: 'Palatalized — Russian soft consonants' },
    { sym: '́', desc: 'High tone (combine with vowel: á)' },
    { sym: '̀', desc: 'Low tone (combine with vowel: à)' },
    { sym: '̂', desc: 'Falling tone (combine: â)' },
    { sym: '̌', desc: 'Rising tone (combine: ǎ)' },
    { sym: 'ā', desc: 'Mid tone / long vowel' },
    { sym: '/', desc: 'Open phonemic slash' },
    { sym: ']', desc: 'Close phonetic bracket' },
    { sym: '[', desc: 'Open phonetic bracket' },
    { sym: '.', desc: 'Syllable break' },
    { sym: '|', desc: 'Minor group boundary' },
    { sym: '↗', desc: 'Global rise' },
    { sym: '↘', desc: 'Global fall' },
  ],
};

// ── STATE ─────────────────────────────────────────────────────
const state = {
  nameA: '',
  nameB: '',
  currentLang: 0,      // 0-indexed
  currentTurn: 'A',    // 'A' or 'B'
  transcriptions: [],  // [{langId, nameA, transA, nameB, transB}]
  playsLeft: 5,
  synth: window.speechSynthesis,
  utterance: null,
  isPlaying: false,
  waveAnim: null,
  timer: null,
  elapsed: 0,
};

// ── DOM HELPERS ───────────────────────────────────────────────
const $ = (id) => document.getElementById(id);
const show = (el) => el && (el.hidden = false);
const hide = (el) => el && (el.hidden = true);

function goTo(screenId) {
  document.querySelectorAll('.screen').forEach((s) => {
    if (s.id === `screen-${screenId}`) {
      s.classList.remove('exit');
      s.classList.add('active');
    } else if (s.classList.contains('active')) {
      s.classList.add('exit');
      s.classList.remove('active');
      setTimeout(() => s.classList.remove('exit'), 400);
    }
  });
}

// ── SCREEN 1: WELCOME ─────────────────────────────────────────
$('btn-start').addEventListener('click', () => goTo('setup'));

// ── SCREEN 2: SETUP ───────────────────────────────────────────
$('back-from-setup').addEventListener('click', () => goTo('welcome'));

$('btn-to-tutorial').addEventListener('click', () => {
  const a = $('name-a').value.trim();
  const b = $('name-b').value.trim();
  state.nameA = a || 'Partner A';
  state.nameB = b || 'Partner B';
  goTo('tutorial');
});

// Allow Enter key in inputs
[$('name-a'), $('name-b')].forEach((el) => {
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') $('btn-to-tutorial').click();
  });
});

// ── SCREEN 3: TUTORIAL ────────────────────────────────────────
$('back-from-tutorial').addEventListener('click', () => goTo('setup'));
$('btn-skip-tutorial').addEventListener('click', startActivity);
$('btn-start-activity').addEventListener('click', startActivity);

// ── ACTIVITY ──────────────────────────────────────────────────
function startActivity() {
  state.currentLang = 0;
  state.currentTurn = 'A';
  state.transcriptions = [];
  loadActivity();
  goTo('activity');
}

function loadActivity() {
  const lang = LANGUAGES[state.currentLang];
  stopAudio();
  state.playsLeft = 5;
  state.elapsed = 0;
  clearInterval(state.timer);
  $('transcription-input').value = '';

  // Header
  const pct = ((state.currentLang) / LANGUAGES.length * 100);
  $('progress-bar').style.width = `${pct}%`;
  $('progress-bar').parentElement.setAttribute('aria-valuenow', state.currentLang + 1);
  $('lang-num').textContent = `Language ${state.currentLang + 1} of ${LANGUAGES.length}`;
  $('lang-name-header').textContent = lang.name;

  updateTurnUI();

  // Language card
  $('lang-flag').textContent = lang.flag;
  $('lang-title').textContent = lang.name;
  $('lang-region').textContent = lang.region;
  $('lang-speakers').textContent = lang.speakers;
  $('lang-status').textContent = lang.status;

  $('activity-prompt').textContent = lang.task;

  // Reset audio UI
  updateReplayUI();
  resetWaveform();
  $('audio-time').textContent = '0:00';
  $('demo-note').textContent = '🔊 Demo: uses browser speech synthesis (swap in real audio files via audioFile property)';

  // IPA keyboard — default tab
  activateTab('vowels');

  // Hint
  $('hint-text').textContent = lang.hint;
  $('hint-ipa').textContent = lang.ipa;
}

function updateTurnUI() {
  const isA = state.currentTurn === 'A';
  const name = isA ? state.nameA : state.nameB;
  $('turn-indicator').textContent = `${name}'s turn to transcribe`;
  $('transcribe-label').innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
    ${name}'s transcription:
  `;
  $('transcription-input').placeholder = `${name}, type here or tap IPA symbols below…`;

  const isLast = state.currentTurn === 'B';
  $('btn-next-label').textContent = isLast
    ? (state.currentLang < LANGUAGES.length - 1 ? 'Compare & see next →' : 'Compare & finish →')
    : `Done — pass to ${state.nameB} →`;
}

// ── AUDIO PLAYER ──────────────────────────────────────────────
$('play-btn').addEventListener('click', toggleAudio);
$('replay-btn').addEventListener('click', () => {
  stopAudio();
  playAudio();
});

function toggleAudio() {
  if (state.isPlaying) stopAudio();
  else playAudio();
}

function playAudio() {
  if (state.playsLeft <= 0) return;
  state.playsLeft--;
  updateReplayUI();

  const lang = LANGUAGES[state.currentLang];
  state.synth.cancel();

  const utter = new SpeechSynthesisUtterance(lang.speechText);
  utter.lang = lang.speechLang;
  utter.rate = 0.75;
  utter.pitch = 1;

  // Try to find a matching voice, fall back gracefully
  const voices = state.synth.getVoices();
  const match = voices.find(v => v.lang.startsWith(lang.speechLang.split('-')[0]));
  if (match) utter.voice = match;

  utter.onstart = () => {
    state.isPlaying = true;
    $('play-btn').classList.add('playing');
    showPlayIcon(false);
    startTimer();
    animateWaveform(true);
  };
  utter.onend = utter.onerror = () => {
    state.isPlaying = false;
    $('play-btn').classList.remove('playing');
    showPlayIcon(true);
    stopTimer();
    animateWaveform(false);
  };

  state.utterance = utter;
  state.synth.speak(utter);
}

function stopAudio() {
  state.synth.cancel();
  state.isPlaying = false;
  $('play-btn').classList.remove('playing');
  showPlayIcon(true);
  stopTimer();
  animateWaveform(false);
}

function showPlayIcon(showPlay) {
  $('play-btn').querySelector('.icon-play').style.display = showPlay ? '' : 'none';
  $('play-btn').querySelector('.icon-pause').style.display = showPlay ? 'none' : '';
}

function updateReplayUI() {
  const left = state.playsLeft;
  $('replay-count').textContent = left > 0 ? `${left} play${left !== 1 ? 's' : ''} remaining` : 'No plays left';
  $('replay-btn').disabled = left <= 0;
  $('play-btn').disabled = left <= 0;
  if (left <= 0) $('play-btn').style.opacity = '0.45';
  else $('play-btn').style.opacity = '';
}

// ── TIMER ─────────────────────────────────────────────────────
function startTimer() {
  clearInterval(state.timer);
  const start = Date.now() - state.elapsed * 1000;
  state.timer = setInterval(() => {
    state.elapsed = (Date.now() - start) / 1000;
    const s = Math.floor(state.elapsed % 60);
    const m = Math.floor(state.elapsed / 60);
    $('audio-time').textContent = `${m}:${s.toString().padStart(2, '0')}`;
  }, 250);
}
function stopTimer() {
  clearInterval(state.timer);
}

// ── WAVEFORM CANVAS ───────────────────────────────────────────
let waveAnimId = null;
const waveHeights = Array.from({ length: 28 }, () => 0.15 + Math.random() * 0.7);

function resetWaveform() {
  const canvas = $('waveform');
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth * window.devicePixelRatio || 200;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawWaveBars(ctx, canvas.width, canvas.height, waveHeights, 0);
}

function drawWaveBars(ctx, w, h, heights, phase) {
  ctx.clearRect(0, 0, w, h);
  const bars = heights.length;
  const barW = (w / bars) * 0.6;
  const gap  = (w / bars) * 0.4;

  heights.forEach((base, i) => {
    const x = i * (barW + gap) + gap / 2;
    const animated = base * 0.4 + Math.abs(Math.sin(phase + i * 0.4)) * base * 0.6;
    const barH = animated * h;
    const y = (h - barH) / 2;

    const grad = ctx.createLinearGradient(0, y, 0, y + barH);
    grad.addColorStop(0, 'rgba(13,148,136,0.9)');
    grad.addColorStop(1, 'rgba(13,148,136,0.3)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(x, y, barW, barH, barW / 2);
    ctx.fill();
  });
}

function animateWaveform(active) {
  cancelAnimationFrame(waveAnimId);
  const canvas = $('waveform');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width || 200;
  const h = canvas.height || 48;

  if (!active) {
    drawWaveBars(ctx, w, h, waveHeights, 0);
    return;
  }
  let phase = 0;
  function frame() {
    phase += 0.12;
    drawWaveBars(ctx, w, h, waveHeights, phase);
    waveAnimId = requestAnimationFrame(frame);
  }
  frame();
}

// ── IPA KEYBOARD ──────────────────────────────────────────────
function activateTab(tabName) {
  document.querySelectorAll('.ipa-tab').forEach((t) => {
    const active = t.dataset.tab === tabName;
    t.classList.toggle('active', active);
    t.setAttribute('aria-selected', active);
  });
  renderIPAKeys(tabName);
}

document.querySelectorAll('.ipa-tab').forEach((tab) => {
  tab.addEventListener('click', () => activateTab(tab.dataset.tab));
});

function renderIPAKeys(group) {
  const grid = $('ipa-key-grid');
  grid.innerHTML = '';
  (IPA_KEYS[group] || []).forEach(({ sym, desc }) => {
    const btn = document.createElement('button');
    btn.className = 'ipa-key';
    btn.textContent = sym;
    btn.setAttribute('aria-label', `Insert ${sym}: ${desc}`);
    btn.setAttribute('data-desc', desc.length > 40 ? desc.slice(0, 40) + '…' : desc);
    btn.addEventListener('click', () => insertIPA(sym));
    grid.appendChild(btn);
  });
}

function insertIPA(sym) {
  const ta = $('transcription-input');
  const start = ta.selectionStart;
  const end = ta.selectionEnd;
  const val = ta.value;
  ta.value = val.slice(0, start) + sym + val.slice(end);
  ta.selectionStart = ta.selectionEnd = start + sym.length;
  ta.focus();
}

$('ipa-backspace').addEventListener('click', () => {
  const ta = $('transcription-input');
  const start = ta.selectionStart;
  if (start === 0) return;
  // Handle combining characters / multi-char symbols
  const val = ta.value;
  // Use Intl.Segmenter if available for grapheme clusters
  let delLen = 1;
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const seg = new Intl.Segmenter();
    const segs = [...seg.segment(val.slice(0, start))];
    if (segs.length) delLen = segs[segs.length - 1].segment.length;
  }
  ta.value = val.slice(0, start - delLen) + val.slice(start);
  ta.selectionStart = ta.selectionEnd = start - delLen;
  ta.focus();
});

// ── CLEAR & HINT ──────────────────────────────────────────────
$('btn-clear').addEventListener('click', () => {
  $('transcription-input').value = '';
  $('transcription-input').focus();
});

$('btn-hint').addEventListener('click', () => {
  $('hint-text').textContent = LANGUAGES[state.currentLang].hint;
  $('hint-ipa').textContent   = LANGUAGES[state.currentLang].ipa;
  show($('hint-modal'));
  $('hint-close').focus();
});
$('hint-close').addEventListener('click', () => {
  hide($('hint-modal'));
  $('btn-hint').focus();
});
$('hint-modal').addEventListener('click', (e) => {
  if (e.target === $('hint-modal')) hide($('hint-modal'));
});

// ── NEXT TURN / COMPARE ───────────────────────────────────────
$('btn-next-turn').addEventListener('click', () => {
  stopAudio();
  const trans = $('transcription-input').value.trim();

  if (state.currentTurn === 'A') {
    // Save Person A's transcription, switch to B
    state.transcriptions[state.currentLang] = {
      langId: LANGUAGES[state.currentLang].id,
      langName: LANGUAGES[state.currentLang].name,
      transA: trans,
      transB: '',
    };
    state.currentTurn = 'B';
    $('transcription-input').value = '';
    state.playsLeft = 5;
    state.elapsed = 0;
    updateReplayUI();
    updateTurnUI();
    resetWaveform();
    $('audio-time').textContent = '0:00';
  } else {
    // Save Person B, show compare screen
    state.transcriptions[state.currentLang].transB = trans;
    showCompare();
  }
});

// ── COMPARE SCREEN ────────────────────────────────────────────
function showCompare() {
  const lang = LANGUAGES[state.currentLang];
  const entry = state.transcriptions[state.currentLang];

  $('compare-lang-title').textContent = `${lang.flag} ${lang.name}`;
  $('compare-name-a').textContent = state.nameA;
  $('compare-name-b').textContent = state.nameB;
  $('compare-trans-a').textContent = entry.transA;
  $('compare-trans-b').textContent = entry.transB;
  $('answer-ipa').textContent  = lang.ipa;
  $('answer-word').textContent = `${lang.word} — ${lang.meaning}`;
  $('fact-body').textContent   = lang.fact;
  $('fact-link').href          = lang.learnMore;

  const isLast = state.currentLang >= LANGUAGES.length - 1;
  $('next-lang-label').textContent = isLast ? 'See our results' : `Next Language →`;

  goTo('compare');
}

$('btn-next-lang').addEventListener('click', () => {
  if (state.currentLang >= LANGUAGES.length - 1) {
    showComplete();
  } else {
    state.currentLang++;
    state.currentTurn = 'A';
    loadActivity();
    goTo('activity');
  }
});

// ── COMPLETE SCREEN ───────────────────────────────────────────
function showComplete() {
  const pct = 100;
  // Build summary
  const summary = $('complete-summary');
  summary.innerHTML = '';
  state.transcriptions.forEach((entry) => {
    const lang = LANGUAGES.find(l => l.id === entry.langId);
    const div = document.createElement('div');
    div.className = 'summary-item';
    div.innerHTML = `
      <div class="summary-lang">${lang.flag} ${lang.name}</div>
      <div class="summary-pair">
        <div class="summary-name">${state.nameA}</div>
        <div class="summary-trans">${entry.transA || '—'}</div>
      </div>
      <div class="summary-pair">
        <div class="summary-name">${state.nameB}</div>
        <div class="summary-trans">${entry.transB || '—'}</div>
      </div>
    `;
    summary.appendChild(div);
  });

  $('complete-sub').textContent = `${state.nameA} & ${state.nameB} completed all ${LANGUAGES.length} languages!`;

  launchConfetti();
  goTo('complete');
}

// ── CONFETTI ──────────────────────────────────────────────────
function launchConfetti() {
  const area = $('confetti-area');
  area.innerHTML = '';
  const colors = ['#0D9488','#14B8A6','#EA580C','#FCD34D','#818CF8','#F9A8D4','#6EE7B7'];
  for (let i = 0; i < 60; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.cssText = `
      left: ${Math.random() * 100}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      width: ${6 + Math.random() * 10}px;
      height: ${6 + Math.random() * 10}px;
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      animation-duration: ${2 + Math.random() * 3}s;
      animation-delay: ${Math.random() * 1.5}s;
      opacity: ${0.7 + Math.random() * 0.3};
    `;
    area.appendChild(piece);
  }
}

// ── COPY RESULTS ──────────────────────────────────────────────
$('btn-copy-results').addEventListener('click', () => {
  let text = `The Care Lab — Transcription Results\n${'='.repeat(40)}\n\n`;
  state.transcriptions.forEach((entry) => {
    const lang = LANGUAGES.find(l => l.id === entry.langId);
    text += `${lang.name} (${lang.word})\n`;
    text += `  ${state.nameA}: ${entry.transA || '—'}\n`;
    text += `  ${state.nameB}: ${entry.transB || '—'}\n`;
    text += `  Linguists write: ${lang.ipa}\n\n`;
  });
  navigator.clipboard.writeText(text).then(() => {
    $('copy-confirm').textContent = 'Copied to clipboard!';
    setTimeout(() => $('copy-confirm').textContent = '', 2500);
  }).catch(() => {
    $('copy-confirm').textContent = 'Copy failed — try long-pressing the text above.';
  });
});

// ── RESTART ───────────────────────────────────────────────────
$('btn-restart').addEventListener('click', () => {
  stopAudio();
  $('name-a').value = '';
  $('name-b').value = '';
  state.nameA = '';
  state.nameB = '';
  state.transcriptions = [];
  goTo('welcome');
});

// ── KEYBOARD SHORTCUTS ────────────────────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (!$('hint-modal').hidden) {
      hide($('hint-modal'));
      $('btn-hint').focus();
    }
  }
  // Space bar plays/pauses audio on activity screen
  if (e.key === ' ' && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'INPUT') {
    const active = document.querySelector('.screen.active');
    if (active && active.id === 'screen-activity') {
      e.preventDefault();
      toggleAudio();
    }
  }
});

// ── LOAD VOICES (async in some browsers) ─────────────────────
if (window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    // voices loaded — nothing to do, they'll be picked up at play time
  };
  // Trigger load
  window.speechSynthesis.getVoices();
}

// ── RESIZE: re-init canvas ────────────────────────────────────
window.addEventListener('resize', () => {
  if (!state.isPlaying) resetWaveform();
});

// ── INIT ──────────────────────────────────────────────────────
// Render initial IPA keyboard so it's ready
activateTab('vowels');

console.log('The Care Lab ready. Languages loaded:', LANGUAGES.map(l => l.name).join(', '));
