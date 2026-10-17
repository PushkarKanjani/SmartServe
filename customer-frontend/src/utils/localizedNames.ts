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
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
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
  'classic facial': { hi: 'क्लासिक फेशियल', gu: 'ક્લાસિક ફેશિયલ' },
  'fruit facial': { hi: 'फ्रूट फेशियल', gu: 'ફ્રૂટ ફેશિયલ' },
  'gold facial': { hi: 'गोल्ड फेशियल', gu: 'ગોલ્ડ ફેશિયલ' },
  'diamond facial': { hi: 'डायमंड फेशियल', gu: 'ડાયમંડ ફેશિયલ' },
  'anti aging facial': { hi: 'एंटी-एजिंग फेशियल', gu: 'એન્ટી-એજિંગ ફેશિયલ' },
  'skin brightening facial': { hi: 'स्किन ब्राइटनिंग फेशियल', gu: 'સ્કિન બ્રાઇટનિંગ ફેશિયલ' },
  'de tan pack': { hi: 'डी-टैन पैक', gu: 'ડી-ટેન પેક' },
  'face cleanup': { hi: 'फेस क्लीनअप', gu: 'ફેસ ક્લીનઅપ' },
  'facial cleanup': { hi: 'फेशियल क्लीनअप', gu: 'ફેશિયલ ક્લીનઅપ' },
  'cleanup': { hi: 'फेस क्लीनअप', gu: 'ફેસ ક્લીનઅપ' },
  'bleach': { hi: 'ब्लीच सर्विस', gu: 'બ્લીચ સર્વિસ' },
  'bleach service': { hi: 'ब्लीच सर्विस', gu: 'બ્લીચ સર્વિસ' },
  'facial bleach': { hi: 'फेशियल ब्लीच', gu: 'ફેશિયલ બ્લીચ' },
  'body bleach': { hi: 'बॉडी ब्लीच', gu: 'બોડી બ્લીચ' },
  'haircut': { hi: 'हेयरकट', gu: 'હેરકટ' },
  'hair spa': { hi: 'हेयर स्पा', gu: 'હેર સ્પા' },
  'head massage': { hi: 'हेड मसाज', gu: 'હેડ મસાજ' },
  'body massage': { hi: 'बॉडी मसाज', gu: 'બોડી મસાજ' },
  'full body massage': { hi: 'फुल बॉडी मसाज', gu: 'ફુલ બોડી મસાજ' },
  'manicure': { hi: 'मेनिक्योर', gu: 'મેનિક્યોર' },
  'pedicure': { hi: 'पेदिक्योर', gu: 'પેડિક્યોર' },
  'waxing': { hi: 'वैक्सिंग', gu: 'વેક્સિંગ' },
  'threading': { hi: 'थ्रेडिंग', gu: 'થ્રેડિંગ' },
  'shave': { hi: 'शेव', gu: 'શેવિંગ' },
  'beard styling': { hi: 'दाढ़ी स्टाइलिंग', gu: 'દાઢી સ્ટાઇલિંગ' },

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

