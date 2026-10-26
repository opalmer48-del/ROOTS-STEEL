// =========================================================
// ORDNER 2: HEUTE & COCKPIT (modules/cockpit/cockpit.js)
// =========================================================

function renderCockpitModule() {
    const container = document.getElementById('tab-cockpit');
    if (!container) return;

    const takenDisplay = state.medTakenTime ? `${state.medTakenTime} Uhr` : 'Noch nicht genommen';
    const zincDisplay = state.zincSlot || '15:30';

    container.innerHTML = `
        <!-- LAUTER ALARM-BANNER (Erscheint bei Ablauf der 6 Stunden) -->
        <div id="zincAlarmBanner" class="alert-box" style="display:none; background:rgba(16,185,129,0.25); border:2px solid var(--success); color:#fff; text-align:center; margin-bottom:14px;">
            <div style="font-size:1.1rem; font-weight:bold; color:var(--success); margin-bottom:6px;">🚨 6 STUNDEN SIND UM – ZINK-ZEIT!</div>
            <div style="margin-bottom:8px;">Jetzt <b>1 Tab Zink (25 mg)</b> mit 300 ml Wasser einnehmen!</div>
            <button class="btn btn-success" onclick="acknowledgeZincAlarm()">✓ Verstanden & Alarm stoppen</button>
        </div>

        <div class="card">
            <h2>
                STATUS & MODUS
                <button class="mode-switch" id="modeBtn" onclick="toggleVacationMode()">MODUS: MONTAGE</button>
            </h2>
            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="currentWeightDisplay">116.0 kg</div>
                    <div class="stat-label">Gewicht (Ziel: 80 kg)</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="modeDisplay">Schicht-Modus</div>
                    <div class="stat-label">Ruhepuls: 53 BPM</div>
                </div>
            </div>

            <p style="margin: 12px 0 4px 0; font-size: 0.85rem;">Flüssigkeits-Pegel (Ziel: 3.300 ml gegen ${state.labValues.ecw} L Stauwasser):</p>
            <div class="water-progress">
                <div class="water-bar" id="waterBar"></div>
                <div class="water-text" id="waterText">0 / 3300 ml (0%)</div>
            </div>
            <div class="btn-row">
                <button class="btn" onclick="changeWater(300)">+ 300 ml trinken</button>
                <button class="btn" style="background:#0284c7;" onclick="changeWater(500)">+ 500 ml Shake</button>
                <button class="btn btn-outline" onclick="changeWater(-300)">- 300</button>
            </div>
        </div>

        <!-- NEU: LIVE MEDIKINET/KUPFER -> ZINK-WECKER ZENTRALE -->
        <div class="card" style="border-color: var(--accent-cyan);">
            <h2>
                💊 LIVE PILLEN-WEICHE (+6h ZINK-TIMER)
                <button class="btn-outline" style="border:none; padding:4px 8px; border-radius:4px; font-size:0.7rem; cursor:pointer;" onclick="playTronAlarm()">🔊 Ton testen</button>
            </h2>
            
            <button class="btn btn-success" style="width:100%; padding:13px; font-size:0.95rem; margin-bottom:10px;" onclick="pressMedikinetTakenNow()">
                ⚡ JETZT GENOMMEN (80 mg Medikinet + 2 mg Kupfer)
            </button>

            <div class="stats-grid" style="margin-bottom:8px;">
                <div class="stat-box">
                    <div class="stat-value" id="takenTimeDisplay" style="font-size:1rem; color:#fff;">${takenDisplay}</div>
                    <div class="stat-label">Medikinet & Kupfer Start</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="zincTargetDisplay" style="font-size:1.15rem; color:var(--success);">${zincDisplay} Uhr</div>
                    <div class="stat-label">Berechnete Zink-Uhrzeit</div>
                </div>
            </div>

            <div class="info-box" style="text-align:center; margin-top:4px;">
                <b id="zincLiveCountdown" style="font-size:0.95rem; color:var(--warning);">Wartet auf Medikinet-Start...</b>
                <div style="font-size:0.74rem; color:var(--text-muted); margin-top:4px;">
                    Schützt deinen MCHC-Wert (${state.labValues.mchc} g/dl), damit Kupfer und Zink sich nicht gegenseitig blockieren.
                </div>
            </div>

            <div class="btn-row" style="margin-top:8px;">
                <button class="btn" style="background:#334155; font-size:0.78rem;" onclick="openAndroidSystemAlarm()">
                    ⏰ In Android-Wecker übernehmen (Für Sperrbildschirm)
                </button>
            </div>
        </div>

        <!-- DYNAMISCHER TAGESPLAN HEUTE -->
        <div class="card">
            <h2>
                HEUTIGER TAKT (OHNE BROTDOSE)
                <button class="btn-outline" style="border:none; padding:4px 8px; border-radius:4px; font-size:0.7rem; cursor:pointer;" onclick="resetDailyTasks()">Reset</button>
            </h2>

            <div class="task-item">
                <input type="checkbox" id="dt-1" onchange="saveDailyTask('dt-1', 500)">
                <div><span class="task-time">06:20</span><b>Wasser-Zünder (500 ml):</b> Lauwarmes Wasser + 1 TL gequollene Chiasamen + 40 ml Zitronensaft + Prise Ceylon-Zimt & Chili (+ 30 Sek. kalt abduschen)</div>
            </div>
            <div class="task-item commute-row">
                <input type="checkbox" id="dt-bike-1" onchange="saveDailyTask('dt-bike-1', 0)">
                <div><span class="task-time">Morgens</span><b>🚲 Rad-Hinfahrt zur Arbeit:</b> Aktiver Kreislauf- & Fettverbrennungs-Start</div>
            </div>
            <div class="task-item">
                <input type="checkbox" id="dt-2" onchange="triggerCopperTime(this)">
                <div><span class="task-time" id="slotShake1">${state.medTakenTime || '09:30'}</span><b>Shake 1 (500 ml) & Schutz:</b> Skyr/High-Protein-Becher + Wasser + <b>1 TL Leinöl (Pflicht!)</b> + <b>80 mg Medikinet</b> + <b>2 mg Kupfer</b> + <b>500 mg L-Theanin</b></div>
            </div>
            <div class="task-item">
                <input type="checkbox" id="dt-3" onchange="saveDailyTask('dt-3', 1000)">
                <div><span class="task-time">Bis 14h</span><b>Transporter-Flasche (1.000 ml):</b> Wasser mit Garten-Minze, Zitronenminze, Zitrone oder Nelken-Zimt-Sud (Ab 14:00 Uhr strikter Kaffee-Stopp!)</div>
            </div>
            <div class="task-item">
                <input type="checkbox" id="dt-4" onchange="saveDailyTask('dt-4', 500)">
                <div><span class="task-time">13:30</span><b>Shake 2 statt Brotdose (500 ml):</b> 2 Becher K-Classic High Protein (oder 300 g Skyr + Gurke/Minze/Beeren) + 300 ml Wasser + 1 TL Chia/Flohsamen (ohne Öl)</div>
            </div>
            <div class="task-item">
                <input type="checkbox" id="dt-5" onchange="saveDailyTask('dt-5', 300)">
                <div><span class="task-time" id="dynamicZincSlot">${zincDisplay}</span><b>Zink-Isolation (300 ml):</b> <b>1 Tab Zink (25 mg)</b> streng isoliert mit Wasser (für Testosteron, Spermamenge & MCHC-Blutwert)</div>
            </div>
            <div class="task-item commute-row">
                <input type="checkbox" id="dt-bike-2" onchange="saveDailyTask('dt-bike-2', 0)">
                <div><span class="task-time">Feierab.</span><b>🚲 Rad-Rückfahrt nach Hause:</b> Kopf frei fahren & Kalorien-Verbrennung</div>
            </div>
            <div class="task-item">
                <input type="checkbox" id="dt-6" onchange="saveDailyTask('dt-6', 300)">
                <div><span class="task-time">17:15</span><b>Gefäß- & Erektions-Booster (300 ml):</b> <b>7 Kapseln L-Citrullin Malat (~5 g)</b> mit Wasser auf leeren Magen (ohne Walnüsse!)</div>
            </div>
            <div class="task-item">
                <input type="checkbox" id="dt-7" onchange="saveDailyTask('dt-7', 0)">
                <div><span class="task-time">18:00</span><b>Feierabend-Essen / Shake 3:</b> Warmes Wok-/Airfryer-Gericht auf rohem Sauerkraut/Rotkohl + 1 EL Olivenöl (oder Schoko-Nuss-Shake) + <b>1 Tab DocMorris (D3/Mg/Ca)</b></div>
            </div>
            <div class="task-item">
                <input type="checkbox" id="dt-8" onchange="saveDailyTask('dt-8', 300)">
                <div><span class="task-time">21:30</span><b>Tiefschlaf, Leber & Haut-Kollagen (300 ml):</b> <b>3–5 Kapseln Glycin (3–5 g)</b> mit Wasser + <b>CPAP-Maske</b> aufsetzen</div>
            </div>
        </div>

        <!-- SPEZIAL-TOOLS: SOS HEISSHUNGER, AMPEL-TRAINER & AMAZFIT CHECK -->
        <div class="card">
            <h2>SPEZIAL-MODULE (ALLTAG & UHR)</h2>
            <div class="btn-row">
                <button class="btn btn-danger" onclick="toggleBox('sosBox')">🚨 SOS: Süßhunger</button>
                <button class="btn" style="background:var(--purple);" onclick="startPelvicTimer()">⚡ Ampel-Trainer (5s)</button>
            </div>
            <div id="sosBox" class="alert-box">
                <b>17-Uhr Medikinet-Rebound / Schnuckel-Stopp:</b><br>
                Lass die Riesen & Toffees im Schrank! Nimm dir sofort:<br>
                • <b>Option A (60 Sek.):</b> 1 eiskalter Becher K-Classic <i>Kirsche-Aronia</i> oder <i>Himbeer-Granatapfel</i> + 1 TL reines Backkakaopulver + ½ TL Ceylon-Zimt einrühren.<br>
                • <b>Option B:</b> 2 Stückchen 85%ige dunkle Schokolade + 1 großes Glas Minz-Wasser.
            </div>
            <div id="pelvicBox" class="info-box" style="display:none; text-align:center;">
                <b style="color:var(--accent-cyan); font-size:1rem;" id="pelvicStatus">Bereit: Beckenboden (Hirsch-Verschluss)</b>
                <div style="font-size:0.8rem; color:var(--text-muted); margin-top:4px;">3x täglich 15 Wiederholungen (5 Sek. fest anspannen, 3 Sek. lösen) für maximale Erektionshärte & Ausdauer.</div>
            </div>

            <div style="margin-top:12px; padding-top:10px; border-top:1px solid rgba(255,255,255,0.08);">
                <div style="font-size:0.82rem; font-weight:bold; color:var(--accent-cyan); margin-bottom:6px;">⌚ Amazfit Active Max – Wächter (HybridCharge & Puls-Drift):</div>
                <div class="stats-grid">
                    <input type="number" id="watchCharge" class="input-field" placeholder="HybridCharge % (z.B. 65)" oninput="checkWatchStatus()">
                    <input type="number" id="watchPulse" class="input-field" placeholder="Ruhepuls aktuell (z.B. 85)" oninput="checkWatchStatus()">
                </div>
                <div id="watchAdvice" class="info-box" style="margin-top:0;">Trage deinen aktuellen <b>HybridCharge-%</b> oder Ruhe-Puls der Uhr ein für Live-Training- & Wassermangel-Analyse.</div>
            </div>
        </div>
    `;
}

