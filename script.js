const TYPES_LABELS = { phishing:'PHISHING', romance:'ROMANCE SCAM', investissement:'INVESTISSEMENT', crypto:'CRYPTO FRAUD', lottery:'LOTERIE', tech:'FAUX SUPPORT', emploi:'OFFRE EMPLOI', assurance:'FRAUDE BANCAIRE' };
const TYPE_COLORS = { phishing:'#00d4ff', romance:'#ff82a9', investissement:'#f5a623', crypto:'#b259ff', lottery:'#39ff14', tech:'#ff9933', emploi:'#66ccff', assurance:'#ff6b6b' };

const SCAM_TYPES_PROTECT = [
  { key:'phishing', label:'Phishing & Usurpation', sub:'Email, SMS, faux sites', icon:'🎣' },
  { key:'romance', label:'Romance Scam', sub:'Réseaux sociaux, dating', icon:'💔' },
  { key:'crypto', label:'Crypto & Investissement', sub:'Plateformes frauduleuses', icon:'₿' },
  { key:'tech', label:'Faux Support Technique', sub:'Pop-ups, appels entrants', icon:'💻' },
  { key:'emploi', label:'Offre d\'Emploi Fictive', sub:'LinkedIn, WhatsApp', icon:'💼' },
  { key:'lottery', label:'Loterie & Héritages', sub:'Email, courrier postal', icon:'🎰' },
  { key:'investissement', label:'Arnaque Immobilière', sub:'Leboncoin, SeLoger', icon:'🏠' },
  { key:'assurance', label:'Fraude Bancaire', sub:'Virement, carte bleue', icon:'💳' },
];

const STATIC_STRATEGIES = {
  phishing: [
    { title:"Vérifier l'expéditeur réel", text:"Ne fais jamais confiance à l'affichage du nom. Clique sur l'adresse pour voir l'email complet. Les arnaqueurs utilisent des variations comme 'support@amazon-secure.com' au lieu de 'amazon.com'." },
    { title:"Ne jamais cliquer sans vérifier l'URL", text:"Survole le lien sans cliquer. L'URL doit correspondre exactement au domaine officiel. Tape toi-même l'adresse dans ton navigateur." },
    { title:"Méfie-toi de l'urgence artificielle", text:"Les messages légitimes ne t'imposent jamais une deadline de 24h. L'urgence est le principal vecteur de manipulation du phishing — plus c'est urgent, plus c'est suspect." },
    { title:"Activer le 2FA partout", text:"Même si ton mot de passe est volé, l'authentification à deux facteurs bloque l'accès. Utilise une app (Authy, Google Authenticator) plutôt que le SMS." },
    { title:"Signaler les tentatives", text:"Transmets les emails suspects à phishing@signal-spam.fr. En France, signale-les aussi sur cybermalveillance.gouv.fr." },
  ],
  romance: [
    { title:"Reverse image search immédiat", text:"Glisse la photo de profil dans Google Images ou TinEye. Les arnaqueurs utilisent des photos volées de militaires, médecins ou modèles — souvent facilement identifiables." },
    { title:"Refus absolu de tout virement", text:"Une personne que tu n'as jamais rencontrée en vrai n'a JAMAIS une raison légitime de te demander de l'argent, quelles que soient les circonstances inventées." },
    { title:"Exiger un appel vidéo spontané", text:"Demande un appel vidéo immédiat sans prévenir. Un vrai militaire, médecin ou ingénieur à l'étranger trouve toujours 5 minutes. Un arnaqueur refuse systématiquement." },
    { title:"Parler à un proche avant d'agir", text:"Les arnaqueurs isolent leurs victimes. Partage la situation avec un ami avant de prendre toute décision. Un regard extérieur aide à voir ce que l'émotion cache." },
  ],
  crypto: [
    { title:"Rendements garantis = arnaque certaine", text:"Aucun investissement légitime ne garantit des rendements fixes. Les vraies crypto sont volatiles par nature. Toute promesse de 10%, 20% ou plus garantis est une arnaque." },
    { title:"Vérifier la liste AMF", text:"En France, utilise uniquement des plateformes enregistrées auprès de l'AMF. Consulte la liste noire officielle sur amf-france.org avant d'investir le moindre euro." },
    { title:"Tester les retraits en premier", text:"Avant d'investir une somme importante, essaie de retirer immédiatement une petite somme. Si la plateforme bloque ou réclame des 'frais supplémentaires', c'est une arnaque." },
    { title:"Méfie-toi des 'conseillers' non sollicités", text:"Les arnaqueurs contactent leurs victimes via les réseaux sociaux ou WhatsApp en se faisant passer pour des experts. Aucun vrai conseiller financier ne te contacte ainsi." },
  ],
  tech: [
    { title:"Fermer le pop-up, ne jamais appeler", text:"Aucun vrai service Microsoft, Apple ou Google n'alerte via un pop-up avec un numéro à appeler. Ferme la fenêtre avec Ctrl+F4 ou force la fermeture du navigateur." },
    { title:"Refuser tout accès à distance", text:"Si quelqu'un te demande d'installer TeamViewer, AnyDesk ou similaire pour 'réparer' ton PC, refuse catégoriquement. Ils prendront le contrôle total de ta machine." },
    { title:"Contacter le vrai support par toi-même", text:"Si tu doutes, va sur le site officiel de la marque et contacte leur support via leurs propres canaux. Ne rappelle jamais le numéro affiché dans une alerte." },
    { title:"Les vrais antivirus alertent discrètement", text:"Windows Defender, Bitdefender alertent via la barre des tâches — jamais via des pop-ups alarmistes plein écran. Un pop-up dramatique est toujours suspect." },
  ],
  emploi: [
    { title:"Vérifier l'entreprise indépendamment", text:"Cherche l'entreprise sur Google, LinkedIn et Infogreffe. Si elle n'a pas de présence vérifiable, fuis. Les offres reçues uniquement sur WhatsApp sont un signal d'alarme majeur." },
    { title:"Refuser tout paiement initial", text:"Un vrai employeur ne te demande jamais de payer pour une formation, un uniforme ou du matériel avant de commencer. C'est le marqueur numéro 1 d'une arnaque à l'emploi." },
    { title:"Salaire disproportionné = signal rouge", text:"500€/jour pour trier des emails à domicile n'existe pas. Si le salaire est anormalement élevé pour des tâches simples, c'est une arnaque — sans exception." },
    { title:"Documents sensibles uniquement après contrat", text:"Carte d'identité, RIB, numéro de sécu ne se transmettent qu'après signature d'un contrat officiel vérifiable. Jamais en début de processus." },
  ],
  lottery: [
    { title:"Règle absolue : tu n'as pas participé", text:"Tu ne peux pas gagner une loterie à laquelle tu n'as pas participé. Toute notification de gain non sollicité est une arnaque — 100% du temps, sans exception." },
    { title:"Ignorer les frais de traitement", text:"Le modèle économique de l'arnaque : tu paies des 'frais' pour récupérer un gain inexistant. Plus tu paies, plus ils inventent de nouveaux frais. Archive et supprime." },
    { title:"Zéro information personnelle", text:"Numéro de carte, RIB, copie d'identité — tout cela sera revendu ou utilisé pour de futures arnaques et usurpations d'identité." },
  ],
  investissement: [
    { title:"Visiter avant tout virement, sans exception", text:"Refuse catégoriquement tout paiement de caution ou loyer avant d'avoir visité le bien physiquement avec une personne identifiable. Aucune excuse n'est recevable." },
    { title:"Vérifier la propriété du bien", text:"Demande un titre de propriété. En France, tu peux vérifier au Service de Publicité Foncière. Un vrai propriétaire n'a aucune raison de refuser cette vérification." },
    { title:"Prix cassé = piège", text:"Un logement 30-40% moins cher que le marché local n'est pas une bonne affaire, c'est un appât. Vérifie les prix réels sur plusieurs plateformes." },
    { title:"Contact uniquement par email = méfiance", text:"Un propriétaire qui refuse tout contact téléphonique ou en personne, qui prétexte être 'à l'étranger', est presque certainement un arnaqueur." },
  ],
  assurance: [
    { title:"Ta banque ne demande JAMAIS ton code", text:"Jamais. Aucun agent bancaire légitime, par téléphone, SMS ou email, ne te demandera ton code PIN ou tes 3 chiffres CVV. Raccroche immédiatement." },
    { title:"Rappeler via le numéro officiel", text:"Si tu reçois un appel suspect prétendant venir de ta banque, raccroche et rappelle le numéro figurant au dos de ta carte bancaire. Les arnaqueurs peuvent usurper les numéros affichés." },
    { title:"Activer les alertes SMS pour chaque transaction", text:"Configure des notifications en temps réel pour toutes tes transactions. Tu détecteras immédiatement tout débit non autorisé et pourras réagir dans les minutes." },
    { title:"Plafond de paiement en ligne réduit", text:"Limite le plafond des paiements en ligne dans ton application bancaire. Augmente-le temporairement uniquement quand tu en as besoin." },
  ],
};

