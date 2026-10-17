import i18n from '../i18n';

// Dictionary mapping category names (case-insensitive) to Hindi and Gujarati
export const CATEGORY_TRANSLATIONS: Record<string, { hi: string; gu: string }> = {
  'beauty, salon & spa': { hi: 'ब्यूटी, सैलून और स्पा', gu: 'બ્યુટી, સલૂન અને સ્પા' },
  'beauty': { hi: 'ब्यूटी व पर्सनल केयर', gu: 'બ્યુટી અને પર્સનલ કેર' },
  'parlor & beauty': { hi: 'पार्लर और ब्यूटी', gu: 'પાર્લર અને બ્યુટી' },
  'cleaning & home cleaning': { hi: 'घर की सफाई', gu: 'ઘરની સફાઈ' },
  'cleaning': { hi: 'सफाई सेवाएं', gu: 'સફાઈ સેવાઓ' },
  'deep cleaning': { hi: 'डीप क्लीनिंग', gu: 'ડીપ ક્લિનિંગ' },
  'painting, waterproofing & home improvement': { hi: 'पेंटिंग, वॉटरप्रूफिंग व होम सुधार', gu: 'પેઇન્ટિંગ, વૉટરપ્રૂફિંગ અને હોમ ઇમ્પ્રૂવમેન્ટ' },
  'painting': { hi: 'पेंटिंग सेवाएं', gu: 'પેઇન્ટિંગ સેવાઓ' },
  'ac, appliance & electronics repair': { hi: 'एसी व उपकरण मरम्मत', gu: 'એસી અને ઉપકરણ રિપેરિંગ' },
  'ac repair': { hi: 'एसी मरम्मत', gu: 'એસી રિપેરિંગ' },
  'appliance repair': { hi: 'उपकरण मरम्मत', gu: 'ઉપકરણ રિપેરિંગ' },
  'electrician, plumber, carpenter & home repairs': { hi: 'इलेक्ट्रीशियन, प्लंबर व बढ़ई', gu: 'ઇલેક્ટ્રિશિયન, પ્લમ્બર અને સુથાર' },
  'plumbing': { hi: 'नलसाजी (प्लंबिंग)', gu: 'પ્લમ્બિંગ સેવાઓ' },
  'electrical': { hi: 'इलेक्ट्रिकल सेवाएं', gu: 'ઇલેક્ટ્રિકલ સેવાઓ' },
  'carpentry': { hi: 'बढ़ई का काम', gu: 'સુથારીકામ' },
  'smart home & security': { hi: 'स्मार्ट होम व सुरक्षा', gu: 'સ્માર્ટ હોમ અને સુરક્ષા' },
  'domestic help & cooking': { hi: 'घरेलू सहायिका व कुकिंग', gu: 'ઘરેલું સહાયક અને રસોઈ' },
  'education, teachers & coaching': { hi: 'शिक्षा, शिक्षक व कोचिंग', gu: 'શિક્ષણ અને ટ્યુટોરિયલ' },
  'health, fitness & wellness': { hi: 'स्वास्थ्य, फिटनेस व वेलनेस', gu: 'સ્વાસ્થ્ય, ફિટનેસ અને સુખાકારી' },
  'events, photography & entertainment': { hi: 'इवेंट्स, फोटोग्राफी व मनोरंजन', gu: 'ઇવેન્ટ્સ અને ફોટોગ્રાફી' },
  'pet services': { hi: 'पालतू पशु सेवाएं', gu: 'પાલતુ પ્રાણી સેવાઓ' },
  'technology & digital services': { hi: 'टेक्नोलॉजी व डिजिटल सेवाएं', gu: 'ટેકનોલોજી અને ડિજિટલ સેવાઓ' },
  'professional & business services': { hi: 'पेशेवर व व्यावसायिक सेवाएं', gu: 'વ્યાવસાયિક સેવાઓ' },
  'vehicle care & automobile services': { hi: 'वाहन देखभाल व ऑटोमोबाइल', gu: 'વાહન સંભાળ અને ઓટોમોબાઇલ' }
};