// =========================================================
// „JETZT GENOMMEN“-BUTTON & +6 STUNDEN LIVE-BERECHNUNG
// =========================================================
function pressMedikinetTakenNow() {
    // Browser-Benachrichtigungen einmalig freischalten
    if ("Notification" in window && Notification.permission !== "granted") {
        Notification.requestPermission();
    }

    // Audio-Engine beim Klick entsperren (wichtig für Browser & Android)
    if (!alarmAudioCtx) {
        alarmAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    const now = new Date();
    const hhNow = String(now.getHours()).padStart(2, '0');
    const mmNow = String(now.getMinutes()).padStart(2, '0');
    state.medTakenTime = `${hhNow}:${mmNow}`;

    // Exakt +6 Stunden berechnen
    const targetDate = new Date(now.getTime() + 6 * 60 * 60 * 1000);
    const hhZinc = String(targetDate.getHours()).padStart(2, '0');
    const mmZinc = String(targetDate.getMinutes()).padStart(2, '0');

    state.zincSlot = `${hhZinc}:${mmZinc}`;
    state.zincTargetTimestamp = targetDate.getTime();
    state.zincAlarmFired = false;

    // Gleichzeitig den 09:30-Shake-Haken setzen (+500 ml Wasser)
    const dt2 = document.getElementById('dt-2');
    if (dt2 && !dt2.checked) {
        dt2.checked = true;
        saveDailyTask('dt-2', 500);
    }

    saveState();

    // UI aktualisieren
    document.getElementById('takenTimeDisplay').innerText = state.medTakenTime + ' Uhr';
    document.getElementById('zincTargetDisplay').innerText = state.zincSlot + ' Uhr';
    document.getElementById('dynamicZincSlot').innerText = state.zincSlot;
    document.getElementById('slotShake1').innerText = state.medTakenTime;
}

function triggerCopperTime(checkbox) {
    if (checkbox.checked) {
        pressMedikinetTakenNow();
    } else {
        saveDailyTask('dt-2', 500);
        state.medTakenTime = null;
        state.zincSlot = '15:30';
        state.zincTargetTimestamp = null;
        state.zincAlarmFired = false;
        saveState();
        document.getElementById('takenTimeDisplay').innerText = 'Noch nicht genommen';
        document.getElementById('zincTargetDisplay').innerText = '15:30 Uhr';
        document.getElementById('dynamicZincSlot').innerText = '15:30';
        document.getElementById('slotShake1').innerText = '09:30';
    }
}

function acknowledgeZincAlarm() {
    stopTronAlarm();
    const dt5 = document.getElementById('dt-5');
    if (dt5 && !dt5.checked) {
        dt5.checked = true;
        saveDailyTask('dt-5', 300);
    }
}

// Übergibt die berechnete Zink-Uhrzeit an den nativen Android-Wecker
function openAndroidSystemAlarm() {
    const slot = state.zincSlot || '15:30';
    const parts = slot.split(':');
    const hour = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);

    // Kopiert die Zeit zusätzlich in die Zwischenablage und informiert den Nutzer
    if (navigator.clipboard) {
        navigator.clipboard.writeText(slot);
    }
    alert(`⚡ ZINK-WECKER AUF ${slot} UHR BERECHNET!\n\nAuf dem Android-Handy / der Amazfit-Uhr:\nStelle deinen System-Wecker auf exakt ${hour}:${String(minutes).padStart(2,'0')} Uhr (Uhrzeit wurde kopiert), damit er auch im tiefen Sperrbildschirm auf der Baustelle klingelt!`);
}