const SEED_DATA = [
  { id:1, name:"Arnaque au Président (BEC)", type:"phishing", severity:"critique", platform:"Email professionnel", amount:85000, origin:"International", desc:"Usurpation d'identité du PDG pour ordonner un virement urgent à un comptable. Email hors canaux habituels avec urgence maximale.", date:"2025-04-28" },
  { id:2, name:"Romance Scam Militaire", type:"romance", severity:"eleve", platform:"Réseaux sociaux / Dating apps", amount:12000, origin:"Ghana / Côte d'Ivoire", desc:"Fausse identité de militaire américain déployé à l'étranger. Relation affective développée sur plusieurs semaines avant demande d'argent.", date:"2025-04-22" },
  { id:3, name:"Pig Butchering — Crypto", type:"crypto", severity:"critique", platform:"Telegram / WhatsApp", amount:120000, origin:"Chine / Myanmar", desc:"Contact progressif sur semaines. Confiance établie puis orientation vers une fausse plateforme crypto avec gains fictifs qui bloquent les retraits.", date:"2025-05-01" },
  { id:4, name:"Phishing DGFiP (Impôts)", type:"phishing", severity:"eleve", platform:"SMS / Email", amount:800, origin:"France", desc:"SMS imitant la DGFiP annonçant un remboursement. Lien vers un faux site gouvernemental collectant données bancaires.", date:"2025-04-18" },
  { id:5, name:"Loterie Commission Européenne", type:"lottery", severity:"moyen", platform:"Email / Courrier", amount:200, origin:"Espagne / Maroc", desc:"Notification de gain fictif. Frais de traitement requis pour récupérer des gains inexistants.", date:"2025-03-30" },
  { id:6, name:"Faux Support Windows / Apple", type:"tech", severity:"eleve", platform:"Pop-up / Appel entrant", amount:300, origin:"Inde / Pakistan", desc:"Pop-up alarmiste signalant un virus. Faux support réclamant accès à distance et paiement.", date:"2025-04-10" },
  { id:7, name:"Recrutement Amazon Fictif", type:"emploi", severity:"moyen", platform:"LinkedIn / WhatsApp", amount:500, origin:"Nigeria", desc:"Fausse offre d'emploi à domicile. Avance demandée pour formation ou matériel.", date:"2025-04-05" },
  { id:8, name:"Arnaque au Logement", type:"investissement", severity:"eleve", platform:"Leboncoin / SeLoger", amount:1500, origin:"France / Roumanie", desc:"Annonce immobilière frauduleuse avec loyer attractif. Propriétaire absent à l'étranger demandant la caution avant visite.", date:"2025-05-02" },
  { id:9, name:"Phishing Énergie (EDF/Engie)", type:"phishing", severity:"moyen", platform:"Email", amount:150, origin:"International", desc:"Email imitant EDF/Engie avec fausse facture impayée. Pression temporelle pour payer via lien frauduleux.", date:"2025-04-15" },
  { id:10, name:"Spoofing Bancaire", type:"assurance", severity:"critique", platform:"Appel téléphonique", amount:8000, origin:"France / Europe de l'Est", desc:"Appel usurpant le numéro officiel de la banque. L'agent convainc la victime d'effectuer un virement 'sécurisé'.", date:"2025-04-29" }
];

const MODEL = 'gpt-4o';
const PROXY_URL = 'https://scamintel-proxy.legrandpokeya.workers.dev';

// STATE
let currentFilter = 'all', currentSearch = '', selectedRegion = 'Monde entier', selectedProtectType = null;

// ══ CORE HELPERS ══
function getDB() {
  try { const r = sessionStorage.getItem('scamintel_v2'); return r ? JSON.parse(r) : [...SEED_DATA]; }
  catch { return [...SEED_DATA]; }
}
function saveDB(d) { try { sessionStorage.setItem('scamintel_v2', JSON.stringify(d)); } catch {} }
function formatAmount(n) { return n ? n.toLocaleString('fr-FR') + ' €' : '—'; }
function formatDate(s) { if(!s) return '—'; return new Date(s).toLocaleDateString('fr-FR',{day:'2-digit',month:'short',year:'numeric'}); }
function escapeHtml(t) { return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function switchTab(id, btn) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-'+id).classList.add('active');
  btn.classList.add('active');
}

function renderStats() {
  const db = getDB();
  const lost = db.reduce((a,s) => a+(s.amount||0), 0);
  const crit = db.filter(s => s.severity==='critique').length;
  const types = new Set(db.map(s=>s.type)).size;
  const recent = db.filter(s => s.date && (new Date()-new Date(s.date)) < 30*86400000).length;
  document.getElementById('stats-bar').innerHTML = `
    <div class="stat-card c-red"><div class="stat-label">ARNAQUES TOTALES</div><div class="stat-value">${db.length}</div><div class="stat-sub">dans le registre</div></div>
    <div class="stat-card c-orange"><div class="stat-label">PERTES ESTIMÉES</div><div class="stat-value">${(lost/1000).toFixed(0)}K€</div><div class="stat-sub">cumulées</div></div>
    <div class="stat-card c-red"><div class="stat-label">NIVEAU CRITIQUE</div><div class="stat-value">${crit}</div><div class="stat-sub">menaces actives</div></div>
    <div class="stat-card c-blue"><div class="stat-label">CATÉGORIES</div><div class="stat-value">${types}</div><div class="stat-sub">types identifiés</div></div>
    <div class="stat-card c-green"><div class="stat-label">CE MOIS</div><div class="stat-value">${recent}</div><div class="stat-sub">nouveaux signalements</div></div>
  `;
}

