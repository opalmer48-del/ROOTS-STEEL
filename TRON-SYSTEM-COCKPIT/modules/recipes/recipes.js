// =========================================================
// ORDNER 4: REZEPTE (EXAKTE GRAMM & ANLEITUNG) & SCANNER
// =========================================================

const masterRecipes = [
    {
        id: 'wok-mo',
        day: 'MONTAG (WOK)',
        title: 'Puten-Kohlrabi-Champignon-Wok auf Rotkohl-Bett',
        prepTime: '12 Min.',
        protein: '62 g Eiweiß',
        ingredientsSingle: [
            '250 g Putenbrust (in 2 cm Würfel geschnitten)',
            '200 g Kohlrabi (geschält, in feine Stifte geschnitten)',
            '150 g braune Champignons (geviertelt)',
            '120 g frischer Rotkohl (roh, fein gehobelt als Bett)',
            '1 EL (10 ml) Raps- oder Kokosöl zum Anbraten',
            '1 EL (10 ml) kaltgepresstes Olivenöl (zum Schluss drüber)',
            'Gewürze: 1 TL Paprika edelsüß, ½ TL Knoblauchpulver, Salz, Pfeffer'
        ],
        steps: [
            '1. Rohen gehobelten Rotkohl (120 g) direkt auf deinen tiefen Teller als knackiges Bett legen.',
            '2. Wok auf höchste Stufe erhitzen, 1 EL Bratöl rein und die 250 g Putenwürfel 4 Minuten scharf anbraten.',
            '3. Die 200 g Kohlrabi-Stifte dazugeben und 3 Minuten unter Rühren mitbraten (sollen noch leicht Biss haben).',
            '4. Jetzt die 150 g Champignons und die Gewürze zugeben und weitere 3 Minuten schwenken.',
            '5. Heiße Wok-Mischung direkt auf den rohen Rotkohl geben und 1 EL Olivenöl darüberträufeln (Fettträger für deine Vitamin-D3-Tablette!).'
        ],
        wifeNote: '✅ 100 % EI-FREI & HISTAMINARM: Für 2 Personen einfach alle Grammzahlen verdoppeln (500 g Pute, 400 g Kohlrabi, 300 g Pilze).'
    },
    {
        id: 'air-mi',
        day: 'MITTWOCH (AIRFRYER)',
        title: 'Airfryer Hack-Paprika-Pfanne auf Konjak-/Zucchini-Nudeln',
        prepTime: '15 Min.',
        protein: '54 g Eiweiß',
        ingredientsSingle: [
            '200 g mageres Rinder- oder Putenhackfleisch',
            '150 g bunte Paprika (in 1,5 cm Würfel geschnitten)',
            '150 g Zucchini (in halbe Scheiben oder Streifen)',
            '200 g Konjak-Nudeln / Shirataki (1 Packung, abgetropft)',
            '1 EL (10 ml) Olivenöl',
            'Gewürze: 1,5 TL italienische Kräuter / Oregano, Salz, milder Pfeffer'
        ],
        steps: [
            '1. Konjak-Nudeln in einem Sieb 60 Sekunden gründlich unter kaltem Wasser abspülen und gut abtropfen lassen.',
            '2. Das rohe Hackfleisch (200 g) mit den Paprikawürfeln (150 g), Zucchini (150 g) und Oregano in einer Schüssel locker mischen.',
            '3. Mischung in den Airfryer-Korb (oder eine Backform für den Airfryer) geben und bei 190 °C für 12 Minuten garen (nach 6 Minuten einmal durchrühren).',
            '4. Die abgetropften Konjak-Nudeln für die letzten 2 Minuten direkt mit in den heißen Airfryer-Korb geben, damit sie den Bratensaft aufnehmen.',
            '5. Auf den Teller geben und 1 EL Olivenöl frisch darüberziehen.'
        ],
        wifeNote: '✅ EI-FREI & WEIZENFREI: Für Rebecca frisches Putenhack verwenden (extrem histaminarm!).'
    },
    {
        id: 'wok-fr',
        day: 'FREITAG (WOK)',
        title: 'Puten-Brokkoli-Wok auf Frische-Sauerkraut',
        prepTime: '12 Min.',
        protein: '64 g Eiweiß',
        ingredientsSingle: [
            '250 g Putenbruststreifen',
            '250 g Brokkoli (in kleine Röschen geteilt)',
            '50 g Frühlingszwiebeln (in Ringe geschnitten)',
            '150 g frisches rohes Sauerkraut (aus dem Kühlregal-Beutel!)',
            '60 ml Wasser (zum kurzen Dämpfen des Brokkolis)',
            '1 EL Bratöl + 1 EL Olivenöl zum Beträufeln',
            'Gewürze: Kurkuma, Salz, Pfeffer, optional Prise Chili'
        ],
        steps: [
            '1. 150 g rohes Frische-Sauerkraut direkt kalt auf deinen Teller legen (nicht mitkochen, sonst sterben die guten Darmbakterien!).',
            '2. Wok stark erhitzen, 250 g Putenstreifen in 1 EL Öl 4 Minuten goldbraun anbraten und kurz auf einen Teller zur Seite stellen.',
            '3. Die 250 g Brokkoli-Röschen in den heißen Wok geben, 60 ml Wasser angießen und mit Deckel 4 Minuten bissfest dämpfen.',
            '4. Putenstreifen und 50 g Frühlingszwiebeln wieder zum Brokkoli geben, mit Kurkuma & Salz würzen und 1 Minute durchschwenken.',
            '5. Alles heiß über das kalte Sauerkraut-Bett geben + 1 EL Olivenöl darüber.'
        ],
        wifeNote: '⚠️ HISTAMIN-WEICHE FÜR REBECCA: Sauerkraut hat viel Histamin! Für deine Frau das Sauerkraut weglassen und ihre Portion stattdessen auf rohen Rotkohl oder mehr gedämpften Brokkoli betten.'
    },
    {
        id: 'air-sa',
        day: 'SAMSTAG (AIRFRYER-STEAK)',
        title: 'Rinderhüftsteak-Streifen mit Paprika & Mozzarella Light',
        prepTime: '12 Min.',
        protein: '60 g Eiweiß',
        ingredientsSingle: [
            '220 g Rinderhüftsteak (in 2 cm dicke Streifen geschnitten)',
            '200 g rote & gelbe Paprika (in breite Streifen)',
            '100 g Champignons (halbiert)',
            '60 g Mozzarella Light (halbe Kugel, in Stücke gezupft)',
            '1 EL (10 ml) Olivenöl',
            'Gewürze: Grobes Meersalz, Knoblauch, Rosmarin / Thymian'
        ],
        steps: [
            '1. Airfryer 3 Minuten auf 200 °C vorheizen.',
            '2. Paprikastreifen (200 g) und halbierte Champignons (100 g) mit 1 TL Öl und Kräutern mischen und 5 Minuten bei 200 °C im Airfryer vorrösten.',
            '3. Jetzt die 220 g Rinderhüftsteak-Streifen dazugeben und weitere 4–5 Minuten bei 200 °C garen (bleibt innen saftig rosa!).',
            '4. In der letzten Minute die 60 g Mozzarella Light darüberzupfen und kurz anschmelzen lassen.',
            '5. Auf dem Teller mit Salz & Pfeffer würzen und restliches Olivenöl darübergeben.'
        ],
        wifeNote: '✅ 100 % EI-FREI & HISTAMINARM: Frisches Rinderhüftsteak (nicht lange gereift) oder alternativ Putenbruststreifen nutzen.'
    }
];