// 3. Common Service Word Translators
export const WORD_TRANSLATIONS: Record<string, { hi: string; gu: string }> = {
  'face': { hi: 'फेस', gu: 'ફેસ' },
  'facial': { hi: 'फेशियल', gu: 'ફેશિયલ' },
  'classic': { hi: 'क्लासिक', gu: 'ક્લાસિક' },
  'fruit': { hi: 'फ्रूट', gu: 'ફ્રૂટ' },
  'gold': { hi: 'गोल्ड', gu: 'ગોલ્ડ' },
  'diamond': { hi: 'डायमंड', gu: 'ડાયમંડ' },
  'charcoal': { hi: 'चारकोल', gu: 'ચારકોલ' },
  'herbal': { hi: 'हर्बल', gu: 'હર્બલ' },
  'hydrating': { hi: 'हाइड्रेटिंग', gu: 'હાઇડ્રેટિંગ' },
  'korean': { hi: 'कोरियन', gu: 'કોરિયન' },
  'detan': { hi: 'डी-टैन', gu: 'ડી-ટેન' },
  'de-tan': { hi: 'डी-टैन', gu: 'ડી-ટેન' },
  'bleach': { hi: 'ब्लीच', gu: 'બ્લીચ' },
  'cleanup': { hi: 'क्लीनअप', gu: 'ક્લીનઅપ' },
  'clean-up': { hi: 'क्लीनअप', gu: 'ક્લીનઅપ' },
  'anti-aging': { hi: 'एंटी-एजिंग', gu: 'એન્ટી-એજિંગ' },
  'anti aging': { hi: 'एंटी-एजिंग', gu: 'એન્ટી-એજિંગ' },
  'brightening': { hi: 'ब्राइटनिंग', gu: 'બ્રાઇટનિંગ' },
  'skin brightening': { hi: 'स्किन ब्राइटनिंग', gu: 'સ્કિન બ્રાઇટનિંગ' },
  'whitening': { hi: 'व्हाइटनिंग', gu: 'વ્હાઇટનિંગ' },
  'glow': { hi: 'ग्लो', gu: 'ગ્લો' },
  'express': { hi: 'एक्सप्रेस', gu: 'એક્સપ્રેસ' },
  'premium': { hi: 'प्रीमियम', gu: 'પ્રીમિયમ' },
  'standard': { hi: 'स्टैंडर्ड', gu: 'સ્ટાન્ડર્ડ' },
  'luxury': { hi: 'लक्जरी', gu: 'લક્ઝરી' },
  'deep': { hi: 'डीप', gu: 'ડીપ' },
  'full': { hi: 'फुल', gu: 'સંપૂર્ણ' },
  'home': { hi: 'होम', gu: 'ઘર' },
  'house': { hi: 'हाउस', gu: 'હાઉસ' },
  'sofa': { hi: 'सोफा', gu: 'સોફા' },
  'carpet': { hi: 'कारपेट', gu: 'કાર્પેટ' },
  'cushion': { hi: 'कुशन', gu: 'કુશન' },
  'mattress': { hi: 'गद्दे (मैट्रेस)', gu: 'ગાદલા (મેટ્રેસ)' },
  'curtain': { hi: 'पर्दे (कर्टेन)', gu: 'પડદા' },
  'kitchen': { hi: 'किचन', gu: 'રસોડું' },
  'bathroom': { hi: 'बाथरूम', gu: 'બાથરૂમ' },
  'balcony': { hi: 'बालकनी', gu: 'બાલ્કની' },
  'ac': { hi: 'एसी', gu: 'એસી' },
  'fan': { hi: 'पंखा', gu: 'પંખો' },
  'switch': { hi: 'स्विच', gu: 'સ્વિચ' },
  'socket': { hi: 'सॉकेट', gu: 'સોકેટ' },
  'wire': { hi: 'वायरिंग', gu: 'વાયરિંગ' },
  'wiring': { hi: 'वायरिंग', gu: 'વાયરિંગ' },
  'tap': { hi: 'नल (टैप)', gu: 'નળ (ટેપ)' },
  'pipe': { hi: 'पाइप', gu: 'પાઇપ' },
  'drain': { hi: 'ड्रेन', gu: 'ડ્રેન' },
  'leakage': { hi: 'रिसाव (लीकेज)', gu: 'લિકેજ' },
  'tank': { hi: 'पानी की टंकी', gu: 'પાણીની ટાંકી' },
  'pest': { hi: 'पेस्ट', gu: 'પેસ્ટ' },
  'hair': { hi: 'हेयर', gu: 'હેર' },
  'beard': { hi: 'दाढ़ी', gu: 'દાઢી' },
  'head': { hi: 'हेड', gu: 'હેડ' },
  'body': { hi: 'बॉडी', gu: 'બોડી' },
  'nail': { hi: 'नाखून', gu: 'નખ' }
};