function renderList() {
  const db = getDB();
  let f = db;
  if (currentFilter !== 'all') f = f.filter(s => s.severity===currentFilter);
  if (currentSearch) { const q=currentSearch.toLowerCase(); f=f.filter(s => (s.name+s.type+(s.platform||'')+(s.origin||'')).toLowerCase().includes(q)); }
  document.getElementById('entry-count').textContent = `${f.length} entrée${f.length!==1?'s':''}`;
  const list = document.getElementById('scam-list');
  if (!f.length) { list.innerHTML='<div class="empty-state">// AUCUN RÉSULTAT //</div>'; return; }
  list.innerHTML = f.map(s => `
    <div class="scam-entry" onclick="openDetail(${s.id})">
      <div class="sev-dot sev-${s.severity}"></div>
      <div><div class="scam-name">${s.name}</div><div class="scam-meta">${s.platform||'—'} · ${s.origin||'—'}</div></div>
      <span class="scam-tag tag-${s.type}">${TYPES_LABELS[s.type]||s.type}</span>
      <div class="scam-amount">${formatAmount(s.amount)}</div>
      <div class="scam-date">${formatDate(s.date)}</div>
    </div>
  `).join('');
}

function renderDonut() {
  const db = getDB();
  const counts = {}; db.forEach(s => { counts[s.type]=(counts[s.type]||0)+1; });
  const total = db.length;
  const entries = Object.entries(counts).sort((a,b)=>b[1]-a[1]);
  const cx=80,cy=80,r=58,inner=36; let offset=-Math.PI/2, paths='';
  entries.forEach(([type,count]) => {
    const pct=count/total, angle=pct*2*Math.PI;
    const x1=cx+r*Math.cos(offset),y1=cy+r*Math.sin(offset);
    const x2=cx+r*Math.cos(offset+angle),y2=cy+r*Math.sin(offset+angle);
    const xi1=cx+inner*Math.cos(offset),yi1=cy+inner*Math.sin(offset);
    const xi2=cx+inner*Math.cos(offset+angle),yi2=cy+inner*Math.sin(offset+angle);
    const large=angle>Math.PI?1:0;
    paths+=`<path d="M${xi1},${yi1} L${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} L${xi2},${yi2} A${inner},${inner} 0 ${large},0 ${xi1},${yi1} Z" fill="${TYPE_COLORS[type]||'#888'}" opacity="0.85" stroke="var(--bg)" stroke-width="2"/>`;
    offset+=angle;
  });
  paths+=`<text x="${cx}" y="${cy-6}" text-anchor="middle" fill="#fff" font-family="'Barlow Condensed'" font-weight="700" font-size="22">${total}</text><text x="${cx}" y="${cy+12}" text-anchor="middle" fill="#4a7a96" font-family="'Share Tech Mono'" font-size="9" letter-spacing="2">TOTAL</text>`;
  document.getElementById('donut-svg').innerHTML=paths;
  document.getElementById('donut-legend').innerHTML=entries.slice(0,6).map(([type,count])=>`
    <div class="legend-item"><div class="legend-left"><div class="legend-dot" style="background:${TYPE_COLORS[type]||'#888'}"></div>${TYPES_LABELS[type]||type}</div><span class="legend-pct">${Math.round(count/total*100)}%</span></div>
  `).join('');
}

// ══ AI SCAN ══
function selectRegion(btn, region) {
  document.querySelectorAll('.region-btn').forEach(b=>b.classList.remove('selected'));
  btn.classList.add('selected'); selectedRegion=region;
}

async function launchScan() {
  const type=document.getElementById('scan-type').value;
  const period=document.getElementById('scan-period').value;
  const btn=document.getElementById('scan-btn');
  const output=document.getElementById('scan-output');

  btn.disabled=true; btn.textContent='⏳ ANALYSE EN COURS...';
  output.innerHTML='<div class="ai-loading"><div class="spinner"></div> Connexion IA · Analyse des tendances mondiales en cours...</div>';
  document.getElementById('scan-alerts-card').classList.add('hidden');

  const prompt=`Tu es un expert mondial en cybersécurité et lutte contre la fraude. Génère un rapport de renseignement précis sur les arnaques actives :

RÉGION : ${selectedRegion}
TYPE : ${type}
PÉRIODE : ${period}

Structure ton rapport (sois factuel, précis, avec des données réalistes) :

📊 RÉSUMÉ EXÉCUTIF
2-3 phrases sur la situation actuelle avec chiffres réalistes (signalements, montants, tendances).

🌍 ZONES LES PLUS TOUCHÉES
3-4 pays/régions spécifiques avec explication courte.

⚠️ TECHNIQUES ACTIVES EN CE MOMENT
3-4 techniques concrètes avec exemples de messages/approches réels utilisés par les arnaqueurs.

🎯 PROFILS DES VICTIMES CIBLÉES
Qui sont les cibles principales ? Âge, profession, vulnérabilités exploitées.

📈 TENDANCE
Évolution sur la période : hausse, stable ou baisse ? Pourquoi ?

🚨 ALERTE PRIORITAIRE
La menace la plus urgente et spécifique du moment dans cette région.

Sois direct, opérationnel et factuel. Donne des détails concrets.`;

  try {
    const response = await fetch(PROXY_URL, {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({ model:MODEL, max_tokens:4000, messages:[{role:"user",content:prompt}] })
    });
    const data=await response.json();
    if(data.error){output.innerHTML="<span style='color:var(--accent2)'>// ERREUR API: "+escapeHtml(data.error.message||"")+"</span>";btn.disabled=false;btn.textContent="⚡ LANCER LE SCAN IA";return;}
    const text=data.choices?.[0]?.message?.content||'Réponse IA vide';
    const wasTruncated = data.choices?.[0]?.finish_reason==='length';

    output.innerHTML=''; let i=0;
    const interval=setInterval(()=>{
      if(i<text.length) { output.innerHTML=escapeHtml(text.slice(0,i+1))+'<span class="terminal-cursor"></span>'; i+=4; output.scrollTop=output.scrollHeight; }
      else {
        output.innerHTML=escapeHtml(text);
        if(wasTruncated) output.innerHTML+=`\n\n<span style="color:var(--accent3);font-size:11px">⚠ Réponse longue — relance le scan pour obtenir la suite</span>`;
        clearInterval(interval); showScanAlerts(text);
      }
    }, 10);

  } catch(err) { output.innerHTML=`<span style="color:var(--accent2)">// ERREUR DE CONNEXION IA\n${err.message}</span>`; }

  btn.disabled=false; btn.textContent='⚡ LANCER LE SCAN IA';
}

