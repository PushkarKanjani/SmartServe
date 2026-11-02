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

  return clean;
}

function hasLatin(str?: string | null): boolean {
  if (!str) return false;
  return /[a-zA-Z]/.test(str);
}

function hasIndic(str?: string | null): boolean {
  if (!str) return false;
  return /[\u0900-\u097F\u0A80-\u0AFF]/.test(str);
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
  const res = translated.join(' ');
  // STRICT: If result contains both Latin and Indic characters, reject hybrid and keep clean
  if (hasLatin(res) && hasIndic(res)) {
    return clean;
  }
  return res;
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

  // 7. Suffix / Substring patterns with localized prefix (only when prefix is pure Indic)
  if (lower.includes('facial')) {
    const prefix = trimmed.replace(/facial/gi, '').trim();
    if (!prefix) return lang === 'hi' ? 'फेशियल' : 'ફેશિયલ';
    const locPrefix = localizePrefix(prefix, lang).trim();
    if (!hasLatin(locPrefix)) return lang === 'hi' ? `${locPrefix} फेशियल` : `${locPrefix} ફેશિયલ`;
  }
  if (lower.includes('cleanup')) {
    const prefix = trimmed.replace(/cleanup/gi, '').trim();
    if (!prefix) return lang === 'hi' ? 'क्लीनअप' : 'ક્લીનઅપ';
    const locPrefix = localizePrefix(prefix, lang).trim();
    if (!hasLatin(locPrefix)) return lang === 'hi' ? `${locPrefix} क्लीनअप` : `${locPrefix} ક્લીનઅપ`;
  }
  if (lower.includes('massage')) {
    const prefix = trimmed.replace(/massage/gi, '').trim();
    if (!prefix) return lang === 'hi' ? 'मसाज' : 'મસાજ';
    const locPrefix = localizePrefix(prefix, lang).trim();
    if (!hasLatin(locPrefix)) return lang === 'hi' ? `${locPrefix} मसाज` : `${locPrefix} મસાજ`;
  }
  if (lower.includes('waxing')) {
    const prefix = trimmed.replace(/waxing/gi, '').trim();
    if (!prefix) return lang === 'hi' ? 'वैक्सिंग' : 'વેક્સિંગ';
    const locPrefix = localizePrefix(prefix, lang).trim();
    if (!hasLatin(locPrefix)) return lang === 'hi' ? `${locPrefix} वैक्सिंग` : `${locPrefix} વેક્સિંગ`;
  }
  if (lower.includes('manicure')) {
    const prefix = trimmed.replace(/manicure/gi, '').trim();
    if (!prefix) return lang === 'hi' ? 'मेनिक्योर' : 'મેનિક્યોર';
    const locPrefix = localizePrefix(prefix, lang).trim();
    if (!hasLatin(locPrefix)) return lang === 'hi' ? `${locPrefix} मेनिक्योर` : `${locPrefix} મેનિક્યોર`;
  }
  if (lower.includes('pedicure')) {
    const prefix = trimmed.replace(/pedicure/gi, '').trim();
    if (!prefix) return lang === 'hi' ? 'पेडीक्योर' : 'પેડિક્યોર';
    const locPrefix = localizePrefix(prefix, lang).trim();
    if (!hasLatin(locPrefix)) return lang === 'hi' ? `${locPrefix} पेडीक्योर` : `${locPrefix} પેડિક્યોર`;
  }
  if (lower.includes('haircut')) {
    const prefix = trimmed.replace(/haircut/gi, '').trim();
    if (!prefix) return lang === 'hi' ? 'हेयरकट' : 'હેરકટ';
    const locPrefix = localizePrefix(prefix, lang).trim();
    if (!hasLatin(locPrefix)) return lang === 'hi' ? `${locPrefix} हेयरकट` : `${locPrefix} હેરકટ`;
  }
  if (lower.endsWith('cleaning')) {
    const prefix = trimmed.slice(0, -8).trim();
    if (!prefix) return lang === 'hi' ? 'सफाई' : 'સફાઈ';
    const locPrefix = localizePrefix(prefix, lang).trim();
    if (!hasLatin(locPrefix)) return lang === 'hi' ? `${locPrefix} सफाई` : `${locPrefix} સફાઈ`;
  }
  if (lower.endsWith('repair')) {
    const prefix = trimmed.slice(0, -6).trim();
    if (!prefix) return lang === 'hi' ? 'मरम्मत' : 'રિપેરિંગ';
    const locPrefix = localizePrefix(prefix, lang).trim();
    if (!hasLatin(locPrefix)) return lang === 'hi' ? `${locPrefix} मरम्मत` : `${locPrefix} રિપેરિંગ`;
  }
  if (lower.endsWith('installation')) {
    const prefix = trimmed.slice(0, -12).trim();
    if (!prefix) return lang === 'hi' ? 'इंस्टॉलेशन' : 'ઇન્સ્ટોલેશન';
    const locPrefix = localizePrefix(prefix, lang).trim();
    if (!hasLatin(locPrefix)) return lang === 'hi' ? `${locPrefix} इंस्टॉलेशन` : `${locPrefix} ઇન્સ્ટોલેશન`;
  }
  if (lower.endsWith('service')) {
    const prefix = trimmed.slice(0, -7).trim();
    if (!prefix) return lang === 'hi' ? 'सर्विस' : 'સર્વિસ';
    const locPrefix = localizePrefix(prefix, lang).trim();
    if (!hasLatin(locPrefix)) return lang === 'hi' ? `${locPrefix} सर्विस` : `${locPrefix} સર્વિસ`;
  }

  // 8. Clean fallback: do not return partial franken-strings
  const tokenized = localizePrefix(trimmed, lang);
  if (tokenized && !hasLatin(tokenized)) {
    return tokenized;
  }
  return serviceName;
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
  const direct = FEATURE_TRANSLATIONS[lower] || WORD_TRANSLATIONS[lower];
  if (direct) {
    if (lang === 'hi' && direct.hi) return direct.hi;
    if (lang === 'gu' && direct.gu) return direct.gu;
  }

  const strippedPeriod = lower.replace(/[.\s]+$/, '');
  const directNoPeriod = FEATURE_TRANSLATIONS[strippedPeriod] || WORD_TRANSLATIONS[strippedPeriod];
  if (directNoPeriod) {
    if (lang === 'hi' && directNoPeriod.hi) return directNoPeriod.hi;
    if (lang === 'gu' && directNoPeriod.gu) return directNoPeriod.gu;
  }

  const norm = normalizeKey(trimmed);
  const normDirect = FEATURE_TRANSLATIONS[norm] || WORD_TRANSLATIONS[norm];
  if (normDirect) {
    if (lang === 'hi' && normDirect.hi) return normDirect.hi;
    if (lang === 'gu' && normDirect.gu) return normDirect.gu;
  }

  // 2a. Pattern: "Complete [Service Name] procedure"
  const procMatch = trimmed.match(/^Complete (.*?) procedure$/i);
  if (procMatch && procMatch[1]) {
    const svcLoc = getLocalizedServiceName(procMatch[1].trim());
    return lang === 'hi' ? `पूर्ण ${svcLoc} प्रक्रिया` : `સંપૂર્ણ ${svcLoc} પ્રક્રિયા`;
  }

  // 2b. Pattern: "Professional [Service Name] procedure"
  const procMatch2 = trimmed.match(/^Professional (.*?) procedure$/i);
  if (procMatch2 && procMatch2[1]) {
    const svcLoc = getLocalizedServiceName(procMatch2[1].trim());
    return lang === 'hi' ? `व्यावसायिक ${svcLoc} प्रक्रिया` : `વ્યાવસાયિક ${svcLoc} પ્રક્રિયા`;
  }

  // 2c. Pattern: "Standard [Service Name] procedure"
  const procMatch3 = trimmed.match(/^Standard (.*?) procedure$/i);
  if (procMatch3 && procMatch3[1]) {
    const svcLoc = getLocalizedServiceName(procMatch3[1].trim());
    return lang === 'hi' ? `मानक ${svcLoc} प्रक्रिया` : `પ્રમાણભૂત ${svcLoc} પ્રક્રિયા`;
  }

  // 2d. Pattern: "High quality [X] completed successfully"
  const qualMatch = trimmed.match(/^High quality (.*?) completed successfully$/i);
  if (qualMatch && qualMatch[1]) {
    const rawDomain = qualMatch[1].trim();
    let svcLoc = getLocalizedServiceName(rawDomain);
    if (svcLoc === rawDomain || hasLatin(svcLoc)) {
      const subLoc = getLocalizedSubcategory(rawDomain);
      if (subLoc !== rawDomain && !hasLatin(subLoc)) svcLoc = subLoc;
      else {
        const catLoc = getLocalizedCategory(rawDomain);
        if (catLoc !== rawDomain && !hasLatin(catLoc)) svcLoc = catLoc;
      }
    }
    return lang === 'hi' ? `उच्च गुणवत्ता वाली ${svcLoc} सफलतापूर्वक पूर्ण` : `ઉચ્ચ ગુણવત્તાવાળી ${svcLoc} સફળતાપૂર્વક પૂર્ણ`;
  }

  // 2e. Pattern: "High quality [X] Service Variation [N] completed successfully"
  const qualVarMatch = trimmed.match(/^High quality (.*?) Service Variation \d+ completed successfully$/i);
  if (qualVarMatch && qualVarMatch[1]) {
    const rawDomain = qualVarMatch[1].trim();
    let svcLoc = getLocalizedServiceName(rawDomain);
    if (svcLoc === rawDomain || hasLatin(svcLoc)) {
      const subLoc = getLocalizedSubcategory(rawDomain);
      if (subLoc !== rawDomain && !hasLatin(subLoc)) svcLoc = subLoc;
      else {
        const catLoc = getLocalizedCategory(rawDomain);
        if (catLoc !== rawDomain && !hasLatin(catLoc)) svcLoc = catLoc;
      }
    }
    return lang === 'hi' ? `उच्च गुणवत्ता वाली ${svcLoc} सर्विस सफलतापूर्वक पूर्ण` : `ઉચ્ચ ગુણવત્તાવાળી ${svcLoc} સેવા સફળતાપૂર્વક પૂર્ણ`;
  }

  // 2f. Pattern: "[N]-day service warranty on workmanship"
  const warrantyDayMatch = trimmed.match(/^(\d+)[- ]day service warranty on workmanship$/i);
  if (warrantyDayMatch && warrantyDayMatch[1]) {
    const n = warrantyDayMatch[1];
    return lang === 'hi' ? `कारीगरी पर ${n} दिन की सर्विस वारंटी` : `કારીગરી પર ${n} દિવસની સર્વિસ વૉરંટી`;
  }

  // 2g. Pattern: "[N]-day service warranty"
  const warrantyMatch = trimmed.match(/^(\d+)[- ]day service warranty$/i);
  if (warrantyMatch && warrantyMatch[1]) {
    const n = warrantyMatch[1];
    return lang === 'hi' ? `${n} दिन की सर्विस वारंटी` : `${n} દિવસની સર્વિસ વૉરંટી`;
  }

  // 2h. Pattern: "How long does [X] take?"
  const howLongMatch = trimmed.match(/^How long does (.*?) take\?$/i);
  if (howLongMatch && howLongMatch[1]) {
    const svcLoc = getLocalizedServiceName(howLongMatch[1].trim());
    return lang === 'hi' ? `${svcLoc} में कितना समय लगता है?` : `${svcLoc} માટે કેટલો સમય લાગે છે?`;
  }

  // 2i. Pattern: "The session typically takes around [N] minutes."
  const sessionMatch = trimmed.match(/^The session typically takes around (\d+) minutes\.?$/i);
  if (sessionMatch && sessionMatch[1]) {
    const n = sessionMatch[1];
    return lang === 'hi' ? `सत्र में आमतौर पर लगभग ${n} मिनट लगते हैं।` : `સત્ર સામાન્ય રીતે આશરે ${n} મિનિટ લે છે.`;
  }

  // 2j. Pattern: "Typically takes around [N] minutes."
  const sessionMatch2 = trimmed.match(/^Typically takes around (\d+) minutes\.?$/i);
  if (sessionMatch2 && sessionMatch2[1]) {
    const n = sessionMatch2[1];
    return lang === 'hi' ? `आमतौर पर लगभग ${n} मिनट लगते हैं।` : `સામાન્ય રીતે આશરે ${n} મિનિટ લે છે.`;
  }

  // 3. Fallback: Return original cleanly without partial character corruption
  return featureText;
}

