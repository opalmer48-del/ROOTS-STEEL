// =========================================================
// ORDNER 5: REWE EINKAUFSLISTE (modules/shop/shop.js)
// =========================================================

function renderShopModule() {
    const container = document.getElementById('tab-rewe');
    if (!container) return;

    container.innerHTML = `
        <div class="card">
            <h2>
                REWE EINKAUFSLISTE (NACH GÄNGEN)
                <button class="btn-outline" style="border:none; padding:4px 8px; border-radius:4px; font-size:0.7rem; cursor:pointer;" onclick="resetShopList()">Alle frei</button>
            </h2>

            <div class="cat-title">1. Obst & Gemüse (Am Eingang)</div>
            <div class="shop-item"><input type="checkbox" id="sh-1" onchange="saveCheck('sh-1')"><span>3–4 grüne Äpfel (Granny Smith) & 1–2 Kiwis</span></div>
            <div class="shop-item"><input type="checkbox" id="sh-2" onchange="saveCheck('sh-2')"><span>1 kleine Knolle frischer Ingwer</span></div>
            <div class="shop-item"><input type="checkbox" id="sh-3" onchange="saveCheck('sh-3')"><span>3 Salatgurken & 1 Bund Staudensellerie</span></div>
            <div class="shop-item"><input type="checkbox" id="sh-4" onchange="saveCheck('sh-4')"><span>1 Schale braune/weiße Champignons (ca. 300 g)</span></div>
            <div class="shop-item"><input type="checkbox" id="sh-5" onchange="saveCheck('sh-5')"><span>1–2 Zucchini & 4 bunte Paprika</span></div>
            <div class="shop-item"><input type="checkbox" id="sh-6" onchange="saveCheck('sh-6')"><span>1 Kohlrabi, 1 Kopf Brokkoli & 1 Bund Frühlingszwiebeln</span></div>
            <div class="shop-item"><input type="checkbox" id="sh-7" onchange="saveCheck('sh-7')"><span>1 kleiner Kopf frischer Rotkohl (für rohes Wok-Bett)</span></div>

            <div class="cat-title">2. Kühlregal (Milch & Frische)</div>
            <div class="shop-item"><input type="checkbox" id="sh-8" onchange="saveCheck('sh-8')"><span>8–9 Becher Skyr Natur (à 500 g)</span></div>
            <div class="shop-item"><input type="checkbox" id="sh-9" onchange="saveCheck('sh-9')"><span>6–8 Becher K-Classic / REWE High Protein Joghurt (Heidelbeere, Kirsche-Aronia, Himbeer-Granatapfel)</span></div>
            <div class="shop-item"><input type="checkbox" id="sh-10" onchange="saveCheck('sh-10')"><span>1 Packung frisches Sauerkraut (Kühlregal-Beutel, nicht Dose!)</span></div>
            <div class="shop-item"><input type="checkbox" id="sh-11" onchange="saveCheck('sh-11')"><span>1 Kugel Mozzarella Light</span></div>

            <div class="cat-title">3. Fleisch-Kühlung (Für Wok & Airfryer)</div>
            <div class="shop-item"><input type="checkbox" id="sh-12" onchange="saveCheck('sh-12')"><span>750–800 g frische Putenbrust / Hähnchenbrust</span></div>
            <div class="shop-item"><input type="checkbox" id="sh-13" onchange="saveCheck('sh-13')"><span>200 g mageres Rinder- oder Putenhackfleisch</span></div>
            <div class="shop-item"><input type="checkbox" id="sh-14" onchange="saveCheck('sh-14')"><span>200–250 g Rinderhüftsteak (für Samstag)</span></div>

            <div class="cat-title">4. Tiefkühl, Vorrat & Getränke</div>
            <div class="shop-item"><input type="checkbox" id="sh-15" onchange="saveCheck('sh-15')"><span>1 Packung TK-Beeren (Himbeeren / Heidelbeeren ungesüßt)</span></div>
            <div class="shop-item"><input type="checkbox" id="sh-16" onchange="saveCheck('sh-16')"><span>1 Packung Konjak-Nudeln / Shirataki (0 g Kohlenhydrate)</span></div>
            <div class="shop-item"><input type="checkbox" id="sh-17" onchange="saveCheck('sh-17')"><span>Reines Backkakaopulver (stark entölt, ohne Zucker)</span></div>
            <div class="shop-item"><input type="checkbox" id="sh-18" onchange="saveCheck('sh-18')"><span>REWE Beste Wahl Zitronensaft (0,75 l) & stilles Wasser</span></div>
            <div class="shop-item"><input type="checkbox" id="sh-19" onchange="saveCheck('sh-19')"><span>Vorrats-Check: Leinöl, Olivenöl, Chiasamen, Flohsamenschalen, Walnüsse, Ceylon-Zimt, ganze Gewürznelken</span></div>

            <div id="customShopContainer"></div>
            <div class="btn-row" style="margin-top:12px;">
                <input type="text" id="customShopInput" class="input-field" style="margin-bottom:0;" placeholder="Eigenen Artikel ergänzen...">
                <button class="btn" style="flex:0.4;" onclick="addCustomShopItem()">+ Hinzu</button>
            </div>
        </div>
    `;
}

function resetShopList() {
    Object.keys(state.checks).forEach(k => {
        if (k.startsWith('sh-')) {
            state.checks[k] = false;
            const el = document.getElementById(k);
            if (el) { el.checked = false; applyCheckStyle(el); }
        }
    });
    saveState();
}

function renderCustomShop() {
    const container = document.getElementById('customShopContainer');
    if (!container) return;
    container.innerHTML = '';
    state.customShop.forEach((item, idx) => {
        const div = document.createElement('div');
        div.className = 'shop-item';
        div.innerHTML = `<input type="checkbox" ${item.done ? 'checked' : ''} onchange="toggleCustomShop(${idx})">
                         <span class="${item.done ? 'checked-text' : ''}" style="flex:1;">${item.name}</span>
                         <button onclick="removeCustomShop(${idx})" style="background:none;border:none;color:var(--danger);cursor:pointer;">✕</button>`;
        container.appendChild(div);
    });
}

function addCustomShopItem() {
    const inp = document.getElementById('customShopInput');
    if (!inp.value.trim()) return;
    state.customShop.push({ name: inp.value.trim(), done: false });
    inp.value = '';
    saveState();
    renderCustomShop();
}

function toggleCustomShop(idx) {
    state.customShop[idx].done = !state.customShop[idx].done;
    saveState();
    renderCustomShop();
}

function removeCustomShop(idx) {
    state.customShop.splice(idx, 1);
    saveState();
    renderCustomShop();
}