function showScanAlerts(text) {
  const card=document.getElementById('scan-alerts-card');
  const div=document.getElementById('scan-alerts');
  div.innerHTML='';
  const alertMatch=text.match(/🚨[^\n]*\n([\s\S]+?)(?=\n[📊🌍⚠️🎯📈]|$)/);
  const trendMatch=text.match(/📈[^\n]*\n([\s\S]+?)(?=\n[📊🌍⚠️🎯🚨]|$)/);
  if(alertMatch) div.innerHTML+=`<div class="scan-alert">🚨 <strong>ALERTE PRIORITAIRE</strong><br>${escapeHtml(alertMatch[1].trim().slice(0,400))}</div>`;
  if(trendMatch) {
    const t=trendMatch[1].trim(), isUp=t.toLowerCase().includes('hausse')||t.toLowerCase().includes('augment');
    div.innerHTML+=`<div class="scan-alert" style="border-color:${isUp?'var(--accent3)':'var(--accent4)'}">📈 <strong>TENDANCE :</strong> ${escapeHtml(t.slice(0,300))}</div>`;
  }
  if(div.innerHTML) card.classList.remove('hidden');
}

// ══ PROTÉGER ══
function renderTypeList() {
  document.getElementById('type-list').innerHTML=SCAM_TYPES_PROTECT.map(t=>`
    <div class="type-item" id="type-item-${t.key}" onclick="selectType('${t.key}')">
      <div class="type-icon">${t.icon}</div>
      <div><div class="type-label">${t.label}</div><div class="type-sub">${t.sub}</div></div>
    </div>
  `).join('');
}

function selectType(key) {
  document.querySelectorAll('.type-item').forEach(el=>el.classList.remove('selected'));
  document.getElementById('type-item-'+key)?.classList.add('selected');
  selectedProtectType=key;
  const t=SCAM_TYPES_PROTECT.find(x=>x.key===key);
  const strategies=STATIC_STRATEGIES[key]||[];
  const color=TYPE_COLORS[key]||'var(--accent)';
  document.getElementById('protect-content').innerHTML=`
    <div class="protect-header">
      <div class="protect-title">${t.icon} ${t.label}</div>
      <button type="button" class="protect-ai-btn" id="ai-protect-btn" onclick="generateAIProtect('${key}')">⚡ CONSEILS IA AVANCÉS</button>
    </div>
    <div class="config-label" style="margin-bottom:14px">// STRATÉGIES DE PROTECTION — BASE DE CONNAISSANCES</div>
    <div class="strategies-static">
      ${strategies.map((s,i)=>`
        <div class="strategy-card">
          <div class="strategy-num" style="color:${color};border-color:${color}55">${String(i+1).padStart(2,'0')}</div>
          <div class="strategy-text"><strong>${s.title}</strong>${s.text}</div>
        </div>
      `).join('')}
    </div>
    <div id="ai-protect-output" style="margin-top:20px"></div>
  `;
}

async function generateAIProtect(key) {
  const t = SCAM_TYPES_PROTECT.find(x => x.key === key);
  const label = t?.label || key;
  const btn=document.getElementById('ai-protect-btn');
  const output=document.getElementById('ai-protect-output');
  if (!btn || !output) return;
  btn.disabled=true; btn.innerHTML='<div class="spinner" style="width:14px;height:14px;border-width:2px;display:inline-block;margin-right:8px"></div> Génération IA...';
  output.innerHTML='<div class="ai-loading"><div class="spinner"></div> L\'IA prépare tes conseils avancés personnalisés...</div>';

  const prompt=`Tu es un expert en cybersécurité et protection contre les arnaques. Génère des conseils de protection AVANCÉS contre : ${label}

Ne répète pas les conseils habituels. Donne des stratégies moins connues, techniques et vraiment efficaces.

🔬 TECHNIQUES DE DÉTECTION AVANCÉES
3 méthodes concrètes pour détecter cette arnaque AVANT d'en être victime, avec outils spécifiques.

🛡️ MESURES PRÉVENTIVES TECHNIQUES
3-4 actions concrètes à mettre en place maintenant (outils, paramètres, applications).

🧠 PSYCHOLOGIE DE DÉFENSE
Mécanismes psychologiques exploités et comment s'en immuniser.

⚡ RÉFLEXES D'URGENCE (60 premières minutes)
Que faire exactement si tu réalises que tu es victime en ce moment ?

📋 RESSOURCES OFFICIELLES FRANÇAISES
2-3 organismes/sites/numéros officiels spécifiques à ce type d'arnaque.

Sois très concret et pratique. Évite les généralités.`;

  try {
    const response=await fetch(PROXY_URL,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({model:MODEL,max_tokens:4000,messages:[{role:"user",content:prompt}]})
    });
    const data=await response.json();
    const text=data.choices?.[0]?.message?.content||'Réponse vide';
    if(data.error||!text){output.innerHTML="<div style='color:var(--accent2);font-family:var(--mono);font-size:12px'>Erreur API: "+(data.error?.message||"réponse vide")+"</div>";btn.disabled=false;btn.innerHTML='⚡ CONSEILS IA AVANCÉS';return;}
    const truncWarning = data.choices?.[0]?.finish_reason==='length' ? `<div style="font-family:var(--mono);font-size:10px;color:var(--accent3);padding:8px 12px;border:1px solid rgba(245,166,35,0.3);background:rgba(245,166,35,0.05);margin-bottom:12px">⚠ Réponse longue — relance pour obtenir la suite</div>` : '';
    output.innerHTML=`
      <div class="config-label" style="margin-bottom:14px;padding-top:14px;border-top:1px solid var(--border)">// CONSEILS IA AVANCÉS — GÉNÉRÉS EN TEMPS RÉEL</div>
      ${truncWarning}<div class="ai-output-box">${escapeHtml(text)}</div>
    `;
  } catch(err) {
    if (output) output.innerHTML=`<div style="color:var(--accent2);font-family:var(--mono);font-size:12px">Erreur IA: ${err.message}</div>`;
  } finally {
    if (btn) { btn.disabled=false; btn.innerHTML='⚡ CONSEILS IA AVANCÉS'; }
  }
}

// ══ MODALS ══
function openAddModal() { document.getElementById('add-modal').classList.add('open'); }
function closeModals() {
  document.getElementById('add-modal').classList.remove('open');
  document.getElementById('detail-modal').classList.remove('open');
}

function addScam() {
  const name=document.getElementById('f-name').value.trim(); if(!name) return;
  const db=getDB();
  db.unshift({ id:Math.max(0,...db.map(s=>s.id))+1, name, type:document.getElementById('f-type').value, severity:document.getElementById('f-severity').value, platform:document.getElementById('f-platform').value, amount:parseFloat(document.getElementById('f-amount').value)||0, desc:document.getElementById('f-desc').value, origin:document.getElementById('f-origin').value, date:new Date().toISOString().split('T')[0] });
  saveDB(db); closeModals();
  ['f-name','f-platform','f-amount','f-desc','f-origin'].forEach(id=>document.getElementById(id).value='');
  renderAll();
}