/**
 * Localize warranty coverage text.
 * Handles patterns like "7-day service warranty on workmanship", "10-day service warranty", etc.
 */
export function getLocalizedWarrantyText(text?: string | null): string {
  if (!text) return '';
  return getLocalizedFeature(text);
}

/**
 * Localize FAQ question text.
 */
export function getLocalizedFAQQuestion(q?: string | null): string {
  if (!q) return '';
  return getLocalizedFeature(q);
}

/**
 * Localize FAQ answer text.
 */
export function getLocalizedFAQAnswer(a?: string | null): string {
  if (!a) return '';
  return getLocalizedFeature(a);
}

/**
 * Intelligent Step Description Localizer
 */
export function getLocalizedStepDescription(description?: string | null): string {
  if (!description) return '';
  const lang = (i18n.language || 'en').slice(0, 2);
  if (lang === 'en') return description;

  const trimmed = description.trim();
  const lower = trimmed.toLowerCase();

  // 1. Direct dictionary lookup
  const direct = FEATURE_TRANSLATIONS[lower];
  if (direct) {
    if (lang === 'hi' && direct.hi) return direct.hi;
    if (lang === 'gu' && direct.gu) return direct.gu;
  }

  // 2. Pattern: "Performing the main [X] Service Variation [N] tasks with precision."
  const perfVarMatch = trimmed.match(/^Performing the main (.*?) Service Variation \d+ tasks with precision\.?$/i);
  if (perfVarMatch && perfVarMatch[1]) {
    const rawCategory = perfVarMatch[1].trim();
    let loc = getLocalizedSubcategory(rawCategory);
    if (loc === rawCategory || hasLatin(loc)) {
      const catLoc = getLocalizedCategory(rawCategory);
      if (catLoc !== rawCategory && !hasLatin(catLoc)) loc = catLoc;
      else {
        const svcLoc = getLocalizedServiceName(rawCategory);
        if (svcLoc !== rawCategory && !hasLatin(svcLoc)) loc = svcLoc;
      }
    }
    return lang === 'hi'
      ? `सटीकता के साथ मुख्य ${loc} कार्य निष्पादित करना।`
      : `ચોકસાઈ સાથે મુખ્ય ${loc} કામગીરી અમલમાં મૂકવી.`;
  }

  // 3. Pattern: "Performing the main [X] tasks with precision."
  const perfMatch = trimmed.match(/^Performing the main (.*?) tasks with precision\.?$/i);
  if (perfMatch && perfMatch[1]) {
    const rawCategory = perfMatch[1].trim();
    let loc = getLocalizedSubcategory(rawCategory);
    if (loc === rawCategory || hasLatin(loc)) {
      const catLoc = getLocalizedCategory(rawCategory);
      if (catLoc !== rawCategory && !hasLatin(catLoc)) loc = catLoc;
      else {
        const svcLoc = getLocalizedServiceName(rawCategory);
        if (svcLoc !== rawCategory && !hasLatin(svcLoc)) loc = svcLoc;
      }
    }
    return lang === 'hi'
      ? `सटीकता के साथ मुख्य ${loc} कार्य निष्पादित करना।`
      : `ચોકસાઈ સાથે મુખ્ય ${loc} કામગીરી અમલમાં મૂકવી.`;
  }

  // 4. Standard common step descriptions
  if (lower.includes('examines the requirements and plans the service delivery')) {
    return lang === 'hi'
      ? 'पेशेवर आवश्यकताओं की जांच करता है और सेवा निष्पादन की योजना बनाता है।'
      : 'નિષ્ણાત જરૂરિયાતોની તપાસ કરે છે અને સેવા પ્રદાન કરવાની યોજના બનાવે છે.';
  }
  if (lower.includes('setting up the necessary tools, materials, and safety measures')) {
    return lang === 'hi'
      ? 'आवश्यक उपकरण, सामग्री और सुरक्षा उपायों की व्यवस्था करना।'
      : 'જરૂરી સાધનો, સામગ્રી અને સુરક્ષા પગલાંની વ્યવસ્થા કરવી.';
  }
  if (lower.includes('applying final finishing touches to ensure perfect results')) {
    return lang === 'hi'
      ? 'उत्कृष्ट परिणाम सुनिश्चित करने के लिए अंतिम फिनिशिंग टच देना।'
      : 'ઉત્કૃષ્ટ પરિણામો સુનિશ્ચિત કરવા માટે આખરી ફિનિશિંગ ટચ આપવો.';
  }
  if (lower.includes('cleaning the work area and handing over to the customer for approval')) {
    return lang === 'hi'
      ? 'कार्य क्षेत्र की सफाई करना और ग्राहक के अनुमोदन के लिए सौंपना।'
      : 'કાર્ય વિસ્તારની સફાઈ કરવી અને ગ્રાહકની મંજૂરી માટે સોંપણી કરવી.';
  }

  // 5. Category-specific step mappings
  const stepMap: Record<string, { hi: string; gu: string }> = {
    'site inspection for optimal placement': { hi: 'उचित स्थान के लिए साइट का निरीक्षण', gu: 'યોગ્ય સ્થાન માટે સાઇટનું નિરીક્ષણ' },
    'mounting and wiring of the device': { hi: 'उपकरण की फिटिंग और वायरिंग', gu: 'ઉપકરણનું ફિટિંગ અને વાયરિંગ' },
    'connecting the device to the smart network': { hi: 'उपकरण को स्मार्ट नेटवर्क से जोड़ना', gu: 'ઉપકરણને સ્માર્ટ નેટવર્ક સાથે જોડવું' },
    'functional testing and system verification': { hi: 'सिस्टम का परीक्षण और सत्यापन', gu: 'સિસ્ટમનું ટેસ્ટિંગ અને ચકાસણી' },
    'demonstrating usage and safety guidelines to the customer': { hi: 'ग्राहक को उपयोग और सुरक्षा दिशानिर्देश समझाना', gu: 'ગ્રાહકને ઉપયોગ અને સુરક્ષા માર્ગદર્શિકા સમજાવવી' },
    'understanding specific household needs': { hi: 'घर की विशिष्ट आवश्यकताओं को समझना', gu: 'ઘરની ચોક્કસ જરૂરિયાતો સમજવી' },
    'assigning the right professional for the task': { hi: 'कार्य के लिए उपयुक्त पेशेवर नियुक्त करना', gu: 'કામ માટે યોગ્ય નિષ્ણાતની નિમણૂક કરવી' },
    'carrying out the requested domestic duties': { hi: 'अनुरोधित घरेलू कार्य निष्पादित करना', gu: 'વિનંતી કરેલ ઘરેલું કાર્યો કરવા' },
    'ensuring the service meets smartserve standards': { hi: 'सेवा स्मार्टसर्व मानकों के अनुरूप सुनिश्चित करना', gu: 'સેવા સ્માર્ટસર્વ ધોરણો મુજબ છે તેની ખાતરી કરવી' },
    'collecting customer feedback for continuous improvement': { hi: 'निरंतर सुधार के लिए ग्राहक से प्रतिक्रिया लेना', gu: 'સતત સુધારા માટે ગ્રાહકનો પ્રતિસાદ મેળવવો' },
    "evaluating the student's current level and learning goals": { hi: 'छात्र के वर्तमान स्तर और सीखने के लक्ष्यों का मूल्यांकन', gu: 'વિદ્યાર્થીના વર્તમાન સ્તર અને શીખવાના લક્ષ્યોનું મૂલ્યાંકન' },
    'customising a structured study plan': { hi: 'एक संरचित अध्ययन योजना तैयार करना', gu: 'એક સુવ્યવસ્થિત અભ્યાસ યોજના તૈયાર કરવી' },
    'conducting focused, interactive lessons': { hi: 'इंटरैक्टिव और केंद्रित कक्षाएं संचालित करना', gu: 'ઇન્ટરેક્ટિવ અને ધ્યાન કેન્દ્રિત સત્રો યોજવા' },
    'providing exercises to reinforce concepts': { hi: 'अवधारणाओं को मजबूत करने के लिए अभ्यास प्रदान करना', gu: 'સંકલ્પનાઓને મજબૂત કરવા માટે સ્વાધ્યાય આપવા' },
    'reviewing progress and adjusting the plan as needed': { hi: 'प्रगति की समीक्षा करना और योजना में आवश्यकतानुसार बदलाव करना', gu: 'પ્રગતિની સમીક્ષા કરવી અને જરૂર મુજબ યોજનામાં સુધારો કરવો' },
    'assessing health goals, medical history, and current fitness level': { hi: 'स्वास्थ्य लक्ष्यों और वर्तमान फिटनेस स्तर का मूल्यांकन', gu: 'આરોગ્ય લક્ષ્યો અને વર્તમાન ફિટનેસ સ્તરનું મૂલ્યાંકન' },
    'creating a customised programme tailored to specific needs': { hi: 'विशिष्ट आवश्यकताओं के अनुसार अनुकूलित कार्यक्रम तैयार करना', gu: 'ચોક્કસ જરૂરિયાતો મુજબ કસ્ટમાઇઝ્ડ કાર્યક્રમ બનાવવો' },
    'conducting guided sessions with professional supervision': { hi: 'पेशेवर मार्गदर्शन में सत्र आयोजित करना', gu: 'નિષ્ણાતના માર્ગદર્શન હેઠળ સત્રો યોજવા' },
    'tracking improvements and adjusting the programme': { hi: 'सुधार को ट्रैक करना और कार्यक्रम में समायोजन करना', gu: 'સુધારા પર નજર રાખવી અને કાર્યક્રમમાં ફેરફાર કરવા' },
    'reviewing outcomes and setting next phase goals': { hi: 'परिणामों की समीक्षा करना और अगले चरण के लक्ष्य निर्धारित करना', gu: 'પરિણામોની સમીક્ષા કરવી અને આગામી તબક્કાના લક્ષ્યો નક્કી કરવા' },
    'understanding event theme, scale, and budget': { hi: 'इवेंट की थीम, स्तर और बजट को समझना', gu: 'ઇવેન્ટની થીમ, વ્યાપ અને બજેટને સમજવું' },
    'presenting a tailored event concept and plan': { hi: 'अनुकूलित इवेंट कॉन्सेप्ट और योजना प्रस्तुत करना', gu: 'કસ્ટમાઇઝ્ડ ઇવેન્ટ કન્સેપ્ટ અને પ્લાન રજૂ કરવો' },
    'arranging all required vendors and logistics': { hi: 'सभी आवश्यक विक्रेताओं और लॉजिस्टिक्स की व्यवस्था करना', gu: 'તમામ જરૂરી વેન્ડર્સ અને લોજિસ્ટિક્સની વ્યવસ્થા કરવી' },
    'on-ground management and execution on the event day': { hi: 'इवेंट के दिन ग्राउंड मैनेजमेंट और सुचारू संचालन', gu: 'ઇવેન્ટના દિવસે સ્થળ પર સંચાલન અને અમલીકરણ' },
    'clearing up and delivering any media or documentation': { hi: 'सफाई और सभी मीडिया या दस्तावेज़ सौंपना', gu: 'સફાઈ અને તમામ મીડિયા કે દસ્તાવેજો સોંપવા' },
    'identifying the root cause of the technical issue': { hi: 'तकनीकी समस्या के मूल कारण की पहचान करना', gu: 'તકનીકી સમસ્યાના મૂળ કારણની ઓળખ કરવી' },
    'outlining the fix or upgrade path': { hi: 'मरम्मत या अपग्रेड समाधान की रूपरेखा तैयार करना', gu: 'રિપેરિંગ અથવા અપગ્રેડના પગલાં નક્કી કરવા' },
    'carrying out repairs, setup, or development work': { hi: 'मरम्मत, सेटअप या विकास कार्य निष्पादित करना', gu: 'રિપેરિંગ, સેટઅપ અથવા ડેવલપમેન્ટ કાર્ય પૂર્ણ કરવું' },
    'confirming the solution works correctly': { hi: 'समाधान के सही ढंग से काम करने की पुष्टि करना', gu: 'ઉકેલ યોગ્ય રીતે કામ કરે છે તેની ખાતરી કરવી' },
    'demonstrating the fix and advising on best practices': { hi: 'समाधान प्रदर्शित करना और सर्वोत्तम प्रथाओं की सलाह देना', gu: 'ઉકેલ બતાવવો અને શ્રેષ્ઠ પદ્ધતિઓની સલાહ આપવી' },
    'assessing volume, fragile items, and special requirements': { hi: 'सामान की मात्रा, नाजुक वस्तुओं और आवश्यकताओं का मूल्यांकन', gu: 'સામાનનો જથ્થો, નાજુક વસ્તુઓ અને જરૂરિયાતોનું મૂલ્યાંકન' },
    'carefully packing all items with appropriate materials': { hi: 'उचित सामग्री के साथ सभी वस्तुओं को सुरक्षित रूप से पैक करना', gu: 'યોગ્ય સામગ્રી સાથે તમામ વસ્તુઓનું સુરક્ષિત પેકિંગ કરવું' },
    'safely loading and transporting to the destination': { hi: 'गंतव्य तक सुरक्षित लोडिंग और परिवहन', gu: 'ગંતવ્ય સુધી સુરક્ષિત લોડિંગ અને પરિવહન' },
    'unloading and placing items as per customer instructions': { hi: 'ग्राहक के निर्देशानुसार सामान उतारना और व्यवस्थित करना', gu: 'ગ્રાહકની સૂચના મુજબ સામાન ઉતારવો અને ગોઠવવો' },
    'verifying all items are delivered and removing packing waste': { hi: 'सभी वस्तुओं के वितरण की पुष्टि और पैकिंग कचरे का निपटान', gu: 'તમામ સામાન પહોંચ્યાની ચકાસણી અને કચરાનો નિકાલ' },
    "evaluating the pet's breed, temperament, and specific needs": { hi: 'पालतू जानवर की नस्ल, स्वभाव और आवश्यकताओं का मूल्यांकन', gu: 'પાલતુ પ્રાણીની જાતિ, સ્વભાવ અને જરૂરિયાતોનું મૂલ્યાંકન' },
    'preparing equipment and a safe environment': { hi: 'उपकरण और एक सुरक्षित वातावरण तैयार करना', gu: 'સાધનો અને સુરક્ષિત વાતાવરણ તૈયાર કરવું' },
    'delivering the requested pet care service': { hi: 'अनुरोधित पेट केयर सेवा प्रदान करना', gu: 'વિનંતી કરેલ પેટ કેર સેવા પૂરી પાડવી' },
    'ensuring the pet is comfortable and healthy post-service': { hi: 'सेवा के बाद पालतू जानवर के आराम और स्वास्थ्य की पुष्टि', gu: 'સેવા પછી પાલતુ પ્રાણીના આરામ અને સુખાકારીની ખાતરી' },
    'briefing the owner on aftercare and next steps': { hi: 'मालिक को देखभाल और अगले कदमों की जानकारी देना', gu: 'માલિકને પછીની સંભાળ અને આગામી પગલાં વિશે માહિતી આપવી' }
  };

  const mapped = stepMap[lower];
  if (mapped) {
    return lang === 'hi' ? mapped.hi : mapped.gu;
  }

  // 6. Final fallback: getLocalizedFeature
  return getLocalizedFeature(description);
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