function updateWaterUI() {
    const pct = Math.min(100, Math.round((state.waterMl / 3300) * 100));
    const bar = document.getElementById('waterBar');
    const txt = document.getElementById('waterText');
    if (bar) bar.style.width = pct + '%';
    if (txt) txt.innerText = state.waterMl + ' / 3300 ml (' + pct + '%)';
}

function changeWater(amount) {
    state.waterMl = Math.max(0, state.waterMl + amount);
    saveState();
    updateWaterUI();
}

function saveDailyTask(id, waterBonus) {
    const el = document.getElementById(id);
    if (!el) return;
    state.checks[id] = el.checked;
    if (waterBonus > 0) {
        changeWater(el.checked ? waterBonus : -waterBonus);
    }
    applyCheckStyle(el);
    saveState();
}

function resetDailyTasks() {
    ['dt-1','dt-bike-1','dt-2','dt-3','dt-4','dt-5','dt-bike-2','dt-6','dt-7','dt-8'].forEach(id => {
        state.checks[id] = false;
        const el = document.getElementById(id);
        if (el) { el.checked = false; applyCheckStyle(el); }
    });
    state.waterMl = 0;
    state.medTakenTime = null;
    state.zincSlot = '15:30';
    state.zincTargetTimestamp = null;
    state.zincAlarmFired = false;
    stopTronAlarm();
    saveState();
    renderCockpitModule();
    updateWaterUI();
    renderModes();
}

