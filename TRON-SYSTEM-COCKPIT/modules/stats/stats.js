// =========================================================
// ORDNER 6: WERTE, EKG, LABORSCHEIN-SCANNER & TRON KI-COACH
// =========================================================

// Zusätzliche EKG- & Spezialwerte sicherstellen
if (!state.ekgRecords) {
    state.ekgRecords = [
        { date: '2026-10-25', status: 'Unauffällig (Ruhepuls 53 BPM)', note: 'Keine Rhythmusstörungen unter Belastung.' }
    ];
}

function renderStatsModule() {
    const container = document.getElementById('tab-stats');
    if (!container) return;

    const todayStr = new Date().toISOString().split('T')[0];
    const lv = state.labValues;

    // EKG-Einträge generieren
    let ekgHtml = state.ekgRecords.map((e, idx) => `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:6px 0; border-bottom:1px solid rgba(255,255,255,0.06); font-size:0.8rem;">
            <div>
                <span style="color:var(--accent-cyan);">📅 ${e.date}</span>: <b>${e.status}</b><br>
                <span style="color:var(--text-muted);">${e.note}</span>
            </div>
            <button onclick="deleteEkg(${idx})" style="background:none;border:none;color:var(--danger);cursor:pointer;">✕</button>
        </div>
    `).join('');

    container.innerHTML = `
        <!-- 1. GEWICHTS-LOGBUCH -->
        <div class="card">
            <h2>⚖️ GEWICHTS-LOGBUCH (ZIEL: 80 KG)</h2>
            <div class="stats-grid" style="margin-bottom:8px;">
                <input type="date" id="weightDateInput" class="input-field" style="margin-bottom:0;" value="${todayStr}">
                <input type="number" step="0.1" id="weightValInput" class="input-field" style="margin-bottom:0;" placeholder="kg (z.B. 115.4)">
            </div>
            <button class="btn" style="width:100%;" onclick="addWeightEntry()">Gewicht speichern</button>
            <div id="weightHistoryList" style="margin-top:12px; font-size:0.82rem;"></div>
        </div>

        <!-- 2. EKG- & HERZ-KREISLAUF-TRESOR (NEU) -->
        <div class="card" style="border-color: var(--accent-blue);">
            <h2>
                ❤️ EKG & HERZ-KREISLAUF-BEFUNDE
                <button class="mode-switch" onclick="toggleEkgEdit()">+ EKG eintragen</button>
            </h2>
            <div style="font-size:0.78rem; color:var(--text-muted); margin-bottom:8px;">
                Dokumentiere hier deine EKG-Untersuchungen, Langzeit-Blutdruck oder Puls-Auffälligkeiten (wichtig wegen Medikinet & täglichem E-Bike-Pendeln).
            </div>
            
            <div id="ekgListContainer" style="margin-bottom:10px;">
                ${ekgHtml}
            </div>

            <div id="ekgEditBox" style="display:none; margin-top:10px; padding-top:10px; border-top:1px solid rgba(255,255,255,0.08);">
                <div class="stats-grid" style="margin-bottom:6px;">
                    <input type="date" id="ekgDateInput" class="input-field" style="margin-bottom:0;" value="${todayStr}">
                    <input type="text" id="ekgStatusInput" class="input-field" style="margin-bottom:0;" placeholder="Befund (z.B. Sinusrhythmus)">
                </div>
                <input type="text" id="ekgNoteInput" class="input-field" placeholder="Notiz / Details (z.B. Puls unter Last stabil)...">
                <button class="btn btn-success" style="width:100%;" onclick="addEkgRecord()">EKG-Befund speichern</button>
            </div>
        </div>

        <!-- 3. DYNAMISCHER INBODY & MVZ-TRESOR (EDITIERBAR & SCANBAR) -->
        <div class="card">
            <h2>
                🧬 INBODY & MVZ AAR-LAHN TRESOR
                <button class="mode-switch" onclick="toggleLabEdit()">✏️ Werte ändern / Scan</button>
            </h2>
            <div style="font-size:0.72rem; color:var(--text-muted); margin-bottom:8px;">
                Stand: <b style="color:var(--accent-cyan);">${lv.lastUpdate}</b> (Klicke oben rechts auf „Werte ändern / Scan“, um neue Labor- oder InBody-Daten einzulesen)
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value">${lv.muscle} kg</div>
                    <div class="stat-label">Skelettmuskelmasse (Schützen!)</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" style="color:var(--warning);">${lv.ecw} L</div>
                    <div class="stat-label">Extrazell. Wasser (Normal &lt;19.9L)</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" style="color:var(--success);">GPT ${lv.gpt} / GGT ${lv.ggt}</div>
                    <div class="stat-label">PiMZ-Leber (Top-Werte!)</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" style="color:var(--warning);">${lv.hba1c} %</div>
                    <div class="stat-label">HbA1c (Ziel: &lt; 5.7 %)</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" style="color:var(--success);">${lv.uric} mg/dl</div>
                    <div class="stat-label">Harnsäure (Normalisiert)</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" style="color:var(--warning);">${lv.mchc} g/dl</div>
                    <div class="stat-label">MCHC (Kupfer/B12/Ferritin!)</div>
                </div>
            </div>

            <!-- AUSKLAPPBARER SCAN- & BEARBEITUNGSBEREICH -->
            <div id="labEditBox" style="display:none; margin-top:14px; padding-top:12px; border-top:1px solid rgba(0,243,255,0.3);">
                <div class="cat-title" style="margin-top:0;">📸 Option A: Neuen InBody- oder MVZ-Bogen / EKG abfotografieren</div>
                <input type="file" accept="image/*" id="labPhotoInput" class="input-field" onchange="scanLabSheetWithAI(event)">
                <div id="labScanStatus" style="font-size:0.78rem; color:var(--accent-cyan); margin-bottom:10px;"></div>

                <div class="cat-title">✏️ Option B: Werte direkt eintragen / korrigieren</div>
                <div class="stats-grid">
                    <div>
                        <label style="font-size:0.72rem; color:var(--text-muted);">Muskelmasse (kg)</label>
                        <input type="number" step="0.1" id="inpMuscle" class="input-field" value="${lv.muscle}">
                    </div>
                    <div>
                        <label style="font-size:0.72rem; color:var(--text-muted);">Extrazell. Wasser (L)</label>
                        <input type="number" step="0.1" id="inpEcw" class="input-field" value="${lv.ecw}">
                    </div>
                    <div>
                        <label style="font-size:0.72rem; color:var(--text-muted);">Leber GPT</label>
                        <input type="number" step="1" id="inpGpt" class="input-field" value="${lv.gpt}">
                    </div>
                    <div>
                        <label style="font-size:0.72rem; color:var(--text-muted);">Leber GGT</label>
                        <input type="number" step="1" id="inpGgt" class="input-field" value="${lv.ggt}">
                    </div>
                    <div>
                        <label style="font-size:0.72rem; color:var(--text-muted);">HbA1c (%)</label>
                        <input type="number" step="0.1" id="inpHba1c" class="input-field" value="${lv.hba1c}">
                    </div>
                    <div>
                        <label style="font-size:0.72rem; color:var(--text-muted);">Harnsäure (mg/dl)</label>
                        <input type="number" step="0.01" id="inpUric" class="input-field" value="${lv.uric}">
                    </div>
                    <div>
                        <label style="font-size:0.72rem; color:var(--text-muted);">MCHC (g/dl)</label>
                        <input type="number" step="0.1" id="inpMchc" class="input-field" value="${lv.mchc}">
                    </div>
                </div>
                <button class="btn btn-success" style="width:100%; margin-top:6px;" onclick="saveNewLabValues()">💾 Neue Werte im Tresor speichern</button>
            </div>
        </div>

        <!-- 4. INTEGRIERTER TRON KI-COACH -->
        <div class="card" style="border-color: var(--accent-cyan);">
            <h2>🤖 TRON // KI-SYSTEM-COACH</h2>
            <div style="font-size:0.78rem; color:var(--text-muted); margin-bottom:8px;">
                Dein Coach kennt automatisch deine aktuellen Werte (${lv.muscle} kg Muskeln, ${lv.ecw} L Wasser, HbA1c ${lv.hba1c} %, PiMZ-Leber). Stelle ihm jede Frage zu Training, Essen oder Blutwerten:
            </div>

            <div id="aiChatOutput" class="info-box" style="min-height:70px; max-height:240px; overflow-y:auto; margin-bottom:10px; line-height:1.45;">
                <b>🤖 TRON-Coach bereit:</b> Frag mich z.B. <i>„Was bedeutet ein MCHC-Wert von 31,4 g/dl?“</i> oder <i>„Wie beeinflusst Medikinet mein EKG/Puls beim E-Bike-Fahren?“</i>
            </div>

            <div class="btn-row" style="margin-bottom:8px;">
                <input type="text" id="aiUserQuestion" class="input-field" style="margin-bottom:0;" placeholder="Frage an deinen Coach eintippen..." onkeydown="if(event.key==='Enter') askTronCoach()">
                <button class="btn" style="flex:0.35;" onclick="askTronCoach()">Senden</button>
            </div>

            <details style="font-size:0.75rem; color:var(--text-muted); margin-top:6px;">
                <summary style="cursor:pointer; color:var(--accent-cyan);">⚙️ Optional: Eigenen Gemini API-Schlüssel für Live-Foto-OCR hinterlegen</summary>
                <div style="margin-top:6px;">
                    <input type="password" id="geminiKeyInput" class="input-field" placeholder="AIzaSy... (Google Gemini API Key)" value="${state.geminiApiKey || ''}">
                    <button class="btn btn-outline" style="width:100%; padding:6px;" onclick="saveGeminiKey()">API-Key lokal speichern</button>
                </div>
            </details>
        </div>
    `;
}

