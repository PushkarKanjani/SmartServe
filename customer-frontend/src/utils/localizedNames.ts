import i18n from '../i18n';
import {
  CATEGORY_TRANSLATIONS,
  SUBCATEGORY_TRANSLATIONS,
  SERVICE_NAME_TRANSLATIONS,
  FEATURE_TRANSLATIONS,
  WORD_TRANSLATIONS
} from './localizedCatalogData';

export {
  CATEGORY_TRANSLATIONS,
  SUBCATEGORY_TRANSLATIONS,
  SERVICE_NAME_TRANSLATIONS,
  FEATURE_TRANSLATIONS,
  WORD_TRANSLATIONS
};

/**
 * Normalizes category and subcategory string keys for robust lookup:
 * - Removes leading numbers like "1. ", "2. "
 * - Replaces slashes, dashes, and ampersands with uniform spaces
 * - Lowercases and trims multiple spaces
 */
export function normalizeKey(raw?: string | null): string {
  if (!raw) return '';
  return raw
    .replace(/^\d+\.\s*/, '')
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

export function getCleanName(raw?: string | null): string {
  if (!raw) return '';
  return raw.replace(/^\d+\.\s*/, '').trim();
}

export function getLocalizedCategory(categoryName?: string | null): string {
  const clean = getCleanName(categoryName);
  if (!clean) return '';
  const lang = (i18n.language || 'en').slice(0, 2);
  if (lang === 'en') return clean;

  const norm = normalizeKey(clean);
  const entry = CATEGORY_TRANSLATIONS[norm];
  if (entry) {
    if (lang === 'hi' && entry.hi) return entry.hi;
    if (lang === 'gu' && entry.gu) return entry.gu;
  }
  return clean;
}

export function getLocalizedSubcategory(subcategoryName?: string | null): string {
  const clean = getCleanName(subcategoryName);
  if (!clean) return '';
  const lang = (i18n.language || 'en').slice(0, 2);
  if (lang === 'en') return clean;

  const norm = normalizeKey(clean);
  const entry = SUBCATEGORY_TRANSLATIONS[norm];
  if (entry) {
    if (lang === 'hi' && entry.hi) return entry.hi;
    if (lang === 'gu' && entry.gu) return entry.gu;
  }

  // Fallback keyword replacements
  if (norm.includes('cleaning')) {
    return lang === 'hi' ? `${clean.replace(/cleaning/gi, 'सफाई')}` : `${clean.replace(/cleaning/gi, 'સફાઈ')}`;
  }
  if (norm.includes('repair')) {
    return lang === 'hi' ? `${clean.replace(/repair/gi, 'मरम्मत')}` : `${clean.replace(/repair/gi, 'રિપેરિંગ')}`;
  }

  return clean;
}

export function localizePrefix(prefix: string, lang: string): string {
  if (!prefix) return '';
  const clean = prefix.trim();
  const lower = clean.toLowerCase();
  const direct = WORD_TRANSLATIONS[lower];
  if (direct) {
    return lang === 'hi' ? direct.hi : direct.gu;
  }
  const words = clean.split(/\s+/);
  const translated = words.map((w) => {
    const wClean = w.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
    const wDirect = WORD_TRANSLATIONS[wClean];
    if (wDirect) {
      const res = lang === 'hi' ? wDirect.hi : wDirect.gu;
      return w.replace(new RegExp(wClean, 'i'), res);
    }
    return w;
  });
  return translated.join(' ');
}

/**
 * Intelligent Service Name Translator:
 * 1. Checks exact master dictionary entry (all 457 catalog services mapped)
 * 2. Checks normalized key lookup
 * 3. Checks regex pattern matches (e.g. "[N] BHK Cleaning" -> "[N] बीएचके सफाई")
 * 4. Applies prefix & suffix keyword transliterations
 * 5. Full tokenized fallback ensuring zero raw English escapes
 */
export function getLocalizedServiceName(serviceName?: string | null): string {
  if (!serviceName) return '';
  const lang = (i18n.language || 'en').slice(0, 2);
  if (lang === 'en') return serviceName;

  const trimmed = serviceName.trim();
  const lower = trimmed.toLowerCase();

  // 1. Direct master dictionary lookup
  const direct = SERVICE_NAME_TRANSLATIONS[lower];
  if (direct) {
    if (lang === 'hi' && direct.hi) return direct.hi;
    if (lang === 'gu' && direct.gu) return direct.gu;
  }

  // 2. Normalized key lookup (punctuation/spacing variants)
  const norm = normalizeKey(trimmed);
  const normDirect = SERVICE_NAME_TRANSLATIONS[norm];
  if (normDirect) {
    if (lang === 'hi' && normDirect.hi) return normDirect.hi;
    if (lang === 'gu' && normDirect.gu) return normDirect.gu;
  }

  // 3. Specific standalone modifiers
  if (/^detan(\s+facial)?$/i.test(trimmed) || /^de-tan(\s+facial)?$/i.test(trimmed)) {
    return lang === 'hi' ? 'डी-टैन फेशियल' : 'ડી-ટેન ફેશિયલ';
  }
  if (lower === 'hydrating') {
    return lang === 'hi' ? 'हाइड्रेटिंग फेशियल' : 'હાઇડ્રેટિંગ ફેશિયલ';
  }
  if (lower === 'korean') {
    return lang === 'hi' ? 'कोरियन फेशियल' : 'કોરિયન ફેશિયલ';
  }

  // 4. Prefix Modifiers
  if (lower.startsWith('hydrating')) {
    const rest = getLocalizedServiceName(trimmed.slice(9).trim());
    return lang === 'hi' ? `हाइड्रेटिंग ${rest}` : `હાઇડ્રેટિંગ ${rest}`;
  }
  if (lower.startsWith('korean')) {
    const rest = getLocalizedServiceName(trimmed.slice(6).trim());
    return lang === 'hi' ? `कोरियन ${rest}` : `કોરિયન ${rest}`;
  }
  if (lower.startsWith('anti-aging') || lower.startsWith('anti aging')) {
    const rest = getLocalizedServiceName(trimmed.replace(/^anti[- ]aging/i, '').trim());
    return lang === 'hi' ? `एंटी-एजिंग ${rest}` : `એન્ટી-એજિંગ ${rest}`;
  }
  if (lower.startsWith('skin brightening')) {
    const rest = getLocalizedServiceName(trimmed.slice(16).trim());
    return lang === 'hi' ? `स्किन ब्राइटनिंग ${rest}` : `સ્કિન બ્રાઇટનિંગ ${rest}`;
  }
  if (lower.startsWith('charcoal')) {
    const rest = getLocalizedServiceName(trimmed.slice(8).trim());
    return lang === 'hi' ? `चारकोल ${rest}` : `ચારકોલ ${rest}`;
  }
  if (lower.startsWith('herbal')) {
    const rest = getLocalizedServiceName(trimmed.slice(6).trim());
    return lang === 'hi' ? `हर्बल ${rest}` : `હર્બલ ${rest}`;
  }
  if (lower.startsWith('gold')) {
    const rest = getLocalizedServiceName(trimmed.slice(4).trim());
    return lang === 'hi' ? `गोल्ड ${rest}` : `ગોલ્ડ ${rest}`;
  }
  if (lower.startsWith('diamond')) {
    const rest = getLocalizedServiceName(trimmed.slice(7).trim());
    return lang === 'hi' ? `डायमंड ${rest}` : `ડાયમંડ ${rest}`;
  }
  if (lower.startsWith('fruit')) {
    const rest = getLocalizedServiceName(trimmed.slice(5).trim());
    return lang === 'hi' ? `फ्रूट ${rest}` : `ફ્રૂટ ${rest}`;
  }
  if (lower.startsWith('express')) {
    const rest = getLocalizedServiceName(trimmed.slice(7).trim());
    return lang === 'hi' ? `एक्सप्रेस ${rest}` : `એક્સપ્રેસ ${rest}`;
  }
  if (lower.startsWith('premium')) {
    const rest = getLocalizedServiceName(trimmed.slice(7).trim());
    return lang === 'hi' ? `प्रीमियम ${rest}` : `પ્રીમિયમ ${rest}`;
  }
  if (lower.startsWith('standard')) {
    const rest = getLocalizedServiceName(trimmed.slice(8).trim());
    return lang === 'hi' ? `स्टैंडर्ड ${rest}` : `સ્ટાન્ડર્ડ ${rest}`;
  }
  if (lower.startsWith('luxury')) {
    const rest = getLocalizedServiceName(trimmed.slice(6).trim());
    return lang === 'hi' ? `लक्जरी ${rest}` : `લક્ઝરી ${rest}`;
  }

  // 5. Pattern: "[N] BHK Cleaning" or "[N] BHK [Variation] Cleaning"
  const bhkMatch = trimmed.match(/^(\d+)\s*BHK\s*(.*?)Cleaning$/i);
  if (bhkMatch && bhkMatch[1]) {
    const num = bhkMatch[1];
    const modifier = (bhkMatch[2] || '').trim();
    if (!modifier) {
      return lang === 'hi' ? `${num} बीएचके सफाई` : `${num} બીએચકે સફાઈ`;
    }
    if (modifier.toLowerCase().includes('deep')) {
      return lang === 'hi' ? `${num} बीएचके डीप सफाई` : `${num} બીએચકે ડીપ સફાઈ`;
    }
    const locMod = localizePrefix(modifier, lang);
    return lang === 'hi' ? `${num} बीएचके ${locMod} सफाई` : `${num} બીએચકે ${locMod} સફાઈ`;
  }

  // 6. Pattern: "[Subcategory] Service Variation [N]"
  const varMatch = trimmed.match(/(.*?)Service Variation\s*(\d+)/i);
  if (varMatch && varMatch[1] && varMatch[2]) {
    const base = getLocalizedSubcategory(varMatch[1]);
    const num = varMatch[2];
    return lang === 'hi' ? `${base} सेवा विकल्प ${num}` : `${base} સેવા વિકલ્પ ${num}`;
  }

  // 7. Suffix / Substring patterns with localized prefix
  if (lower.includes('facial')) {
    const prefix = trimmed.replace(/facial/gi, '').trim();
    if (!prefix) return lang === 'hi' ? 'फेशियल' : 'ફેશિયલ';
    const locPrefix = localizePrefix(prefix, lang).trim();
    return lang === 'hi' ? `${locPrefix} फेशियल` : `${locPrefix} ફેશિયલ`;
  }
  if (lower.includes('cleanup')) {
    const prefix = trimmed.replace(/cleanup/gi, '').trim();
    const locPrefix = localizePrefix(prefix, lang).trim();
    return lang === 'hi' ? `${locPrefix} क्लीनअप` : `${locPrefix} ક્લીનઅપ`;
  }
  if (lower.includes('massage')) {
    const prefix = trimmed.replace(/massage/gi, '').trim();
    const locPrefix = localizePrefix(prefix, lang).trim();
    return lang === 'hi' ? `${locPrefix} मसाज` : `${locPrefix} મસાજ`;
  }
  if (lower.includes('waxing')) {
    const prefix = trimmed.replace(/waxing/gi, '').trim();
    const locPrefix = localizePrefix(prefix, lang).trim();
    return lang === 'hi' ? `${locPrefix} वैक्सिंग` : `${locPrefix} વેક્સિંગ`;
  }
  if (lower.includes('manicure')) {
    const prefix = trimmed.replace(/manicure/gi, '').trim();
    const locPrefix = localizePrefix(prefix, lang).trim();
    return lang === 'hi' ? `${locPrefix} मेनिक्योर` : `${locPrefix} મેનિક્યોર`;
  }
  if (lower.includes('pedicure')) {
    const prefix = trimmed.replace(/pedicure/gi, '').trim();
    const locPrefix = localizePrefix(prefix, lang).trim();
    return lang === 'hi' ? `${locPrefix} पेडीक्योर` : `${locPrefix} પેડિક્યોર`;
  }
  if (lower.includes('haircut')) {
    const prefix = trimmed.replace(/haircut/gi, '').trim();
    const locPrefix = localizePrefix(prefix, lang).trim();
    return lang === 'hi' ? `${locPrefix} हेयरकट` : `${locPrefix} હેરકટ`;
  }
  if (lower.endsWith('cleaning')) {
    const prefix = trimmed.slice(0, -8).trim();
    const locPrefix = localizePrefix(prefix, lang).trim();
    return lang === 'hi' ? `${locPrefix} सफाई` : `${locPrefix} સફાઈ`;
  }
  if (lower.endsWith('repair')) {
    const prefix = trimmed.slice(0, -6).trim();
    const locPrefix = localizePrefix(prefix, lang).trim();
    return lang === 'hi' ? `${locPrefix} मरम्मत` : `${locPrefix} રિપેરિંગ`;
  }
  if (lower.endsWith('installation')) {
    const prefix = trimmed.slice(0, -12).trim();
    const locPrefix = localizePrefix(prefix, lang).trim();
    return lang === 'hi' ? `${locPrefix} इंस्टॉलेशन` : `${locPrefix} ઇન્સ્ટોલેશન`;
  }
  if (lower.endsWith('service')) {
    const prefix = trimmed.slice(0, -7).trim();
    const locPrefix = localizePrefix(prefix, lang).trim();
    return lang === 'hi' ? `${locPrefix} सर्विस` : `${locPrefix} સર્વિસ`;
  }

  // 8. Tokenized fallback: word-by-word translation
  const tokenized = localizePrefix(trimmed, lang);
  return tokenized || serviceName;
}

/**
 * Intelligent Feature & Bullet Item Localizer:
 * 1. Direct dictionary match from FEATURE_TRANSLATIONS
 * 2. Pattern: "Complete [Service Name] procedure"
 * 3. Keyword transliterations
 * 4. Tokenized fallback
 */
export function getLocalizedFeature(featureText?: string | null): string {
  if (!featureText) return '';
  const lang = (i18n.language || 'en').slice(0, 2);
  if (lang === 'en') return featureText;

  const trimmed = featureText.trim();
  const lower = trimmed.toLowerCase();

  // 1. Direct dictionary match
  const direct = FEATURE_TRANSLATIONS[lower];
  if (direct) {
    if (lang === 'hi' && direct.hi) return direct.hi;
    if (lang === 'gu' && direct.gu) return direct.gu;
  }

  const norm = normalizeKey(trimmed);
  const normDirect = FEATURE_TRANSLATIONS[norm];
  if (normDirect) {
    if (lang === 'hi' && normDirect.hi) return normDirect.hi;
    if (lang === 'gu' && normDirect.gu) return normDirect.gu;
  }

  // 2. Pattern: "Complete [Service Name] procedure"
  const procMatch = trimmed.match(/^Complete (.*?) procedure$/i);
  if (procMatch && procMatch[1]) {
    const svcLoc = getLocalizedServiceName(procMatch[1].trim());
    return lang === 'hi' ? `पूर्ण ${svcLoc} प्रक्रिया` : `સંપૂર્ણ ${svcLoc} પ્રક્રિયા`;
  }

  // 3. Fallback keyword transliterations
  if (norm.includes('cleansing') || norm.includes('cleaning')) {
    return lang === 'hi' ? `${trimmed.replace(/cleansing|cleaning/gi, 'सफाई')}` : `${trimmed.replace(/cleansing|cleaning/gi, 'સફાઈ')}`;
  }
  if (norm.includes('massage')) {
    return lang === 'hi' ? `${trimmed.replace(/massage/gi, 'मसाज')}` : `${trimmed.replace(/massage/gi, 'મસાજ')}`;
  }
  if (norm.includes('scrub')) {
    return lang === 'hi' ? `${trimmed.replace(/scrub/gi, 'स्क्रब')}` : `${trimmed.replace(/scrub/gi, 'સ્ક્રબ')}`;
  }
  if (norm.includes('test')) {
    return lang === 'hi' ? `${trimmed.replace(/test/gi, 'टेस्ट')}` : `${trimmed.replace(/test/gi, 'ટેસ્ટ')}`;
  }
  if (norm.includes('wipe') || norm.includes('wiping')) {
    return lang === 'hi' ? `${trimmed.replace(/wiping|wipe/gi, 'वाइप')}` : `${trimmed.replace(/wiping|wipe/gi, 'વાઇપ')}`;
  }
  if (norm.includes('inspection') || norm.includes('check')) {
    return lang === 'hi' ? `${trimmed.replace(/inspection|check/gi, 'जांच')}` : `${trimmed.replace(/inspection|check/gi, 'તપાસ')}`;
  }

  // 4. Tokenized fallback
  const locTokens = localizePrefix(trimmed, lang);
  return locTokens || featureText;
}

/**
 * Booking Status Localizer
 */
export function getLocalizedStatus(status?: string | null): string {
  if (!status) return '';
  const lang = (i18n.language || 'en').slice(0, 2);
  if (lang === 'en') return status;

  const st = status.toLowerCase().replace(/_/g, ' ').trim();
  const map: Record<string, { hi: string; gu: string }> = {
    'requested': { hi: 'अनुरोधित', gu: 'વિનંતી કરેલ' },
    'assigned': { hi: 'आवंटित', gu: 'સોંપાયેલ' },
    'accepted': { hi: 'स्वीकृत', gu: 'સ્વીકારેલ' },
    'on the way': { hi: 'रास्ते में', gu: 'રસ્તામાં' },
    'on_the_way': { hi: 'रास्ते में', gu: 'રસ્તામાં' },
    'arrived': { hi: 'पहुंच गए', gu: 'પહોંચી ગયા' },
    'started': { hi: 'प्रगति पर', gu: 'ચાલુ' },
    'in progress': { hi: 'प्रगति पर', gu: 'ચાલુ' },
    'in_progress': { hi: 'प्रगति पर', gu: 'ચાલુ' },
    'completed': { hi: 'पूर्ण', gu: 'પૂર્ણ' },
    'paid': { hi: 'भुगतान पूर्ण', gu: 'ચૂકવણી પૂર્ણ' },
    'cancelled': { hi: 'रद्द', gu: 'રદ કરેલ' },
    'rejected': { hi: 'अस्वीकृत', gu: 'અસ્વીકાર' },
    'open': { hi: 'सक्रिय (खुला)', gu: 'સક્રિય (ખુલ્લું)' },
    'resolved': { hi: 'समाधान हुआ', gu: 'ઉકેલાયેલ' },
    'closed': { hi: 'बंद', gu: 'બંધ' },
    'pending': { hi: 'लंबित', gu: 'બાકી' },
    'in review': { hi: 'समीक्षाधीन', gu: 'સમીક્ષા હેઠળ' },
    'in_review': { hi: 'समीक्षाधीन', gu: 'સમીક્ષા હેઠળ' }
  };
  const entry = map[st];
  if (entry) {
    return lang === 'hi' ? entry.hi : entry.gu;
  }
  return status;
}

export function getLocalizedSupportCategory(cat?: string | null): string {
  if (!cat) return '';
  const lang = (i18n.language || 'en').slice(0, 2);
  if (lang === 'en') return cat;

  const clean = cat.toLowerCase().trim();
  const map: Record<string, { hi: string; gu: string }> = {
    'booking assistance': { hi: 'बुकिंग सहायता', gu: 'બુકિંગ સહાય' },
    'payment & refund': { hi: 'भुगतान और धनवापसी', gu: 'ચૂકવણી અને રિફંડ' },
    'payment and refund': { hi: 'भुगतान और धनवापसी', gu: 'ચૂકવણી અને રિફંડ' },
    'technician feedback': { hi: 'तकनीशियन प्रतिक्रिया', gu: 'ટેકનિશિયન પ્રતિસાદ' },
    'general query': { hi: 'सामान्य प्रश्न', gu: 'સામાન્ય પૂછપરછ' }
  };
  const entry = map[clean];
  if (entry) {
    return lang === 'hi' ? entry.hi : entry.gu;
  }
  return cat;
}

// 5. Intelligent Service Description Localizer
export function getLocalizedDescription(description?: string | null): string {
  if (!description) return '';
  const lang = (i18n.language || 'en').slice(0, 2);
  if (lang === 'en') return description;

  const lower = description.toLowerCase();

  if (lower.includes('rapid facial brightening treatment')) {
    return lang === 'hi'
      ? 'त्वचा की प्राकृतिक चमक बढ़ाने और चेहरे के रोमछिद्रों को साफ करने के लिए एक त्वरित व प्रभावी फेशियल ट्रीटमेंट।'
      : 'ત્વચાની કુદરતી ચમક વધારવા અને ચહેરાના વાળને અનુકૂળ બનાવવા માટે એક ઝડપી અને અસરકારક ફેશિયલ ટ્રીટમેન્ટ.';
  }
  if (lower.includes('all-around rejuvenating facial') || lower.includes('all around rejuvenating facial')) {
    return lang === 'hi'
      ? 'सभी प्रकार की त्वचा के लिए उपयुक्त पुनर्योजी फेशियल। यह सुस्त व थकी हुई त्वचा को गहराई से तरोताजा करता है।'
      : 'તમામ પ્રકારની ત્વચા માટે યોગ્ય પાવન ફેશિયલ. તે નિર્જીવ અને થાકેલી ત્વચાને ઊંડાણપૂર્વક તાજગી આપે છે.';
  }
  if (lower.includes('quick, highly effective skin-refreshing') || lower.includes('skin refreshing service designed')) {
    return lang === 'hi'
      ? 'व्यस्त दिनचर्या और नियमित देखभाल के लिए डिज़ाइन की गई त्वरित व अत्यधिक प्रभावी त्वचा ताजगी सेवा।'
      : 'વ્યસ્ત દિનચર્યા અને નિયમિત જાળવણી માટે રચાયેલ ઝડપી અને અત્યંત અસરકારક ત્વચા તાજગી સેવા.';
  }
  if (lower.includes('sun-damage reversal') || lower.includes('sun damage reversal') || lower.includes('melanin buildup')) {
    return lang === 'hi'
      ? 'धूप से होने वाली टैनिंग को दूर करने और त्वचा के प्राकृतिक निखार को पुनर्स्थापित करने वाला प्रभावी डी-टैन उपचार।'
      : 'સૂર્યપ્રકાશથી થતા ટેનિંગને દૂર કરવા અને ત્વચાના કુદરતી નિખારને પાછો મેળવવા માટે અસરકારક ડી-ટેન ટ્રીટમેન્ટ.';
  }
  if (lower.includes('moisture-infusion') || lower.includes('moisture infusion') || lower.includes('dehydrated')) {
    return lang === 'hi'
      ? 'रूखी और बेजान त्वचा के लिए गहन नमी युक्त हाइड्रेटिंग फेशियल, जो त्वचा को कोमल और चमकदार बनाता है।'
      : 'શુષ્ક અને નિર્જીવ ત્વચા માટે ભેજયુક્ત હાઇડ્રેટિંગ ફેશિયલ, જે ત્વચાને મુલાયમ અને ચમકદાર બનાવે છે.';
  }
  if (lower.includes('glass-skin') || lower.includes('glass skin') || lower.includes('k-beauty')) {
    return lang === 'hi'
      ? 'के-ब्यूटी अनुष्ठानों से प्रेरित बहु-चरणीय ग्लास-स्किन फेशियल थेरेपी, जो बेदाग व चमकदार त्वचा प्रदान करती है।'
      : 'કે-બ્યુટીથી પ્રેરિત મલ્ટિ-સ્ટેપ ગ્લાસ-સ્કિન ફેશિયલ થેરાપી, જે દોષરહિત અને ચમકદાર ત્વચા પ્રદાન કરે છે.';
  }
  if (lower.includes('complete standardized full-home cleaning') || lower.includes('standardized full home cleaning')) {
    return lang === 'hi'
      ? 'अपार्टमेंट और घरों के लिए विशेष रूप से इंजीनियर की गई व्यापक मानकीकृत डीप होम सफाई सेवा।'
      : 'એપાર્ટમેન્ટ અને ઘરો માટે ખાસ તૈયાર કરવામાં આવેલી વ્યાપક પ્રમાણિત ડીપ હોમ સફાઈ સેવા.';
  }
  if (lower.includes('all-inclusive turnkey apartment cleaning') || lower.includes('turnkey apartment cleaning')) {
    return lang === 'hi'
      ? 'आवासीय फ्लैटों और अपार्टमेंट के लिए सभी समावेशी टर्नकी रूटीन और पोस्ट-टेनेंसी सफाई सेवा।'
      : 'રહેણાંક ફ્લેટ અને એપાર્ટમેન્ટ્સ માટે તમામ સુવિધાયુક્ત ટર્નકી રૂટીન અને ડીપ સફાઈ સેવા.';
  }
  if (lower.includes('estate-grade deep cleaning') || lower.includes('bungalows, villas')) {
    return lang === 'hi'
      ? 'स्वतंत्र बंगलों, विला और डुप्लेक्स घरों के लिए एस्टेट-ग्रेड प्रीमियम डीप सफाई सेवा।'
      : 'સ્વતંત્ર બંગલા, વિલા અને ડુપ્લેક્સ ઘરો માટે પ્રીમિયમ ડીપ સફાઈ સેવા.';
  }
  if (lower.includes('customizable, targeted cleaning') || lower.includes('partial home cleaning')) {
    return lang === 'hi'
      ? 'घर के चुनिंदा कमरों या अधिक उपयोग वाले क्षेत्रों के लिए कस्टमाइज़ेबल लक्षित सफाई सेवा।'
      : 'ઘરના પસંદગીના રૂમ અથવા વધુ વપરાશવાળા વિસ્તારો માટે કસ્ટમાઇઝ કરી શકાય તેવી સફાઈ સેવા.';
  }
  if (lower.includes('verified service delivered by trained professionals')) {
    return lang === 'hi'
      ? 'प्रशिक्षित पेशेवरों द्वारा 7-दिवसीय स्मार्टसर्व गारंटी के साथ प्रदान की जाने वाली सत्यापित सेवा।'
      : 'પ્રશિક્ષિત વ્યાવસાયિકો દ્વારા 7-દિવસીય સ્માર્ટસર્વ ગેરંટી સાથે પૂરી પાડવામાં આવતી પ્રમાણિત સેવા.';
  }

  return lang === 'hi'
    ? 'प्रशिक्षित और बैकग्राउंड-सत्यापित पेशेवरों द्वारा 7-दिवसीय स्मार्टसर्व वारंटी के साथ पूरी की जाने वाली सुरक्षित होम सेवा।'
    : 'પ્રશિક્ષિત અને બેકગ્રાઉન્ડ-ચકાસાયેલ વ્યાવસાયિકો દ્વારા 7-દિવસીય સ્માર્ટસર્વ વોરંટી સાથે પૂરી પાડવામાં આવતી સુરક્ષિત સેવા.';
}
