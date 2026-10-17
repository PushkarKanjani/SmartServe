import i18n from '../i18n';

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
    .replace(/[&\/\\_\-+]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

export function getCleanName(raw?: string | null): string {
  if (!raw) return '';
  return raw.replace(/^\d+\.\s*/, '').trim();
}

// 1. All 14 Primary Categories
export const CATEGORY_TRANSLATIONS: Record<string, { hi: string; gu: string }> = {
  'beauty salon spa': { hi: 'ब्यूटी, सैलून और स्पा', gu: 'બ્યુટી, સલૂન અને સ્પા' },
  'beauty salon and spa': { hi: 'ब्यूटी, सैलून और स्पा', gu: 'બ્યુટી, સલૂન અને સ્પા' },
  'beauty': { hi: 'ब्यूटी व पर्सनल केयर', gu: 'બ્યુટી અને પર્સનલ કેર' },
  'parlor beauty': { hi: 'पार्लर और ब्यूटी', gu: 'પાર્લર અને બ્યુટી' },
  'cleaning home cleaning': { hi: 'घर की सफाई', gu: 'ઘરની સફાઈ' },
  'cleaning and home cleaning': { hi: 'घर की सफाई', gu: 'ઘરની સફાઈ' },
  'cleaning': { hi: 'सफाई सेवाएं', gu: 'સફાઈ સેવાઓ' },
  'deep cleaning': { hi: 'डीप क्लीनिंग', gu: 'ડીપ ક્લિનિંગ' },
  'painting waterproofing home improvement': { hi: 'पेंटिंग, वॉटरप्रूफिंग व होम सुधार', gu: 'પેઇન્ટિંગ, વૉટરપ્રૂફિંગ અને હોમ ઇમ્પ્રૂવમેન્ટ' },
  'painting': { hi: 'पेंटिंग सेवाएं', gu: 'પેઇન્ટિંગ સેવાઓ' },
  'ac appliance electronics repair': { hi: 'एसी व उपकरण मरम्मत', gu: 'એસી અને ઉપકરણ રિપેરિંગ' },
  'ac repair': { hi: 'एसी मरम्मत', gu: 'એસી રિપેરિંગ' },
  'appliance repair': { hi: 'उपकरण मरम्मत', gu: 'ઉપકરણ રિપેરિંગ' },
  'electrician plumber carpenter home repairs': { hi: 'इलेक्ट्रीशियन, प्लंबर व बढ़ई', gu: 'ઇલેક્ટ્રિશિયન, પ્લમ્બર અને સુથાર' },
  'plumbing': { hi: 'नलसाजी (प्लंबिंग)', gu: 'પ્લમ્બિંગ સેવાઓ' },
  'electrical': { hi: 'इलेक्ट्रिकल सेवाएं', gu: 'ઇલેક્ટ્રિકલ સેવાઓ' },
  'carpentry': { hi: 'बढ़ई का काम', gu: 'સુથારીકામ' },
  'smart home security': { hi: 'स्मार्ट होम व सुरक्षा', gu: 'સ્માર્ટ હોમ અને સુરક્ષા' },
  'domestic help cooking': { hi: 'घरेलू सहायिका व कुकिंग', gu: 'ઘરેલું સહાયક અને રસોઈ' },
  'education teachers coaching': { hi: 'शिक्षा, शिक्षक व कोचिंग', gu: 'શિક્ષણ અને ટ્યુટોરિયલ' },
  'health fitness wellness': { hi: 'स्वास्थ्य, फिटनेस व वेलनेस', gu: 'સ્વાસ્થ્ય, ફિટનેસ અને સુખાકારી' },
  'events photography entertainment': { hi: 'इवेंट्स, फोटोग्राफी व मनोरंजन', gu: 'ઇવેન્ટ્સ અને ફોટોગ્રાફી' },
  'pet services': { hi: 'पालतू पशु सेवाएं', gu: 'પાલતુ પ્રાણી સેવાઓ' },
  'technology digital services': { hi: 'टेक्नोलॉजी व डिजिटल सेवाएं', gu: 'ટેકનોલોજી અને ડિજિટલ સેવાઓ' },
  'professional business services': { hi: 'पेशेवर व व्यावसायिक सेवाएं', gu: 'વ્યાવસાયિક સેવાઓ' },
  'moving delivery local assistance': { hi: 'मूविंग, डिलीवरी व लोकल सहायता', gu: 'મૂવિંગ, ડિલિવરી અને લોકલ સહાય' },
  'vehicle care automobile services': { hi: 'वाहन देखभाल व ऑटोमोबाइल', gu: 'વાહન સંભાળ અને ઓટોમોબાઇલ' }
};

// 2. All 68 Marketplace Subcategories (Normalized keys without punctuation)
export const SUBCATEGORY_TRANSLATIONS: Record<string, { hi: string; gu: string }> = {
  // Beauty & Salon Subcategories
  'facial skincare': { hi: 'फेशियल और स्किनकेयर', gu: 'ફેશિયલ અને સ્કિનકેર' },
  'makeup styling': { hi: 'मेकअप और स्टाइलिंग', gu: 'મેકઅપ અને સ્ટાઇલિંગ' },
  'men s salon': { hi: 'मेंस सैलून (पुरुष)', gu: 'મેન્સ સલૂન' },
  'mens salon': { hi: 'मेंस सैलून (पुरुष)', gu: 'મેન્સ સલૂન' },
  'pedicure manicure': { hi: 'पेडीक्योर और मेनिक्योर', gu: 'પેડિક્યોર અને મેનિક્યોર' },
  'spa massage': { hi: 'स्पा और मसाज', gu: 'સ્પા અને મસાજ' },
  'women s salon': { hi: 'विमेंस सैलून (महिला)', gu: 'વિમેન્સ સલૂન' },
  'womens salon': { hi: 'विमेंस सैलून (महिला)', gu: 'વિમેન્સ સલૂન' },
  'womens spa': { hi: 'विमेंस स्पा', gu: 'વિમેન્સ સ્પા' },
  'hair care': { hi: 'हेयर केयर व स्टाइलिंग', gu: 'હેર કેર અને સ્ટાઇલિંગ' },
  'waxing threading': { hi: 'वैक्सिंग और थ्रेडिंग', gu: 'વેક્સિંગ અને થ્રેડિંગ' },
  'bridal makeup': { hi: 'ब्राइडल और मेकअप', gu: 'બ્રાઇડલ અને મેકઅપ' },

  // Cleaning Subcategories (Including Compound Variations)
  'full home by room cleaning': { hi: 'फुल होम / कमरा सफाई', gu: 'સંપૂર્ણ ઘર / રૂમ સફાઈ' },
  'full home room cleaning': { hi: 'फुल होम / कमरा सफाई', gu: 'સંપૂર્ણ ઘર / રૂમ સફાઈ' },
  'full home cleaning': { hi: 'पूरे घर की सफाई', gu: 'આખા ઘરની સફાઈ' },
  'by room cleaning': { hi: 'कमरे की सफाई', gu: 'રૂમ મુજબ સફાઈ' },
  'deep cleaning': { hi: 'डीप क्लीनिंग', gu: 'ડીપ ક્લિનિંગ' },
  'sofa furniture cleaning': { hi: 'सोफा और फर्नीचर सफाई', gu: 'સોફા અને ફર્નિચર સફાઈ' },
  'sofa carpet cleaning': { hi: 'सोफा और कारपेट सफाई', gu: 'સોફા અને કાર્પેટ સફાઈ' },
  'kitchen bathroom cleaning': { hi: 'किचन और बाथरूम सफाई', gu: 'રસોડા અને બાથરૂમ સફાઈ' },
  'bathroom cleaning': { hi: 'बाथरूम सफाई', gu: 'બાથરૂમ સફાઈ' },
  'kitchen cleaning': { hi: 'किचन सफाई', gu: 'રસોડાની સફાઈ' },
  'pest control': { hi: 'कीट नियंत्रण (पेस्ट कंट्रोल)', gu: 'જંતુ નિયંત્રણ (પેસ્ટ કંટ્રોલ)' },
  'water tank cleaning': { hi: 'पानी की टंकी सफाई', gu: 'પાણીની ટાંકી સફાઈ' },

  // Painting Subcategories
  'home painting': { hi: 'होम पेंटिंग', gu: 'હોમ પેઇન્ટિંગ' },
  'house painting': { hi: 'हाउस पेंटिंग', gu: 'હાઉસ પેઇન્ટિંગ' },
  'specialized painting': { hi: 'विशेष पेंटिंग', gu: 'વિશેષ પેઇન્ટિંગ' },
  'waterproofing grouting': { hi: 'वॉटरप्रूफिंग व ग्राउटिंग', gu: 'વૉટરપ્રૂફિંગ અને ગ્રાઉટિંગ' },
  'waterproofing': { hi: 'वॉटरप्रूफिंग', gu: 'વૉટરપ્રૂફિંગ' },
  'home improvement': { hi: 'घर सुधार सेवाएं', gu: 'ઘર સુધારણા સેવાઓ' },
  'wall paneling texturing': { hi: 'वॉल पैनलिंग व टेक्सचरिंग', gu: 'વોલ પેનલિંગ અને ટેક્સચરિંગ' },

  // AC & Appliances Subcategories
  'ac': { hi: 'एसी रिपेयर व सर्विस', gu: 'એસી રિપેરિંગ અને સર્વિસ' },
  'ac repair': { hi: 'एसी रिपेयर', gu: 'એસી રિપેરિંગ' },
  'ac service gas refill': { hi: 'एसी सर्विस और गैस रिफिल', gu: 'એસી સર્વિસ અને ગેસ રિફિલ' },
  'refrigerator': { hi: 'रेफ्रिजरेटर (फ्रिज)', gu: 'રેફ્રિજરેટર (ફ્રિજ)' },
  'refrigerator repair': { hi: 'रेफ्रिजरेटर रिपेयर', gu: 'રેફ્રિજરેટર રિપેરિંગ' },
  'washing machine': { hi: 'वाशिंग मशीन', gu: 'વોશિંગ મશીન' },
  'washing machine repair': { hi: 'वाशिंग मशीन रिपेयर', gu: 'વોશિંગ મશીન રિપેરિંગ' },
  'television': { hi: 'टेलीविजन (टीवी)', gu: 'ટેલિવિઝન (ટીવી)' },
  'tv audio repair': { hi: 'टीवी और ऑडियो रिपेयर', gu: 'ટીવી અને ઑડિયો રિપેરિંગ' },
  'microwave': { hi: 'माइक्रोवेव ও ओवन', gu: 'માઇક્રોવેવ અને ઓવન' },
  'microwave oven repair': { hi: 'माइक्रोवेव और ओवन रिपेयर', gu: 'માઇક્રોવેવ અને ઓવન રિપેરિંગ' },
  'ro water purifier': { hi: 'आरओ / वॉटर प्यूरीफायर', gu: 'RO / વોટર પ્યુરિફાયર' },
  'water purifier ro service': { hi: 'वॉटर प्यूरीफायर सर्विस', gu: 'વોટર પ્યુરિફાયર સર્વિસ' },
  'geyser': { hi: 'गीजर व वॉटर हीटर', gu: 'ગીઝર અને વોટર હીટર' },
  'geyser water heater repair': { hi: 'गीजर व वॉटर हीटर रिपेयर', gu: 'ગીઝર અને વોટર હીટર રિપેરિંગ' },
  'chimney': { hi: 'किचन चिमनी रिपेयर', gu: 'કિચન ચીમની રિપેરિંગ' },
  'air cooler': { hi: 'एयर कूलर रिपेयर', gu: 'એર કૂલર રિપેરિંગ' },

  // Electrician, Plumber, Carpenter Subcategories
  'electrician': { hi: 'इलेक्ट्रिशियन', gu: 'ઇલેક્ટ્રિશિયન' },
  'electrical repairs': { hi: 'इलेक्ट्रिकल मरम्मत', gu: 'ઇલેક્ટ્રિકલ રિપેરિંગ' },
  'switch socket installation': { hi: 'स्विच और सॉकेट फिटिंग', gu: 'સ્વિચ અને સોકેટ ફિટિંગ' },
  'fan light fitting': { hi: 'पंखा और लाइट फिटिंग', gu: 'પંખા અને લાઇટ ફિટિંગ' },
  'plumber': { hi: 'प्लंबर (नलसाज)', gu: 'પ્લમ્બર' },
  'plumbing': { hi: 'प्लंबिंग कार्य', gu: 'પ્લમ્બિંગ કાર્ય' },
  'tap shower repair': { hi: 'नल व शावर रिपेयर', gu: 'નળ અને શાવર રિપેરિંગ' },
  'drainage pipe blockage': { hi: 'ड्रेनेज व पाइप ब्लॉकेज', gu: 'ડ્રેનેજ અને પાઇપ બ્લોકેજ' },
  'carpenter': { hi: 'बढ़ई (कारपेंटर)', gu: 'સુથાર (કાર્પેન્ટર)' },
  'carpentry': { hi: 'बढ़ई का काम', gu: 'સુથારીકામ' },
  'furniture assembly repair': { hi: 'फर्नीचर असेंबली व रिपेयर', gu: 'ફર્નિચર એસેમ્બલી અને રિપેરિંગ' },
  'door lock repair': { hi: 'दरवाजा व लॉक रिपेयर', gu: 'દરવાજા અને લોક રિપેરિંગ' },

  // Smart Home, Domestic Help & Others
  'smart locks': { hi: 'स्मार्ट लॉक्स', gu: 'સ્માર્ટ લોક્સ' },
  'smart home devices': { hi: 'स्मार्ट होम उपकरण', gu: 'સ્માર્ટ હોમ ઉપકરણો' },
  'home security': { hi: 'होम सुरक्षा', gu: 'હોમ સિક્યોરિટી' },
  'cctv installation repair': { hi: 'सीसीटीवी इंस्टॉलेशन व रिपेयर', gu: 'CCTV ઇન્સ્ટોલેશન અને રિપેરિંગ' },
  'cooking services': { hi: 'कुकिंग सेवाएं (रसोइया)', gu: 'રસોઈ સેવાઓ' },
  'household help': { hi: 'घरेलू सहायिका', gu: 'ઘરેલું સહાયક' },
  'academic tutoring': { hi: 'शैक्षणिक ट्यूशन', gu: 'શૈક્ષણિક ટ્યુશન' },
  'fitness': { hi: 'फिटनेस व पर्सनल ट्रेनिंग', gu: 'ફિટનેસ અને તાલીમ' },
  'yoga meditation': { hi: 'योग और ध्यान', gu: 'યોગ અને ધ્યાન' },
  'photography': { hi: 'फोटोग्राफी', gu: 'ફોટોગ્રાફી' }
};

// 3. Exact and High-Frequency Service Names
export const SERVICE_NAME_TRANSLATIONS: Record<string, { hi: string; gu: string }> = {
  // Cleaning
  '1 bhk cleaning': { hi: '1 बीएचके सफाई', gu: '૧ બીએચકે સફાઈ' },
  '2 bhk cleaning': { hi: '2 बीएचके सफाई', gu: '૨ બીએચકે સફાઈ' },
  '3 bhk cleaning': { hi: '3 बीएचके सफाई', gu: '૩ બીએચકે સફાઈ' },
  '4 bhk cleaning': { hi: '4 बीएचके सफाई', gu: '૪ બીએચકે સફાઈ' },
  '4 bhk+ cleaning': { hi: '4+ बीएचके सफाई', gu: '૪+ બીએચકે સફાઈ' },
  '1 bhk express deep cleaning': { hi: '1 बीएचके एक्सप्रेस डीप सफाई', gu: '૧ બીએચકે એક્સપ્રેસ ડીપ સફાઈ' },
  '2 bhk standard full home cleaning': { hi: '2 बीएचके फुल होम सफाई', gu: '૨ બીએચકે સંપૂર્ણ ઘર સફાઈ' },
  '3 bhk premium full home cleaning': { hi: '3 बीएचકે प्रीमियम होम सफाई', gu: '૩ બીએચકે પ્રીમિયમ ઘર સફાઈ' },
  '4 bhk / villa luxury deep cleaning': { hi: '4 बीएचके / विला लक्जरी डीप सफाई', gu: '૪ બીએચકે / વિલા લક્ઝરી ડીપ સફાઈ' },
  'full apartment cleaning': { hi: 'फुल अपार्टमेंट सफाई', gu: 'સંપૂર્ણ એપાર્ટમેન્ટ સફાઈ' },
  'full bungalow / duplex cleaning': { hi: 'फुल बंगला / डुप्लेक्स सफाई', gu: 'બંગલો / ડુપ્લેક્સ સફાઈ' },
  'partial home cleaning': { hi: 'आंशिक घर की सफाई', gu: 'આંશિક ઘરની સફાઈ' },
  'room cleaning': { hi: 'कमरा सफाई', gu: 'રૂમ સફાઈ' },
  'bathroom deep cleaning': { hi: 'बाथरूम डीप क्लीनिंग', gu: 'બાથરૂમ ડીપ ક્લિનિંગ' },
  'kitchen deep cleaning': { hi: 'किचन डीप क्लीनिंग', gu: 'રસોડા ડીપ ક્લિનિંગ' },
  'sofa cleaning': { hi: 'सोफा सफाई', gu: 'સોફા સફાઈ' },
  'carpet cleaning': { hi: 'कारपेट सफाई', gu: 'કાર્પેટ સફાઈ' },
  'balcony cleaning': { hi: 'बालकनी सफाई', gu: 'બાલ્કની સફાઈ' },

  // Beauty
  'bleach': { hi: 'ब्लीच सर्विस', gu: 'બ્લીચ સર્વિસ' },
  'facial bleach': { hi: 'फेशियल ब्लीच', gu: 'ફેશિયલ બ્લીચ' },
  'body bleach': { hi: 'बॉडी ब्लीच', gu: 'બોડી બ્લીચ' },
  'fruit facial': { hi: 'फ्रूट फेशियल', gu: 'ફ્રૂટ ફેશિયલ' },
  'gold facial': { hi: 'गोल्ड फेशियल', gu: 'ગોલ્ડ ફેશિયલ' },
  'diamond facial': { hi: 'डायमंड फेशियल', gu: 'ડાયમંડ ફેશિયલ' },
  'cleanup': { hi: 'फेस क्लीनअप', gu: 'ફેસ ક્લીનઅપ' },

  // AC & Electrical
  'ac service': { hi: 'एसी सर्विस', gu: 'એસી સર્વિસ' },
  'ac repair': { hi: 'एसी रिपेयर', gu: 'એસી રિપેરિંગ' },
  'ac installation': { hi: 'एसी इंस्टॉलेशन', gu: 'એસી ઇન્સ્ટોલેશન' },
  'ac uninstallation': { hi: 'एसी अनइंस्टॉलेशन', gu: 'એસી અનઇન્સ્ટોલેશન' },
  'ac gas refill': { hi: 'एसी गैस रिफिल', gu: 'એસી ગેસ રિફિલ' },
  'fan repair': { hi: 'पंखा रिपेयर', gu: 'પંખા રિપેરિંગ' },
  'fan installation': { hi: 'पंखा फिटिंग', gu: 'પંખા ફિટિંગ' },
  'switch socket installation': { hi: 'स्विच सॉकेट फिटिंग', gu: 'સ્વિચ સોકેટ ફિટિંગ' }
};

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

  // Fallback: check if subcategory contains known words
  if (norm.includes('cleaning')) {
    return lang === 'hi' ? `${clean.replace(/cleaning/gi, 'सफाई')}` : `${clean.replace(/cleaning/gi, 'સફાઈ')}`;
  }
  if (norm.includes('repair')) {
    return lang === 'hi' ? `${clean.replace(/repair/gi, 'मरम्मत')}` : `${clean.replace(/repair/gi, 'રિપેરિંગ')}`;
  }

  return clean;
}

