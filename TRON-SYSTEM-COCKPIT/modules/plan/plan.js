// =========================================================
// ORDNER 3: WOCHENPLAN MO-SO (modules/plan/plan.js)
// =========================================================

function renderPlanModule() {
    const container = document.getElementById('tab-plan');
    if (!container) return;

    container.innerHTML = `
        <div class="card">
            <h2>
                WOCHENPLAN (MONTAG – SONNTAG)
                <button class="mode-switch" id="familyBtn" onclick="toggleFamilyMode()">FRAU ISST MIT: AUS</button>
            </h2>
            <div style="font-size:0.78rem; color:var(--text-muted); margin-bottom:8px;">
                Alle 7 Tage komplett inkl. täglichem Rad-Arbeitsweg (Mo–Fr). Im <b>Urlaubs-Modus</b> werden Arbeitsweg und Hantelbank automatisch ausgeblendet. Bei <b>„Frau isst mit“</b> sind alle Abendgerichte strikt ei-frei, histaminarm und ohne Weizen/Nudeln.
            </div>
            <button class="btn btn-outline" style="width:100%; margin-bottom:8px; padding:7px;" onclick="resetWeekPlan()">🔄 Neue Woche starten (Alle Mo–So Häkchen zurücksetzen)</button>

            <!-- MONTAG -->
            <div class="day-header">1. MONTAG <span class="badge-green badge">Monteur-Wok</span></div>
            <div class="task-item"><input type="checkbox" id="wp-mo-1" onchange="saveCheck('wp-mo-1')"><div><span class="task-time">06:20</span>Wasser-Start (500 ml + Chia + Zitrone + Zimt + Chili)</div></div>
            <div class="task-item commute-row"><input type="checkbox" id="wp-mo-bike" onchange="saveCheck('wp-mo-bike')"><div><span class="task-time">Pendeln</span><b>🚲 Fahrrad zur Arbeit (Hin- & Rückfahrt)</b></div></div>
            <div class="task-item"><input type="checkbox" id="wp-mo-2" onchange="saveCheck('wp-mo-2')"><div><span class="task-time">09:30</span><b>Shake 1:</b> 300 g Skyr + 30 g Haferflocken + 80 g TK-Beeren + 1 TL Leinöl + 80 mg Medikinet + Kupfer + L-Theanin</div></div>
            <div class="task-item"><input type="checkbox" id="wp-mo-3" onchange="saveCheck('wp-mo-3')"><div><span class="task-time">13:30</span><b>Shake 2:</b> 2 Becher K-Classic <i>Kirsche-Aronia</i> (400 g = 40 g Protein) + 300 ml Wasser im Shaker</div></div>
            <div class="task-item"><input type="checkbox" id="wp-mo-4" onchange="saveCheck('wp-mo-4')"><div><span class="task-time">15:30</span>1 Tab Zink (25 mg) isoliert | <b style="color:var(--accent-cyan);">17:15</b> 7 Kapseln L-Citrullin Malat</div></div>
            <div class="task-item"><input type="checkbox" id="wp-mo-5" onchange="saveCheck('wp-mo-5')"><div><span class="task-time">18:00</span><b>WARM (Wok):</b> <span class="family-meal">250 g Putenwürfel, Champignons & Kohlrabi-Stifte im Wok auf rohem Rotkohl-Bett + 1 EL Olivenöl (Ei-frei)</span> + DocMorris D3 | <b style="color:var(--accent-cyan);">21:30</b> Glycin + CPAP</div></div>

            <!-- DIENSTAG -->
            <div class="day-header">2. DIENSTAG <span class="badge" id="badge-di">Hantelbank Tag 1</span></div>
            <div class="task-item"><input type="checkbox" id="wp-di-1" onchange="saveCheck('wp-di-1')"><div><span class="task-time">06:20</span>Wasser-Start (500 ml + Chia + Zitrone + Zimt)</div></div>
            <div class="task-item commute-row"><input type="checkbox" id="wp-di-bike" onchange="saveCheck('wp-di-bike')"><div><span class="task-time">Pendeln</span><b>🚲 Fahrrad zur Arbeit (Hin- & Rückfahrt)</b></div></div>
            <div class="task-item"><input type="checkbox" id="wp-di-2" onchange="saveCheck('wp-di-2')"><div><span class="task-time">09:30</span><b>Eiskaffee-Shake:</b> 300 g Skyr + 200 ml kalter Kaffee + 150 ml Wasser + 1 EL Backkakao + 1 TL Leinöl + Medikinet + Kupfer + L-Theanin</div></div>
            <div class="task-item"><input type="checkbox" id="wp-di-3" onchange="saveCheck('wp-di-3')"><div><span class="task-time">13:30</span><b>Shake 2:</b> 2 Becher K-Classic <i>Heidelbeere</i> + 300 ml Wasser + 1 TL Flohsamenschalen</div></div>
            <div class="task-item"><input type="checkbox" id="wp-di-4" onchange="saveCheck('wp-di-4')"><div><span class="task-time">15:30</span>1 Tab Zink (25 mg) isoliert | <b style="color:var(--accent-cyan);">17:15</b> 7 Kapseln L-Citrullin Malat (Pump-Booster fürs Training!)</div></div>
            <div class="task-item workout-row"><input type="checkbox" id="wp-di-5" onchange="saveCheck('wp-di-5')"><div><span class="task-time">17:30</span><b>YOLEO WBX-500 Bank:</b> Flachbankdrücken (3x 8–10 Wdh, langsam & kontrolliert) + Einarmiges Kurzhantel-Rudern (3x 10 Wdh)</div></div>
            <div class="task-item"><input type="checkbox" id="wp-di-6" onchange="saveCheck('wp-di-6')"><div><span class="task-time">18:00</span><b>100% SHAKE-ABEND:</b> 350 g Skyr + ½ Salatgurke + Garten-Minze + 1 EL Olivenöl (Tzatziki-Drink) <i>ODER</i> Schoko-Walnuss-Shake + DocMorris D3 | <b style="color:var(--accent-cyan);">21:30</b> Glycin</div></div>

            <!-- MITTWOCH -->
            <div class="day-header">3. MITTWOCH <span class="badge-green badge">Airfryer-Abend</span></div>
            <div class="task-item"><input type="checkbox" id="wp-mi-1" onchange="saveCheck('wp-mi-1')"><div><span class="task-time">06:20</span>Wasser-Start (500 ml + Chia + Zitrone)</div></div>
            <div class="task-item commute-row"><input type="checkbox" id="wp-mi-bike" onchange="saveCheck('wp-mi-bike')"><div><span class="task-time">Pendeln</span><b>🚲 Fahrrad zur Arbeit (Hin- & Rückfahrt)</b></div></div>
            <div class="task-item"><input type="checkbox" id="wp-mi-2" onchange="saveCheck('wp-mi-2')"><div><span class="task-time">09:30</span><b>Apfelstrudel-Shake:</b> 300 g Skyr + 30 g Haferflocken + ½ grüner Apfel (Granny Smith) + 1 TL Zimt + 1 TL Leinöl + Medikinet + Kupfer + L-Theanin</div></div>
            <div class="task-item"><input type="checkbox" id="wp-mi-3" onchange="saveCheck('wp-mi-3')"><div><span class="task-time">13:30</span><b>Shake 2:</b> 2 Becher K-Classic <i>Himbeer-Granatapfel</i> + 300 ml Wasser</div></div>
            <div class="task-item"><input type="checkbox" id="wp-mi-4" onchange="saveCheck('wp-mi-4')"><div><span class="task-time">15:30</span>1 Tab Zink (25 mg) | <b style="color:var(--accent-cyan);">17:15</b> 7 Kapseln L-Citrullin Malat</div></div>
            <div class="task-item"><input type="checkbox" id="wp-mi-5" onchange="saveCheck('wp-mi-5')"><div><span class="task-time">18:00</span><b>WARM (Airfryer):</b> <span class="family-meal">200 g Rinder-/Putenhack mit gewürfelter Paprika & Oregano (12 Min. bei 190 °C) + Konjak-Nudeln / Zucchini-Streifen + 1 EL Olivenöl</span> + DocMorris D3 | <b style="color:var(--accent-cyan);">21:30</b> Glycin</div></div>

            <!-- DONNERSTAG -->
            <div class="day-header">4. DONNERSTAG <span class="badge-warn badge">100% Shake & Wasser-Flush</span></div>
            <div class="task-item"><input type="checkbox" id="wp-do-1" onchange="saveCheck('wp-do-1')"><div><span class="task-time">06:20</span>Wasser-Start (500 ml + Chia + Zitrone + Ingwer)</div></div>
            <div class="task-item commute-row"><input type="checkbox" id="wp-do-bike" onchange="saveCheck('wp-do-bike')"><div><span class="task-time">Pendeln</span><b>🚲 Fahrrad zur Arbeit (Hin- & Rückfahrt)</b></div></div>
            <div class="task-item"><input type="checkbox" id="wp-do-2" onchange="saveCheck('wp-do-2')"><div><span class="task-time">09:30</span><b>Beeren-Feuer-Shake:</b> 300 g Skyr + 80 g TK-Beeren + Ingwer + Prise Chili + 1 TL Leinöl + Medikinet + Kupfer + L-Theanin</div></div>
            <div class="task-item"><input type="checkbox" id="wp-do-3" onchange="saveCheck('wp-do-3')"><div><span class="task-time">13:30</span><b>Entwässerungs-Shake:</b> 300 g Skyr + 3 Stangen Staudensellerie + ½ grüner Apfel + Zitronenminze + 350 ml Wasser</div></div>
            <div class="task-item"><input type="checkbox" id="wp-do-4" onchange="saveCheck('wp-do-4')"><div><span class="task-time">15:30</span>1 Tab Zink (25 mg) | <b style="color:var(--accent-cyan);">17:15</b> 7 Kapseln L-Citrullin Malat</div></div>
            <div class="task-item"><input type="checkbox" id="wp-do-5" onchange="saveCheck('wp-do-5')"><div><span class="task-time">18:00</span><b>SHAKE-ABEND (Toffee-Killer):</b> 1 Becher K-Classic <i>Kirsche-Aronia</i> + 200 g Skyr + 1,5 EL Backkakao + 4 Walnusskerne + 300 ml Wasser + DocMorris D3 | <b style="color:var(--accent-cyan);">21:30</b> Glycin</div></div>

            <!-- FREITAG -->
            <div class="day-header">5. FREITAG <span class="badge" id="badge-fr">Hantelbank Tag 2 & Wok</span></div>
            <div class="task-item"><input type="checkbox" id="wp-fr-1" onchange="saveCheck('wp-fr-1')"><div><span class="task-time">06:20</span>Wasser-Start (500 ml + Chia + Zitrone)</div></div>
            <div class="task-item commute-row"><input type="checkbox" id="wp-fr-bike" onchange="saveCheck('wp-fr-bike')"><div><span class="task-time">Pendeln</span><b>🚲 Fahrrad zur Arbeit (Hin- & Rückfahrt)</b></div></div>
            <div class="task-item"><input type="checkbox" id="wp-fr-2" onchange="saveCheck('wp-fr-2')"><div><span class="task-time">09:30</span><b>Shake 1:</b> 1 Becher K-Classic <i>Heidelbeere</i> + 200 g Skyr + 30 g Haferflocken + 1 TL Leinöl + Medikinet + Kupfer + L-Theanin</div></div>
            <div class="task-item"><input type="checkbox" id="wp-fr-3" onchange="saveCheck('wp-fr-3')"><div><span class="task-time">13:30</span><b>Kiwi-Minz-Shake:</b> 300 g Skyr + Zitronenminze + 300 ml Wasser + 1 Kiwi (nur 3 Sek. am Ende anmixen!)</div></div>
            <div class="task-item"><input type="checkbox" id="wp-fr-4" onchange="saveCheck('wp-fr-4')"><div><span class="task-time">15:30</span>1 Tab Zink (25 mg) | <b style="color:var(--accent-cyan);">17:15</b> 7 Kapseln L-Citrullin Malat</div></div>
            <div class="task-item workout-row"><input type="checkbox" id="wp-fr-5" onchange="saveCheck('wp-fr-5')"><div><span class="task-time">17:30</span><b>YOLEO WBX-500 Bank:</b> Schrägbankdrücken (3x 8–10 Wdh) + Kurzhantel-Schulterdrücken (3x 10) + Bizeps-Curls (3x 10)</div></div>
            <div class="task-item"><input type="checkbox" id="wp-fr-6" onchange="saveCheck('wp-fr-6')"><div><span class="task-time">18:00</span><b>WARM (Wok):</b> <span class="family-meal">250 g Putenbruststreifen mit Brokkoli & Frühlingszwiebeln auf frischem rohem Sauerkraut (oder Rotkohl) + 1 EL Olivenöl</span> + DocMorris D3 | <b style="color:var(--accent-cyan);">21:30</b> Glycin</div></div>

            <!-- SAMSTAG -->
            <div class="day-header">6. SAMSTAG <span class="badge-green badge">Wiegetag & Airfryer-Steak</span></div>
            <div class="task-item"><input type="checkbox" id="wp-sa-1" onchange="saveCheck('wp-sa-1')"><div><span class="task-time">06:20</span><b>WIEGETAG:</b> Nüchtern nach der Toilette wiegen & im Tab „Werte“ eintragen + 500 ml Chia-Zitronen-Wasser</div></div>
            <div class="task-item"><input type="checkbox" id="wp-sa-2" onchange="saveCheck('wp-sa-2')"><div><span class="task-time">09:30</span><b>Shake 1:</b> 1 Becher K-Classic <i>Himbeer-Granatapfel</i> + 150 g Skyr + 1 TL Leinöl + 300 ml Wasser + Morgen-Kapseln</div></div>
            <div class="task-item"><input type="checkbox" id="wp-sa-3" onchange="saveCheck('wp-sa-3')"><div><span class="task-time">13:30</span><b>Garten-Mojito-Shake:</b> 250 g Skyr + ½ Salatgurke + Pfefferminze & Zitronenminze + Zitronensaft + 300 ml Wasser</div></div>
            <div class="task-item"><input type="checkbox" id="wp-sa-4" onchange="saveCheck('wp-sa-4')"><div><span class="task-time">18:00</span><b>WARM (Airfryer-Belohnung):</b> <span class="family-meal">200 g Rinderhüftsteak-Streifen (oder Puten-Pilz-Gratin mit Mozzarella Light) + bunte Paprika (8–10 Min. bei 200 °C) + 1 EL Olivenöl</span> + DocMorris D3 | <b style="color:var(--accent-cyan);">21:30</b> Glycin</div></div>

            <!-- SONNTAG -->
            <div class="day-header">7. SONNTAG <span class="badge-warn badge">E-Bike & Wochen-Planung</span></div>
            <div class="task-item"><input type="checkbox" id="wp-so-1" onchange="saveCheck('wp-so-1')"><div><span class="task-time">09:30</span><b>Shake 1:</b> 300 g Skyr + TK-Beeren + 1 TL Leinöl + Morgen-Kapseln</div></div>
            <div class="task-item"><input type="checkbox" id="wp-so-2" onchange="saveCheck('wp-so-2')"><div><span class="task-time">10:30</span><b>E-BIKE / LAHN-RUNDE:</b> Zone-2-Fettverbrennung mit Riese & Müller Charger4 GT touring (oder 5 km Lauf-Training) + Elektrolyt-/Minz-Flasche</div></div>
            <div class="task-item"><input type="checkbox" id="wp-so-3" onchange="saveCheck('wp-so-3')"><div><span class="task-time">14:00</span><b>Shake 2:</b> Garten-Mojito-Shake oder 2 Becher K-Classic High Protein</div></div>
            <div class="task-item"><input type="checkbox" id="wp-so-4" onchange="saveCheck('wp-so-4')"><div><span class="task-time">18:00</span><b>SONNTAGS-CHECK-IN:</b> Abend-Shake oder Wok + Modus für nächste Woche prüfen (Montage vs. Urlaub) & REWE-Liste im Tab „REWE“ checken</div></div>
        </div>
    `;
}