function toggleBox(id) {
    const box = document.getElementById(id);
    box.style.display = (box.style.display === 'block') ? 'none' : 'block';
}

let pelvicInterval = null;
function startPelvicTimer() {
    const box = document.getElementById('pelvicBox');
    const status = document.getElementById('pelvicStatus');
    box.style.display = 'block';
    if (pelvicInterval) {
        clearInterval(pelvicInterval);
        pelvicInterval = null;
        status.innerText = 'Training pausiert.';
        return;
    }
    let rep = 1;
    let phase = 'hold';
    let sec = 5;
    status.innerText = 'Wdh 1/15: FEST ANSPANNEN (' + sec + 's)';
    pelvicInterval = setInterval(() => {
        sec--;
        if (sec <= 0) {
            if (phase === 'hold') {
                phase = 'relax';
                sec = 3;
                status.innerText = 'Wdh ' + rep + '/15: LOCKER LASSEN (' + sec + 's)';
            } else {
                rep++;
                if (rep > 15) {
                    clearInterval(pelvicInterval);
                    pelvicInterval = null;
                    status.innerText = '✅ 15 Wiederholungen geschafft! Stark!';
                    return;
                }
                phase = 'hold';
                sec = 5;
                status.innerText = 'Wdh ' + rep + '/15: FEST ANSPANNEN (' + sec + 's)';
            }
        } else {
            status.innerText = 'Wdh ' + rep + '/15: ' + (phase === 'hold' ? 'FEST ANSPANNEN (' : 'LOCKER LASSEN (') + sec + 's)';
        }
    }, 1000);
}