export function localizePrefix(prefix: string, lang: string): string {
  if (!prefix) return '';
  const lower = prefix.trim().toLowerCase();
  const direct = WORD_TRANSLATIONS[lower];
  if (direct) {
    return lang === 'hi' ? direct.hi : direct.gu;
  }
  const words = prefix.trim().split(/\s+/);
  const translated = words.map((w) => {
    const wDirect = WORD_TRANSLATIONS[w.toLowerCase()];
    if (wDirect) return lang === 'hi' ? wDirect.hi : wDirect.gu;
    return w;
  });
  return translated.join(' ');
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

  // 2. Specific standalone modifiers
  if (/^detan(\s+facial)?$/i.test(trimmed) || /^de-tan(\s+facial)?$/i.test(trimmed)) {
    return lang === 'hi' ? 'डी-टैन फेशियल' : 'ડી-ટેન ફેશિયલ';
  }
  if (lower === 'hydrating') {
    return lang === 'hi' ? 'हाइड्रेटिंग फेशियल' : 'હાઇડ્રેટિંગ ફેશિયલ';
  }
  if (lower === 'korean') {
    return lang === 'hi' ? 'कोरियन फेशियल' : 'કોરિયન ફેશિયલ';
  }

  // 3. Prefix Modifiers
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

  // 4. Pattern: "[N] BHK Cleaning" or "[N] BHK [Variation] Cleaning"
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

  // 5. Pattern: "[Subcategory] Service Variation [N]"
  const varMatch = trimmed.match(/(.*?)Service Variation\s*(\d+)/i);
  if (varMatch && varMatch[1] && varMatch[2]) {
    const base = getLocalizedSubcategory(varMatch[1]);
    const num = varMatch[2];
    return lang === 'hi' ? `${base} सेवा विकल्प ${num}` : `${base} સેવા વિકલ્પ ${num}`;
  }

  // 6. Common keywords & suffix transliterations with localized prefix
  if (lower.includes('facial')) {
    const prefix = trimmed.replace(/facial/gi, '').trim();
    if (!prefix) return lang === 'hi' ? 'फेशियल' : 'ફેશિયલ';
    const locPrefix = localizePrefix(prefix, lang);
    return lang === 'hi' ? `${locPrefix} फेशियल` : `${locPrefix} ફેશિયલ`;
  }
  if (lower.includes('cleanup')) {
    const prefix = trimmed.replace(/cleanup/gi, '').trim();
    const locPrefix = localizePrefix(prefix, lang).trim();
    return lang === 'hi' ? `${locPrefix} क्लीनअप`.trim() : `${locPrefix} ક્લીનઅપ`.trim();
  }
  if (lower.includes('massage')) {
    const prefix = trimmed.replace(/massage/gi, '').trim();
    const locPrefix = localizePrefix(prefix, lang).trim();
    return lang === 'hi' ? `${locPrefix} मसाज`.trim() : `${locPrefix} મસાજ`.trim();
  }
  if (lower.includes('waxing')) {
    const prefix = trimmed.replace(/waxing/gi, '').trim();
    const locPrefix = localizePrefix(prefix, lang).trim();
    return lang === 'hi' ? `${locPrefix} वैक्सिंग`.trim() : `${locPrefix} વેક્સિંગ`.trim();
  }
  if (lower.includes('manicure')) {
    const prefix = trimmed.replace(/manicure/gi, '').trim();
    const locPrefix = localizePrefix(prefix, lang).trim();
    return lang === 'hi' ? `${locPrefix} मेनिक्योर`.trim() : `${locPrefix} મેનિક્યોર`.trim();
  }
  if (lower.includes('pedicure')) {
    const prefix = trimmed.replace(/pedicure/gi, '').trim();
    const locPrefix = localizePrefix(prefix, lang).trim();
    return lang === 'hi' ? `${locPrefix} पेदिक्योर`.trim() : `${locPrefix} પેડિક્યોર`.trim();
  }
  if (lower.includes('haircut')) {
    const prefix = trimmed.replace(/haircut/gi, '').trim();
    const locPrefix = localizePrefix(prefix, lang).trim();
    return lang === 'hi' ? `${locPrefix} हेयरकट`.trim() : `${locPrefix} હેરકટ`.trim();
  }
  if (lower.endsWith('cleaning')) {
    const prefix = trimmed.slice(0, -8).trim();
    const locPrefix = localizePrefix(prefix, lang);
    return lang === 'hi' ? `${locPrefix} सफाई` : `${locPrefix} સફાઈ`;
  }
  if (lower.endsWith('repair')) {
    const prefix = trimmed.slice(0, -6).trim();
    const locPrefix = localizePrefix(prefix, lang);
    return lang === 'hi' ? `${locPrefix} मरम्मत` : `${locPrefix} રિપેરિંગ`;
  }
  if (lower.endsWith('installation')) {
    const prefix = trimmed.slice(0, -12).trim();
    const locPrefix = localizePrefix(prefix, lang);
    return lang === 'hi' ? `${locPrefix} इंस्टॉलेशन` : `${locPrefix} ઇન્સ્ટોલેશન`;
  }
  if (lower.endsWith('service')) {
    const prefix = trimmed.slice(0, -7).trim();
    const locPrefix = localizePrefix(prefix, lang);
    return lang === 'hi' ? `${locPrefix} सर्विस` : `${locPrefix} સર્વિસ`;
  }

  return serviceName;
}