function toggleEkgEdit() {
    const box = document.getElementById('ekgEditBox');
    if (box) box.style.display = (box.style.display === 'none') ? 'block' : 'none';
}

function addEkgRecord() {
    const d = document.getElementById('ekgDateInput').value;
    const s = document.getElementById('ekgStatusInput').value.trim();
    const n = document.getElementById('ekgNoteInput').value.trim();
    if (!d || !s) return;

    state.ekgRecords.push({ date: d, status: s, note: n });
    saveState();
    renderStatsModule();
}

function deleteEkg(idx) {
    state.ekgRecords.splice(idx, 1);
    saveState();
    renderStatsModule();
}

function toggleLabEdit() {
    const box = document.getElementById('labEditBox');
    if (box) box.style.display = (box.style.display === 'none') ? 'block' : 'none';
}

function saveNewLabValues() {
    state.labValues = {
        muscle: document.getElementById('inpMuscle').value || state.labValues.muscle,
        ecw: document.getElementById('inpEcw').value || state.labValues.ecw,
        gpt: document.getElementById('inpGpt').value || state.labValues.gpt,
        ggt: document.getElementById('inpGgt').value || state.labValues.ggt,
        hba1c: document.getElementById('inpHba1c').value || state.labValues.hba1c,
        uric: document.getElementById('inpUric').value || state.labValues.uric,
        mchc: document.getElementById('inpMchc').value || state.labValues.mchc,
        lastUpdate: new Date().toISOString().split('T')[0]
    };
    saveState();
    renderStatsModule();
    renderCockpitModule();
    restoreAllChecks();
    updateWaterUI();
    renderWeights();
}

