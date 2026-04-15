
/* ══ NIEUWS DATA (aanpasbaar) ══ */
var N = [
  {d:"17 & 18 april 2026", t:"Kledingruilbeurs Fairtrade werkgroep", tx:"De Fairtrade werkgroep organiseert een gezellige kledingruilbeurs. Breng schone kleding mee en ruil het voor iets anders. Geen aanmelding nodig, iedereen welkom!", b:"Duurzaamheidscentrum", bk:"nb-g", k:"n-groen"},
  {d:"7 mei 2026", t:"Thema-avond: Water & Duurzaamheid", tx:"In samenwerking met gemeente Hellendoorn. Locatie: Het Huis voor Cultuur en Bestuur. Aanvang 19:30. Gratis toegang, geen aanmelding nodig.", b:"Gratis toegang", bk:"nb-bl", k:"n-blauw"},
  {d:"Elke week", t:"FIXbrigade: gratis energieklussen thuis", tx:"De FIXbrigade helpt inwoners van Hellendoorn gratis met tochtstrips, radiatorfolie, LED-lampen en waterbesparende douchekop. Wonend in Hellendoorn en hulp nodig? Mail ons!", b:"FIXbrigade \u2014 gratis", bk:"nb-p", k:"n-paars"},
  {d:"Wo t/m Za 13:00-17:00", t:"Repair Café: repareer in plaats van weggooien", tx:"Vrijwilligers repareren bijna alles met een stekker, maar ook meubels en speelgoed. Al meer dan 1.000 items gerepareerd! Gewoon binnenlopen.", b:"Wo\u2013Za 13:00\u201317:00", bk:"nb-t", k:"n-teal"},
  {d:"Altijd welkom", t:"Gratis energieadvies voor uw woning", tx:"Kom langs voor een gratis gesprek of vraag een gratis huisbezoek van een energiecoach aan. Gewoon binnenlopen op Grotestraat 178A Nijverdal.", b:"Gratis advies", bk:"nb-g", k:"n-groen"},
  {d:"Informatief", t:"Thuisbatterij \u2014 steeds interessanter", tx:"Met zonnepanelen en een thuisbatterij slaat u overdag opgewekte stroom op voor gebruik in de avond. Nu de salderingsregeling verandert, wordt een batterij steeds interessanter.", b:"Informatie", bk:"nb-bl", k:"n-blauw"}
];
 
var admin = false;
var WW = "dc2025";
 