function renderRecipesModule() {
    const container = document.getElementById('tab-scanner');
    if (!container) return;

    const recipesHtml = masterRecipes.map(r => `
        <div class="card" style="border-left: 3px solid var(--accent-cyan);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <span class="badge-green badge">${r.day}</span>
                <span style="font-size:0.75rem; color:var(--accent-cyan); font-weight:bold;">⏱️ ${r.prepTime} | 💪 ${r.protein}</span>
            </div>
            <h3 style="margin:0 0 10px 0; font-size:0.95rem; color:#fff;">${r.title}</h3>

            <div class="cat-title" style="margin-top:0;">⚖️ Exakte Zutaten (für 1 große Monteur-Portion):</div>
            <ul style="margin:4px 0 10px 18px; padding:0; font-size:0.82rem; line-height:1.45; color:var(--text-main);">
                ${r.ingredientsSingle.map(ing => `<li>${ing}</li>`).join('')}
            </ul>

            <div class="cat-title">👨‍🍳 Schritt-für-Schritt Zubereitung:</div>
            <div style="font-size:0.82rem; line-height:1.45; color:var(--text-muted); margin-bottom:10px;">
                ${r.steps.map(s => `<div style="margin-bottom:4px;">${s}</div>`).join('')}
            </div>

            <div class="info-box" style="margin-top:6px; font-size:0.78rem;">
                <b>👩‍❤️‍👨 „Frau isst mit“-Regel:</b><br>${r.wifeNote}
            </div>
        </div>
    `).join('');

    container.innerHTML = `
        <div class="card">
            <h2>🥘 WOK & AIRFRYER REZEPTE (GRAMMGENAU)</h2>
            <div style="font-size:0.8rem; color:var(--text-muted);">
                Kein Überlegen nach Feierabend: Jedes Gericht mit exakter Grammzahl und 1-2-3-Kochanleitung. Alle Rezepte sind weizenfrei, kartoffelfrei und schützen deine PiMZ-Leber.
            </div>
        </div>

        ${recipesHtml}

        <div class="card">
            <h2>🥤 SCHNELL-BAUKASTEN: SHAKES (EXAKTE GRAMM)</h2>
            <div style="font-size:0.82rem; line-height:1.45;">
                <p><b style="color:var(--accent-cyan);">1. Der 10-Sekunden-Transporter-Shake (Ohne Mixer):</b><br>
                <b>400 g</b> (2 Becher) K-Classic High Protein + <b>300 ml</b> kaltes Wasser direkt im Shaker schütteln. <i>(Um 09:30 Uhr Pflicht: <b>+ 5 ml / 1 TL Leinöl</b> für Medikinet!)</i></p>
                <p><b style="color:var(--accent-cyan);">2. Garten-Mojito-Shake (Standmixer):</b><br>
                <b>300 g</b> Skyr Natur + <b>350 ml</b> kaltes Wasser + <b>180 g</b> Salatgurke (½ Gurke) + <b>10 g</b> frische Pfefferminze & Zitronenminze + <b>20 ml</b> Zitronensaft. 20 Sek. auf höchster Stufe mixen.</p>
                <p><b style="color:var(--accent-cyan);">3. Schoko-Walnuss „Toffee-Killer“ (Abend-Shake):</b><br>
                <b>350 g</b> Skyr + <b>350 ml</b> Wasser + <b>15 g</b> (1,5 EL) reines Backkakaopulver + <b>20 g</b> (4 halbe) Walnusskerne + <b>3 g</b> (½ TL) Ceylon-Zimt im Standmixer cremig mixen.</p>
            </div>
        </div>

        <div class="card">
            <h2>📸 FOTO- & ETIKETTEN-SCANNER</h2>
            <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:10px;">
                Fotografiere ein REWE-Etikett oder tippe eine Zutat ein für den PiMZ-Leber- & HbA1c-Check:
            </div>
            <input type="file" accept="image/*" capture="environment" id="foodPhotoInput" class="input-field" onchange="previewFoodPhoto(event)">
            <div id="photoPreviewBox" style="display:none; text-align:center; margin-bottom:10px;">
                <img id="photoPreviewImg" src="" style="max-width:100%; max-height:180px; border-radius:8px; border:1px solid var(--accent-cyan);">
            </div>

            <input type="text" id="foodCheckInput" class="input-field" placeholder="Zutat eingeben (z.B. Honig, Banane, Skyr, Rote Bete)..." oninput="evaluateFoodItem()">
            <div id="foodCheckResult" class="info-box">Tippe eine Zutat ein oder nimm ein Foto auf für den Sofort-Check.</div>
        </div>
    `;
}