function openDetail(id) {
  const s=getDB().find(x=>x.id===id); if(!s) return;
  const sevColors={critique:'var(--accent2)',eleve:'var(--accent3)',moyen:'var(--accent)',faible:'var(--accent4)'};
  const sevLabels={critique:'🔴 CRITIQUE',eleve:'🟡 ÉLEVÉ',moyen:'🔵 MOYEN',faible:'🟢 FAIBLE'};
  document.getElementById('detail-title').textContent=`// ${s.name}`;
  document.getElementById('detail-body').innerHTML=`
    <div class="detail-grid">
      <div class="detail-field"><div class="detail-key">TYPE</div><div class="detail-val" style="color:${TYPE_COLORS[s.type]||'#fff'}">${TYPES_LABELS[s.type]||s.type}</div></div>
      <div class="detail-field"><div class="detail-key">SÉVÉRITÉ</div><div class="detail-val" style="color:${sevColors[s.severity]}">${sevLabels[s.severity]}</div></div>
      <div class="detail-field"><div class="detail-key">PLATEFORME</div><div class="detail-val">${s.platform||'—'}</div></div>
      <div class="detail-field"><div class="detail-key">MONTANT MOYEN</div><div class="detail-val" style="color:var(--accent2)">${formatAmount(s.amount)}</div></div>
      <div class="detail-field"><div class="detail-key">ORIGINE</div><div class="detail-val">${s.origin||'—'}</div></div>
      <div class="detail-field"><div class="detail-key">DATE SIGNALÉE</div><div class="detail-val">${formatDate(s.date)}</div></div>
    </div>
    <div class="detail-desc">${s.desc||'Aucune description.'}</div>
    <button type="button" class="detail-protect-btn" id="modal-protect-btn" onclick="generateModalProtect(${s.id})">⚡ GÉNÉRER LES STRATÉGIES DE PROTECTION IA</button>
    <div id="modal-protect-out"></div>
    <button type="button" class="delete-btn" onclick="deleteScam(${s.id})">⚠ SUPPRIMER CE SIGNALEMENT</button>
  `;
  document.getElementById('detail-modal').classList.add('open');
}

async function generateModalProtect(id) {
  const s=getDB().find(x=>x.id===id); if(!s) return;
  const btn=document.getElementById('modal-protect-btn');
  const out=document.getElementById('modal-protect-out');
  btn.disabled=true; btn.innerHTML='<div class="spinner" style="width:14px;height:14px;border-width:2px;display:inline-block;margin-right:8px"></div> Analyse IA...';
  out.innerHTML='<div class="ai-loading"><div class="spinner"></div> Génération des conseils de protection spécifiques...</div>';

  const prompt=`Tu es un expert en protection contre les arnaques.
Pour cette arnaque spécifique :
- Nom : ${s.name}
- Type : ${TYPES_LABELS[s.type]||s.type}
- Canal : ${s.platform||'non précisé'}
- Mode opératoire : ${s.desc||'non précisé'}
- Origine : ${s.origin||'non précisé'}

Donne 5 conseils TRÈS CONCRETS et SPÉCIFIQUES pour éviter CETTE arnaque précise.
Chaque conseil doit être actionnable immédiatement. Maximum 3 lignes par conseil. Format numéroté.`;

  try {
    const response=await fetch(PROXY_URL,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({model:MODEL,max_tokens:4000,messages:[{role:"user",content:prompt}]})
    });
    const data=await response.json();
    const text=data.choices?.[0]?.message?.content||'Erreur';
    const truncWarning = data.choices?.[0]?.finish_reason==='length' ? `<div style="font-family:var(--mono);font-size:10px;color:var(--accent3);padding:8px 12px;border:1px solid rgba(245,166,35,0.3);background:rgba(245,166,35,0.05);margin-bottom:12px">⚠ Réponse longue — relance pour obtenir la suite</div>` : '';
    out.innerHTML=`
      <div class="config-label" style="margin:16px 0 10px;padding-top:14px;border-top:1px solid var(--border)">// PROTECTION SPÉCIFIQUE — IA</div>
      ${truncWarning}<div class="ai-output-box" style="font-size:12px">${escapeHtml(text)}</div>
    `;
  } catch(err) { out.innerHTML=`<div style="color:var(--accent2);font-family:var(--mono);font-size:11px">Erreur: ${err.message}</div>`; }
  btn.disabled=false; btn.innerHTML='⚡ GÉNÉRER LES STRATÉGIES DE PROTECTION IA';
}

function deleteScam(id) {
  if(!confirm('Supprimer ce signalement ?')) return;
  saveDB(getDB().filter(s=>s.id!==id)); closeModals(); renderAll();
}

function setFilter(f, btn) {
  currentFilter=f;
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active'); renderList();
}

function renderAll() { renderStats(); renderList(); renderDonut(); }

// ══ EVENT LISTENERS ══
document.getElementById('search-input').addEventListener('input', e => { currentSearch=e.target.value; renderList(); });

document.querySelectorAll('.modal-overlay').forEach(o => o.addEventListener('click', e => {
  if (e.target === o) {
    if (o.id === 'settings-modal') closeSettings();
    else closeModals();
  }
}));

// ══ RÉCUPÉRER & DÉFENSE ══

const RECOVERY_TYPES = [
  { key:'virement', label:'Virement bancaire frauduleux', sub:'SEPA, international', icon:'🏦' },
  { key:'crypto', label:'Crypto / Investissement', sub:'Plateformes frauduleuses', icon:'₿' },
  { key:'carte', label:'Fraude carte bancaire', sub:'CB, paiement en ligne', icon:'💳' },
  { key:'paypal', label:'PayPal / Paysafecard', sub:'Paiements électroniques', icon:'📱' },
  { key:'logement', label:'Arnaque immobilière', sub:'Caution, loyer fictif', icon:'🏠' },
  { key:'identite', label:'Usurpation d\'identité', sub:'Données personnelles volées', icon:'🪪' },
];

const DEFENSE_TYPES = [
  { key:'email', label:'Sécurité Email', sub:'Filtrage, alias, chiffrement', icon:'📧' },
  { key:'reseau', label:'Réseau & WiFi', sub:'VPN, DNS, pare-feu', icon:'🌐' },
  { key:'mdp', label:'Mots de passe & 2FA', sub:'Gestionnaire, clé physique', icon:'🔐' },
  { key:'mobile', label:'Sécurité Mobile', sub:'Android, iOS, SIM', icon:'📱' },
  { key:'identite_num', label:'Identité Numérique', sub:'Surveillance, fuites de données', icon:'👁' },
  { key:'endpoint', label:'Protection PC', sub:'Antivirus, chiffrement, DNS', icon:'🖥' },
];