/* ══ NIEUWS RENDEREN ══ */
function renderNieuws() {
  var g = document.getElementById('start-nieuws-grid');
  if (!g) return;
  var html = '';
  for (var i = 0; i < N.length; i++) {
    var item = N[i];
    html += '<div class="n-k">';
    html += '<div class="n-streak ' + item.k + '"></div>';
    html += '<div class="n-body">';
    html += '<div class="n-datum">' + item.d + '</div>';
    html += '<div class="n-titel">' + item.t + '</div>';
    html += '<div class="n-tekst">' + item.tx + '</div>';
    html += '<span class="n-badge ' + item.bk + '">' + item.b + '</span>';
    html += '</div>';
    if (admin) {
      html += '<button class="n-edit-icoon" onclick="bewerkN(' + i + ')">&#9998;</button>';
    }
    html += '<div class="n-edit-form" id="ef-' + i + '">';
    html += '<small style="font-weight:700;color:var(--bl)">Bewerken:</small>';
    html += '<input type="text" id="ed-d-' + i + '" placeholder="Datum" value="' + item.d.replace(/"/g, '') + '">';
    html += '<input type="text" id="ed-t-' + i + '" placeholder="Titel" value="' + item.t.replace(/"/g, '') + '">';
    html += '<textarea id="ed-tx-' + i + '" placeholder="Tekst">' + item.tx + '</textarea>';
    html += '<input type="text" id="ed-b-' + i + '" placeholder="Badge" value="' + item.b.replace(/"/g, '') + '">';
    html += '<select id="ed-k-' + i + '">';
    var kleuren = ['n-groen','n-blauw','n-paars','n-teal'];
    for (var j = 0; j < kleuren.length; j++) {
      html += '<option value="' + kleuren[j] + '"' + (item.k === kleuren[j] ? ' selected' : '') + '>' + kleuren[j].replace('n-','') + '</option>';
    }
    html += '</select>';
    html += '<div class="n-edit-btns">';
    html += '<button class="b-op" onclick="slaaN(' + i + ')">Opslaan</button>';
    html += '<button class="b-an" onclick="sluitN(' + i + ')">Annuleer</button>';
    html += '<button class="b-vw" onclick="verwijderN(' + i + ')">Verwijder</button>';
    html += '</div></div></div>';
  }
  g.innerHTML = html;
  if (admin) g.classList.add('redacteur-modus');
  else g.classList.remove('redacteur-modus');
}
 
function bewerkN(i) {
  var f = document.getElementById('ef-' + i);
  if (f) f.classList.toggle('toon');
}
function sluitN(i) {
  var f = document.getElementById('ef-' + i);
  if (f) f.classList.remove('toon');
}
function slaaN(i) {
  N[i].d  = document.getElementById('ed-d-' + i).value;
  N[i].t  = document.getElementById('ed-t-' + i).value;
  N[i].tx = document.getElementById('ed-tx-' + i).value;
  N[i].b  = document.getElementById('ed-b-' + i).value;
  N[i].k  = document.getElementById('ed-k-' + i).value;
  renderNieuws();
}
function verwijderN(i) {
  if (confirm('Dit bericht verwijderen?')) { N.splice(i, 1); renderNieuws(); }
}
function voegNieuwsToe() {
  N.unshift({d:"Datum", t:"Nieuwe titel", tx:"Omschrijving...", b:"Label", bk:"nb-g", k:"n-groen"});
  renderNieuws();
  setTimeout(function() { bewerkN(0); }, 80);
}
function exporteerNieuws() {
  var out = document.getElementById('export-output');
  out.style.display = 'block';
  out.textContent = JSON.stringify(N, null, 2);
}
 
/* ══ NIEUWS BEHEER TOGGLE (onopvallend) ══ */
function toggleHomeBeheer() {
  var form = document.getElementById('home-beheer-form');
  form.style.display = (form.style.display === 'none' || form.style.display === '') ? 'block' : 'none';
}
function toggleAdmin() {
  var ww = document.getElementById('admin-ww').value;
  if (!admin) {
    if (ww === WW) {
      admin = true;
      document.getElementById('admin-knop').textContent = 'Uitloggen';
      document.getElementById('admin-knop').classList.add('actief');
      document.getElementById('admin-ww').style.display = 'none';
      document.getElementById('admin-beheer-knoppen').style.display = 'flex';
      renderNieuws();
    } else {
      alert('Onjuist wachtwoord');
    }
  } else {
    admin = false;
    document.getElementById('admin-knop').textContent = 'Inloggen';
    document.getElementById('admin-knop').classList.remove('actief');
    document.getElementById('admin-ww').style.display = '';
    document.getElementById('admin-ww').value = '';
    document.getElementById('admin-beheer-knoppen').style.display = 'none';
    renderNieuws();
  }
}
 
/* ══ OVER ONS TABS ══ */
function toonPanel(naam, tab) {
  document.querySelectorAll('.over-panel').forEach(function(p) { p.classList.remove('toon'); });
  document.querySelectorAll('.over-tab').forEach(function(t) { t.classList.remove('actief'); });
  var panel = document.getElementById('panel-' + naam);
  if (panel) panel.classList.add('toon');
  if (tab) tab.classList.add('actief');
}
 
/* ══ NAVIGATIE ══ */
var SEC = ['s0','s1','s2','s3','s4','s5','s6'];
function naarStap(n) {
  for (var i = 0; i < SEC.length; i++) {
    var el = document.getElementById(SEC[i]);
    if (el) el.style.display = (i === n) ? 'block' : 'none';
  }
  // Scan balk: toon alleen bij stappen 1, 2, 3
  var balk = document.getElementById('scan-balk');
  if (balk) {
    if (n >= 1 && n <= 3) {
      balk.classList.add('toon');
      // Actieve stap markeren
      for (var j = 1; j <= 3; j++) {
        var ss = document.getElementById('ss' + j);
        if (ss) {
          ss.classList.remove('actief','klaar');
          if (j === n)       ss.classList.add('actief');
          else if (j < n)    ss.classList.add('klaar');
        }
      }
    } else {
      balk.classList.remove('toon');
    }
  }
  // Verberg nav volledig tijdens scan, toon weer op andere pagina's
  var nav = document.getElementById('nav');
  if (nav) {
    nav.style.display = (n >= 1 && n <= 3) ? 'none' : '';
  }
  if (n === 3) berekenRes();
  if (n === 4) berekenZon();
  if (n === 0) renderNieuws();
  window.scrollTo({top: 0, behavior: 'smooth'});
  // Nav knoppen highlight
  var nkMap = {0:'nk0',1:'nk1',2:'nk1',3:'nk1',4:'nk4',5:'nk5',6:'nk6'};
  ['nk0','nk1','nk4','nk5','nk6'].forEach(function(id){
    var el = document.getElementById(id);
    if(el) el.classList.remove('hl');
  });
  var aktief = nkMap[n];
  if(aktief){
    var el = document.getElementById(aktief);
    if(el && aktief !== 'nk1') el.classList.add('hl');
  }
}
 
/* ══ STAP 1 ══ */
var wF=1.0, iF=1.0, elF=1.0, aantalBew=2, antw={};
function kiesW(el) {
  document.querySelectorAll('.w-kaart').forEach(function(k) { k.classList.remove('ok'); });
  el.classList.add('ok');
  wF = parseFloat(el.dataset.f);
}
function kiesBJ(el) {
  document.querySelectorAll('.bj').forEach(function(b) { b.classList.remove('ok'); });
  el.classList.add('ok');
  iF = parseFloat(el.dataset.iso);
}
function kiesEL(el) {
  document.querySelectorAll('.el-k').forEach(function(k) { k.classList.remove('ok'); });
  el.classList.add('ok');
  elF = parseFloat(el.dataset.elf);
}
function bew(d) {
  aantalBew = Math.max(1, Math.min(10, aantalBew + d));
  document.getElementById('bew-n').textContent = aantalBew;
}
 
/* ══ CHECKLIST ══ */
var groepen = {
  verw: ['cv-oud','hr-ketel','warmtepomp'],
  kook: ['gas-koken','keramisch','inductie'],
  douche: ['regendouche','normaal-douche','bespaardouche'],
  glas: ['enkel-glas','dubbel-glas','hr-glas'],
  verl: ['geen-led','led']
};
var idNaarGroep = {};
Object.keys(groepen).forEach(function(g) {
  groepen[g].forEach(function(id) { idNaarGroep[id] = g; });
});
 
function stel(knop, keuze) {
  var ci = knop.closest('.ci');
  var id = ci.dataset.id;
  var was = antw[id];
  if (was === keuze) {
    ci.classList.remove('ja','nee');
    delete antw[id];
    var g = idNaarGroep[id];
    if (g) {
      groepen[g].forEach(function(oid) {
        var el = document.querySelector('[data-id="' + oid + '"]');
        if (el) el.classList.remove('verborgen');
      });
    }
  } else {
    ci.classList.remove('ja','nee');
    ci.classList.add(keuze);
    antw[id] = keuze;
    if (keuze === 'ja') {
      var g = idNaarGroep[id];
      if (g) {
        groepen[g].forEach(function(oid) {
          if (oid !== id) {
            var el = document.querySelector('[data-id="' + oid + '"]');
            if (el) { el.classList.add('verborgen'); el.classList.remove('ja','nee'); delete antw[oid]; }
          }
        });
      }
    }
  }
  updateVG();
}
 
function updateVG() {
  var tot = document.querySelectorAll('.ci').length;
  var b = Object.keys(antw).length;
  document.getElementById('vg-t').textContent = b + ' van ' + tot + ' vragen beantwoord';
  document.getElementById('vg-v').style.width = (b / tot * 100) + '%';
}
 
/* ══ RESULTAAT ══ */
var tipData = [
  {id:'cv-oud',       n:'Oude CV-ketel vervangen',       b:100, u:'HR-ketel of warmtepomp is efficiënter. Subsidie via ISDE.'},
  {id:'wasdroger',    n:'Wasdroger',                     b:105, u:'Gebruik waslijn of warmtepompdroger (A+++).'},
  {id:'oud-koelkast', n:'Verouderde koelkast/vriezer',   b:85,  u:'Verouderde apparaten verbruiken 2–3× meer.'},
  {id:'vriezer-ijs',  n:'Vriezer ontdooien',             b:52,  u:'IJsaanslag laat de motor harder werken.'},
  {id:'elek-vloer',   n:'Elektrische verwarming',        b:120, u:'Warmtepomp of slimme thermostaat is beter.'},
  {id:'airco',        n:'Airconditioning',               b:55,  u:'2°C hoger instellen en gordijnen sluiten.'},
  {id:'terrasverw',   n:'Terrasverwarming',              b:90,  u:'Gebruik een buitendeken.'},
  {id:'infrarood',    n:'Infraroodpanelen',              b:110, u:'Als primaire verwarming hoog verbruik.'},
  {id:'hottub',       n:'Hottub/jacuzzi',                b:220, u:'Verbruikt 1.500–3.000 kWh/jaar.'},
  {id:'boiler-elek',  n:'Elektrische boiler',            b:55,  u:'Zet op een timer.'},
  {id:'regendouche',  n:'Regendouche',                   b:110, u:'Verbruikt dubbel zoveel warm water.'},
  {id:'normaal-douche',n:'Waterbesparende douchekop',    b:45,  u:'FIXbrigade plaatst gratis!'},
  {id:'bad',          n:'Bad minder vullen',             b:65,  u:'150–200 liter warm water per bad.'},
  {id:'lang-douche',  n:'Korter douchen',                b:70,  u:'Elke minuut korter bespaart direct.'},
  {id:'wasmachine-heet',n:'Wassen op lagere temperatuur',b:38,  u:'30°C spaart 50–60% op wasenergie.'},
  {id:'keramisch',    n:'Keramische kookplaat',          b:45,  u:'Inductie is 30–40% zuiniger.'},
  {id:'oven',         n:'Oven vs. airfryer',             b:32,  u:'Airfryer gebruikt 50–70% minder.'},
  {id:'frituur',      n:'Frituurpan',                   b:28,  u:'Vervang door airfryer.'},
  {id:'waterkoker',   n:'Waterkoker',                   b:12,  u:'Kook alleen wat u nodig heeft.'},
  {id:'laadpaal',     n:'Slim laden EV',                b:65,  u:'Laad in daluren (22:00–07:00).'},
  {id:'aquarium',     n:'Aquarium',                     b:58,  u:'LED-verlichting en efficiënte filter helpen.'},
  {id:'gaming-pc',    n:'Computer/gaming-pc',           b:75,  u:'Echt uitzetten bespaart structureel.'},
  {id:'opladers',     n:'Opladers uit stopcontact',     b:28,  u:'Schakelbare stekkerdoos aanschaffen.'},
  {id:'tv-standby',   n:'TV echt uitzetten',            b:16,  u:'Standby verbruikt 5–15W continu.'},
  {id:'enkel-glas',   n:'Enkel glas vervangen',         b:160, u:'HR++-glas is de beste stap. Subsidie via ISDE.'},
  {id:'dubbel-glas',  n:'HR++-glas upgrade',            b:45,  u:'Vermindert warmteverlies verder.'},
  {id:'geen-led',     n:'Overstap naar LED',            b:75,  u:'Terugverdientijd onder een jaar.'}
];
var kansenNee = {
  'spouwmuur':    {b:160, n:'Spouwmuurisolatie aanbrengen',  u:'Meest kosteneffectief voor woningen voor 2000.'},
  'dakiso':       {b:110, n:'Dakisolatie aanbrengen',        u:'Via het dak verliest u 25–30% warmte.'},
  'vloeriso':     {b:75,  n:'Vloer-/kruipruimte-isolatie',   u:'Goedkoop en effectief.'},
  'tocht':        {b:38,  n:'Tochtstrips aanbrengen',        u:'FIXbrigade doet dit gratis bij u thuis!'},
  'radfolie':     {b:48,  n:'Radiatorfolie plaatsen',        u:'FIXbrigade plaatst het gratis!'},
  'zonnepanelen': {b:650, n:'Zonnepanelen plaatsen',         u:'Bekijk de zonnepanelen rekenmachine.'},
  'thuisbatterij':{b:130, n:'Thuisbatterij overwegen',       u:'Steeds interessanter nu saldering afneemt.'},
  'warmtepomp':   {b:200, n:'Warmtepomp installeren',        u:'3–4× efficiënter dan gas.'},
  'slimme-therm': {b:65,  n:'Slimme thermostaat',            u:'Bespaart gemiddeld 65 euro per jaar.'},
  'bespaardouche':{b:58,  n:'Waterbesparende douchekop',     u:'FIXbrigade plaatst gratis!'},
  'zonneboiler':  {b:85,  n:'Zonneboiler',                   u:'50–70% besparing op warmwaterkosten.'},
  'dyn-contract': {b:55,  n:'Dynamisch energiecontract',     u:'Aanzienlijk besparen met daluren.'},
  'airfryer':     {b:22,  n:'Airfryer aanschaffen',          u:'50–70% minder dan een oven.'}
};
var goedItems = {
  'led':'LED-verlichting','warmtepomp':'Warmtepomp','zonnepanelen':'Zonnepanelen',
  'thuisbatterij':'Thuisbatterij','bespaardouche':'Waterbesparende douchekop',
  'airfryer':'Airfryer','hr-glas':'HR++-glas','spouwmuur':'Spouwmuurisolatie',
  'dakiso':'Dakisolatie','vloeriso':'Vloerisolatie','tocht':'Tochtstrips',
  'radfolie':'Radiatorfolie','slimme-therm':'Slimme thermostaat',
  'inductie':'Inductiekookplaat','hr-ketel':'HR-ketel',
  'zonneboiler':'Zonneboiler','dyn-contract':'Dynamisch contract'
};
 
function berekenRes() {
  var tot = 0, tips = [], goed = [];
  tipData.forEach(function(t) {
    if (antw[t.id] === 'ja') {
      var b = Math.round(t.b * wF * (0.8 + aantalBew * 0.1) * iF * elF);
      tips.push({n: t.n, b: b, u: t.u});
      tot += b;
    }
  });
  Object.keys(kansenNee).forEach(function(id) {
    if (antw[id] === 'nee') {
      var info = kansenNee[id];
      var b = Math.round(info.b * wF);
      tips.push({n: info.n, b: b, u: info.u});
      tot += b;
    }
  });
  Object.keys(goedItems).forEach(function(id) {
    if (antw[id] === 'ja') goed.push(goedItems[id]);
  });
  tot = Math.round(tot);
  tips.sort(function(a, b) { return b.b - a.b; });
  document.getElementById('r-bedrag').textContent = '€ ' + tot.toLocaleString('nl-NL');
  document.getElementById('r-sub').textContent = 'Op basis van ' + Object.keys(antw).length + ' ingevulde vragen';
  var tHtml = '';
  if (tips.length) {
    tips.forEach(function(t) {
      tHtml += '<div class="tip-k"><div class="tip-top"><div class="tip-n">' + t.n + '</div><div class="tip-badge">~€' + t.b + '/jr</div></div><div class="tip-u">' + t.u + '</div></div>';
    });
  } else {
    tHtml = '<div style="color:var(--t3);padding:1rem;">Vul de checklist in om tips te zien.</div>';
  }
  document.getElementById('tips-c').innerHTML = tHtml;
  var pHtml = '';
  goed.forEach(function(n) { pHtml += '<li>✓ ' + n + '</li>'; });
  document.getElementById('pos-l').innerHTML = pHtml;
  document.getElementById('pos-b').style.display = goed.length ? 'block' : 'none';
}
 
/* ══ ZONNEPANELEN ══ */
function berekenZon() {
  var pZ = parseInt(document.getElementById('z-z').value) || 0;
  var pO = parseInt(document.getElementById('z-o').value) || 0;
  var pW = parseInt(document.getElementById('z-w').value) || 0;
  var pN = parseInt(document.getElementById('z-n').value) || 0;
  var wp = parseInt(document.getElementById('z-wp').value) || 400;
  var prijs = parseFloat(document.getElementById('z-prijs').value) || 0.36;
  var terug = parseFloat(document.getElementById('z-terug').value) || 0.08;
  var eigPct = (parseFloat(document.getElementById('z-eigen').value) || 35) / 100;
  var battB = parseFloat(document.getElementById('z-batt').value) || 0;
  var invest = parseFloat(document.getElementById('z-invest').value) || 5000;
  var kwpZ = pZ*(wp/1000), kwpO = pO*(wp/1000)*0.87, kwpW = pW*(wp/1000)*0.87, kwpN = pN*(wp/1000)*0.65;
  var kwh = Math.round((kwpZ+kwpO+kwpW+kwpN)*875);
  var effE = Math.min(0.93, eigPct + battB/100);
  var eigK = Math.round(kwh * effE), terugK = kwh - eigK;
  var totO = Math.round(eigK*prijs) + Math.round(terugK*prijs);
  var totN = Math.round(eigK*prijs) + Math.round(terugK*terug);
  var tvtO = totO > 0 ? (invest/totO).toFixed(1) : '—';
  var tvtN = totN > 0 ? (invest/totN).toFixed(1) : '—';
  document.getElementById('z-tp').textContent = pZ+pO+pW+pN;
  document.getElementById('z-tkwp').textContent = (kwpZ+kwpO+kwpW+kwpN).toFixed(2);
  document.getElementById('z-opwek').textContent = kwh.toLocaleString('nl-NL') + ' kWh';
  document.getElementById('z-ep').textContent = Math.round(effE*100) + '% · ' + eigK.toLocaleString('nl-NL') + ' kWh';
  document.getElementById('z-tk').textContent = terugK.toLocaleString('nl-NL') + ' kWh';
  document.getElementById('z-met').textContent = '€ ' + totO.toLocaleString('nl-NL');
  document.getElementById('z-zonder').textContent = '€ ' + totN.toLocaleString('nl-NL');
  document.getElementById('z-tvt-oud').textContent = tvtO;
  document.getElementById('z-tvt-nu').textContent = tvtN;
  var adv = '', cls = 'geel', tvtNr = parseFloat(tvtN);
  if (tvtNr <= 8)       { cls = 'groen'; adv = '✅ <strong>Interessant!</strong> Terugverdientijd ' + tvtN + ' jaar ook zonder saldering. Een goede investering!'; }
  else if (tvtNr <= 14) { cls = 'geel';  adv = '🔶 <strong>Redelijk interessant.</strong> ' + tvtN + ' jaar. Verhoog eigen verbruik om dit te verbeteren.'; }
  else                  { cls = 'rood';  adv = '🔴 <strong>Let op!</strong> ' + tvtN + ' jaar is lang. Verhoog eigen verbruik overdag flink.'; }
  if (terug < 0.10) adv += '<br><br>💡 Elk kWh zelf gebruiken is €' + prijs.toFixed(2) + ' waard vs. €' + terug.toFixed(2) + ' terugleveren.';
  var advel = document.getElementById('z-adv');
  advel.innerHTML = adv;
  advel.className = 'z-adv ' + cls;
}
 
/* ══ SUBSIDIES FILTER ══ */
function filterSub(cat, k) {
  document.querySelectorAll('.sf-k').forEach(function(x) { x.classList.remove('actief'); });
  k.classList.add('actief');
  document.querySelectorAll('.sub-k').forEach(function(x) {
    x.classList.toggle('verborgen', cat !== 'alles' && x.dataset.cats.indexOf(cat) === -1);
  });
}
 
/* ══ HERSTART ══ */
function herstart() {
  antw = {};
  document.querySelectorAll('.ci').forEach(function(ci) { ci.classList.remove('ja','nee','verborgen'); });
  document.querySelectorAll('.w-kaart,.bj,.el-k').forEach(function(k) { k.classList.remove('ok'); });
  wF=1.0; iF=1.0; elF=1.0; aantalBew=2;
  document.getElementById('bew-n').textContent = 2;
  updateVG();
  naarStap(1);
}
 
/* ══ INIT ══ */
window.addEventListener('scroll', function() {
  document.getElementById('nav').classList.toggle('vast', window.scrollY > 80);
});
// Toon alleen s0, verberg de rest
for (var i = 0; i < SEC.length; i++) {
  var el = document.getElementById(SEC[i]);
  if (el) el.style.display = (i === 0) ? 'block' : 'none';
}
renderNieuws();
berekenZon();

/* ══ HAMBURGER MENU ══ */
function toggleMobielMenu(){
  var m=document.getElementById('mobiel-menu');
  var h=document.getElementById('hamburger');
  var open=m.style.display==='flex';
  m.style.display=open?'none':'flex';
  h.setAttribute('aria-expanded',open?'false':'true');
  h.setAttribute('aria-label',open?'Menu openen':'Menu sluiten');
}
function sluitMobielMenu(){
  var m=document.getElementById('mobiel-menu');
  var h=document.getElementById('hamburger');
  m.style.display='none';
  h.setAttribute('aria-expanded','false');
  h.setAttribute('aria-label','Menu openen');
}