function resetWeekPlan() {
    Object.keys(state.checks).forEach(k => {
        if (k.startsWith('wp-')) {
            state.checks[k] = false;
            const el = document.getElementById(k);
            if (el) { el.checked = false; applyCheckStyle(el); }
        }
    });
    saveState();
}

function toggleVacationMode() {
    state.isVacation = !state.isVacation;
    saveState();
    renderModes();
}

function toggleFamilyMode() {
    state.isFamily = !state.isFamily;
    saveState();
    renderModes();
}

function renderModes() {
    const btn = document.getElementById('modeBtn');
    const display = document.getElementById('modeDisplay');
    const workouts = document.querySelectorAll('.workout-row');
    const commutes = document.querySelectorAll('.commute-row');
    const badgeDi = document.getElementById('badge-di');
    const badgeFr = document.getElementById('badge-fr');

    if (state.isVacation) {
        if (btn) { btn.innerText = 'MODUS: URLAUB (AKTIV)'; btn.style.background = 'var(--success)'; }
        if (display) display.innerText = 'Urlaubs-Modus (E-Bike)';
        workouts.forEach(w => w.style.display = 'none');
        commutes.forEach(c => c.style.display = 'none');
        if (badgeDi) badgeDi.innerText = 'Urlaub: E-Bike / Erholung';
        if (badgeFr) badgeFr.innerText = 'Urlaub: Fokus Erholung';
    } else {
        if (btn) { btn.innerText = 'MODUS: MONTAGE'; btn.style.background = 'var(--warning)'; }
        if (display) display.innerText = 'Schicht-Modus';
        workouts.forEach(w => w.style.display = 'flex');
        commutes.forEach(c => c.style.display = 'flex');
        if (badgeDi) badgeDi.innerText = 'Hantelbank Tag 1';
        if (badgeFr) badgeFr.innerText = 'Hantelbank Tag 2 & Wok';
    }

    const famBtn = document.getElementById('familyBtn');
    if (famBtn) {
        if (state.isFamily) {
            famBtn.innerText = 'FRAU ISST MIT: AN (EI-FREI)';
            famBtn.style.background = 'var(--success)';
        } else {
            famBtn.innerText = 'FRAU ISST MIT: AUS';
            famBtn.style.background = 'var(--warning)';
        }
    }
}