// Dictionary mapping subcategory names (case-insensitive)
export const SUBCATEGORY_TRANSLATIONS: Record<string, { hi: string; gu: string }> = {
  'facial & skincare': { hi: 'फेशियल और स्किनकेयर', gu: 'ફેશિયલ અને સ્કિનકેર' },
  'hair care': { hi: 'हेयर केयर व स्टाइलिंग', gu: 'હેર કેર અને સ્ટાઇલિંગ' },
  'waxing & threading': { hi: 'वैक्सिंग और थ्रेडिंग', gu: 'વેક્સિંગ અને થ્રેડિંગ' },
  'manicure & pedicure': { hi: 'मेनिक्योर और पेडीक्योर', gu: 'મેનિક્યોર અને પેડિક્યોર' },
  'spa & massage': { hi: 'स्पा और मसाज', gu: 'સ્પા અને મસાજ' },
  'bridal & makeup': { hi: 'ब्राइडल और मेकअप', gu: 'બ્રાઇડલ અને મેકઅપ' },
  'deep cleaning': { hi: 'डीप क्लीनिंग', gu: 'ડીપ ક્લિનિંગ' },
  'bathroom cleaning': { hi: 'बाथरूम सफाई', gu: 'બાથરૂમ સફાઈ' },
  'kitchen cleaning': { hi: 'किचन सफाई', gu: 'રસોડાની સફાઈ' },
  'sofa & carpet cleaning': { hi: 'सोफा और कारपेट सफाई', gu: 'સોફા અને કાર્પેટ સફાઈ' },
  'full home cleaning': { hi: 'पूरे घर की सफाई', gu: 'આખા ઘરની સફાઈ' },
  'water tank cleaning': { hi: 'पानी की टंकी सफाई', gu: 'પાણીની ટાંકી સફાઈ' },
  'ac repair': { hi: 'एसी रिपेयर व सर्विस', gu: 'એસી રિપેરિંગ અને સર્વિસ' },
  'ac service & gas refill': { hi: 'एसी सर्विस और गैस रिफिल', gu: 'એસી સર્વિસ અને ગેસ રિફિલ' },
  'washing machine repair': { hi: 'वाशिंग मशीन रिपेयर', gu: 'વોશિંગ મશીન રિપેરિંગ' },
  'refrigerator repair': { hi: 'रेफ्रिजरेटर रिपेयर', gu: 'રેફ્રિજરેટર રિપેરિંગ' },
  'microwave & oven repair': { hi: 'माइक्रोवेव और ओवन रिपेयर', gu: 'માઇક્રોવેવ અને ઓવન રિપેરિંગ' },
  'tv & audio repair': { hi: 'टीवी और ऑडियो रिपेयर', gu: 'ટીવી અને ઑડિયો રિપેરિંગ' },
  'air cooler repair': { hi: 'एयर कूलर रिपेयर', gu: 'એર કૂલર રિપેરિંગ' },
  'water purifier (ro) service': { hi: 'वॉटर प्यूरीफायर (RO) सर्विस', gu: 'વોટર પ્યુરિફાયર (RO) સર્વિસ' },
  'geyser & water heater repair': { hi: 'गीजर व वॉटर हीटर रिपेयर', gu: 'ગીઝર અને વોટર હીટર રિપેરિંગ' },
  'plumbing': { hi: 'प्लंबिंग कार्य', gu: 'પ્લમ્બિંગ કાર્ય' },
  'electrical repairs': { hi: 'इलेक्ट्रिकल मरम्मत', gu: 'ઇલેક્ટ્રિકલ રિપેરિંગ' },
  'carpentry': { hi: 'बढ़ई का काम', gu: 'સુથારીકામ' },
  'switch & socket installation': { hi: 'स्विच और सॉकेट फिटिंग', gu: 'સ્વિચ અને સોકેટ ફિટિંગ' },
  'fan & light fitting': { hi: 'पंखा और लाइट फिटिंग', gu: 'પંખા અને લાઇટ ફિટિંગ' },
  'tap & shower repair': { hi: 'नल व शावर रिपेयर', gu: 'નળ અને શાવર રિપેરિંગ' },
  'drainage & pipe blockage': { hi: 'ड्रेनेज व पाइप ब्लॉकेज', gu: 'ડ્રેનેજ અને પાઇપ બ્લોકેજ' },
  'furniture assembly & repair': { hi: 'फर्नीचर असेंबली व रिपेयर', gu: 'ફર્નિચર એસેમ્બલી અને રિપેરિંગ' },
  'door & lock repair': { hi: 'दरवाजा व लॉक रिपेयर', gu: 'દરવાજા અને લોક રિપેરિંગ' },
  'pest control': { hi: 'कीट नियंत्रण (पेस्ट कंट्रोल)', gu: 'જંતુ નિયંત્રણ (પેસ્ટ કંટ્રોલ)' },
  'cockroach & ant control': { hi: 'कॉकरोच व चींटी नियंत्रण', gu: 'વંદો અને કીડી નિયંત્રણ' },
  'termite control': { hi: 'दीमक नियंत्रण', gu: 'ઉધઈ નિયંત્રણ' },
  'bed bug control': { hi: 'खटमल नियंत्रण', gu: 'માંકડ નિયંત્રણ' },
  'mosquito control': { hi: 'मच्छर नियंत्रण', gu: 'મચ્છર નિયંત્રણ' },
  'house painting': { hi: 'हाउस पेंटिंग', gu: 'હાઉસ પેઇન્ટિંગ' },
  'interior painting': { hi: 'इंटीरियर पेंटिंग', gu: 'ઇન્ટિરિયર પેઇન્ટિંગ' },
  'exterior painting': { hi: 'एक्सटीरियर पेंटिंग', gu: 'એક્સટિરિયર પેઇન્ટિંગ' },
  'waterproofing': { hi: 'वॉटरप्रूफिंग', gu: 'વૉટરપ્રૂફિંગ' },
  'wall paneling & texturing': { hi: 'वॉल पैनलिंग व टेक्सचरिंग', gu: 'વોલ પેનલિંગ અને ટેક્સચરિંગ' },
  'cctv installation & repair': { hi: 'सीसीटीवी इंस्टॉलेशन व रिपेयर', gu: 'CCTV ઇન્સ્ટોલેશન અને રિપેરિંગ' },
  'smart locks & security': { hi: 'स्मार्ट लॉक्स व सुरक्षा', gu: 'સ્માર્ટ લોક્સ અને સિક્યોરિટી' }
};