const STATIC_RECOVERY = {
  virement: [
    { title:'Contacter la banque dans les 24h', text:'Appelle le service fraude de ta banque immédiatement. Demande un "SEPA Credit Transfer Recall". Plus tu agis vite, plus les chances sont élevées — après 5 jours ouvrables, c\'est quasi impossible.' },
    { title:'Déposer plainte sans attendre', text:'Rends-toi au commissariat avec toutes les preuves (virements, échanges). Conserve le numéro de procès-verbal — il est indispensable pour les démarches bancaires et assurantielles.' },
    { title:'Signaler sur Cybermalveillance.gouv.fr', text:'La plateforme officielle te guide pas à pas et peut mettre en relation avec des prestataires spécialisés. Le signalement aide aussi les autorités à tracer les réseaux d\'arnaqueurs.' },
    { title:'Saisir le médiateur bancaire', text:'Si ta banque refuse d\'agir, saisis gratuitement le médiateur bancaire (coordonnées sur le site de ta banque). Délai de réponse légal : 90 jours.' },
    { title:'Recours judiciaire — France Victimes', text:'Au-delà de 1 500€, envisage une action au tribunal judiciaire. Appelle le 116 006 (France Victimes) pour un accompagnement juridique gratuit.' },
  ],
  crypto: [
    { title:'Documenter immédiatement toutes les transactions', text:'Relève chaque adresse de portefeuille, hash de transaction, et capture tous les écrans. Ces données sont sur la blockchain — elles ne disparaissent jamais et servent pour toute enquête.' },
    { title:'Tracer les fonds sur la blockchain', text:'Utilise Etherscan (ETH) ou Blockchain.com (BTC) pour suivre où l\'argent a été envoyé. Des services comme Chainalysis peuvent retracer les flux jusqu\'aux exchanges centralisés.' },
    { title:'Signaler à l\'AMF et à l\'ACPR', text:'Dépose un signalement sur amf-france.org. Si la plateforme était enregistrée comme prestataire de paiement, l\'ACPR peut également agir. Ces signalements alimentent les listes noires officielles.' },
    { title:'Contacter les exchanges intermédiaires', text:'Si les fonds ont transité par Binance, Kraken ou Coinbase, contacte leur service anti-fraude avec le hash de transaction — ils peuvent geler les fonds si tu agis vite.' },
    { title:'Attention aux faux "crypto recovery services"', text:'Des arnaques secondaires ciblent les victimes crypto. Ne paie jamais d\'avance pour récupérer tes fonds. Les vrais cabinets (Coinfirm, CipherBlade) facturent au résultat.' },
  ],
  carte: [
    { title:'Opposition immédiate 24h/24', text:'Appelle le numéro au dos de ta carte ou le 0 892 705 705 (serveur interbancaire). Une opposition bloque tout nouveau débit. Elle est gratuite et effective en moins d\'une heure.' },
    { title:'Demander le chargeback à ta banque', text:'Dans les 13 mois (8 semaines pour un prélèvement autorisé), demande un remboursement par procédure de chargeback. Ta banque est légalement tenue de rembourser les paiements non autorisés.' },
    { title:'Activer l\'assurance de ta carte bancaire', text:'Les cartes Visa Premier et Mastercard Gold incluent souvent une assurance fraude. Consulte les conditions — certaines couvrent jusqu\'à 5 000€ sans franchise.' },
    { title:'Signaler à la DGCCRF via SignalConso', text:'Dépose un signalement sur signal.conso.gouv.fr si tu as été victime d\'un commerçant frauduleux. La DGCCRF peut enquêter et obtenir des remboursements groupés.' },
  ],
  paypal: [
    { title:'Ouvrir un litige dans les 180 jours', text:'Via PayPal Resolution Center, ouvre un litige immédiatement. PayPal dispose de 30 jours pour enquêter. La Protection Acheteur couvre les transactions si le vendeur n\'a pas livré ou a livré un article non conforme.' },
    { title:'Escalader en réclamation si nécessaire', text:'Si le litige n\'est pas résolu en 20 jours, escalade-le en "réclamation" pour que PayPal tranche. Ne ferme jamais un litige ouvert — tu ne pourras pas en rouvrir un.' },
    { title:'Chargeback via ta banque en dernier recours', text:'Si le paiement PayPal a été fait par carte bancaire, demande un chargeback à ta banque. Attention : PayPal peut suspendre ton compte — utilise cette option en dernier recours seulement.' },
    { title:'Paysafecard : signaler à l\'ACPR', text:'Les codes Paysafecard sont irrécupérables une fois utilisés. Signale à l\'ACPR et conserve les codes comme preuves pour la plainte pénale.' },
  ],
  logement: [
    { title:'Conserver absolument toutes les preuves', text:'Capture l\'annonce, tous les échanges, les coordonnées du prétendu propriétaire, les reçus de virement. Ne supprime rien — chaque élément peut servir à identifier l\'arnaqueur.' },
    { title:'Contacter le site d\'annonce immédiatement', text:'Signale l\'annonce frauduleuse à Leboncoin, SeLoger ou PAP. Certaines plateformes tracent l\'arnaqueur via son compte et coopèrent avec la police sur réquisition judiciaire.' },
    { title:'Déposer plainte + signaler à la DGCCRF', text:'Dépose plainte en commissariat. Signale aussi sur SignalConso. Si le préjudice dépasse 1 500€, envisage une plainte avec constitution de partie civile.' },
    { title:'Action en justice via le tribunal judiciaire', text:'Pour les sommes inférieures à 10 000€, une procédure simplifiée est possible. France Victimes (116 006) peut t\'accompagner gratuitement dans la démarche judiciaire.' },
  ],
  identite: [
    { title:'Faire opposition sur tous les documents volés', text:'Pour une carte d\'identité ou passeport : déclare la perte/vol en mairie. Signale la fraude à la carte bancaire sur perceval.interieur.gouv.fr.' },
    { title:'Alerter la Banque de France', text:'Demande un gel de crédit pour bloquer toute ouverture de crédit à ton nom. C\'est gratuit et effectif sous 24h. Contact : le 3414.' },
    { title:'Signaler à la CNIL', text:'Si tes données ont été utilisées sans consentement, dépose un signalement sur cnil.fr. En cas de violation massive, la CNIL peut imposer des sanctions aux entreprises responsables.' },
    { title:'Surveiller ton dossier de crédit', text:'Demande ton dossier de crédit (gratuit 1x/an) pour vérifier qu\'aucun crédit n\'a été souscrit à ton nom. Active des alertes sur tous tes comptes bancaires.' },
    { title:'Signalement sur internet-signalement.gouv.fr', text:'Signale l\'usurpation sur la plateforme PHAROS pour accélérer le traitement par les services spécialisés (OCLTIC — Office Central de Lutte contre la Cybercriminalité).' },
  ],
};