function saveGeminiKey() {
    const k = document.getElementById('geminiKeyInput').value.trim();
    state.geminiApiKey = k;
    saveState();
    alert('API-Schlüssel lokal gespeichert!');
}

async function scanLabSheetWithAI(event) {
    const file = event.target.files[0];
    if (!file) return;
    const statusEl = document.getElementById('labScanStatus');
    statusEl.innerHTML = '⏳ Bild wird gelesen...';

    const reader = new FileReader();
    reader.onload = async function(e) {
        const base64Data = e.target.result.split(',')[1];

        if (state.geminiApiKey) {
            try {
                statusEl.innerHTML = '🤖 KI liest Dokument (Labor/EKG) aus...';
                const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${state.geminiApiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{
                            parts: [
                                { text: 'Lies aus diesem medizinischen Dokument (Labor, Blutbild oder EKG) wichtige Daten aus. Antworte als JSON: {"weight": number, "muscle": number, "ecw": number, "gpt": number, "ggt": number, "hba1c": number, "uric": number, "mchc": number, "ekgSummary": string}. Lass nicht gefundene Schlüssel weg.' },
                                { inlineData: { mimeType: file.type, data: base64Data } }
                            ]
                        }]
                    })
                });
                const json = await resp.json();
                const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
                const cleanJson = rawText.replace(/```json|```/g, '').trim();
                const parsed = JSON.parse(cleanJson);

                if (parsed.muscle) document.getElementById('inpMuscle').value = parsed.muscle;
                if (parsed.ecw) document.getElementById('inpEcw').value = parsed.ecw;
                if (parsed.gpt) document.getElementById('inpGpt').value = parsed.gpt;
                if (parsed.ggt) document.getElementById('inpGgt').value = parsed.ggt;
                if (parsed.hba1c) document.getElementById('inpHba1c').value = parsed.hba1c;
                if (parsed.uric) document.getElementById('inpUric').value = parsed.uric;
                if (parsed.mchc) document.getElementById('inpMchc').value = parsed.mchc;

                if (parsed.ekgSummary) {
                    const today = new Date().toISOString().split('T')[0];
                    state.ekgRecords.push({ date: today, status: 'Per KI-Scan erfasst', note: parsed.ekgSummary });
                }

                saveNewLabValues();
                alert('✅ Dokument erfolgreich ausgelesen und im Tresor aktualisiert!');
                return;
            } catch (err) {
                console.error(err);
            }
        }

        statusEl.innerHTML = `
            <div style="margin:8px 0;">
                <img src="${e.target.result}" style="max-width:100%; max-height:220px; border-radius:6px; border:1px solid var(--accent-cyan);">
                <div style="margin-top:4px; color:var(--warning);">📋 Dokument geladen! Trage neue Werte manuell ein oder hinterlege deinen Gemini-Key.</div>
            </div>
        `;
    };
    reader.readAsDataURL(file);
}