function previewFoodPhoto(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('photoPreviewImg').src = e.target.result;
        document.getElementById('photoPreviewBox').style.display = 'block';
        document.getElementById('foodCheckResult').innerHTML = '📸 <b>Foto geladen!</b> Prüfe beim Etikett auf 3 Dinge:<br>1. <b>Zucker unter 5 g / 100 g?</b> (Schützt deinen HbA1c)<br>2. <b>Kein Weizen / kein Honig / kein Glukosesirup?</b><br>3. <b>Um 09:30 & 18:00 Uhr:</b> Genug gesunde Fette (Leinöl/Olivenöl/Walnuss) für Medikinet & Vitamin D3 dabei?';
    };
    reader.readAsDataURL(file);
}

function evaluateFoodItem() {
    const val = document.getElementById('foodCheckInput').value.toLowerCase().trim();
    const res = document.getElementById('foodCheckResult');
    if (!val) {
        res.innerHTML = 'Tippe eine Zutat ein oder nimm ein Foto auf für den Sofort-Check.';
        return;
    }
    const redList = ['honig', 'banane', 'rote bete', 'ananas', 'orange', 'brot', 'brötchen', 'weizen', 'nudeln', 'reis', 'kartoffel', 'zucker', 'riesen', 'toffee', 'ashwagandha', 'shilajit', 'bier', 'alkohol'];
    const greenList = ['skyr', 'pute', 'hähnchen', 'rind', 'brokkoli', 'gurke', 'minze', 'zitrone', 'chia', 'leinöl', 'olivenöl', 'walnuss', 'sauerkraut', 'rotkohl', 'kohlrabi', 'konjak', 'heidelbeere', 'himbeere', 'aronia', 'k-classic', 'nelken', 'zimt', 'ingwer', 'sellerie', 'granny smith', 'kakao'];

    if (val.includes('ashwagandha') || val.includes('shilajit')) {
        res.innerHTML = '🛑 <b>STRIKT VERBOTEN (ROT):</b> Lebensgefahr für deine genetische PiMZ-Leber!';
        return;
    }
    for (let r of redList) {
        if (val.includes(r)) {
            res.innerHTML = '🔴 <b>ROT (Stopp!):</b> „' + val + '“ treibt deinen Blutzucker und das Insulin hoch und stoppt sofort die Fettverbrennung!';
            return;
        }
    }
    for (let g of greenList) {
        if (val.includes(g)) {
            res.innerHTML = '🟢 <b>GRÜN (Perfekt!):</b> „' + val + '“ schützt deine Muskelmasse, hält den Blutzucker flach und ist 100 % sicher für deine PiMZ-Leber.';
            return;
        }
    }
    res.innerHTML = '🟡 <b>GELB (Faustregel):</b> Achte darauf, dass unter 5 g Zucker pro 100 g enthalten sind und kein Weizenmehl drinsteckt.';
}