// 4. Feature / Inclusion Checklist Phrases (High Frequency Home Service Operations)
export const FEATURE_TRANSLATIONS: Record<string, { hi: string; gu: string }> = {
  // Beauty & Facial Features
  'skin cleansing': { hi: 'त्वचा की सफाई (क्लींजिंग)', gu: 'ત્વચા સફાઈ (ક્લીનિંગ)' },
  'patch test': { hi: 'पैच टेस्ट', gu: 'પેચ ટેસ્ટ' },
  'whitehead extraction': { hi: 'व्हाइटहेड निष्कासन', gu: 'વ્હાઇટહેડ નિષ્કાસન' },
  'blackhead extraction': { hi: 'ब्लैकहेड निष्कासन', gu: 'બ્લેકહેડ નિષ્કાસન' },
  'exfoliating scrub application': { hi: 'एक्सफ़ोलीएटिंग स्क्रब', gu: 'એક્સફોલિએટિંગ સ્ક્રબ' },
  'skin type analysis': { hi: 'त्वचा विश्लेषण', gu: 'ત્વચા વિશ્લેષણ' },
  'lymphatic drainage strokes': { hi: 'लिम्फैटिक मसाज स्ट्रोक', gu: 'મસાજ સ્ટ્રોક' },
  'pack drying time monitoring': { hi: 'फेस पैक मॉनिटरिंग', gu: 'ફેસ પેક મોનિટરિંગ' },
  'neck massage': { hi: 'गर्दन की मसाज', gu: 'ગરદન મસાજ' },
  'gua sha massage': { hi: 'गुआ शा मसाज', gu: 'ગુઆ શા મસાજ' },
  'pre cleansing': { hi: 'प्री-क्लींजिंग', gu: 'પ્રી-ક્લીનિંગ' },
  'steam application': { hi: 'स्टीम वेपोराइज़र', gu: 'સ્ટીમ એપ્લિકેશન' },
  'toning treatment': { hi: 'टोनिंग ट्रीटमेंट', gu: 'ટોનિંગ ટ્રીટમેન્ટ' },
  'serum infusion': { hi: 'सीरम इन्फ्यूजन', gu: 'સીરમ ઇન્ફ્યુઝન' },
  'face mask': { hi: 'फेस मास्क', gu: 'ફેસ માસ્ક' },
  'moisturizer application': { hi: 'मॉइस्चराइज़र एप्लीकेशन', gu: 'મોઇશ્ચરાઇઝર' },
  'sunscreen shield': { hi: 'सनस्क्रीन शील्ड', gu: 'સનસ્ક્રીન શિલ્ડ' },
  'hair wash': { hi: 'हेयर वॉश', gu: 'હેર વોશ' },
  'blow dry': { hi: 'ब्लो ड्राई', gu: 'બ્લો ડ્રાય' },
  'split end trim': { hi: 'स्प्लिट एंड ट्रिम', gu: 'સ્પ્લિટ એન્ડ ટ્રિમ' },
  'cuticle care': { hi: 'क्यूटिकल केयर', gu: 'ક્યુટિકલ કેર' },
  'nail shaping': { hi: 'नाखून शेपिंग व पॉलिश', gu: 'નખ શેપિંગ અને પોલિશ' },

  // Cleaning & Home Improvement Features
  'final dry wipe': { hi: 'अंतिम ड्राई वाइप', gu: 'અંતિમ ડ્રાય વાઇપ' },
  'furniture exterior wiping': { hi: 'फर्नीचर बाहरी सफाई', gu: 'ફર્નિચર સફાઈ' },
  'equipment stain assessment': { hi: 'उपकरण दाग जांच', gu: 'સાધન ડાઘ તપાસ' },
  'service area cleanup': { hi: 'सर्विस एरिया सफाई', gu: 'સર્વિસ એરિયા સફાઈ' },
  'door handle sanitization': { hi: 'डोर हैंडल सैनिटाइजेशन', gu: 'ડોર હેન્ડલ સેનિટાઇઝેશન' },
  'kitchen counter degreasing': { hi: 'किचन काउंटर डीग्रीजिंग', gu: 'રસોડા કાઉન્ટર ડીગ્રીઝિંગ' },
  'dry dusting of ceiling': { hi: 'छत की डस्टिंग', gu: 'છતની ડસ્ટિંગ' },
  'area equipment setup': { hi: 'उपकरण सेटअप', gu: 'સાધન સેટઅપ' },
  'material preparation': { hi: 'सामग्री तैयारी', gu: 'સામગ્રી તૈયારી' },
  'floor deep mopping': { hi: 'फर्श डीप मोपिंग', gu: 'ફ્લોર ડીપ મોપિંગ' },
  'bathroom tile scrubbing': { hi: 'बाथरूम टाइल स्क्रबिंग', gu: 'બાથરૂમ ટાઇલ્સ સ્ક્રબિંગ' },
  'mirror glass polishing': { hi: 'दर्पण व कांच पॉलिशिंग', gu: 'અરીસા અને કાચ પોલિશિંગ' },
  'sink drain cleaning': { hi: 'सिंक ड्रेन सफाई', gu: 'સિંક ડ્રેન સફાઈ' },
  'cobweb removal': { hi: 'मकड़ी के जाले हटाना', gu: 'કરોળિયાના જાળા હટાવવા' },
  'trash bin emptying': { hi: 'कचरा बिन खाली करना', gu: 'કચરાપેટી ખાલી કરવી' },
  'carpet vacuuming': { hi: 'कारपेट वैक्यूमिंग', gu: 'કાર્પેટ વેક્યુમિંગ' },
  'sofa vacuuming': { hi: 'सोफा वैक्यूमिंग', gu: 'સોફા વેક્યુમિંગ' },

  // Repair, AC, Electrical & Plumbing Features
  'gas pressure check': { hi: 'गैस प्रेशर जांच', gu: 'ગેસ પ્રેશર તપાસ' },
  'cooling performance test': { hi: 'कूलिंग परफॉर्मेंस टेस्ट', gu: 'કૂલિંગ પરફોર્મન્સ ટેસ્ટ' },
  'coil cleaning': { hi: 'कॉइल सफाई', gu: 'કોઈલ સફાઈ' },
  'filter mesh wash': { hi: 'फिल्टर जाली धुलाई', gu: 'ફિલ્ટર જાળી સફાઈ' },
  'wiring continuity check': { hi: 'वायरिंग निरंतरता टेस्ट', gu: 'વાયરિંગ ટેસ્ટિંગ' },
  'voltage assessment': { hi: 'वोल्टेज जांच', gu: 'વોલ્ટેજ તપાસ' },
  'leakage inspection': { hi: 'रिसाव (लीकेज) जांच', gu: 'લિકેજ તપાસ' },
  'pipe fitting verification': { hi: 'पाइप फिटिंग जांच', gu: 'પાઇપ ફિટિંગ તપાસ' },
  'safety grounding test': { hi: 'सुरक्षा ग्राउंडिंग टेस्ट', gu: 'સુરક્ષા અર્થિંગ ટેસ્ટ' }
};