async function askTronCoach() {
    const inp = document.getElementById('aiUserQuestion');
    const out = document.getElementById('aiChatOutput');
    const q = inp.value.trim();
    if (!q) return;

    inp.value = '';
    out.innerHTML = `<b>Du:</b> ${q}<br><br><span style="color:var(--accent-cyan);">⏳ TRON-Coach analysiert deine Daten...</span>`;

    const lv = state.labValues;
    const currentW = state.weights[0]?.kg || 116.0;

    if (state.geminiApiKey) {
        try {
            const sysPrompt = `Du bist der persönliche TRON System-Coach für Oliver (42, Holztechniker, fährt täglich Rad zur Arbeit). Seine aktuellen Daten: Gewicht ${currentW} kg, Muskeln ${lv.muscle} kg, Wasser ${lv.ecw} L, PiMZ-Leber (GPT ${lv.gpt}, GGT ${lv.ggt}), HbA1c ${lv.hba1c}%, MCHC ${lv.mchc} g/dl. EKG-Einträge vorhanden. Antworte kurz, motivierend, präzise auf Deutsch.`;
            const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${state.geminiApiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: sysPrompt + "\n\nFrage: " + q }] }]
                })
            });
            const data = await resp.json();
            const answer = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (answer) {
                out.innerHTML = `<b>Du:</b> ${q}<br><br><b>🤖 TRON-Coach:</b><br>${answer.replace(/\n/g, '<br>')}`;
                return;
            }
        } catch (e) {
            console.error(e);
        }
    }

    const ql = q.toLowerCase();
    let reply = '';

    if (ql.includes('ekg') || ql.includes('puls') || ql.includes('herz')) {
        reply = `<b>Herz-Kreislauf-Check:</b><br>
        • Dein Ruhepuls liegt bei stabilen <b>53 BPM</b>.<br>
        • Da du Medikinet nimmst und täglich mit dem E-Bike pendelst, achte auf den Puls unter Last. Wenn du beim Radfahren oder an der Hantelbank merkst, dass der Puls zu stark driftet, sofort 300–500 ml Wasser trinken (zu dickes Blut erhöht die Herzarbeit). Trage neue EKG-Befunde einfach über den <b>„+ EKG eintragen“</b>-Button ein!`;
    } else if (ql.includes('blut') || ql.includes('labor') || ql.includes('wert')) {
        reply = `<b>Labor-Status:</b><br>
        • GPT ${lv.gpt} / GGT ${lv.ggt} (PiMZ-Leber top).<br>
        • HbA1c bei ${lv.hba1c} %.<br>
        • MCHC ${lv.mchc} g/dl (behalte Eisen/Kupfer im Blick). Nutze den Foto-Scan im Tresor, sobald du die nächsten MVZ-Ergebnisse hast!`;
    } else {
        reply = `<b>System-Status:</b> Gewicht ${currentW} kg, Muskeln ${lv.muscle} kg, Wasser ${lv.ecw} L. Frag mich gezielt nach EKG, Blutwerten, Medikinet-Abständen oder deinen Wok-Rezepten!`;
    }

    out.innerHTML = `<b>Du:</b> ${q}<br><br><b>🤖 TRON-Coach:</b><br>${reply}`;
}

function renderWeights() {
    const list = document.getElementById('weightHistoryList');
    if (!list || !state.weights.length) return;
    state.weights.sort((a, b) => b.date.localeCompare(a.date));
    const currentDisp = document.getElementById('currentWeightDisplay');
    if (currentDisp) currentDisp.innerText = state.weights[0].kg.toFixed(1) + ' kg';
    list.innerHTML = state.weights.map((w, i) => {
        const diff = (w.kg - 137.0).toFixed(1);
        return `<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                    <span>📅 ${w.date}</span>
                    <b style="color:var(--accent-cyan);">${w.kg.toFixed(1)} kg (${diff} kg)</b>
                    <button onclick="deleteWeight(${i})" style="background:none;border:none;color:var(--text-muted);cursor:pointer;">✕</button>
                </div>`;
    }).join('');
}

function addWeightEntry() {
    const d = document.getElementById('weightDateInput').value;
    const k = parseFloat(document.getElementById('weightValInput').value);
    if (!d || isNaN(k)) return;
    state.weights.push({ date: d, kg: k });
    document.getElementById('weightValInput').value = '';
    saveState();
    renderWeights();
}

function deleteWeight(idx) {
    if (state.weights.length <= 1) return;
    state.weights.splice(idx, 1);
    saveState();
    renderWeights();
}