// Common service names transliteration/translations
export const SERVICE_NAME_TRANSLATIONS: Record<string, { hi: string; gu: string }> = {
  'bleach': { hi: 'ब्लीच सर्विस', gu: 'બ્લીચ સર્વિસ' },
  'facial bleach': { hi: 'फेशियल ब्लीच', gu: 'ફેશિયલ બ્લીચ' },
  'body bleach': { hi: 'बॉडी ब्लीच', gu: 'બોડી બ્લીચ' },
  'fruit facial': { hi: 'फ्रूट फेशियल', gu: 'ફ્રૂટ ફેશિયલ' },
  'gold facial': { hi: 'गोल्ड फेशियल', gu: 'ગોલ્ડ ફેશિયલ' },
  'ac service': { hi: 'एसी सर्विस', gu: 'એસી સર્વિસ' },
  'ac installation': { hi: 'एसी इंस्टॉलेशन', gu: 'એસી ઇન્સ્ટોલેશન' },
  'ac gas refill': { hi: 'एसी गैस रिफिल', gu: 'એસી ગેસ રિફિલ' },
  'bathroom deep cleaning': { hi: 'बाथरूम डीप क्लीनिंग', gu: 'બાથરૂમ ડીપ ક્લિનિંગ' },
  'kitchen deep cleaning': { hi: 'किचन डीप क्लीनिंग', gu: 'રસોડા ડીપ ક્લિનિંગ' }
};

export function getCleanName(raw?: string | null): string {
  if (!raw) return '';
  return raw.replace(/^\d+\.\s*/, '').trim();
}

export function getLocalizedCategory(categoryName?: string | null): string {
  const clean = getCleanName(categoryName);
  if (!clean) return '';
  const lang = (i18n.language || 'en').slice(0, 2);
  if (lang === 'en') return clean;

  const key = clean.toLowerCase();
  const entry = CATEGORY_TRANSLATIONS[key];
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

  const key = clean.toLowerCase();
  const entry = SUBCATEGORY_TRANSLATIONS[key];
  if (entry) {
    if (lang === 'hi' && entry.hi) return entry.hi;
    if (lang === 'gu' && entry.gu) return entry.gu;
  }
  return clean;
}

export function getLocalizedServiceName(serviceName?: string | null): string {
  if (!serviceName) return '';
  const lang = (i18n.language || 'en').slice(0, 2);
  if (lang === 'en') return serviceName;

  const key = serviceName.trim().toLowerCase();
  const entry = SERVICE_NAME_TRANSLATIONS[key];
  if (entry) {
    if (lang === 'hi' && entry.hi) return entry.hi;
    if (lang === 'gu' && entry.gu) return entry.gu;
  }
  return serviceName;
}