function checkWatchStatus() {
    const charge = parseInt(document.getElementById('watchCharge').value) || 0;
    const pulse = parseInt(document.getElementById('watchPulse').value) || 0;
    const box = document.getElementById('watchAdvice');
    let msgs = [];

    if (pulse >= 90) {
        msgs.push('⚠️ <b>Puls-Drift-Warnung (' + pulse + ' BPM):</b> Dein Blut ist durch die 80 mg Medikinet / Schweiß zu dickflüssig! Sofort 300–500 ml Wasser trinken.');
    } else if (pulse > 0) {
        msgs.push('✅ <b>Puls im grünen Bereich (' + pulse + ' BPM):</b> Gute Flüssigkeitsversorgung.');
    }

    if (charge > 0 && charge < 40) {
        msgs.push('🛑 <b>HybridCharge niedrig (' + charge + '%):</b> ZNS ermüdet! Heute an der YOLEO-Hantelbank nur 2 kurze Erhaltungs-Sätze machen oder komplett pausieren (Cortisol-Schutz).');
    } else if (charge >= 40) {
        msgs.push('💪 <b>HybridCharge stark (' + charge + '%):</b> Volle Freigabe für deine 3 Arbeitssätze an der Hantelbank oder die E-Bike-Runde!');
    }

    box.innerHTML = msgs.length ? msgs.join('<br><br>') : 'Trage deinen aktuellen HybridCharge-% oder Ruhe-Puls der Uhr ein.';
}