const STATIC_DEFENSE = {
  email: [
    { title:'Alias email unique par service', text:'SimpleLogin (open source, gratuit) ou AnonAddy permettent de créer un alias par site. Si un alias reçoit du spam, tu sais qui a vendu tes données. Désactive l\'alias compromis en un clic.' },
    { title:'SPF, DKIM et DMARC sur ton domaine', text:'Si tu as un domaine personnel, ces 3 enregistrements DNS empêchent l\'usurpation de ton adresse email. Configure-les dans ton gestionnaire DNS — la plupart des hébergeurs proposent une interface guidée.' },
    { title:'ProtonMail ou Tutanota pour les échanges sensibles', text:'Ces services chiffrent les emails de bout en bout. Utilise-les pour les échanges avec ta banque, ton médecin, ou tout service sensible.' },
    { title:'Extension anti-phishing dans le navigateur', text:'Installe Netcraft ou WOT (Web of Trust). Ces extensions analysent les liens en temps réel et t\'alertent avant que tu cliques sur un site frauduleux.' },
  ],
  reseau: [
    { title:'VPN activé en permanence sur réseaux publics', text:'Mullvad (ne logue rien) ou ProtonVPN (open source, audité). Active-le dès que tu n\'es pas sur ton réseau domestique. Protocole WireGuard recommandé pour la performance.' },
    { title:'DNS filtrant — bloquer les domaines malveillants', text:'Configure NextDNS (gratuit jusqu\'à 300k requêtes/mois) ou les DNS Quad9 (9.9.9.9) sur ton routeur. Ils bloquent automatiquement les domaines de phishing et malware.' },
    { title:'Segmenter son réseau Wi-Fi domestique', text:'Crée un réseau Wi-Fi séparé pour tes appareils IoT (télé, sonnette, aspirateur). Si un objet connecté est compromis, il ne peut pas atteindre ton PC ou téléphone.' },
    { title:'Désactiver UPnP sur le routeur', text:'L\'UPnP permet aux malwares d\'ouvrir des ports réseau. Désactive-le dans l\'interface admin de ton routeur. Change aussi le mot de passe admin par défaut.' },
  ],
  mdp: [
    { title:'Gestionnaire de mots de passe', text:'Bitwarden (open source, gratuit, audité) ou 1Password. Génère des mots de passe de 25+ caractères aléatoires pour chaque service. Ne réutilise jamais le même mot de passe.' },
    { title:'2FA par application, jamais par SMS', text:'Le SMS peut être intercepté via SIM swapping. Utilise Aegis (Android), Raivo (iOS) ou Ente Auth. Le 2FA par app bloque 99% des attaques de credential stuffing.' },
    { title:'Clé physique FIDO2 pour les comptes critiques', text:'YubiKey (5 Series) ou Google Titan Key pour ta banque et ton email principal. Une clé physique est inviolable à distance — même un malware ne peut pas usurper l\'authentification.' },
    { title:'Vérifier ses fuites sur HaveIBeenPwned', text:'Visite haveibeenpwned.com avec chaque adresse email. Active les alertes gratuites pour être notifié si ton email apparaît dans une nouvelle fuite de données.' },
  ],
  mobile: [
    { title:'Activer le code PIN de la carte SIM', text:'Dans les paramètres du téléphone → SIM → code PIN. Cela empêche un arnaqueur d\'utiliser ta SIM dans un autre téléphone. Appelle aussi ton opérateur pour activer une protection anti-portabilité.' },
    { title:'Désactiver Bluetooth et NFC quand non utilisés', text:'Ces interfaces permettent des attaques à courte distance (BlueSnarfing, NFC skimming). Désactive-les dans les paramètres rapides quand tu es dans un lieu public.' },
    { title:'Mises à jour automatiques activées', text:'80% des malwares exploitent des vulnérabilités déjà corrigées. Active les mises à jour automatiques pour l\'OS et les applications. Préfère les marques avec 5+ ans de support.' },
    { title:'Vérifier les permissions des applications', text:'Régulièrement, inspecte quelles apps ont accès à ta localisation, contacts et microphone. iOS : Réglages → Confidentialité. Android : Paramètres → Applications → Autorisations.' },
  ],
  identite_num: [
    { title:'Audit OSINT de sa propre présence en ligne', text:'Recherche ton nom + ville sur Google et des sites comme Spokeo. Supprime les informations excessives. Plus tu es visible, plus tu es une cible pour les arnaqueurs.' },
    { title:'Alertes Google sur ton nom et email', text:'Crée une alerte Google (google.fr/alerts) sur ton nom complet, ton email et ton numéro de téléphone. Tu seras notifié si tes données apparaissent sur des sites suspects.' },
    { title:'Surveiller les fuites de données', text:'Abonne-toi à haveibeenpwned.com (gratuit) et Firefox Monitor. Pour une surveillance avancée, DeHashed indexe les bases de données pirates et peut retrouver tes mots de passe hashés.' },
    { title:'Gel préventif du crédit à la Banque de France', text:'Demande une "mise en vigilance renforcée" au 3414. Aucun crédit ne pourra être souscrit sans vérification supplémentaire — recommandé si tu crains une usurpation d\'identité future.' },
  ],
  endpoint: [
    { title:'Windows Defender + Malwarebytes en complément', text:'Windows Defender est désormais très efficace. Ajoute Malwarebytes Free (scan manuel) pour une seconde opinion. Ne désactive jamais ton antivirus natif.' },
    { title:'Chiffrer son disque dur avec BitLocker', text:'Active BitLocker (Windows Pro) ou VeraCrypt (toutes versions). En cas de vol de PC, personne ne peut accéder à tes données. Sauvegarde la clé de récupération dans ton gestionnaire de mots de passe.' },
    { title:'uBlock Origin dans le navigateur', text:'Bloque les publicités malveillantes (malvertising) et les scripts tiers dangereux. Réduit la surface d\'attaque de 60%. Complète avec Privacy Badger contre les trackers.' },
    { title:'DNS over HTTPS (DoH) dans le navigateur', text:'Firefox : Paramètres → Confidentialité → DNS via HTTPS. Chrome : Paramètres → Sécurité → DNS sécurisé. Chiffre les requêtes DNS pour empêcher leur interception.' },
    { title:'Sandbox pour les fichiers suspects', text:'Avant d\'ouvrir un fichier douteux, analyse-le sur any.run ou hybrid-analysis.com (gratuit). Ou utilise Windows Sandbox (inclus dans Windows 10/11 Pro). Ne jamais ouvrir un .exe reçu par email.' },
  ],
};