export function getLocalizedFeature(featureText?: string | null): string {
  if (!featureText) return '';
  const lang = (i18n.language || 'en').slice(0, 2);
  if (lang === 'en') return featureText;

  const norm = normalizeKey(featureText);
  const entry = FEATURE_TRANSLATIONS[norm];
  if (entry) {
    if (lang === 'hi' && entry.hi) return entry.hi;
    if (lang === 'gu' && entry.gu) return entry.gu;
  }

  // Fallback keyword transliterations
  if (norm.includes('cleansing') || norm.includes('cleaning')) {
    return lang === 'hi' ? `${featureText.replace(/cleansing|cleaning/gi, 'सफाई')}` : `${featureText.replace(/cleansing|cleaning/gi, 'સફાઈ')}`;
  }
  if (norm.includes('massage')) {
    return lang === 'hi' ? `${featureText.replace(/massage/gi, 'मसाज')}` : `${featureText.replace(/massage/gi, 'મસાજ')}`;
  }
  if (norm.includes('scrub')) {
    return lang === 'hi' ? `${featureText.replace(/scrub/gi, 'स्क्रब')}` : `${featureText.replace(/scrub/gi, 'સ્ક્રબ')}`;
  }
  if (norm.includes('test')) {
    return lang === 'hi' ? `${featureText.replace(/test/gi, 'टेस्ट')}` : `${featureText.replace(/test/gi, 'ટેસ્ટ')}`;
  }
  if (norm.includes('wipe') || norm.includes('wiping')) {
    return lang === 'hi' ? `${featureText.replace(/wiping|wipe/gi, 'वाइप')}` : `${featureText.replace(/wiping|wipe/gi, 'વાઇપ')}`;
  }
  if (norm.includes('inspection') || norm.includes('check')) {
    return lang === 'hi' ? `${featureText.replace(/inspection|check/gi, 'जांच')}` : `${featureText.replace(/inspection|check/gi, 'તપાસ')}`;
  }

  return featureText;
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