/**
 * Intelligent Service Name Translator:
 * 1. Checks exact dictionary entry
 * 2. Checks regex pattern matches (e.g. "[N] BHK Cleaning" -> "[N] बीएचके सफाई")
 * 3. Applies keyword transliterations (Cleaning -> सफाई, Repair -> मरम्मत, Installation -> इंस्टॉलेशन)
 */
export function getLocalizedServiceName(serviceName?: string | null): string {
  if (!serviceName) return '';
  const lang = (i18n.language || 'en').slice(0, 2);
  if (lang === 'en') return serviceName;

  const trimmed = serviceName.trim();
  const lower = trimmed.toLowerCase();

  // 1. Direct dictionary lookup
  const direct = SERVICE_NAME_TRANSLATIONS[lower];
  if (direct) {
    if (lang === 'hi' && direct.hi) return direct.hi;
    if (lang === 'gu' && direct.gu) return direct.gu;
  }

  // 2. Pattern: "[N] BHK Cleaning" or "[N] BHK [Variation] Cleaning"
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
    return lang === 'hi' ? `${num} बीएचके ${modifier} सफाई` : `${num} બીએચકે ${modifier} સફાઈ`;
  }

  // 3. Pattern: "[Subcategory] Service Variation [N]"
  const varMatch = trimmed.match(/(.*?)Service Variation\s*(\d+)/i);
  if (varMatch && varMatch[1] && varMatch[2]) {
    const base = getLocalizedSubcategory(varMatch[1]);
    const num = varMatch[2];
    return lang === 'hi' ? `${base} सेवा विकल्प ${num}` : `${base} સેવા વિકલ્પ ${num}`;
  }

  // 4. Common suffix transliterations
  if (lower.endsWith('cleaning')) {
    const prefix = trimmed.slice(0, -8).trim();
    return lang === 'hi' ? `${prefix} सफाई` : `${prefix} સફાઈ`;
  }
  if (lower.endsWith('repair')) {
    const prefix = trimmed.slice(0, -6).trim();
    return lang === 'hi' ? `${prefix} मरम्मत` : `${prefix} રિપેરિંગ`;
  }
  if (lower.endsWith('installation')) {
    const prefix = trimmed.slice(0, -12).trim();
    return lang === 'hi' ? `${prefix} इंस्टॉलेशन` : `${prefix} ઇન્સ્ટોલેશન`;
  }
  if (lower.endsWith('service')) {
    const prefix = trimmed.slice(0, -7).trim();
    return lang === 'hi' ? `${prefix} सर्विस` : `${prefix} સર્વિસ`;
  }

  return serviceName;
}
