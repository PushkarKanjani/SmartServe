// Master Multilingual Catalog Data (100% Comprehensive)
// Covers Categories, Subcategories, Services, Features, and Vocabulary

export interface LangEntry {
  hi: string;
  gu: string;
}

export const CATEGORY_TRANSLATIONS: Record<string, LangEntry> = {
  "ac appliance electronics repair": {
    "hi": "एसी, उपकरण व इलेक्ट्रॉनिक्स मरम्मत",
    "gu": "એસી, ઉપકરણ અને ઇલેક્ટ્રોનિક્સ રિપેરિંગ"
  },
  "ac repair": {
    "hi": "एसी मरम्मत",
    "gu": "એસી રિપેરિંગ"
  },
  "appliance repair": {
    "hi": "उपकरण मरम्मत",
    "gu": "ઉપકરણ રિપેરિંગ"
  },
  "beauty salon spa": {
    "hi": "ब्यूटी, सैलून और स्पा",
    "gu": "બ્યુટી, સલૂન અને સ્પા"
  },
  "carpentry": {
    "hi": "बढ़ई का काम",
    "gu": "સુથારીકામ"
  },
  "cleaning": {
    "hi": "सफाई सेवाएं",
    "gu": "સફાઈ સેવાઓ"
  },
  "cleaning and home cleaning": {
    "hi": "घर की सफाई व स्वच्छता",
    "gu": "ઘરની સફાઈ અને સ્વચ્છતા"
  },
  "cleaning home cleaning": {
    "hi": "घर की सफाई व स्वच्छता",
    "gu": "ઘરની સફાઈ અને સ્વચ્છતા"
  },
  "cleaning pest control": {
    "hi": "सफाई व कीट नियंत्रण",
    "gu": "સફાઈ અને જંતુ નિયંત્રણ"
  },
  "deep cleaning": {
    "hi": "डीप क्लीनिंग सेवाएं",
    "gu": "ડીપ ક્લિનિંગ સેવાઓ"
  },
  "domestic help cooking": {
    "hi": "घरेलू सहायिका व कुकिंग",
    "gu": "ઘરેલું સહાયક અને રસોઈ"
  },
  "education teachers coaching": {
    "hi": "शिक्षा, शिक्षक व कोचिंग",
    "gu": "શિક્ષણ, શિક્ષક અને કોચિંગ"
  },
  "electrical": {
    "hi": "इलेक्ट्रिकल सेवाएं",
    "gu": "ઇલેક્ટ્રિકલ સેવાઓ"
  },
  "electrician plumber carpenter home repairs": {
    "hi": "इलेक्ट्रीशियन, प्लंबर व बढ़ई",
    "gu": "ઇલેક્ટ્રિશિયન, પ્લમ્બર અને સુથાર"
  },
  "events photography entertainment": {
    "hi": "इवेंट्स, फोटोग्राफी व मनोरंजन",
    "gu": "ઇવેન્ટ્સ, ફોટોગ્રાફી અને મનોરંજન"
  },
  "health fitness wellness": {
    "hi": "स्वास्थ्य, फिटनेस व वेलनेस",
    "gu": "સ્વાસ્થ્ય, ફિટનેસ અને સુખાકારી"
  },
  "moving delivery local assistance": {
    "hi": "मूविंग, डिलीवरी व लोकल सहायता",
    "gu": "મૂવિંગ, ડિલિવરી અને લોકલ સહાય"
  },
  "painting": {
    "hi": "पेंटिंग सेवाएं",
    "gu": "પેઇન્ટિંગ સેવાઓ"
  },
  "painting waterproofing home improvement": {
    "hi": "पेंटिंग, वॉटरप्रूफिंग व होम सुधार",
    "gu": "પેઇન્ટિંગ, વૉટરપ્રૂફિંગ અને હોમ ઇમ્પ્રૂવમેન્ટ"
  },
  "pet services": {
    "hi": "पालतू पशु सेवाएं",
    "gu": "પાલતુ પ્રાણી સેવાઓ"
  },
  "plumbing": {
    "hi": "नलसाजी (प्लंबिंग)",
    "gu": "પ્લમ્બિંગ સેવાઓ"
  },
  "professional business services": {
    "hi": "पेशेवर व व्यावसायिक सेवाएं",
    "gu": "વ્યાવસાયિક સેવાઓ"
  },
  "smart home security": {
    "hi": "स्मार्ट होम व सुरक्षा",
    "gu": "સ્માર્ટ હોમ અને સુરક્ષા"
  },
  "technology digital services": {
    "hi": "टेक्नोलॉजी व डिजिटल सेवाएं",
    "gu": "ટેકનોલોજી અને ડિજિટલ સેવાઓ"
  },
  "vehicle care automobile services": {
    "hi": "वाहन देखभाल व ऑटोमोबाइल",
    "gu": "વાહન સંભાળ અને ઓટોમોબાઇલ"
  },
};

export const SUBCATEGORY_TRANSLATIONS: Record<string, LangEntry> = {
  "ac": {
    "hi": "एसी रिपेयर व सर्विस",
    "gu": "એસી રિપેરિંગ અને સર્વિસ"
  },
  "academic tutoring": {
    "hi": "शैक्षणिक ट्यूशन व कोचिंग",
    "gu": "શૈક્ષણિક ટ્યુશન અને કોચિંગ"
  },
  "access automation": {
    "hi": "एक्सेस व ऑटोमेशन",
    "gu": "એક્સેસ અને ઓટોમેશન"
  },
  "accounting tax filing": {
    "hi": "अकाउंटिंग व टैक्स फाइलिंग",
    "gu": "એકાઉન્ટિંગ અને ટેક્સ ફાઇલિંગ"
  },
  "administrative": {
    "hi": "प्रशासनिक व ऑफिस सेवाएं",
    "gu": "વહીવટી અને ઓફિસ સેવાઓ"
  },
  "air cooler": {
    "hi": "एयर कूलर रिपेयर व सर्विस",
    "gu": "એર કૂલર રિપેરિંગ"
  },
  "bathroom cleaning": {
    "hi": "बाथरूम सफाई",
    "gu": "બાથરૂમ સફાઈ"
  },
  "business consulting": {
    "hi": "बिजनेस कंसल्टिंग व सलाह",
    "gu": "બિઝનેસ કન્સલ્ટિંગ અને સલાહ"
  },
  "by room cleaning": {
    "hi": "कमरे की सफाई",
    "gu": "રૂમ મુજબ સફાઈ"
  },
  "career services": {
    "hi": "करियर मार्गदर्शन व सेवाएं",
    "gu": "કારકિર્દી માર્ગદર્શન"
  },
  "carpenter": {
    "hi": "बढ़ई (कारपेंटर)",
    "gu": "સુથાર (કાર્પેન્ટર)"
  },
  "carpentry": {
    "hi": "बढ़ई का काम",
    "gu": "સુથારીકામ"
  },
  "catering & food services": {
    "hi": "कैटरिंग और खाद्य सेवाएं",
    "gu": "કેટરિંગ અને ફૂડ સર્વિસીસ"
  },
  "catering food services": {
    "hi": "कैटरिंग और खाद्य सेवाएं",
    "gu": "કેટરિંગ અને ફૂડ સર્વિસીસ"
  },
  "chimney": {
    "hi": "किचन चिमनी रिपेयर व सर्विस",
    "gu": "કિચન ચીમની રિપેરિંગ"
  },
  "competitive exam coaching": {
    "hi": "प्रतियोगी परीक्षा कोचिंग",
    "gu": "સ્પર્ધાત્મક પરીક્ષા કોચિંગ"
  },
  "computer device support": {
    "hi": "कंप्यूटर व डिवाइस सपोर्ट",
    "gu": "કમ્પ્યુટર અને ડિવાઇસ સપોર્ટ"
  },
  "computer laptop repair": {
    "hi": "कंप्यूटर व लैपटॉप रिपेयर",
    "gu": "કમ્પ્યુટર અને લેપટોપ રિપેરિંગ"
  },
  "cooking services": {
    "hi": "कुकिंग सेवाएं (रसोइया)",
    "gu": "રસોઈ સેવાઓ"
  },
  "dance classes": {
    "hi": "डांस क्लासेज",
    "gu": "ડાન્સ ક્લાસિસ"
  },
  "data recovery backup": {
    "hi": "डेटा रिकवरी व बैकअप",
    "gu": "ડેટા રિકવરી અને બેકઅપ"
  },
  "decoration & floral": {
    "hi": "डेकोरेशन व फ्लोरल सज्जा",
    "gu": "ડેકોરેશન અને ફ્લોરલ સજાવટ"
  },
  "decoration floral": {
    "hi": "डेकोरेशन व फ्लोरल सज्जा",
    "gu": "ડેકોરેશન અને ફ્લોરલ સજાવટ"
  },
  "deep cleaning": {
    "hi": "डीप क्लीनिंग सेवाएं",
    "gu": "ડીપ ક્લિનિંગ સેવાઓ"
  },
  "delivery pickup": {
    "hi": "डिलीवरी व पिकअप",
    "gu": "ડિલિવરી અને પિકઅપ"
  },
  "digital freelancers": {
    "hi": "डिजिटल फ्रीलांसर्स",
    "gu": "ડિજિટલ ફ્રીલાન્સર્સ"
  },
  "digital marketing": {
    "hi": "डिजिटल मार्केटिंग",
    "gu": "ડિજિટલ માર્કેટિંગ"
  },
  "dj & sound systems": {
    "hi": "डीजे व साउंड सिस्टम",
    "gu": "ડીજે અને સાઉન્ડ સિસ્ટમ"
  },
  "dj sound systems": {
    "hi": "डीजे व साउंड सिस्टम",
    "gu": "ડીજે અને સાઉન્ડ સિસ્ટમ"
  },
  "dog grooming": {
    "hi": "डॉग ग्रूमिंग",
    "gu": "ડોગ ગ્રૂમિંગ"
  },
  "dog training": {
    "hi": "डॉग ट्रेनिंग",
    "gu": "ડોગ ટ્રેનિંગ"
  },
  "electrical repairs": {
    "hi": "इलेक्ट्रिकल मरम्मत",
    "gu": "ઇલેક્ટ્રિકલ રિપેરિંગ"
  },
  "electrician": {
    "hi": "इलेक्ट्रिशियन (बिजली मिस्त्री)",
    "gu": "ઇલેક્ટ્રિશિયન"
  },
  "entertainment": {
    "hi": "मनोरंजन सेवाएं",
    "gu": "મનોરંજન સેવાઓ"
  },
  "errand personal assistance": {
    "hi": "पर्सनल सहायता व काम-काज",
    "gu": "પર્સનલ સહાય અને કામકાજ"
  },
  "event planning & management": {
    "hi": "इवेंट प्लानिंग व मैनेजमेंट",
    "gu": "ઇવેન્ટ પ્લાનિંગ અને મેનેજમેન્ટ"
  },
  "event planning management": {
    "hi": "इवेंट प्लानिंग व मैनेजमेंट",
    "gu": "ઇવેન્ટ પ્લાનિંગ અને મેનેજમેન્ટ"
  },
  "event services": {
    "hi": "इवेंट सेवाएं",
    "gu": "ઇવેન્ટ સેવાઓ"
  },
  "facial skincare": {
    "hi": "फेशियल और स्किनकेयर",
    "gu": "ફેશિયલ અને સ્કિનકેર"
  },
  "finance": {
    "hi": "फाइनेंस व वित्तीय योजना",
    "gu": "ફાઇનાન્સ અને નાણાકીય સેવાઓ"
  },
  "fitness": {
    "hi": "फिटनेस व पर्सनल ट्रेनिंग",
    "gu": "ફિટનેસ અને તાલીમ"
  },
  "full home by room cleaning": {
    "hi": "फुल होम / कमरा सफाई",
    "gu": "સંપૂર્ણ ઘર / રૂમ સફાઈ"
  },
  "full home cleaning": {
    "hi": "पूरे घर की सफाई",
    "gu": "આખા ઘરની સફાઈ"
  },
  "full home room cleaning": {
    "hi": "फुल होम / कमरा सफाई",
    "gu": "સંપૂર્ણ ઘર / રૂમ સફાઈ"
  },
  "geyser": {
    "hi": "गीजर व वॉटर हीटर रिपेयर",
    "gu": "ગીઝર અને વોટર હીટર રિપેરિંગ"
  },
  "geyser water heater repair": {
    "hi": "गीजर व वॉटर हीटर रिपेयर",
    "gu": "ગીઝર અને વોટર હીટર રિપેરિંગ"
  },
  "home improvement": {
    "hi": "घर सुधार व रिनोवेशन",
    "gu": "ઘર સુધારણા સેવાઓ"
  },
  "home painting": {
    "hi": "होम पेंटिंग",
    "gu": "હોમ પેઇન્ટિંગ"
  },
  "home security": {
    "hi": "होम सुरक्षा व सीसीटीवी",
    "gu": "હોમ સિક્યોરિટી અને CCTV"
  },
  "home shifting packing": {
    "hi": "होम शिफ्टिंग व पैकिंग",
    "gu": "હોમ શિફ્ટિંગ અને પેકિંગ"
  },
  "house painting": {
    "hi": "हाउस पेंटिंग",
    "gu": "હાઉસ પેઇન્ટિંગ"
  },
  "household help": {
    "hi": "घरेलू सहायिका (मेड सर्विस)",
    "gu": "ઘરેલું સહાયક"
  },
  "it support consultation": {
    "hi": "आईटी सपोर्ट व कंसल्टेशन",
    "gu": "IT સપોર્ટ અને કન્સલ્ટેશન"
  },
  "junk removal disposal": {
    "hi": "कबाड़ व कचरा निस्तारण",
    "gu": "ભંગાર અને કચરાનો નિકાલ"
  },
  "kitchen bathroom cleaning": {
    "hi": "किचन और बाथरूम सफाई",
    "gu": "રસોડા અને બાથરૂમ સફાઈ"
  },
  "kitchen cleaning": {
    "hi": "किचन सफाई",
    "gu": "રસોડાની સફાઈ"
  },
  "language communication": {
    "hi": "भाषा व संचार कौशल",
    "gu": "ભાષા અને સંચાર તાલીમ"
  },
  "last mile delivery": {
    "hi": "लास्ट-माइल लोकल डिलीवरी",
    "gu": "લોકલ ડિલિવરી સેવા"
  },
  "legal": {
    "hi": "कानूनी सेवाएं व परामर्श",
    "gu": "કાનૂની સેવાઓ અને સલાહ"
  },
  "legal documentation": {
    "hi": "दस्तावेजीकरण व लीगल ड्राफ्टिंग",
    "gu": "દસ્તાવેજીકરણ અને લીગલ ડ્રાફ્ટિંગ"
  },
  "local errands assistance": {
    "hi": "स्थानीय सहायता व दैनिक कार्य",
    "gu": "સ્થાનિક સહાય અને કામકાજ"
  },
  "makeup & event styling": {
    "hi": "मेकअप व इवेंट स्टाइलिंग",
    "gu": "મેકઅપ અને ઇવેન્ટ સ્ટાઇલિંગ"
  },
  "makeup event styling": {
    "hi": "मेकअप व इवेंट स्टाइलिंग",
    "gu": "મેકઅપ અને ઇવેન્ટ સ્ટાઇલિંગ"
  },
  "makeup styling": {
    "hi": "मेकअप और स्टाइलिंग",
    "gu": "મેકઅપ અને સ્ટાઇલિંગ"
  },
  "marketing branding": {
    "hi": "मार्केटिंग व ब्रांडिंग",
    "gu": "માર્કેટિંગ અને બ્રાન્ડિંગ"
  },
  "men s salon": {
    "hi": "मेंस सैलून",
    "gu": "મેન્સ સલૂન"
  },
  "men's salon": {
    "hi": "मेंस सैलून",
    "gu": "મેન્સ સલૂન"
  },
  "mens salon": {
    "hi": "मेंस सैलून (पुरुष)",
    "gu": "મેન્સ સલૂન"
  },
  "mental wellness counselling": {
    "hi": "मानसिक स्वास्थ्य व काउंसलिंग",
    "gu": "માનસિક સ્વાસ્થ્ય અને કાઉન્સેલિંગ"
  },
  "microwave": {
    "hi": "माइक्रोवेव व ओवन रिपेयर",
    "gu": "માઇક્રોવેવ અને ઓવન રિપેરિંગ"
  },
  "microwave oven repair": {
    "hi": "माइक्रोवेव और ओवन रिपेयर",
    "gu": "માઇક્રોવેવ અને ઓવન રિપેરિંગ"
  },
  "moving services": {
    "hi": "पैकर्स एंड मूवर्स सेवाएं",
    "gu": "પેકર્સ એન્ડ મૂવર્સ સેવાઓ"
  },
  "music classes": {
    "hi": "संगीत व वाद्य यंत्र क्लासेज",
    "gu": "સંગીત ક્લાસિસ"
  },
  "network smart devices": {
    "hi": "नेटवर्क व स्मार्ट डिवाइसेज",
    "gu": "નેટવર્ક અને સ્માર્ટ ઉપકરણો"
  },
  "networking wi fi setup": {
    "hi": "नेटवर्किंग व वाई-फाई सेटअप",
    "gu": "નેટવર્કિંગ અને Wi-Fi સેટઅપ"
  },
  "nutrition diet counselling": {
    "hi": "पोषण व डाइट काउंसलिंग",
    "gu": "પોષણ અને ડાયેટ કાઉન્સેલિંગ"
  },
  "pedicure manicure": {
    "hi": "पेडीक्योर और मेनिक्योर",
    "gu": "પેડિક્યોર અને મેનિક્યોર"
  },
  "personal training": {
    "hi": "पर्सनल ट्रेनर व वर्कआउट",
    "gu": "પર્સનલ ટ્રેનર"
  },
  "pest control": {
    "hi": "कीट नियंत्रण (पेस्ट कंट्रोल)",
    "gu": "જંતુ નિયંત્રણ (પેસ્ટ કંટ્રોલ)"
  },
  "pet accessories nutrition": {
    "hi": "पालतू एक्सेसरीज व पोषण",
    "gu": "પાલતુ એક્સેસરીઝ અને પોષણ"
  },
  "pet care": {
    "hi": "पालतू देखभाल (पेट केयर)",
    "gu": "પેટ કેર (પાલતુ સંભાળ)"
  },
  "pet grooming": {
    "hi": "पेट ग्रूमिंग व सफाई",
    "gu": "પેટ ગ્રૂમિંગ અને સફાઈ"
  },
  "pet sitting boarding": {
    "hi": "पेट सिटिंग व बोर्डिंग",
    "gu": "પેટ સિટિંગ અને બોર્ડિંગ"
  },
  "pet training": {
    "hi": "पेट ट्रेनिंग व आज्ञाकारिता",
    "gu": "પેટ ટ્રેનિંગ"
  },
  "photography": {
    "hi": "फोटोग्राफी",
    "gu": "ફોટોગ્રાફી"
  },
  "photography videography": {
    "hi": "फोटोग्राफी व वीडियोग्राफी",
    "gu": "ફોટોગ્રાફી અને વિડિયોગ્રાફી"
  },
  "physiotherapy rehabilitation": {
    "hi": "फिजियोथेरेपी व पुनर्वास",
    "gu": "ફિઝિયોથેરાપી અને પુનર્વસન"
  },
  "plumber": {
    "hi": "प्लंबर (नलसाज)",
    "gu": "પ્લમ્બર"
  },
  "plumbing": {
    "hi": "प्लंबिंग कार्य",
    "gu": "પ્લમ્બિંગ કાર્ય"
  },
  "professional wellness": {
    "hi": "व्यावसायिक वेलनेस थेरेपी",
    "gu": "પ્રોફેશનલ વેલનેસ થેરાપી"
  },
  "refrigerator": {
    "hi": "रेफ्रिजरेटर (फ्रिज) रिपेयर",
    "gu": "રેફ્રિજરેટર (ફ્રિજ) રિપેરિંગ"
  },
  "refrigerator repair": {
    "hi": "रेफ्रिजरेटर रिपेयर",
    "gu": "રેફ્રિજરેટર રિપેરિંગ"
  },
  "ro water purifier": {
    "hi": "आरओ व वॉटर प्यूरीफायर",
    "gu": "RO અને વોટર પ્યુરિફાયર"
  },
  "sensor monitoring": {
    "hi": "सेंसर व मॉनिटरिंग सिस्टम",
    "gu": "સેન્સર અને મોનિટરિંગ સિસ્ટમ"
  },
  "smart home devices": {
    "hi": "स्मार्ट होम उपकरण सेटअप",
    "gu": "સ્માર્ટ હોમ ઉપકરણો"
  },
  "smart locks": {
    "hi": "स्मार्ट लॉक्स फिटिंग",
    "gu": "સ્માર્ટ લોક્સ ફિટિંગ"
  },
  "sofa carpet cleaning": {
    "hi": "सोफा और कारपेट सफाई",
    "gu": "સોફા અને કાર્પેટ સફાઈ"
  },
  "sofa furniture cleaning": {
    "hi": "सोफा और फर्नीचर सफाई",
    "gu": "સોફા અને ફર્નિચર સફાઈ"
  },
  "spa massage": {
    "hi": "स्पा और मसाज थेरेपी",
    "gu": "સ્પા અને મસાજ થેરાપી"
  },
  "specialized cooking": {
    "hi": "विशेषज्ञ कुकिंग व शेफ",
    "gu": "સ્પેશિયલાઇઝ્ડ કુકિંગ અને શેફ"
  },
  "specialized painting": {
    "hi": "विशेष पेंटिंग व फिनिशिंग",
    "gu": "વિશેષ પેઇન્ટિંગ"
  },
  "sports coaching": {
    "hi": "स्पोर्ट्स व खेल कोचिंग",
    "gu": "સ્પોર્ટ્સ અને રમત કોચિંગ"
  },
  "staffing hr services": {
    "hi": "स्टाफिंग व एचआर सेवाएं",
    "gu": "સ્ટાફિંગ અને HR સેવાઓ"
  },
  "television": {
    "hi": "टेलीविजन (टीवी) रिपेयर",
    "gu": "ટેલિવિઝન (ટીવી) રિપેરિંગ"
  },
  "tv audio repair": {
    "hi": "टीवी और ऑडियो रिपेयर",
    "gu": "ટીવી અને ઑડિયો રિપેરિંગ"
  },
  "variants": {
    "hi": "वेरिएंट्स व क्षमता",
    "gu": "વેરિઅન્ટ્સ અને ક્ષમતા"
  },
  "vehicle assistance": {
    "hi": "वाहन ब्रेकडाउन सहायता",
    "gu": "વાહન બ્રેકડાઉન સહાય"
  },
  "vehicle transport": {
    "hi": "वाहन परिवहन व टोइंग",
    "gu": "વાહન પરિવહન અને ટોઇંગ"
  },
  "veterinary": {
    "hi": "पशु चिकित्सा (वेट क्लिनिक)",
    "gu": "પશુ ચિકિત્સા (વેટરનરી)"
  },
  "veterinary health checkup": {
    "hi": "पशु स्वास्थ्य जांच व टीकाकरण",
    "gu": "પશુ આરોગ્ય તપાસ"
  },
  "videography": {
    "hi": "वीडियोग्राफी",
    "gu": "વિડિયોગ્રાફી"
  },
  "virtual assistant": {
    "hi": "वर्चुअल असिस्टेंट सेवाएं",
    "gu": "વર્ચ્યુઅલ આસિસ્ટન્ટ સેવાઓ"
  },
  "washing machine": {
    "hi": "वाशिंग मशीन रिपेयर",
    "gu": "વોશિંગ મશીન રિપેરિંગ"
  },
  "washing machine repair": {
    "hi": "वाशिंग मशीन रिपेयर",
    "gu": "વોશિંગ મશીન રિપેરિંગ"
  },
  "water purifier ro service": {
    "hi": "वॉटर प्यूरीफायर सर्विस",
    "gu": "વોટર પ્યુરિફાયર સર્વિસ"
  },
  "waterproofing": {
    "hi": "वॉटरप्रूफिंग सेवाएं",
    "gu": "વૉટરપ્રૂફિંગ"
  },
  "waterproofing grouting": {
    "hi": "वॉटरप्रूफिंग व ग्राउटिंग",
    "gu": "વૉટરપ્રૂફિંગ અને ગ્રાઉટિંગ"
  },
  "website app development": {
    "hi": "वेबसाइट व ऐप डेवलपमेंट",
    "gu": "વેબસાઇટ અને એપ ડેવલપમેન્ટ"
  },
  "women s salon": {
    "hi": "विमेंस सैलून",
    "gu": "વિમેન્સ સલૂન"
  },
  "women's salon": {
    "hi": "विमेंस सैलून",
    "gu": "વિમેન્સ સલૂન"
  },
  "womens salon": {
    "hi": "विमेंस सैलून (महिला)",
    "gu": "વિમેન્સ સલૂન"
  },
  "womens spa": {
    "hi": "विमेंस स्पा",
    "gu": "વિમેન્સ સ્પા"
  },
  "writing": {
    "hi": "कंटेंट राइटિંગ व लेखन",
    "gu": "કન્ટેન્ટ રાઇટિંગ અને લેખન"
  },
  "yoga meditation": {
    "hi": "योग और ध्यान (मेडिटेशन)",
    "gu": "યોગ અને ધ્યાન (મેડિટેશન)"
  },
};

export const SERVICE_NAME_TRANSLATIONS: Record<string, LangEntry> = {
  "1 bhk cleaning": {
    "hi": "1 बीएचके सफाई",
    "gu": "1 બીએચકે સફાઈ"
  },
  "1 bhk express deep cleaning": {
    "hi": "1 बीएचके एक्सप्रेस डीप सफाई",
    "gu": "૧ બીએચકે એક્સપ્રેસ ડીપ સફાઈ"
  },
  "1 bhk local home shifting & packing": {
    "hi": "1 बीएचके लोकल होम शिफ्टिंग व पैकिंग",
    "gu": "૧ બીએચકે લોકલ હોમ શિફ્ટિંગ અને પેકિંગ"
  },
  "1 bhk painting": {
    "hi": "1 बीएचके पेंटिंग",
    "gu": "૧ બીએચકે પેઇન્ટિંગ"
  },
  "1 ton": {
    "hi": "1 टन क्षमता",
    "gu": "૧ ટન ક્ષમતા"
  },
  "1.5 ton": {
    "hi": "1.5 टन क्षमता",
    "gu": "૧.૫ ટન ક્ષમતા"
  },
  "2 bhk city relocation packers & movers": {
    "hi": "2 बीएचके सिटी पैकर्स एंड मूवर्स",
    "gu": "૨ બીએચકે સિટી પેકર્સ એન્ડ મૂવર્સ"
  },
  "2 bhk cleaning": {
    "hi": "2 बीएचके सफाई",
    "gu": "2 બીએચકે સફાઈ"
  },
  "2 bhk painting": {
    "hi": "2 बीएचके पेंटिंग",
    "gu": "૨ બીએચકે પેઇન્ટિંગ"
  },
  "2 bhk standard full home cleaning": {
    "hi": "2 बीएचके फुल होम सफाई",
    "gu": "૨ બીએચકે સંપૂર્ણ ઘર સફાઈ"
  },
  "2 ton": {
    "hi": "2 टन क्षमता",
    "gu": "૨ ટન ક્ષમતા"
  },
  "24k gold radiance facial": {
    "hi": "24K गोल्ड रेडिएंस फेशियल",
    "gu": "24K ગોલ્ડ રેડિયન્સ ફેશિયલ"
  },
  "3 bhk cleaning": {
    "hi": "3 बीएचके सफाई",
    "gu": "3 બીએચકે સફાઈ"
  },
  "3 bhk luxury villa inter-state relaction": {
    "hi": "3 बीएचके लक्जरी विला अंतरराज्यीय शिफ्टिंग",
    "gu": "૩ બીએચકે વિલા ઇન્ટર-સ્ટેટ શિફ્ટિંગ"
  },
  "3 bhk luxury villa inter-state relocation": {
    "hi": "3 बीएचके लक्जरी विला अंतरराज्यीय शिफ्टिंग",
    "gu": "૩ બીએચકે વિલા ઇન્ટર-સ્ટેટ શિફ્ટિંગ"
  },
  "3 bhk painting": {
    "hi": "3 बीएचके पेंटिंग",
    "gu": "૩ બીએચકે પેઇન્ટિંગ"
  },
  "3 bhk premium full home cleaning": {
    "hi": "3 बीएचके प्रीमियम होम सफाई",
    "gu": "૩ બીએચકે પ્રીમિયમ ઘર સફાઈ"
  },
  "4 bhk / villa luxury deep cleaning": {
    "hi": "4 बीएचके / विला लक्जरी डीप सफाई",
    "gu": "૪ બીએચકે / વિલા લક્ઝરી ડીપ સફાઈ"
  },
  "4 bhk cleaning": {
    "hi": "4+ बीएचके सफाई",
    "gu": "4+ બીએચકે સફાઈ"
  },
  "4 bhk+ cleaning": {
    "hi": "4+ बीएचके सफाई",
    "gu": "4+ બીએચકે સફાઈ"
  },
  "4 bhk+ painting": {
    "hi": "4+ बीएचके पेंटिंग",
    "gu": "૪+ બીએચકે પેઇન્ટિંગ"
  },
  "4-channel dvr / nvr storage & remote viewing sync": {
    "hi": "4-चैनल डीवीआर / एनवीआर रिमोट सिंक",
    "gu": "૪-ચેનલ DVR / NVR સ્ટોરેજ સેટઅપ"
  },
  "4k cinematic drone aerial video shoot": {
    "hi": "4K सिनेमैटिक ड्रोन एरियल वीडियो शूट",
    "gu": "4K સિનેમેટિક ડ્રોન વિડિયો શૂટ"
  },
  "5-seater fabric sofa shampooing & extraction": {
    "hi": "5-सीटर फैब्रिक सोफा शैंपू व वैक्यूमिंग",
    "gu": "૫-સીટર ફેબ્રિક સોફા શેમ્પૂ અને વેક્યુમિંગ"
  },
  "6-seater dining chair upholstery foam wash": {
    "hi": "6-सीटर डाइनिंग चेयर फोम वॉश",
    "gu": "૬-સીટર ડાઇનિંગ ચેર ફોમ વોશ"
  },
  "ac deep cleaning": {
    "hi": "एसी डीप क्लीनिंग (सर्विस)",
    "gu": "એસી ડીપ ક્લિનિંગ (સર્વિસ)"
  },
  "ac gas charging": {
    "hi": "एसी गैस चार्जिंग",
    "gu": "એસી ગેસ ચાર્જિંગ"
  },
  "ac installation": {
    "hi": "एसी इंस्टॉलेशन",
    "gu": "એસી ઇન્સ્ટોલેશન"
  },
  "ac repair": {
    "hi": "एसी रिपेयर",
    "gu": "એસી રિપેરિંગ"
  },
  "ac service": {
    "hi": "एसी सर्विस",
    "gu": "એસી સર્વિસ"
  },
  "ac troubleshooting": {
    "hi": "एसी खराबी जांच व समाधान",
    "gu": "એસી મુશ્કેલી નિવારણ"
  },
  "ac uninstallation": {
    "hi": "एसी अनइंस्टॉलेशन",
    "gu": "એસી અનઇન્સ્ટોલેશન"
  },
  "accidentally formatted pen drive / sd card recovery": {
    "hi": "फॉर्मेटेड पेन ड्राइव / एसडी कार्ड डेटा रिकवरी",
    "gu": "પેન ડ્રાઇવ / SD કાર્ડ ડેટા રિકવરી"
  },
  "accounting": {
    "hi": "अकाउंटिंग व बहीखाता",
    "gu": "એકાઉન્ટિંગ અને નામા પદ્ધતિ"
  },
  "acne facial": {
    "hi": "मुंहासे (एक्ने) फेशियल",
    "gu": "ખીલ (એક્ને) ફેશિયલ"
  },
  "acoustic & electric guitar lessons (beginner)": {
    "hi": "गिटार लेसन्स (शुरुआती)",
    "gu": "ગિટાર ક્લાસિસ (શરૂઆત)"
  },
  "acoustic stage pa system & mixer setup": {
    "hi": "स्टेज पीए सिस्टम व मिक्सर सेटअप",
    "gu": "સ્ટેજ PA સાઉન્ડ સિસ્ટમ સેટઅપ"
  },
  "advanced trick & agility training (5 sessions)": {
    "hi": "एडवांस्ड डॉग ट्रिक ट्रेनिंग (5 सत्र)",
    "gu": "એડવાન્સ્ડ ડોગ ટ્રેનિંગ (૫ સેશન)"
  },
  "advertising management": {
    "hi": "विज्ञापन प्रबंधन",
    "gu": "જાહેરાત સંચાલન"
  },
  "agreement drafting": {
    "hi": "अनुबंध प्रारूपण",
    "gu": "કરાર ડ્રાફ્ટિંગ"
  },
  "air quality & dust sensor smart integration": {
    "hi": "एयर क्वालिटी व डस्ट सेंसर इंटीग्रेशन",
    "gu": "એર ક્વોલિટી અને ડસ્ટ સેન્સર"
  },
  "airport chauffeur driven car drop & valet return": {
    "hi": "एयरपोर्ट शॉफर कार ड्रॉप व वैलेट सेवा",
    "gu": "એરપોર્ટ કાર ડ્રોપ અને શોફર સેવા"
  },
  "ammonia-free root touch-up": {
    "hi": "अमोनिया-मुक्त रूट टच-अप",
    "gu": "એમોનિયા-મુક્ત રૂટ ટચ-અપ"
  },
  "anchor host": {
    "hi": "एंकर व मंच संचालक",
    "gu": "એન્કર અને મંચ સંચાલક"
  },
  "anchor/host": {
    "hi": "एंकर व मंच संचालक",
    "gu": "એન્કર અને મંચ સંચાલક"
  },
  "annual anti-rabies & dhppil booster vaccine": {
    "hi": "एंटी-रेबीज व डीएचपीपीआईएल वैक्सीन",
    "gu": "એન્ટી-રેબીઝ અને બૂસ્ટર રસી"
  },
  "annual corporate balance sheet audit filing": {
    "hi": "वार्षिक कॉर्पोरेट बैलेंस शीट ऑडिट फाइलिंग",
    "gu": "વાર્ષિક બેલેન્સ શીટ ઓડિટ ફાઇલિંગ"
  },
  "ant & silverfish perimeter spray": {
    "hi": "चींटी व सिल्वरफिश पेरीमीटर स्प्रे",
    "gu": "કીડી અને સિલ્વરફિશ સ્પ્રે"
  },
  "ant control": {
    "hi": "चींटी नियंत्रण",
    "gu": "કીડી નિયંત્રણ"
  },
  "anti aging facial": {
    "hi": "एंटी-एजिंग फेशियल",
    "gu": "એન્ટી-એજિંગ ફેશિયલ"
  },
  "anti-aging collagen lift facial": {
    "hi": "एंटी-एजिंग कोलेजन लिफ्ट फेशियल",
    "gu": "એન્ટી-એજિંગ કોલેજન લિફ્ટ ફેશિયલ"
  },
  "anti-aging facial": {
    "hi": "एंटी-एजिंग फेशियल",
    "gu": "એન્ટી-એજિંગ ફેશિયલ"
  },
  "anti-termite soil drilling & barrier injection": {
    "hi": "दीमक ड्रिलिंग व सुरक्षा बैरियर ट्रीटमेंट",
    "gu": "ઉધઈ નિયંત્રણ અને સુરક્ષા બેરિયર ટ્રીટમેન્ટ"
  },
  "app development": {
    "hi": "मोबाइल ऐप विकास",
    "gu": "મોબાઇલ એપ ડેવલપમેન્ટ"
  },
  "appliance electrical connection": {
    "hi": "उपकरण इलेक्ट्रिकल कनेक्शन",
    "gu": "ઉપકરણ ઇલેક્ટ્રિકલ કનેક્શન"
  },
  "appliance installation": {
    "hi": "उपकरण इंस्टॉलेशन",
    "gu": "ઉપકરણ ઇન્સ્ટોલેશન"
  },
  "architecture & real estate photographer": {
    "hi": "आर्किटेक्चर व रियल एस्टेट फोटोग्राफर",
    "gu": "આર્કિટેક્ચર ફોટોગ્રાફર"
  },
  "aromatherapy essential oil spa": {
    "hi": "अरोमाथेरेपी एसेंशियल ऑयल स्पा",
    "gu": "એરોમાથેરાપી એસેન્શિયલ ઓઇલ સ્પા"
  },
  "aromatherapy massage": {
    "hi": "एरोमाथेरेपी मसाज",
    "gu": "એરોમાથેરાપી મસાજ"
  },
  "ashtanga primary series guided yoga flow": {
    "hi": "अष्टांग योग गाइडेड फ्लो",
    "gu": "અષ્ટાંગ યોગ ગાઇડેડ ફ્લો"
  },
  "at-home veterinary health checkup & vaccination": {
    "hi": "घर पर पशु स्वास्थ्य जांच व टीकाकरण",
    "gu": "ઘરે પશુ આરોગ્ય તપાસ અને રસીકરણ"
  },
  "automated cloud backup setup (google drive/onedrive)": {
    "hi": "क्लाउड बैकअप सेटअप (गूगल ड्राइव/वनड्राइव)",
    "gu": "ક્લાઉડ બેકઅપ સેટઅપ"
  },
  "automatic rfid boom barrier gate installation": {
    "hi": "स्वचालित आरएफआईडी बूम बैरियर गेट फिटिंग",
    "gu": "ઓટોમેટિક RFID બૂમ બેરિયર ગેટ ફિટિંગ"
  },
  "ayurvedic potli therapy": {
    "hi": "आयुर्वेदिक पोटली थेरेपी",
    "gu": "આયુર્વેદિક પોટલી થેરાપી"
  },
  "babysitter & child nanny care": {
    "hi": "बेबीसिटर व बाल देखभाल नैनी",
    "gu": "બેબીસિટિંગ અને બાળ સંભાળ"
  },
  "badminton": {
    "hi": "बैडमिंटन कोचिंग",
    "gu": "બેડમિન્ટન કોચિંગ"
  },
  "baking": {
    "hi": "Baking",
    "gu": "Baking"
  },
  "balcony washing & window track cleaning": {
    "hi": "बालकनी धुलाई व खिड़की ट्रैक सफाई",
    "gu": "બાલ્કની ધોલાઈ અને બારી ટ્રેક સફાઈ"
  },
  "band": {
    "hi": "Band",
    "gu": "Band"
  },
  "bank po & ssc cgl reasoning trainer": {
    "hi": "बैंक पीओ व एसएससी रीजनिंग ट्रेनर",
    "gu": "બેંક PO અને SSC CGL રિઝનિંગ ટ્રેનર"
  },
  "banking": {
    "hi": "Banking",
    "gu": "Banking"
  },
  "barbecue & grill party master": {
    "hi": "बारबेक्यू व ग्रिल पार्टी मास्टर शेफ",
    "gu": "બાર્બેક્યુ અને ગ્રીલ પાર્ટી શેફ"
  },
  "basic home veterinary services": {
    "hi": "घर पर बुनियादी पशु चिकित्सा",
    "gu": "ઘરે પશુ ચિકિત્સા સેવા"
  },
  "basic manicure": {
    "hi": "बेसिक मेनिक्योर",
    "gu": "બેસિક મેનિક્યોર"
  },
  "basic pedicure": {
    "hi": "बेसिक पेडीक्योर",
    "gu": "બેસિક પેડિક્યોર"
  },
  "basketball": {
    "hi": "बास्केटबॉल कोचिंग",
    "gu": "બાસ્કેટબોલ કોચિંગ"
  },
  "bath & brush": {
    "hi": "नहलाना व ब्रशिंग",
    "gu": "નવડાવવું અને બ્રશિંગ"
  },
  "bath brush": {
    "hi": "नहलाना व ब्रशिंग",
    "gu": "નવડાવવું અને બ્રશિંગ"
  },
  "bathroom cleaning": {
    "hi": "बाथरूम की सफाई",
    "gu": "બાથરૂમ સફાઈ"
  },
  "bathroom deep cleaning": {
    "hi": "बाथरूम डीप क्लीनिंग",
    "gu": "બાથરૂમ ડીપ ક્લિનિંગ"
  },
  "bathroom tile scrubbing & descaling wash": {
    "hi": "बाथरूम टाइल स्क्रबिंग व डीस्केलिंग सफाई",
    "gu": "બાથરૂમ ટાઇલ્સ સ્ક્રબિંગ અને ડિસ્કેલિંગ સફાઈ"
  },
  "bathroom waterproofing": {
    "hi": "बाथरूम वॉटरप्रूफिंग",
    "gu": "બાથરૂમ વૉટરપ્રૂફિંગ"
  },
  "beard sculpting & oil styling": {
    "hi": "दाढ़ी शेपिंग व ऑयल स्टाइलिंग",
    "gu": "દાઢી શેપિંગ અને ઓઇલ સ્ટાઇલિંગ"
  },
  "beard styling": {
    "hi": "दाढ़ी स्टाइलिंग",
    "gu": "દાઢી સ્ટાઇલિંગ"
  },
  "beard trim": {
    "hi": "दाढ़ी ट्रिम",
    "gu": "દાઢી ટ્રીમિંગ"
  },
  "bed bug thermal & chemical treatment": {
    "hi": "खटमल थर्मल व केमिकल ट्रीटमेंट",
    "gu": "માંકડ થર્મલ અને કેમિકલ ટ્રીટમેન્ટ"
  },
  "bed bug treatment": {
    "hi": "खटमल उपचार",
    "gu": "માંકડ નિયંત્રણ"
  },
  "bedroom deep cleaning": {
    "hi": "बेडरूम डीप क्लीनिंग",
    "gu": "બેડરૂમ ડીપ ક્લિનિંગ"
  },
  "behavioral training": {
    "hi": "व्यवहार प्रशिक्षण",
    "gu": "વર્તણૂક તાલીમ"
  },
  "bike cleaning": {
    "hi": "बाइक सफाई",
    "gu": "બાઇક સફાઈ"
  },
  "bill payment & government office standing helper": {
    "hi": "बिल भुगतान व सरकारी दफ्तर सहायक",
    "gu": "બિલ ચુકવણી અને સરકારી ઓફિસ સહાયક"
  },
  "biology": {
    "hi": "Biology",
    "gu": "Biology"
  },
  "biometric access control keypad for offices": {
    "hi": "ऑफिस बायोमेट्रिक एक्सेस कंट्रोल कीपैड",
    "gu": "ઓફિસ બાયોમેટ્રિક એક્સેસ કીપેડ"
  },
  "biometric fingerprint smart door lock fitting": {
    "hi": "बायोमेट्रिक फिंगरप्रिंट स्मार्ट लॉक फिटिंग",
    "gu": "બાયોમેટ્રિક સ્માર્ટ ડોર લોક ફિટિંગ"
  },
  "biometric lock installation": {
    "hi": "बायोमेट्रिक लॉक इंस्टॉलेशन",
    "gu": "બાયોમેટ્રિક લોક ઇન્સ્ટોલેશન"
  },
  "birthday photography": {
    "hi": "बर्थडे फोटोग्राफी",
    "gu": "બર્થડે ફોટોગ્રાફી"
  },
  "biryani & mughlai special home chef": {
    "hi": "बिरयानी व मुगलाई स्पेशल होम शेफ",
    "gu": "બિરયાની અને મુઘલાઈ સ્પેશિયલ શેફ"
  },
  "bleach": {
    "hi": "ब्लीच",
    "gu": "બ્લીચ"
  },
  "blood sample collection for cbc & kidney profile": {
    "hi": "पशु ब्लड सैंपल कलेक्शन (सीबीसी प्रोफाइल)",
    "gu": "પશુ બ્લડ સેમ્પલ કલેક્શન"
  },
  "bluetooth smart latch & mortise setup": {
    "hi": "ब्लूटूथ स्मार्ट लैच व मोर्टिस सेटअप",
    "gu": "બ્લૂટૂથ સ્માર્ટ લૅચ સેટઅપ"
  },
  "board": {
    "hi": "Board",
    "gu": "Board"
  },
  "body recomposition & calorie deficit coaching": {
    "hi": "बॉडी रिकम्पोजिशन व डाइट कोचिंग",
    "gu": "બોડી રિકમ્પોઝિશન અને ડાયેટ કોચ"
  },
  "boho canopy tent & fairy light romantic setup": {
    "hi": "बोहो कैनोपी टेंट व फेयरी लाइट सेटअप",
    "gu": "બોહો કેનોપી ટેન્ટ અને લાઇટ સેટઅપ"
  },
  "bollywood & hip-hop commercial dance instructor": {
    "hi": "बॉलीवुड व हिप-हॉप डांस इंस्ट्रक्टर",
    "gu": "બોલિવૂડ અને હિપ-હોપ ડાન્સ ઇન્સ્ટ્રક્ટર"
  },
  "bollywood dance": {
    "hi": "Bollywood Dance",
    "gu": "Bollywood Dance"
  },
  "bollywood singing": {
    "hi": "Bollywood Singing",
    "gu": "Bollywood Singing"
  },
  "bookkeeping": {
    "hi": "Bookkeeping",
    "gu": "Bookkeeping"
  },
  "bookkeeping & tally accounting support": {
    "hi": "बुककीपिंग व टैली अकाउंटिंग सपोर्ट",
    "gu": "બુકકીપિંગ અને Tally એકાઉન્ટિંગ સપોર્ટ"
  },
  "breathing mindfulness": {
    "hi": "Breathing/Mindfulness",
    "gu": "Breathing/Mindfulness"
  },
  "breathing/mindfulness": {
    "hi": "Breathing/Mindfulness",
    "gu": "Breathing/Mindfulness"
  },
  "bridal makeup": {
    "hi": "ब्राइडल मेकअप",
    "gu": "બ્રાઇડલ મેકઅપ"
  },
  "broken laptop hinge & casing fabrication": {
    "hi": "लैपटॉप हिंज व केसिंग रिपेयर",
    "gu": "લેપટોપ હિંજ રિપેરિંગ"
  },
  "brooming, mopping & dusting maid service": {
    "hi": "झाड़ू, पोंछा व डस्टिंग मेड सर्विस",
    "gu": "ઝાડુ, પોતાં અને ડસ્ટિંગ કામવાળા"
  },
  "cabinet repair": {
    "hi": "कैबिनेट रिपेयर",
    "gu": "કેબિનેટ રિપેરિંગ"
  },
  "cage-free homestay pet boarding (per night)": {
    "hi": "केज-फ्री होमस्टे पेट बोर्डिंग (प्रति रात)",
    "gu": "હોમસ્ટે પેટ બોર્ડિંગ"
  },
  "candid birthday party photographer (3 hours)": {
    "hi": "कैंडिड बर्थडे पार्टी फोटोग्राफर (3 घंटे)",
    "gu": "કેન્ડિડ બર્થડે પાર્ટી ફોટોગ્રાફર"
  },
  "car battery jump-start & breakdown assistance": {
    "hi": "कार बैटरी जंप-स्टार्ट व ब्रेकडाउन सहायता",
    "gu": "કાર બેટરી જમ્પ-સ્ટાર્ટ અને સહાય"
  },
  "car bike pickup drop": {
    "hi": "Car/Bike Pickup & Drop",
    "gu": "Car/Bike Pickup & Drop"
  },
  "car cleaning": {
    "hi": "कार सफाई",
    "gu": "કાર સફાઈ"
  },
  "car/bike pickup & drop": {
    "hi": "Car/Bike Pickup & Drop",
    "gu": "Car/Bike Pickup & Drop"
  },
  "career counselling": {
    "hi": "Career Counselling",
    "gu": "Career Counselling"
  },
  "carpet cleaning": {
    "hi": "कालीन (कारपेट) सफाई",
    "gu": "કાર્પેટ સફાઈ"
  },
  "carpet high-extraction deep wash": {
    "hi": "कारपेट हाई-एक्सट्रैक्शन डीप वॉश",
    "gu": "કાર્પેટ હાઇ-એક્સટ્રેક્શન ડીપ વોશ"
  },
  "cat": {
    "hi": "CAT",
    "gu": "CAT"
  },
  "cat & ipmat quantitative aptitude coach": {
    "hi": "कैट व आईपीमैट क्वांटिटेटिव एप्टीट्यूड कोच",
    "gu": "CAT અને IPMAT એપ્ટિટ્યુડ કોચ"
  },
  "cat bath, fur de-shedding & nail trim": {
    "hi": "कैट बाथ, डी-शेडिंग व नेल ट्रिम",
    "gu": "બિલાડી બાથ અને નેઇલ ટ્રીમ"
  },
  "cat sitting & litter tray maintenance visit": {
    "hi": "कैट सिटिंग व लिटर ट्रे मेंटेनेंस",
    "gu": "કેટ સિટિંગ મુલાકાત"
  },
  "catering": {
    "hi": "कैटरिंग सेवाएं",
    "gu": "કેટરિંગ સેવાઓ"
  },
  "cctv configuration": {
    "hi": "सीसीटीवी कॉन्फ़िगरेशन",
    "gu": "સીસીટીવી રૂપરેખાંકન"
  },
  "cctv installation": {
    "hi": "सीसीटीवी इंस्टॉलेशन",
    "gu": "સીસીટીવી ઇન્સ્ટોલેશન"
  },
  "cctv repair": {
    "hi": "सीसीटीवी रिपेयर",
    "gu": "સીસીટીવી રિપેરિંગ"
  },
  "ceiling painting": {
    "hi": "छत (सीलिंग) पेंटिंग",
    "gu": "છત (સીલિંગ) પેઇન્ટિંગ"
  },
  "centralized smart gateway & zigbee router setup": {
    "hi": "स्मार्ट गेटवे व जिगबी राउटर सेटअप",
    "gu": "સ્માર્ટ ગેટવે અને ઝિગબી રાઉટર"
  },
  "cervical neck spasm & migraine physical therapy": {
    "hi": "गर्दन दर्द व माइग्रेन फिजियोथेरेपी",
    "gu": "ગરદનનો દુખાવો અને આધાશીશી ફિઝિયોથેરાપી"
  },
  "charcoal detox & acne cleanup": {
    "hi": "चारकोल डिटॉक्स व एक्ने क्लीनअप",
    "gu": "ચારકોલ ડિટોક્સ અને ખીલ ક્લીનઅપ"
  },
  "charcoal face scrub & blackhead extraction": {
    "hi": "चारकोल फेस स्क्रब व ब्लैकहेड निष्कासन",
    "gu": "ચારકોલ ફેસ સ્ક્રબ અને બ્લેકહેડ સફાઈ"
  },
  "chemistry": {
    "hi": "Chemistry",
    "gu": "Chemistry"
  },
  "chimney cleaning": {
    "hi": "किचन चिमनी सफाई",
    "gu": "કિચન ચીમની સફાઈ"
  },
  "chimney repair": {
    "hi": "किचन चिमनी रिपेयर",
    "gu": "કિચન ચીમની રિપેરિંગ"
  },
  "chinese & pan-asian dimsum chef": {
    "hi": "चाइनीज व पैन-एशियन डिमसम शेफ",
    "gu": "ચાઇનીઝ અને પેન-એશિયન શેફ"
  },
  "class 1-5 foundation all-subject home tutor": {
    "hi": "कक्षा 1-5 ऑल-सब्जेक्ट होम ट्यूटर",
    "gu": "ધોરણ ૧-૫ તમામ વિષયોના ટ્યુટર"
  },
  "class 11-12 accountancy & commerce tutor": {
    "hi": "कक्षा 11-12 अकाउंटेंसी व कॉमर्स ट्यूटर",
    "gu": "ધોરણ ૧૧-૧૨ એકાઉન્ટન્સી અને કોમર્સ ટ્યુટર"
  },
  "class 11-12 biology & botany specialist": {
    "hi": "कक्षा 11-12 बायोलॉजी व बॉटनी विशेषज्ञ",
    "gu": "ધોરણ ૧૧-૧૨ બાયોલોજી વિશેષજ્ઞ"
  },
  "class 11-12 chemistry problem solver": {
    "hi": "कक्षा 11-12 केमिस्ट्री ट्यूटर",
    "gu": "ધોરણ ૧૧-૧૨ કેમિસ્ટ્રી ટ્યુટર"
  },
  "class 11-12 economics & statistics tutor": {
    "hi": "कक्षा 11-12 इकोनॉमिक्स व सांख्यिकी ट्यूटर",
    "gu": "ધોરણ ૧૧-૧૨ અર્થશાસ્ત્ર અને આંકડાશાસ્ત્ર ટ્યુટર"
  },
  "class 11-12 higher mathematics tutor": {
    "hi": "कक्षा 11-12 उच्च गणित ट्यूटर",
    "gu": "ધોરણ ૧૧-૧૨ ગણિત ટ્યુટર"
  },
  "class 11-12 physics master coach": {
    "hi": "कक्षा 11-12 फिजिक्स मास्टर कोच",
    "gu": "ધોરણ ૧૧-૧૨ ફિઝિક્સ માસ્ટર કોચ"
  },
  "class 6-8 math & science home specialist": {
    "hi": "कक्षा 6-8 गणित व विज्ञान ट्यूटर",
    "gu": "ધોરણ ૬-૮ ગણિત અને વિજ્ઞાન ટ્યુટર"
  },
  "class 9-10 cbse/icse board exam tutor": {
    "hi": "कक्षा 9-10 बोर्ड परीक्षा विशेषज्ञ ट्यूटर",
    "gu": "ધોરણ ૯-૧૦ બોર્ડ પરીક્ષા ટ્યુટર"
  },
  "class grade": {
    "hi": "Class/Grade",
    "gu": "Class/Grade"
  },
  "class/grade": {
    "hi": "Class/Grade",
    "gu": "Class/Grade"
  },
  "classic cut, file & polish manicure": {
    "hi": "क्लासिक कट, फाइल व पॉलिश मेनिक्योर",
    "gu": "ક્લાસિક કટ, ફાઇલ અને પોલિશ મેનિક્યોર"
  },
  "classic facial": {
    "hi": "क्लासिक फेशियल",
    "gu": "ક્લાસિક ફેશિયલ"
  },
  "classic manicure": {
    "hi": "क्लासिक मेनिक्योर",
    "gu": "ક્લાસિક મેનિક્યોર"
  },
  "classic pedicure": {
    "hi": "क्लासिक पेडिक्योर",
    "gu": "ક્લાસિક પેડિક્યોર"
  },
  "classic relaxing foot pedicure": {
    "hi": "क्लासिक रिलैक्सिंग फुट पेडीक्योर",
    "gu": "ક્લાસિક રિલેક્સિંગ ફૂટ પેડિક્યોર"
  },
  "classical dance": {
    "hi": "Classical Dance",
    "gu": "Classical Dance"
  },
  "classical singing": {
    "hi": "Classical Singing",
    "gu": "Classical Singing"
  },
  "cleanup": {
    "hi": "क्लीनअप",
    "gu": "ક્લીનઅપ"
  },
  "cloth washing, folding & clothes ironing": {
    "hi": "कपड़े धोना, तह करना व इस्त्री",
    "gu": "કપડાં ધોવા, વાળવા અને ઇસ્ત્રી"
  },
  "club style dj with dual bass subwoofers": {
    "hi": "क्लब स्टाइल डीजे व सबवूफर सेटअप",
    "gu": "ક્લબ સ્ટાઇલ ડીજે સેટઅપ"
  },
  "cockroach control": {
    "hi": "तिलचट्टा (कॉकरोच) नियंत्रण",
    "gu": "વંદો (કોકરોચ) નિયંત્રણ"
  },
  "cockroach herbal gel pest control": {
    "hi": "कॉकरोच हर्बल जेल कीट नियंत्रण",
    "gu": "વંદા માટે હર્બલ જેલ પેસ્ટ કંટ્રોલ"
  },
  "cognitive behavioral therapy (cbt) session": {
    "hi": "सीबीटी थेरेपी सेशन (काउंसलिंग)",
    "gu": "CBT થેરાપી સેશન (કાઉન્સેલિંગ)"
  },
  "communication skills": {
    "hi": "Communication Skills",
    "gu": "Communication Skills"
  },
  "complete brand identity design (logo, palette, fonts)": {
    "hi": "ब्रांड आइडेंटिटी डिजाइन (लोगो, फॉन्ट, रंग)",
    "gu": "બ્રાન્ડ આઇડેન્ટિટી ડિઝાઇન (લોગો, રંગ)"
  },
  "complete garage / balcony junk clutter hauling": {
    "hi": "गैराज / बालकनी कबाड़ व मलबा निष्कासन",
    "gu": "ગેરેજ / બાલ્કની કચરો અને ભંગાર નિકાલ"
  },
  "computer science": {
    "hi": "Computer Science",
    "gu": "Computer Science"
  },
  "computer science & python coding tutor": {
    "hi": "कंप्यूटर साइंस व पायथन कोडिंग ट्यूटर",
    "gu": "કમ્પ્યુટર સાયન્સ અને પાયથોન કોડિંગ ટ્યુટર"
  },
  "concealed wall wire conduit camera installation": {
    "hi": "दीवार कंसील्ड वायरिंग कैमरा इंस्टॉलेशन",
    "gu": "વોલ કન્સિલ્ડ કેમેરા ઇન્સ્ટોલેશન"
  },
  "contemporary": {
    "hi": "Contemporary",
    "gu": "Contemporary"
  },
  "contemporary & jazz expressive dance coach": {
    "hi": "कंटेम्परेरी व जैज डांस कोच",
    "gu": "કન્ટેમ્પરેરી અને જાઝ ડાન્સ કોચ"
  },
  "content marketing": {
    "hi": "कंटेंट मार्केटिंग",
    "gu": "કન્ટેન્ટ માર્કેટિંગ"
  },
  "content writing": {
    "hi": "कंटेंट राइटिंग",
    "gu": "કન્ટેન્ટ રાઇટિંગ"
  },
  "continental & italian pasta specialist": {
    "hi": "कॉन्टिनेंटल व इटैलियन पास्ता शेफ",
    "gu": "કોન્ટિનેન્ટલ અને ઇટાલિયન પાસ્તા શેફ"
  },
  "cooler repair": {
    "hi": "एयर कूलर रिपेयर",
    "gu": "એર કૂલર રિપેરિંગ"
  },
  "cooler service": {
    "hi": "एयर कूलर सर्विस",
    "gu": "એર કૂલર સર્વિસ"
  },
  "cooling problem": {
    "hi": "कूलिंग समस्या समाधान",
    "gu": "કૂલિંગ સમસ્યા સમાધાન"
  },
  "copywriting": {
    "hi": "कॉपीराइटिंग",
    "gu": "કોપીરાઇટિંગ"
  },
  "core strength & calisthenics trainer": {
    "hi": "कोर स्ट्रेंथ व कैलीस्थेनिक्स ट्रेनर",
    "gu": "કોર સ્ટ્રેન્થ અને કેલિસ્થેનિક્સ ટ્રેનર"
  },
  "corporate chair yoga & eye strain relief": {
    "hi": "चेयर योग व आंखों के तनाव से राहत",
    "gu": "ચેર યોગ અને આંખોના તણાવ મુક્તિ"
  },
  "corporate conference & seminar manager": {
    "hi": "कॉन्फ्रेंस व सेमिनार इवेंट मैनेजर",
    "gu": "કોન્ફરન્સ અને સેમિનાર મેનેજર"
  },
  "corporate desk-worker fitness coach": {
    "hi": "डेस्क-वर्कर फिटनेस कोच",
    "gu": "ઓફિસ વર્કર્સ ફિટનેસ કોચ"
  },
  "corporate email & google workspace domain migration": {
    "hi": "गूगल वर्कस्पेस ईमेल डोमेन माइग्रेशन",
    "gu": "Google Workspace ઇમેઇલ માઇગ્રેશન"
  },
  "corporate event & conference photographer": {
    "hi": "कॉर्पोरेट इवेंट व कॉन्फ्रेंस फोटोग्राफर",
    "gu": "કોર્પોરેટ ઇવેન્ટ ફોટોગ્રાફર"
  },
  "corporate stage backdrop & led signage setup": {
    "hi": "स्टेज बैकड्रॉप व एलईडी साइनेज",
    "gu": "સ્ટેજ બેકડ્રોપ અને LED સેટઅપ"
  },
  "corporate video": {
    "hi": "कॉर्पोरेट वीडियो",
    "gu": "કોર્પોરેટ વિડિયો"
  },
  "corrupted external hard drive file retrieval": {
    "hi": "करप्ट हार्ड ड्राइव डेटा रिकवरी",
    "gu": "હાર્ડ ડ્રાઇવ ફાઇલ રિકવરી"
  },
  "couples relationship & pre-marital counselling": {
    "hi": "रिलेशनशिप व प्री-मैरिटल काउंसलिंग",
    "gu": "સંબંધ અને લગ્ન પૂર્વે કાઉન્સેલિંગ"
  },
  "cover letter writing": {
    "hi": "Cover Letter राइटिंग",
    "gu": "Cover Letter રાઇટિંગ"
  },
  "cricket": {
    "hi": "क्रिकेट कोचिंग",
    "gu": "ક્રિકેટ કોચિંગ"
  },
  "crystal spa detox foot pedicure": {
    "hi": "क्रिस्टल स्पा डिटॉक्स फुट पेडीक्योर",
    "gu": "ક્રિસ્ટલ સ્પા ડિટોક્સ ફૂટ પેડિક્યોર"
  },
  "crystal spa pedicure": {
    "hi": "क्रिस्टल स्पा पेडीक्योर",
    "gu": "ક્રિસ્ટલ સ્પા પેડિક્યોર"
  },
  "curtain rod installation": {
    "hi": "पर्दा रॉड इंस्टॉलेशन",
    "gu": "પડદા રોડ ઇન્સ્ટોલેશન"
  },
  "custom furniture": {
    "hi": "कस्टम फर्नीचर निर्माण",
    "gu": "કસ્ટમ ફર્નિચર બનાવવું"
  },
  "custom gaming / workstation pc assembly": {
    "hi": "कस्टम गेमिंग / वर्कस्टेशन पीसी असेंबली",
    "gu": "ગેમિંગ / વર્કસ્ટેશન PC એસેમ્બલી"
  },
  "custom landing page design for google ads": {
    "hi": "गूगल ऐड्स लैंडिंग पेज डिजाइन",
    "gu": "Google Ads લેન્ડિંગ પેજ ડિઝાઇન"
  },
  "custom nail art & extension touchup": {
    "hi": "कस्टम नेल आर्ट व एक्सटेंशन टचअप",
    "gu": "કસ્ટમ નેઇલ આર્ટ અને એક્સટેન્શન ટચઅપ"
  },
  "custom raw & cooked diet meal charting": {
    "hi": "पेट डाइट मील चार्टिंग",
    "gu": "પેટ ડાયેટ ચાર્ટિંગ"
  },
  "customer support chat & email rep (daily shift)": {
    "hi": "कस्टमर सपोर्ट चैट व ईमेल प्रतिनिधि",
    "gu": "ગ્રાહક સપોર્ટ ચેટ અને ઇમેઇલ સહાયક"
  },
  "cut file polish": {
    "hi": "कट, फाइल व पॉलिश",
    "gu": "કટ, ફાઇલ અને પોલિશ"
  },
  "cut, file & polish": {
    "hi": "कट, फाइल व पॉलिश",
    "gu": "કટ, ફાઇલ અને પોલિશ"
  },
  "daily cook": {
    "hi": "दैनिक कुक (रसोइया)",
    "gu": "દૈનિક રસોઇયો"
  },
  "daily utensil washing & kitchen sink clean": {
    "hi": "दैनिक बर्तन धुलाई व सिंक सफाई",
    "gu": "વાસણ ધોવા અને સિંક સફાઈ"
  },
  "dancer": {
    "hi": "Dancer",
    "gu": "Dancer"
  },
  "data backup": {
    "hi": "डेटा बैकअप",
    "gu": "ડેટા બેકઅપ"
  },
  "data entry": {
    "hi": "डेटा एंट्री",
    "gu": "ડેટા એન્ટ્રી"
  },
  "data entry & web research virtual specialist": {
    "hi": "डेटा एंट्री व वेब रिसर्च वर्चुअल विशेषज्ञ",
    "gu": "ડેટા એન્ટ્રી અને રિસર્ચ સ્પેશિયલિસ્ટ"
  },
  "data recovery from crashed hard drive / ssd": {
    "hi": "क्रैश हार्ड ड्राइव / एसएसडी डेटा रिकवरी",
    "gu": "ક્રેશ થયેલ SSD / હાર્ડ ડ્રાઇવ ડેટા રિકવરી"
  },
  "daycare pet playgroup & socialization": {
    "hi": "पेट डेकेयर प्लेग्रुप व सोशलाइजेशन",
    "gu": "પેટ ડેકેર"
  },
  "de-tan pack & instant radiance cleanup": {
    "hi": "डी-टैन पैक व इंस्टेंट रेडिएंस क्लीनअप",
    "gu": "ડી-ટેન પેક અને તાત્કાલિક ચમક ક્લીનઅપ"
  },
  "deep conditioning spa hair treatment": {
    "hi": "डीप कंडीशनिंग स्पा हेयर ट्रीटमेंट",
    "gu": "ડીપ કન્ડિશનિંગ સ્પા હેર ટ્રીટમેન્ટ"
  },
  "deep house decluttering & wardrobe organizer": {
    "hi": "घर की अव्यवस्था हटाना व अलमारी व्यवस्था",
    "gu": "ઘરની સજાવટ અને વોર્ડરોબ વ્યવસ્થા"
  },
  "deep tissue massage": {
    "hi": "डीप टिशू मसाज",
    "gu": "ડીપ ટિશ્યુ મસાજ"
  },
  "deep tissue sports relief massage": {
    "hi": "डीप टिश्यू स्पोर्ट्स रिलीफ मसाज",
    "gu": "ડીપ ટિશ્યુ સ્પોર્ટ્સ રિલીફ મસાજ"
  },
  "deluxe de-tan mani-pedi combo": {
    "hi": "डीलक्स डी-टैन मेनी-पेडी कॉम्बो",
    "gu": "ડીલક્સ ડી-ટેન મેની-પેડી કોમ્બો"
  },
  "deshedding & undercoat fur thinning bath": {
    "hi": "फर डीशेडिंग व थिनिंग बाथ",
    "gu": "ફર ડીશેડિંગ બાથ"
  },
  "desktop repair": {
    "hi": "डेस्कटॉप रिपेयर",
    "gu": "ડેસ્કટોપ રિપેરિંગ"
  },
  "detan": {
    "hi": "डी-टैन",
    "gu": "ડી-ટેન"
  },
  "diamond micro-dermabrasion facial": {
    "hi": "डायमंड माइक्रो-डर्माब्रेशन फेशियल",
    "gu": "ડાયમંડ માઇક્રો-ડર્માબ્રેશન ફેશિયલ"
  },
  "diet consultation": {
    "hi": "आहार परामर्श",
    "gu": "આહાર સલાહ"
  },
  "digital lock installation": {
    "hi": "डिजिटल लॉक इंस्टॉलेशन",
    "gu": "ડિજિટલ લોક ઇન્સ્ટોલેશન"
  },
  "dining area scrubbing & sanitization": {
    "hi": "डाइनिंग एरिया स्क्रबिंग व सैनिटाइजेशन",
    "gu": "ડાઇનિંગ એરિયા સ્ક્રબિંગ અને સેનિટાઇઝેશન"
  },
  "dining table cleaning": {
    "hi": "डाइनिंग टेबल सफाई",
    "gu": "ડાઇનિંગ ટેબલ સફાઈ"
  },
  "dishwashing": {
    "hi": "बर्तन धोना",
    "gu": "વાસણ ધોવા"
  },
  "dj": {
    "hi": "DJ",
    "gu": "DJ"
  },
  "document delivery": {
    "hi": "दस्तावेज़ डिलीवरी",
    "gu": "દસ્તાવેજ ડિલિવરી"
  },
  "document review": {
    "hi": "दस्तावेज़ समीक्षा",
    "gu": "દસ્તાવેજ સમીક્ષા"
  },
  "documentation": {
    "hi": "दस्तावेज़ीकरण",
    "gu": "દસ્તાવેજીકરણ"
  },
  "dog walking": {
    "hi": "कुत्ते को घुमाना",
    "gu": "કૂતરાને ફેરવવું"
  },
  "dog walking & exercise visit (30 mins)": {
    "hi": "डॉग वॉकिंग व एक्सरसाइज (30 मिनट)",
    "gu": "ડોગ વૉકિંગ (૩૦ મિનિટ)"
  },
  "door repair": {
    "hi": "दरवाजा रिपेयर",
    "gu": "દરવાજા રિપેરિંગ"
  },
  "drainage repair": {
    "hi": "ड्रेनेज रिपेयर",
    "gu": "ડ્રેનેજ રિપેરિંગ"
  },
  "drawer repair": {
    "hi": "दराज रिपेयर",
    "gu": "ડ્રોઅર રિપેરિંગ"
  },
  "drum cleaning": {
    "hi": "ड्रम क्लीनिंग व डीस्केलिंग",
    "gu": "ડ્રમ ક્લિનિંગ"
  },
  "drums": {
    "hi": "Drums",
    "gu": "Drums"
  },
  "drums & percussion rhythm instructor": {
    "hi": "ड्रम्स व ताल वाद्य इंस्ट्रक्टर",
    "gu": "ડ્રમ્સ અને પર્કશન ઇન્સ્ટ્રક્ટર"
  },
  "dry cleaning pickup & doorstep delivery": {
    "hi": "ड्राई क्लीनिंग पिकअप व होम डिलीवरी",
    "gu": "ડ્રાય ક્લિનિંગ પિકઅપ અને હોમ ડિલિવરી"
  },
  "dry needling & myofascial trigger point therapy": {
    "hi": "ड्राई नीडलिंग व मायोफेशियल थेरेपी",
    "gu": "ડ્રાય નીડલિંગ અને થેરાપી"
  },
  "dual bathroom scrubbing & tile polish": {
    "hi": "दो बाथरूम स्क्रबिंग व टाइल पॉलिश",
    "gu": "બે બાથરૂમ સ્ક્રબિંગ અને ટાઇલ પોલિશ"
  },
  "dual-way video door phone monitor fitting": {
    "hi": "टू-वे वीडियो डोर फोन मॉनिटर फिटिंग",
    "gu": "ટૂ-વે વિડિયો ડોર ફોન ફિટિંગ"
  },
  "e-commerce product catalog photographer": {
    "hi": "ई-कॉमर्स प्रोडक्ट कैटलॉग फोटोग्राफर",
    "gu": "પ્રોડક્ટ કેટલોગ ફોટોગ્રાફર"
  },
  "e-waste eco-friendly recycling pickup": {
    "hi": "ई-वेस्ट पर्यावरण-अनुकूल रीसाइक्लिंग पिकअप",
    "gu": "ઇ-કચરો રિસાયક્લિંગ પિકઅપ"
  },
  "ear cleaning": {
    "hi": "Ear सफाई",
    "gu": "Ear સફાઈ"
  },
  "elderly care & senior companion maid": {
    "hi": "बुजुर्गों की देखभाल व साथी सहायिका",
    "gu": "વડીલોની સંભાળ અને સહાયક"
  },
  "elderly mobility & senior fitness trainer": {
    "hi": "वरिष्ठ नागरिक फिटनेस व मोबिलिटी ट्रेनर",
    "gu": "વડીલો માટે ફિટનેસ ટ્રેનર"
  },
  "electrical inspection": {
    "hi": "इलेक्ट्रिकल सुरक्षा जांच",
    "gu": "ઇલેક્ટ્રિકલ સુરક્ષા તપાસ"
  },
  "employee background verification (criminal & education)": {
    "hi": "कर्मचारी बैकग्राउंड वेरिफिकेशन (क्रिमिनल व शिक्षा)",
    "gu": "કર્મચારી બેકગ્રાઉન્ડ વેરિફિકેશન"
  },
  "employment offer letter & hr policy handbook drafting": {
    "hi": "ऑफर लेटर व एचआर पॉलिसी हैंडबुक ड्राफ्टिंग",
    "gu": "ઓફર લેટર અને HR પોલિસી હેન્ડબુક"
  },
  "end-to-end birthday party coordinator": {
    "hi": "बर्थडे पार्टी समन्वयक (कोऑर्डिनेटर)",
    "gu": "બર્થડે પાર્ટી પ્લાનર"
  },
  "engagement makeup": {
    "hi": "सगाई मेकअप",
    "gu": "સગાઈ મેકઅપ"
  },
  "english": {
    "hi": "English",
    "gu": "English"
  },
  "ethernet cable crimping & concealed wall punching": {
    "hi": "इथरनेट केबल क्रिम्पिंग व वॉल पंचिंग",
    "gu": "ઇથરનેટ કેબલ ક્રીમ્પિંગ"
  },
  "evening snack & high-tea cook": {
    "hi": "शाम का नाश्ता व हाई-टी कुक",
    "gu": "સાંજનો નાસ્તો અને હાઇ-ટી કુક"
  },
  "event packing & gift wrapping personal assistant": {
    "hi": "इवेंट पैकिंग व गिफ्ट रैपिंग सहायक",
    "gu": "ઇવેન્ટ પેકિંગ અને ગિફ્ટ રેપિંગ સહાય"
  },
  "event photography": {
    "hi": "इवेंट फोटोग्राफी",
    "gu": "ઇવેન્ટ ફોટોગ્રાફી"
  },
  "event planning": {
    "hi": "Event Planning",
    "gu": "Event Planning"
  },
  "event staff": {
    "hi": "Event Staff",
    "gu": "Event Staff"
  },
  "event videography": {
    "hi": "इवेंट वीडियोग्राफी",
    "gu": "ઇવેન્ટ વિડિયોગ્રાફી"
  },
  "executive calendar & travel booking assistant": {
    "hi": "कैलेंडर व ट्रेवल बुकिंग वर्चुअल असिस्टेंट",
    "gu": "કેલેન્ડર અને ટ્રાવેલ બુકિંગ સહાયક"
  },
  "executive groom's pamper package": {
    "hi": "एग्जीक्यूटिव ग्रूम पैम्पर पैकेज",
    "gu": "એક્ઝિક્યુટિવ ગ્રૂમ પેમ્પર પેકેજ"
  },
  "executive resume & linkedin profile rewrite": {
    "hi": "एग्जीक्यूटिव रिज्यूमे व लिंक्डइन प्रोफाइल लेखन",
    "gu": "એક્ઝિક્યુટિવ રિઝ્યુમ અને LinkedIn પ્રોફાઇલ"
  },
  "exit interview & full & final settlement processing": {
    "hi": "एग्जिट इंटरव्यू व फुल एंड फाइनल सेटलमेंट",
    "gu": "એક્ઝિટ ઇન્ટરવ્યુ અને ફાઇનલ સેટલમેન્ટ"
  },
  "express cut, file & polish change": {
    "hi": "एक्सप्रेस कट, फाइल व नेल पॉलिश",
    "gu": "એક્સપ્રેસ કટ, ફાઇલ અને નેઇલ પોલિશ"
  },
  "express eye & face touchup makeup": {
    "hi": "एक्सप्रेस आई व फेस टचअप मेकअप",
    "gu": "એક્સપ્રેસ આઇ અને ફેસ ટચઅપ મેકઅપ"
  },
  "express head, neck & shoulder relief": {
    "hi": "एक्सप्रेस हेड, नेक व शोल्डर रिलीफ",
    "gu": "એક્સપ્રેસ હેડ, નેક અને શોલ્ડર રિલીફ"
  },
  "express intra-city document & parcel pickup": {
    "hi": "एक्सप्रेस शहर के भीतर पार्सल व दस्तावेज पिकअप",
    "gu": "શહેરમાં એક્સપ્રેસ પાર્સલ અને દસ્તાવેજ પિકઅપ"
  },
  "exterior full home painting": {
    "hi": "बाहरी फुल होम पेंटिंग",
    "gu": "બહારની સંપૂર્ણ ઘર પેઇન્ટિંગ"
  },
  "eyebrow & upper lip threading": {
    "hi": "आइब्रो व अपर लिप थ्रेडिंग",
    "gu": "આઇબ્રો અને અપર લિપ થ્રેડિંગ"
  },
  "facial": {
    "hi": "फेशियल",
    "gu": "ફેશિયલ"
  },
  "family generation portrait session": {
    "hi": "फैमिली पोर्ट्रेट फोटोग्राफी सेशन",
    "gu": "ફેમિલી પોટ્રેટ ફોટોગ્રાફી"
  },
  "fan installation": {
    "hi": "पंखा इंस्टॉलेशन",
    "gu": "પંખા ઇન્સ્ટોલેશન"
  },
  "fashion model portfolio shoot": {
    "hi": "फैशन मॉडल पोर्टफोलियो शूट",
    "gu": "ફેશન મોડેલ પોર્ટફોલિયો શૂટ"
  },
  "fiber broadband ont modem configuration": {
    "hi": "फाइबर ब्रॉडबैंड ओएनटी मॉडेम सेटअप",
    "gu": "ફાઇબર બ્રોડબેન્ડ મોડેમ સેટઅપ"
  },
  "filter replacement": {
    "hi": "फिल्टर बदलना (रिप्लेसमेंट)",
    "gu": "ફિલ્ટર બદલવું"
  },
  "financial consultation": {
    "hi": "Financial परामर्श",
    "gu": "Financial સલાહ"
  },
  "fitness coaching": {
    "hi": "Fitness कोचिंग",
    "gu": "Fitness કોચિંગ"
  },
  "flatbed hydraulic tow truck for premium cars": {
    "hi": "हाइड्रोलिक फ्लैटबेड टो ट्रक (प्रीमियम कार)",
    "gu": "હાઇડ્રોલિક ટો ટ્રક (પ્રીમિયમ કાર)"
  },
  "floor machine scrubbing & buffing": {
    "hi": "फ्लोर मशीन स्क्रबिंग व बफिंग",
    "gu": "ફ્લોર મશીન સ્ક્રબિંગ અને બફિંગ"
  },
  "foot care": {
    "hi": "फुट केयर (पैरों की देखभाल)",
    "gu": "ફૂટ કેર (પગની સંભાળ)"
  },
  "foot massage": {
    "hi": "फुट मसाज",
    "gu": "ફૂટ મસાજ"
  },
  "foot reflexology": {
    "hi": "फुट रिफ्लेक्सोलॉजी",
    "gu": "ફૂટ રિફ્લેક્સિકોલોજી"
  },
  "football": {
    "hi": "Football",
    "gu": "Football"
  },
  "foreign languages": {
    "hi": "Foreign Languages",
    "gu": "Foreign Languages"
  },
  "fragile bakery cake & floral gift delivery": {
    "hi": "नाजुक बेकरी केक व फूलों का उपहार डिलीवरी",
    "gu": "કેક અને ફૂલોની ગિફ્ટ ડિલિવરી"
  },
  "franchise business model & standard operating procedures": {
    "hi": "फ्रैंचाइज़ी बिजनेस मॉडल व एसओपी निर्माण",
    "gu": "ફ્રેન્ચાઇઝી બિઝનેસ મોડેલ અને SOP"
  },
  "french language learning coach (a1-b2 level)": {
    "hi": "फ्रेंच भाषा कोच (A1-B2 लेवल)",
    "gu": "ફ્રેન્ચ ભાષા કોચ (A1-B2 લેવલ)"
  },
  "frozen shoulder & rotator cuff mobility rehab": {
    "hi": "फ्रोजन शोल्डर मोबिलिटी रिहैब",
    "gu": "ફ્રોઝન શોલ્ડર રિહેબિલિટેશન"
  },
  "fruit glow & hydration facial": {
    "hi": "फ्रूट ग्लो व हाइड्रेशन फेशियल",
    "gu": "ફ્રૂટ ગ્લો અને હાઇડ્રેશન ફેશિયલ"
  },
  "fssai food license registration for cloud kitchens": {
    "hi": "एफएसएसएआई फूड लाइसेंस रजिस्ट्रेशन",
    "gu": "FSSAI ફૂડ લાયસન્સ રજીસ્ટ્રેશન"
  },
  "full apartment cleaning": {
    "hi": "Full Apartment सफाई",
    "gu": "Full Apartment સફાઈ"
  },
  "full apartment deep cleaning (1/2 bhk)": {
    "hi": "फुल अपार्टमेंट डीप सफाई (1/2 बीएचके)",
    "gu": "સંપૂર્ણ એપાર્ટમેન્ટ ડીપ સફાઈ (૧/૨ બીએચકે)"
  },
  "full arms & full legs waxing (honey)": {
    "hi": "फुल आर्म्स व फुल लेग्स वैक्सिंग (हनी)",
    "gu": "ફુલ આર્મ્સ અને ફુલ લેગ્સ વેક્સિંગ (હની)"
  },
  "full body massage": {
    "hi": "Full Body मालिश",
    "gu": "Full Body માલિશ"
  },
  "full body rica waxing": {
    "hi": "फुल बॉडी रिका वैक्सिंग",
    "gu": "ફુલ બોડી રિકા વેક્સિંગ"
  },
  "full bungalow / duplex cleaning": {
    "hi": "Full Bungalow / Dupl सफाई",
    "gu": "Full Bungalow / Dupl સફાઈ"
  },
  "full bungalow duplex cleaning": {
    "hi": "Full Bungalow / Dupl सफाई",
    "gu": "Full Bungalow / Dupl સફાઈ"
  },
  "full dog grooming & haircut spa package": {
    "hi": "फुल डॉग ग्रूमिंग व हेयरकट स्पा पैकेज",
    "gu": "ડોગ ગ્રૂમિંગ અને હેરકટ સ્પા પેકેજ"
  },
  "full grooming": {
    "hi": "Full Grooming",
    "gu": "Full Grooming"
  },
  "full home deep cleaning": {
    "hi": "Full Home Deep सफाई",
    "gu": "Full Home Deep સફાઈ"
  },
  "full time cook": {
    "hi": "Full-Time Cook",
    "gu": "Full-Time Cook"
  },
  "full-day all-round household helper (8 hours)": {
    "hi": "फुल-डे ऑल-राउंड घरेलू सहायिका (8 घंटे)",
    "gu": "આખો દિવસ ઘરકામ સહાયક (૮ કલાક)"
  },
  "full-time cook": {
    "hi": "Full-Time Cook",
    "gu": "Full-Time Cook"
  },
  "furnished full home painting": {
    "hi": "फर्निश्ड फुल होम पेंटिंग",
    "gu": "ફર્निश्ड સંપૂર્ણ ઘર પેઇન્ટિંગ"
  },
  "furniture assembly": {
    "hi": "फर्नीचर असेंबली",
    "gu": "ફર્નિચર એસેમ્બલી"
  },
  "furniture installation": {
    "hi": "फर्नीचर फिटिंग व इंस्टॉलेशन",
    "gu": "ફર્નિચર ઇન્સ્ટોલેશન"
  },
  "furniture moving": {
    "hi": "Furniture Moving",
    "gu": "Furniture Moving"
  },
  "furniture repair": {
    "hi": "फर्नीचर मरम्मत",
    "gu": "ફર્નિચર રિપેરિંગ"
  },
  "garba": {
    "hi": "Garba",
    "gu": "Garba"
  },
  "gas charging": {
    "hi": "गैस चार्जिंग",
    "gu": "ગેસ ચાર્જિંગ"
  },
  "gate": {
    "hi": "GATE",
    "gu": "GATE"
  },
  "gel manicure": {
    "hi": "जेल मेनिक्योर",
    "gu": "જેલ મેનિક્યોર"
  },
  "gel pedicure": {
    "hi": "जेल पेडीक्योर",
    "gu": "જેલ પેડિક્યોર"
  },
  "general pest control": {
    "hi": "General Pest Control",
    "gu": "General Pest Control"
  },
  "general servicing": {
    "hi": "सामान्य सर्विसिंग",
    "gu": "સામાન્ય સર્વિસિંગ"
  },
  "german language learning specialist (a1-b2)": {
    "hi": "जर्मन भाषा विशेषज्ञ (A1-B2)",
    "gu": "જર્મન ભાષા વિશેષજ્ઞ (A1-B2)"
  },
  "geyser installation": {
    "hi": "गीजर इंस्टॉलेशन",
    "gu": "ગીઝર ઇન્સ્ટોલેશન"
  },
  "geyser repair": {
    "hi": "गीजर रिपेयर",
    "gu": "ગીઝર રિપેરિંગ"
  },
  "geyser service": {
    "hi": "गीजर सर्विस",
    "gu": "ગીઝર સર્વિસ"
  },
  "gift wrapping & festive hamper assembly runner": {
    "hi": "गिफ्ट रैपिंग व उत्सव हैंपर डिलीवरी सहायक",
    "gu": "ગિફ્ટ રેપિંગ અને હેમ્પર સહાયક"
  },
  "global hair color (l'oral / matrix)": {
    "hi": "ग्लोबल हेयर कलर (लोरियल / मैट्रिक्स)",
    "gu": "ગ્લોબલ હેર કલર (લોરિયલ / matrix)"
  },
  "global hair color (l'oréal / matrix)": {
    "hi": "ग्लोबल हेयर कलर (लोरियल / मैट्रिक्स)",
    "gu": "ગ્લોબલ હેર કલર (લોરિયલ / મેટ્રિક્સ)"
  },
  "gluten-free & organic health chef": {
    "hi": "ग्लूटेन-फ्री व ऑर्गेनिक हेल्थ शेफ",
    "gu": "ગ્લુટેન-ફ્રી અને ઓર્ગેનિક હેલ્થ શેફ"
  },
  "gmat & gre analytical writing coach": {
    "hi": "जीमैट व जीआरई राइटिंग कोच",
    "gu": "GMAT અને GRE રાઇટિંગ કોચ"
  },
  "google ads (ppc) campaign setup & keyword audit": {
    "hi": "गूगल ऐड्स कैंपेन व कीवर्ड ऑडिट",
    "gu": "Google Ads કેમ્પેઇન સેટઅપ"
  },
  "gourmet live barbecue & grilling counter": {
    "hi": "लाइव बारबेक्यू और ग्रिलिंग काउंटर",
    "gu": "લાઇવ બાર્બેક્યુ અને ગ્રિલિંગ કાઉન્ટર"
  },
  "gourmet live barbecue grilling counter": {
    "hi": "लाइव बारबेक्यू और ग्रिलिंग काउंटर",
    "gu": "લાઇવ બાર્બેક્યુ અને ગ્રિલિંગ કાઉન્ટર"
  },
  "government exams": {
    "hi": "Government Exams",
    "gu": "Government Exams"
  },
  "graphic design": {
    "hi": "Graphic डिजाइनिंग",
    "gu": "Graphic ડિઝાઇનિંગ"
  },
  "grocery & vegetable market delivery assistant": {
    "hi": "राशन व सब्जी बाजार डिलीवरी सहायक",
    "gu": "કરિયાણું અને શાકભાજી ડિલિવરી સહાયક"
  },
  "grocery pickup": {
    "hi": "Grocery Pickup",
    "gu": "Grocery Pickup"
  },
  "group": {
    "hi": "Group",
    "gu": "Group"
  },
  "group yoga": {
    "hi": "Group Yoga",
    "gu": "Group Yoga"
  },
  "grout cleaning": {
    "hi": "Grout सफाई",
    "gu": "Grout સફાઈ"
  },
  "gst assistance": {
    "hi": "GST सहायता",
    "gu": "GST સહાય"
  },
  "gst registration & monthly compliance filing": {
    "hi": "जीएसटी रजिस्ट्रेशन व मासिक रिटर्न फाइलिंग",
    "gu": "GST રજીસ્ટ્રેશન અને મંથલી રિટર્ન ફાઇલિંગ"
  },
  "guard & watchdog boundary awareness coaching": {
    "hi": "गार्ड डॉग बाउंड्री कोचिंग",
    "gu": "ગાર્ડ ડોગ ટ્રેનિંગ"
  },
  "guitar": {
    "hi": "Guitar",
    "gu": "Guitar"
  },
  "gujarati": {
    "hi": "Gujarati",
    "gu": "Gujarati"
  },
  "gujarati food": {
    "hi": "Gujarati Food",
    "gu": "Gujarati Food"
  },
  "hair coloring": {
    "hi": "हेयर कलरिंग",
    "gu": "હેર કલરિંગ"
  },
  "hair cut": {
    "hi": "हेयरकट",
    "gu": "હેરકટ"
  },
  "hair rebonding & straightening": {
    "hi": "हेयर रिबॉन्डिंग व स्ट्रेटनिंग",
    "gu": "હેર રિબોન્ડિંગ અને સ્ટ્રેટનિંગ"
  },
  "hair spa": {
    "hi": "हेयर स्पा",
    "gu": "હેર સ્પા"
  },
  "hair straightening / smoothening": {
    "hi": "Hair Straightening / Smoothening",
    "gu": "Hair Straightening / Smoothening"
  },
  "hair straightening smoothening": {
    "hi": "Hair Straightening / Smoothening",
    "gu": "Hair Straightening / Smoothening"
  },
  "hair styling": {
    "hi": "हेयर स्टाइलिंग",
    "gu": "હેર સ્ટાઇલિંગ"
  },
  "hair treatment": {
    "hi": "हेयर उपचार",
    "gu": "હેર સારવાર"
  },
  "haircut": {
    "hi": "हेयरकट",
    "gu": "હેરકટ"
  },
  "haircut & styling": {
    "hi": "हेयरकट स्टाइलिंग",
    "gu": "હેરકટ સ્ટાઇલિંગ"
  },
  "haircut styling": {
    "hi": "हेयरकट स्टाइलिंग",
    "gu": "હેરકટ સ્ટાઇલિંગ"
  },
  "hairstyling + makeup packages": {
    "hi": "Hairstyling + Makeup Packages",
    "gu": "Hairstyling + Makeup Packages"
  },
  "hairstyling makeup packages": {
    "hi": "Hairstyling + Makeup Packages",
    "gu": "Hairstyling + Makeup Packages"
  },
  "hd flawless bridal makeup package": {
    "hi": "एचडी फ्लॉलेस ब्राइडल मेकअप पैकेज",
    "gu": "HD બ્રાઇડલ મેકઅપ પેકેજ"
  },
  "head massage": {
    "hi": "हेड मसाज (सिर की मालिश)",
    "gu": "હેડ મસાજ (માથાની માલિશ)"
  },
  "head oil massage & scalp relaxation": {
    "hi": "हेड ऑयल मसाज व स्कैल्प रिलैक्सेशन",
    "gu": "હેડ ઓઇલ મસાજ અને સ્કેલ્પ રિલેક્સેશન"
  },
  "healthy diet food": {
    "hi": "Healthy/Diet Food",
    "gu": "Healthy/Diet Food"
  },
  "healthy fitness meal prep cook (diet specific)": {
    "hi": "हेल्दी फिटनेस डाइट कुक (डाइट विशेष)",
    "gu": "હેલ્ધી ફિટનેસ ડાયેટ કુક"
  },
  "healthy/diet food": {
    "hi": "Healthy/Diet Food",
    "gu": "Healthy/Diet Food"
  },
  "heating problem": {
    "hi": "हीटिंग समस्या समाधान",
    "gu": "હીટિંગ સમસ્યા સમાધાન"
  },
  "heavy hardware & appliance inter-store transit": {
    "hi": "भारी हार्डवेयर व उपकरण स्टोर डिलीवरी",
    "gu": "ભારે હાર્ડવેર અને ઉપકરણ ટ્રાન્સપોર્ટ"
  },
  "heavy luggage & suitcase airport transport": {
    "hi": "भारी लगेज व सूटकेस एयरपोर्ट ट्रांसपोर्ट",
    "gu": "લગેજ અને સૂટકેસ એરપોર્ટ ટ્રાન્સપોર્ટ"
  },
  "heavy-duty smart plug (16a) ac/geyser sync": {
    "hi": "16A स्मार्ट प्लग एसी/गीजर सिंक",
    "gu": "16A સ્માર્ટ પ્લગ એસી/ગીઝર સિંક"
  },
  "high-decibel smart security siren integration": {
    "hi": "हाई-डेसिबल स्मार्ट सिक्योरिटी सायरन",
    "gu": "હાઇ-ડેસિબલ સ્માર્ટ સાયરન"
  },
  "hiit & functional bodyweight conditioning": {
    "hi": "एचआईआईटी व फंक्शनल कंडीशनिंग",
    "gu": "HIIT અને ફંક્શનલ કન્ડિશનિંગ"
  },
  "hindi": {
    "hi": "Hindi",
    "gu": "Hindi"
  },
  "hindustani classical vocal music guru": {
    "hi": "हिंदुस्तानी शास्त्रीय गायन गुरु",
    "gu": "હિન્દુસ્તાની શાસ્ત્રીય ગાયન ગુરુ"
  },
  "hip hop": {
    "hi": "Hip-Hop",
    "gu": "Hip-Hop"
  },
  "hip-hop": {
    "hi": "Hip-Hop",
    "gu": "Hip-Hop"
  },
  "home automation setup": {
    "hi": "Home Automation सेटअप",
    "gu": "Home Automation સેટઅપ"
  },
  "home bakery & cake baking assistant": {
    "hi": "होम बेकरी व केक बेकिंग असिस्टेंट",
    "gu": "હોમ બેકરી અને કેક બેકિંગ આસિસ્ટન્ટ"
  },
  "home interior assistance": {
    "hi": "होम इंटीरियर सहायता",
    "gu": "હોમ ઇન્ટિરિયર સહાય"
  },
  "home kettlebell & functional power trainer": {
    "hi": "कैटलबेल व फंक्शनल पावर ट्रेनर",
    "gu": "કેટલબેલ અને પાવર ટ્રેનર"
  },
  "home office dual-monitor & docking station setup": {
    "hi": "होम ऑफिस मॉनिटर व डॉकिंग स्टेशन सेटअप",
    "gu": "હોમ ઓફિસ મોનિટર સેટઅપ"
  },
  "home workout trainer": {
    "hi": "Home Workout Trainer",
    "gu": "Home Workout Trainer"
  },
  "hot towel shave & beard grooming": {
    "hi": "हॉट टॉवल शेव व दाढ़ी ग्रूमिंग",
    "gu": "હોટ ટોવેલ શેવ અને દાઢી ગ્રૂમિંગ"
  },
  "house shifting": {
    "hi": "House Shifting",
    "gu": "House Shifting"
  },
  "household cleaning assistance": {
    "hi": "Household Cleaning सहायता",
    "gu": "Household Cleaning સહાય"
  },
  "hydra-facial deep pore cleansing": {
    "hi": "हाइड्रा-फेशियल डीप पोर क्लींजिंग",
    "gu": "હાઇડ્રા-ફેશિયલ ડીપ પોર ક્લીનિંગ"
  },
  "hydrating facial": {
    "hi": "हाइड्रेटिंग फेशियल",
    "gu": "હાઇડ્રેટિંગ ફેશિયલ"
  },
  "ice cream aromatherapy spa pedicure": {
    "hi": "आइसक्रीम अरोमाथेरेपी स्पा पेडीक्योर",
    "gu": "આઇસક્રીમ એરોમાથેરાપી સ્પા પેડિક્યોર"
  },
  "ielts & toefl band 8+ exam preparation": {
    "hi": "आईईएलटीएस व टॉफेल बैंड 8+ तैयारी",
    "gu": "IELTS અને TOEFL બેન્ડ 8+ તૈયારી"
  },
  "iit-jee main & advanced mathematics mentor": {
    "hi": "आईआईटी-जेईई गणित मेंटर",
    "gu": "IIT-JEE મેથ્સ મેન્ટર"
  },
  "in-home pet sitting & feeding (per visit)": {
    "hi": "होम पेट सिटिंग व फीडिंग",
    "gu": "ઘરે પેટ સિટિંગ અને ફીડિંગ"
  },
  "income tax return (itr) filing for salaried": {
    "hi": "वेतनभोगियों हेतु आयकर रिटर्न (ITR) फाइलिंग",
    "gu": "નોકરીયાત વર્ગ માટે ITR ફાઇલિંગ"
  },
  "individual": {
    "hi": "Individual",
    "gu": "Individual"
  },
  "indoor 360 wi-fi security camera installation": {
    "hi": "इंडोर 360° वाई-फाई सिक्योरिटी कैमरा फिटिंग",
    "gu": "ઇન્ડોર 360° Wi-Fi કેમેરા ઇન્સ્ટોલેશન"
  },
  "indoor 360° wi-fi security camera installation": {
    "hi": "इंडोर 360° वाई-फाई सिक्योरिटी कैमरा फिटिंग",
    "gu": "ઇન્ડોર 360° Wi-Fi કેમેરા ઇન્સ્ટોલેશન"
  },
  "influencer marketing outreach & campaign management": {
    "hi": "इन्फ्लुएंसर मार्केटिंग व कैंपेन मैनेजमेंट",
    "gu": "ઇન્ફ્લુઅન્સર માર્કેટિંગ મેનેજમેન્ટ"
  },
  "instagram & facebook meta ads lead generation setup": {
    "hi": "मेटा ऐड्स (इंस्टाग्राम/फेसबुक) लीड जनरेशन",
    "gu": "ઇન્સ્ટાગ્રામ અને ફેસબુક જાહેરાત સેટઅપ"
  },
  "installation": {
    "hi": "इंस्टॉलेशन सेवा",
    "gu": "ઇન્સ્ટોલેશન સેવા"
  },
  "instant photo booth with quirky props & prints": {
    "hi": "इंस्टेंट फोटो बूथ व प्रॉप्स",
    "gu": "ઇન્સ્ટન્ટ ફોટો બૂથ અને પ્રિન્ટ્સ"
  },
  "intelligent moving-head dmx stage lights": {
    "hi": "स्टेज मूविंग-हेड डीएमएक्स लाइट्स",
    "gu": "સ્ટેજ લાઇટ્સ સેટઅપ"
  },
  "intensive heel peel & callus removal": {
    "hi": "गहन हील पील व कैलस रिमूवल",
    "gu": "ગહન હીલ પીલ અને કેલસ રિમૂવલ"
  },
  "intercity vehicle car / bike carrier transport": {
    "hi": "अंतरशहरी कार / बाइक कैरियर ट्रांसपोर्ट",
    "gu": "ઇન્ટરસિટી કાર / બાઇક ટ્રાન્સપોર્ટ"
  },
  "interstate bike relocation with bubble wrap": {
    "hi": "बबल रैप सुरक्षित बाइक अंतरराज्यीय शिफ्टिंग",
    "gu": "બબલ રેપ સાથે બાઇક શિફ્ટિંગ"
  },
  "interview preparation": {
    "hi": "Interview Preparation",
    "gu": "Interview Preparation"
  },
  "inverter ac": {
    "hi": "इन्वर्टर एसी",
    "gu": "ઇન્વર્ટર એસી"
  },
  "inverter installation": {
    "hi": "इन्वर्टर इंस्टॉलेशन",
    "gu": "ઇન્વર્ટર ઇન્સ્ટોલેશન"
  },
  "ironing": {
    "hi": "Ironing",
    "gu": "Ironing"
  },
  "italian wood fired pizza pasta station": {
    "hi": "इटालियन वुड-फायर्ड पिज्जा और पास्ता स्टेशन",
    "gu": "ઇટાલિયન વુડ-ફાયર્ડ પિઝા અને પાસ્તા સ્ટેશન"
  },
  "italian wood-fired pizza & pasta station": {
    "hi": "इटालियन वुड-फायर्ड पिज्जा और पास्ता स्टेशन",
    "gu": "ઇટાલિયન વુડ-ફાયર્ડ પિઝા અને પાસ્તા સ્ટેશન"
  },
  "jain food": {
    "hi": "Jain Food",
    "gu": "Jain Food"
  },
  "jain pure vegetarian home cook": {
    "hi": "जैन शुद्ध शाकाहारी होम कुक",
    "gu": "જૈન શુદ્ધ શાકાહારી રસોઈયો"
  },
  "jee": {
    "hi": "JEE",
    "gu": "JEE"
  },
  "karaoke night sound & screen rental": {
    "hi": "कराओके साउंड व स्क्रीन रेंटल",
    "gu": "કરાઓકે સાઉન્ડ અને સ્ક્રીન રેન્ટલ"
  },
  "kathak & classical classical dance teacher": {
    "hi": "कथक व शास्त्रीय नृत्य शिक्षक",
    "gu": "કથક અને શાસ્ત્રીય નૃત્ય શિક્ષક"
  },
  "keratin hair smoothing treatment": {
    "hi": "केराटिन हेयर स्मूथिंग ट्रीटमेंट",
    "gu": "કેરાટિન હેર સ્મૂથિંગ ટ્રીટમેન્ટ"
  },
  "key duplicate making & locksmith doorstep pickup": {
    "hi": "डुप्लीकेट चाबी निर्माण व डोरस्टेप पिकअप",
    "gu": "ડુપ્લિકેટ ચાવી બનાવવી અને પિકઅપ"
  },
  "keyboard": {
    "hi": "Keyboard",
    "gu": "Keyboard"
  },
  "keyless touchscreen digital lock fitting": {
    "hi": "कीलेस टचस्क्रीन डिजिटल लॉक फिटिंग",
    "gu": "કીલેસ ટચસ્ક્રીન ડિજિટલ લોક"
  },
  "kids birthday party snack box catering": {
    "hi": "किड्स बर्थडे पार्टी स्नैक बॉक्स कैटरिंग",
    "gu": "કિડ્સ બર્થડે પાર્ટી સ્નેક બોક્સ કેટરિંગ"
  },
  "kids school tiffin & breakfast specialist": {
    "hi": "बच्चों का टिफिन व ब्रेकफास्ट विशेषज्ञ कुक",
    "gu": "બાળકો માટે ટિફિન અને નાસ્તો કુક"
  },
  "kids yoga & attention focus training": {
    "hi": "बच्चों का योग व ध्यान एकाग्रता",
    "gu": "બાળકો માટે યોગ અને એકાગ્રતા"
  },
  "king size mattress deep steam sanitization": {
    "hi": "किंग साइज गद्दे स्टीम सैनिटाइजेशन",
    "gu": "કિંગ સાઇઝ ગાદલા સ્ટીમ સેનિટાઇઝેશન"
  },
  "kitchen cabinet & appliance exterior wash": {
    "hi": "किचन कैबिनेट व उपकरण बाहरी सफाई",
    "gu": "રસોડા કેબિનેટ અને ઉપકરણ સફાઈ"
  },
  "kitchen chimney & hob deep degreasing": {
    "hi": "किचन चिमनी व हॉब डीप डीग्रीजिंग",
    "gu": "કિચન ચીમની અને હોબ ડીગ્રીઝિંગ"
  },
  "kitchen cleaning": {
    "hi": "किचन सफाई",
    "gu": "રસોડું સફાઈ"
  },
  "kitchen countertop & wall tile steam clean": {
    "hi": "किचन काउंटरटॉप व दीवार टाइल स्टीम सफाई",
    "gu": "રસોડા કાઉન્ટરટોપ અને ટાઇલ સ્ટીમ સફાઈ"
  },
  "kitchen crockery & fragile china safe packing": {
    "hi": "किचन क्रॉकरी व नाजुक सामान सुरक्षित पैकिंग",
    "gu": "રસોડા ક્રોકરી અને નાજુક સામાન પેકિંગ"
  },
  "kitchen deep cleaning": {
    "hi": "Kitchen Deep सफाई",
    "gu": "Kitchen Deep સફાઈ"
  },
  "kitchen oil degreasing & cabinet deep clean": {
    "hi": "किचन तेल डीग्रीजिंग व कैबिनेट डीप क्लीन",
    "gu": "રસોડા તેલ ડીગ્રીઝિંગ અને કેબિનેટ ડીપ ક્લીન"
  },
  "knee osteoarthritis isometric strengthening": {
    "hi": "घुटने का दर्द व ऑस्टियोआर्थराइटिस फिजियो",
    "gu": "ઘૂંટણના દુખાવાની ફિઝિયોથેરાપી"
  },
  "korean facial": {
    "hi": "कोरियन फेशियल",
    "gu": "કોરિયન ફેશિયલ"
  },
  "kundalini chakra balancing & mantra meditation": {
    "hi": "कुंडलिनी चक्र संतुलन व ध्यान",
    "gu": "કુંડલિની ચક્ર સંતુલન અને ધ્યાન"
  },
  "laptop hardware repair & screen replacement": {
    "hi": "लैपटॉप हार्डवेयर रिपेयर व स्क्रीन बदलना",
    "gu": "લેપટોપ હાર્ડવેર રિપેર અને સ્ક્રીન બદલવી"
  },
  "laptop repair": {
    "hi": "Laptop मरम्मत",
    "gu": "Laptop રિપેરિંગ"
  },
  "laundry": {
    "hi": "Laundry",
    "gu": "Laundry"
  },
  "layered haircut, wash & blow dry": {
    "hi": "लेयर्ड हेयरकट, वॉश व ब्लो ड्राई",
    "gu": "લેયર્ડ હેરકટ, વોશ અને બ્લો ડ્રાય"
  },
  "leakage treatment": {
    "hi": "रिसाव (लीकेज) उपचार",
    "gu": "લિકેજ સારવાર"
  },
  "leash reactivity & outdoor pulling reset": {
    "hi": "डॉग लीश पुलिंग ट्रेनिंग",
    "gu": "ડોગ લીશ ટ્રેનિંગ"
  },
  "leather sofa conditioning & cream polish": {
    "hi": "लेदर सोफा कंडीशनिंग व क्रीम पॉलिश",
    "gu": "લેધર સોફા કન્ડિશનિંગ અને ક્રીમ પોલિશ"
  },
  "legal consultation": {
    "hi": "Legal परामर्श",
    "gu": "Legal સલાહ"
  },
  "light installation": {
    "hi": "लाइट व फिक्सचर इंस्टॉलेशन",
    "gu": "લાઇટ ઇન્સ્ટોલેશન"
  },
  "linkedin profile assistance": {
    "hi": "LinkedIn Profile सहायता",
    "gu": "LinkedIn Profile સહાય"
  },
  "live chaat & street food counter": {
    "hi": "लाइव चाट व स्ट्रीट फूड काउंटर",
    "gu": "લાઇવ ચાટ અને સ્ટ્રીટ ફૂડ કાઉન્ટર"
  },
  "live close-up table illusionist magician": {
    "hi": "क्लोज-अप जादूगर व इल्यूजन शो",
    "gu": "ક્લોઝ-અપ જાદુગર શો"
  },
  "live music": {
    "hi": "Live Music",
    "gu": "Live Music"
  },
  "living room deep cleaning": {
    "hi": "Living Room Deep सफाई",
    "gu": "Living Room Deep સફાઈ"
  },
  "living room furniture polish & clean": {
    "hi": "लिविंग रूम फर्नीचर पॉलिश व सफाई",
    "gu": "લિવિંગ રૂમ ફર્નિચર પોલિશ અને સફાઈ"
  },
  "local delivery": {
    "hi": "Local डिलीवरी",
    "gu": "Local ડિલિવરી"
  },
  "local errands": {
    "hi": "Local Errands",
    "gu": "Local Errands"
  },
  "local moving": {
    "hi": "Local Moving",
    "gu": "Local Moving"
  },
  "logo design": {
    "hi": "Logo डिजाइनिंग",
    "gu": "Logo ડિઝાઇનિંગ"
  },
  "long-lasting gel polish manicure": {
    "hi": "लॉन्ग-लास्टिंग जेल पॉलिश मेनिक्योर",
    "gu": "લોંગ-લાસ્ટિંગ જેલ પોલિશ મેનિક્યોર"
  },
  "lumbar spondylosis & sciatica lower back relief": {
    "hi": "कमर दर्द व साइटिका पेन रिलीफ थेरेपी",
    "gu": "કમરનો દુખાવો અને સાયટિકા રાહત થેરાપી"
  },
  "magician": {
    "hi": "Magician",
    "gu": "Magician"
  },
  "magnetic door & window open/close sensor setup": {
    "hi": "दरवाजा व खिड़की मैग्नेटिक सेंसर सेटअप",
    "gu": "દરવાજા અને બારી મેગ્નેટિક સેન્સર"
  },
  "maid": {
    "hi": "Maid",
    "gu": "Maid"
  },
  "manicure": {
    "hi": "मेनिक्योर",
    "gu": "મેનિક્યોર"
  },
  "marathon & endurance running coach": {
    "hi": "मैराथन व रनिंग एंड्योरेंस कोच",
    "gu": "મેરેથોન અને રનિંગ કોચ"
  },
  "market entry & competitor benchmarking strategy": {
    "hi": "मार्केट एंट्री व प्रतिस्पर्धी रणनीति",
    "gu": "માર્કેટ એન્ટ્રી સ્ટ્રેટેજી"
  },
  "martial arts": {
    "hi": "Martial Arts",
    "gu": "Martial Arts"
  },
  "maternity & newborn baby photoshoot": {
    "hi": "मैटरनिटी व न्यूबॉर्न बेबी फोटोशूट",
    "gu": "મેટર્નિટી અને નવજાત શિશુ ફોટોશૂટ"
  },
  "mathematics": {
    "hi": "Mathematics",
    "gu": "Mathematics"
  },
  "mattress & foam scrap disposal service": {
    "hi": "पुराने गद्दे व फोम कचरा निस्तारण",
    "gu": "જૂના ગાદલા અને ફોમ નિકાલ સેવા"
  },
  "mattress cleaning": {
    "hi": "गद्दे (मैट्रेस) सफाई",
    "gu": "ગાદલા (મેટ્રેસ) સફાઈ"
  },
  "mcb repair": {
    "hi": "एमसीबी रिपेयर व रिप्लेसमेंट",
    "gu": "MCB રિપેરિંગ અને બદલવું"
  },
  "medicated anti-tick & flea bath treatment": {
    "hi": "एंटी-टिक व फ्ली मेडिकेटेड बाथ",
    "gu": "એન્ટી-ટીક અને ચાંચડ બાથ"
  },
  "medicine pickup": {
    "hi": "Medicine Pickup",
    "gu": "Medicine Pickup"
  },
  "meditation": {
    "hi": "Meditation",
    "gu": "Meditation"
  },
  "men s haircut": {
    "hi": "पुरुषों का हेयरकट",
    "gu": "પુરુષોનું હેરકટ"
  },
  "men's classic haircut & wash": {
    "hi": "मेंस क्लासिक हेयरकट व वॉश",
    "gu": "મેન્સ ક્લાસિક હેરકટ અને વોશ"
  },
  "men's de-tan face cleanup": {
    "hi": "मेंस डी-टैन फेस क्लीनअप",
    "gu": "મેન્સ ડી-ટેન ફેસ ક્લીનઅપ"
  },
  "men's express manicure": {
    "hi": "मेंस एक्सप्रेस मेनिक्योर",
    "gu": "મેન્સ એક્સપ્રેસ મેનિક્યોર"
  },
  "men's express pedicure": {
    "hi": "मेंस एक्सप्रेस पेडीक्योर",
    "gu": "મેન્સ એક્સપ્રેસ પેડિક્યોર"
  },
  "men's global hair color (natural black/brown)": {
    "hi": "मेंस हेयर कलर (नेचुरल ब्लैक/ब्राउन)",
    "gu": "મેન્સ હેર કલર (નેચરલ બ્લેક/બ્રાઉન)"
  },
  "men's haircut": {
    "hi": "पुरुषों का हेयरकट",
    "gu": "પુરુષોનું હેરકટ"
  },
  "metal painting": {
    "hi": "मेटल व ग्रिल पेंटिंग",
    "gu": "ધાતુ અને ગ્રીલ પેઇન્ટિંગ"
  },
  "microwave repair": {
    "hi": "माइक्रोवेव रिपेयर",
    "gu": "માઇક્રોવેવ રિપેરિંગ"
  },
  "mid-level executive candidate sourcing & screening": {
    "hi": "एग्जीक्यूटिव उम्मीदवार हायरिंग व स्क्रीनिंग",
    "gu": "ઉમેદવાર સોર્સિંગ અને સ્ક્રીનિંગ"
  },
  "mindfulness meditation & breathwork coaching": {
    "hi": "माइंडफुलनेस मेडिटेशन व प्राणायाम",
    "gu": "માઇન્ડફુલનેસ મેડિટેશન અને પ્રાણાયામ"
  },
  "minor carpentry work": {
    "hi": "छोटा बढ़ई का काम",
    "gu": "નાનું સુથારીકામ"
  },
  "minor renovation": {
    "hi": "छोटा नवीनीकरण व सुधार",
    "gu": "નાનું નવીનીકરણ"
  },
  "monthly cook": {
    "hi": "Monthly Cook",
    "gu": "Monthly Cook"
  },
  "monthly full-time resident house cook": {
    "hi": "मासिक फुल-टाइम घरेलू कुक",
    "gu": "માસિક ફુલ-ટાઇમ રસોઈયો"
  },
  "mosquito & fly thermal fogging": {
    "hi": "मच्छर व मक्खी थर्मल फॉगिंग",
    "gu": "મચ્છર અને માખી થર્મલ ફોગિંગ"
  },
  "mosquito control": {
    "hi": "Mosquito Control",
    "gu": "Mosquito Control"
  },
  "motherboard micro-soldering & chipset repair": {
    "hi": "मदरबोर्ड माइक्रो-सोल्डरिंग व चिपसेट रिपेयर",
    "gu": "મધરબોર્ડ ચિપસેટ રિપેરિંગ"
  },
  "motorized smart curtain rod & motor setup": {
    "hi": "मोटराइज्ड स्मार्ट पर्दा रॉड सेटअप",
    "gu": "મોટરાઇઝ્ડ સ્માર્ટ પડદા રોડ સેટઅપ"
  },
  "move in cleaning": {
    "hi": "Move-in सफाई",
    "gu": "Move-in સફાઈ"
  },
  "move out cleaning": {
    "hi": "Move-out सफाई",
    "gu": "Move-out સફાઈ"
  },
  "move-in / move-out sanitize deep clean": {
    "hi": "मूव-इन / मूव-आउट सैनिटाइज डीप सफाई",
    "gu": "મૂવ-ઇન / મૂવ-આઉટ સેનિટાઇઝ ડીપ સફાઈ"
  },
  "move-in cleaning": {
    "hi": "Move-in सफाई",
    "gu": "Move-in સફાઈ"
  },
  "move-out cleaning": {
    "hi": "Move-out सफाई",
    "gu": "Move-out સફાઈ"
  },
  "multi-flat apartment intercom system setup": {
    "hi": "अपार्टमेंट इंटरकॉम सिस्टम सेटअप",
    "gu": "એપાર્ટમેન્ટ ઇન્ટરકોમ સિસ્ટમ સેટઅપ"
  },
  "multi-story tri-band mesh wi-fi installation": {
    "hi": "मेश वाई-फाई राउटर इंस्टॉलेशन",
    "gu": "મલ્ટિ-સ્ટોરી Mesh Wi-Fi સેટઅપ"
  },
  "nail art": {
    "hi": "नेल आर्ट व डिजाइन",
    "gu": "નેઇલ આર્ટ અને ડિઝાઇન"
  },
  "nail clipping": {
    "hi": "नाखून काटना",
    "gu": "નખ કાપવા"
  },
  "neet": {
    "hi": "NEET",
    "gu": "NEET"
  },
  "neet medical physics & chemistry coach": {
    "hi": "नीट मेडिकल फिजिक्स व केमिस्ट्री कोच",
    "gu": "NEET ફિઝિક્સ અને કેમિસ્ટ્રી કોચ"
  },
  "network troubleshooting": {
    "hi": "Network Troubleshooting",
    "gu": "Network Troubleshooting"
  },
  "non-disclosure agreement (nda) & vendor contract drafting": {
    "hi": "एनडीए व वेंडर अनुबंध ड्राफ्टिंग",
    "gu": "NDA અને કોન્ટ્રાક્ટ ડ્રાફ્ટિંગ"
  },
  "north indian meal home cook (daily 2 meals)": {
    "hi": "उत्तर भारतीय भोजन कुक (दैनिक 2 समय)",
    "gu": "ઉત્તર ભારતીય રસોઈયો (રોજના ૨ ભોજન)"
  },
  "notary documentation assistance": {
    "hi": "Notary/Documentation सहायता",
    "gu": "Notary/Documentation સહાય"
  },
  "notary/documentation assistance": {
    "hi": "Notary/Documentation सहायता",
    "gu": "Notary/Documentation સહાય"
  },
  "nutrition consultation": {
    "hi": "Nutrition परामर्श",
    "gu": "Nutrition સલાહ"
  },
  "o3+ anti-tan brightening facial": {
    "hi": "O3+ एंटी-टैन ब्राइटनिंग फेशियल",
    "gu": "O3+ એન્ટી-ટેન બ્રાઇટનિંગ ફેશિયલ"
  },
  "obedience & puppy basic behavioral training": {
    "hi": "पिल्ला बेसिक ओबिडियंस ट्रेनिंग",
    "gu": "પપી બેસિક ટ્રેનિંગ"
  },
  "obedience training": {
    "hi": "Obedience प्रशिक्षण",
    "gu": "Obedience તાલીમ"
  },
  "office furniture & desktop relocation shifting": {
    "hi": "ऑफिस फर्नीचर व कंप्यूटर शिफ्टिंग",
    "gu": "ઓફિસ ફર્નિચર અને કમ્પ્યુટર શિફ્ટિંગ"
  },
  "office shifting": {
    "hi": "Office Shifting",
    "gu": "Office Shifting"
  },
  "offline": {
    "hi": "Offline",
    "gu": "Offline"
  },
  "old wooden furniture scrapping & disposal": {
    "hi": "पुराना लकड़ी फर्नीचर स्क्रैप व निस्तारण",
    "gu": "જૂનું લાકડાનું ફર્નિચર ભંગાર નિકાલ"
  },
  "one time cook": {
    "hi": "One-Time Cook",
    "gu": "One-Time Cook"
  },
  "one-time cook": {
    "hi": "One-Time Cook",
    "gu": "One-Time Cook"
  },
  "online": {
    "hi": "Online",
    "gu": "Online"
  },
  "oral dental scaling & tartar scraping": {
    "hi": "पशु डेंटल स्केलिंग व टार्टर क्लीनिंग",
    "gu": "પશુ દાંતની સફાઈ"
  },
  "organic fruit bleach (face & neck)": {
    "hi": "ऑर्गेनिक फ्रूट ब्लीच (चेहरा व गर्दन)",
    "gu": "ઓર્ગેનિક ફ્રૂટ બ્લીચ (ચહેરો અને ગરદન)"
  },
  "organic herbal de-tan cleanup": {
    "hi": "ऑर्गेनिक हर्बल डी-टैन क्लीनअप",
    "gu": "ઓર્ગેનિક હર્બલ ડી-ટેન ક્લીનઅપ"
  },
  "orthopedic pet bed & harness fitment consultation": {
    "hi": "ऑर्थोपेडिक पेट बेड व हार्नेस कंसल्टेशन",
    "gu": "પેટ બેડ અને હાર્નેસ સલાહ"
  },
  "os installation": {
    "hi": "OS इंस्टॉलेशन",
    "gu": "OS ઇન્સ્ટોલેશન"
  },
  "other furniture cleaning": {
    "hi": "Other Furniture सफाई",
    "gu": "Other Furniture સફાઈ"
  },
  "other instruments": {
    "hi": "Other Instruments",
    "gu": "Other Instruments"
  },
  "outdoor weatherproof hd security camera fitting": {
    "hi": "आउटडोर वेदरप्रूफ एचडी कैमरा फिटिंग",
    "gu": "આઉટડોર HD સિક્યોરિટી કેમેરા ફિટિંગ"
  },
  "oxygen bleach & face radiance": {
    "hi": "ऑक्सीजन ब्लीच व फेस रेडिएंस",
    "gu": "ઓક્સિજન બ્લીચ અને ફેસ રેડિયન્સ"
  },
  "packing & unpacking": {
    "hi": "Packing & Unpacking",
    "gu": "Packing & Unpacking"
  },
  "packing unpacking": {
    "hi": "Packing & Unpacking",
    "gu": "Packing & Unpacking"
  },
  "parcel pickup": {
    "hi": "Parcel Pickup",
    "gu": "Parcel Pickup"
  },
  "part time cook": {
    "hi": "Part-Time Cook",
    "gu": "Part-Time Cook"
  },
  "part-time cook": {
    "hi": "Part-Time Cook",
    "gu": "Part-Time Cook"
  },
  "partial home cleaning": {
    "hi": "Partial Home सफाई",
    "gu": "Partial Home સફાઈ"
  },
  "party & special occasion festival chef": {
    "hi": "पार्टी व विशेष उत्सव शेफ",
    "gu": "પાર્ટી અને તહેવાર સ્પેશિયલ શેફ"
  },
  "party decoration": {
    "hi": "Party Decoration",
    "gu": "Party Decoration"
  },
  "party event cook": {
    "hi": "Party/Event Cook",
    "gu": "Party/Event Cook"
  },
  "party makeup": {
    "hi": "Party Makeup",
    "gu": "Party Makeup"
  },
  "party/event cook": {
    "hi": "Party/Event Cook",
    "gu": "Party/Event Cook"
  },
  "pastel balloon arch & backdrop styling": {
    "hi": "पेस्टल बैलून आर्क व बैकड्रॉप डेकोरेशन",
    "gu": "બલૂન આર્ક અને બેકડ્રોપ ડેકોરેશન"
  },
  "pawdicure & organic paw balm massage": {
    "hi": "पॉडिक्योर व ऑर्गेनिक पॉ बॉम मसाज",
    "gu": "પોડિક્યોર અને પો મસાજ"
  },
  "payroll processing & salary slip generation": {
    "hi": "पेरोल प्रोसेसिंग व सैलरी स्लिप निर्माण",
    "gu": "પેરોલ પ્રોસેસિંગ અને સેલેરી સ્લિપ"
  },
  "pcos & hormonal balance nutrition plan": {
    "hi": "पीसीओएस व हार्मोनल बैलेंस न्यूट्रिशन प्लान",
    "gu": "PCOS અને હોર્મોનલ ડાયેટ પ્લાન"
  },
  "pedicure": {
    "hi": "पेडीक्योर",
    "gu": "પેડિક્યોર"
  },
  "personal assistant": {
    "hi": "Personal Assistant",
    "gu": "Personal Assistant"
  },
  "personal capital gains tax computation (shares/property)": {
    "hi": "पूंजीगत लाभ (कैपिटल गेन) टैक्स गणना",
    "gu": "કેપિટલ ગેઇન્સ ટેક્સ ગણતરી"
  },
  "personal home gym fitness trainer (1-on-1)": {
    "hi": "पर्सनल होम जिम ट्रेनर (1-ऑन-1)",
    "gu": "પર્સનલ હોમ જિમ ટ્રેનર"
  },
  "personal trainer": {
    "hi": "Personal Trainer",
    "gu": "Personal Trainer"
  },
  "personal yoga": {
    "hi": "Personal Yoga",
    "gu": "Personal Yoga"
  },
  "pet boarding": {
    "hi": "Pet Boarding",
    "gu": "Pet Boarding"
  },
  "pet ear cleaning & hygiene sanitize pack": {
    "hi": "पेट ईयर क्लीनिंग व हाइजीन पैक",
    "gu": "પેટ ઇયર ક્લિનિંગ પેક"
  },
  "pet feeding": {
    "hi": "Pet Feeding",
    "gu": "Pet Feeding"
  },
  "pet food delivery & fresh meat subscription setup": {
    "hi": "पेट फूड डिलीवरी व फ्रेश मीट सब्सक्रिप्शन",
    "gu": "પેટ ફૂડ ડિલિવરી સબ્સ્ક્રિપ્શન"
  },
  "pet sitting": {
    "hi": "Pet Sitting",
    "gu": "Pet Sitting"
  },
  "pet walking & vet escort assistant": {
    "hi": "पेट वॉकिंग व पशु चिकित्सक एस्कॉर्ट",
    "gu": "પેટ વૉકિંગ અને વેટ એસ્કોર્ટ"
  },
  "pharmacy & prescription medicine pickup": {
    "hi": "दवा व मेडिकल पर्ची पिकअप सेवा",
    "gu": "દવાઓ લાવવાની સેવા"
  },
  "photo editing": {
    "hi": "Photo Editing",
    "gu": "Photo Editing"
  },
  "photoelectric beam perimeter security barrier": {
    "hi": "पेरीमीटर फोटोइलेक्ट्रिक बीम बैरियर",
    "gu": "ફોટોઇલેક્ટ્રિક બીમ સિક્યોરિટી બેરિયર"
  },
  "physics": {
    "hi": "Physics",
    "gu": "Physics"
  },
  "physiotherapy": {
    "hi": "Physiotherapy",
    "gu": "Physiotherapy"
  },
  "piano": {
    "hi": "Piano",
    "gu": "Piano"
  },
  "piano & electronic keyboard teacher": {
    "hi": "पियानो व इलेक्ट्रॉनिक कीबोर्ड शिक्षक",
    "gu": "પિયાનો અને કીબોર્ડ શિક્ષક"
  },
  "pipe installation": {
    "hi": "पाइप इंस्टॉलेशन",
    "gu": "પાઇપ ઇન્સ્ટોલેશન"
  },
  "pipe leakage repair": {
    "hi": "पाइप लीकेज रिपेयर",
    "gu": "પાઇપ લિકેજ રિપેરિંગ"
  },
  "point of sale (pos) billing software configuration": {
    "hi": "पीओएस बिलिंग सॉफ्टवेयर कॉन्फ़िगरेशन",
    "gu": "POS બિલિંગ સોફ્ટવેર કન્ફિગરેશન"
  },
  "portrait photography": {
    "hi": "Portrait फोटोग्राफी",
    "gu": "Portrait ફોટોગ્રાફી"
  },
  "posh act workplace harassment compliance training": {
    "hi": "पॉश (POSH) एक्ट कार्यस्थल अनुपालन ट्रेनिंग",
    "gu": "POSH એક્ટ કાર્યસ્થળ તાલીમ"
  },
  "post-pregnancy weight loss coach": {
    "hi": "प्रसवोत्तर वेट लॉस कोच",
    "gu": "ડિલિવરી પછી વજન ઘટાડવા માટેના કોચ"
  },
  "post-stroke neurological mobility home session": {
    "hi": "स्ट्रोक उपरांत न्यूरो मोबिलिटी फिजियोथेरेपी",
    "gu": "સ્ટ્રોક પછી ન્યુરોલોજીકલ ફિઝિયોથેરાપી"
  },
  "post-surgery wound dressing & suture removal": {
    "hi": "पशु सर्जरी उपरांत पट्टी व टांके हटाना",
    "gu": "સર્જરી પછી ડ્રેસિંગ અને ટાંકા કાપવા"
  },
  "power of attorney (poa) & affidavit legal preparation": {
    "hi": "पावर ऑफ अटॉर्नी (POA) व शपथ पत्र निर्माण",
    "gu": "પાવર ઓફ એટર્ની (POA) અને સોગંદનામું"
  },
  "power yoga core sculpt & sweat session": {
    "hi": "पावर योग कोर स्कल्प्ट सेशन",
    "gu": "પાવર યોગ સેશન"
  },
  "pre-wedding couple shoot package": {
    "hi": "प्री-वेडिंग कपल शूट पैकेज",
    "gu": "પ્રી-વેડિંગ કપલ શૂટ પેકેજ"
  },
  "pre-wedding engagement makeup": {
    "hi": "प्री-वेडिंग सगाई मेकअप",
    "gu": "પ્રી-વેડિંગ એન્ગેજમેન્ટ મેકઅપ"
  },
  "pre-wedding sangeet & reception planner": {
    "hi": "प्री-वेडिंग संगीत व रिसेप्शन प्लानर",
    "gu": "સંગીત અને રિસેપ્શન પ્લાનર"
  },
  "premium airbrush special event makeup": {
    "hi": "प्रीमियम एयरब्रश स्पेशल इवेंट मेकअप",
    "gu": "પ્રીમિયમ એરબ્રશ ઇવેન્ટ મેકઅપ"
  },
  "printer installation & wireless network sharing": {
    "hi": "प्रिंटर इंस्टॉलेशन व नेटवर्क शेयरिंग",
    "gu": "પ્રિન્ટર ઇન્સ્ટોલેશન અને નેટવર્ક શેરિંગ"
  },
  "private limited company registration package": {
    "hi": "प्राइवेट लिमिटेड कंपनी रजिस्ट्रेशन पैकेज",
    "gu": "પ્રાઇવેટ લિમિટેડ કંપની રજીસ્ટ્રેશન પેકેજ"
  },
  "product photography": {
    "hi": "Product फोटोग्राफी",
    "gu": "Product ફોટોગ્રાફી"
  },
  "promotional video": {
    "hi": "Promotional Video",
    "gu": "Promotional Video"
  },
  "public speaking": {
    "hi": "Public Speaking",
    "gu": "Public Speaking"
  },
  "punjabi food": {
    "hi": "Punjabi Food",
    "gu": "Punjabi Food"
  },
  "puppy potty & crate training intensive": {
    "hi": "पॉटी व क्रेट ट्रेनिंग",
    "gu": "પપી પોટી ટ્રેનિંગ"
  },
  "puppy training": {
    "hi": "Puppy प्रशिक्षण",
    "gu": "Puppy તાલીમ"
  },
  "ransomware encrypted file analysis & recovery": {
    "hi": "रैनसमवेयर एन्क्रिप्टेड फाइल रिकवरी",
    "gu": "રેન્સમવેર ફાઇલ એનાલિસિસ"
  },
  "real estate photography": {
    "hi": "Real Estate फोटोग्राफी",
    "gu": "Real Estate ફોટોગ્રાફી"
  },
  "recliner chair spot & stain scrub": {
    "hi": "रेक्लाइनर चेयर दाग सफाई व स्क्रब",
    "gu": "રિક્લાઇનર ચેર ડાઘ સફાઈ"
  },
  "recliner cleaning": {
    "hi": "Recliner सफाई",
    "gu": "Recliner સફાઈ"
  },
  "refrigerator repair": {
    "hi": "रेफ्रिजरेटर (फ्रिज) रिपेयर",
    "gu": "રેફ્રિજરેટર (ફ્રિજ) રિપેરિંગ"
  },
  "relaxation massage": {
    "hi": "रिलैक्सेशन मसाज",
    "gu": "રિલેક્સેશન મસાજ"
  },
  "renovation debris & rubble masonry clearance": {
    "hi": "कंस्ट्रक्शन मलबा व रिनोवेशन कचरा सफाई",
    "gu": "મકાન કાટમાળ અને કચરો સફાઈ"
  },
  "rental agreement & property e-stamping": {
    "hi": "रेंट एग्रीमेंट व ई-स्टाम्पिंग",
    "gu": "રેન્ટ એગ્રીમેન્ટ અને ઇ-સ્ટેમ્પિંગ"
  },
  "repair": {
    "hi": "मरम्मत सेवा",
    "gu": "રિપેરિંગ સેવા"
  },
  "restorative yin yoga for deep sleep & flexibility": {
    "hi": "यिन योग (गहरी नींद व लचीलेपन हेतु)",
    "gu": "યિન યોગ (ઊંડી ઊંઘ અને લવચીકતા માટે)"
  },
  "resume building": {
    "hi": "Resume Building",
    "gu": "Resume Building"
  },
  "resume writing": {
    "hi": "Resume राइटिंग",
    "gu": "Resume રાઇટિંગ"
  },
  "retail store same-day parcel dispatch": {
    "hi": "रिटेल स्टोर सेम-डे पार्सल डिलीवरी",
    "gu": "રિટેલ સ્ટોર સેમ-ડે પાર્સલ ડિસ્પેચ"
  },
  "rfid card keyless access lock installation": {
    "hi": "आरएफआईडी कार्ड कीलेस लॉक फिटिंग",
    "gu": "RFID કાર્ડ કીલેસ લોક ફિટિંગ"
  },
  "ro cleaning": {
    "hi": "आरओ सफाई व सर्विस",
    "gu": "RO સફાઈ અને સર્વિસ"
  },
  "ro service": {
    "hi": "आरओ सर्विस",
    "gu": "RO સર્વિસ"
  },
  "rodent trapping & entry sealing service": {
    "hi": "चूहा ट्रैपिंग व प्रवेश द्वार सीलिंग",
    "gu": "ઉંદર નિયંત્રણ અને સીલિંગ સેવા"
  },
  "room cleaning": {
    "hi": "कमरा सफाई",
    "gu": "રૂમ સફાઈ"
  },
  "room combinations": {
    "hi": "रूम कॉम्बिनेशन्स पेंटिंग",
    "gu": "રૂમ કોમ્બિનેશન પેઇન્ટિંગ"
  },
  "room painting": {
    "hi": "कमरा पेंटिंग",
    "gu": "રૂમ પેઇન્ટિંગ"
  },
  "router configuration": {
    "hi": "Router Configuration",
    "gu": "Router Configuration"
  },
  "royal queen pamper package": {
    "hi": "रॉयल क्वीन पैम्पर पैकेज",
    "gu": "રોયલ ક્વીન પેમ્પર પેકેજ"
  },
  "saree draping": {
    "hi": "Saree Draping",
    "gu": "Saree Draping"
  },
  "saree draping & hair styling combo": {
    "hi": "साड़ी ड्रेपिंग व हेयर स्टाइलिंग कॉम्बो",
    "gu": "સાડી ડ્રેપિંગ અને હેર સ્ટાઇલિંગ કોમ્બો"
  },
  "scalp detox & anti-dandruff spa": {
    "hi": "स्कैल्प डिटॉक्स व एंटी-डैंड्रफ स्पा",
    "gu": "સ્કેલ્પ ડિટોક્સ અને એન્ટી-ડેન્ડ્રફ સ્પા"
  },
  "science": {
    "hi": "Science",
    "gu": "Science"
  },
  "screen / display issue": {
    "hi": "स्क्रीन / डिस्प्ले समस्या",
    "gu": "સ્ક્રીન / ડિસ્પ્લે સમસ્યા"
  },
  "seafood & coastal recipe specialist": {
    "hi": "सीफूड व तटीय व्यंजन विशेषज्ञ शेफ",
    "gu": "સીફૂડ અને કોસ્ટલ સ્પેશિયલ શેફ"
  },
  "secure guest wi-fi & bandwidth limiting portal": {
    "hi": "गेस्ट वाई-फाई व बैंडविड्थ पोर्टल सेटअप",
    "gu": "ગેસ્ટ Wi-Fi પોર્ટલ સેટઅપ"
  },
  "security system setup": {
    "hi": "Security System सेटअप",
    "gu": "Security System સેટઅપ"
  },
  "senior citizen hospital escort helper": {
    "hi": "वरिष्ठ नागरिक अस्पताल एस्कॉर्ट सहायक",
    "gu": "વરિષ્ઠ નાગરિક હોસ્પિટલ સહાયક"
  },
  "senior pet arthritis joint evaluation & pain relief": {
    "hi": "सीनियर पेट आर्थराइटिस व दर्द निवारण",
    "gu": "પેટ સાંધાનો દુખાવો રાહત સારવાર"
  },
  "seo": {
    "hi": "SEO",
    "gu": "SEO"
  },
  "seo on-page optimization & schema markup": {
    "hi": "एसईओ ऑन-पेज ऑप्टिमाइजेशन व स्कीमा",
    "gu": "SEO ઓપ્ટિમાઇઝેશન"
  },
  "shaving": {
    "hi": "Shaving",
    "gu": "Shaving"
  },
  "shelf installation": {
    "hi": "शेल्फ इंस्टॉलेशन",
    "gu": "શેલ્ફ ઇન્સ્ટોલેશન"
  },
  "shopify e-commerce store launch consultation": {
    "hi": "शॉपिफाई ई-कॉमर्स स्टोर लॉन्च परामर्श",
    "gu": "Shopify સ્ટોર લોન્ચ કન્સલ્ટેશન"
  },
  "short circuit repair": {
    "hi": "शॉर्ट सर्किट रिपेयर",
    "gu": "શોર્ટ સર્કિટ રિપેરિંગ"
  },
  "short-form social media reels creator": {
    "hi": "सोशल मीडिया रील्स क्रिएटर",
    "gu": "સોશિયલ મીડિયા રીલ્સ ક્રિએટર"
  },
  "silent disco multi-channel headphone setup": {
    "hi": "साइलेंट डिस्को मल्टी-चैनल हेडफोन सेटअप",
    "gu": "સાઇલેન્ટ ડિસ્કો હેડફોન સેટઅપ"
  },
  "singer": {
    "hi": "Singer",
    "gu": "Singer"
  },
  "single bedroom deep dust & vacuum": {
    "hi": "सिंगल बेडरूम डीप डस्टिंग व वैक्यूम",
    "gu": "સિંગલ બેડરૂમ ડસ્ટિંગ અને વેક્યુમિંગ"
  },
  "single furniture item transport (sofa / bed / fridge)": {
    "hi": "एकल फर्नीचर परिवहन (सोफा / बेड / फ्रिज)",
    "gu": "સિંગલ ફર્નિચર આઇટમ ટ્રાન્સપોર્ટ"
  },
  "sink drain unclogging & anti-bacterial wash": {
    "hi": "सिंक ड्रेन अनक्लॉगिंग व एंटी-बैक्टीरियल वॉश",
    "gu": "સિંક ડ્રેન બ્લોકેજ સફાઈ અને વોશ"
  },
  "sink installation": {
    "hi": "सिंक इंस्टॉलेशन",
    "gu": "સિંક ઇન્સ્ટોલેશન"
  },
  "sink repair": {
    "hi": "सिंक रिपेयर",
    "gu": "સિંક રિપેરિંગ"
  },
  "skin treatment": {
    "hi": "Skin उपचार",
    "gu": "Skin સારવાર"
  },
  "small office network attached storage (nas) setup": {
    "hi": "ऑफिस नेटवर्क अटैच्ड स्टोरेज (NAS) सेटअप",
    "gu": "NAS સ્ટોરેજ સેટઅપ"
  },
  "smart camera installation": {
    "hi": "Smart Camera इंस्टॉलेशन",
    "gu": "Smart Camera ઇન્સ્ટોલેશન"
  },
  "smart device setup": {
    "hi": "Smart Device सेटअप",
    "gu": "Smart Device સેટઅપ"
  },
  "smart dimmer & rgb ambient lighting controller": {
    "hi": "स्मार्ट डिमर व आरजीबी लाइट कंट्रोलर",
    "gu": "સ્માર્ટ ડિમર અને RGB લાઇટિંગ કંટ્રોલર"
  },
  "smart doorbell installation": {
    "hi": "Smart Doorbell इंस्टॉलेशन",
    "gu": "Smart Doorbell ઇન્સ્ટોલેશન"
  },
  "smart home setup": {
    "hi": "Smart Home सेटअप",
    "gu": "Smart Home સેટઅપ"
  },
  "smart lighting installation": {
    "hi": "Smart Lighting इंस्टॉलेशन",
    "gu": "Smart Lighting ઇન્સ્ટોલેશન"
  },
  "smart lock battery replacement & diagnostics": {
    "hi": "स्मार्ट लॉक बैटरी व डायग्नोस्टिक्स",
    "gu": "સ્માર્ટ લોક બેટરી અને તપાસ"
  },
  "smart lock installation": {
    "hi": "Smart Lock इंस्टॉलेशन",
    "gu": "Smart Lock ઇન્સ્ટોલેશન"
  },
  "smart lock replacement": {
    "hi": "Smart Lock बदलना (रिप्लेसमेंट)",
    "gu": "Smart Lock રિપ્લેસમેન્ટ"
  },
  "smart lock setup": {
    "hi": "Smart Lock सेटअप",
    "gu": "Smart Lock સેટઅપ"
  },
  "smart lock troubleshooting": {
    "hi": "Smart Lock Troubleshooting",
    "gu": "Smart Lock Troubleshooting"
  },
  "smart lpg / natural gas leak detector fitting": {
    "hi": "स्मार्ट गैस रिसाव डिटेक्टर फिटिंग",
    "gu": "સ્માર્ટ ગેસ લિકેજ ડિટેક્ટર ફિટિંગ"
  },
  "smart motorized garage door controller fitting": {
    "hi": "स्मार्ट गैराज डोर कंट्रोलर फिटिंग",
    "gu": "સ્માર્ટ ગેરેજ ડોર કંટ્રોલર"
  },
  "smart sensor installation": {
    "hi": "Smart Sensor इंस्टॉलेशन",
    "gu": "Smart Sensor ઇન્સ્ટોલેશન"
  },
  "smart switch installation": {
    "hi": "Smart Switch इंस्टॉलेशन",
    "gu": "Smart Switch ઇન્સ્ટોલેશન"
  },
  "smart tv & soundbar home theater integration": {
    "hi": "स्मार्ट टीवी व साउंडबार होम थिएटर सेटअप",
    "gu": "સ્માર્ટ ટીવી અને સાઉન્ડબાર સેટઅપ"
  },
  "smart video doorbell & lock sync setup": {
    "hi": "स्मार्ट वीडियो डोरबेल व लॉक सिंक",
    "gu": "સ્માર્ટ વિડિયો ડોરબેલ અને લોક સિંક"
  },
  "smart water flood & pipe leak sensor setup": {
    "hi": "स्मार्ट वॉटर लीकेज सेंसर सेटअप",
    "gu": "સ્માર્ટ વોટર લિકેજ સેન્સર સેટઅપ"
  },
  "smart wi-fi digital thermostat installation": {
    "hi": "स्मार्ट डिजिटल थर्मोस्टेट इंस्टॉलेशन",
    "gu": "સ્માર્ટ ડિજિટલ થર્મોસ્ટેટ ઇન્સ્ટોલેશન"
  },
  "smart wi-fi switchboard retrofit fitting": {
    "hi": "स्मार्ट वाई-फाई स्विचबोर्ड रेट्रोफिट फिटिंग",
    "gu": "સ્માર્ટ Wi-Fi સ્વિચબોર્ડ ફિટિંગ"
  },
  "smartphone dead screen data extraction": {
    "hi": "डेड स्मार्टफोन स्क्रीन डेटा एक्सट्रैक्शन",
    "gu": "સ્માર્ટફોન ડેટા એક્સટ્રેક્શન"
  },
  "social media management": {
    "hi": "Social Media प्रबंधन",
    "gu": "Social Media સંચાલન"
  },
  "social media video": {
    "hi": "Social Media Video",
    "gu": "Social Media Video"
  },
  "social science": {
    "hi": "Social Science",
    "gu": "Social Science"
  },
  "socket repair": {
    "hi": "सॉकेट रिपेयर",
    "gu": "સોકેટ રિપેરિંગ"
  },
  "sofa cleaning": {
    "hi": "सोफा सफाई",
    "gu": "સોફા સફાઈ"
  },
  "soft glam party makeup": {
    "hi": "सॉफ्ट ग्लैम पार्टी मेकअप",
    "gu": "સોફ્ટ ગ્લેમ પાર્ટી મેકઅપ"
  },
  "software installation": {
    "hi": "Software इंस्टॉलेशन",
    "gu": "Software ઇન્સ્ટોલેશન"
  },
  "software license audit & cybersecurity scan": {
    "hi": "सॉफ्टवेयर ऑडिट व साइबर सुरक्षा स्कैन",
    "gu": "સાયબર સુરક્ષા સ્કેન"
  },
  "software troubleshooting": {
    "hi": "सॉफ्टवेयर समस्या निवारण",
    "gu": "સોફ્ટવેર સમસ્યા નિવારણ"
  },
  "solar pir motion security floodlight setup": {
    "hi": "सोलर मोशन सेंसर फ्लडलाइट सेटअप",
    "gu": "સોલર મોશન સેન્સર ફ્લડલાઇટ"
  },
  "south indian breakfast & meal cook": {
    "hi": "दक्षिण भारतीय नाश्ता व भोजन कुक",
    "gu": "દક્ષિણ ભારતીય નાસ્તો અને ભોજન કુક"
  },
  "south indian food": {
    "hi": "South Indian Food",
    "gu": "South Indian Food"
  },
  "spa hydrating & cuticle care manicure": {
    "hi": "स्पा हाइड्रेटिंग व क्यूटिकल केयर मेनिक्योर",
    "gu": "સ્પા હાઇડ્રેટિંગ અને ક્યુટિકલ કેર મેનિક્યોર"
  },
  "spa manicure": {
    "hi": "स्पा मेनिक्योर",
    "gu": "સ્પા મેનિક્યોર"
  },
  "spa pedicure": {
    "hi": "स्पा पेडीक्योर",
    "gu": "સ્પા પેડિક્યોર"
  },
  "spanish language conversational tutor": {
    "hi": "स्पेनिश भाषा कन्वर्सेशनल ट्यूटर",
    "gu": "સ્પેનિશ ભાષા ટ્યુટર"
  },
  "specialty cuisine cook": {
    "hi": "Specialty Cuisine Cook",
    "gu": "Specialty Cuisine Cook"
  },
  "split ac": {
    "hi": "स्प्लिट एसी",
    "gu": "સ્પ્લિટ એસી"
  },
  "spoken english": {
    "hi": "Spoken English",
    "gu": "Spoken English"
  },
  "spoken english & professional business communication": {
    "hi": "स्पोकन इंग्लिश व बिजनेस कम्युनिकेशन",
    "gu": "સ્પોકન ઇંગ્લિશ અને બિઝનેસ કોમ્યુનિકેશન"
  },
  "ssd upgrade & cloning (without data loss)": {
    "hi": "एसएसडी अपग्रेड व क्लोनिंग (बिना डेटा नुकसान)",
    "gu": "SSD અપગ્રેડ અને ક્લોનિંગ"
  },
  "standing in long queue assistant (rto/consulate)": {
    "hi": "लंबी कतार में खड़े रहने वाले सहायक",
    "gu": "લાંબી લાઇનમાં ઊભા રહેવા માટે સહાયક"
  },
  "startup pitch deck & financial modeling review": {
    "hi": "स्टार्टअप पिच डेक व वित्तीय समीक्षा",
    "gu": "સ્ટાર્ટઅપ પિચ ડેક રિવ્યુ"
  },
  "store room & attic declutter cleaning": {
    "hi": "स्टोर रूम व अटारी सफाई व व्यवस्था",
    "gu": "સ્ટોર રૂમ સફાઈ અને વ્યવસ્થા"
  },
  "strength training": {
    "hi": "Strength प्रशिक्षण",
    "gu": "Strength તાલીમ"
  },
  "studio / 1 rk compact shifting service": {
    "hi": "स्टूडियो / 1 आरके कॉम्पैक्ट शिफ्टिंग",
    "gu": "સ્ટુડિયો / ૧ RK કોમ્પેક્ટ શિફ્ટિંગ"
  },
  "swedish massage": {
    "hi": "स्वीडिश मसाज",
    "gu": "સ્વીડિશ મસાજ"
  },
  "swedish muscle relaxation": {
    "hi": "स्वीडिश मसल रिलैक्सेशन",
    "gu": "સ્વીડિશ મસલ રિલેક્સેશન"
  },
  "swedish muscle relaxation body massage": {
    "hi": "स्वीडिश मसल रिलैक्सेशन बॉडी मसाज",
    "gu": "સ્વીડિશ મસલ રિલેક્સેશન બોડી મસાજ"
  },
  "swedish muscle relaxation massage": {
    "hi": "स्वीडिश मसल रिलैक्सेशन मसाज",
    "gu": "સ્વીડિશ મસલ રિલેક્સેશન મસાજ"
  },
  "sweeping & mopping": {
    "hi": "Sweeping & Mopping",
    "gu": "Sweeping & Mopping"
  },
  "sweeping mopping": {
    "hi": "Sweeping & Mopping",
    "gu": "Sweeping & Mopping"
  },
  "swimming": {
    "hi": "Swimming",
    "gu": "Swimming"
  },
  "switch repair": {
    "hi": "स्विच रिपेयर",
    "gu": "સ્વિચ રિપેરિંગ"
  },
  "switchboard installation": {
    "hi": "स्विचबोर्ड इंस्टॉलेशन",
    "gu": "સ્વિચબોર્ડ ઇન્સ્ટોલેશન"
  },
  "tabla": {
    "hi": "Tabla",
    "gu": "Tabla"
  },
  "tap installation": {
    "hi": "नल (टैप) इंस्टॉलेशन",
    "gu": "નળ ઇન્સ્ટોલેશન"
  },
  "tap/faucet repair": {
    "hi": "नल / फॉसेट रिपेयर",
    "gu": "નળ રિપેરિંગ"
  },
  "tattoo artist & face painting for events": {
    "hi": "टैटू आर्टिस्ट व फेस पेंटिंग",
    "gu": "ટેટૂ આર્ટિસ્ટ અને ફેસ પેઇન્ટિંગ"
  },
  "tax filing": {
    "hi": "Tax Filing",
    "gu": "Tax Filing"
  },
  "tds quarterly return filing (form 24q / 26q)": {
    "hi": "टीडीएस त्रैमासिक रिटर्न फाइलिंग (24Q/26Q)",
    "gu": "TDS ત્રિમાસિક રિટર્ન ફાઇલિંગ"
  },
  "tennis": {
    "hi": "Tennis",
    "gu": "Tennis"
  },
  "tennis / badminton footwork & stroke coach": {
    "hi": "टेनिस / बैडमिंटन स्ट्रोक कोच",
    "gu": "ટેનિસ / બેડમિન્ટન કોચ"
  },
  "termite treatment": {
    "hi": "Termite उपचार",
    "gu": "Termite સારવાર"
  },
  "terrace & roof high-pressure wash": {
    "hi": "छत व टेरेस हाई-प्रेशर वॉश",
    "gu": "ધાબા અને ટેરેસ હાઇ-પ્રેશર વોશ"
  },
  "terrace waterproofing": {
    "hi": "छत वॉटरप्रूफिंग",
    "gu": "ધાબા વૉટરપ્રૂફિંગ"
  },
  "texture painting": {
    "hi": "टेक्सचर वॉल पेंटिंग",
    "gu": "ટેક્સચર વોલ પેઇન્ટિંગ"
  },
  "thai foot reflexology therapy": {
    "hi": "थाई फुट रिफ्लेक्सोलॉजी थेरेपी",
    "gu": "થાઈ ફૂટ રિફ્લેક્સિકોલોજી થેરાપી"
  },
  "thermal paste replacement & cooling fan clean": {
    "hi": "थर्मल पेस्ट रिप्लेसमेंट व फैन क्लीनिंग",
    "gu": "થર્મલ પેસ્ટ અને ફેન ક્લિનિંગ"
  },
  "threading": {
    "hi": "थ्रेडिंग",
    "gu": "થ્રેડિંગ"
  },
  "tile cleaning": {
    "hi": "Tile सफाई",
    "gu": "Tile સફાઈ"
  },
  "tile grouting": {
    "hi": "टाइल ग्राउटिंग व सीलिंग",
    "gu": "ટાઇલ ગ્રાઉટિંગ અને સીલિંગ"
  },
  "toilet installation": {
    "hi": "टॉयलेट इंस्टॉलेशन",
    "gu": "ટોયલેટ ઇન્સ્ટોલેશન"
  },
  "toilet repair": {
    "hi": "टॉयलेट रिपेयर",
    "gu": "ટોયલેટ રિપેરિંગ"
  },
  "trademark brand name & logo filing": {
    "hi": "ट्रेडमार्क ब्रांड नाम व लोगो फाइलिंग",
    "gu": "ટ્રેડમાર્ક બ્રાન્ડ નેમ અને લોગો ફાઇલિંગ"
  },
  "traditional ayurvedic potli therapy": {
    "hi": "पारंपरिक आयुर्वेदिक पोटली थेरेपी",
    "gu": "પરંપરાગત આયુર્વેદિક પોટલી થેરાપી"
  },
  "traditional fresh flower marigold stage decor": {
    "hi": "गेंदा फूल पारंपरिक स्टेज डेकोरेशन",
    "gu": "ગલગોટા ફૂલોની સ્ટેજ સજાવટ"
  },
  "traditional indian buffet catering (per head)": {
    "hi": "पारंपरिक भारतीय बुफे कैटरिंग",
    "gu": "પરંપરાગત ભારતીય બુફે કેટરિંગ"
  },
  "traditional indian sweet halwai": {
    "hi": "पारंपरिक भारतीय मिठाई हलवाई",
    "gu": "પરંપરાગત ભારતીય મીઠાઈ કંદોઈ"
  },
  "translation": {
    "hi": "Translation",
    "gu": "Translation"
  },
  "tv installation": {
    "hi": "टीवी इंस्टॉलेशन",
    "gu": "ટીવી ઇન્સ્ટોલેશન"
  },
  "tv mounting": {
    "hi": "टीवी वॉल माउंटिंग",
    "gu": "ટીવી વોલ માઉન્ટિંગ"
  },
  "tv repair": {
    "hi": "टीवी रिपेयर",
    "gu": "ટીવી રિપેરિંગ"
  },
  "two-hour express city document delivery": {
    "hi": "2-घंटे में एक्सप्रेस शहर दस्तावेज डिलीवरी",
    "gu": "૨-કલાકમાં એક્સપ્રેસ દસ્તાવેજ ડિલિવરી"
  },
  "two-wheeler covered city bike towing": {
    "hi": "टू-व्हीलर कवर्ड सिटी बाइक टोइंग",
    "gu": "ટૂ-વ્હીલર કવર્ડ સિટી બાઇક ટોઇંગ"
  },
  "ui ux design": {
    "hi": "UI/UX डिजाइनिंग",
    "gu": "UI/UX ડિઝાઇનિંગ"
  },
  "ui/ux design": {
    "hi": "UI/UX डिजाइनिंग",
    "gu": "UI/UX ડિઝાઇનિંગ"
  },
  "underarm tan removal & whitening pack": {
    "hi": "अंडरआर्म टैन रिमूवल व व्हाइटनिंग",
    "gu": "અંડરઆર્મ ટેન રિમૂવલ અને વ્હાઇટનિંગ"
  },
  "unfurnished full home painting": {
    "hi": "अनफर्निश्ड फुल होम पेंटिंग",
    "gu": "અનફર્निश्ड સંપૂર્ણ ઘર પેઇન્ટિંગ"
  },
  "upsc": {
    "hi": "UPSC",
    "gu": "UPSC"
  },
  "upsc civil services general studies mentor": {
    "hi": "यूपीएससी सिविल सेवा जीएस मेंटर",
    "gu": "UPSC સિવિલ સર્વિસિસ જનરલ સ્ટડીઝ મેન્ટર"
  },
  "vaccination": {
    "hi": "Vaccination",
    "gu": "Vaccination"
  },
  "vegetarian cook": {
    "hi": "Vegetarian Cook",
    "gu": "Vegetarian Cook"
  },
  "vehicle breakdown assistance": {
    "hi": "Vehicle Breakdown सहायता",
    "gu": "Vehicle Breakdown સહાય"
  },
  "veterinary consultation": {
    "hi": "Veterinary परामर्श",
    "gu": "Veterinary સલાહ"
  },
  "video doorbell installation": {
    "hi": "Video Doorbell इंस्टॉलेशन",
    "gu": "Video Doorbell ઇન્સ્ટોલેશન"
  },
  "video editing": {
    "hi": "Video Editing",
    "gu": "Video Editing"
  },
  "violin": {
    "hi": "Violin",
    "gu": "Violin"
  },
  "virtual assistant": {
    "hi": "Virtual Assistant",
    "gu": "Virtual Assistant"
  },
  "virus & malware removal deep clean": {
    "hi": "वायरस व मैलवेयर क्लीनिंग",
    "gu": "વાયરસ અને માલવેર ક્લિનિંગ"
  },
  "virus malware troubleshooting": {
    "hi": "Virus/Malware Troubleshooting",
    "gu": "Virus/Malware Troubleshooting"
  },
  "virus/malware troubleshooting": {
    "hi": "Virus/Malware Troubleshooting",
    "gu": "Virus/Malware Troubleshooting"
  },
  "vocal training": {
    "hi": "Vocal प्रशिक्षण",
    "gu": "Vocal તાલીમ"
  },
  "voice assistant hub integration (alexa / google)": {
    "hi": "वॉइस असिस्टेंट हब इंटीग्रेशन (एलेक्सा/गूगल)",
    "gu": "વોઇસ આસિસ્ટન્ટ હબ (Alexa / Google)"
  },
  "wall mounting": {
    "hi": "वॉल माउंटिंग फिटिंग",
    "gu": "વોલ માઉન્ટિંગ ફિટિંગ"
  },
  "wall painting": {
    "hi": "दीवार पेंटिंग",
    "gu": "દીવાલ પેઇન્ટિંગ"
  },
  "wall panel installation": {
    "hi": "वॉल पैनल इंस्टॉलेशन",
    "gu": "વોલ પેનલ ઇન્સ્ટોલેશન"
  },
  "wall waterproofing": {
    "hi": "दीवार वॉटरप्रूफिंग",
    "gu": "દીવાલ વૉટરપ્રૂફિંગ"
  },
  "wallpaper installation": {
    "hi": "वॉलपेपर इंस्टॉलेशन",
    "gu": "વોલપેપર ઇન્સ્ટોલેશન"
  },
  "washing machine repair": {
    "hi": "वाशिंग मशीन रिपेयर",
    "gu": "વોશિંગ મશીન રિપેરિંગ"
  },
  "water leakage detection": {
    "hi": "पानी रिसाव (लीकेज) जांच",
    "gu": "પાણી લિકેજ તપાસ"
  },
  "water tank installation": {
    "hi": "पानी की टंकी इंस्टॉलेशन",
    "gu": "પાણીની ટાંકી ઇન્સ્ટોલેશન"
  },
  "waxing": {
    "hi": "वैक्सिंग",
    "gu": "વેક્સિંગ"
  },
  "website development": {
    "hi": "वेबसाइट डेवलपमेंट",
    "gu": "વેબસાઇટ ડેવલપમેન્ટ"
  },
  "website speed optimization & core web vitals fix": {
    "hi": "वेबसाइट स्पीड ऑप्टिमाइजेशन",
    "gu": "વેબસાઇટ સ્પીડ ઓપ્ટિમાઇઝેશન"
  },
  "wedding decoration": {
    "hi": "Wedding Decoration",
    "gu": "Wedding Decoration"
  },
  "wedding photography": {
    "hi": "वेडिंग फोटोग्राफी",
    "gu": "વેડિંગ ફોટોગ્રાફી"
  },
  "wedding sangeet family group choreographer": {
    "hi": "वेडिंग संगीत फैमिली कोरियोग्राफर",
    "gu": "લગ્ન સંગીત કોરિયોગ્રાફર"
  },
  "wedding videography": {
    "hi": "वेडिंग वीडियोग्राफी",
    "gu": "વેડિંગ વિડિયોગ્રાફી"
  },
  "weight gain & muscle building coach": {
    "hi": "वेट गेन व मसल बिल्डिंग कोच",
    "gu": "વજન વધારવા અને મસલ બિલ્ડિંગ કોચ"
  },
  "weight loss boot camp session for couples": {
    "hi": "वेट लॉस बूटकैंप सेशन (कपल)",
    "gu": "વેઇટ લોસ બૂટકૅમ્પ સેશન"
  },
  "weight management": {
    "hi": "वजन प्रबंधन",
    "gu": "વજન વ્યવસ્થાપન"
  },
  "western dance": {
    "hi": "Western Dance",
    "gu": "Western Dance"
  },
  "western pop & playback singing coach": {
    "hi": "वेस्टर्न पॉप व प्लेबैक सिंगिंग कोच",
    "gu": "વેસ્ટર્ન પોપ અને પ્લેબેક સિંગિંગ કોચ"
  },
  "western singing": {
    "hi": "Western Singing",
    "gu": "Western Singing"
  },
  "wi fi setup": {
    "hi": "वाई-फाई सेटअप",
    "gu": "વાઇ-ફાઇ સેટઅપ"
  },
  "wi-fi router setup & mesh network expansion": {
    "hi": "वाई-फाई राउटर सेटअप व नेटवर्क विस्तार",
    "gu": "Wi-Fi રાઉટર સેટઅપ"
  },
  "wi-fi setup": {
    "hi": "वाई-फाई सेटअप",
    "gu": "વાઇ-ફાઇ સેટઅપ"
  },
  "window ac": {
    "hi": "विंडो एसी",
    "gu": "વિન્ડો એસી"
  },
  "windows / mac os format & reinstallation": {
    "hi": "विंडोज / मैक ओएस फॉर्मेट व रीइंस्टॉलेशन",
    "gu": "Windows / Mac OS ફોર્મેટ અને ઇન્સ્ટોલેશન"
  },
  "wireless motion sensor burglar alarm setup": {
    "hi": "वायरलेस मोशन सेंसर अलार्म सेटअप",
    "gu": "વાયરલેસ મોશન સેન્સર અલાર્મ"
  },
  "wiring repair": {
    "hi": "वायरिंग रिपेयर",
    "gu": "વાયરિંગ રિપેરિંગ"
  },
  "women s haircut": {
    "hi": "महिलाओं का हेयरकट",
    "gu": "મહિલાઓનું હેરકટ"
  },
  "women's haircut": {
    "hi": "महिलाओं का हेयरकट",
    "gu": "મહિલાઓનું હેરકટ"
  },
  "wood painting / polishing": {
    "hi": "लकड़ी पेंटिंग व पॉलिशिंग",
    "gu": "લાકડા પેઇન્ટિંગ અને પોલિશિંગ"
  },
  "wood polishing": {
    "hi": "लकड़ी पॉलिशिंग",
    "gu": "લાકડા પોલિશિંગ"
  },
  "wordpress business website setup & customization": {
    "hi": "वर्डप्रेस बिजनेस वेबसाइट सेटअप",
    "gu": "WordPress બિઝનેસ વેબસાઇટ સેટઅપ"
  },
  "workplace burnout & work-life balance therapy": {
    "hi": "वर्कप्लेस बर्नआउट व बैलेंस थेरेपी",
    "gu": "કામના તણાવ નિવારણ થેરાપી"
  },
  "zumba": {
    "hi": "ज़ुम्बा फिटनेस",
    "gu": "ઝુમ્બા ફિટનેસ"
  },
  "zumba & cardio dance workout trainer": {
    "hi": "ज़ुम्बा व कार्डियो डांस ट्रेनर",
    "gu": "ઝુમ્બા અને કાર્ડિયો ડાન્સ ટ્રેનર"
  },
};

export const FEATURE_TRANSLATIONS: Record<string, LangEntry> = {
  "100 satisfaction guarantee": {
    "hi": "100% संतुष्टि गारंटी",
    "gu": "૧૦૦% સંતોષ ગેરંટી"
  },
  "100% satisfaction guarantee": {
    "hi": "100% संतुष्टि गारंटी",
    "gu": "૧૦૦% સંતોષ ગેરંટી"
  },
  "12v battery jumpstart using heavy duty booster cables or battery pack": {
    "hi": "12V battery jumpstart using heavy-duty booster cables or battery pack",
    "gu": "12V battery jumpstart using heavy-duty booster cables or battery pack"
  },
  "12v battery jumpstart using heavy-duty booster cables or battery pack": {
    "hi": "12V battery jumpstart using heavy-duty booster cables or battery pack",
    "gu": "12V battery jumpstart using heavy-duty booster cables or battery pack"
  },
  "absorption verification": {
    "hi": "Absorption सत्यापन",
    "gu": "Absorption ચકાસણી"
  },
  "accent reduction": {
    "hi": "Accent reduction",
    "gu": "Accent reduction"
  },
  "accompaniment practice": {
    "hi": "Accompaniment practice",
    "gu": "Accompaniment practice"
  },
  "acid base titrations": {
    "hi": "Acid-base titrations",
    "gu": "Acid-base titrations"
  },
  "acid-base titrations": {
    "hi": "Acid-base titrations",
    "gu": "Acid-base titrations"
  },
  "activator mixing": {
    "hi": "Activator mixing",
    "gu": "Activator mixing"
  },
  "administrative support": {
    "hi": "Administrative support",
    "gu": "Administrative support"
  },
  "advanced cobweb removal": {
    "hi": "उन्नत (एडवांस्ड) मकड़ी के जाले हटाना",
    "gu": "અદ્યતન (એડવાન્સ્ડ) કરોળિયાના જાળા હટાવવા"
  },
  "advanced epsom salt mixing": {
    "hi": "उन्नत (एडवांस्ड) एप्सम सॉल्ट मिश्रण",
    "gu": "અદ્યતન (એડવાન્સ્ડ) એપ્સમ સોલ્ટ મિશ્રણ"
  },
  "advanced physics mechanics": {
    "hi": "उन्नत (एडवांस्ड) physics mechanics",
    "gu": "અદ્યતન (એડવાન્સ્ડ) physics mechanics"
  },
  "advanced pumice stone rubbing": {
    "hi": "उन्नत (एडवांस्ड) झांवा पत्थर (प्यूमिस स्टोन) से घिसाई",
    "gu": "અદ્યતન (એડવાન્સ્ડ) પ્યુમિસ સ્ટોન વડે સફાઈ"
  },
  "advanced room mapping": {
    "hi": "उन्नत (एडवांस्ड) room mapping",
    "gu": "અદ્યતન (એડવાન્સ્ડ) room mapping"
  },
  "advanced tool setup": {
    "hi": "उन्नत (एडवांस्ड) सैनिटाइज्ड टूल्स सेटअप",
    "gu": "અદ્યતન (એડવાન્સ્ડ) સેનિટાઇઝ્ડ સાધનો સેટઅપ"
  },
  "after hours and weekend relocation execution to prevent business downtime": {
    "hi": "After-hours and weekend relocation execution to prevent business downtime",
    "gu": "After-hours and weekend relocation execution to prevent business downtime"
  },
  "after-hours and weekend relocation execution to prevent business downtime": {
    "hi": "After-hours and weekend relocation execution to prevent business downtime",
    "gu": "After-hours and weekend relocation execution to prevent business downtime"
  },
  "aftershave application": {
    "hi": "Aftershave लगाना",
    "gu": "Aftershave લગાવવું"
  },
  "airbrush base": {
    "hi": "Airbrush base",
    "gu": "Airbrush base"
  },
  "algebraic manipulation": {
    "hi": "Algebraic manipulation",
    "gu": "Algebraic manipulation"
  },
  "algorithm design": {
    "hi": "Algorithm डिजाइनिंग",
    "gu": "Algorithm ડિઝાઇનિંગ"
  },
  "alloy wheel rim and spoke detailed cleaning": {
    "hi": "Alloy wheel rim and spoke detailed सफाई",
    "gu": "Alloy wheel rim and spoke detailed સફાઈ"
  },
  "aloe application": {
    "hi": "Aloe लगाना",
    "gu": "Aloe લગાવવું"
  },
  "aloe gel application": {
    "hi": "Aloe gel लगाना",
    "gu": "Aloe gel લગાવવું"
  },
  "aloe vera gel application": {
    "hi": "एलोवेरा जेल लगाना",
    "gu": "એલોવેરા જેલ લગાવવી"
  },
  "anatomy visualizations": {
    "hi": "Anatomy visualizations",
    "gu": "Anatomy visualizations"
  },
  "anchor bolt fitting": {
    "hi": "Anchor bolt फिटिंग",
    "gu": "Anchor bolt ફિટિંગ"
  },
  "anchor host specific detailing": {
    "hi": "एंकर व मंच संचालक विस्तृत कार्य",
    "gu": "એન્કર અને મંચ સંચાલક વિગતવાર સેવા"
  },
  "anchor/host specific detailing": {
    "hi": "एंकर व मंच संचालक विस्तृत कार्य",
    "gu": "એન્કર અને મંચ સંચાલક વિગતવાર સેવા"
  },
  "ankle massage": {
    "hi": "Ankle मालिश",
    "gu": "Ankle માલિશ"
  },
  "answer writing practice": {
    "hi": "Answer writing practice",
    "gu": "Answer writing practice"
  },
  "anti static bubble wrap protection for computer monitors and desktop towers": {
    "hi": "Anti-static bubble wrap protection for computer monitors and desktop towers",
    "gu": "Anti-static bubble wrap protection for computer monitors and desktop towers"
  },
  "anti-static bubble wrap protection for computer monitors and desktop towers": {
    "hi": "Anti-static bubble wrap protection for computer monitors and desktop towers",
    "gu": "Anti-static bubble wrap protection for computer monitors and desktop towers"
  },
  "appliance exterior cleaning": {
    "hi": "Appliance exterior सफाई",
    "gu": "Appliance exterior સફાઈ"
  },
  "appointment management": {
    "hi": "Appointment प्रबंधन",
    "gu": "Appointment સંચાલન"
  },
  "aptitude strengthening": {
    "hi": "Aptitude strengthening",
    "gu": "Aptitude strengthening"
  },
  "arch massage": {
    "hi": "पैर के तलवों की मालिश",
    "gu": "પગના તળિયાની માલિશ"
  },
  "arch symmetry verification": {
    "hi": "आर्च समरूपता सत्यापन",
    "gu": "આર્ચ સપ્રમાણતા ચકાસણી"
  },
  "area equipment setup": {
    "hi": "उपकरण सेटअप",
    "gu": "સાધન સેટઅપ"
  },
  "area marking": {
    "hi": "कार्य क्षेत्र अंकन",
    "gu": "કાર્ય વિસ્તાર માર્કિંગ"
  },
  "argumentative essays": {
    "hi": "Argumentative essays",
    "gu": "Argumentative essays"
  },
  "arpeggio exercises": {
    "hi": "Arpeggio exercises",
    "gu": "Arpeggio exercises"
  },
  "arpeggios": {
    "hi": "Arpeggios",
    "gu": "Arpeggios"
  },
  "assertion reasoning practice": {
    "hi": "Assertion-reasoning practice",
    "gu": "Assertion-reasoning practice"
  },
  "assertion-reasoning practice": {
    "hi": "Assertion-reasoning practice",
    "gu": "Assertion-reasoning practice"
  },
  "assistance navigating elevators and ground floor entryways": {
    "hi": "Assistance navigating elevators and ground-floor entryways",
    "gu": "Assistance navigating elevators and ground-floor entryways"
  },
  "assistance navigating elevators and ground-floor entryways": {
    "hi": "Assistance navigating elevators and ground-floor entryways",
    "gu": "Assistance navigating elevators and ground-floor entryways"
  },
  "atomic structure review": {
    "hi": "Atomic structure review",
    "gu": "Atomic structure review"
  },
  "audience engagement": {
    "hi": "Audience engagement",
    "gu": "Audience engagement"
  },
  "badminton specific detailing": {
    "hi": "बैडमिंटन कोचिंग विस्तृत कार्य",
    "gu": "બેડમિન્ટન કોચિંગ વિગતવાર સેવા"
  },
  "baking specific detailing": {
    "hi": "Baking विस्तृत कार्य",
    "gu": "Baking વિગતવાર સેવા"
  },
  "balance techniques": {
    "hi": "Balance techniques",
    "gu": "Balance techniques"
  },
  "band specific detailing": {
    "hi": "Band विस्तृत कार्य",
    "gu": "Band વિગતવાર સેવા"
  },
  "banking terminology": {
    "hi": "Banking terminology",
    "gu": "Banking terminology"
  },
  "barre chords": {
    "hi": "Barre chords",
    "gu": "Barre chords"
  },
  "barrier cream application": {
    "hi": "बैरियर क्रीम लगाना",
    "gu": "બેરિયર ક્રીમ લગાવવી"
  },
  "base coat application": {
    "hi": "Base coat लगाना",
    "gu": "Base coat લગાવવું"
  },
  "baseboard wiping": {
    "hi": "Baseboard पोंछना",
    "gu": "Baseboard લૂછવું"
  },
  "basic fuse battery terminal and wiring connection inspection": {
    "hi": "बुनियादी (बेसिक) fuse, battery terminal, and wiring connecti निरीक्षण",
    "gu": "મૂળભૂત (બેસિક) fuse, battery terminal, and wiring connecti નિરીક્ષણ"
  },
  "basic fuse, battery terminal, and wiring connection inspection": {
    "hi": "बुनियादी (बेसिक) fuse, battery terminal, and wiring connecti निरीक्षण",
    "gu": "મૂળભૂત (બેસિક) fuse, battery terminal, and wiring connecti નિરીક્ષણ"
  },
  "basic home veterinary services specific detailing": {
    "hi": "घर पर बुनियादी पशु चिकित्सा विस्तृत कार्य",
    "gu": "ઘરે પશુ ચિકિત્સા સેવા વિગતવાર સેવા"
  },
  "basic post cut blow dry styling": {
    "hi": "ब्लो ड्राई व स्टाइलिंग",
    "gu": "બ્લો ડ્રાય અને સ્ટાઇલિંગ"
  },
  "basketball specific detailing": {
    "hi": "बास्केटबॉल कोचिंग विस्तृत कार्य",
    "gu": "બાસ્કેટબોલ કોચિંગ વિગતવાર સેવા"
  },
  "bath & brush specific detailing": {
    "hi": "नहलाना व ब्रशिंग विस्तृत कार्य",
    "gu": "નવડાવવું અને બ્રશિંગ વિગતવાર સેવા"
  },
  "bath brush specific detailing": {
    "hi": "नहलाना व ब्रशिंग विस्तृत कार्य",
    "gu": "નવડાવવું અને બ્રશિંગ વિગતવાર સેવા"
  },
  "bathroom sanitization and grout cleaning": {
    "hi": "Bathroom sanitization and grout सफाई",
    "gu": "Bathroom sanitization and grout સફાઈ"
  },
  "bathroom tile brushing": {
    "hi": "Bathroom tile brushing",
    "gu": "Bathroom tile brushing"
  },
  "bathroom tile scrubbing": {
    "hi": "बाथरूम टाइल स्क्रबिंग",
    "gu": "બાથરૂમ ટાઇલ્સ સ્ક્રબિંગ"
  },
  "battery health check": {
    "hi": "Battery health जांच",
    "gu": "Battery health તપાસ"
  },
  "bayan modulation": {
    "hi": "Bayan modulation",
    "gu": "Bayan modulation"
  },
  "beard conditioning": {
    "hi": "दाढ़ी (बियर्ड) कंडीशनिंग",
    "gu": "દાઢી કન્ડિશનિંગ"
  },
  "beard length assessment": {
    "hi": "Beard length आकलन",
    "gu": "Beard length મૂલ્યાંકન"
  },
  "beat matching": {
    "hi": "Beat matching",
    "gu": "Beat matching"
  },
  "beat synchronization": {
    "hi": "Beat synchronization",
    "gu": "Beat synchronization"
  },
  "bedroom linen change (optional add-on)": {
    "hi": "Bedroom linen change (optional add-on)",
    "gu": "Bedroom linen change (optional add-on)"
  },
  "bedroom linen change optional add on": {
    "hi": "Bedroom linen change (optional add-on)",
    "gu": "Bedroom linen change (optional add-on)"
  },
  "behavioral training specific detailing": {
    "hi": "व्यवहार प्रशिक्षण विस्तृत कार्य",
    "gu": "વર્તણૂક તાલીમ વિગતવાર સેવા"
  },
  "bio diagram practice": {
    "hi": "Bio-diagram practice",
    "gu": "Bio-diagram practice"
  },
  "bio-diagram practice": {
    "hi": "Bio-diagram practice",
    "gu": "Bio-diagram practice"
  },
  "biological processes": {
    "hi": "Biological processes",
    "gu": "Biological processes"
  },
  "biology flashcards": {
    "hi": "Biology flashcards",
    "gu": "Biology flashcards"
  },
  "biometric lock installation specific detailing": {
    "hi": "बायोमेट्रिक लॉक इंस्टॉलेशन विस्तृत कार्य",
    "gu": "બાયોમેટ્રિક લોક ઇન્સ્ટોલેશન વિગતવાર સેવા"
  },
  "birthday photography specific detailing": {
    "hi": "बर्थडे फोटोग्राफी विस्तृत कार्य",
    "gu": "બર્થડે ફોટોગ્રાફી વિગતવાર સેવા"
  },
  "blackhead extraction": {
    "hi": "ब्लैकहेड्स हटाना",
    "gu": "બ્લેકહેડ્સ દૂર કરવા"
  },
  "bleach cream mixing": {
    "hi": "Bleach cream mixing",
    "gu": "Bleach cream mixing"
  },
  "blemish assessment": {
    "hi": "Blemish आकलन",
    "gu": "Blemish મૂલ્યાંકન"
  },
  "blow dry": {
    "hi": "ब्लो ड्राई फिनिश",
    "gu": "બ્લો ડ્રાય ફિનિશ"
  },
  "blow dry finish": {
    "hi": "ब्लो ड्राई फिनिश",
    "gu": "બ્લો ડ્રાય ફિનિશ"
  },
  "blow dry setting": {
    "hi": "Blow dry setting",
    "gu": "Blow dry setting"
  },
  "bluetooth module test": {
    "hi": "Bluetooth module test",
    "gu": "Bluetooth module test"
  },
  "body language optimization": {
    "hi": "Body language optimization",
    "gu": "Body language optimization"
  },
  "bol recitation": {
    "hi": "Bol recitation",
    "gu": "Bol recitation"
  },
  "bonding theories": {
    "hi": "Bonding theories",
    "gu": "Bonding theories"
  },
  "boolean algebra": {
    "hi": "Boolean algebra",
    "gu": "Boolean algebra"
  },
  "botany and zoology memorization": {
    "hi": "Botany and zoology memorization",
    "gu": "Botany and zoology memorization"
  },
  "botany fundamentals": {
    "hi": "Botany fundamentals",
    "gu": "Botany fundamentals"
  },
  "bowing techniques": {
    "hi": "Bowing techniques",
    "gu": "Bowing techniques"
  },
  "bracket compatibility check": {
    "hi": "Bracket compatibility जांच",
    "gu": "Bracket compatibility તપાસ"
  },
  "bracket leveling check": {
    "hi": "Bracket leveling जांच",
    "gu": "Bracket leveling તપાસ"
  },
  "bracket screw tightening": {
    "hi": "Bracket screw tightening",
    "gu": "Bracket screw tightening"
  },
  "breathing exercises": {
    "hi": "Breathing exercises",
    "gu": "Breathing exercises"
  },
  "breathing mindfulness specific detailing": {
    "hi": "Breathing/Mindfulness विस्तृत कार्य",
    "gu": "Breathing/Mindfulness વિગતવાર સેવા"
  },
  "breathing/mindfulness specific detailing": {
    "hi": "Breathing/Mindfulness विस्तृत कार्य",
    "gu": "Breathing/Mindfulness વિગતવાર સેવા"
  },
  "bridal makeup specific detailing": {
    "hi": "ब्राइडल मेकअप विस्तृत कार्य",
    "gu": "બ્રાઇડલ મેકઅપ વિગતવાર સેવા"
  },
  "cable routing": {
    "hi": "Cable routing",
    "gu": "Cable routing"
  },
  "calculus derivatives": {
    "hi": "Calculus derivatives",
    "gu": "Calculus derivatives"
  },
  "calendar scheduling": {
    "hi": "Calendar scheduling",
    "gu": "Calendar scheduling"
  },
  "calf massaging": {
    "hi": "पिंडली की मालिश",
    "gu": "પિંડીની માલિશ"
  },
  "call screening": {
    "hi": "Call screening",
    "gu": "Call screening"
  },
  "callus filing": {
    "hi": "Callus filing",
    "gu": "Callus filing"
  },
  "callus scrubbing": {
    "hi": "कैलस स्क्रबिंग",
    "gu": "કેલસ સ્ક્રબિંગ"
  },
  "caloric burn tracking": {
    "hi": "Caloric burn tracking",
    "gu": "Caloric burn tracking"
  },
  "camera coverage verification": {
    "hi": "Camera coverage सत्यापन",
    "gu": "Camera coverage ચકાસણી"
  },
  "cardio dance routines": {
    "hi": "Cardio dance routines",
    "gu": "Cardio dance routines"
  },
  "careful cargo handling for boxed goods and e commerce return items": {
    "hi": "Careful cargo handling for boxed goods and e-commerce return items",
    "gu": "Careful cargo handling for boxed goods and e-commerce return items"
  },
  "careful cargo handling for boxed goods and e-commerce return items": {
    "hi": "Careful cargo handling for boxed goods and e-commerce return items",
    "gu": "Careful cargo handling for boxed goods and e-commerce return items"
  },
  "careful handling of fresh produce pantry goods and packaged provisions": {
    "hi": "Careful handling of fresh produce, pantry goods, and packaged provisions",
    "gu": "Careful handling of fresh produce, pantry goods, and packaged provisions"
  },
  "careful handling of fresh produce, pantry goods, and packaged provisions": {
    "hi": "Careful handling of fresh produce, pantry goods, and packaged provisions",
    "gu": "Careful handling of fresh produce, pantry goods, and packaged provisions"
  },
  "careful transit handling for confidential business papers and envelopes": {
    "hi": "Careful transit handling for confidential business papers and envelopes",
    "gu": "Careful transit handling for confidential business papers and envelopes"
  },
  "careful unloading and placement at new local address": {
    "hi": "Careful unloading and placement at new local address",
    "gu": "Careful unloading and placement at new local address"
  },
  "careful unloading and placement in designated rooms at destination": {
    "hi": "Careful unloading and placement in designated rooms at destination",
    "gu": "Careful unloading and placement in designated rooms at destination"
  },
  "carpet vacuuming": {
    "hi": "कारपेट वैक्यूमिंग",
    "gu": "કાર્પેટ વેક્યુમિંગ"
  },
  "case study analysis": {
    "hi": "Case study analysis",
    "gu": "Case study analysis"
  },
  "casing screw tightening": {
    "hi": "Casing screw tightening",
    "gu": "Casing screw tightening"
  },
  "catering specific detailing": {
    "hi": "कैटरिंग सेवाएं विस्तृत कार्य",
    "gu": "કેટરિંગ સેવાઓ વિગતવાર સેવા"
  },
  "ceiling fan wiping": {
    "hi": "Ceiling fan पोंछना",
    "gu": "Ceiling fan લૂછવું"
  },
  "cellular structure analysis": {
    "hi": "Cellular structure analysis",
    "gu": "Cellular structure analysis"
  },
  "center waist pleat creation and tucking": {
    "hi": "Center waist pleat creation and tucking",
    "gu": "Center waist pleat creation and tucking"
  },
  "certified & background-verified specialists": {
    "hi": "प्रमाणित व बैकग्राउंड-सत्यापित विशेषज्ञ",
    "gu": "પ્રમાણિત અને બેકગ્રાઉન્ડ-ચકાસાયેલ નિષ્ણાતો"
  },
  "certified background verified specialists": {
    "hi": "प्रमाणित व बैकग्राउंड-सत्यापित विशेषज्ञ",
    "gu": "પ્રમાણિત અને બેકગ્રાઉન્ડ-ચકાસાયેલ નિષ્ણાતો"
  },
  "certified electrician": {
    "hi": "प्रमाणित इलेक्ट्रिशियन",
    "gu": "પ્રમાણિત ઇલેક્ટ્રિશિયન"
  },
  "chain and sprocket degreasing and grime removal": {
    "hi": "Chain and sprocket degreasing and grime हटाना",
    "gu": "Chain and sprocket degreasing and grime દૂર કરવું"
  },
  "cheek blush and soft highlighter": {
    "hi": "Cheek blush and soft highlighter",
    "gu": "Cheek blush and soft highlighter"
  },
  "cheek line shaping": {
    "hi": "Cheek line shaping",
    "gu": "Cheek line shaping"
  },
  "chemical equation balancing": {
    "hi": "Chemical equation संतुलन (बैलेंसिंग)",
    "gu": "Chemical equation બેલેન્સિંગ"
  },
  "chemistry formulas": {
    "hi": "Chemistry formulas",
    "gu": "Chemistry formulas"
  },
  "chimney cleaning specific detailing": {
    "hi": "किचन चिमनी सफाई विस्तृत कार्य",
    "gu": "કિચન ચીમની સફાઈ વિગતવાર સેવા"
  },
  "chin hair removal": {
    "hi": "ठोड़ी के बाल हटाना",
    "gu": "દાઢીના અનિચ્છનીય વાળ હટાવવા"
  },
  "chord inversions": {
    "hi": "Chord inversions",
    "gu": "Chord inversions"
  },
  "chord play": {
    "hi": "Chord play",
    "gu": "Chord play"
  },
  "chord progressions": {
    "hi": "Chord progressions",
    "gu": "Chord progressions"
  },
  "choreography memorization": {
    "hi": "Choreography memorization",
    "gu": "Choreography memorization"
  },
  "choreography synchronization review": {
    "hi": "Choreography synchronization review",
    "gu": "Choreography synchronization review"
  },
  "circuit solving": {
    "hi": "Circuit solving",
    "gu": "Circuit solving"
  },
  "circular massage strokes": {
    "hi": "Circular massage strokes",
    "gu": "Circular massage strokes"
  },
  "circular movement drills": {
    "hi": "Circular movement drills",
    "gu": "Circular movement drills"
  },
  "circular scrubbing strokes": {
    "hi": "गोलाकार स्क्रबिंग",
    "gu": "ગોળાકાર સ્ક્રબિંગ"
  },
  "civics and constitution": {
    "hi": "Civics and constitution",
    "gu": "Civics and constitution"
  },
  "clapping synchronization": {
    "hi": "Clapping synchronization",
    "gu": "Clapping synchronization"
  },
  "classification practice": {
    "hi": "Classification practice",
    "gu": "Classification practice"
  },
  "cleaning coverage verification": {
    "hi": "Cleaning coverage सत्यापन",
    "gu": "Cleaning coverage ચકાસણી"
  },
  "cleanliness stability check": {
    "hi": "Cleanliness stability जांच",
    "gu": "Cleanliness stability તપાસ"
  },
  "clear room specific labeling and box content categorization": {
    "hi": "Clear room-specific labeling and box content categorization",
    "gu": "Clear room-specific labeling and box content categorization"
  },
  "clear room-specific labeling and box content categorization": {
    "hi": "Clear room-specific labeling and box content categorization",
    "gu": "Clear room-specific labeling and box content categorization"
  },
  "clerical aptitude": {
    "hi": "Clerical aptitude",
    "gu": "Clerical aptitude"
  },
  "client coordination": {
    "hi": "Client coordination",
    "gu": "Client coordination"
  },
  "client requirement review": {
    "hi": "Client requirement review",
    "gu": "Client requirement review"
  },
  "client satisfaction review": {
    "hi": "Client satisfaction review",
    "gu": "Client satisfaction review"
  },
  "client walkthrough": {
    "hi": "ग्राहक वॉकथ्रू (कार्य समीक्षा)",
    "gu": "ક્લાયન્ટ વોકથ્રૂ (કાર્ય નિરીક્ષણ)"
  },
  "clipper blending": {
    "hi": "Clipper blending",
    "gu": "Clipper blending"
  },
  "cobweb removal": {
    "hi": "मकड़ी के जाले हटाना",
    "gu": "કરોળિયાના જાળા હટાવવા"
  },
  "code optimization": {
    "hi": "Code optimization",
    "gu": "Code optimization"
  },
  "coil cleaning": {
    "hi": "कॉइल सफाई",
    "gu": "કોઈલ સફાઈ"
  },
  "cold rinse": {
    "hi": "ठंडे पानी से धुलाई",
    "gu": "ઠંડા પાણીથી ધોવું"
  },
  "cold towel wipe": {
    "hi": "Cold towel wipe",
    "gu": "Cold towel wipe"
  },
  "cold water rinse": {
    "hi": "ठंडे पानी से धुलाई",
    "gu": "ઠંડા પાણીથી ધોવું"
  },
  "color application": {
    "hi": "Color लगाना",
    "gu": "Color લગાવવું"
  },
  "color matching": {
    "hi": "Color matching",
    "gu": "Color matching"
  },
  "color sealing": {
    "hi": "Color sealing",
    "gu": "Color sealing"
  },
  "color uniformity check": {
    "hi": "Color uniformity जांच",
    "gu": "Color uniformity તપાસ"
  },
  "color washing": {
    "hi": "Color washing",
    "gu": "Color washing"
  },
  "comb styling": {
    "hi": "Comb स्टाइलिंग",
    "gu": "Comb સ્ટાઇલિંગ"
  },
  "commercial office relocation for workstations chairs and filing units": {
    "hi": "Commercial office relocation for workstations, chairs, and filing units",
    "gu": "Commercial office relocation for workstations, chairs, and filing units"
  },
  "commercial office relocation for workstations, chairs, and filing units": {
    "hi": "Commercial office relocation for workstations, chairs, and filing units",
    "gu": "Commercial office relocation for workstations, chairs, and filing units"
  },
  "communication follow up": {
    "hi": "Communication follow-up",
    "gu": "Communication follow-up"
  },
  "communication follow-up": {
    "hi": "Communication follow-up",
    "gu": "Communication follow-up"
  },
  "complete cabin interior vacuuming (carpets, seats, boot)": {
    "hi": "Complete cabin interior vacuuming (carpets, seats, boot)",
    "gu": "Complete cabin interior vacuuming (carpets, seats, boot)"
  },
  "complete cabin interior vacuuming carpets seats boot": {
    "hi": "Complete cabin interior vacuuming (carpets, seats, boot)",
    "gu": "Complete cabin interior vacuuming (carpets, seats, boot)"
  },
  "complete facial makeup (prep, primer, foundation, concealer, powder)": {
    "hi": "Complete facial makeup (prep, primer, foundation, concealer, powder)",
    "gu": "Complete facial makeup (prep, primer, foundation, concealer, powder)"
  },
  "complete facial makeup prep primer foundation concealer powder": {
    "hi": "Complete facial makeup (prep, primer, foundation, concealer, powder)",
    "gu": "Complete facial makeup (prep, primer, foundation, concealer, powder)"
  },
  "complex calculus practice": {
    "hi": "Complex calculus practice",
    "gu": "Complex calculus practice"
  },
  "compliance checking": {
    "hi": "Compliance checking",
    "gu": "Compliance checking"
  },
  "comprehensive loading transport and unloading of household belongings": {
    "hi": "Comprehensive loading, transport, and unloading of household belongings",
    "gu": "Comprehensive loading, transport, and unloading of household belongings"
  },
  "comprehensive loading, transport, and unloading of household belongings": {
    "hi": "Comprehensive loading, transport, and unloading of household belongings",
    "gu": "Comprehensive loading, transport, and unloading of household belongings"
  },
  "computer aptitude": {
    "hi": "Computer aptitude",
    "gu": "Computer aptitude"
  },
  "concept bridging": {
    "hi": "Concept bridging",
    "gu": "Concept bridging"
  },
  "concept mapping": {
    "hi": "Concept mapping",
    "gu": "Concept mapping"
  },
  "concept revision": {
    "hi": "Concept revision",
    "gu": "Concept revision"
  },
  "conceptual depth building": {
    "hi": "Conceptual depth building",
    "gu": "Conceptual depth building"
  },
  "conditioning": {
    "hi": "डीप कंडीशनिंग",
    "gu": "ડીપ કન્ડિશનિંગ"
  },
  "confidentiality maintenance": {
    "hi": "Confidentiality रखरखाव",
    "gu": "Confidentiality જાળવણી"
  },
  "contact list maintenance": {
    "hi": "Contact list रखरखाव",
    "gu": "Contact list જાળવણી"
  },
  "conversational practice": {
    "hi": "Conversational practice",
    "gu": "Conversational practice"
  },
  "cool down breathing": {
    "hi": "Cool-down breathing",
    "gu": "Cool-down breathing"
  },
  "cool down period": {
    "hi": "कूल डाउन समय",
    "gu": "કૂલ ડાઉન સમય"
  },
  "cool down stretches": {
    "hi": "Cool-down stretches",
    "gu": "Cool-down stretches"
  },
  "cool-down breathing": {
    "hi": "Cool-down breathing",
    "gu": "Cool-down breathing"
  },
  "cool-down stretches": {
    "hi": "Cool-down stretches",
    "gu": "Cool-down stretches"
  },
  "cooling massage": {
    "hi": "कूलिंग मसाज",
    "gu": "કૂલિંગ મસાજ"
  },
  "cooling performance test": {
    "hi": "कूलिंग परफॉर्मेंस टेस्ट",
    "gu": "કૂલિંગ પરફોર્મન્સ ટેસ્ટ"
  },
  "coordinate geometry": {
    "hi": "Coordinate geometry",
    "gu": "Coordinate geometry"
  },
  "core engagement": {
    "hi": "Core engagement",
    "gu": "Core engagement"
  },
  "core engineering concepts": {
    "hi": "Core engineering concepts",
    "gu": "Core engineering concepts"
  },
  "corner guard protection for fragile edges and glass tabletops": {
    "hi": "Corner guard protection for fragile edges and glass tabletops",
    "gu": "Corner guard protection for fragile edges and glass tabletops"
  },
  "corporate video specific detailing": {
    "hi": "कॉर्पोरेट वीडियो विस्तृत कार्य",
    "gu": "કોર્પોરેટ વિડિયો વિગતવાર સેવા"
  },
  "cream removal": {
    "hi": "क्रीम हटाना",
    "gu": "ક્રીમ દૂર કરવું"
  },
  "creative writing": {
    "hi": "Creative राइटिंग",
    "gu": "Creative રાઇટિંગ"
  },
  "cricket specific detailing": {
    "hi": "क्रिकेट कोचिंग विस्तृत कार्य",
    "gu": "ક્રિકેટ કોચિંગ વિગતવાર સેવા"
  },
  "crown layering": {
    "hi": "Crown layering",
    "gu": "Crown layering"
  },
  "cultural context understanding": {
    "hi": "Cultural context understanding",
    "gu": "Cultural context understanding"
  },
  "cultural history overview": {
    "hi": "Cultural history overview",
    "gu": "Cultural history overview"
  },
  "current affairs analysis": {
    "hi": "Current affairs analysis",
    "gu": "Current affairs analysis"
  },
  "current events": {
    "hi": "Current events",
    "gu": "Current events"
  },
  "curtain dusting": {
    "hi": "Curtain dusting",
    "gu": "Curtain dusting"
  },
  "custom eyeshadow artistry with subtle shimmer or glam accents": {
    "hi": "Custom eyeshadow artistry with subtle shimmer or glam accents",
    "gu": "Custom eyeshadow artistry with subtle shimmer or glam accents"
  },
  "cut off analysis": {
    "hi": "Cut-off analysis",
    "gu": "Cut-off analysis"
  },
  "cut-off analysis": {
    "hi": "Cut-off analysis",
    "gu": "Cut-off analysis"
  },
  "cuticle care": {
    "hi": "क्यूटिकल देखभाल व पोषण",
    "gu": "ક્યુટિકલ સંભાળ"
  },
  "cuticle health check": {
    "hi": "Cuticle health जांच",
    "gu": "Cuticle health તપાસ"
  },
  "cuticle hydration": {
    "hi": "क्यूटिकल हाइड्रेशन",
    "gu": "ક્યુટિકલ હાઇડ્રેશન"
  },
  "cuticle oil application": {
    "hi": "क्यूटिकल ऑयल लगाना",
    "gu": "ક્યુટિકલ ઓઇલ લગાવવું"
  },
  "cuticle pushing": {
    "hi": "क्यूटिकल पुशिंग व शेपिंग",
    "gu": "ક્યુટિકલ પુશિંગ અને શેપિંગ"
  },
  "cuticle smoothing": {
    "hi": "Cuticle smoothing",
    "gu": "Cuticle smoothing"
  },
  "cuticle softening": {
    "hi": "Cuticle softening",
    "gu": "Cuticle softening"
  },
  "cuticle trimming": {
    "hi": "Cuticle trimming",
    "gu": "Cuticle trimming"
  },
  "cymbal crashes": {
    "hi": "Cymbal crashes",
    "gu": "Cymbal crashes"
  },
  "daily briefing setup": {
    "hi": "Daily briefing सेटअप",
    "gu": "Daily briefing સેટઅપ"
  },
  "daily cook specific detailing": {
    "hi": "दैनिक कुक (रसोइया) विस्तृत कार्य",
    "gu": "દૈનિક રસોઇયો વિગતવાર સેવા"
  },
  "dancer specific detailing": {
    "hi": "Dancer विस्तृत कार्य",
    "gu": "Dancer વિગતવાર સેવા"
  },
  "dandiya stick handling": {
    "hi": "Dandiya stick handling",
    "gu": "Dandiya stick handling"
  },
  "dashboard console and door panel damp wipe down": {
    "hi": "Dashboard, console, and door panel damp wipe-down",
    "gu": "Dashboard, console, and door panel damp wipe-down"
  },
  "dashboard, console, and door panel damp wipe-down": {
    "hi": "Dashboard, console, and door panel damp wipe-down",
    "gu": "Dashboard, console, and door panel damp wipe-down"
  },
  "data analysis": {
    "hi": "Data analysis",
    "gu": "Data analysis"
  },
  "data backup initiation": {
    "hi": "Data backup initiation",
    "gu": "Data backup initiation"
  },
  "data entry processing": {
    "hi": "Data entry processing",
    "gu": "Data entry processing"
  },
  "data interpretation charts": {
    "hi": "Data interpretation charts",
    "gu": "Data interpretation charts"
  },
  "data structure implementation": {
    "hi": "Data structure implementation",
    "gu": "Data structure implementation"
  },
  "data sufficiency": {
    "hi": "Data sufficiency",
    "gu": "Data sufficiency"
  },
  "database querying": {
    "hi": "Database querying",
    "gu": "Database querying"
  },
  "date memorization techniques": {
    "hi": "Date memorization techniques",
    "gu": "Date memorization techniques"
  },
  "dayan clarity": {
    "hi": "Dayan clarity",
    "gu": "Dayan clarity"
  },
  "dead skin callus care": {
    "hi": "डेड स्किन व कैलस हटाना",
    "gu": "ડેડ સ્કિન અને કેલસ દૂર કરવા"
  },
  "dead skin removal": {
    "hi": "मृत त्वचा हटाना",
    "gu": "મૃત ત્વચા દૂર કરવી"
  },
  "dead skin/callus care": {
    "hi": "डेड स्किन व कैलस हटाना",
    "gu": "ડેડ સ્કિન અને કેલસ દૂર કરવા"
  },
  "debris cleanup": {
    "hi": "Debris cleanup",
    "gu": "Debris cleanup"
  },
  "decision making scenarios": {
    "hi": "Decision making scenarios",
    "gu": "Decision making scenarios"
  },
  "dedicated intra city utility vehicle transport": {
    "hi": "Dedicated intra-city utility vehicle transport",
    "gu": "Dedicated intra-city utility vehicle transport"
  },
  "dedicated intra-city utility vehicle transport": {
    "hi": "Dedicated intra-city utility vehicle transport",
    "gu": "Dedicated intra-city utility vehicle transport"
  },
  "dedicated licensed driver for vehicle transit to and from service center": {
    "hi": "Dedicated licensed driver for vehicle transit to and from service center",
    "gu": "Dedicated licensed driver for vehicle transit to and from service center"
  },
  "dedicated transport assistance for standalone furniture pieces": {
    "hi": "Dedicated transport assistance for standalone furniture pieces",
    "gu": "Dedicated transport assistance for standalone furniture pieces"
  },
  "deep cleansing massage": {
    "hi": "Deep cleansing मालिश",
    "gu": "Deep cleansing માલિશ"
  },
  "deep conditioning": {
    "hi": "डीप कंडीशनिंग",
    "gu": "ડીપ કન્ડિશનિંગ"
  },
  "deep equipment stain assessment": {
    "hi": "Deep equipment stain आकलन",
    "gu": "Deep equipment stain મૂલ્યાંકન"
  },
  "deep foot exfoliation": {
    "hi": "गहन फुट एक्सफोलिएशन",
    "gu": "ગહન ફૂટ એક્સફોલિએશન"
  },
  "deep stain spot treatment": {
    "hi": "Deep stain spot उपचार",
    "gu": "Deep stain spot સારવાર"
  },
  "deep stain spot-treatment": {
    "hi": "Deep stain spot उपचार",
    "gu": "Deep stain spot સારવાર"
  },
  "deep tissue massage specific detailing": {
    "hi": "डीप टिशू मसाज विस्तृत कार्य",
    "gu": "ડીપ ટિશ્યુ મસાજ વિગતવાર સેવા"
  },
  "deep tissue scalp techniques": {
    "hi": "Deep tissue scalp techniques",
    "gu": "Deep tissue scalp techniques"
  },
  "defined lip color application": {
    "hi": "Defined lip color लगाना",
    "gu": "Defined lip color લગાવવું"
  },
  "demographic data interpretation": {
    "hi": "Demographic data interpretation",
    "gu": "Demographic data interpretation"
  },
  "detail oriented processing": {
    "hi": "Detail-oriented processing",
    "gu": "Detail-oriented processing"
  },
  "detail-oriented processing": {
    "hi": "Detail-oriented processing",
    "gu": "Detail-oriented processing"
  },
  "detailed 4 bhk cleaning execution": {
    "hi": "Detailed 4 bhk+ cleaning execution",
    "gu": "Detailed 4 bhk+ cleaning execution"
  },
  "detailed 4 bhk+ cleaning execution": {
    "hi": "Detailed 4 bhk+ cleaning execution",
    "gu": "Detailed 4 bhk+ cleaning execution"
  },
  "detailed cleaning of wheel rims arches and tyres": {
    "hi": "Detailed cleaning of wheel rims, arches, and tyres",
    "gu": "Detailed cleaning of wheel rims, arches, and tyres"
  },
  "detailed cleaning of wheel rims, arches, and tyres": {
    "hi": "Detailed cleaning of wheel rims, arches, and tyres",
    "gu": "Detailed cleaning of wheel rims, arches, and tyres"
  },
  "detailed digital lock installation execution": {
    "hi": "Detailed digital lock installation execution",
    "gu": "Detailed digital lock installation execution"
  },
  "detailed swimming execution": {
    "hi": "Detailed swimming execution",
    "gu": "Detailed swimming execution"
  },
  "developer mixing": {
    "hi": "Developer mixing",
    "gu": "Developer mixing"
  },
  "diagnostic step 10": {
    "hi": "Diagnostic step 10",
    "gu": "Diagnostic step 10"
  },
  "diagnostic step 11": {
    "hi": "Diagnostic step 11",
    "gu": "Diagnostic step 11"
  },
  "diagnostic step 12": {
    "hi": "Diagnostic step 12",
    "gu": "Diagnostic step 12"
  },
  "diagnostic step 13": {
    "hi": "Diagnostic step 13",
    "gu": "Diagnostic step 13"
  },
  "diagnostic step 14": {
    "hi": "Diagnostic step 14",
    "gu": "Diagnostic step 14"
  },
  "diagram interpretation": {
    "hi": "Diagram interpretation",
    "gu": "Diagram interpretation"
  },
  "diagram labeling": {
    "hi": "Diagram labeling",
    "gu": "Diagram labeling"
  },
  "dialogue role playing": {
    "hi": "Dialogue role-playing",
    "gu": "Dialogue role-playing"
  },
  "dialogue role-playing": {
    "hi": "Dialogue role-playing",
    "gu": "Dialogue role-playing"
  },
  "diction improvement": {
    "hi": "Diction improvement",
    "gu": "Diction improvement"
  },
  "diet consultation specific detailing": {
    "hi": "आहार परामर्श विस्तृत कार्य",
    "gu": "આહાર સલાહ વિગતવાર સેવા"
  },
  "digital delivery confirmation and recipient receipt acknowledgment": {
    "hi": "Digital delivery confirmation and recipient receipt acknowledgment",
    "gu": "Digital delivery confirmation and recipient receipt acknowledgment"
  },
  "digital delivery confirmation notification upon arrival": {
    "hi": "Digital delivery confirmation notification upon arrival",
    "gu": "Digital delivery confirmation notification upon arrival"
  },
  "digital effects usage": {
    "hi": "Digital effects usage",
    "gu": "Digital effects usage"
  },
  "digital handover sign off and trip completion notification": {
    "hi": "Digital handover sign-off and trip completion notification",
    "gu": "Digital handover sign-off and trip completion notification"
  },
  "digital handover sign-off and trip completion notification": {
    "hi": "Digital handover sign-off and trip completion notification",
    "gu": "Digital handover sign-off and trip completion notification"
  },
  "digital lock installation specific detailing": {
    "hi": "डिजिटल लॉक इंस्टॉलेशन विस्तृत कार्य",
    "gu": "ડિજિટલ લોક ઇન્સ્ટોલેશન વિગતવાર સેવા"
  },
  "digital proof of collection and timestamped handover receipt": {
    "hi": "Digital proof of collection and timestamped handover receipt",
    "gu": "Digital proof of collection and timestamped handover receipt"
  },
  "direct transit between specified origin and destination addresses": {
    "hi": "Direct transit between specified origin and destination addresses",
    "gu": "Direct transit between specified origin and destination addresses"
  },
  "direct transit from grocery store to customer residential doorstep": {
    "hi": "Direct transit from grocery store to customer residential doorstep",
    "gu": "Direct transit from grocery store to customer residential doorstep"
  },
  "direct transit from sender to recipient address": {
    "hi": "Direct transit from sender to recipient address",
    "gu": "Direct transit from sender to recipient address"
  },
  "disease mechanisms": {
    "hi": "Disease mechanisms",
    "gu": "Disease mechanisms"
  },
  "dishwashing specific detailing": {
    "hi": "बर्तन धोना विस्तृत कार्य",
    "gu": "વાસણ ધોવા વિગતવાર સેવા"
  },
  "disinfectant application": {
    "hi": "Disinfectant लगाना",
    "gu": "Disinfectant લગાવવું"
  },
  "display color accuracy check": {
    "hi": "Display color accuracy जांच",
    "gu": "Display color accuracy તપાસ"
  },
  "display testing": {
    "hi": "Display परीक्षण",
    "gu": "Display પરીક્ષણ"
  },
  "dj specific detailing": {
    "hi": "DJ विस्तृत कार्य",
    "gu": "DJ વિગતવાર સેવા"
  },
  "document compliance review": {
    "hi": "Document compliance review",
    "gu": "Document compliance review"
  },
  "document organization": {
    "hi": "Document organization",
    "gu": "Document organization"
  },
  "dog walking specific detailing": {
    "hi": "कुत्ते को घुमाना विस्तृत कार्य",
    "gu": "કૂતરાને ફેરવવું વિગતવાર સેવા"
  },
  "door handle sanitization": {
    "hi": "डोर हैंडल सैनिटाइजेशन",
    "gu": "ડોર હેન્ડલ સેનિટાઇઝેશન"
  },
  "doorstep pickup and verified delivery handover": {
    "hi": "Doorstep pickup and verified delivery handover",
    "gu": "Doorstep pickup and verified delivery handover"
  },
  "doorstep pickup of pre packed prepaid grocery bags from supermarkets or stores": {
    "hi": "Doorstep pickup of pre-packed, prepaid grocery bags from supermarkets or stores",
    "gu": "Doorstep pickup of pre-packed, prepaid grocery bags from supermarkets or stores"
  },
  "doorstep pickup of pre-packed, prepaid grocery bags from supermarkets or stores": {
    "hi": "Doorstep pickup of pre-packed, prepaid grocery bags from supermarkets or stores",
    "gu": "Doorstep pickup of pre-packed, prepaid grocery bags from supermarkets or stores"
  },
  "doorstep two wheeler high pressure foam wash": {
    "hi": "Doorstep two-wheeler high-pressure foam धुलाई",
    "gu": "Doorstep two-wheeler high-pressure foam ધોવું"
  },
  "doorstep two-wheeler high-pressure foam wash": {
    "hi": "Doorstep two-wheeler high-pressure foam धुलाई",
    "gu": "Doorstep two-wheeler high-pressure foam ધોવું"
  },
  "doubt clearing sessions": {
    "hi": "Doubt clearing sessions",
    "gu": "Doubt clearing sessions"
  },
  "doubt solving": {
    "hi": "Doubt solving",
    "gu": "Doubt solving"
  },
  "draping": {
    "hi": "Draping",
    "gu": "Draping"
  },
  "drill marking": {
    "hi": "Drill marking",
    "gu": "Drill marking"
  },
  "driver update verification": {
    "hi": "Driver update सत्यापन",
    "gu": "Driver update ચકાસણી"
  },
  "drop off at authorized dealership or customer specified repair garage": {
    "hi": "Drop-off at authorized dealership or customer-specified repair garage",
    "gu": "Drop-off at authorized dealership or customer-specified repair garage"
  },
  "drop-off at authorized dealership or customer-specified repair garage": {
    "hi": "Drop-off at authorized dealership or customer-specified repair garage",
    "gu": "Drop-off at authorized dealership or customer-specified repair garage"
  },
  "drum notation reading": {
    "hi": "Drum notation reading",
    "gu": "Drum notation reading"
  },
  "dry cutting refinement": {
    "hi": "Dry cutting refinement",
    "gu": "Dry cutting refinement"
  },
  "dry dusting": {
    "hi": "Dry dusting",
    "gu": "Dry dusting"
  },
  "dry dusting of ceiling": {
    "hi": "छत की डस्टिंग",
    "gu": "છતની ડસ્ટિંગ"
  },
  "dry skin buffing": {
    "hi": "Dry skin buffing",
    "gu": "Dry skin buffing"
  },
  "drying time monitoring": {
    "hi": "Drying time monitoring",
    "gu": "Drying time monitoring"
  },
  "dust clearance from fan": {
    "hi": "Dust clearance from fan",
    "gu": "Dust clearance from fan"
  },
  "dust removal": {
    "hi": "Dust हटाना",
    "gu": "Dust દૂર કરવું"
  },
  "dusting and wiping of all surfaces shelves and fixtures": {
    "hi": "Dusting and wiping of all surfaces, shelves, and fixtures",
    "gu": "Dusting and wiping of all surfaces, shelves, and fixtures"
  },
  "dusting and wiping of all surfaces, shelves, and fixtures": {
    "hi": "Dusting and wiping of all surfaces, shelves, and fixtures",
    "gu": "Dusting and wiping of all surfaces, shelves, and fixtures"
  },
  "dynamic control": {
    "hi": "Dynamic control",
    "gu": "Dynamic control"
  },
  "dynamic expression": {
    "hi": "Dynamic expression",
    "gu": "Dynamic expression"
  },
  "ear cleaning specific detailing": {
    "hi": "Ear सफाई विस्तृत कार्य",
    "gu": "Ear સફાઈ વિગતવાર સેવા"
  },
  "ear contouring": {
    "hi": "Ear contouring",
    "gu": "Ear contouring"
  },
  "ear training": {
    "hi": "Ear प्रशिक्षण",
    "gu": "Ear તાલીમ"
  },
  "earth science topics": {
    "hi": "Earth science topics",
    "gu": "Earth science topics"
  },
  "ecological concepts": {
    "hi": "Ecological concepts",
    "gu": "Ecological concepts"
  },
  "economic principles": {
    "hi": "Economic principles",
    "gu": "Economic principles"
  },
  "economic survey highlights": {
    "hi": "Economic survey highlights",
    "gu": "Economic survey highlights"
  },
  "edge refinement": {
    "hi": "किनारों की फिनिशिंग",
    "gu": "કિનારી ફિનિશિંગ"
  },
  "elasticity check": {
    "hi": "Elasticity जांच",
    "gu": "Elasticity તપાસ"
  },
  "electromagnetism concepts": {
    "hi": "Electromagnetism concepts",
    "gu": "Electromagnetism concepts"
  },
  "email coordination": {
    "hi": "Email coordination",
    "gu": "Email coordination"
  },
  "email management": {
    "hi": "Email प्रबंधन",
    "gu": "Email સંચાલન"
  },
  "energy concepts": {
    "hi": "Energy concepts",
    "gu": "Energy concepts"
  },
  "engineering mathematics": {
    "hi": "Engineering mathematics",
    "gu": "Engineering mathematics"
  },
  "english comprehension": {
    "hi": "English comprehension",
    "gu": "English comprehension"
  },
  "english language basics": {
    "hi": "English language basics",
    "gu": "English language basics"
  },
  "environmental concepts": {
    "hi": "Environmental concepts",
    "gu": "Environmental concepts"
  },
  "epsom salt mixing": {
    "hi": "एप्सम सॉल्ट मिश्रण",
    "gu": "એપ્સમ સોલ્ટ મિશ્રણ"
  },
  "equation balancing": {
    "hi": "Equation संतुलन (बैलेंसिंग)",
    "gu": "Equation બેલેન્સિંગ"
  },
  "equipment skin assessment": {
    "hi": "Equipment skin आकलन",
    "gu": "Equipment skin મૂલ્યાંકન"
  },
  "equipment stain assessment": {
    "hi": "उपकरण दाग जांच",
    "gu": "સાધન ડાઘ તપાસ"
  },
  "error handling": {
    "hi": "Error handling",
    "gu": "Error handling"
  },
  "essay structuring": {
    "hi": "Essay structuring",
    "gu": "Essay structuring"
  },
  "ethics and integrity case studies": {
    "hi": "Ethics and integrity case studies",
    "gu": "Ethics and integrity case studies"
  },
  "even application": {
    "hi": "Even लगाना",
    "gu": "Even લગાવવું"
  },
  "even brushing": {
    "hi": "Even brushing",
    "gu": "Even brushing"
  },
  "event coordination": {
    "hi": "Event coordination",
    "gu": "Event coordination"
  },
  "event photography specific detailing": {
    "hi": "इवेंट फोटोग्राफी विस्तृत कार्य",
    "gu": "ઇવેન્ટ ફોટોગ્રાફી વિગતવાર સેવા"
  },
  "event planning specific detailing": {
    "hi": "Event Planning विस्तृत कार्य",
    "gu": "Event Planning વિગતવાર સેવા"
  },
  "event staff specific detailing": {
    "hi": "Event Staff विस्तृत कार्य",
    "gu": "Event Staff વિગતવાર સેવા"
  },
  "event videography specific detailing": {
    "hi": "इवेंट वीडियोग्राफी विस्तृत कार्य",
    "gu": "ઇવેન્ટ વિડિયોગ્રાફી વિગતવાર સેવા"
  },
  "exam pattern familiarization": {
    "hi": "Exam pattern familiarization",
    "gu": "Exam pattern familiarization"
  },
  "exfoliating scrub application": {
    "hi": "एक्सफोलिएटिंग स्क्रब लगाना",
    "gu": "એક્સફોલિએટિંગ સ્ક્રબ લગાવવું"
  },
  "existing wiring safety assessment": {
    "hi": "वायरिंग सुरक्षा मूल्यांकन",
    "gu": "વાયરિંગ સુરક્ષા તપાસ"
  },
  "expense tracking": {
    "hi": "Expense tracking",
    "gu": "Expense tracking"
  },
  "experiment discussion": {
    "hi": "Experiment discussion",
    "gu": "Experiment discussion"
  },
  "expert consultation and advice": {
    "hi": "विशेषज्ञ परामर्श व देखभाल सलाह",
    "gu": "નિષ્ણાત સલાહ અને માર્ગદર્શન"
  },
  "expression (abhinaya/facial)": {
    "hi": "Expression (abhinay फेशियल",
    "gu": "Expression (abhinay ફેશિયલ"
  },
  "expression abhinaya facial": {
    "hi": "Expression (abhinay फेशियल",
    "gu": "Expression (abhinay ફેશિયલ"
  },
  "extensive cuticle softening": {
    "hi": "Extensive cuticle softening",
    "gu": "Extensive cuticle softening"
  },
  "extensive dead skin removal": {
    "hi": "Extensive dead skin हटाना",
    "gu": "Extensive dead skin દૂર કરવું"
  },
  "extensive dust removal": {
    "hi": "Extensive dust हटाना",
    "gu": "Extensive dust દૂર કરવું"
  },
  "extensive kitchen counter degreasing": {
    "hi": "Extensive kitchen counter degreasing",
    "gu": "Extensive kitchen counter degreasing"
  },
  "extensive material preparation": {
    "hi": "Extensive material preparation",
    "gu": "Extensive material preparation"
  },
  "extensive nail polish removal": {
    "hi": "Extensive nail polish हटाना",
    "gu": "Extensive nail polish દૂર કરવું"
  },
  "extensive toilet bowl scaling": {
    "hi": "Extensive toilet bowl scaling",
    "gu": "Extensive toilet bowl scaling"
  },
  "exterior high pressure snow foam wash and rinse": {
    "hi": "Exterior high-pressure snow foam wash and रिंस",
    "gu": "Exterior high-pressure snow foam wash and રિન્સ"
  },
  "exterior high-pressure snow foam wash and rinse": {
    "hi": "Exterior high-pressure snow foam wash and रिंस",
    "gu": "Exterior high-pressure snow foam wash and રિન્સ"
  },
  "eye artistry": {
    "hi": "Eye artistry",
    "gu": "Eye artistry"
  },
  "eye contact training": {
    "hi": "Eye contact प्रशिक्षण",
    "gu": "Eye contact તાલીમ"
  },
  "eye makeup (eyeshadow, eyeliner, and mascara)": {
    "hi": "Eye makeup (eyeshadow, eyeliner, and mascara)",
    "gu": "Eye makeup (eyeshadow, eyeliner, and mascara)"
  },
  "eye makeup eyeshadow eyeliner and mascara": {
    "hi": "Eye makeup (eyeshadow, eyeliner, and mascara)",
    "gu": "Eye makeup (eyeshadow, eyeliner, and mascara)"
  },
  "eye pad placement": {
    "hi": "आंखों पर कूलिंग पैड",
    "gu": "આંખો પર કૂલિંગ પેડ"
  },
  "eye shadow eyeliner and mascara styling": {
    "hi": "Eye shadow, eyeliner, and masca स्टाइलिंग",
    "gu": "Eye shadow, eyeliner, and masca સ્ટાઇલિંગ"
  },
  "eye shadow, eyeliner, and mascara styling": {
    "hi": "Eye shadow, eyeliner, and masca स्टाइलिंग",
    "gu": "Eye shadow, eyeliner, and masca સ્ટાઇલિંગ"
  },
  "eyebrow defining and grooming": {
    "hi": "Eyebrow defining and grooming",
    "gu": "Eyebrow defining and grooming"
  },
  "eyebrow shaping and filling": {
    "hi": "Eyebrow shaping and filling",
    "gu": "Eyebrow shaping and filling"
  },
  "eyebrow shaping assessment": {
    "hi": "आइब्रो शेपिंग जांच",
    "gu": "આઇબ્રો શેપિંગ તપાસ"
  },
  "face coverage": {
    "hi": "Face coverage",
    "gu": "Face coverage"
  },
  "face framing": {
    "hi": "Face framing",
    "gu": "Face framing"
  },
  "face mask": {
    "hi": "फेस मास्क",
    "gu": "ફેસ માસ્ક"
  },
  "face pack application": {
    "hi": "फेस पैक लगाना",
    "gu": "ફેસ પેક લગાવવું"
  },
  "facial expressions": {
    "hi": "Facial expressions",
    "gu": "Facial expressions"
  },
  "facial massage with cream": {
    "hi": "क्रीम से चेहरे की मालिश",
    "gu": "ક્રીમ વડે ચહેરાની માલિશ"
  },
  "figure of speech identification": {
    "hi": "Figure of speech identification",
    "gu": "Figure of speech identification"
  },
  "file sorting": {
    "hi": "File sorting",
    "gu": "File sorting"
  },
  "file sorting and filing": {
    "hi": "File sorting and filing",
    "gu": "File sorting and filing"
  },
  "filter mesh wash": {
    "hi": "फिल्टर जाली धुलाई",
    "gu": "ફિલ્ટર જાળી સફાઈ"
  },
  "final comfort walking and mobility check": {
    "hi": "Final comfort, walking, and mobili जांच",
    "gu": "Final comfort, walking, and mobili તપાસ"
  },
  "final comfort, walking, and mobility check": {
    "hi": "Final comfort, walking, and mobili जांच",
    "gu": "Final comfort, walking, and mobili તપાસ"
  },
  "final dry wipe": {
    "hi": "अंतिम ड्राई वाइप",
    "gu": "અંતિમ ડ્રાય વાઇપ"
  },
  "final hair smoothing": {
    "hi": "अंतिम हेयर स्मूथिंग",
    "gu": "આખરી હેર સ્મૂથિંગ"
  },
  "final security verification": {
    "hi": "Final security सत्यापन",
    "gu": "Final security ચકાસણી"
  },
  "final service assessment": {
    "hi": "Final service आकलन",
    "gu": "Final service મૂલ્યાંકન"
  },
  "final shape check": {
    "hi": "Final shape जांच",
    "gu": "Final shape તપાસ"
  },
  "final touch up": {
    "hi": "Final touch-up",
    "gu": "Final touch-up"
  },
  "final touch-up": {
    "hi": "Final touch-up",
    "gu": "Final touch-up"
  },
  "financial awareness": {
    "hi": "Financial awareness",
    "gu": "Financial awareness"
  },
  "finger joint massage": {
    "hi": "Finger joint मालिश",
    "gu": "Finger joint માલિશ"
  },
  "finger placement": {
    "hi": "Finger placement",
    "gu": "Finger placement"
  },
  "finger striking techniques": {
    "hi": "Finger striking techniques",
    "gu": "Finger striking techniques"
  },
  "fingering exercises": {
    "hi": "Fingering exercises",
    "gu": "Fingering exercises"
  },
  "fingerpicking styles": {
    "hi": "Fingerpicking styles",
    "gu": "Fingerpicking styles"
  },
  "firm rubbing": {
    "hi": "Firm rubbing",
    "gu": "Firm rubbing"
  },
  "fitness coaching specific detailing": {
    "hi": "Fitness कोचिंग विस्तृत कार्य",
    "gu": "Fitness કોચિંગ વિગતવાર સેવા"
  },
  "flexibility training": {
    "hi": "Flexibility प्रशिक्षण",
    "gu": "Flexibility તાલીમ"
  },
  "flexible hold hairspray and shine serum finish": {
    "hi": "Flexible hold hairspray and shine serum finish",
    "gu": "Flexible hold hairspray and shine serum finish"
  },
  "floor deep mopping": {
    "hi": "फर्श डीप मोपिंग",
    "gu": "ફ્લોર ડીપ મોપિંગ"
  },
  "floor dry sweeping": {
    "hi": "Floor dry sweeping",
    "gu": "Floor dry sweeping"
  },
  "floor level threshold protection during entry and exit": {
    "hi": "Floor-level threshold protection during entry and exit",
    "gu": "Floor-level threshold protection during entry and exit"
  },
  "floor runners and threshold guards to protect entryway tiles": {
    "hi": "Floor runners and threshold guards to protect entryway tiles",
    "gu": "Floor runners and threshold guards to protect entryway tiles"
  },
  "floor scrubbing and polishing (hardwood, tile, laminate)": {
    "hi": "Floor scrubbing and polishing (hardwood, tile, laminate)",
    "gu": "Floor scrubbing and polishing (hardwood, tile, laminate)"
  },
  "floor scrubbing and polishing hardwood tile laminate": {
    "hi": "Floor scrubbing and polishing (hardwood, tile, laminate)",
    "gu": "Floor scrubbing and polishing (hardwood, tile, laminate)"
  },
  "floor vacuuming": {
    "hi": "Floor vacuuming",
    "gu": "Floor vacuuming"
  },
  "floor wet mopping": {
    "hi": "Floor wet mopping",
    "gu": "Floor wet mopping"
  },
  "floor-level threshold protection during entry and exit": {
    "hi": "Floor-level threshold protection during entry and exit",
    "gu": "Floor-level threshold protection during entry and exit"
  },
  "flowchart creation": {
    "hi": "Flowchart creation",
    "gu": "Flowchart creation"
  },
  "fluid mechanics analysis": {
    "hi": "Fluid mechanics analysis",
    "gu": "Fluid mechanics analysis"
  },
  "foil placement": {
    "hi": "Foil placement",
    "gu": "Foil placement"
  },
  "foot exfoliation": {
    "hi": "पैर का एक्सफोलिएशन (स्क्रब)",
    "gu": "પગનું એક્સફોલિએશન"
  },
  "foot hydration sealing": {
    "hi": "Foot hydration sealing",
    "gu": "Foot hydration sealing"
  },
  "foot inspection": {
    "hi": "पैर की जांच",
    "gu": "પગની તપાસ"
  },
  "foot massage": {
    "hi": "पैर की मालिश (फुट मसाज)",
    "gu": "પગની માલિશ"
  },
  "foot scrub application": {
    "hi": "Foot scrub लगाना",
    "gu": "Foot scrub લગાવવું"
  },
  "foot soaking in warm solution": {
    "hi": "गुनगुने पानी में पैर की सिकाई",
    "gu": "હૂંફાળા પાણીમાં પગ પલાળવા"
  },
  "footwork drills": {
    "hi": "Footwork drills",
    "gu": "Footwork drills"
  },
  "footwork speed": {
    "hi": "Footwork speed",
    "gu": "Footwork speed"
  },
  "force analysis": {
    "hi": "Force analysis",
    "gu": "Force analysis"
  },
  "forehead tension release": {
    "hi": "Forehead tension release",
    "gu": "Forehead tension release"
  },
  "form and stamina assessment": {
    "hi": "Form and stamina आकलन",
    "gu": "Form and stamina મૂલ્યાંકન"
  },
  "form correction": {
    "hi": "Form correction",
    "gu": "Form correction"
  },
  "formula application": {
    "hi": "Formula लगाना",
    "gu": "Formula લગાવવું"
  },
  "formula cheat sheets": {
    "hi": "Formula cheat sheets",
    "gu": "Formula cheat sheets"
  },
  "formula derivations": {
    "hi": "Formula derivations",
    "gu": "Formula derivations"
  },
  "foundation and concealer base application": {
    "hi": "Foundation and concealer base लगाना",
    "gu": "Foundation and concealer base લગાવવું"
  },
  "fresh polish application": {
    "hi": "Fresh polish लगाना",
    "gu": "Fresh polish લગાવવું"
  },
  "fretboard memorization": {
    "hi": "Fretboard memorization",
    "gu": "Fretboard memorization"
  },
  "fringe trimming": {
    "hi": "Fringe trimming",
    "gu": "Fringe trimming"
  },
  "frizz control check": {
    "hi": "फ्रिज कंट्रोल जांच",
    "gu": "ફ્રિઝ કંટ્રોલ તપાસ"
  },
  "full body massage specific detailing": {
    "hi": "Full Body मालिश विस्तृत कार्य",
    "gu": "Full Body માલિશ વિગતવાર સેવા"
  },
  "full body movement": {
    "hi": "Full body movement",
    "gu": "Full body movement"
  },
  "full grooming specific detailing": {
    "hi": "Full Grooming विस्तृत कार्य",
    "gu": "Full Grooming વિગતવાર સેવા"
  },
  "full hair and makeup consultation": {
    "hi": "Full hair and makeup परामर्श",
    "gu": "Full hair and makeup સલાહ"
  },
  "full time cook specific detailing": {
    "hi": "Full-Time Cook विस्तृत कार्य",
    "gu": "Full-Time Cook વિગતવાર સેવા"
  },
  "full-time cook specific detailing": {
    "hi": "Full-Time Cook विस्तृत कार्य",
    "gu": "Full-Time Cook વિગતવાર સેવા"
  },
  "furniture exterior wiping": {
    "hi": "फर्नीचर बाहरी सफाई",
    "gu": "ફર્નિચર સફાઈ"
  },
  "gas pressure check": {
    "hi": "गैस प्रेशर जांच",
    "gu": "ગેસ પ્રેશર તપાસ"
  },
  "gate specific mock tests": {
    "hi": "Gate specific mock tests",
    "gu": "Gate specific mock tests"
  },
  "gel polish compatibility": {
    "hi": "Gel polish compatibility",
    "gu": "Gel polish compatibility"
  },
  "general aptitude": {
    "hi": "General aptitude",
    "gu": "General aptitude"
  },
  "general awareness": {
    "hi": "General awareness",
    "gu": "General awareness"
  },
  "general knowledge quizzes": {
    "hi": "General knowledge quizzes",
    "gu": "General knowledge quizzes"
  },
  "genetics and inheritance": {
    "hi": "Genetics and inheritance",
    "gu": "Genetics and inheritance"
  },
  "gentle hand scrubbing of engine exterior and mudguards": {
    "hi": "Gentle hand scrubbing of engine exterior and mudguards",
    "gu": "Gentle hand scrubbing of engine exterior and mudguards"
  },
  "gentle scalp massage": {
    "hi": "हल्की स्कैल्प मालिश",
    "gu": "હળવી સ્કેલ્પ માલિશ"
  },
  "geography and environment": {
    "hi": "Geography and environment",
    "gu": "Geography and environment"
  },
  "geography concepts": {
    "hi": "Geography concepts",
    "gu": "Geography concepts"
  },
  "geometry proofs": {
    "hi": "Geometry proofs",
    "gu": "Geometry proofs"
  },
  "glow enhancement": {
    "hi": "Glow enhancement",
    "gu": "Glow enhancement"
  },
  "goal setting": {
    "hi": "Goal setting",
    "gu": "Goal setting"
  },
  "governance structures": {
    "hi": "Governance structures",
    "gu": "Governance structures"
  },
  "grammar improvement": {
    "hi": "Grammar improvement",
    "gu": "Grammar improvement"
  },
  "grammar rules": {
    "hi": "Grammar rules",
    "gu": "Grammar rules"
  },
  "graph interpretation": {
    "hi": "Graph interpretation",
    "gu": "Graph interpretation"
  },
  "graph plotting": {
    "hi": "Graph plotting",
    "gu": "Graph plotting"
  },
  "grocery pickup specific detailing": {
    "hi": "Grocery Pickup विस्तृत कार्य",
    "gu": "Grocery Pickup વિગતવાર સેવા"
  },
  "groove creation": {
    "hi": "Groove creation",
    "gu": "Groove creation"
  },
  "group coordination": {
    "hi": "Group coordination",
    "gu": "Group coordination"
  },
  "group discussion prep": {
    "hi": "Group discussion prep",
    "gu": "Group discussion prep"
  },
  "group yoga specific detailing": {
    "hi": "Group Yoga विस्तृत कार्य",
    "gu": "Group Yoga વિગતવાર સેવા"
  },
  "grout line scrubbing": {
    "hi": "Grout line स्क्रबिंग",
    "gu": "Grout line સ્ક્રબિંગ"
  },
  "gua sha massage": {
    "hi": "गुआ शा मसाज",
    "gu": "ગુઆ શા મસાજ"
  },
  "gujarati food specific detailing": {
    "hi": "Gujarati Food विस्तृत कार्य",
    "gu": "Gujarati Food વિગતવાર સેવા"
  },
  "hair consultation": {
    "hi": "हेयर परामर्श",
    "gu": "હેર સલાહ"
  },
  "hair consultation and style planning": {
    "hi": "Hair consultation and style planning",
    "gu": "Hair consultation and style planning"
  },
  "hair consultation style assessment": {
    "hi": "हेयर स्टाइल मूल्यांकन",
    "gu": "હેર સ્ટાઇલ મૂલ્યાંકન"
  },
  "hair disposal": {
    "hi": "Hair disposal",
    "gu": "Hair disposal"
  },
  "hair length assessment": {
    "hi": "Hair length आकलन",
    "gu": "Hair length મૂલ્યાંકન"
  },
  "hair mapping": {
    "hi": "हेयर मैपिंग",
    "gu": "હેર મેપિંગ"
  },
  "hair pins hairspray and makeup setting seal": {
    "hi": "Hair pins, hairspray, and makeup setting seal",
    "gu": "Hair pins, hairspray, and makeup setting seal"
  },
  "hair pins, hairspray, and makeup setting seal": {
    "hi": "Hair pins, hairspray, and makeup setting seal",
    "gu": "Hair pins, hairspray, and makeup setting seal"
  },
  "hair sectioning": {
    "hi": "बालों का सेक्शनिंग (विभाजन)",
    "gu": "વાળનું સેક્શનિંગ (વિભાગ)"
  },
  "hair straightening / smoothening specific detailing": {
    "hi": "Hair Straightening / Smoothening विस्तृत कार्य",
    "gu": "Hair Straightening / Smoothening વિગતવાર સેવા"
  },
  "hair straightening smoothening specific detailing": {
    "hi": "Hair Straightening / Smoothening विस्तृत कार्य",
    "gu": "Hair Straightening / Smoothening વિગતવાર સેવા"
  },
  "hair styling (curls, waves, straight, or half-updo)": {
    "hi": "Hair styling (curls, waves, straight, or half-updo)",
    "gu": "Hair styling (curls, waves, straight, or half-updo)"
  },
  "hair styling curls waves straight or half updo": {
    "hi": "Hair styling (curls, waves, straight, or half-updo)",
    "gu": "Hair styling (curls, waves, straight, or half-updo)"
  },
  "hair styling specific detailing": {
    "hi": "हेयर स्टाइलिंग विस्तृत कार्य",
    "gu": "હેર સ્ટાઇલિંગ વિગતવાર સેવા"
  },
  "hair texture check": {
    "hi": "Hair texture जांच",
    "gu": "Hair texture તપાસ"
  },
  "hair texturizing": {
    "hi": "Hair texturizing",
    "gu": "Hair texturizing"
  },
  "hair wash": {
    "hi": "हेयर वॉश",
    "gu": "હેર વોશ"
  },
  "hair wipe down": {
    "hi": "Hair wipe down",
    "gu": "Hair wipe down"
  },
  "hairline cleanup": {
    "hi": "Hairline cleanup",
    "gu": "Hairline cleanup"
  },
  "hand exfoliation": {
    "hi": "हाथ एक्सफोलिएशन",
    "gu": "હાથ એક્સફોલિએશન"
  },
  "hand independence": {
    "hi": "Hand independence",
    "gu": "Hand independence"
  },
  "hand massage": {
    "hi": "हाथ मालिश",
    "gu": "હાથ માલિશ"
  },
  "hand positioning": {
    "hi": "Hand positioning",
    "gu": "Hand positioning"
  },
  "hand scrub": {
    "hi": "Hand scrub",
    "gu": "Hand scrub"
  },
  "hard drive sector scan": {
    "hi": "Hard drive sector scan",
    "gu": "Hard drive sector scan"
  },
  "hardware diagnostic verification": {
    "hi": "Hardware diagnostic सत्यापन",
    "gu": "Hardware diagnostic ચકાસણી"
  },
  "hardware verification": {
    "hi": "Hardware सत्यापन",
    "gu": "Hardware ચકાસણી"
  },
  "harmonization": {
    "hi": "Harmonization",
    "gu": "Harmonization"
  },
  "healthy diet food specific detailing": {
    "hi": "Healthy/Diet Food विस्तृत कार्य",
    "gu": "Healthy/Diet Food વિગતવાર સેવા"
  },
  "healthy/diet food specific detailing": {
    "hi": "Healthy/Diet Food विस्तृत कार्य",
    "gu": "Healthy/Diet Food વિગતવાર સેવા"
  },
  "heat dissipation check": {
    "hi": "Heat dissipation जांच",
    "gu": "Heat dissipation તપાસ"
  },
  "heavy duty transport in clean weather protected commercial trucks": {
    "hi": "Heavy-duty transport in clean, weather-protected commercial trucks",
    "gu": "Heavy-duty transport in clean, weather-protected commercial trucks"
  },
  "heavy-duty transport in clean, weather-protected commercial trucks": {
    "hi": "Heavy-duty transport in clean, weather-protected commercial trucks",
    "gu": "Heavy-duty transport in clean, weather-protected commercial trucks"
  },
  "heel smoothness check": {
    "hi": "Heel smoothness जांच",
    "gu": "Heel smoothness તપાસ"
  },
  "height alignment": {
    "hi": "Height संरेखण (अलाइनमेंट)",
    "gu": "Height અલાઇનમેન્ટ"
  },
  "hi hat control": {
    "hi": "Hi-hat control",
    "gu": "Hi-hat control"
  },
  "hi-hat control": {
    "hi": "Hi-hat control",
    "gu": "Hi-hat control"
  },
  "high definition camera ready skin prep and priming": {
    "hi": "High-definition camera-ready skin prep and priming",
    "gu": "High-definition camera-ready skin prep and priming"
  },
  "high energy pacing": {
    "hi": "High-energy pacing",
    "gu": "High-energy pacing"
  },
  "high grade safety sanitized tools": {
    "hi": "उच्च-स्तरीय सुरक्षा व सैनिटाइज्ड उपकरण",
    "gu": "ઉચ્ચ-સ્તરીય સુરક્ષા અને સેનિટાઇઝ્ડ સાધનો"
  },
  "high performance makeup setting spray": {
    "hi": "High-performance makeup setting spray",
    "gu": "High-performance makeup setting spray"
  },
  "high weightage topic focus": {
    "hi": "High-weightage topic focus",
    "gu": "High-weightage topic focus"
  },
  "high yield topic revision": {
    "hi": "High-yield topic revision",
    "gu": "High-yield topic revision"
  },
  "high-definition camera-ready skin prep and priming": {
    "hi": "High-definition camera-ready skin prep and priming",
    "gu": "High-definition camera-ready skin prep and priming"
  },
  "high-energy pacing": {
    "hi": "High-energy pacing",
    "gu": "High-energy pacing"
  },
  "high-grade safety & sanitized tools": {
    "hi": "उच्च-स्तरीय सुरक्षा व सैनिटाइज्ड उपकरण",
    "gu": "ઉચ્ચ-સ્તરીય સુરક્ષા અને સેનિટાઇઝ્ડ સાધનો"
  },
  "high-performance makeup setting spray": {
    "hi": "High-performance makeup setting spray",
    "gu": "High-performance makeup setting spray"
  },
  "high-weightage topic focus": {
    "hi": "High-weightage topic focus",
    "gu": "High-weightage topic focus"
  },
  "high-yield topic revision": {
    "hi": "High-yield topic revision",
    "gu": "High-yield topic revision"
  },
  "hindi grammar": {
    "hi": "Hindi grammar",
    "gu": "Hindi grammar"
  },
  "historical timeline memorization": {
    "hi": "Historical timeline memorization",
    "gu": "Historical timeline memorization"
  },
  "history and polity basics": {
    "hi": "History and polity basics",
    "gu": "History and polity basics"
  },
  "history timeline mapping": {
    "hi": "History timeline mapping",
    "gu": "History timeline mapping"
  },
  "home automation setup specific detailing": {
    "hi": "Home Automation सेटअप विस्तृत कार्य",
    "gu": "Home Automation સેટઅપ વિગતવાર સેવા"
  },
  "home workout trainer specific detailing": {
    "hi": "Home Workout Trainer विस्तृत कार्य",
    "gu": "Home Workout Trainer વિગતવાર સેવા"
  },
  "hot towel wrap": {
    "hi": "Hot towel wrap",
    "gu": "Hot towel wrap"
  },
  "household cleaning assistance specific detailing": {
    "hi": "Household Cleaning सहायता विस्तृत कार्य",
    "gu": "Household Cleaning સહાય વિગતવાર સેવા"
  },
  "human anatomy review": {
    "hi": "Human anatomy review",
    "gu": "Human anatomy review"
  },
  "human physiology deep dive": {
    "hi": "Human physiology deep dive",
    "gu": "Human physiology deep dive"
  },
  "hydration sealing": {
    "hi": "हाइड्रेशन लॉक करना",
    "gu": "હાઇડ્રેશન સીલ કરવું"
  },
  "hygienic disposable tools": {
    "hi": "स्वच्छ डिस्पोजेबल उपकरण",
    "gu": "હાઈજેનિક ડિસ્પોઝેબલ સાધનો"
  },
  "hypothesis formation": {
    "hi": "Hypothesis formation",
    "gu": "Hypothesis formation"
  },
  "ice roller application": {
    "hi": "आइस रोलर थेरेपी",
    "gu": "આઇસ રોલર થેરાપી"
  },
  "idiom usage": {
    "hi": "Idiom usage",
    "gu": "Idiom usage"
  },
  "impromptu speaking": {
    "hi": "Impromptu speaking",
    "gu": "Impromptu speaking"
  },
  "information retrieval": {
    "hi": "Information retrieval",
    "gu": "Information retrieval"
  },
  "ingrown hair check": {
    "hi": "Ingrown hair जांच",
    "gu": "Ingrown hair તપાસ"
  },
  "initial area assessment": {
    "hi": "Initial area आकलन",
    "gu": "Initial area મૂલ્યાંકન"
  },
  "input source check": {
    "hi": "Input source जांच",
    "gu": "Input source તપાસ"
  },
  "instrument tuning": {
    "hi": "Instrument ट्यूनिंग",
    "gu": "Instrument ટ્યુનિંગ"
  },
  "interactive learning": {
    "hi": "Interactive learning",
    "gu": "Interactive learning"
  },
  "international relations updates": {
    "hi": "International relations updates",
    "gu": "International relations updates"
  },
  "interval training flow": {
    "hi": "Interval training flow",
    "gu": "Interval training flow"
  },
  "intonation checking": {
    "hi": "Intonation checking",
    "gu": "Intonation checking"
  },
  "ironing specific detailing": {
    "hi": "Ironing विस्तृत कार्य",
    "gu": "Ironing વિગતવાર સેવા"
  },
  "isolation techniques": {
    "hi": "Isolation techniques",
    "gu": "Isolation techniques"
  },
  "itinerary creation": {
    "hi": "Itinerary creation",
    "gu": "Itinerary creation"
  },
  "jain food specific detailing": {
    "hi": "Jain Food विस्तृत कार्य",
    "gu": "Jain Food વિગતવાર સેવા"
  },
  "key orientation": {
    "hi": "Key orientation",
    "gu": "Key orientation"
  },
  "keyboard continuity testing": {
    "hi": "Keyboard continuity परीक्षण",
    "gu": "Keyboard continuity પરીક્ષણ"
  },
  "kick drum technique": {
    "hi": "Kick drum technique",
    "gu": "Kick drum technique"
  },
  "kinematics breakdowns": {
    "hi": "Kinematics breakdowns",
    "gu": "Kinematics breakdowns"
  },
  "kitchen counter degreasing": {
    "hi": "किचन काउंटर डीग्रीजिंग",
    "gu": "રસોડા કાઉન્ટર ડીગ્રીઝિંગ"
  },
  "kitchen deep cleaning specific detailing": {
    "hi": "Kitchen Deep सफाई विस्तृत कार्य",
    "gu": "Kitchen Deep સફાઈ વિગતવાર સેવા"
  },
  "lab activity guidance": {
    "hi": "Lab activity guidance",
    "gu": "Lab activity guidance"
  },
  "laboratory concepts": {
    "hi": "Laboratory concepts",
    "gu": "Laboratory concepts"
  },
  "lash application": {
    "hi": "Lash लगाना",
    "gu": "Lash લગાવવું"
  },
  "latin rhythm sync": {
    "hi": "Latin rhythm sync",
    "gu": "Latin rhythm sync"
  },
  "laundry specific detailing": {
    "hi": "Laundry विस्तृत कार्य",
    "gu": "Laundry વિગતવાર સેવા"
  },
  "layer cutting": {
    "hi": "लेयर कटिंग तकनीक",
    "gu": "લેયર કટિંગ ટેકનિક"
  },
  "layering sounds": {
    "hi": "Layering sounds",
    "gu": "Layering sounds"
  },
  "leakage inspection": {
    "hi": "रिसाव (लीकेज) जांच",
    "gu": "લિકેજ તપાસ"
  },
  "length wise color coating": {
    "hi": "Length-wise color coating",
    "gu": "Length-wise color coating"
  },
  "length-wise color coating": {
    "hi": "Length-wise color coating",
    "gu": "Length-wise color coating"
  },
  "leveling tool placement": {
    "hi": "Leveling tool placement",
    "gu": "Leveling tool placement"
  },
  "life science concepts": {
    "hi": "Life science concepts",
    "gu": "Life science concepts"
  },
  "limb independence": {
    "hi": "Limb independence",
    "gu": "Limb independence"
  },
  "listening comprehension": {
    "hi": "Listening comprehension",
    "gu": "Listening comprehension"
  },
  "literature analysis": {
    "hi": "Literature analysis",
    "gu": "Literature analysis"
  },
  "live music specific detailing": {
    "hi": "Live Music विस्तृत कार्य",
    "gu": "Live Music વિગતવાર સેવા"
  },
  "loading of packed cartons mattresses desks and small appliances": {
    "hi": "Loading of packed cartons, mattresses, desks, and small appliances",
    "gu": "Loading of packed cartons, mattresses, desks, and small appliances"
  },
  "loading of packed cartons, mattresses, desks, and small appliances": {
    "hi": "Loading of packed cartons, mattresses, desks, and small appliances",
    "gu": "Loading of packed cartons, mattresses, desks, and small appliances"
  },
  "local errands specific detailing": {
    "hi": "Local Errands विस्तृत कार्य",
    "gu": "Local Errands વિગતવાર સેવા"
  },
  "locking mechanism engagement": {
    "hi": "Locking mechanism engagement",
    "gu": "Locking mechanism engagement"
  },
  "logic gate analysis": {
    "hi": "Logic gate analysis",
    "gu": "Logic gate analysis"
  },
  "logical reasoning puzzles": {
    "hi": "Logical reasoning puzzles",
    "gu": "Logical reasoning puzzles"
  },
  "long wear foundation concealer and contouring": {
    "hi": "Long-wear foundation, concealer, and contouring",
    "gu": "Long-wear foundation, concealer, and contouring"
  },
  "long-wear foundation, concealer, and contouring": {
    "hi": "Long-wear foundation, concealer, and contouring",
    "gu": "Long-wear foundation, concealer, and contouring"
  },
  "loose hair dusting": {
    "hi": "Loose hair dusting",
    "gu": "Loose hair dusting"
  },
  "luxury ceiling fan wiping": {
    "hi": "Luxury ceiling fan पोंछना",
    "gu": "Luxury ceiling fan લૂછવું"
  },
  "luxury floor dry sweeping": {
    "hi": "Luxury floor dry sweeping",
    "gu": "Luxury floor dry sweeping"
  },
  "luxury fresh polish application": {
    "hi": "Luxury fresh polish लगाना",
    "gu": "Luxury fresh polish લગાવવું"
  },
  "luxury hand exfoliation": {
    "hi": "Luxury hand एक्सफोलिएशन",
    "gu": "Luxury hand એક્સફોલિએશન"
  },
  "luxury safety protocol adherence": {
    "hi": "Luxury safety protocol adherence",
    "gu": "Luxury safety protocol adherence"
  },
  "luxury tile scrubbing": {
    "hi": "Luxury tile स्क्रबिंग",
    "gu": "Luxury tile સ્ક્રબિંગ"
  },
  "luxury window track brushing": {
    "hi": "Luxury window track brushing",
    "gu": "Luxury window track brushing"
  },
  "lymphatic drainage strokes": {
    "hi": "लिम्फैटिक ड्रेनेज स्ट्रोक्स",
    "gu": "લિમ્ફેટિક ડ્રેનેજ સ્ટ્રોક્સ"
  },
  "magician specific detailing": {
    "hi": "Magician विस्तृत कार्य",
    "gu": "Magician વિગતવાર સેવા"
  },
  "maid specific detailing": {
    "hi": "Maid विस्तृत कार्य",
    "gu": "Maid વિગતવાર સેવા"
  },
  "mains answer formatting": {
    "hi": "Mains answer formatting",
    "gu": "Mains answer formatting"
  },
  "makeup removal": {
    "hi": "मेकअप हटाना",
    "gu": "મેકઅપ દૂર કરવો"
  },
  "makeup setting mist": {
    "hi": "Makeup setting mist",
    "gu": "Makeup setting mist"
  },
  "makeup setting verification": {
    "hi": "Makeup setting सत्यापन",
    "gu": "Makeup setting ચકાસણી"
  },
  "malware scan": {
    "hi": "Malware scan",
    "gu": "Malware scan"
  },
  "map reading skills": {
    "hi": "Map reading skills",
    "gu": "Map reading skills"
  },
  "martial arts specific detailing": {
    "hi": "Martial Arts विस्तृत कार्य",
    "gu": "Martial Arts વિગતવાર સેવા"
  },
  "massage pressure reduction": {
    "hi": "Massage pressure reduction",
    "gu": "Massage pressure reduction"
  },
  "material application": {
    "hi": "Material लगाना",
    "gu": "Material લગાવવું"
  },
  "material preparation": {
    "hi": "सामग्री तैयारी",
    "gu": "સામગ્રી તૈયારી"
  },
  "mathematical modeling": {
    "hi": "Mathematical modeling",
    "gu": "Mathematical modeling"
  },
  "matrix operations": {
    "hi": "Matrix operations",
    "gu": "Matrix operations"
  },
  "matter properties": {
    "hi": "Matter properties",
    "gu": "Matter properties"
  },
  "mattress cleaning specific detailing": {
    "hi": "गद्दे (मैट्रेस) सफाई विस्तृत कार्य",
    "gu": "ગાદલા (મેટ્રેસ) સફાઈ વિગતવાર સેવા"
  },
  "mcq practice": {
    "hi": "Mcq practice",
    "gu": "Mcq practice"
  },
  "measurement verification": {
    "hi": "Measurement सत्यापन",
    "gu": "Measurement ચકાસણી"
  },
  "medical physics concepts": {
    "hi": "Medical physics concepts",
    "gu": "Medical physics concepts"
  },
  "medicine pickup specific detailing": {
    "hi": "Medicine Pickup विस्तृत कार्य",
    "gu": "Medicine Pickup વિગતવાર સેવા"
  },
  "meditation specific detailing": {
    "hi": "Meditation विस्तृत कार्य",
    "gu": "Meditation વિગતવાર સેવા"
  },
  "meeting scheduling": {
    "hi": "Meeting scheduling",
    "gu": "Meeting scheduling"
  },
  "melody and harmony blending": {
    "hi": "Melody and harmony blending",
    "gu": "Melody and harmony blending"
  },
  "melody arrangement": {
    "hi": "Melody arrangement",
    "gu": "Melody arrangement"
  },
  "mental calculation speed": {
    "hi": "Mental calculation speed",
    "gu": "Mental calculation speed"
  },
  "mental math tricks": {
    "hi": "Mental math tricks",
    "gu": "Mental math tricks"
  },
  "metabolic pathway tracing": {
    "hi": "Metabolic pathway tracing",
    "gu": "Metabolic pathway tracing"
  },
  "metronome practice": {
    "hi": "Metronome practice",
    "gu": "Metronome practice"
  },
  "microbiology basics": {
    "hi": "Microbiology basics",
    "gu": "Microbiology basics"
  },
  "microphone recording test": {
    "hi": "Microphone recording test",
    "gu": "Microphone recording test"
  },
  "microphone technique": {
    "hi": "Microphone technique",
    "gu": "Microphone technique"
  },
  "minor roadside troubleshooting to restore vehicle mobility": {
    "hi": "Minor roadside troubleshooting to restore vehicle mobility",
    "gu": "Minor roadside troubleshooting to restore vehicle mobility"
  },
  "mirror glass polishing": {
    "hi": "दर्पण व कांच पॉलिशिंग",
    "gu": "અરીસા અને કાચ પોલિશિંગ"
  },
  "mirror polishing": {
    "hi": "Mirror पॉलिशिंग",
    "gu": "Mirror પોલિશિંગ"
  },
  "mobile app pairing": {
    "hi": "Mobile app pairing",
    "gu": "Mobile app pairing"
  },
  "mock interviews": {
    "hi": "Mock interviews",
    "gu": "Mock interviews"
  },
  "mock test analysis": {
    "hi": "Mock test analysis",
    "gu": "Mock test analysis"
  },
  "mock test simulation": {
    "hi": "Mock test simulation",
    "gu": "Mock test simulation"
  },
  "mock tests": {
    "hi": "Mock tests",
    "gu": "Mock tests"
  },
  "moisture barrier check": {
    "hi": "नमी अवरोधक जांच",
    "gu": "ભેજ રક્ષક તપાસ"
  },
  "moisture locking": {
    "hi": "Moisture locking",
    "gu": "Moisture locking"
  },
  "moisture locking pack": {
    "hi": "नमी लॉक करने वाला पैक",
    "gu": "ભેજ જાળવી રાખતો પેક"
  },
  "moisturizer application": {
    "hi": "मॉइस्चराइज़र एप्लीकेशन",
    "gu": "મોઇશ્ચરાઇઝર"
  },
  "moisturizing cream": {
    "hi": "Moisturizing cream",
    "gu": "Moisturizing cream"
  },
  "mole calculations": {
    "hi": "Mole calculations",
    "gu": "Mole calculations"
  },
  "molecular geometry mapping": {
    "hi": "Molecular geometry mapping",
    "gu": "Molecular geometry mapping"
  },
  "monthly cook specific detailing": {
    "hi": "Monthly Cook विस्तृत कार्य",
    "gu": "Monthly Cook વિગતવાર સેવા"
  },
  "mosquito control specific detailing": {
    "hi": "Mosquito Control विस्तृत कार्य",
    "gu": "Mosquito Control વિગતવાર સેવા"
  },
  "motherboard inspection": {
    "hi": "Motherboard निरीक्षण",
    "gu": "Motherboard નિરીક્ષણ"
  },
  "motion calculations": {
    "hi": "Motion calculations",
    "gu": "Motion calculations"
  },
  "motion detection testing": {
    "hi": "Motion detection परीक्षण",
    "gu": "Motion detection પરીક્ષણ"
  },
  "motivation sessions": {
    "hi": "Motivation sessions",
    "gu": "Motivation sessions"
  },
  "mount stability verification": {
    "hi": "Mount stability सत्यापन",
    "gu": "Mount stability ચકાસણી"
  },
  "multi layer bubble wrapping for glassware chinaware and fragile decor": {
    "hi": "Multi-layer bubble wrapping for glassware, chinaware, and fragile decor",
    "gu": "Multi-layer bubble wrapping for glassware, chinaware, and fragile decor"
  },
  "multi-layer bubble wrapping for glassware, chinaware, and fragile decor": {
    "hi": "Multi-layer bubble wrapping for glassware, chinaware, and fragile decor",
    "gu": "Multi-layer bubble wrapping for glassware, chinaware, and fragile decor"
  },
  "music beat matching": {
    "hi": "Music beat matching",
    "gu": "Music beat matching"
  },
  "music tempo adaptation": {
    "hi": "Music tempo adaptation",
    "gu": "Music tempo adaptation"
  },
  "music theory basics": {
    "hi": "Music theory basics",
    "gu": "Music theory basics"
  },
  "mustache detailing": {
    "hi": "Mustache विस्तृत कार्य",
    "gu": "Mustache વિગતવાર કાર્ય"
  },
  "nail buffing": {
    "hi": "नाखून बफिंग व शाइन",
    "gu": "નખ બફિંગ અને ચમક"
  },
  "nail cleaning": {
    "hi": "नाखून (नेल) सफाई",
    "gu": "નખ સફાઈ"
  },
  "nail clipping": {
    "hi": "नाखून काटना",
    "gu": "નખ કાપવા"
  },
  "nail cuticle detailing": {
    "hi": "Nail cuticle विस्तृत कार्य",
    "gu": "Nail cuticle વિગતવાર કાર્ય"
  },
  "nail edge refinement": {
    "hi": "Nail edge refinement",
    "gu": "Nail edge refinement"
  },
  "nail filing and shaping": {
    "hi": "नाखून फाइल व शेपिंग",
    "gu": "નખ ફાઇલિંગ અને શેપિંગ"
  },
  "nail polish evenness check": {
    "hi": "Nail polish evenness जांच",
    "gu": "Nail polish evenness તપાસ"
  },
  "nail polish removal": {
    "hi": "नेल पॉलिश हटाना",
    "gu": "નેઇલ પોલિશ દૂર કરવી"
  },
  "nail shaping": {
    "hi": "नाखून शेपिंग व पॉलिश",
    "gu": "નખ શેપિંગ અને પોલિશ"
  },
  "nail surface smoothing": {
    "hi": "Nail surface smoothing",
    "gu": "Nail surface smoothing"
  },
  "nail trimming": {
    "hi": "Nail trimming",
    "gu": "Nail trimming"
  },
  "nail trimming and shaping": {
    "hi": "नाखून काटना व आकार देना",
    "gu": "નખ કાપવા અને શેપ આપવો"
  },
  "ncert line by line review": {
    "hi": "Ncert line-by-line review",
    "gu": "Ncert line-by-line review"
  },
  "ncert line-by-line review": {
    "hi": "Ncert line-by-line review",
    "gu": "Ncert line-by-line review"
  },
  "neck coverage": {
    "hi": "Neck coverage",
    "gu": "Neck coverage"
  },
  "neck massage": {
    "hi": "गर्दन की मसाज",
    "gu": "ગરદન મસાજ"
  },
  "neck relaxation": {
    "hi": "गर्दन को रिलैक्सेशन",
    "gu": "ગળાનો આરામ"
  },
  "neckline cleanup": {
    "hi": "Neckline cleanup",
    "gu": "Neckline cleanup"
  },
  "neckline shaping": {
    "hi": "Neckline shaping",
    "gu": "Neckline shaping"
  },
  "negative marking avoidance": {
    "hi": "Negative marking avoidance",
    "gu": "Negative marking avoidance"
  },
  "negative marking strategy": {
    "hi": "Negative marking strategy",
    "gu": "Negative marking strategy"
  },
  "nervousness management": {
    "hi": "Nervousness प्रबंधन",
    "gu": "Nervousness સંચાલન"
  },
  "network protocols": {
    "hi": "Network protocols",
    "gu": "Network protocols"
  },
  "newspaper reading techniques": {
    "hi": "Newspaper reading techniques",
    "gu": "Newspaper reading techniques"
  },
  "number theory": {
    "hi": "Number theory",
    "gu": "Number theory"
  },
  "numerical answer type practice": {
    "hi": "Numerical answer type practice",
    "gu": "Numerical answer type practice"
  },
  "numerical chemistry practice": {
    "hi": "Numerical chemistry practice",
    "gu": "Numerical chemistry practice"
  },
  "numerical derivation": {
    "hi": "Numerical derivation",
    "gu": "Numerical derivation"
  },
  "nutrition consultation specific detailing": {
    "hi": "Nutrition परामर्श विस्तृत कार्य",
    "gu": "Nutrition સલાહ વિગતવાર સેવા"
  },
  "obedience training specific detailing": {
    "hi": "Obedience प्रशिक्षण विस्तृत कार्य",
    "gu": "Obedience તાલીમ વિગતવાર સેવા"
  },
  "object oriented programming": {
    "hi": "Object-oriented programming",
    "gu": "Object-oriented programming"
  },
  "object-oriented programming": {
    "hi": "Object-oriented programming",
    "gu": "Object-oriented programming"
  },
  "objective question elimination": {
    "hi": "Objective question elimination",
    "gu": "Objective question elimination"
  },
  "observation recording": {
    "hi": "Observation recording",
    "gu": "Observation recording"
  },
  "octave stretching": {
    "hi": "Octave stretching",
    "gu": "Octave stretching"
  },
  "odor neutralization": {
    "hi": "Odor neutralization",
    "gu": "Odor neutralization"
  },
  "oil distribution": {
    "hi": "Oil distribution",
    "gu": "Oil distribution"
  },
  "on demand point to point intra city package pickup and delivery": {
    "hi": "On-demand point-to-point intra-city package pickup and डिलीवरी",
    "gu": "On-demand point-to-point intra-city package pickup and ડિલિવરી"
  },
  "on demand roadside assistance for immobilized passenger cars and bikes": {
    "hi": "On-demand roadside assistance for immobilized passenger cars and bikes",
    "gu": "On-demand roadside assistance for immobilized passenger cars and bikes"
  },
  "on-demand point-to-point intra-city package pickup and delivery": {
    "hi": "On-demand point-to-point intra-city package pickup and डिलीवरी",
    "gu": "On-demand point-to-point intra-city package pickup and ડિલિવરી"
  },
  "on-demand roadside assistance for immobilized passenger cars and bikes": {
    "hi": "On-demand roadside assistance for immobilized passenger cars and bikes",
    "gu": "On-demand roadside assistance for immobilized passenger cars and bikes"
  },
  "one time cook specific detailing": {
    "hi": "One-Time Cook विस्तृत कार्य",
    "gu": "One-Time Cook વિગતવાર સેવા"
  },
  "one-time cook specific detailing": {
    "hi": "One-Time Cook विस्तृत कार्य",
    "gu": "One-Time Cook વિગતવાર સેવા"
  },
  "operating system boot test": {
    "hi": "Operating system boot test",
    "gu": "Operating system boot test"
  },
  "optics diagrams": {
    "hi": "Optics diagrams",
    "gu": "Optics diagrams"
  },
  "optional unboxing assistance and packing material debris removal staging": {
    "hi": "Optional unboxing assistance and packing material debris removal staging",
    "gu": "Optional unboxing assistance and packing material debris removal staging"
  },
  "organic synthesis routes": {
    "hi": "Organic synthesis routes",
    "gu": "Organic synthesis routes"
  },
  "organized unloading and zone by zone distribution at new office": {
    "hi": "Organized unloading and zone-by-zone distribution at new office",
    "gu": "Organized unloading and zone-by-zone distribution at new office"
  },
  "organized unloading and zone-by-zone distribution at new office": {
    "hi": "Organized unloading and zone-by-zone distribution at new office",
    "gu": "Organized unloading and zone-by-zone distribution at new office"
  },
  "outline trimming": {
    "hi": "Outline trimming",
    "gu": "Outline trimming"
  },
  "oxidation states calculation": {
    "hi": "Oxidation states calculation",
    "gu": "Oxidation states calculation"
  },
  "pack drying time monitoring": {
    "hi": "पैक सुखाने की निगरानी",
    "gu": "પેક સુકાવાની દેખરેખ"
  },
  "pack removal": {
    "hi": "पैक हटाना",
    "gu": "પેક હટાવવું"
  },
  "palm hydration": {
    "hi": "Palm हाइड्रेशन",
    "gu": "Palm હાઇડ્રેશન"
  },
  "paradiddle exercises": {
    "hi": "Paradiddle exercises",
    "gu": "Paradiddle exercises"
  },
  "part time cook specific detailing": {
    "hi": "Part-Time Cook विस्तृत कार्य",
    "gu": "Part-Time Cook વિગતવાર સેવા"
  },
  "part-time cook specific detailing": {
    "hi": "Part-Time Cook विस्तृत कार्य",
    "gu": "Part-Time Cook વિગતવાર સેવા"
  },
  "parting alignment": {
    "hi": "Parting संरेखण (अलाइनमेंट)",
    "gu": "Parting અલાઇનમેન્ટ"
  },
  "party decoration specific detailing": {
    "hi": "Party Decoration विस्तृत कार्य",
    "gu": "Party Decoration વિગતવાર સેવા"
  },
  "party event cook specific detailing": {
    "hi": "Party/Event Cook विस्तृत कार्य",
    "gu": "Party/Event Cook વિગતવાર સેવા"
  },
  "party makeup specific detailing": {
    "hi": "Party Makeup विस्तृत कार्य",
    "gu": "Party Makeup વિગતવાર સેવા"
  },
  "party/event cook specific detailing": {
    "hi": "Party/Event Cook विस्तृत कार्य",
    "gu": "Party/Event Cook વિગતવાર સેવા"
  },
  "passage summarization": {
    "hi": "Passage summarization",
    "gu": "Passage summarization"
  },
  "patch test": {
    "hi": "स्किन पैच टेस्ट",
    "gu": "સ્કિન પેચ ટેસ્ટ"
  },
  "pause utilization": {
    "hi": "Pause utilization",
    "gu": "Pause utilization"
  },
  "pedal techniques": {
    "hi": "Pedal techniques",
    "gu": "Pedal techniques"
  },
  "performance analysis": {
    "hi": "Performance analysis",
    "gu": "Performance analysis"
  },
  "performance etiquette": {
    "hi": "Performance etiquette",
    "gu": "Performance etiquette"
  },
  "performance stage presence": {
    "hi": "Performance stage-presence",
    "gu": "Performance stage-presence"
  },
  "performance stage-presence": {
    "hi": "Performance stage-presence",
    "gu": "Performance stage-presence"
  },
  "periodic trend analysis": {
    "hi": "Periodic trend analysis",
    "gu": "Periodic trend analysis"
  },
  "personal shopping assistance": {
    "hi": "Personal shopping सहायता",
    "gu": "Personal shopping સહાય"
  },
  "personal trainer specific detailing": {
    "hi": "Personal Trainer विस्तृत कार्य",
    "gu": "Personal Trainer વિગતવાર સેવા"
  },
  "personal yoga specific detailing": {
    "hi": "Personal Yoga विस्तृत कार्य",
    "gu": "Personal Yoga વિગતવાર સેવા"
  },
  "personalized feedback": {
    "hi": "Personalized feedback",
    "gu": "Personalized feedback"
  },
  "personalized hair consultation": {
    "hi": "व्यक्तिगत हेयर परामर्श",
    "gu": "વ્યક્તિગત હેર કન્સલ્ટેશન"
  },
  "pet boarding specific detailing": {
    "hi": "Pet Boarding विस्तृत कार्य",
    "gu": "Pet Boarding વિગતવાર સેવા"
  },
  "pet comfort and hygiene check": {
    "hi": "Pet comfort and hygiene जांच",
    "gu": "Pet comfort and hygiene તપાસ"
  },
  "pet feeding specific detailing": {
    "hi": "Pet Feeding विस्तृत कार्य",
    "gu": "Pet Feeding વિગતવાર સેવા"
  },
  "pet sitting specific detailing": {
    "hi": "Pet Sitting विस्तृत कार्य",
    "gu": "Pet Sitting વિગતવાર સેવા"
  },
  "phonetics training": {
    "hi": "Phonetics प्रशिक्षण",
    "gu": "Phonetics તાલીમ"
  },
  "photo editing specific detailing": {
    "hi": "Photo Editing विस्तृत कार्य",
    "gu": "Photo Editing વિગતવાર સેવા"
  },
  "physical chemistry numerics": {
    "hi": "Physical chemistry numerics",
    "gu": "Physical chemistry numerics"
  },
  "physiotherapy specific detailing": {
    "hi": "Physiotherapy विस्तृत कार्य",
    "gu": "Physiotherapy વિગતવાર સેવા"
  },
  "pick handling": {
    "hi": "Pick handling",
    "gu": "Pick handling"
  },
  "pigmentation softening": {
    "hi": "Pigmentation softening",
    "gu": "Pigmentation softening"
  },
  "pipe fitting verification": {
    "hi": "पाइप फिटिंग जांच",
    "gu": "પાઇપ ફિટિંગ તપાસ"
  },
  "pitch and tone modulation": {
    "hi": "Pitch and tone modulation",
    "gu": "Pitch and tone modulation"
  },
  "pitch bend practice": {
    "hi": "Pitch bend practice",
    "gu": "Pitch bend practice"
  },
  "pitch correction": {
    "hi": "Pitch correction",
    "gu": "Pitch correction"
  },
  "plant physiology": {
    "hi": "Plant physiology",
    "gu": "Plant physiology"
  },
  "poetry interpretation": {
    "hi": "Poetry interpretation",
    "gu": "Poetry interpretation"
  },
  "point to point secure document pickup and direct delivery": {
    "hi": "Point-to-point secure document pickup and direct डिलीवरी",
    "gu": "Point-to-point secure document pickup and direct ડિલિવરી"
  },
  "point-to-point secure document pickup and direct delivery": {
    "hi": "Point-to-point secure document pickup and direct डिलीवरी",
    "gu": "Point-to-point secure document pickup and direct ડિલિવરી"
  },
  "political science theories": {
    "hi": "Political science theories",
    "gu": "Political science theories"
  },
  "polity and governance": {
    "hi": "Polity and governance",
    "gu": "Polity and governance"
  },
  "polymer chemistry": {
    "hi": "Polymer chemistry",
    "gu": "Polymer chemistry"
  },
  "pore opening check": {
    "hi": "Pore opening जांच",
    "gu": "Pore opening તપાસ"
  },
  "pore soothing": {
    "hi": "Pore soothing",
    "gu": "Pore soothing"
  },
  "portrait photography specific detailing": {
    "hi": "Portrait फोटोग्राफी विस्तृत कार्य",
    "gu": "Portrait ફોટોગ્રાફી વિગતવાર સેવા"
  },
  "post cut styling": {
    "hi": "हेयरकट उपरांत स्टाइलिंग",
    "gu": "કટ પછી સ્ટાઇલિંગ"
  },
  "post cut wash": {
    "hi": "Post-cut धुलाई",
    "gu": "Post-cut ધોવું"
  },
  "post service inspection and cleanup": {
    "hi": "सेवा उपरांत निरीक्षण व सफाई",
    "gu": "સેવા પછી તપાસ અને સફાઈ"
  },
  "post-cut wash": {
    "hi": "Post-cut धुलाई",
    "gu": "Post-cut ધોવું"
  },
  "posture alignment": {
    "hi": "Posture संरेखण (अलाइनमेंट)",
    "gu": "Posture અલાઇનમેન્ટ"
  },
  "posture and alignment": {
    "hi": "Posture and संरेखण (अलाइनमेंट)",
    "gu": "Posture and અલાઇનમેન્ટ"
  },
  "posture and fingering": {
    "hi": "Posture and fingering",
    "gu": "Posture and fingering"
  },
  "posture and holding": {
    "hi": "Posture and holding",
    "gu": "Posture and holding"
  },
  "posture correction": {
    "hi": "Posture correction",
    "gu": "Posture correction"
  },
  "powder application": {
    "hi": "पाउडर लगाना",
    "gu": "પાવડર લગાવવો"
  },
  "power connection verification": {
    "hi": "Power connection सत्यापन",
    "gu": "Power connection ચકાસણી"
  },
  "power isolation safety check": {
    "hi": "पावर आइसोलेशन सुरक्षा जांच",
    "gu": "પાવર આઇસોલેશન સુરક્ષા તપાસ"
  },
  "practical examples": {
    "hi": "Practical examples",
    "gu": "Practical examples"
  },
  "pre cleansing": {
    "hi": "प्रारंभिक सफाई",
    "gu": "પ્રારંભિક સફાઈ"
  },
  "pre cut wash": {
    "hi": "Pre-cut धुलाई",
    "gu": "Pre-cut ધોવું"
  },
  "pre treatment wash": {
    "hi": "उपचार पूर्व धुलाई",
    "gu": "ટ્રીટમેન્ટ પૂર્વે ધોવું"
  },
  "pre trip vehicle condition inspection odometer fuel level scratch log": {
    "hi": "Pre-trip vehicle condition inspection (odometer, fuel level, scratch log)",
    "gu": "Pre-trip vehicle condition inspection (odometer, fuel level, scratch log)"
  },
  "pre-cleansing": {
    "hi": "प्रारंभिक सफाई",
    "gu": "પ્રારંભિક સફાઈ"
  },
  "pre-cut wash": {
    "hi": "Pre-cut धुलाई",
    "gu": "Pre-cut ધોવું"
  },
  "pre-treatment wash": {
    "hi": "उपचार पूर्व धुलाई",
    "gu": "ટ્રીટમેન્ટ પૂર્વે ધોવું"
  },
  "pre-trip vehicle condition inspection (odometer, fuel level, scratch log)": {
    "hi": "Pre-trip vehicle condition inspection (odometer, fuel level, scratch log)",
    "gu": "Pre-trip vehicle condition inspection (odometer, fuel level, scratch log)"
  },
  "precise waist tucking and height alignment": {
    "hi": "Precise waist tucking and height संरेखण (अलाइनमेंट)",
    "gu": "Precise waist tucking and height અલાઇનમેન્ટ"
  },
  "precision base coat application": {
    "hi": "Precision base coat लगाना",
    "gu": "Precision base coat લગાવવું"
  },
  "precision baseboard wiping": {
    "hi": "Precision baseboard पोंछना",
    "gu": "Precision baseboard લૂછવું"
  },
  "precision calf massaging": {
    "hi": "Precision calf massaging",
    "gu": "Precision calf massaging"
  },
  "precision cotton threading": {
    "hi": "सटीक कॉटन थ्रेडिंग",
    "gu": "સટીક કોટન થ્રેડિંગ"
  },
  "precision cutting": {
    "hi": "Precision cutting",
    "gu": "Precision cutting"
  },
  "precision execution step": {
    "hi": "Precision execution step",
    "gu": "Precision execution step"
  },
  "precision fading": {
    "hi": "Precision fading",
    "gu": "Precision fading"
  },
  "precision grout line scrubbing": {
    "hi": "Precision grout line स्क्रबिंग",
    "gu": "Precision grout line સ્ક્રબિંગ"
  },
  "precision haircutting": {
    "hi": "सटीक हेयरकटिंग",
    "gu": "ચોક્કસ હેરકટિંગ"
  },
  "precision lip shaping and long lasting lipstick": {
    "hi": "Precision lip shaping and long-lasting lipstick",
    "gu": "Precision lip shaping and long-lasting lipstick"
  },
  "precision lip shaping and long-lasting lipstick": {
    "hi": "Precision lip shaping and long-lasting lipstick",
    "gu": "Precision lip shaping and long-lasting lipstick"
  },
  "precision service standard verification": {
    "hi": "Precision service standard सत्यापन",
    "gu": "Precision service standard ચકાસણી"
  },
  "precision tool setup": {
    "hi": "Precision tool सेटअप",
    "gu": "Precision tool સેટઅપ"
  },
  "precision wall drilling": {
    "hi": "Precision wall drilling",
    "gu": "Precision wall drilling"
  },
  "prelims elimination tricks": {
    "hi": "Prelims elimination tricks",
    "gu": "Prelims elimination tricks"
  },
  "premium cuticle softening": {
    "hi": "Premium cuticle softening",
    "gu": "Premium cuticle softening"
  },
  "premium grout line scrubbing": {
    "hi": "Premium grout line स्क्रबिंग",
    "gu": "Premium grout line સ્ક્રબિંગ"
  },
  "premium nail trimming": {
    "hi": "Premium nail trimming",
    "gu": "Premium nail trimming"
  },
  "premium service standard verification": {
    "hi": "Premium service standard सत्यापन",
    "gu": "Premium service standard ચકાસણી"
  },
  "presentation formatting": {
    "hi": "Presentation formatting",
    "gu": "Presentation formatting"
  },
  "presentation skills": {
    "hi": "Presentation skills",
    "gu": "Presentation skills"
  },
  "pressure point activation": {
    "hi": "प्रेशर पॉइंट एक्टिवेशन",
    "gu": "પ્રેશર પોઇન્ટ એક્ટિવેશન"
  },
  "pressure point therapy": {
    "hi": "प्रेशर पॉइंट थेरेपी",
    "gu": "પ્રેશર પોઇન્ટ થેરાપી"
  },
  "previous year gate questions": {
    "hi": "Previous year gate questions",
    "gu": "Previous year gate questions"
  },
  "previous year paper analysis": {
    "hi": "Previous year paper analysis",
    "gu": "Previous year paper analysis"
  },
  "previous year paper solving": {
    "hi": "Previous year paper solving",
    "gu": "Previous year paper solving"
  },
  "previous year problem solving": {
    "hi": "Previous year problem solving",
    "gu": "Previous year problem solving"
  },
  "probability calculations": {
    "hi": "Probability calculations",
    "gu": "Probability calculations"
  },
  "processing time monitoring": {
    "hi": "Processing time monitoring",
    "gu": "Processing time monitoring"
  },
  "product photography specific detailing": {
    "hi": "Product फोटोग्राफी विस्तृत कार्य",
    "gu": "Product ફોટોગ્રાફી વિગતવાર સેવા"
  },
  "professional room by room packing of household or office belongings": {
    "hi": "Professional room-by-room packing of household or office belongings",
    "gu": "Professional room-by-room packing of household or office belongings"
  },
  "professional room-by-room packing of household or office belongings": {
    "hi": "Professional room-by-room packing of household or office belongings",
    "gu": "Professional room-by-room packing of household or office belongings"
  },
  "progress tracking": {
    "hi": "Progress tracking",
    "gu": "Progress tracking"
  },
  "promotional video specific detailing": {
    "hi": "Promotional Video विस्तृत कार्य",
    "gu": "Promotional Video વિગતવાર સેવા"
  },
  "pronunciation correction": {
    "hi": "Pronunciation correction",
    "gu": "Pronunciation correction"
  },
  "pronunciation practice": {
    "hi": "Pronunciation practice",
    "gu": "Pronunciation practice"
  },
  "proofreading skills": {
    "hi": "Proofreading skills",
    "gu": "Proofreading skills"
  },
  "protective cargo tie downs during transit": {
    "hi": "Protective cargo tie-downs during transit",
    "gu": "Protective cargo tie-downs during transit"
  },
  "protective cargo tie-downs during transit": {
    "hi": "Protective cargo tie-downs during transit",
    "gu": "Protective cargo tie-downs during transit"
  },
  "protective handling in moisture resistant transport pouch": {
    "hi": "Protective handling in moisture-resistant transport pouch",
    "gu": "Protective handling in moisture-resistant transport pouch"
  },
  "protective handling in moisture-resistant transport pouch": {
    "hi": "Protective handling in moisture-resistant transport pouch",
    "gu": "Protective handling in moisture-resistant transport pouch"
  },
  "protective handling in weather resistant courier cargo carriers": {
    "hi": "Protective handling in weather-resistant courier cargo carriers",
    "gu": "Protective handling in weather-resistant courier cargo carriers"
  },
  "protective handling in weather-resistant courier cargo carriers": {
    "hi": "Protective handling in weather-resistant courier cargo carriers",
    "gu": "Protective handling in weather-resistant courier cargo carriers"
  },
  "protective quilted blankets for major appliances and large furniture items": {
    "hi": "Protective quilted blankets for major appliances and large furniture items",
    "gu": "Protective quilted blankets for major appliances and large furniture items"
  },
  "protective quilted moving blanket wrapping for polished wooden surfaces": {
    "hi": "Protective quilted moving blanket wrapping for polished wooden surfaces",
    "gu": "Protective quilted moving blanket wrapping for polished wooden surfaces"
  },
  "protective transport to designated local recipient address or courier hub": {
    "hi": "Protective transport to designated local recipient address or courier hub",
    "gu": "Protective transport to designated local recipient address or courier hub"
  },
  "protective tyre dressing and exterior vinyl trim conditioning": {
    "hi": "Protective tyre dressing and exterior vinyl trim कंडीशनिंग",
    "gu": "Protective tyre dressing and exterior vinyl trim કન્ડિશનિંગ"
  },
  "protective tyre dressing and vinyl polish application": {
    "hi": "Protective tyre dressing and vinyl polish लगाना",
    "gu": "Protective tyre dressing and vinyl polish લગાવવું"
  },
  "protein pack application": {
    "hi": "Protein pack लगाना",
    "gu": "Protein pack લગાવવું"
  },
  "pumice stone rubbing": {
    "hi": "झांवा पत्थर (प्यूमिस स्टोन) से घिसाई",
    "gu": "પ્યુમિસ સ્ટોન વડે સફાઈ"
  },
  "punjabi food specific detailing": {
    "hi": "Punjabi Food विस्तृत कार्य",
    "gu": "Punjabi Food વિગતવાર સેવા"
  },
  "puppy training specific detailing": {
    "hi": "Puppy प्रशिक्षण विस्तृत कार्य",
    "gu": "Puppy તાલીમ વિગતવાર સેવા"
  },
  "puzzle solving": {
    "hi": "Puzzle solving",
    "gu": "Puzzle solving"
  },
  "quality adherence check": {
    "hi": "Quality adherence जांच",
    "gu": "Quality adherence તપાસ"
  },
  "quality assurance": {
    "hi": "Quality assurance",
    "gu": "Quality assurance"
  },
  "quantitative aptitude": {
    "hi": "Quantitative aptitude",
    "gu": "Quantitative aptitude"
  },
  "quantitative aptitude tricks": {
    "hi": "Quantitative aptitude tricks",
    "gu": "Quantitative aptitude tricks"
  },
  "radiance blush and highlighter application": {
    "hi": "Radiance blush and highlighter लगाना",
    "gu": "Radiance blush and highlighter લગાવવું"
  },
  "radiator coolant and engine oil level visual check": {
    "hi": "Radiator coolant and engine oil level visual जांच",
    "gu": "Radiator coolant and engine oil level visual તપાસ"
  },
  "raga taal basics": {
    "hi": "Raga/taal basics",
    "gu": "Raga/taal basics"
  },
  "raga/taal basics": {
    "hi": "Raga/taal basics",
    "gu": "Raga/taal basics"
  },
  "ram seating check": {
    "hi": "Ram seating जांच",
    "gu": "Ram seating તપાસ"
  },
  "rapid budget friendly relocation for 1 bhk flats studio apartments or pg rooms": {
    "hi": "Rapid, budget-friendly relocation for 1 BHK flats, studio apartments, or PG rooms",
    "gu": "Rapid, budget-friendly relocation for 1 BHK flats, studio apartments, or PG rooms"
  },
  "rapid, budget-friendly relocation for 1 bhk flats, studio apartments, or pg rooms": {
    "hi": "Rapid, budget-friendly relocation for 1 BHK flats, studio apartments, or PG rooms",
    "gu": "Rapid, budget-friendly relocation for 1 BHK flats, studio apartments, or PG rooms"
  },
  "razor finish": {
    "hi": "Razor finish",
    "gu": "Razor finish"
  },
  "reaction pathways": {
    "hi": "Reaction pathways",
    "gu": "Reaction pathways"
  },
  "reading comprehension": {
    "hi": "Reading comprehension",
    "gu": "Reading comprehension"
  },
  "reading comprehension speed": {
    "hi": "Reading comprehension speed",
    "gu": "Reading comprehension speed"
  },
  "reading fluency": {
    "hi": "Reading fluency",
    "gu": "Reading fluency"
  },
  "reading practice": {
    "hi": "Reading practice",
    "gu": "Reading practice"
  },
  "real estate photography specific detailing": {
    "hi": "Real Estate फोटोग्राफी विस्तृत कार्य",
    "gu": "Real Estate ફોટોગ્રાફી વિગતવાર સેવા"
  },
  "real time dispatch and collection confirmation updates": {
    "hi": "Real-time dispatch and collection confirmation updates",
    "gu": "Real-time dispatch and collection confirmation updates"
  },
  "real time dispatch status notification": {
    "hi": "Real-time dispatch status notification",
    "gu": "Real-time dispatch status notification"
  },
  "real-time dispatch and collection confirmation updates": {
    "hi": "Real-time dispatch and collection confirmation updates",
    "gu": "Real-time dispatch and collection confirmation updates"
  },
  "real-time dispatch status notification": {
    "hi": "Real-time dispatch status notification",
    "gu": "Real-time dispatch status notification"
  },
  "reasoning ability": {
    "hi": "Reasoning ability",
    "gu": "Reasoning ability"
  },
  "reasoning practice": {
    "hi": "Reasoning practice",
    "gu": "Reasoning practice"
  },
  "receipt handover and digital delivery confirmation": {
    "hi": "Receipt handover and digital delivery confirmation",
    "gu": "Receipt handover and digital delivery confirmation"
  },
  "record keeping": {
    "hi": "Record keeping",
    "gu": "Record keeping"
  },
  "redness reduction": {
    "hi": "Redness reduction",
    "gu": "Redness reduction"
  },
  "redness reduction wipe": {
    "hi": "लालिमा कम करने वाला वाइप",
    "gu": "લાલાશ ઘટાડતો વાઇપ"
  },
  "registry cleanup": {
    "hi": "Registry cleanup",
    "gu": "Registry cleanup"
  },
  "relaxation finish": {
    "hi": "रिलैक्सेशन फिनिश",
    "gu": "રિલેક્સેશન ફિનિશ"
  },
  "relaxation massage specific detailing": {
    "hi": "रिलैक्सेशन मसाज विस्तृत कार्य",
    "gu": "રિલેક્સેશન મસાજ વિગતવાર સેવા"
  },
  "relaxing foot massage": {
    "hi": "आरामदायक फुट मसाज",
    "gu": "રિલેક્સિંગ ફૂટ મસાજ"
  },
  "remote monitoring verification": {
    "hi": "Remote monitoring सत्यापन",
    "gu": "Remote monitoring ચકાસણી"
  },
  "remote pairing": {
    "hi": "Remote pairing",
    "gu": "Remote pairing"
  },
  "report generation": {
    "hi": "Report generation",
    "gu": "Report generation"
  },
  "research assistance": {
    "hi": "Research सहायता",
    "gu": "Research સહાય"
  },
  "residue wash out": {
    "hi": "अवशेषों की धुलाई",
    "gu": "અવશેષો ધોઈ નાખવા"
  },
  "residue wipe": {
    "hi": "अवशेष पोंछना व सफाई",
    "gu": "અવશેષો સાફ કરવા"
  },
  "residue wiping": {
    "hi": "अवशेष पोंछना व सफाई",
    "gu": "અવશેષો સાફ કરવા"
  },
  "resonance control": {
    "hi": "Resonance control",
    "gu": "Resonance control"
  },
  "result stability check": {
    "hi": "Result stability जांच",
    "gu": "Result stability તપાસ"
  },
  "return collection and delivery back to customer residence or office": {
    "hi": "Return collection and delivery back to customer residence or office",
    "gu": "Return collection and delivery back to customer residence or office"
  },
  "revision tests": {
    "hi": "Revision tests",
    "gu": "Revision tests"
  },
  "rhythm accompaniment": {
    "hi": "Rhythm accompaniment",
    "gu": "Rhythm accompaniment"
  },
  "rhythm control": {
    "hi": "Rhythm control",
    "gu": "Rhythm control"
  },
  "rhythm patterns": {
    "hi": "Rhythm patterns",
    "gu": "Rhythm patterns"
  },
  "rhythm rudiments": {
    "hi": "Rhythm rudiments",
    "gu": "Rhythm rudiments"
  },
  "rhythm synchronization": {
    "hi": "Rhythm synchronization",
    "gu": "Rhythm synchronization"
  },
  "room by room distribution of boxes and furniture at destination": {
    "hi": "Room-by-room distribution of boxes and furniture at destination",
    "gu": "Room-by-room distribution of boxes and furniture at destination"
  },
  "room mapping": {
    "hi": "Room mapping",
    "gu": "Room mapping"
  },
  "room-by-room distribution of boxes and furniture at destination": {
    "hi": "Room-by-room distribution of boxes and furniture at destination",
    "gu": "Room-by-room distribution of boxes and furniture at destination"
  },
  "root to tip application": {
    "hi": "जड़ से सिरे तक पोषण",
    "gu": "મૂળથી છેડા સુધી પોષણ"
  },
  "root touch up": {
    "hi": "Root touch-up",
    "gu": "Root touch-up"
  },
  "root touch-up": {
    "hi": "Root touch-up",
    "gu": "Root touch-up"
  },
  "root-to-tip application": {
    "hi": "जड़ से सिरे तक पोषण",
    "gu": "મૂળથી છેડા સુધી પોષણ"
  },
  "rosin application": {
    "hi": "Rosin लगाना",
    "gu": "Rosin લગાવવું"
  },
  "safe disciplined driving following all local traffic rules": {
    "hi": "Safe, disciplined driving following all local traffic rules",
    "gu": "Safe, disciplined driving following all local traffic rules"
  },
  "safe, disciplined driving following all local traffic rules": {
    "hi": "Safe, disciplined driving following all local traffic rules",
    "gu": "Safe, disciplined driving following all local traffic rules"
  },
  "safety grounding test": {
    "hi": "सुरक्षा ग्राउंडिंग टेस्ट",
    "gu": "સુરક્ષા અર્થિંગ ટેસ્ટ"
  },
  "safety protocol adherence": {
    "hi": "Safety protocol adherence",
    "gu": "Safety protocol adherence"
  },
  "safety protocol implementation": {
    "hi": "Safety protocol implementation",
    "gu": "Safety protocol implementation"
  },
  "sanitized tools disposable cape": {
    "hi": "सैनिटाइज्ड उपकरण व डिस्पोजेबल केप",
    "gu": "સેનિટાઇઝ્ડ સાધનો અને કેપ"
  },
  "saree draping specific detailing": {
    "hi": "Saree Draping विस्तृत कार्य",
    "gu": "Saree Draping વિગતવાર સેવા"
  },
  "saree fabric assessment and styling consultation": {
    "hi": "Saree fabric assessment and styling परामर्श",
    "gu": "Saree fabric assessment and styling સલાહ"
  },
  "scale practice": {
    "hi": "Scale practice",
    "gu": "Scale practice"
  },
  "scale running": {
    "hi": "Scale running",
    "gu": "Scale running"
  },
  "scalp condition assessment": {
    "hi": "स्कैल्प की स्थिति की जांच",
    "gu": "સ્કેલ્પ સ્થિતિ તપાસ"
  },
  "scalp pressure massage": {
    "hi": "Scalp pressure मालिश",
    "gu": "Scalp pressure માલિશ"
  },
  "scalp stimulation": {
    "hi": "Scalp stimulation",
    "gu": "Scalp stimulation"
  },
  "scheduled doorstep collection of pre packed courier parcels and return boxes": {
    "hi": "Scheduled doorstep collection of pre-packed courier parcels and return boxes",
    "gu": "Scheduled doorstep collection of pre-packed courier parcels and return boxes"
  },
  "scheduled doorstep collection of pre-packed courier parcels and return boxes": {
    "hi": "Scheduled doorstep collection of pre-packed courier parcels and return boxes",
    "gu": "Scheduled doorstep collection of pre-packed courier parcels and return boxes"
  },
  "science fundamentals": {
    "hi": "Science fundamentals",
    "gu": "Science fundamentals"
  },
  "scientific concept explanation": {
    "hi": "Scientific concept explanation",
    "gu": "Scientific concept explanation"
  },
  "scientific reasoning": {
    "hi": "Scientific reasoning",
    "gu": "Scientific reasoning"
  },
  "scissor over comb technique": {
    "hi": "Scissor over comb technique",
    "gu": "Scissor over comb technique"
  },
  "scissor stray hair cutting": {
    "hi": "Scissor stray hair cutting",
    "gu": "Scissor stray hair cutting"
  },
  "scratch free microfiber cloth drying and air blower dusting": {
    "hi": "Scratch-free microfiber cloth drying and air blower dusting",
    "gu": "Scratch-free microfiber cloth drying and air blower dusting"
  },
  "scratch-free microfiber cloth drying and air blower dusting": {
    "hi": "Scratch-free microfiber cloth drying and air blower dusting",
    "gu": "Scratch-free microfiber cloth drying and air blower dusting"
  },
  "screen ribbon cable seating": {
    "hi": "Screen ribbon cable seating",
    "gu": "Screen ribbon cable seating"
  },
  "scrubbing intensity reduction": {
    "hi": "Scrubbing intensity reduction",
    "gu": "Scrubbing intensity reduction"
  },
  "secondary execution phase": {
    "hi": "Secondary execution phase",
    "gu": "Secondary execution phase"
  },
  "section by section coating": {
    "hi": "Section-by-section coating",
    "gu": "Section-by-section coating"
  },
  "section-by-section coating": {
    "hi": "Section-by-section coating",
    "gu": "Section-by-section coating"
  },
  "sectional mock tests": {
    "hi": "Sectional mock tests",
    "gu": "Sectional mock tests"
  },
  "sectioning and heat protectant application": {
    "hi": "Sectioning and heat protectant लगाना",
    "gu": "Sectioning and heat protectant લગાવવું"
  },
  "secure carton sealing with heavy duty packaging tape": {
    "hi": "Secure carton sealing with heavy-duty packaging tape",
    "gu": "Secure carton sealing with heavy-duty packaging tape"
  },
  "secure carton sealing with heavy-duty packaging tape": {
    "hi": "Secure carton sealing with heavy-duty packaging tape",
    "gu": "Secure carton sealing with heavy-duty packaging tape"
  },
  "secure fastening": {
    "hi": "Secure fastening",
    "gu": "Secure fastening"
  },
  "secure lashing and vehicle transportation to new residential address": {
    "hi": "Secure lashing and vehicle transportation to new residential address",
    "gu": "Secure lashing and vehicle transportation to new residential address"
  },
  "secure loading tie down strapping and vehicle transport": {
    "hi": "Secure loading, tie-down strapping, and vehicle transport",
    "gu": "Secure loading, tie-down strapping, and vehicle transport"
  },
  "secure loading, tie-down strapping, and vehicle transport": {
    "hi": "Secure loading, tie-down strapping, and vehicle transport",
    "gu": "Secure loading, tie-down strapping, and vehicle transport"
  },
  "secure pin placement (bobby pins, u-pins if needed)": {
    "hi": "Secure pin placement (bobby pins, u-pins if needed)",
    "gu": "Secure pin placement (bobby pins, u-pins if needed)"
  },
  "secure pin placement bobby pins u pins if needed": {
    "hi": "Secure pin placement (bobby pins, u-pins if needed)",
    "gu": "Secure pin placement (bobby pins, u-pins if needed)"
  },
  "secure placement of safety pins for day long hold": {
    "hi": "Secure placement of safety pins for day-long hold",
    "gu": "Secure placement of safety pins for day-long hold"
  },
  "secure placement of safety pins for day-long hold": {
    "hi": "Secure placement of safety pins for day-long hold",
    "gu": "Secure placement of safety pins for day-long hold"
  },
  "security system configuration": {
    "hi": "Security system configuration",
    "gu": "Security system configuration"
  },
  "sentence formation": {
    "hi": "Sentence formation",
    "gu": "Sentence formation"
  },
  "sentence structuring": {
    "hi": "Sentence structuring",
    "gu": "Sentence structuring"
  },
  "serum application": {
    "hi": "सीरम लगाना",
    "gu": "સીરમ લગાવવું"
  },
  "serum infusion": {
    "hi": "सीरम इन्फ्यूजन",
    "gu": "સીરમ ઇન્ફ્યુઝન"
  },
  "service area cleanup": {
    "hi": "सर्विस एरिया सफाई",
    "gu": "સર્વિસ એરિયા સફાઈ"
  },
  "service area preparation": {
    "hi": "Service area preparation",
    "gu": "Service area preparation"
  },
  "service standard verification": {
    "hi": "सेवा मानक सत्यापन",
    "gu": "સેવા ધોરણ ચકાસણી"
  },
  "shade selection": {
    "hi": "Shade selection",
    "gu": "Shade selection"
  },
  "sheet music interpretation": {
    "hi": "Sheet music interpretation",
    "gu": "Sheet music interpretation"
  },
  "shine enhancement": {
    "hi": "Shine enhancement",
    "gu": "Shine enhancement"
  },
  "shortcut math tricks": {
    "hi": "Shortcut math tricks",
    "gu": "Shortcut math tricks"
  },
  "shot quality review": {
    "hi": "Shot quality review",
    "gu": "Shot quality review"
  },
  "shoulder pallu pleating and border alignment": {
    "hi": "Shoulder pallu pleating and border संरेखण (अलाइनमेंट)",
    "gu": "Shoulder pallu pleating and border અલાઇનમેન્ટ"
  },
  "shoulder rest adjustment": {
    "hi": "Shoulder rest adjustment",
    "gu": "Shoulder rest adjustment"
  },
  "shoulder tension release": {
    "hi": "Shoulder tension release",
    "gu": "Shoulder tension release"
  },
  "sideburn trimming": {
    "hi": "Sideburn trimming",
    "gu": "Sideburn trimming"
  },
  "sight reading": {
    "hi": "Sight-reading",
    "gu": "Sight-reading"
  },
  "sight-reading": {
    "hi": "Sight-reading",
    "gu": "Sight-reading"
  },
  "singer specific detailing": {
    "hi": "Singer विस्तृत कार्य",
    "gu": "Singer વિગતવાર સેવા"
  },
  "sink drain cleaning": {
    "hi": "सिंक ड्रेन सफाई",
    "gu": "સિંક ડ્રેન સફાઈ"
  },
  "sink polishing": {
    "hi": "Sink पॉलिशिंग",
    "gu": "Sink પોલિશિંગ"
  },
  "site cleanup": {
    "hi": "Site cleanup",
    "gu": "Site cleanup"
  },
  "site inspection and power isolation": {
    "hi": "साइट निरीक्षण व पावर कट",
    "gu": "સાઇટ તપાસ અને પાવર બંધ"
  },
  "skin cleansing": {
    "hi": "त्वचा की सफाई (क्लींजिंग)",
    "gu": "ત્વચા સફાઈ (ક્લીનિંગ)"
  },
  "skin elasticity check": {
    "hi": "Skin elasticity जांच",
    "gu": "Skin elasticity તપાસ"
  },
  "skin hydration check": {
    "hi": "Skin hydration जांच",
    "gu": "Skin hydration તપાસ"
  },
  "skin monitoring": {
    "hi": "Skin monitoring",
    "gu": "Skin monitoring"
  },
  "skin prep": {
    "hi": "Skin prep",
    "gu": "Skin prep"
  },
  "skin prep and primer application": {
    "hi": "Skin prep and primer लगाना",
    "gu": "Skin prep and primer લગાવવું"
  },
  "skin preparation": {
    "hi": "Skin preparation",
    "gu": "Skin preparation"
  },
  "skin soothing": {
    "hi": "त्वचा को राहत",
    "gu": "ત્વચાને રાહત"
  },
  "skin type analysis": {
    "hi": "त्वचा के प्रकार का विश्लेषण",
    "gu": "ત્વચાના પ્રકારનું વિશ્લેષણ"
  },
  "smart camera installation specific detailing": {
    "hi": "Smart Camera इंस्टॉलेशन विस्तृत कार्य",
    "gu": "Smart Camera ઇન્સ્ટોલેશન વિગતવાર સેવા"
  },
  "smart doorbell installation specific detailing": {
    "hi": "Smart Doorbell इंस्टॉलेशन विस्तृत कार्य",
    "gu": "Smart Doorbell ઇન્સ્ટોલેશન વિગતવાર સેવા"
  },
  "smart home setup specific detailing": {
    "hi": "Smart Home सेटअप विस्तृत कार्य",
    "gu": "Smart Home સેટઅપ વિગતવાર સેવા"
  },
  "smart lighting installation specific detailing": {
    "hi": "Smart Lighting इंस्टॉलेशन विस्तृत कार्य",
    "gu": "Smart Lighting ઇન્સ્ટોલેશન વિગતવાર સેવા"
  },
  "smart lock installation specific detailing": {
    "hi": "Smart Lock इंस्टॉलेशन विस्तृत कार्य",
    "gu": "Smart Lock ઇન્સ્ટોલેશન વિગતવાર સેવા"
  },
  "smart lock replacement specific detailing": {
    "hi": "Smart Lock बदलना (रिप्लेसमेंट) विस्तृत कार्य",
    "gu": "Smart Lock રિપ્લેસમેન્ટ વિગતવાર સેવા"
  },
  "smart lock setup specific detailing": {
    "hi": "Smart Lock सेटअप विस्तृत कार्य",
    "gu": "Smart Lock સેટઅપ વિગતવાર સેવા"
  },
  "smart lock troubleshooting specific detailing": {
    "hi": "Smart Lock Troubleshooting विस्तृत कार्य",
    "gu": "Smart Lock Troubleshooting વિગતવાર સેવા"
  },
  "smart sensor installation specific detailing": {
    "hi": "Smart Sensor इंस्टॉलेशन विस्तृत कार्य",
    "gu": "Smart Sensor ઇન્સ્ટોલેશન વિગતવાર સેવા"
  },
  "smart switch installation specific detailing": {
    "hi": "Smart Switch इंस्टॉलेशन विस्तृत कार्य",
    "gu": "Smart Switch ઇન્સ્ટોલેશન વિગતવાર સેવા"
  },
  "smart tv setup": {
    "hi": "Smart tv सेटअप",
    "gu": "Smart tv સેટઅપ"
  },
  "snare and tom fills": {
    "hi": "Snare and tom fills",
    "gu": "Snare and tom fills"
  },
  "social media video specific detailing": {
    "hi": "Social Media Video विस्तृत कार्य",
    "gu": "Social Media Video વિગતવાર સેવા"
  },
  "social structures": {
    "hi": "Social structures",
    "gu": "Social structures"
  },
  "sofa cleaning specific detailing": {
    "hi": "सोफा सफाई विस्तृत कार्य",
    "gu": "સોફા સફાઈ વિગતવાર સેવા"
  },
  "sofa vacuuming": {
    "hi": "सोफा वैक्यूमिंग",
    "gu": "સોફા વેક્યુમિંગ"
  },
  "software development lifecycle": {
    "hi": "Software development lifecycle",
    "gu": "Software development lifecycle"
  },
  "sole smoothing": {
    "hi": "Sole smoothing",
    "gu": "Sole smoothing"
  },
  "soothing oil application": {
    "hi": "Soothing oil लगाना",
    "gu": "Soothing oil લગાવવું"
  },
  "south indian food specific detailing": {
    "hi": "South Indian Food विस्तृत कार्य",
    "gu": "South Indian Food વિગતવાર સેવા"
  },
  "spare wheel replacement for flat tyres (using customer's inflated spare wheel)": {
    "hi": "Spare wheel replacement for flat tyres (using customer's inflated spare wheel)",
    "gu": "Spare wheel replacement for flat tyres (using customer's inflated spare wheel)"
  },
  "spare wheel replacement for flat tyres using customer s inflated spare wheel": {
    "hi": "Spare wheel replacement for flat tyres (using customer's inflated spare wheel)",
    "gu": "Spare wheel replacement for flat tyres (using customer's inflated spare wheel)"
  },
  "spatial awareness": {
    "hi": "Spatial awareness",
    "gu": "Spatial awareness"
  },
  "speaker audio test": {
    "hi": "Speaker audio test",
    "gu": "Speaker audio test"
  },
  "specialized ankle massage": {
    "hi": "Specialized ankle मालिश",
    "gu": "Specialized ankle માલિશ"
  },
  "specialized cuticle softening": {
    "hi": "Specialized cuticle softening",
    "gu": "Specialized cuticle softening"
  },
  "specialized furniture exterior wiping": {
    "hi": "Specialized furniture exterior पोंछना",
    "gu": "Specialized furniture exterior લૂછવું"
  },
  "specialized surface spotlessness verification": {
    "hi": "Specialized surface spotlessness सत्यापन",
    "gu": "Specialized surface spotlessness ચકાસણી"
  },
  "specialty cuisine cook specific detailing": {
    "hi": "Specialty Cuisine Cook विस्तृत कार्य",
    "gu": "Specialty Cuisine Cook વિગતવાર સેવા"
  },
  "speech structuring": {
    "hi": "Speech structuring",
    "gu": "Speech structuring"
  },
  "speed and accuracy drills": {
    "hi": "Speed and accuracy drills",
    "gu": "Speed and accuracy drills"
  },
  "speed drills": {
    "hi": "Speed drills",
    "gu": "Speed drills"
  },
  "speed math": {
    "hi": "Speed math",
    "gu": "Speed math"
  },
  "split end assessment": {
    "hi": "दोमुंहे बालों की जांच",
    "gu": "બે મોઢાવાળા વાળની તપાસ"
  },
  "split end trim": {
    "hi": "स्प्लिट एंड ट्रिम",
    "gu": "સ્પ્લિટ એન્ડ ટ્રિમ"
  },
  "split end trimming": {
    "hi": "Split-end trimming",
    "gu": "Split-end trimming"
  },
  "split-end assessment": {
    "hi": "दोमुंहे बालों की जांच",
    "gu": "બે મોઢાવાળા વાળની તપાસ"
  },
  "split-end trimming": {
    "hi": "Split-end trimming",
    "gu": "Split-end trimming"
  },
  "spoken fluency": {
    "hi": "Spoken fluency",
    "gu": "Spoken fluency"
  },
  "sponge wipe": {
    "hi": "स्पंज से पोंछना",
    "gu": "સ્પોન્જ વડે લૂછવું"
  },
  "sponge wiping": {
    "hi": "स्पंज से सफाई",
    "gu": "સ્પોન્જ વડે સફાઈ"
  },
  "spreader usage": {
    "hi": "Spreader usage",
    "gu": "Spreader usage"
  },
  "spreadsheet management": {
    "hi": "Spreadsheet प्रबंधन",
    "gu": "Spreadsheet સંચાલન"
  },
  "staccato legato bowing": {
    "hi": "Staccato/legato bowing",
    "gu": "Staccato/legato bowing"
  },
  "staccato/legato bowing": {
    "hi": "Staccato/legato bowing",
    "gu": "Staccato/legato bowing"
  },
  "stage movement": {
    "hi": "Stage movement",
    "gu": "Stage movement"
  },
  "stain spot treatment": {
    "hi": "Stain spot उपचार",
    "gu": "Stain spot સારવાર"
  },
  "stain spot-treatment": {
    "hi": "Stain spot उपचार",
    "gu": "Stain spot સારવાર"
  },
  "stamina building": {
    "hi": "Stamina building",
    "gu": "Stamina building"
  },
  "stamina endurance": {
    "hi": "Stamina endurance",
    "gu": "Stamina endurance"
  },
  "standard tools and supplies included": {
    "hi": "मानक उपकरण व सामग्री शामिल",
    "gu": "પ્રમાણિત સાધનો અને સામગ્રી શામેલ"
  },
  "static gk memorization": {
    "hi": "Static gk memorization",
    "gu": "Static gk memorization"
  },
  "statistical analysis": {
    "hi": "Statistical analysis",
    "gu": "Statistical analysis"
  },
  "steam application": {
    "hi": "स्टीम वेपोराइज़र",
    "gu": "સ્ટીમ એપ્લિકેશન"
  },
  "steam assisted absorption": {
    "hi": "Steam-assisted absorption",
    "gu": "Steam-assisted absorption"
  },
  "steam machine setup": {
    "hi": "Steam machine सेटअप",
    "gu": "Steam machine સેટઅપ"
  },
  "steam treatment": {
    "hi": "Steam उपचार",
    "gu": "Steam સારવાર"
  },
  "steam-assisted absorption": {
    "hi": "Steam-assisted absorption",
    "gu": "Steam-assisted absorption"
  },
  "step by step problem solving": {
    "hi": "Step-by-step problem solving",
    "gu": "Step-by-step problem solving"
  },
  "step combinations": {
    "hi": "Step combinations",
    "gu": "Step combinations"
  },
  "step-by-step problem solving": {
    "hi": "Step-by-step problem solving",
    "gu": "Step-by-step problem solving"
  },
  "stick grip and posture": {
    "hi": "Stick grip and posture",
    "gu": "Stick grip and posture"
  },
  "sticky residue wiping": {
    "hi": "Sticky residue पोंछना",
    "gu": "Sticky residue લૂછવું"
  },
  "stoichiometry": {
    "hi": "Stoichiometry",
    "gu": "Stoichiometry"
  },
  "storytelling techniques": {
    "hi": "Storytelling techniques",
    "gu": "Storytelling techniques"
  },
  "strand test": {
    "hi": "Strand test",
    "gu": "Strand test"
  },
  "stray hair tweezing": {
    "hi": "अवांछित बाल निकालना",
    "gu": "અનિચ્છનીય વાળ દૂર કરવા"
  },
  "streak free interior and exterior window glass cleaning": {
    "hi": "Streak-free interior and exterior window glass सफाई",
    "gu": "Streak-free interior and exterior window glass સફાઈ"
  },
  "streak-free interior and exterior window glass cleaning": {
    "hi": "Streak-free interior and exterior window glass सफाई",
    "gu": "Streak-free interior and exterior window glass સફાઈ"
  },
  "strength assessment": {
    "hi": "Strength आकलन",
    "gu": "Strength મૂલ્યાંકન"
  },
  "strength training specific detailing": {
    "hi": "Strength प्रशिक्षण विस्तृत कार्य",
    "gu": "Strength તાલીમ વિગતવાર સેવા"
  },
  "stress relief": {
    "hi": "Stress relief",
    "gu": "Stress relief"
  },
  "string tuning": {
    "hi": "String ट्यूनिंग",
    "gu": "String ટ્યુનિંગ"
  },
  "structured boxing in heavy duty 5 ply corrugated cardboard cartons": {
    "hi": "Structured boxing in heavy-duty 5-ply corrugated cardboard cartons",
    "gu": "Structured boxing in heavy-duty 5-ply corrugated cardboard cartons"
  },
  "structured boxing in heavy-duty 5-ply corrugated cardboard cartons": {
    "hi": "Structured boxing in heavy-duty 5-ply corrugated cardboard cartons",
    "gu": "Structured boxing in heavy-duty 5-ply corrugated cardboard cartons"
  },
  "strumming techniques": {
    "hi": "Strumming techniques",
    "gu": "Strumming techniques"
  },
  "stud finding": {
    "hi": "Stud finding",
    "gu": "Stud finding"
  },
  "study material sharing": {
    "hi": "Study material sharing",
    "gu": "Study material sharing"
  },
  "style longevity assessment": {
    "hi": "स्टाइल टिकाऊपन आकलन",
    "gu": "સ્ટાઇલ ટકાઉપણું મૂલ્યાંકન"
  },
  "styling adjustment": {
    "hi": "Styling adjustment",
    "gu": "Styling adjustment"
  },
  "subject wise weightage strategy": {
    "hi": "Subject-wise weightage strategy",
    "gu": "Subject-wise weightage strategy"
  },
  "subject-wise weightage strategy": {
    "hi": "Subject-wise weightage strategy",
    "gu": "Subject-wise weightage strategy"
  },
  "sunscreen application": {
    "hi": "सनस्क्रीन लगाना",
    "gu": "સનસ્ક્રીન લગાવવું"
  },
  "sunscreen shield": {
    "hi": "सनस्क्रीन शील्ड",
    "gu": "સનસ્ક્રીન શિલ્ડ"
  },
  "support for packages up to 15 kg fitting standard delivery carriers": {
    "hi": "Support for packages up to 15 kg fitting standard delivery carriers",
    "gu": "Support for packages up to 15 kg fitting standard delivery carriers"
  },
  "surface cleansing": {
    "hi": "Surface cleansing",
    "gu": "Surface cleansing"
  },
  "surface spotlessness verification": {
    "hi": "Surface spotlessness सत्यापन",
    "gu": "Surface spotlessness ચકાસણી"
  },
  "sweeping & mopping specific detailing": {
    "hi": "Sweeping & Mopping विस्तृत कार्य",
    "gu": "Sweeping & Mopping વિગતવાર સેવા"
  },
  "sweeping mopping specific detailing": {
    "hi": "Sweeping & Mopping विस्तृत कार्य",
    "gu": "Sweeping & Mopping વિગતવાર સેવા"
  },
  "swimming specific detailing": {
    "hi": "Swimming विस्तृत कार्य",
    "gu": "Swimming વિગતવાર સેવા"
  },
  "switchboard dusting": {
    "hi": "Switchboard dusting",
    "gu": "Switchboard dusting"
  },
  "syllabus deconstruction": {
    "hi": "Syllabus deconstruction",
    "gu": "Syllabus deconstruction"
  },
  "syllogism practice": {
    "hi": "Syllogism practice",
    "gu": "Syllogism practice"
  },
  "symmetry assessment": {
    "hi": "Symmetry आकलन",
    "gu": "Symmetry મૂલ્યાંકન"
  },
  "symmetry check": {
    "hi": "Symmetry जांच",
    "gu": "Symmetry તપાસ"
  },
  "syntax correction": {
    "hi": "Syntax correction",
    "gu": "Syntax correction"
  },
  "syntax debugging": {
    "hi": "Syntax debugging",
    "gu": "Syntax debugging"
  },
  "synthesizer basics": {
    "hi": "Synthesizer basics",
    "gu": "Synthesizer basics"
  },
  "systematic crate loading according to department floor tagging": {
    "hi": "Systematic crate loading according to department/floor tagging",
    "gu": "Systematic crate loading according to department/floor tagging"
  },
  "systematic crate loading according to department/floor tagging": {
    "hi": "Systematic crate loading according to department/floor tagging",
    "gu": "Systematic crate loading according to department/floor tagging"
  },
  "systematic room by room box and carton handling": {
    "hi": "Systematic room-by-room box and carton handling",
    "gu": "Systematic room-by-room box and carton handling"
  },
  "systematic room-by-room box and carton handling": {
    "hi": "Systematic room-by-room box and carton handling",
    "gu": "Systematic room-by-room box and carton handling"
  },
  "taal memorization": {
    "hi": "Taal memorization",
    "gu": "Taal memorization"
  },
  "tabla tuning": {
    "hi": "Tabla ट्यूनिंग",
    "gu": "Tabla ટ્યુનિંગ"
  },
  "tablature reading": {
    "hi": "Tablature reading",
    "gu": "Tablature reading"
  },
  "tail point alignment": {
    "hi": "टेल पॉइंट एलाइनमेंट",
    "gu": "ટેઇલ પોઇન્ટ સંરેખણ"
  },
  "targeted area refinement": {
    "hi": "Targeted area refinement",
    "gu": "Targeted area refinement"
  },
  "task prioritization": {
    "hi": "Task prioritization",
    "gu": "Task prioritization"
  },
  "taxonomy memorization": {
    "hi": "Taxonomy memorization",
    "gu": "Taxonomy memorization"
  },
  "temperature testing": {
    "hi": "Temperature परीक्षण",
    "gu": "Temperature પરીક્ષણ"
  },
  "temple massage": {
    "hi": "Temple मालिश",
    "gu": "Temple માલિશ"
  },
  "tempo acceleration (laya)": {
    "hi": "Tempo acceleration (laya)",
    "gu": "Tempo acceleration (laya)"
  },
  "tempo acceleration laya": {
    "hi": "Tempo acceleration (laya)",
    "gu": "Tempo acceleration (laya)"
  },
  "tempo control": {
    "hi": "Tempo control",
    "gu": "Tempo control"
  },
  "tempo keeping": {
    "hi": "Tempo keeping",
    "gu": "Tempo keeping"
  },
  "tempo synchronization": {
    "hi": "Tempo synchronization",
    "gu": "Tempo synchronization"
  },
  "tennis specific detailing": {
    "hi": "Tennis विस्तृत कार्य",
    "gu": "Tennis વિગતવાર સેવા"
  },
  "tense applications": {
    "hi": "Tense applications",
    "gu": "Tense applications"
  },
  "terminal testing": {
    "hi": "टर्मिनल लोड टेस्टिंग",
    "gu": "ટર્મિનલ ટેસ્ટિંગ"
  },
  "test inclusion": {
    "hi": "Test Inclusion",
    "gu": "Test Inclusion"
  },
  "test series evaluation": {
    "hi": "Test series evaluation",
    "gu": "Test series evaluation"
  },
  "test stamina building": {
    "hi": "Test stamina building",
    "gu": "Test stamina building"
  },
  "theme extraction": {
    "hi": "Theme extraction",
    "gu": "Theme extraction"
  },
  "thermal insulated bag crate handling for temperature sensitive items": {
    "hi": "Thermal insulated bag/crate handling for temperature-sensitive items",
    "gu": "Thermal insulated bag/crate handling for temperature-sensitive items"
  },
  "thermal insulated bag/crate handling for temperature-sensitive items": {
    "hi": "Thermal insulated bag/crate handling for temperature-sensitive items",
    "gu": "Thermal insulated bag/crate handling for temperature-sensitive items"
  },
  "thermal paste reapplication": {
    "hi": "Thermal paste reapplication",
    "gu": "Thermal paste reapplication"
  },
  "thermal styling (curls, waves, straightening, or simple party updo)": {
    "hi": "Thermal styling (curls, waves, straightening, or simple party updo)",
    "gu": "Thermal styling (curls, waves, straightening, or simple party updo)"
  },
  "thermal styling curls waves straightening or simple party updo": {
    "hi": "Thermal styling (curls, waves, straightening, or simple party updo)",
    "gu": "Thermal styling (curls, waves, straightening, or simple party updo)"
  },
  "thermodynamics principles": {
    "hi": "Thermodynamics principles",
    "gu": "Thermodynamics principles"
  },
  "thickness assessment": {
    "hi": "Thickness आकलन",
    "gu": "Thickness મૂલ્યાંકન"
  },
  "thickness matching": {
    "hi": "मोटाई का मिलान",
    "gu": "જાડાઈનું સમાનતા મેચિંગ"
  },
  "thorough cleaning of all rooms including bedrooms living areas kitchen and bathrooms": {
    "hi": "Thorough cleaning of all rooms, including bedrooms, living areas, kitchen, and bathrooms",
    "gu": "Thorough cleaning of all rooms, including bedrooms, living areas, kitchen, and bathrooms"
  },
  "thorough cleaning of all rooms, including bedrooms, living areas, kitchen, and bathrooms": {
    "hi": "Thorough cleaning of all rooms, including bedrooms, living areas, kitchen, and bathrooms",
    "gu": "Thorough cleaning of all rooms, including bedrooms, living areas, kitchen, and bathrooms"
  },
  "thread clipping": {
    "hi": "थ्रेड क्लिपिंग",
    "gu": "થ્રેડ ક્લિપિંગ"
  },
  "tile cleaning specific detailing": {
    "hi": "Tile सफाई विस्तृत कार्य",
    "gu": "Tile સફાઈ વિગતવાર સેવા"
  },
  "tile scrubbing": {
    "hi": "Tile स्क्रबिंग",
    "gu": "Tile સ્ક્રબિંગ"
  },
  "time bound practice": {
    "hi": "Time bound practice",
    "gu": "Time bound practice"
  },
  "time management": {
    "hi": "Time प्रबंधन",
    "gu": "Time સંચાલન"
  },
  "time management strategies": {
    "hi": "Time management strategies",
    "gu": "Time management strategies"
  },
  "time management tips": {
    "hi": "Time management tips",
    "gu": "Time management tips"
  },
  "time optimization": {
    "hi": "Time optimization",
    "gu": "Time optimization"
  },
  "timing control": {
    "hi": "Timing control",
    "gu": "Timing control"
  },
  "toe separator insertion": {
    "hi": "टो सेपरेटर लगाना",
    "gu": "ટો સેપરેટર લગાવવું"
  },
  "toenail finish inspection": {
    "hi": "पैर के नाखूनों का फिनिश निरीक्षण",
    "gu": "પગના નખનું ફિનિશિંગ નિરીક્ષણ"
  },
  "toilet bowl scaling": {
    "hi": "Toilet bowl scaling",
    "gu": "Toilet bowl scaling"
  },
  "tone balancing": {
    "hi": "Tone संतुलन (बैलेंसिंग)",
    "gu": "Tone બેલેન્સિંગ"
  },
  "tone evening check": {
    "hi": "स्किन टोन एकरूपता जांच",
    "gu": "સ્કિન ટોન સમાનતા તપાસ"
  },
  "tone projection": {
    "hi": "Tone projection",
    "gu": "Tone projection"
  },
  "tone selection": {
    "hi": "Tone selection",
    "gu": "Tone selection"
  },
  "toner application": {
    "hi": "टोनर लगाना",
    "gu": "ટોનર લગાવવું"
  },
  "toning treatment": {
    "hi": "टोनिंग ट्रीटमेंट",
    "gu": "ટોનિંગ ટ્રીટમેન્ટ"
  },
  "tool and equipment setup": {
    "hi": "Tool and equipment सेटअप",
    "gu": "Tool and equipment સેટઅપ"
  },
  "tool sanitization": {
    "hi": "Tool सैनिटाइजेशन",
    "gu": "Tool સેનિટાઇઝેશન"
  },
  "tool setup": {
    "hi": "सैनिटाइज्ड टूल्स सेटअप",
    "gu": "સેનિટાઇઝ્ડ સાધનો સેટઅપ"
  },
  "top coat sealing": {
    "hi": "Top coat sealing",
    "gu": "Top coat sealing"
  },
  "top texturizing": {
    "hi": "Top texturizing",
    "gu": "Top texturizing"
  },
  "topography reading": {
    "hi": "Topography reading",
    "gu": "Topography reading"
  },
  "towel drying": {
    "hi": "तौलिये से सुखाना",
    "gu": "ટુવાલથી સૂકવવું"
  },
  "trackpad alignment": {
    "hi": "Trackpad संरेखण (अलाइनमेंट)",
    "gu": "Trackpad અલાઇનમેન્ટ"
  },
  "traditional compositions": {
    "hi": "Traditional compositions",
    "gu": "Traditional compositions"
  },
  "traditional garba forms": {
    "hi": "Traditional garba forms",
    "gu": "Traditional garba forms"
  },
  "traditional step practice": {
    "hi": "Traditional step practice",
    "gu": "Traditional step practice"
  },
  "translation basics": {
    "hi": "Translation basics",
    "gu": "Translation basics"
  },
  "transparent pricing with zero hidden charges": {
    "hi": "पारदर्शी मूल्य, कोई छिपा शुल्क नहीं",
    "gu": "પારદર્શક કિંમતો, કોઈ છુપો ચાર્જ નહીં"
  },
  "trash bin emptying": {
    "hi": "कचरा बिन खाली करना",
    "gu": "કચરાપેટી ખાલી કરવી"
  },
  "trash disposal": {
    "hi": "Trash disposal",
    "gu": "Trash disposal"
  },
  "trash removal": {
    "hi": "Trash हटाना",
    "gu": "Trash દૂર કરવું"
  },
  "travel planning": {
    "hi": "Travel planning",
    "gu": "Travel planning"
  },
  "treatment cream mixing": {
    "hi": "ट्रीटमेंट क्रीम मिश्रण",
    "gu": "ટ્રીટમેન્ટ ક્રીમ મિશ્રણ"
  },
  "trigonometry identities": {
    "hi": "Trigonometry identities",
    "gu": "Trigonometry identities"
  },
  "trimmer edge detailing": {
    "hi": "Trimmer edge विस्तृत कार्य",
    "gu": "Trimmer edge વિગતવાર કાર્ય"
  },
  "tv backplate attachment": {
    "hi": "Tv backplate attachment",
    "gu": "Tv backplate attachment"
  },
  "tv lifting and seating": {
    "hi": "Tv lifting and seating",
    "gu": "Tv lifting and seating"
  },
  "twirl techniques": {
    "hi": "Twirl techniques",
    "gu": "Twirl techniques"
  },
  "user access setup": {
    "hi": "User access सेटअप",
    "gu": "User access સેટઅપ"
  },
  "vaccination specific detailing": {
    "hi": "Vaccination विस्तृत कार्य",
    "gu": "Vaccination વિગતવાર સેવા"
  },
  "vector resolution": {
    "hi": "Vector resolution",
    "gu": "Vector resolution"
  },
  "vegetarian cook specific detailing": {
    "hi": "Vegetarian Cook विस्तृत कार्य",
    "gu": "Vegetarian Cook વિગતવાર સેવા"
  },
  "vendor coordination": {
    "hi": "Vendor coordination",
    "gu": "Vendor coordination"
  },
  "verbal ability": {
    "hi": "Verbal ability",
    "gu": "Verbal ability"
  },
  "verification of external bag count and receipt against customer order token": {
    "hi": "Verification of external bag count and receipt against customer order token",
    "gu": "Verification of external bag count and receipt against customer order token"
  },
  "verification of external shipping label address barcode or return token": {
    "hi": "Verification of external shipping label, address barcode, or return token",
    "gu": "Verification of external shipping label, address barcode, or return token"
  },
  "verification of external shipping label, address barcode, or return token": {
    "hi": "Verification of external shipping label, address barcode, or return token",
    "gu": "Verification of external shipping label, address barcode, or return token"
  },
  "version control basics": {
    "hi": "Version control basics",
    "gu": "Version control basics"
  },
  "veterinary consultation specific detailing": {
    "hi": "Veterinary परामर्श विस्तृत कार्य",
    "gu": "Veterinary સલાહ વિગતવાર સેવા"
  },
  "vibrato practice": {
    "hi": "Vibrato practice",
    "gu": "Vibrato practice"
  },
  "video doorbell installation specific detailing": {
    "hi": "Video Doorbell इंस्टॉलेशन विस्तृत कार्य",
    "gu": "Video Doorbell ઇન્સ્ટોલેશન વિગતવાર સેવા"
  },
  "viewing angle alignment": {
    "hi": "Viewing angle संरेखण (अलाइनमेंट)",
    "gu": "Viewing angle અલાઇનમેન્ટ"
  },
  "virtual assistance": {
    "hi": "Virtual सहायता",
    "gu": "Virtual સહાય"
  },
  "virtual calculator training": {
    "hi": "Virtual calculator प्रशिक्षण",
    "gu": "Virtual calculator તાલીમ"
  },
  "vocabulary building": {
    "hi": "Vocabulary building",
    "gu": "Vocabulary building"
  },
  "vocal range expansion": {
    "hi": "Vocal range expansion",
    "gu": "Vocal range expansion"
  },
  "vocal warm ups": {
    "hi": "Vocal warm-ups",
    "gu": "Vocal warm-ups"
  },
  "vocal warm-ups": {
    "hi": "Vocal warm-ups",
    "gu": "Vocal warm-ups"
  },
  "voice modulation": {
    "hi": "Voice modulation",
    "gu": "Voice modulation"
  },
  "voice projection": {
    "hi": "Voice projection",
    "gu": "Voice projection"
  },
  "voltage assessment": {
    "hi": "वोल्टेज जांच",
    "gu": "વોલ્ટેજ તપાસ"
  },
  "volume enhancement cutting": {
    "hi": "Volume enhancement cutting",
    "gu": "Volume enhancement cutting"
  },
  "wall measurement": {
    "hi": "Wall measurement",
    "gu": "Wall measurement"
  },
  "wall plug insertion": {
    "hi": "Wall plug insertion",
    "gu": "Wall plug insertion"
  },
  "warm oil application": {
    "hi": "Warm oil लगाना",
    "gu": "Warm oil લગાવવું"
  },
  "warm steam application": {
    "hi": "हल्की भाप (स्टीम)",
    "gu": "હૂંફાળી વરાળ (સ્ટીમ)"
  },
  "warm up routines": {
    "hi": "Warm-up routines",
    "gu": "Warm-up routines"
  },
  "warm up stretching": {
    "hi": "Warm-up stretching",
    "gu": "Warm-up stretching"
  },
  "warm water foot soak": {
    "hi": "Warm water foot soak",
    "gu": "Warm water foot soak"
  },
  "warm water soak": {
    "hi": "गुनगुने पानी में सिकाई",
    "gu": "હૂંફાળા પાણીમાં સિકાઈ"
  },
  "warm-up routines": {
    "hi": "Warm-up routines",
    "gu": "Warm-up routines"
  },
  "warm-up stretching": {
    "hi": "Warm-up stretching",
    "gu": "Warm-up stretching"
  },
  "waste disposal": {
    "hi": "कचरा निपटान व स्वच्छता",
    "gu": "કચરાનો યોગ્ય નિકાલ"
  },
  "wave analysis": {
    "hi": "Wave analysis",
    "gu": "Wave analysis"
  },
  "wax heating": {
    "hi": "Wax heating",
    "gu": "Wax heating"
  },
  "web technologies": {
    "hi": "Web technologies",
    "gu": "Web technologies"
  },
  "webcam functionality test": {
    "hi": "Webcam functionality test",
    "gu": "Webcam functionality test"
  },
  "wedding decoration specific detailing": {
    "hi": "Wedding Decoration विस्तृत कार्य",
    "gu": "Wedding Decoration વિગતવાર સેવા"
  },
  "wedding photography specific detailing": {
    "hi": "वेडिंग फोटोग्राफी विस्तृत कार्य",
    "gu": "વેડિંગ ફોટોગ્રાફી વિગતવાર સેવા"
  },
  "wedding videography specific detailing": {
    "hi": "वेडिंग वीडियोग्राफी विस्तृत कार्य",
    "gu": "વેડિંગ વિડિયોગ્રાફી વિગતવાર સેવા"
  },
  "weekly assignments": {
    "hi": "Weekly assignments",
    "gu": "Weekly assignments"
  },
  "weight management specific detailing": {
    "hi": "वजन प्रबंधन विस्तृत कार्य",
    "gu": "વજન વ્યવસ્થાપન વિગતવાર સેવા"
  },
  "wet wipe cleaning": {
    "hi": "Wet wipe सफाई",
    "gu": "Wet wipe સફાઈ"
  },
  "whitehead extraction": {
    "hi": "व्हाइटहेड्स हटाना",
    "gu": "વ્હાઇટહેડ્સ દૂર કરવા"
  },
  "wi fi antenna check": {
    "hi": "Wi-fi antenna जांच",
    "gu": "Wi-fi antenna તપાસ"
  },
  "wi fi connectivity check": {
    "hi": "Wi-fi connectivity जांच",
    "gu": "Wi-fi connectivity તપાસ"
  },
  "wi-fi antenna check": {
    "hi": "Wi-fi antenna जांच",
    "gu": "Wi-fi antenna તપાસ"
  },
  "wi-fi connectivity check": {
    "hi": "Wi-fi connectivity जांच",
    "gu": "Wi-fi connectivity તપાસ"
  },
  "window cleaning (interior glass) and tracks": {
    "hi": "Window cleaning (interior glass) and tracks",
    "gu": "Window cleaning (interior glass) and tracks"
  },
  "window cleaning interior glass and tracks": {
    "hi": "Window cleaning (interior glass) and tracks",
    "gu": "Window cleaning (interior glass) and tracks"
  },
  "window glass wiping": {
    "hi": "Window glass पोंछना",
    "gu": "Window glass લૂછવું"
  },
  "window track brushing": {
    "hi": "Window track brushing",
    "gu": "Window track brushing"
  },
  "wiring continuity check": {
    "hi": "वायरिंग निरंतरता टेस्ट",
    "gu": "વાયરિંગ ટેસ્ટિંગ"
  },
  "workflow optimization": {
    "hi": "Workflow optimization",
    "gu": "Workflow optimization"
  },
  "writing exercises": {
    "hi": "Writing exercises",
    "gu": "Writing exercises"
  },
  "writing practice": {
    "hi": "Writing practice",
    "gu": "Writing practice"
  },
  "zoology basics": {
    "hi": "Zoology basics",
    "gu": "Zoology basics"
  },
};

export const WORD_TRANSLATIONS: Record<string, LangEntry> = {
  "ac": {
    "hi": "एसी",
    "gu": "એસી"
  },
  "anti aging": {
    "hi": "एंटी-एजिंग",
    "gu": "એન્ટી-એજિંગ"
  },
  "anti-aging": {
    "hi": "एंटी-एजिंग",
    "gu": "એન્ટી-એજિંગ"
  },
  "aromatherapy": {
    "hi": "अरोमाथेरेपी",
    "gu": "એરોમાથેરાપી"
  },
  "art": {
    "hi": "आर्ट",
    "gu": "આર્ટ"
  },
  "ayurvedic": {
    "hi": "आयुर्वेदिक",
    "gu": "આયુર્વેદિક"
  },
  "balcony": {
    "hi": "बालकनी",
    "gu": "બાલ્કની"
  },
  "bathroom": {
    "hi": "बाथरूम",
    "gu": "બાથરૂમ"
  },
  "beard": {
    "hi": "दाढ़ी (बियर्ड)",
    "gu": "દાઢી"
  },
  "bhk": {
    "hi": "बीएचके",
    "gu": "બીએચકે"
  },
  "bleach": {
    "hi": "ब्लीच",
    "gu": "બ્લીચ"
  },
  "body": {
    "hi": "बॉडी",
    "gu": "બોડી"
  },
  "brightening": {
    "hi": "ब्राइटनिंग",
    "gu": "બ્રાઇટનિંગ"
  },
  "callus": {
    "hi": "कैलस",
    "gu": "કેલસ"
  },
  "care": {
    "hi": "केयर",
    "gu": "સંભાળ"
  },
  "carpet": {
    "hi": "कारपेट",
    "gu": "કાર્પેટ"
  },
  "charcoal": {
    "hi": "चारकोल",
    "gu": "ચારકોલ"
  },
  "classic": {
    "hi": "क्लासिक",
    "gu": "ક્લાસિક"
  },
  "clean-up": {
    "hi": "क्लीनअप",
    "gu": "ક્લીનઅપ"
  },
  "cleaning": {
    "hi": "सफाई",
    "gu": "સફાઈ"
  },
  "cleanup": {
    "hi": "क्लीनअप",
    "gu": "ક્લીનઅપ"
  },
  "combo": {
    "hi": "कॉम्बो",
    "gu": "કોમ્બો"
  },
  "control": {
    "hi": "नियंत्रण (कंट्रोल)",
    "gu": "નિયંત્રણ"
  },
  "cream": {
    "hi": "क्रीम",
    "gu": "ક્રીમ"
  },
  "crystal": {
    "hi": "क्रिस्टल",
    "gu": "ક્રિસ્ટલ"
  },
  "curtain": {
    "hi": "पर्दे (कर्टेन)",
    "gu": "પડદા"
  },
  "cushion": {
    "hi": "कुशन",
    "gu": "કુશન"
  },
  "custom": {
    "hi": "कस्टम",
    "gu": "કસ્ટમ"
  },
  "cut": {
    "hi": "कट",
    "gu": "કટ"
  },
  "cuticle": {
    "hi": "क्यूटिकल",
    "gu": "ક્યુટિકલ"
  },
  "de-tan": {
    "hi": "डी-टैन",
    "gu": "ડી-ટેન"
  },
  "deep": {
    "hi": "डीप",
    "gu": "ડીપ"
  },
  "deluxe": {
    "hi": "डीलक्स",
    "gu": "ડીલક્સ"
  },
  "detan": {
    "hi": "डी-टैन",
    "gu": "ડી-ટેન"
  },
  "detox": {
    "hi": "डिटॉक्स",
    "gu": "ડિટોક્સ"
  },
  "diamond": {
    "hi": "डायमंड",
    "gu": "ડાયમંડ"
  },
  "drain": {
    "hi": "ड्रेन",
    "gu": "ડ્રેન"
  },
  "drainage": {
    "hi": "ड्रेनेज",
    "gu": "ડ્રેનેજ"
  },
  "essential": {
    "hi": "एसेंशियल",
    "gu": "એસેન્શિયલ"
  },
  "express": {
    "hi": "एक्सप्रेस",
    "gu": "એક્સપ્રેસ"
  },
  "extension": {
    "hi": "एक्सटेंशन",
    "gu": "એક્સટેન્શન"
  },
  "face": {
    "hi": "फेस",
    "gu": "ફેસ"
  },
  "facial": {
    "hi": "फेशियल",
    "gu": "ફેશિયલ"
  },
  "fan": {
    "hi": "पंखा",
    "gu": "પંખો"
  },
  "feet": {
    "hi": "पैर",
    "gu": "પગ"
  },
  "file": {
    "hi": "फाइल",
    "gu": "ફાઇલ"
  },
  "foot": {
    "hi": "फुट",
    "gu": "ફૂટ"
  },
  "fruit": {
    "hi": "फ्रूट",
    "gu": "ફ્રૂટ"
  },
  "full": {
    "hi": "फुल",
    "gu": "સંપૂર્ણ"
  },
  "gel": {
    "hi": "जेल",
    "gu": "જેલ"
  },
  "glow": {
    "hi": "ग्लो",
    "gu": "ગ્લો"
  },
  "gold": {
    "hi": "गोल्ड",
    "gu": "ગોલ્ડ"
  },
  "hair": {
    "hi": "हेयर",
    "gu": "હેર"
  },
  "haircut": {
    "hi": "हेयरकट",
    "gu": "હેરકટ"
  },
  "hand": {
    "hi": "हाथ",
    "gu": "હાથ"
  },
  "hands": {
    "hi": "हाथों",
    "gu": "હાથો"
  },
  "head": {
    "hi": "हेड",
    "gu": "હેડ"
  },
  "heel": {
    "hi": "हील (एड़ी)",
    "gu": "હીલ (એડી)"
  },
  "herbal": {
    "hi": "हर्बल",
    "gu": "હર્બલ"
  },
  "home": {
    "hi": "होम",
    "gu": "ઘર"
  },
  "house": {
    "hi": "हाउस",
    "gu": "હાઉસ"
  },
  "hydrating": {
    "hi": "हाइड्रेटिंग",
    "gu": "હાઇડ્રેટિંગ"
  },
  "ice": {
    "hi": "आइस",
    "gu": "આઇસ"
  },
  "installation": {
    "hi": "इंस्टॉलेशन",
    "gu": "ઇન્સ્ટોલેશન"
  },
  "intensive": {
    "hi": "इंटेन्सिव",
    "gu": "ઇન્ટેન્સિવ"
  },
  "kitchen": {
    "hi": "किचन",
    "gu": "રસોડું"
  },
  "korean": {
    "hi": "कोरियन",
    "gu": "કોરિયન"
  },
  "leakage": {
    "hi": "रिसाव (लीकेज)",
    "gu": "લિકેજ"
  },
  "long-lasting": {
    "hi": "लॉन्ग-लास्टिंग",
    "gu": "લાંબો સમય ટકનાર"
  },
  "luxury": {
    "hi": "लक्जरी",
    "gu": "લક્ઝરી"
  },
  "manicure": {
    "hi": "मेनिक्योर",
    "gu": "મેનિક્યોર"
  },
  "massage": {
    "hi": "मसाज",
    "gu": "મસાજ"
  },
  "mattress": {
    "hi": "गद्दे (मैट्रेस)",
    "gu": "ગાદલા (મેટ્રેસ)"
  },
  "muscle": {
    "hi": "मसल",
    "gu": "મસલ"
  },
  "nail": {
    "hi": "नाखून (नेल)",
    "gu": "નખ"
  },
  "nails": {
    "hi": "नाखूनों",
    "gu": "નખો"
  },
  "neck": {
    "hi": "नेक (गर्दन)",
    "gu": "ગરદન"
  },
  "oil": {
    "hi": "ऑयल",
    "gu": "ઓઇલ"
  },
  "package": {
    "hi": "पैकेज",
    "gu": "પેકેજ"
  },
  "painting": {
    "hi": "पेंटिंग",
    "gu": "પેઇન્ટિંગ"
  },
  "pedicure": {
    "hi": "पेडीक्योर",
    "gu": "પેડિક્યોર"
  },
  "peel": {
    "hi": "पील",
    "gu": "પીલ"
  },
  "pest": {
    "hi": "पेस्ट",
    "gu": "પેસ્ટ"
  },
  "pipe": {
    "hi": "पाइप",
    "gu": "પાઇપ"
  },
  "polish": {
    "hi": "पॉलिश",
    "gu": "પોલિશ"
  },
  "potli": {
    "hi": "पोटली",
    "gu": "પોટલી"
  },
  "premium": {
    "hi": "प्रीमियम",
    "gu": "પ્રીમિયમ"
  },
  "reflexology": {
    "hi": "रिफ्लेक्सोलॉजी",
    "gu": "રિફ્લેક્સોલોજી"
  },
  "relaxation": {
    "hi": "रिलैक्सेशन",
    "gu": "રિલેક્સેશન"
  },
  "relief": {
    "hi": "रिलीफ (राहत)",
    "gu": "રાહત"
  },
  "removal": {
    "hi": "रिमूवल",
    "gu": "રિમૂવલ"
  },
  "repair": {
    "hi": "मरम्मत",
    "gu": "રિપેરિંગ"
  },
  "room": {
    "hi": "कमरा",
    "gu": "રૂમ"
  },
  "service": {
    "hi": "सर्विस",
    "gu": "સર્વિસ"
  },
  "shave": {
    "hi": "शेव",
    "gu": "શેવિંગ"
  },
  "shoulder": {
    "hi": "शोल्डर (कंधा)",
    "gu": "ખભા"
  },
  "socket": {
    "hi": "सॉकेट",
    "gu": "સોકેટ"
  },
  "sofa": {
    "hi": "सोफा",
    "gu": "સોફા"
  },
  "spa": {
    "hi": "स्पा",
    "gu": "સ્પા"
  },
  "sports": {
    "hi": "स्पोर्ट्स",
    "gu": "સ્પોર્ટ્સ"
  },
  "standard": {
    "hi": "स्टैंडर्ड",
    "gu": "સ્ટાન્ડર્ડ"
  },
  "swedish": {
    "hi": "स्वीडिश",
    "gu": "સ્વીડિશ"
  },
  "switch": {
    "hi": "स्विच",
    "gu": "સ્વિચ"
  },
  "tank": {
    "hi": "टंकी",
    "gu": "ટાંકી"
  },
  "tap": {
    "hi": "नल (टैप)",
    "gu": "નળ (ટેપ)"
  },
  "thai": {
    "hi": "थाई",
    "gu": "થાઈ"
  },
  "therapy": {
    "hi": "थेरेपी",
    "gu": "થેરાપી"
  },
  "threading": {
    "hi": "थ्रेडिंग",
    "gu": "થ્રેડિંગ"
  },
  "tissue": {
    "hi": "टिश्यू",
    "gu": "ટિશ્યુ"
  },
  "touch-up": {
    "hi": "टचअप",
    "gu": "ટચઅપ"
  },
  "touchup": {
    "hi": "टचअप",
    "gu": "ટચઅપ"
  },
  "traditional": {
    "hi": "पारंपरिक",
    "gu": "પરંપરાગત"
  },
  "uninstallation": {
    "hi": "अनइंस्टॉलेशन",
    "gu": "અનઇન્સ્ટોલેશન"
  },
  "waterproofing": {
    "hi": "वॉटरप्रूफिंग",
    "gu": "વૉટરપ્રૂફિંગ"
  },
  "waxing": {
    "hi": "वैक्सिंग",
    "gu": "વેક્સિંગ"
  },
  "whitening": {
    "hi": "व्हाइटनिंग",
    "gu": "વ્હાઇટનિંગ"
  },
  "wire": {
    "hi": "वायरिंग",
    "gu": "વાયરિંગ"
  },
  "wiring": {
    "hi": "वायरिंग",
    "gu": "વાયરિંગ"
  },
};
