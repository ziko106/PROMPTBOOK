var currentTab = 'stocks';
var lang = 'en';

var i18n = {
  fr: { title: "✨ AI Financial Promptbook", subtitle: "Générez vos calculs et vos prompts d'experts financiers en 1 clic.", btnLaunch: "🚀 Générer l'Analyse & le Prompt", tickerLabel: "Code Action (Ticker Symbol)", taxLabel: "Revenu Annuel Brut ($)", debtLabel: "Montant Total de la Dette ($)", budgetLabel: "Salaire Mensuel Net ($)", promptBoxTitle: "📋 Votre Prompt d'Expert IA personnalisé :", btnCopy: "📋 Copier le Prompt", btnCopied: "✅ Copié dans le presse-papier !", month: " / mois", dashTitleBudget: "📊 Votre Conscious Spending Plan", fixed: "🏠 Coûts Fixes (55%) :", invest: "📈 Investissements (10%) :", save: "🛡️ Épargne (7%) :", pleasure: "🥳 Plaisir sans culpabilité (28%) :" },
  en: { title: "✨ AI Financial Promptbook", subtitle: "Generate your mathematical metrics & expert prompts in 1 click.", btnLaunch: "🚀 Generate Metrics & Prompt", tickerLabel: "Stock Ticker Symbol", taxLabel: "Gross Annual Income ($)", debtLabel: "Total Debt Amount ($)", budgetLabel: "Net Monthly Take-Home ($)", promptBoxTitle: "📋 Your Custom AI Expert Prompt:", btnCopy: "📋 Copy Prompt", btnCopied: "✅ Copied to clipboard!", month: " / month", dashTitleBudget: "📊 Your Conscious Spending Plan", fixed: "🏠 Fixed Costs (55%):", invest: "📈 Investments (10%):", save: "🛡️ Savings (7%):", pleasure: "🥳 Guilt-Free Spending (28%):" }
};

function setLanguage(l) {
  lang = l;
  document.getElementById('lang-fr').className = l === 'fr' ? 'lang-btn active' : 'lang-btn';
  document.getElementById('lang-en').className = l === 'en' ? 'lang-btn active' : 'lang-btn';
  var t = i18n[lang];
  document.getElementById('title').innerText = t.title;
  document.getElementById('subtitle').innerText = t.subtitle;
  document.getElementById('action-btn').innerText = t.btnLaunch;
  document.getElementById('prompt-box-title').innerText = t.promptBoxTitle;
  document.getElementById('copy-btn').innerText = t.btnCopy;
  document.getElementById('label-fixed').innerText = t.fixed;
  document.getElementById('label-invest').innerText = t.invest;
  document.getElementById('label-save').innerText = t.save;
  document.getElementById('label-pleasure').innerText = t.pleasure;
  updateInputLabel();
}

function updateInputLabel() {
  var t = i18n[lang];
  var label = document.getElementById('input-label');
  if (currentTab === 'stocks') label.innerText = t.tickerLabel;
  if (currentTab === 'tax') label.innerText = t.taxLabel;
  if (currentTab === 'debt') label.innerText = t.debtLabel;
  if (currentTab === 'budget') label.innerText = t.budgetLabel;
}

function switchTab(tab) {
  currentTab = tab;
  var btns = document.querySelectorAll('.tab-btn');
  for (var i = 0; i < btns.length; i++) { btns[i].className = 'tab-btn'; }
  document.getElementById('btn-' + tab).className = 'tab-btn active';
  var input = document.getElementById('main-input');
  if (tab === 'stocks') { input.type = 'text'; input.value = 'AAPL'; }
  if (tab === 'tax') { input.type = 'number'; input.value = '85000'; }
  if (tab === 'debt') { input.type = 'number'; input.value = '15000'; }
  if (tab === 'budget') { input.type = 'number'; input.value = '4500'; }
  updateInputLabel();
  document.getElementById('dashboard').style.display = 'none';
  document.getElementById('prompt-box').style.display = 'none';
}

