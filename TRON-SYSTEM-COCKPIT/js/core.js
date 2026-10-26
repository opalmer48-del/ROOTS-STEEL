// =========================================================
// ORDNER 1: CORE / MAIN (js/core.js) - VERSION 2.0
// =========================================================

let state = JSON.parse(localStorage.getItem('monteurCockpitState')) || {};

// Standardwerte sicherstellen (ohne bestehende Daten zu überschreiben)
if (typeof state.waterMl !== 'number') state.waterMl = 0;
if (typeof state.isVacation !== 'boolean') state.isVacation = false;
if (typeof state.isFamily !== 'boolean') state.isFamily = false;
if (!state.checks) state.checks = {};
if (!state.customShop) state.customShop = [];
if (!state.weights || !state.weights.length) state.weights = [{ date: '2026-10-25', kg: 116.0 }];
if (!state.zincSlot) state.zincSlot = '15:30';
if (!state.medTakenTime) state.medTakenTime = null;
if (!state.zincTargetTimestamp) state.zincTargetTimestamp = null;
if (typeof state.zincAlarmFired !== 'boolean') state.zincAlarmFired = false;
if (!state.geminiApiKey) state.geminiApiKey = '';

// Dynamische InBody- & MVZ-Werte (jederzeit per Scan oder Eingabe änderbar)
if (!state.labValues) {
    state.labValues = {
        muscle: '46.6',
        ecw: '23.1',
        gpt: '19',
        ggt: '28',
        hba1c: '6.0',
        uric: '5.43',
        mchc: '31.4',
        lastUpdate: '2026-10-25'
    };
}

function saveState() {
    localStorage.setItem('monteurCockpitState', JSON.stringify(state));
}

function switchTab(tabId, btnEl) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
    document.getElementById('tab-' + tabId).classList.add('active');
    btnEl.classList.add('active');
}

function applyCheckStyle(el) {
    if (!el || !el.nextElementSibling) return;
    if (el.checked) {
        el.nextElementSibling.classList.add('checked-text');
    } else {
        el.nextElementSibling.classList.remove('checked-text');
    }
}

function saveCheck(id) {
    const el = document.getElementById(id);
    if (!el) return;
    state.checks[id] = el.checked;
    applyCheckStyle(el);
    saveState();
}

function restoreAllChecks() {
    Object.keys(state.checks).forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.checked = state.checks[id];
            applyCheckStyle(el);
        }
    });
}

// =========================================================
// ECHTER TRON-ALARMSIRENEN-GENERATOR (OHNE EXTERNE MP3)
// =========================================================
let alarmAudioCtx = null;
let alarmLoopInterval = null;

function playTronAlarm() {
    // 1. Android Vibration auslösen (falls auf dem Handy)
    if (navigator.vibrate) {
        navigator.vibrate([600, 200, 600, 200, 1000, 300, 1000]);
    }

    // 2. Browser-/System-Benachrichtigung feuern
    if ("Notification" in window && Notification.permission === "granted") {
        new Notification("⚡ ZINK-ALARM (6h um!)", {
            body: "Jetzt 1 Tab Zink (25 mg) isoliert mit 300 ml Wasser einnehmen!",
            requireInteraction: true
        });
    }

    // 3. Lauter Synthesizer-Alarm über Web Audio API
    try {
        if (!alarmAudioCtx) {
            alarmAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (alarmAudioCtx.state === 'suspended') {
            alarmAudioCtx.resume();
        }

        let beepCount = 0;
        clearInterval(alarmLoopInterval);

        const triggerBeep = () => {
            if (beepCount >= 6) {
                clearInterval(alarmLoopInterval);
                return;
            }
            const osc = alarmAudioCtx.createOscillator();
            const gain = alarmAudioCtx.createGain();
            osc.type = 'sawtooth';
            // Wechselnder Sci-Fi Doppelton (880 Hz -> 1320 Hz)
            osc.frequency.setValueAtTime(880, alarmAudioCtx.currentTime);
            osc.frequency.setValueAtTime(1320, alarmAudioCtx.currentTime + 0.18);

            gain.gain.setValueAtTime(0.35, alarmAudioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, alarmAudioCtx.currentTime + 0.4);

            osc.connect(gain);
            gain.connect(alarmAudioCtx.destination);

            osc.start();
            osc.stop(alarmAudioCtx.currentTime + 0.4);
            beepCount++;
        };

        triggerBeep();
        alarmLoopInterval = setInterval(triggerBeep, 550);
    } catch (e) {
        console.error("Audio-Fehler:", e);
    }

    // Roten Alarm-Banner im Cockpit einblenden
    const banner = document.getElementById('zincAlarmBanner');
    if (banner) banner.style.display = 'block';
}

function stopTronAlarm() {
    clearInterval(alarmLoopInterval);
    if (navigator.vibrate) navigator.vibrate(0);
    const banner = document.getElementById('zincAlarmBanner');
    if (banner) banner.style.display = 'none';
}

// =========================================================
// LIVE-COUNTDOWN ÜBERWACHUNG (JEDE SEKUNDE)
// =========================================================
setInterval(() => {
    const countdownEl = document.getElementById('zincLiveCountdown');
    if (!state.zincTargetTimestamp) {
        if (countdownEl) countdownEl.innerText = 'Wartet auf Medikinet-Start...';
        return;
    }

    const diffMs = state.zincTargetTimestamp - Date.now();
    if (diffMs <= 0) {
        if (countdownEl) {
            countdownEl.innerText = '🚨 JETZT ZINK NEHMEN (00:00:00)';
            countdownEl.style.color = 'var(--success)';
        }
        if (!state.zincAlarmFired) {
            state.zincAlarmFired = true;
            saveState();
            playTronAlarm();
        }
    } else {
        const totalSec = Math.floor(diffMs / 1000);
        const h = String(Math.floor(totalSec / 3600)).padStart(2, '0');
        const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
        const s = String(totalSec % 60).padStart(2, '0');
        if (countdownEl) {
            countdownEl.innerText = `⏳ Noch ${h}:${m}:${s} bis Zink`;
            countdownEl.style.color = 'var(--warning)';
        }
    }
}, 1000);

window.onload = function() {
    if (typeof renderCockpitModule === 'function') renderCockpitModule();
    if (typeof renderPlanModule === 'function') renderPlanModule();
    if (typeof renderShopModule === 'function') renderShopModule();
    if (typeof renderRecipesModule === 'function') renderRecipesModule();
    if (typeof renderStatsModule === 'function') renderStatsModule();

    restoreAllChecks();
    if (typeof updateWaterUI === 'function') updateWaterUI();
    if (typeof renderModes === 'function') renderModes();
    if (typeof renderCustomShop === 'function') renderCustomShop();
    if (typeof renderWeights === 'function') renderWeights();
};