function switchSubTab(id, btn) {
  document.querySelectorAll('.sub-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.sub-tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('sub-' + id).classList.add('active');
  btn.classList.add('active');
}

function renderRecoveryList() {
  document.getElementById('recovery-type-list').innerHTML = RECOVERY_TYPES.map(t => `
    <div class="type-item" id="recovery-item-${t.key}" onclick="selectRecoveryType('${t.key}')">
      <div class="type-icon">${t.icon}</div>
      <div><div class="type-label">${t.label}</div><div class="type-sub">${t.sub}</div></div>
    </div>
  `).join('');
}

function selectRecoveryType(key) {
  document.querySelectorAll('#recovery-type-list .type-item').forEach(el => el.classList.remove('selected'));
  document.getElementById('recovery-item-' + key)?.classList.add('selected');
  const t = RECOVERY_TYPES.find(x => x.key === key);
  const strategies = STATIC_RECOVERY[key] || [];
  document.getElementById('recovery-content').innerHTML = `
    <div class="protect-header">
      <div class="protect-title">${t.icon} ${t.label}</div>
      <button type="button" class="protect-ai-btn" id="recovery-ai-btn" onclick="generateAIRecovery('${key}')">⚡ PLAN DE RÉCUPÉRATION IA</button>
    </div>
    <div class="config-label" style="margin-bottom:14px">// PROCÉDURES OFFICIELLES — ÉTAPES CLÉS</div>
    <div class="strategies-static">
      ${strategies.map((s, i) => `
        <div class="strategy-card">
          <div class="strategy-num" style="color:var(--accent3);border-color:rgba(245,166,35,0.4)">${String(i + 1).padStart(2, '0')}</div>
          <div class="strategy-text"><strong>${s.title}</strong>${s.text}</div>
        </div>
      `).join('')}
    </div>
    <div id="recovery-ai-output" style="margin-top:20px"></div>
  `;
}

async function generateAIRecovery(key) {
  const t = RECOVERY_TYPES.find(x => x.key === key);
  const label = t?.label || key;
  const btn = document.getElementById('recovery-ai-btn');
  const output = document.getElementById('recovery-ai-output');
  if (!btn || !output) return;
  btn.disabled = true; btn.innerHTML = '<div class="spinner" style="width:14px;height:14px;border-width:2px;display:inline-block;margin-right:8px"></div> Génération IA...';
  output.innerHTML = '<div class="ai-loading"><div class="spinner"></div> L\'IA prépare ton plan de récupération personnalisé...</div>';

  const prompt = `Tu es un expert juridique français spécialisé dans la récupération de fonds suite à des arnaques et cybercriminalité.

Type de préjudice : ${label}

Génère un plan de récupération AVANCÉ et CONCRET :

📋 DÉMARCHES PRIORITAIRES (72 premières heures)
Actions concrètes à faire immédiatement avec les contacts exacts (numéros, sites officiels).

⚖️ RECOURS JURIDIQUES DISPONIBLES
Procédures légales adaptées à ce type de préjudice, délais légaux, et conditions pour les activer.

💰 CHANCES RÉELLES DE RÉCUPÉRATION
Estimation honnête (%) selon le montant et le délai, et les facteurs qui augmentent les chances.

🤝 ORGANISMES ET ASSOCIATIONS D'AIDE
Noms, contacts et rôles précis des structures françaises pouvant aider gratuitement.

🔍 PREUVES À CONSTITUER MAINTENANT
Liste précise des éléments à sauvegarder immédiatement pour maximiser les chances légales.

Sois direct, honnête sur les chances réelles, et donne des informations pratiques immédiatement utilisables en France.`;

  try {
    const response = await fetch(PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: MODEL, max_tokens: 4000, messages: [{ role: 'user', content: prompt }] })
    });
    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || 'Réponse vide';
    if (data.error || !text) { output.innerHTML = `<div style="color:var(--accent2);font-family:var(--mono);font-size:12px">Erreur API: ${data.error?.message || 'réponse vide'}</div>`; return; }
    output.innerHTML = `
      <div class="config-label" style="margin-bottom:14px;padding-top:14px;border-top:1px solid var(--border)">// PLAN DE RÉCUPÉRATION IA — PERSONNALISÉ</div>
      <div class="ai-output-box">${escapeHtml(text)}</div>
    `;
  } catch (err) {
    if (output) output.innerHTML = `<div style="color:var(--accent2);font-family:var(--mono);font-size:12px">Erreur IA: ${err.message}</div>`;
  } finally {
    if (btn) { btn.disabled = false; btn.innerHTML = '⚡ PLAN DE RÉCUPÉRATION IA'; }
  }
}

function renderDefenseList() {
  document.getElementById('defense-type-list').innerHTML = DEFENSE_TYPES.map(t => `
    <div class="type-item" id="defense-item-${t.key}" onclick="selectDefenseType('${t.key}')">
      <div class="type-icon">${t.icon}</div>
      <div><div class="type-label">${t.label}</div><div class="type-sub">${t.sub}</div></div>
    </div>
  `).join('');
}

function selectDefenseType(key) {
  document.querySelectorAll('#defense-type-list .type-item').forEach(el => el.classList.remove('selected'));
  document.getElementById('defense-item-' + key)?.classList.add('selected');
  const t = DEFENSE_TYPES.find(x => x.key === key);
  const strategies = STATIC_DEFENSE[key] || [];
  document.getElementById('defense-content').innerHTML = `
    <div class="protect-header">
      <div class="protect-title">${t.icon} ${t.label}</div>
      <button type="button" class="protect-ai-btn" id="defense-ai-btn" onclick="generateAIDefense('${key}')">⚡ GUIDE TECHNIQUE IA</button>
    </div>
    <div class="config-label" style="margin-bottom:14px">// MESURES DE DÉFENSE — BASE DE CONNAISSANCES</div>
    <div class="strategies-static">
      ${strategies.map((s, i) => `
        <div class="strategy-card">
          <div class="strategy-num" style="color:var(--accent4);border-color:rgba(57,255,20,0.4)">${String(i + 1).padStart(2, '0')}</div>
          <div class="strategy-text"><strong>${s.title}</strong>${s.text}</div>
        </div>
      `).join('')}
    </div>
    <div id="defense-ai-output" style="margin-top:20px"></div>
  `;
}

async function generateAIDefense(key) {
  const t = DEFENSE_TYPES.find(x => x.key === key);
  const label = t?.label || key;
  const btn = document.getElementById('defense-ai-btn');
  const output = document.getElementById('defense-ai-output');
  if (!btn || !output) return;
  btn.disabled = true; btn.innerHTML = '<div class="spinner" style="width:14px;height:14px;border-width:2px;display:inline-block;margin-right:8px"></div> Génération IA...';
  output.innerHTML = '<div class="ai-loading"><div class="spinner"></div> L\'IA génère ton guide de défense technique...</div>';

  const prompt = `Tu es un expert en cybersécurité offensive et défensive. Pour ce domaine de sécurité : ${label}

Génère un guide de défense technique AVANCÉ et OPÉRATIONNEL :

🔧 CONFIGURATION TECHNIQUE STEP BY STEP
Instructions précises avec les paramètres exacts, commandes, ou chemins de configuration.

🛠️ OUTILS RECOMMANDÉS
Liste des outils (gratuits en priorité) avec liens officiels et raison du choix.

🧪 COMMENT TESTER QUE LA PROTECTION EST ACTIVE
Tests concrets pour vérifier que chaque mesure fonctionne réellement.

⚠️ ERREURS COURANTES À ÉVITER
Fausses mesures de sécurité ou configurations qui donnent une illusion de protection.

🔴 SCÉNARIO D'ATTAQUE RÉEL
Décris comment un attaquant exploiterait une mauvaise configuration dans ce domaine, pour comprendre l'enjeu.

Niveau : intermédiaire à avancé. Donne des commandes, des configurations, des noms d'outils précis.`;

  try {
    const response = await fetch(PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: MODEL, max_tokens: 4000, messages: [{ role: 'user', content: prompt }] })
    });
    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || 'Réponse vide';
    if (data.error || !text) { output.innerHTML = `<div style="color:var(--accent2);font-family:var(--mono);font-size:12px">Erreur API: ${data.error?.message || 'réponse vide'}</div>`; return; }
    output.innerHTML = `
      <div class="config-label" style="margin-bottom:14px;padding-top:14px;border-top:1px solid var(--border)">// GUIDE TECHNIQUE IA — GÉNÉRÉ EN TEMPS RÉEL</div>
      <div class="ai-output-box">${escapeHtml(text)}</div>
    `;
  } catch (err) {
    if (output) output.innerHTML = `<div style="color:var(--accent2);font-family:var(--mono);font-size:12px">Erreur IA: ${err.message}</div>`;
  } finally {
    if (btn) { btn.disabled = false; btn.innerHTML = '⚡ GUIDE TECHNIQUE IA'; }
  }
}

// ══ INIT ══
renderAll();
renderTypeList();
renderRecoveryList();
renderDefenseList();