function handleExecution() {
  var val = document.getElementById('main-input').value || '0';
  var numVal = parseFloat(val) || 0;
  var t = i18n[lang];
  var dash = document.getElementById('dashboard');

  if (currentTab === 'budget') {
    dash.style.display = 'block';
    document.getElementById('dash-title').innerText = t.dashTitleBudget;
    document.getElementById('dash-fixed').innerText = '$' + Math.round(numVal * 0.55) + t.month;
    document.getElementById('dash-invest').innerText = '$' + Math.round(numVal * 0.10) + t.month;
    document.getElementById('dash-save').innerText = '$' + Math.round(numVal * 0.07) + t.month;
    document.getElementById('dash-pleasure').innerText = '$' + Math.round(numVal * 0.28) + t.month;
  } else {
    dash.style.display = 'none';
  }

  var p = '';
  if (lang === 'en') {
    if (currentTab === 'budget') p = 'Act as Ramit Sethi, personal finance expert and author of "I Will Teach You To Be Rich". I earn a net monthly take-home pay of $' + val + '. Build me a hyper-detailed Conscious Spending Plan. Calculate and segment my buckets: 55% for fixed costs ($' + Math.round(numVal*0.55) + '), 10% for investments ($' + Math.round(numVal*0.1) + '), 7% for emergency savings ($' + Math.round(numVal*0.07) + '), and 28% for guilt-free spending ($' + Math.round(numVal*0.28) + '). Give me actionable optimization trade-offs.';
    if (currentTab === 'stocks') p = 'Act as a Senior Wall Street Equity Analyst specializing in asset valuation. I want to perform a comprehensive fundamental analysis of ' + val.toUpperCase() + '. Generate a detailed audit framework including P/E ratio benchmarking against sector peers, Free Cash Flow (FCF) evaluation, and operating margin trends over the last 3 years.';
    if (currentTab === 'tax') p = 'Act as a certified US CPA Tax Strategist. My gross annual income is $' + val + '. I want to optimize my tax filing to legally minimize my tax liability under current IRS brackets. Compare the impact of the standard deduction versus itemized deductions and list priority tax-advantaged retirement vehicles.';
    if (currentTab === 'debt') p = 'Act as an elite financial coach specializing in debt restructuring. I am facing a total debt of $' + val + '. Create a complete battle plan mathematically comparing the Debt Avalanche method (highest APR priority) and the Debt Snowball method to eliminate this $' + val + ' balance as fast as possible.';
  } else {
    if (currentTab === 'budget') p = 'Agis comme Ramit Sethi, expert en finances personnelles et auteur de "I Will Teach You To Be Rich". Je gagne un salaire net de ' + val + '$ par mois. Crée-moi un Conscious Spending Plan ultra-détaillé. Calcule et segmente mes enveloppes : 55% pour les coûts fixes (' + Math.round(numVal*0.55) + '$), 10% pour les investissements (' + Math.round(numVal*0.1) + '$), 7% pour l\'épargne d\'urgence (' + Math.round(numVal*0.07) + '$) et 28% pour le plaisir sans culpabilité (' + Math.round(numVal*0.28) + '$). Donne-moi des exemples concrets pour optimiser mes dépenses.';
    if (currentTab === 'stocks') p = 'Agis comme un analyste financier senior de Wall Street spécialisé dans l\'évaluation d\'actifs. Je souhaite réaliser une analyse fondamentale complète de l\'action ' + val.toUpperCase() + '. Génère un framework d\'audit détaillé comprenant l\'analyse du ratio P/E par rapport à ses concurrents sectoriels, une évaluation du Free Cash Flow (FCF) et les tendances des marges d\'exploitation sur les 3 dernières années.';
    if (currentTab === 'tax') p = 'Agis comme un expert-comptable certifié (CPA) fiscaliste américain. J\'ai un revenu annuel brut de ' + val + '$. Je veux optimiser ma déclaration fiscale pour réduire mes impôts au maximum légal sous les barèmes récents de l\'IRS. Compare l\'impact de la déduction standard par rapport aux déductions détaillées et liste les véhicules d\'épargne retraite prioritaires.';
    if (currentTab === 'debt') p = 'Agis comme un coach financier d\'élite spécialisé dans la restructuration financière. Je fais face à une dette totale de ' + val + '$. Crée-moi un plan d\'attaque complet comparant mathématiquement la méthode de l\'Avalanche de dette (priorité aux taux d\'intérêt élevés) et la méthode de la Boule de Neige pour liquider ces ' + val + '$ au plus vite.';
  }

  document.getElementById('prompt-box').style.display = 'block';
  document.getElementById('prompt-text').value = p;
  document.getElementById('copy-btn').innerText = t.btnCopy;
}

function copyPrompt() {
  var text = document.getElementById('prompt-text');
  text.select();
  navigator.clipboard.writeText(text.value);
  document.getElementById('copy-btn').innerText = i18n[lang].btnCopied;
}
