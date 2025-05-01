/* إعدادات ثابتة */
const PREP = 5;           // ثواني التحضير
const RALLY_WAIT = 300;   // 5 دقائق بعد فتح أطول مسيرة

/* حالة التطبيق */
const players = [];
let maxMarch = 0;
let running  = false;
let tickId   = null;
let globalId = null;

/* DOM مختصر */
const $ = id => document.getElementById(id);
const utc        = $('utc-clock');
const nameIn     = $('player-name');
const marchIn    = $('march-time');
const addBtn     = $('add-player');
const calcBtn    = $('calc-wait');
const startBtn   = $('start-countdown');
const resetBtn   = $('reset-btn');
const tableBody  = $('players-list');
const maxInfo    = $('max-march-info');
const prepBox    = $('prep-countdown');
const prepSpan   = $('prep-time');
const globalBox  = $('global-timer');
const globalSpan = $('global-time-left');
const alertsBox  = $('open-alerts');

/* ساعة UTC حيّة */
(function loopUTC () {
  const d = new Date();
  utc.textContent =
    `${d.getUTCHours().toString().padStart(2,'0')}:` +
    `${d.getUTCMinutes().toString().padStart(2,'0')}:` +
    `${d.getUTCSeconds().toString().padStart(2,'0')} UTC`;
  requestAnimationFrame(loopUTC);
})();

/* تنسيق mm:ss */
const fmt = s =>
  `${String(Math.floor(s / 60)).padStart(2,'0')}:` +
  `${String(s % 60).padStart(2,'0')}`;

/* صوت قصير */
function beep () {
  const ctx = new (AudioContext || webkitAudioContext)();
  const osc = ctx.createOscillator();
  osc.frequency.value = 900;
  osc.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.25);
}

/* بناء صفّ لاعب واحد وحفظ المؤشرات */
function buildRow (p, index) {
  const tr = document.createElement('tr');
  if (index === 0) tr.style.background = 'rgba(46,204,113,.1)';

  tr.innerHTML = `
    <td>${index + 1}</td>
    <td>${p.name}</td>
    <td>${p.march}</td>
    <td>${p.wait}</td>
    <td class="countdown-cell">--:--</td>
    <td>قيد الانتظار</td>
    <td><button class="btn-delete">🗑️</button></td>
  `;

  const cells = tr.children;
  p.$cd = cells[4];          // العدّاد
  p.$st = cells[5];          // الحالة
  tr.querySelector('.btn-delete').onclick = () => removePlayer(p.id);

  return tr;
}

/* إعادة رسم كامل للجدول */
function render () {
  tableBody.innerHTML = '';
  players
    .sort((a, b) => b.march - a.march)
    .forEach((p, i) => tableBody.appendChild(buildRow(p, i)));
}

/* إضافة لاعب */
function addPlayer () {
  const name  = nameIn.value.trim();
  const march = parseInt(marchIn.value, 10);

  if (!name || !march || march <= 0)      return alert('تحقّق من المدخلات');
  if (players.some(p => p.name === name)) return alert('اللاعب موجود مسبقًا');

  players.push({
    id: crypto.randomUUID(),
    name,
    march,
    wait: 0,
    openAt: 0,
    alerted: false,
    $cd: null,
    $st: null
  });

  recalcWaits();
  nameIn.value = '';
  marchIn.value = '';
  nameIn.focus();
}

/* حذف لاعب */
function removePlayer (id) {
  const idx = players.findIndex(p => p.id === id);
  if (idx > -1) players.splice(idx, 1);
  recalcWaits();
}
window.removePlayer = removePlayer;

/* حساب أوقات الانتظار وإعادة الرسم */
function recalcWaits () {
  if (!players.length) {
    maxMarch = 0;
    render();
    maxInfo.innerHTML =
      'أطول وقت مسيرة حاليًا: <strong>0</strong> ثانية';
    return;
  }

  maxMarch = Math.max(...players.map(p => p.march));
  players.forEach(p => (p.wait = maxMarch - p.march));

  maxInfo.innerHTML =
    `أطول وقت مسيرة حاليًا: <strong>${maxMarch}</strong> ثانية`;
  render();
}

/* بطاقة تنبيه فريدة لكل لاعب */
function fireAlert (name) {
  if (alertsBox.querySelector(`[data-name="${name}"]`)) return;
  const div = document.createElement('div');
  div.className = 'open-card';
  div.dataset.name = name;
  div.textContent = `${name} — 🚀 افتح الحشد الآن!`;
  alertsBox.appendChild(div);
}

/* تحديث العدّادات كل ربع ثانية */
function updateCountdowns () {
  const now = Date.now();

  players.forEach(p => {
    const remain = Math.max(0, Math.floor((p.openAt - now) / 1000));
    p.$cd.textContent = fmt(remain);

    if (remain === 0 && !p.alerted) {
      p.$st.innerHTML = '<span class="open-card">🚀 افتح الحشد الآن!</span>';
      fireAlert(p.name);
      beep();
      p.alerted = true;
    }
  });
}

/* تشغيل عدّادات اللاعبين */
function startMasterTimer () {
  if (tickId) clearInterval(tickId);
  updateCountdowns();                     // تحديث لحظي
  tickId = setInterval(updateCountdowns, 250);
}

/* عدّاد التجمّع العام */
function startGlobal () {
  let left = maxMarch + RALLY_WAIT;
  globalBox.style.display = 'block';
  globalSpan.textContent  = fmt(left);

  globalId = setInterval(() => {
    left--;
    globalSpan.textContent = fmt(left);
    if (left === 0) {
      clearInterval(globalId);
      globalBox.innerHTML =
        '<strong>تم وصول جميع الحشود! 🏁</strong>';
    }
  }, 1000);
}

/* بدء العمل الفعلي بعد التحضير */
function startMain () {
  const base = Date.now();
  players.forEach(p => {
    p.openAt  = base + p.wait * 1000;
    p.alerted = false;
    p.$st.textContent = 'قيد الانتظار';
    p.$cd.textContent = fmt(p.wait);
  });

  startGlobal();
  startMasterTimer();
}

/* تحضير PREP */
function startPrep () {
  if (running)         return alert('العدّاد يعمل');
  if (!players.length) return alert('أضف لاعبًا');
  recalcWaits();   
  running = true;
  addBtn.disabled   =
  startBtn.disabled =
  calcBtn.disabled  = true;

  let t = PREP;
  prepSpan.textContent = t;
  prepBox.style.display = 'block';

  const id = setInterval(() => {
    prepSpan.textContent = --t;
    if (!t) {
      clearInterval(id);
      prepBox.style.display = 'none';
      startMain();
    }
  }, 1000);
}

/* إعادة تعيين */
function resetAll () {
  clearInterval(tickId);
  clearInterval(globalId);

  players.length = 0;
  maxMarch = 0;
  running  = false;
  tickId = globalId = null;

  tableBody.innerHTML = '';
  alertsBox.innerHTML = '';
  globalBox.style.display = 'none';
  globalSpan.textContent = '--:--';
  prepBox.style.display  = 'none';

  maxInfo.innerHTML =
    'أطول وقت مسيرة حاليًا: <strong>0</strong> ثانية';

  addBtn.disabled =
  startBtn.disabled =
  calcBtn.disabled  = false;
}

/* ربط الأحداث */
addBtn.onclick   = addPlayer;
calcBtn.onclick  = recalcWaits;
startBtn.onclick = startPrep;
resetBtn.onclick = resetAll;
