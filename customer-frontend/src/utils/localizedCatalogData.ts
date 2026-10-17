// Master Multilingual Catalog Data (100% Native Coverage)
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
    "gu": "હોમ સિક્યોરિટી અને સીસીટીવી"
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
  "it support & consultation": {
    "hi": "आईटी सपोर्ट व कंसल्टेशन",
    "gu": "આઇટી સપોર્ટ અને કન્સલ્ટેશન"
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
  "networking & wi-fi setup": {
    "hi": "नेटवर्किंग व वाई-फाई सेटअप",
    "gu": "નેટવર્કિંગ અને વાઇ-ફાઇ સેટઅપ"
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
  "ro / water purifier": {
    "hi": "आरओ व वॉटर प्यूरीफायर",
    "gu": "આરઓ અને વોટર પ્યુરિફાયર"
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
  "staffing & hr services": {
    "hi": "स्टाफिंग व एचआर सेवाएं",
    "gu": "સ્ટાફિંગ અને એચઆર સેવાઓ"
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
  "15 min doubt session": {
    "hi": "15 मिनट संदेह समाधान सत्र",
    "gu": "૧૫ મિનિટ શંકા નિવારણ સત્ર"
  },
  "15-min doubt session": {
    "hi": "15 मिनट संदेह समाधान सत्र",
    "gu": "૧૫ મિનિટ શંકા નિવારણ સત્ર"
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
    "hi": "24 कैरेट गोल्ड रेडिएंस फेशियल",
    "gu": "૨૪ કેરેટ ગોલ્ડ રેડિયન્સ ફેશિયલ"
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
  "4 channel dvr nvr storage remote viewing sync": {
    "hi": "4-चैनल डीवीआर / एनवीआर रिमोट सिंक",
    "gu": "૪-ચેનલ ડીવીઆર / એનવીઆર સેટઅપ"
  },
  "4-channel dvr / nvr storage & remote viewing sync": {
    "hi": "4-चैनल डीवीआर / एनवीआर रिमोट सिंक",
    "gu": "૪-ચેનલ ડીવીઆર / એનવીઆર સેટઅપ"
  },
  "4-channel dvr nvr storage remote viewing sync": {
    "hi": "4-चैनल डीवीआर / एनवीआर रिमोट सिंक",
    "gu": "૪-ચેનલ ડીવીઆર / એનવીઆર સેટઅપ"
  },
  "4k cinematic drone aerial video shoot": {
    "hi": "4K सिनेमैटिक ड्रोन एरियल वीडियो शूट",
    "gu": "૪K સિનેમેટિક ડ્રોન વિડિયો શૂટ"
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
    "gu": "પેન ડ્રાઇવ / એસડી કાર્ડ ડેટા રિકવરી"
  },
  "accidentally formatted pen drive sd card recovery": {
    "hi": "फॉर्मेटेड पेन ड्राइव / एसडी कार्ड डेटा रिकवरी",
    "gu": "પેન ડ્રાઇવ / એસડી કાર્ડ ડેટા રિકવરી"
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
    "gu": "સ્ટેજ પીએ સાઉન્ડ સિસ્ટમ સેટઅપ"
  },
  "acoustic stage pa system mixer setup": {
    "hi": "स्टेज पीए सिस्टम व मिक्सर सेटअप",
    "gu": "સ્ટેજ પીએ સાઉન્ડ સિસ્ટમ સેટઅપ"
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
  "aloe vera gel": {
    "hi": "एलोवेरा जेल",
    "gu": "એલોવેરા જેલ"
  },
  "ammonia-free root touch-up": {
    "hi": "अमोनिया-मुक्त रूट टच-अप",
    "gu": "એમોનિયા-મુક્ત રૂટ ટચ-અપ"
  },
  "analytics setup": {
    "hi": "एनालिटिक्स सेटअप",
    "gu": "એનાલિટિક્સ સેટઅપ"
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
  "app setup": {
    "hi": "ऐप सेटअप",
    "gu": "એપ સેટઅપ"
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
    "gu": "ઓટોમેટિક આરએફઆઇડી બૂમ બેરિયર ગેટ ફિટિંગ"
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
    "hi": "बेकिंग क्लासेस",
    "gu": "બેકિંગ ક્લાસિસ"
  },
  "balcony cleaning": {
    "hi": "बालकनी की सफाई",
    "gu": "બાલ્કનીની સફાઈ"
  },
  "balcony washing & window track cleaning": {
    "hi": "बालकनी धुलाई व खिड़की ट्रैक सफाई",
    "gu": "બાલ્કની ધોલાઈ અને બારી ટ્રેક સફાઈ"
  },
  "band": {
    "hi": "म्यूजिकल बैंड",
    "gu": "મ્યુઝિકલ બેન્ડ"
  },
  "bank po & ssc cgl reasoning trainer": {
    "hi": "बैंक पीओ व एसएससी रीजनिंग ट्रेनर",
    "gu": "બેંક પીઓ અને એસએસસી રિઝનિંગ ટ્રેનર"
  },
  "bank po ssc cgl reasoning trainer": {
    "hi": "बैंक पीओ व एसएससी रीजनिंग ट्रेनर",
    "gu": "બેંક પીઓ અને એસએસસી રિઝનિંગ ટ્રેનર"
  },
  "banking": {
    "hi": "बैंकिंग परामर्श",
    "gu": "બેંકિંગ સલાહ"
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
  "beard conditioning": {
    "hi": "दाढ़ी कंडीशनिंग",
    "gu": "દાઢી કન્ડિશનિંગ"
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
    "hi": "जीव विज्ञान (बायोलॉजी)",
    "gu": "જીવવિજ્ઞાન (બાયોલોજી)"
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
    "hi": "बोर्ड परीक्षा तैयारी",
    "gu": "બોર્ડ પરીક્ષા તૈયારી"
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
    "hi": "बॉलीवुड डांस",
    "gu": "બોલીવુડ ડાન્સ"
  },
  "bollywood singing": {
    "hi": "बॉलीवुड गायन",
    "gu": "બોલીવુડ સિંગિંગ"
  },
  "bookkeeping": {
    "hi": "बहीखाता (बुककीपिंग)",
    "gu": "નામા પદ્ધતિ (બુકકીપિંગ)"
  },
  "bookkeeping & tally accounting support": {
    "hi": "बुककीपिंग व टैली अकाउंटिंग सपोर्ट",
    "gu": "બુકકીપિંગ અને ટેલી એકાઉન્ટિંગ સપોર્ટ"
  },
  "bookkeeping tally accounting support": {
    "hi": "बुककीपिंग व टैली अकाउंटिंग सपोर्ट",
    "gu": "બુકકીપિંગ અને ટેલી એકાઉન્ટિંગ સપોર્ટ"
  },
  "breathing mindfulness": {
    "hi": "श्वास व माइंडफुलनेस ध्यान",
    "gu": "શ્વાસોચ્છવાસ અને માઇન્ડફુલનેસ ધ્યાન"
  },
  "breathing/mindfulness": {
    "hi": "श्वास व माइंडफुलनेस ध्यान",
    "gu": "શ્વાસોચ્છવાસ અને માઇન્ડફુલનેસ ધ્યાન"
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
  "cable management": {
    "hi": "केबल प्रबंधन",
    "gu": "કેબલ વ્યવસ્થાપન"
  },
  "cage-free homestay pet boarding (per night)": {
    "hi": "केज-फ्री होमस्टे पेट बोर्डिंग (प्रति रात)",
    "gu": "હોમસ્ટે પેટ બોર્ડિંગ"
  },
  "callus removal": {
    "hi": "कैलस हटाना",
    "gu": "કેલસ દૂર કરવું"
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
    "hi": "कार / बाइक पिकअप व ड्रॉप",
    "gu": "કાર / બાઇક પિકઅપ અને ડ્રોપ"
  },
  "car cleaning": {
    "hi": "कार सफाई",
    "gu": "કાર સફાઈ"
  },
  "car/bike pickup & drop": {
    "hi": "कार / बाइक पिकअप व ड्रॉप",
    "gu": "કાર / બાઇક પિકઅપ અને ડ્રોપ"
  },
  "career counselling": {
    "hi": "करियर काउंसलिंग व मार्गदर्शन",
    "gu": "કારકિર્દી કાઉન્સેલિંગ"
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
    "hi": "कैट (CAT) परीक्षा कोचिंग",
    "gu": "કેટ (CAT) પરીક્ષા કોચિંગ"
  },
  "cat & ipmat quantitative aptitude coach": {
    "hi": "कैट व आईपीमैट गणितीय योग्यता कोच",
    "gu": "કેટ અને આઇપીમેટ એપ્ટિટ્યુડ કોચ"
  },
  "cat bath, fur de-shedding & nail trim": {
    "hi": "कैट बाथ, डी-शेडिंग व नेल ट्रिम",
    "gu": "બિલાડી બાથ અને નેઇલ ટ્રીમ"
  },
  "cat ipmat quantitative aptitude coach": {
    "hi": "कैट व आईपीमैट गणितीय योग्यता कोच",
    "gu": "કેટ અને આઇપીમેટ એપ્ટિટ્યુડ કોચ"
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
    "hi": "रसायन विज्ञान (केमिस्ट्री)",
    "gu": "રસાયણશાસ્ત્ર (કેમિસ્ટ્રી)"
  },
  "chimney cleaning": {
    "hi": "किचन चिमनी सफाई",
    "gu": "કિચન ચીમની સફાઈ"
  },
  "chimney repair": {
    "hi": "किचन चिमनी रिपेयर",
    "gu": "કિચન ચીમની રિપેરિંગ"
  },
  "chin": {
    "hi": "ठोड़ी (चिन) थ्रेडिंग",
    "gu": "દાઢી (ચિન) થ્રેડિંગ"
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
    "hi": "कक्षा / ग्रेड ट्यूशन",
    "gu": "ધોરણ / વર્ગ ટ્યુશન"
  },
  "class/grade": {
    "hi": "कक्षा / ग्रेड ट्यूशन",
    "gu": "ધોરણ / વર્ગ ટ્યુશન"
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
    "hi": "शास्त्रीय नृत्य",
    "gu": "શાસ્ત્રીય નૃત્ય"
  },
  "classical singing": {
    "hi": "शास्त्रीय गायन",
    "gu": "શાસ્ત્રીય ગાયન"
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
    "hi": "संज्ञानात्मक व्यवहार थेरेपी (सीबीटी) सत्र",
    "gu": "કોગ્નિટિવ બિહેવિયરલ થેરાપી (સીબીટી) સત્ર"
  },
  "cognitive behavioral therapy cbt session": {
    "hi": "संज्ञानात्मक व्यवहार थेरेपी (सीबीटी) सत्र",
    "gu": "કોગ્નિટિવ બિહેવિયરલ થેરાપી (સીબીટી) સત્ર"
  },
  "communication skills": {
    "hi": "संचार कौशल (कम्युनिकेशन)",
    "gu": "સંચાર કૌશલ્ય (કમ્યુનિકેશન)"
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
    "hi": "कंप्यूटर साइंस",
    "gu": "કોમ્પ્યુટર સાયન્સ"
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
    "hi": "कंटेम्पररी डांस",
    "gu": "કન્ટેમ્પરરી ડાન્સ"
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
  "cooling gel": {
    "hi": "कूलिंग जेल",
    "gu": "કૂલિંગ જેલ"
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
    "hi": "कॉर्पोरेट ईमेल व गूगल वर्कस्पेस माइग्रेशन",
    "gu": "કોર્પોરેટ ઈમેલ અને ગૂગલ વર્કસ્પેસ માઇગ્રેશન"
  },
  "corporate email google workspace domain migration": {
    "hi": "कॉर्पोरेट ईमेल व गूगल वर्कस्पेस माइग्रेशन",
    "gu": "કોર્પોરેટ ઈમેલ અને ગૂગલ વર્કસ્પેસ માઇગ્રેશન"
  },
  "corporate event & conference photographer": {
    "hi": "कॉर्पोरेट इवेंट व कॉन्फ्रेंस फोटोग्राफर",
    "gu": "કોર્પોરેટ ઇવેન્ટ ફોટોગ્રાફર"
  },
  "corporate stage backdrop & led signage setup": {
    "hi": "कॉर्पोरेट स्टेज बैकड्रॉप व एलईडी साइनेज",
    "gu": "કોર્પોરેટ સ્ટેજ બેકડ્રોપ અને એલઇડી સાઇનેજ"
  },
  "corporate stage backdrop led signage setup": {
    "hi": "कॉर्पोरेट स्टेज बैकड्रॉप व एलईडी साइनेज",
    "gu": "કોર્પોરેટ સ્ટેજ બેકડ્રોપ અને એલઇડી સાઇનેજ"
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
  "cover letter": {
    "hi": "कवर लेटर",
    "gu": "કવર લેટર"
  },
  "cover letter writing": {
    "hi": "कवर लेटर लेखन",
    "gu": "કવર લેટર લેખન"
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
    "gu": "કસ્ટમ ગેમિંગ / વર્કસ્ટેશન પીસી એસેમ્બલી"
  },
  "custom gaming workstation pc assembly": {
    "hi": "कस्टम गेमिंग / वर्कस्टेशन पीसी असेंबली",
    "gu": "કસ્ટમ ગેમિંગ / વર્કસ્ટેશન પીસી એસેમ્બલી"
  },
  "custom landing page design for google ads": {
    "hi": "गूगल विज्ञापनों के लिए कस्टम लैंडिंग पेज",
    "gu": "ગૂગલ જાહેરાતો માટે કસ્ટમ લેન્ડિંગ પેજ"
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
    "hi": "डांसर परफॉर्मेंस",
    "gu": "ડાન્સર પર્ફોર્મન્સ"
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
    "hi": "क्रैश हार्ड ड्राइव / एसएसडी से डेटा रिकवरी",
    "gu": "ક્રેશ થયેલ હાર્ડ ડ્રાઇવ / એસએસડી ડેટા રિકવરી"
  },
  "data recovery from crashed hard drive ssd": {
    "hi": "क्रैश हार्ड ड्राइव / एसएसडी से डेटा रिकवरी",
    "gu": "ક્રેશ થયેલ હાર્ડ ડ્રાઇવ / એસએસડી ડેટા રિકવરી"
  },
  "daycare pet playgroup & socialization": {
    "hi": "पेट डेकेयर प्लेग्रुप व सोशलाइजेशन",
    "gu": "પેટ ડેકેર"
  },
  "de-tan pack & instant radiance cleanup": {
    "hi": "डी-टैन पैक व इंस्टेंट रेडिएंस क्लीनअप",
    "gu": "ડી-ટેન પેક અને તાત્કાલિક ચમક ક્લીનઅપ"
  },
  "deep conditioning": {
    "hi": "डीप कंडीशनिंग",
    "gu": "ડીપ કન્ડિશનિંગ"
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
  "device cleaning": {
    "hi": "उपकरण सफाई",
    "gu": "ઉપકરણ સફાઈ"
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
    "hi": "डीजे संगीत",
    "gu": "ડીજે મ્યુઝિક"
  },
  "document delivery": {
    "hi": "दस्तावेज़ डिलीवरी",
    "gu": "દસ્તાવેજ ડિલિવરી"
  },
  "document printing assistance": {
    "hi": "दस्तावेज़ प्रिंटिंग सहायता",
    "gu": "દસ્તાવેજ પ્રિન્ટિંગ સહાય"
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
  "domain setup": {
    "hi": "डोमेन सेटअप",
    "gu": "ડોમેઇન સેટઅપ"
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
    "hi": "ड्रम्स क्लासेस",
    "gu": "ડ્રમ્સ ક્લાસિસ"
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
    "hi": "कान की सफाई",
    "gu": "કાનની સફાઈ"
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
    "gu": "ઓફર લેટર અને એચઆર નીતિ પુસ્તિકા ડ્રાફ્ટિંગ"
  },
  "employment offer letter hr policy handbook drafting": {
    "hi": "ऑफर लेटर व एचआर पॉलिसी हैंडबुक ड्राफ्टिंग",
    "gu": "ઓફર લેટર અને એચઆર નીતિ પુસ્તિકા ડ્રાફ્ટિંગ"
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
    "hi": "अंग्रेजी भाषा व साहित्य",
    "gu": "અંગ્રેજી ભાષા અને સાહિત્ય"
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
    "hi": "इवेंट प्लानिंग व आयोजन",
    "gu": "ઇવેન્ટ પ્લાનિંગ"
  },
  "event staff": {
    "hi": "इवेंट सहयोगी स्टाफ",
    "gu": "ઇવેન્ટ સ્ટાફ સહાય"
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
    "hi": "रिज्यूमे व लिंक्डइन प्रोफाइल पुनर्लेखन",
    "gu": "રિઝ્યુમ અને લિંક્ડઇન પ્રોફાઇલ પુનર્લેખન"
  },
  "executive resume linkedin profile rewrite": {
    "hi": "रिज्यूमे व लिंक्डइन प्रोफाइल पुनर्लेखन",
    "gu": "રિઝ્યુમ અને લિંક્ડઇન પ્રોફાઇલ પુનર્લેખન"
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
  "extra 30 minutes": {
    "hi": "अतिरिक्त 30 मिनट",
    "gu": "વધારાની ૩૦ મિનિટ"
  },
  "extra 5 edited photos": {
    "hi": "अतिरिक्त 5 संपादित तस्वीरें",
    "gu": "વધારાના ૫ એડિટ કરેલા ફોટા"
  },
  "extra cushion": {
    "hi": "अतिरिक्त कुशन",
    "gu": "વધારાનું કુશન"
  },
  "extra lighting": {
    "hi": "अतिरिक्त लाइटिंग",
    "gu": "વધારાની લાઇટિંગ"
  },
  "extra practice": {
    "hi": "अतिरिक्त अभ्यास सत्र",
    "gu": "વધારાની પ્રેક્ટિસ સત્ર"
  },
  "eyebrow & upper lip threading": {
    "hi": "आइब्रो व अपर लिप थ्रेडिंग",
    "gu": "આઇબ્રો અને અપર લિપ થ્રેડિંગ"
  },
  "eyebrow threading": {
    "hi": "आइब्रो थ्रेडिंग",
    "gu": "આઇબ્રો થ્રેડિંગ"
  },
  "face cleanup": {
    "hi": "फेस क्लीनअप",
    "gu": "ફેસ ક્લીનઅપ"
  },
  "face massage": {
    "hi": "चेहरे की मालिश",
    "gu": "ચહેરાની માલિશ"
  },
  "facial": {
    "hi": "फेशियल",
    "gu": "ફેશિયલ"
  },
  "family generation portrait session": {
    "hi": "फैमिली पोर्ट्रेट फोटोग्राफी सेशन",
    "gu": "ફેમિલી પોટ્રેટ ફોટોગ્રાફી"
  },
  "fan cleaning": {
    "hi": "पंखे की सफाई",
    "gu": "પંખાની સફાઈ"
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
    "hi": "वित्तीय परामर्श",
    "gu": "નાણાકીય સલાહ"
  },
  "fitness assessment": {
    "hi": "फिटनेस मूल्यांकन",
    "gu": "ફિટનેસ મૂલ્યાંકન"
  },
  "fitness coaching": {
    "hi": "फिटनेस कोचिंग",
    "gu": "ફિટનેસ કોચિંગ"
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
    "hi": "फुटबॉल कोचिंग",
    "gu": "ફૂટબોલ કોચિંગ"
  },
  "forehead": {
    "hi": "माथा (फोरहेड) थ्रेडिंग",
    "gu": "કપાળ (ફોરહેડ) થ્રેડિંગ"
  },
  "foreign languages": {
    "hi": "विदेशी भाषाएं",
    "gu": "વિદેશી ભાષાઓ"
  },
  "fragile bakery cake & floral gift delivery": {
    "hi": "नाजुक बेकरी केक व फूलों का उपहार डिलीवरी",
    "gu": "કેક અને ફૂલોની ગિફ્ટ ડિલિવરી"
  },
  "franchise business model & standard operating procedures": {
    "hi": "फ्रेंचाइजी बिजनेस मॉडल व एसओपी",
    "gu": "ફ્રેન્ચાઇઝી બિઝનેસ મોડેલ અને એસઓપી"
  },
  "franchise business model standard operating procedures": {
    "hi": "फ्रेंचाइजी बिजनेस मॉडल व एसओपी",
    "gu": "ફ્રેન્ચાઇઝી બિઝનેસ મોડેલ અને એસઓપી"
  },
  "french language learning coach (a1-b2 level)": {
    "hi": "फ्रेंच भाषा शिक्षण कोच (A1-B2 स्तर)",
    "gu": "ફ્રેન્ચ ભાષા શિક્ષણ કોચ (A1-B2 સ્તર)"
  },
  "french language learning coach a1 b2 level": {
    "hi": "फ्रेंच भाषा शिक्षण कोच (A1-B2 स्तर)",
    "gu": "ફ્રેન્ચ ભાષા શિક્ષણ કોચ (A1-B2 સ્તર)"
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
    "hi": "क्लाउड किचन के लिए एफएसएसएआई फूड लाइसेंस",
    "gu": "ક્લાઉડ કિચન માટે એફએસએસએઆઈ ફૂડ લાયસન્સ"
  },
  "full apartment cleaning": {
    "hi": "पूरे अपार्टमेंट की सफाई",
    "gu": "આખા એપાર્ટમેન્ટની સફાઈ"
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
    "hi": "फुल बॉडी मसाज (पूरे शरीर की मालिश)",
    "gu": "ફુલ બોડી મસાજ (આખા શરીરની માલિશ)"
  },
  "full body rica waxing": {
    "hi": "फुल बॉडी रिका वैक्सिंग",
    "gu": "ફુલ બોડી રિકા વેક્સિંગ"
  },
  "full bungalow / duplex cleaning": {
    "hi": "बंगला / डुप्लेक्स की पूरी सफाई",
    "gu": "બંગલો / ડુપ્લેક્સની સંપૂર્ણ સફાઈ"
  },
  "full bungalow duplex cleaning": {
    "hi": "बंगला / डुप्लेक्स की पूरी सफाई",
    "gu": "બંગલો / ડુપ્લેક્સની સંપૂર્ણ સફાઈ"
  },
  "full dog grooming & haircut spa package": {
    "hi": "फुल डॉग ग्रूमिंग व हेयरकट स्पा पैकेज",
    "gu": "ડોગ ગ્રૂમિંગ અને હેરકટ સ્પા પેકેજ"
  },
  "full grooming": {
    "hi": "फुल ग्रूमिंग (संपूर्ण साज-सज्जा)",
    "gu": "ફુલ ગ્રૂમિંગ (સંપૂર્ણ માવજત)"
  },
  "full home deep cleaning": {
    "hi": "पूरे घर की डीप क्लीनिंग",
    "gu": "આખા ઘરની ડીપ ક્લિનિંગ"
  },
  "full time cook": {
    "hi": "फुल-टाइम कुक (रसोइया)",
    "gu": "ફુલ-ટાઇમ રસોઇયો"
  },
  "full-day all-round household helper (8 hours)": {
    "hi": "फुल-डे ऑल-राउंड घरेलू सहायिका (8 घंटे)",
    "gu": "આખો દિવસ ઘરકામ સહાયક (૮ કલાક)"
  },
  "full-time cook": {
    "hi": "फुल-टाइम कुक (रसोइया)",
    "gu": "ફુલ-ટાઇમ રસોઇયો"
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
    "hi": "फर्नीचर शिफ्टिंग व मूविंग",
    "gu": "ફર્નિચર મૂવિંગ અને શિફ્ટિંગ"
  },
  "furniture repair": {
    "hi": "फर्नीचर मरम्मत",
    "gu": "ફર્નિચર રિપેરિંગ"
  },
  "garba": {
    "hi": "गरबा व डांडिया क्लास",
    "gu": "ગરબા અને દાંડિયા ક્લાસ"
  },
  "gas charging": {
    "hi": "गैस चार्जिंग",
    "gu": "ગેસ ચાર્જિંગ"
  },
  "gate": {
    "hi": "गेट (GATE) परीक्षा कोचिंग",
    "gu": "ગેટ (GATE) પરીક્ષા કોચિંગ"
  },
  "gel manicure": {
    "hi": "जेल मेनिक्योर",
    "gu": "જેલ મેનિક્યોર"
  },
  "gel pedicure": {
    "hi": "जेल पेडीक्योर",
    "gu": "જેલ પેડિક્યોર"
  },
  "gel polish": {
    "hi": "जेल नेल पॉलिश",
    "gu": "જેલ નેઇલ પોલિશ"
  },
  "general pest control": {
    "hi": "सामान्य कीट नियंत्रण",
    "gu": "સામાન્ય જંતુ નિયંત્રણ"
  },
  "general servicing": {
    "hi": "सामान्य सर्विसिंग",
    "gu": "સામાન્ય સર્વિસિંગ"
  },
  "german language learning specialist (a1-b2)": {
    "hi": "जर्मन भाषा विशेषज्ञ (A1-B2)",
    "gu": "જર્મન ભાષા નિષ્ણાત (A1-B2)"
  },
  "german language learning specialist a1 b2": {
    "hi": "जर्मन भाषा विशेषज्ञ (A1-B2)",
    "gu": "જર્મન ભાષા નિષ્ણાત (A1-B2)"
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
    "gu": "જીમેટ અને જીઆરઇ રાઇટિંગ કોચ"
  },
  "gmat gre analytical writing coach": {
    "hi": "जीमैट व जीआरई राइटिंग कोच",
    "gu": "જીમેટ અને જીઆરઇ રાઇટિંગ કોચ"
  },
  "google ads (ppc) campaign setup & keyword audit": {
    "hi": "गूगल विज्ञापनों का सेटअप व कीवर्ड ऑडिट",
    "gu": "ગૂગલ એડ્સ ઝુંબેશ સેટઅપ અને ઓડિટ"
  },
  "google ads ppc campaign setup keyword audit": {
    "hi": "गूगल विज्ञापनों का सेटअप व कीवर्ड ऑडिट",
    "gu": "ગૂગલ એડ્સ ઝુંબેશ સેટઅપ અને ઓડિટ"
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
    "hi": "सरकारी परीक्षा तैयारी",
    "gu": "સરકારી પરીક્ષા તૈયારી"
  },
  "graphic design": {
    "hi": "ग्राफिक डिजाइनिंग",
    "gu": "ગ્રાફિક ડિઝાઇનિંગ"
  },
  "grocery & vegetable market delivery assistant": {
    "hi": "राशन व सब्जी बाजार डिलीवरी सहायक",
    "gu": "કરિયાણું અને શાકભાજી ડિલિવરી સહાયક"
  },
  "grocery pickup": {
    "hi": "किराना सामान पिकअप",
    "gu": "કરિયાણા પિકઅપ"
  },
  "group": {
    "hi": "ग्रुप (समूह) ट्यूशन",
    "gu": "ગ્રુપ (જૂથ) ટ્યુશન"
  },
  "group yoga": {
    "hi": "सामूहिक योग (ग्रुप योग)",
    "gu": "જૂથ યોગ (ગ્રુપ યોગ)"
  },
  "grout cleaning": {
    "hi": "ग्राउट व टाइल जोड़ों की सफाई",
    "gu": "ગ્રાઉટ અને ટાઇલ્સ સાંધાની સફાઈ"
  },
  "gst assistance": {
    "hi": "जीएसटी सहायता व परामर्श",
    "gu": "જીએસટી સહાય અને સલાહ"
  },
  "gst registration & monthly compliance filing": {
    "hi": "जीएसटी रजिस्ट्रेशन व मासिक रिटर्न फाइलिंग",
    "gu": "જીએસટી રજિસ્ટ્રેશન અને રિટર્ન ફાઇલિંગ"
  },
  "gst registration monthly compliance filing": {
    "hi": "जीएसटी रजिस्ट्रेशन व मासिक रिटर्न फाइलिंग",
    "gu": "જીએસટી રજિસ્ટ્રેશન અને રિટર્ન ફાઇલિંગ"
  },
  "guard & watchdog boundary awareness coaching": {
    "hi": "गार्ड डॉग बाउंड्री कोचिंग",
    "gu": "ગાર્ડ ડોગ ટ્રેનિંગ"
  },
  "guitar": {
    "hi": "गिटार क्लासेज",
    "gu": "ગિટાર ક્લાસિસ"
  },
  "gujarati": {
    "hi": "गुजराती भाषा ट्यूशन",
    "gu": "ગુજરાતી ભાષા ટ્યુશન"
  },
  "gujarati food": {
    "hi": "गुजराती भोजन कुकिंग",
    "gu": "ગુજરાતી રસોઈ"
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
  "hair serum": {
    "hi": "हेयर सीरम",
    "gu": "હેર સીરમ"
  },
  "hair spa": {
    "hi": "हेयर स्पा",
    "gu": "હેર સ્પા"
  },
  "hair straightening / smoothening": {
    "hi": "हेयर स्ट्रेटनिंग व स्मूदनिंग",
    "gu": "હેર સ્ટ્રેટનિંગ અને સ્મૂધનિંગ"
  },
  "hair straightening smoothening": {
    "hi": "हेयर स्ट्रेटनिंग व स्मूदनिंग",
    "gu": "હેર સ્ટ્રેટનિંગ અને સ્મૂધનિંગ"
  },
  "hair styling": {
    "hi": "हेयर स्टाइलिंग",
    "gu": "હેર સ્ટાઇલિંગ"
  },
  "hair treatment": {
    "hi": "हेयर उपचार",
    "gu": "હેર સારવાર"
  },
  "hair wash": {
    "hi": "हेयर वॉश (बाल धोना)",
    "gu": "હેર વોશ (વાળ ધોવા)"
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
    "hi": "हेयरस्टाइलिंग + मेकअप पैकेज",
    "gu": "હેરસ્ટાઇલિંગ + મેકઅપ પેકેજ"
  },
  "hairstyling makeup packages": {
    "hi": "हेयरस्टाइलिंग + मेकअप पैकेज",
    "gu": "હેરસ્ટાઇલિંગ + મેકઅપ પેકેજ"
  },
  "hand massage": {
    "hi": "हाथ की मालिश",
    "gu": "હાથની માલિશ"
  },
  "hd flawless bridal makeup package": {
    "hi": "एचडी ब्राइडल मेकअप पैकेज",
    "gu": "એચડી બ્રાઇડલ મેકઅપ પેકેજ"
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
    "hi": "हेल्दी व डाइट कुकिंग",
    "gu": "હેલ્ધી અને ડાયેટ ફૂડ"
  },
  "healthy fitness meal prep cook (diet specific)": {
    "hi": "हेल्दी फिटनेस डाइट कुक (डाइट विशेष)",
    "gu": "હેલ્ધી ફિટનેસ ડાયેટ કુક"
  },
  "healthy/diet food": {
    "hi": "हेल्दी व डाइट कुकिंग",
    "gu": "હેલ્ધી અને ડાયેટ ફૂડ"
  },
  "heating problem": {
    "hi": "हीटिंग समस्या समाधान",
    "gu": "હીટિંગ સમસ્યા સમાધાન"
  },
  "heavy duty smart plug 16a ac geyser sync": {
    "hi": "स्मार्ट प्लग (16A) एसी/गीजर सिंक",
    "gu": "સ્માર્ટ પ્લગ (16A) એસી/ગીઝર સિંક"
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
    "hi": "स्मार्ट प्लग (16A) एसी/गीजर सिंक",
    "gu": "સ્માર્ટ પ્લગ (16A) એસી/ગીઝર સિંક"
  },
  "high-decibel smart security siren integration": {
    "hi": "हाई-डेसिबल स्मार्ट सिक्योरिटी सायरन",
    "gu": "હાઇ-ડેસિબલ સ્માર્ટ સાયરન"
  },
  "hiit & functional bodyweight conditioning": {
    "hi": "एचआईआईटी व बॉडीवेट वर्कआउट",
    "gu": "એચઆઇઆઇટી અને બોડીવેટ વર્કઆઉટ"
  },
  "hiit functional bodyweight conditioning": {
    "hi": "एचआईआईटी व बॉडीवेट वर्कआउट",
    "gu": "એચઆઇઆઇટી અને બોડીવેટ વર્કઆઉટ"
  },
  "hindi": {
    "hi": "हिंदी भाषा ट्यूशन",
    "gu": "હિન્દી ભાષા ટ્યુશન"
  },
  "hindustani classical vocal music guru": {
    "hi": "हिंदुस्तानी शास्त्रीय गायन गुरु",
    "gu": "હિન્દુસ્તાની શાસ્ત્રીય ગાયન ગુરુ"
  },
  "hip hop": {
    "hi": "हिप-हॉप डांस क्लास",
    "gu": "હિપ-હોપ ડાન્સ ક્લાસ"
  },
  "hip-hop": {
    "hi": "हिप-हॉप डांस क्लास",
    "gu": "હિપ-હોપ ડાન્સ ક્લાસ"
  },
  "history": {
    "hi": "इतिहास ट्यूशन",
    "gu": "ઇતિહાસ ટ્યુશન"
  },
  "home automation setup": {
    "hi": "होम ऑटोमेशन सेटअप",
    "gu": "હોમ ઓટોમેશન સેટઅપ"
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
  "home nurse": {
    "hi": "घरेलू नर्स व देखभाल",
    "gu": "હોમ નર્સ અને સારસંભાળ"
  },
  "home office dual-monitor & docking station setup": {
    "hi": "होम ऑफिस मॉनिटर व डॉकिंग स्टेशन सेटअप",
    "gu": "હોમ ઓફિસ મોનિટર સેટઅપ"
  },
  "home workout trainer": {
    "hi": "होम वर्कआउट ट्रेनर",
    "gu": "હોમ વર્કઆઉટ ટ્રેનર"
  },
  "hot towel shave & beard grooming": {
    "hi": "हॉट टॉवल शेव व दाढ़ी ग्रूमिंग",
    "gu": "હોટ ટોવેલ શેવ અને દાઢી ગ્રૂમિંગ"
  },
  "house help": {
    "hi": "घरेलू सहायिका",
    "gu": "ઘરેલું સહાયક"
  },
  "house shifting": {
    "hi": "घर का सामान शिफ्टिंग",
    "gu": "ઘર સામાન શિફ્ટિંગ"
  },
  "household cleaning assistance": {
    "hi": "घरेलू सफाई सहायता",
    "gu": "ઘરકામ સફાઈ સહાય"
  },
  "housekeeper": {
    "hi": "हाउसकीपर (घर की व्यवस्था)",
    "gu": "હાઉસકીપર (ઘર વ્યવસ્થાપક)"
  },
  "humidifier cleaning": {
    "hi": "ह्यूमिडिफायर सफाई",
    "gu": "હ્યુમિડિફાયર સફાઈ"
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
  "ielts & toefl academic spoken english coach": {
    "hi": "आईईएलटीएस व टीओईएफएल इंग्लिश कोच",
    "gu": "આઇઈએલટીએસ અને ટોફલ અંગ્રેજી કોચ"
  },
  "ielts & toefl band 8+ exam preparation": {
    "hi": "आईईएलटीएस व टीओईएफएल तैयारी",
    "gu": "આઇઈએલટીએસ અને ટોફલ પરીક્ષા તૈયારી"
  },
  "ielts toefl academic spoken english coach": {
    "hi": "आईईएलटीएस व टीओईएफएल इंग्लिश कोच",
    "gu": "આઇઈએલટીએસ અને ટોફલ અંગ્રેજી કોચ"
  },
  "ielts toefl band 8 exam preparation": {
    "hi": "आईईएलटीएस व टीओईएफएल तैयारी",
    "gu": "આઇઈએલટીએસ અને ટોફલ પરીક્ષા તૈયારી"
  },
  "iit jee main advanced mathematics mentor": {
    "hi": "आईआईटी-जेईई गणित मेंटर",
    "gu": "આઇઆઇટી-જેઇઇ ગણિત માર્ગદર્શક"
  },
  "iit-jee main & advanced mathematics mentor": {
    "hi": "आईआईटी-जेईई गणित मेंटर",
    "gu": "આઇઆઇટી-જેઇઇ ગણિત માર્ગદર્શક"
  },
  "in-home pet sitting & feeding (per visit)": {
    "hi": "होम पेट सिटिंग व फीडिंग",
    "gu": "ઘરે પેટ સિટિંગ અને ફીડિંગ"
  },
  "income tax return (itr) filing for salaried": {
    "hi": "वेतनभोगियों के लिए आईटीआर फाइलिंग",
    "gu": "નોકરીયાતો માટે આઇટીઆર ફાઇલિંગ"
  },
  "income tax return itr filing for salaried": {
    "hi": "वेतनभोगियों के लिए आईटीआर फाइलिंग",
    "gu": "નોકરીયાતો માટે આઇટીઆર ફાઇલિંગ"
  },
  "individual": {
    "hi": "व्यक्तिगत (वन-ऑन-वन) ट्यूशन",
    "gu": "વ્યક્તિગત (વન-ઓન-વન) ટ્યુશન"
  },
  "indoor 360 degree wi fi security camera installation": {
    "hi": "360 डिग्री वाई-फाई कैमरा इंस्टॉलेशन",
    "gu": "૩૬૦ ડિગ્રી વાઇ-ફાઇ કેમેરા ઇન્સ્ટોલેશન"
  },
  "indoor 360 degree wi-fi security camera installation": {
    "hi": "360 डिग्री वाई-फाई कैमरा इंस्टॉलेशन",
    "gu": "૩૬૦ ડિગ્રી વાઇ-ફાઇ કેમેરા ઇન્સ્ટોલેશન"
  },
  "indoor 360 wi fi security camera installation": {
    "hi": "360 डिग्री वाई-फाई कैमरा इंस्टॉलेशन",
    "gu": "૩૬૦ ડિગ્રી વાઇ-ફાઇ કેમેરા ઇન્સ્ટોલેશન"
  },
  "indoor 360 wi-fi security camera installation": {
    "hi": "360 डिग्री वाई-फाई कैमरा इंस्टॉलेशन",
    "gu": "૩૬૦ ડિગ્રી વાઇ-ફાઇ કેમેરા ઇન્સ્ટોલેશન"
  },
  "indoor 360° wi-fi security camera installation": {
    "hi": "इंडोर 360° वाई-फाई सिक्योरिटी कैमरा फिटिंग",
    "gu": "ઇન્ડોર 360° Wi-Fi કેમેરા ઇન્સ્ટોલેશન"
  },
  "indoor plant care & seasonal repotting": {
    "hi": "इनडोर पौधों की देखभाल व रिपॉटिंग",
    "gu": "ઇન્ડોર છોડની સંભાળ અને રિપોટિંગ"
  },
  "indoor plant care seasonal repotting": {
    "hi": "इनडोर पौधों की देखभाल व रिपॉटिंग",
    "gu": "ઇન્ડોર છોડની સંભાળ અને રિપોટિંગ"
  },
  "infant toddler care": {
    "hi": "शिशु व बच्चे की देखभाल (नैनी)",
    "gu": "નાના બાળકની સારસંભાળ (બેબીસિટર)"
  },
  "infant/toddler care": {
    "hi": "शिशु व बच्चे की देखभाल (नैनी)",
    "gu": "નાના બાળકની સારસંભાળ (બેબીસિટર)"
  },
  "influencer marketing outreach & campaign management": {
    "hi": "इन्फ्लुएंसर मार्केटिंग व कैंपेन मैनेजमेंट",
    "gu": "ઇન્ફ્લુઅન્સર માર્કેટિંગ મેનેજમેન્ટ"
  },
  "instagram & facebook meta ads lead generation setup": {
    "hi": "मेटा ऐड्स (इंस्टाग्राम/फेसबुक) लीड जनरेशन",
    "gu": "ઇન્સ્ટાગ્રામ અને ફેસબુક જાહેરાત સેટઅપ"
  },
  "instagram & meta paid advertising specialist": {
    "hi": "इंस्टाग्राम व मेटा विज्ञापन विशेषज्ञ",
    "gu": "ઇન્સ્ટાગ્રામ અને મેટા એડ્સ નિષ્ણાત"
  },
  "instagram meta paid advertising specialist": {
    "hi": "इंस्टाग्राम व मेटा विज्ञापन विशेषज्ञ",
    "gu": "ઇન્સ્ટાગ્રામ અને મેટા એડ્સ નિષ્ણાત"
  },
  "installation": {
    "hi": "इंस्टॉलेशन सेवा",
    "gu": "ઇન્સ્ટોલેશન સેવા"
  },
  "instant photo booth with quirky props & prints": {
    "hi": "इंस्टेंट फोटो बूथ व प्रॉप्स",
    "gu": "ઇન્સ્ટન્ટ ફોટો બૂથ અને પ્રિન્ટ્સ"
  },
  "intel core i7 i9 custom liquid cooling setup": {
    "hi": "कस्टम लिक्विड कूलिंग सेटअप",
    "gu": "કસ્ટમ લિક્વિડ કૂલિંગ સેટઅપ"
  },
  "intel core i7/i9 custom liquid cooling setup": {
    "hi": "कस्टम लिक्विड कूलिंग सेटअप",
    "gu": "કસ્ટમ લિક્વિડ કૂલિંગ સેટઅપ"
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
  "international cuisine chef (italian/continental)": {
    "hi": "इंटरनेशनल शेफ (इटैलियन/कॉन्टिनेंटल)",
    "gu": "આંતરરાષ્ટ્રીય શેફ (ઇટાલિયન)"
  },
  "international cuisine chef italian continental": {
    "hi": "इंटरनेशनल शेफ (इटैलियन/कॉन्टिनेंटल)",
    "gu": "આંતરરાષ્ટ્રીય શેફ (ઇટાલિયન)"
  },
  "interstate bike relocation with bubble wrap": {
    "hi": "बबल रैप सुरक्षित बाइक अंतरराज्यीय शिफ्टिंग",
    "gu": "બબલ રેપ સાથે બાઇક શિફ્ટિંગ"
  },
  "interview preparation": {
    "hi": "इंटरव्यू की तैयारी",
    "gu": "ઇન્ટરવ્યુની તૈયારી"
  },
  "inverter ac": {
    "hi": "इन्वर्टर एसी",
    "gu": "ઇન્વર્ટર એસી"
  },
  "inverter installation": {
    "hi": "इन्वर्टर इंस्टॉलेशन",
    "gu": "ઇન્વર્ટર ઇન્સ્ટોલેશન"
  },
  "investment advisory": {
    "hi": "निवेश सलाहकार",
    "gu": "રોકાણ સલાહકાર"
  },
  "ironing": {
    "hi": "कपड़ों पर इस्त्री (प्रेस)",
    "gu": "કપડાં પર ઇસ્ત્રી"
  },
  "italian": {
    "hi": "इटैलियन फूड कुकिंग",
    "gu": "ઇટાલિયન ફૂડ રસોઈ"
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
    "hi": "जैन भोजन कुकिंग",
    "gu": "જૈન ભોજન રસોઈ"
  },
  "jain pure vegetarian home cook": {
    "hi": "जैन शुद्ध शाकाहारी होम कुक",
    "gu": "જૈન શુદ્ધ શાકાહારી રસોઈયો"
  },
  "jee": {
    "hi": "जेईई प्रवेश परीक्षा कोचिंग",
    "gu": "જેઇઇ પ્રવેશ પરીક્ષા કોચિંગ"
  },
  "karaoke night sound & screen rental": {
    "hi": "कराओके साउंड व स्क्रीन रेंटल",
    "gu": "કરાઓકે સાઉન્ડ અને સ્ક્રીન રેન્ટલ"
  },
  "kathak": {
    "hi": "कथक नृत्य",
    "gu": "કથક નૃત્ય"
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
  "key replacement": {
    "hi": "चाबी प्रतिस्थापन (डुप्लीकेट चाबी)",
    "gu": "ડુપ્લિકેટ ચાવી બનાવવી"
  },
  "keyboard": {
    "hi": "कीबोर्ड (पियानो) क्लास",
    "gu": "કીબોર્ડ (પિયાનો) ક્લાસ"
  },
  "keyless touchscreen digital lock fitting": {
    "hi": "कीलेस टचस्क्रीन डिजिटल लॉक फिटिंग",
    "gu": "કીલેસ ટચસ્ક્રીન ડિજિટલ લોક"
  },
  "kids birthday party snack box catering": {
    "hi": "किड्स बर्थडे पार्टी स्नैक बॉक्स कैटरिंग",
    "gu": "કિડ્સ બર્થડે પાર્ટી સ્નેક બોક્સ કેટરિંગ"
  },
  "kids care": {
    "hi": "बच्चों की देखभाल",
    "gu": "બાળકોની સારસંભાળ"
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
  "kitchen cleanup": {
    "hi": "रसोई की सफाई",
    "gu": "રસોડાની સફાઈ"
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
    "hi": "किचन डीप क्लीनिंग (गहन सफाई)",
    "gu": "રસોડાની ડીપ ક્લિનિંગ"
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
    "hi": "लैपटॉप रिपेयर व सर्विस",
    "gu": "લેપટોપ રિપેરિંગ અને સર્વિસ"
  },
  "laundry": {
    "hi": "कपड़े धोना व इस्त्री (लॉन्ड्री)",
    "gu": "કપડાં ધોવા અને ઇસ્ત્રી"
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
  "led strip installation": {
    "hi": "एलईडी स्ट्रिप लाइटिंग इंस्टॉलेशन",
    "gu": "એલઇડી સ્ટ્રીપ લાઇટિંગ ઇન્સ્ટોલેશન"
  },
  "legal advisory": {
    "hi": "कानूनी सलाह व परामर्श",
    "gu": "કાનૂની સલાહ અને પરામર્શ"
  },
  "legal consultation": {
    "hi": "कानूनी परामर्श",
    "gu": "કાનૂની સલાહ"
  },
  "legal notice drafting": {
    "hi": "कानूनी नोटिस प्रारूपण",
    "gu": "કાનૂની નોટિસ ડ્રાફ્ટિંગ"
  },
  "light installation": {
    "hi": "लाइट व फिक्सचर इंस्टॉलेशन",
    "gu": "લાઇટ ઇન્સ્ટોલેશન"
  },
  "linkedin optimization": {
    "hi": "लिंक्डइन ऑप्टिमाइजेशन",
    "gu": "લિંક્ડઇન ઓપ્ટિમાઇઝેશન"
  },
  "linkedin profile assistance": {
    "hi": "लिंक्डइन प्रोफाइल सहायता",
    "gu": "લિંક્ડઇન પ્રોફાઇલ સહાય"
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
    "hi": "लाइव संगीत परफॉर्मेंस",
    "gu": "લાઇવ મ્યુઝિક પર્ફોર્મન્સ"
  },
  "living room deep cleaning": {
    "hi": "लिविंग रूम डीप क्लीनिंग",
    "gu": "લિવિંગ રૂમ ડીપ ક્લિનિંગ"
  },
  "living room furniture polish & clean": {
    "hi": "लिविंग रूम फर्नीचर पॉलिश व सफाई",
    "gu": "લિવિંગ રૂમ ફર્નિચર પોલિશ અને સફાઈ"
  },
  "loan assistance": {
    "hi": "ऋण (लोन) सहायता",
    "gu": "લોન સહાય અને માર્ગદર્શન"
  },
  "local delivery": {
    "hi": "लोकल डिलीवरी सेवा",
    "gu": "સ્થાનિક ડિલિવરી સેવા"
  },
  "local errand assistance": {
    "hi": "स्थानीय काम-काज सहायता",
    "gu": "સ્થાનિક કામકાજ સહાય"
  },
  "local errands": {
    "hi": "स्थानीय दैनिक काम-काज",
    "gu": "સ્થાનિક કામકાજ સહાય"
  },
  "local luggage & furniture shifting (mini truck)": {
    "hi": "मिनी ट्रक से सामान व फर्नीचर शिफ्टिंग",
    "gu": "મિની ટ્રકથી સામાન અને ફર્નિચર શિફ્ટિંગ"
  },
  "local luggage furniture shifting mini truck": {
    "hi": "मिनी ट्रक से सामान व फर्नीचर शिफ्टिंग",
    "gu": "મિની ટ્રકથી સામાન અને ફર્નિચર શિફ્ટિંગ"
  },
  "local moving": {
    "hi": "लोकल शिफ्टिंग व मूविंग",
    "gu": "સ્થાનિક શિફ્ટિંગ અને મુવિંગ"
  },
  "logo design": {
    "hi": "लोगो डिजाइनिंग",
    "gu": "લોગો ડિઝાઇનિંગ"
  },
  "long-lasting gel polish manicure": {
    "hi": "लॉन्ग-लास्टिंग जेल पॉलिश मेनिक्योर",
    "gu": "લોંગ-લાસ્ટિંગ જેલ પોલિશ મેનિક્યોર"
  },
  "luggage delivery": {
    "hi": "सामान (लगेज) डिलीवरी",
    "gu": "સામાન ડિલિવરી"
  },
  "lumbar spondylosis & sciatica lower back relief": {
    "hi": "कमर दर्द व साइटिका पेन रिलीफ थेरेपी",
    "gu": "કમરનો દુખાવો અને સાયટિકા રાહત થેરાપી"
  },
  "macbook liquid damage & logic board rework": {
    "hi": "मैकबुक लॉजिक बोर्ड रिपेयर",
    "gu": "મેકબુક લોજિક બોર્ડ રિપેરિંગ"
  },
  "macbook liquid damage logic board rework": {
    "hi": "मैकबुक लॉजिक बोर्ड रिपेयर",
    "gu": "મેકબુક લોજિક બોર્ડ રિપેરિંગ"
  },
  "magician": {
    "hi": "जादूगर शो (मैजिशियन)",
    "gu": "જાદુગર શો (મેજિશિયન)"
  },
  "magnetic door & window open/close sensor setup": {
    "hi": "दरवाजा व खिड़की मैग्नेटिक सेंसर सेटअप",
    "gu": "દરવાજા અને બારી મેગ્નેટિક સેન્સર"
  },
  "maid": {
    "hi": "घरेलू सहायिका (मेड)",
    "gu": "ઘરેલું કામવાળા (મેડ)"
  },
  "mandarin chinese tutor (hsk level 1-4)": {
    "hi": "मंदारिन चीनी भाषा ट्यूशन",
    "gu": "મેન્ડરિન ચાઇનીઝ ભાષા ટ્યુશન"
  },
  "mandarin chinese tutor hsk level 1 4": {
    "hi": "मंदारिन चीनी भाषा ट्यूशन",
    "gu": "મેન્ડરિન ચાઇનીઝ ભાષા ટ્યુશન"
  },
  "manicure": {
    "hi": "मेनिक्योर",
    "gu": "મેનિક્યોર"
  },
  "manpower supply": {
    "hi": "मैनपावर सप्लाई (कर्मचारी आपूर्ति)",
    "gu": "મેનપાવર સપ્લાય (સ્ટાફ સપ્લાય)"
  },
  "marathon & endurance running coach": {
    "hi": "मैराथन व रनिंग एंड्योरेंस कोच",
    "gu": "મેરેથોન અને રનિંગ કોચ"
  },
  "market entry & competitor benchmarking strategy": {
    "hi": "मार्केट एंट्री व प्रतिस्पर्धी रणनीति",
    "gu": "માર્કેટ એન્ટ્રી સ્ટ્રેટેજી"
  },
  "market research": {
    "hi": "बाजार अनुसंधान (मार्केट रिसर्च)",
    "gu": "બજાર સંશોધન (માર્કેટ રિસર્ચ)"
  },
  "martial arts": {
    "hi": "मार्शल आर्ट्स आत्मरक्षा",
    "gu": "માર્શલ આર્ટ્સ આત્મરક્ષણ"
  },
  "maternity & newborn baby photoshoot": {
    "hi": "मैटरनिटी व न्यूबॉर्न बेबी फोटोशूट",
    "gu": "મેટર્નિટી અને નવજાત શિશુ ફોટોશૂટ"
  },
  "mathematics": {
    "hi": "गणित ट्यूशन",
    "gu": "ગણિત ટ્યુશન"
  },
  "maths": {
    "hi": "गणित ट्यूशन",
    "gu": "ગણિત ટ્યુશન"
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
    "hi": "एमसीबी व बिजली पैनल रिपेयर",
    "gu": "એમસીબી અને પેનલ રિપેરિંગ"
  },
  "medicated anti-tick & flea bath treatment": {
    "hi": "एंटी-टिक व फ्ली मेडिकेटेड बाथ",
    "gu": "એન્ટી-ટીક અને ચાંચડ બાથ"
  },
  "medicine pickup": {
    "hi": "दवाइयों की डिलीवरी",
    "gu": "દવાઓની ડિલિવરી"
  },
  "medicines pickup": {
    "hi": "दवाइयां पिकअप व डिलीवरी",
    "gu": "દવાઓની ડિલિવરી"
  },
  "meditation": {
    "hi": "ध्यान व शांति",
    "gu": "ધ્યાન અને શાંતિ"
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
  "mental health": {
    "hi": "मानसिक स्वास्थ्य परामर्श",
    "gu": "માનસિક સ્વાસ્થ્ય પરામર્શ"
  },
  "metal painting": {
    "hi": "मेटल व ग्रिल पेंटिंग",
    "gu": "ધાતુ અને ગ્રીલ પેઇન્ટિંગ"
  },
  "microwave cleaning": {
    "hi": "माइक्रोवेव की सफाई",
    "gu": "માઇક્રોવેવ સફાઈ"
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
  "mirror cleaning": {
    "hi": "दर्पण (आईना) सफाई",
    "gu": "અરીસાની સફાઈ"
  },
  "mobile app setup": {
    "hi": "मोबाइल ऐप सेटअप",
    "gu": "મોબાઇલ એપ સેટઅપ"
  },
  "modern dance": {
    "hi": "मॉडर्न डांस",
    "gu": "મોડર્ન ડાન્સ"
  },
  "moisturizer": {
    "hi": "मॉइस्चराइजर",
    "gu": "મોઇશ્ચરાઇઝર"
  },
  "monthly cook": {
    "hi": "मासिक कुक (रसोइया)",
    "gu": "માસિક રસોઇયો"
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
    "hi": "मच्छर नियंत्रण उपचार",
    "gu": "મચ્છર નિયંત્રણ સારવાર"
  },
  "mother of bride touchup": {
    "hi": "दुल्हन की मां का टचअप",
    "gu": "દુલ્હનની માતાનું ટચઅપ"
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
    "hi": "नए घर में शिफ्टिंग पूर्व सफाई",
    "gu": "નવા ઘરમાં પ્રવેશ પૂર્વે સફાઈ"
  },
  "move out cleaning": {
    "hi": "घर खाली करने के बाद सफाई",
    "gu": "ઘર ખાલી કર્યા પછીની સફાઈ"
  },
  "move-in / move-out sanitize deep clean": {
    "hi": "मूव-इन / मूव-आउट सैनिटाइज डीप सफाई",
    "gu": "મૂવ-ઇન / મૂવ-આઉટ સેનિટાઇઝ ડીપ સફાઈ"
  },
  "move-in cleaning": {
    "hi": "नए घर में शिफ्टिंग पूर्व सफाई",
    "gu": "નવા ઘરમાં પ્રવેશ પૂર્વે સફાઈ"
  },
  "move-out cleaning": {
    "hi": "घर खाली करने के बाद सफाई",
    "gu": "ઘર ખાલી કર્યા પછીની સફાઈ"
  },
  "multi story tri band mesh wi fi installation": {
    "hi": "मेश वाई-फाई नेटवर्क इंस्टॉलेशन",
    "gu": "મેશ વાઇ-ફાઇ નેટવર્ક ઇન્સ્ટોલેશન"
  },
  "multi-flat apartment intercom system setup": {
    "hi": "अपार्टमेंट इंटरकॉम सिस्टम सेटअप",
    "gu": "એપાર્ટમેન્ટ ઇન્ટરકોમ સિસ્ટમ સેટઅપ"
  },
  "multi-story tri-band mesh wi-fi installation": {
    "hi": "मेश वाई-फाई नेटवर्क इंस्टॉलेशन",
    "gu": "મેશ વાઇ-ફાઇ નેટવર્ક ઇન્સ્ટોલેશન"
  },
  "mutual fund investment & portfolio rebalancing": {
    "hi": "म्यूचुअल फंड व पोर्टफोलियो सलाह",
    "gu": "મ્યુચ્યુઅલ ફંડ અને પોર્ટફોલિયો સલાહ"
  },
  "mutual fund investment portfolio rebalancing": {
    "hi": "म्यूचुअल फंड व पोर्टफोलियो सलाह",
    "gu": "મ્યુચ્યુઅલ ફંડ અને પોર્ટફોલિયો સલાહ"
  },
  "nail art": {
    "hi": "नेल आर्ट व डिजाइन",
    "gu": "નેઇલ આર્ટ અને ડિઝાઇન"
  },
  "nail clipping": {
    "hi": "नाखून काटना",
    "gu": "નખ કાપવા"
  },
  "nail paint": {
    "hi": "नेल पेंट",
    "gu": "નેઇલ પેઇન્ટ"
  },
  "nail polish": {
    "hi": "नेल पॉलिश",
    "gu": "નેઇલ પોલિશ"
  },
  "nanny services": {
    "hi": "नैनी (आया) सेवाएं",
    "gu": "આયા (બેબીસિટર) સેવાઓ"
  },
  "neet": {
    "hi": "नीट (NEET) मेडिकल प्रवेश परीक्षा",
    "gu": "નીટ (NEET) મેડિકલ પ્રવેશ પરીક્ષા"
  },
  "neet medical physics & chemistry coach": {
    "hi": "नीट फिजिक्स व केमिस्ट्री कोच",
    "gu": "નીટ ફિઝિક્સ અને કેમિસ્ટ્રી કોચ"
  },
  "neet medical physics chemistry coach": {
    "hi": "नीट फिजिक्स व केमिस्ट्री कोच",
    "gu": "નીટ ફિઝિક્સ અને કેમિસ્ટ્રી કોચ"
  },
  "network troubleshooting": {
    "hi": "नेटवर्क समस्या निवारण",
    "gu": "નેટવર્ક સમસ્યા નિવારણ"
  },
  "non disclosure agreement nda vendor contract drafting": {
    "hi": "एनडीए व वेंडर कॉन्ट्रैक्ट ड्राफ्टिंग",
    "gu": "એનડીએ અને કોન્ટ્રાક્ટ ડ્રાફ્ટિંગ"
  },
  "non-disclosure agreement (nda) & vendor contract drafting": {
    "hi": "एनडीए व वेंडर कॉन्ट्रैक्ट ड्राफ्टिंग",
    "gu": "એનડીએ અને કોન્ટ્રાક્ટ ડ્રાફ્ટિંગ"
  },
  "north indian": {
    "hi": "उत्तर भारतीय भोजन कुकिंग",
    "gu": "ઉત્તર ભારતીય રસોઈ"
  },
  "north indian meal home cook (daily 2 meals)": {
    "hi": "उत्तर भारतीय भोजन कुक (दैनिक 2 समय)",
    "gu": "ઉત્તર ભારતીય રસોઈયો (રોજના ૨ ભોજન)"
  },
  "notary documentation assistance": {
    "hi": "नोटरी व दस्तावेजीकरण सहायता",
    "gu": "નોટરી અને દસ્તાવેજીકરણ સહાય"
  },
  "notary/documentation assistance": {
    "hi": "नोटरी व दस्तावेजीकरण सहायता",
    "gu": "નોટરી અને દસ્તાવેજીકરણ સહાય"
  },
  "nurse elderly care": {
    "hi": "बुजुर्गों की देखभाल व नर्सिंग",
    "gu": "વૃદ્ધોની સંભાળ અને નર્સિંગ"
  },
  "nurse/elderly care": {
    "hi": "बुजुर्गों की देखभाल व नर्सिंग",
    "gu": "વૃદ્ધોની સંભાળ અને નર્સિંગ"
  },
  "nutrition": {
    "hi": "पोषण व आहार योजना",
    "gu": "પોષણ અને આહાર યોજના"
  },
  "nutrition consultation": {
    "hi": "पोषण व डाइट परामर्श",
    "gu": "પોષણ અને આહાર સલાહ"
  },
  "o3 anti tan brightening facial": {
    "hi": "ओ3+ एंटी-टैन ब्राइटनिंग फेशियल",
    "gu": "ઓ૩+ એન્ટી-ટેન બ્રાઇટનિંગ ફેશિયલ"
  },
  "o3+ anti-tan brightening facial": {
    "hi": "ओ3+ एंटी-टैन ब्राइटनिंग फेशियल",
    "gu": "ઓ૩+ એન્ટી-ટેન બ્રાઇટનિંગ ફેશિયલ"
  },
  "obedience & puppy basic behavioral training": {
    "hi": "पिल्ला बेसिक ओबिडियंस ट्रेनिंग",
    "gu": "પપી બેસિક ટ્રેનિંગ"
  },
  "obedience training": {
    "hi": "पालतू कुत्तों का आज्ञाकारिता प्रशिक्षण",
    "gu": "પાલતુ શ્વાન આજ્ઞાપાલન તાલીમ"
  },
  "office boys": {
    "hi": "ऑफिस बॉय सेवाएं",
    "gu": "ઓફિસ બોય સેવાઓ"
  },
  "office cleaning": {
    "hi": "ऑफिस की सफाई",
    "gu": "ઓફિસની સફાઈ"
  },
  "office deep cleaning": {
    "hi": "ऑफिस डीप क्लीनिंग",
    "gu": "ઓફિસ ડીપ ક્લિનિંગ"
  },
  "office furniture & desktop relocation shifting": {
    "hi": "ऑफिस फर्नीचर व कंप्यूटर शिफ्टिंग",
    "gu": "ઓફિસ ફર્નિચર અને કમ્પ્યુટર શિફ્ટિંગ"
  },
  "office relocation": {
    "hi": "ऑफिस शिफ्टिंग व रिलोकेशन",
    "gu": "ઓફિસ શિફ્ટિંગ અને સ્થળાંતર"
  },
  "office shifting": {
    "hi": "कार्यालय (ऑफिस) शिफ्टिंग",
    "gu": "ઓફિસ શિફ્ટિંગ"
  },
  "offline": {
    "hi": "ऑफलाइन क्लासेस",
    "gu": "ઓફલાઇન ક્લાસિસ"
  },
  "old wooden furniture scrapping & disposal": {
    "hi": "पुराना लकड़ी फर्नीचर स्क्रैप व निस्तारण",
    "gu": "જૂનું લાકડાનું ફર્નિચર ભંગાર નિકાલ"
  },
  "on demand hourly driver manual automatic": {
    "hi": "ड्राइवर सेवा (प्रति घंटा)",
    "gu": "ડ્રાઇવર સેવા (કલાક મુજબ)"
  },
  "on-demand hourly driver (manual/automatic)": {
    "hi": "ड्राइवर सेवा (प्रति घंटा)",
    "gu": "ડ્રાઇવર સેવા (કલાક મુજબ)"
  },
  "one time cook": {
    "hi": "एक समय का कुक (रसोइया)",
    "gu": "એક સમયનો રસોઇયો"
  },
  "one-time cook": {
    "hi": "एक समय का कुक (रसोइया)",
    "gu": "એક સમયનો રસોઇયો"
  },
  "online": {
    "hi": "ऑनलाइन क्लासेस",
    "gu": "ઓનલાઇન ક્લાસિસ"
  },
  "open well & borewell submersible pump replacement": {
    "hi": "बोरवेल सबमर्सिबल पंप रिप्लेसमेंट",
    "gu": "બોરવેલ સબમર્સિબલ પંપ રિપ્લેસમેન્ટ"
  },
  "open well borewell submersible pump replacement": {
    "hi": "बोरवेल सबमर्सिबल पंप रिप्लेसमेंट",
    "gu": "બોરવેલ સબમર્સિબલ પંપ રિપ્લેસમેન્ટ"
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
  "organic kitchen waste composter installation": {
    "hi": "किचन वेस्ट कम्पोस्टर इंस्टॉलेशन",
    "gu": "કિચન વેસ્ટ કમ્પોસ્ટર ઇન્સ્ટોલેશન"
  },
  "orthopedic pet bed & harness fitment consultation": {
    "hi": "ऑर्थोपेडिक पेट बेड व हार्नेस कंसल्टेशन",
    "gu": "પેટ બેડ અને હાર્નેસ સલાહ"
  },
  "os installation": {
    "hi": "ऑपरेटिंग सिस्टम इंस्टॉलेशन",
    "gu": "ઓપરેટિંગ સિસ્ટમ ઇન્સ્ટોલેશન"
  },
  "other furniture cleaning": {
    "hi": "अन्य फर्नीचर सफाई",
    "gu": "અન્ય ફર્નિચર સફાઈ"
  },
  "other instruments": {
    "hi": "अन्य वाद्ययंत्र क्लासेस",
    "gu": "અન્ય વાદ્યોના ક્લાસિસ"
  },
  "outdoor weatherproof hd security camera fitting": {
    "hi": "आउटडोर वाटरप्रूफ कैमरा फिटिंग",
    "gu": "આઉટડોર વોટરપ્રૂફ કેમેરા ફિટિંગ"
  },
  "overnight elderly companion & vital signs monitor": {
    "hi": "रात में बुजुर्गों की देखभाल व स्वास्थ्य निगरानी",
    "gu": "વૃદ્ધોની રાત્રિ સંભાળ અને આરોગ્ય દેખરેખ"
  },
  "overnight elderly companion vital signs monitor": {
    "hi": "रात में बुजुर्गों की देखभाल व स्वास्थ्य निगरानी",
    "gu": "વૃદ્ધોની રાત્રિ સંભાળ અને આરોગ્ય દેખરેખ"
  },
  "overnight kitten nursing & socialization": {
    "hi": "बिल्लियों के बच्चों की रात में देखभाल",
    "gu": "બિલાડીના બચ્ચાંની રાત્રિ સારસંભાળ"
  },
  "overnight kitten nursing socialization": {
    "hi": "बिल्लियों के बच्चों की रात में देखभाल",
    "gu": "બિલાડીના બચ્ચાંની રાત્રિ સારસંભાળ"
  },
  "oxygen bleach & face radiance": {
    "hi": "ऑक्सीजन ब्लीच व फेस रेडिएंस",
    "gu": "ઓક્સિજન બ્લીચ અને ફેસ રેડિયન્સ"
  },
  "packaging & moving": {
    "hi": "पैकेजिंग व मूविंग सेवाएं",
    "gu": "પેકેજિંગ અને શિફ્ટિંગ સેવાઓ"
  },
  "packaging moving": {
    "hi": "पैकेजिंग व मूविंग सेवाएं",
    "gu": "પેકેજિંગ અને શિફ્ટિંગ સેવાઓ"
  },
  "packing & moving": {
    "hi": "पैकिंग व मूविंग सेवाएं",
    "gu": "પેકિંગ અને મુવિંગ સેવાઓ"
  },
  "packing & unpacking": {
    "hi": "पैकिंग व अनपैकिंग सेवाएं",
    "gu": "પેકિંગ અને અનપેકિંગ સેવાઓ"
  },
  "packing moving": {
    "hi": "पैकिंग व मूविंग सेवाएं",
    "gu": "પેકિંગ અને મુવિંગ સેવાઓ"
  },
  "packing unpacking": {
    "hi": "पैकिंग व अनपैकिंग सेवाएं",
    "gu": "પેકિંગ અને અનપેકિંગ સેવાઓ"
  },
  "paint touchup": {
    "hi": "पेंट टचअप व फिनिशिंग",
    "gu": "પેઇન્ટ ટચઅપ"
  },
  "painting consultation": {
    "hi": "पेंटिंग परामर्श व रंग चयन",
    "gu": "પેઇન્ટિંગ કન્સલ્ટેશન અને રંગ પસંદગી"
  },
  "parcel pickup": {
    "hi": "पार्सल पिकअप व ड्रॉप",
    "gu": "પાર્સલ પિકઅપ અને ડ્રોપ"
  },
  "part time cook": {
    "hi": "पार्ट-टाइम कुक",
    "gu": "પાર્ટ-ટાઇમ રસોઇયો"
  },
  "part-time cook": {
    "hi": "पार्ट-टाइम कुक",
    "gu": "પાર્ટ-ટાઇમ રસોઇયો"
  },
  "partial home cleaning": {
    "hi": "घर के चुनिंदा हिस्सों की सफाई",
    "gu": "ઘરના પસંદગીના ભાગોની સફાઈ"
  },
  "party & special occasion festival chef": {
    "hi": "पार्टी व विशेष उत्सव शेफ",
    "gu": "પાર્ટી અને તહેવાર સ્પેશિયલ શેફ"
  },
  "party decoration": {
    "hi": "पार्टी व उत्सव डेकोरेशन",
    "gu": "પાર્ટી અને ઉત્સવ ડેકોરેશન"
  },
  "party event cook": {
    "hi": "पार्टी व इवेंट कुक (शेफ)",
    "gu": "પાર્ટી અને ઇવેન્ટ રસોઇયો"
  },
  "party makeup": {
    "hi": "पार्टी मेकअप",
    "gu": "પાર્ટી મેકઅપ"
  },
  "party/event cook": {
    "hi": "पार्टी व इवेंट कुक (शेफ)",
    "gu": "પાર્ટી અને ઇવેન્ટ રસોઇયો"
  },
  "pastel balloon arch & backdrop styling": {
    "hi": "पेस्टल बैलून आर्क व बैकड्रॉप डेकोरेशन",
    "gu": "બલૂન આર્ક અને બેકડ્રોપ ડેકોરેશન"
  },
  "patient care": {
    "hi": "मरीज की देखभाल (पेशेंट केयर)",
    "gu": "દર્દીની સારસંભાળ"
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
    "hi": "पीसीओएस व हार्मोनल डाइट प्लान",
    "gu": "પીસીઓએસ અને હોર્મોનલ ડાયેટ પ્લાન"
  },
  "pcos hormonal balance nutrition plan": {
    "hi": "पीसीओएस व हार्मोनल डाइट प्लान",
    "gu": "પીસીઓએસ અને હોર્મોનલ ડાયેટ પ્લાન"
  },
  "pedicure": {
    "hi": "पेडीक्योर",
    "gu": "પેડિક્યોર"
  },
  "personal assistant": {
    "hi": "पर्सनल असिस्टेंट (निजी सहायक)",
    "gu": "પર્સનલ આસિસ્ટન્ટ (અંગત મદદનીશ)"
  },
  "personal capital gains tax computation (shares/property)": {
    "hi": "पूंजीगत लाभ (कैपिटल गेन) टैक्स गणना",
    "gu": "કેપિટલ ગેઇન્સ ટેક્સ ગણતરી"
  },
  "personal home gym fitness trainer (1-on-1)": {
    "hi": "पर्सनल होम जिम ट्रेनर (1-ऑन-1)",
    "gu": "પર્સનલ હોમ જિમ ટ્રેનર"
  },
  "personal shopper": {
    "hi": "पर्सनल शॉपर सहायता",
    "gu": "પર્સનલ ખરીદી સહાય"
  },
  "personal trainer": {
    "hi": "पर्सनल फिटनेस ट्रेनर",
    "gu": "પર્સનલ ફિટનેસ ટ્રેનર"
  },
  "personal yoga": {
    "hi": "पर्सनल योग प्रशिक्षण",
    "gu": "અંગત યોગ તાલીમ"
  },
  "pet boarding": {
    "hi": "पेट बोर्डिंग (पालतू पशु आवास)",
    "gu": "પાલતુ પ્રાણીઓનું બોર્ડિંગ"
  },
  "pet ear cleaning & hygiene sanitize pack": {
    "hi": "पेट ईयर क्लीनिंग व हाइजीन पैक",
    "gu": "પેટ ઇયર ક્લિનિંગ પેક"
  },
  "pet feeding": {
    "hi": "पालतू पशु आहार सेवा",
    "gu": "પાલતુ પ્રાણીઓને ખોરાક આપવો"
  },
  "pet food delivery & fresh meat subscription setup": {
    "hi": "पेट फूड डिलीवरी व फ्रेश मीट सब्सक्रिप्शन",
    "gu": "પેટ ફૂડ ડિલિવરી સબ્સ્ક્રિપ્શન"
  },
  "pet sitting": {
    "hi": "पेट सिटिंग (घर पर देखभाल)",
    "gu": "પાલતુ પ્રાણીઓની ઘેર બેઠા સંભાળ"
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
    "hi": "फोटो एडिटिंग व री-टचिंग",
    "gu": "ફોટો એડિટિંગ અને રિટચિંગ"
  },
  "photoelectric beam perimeter security barrier": {
    "hi": "पेरीमीटर फोटोइलेक्ट्रिक बीम बैरियर",
    "gu": "ફોટોઇલેક્ટ્રિક બીમ સિક્યોરિટી બેરિયર"
  },
  "physics": {
    "hi": "भौतिक विज्ञान (फिजिक्स)",
    "gu": "ભૌતિકશાસ્ત્ર (ફિઝિક્સ)"
  },
  "physiotherapy": {
    "hi": "फिजियोथेरेपी उपचार",
    "gu": "ફિઝિયોથેરાપી સારવાર"
  },
  "piano": {
    "hi": "पियानो क्लासेस",
    "gu": "પિયાનો ક્લાસિસ"
  },
  "piano & electronic keyboard teacher": {
    "hi": "पियानो व इलेक्ट्रॉनिक कीबोर्ड शिक्षक",
    "gu": "પિયાનો અને કીબોર્ડ શિક્ષક"
  },
  "pilates": {
    "hi": "पिलेट्स फिटनेस",
    "gu": "પિલેટ્સ ફિટનેસ"
  },
  "pillow cleaning": {
    "hi": "तकिया सफाई",
    "gu": "ઓશીકાંની સફાઈ"
  },
  "pipe installation": {
    "hi": "पाइप इंस्टॉलेशन",
    "gu": "પાઇપ ઇન્સ્ટોલેશન"
  },
  "pipe leakage repair": {
    "hi": "पाइप लीकेज रिपेयर",
    "gu": "પાઇપ લિકેજ રિપેરિંગ"
  },
  "plumbing inspection": {
    "hi": "प्लंबिंग लीकेज जांच व निरीक्षण",
    "gu": "પ્લમ્બિંગ લીકેજ તપાસ અને નિરીક્ષણ"
  },
  "point of sale (pos) billing software configuration": {
    "hi": "पीओएस बिलिंग सॉफ्टवेयर सेटअप",
    "gu": "પીઓએસ બિલિંગ સોફ્ટવેર સેટઅપ"
  },
  "point of sale pos billing software configuration": {
    "hi": "पीओएस बिलिंग सॉफ्टवेयर सेटअप",
    "gu": "પીઓએસ બિલિંગ સોફ્ટવેર સેટઅપ"
  },
  "portrait photography": {
    "hi": "पोर्ट्रेट फोटोग्राफी",
    "gu": "પોર્ટ્રેટ ફોટોગ્રાફી"
  },
  "posh act workplace harassment compliance training": {
    "hi": "पॉश (POSH) कार्यस्थल अनुपालन प्रशिक्षण",
    "gu": "પોશ (POSH) કાર્યસ્થળ પાલન તાલીમ"
  },
  "post construction dust debris intensive scrub": {
    "hi": "निर्माण पश्चात गहरी सफाई",
    "gu": "બાંધકામ પછીની ઊંડાણપૂર્વક સફાઈ"
  },
  "post-construction dust & debris intensive scrub": {
    "hi": "निर्माण पश्चात गहरी सफाई",
    "gu": "બાંધકામ પછીની ઊંડાણપૂર્વક સફાઈ"
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
  "power backup": {
    "hi": "पावर बैकअप व इन्वर्टर सेटअप",
    "gu": "પાવર બેકઅપ અને ઇન્વર્ટર સેટઅપ"
  },
  "power of attorney (poa) & affidavit legal preparation": {
    "hi": "पावर ऑफ अटॉर्नी व शपथ पत्र",
    "gu": "પાવર ઓફ એટર્ની અને સોગંદનામું"
  },
  "power of attorney poa affidavit legal preparation": {
    "hi": "पावर ऑफ अटॉर्नी व शपथ पत्र",
    "gu": "પાવર ઓફ એટર્ની અને સોગંદનામું"
  },
  "power yoga core sculpt & sweat session": {
    "hi": "पावर योग कोर स्कल्प्ट सेशन",
    "gu": "પાવર યોગ સેશન"
  },
  "practice test": {
    "hi": "अभ्यास परीक्षा (मॉक टेस्ट)",
    "gu": "પ્રેક્ટિસ ટેસ્ટ (મોક ટેસ્ટ)"
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
  "premium product upgrade": {
    "hi": "प्रीमियम उत्पाद अपग्रेड",
    "gu": "પ્રીમિયમ પ્રોડક્ટ અપગ્રેડ"
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
    "hi": "प्रोडक्ट फोटोग्राफी",
    "gu": "પ્રોડક્ટ ફોટોગ્રાફી"
  },
  "promotional video": {
    "hi": "प्रमोशनल विज्ञापन वीडियो",
    "gu": "પ્રમોશનલ જાહેરાત વિડિયો"
  },
  "public speaking": {
    "hi": "सार्वजनिक भाषण व वक्तृत्व कला",
    "gu": "જાહેર વક્તૃત્વ કળા તાલીમ"
  },
  "punjabi food": {
    "hi": "पंजाबी भोजन कुकिंग",
    "gu": "પંજાબી રસોઈ"
  },
  "puppy potty & crate training intensive": {
    "hi": "पॉटी व क्रेट ट्रेनिंग",
    "gu": "પપી પોટી ટ્રેનિંગ"
  },
  "puppy potty training & leash walking": {
    "hi": "पिल्लों की पॉटी ट्रेनिंग व वॉकिंग",
    "gu": "ગલુડિયાંની પોટી ટ્રેનિંગ અને વૉકિંગ"
  },
  "puppy potty training leash walking": {
    "hi": "पिल्लों की पॉटी ट्रेनिंग व वॉकिंग",
    "gu": "ગલુડિયાંની પોટી ટ્રેનિંગ અને વૉકિંગ"
  },
  "puppy training": {
    "hi": "पिल्लों का प्रशिक्षण",
    "gu": "ગલુડિયાંની તાલીમ"
  },
  "ransomware encrypted file analysis & recovery": {
    "hi": "रैनसमवेयर एन्क्रिप्टेड फाइल रिकवरी",
    "gu": "રેન્સમવેર ફાઇલ એનાલિસિસ"
  },
  "real estate photography": {
    "hi": "रियल एस्टेट प्रॉपर्टी फोटोग्राफी",
    "gu": "રિયલ એસ્ટેટ પ્રોપર્ટી ફોટોગ્રાફી"
  },
  "recliner chair spot & stain scrub": {
    "hi": "रेक्लाइनर चेयर दाग सफाई व स्क्रब",
    "gu": "રિક્લાઇનર ચેર ડાઘ સફાઈ"
  },
  "recliner cleaning": {
    "hi": "रिक्लाइनर सोफा सफाई",
    "gu": "રિક્લાઇનર સોફા સફાઈ"
  },
  "refrigerator repair": {
    "hi": "रेफ्रिजरेटर (फ्रिज) रिपेयर",
    "gu": "રેફ્રિજરેટર (ફ્રિજ) રિપેરિંગ"
  },
  "regional traditional cuisine": {
    "hi": "पारंपरिक क्षेत्रीय भोजन",
    "gu": "પરંપરાગત પ્રાદેશિક રસોઈ"
  },
  "regional/traditional cuisine": {
    "hi": "पारंपरिक क्षेत्रीय भोजन",
    "gu": "પરંપરાગત પ્રાદેશિક રસોઈ"
  },
  "relaxation massage": {
    "hi": "रिलैक्सेशन मसाज",
    "gu": "રિલેક્સેશન મસાજ"
  },
  "remote viewing setup": {
    "hi": "रिमोट व्यूइंग सेटअप",
    "gu": "રીમોટ વ્યુઇંગ સેટઅપ"
  },
  "renovation debris & rubble masonry clearance": {
    "hi": "कंस्ट्रक्शन मलबा व रिनोवेशन कचरा सफाई",
    "gu": "મકાન કાટમાળ અને કચરો સફાઈ"
  },
  "rent agreement": {
    "hi": "किराया अनुबंध (रेंट एग्रीमेंट)",
    "gu": "ભાડા કરાર (રેન્ટ એગ્રીમેન્ટ)"
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
    "hi": "रिज्यूमे व बायोडाटा निर्माण",
    "gu": "રિઝ્યુમ અને બાયોડેટા નિર્માણ"
  },
  "resume writing": {
    "hi": "रिज्यूमे लेखन",
    "gu": "રિઝ્યુમ લેખન"
  },
  "retail store same-day parcel dispatch": {
    "hi": "रिटेल स्टोर सेम-डे पार्सल डिलीवरी",
    "gu": "રિટેલ સ્ટોર સેમ-ડે પાર્સલ ડિસ્પેચ"
  },
  "rfid card keyless access lock installation": {
    "hi": "आरएफआईडी कार्ड एक्सेस लॉक फिटिंग",
    "gu": "આરએફઆઇડી કાર્ડ એક્સેસ લોક ફિટિંગ"
  },
  "ro cleaning": {
    "hi": "आरओ प्यूरीफायर सफाई",
    "gu": "આરઓ પ્યુરિફાયર સફાઈ"
  },
  "ro service": {
    "hi": "आरओ सर्विसिंग व फिल्टर चेक",
    "gu": "આરઓ સર્વિસિંગ અને ફિલ્ટર તપાસ"
  },
  "rodent trapping & entry sealing service": {
    "hi": "चूहा ट्रैपिंग व प्रवेश द्वार सीलिंग",
    "gu": "ઉંદર નિયંત્રણ અને સીલિંગ સેવા"
  },
  "rooftop heat reflective cool roof coating": {
    "hi": "छत पर हीट रिफ्लेक्टिव कोटिंग",
    "gu": "ધાબા પર હીટ રિફ્લેક્ટિવ કૂલ કોટિંગ"
  },
  "rooftop waterproofing": {
    "hi": "छत की वॉटरप्रूफिंग",
    "gu": "ધાબાની વૉટરપ્રૂફિંગ"
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
    "hi": "राउटर कॉन्फ़िगरेशन",
    "gu": "રાઉટર રૂપરેખાંકન"
  },
  "royal queen pamper package": {
    "hi": "रॉयल क्वीन पैम्पर पैकेज",
    "gu": "રોયલ ક્વીન પેમ્પર પેકેજ"
  },
  "same day urgent document courier": {
    "hi": "उसी दिन अर्जेंट दस्तावेज कूरियर",
    "gu": "તે જ દિવસે તાત્કાલિક દસ્તાવેજ કુરિયર"
  },
  "same-day urgent document courier": {
    "hi": "उसी दिन अर्जेंट दस्तावेज कूरियर",
    "gu": "તે જ દિવસે તાત્કાલિક દસ્તાવેજ કુરિયર"
  },
  "sanskrit": {
    "hi": "संस्कृत भाषा ट्यूशन",
    "gu": "સંસ્કૃત ભાષા ટ્યુશન"
  },
  "saree draping": {
    "hi": "साड़ी ड्रेपिंग (पहनना)",
    "gu": "સાડી ડ્રેપિંગ (પહેરવી)"
  },
  "saree draping & hair styling combo": {
    "hi": "साड़ी ड्रेपिंग व हेयर स्टाइलिंग कॉम्बो",
    "gu": "સાડી ડ્રેપિંગ અને હેર સ્ટાઇલિંગ કોમ્બો"
  },
  "scalp detox & anti-dandruff spa": {
    "hi": "स्कैल्प डिटॉक्स व एंटी-डैंड्रफ स्पा",
    "gu": "સ્કેલ્પ ડિટોક્સ અને એન્ટી-ડેન્ડ્રફ સ્પા"
  },
  "scalp treatment": {
    "hi": "स्कैल्प ट्रीटमेंट",
    "gu": "સ્કેલ્પ ટ્રીટમેન્ટ"
  },
  "schedule planning": {
    "hi": "शेड्यूल प्लानिंग",
    "gu": "શેડ્યૂલ પ્લાનિંગ"
  },
  "science": {
    "hi": "सामान्य विज्ञान ट्यूशन",
    "gu": "સામાન્ય વિજ્ઞાન ટ્યુશન"
  },
  "screen / display issue": {
    "hi": "स्क्रीन / डिस्प्ले समस्या",
    "gu": "સ્ક્રીન / ડિસ્પ્લે સમસ્યા"
  },
  "seafood & coastal recipe specialist": {
    "hi": "सीफूड व तटीय व्यंजन विशेषज्ञ शेफ",
    "gu": "સીફૂડ અને કોસ્ટલ સ્પેશિયલ શેફ"
  },
  "secure guest wi fi bandwidth limiting portal": {
    "hi": "गेस्ट वाई-फाई पोर्टल सेटअप",
    "gu": "ગેસ્ટ વાઇ-ફાઇ પોર્ટલ સેટઅપ"
  },
  "secure guest wi-fi & bandwidth limiting portal": {
    "hi": "गेस्ट वाई-फाई पोर्टल सेटअप",
    "gu": "ગેસ્ટ વાઇ-ફાઇ પોર્ટલ સેટઅપ"
  },
  "security guards": {
    "hi": "सुरक्षा गार्ड सेवाएं",
    "gu": "સિક્યોરિટી ગાર્ડ સેવાઓ"
  },
  "security system setup": {
    "hi": "सुरक्षा प्रणाली सेटअप",
    "gu": "સુરક્ષા વ્યવસ્થા સેટઅપ"
  },
  "semi permanent eyebrow microblading": {
    "hi": "माइक्रोब्लेडिंग आइब्रो",
    "gu": "આઇબ્રો માઇક્રોબ્લેડિંગ"
  },
  "semi-permanent eyebrow microblading": {
    "hi": "माइक्रोब्लेडिंग आइब्रो",
    "gu": "આઇબ્રો માઇક્રોબ્લેડિંગ"
  },
  "senior citizen errand runner & medicine delivery": {
    "hi": "वरिष्ठ नागरिकों के लिए दवा व काम सहायता",
    "gu": "વરિષ્ઠ નાગરિકો માટે દવા અને સહાય"
  },
  "senior citizen errand runner medicine delivery": {
    "hi": "वरिष्ठ नागरिकों के लिए दवा व काम सहायता",
    "gu": "વરિષ્ઠ નાગરિકો માટે દવા અને સહાય"
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
    "hi": "सर्च इंजन ऑप्टिमाइजेशन (एसईओ)",
    "gu": "સર્ચ એન્જિન ઓપ્ટિમાઇઝેશન (એસઇઓ)"
  },
  "seo on page optimization schema markup": {
    "hi": "ऑन-पेज एसईओ व स्कीमा मार्कअप",
    "gu": "ઓન-પેજ એસઇઓ અને સ્કીમા સેટઅપ"
  },
  "seo on-page optimization & schema markup": {
    "hi": "ऑन-पेज एसईओ व स्कीमा मार्कअप",
    "gu": "ઓન-પેજ એસઇઓ અને સ્કીમા સેટઅપ"
  },
  "shaving": {
    "hi": "शेविंग",
    "gu": "શેવિંગ"
  },
  "shelf installation": {
    "hi": "शेल्फ इंस्टॉलेशन",
    "gu": "શેલ્ફ ઇન્સ્ટોલેશન"
  },
  "shopify e commerce store launch consultation": {
    "hi": "शॉपिफाई ऑनलाइन स्टोर सेटअप",
    "gu": "શોપિફાઇ ઓનલાઇન સ્ટોર સેટઅપ"
  },
  "shopify e-commerce store launch consultation": {
    "hi": "शॉपिफाई ऑनलाइन स्टोर सेटअप",
    "gu": "શોપિફાઇ ઓનલાઇન સ્ટોર સેટઅપ"
  },
  "short circuit repair": {
    "hi": "शॉर्ट सर्किट रिपेयर",
    "gu": "શોર્ટ સર્કિટ રિપેરિંગ"
  },
  "short-form social media reels creator": {
    "hi": "सोशल मीडिया रील्स क्रिएटर",
    "gu": "સોશિયલ મીડિયા રીલ્સ ક્રિએટર"
  },
  "side table cleaning": {
    "hi": "साइड टेबल की सफाई",
    "gu": "સાઇડ ટેબલ સફાઈ"
  },
  "silent disco multi-channel headphone setup": {
    "hi": "साइलेंट डिस्को मल्टी-चैनल हेडफोन सेटअप",
    "gu": "સાઇલેન્ટ ડિસ્કો હેડફોન સેટઅપ"
  },
  "singer": {
    "hi": "गायक कलाकार परफॉर्मेंस",
    "gu": "ગાયક કલાકાર પર્ફોર્મન્સ"
  },
  "single bedroom deep dust & vacuum": {
    "hi": "सिंगल बेडरूम डीप डस्टिंग व वैक्यूम",
    "gu": "સિંગલ બેડરૂમ ડસ્ટિંગ અને વેક્યુમિંગ"
  },
  "single furniture item transport (sofa / bed / fridge)": {
    "hi": "एकल फर्नीचर परिवहन (सोफा / बेड / फ्रिज)",
    "gu": "સિંગલ ફર્નિચર આઇટમ ટ્રાન્સપોર્ટ"
  },
  "single room cleaning": {
    "hi": "एक कमरे की सफाई",
    "gu": "એક રૂમની સફાઈ"
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
    "hi": "त्वचा उपचार (स्किन केयर)",
    "gu": "ત્વચા સારવાર (સ્કિન કેર)"
  },
  "small office network attached storage (nas) setup": {
    "hi": "ऑफिस नैस (NAS) स्टोरेज सेटअप",
    "gu": "ઓફિસ સ્ટોરેજ (NAS) સેટઅપ"
  },
  "small office network attached storage nas setup": {
    "hi": "ऑफिस नैस (NAS) स्टोरेज सेटअप",
    "gu": "ઓફિસ સ્ટોરેજ (NAS) સેટઅપ"
  },
  "smart camera installation": {
    "hi": "स्मार्ट कैमरा इंस्टॉलेशन",
    "gu": "સ્માર્ટ કેમેરા ઇન્સ્ટોલેશન"
  },
  "smart device setup": {
    "hi": "स्मार्ट डिवाइस सेटअप",
    "gu": "સ્માર્ટ ઉપકરણ સેટઅપ"
  },
  "smart dimmer & rgb ambient lighting controller": {
    "hi": "स्मार्ट डिमर व आरजीबी लाइटिंग",
    "gu": "સ્માર્ટ ડિમર અને આરજીબી લાઇટિંગ"
  },
  "smart dimmer rgb ambient lighting controller": {
    "hi": "स्मार्ट डिमर व आरजीबी लाइटिंग",
    "gu": "સ્માર્ટ ડિમર અને આરજીબી લાઇટિંગ"
  },
  "smart doorbell installation": {
    "hi": "स्मार्ट डोरबेल इंस्टॉलेशन",
    "gu": "સ્માર્ટ ડોરબેલ ઇન્સ્ટોલેશન"
  },
  "smart home setup": {
    "hi": "स्मार्ट होम इंस्टॉलेशन",
    "gu": "સ્માર્ટ હોમ ઇન્સ્ટોલેશન"
  },
  "smart lighting installation": {
    "hi": "स्मार्ट लाइटिंग इंस्टॉलेशन",
    "gu": "સ્માર્ટ લાઇટિંગ ઇન્સ્ટોલેશન"
  },
  "smart lock battery replacement & diagnostics": {
    "hi": "स्मार्ट लॉक बैटरी व डायग्नोस्टिक्स",
    "gu": "સ્માર્ટ લોક બેટરી અને તપાસ"
  },
  "smart lock installation": {
    "hi": "स्मार्ट लॉक इंस्टॉलेशन",
    "gu": "સ્માર્ટ લોક ઇન્સ્ટોલેશન"
  },
  "smart lock replacement": {
    "hi": "स्मार्ट लॉक रिप्लेसमेंट",
    "gu": "સ્માર્ટ લોક રિપ્લેસમેન્ટ"
  },
  "smart lock setup": {
    "hi": "स्मार्ट लॉक सेटअप",
    "gu": "સ્માર્ટ લોક સેટઅપ"
  },
  "smart lock troubleshooting": {
    "hi": "स्मार्ट लॉक समस्या समाधान",
    "gu": "સ્માર્ટ લોક સમસ્યા નિવારણ"
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
    "hi": "स्मार्ट सेंसर इंस्टॉलेशन",
    "gu": "સ્માર્ટ સેન્સર ઇન્સ્ટોલેશન"
  },
  "smart switch installation": {
    "hi": "स्मार्ट स्विच इंस्टॉलेशन",
    "gu": "સ્માર્ટ સ્વિચ ઇન્સ્ટોલેશન"
  },
  "smart tv & soundbar home theater integration": {
    "hi": "स्मार्ट टीवी व साउंडबार होम थिएटर सेटअप",
    "gu": "સ્માર્ટ ટીવી અને સાઉન્ડબાર સેટઅપ"
  },
  "smart tv setup": {
    "hi": "स्मार्ट टीवी सेटअप",
    "gu": "સ્માર્ટ ટીવી સેટઅપ"
  },
  "smart video doorbell & lock sync setup": {
    "hi": "स्मार्ट वीडियो डोरबेल व लॉक सिंक",
    "gu": "સ્માર્ટ વિડિયો ડોરબેલ અને લોક સિંક"
  },
  "smart water flood & pipe leak sensor setup": {
    "hi": "स्मार्ट वॉटर लीकेज सेंसर सेटअप",
    "gu": "સ્માર્ટ વોટર લિકેજ સેન્સર સેટઅપ"
  },
  "smart wi fi switchboard retrofit fitting": {
    "hi": "स्मार्ट वाई-फाई स्विचबोर्ड फिटिंग",
    "gu": "સ્માર્ટ વાઇ-ફાઇ સ્વિચબોર્ડ ફિટિંગ"
  },
  "smart wi-fi digital thermostat installation": {
    "hi": "स्मार्ट डिजिटल थर्मोस्टेट इंस्टॉलेशन",
    "gu": "સ્માર્ટ ડિજિટલ થર્મોસ્ટેટ ઇન્સ્ટોલેશન"
  },
  "smart wi-fi switchboard retrofit fitting": {
    "hi": "स्मार्ट वाई-फाई स्विचबोर्ड फिटिंग",
    "gu": "સ્માર્ટ વાઇ-ફાઇ સ્વિચબોર્ડ ફિટિંગ"
  },
  "smartphone dead screen data extraction": {
    "hi": "डेड स्मार्टफोन स्क्रीन डेटा एक्सट्रैक्शन",
    "gu": "સ્માર્ટફોન ડેટા એક્સટ્રેક્શન"
  },
  "social media management": {
    "hi": "सोशल मीडिया प्रबंधन",
    "gu": "સોશિયલ મીડિયા સંચાલન"
  },
  "social media marketing": {
    "hi": "सोशल मीडिया मार्केटिंग",
    "gu": "સોશિયલ મીડિયા માર્કેટિંગ"
  },
  "social media video": {
    "hi": "सोशल मीडिया वीडियो निर्माण",
    "gu": "સોશિયલ મીડિયા વિડિયો નિર્માણ"
  },
  "social science": {
    "hi": "सामाजिक विज्ञान",
    "gu": "સામાજિક વિજ્ઞાન"
  },
  "sociology": {
    "hi": "समाजशास्त्र ट्यूशन",
    "gu": "સમાજશાસ્ત્ર ટ્યુશન"
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
    "hi": "सॉफ्टवेयर इंस्टॉलेशन",
    "gu": "સોફ્ટવેર ઇન્સ્ટોલેશન"
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
  "sound system": {
    "hi": "साउंड सिस्टम व स्पीकर",
    "gu": "સાઉન્ડ સિસ્ટમ અને સ્પીકર"
  },
  "south indian": {
    "hi": "दक्षिण भारतीय भोजन कुकिंग",
    "gu": "દક્ષિણ ભારતીય રસોઈ"
  },
  "south indian breakfast & meal cook": {
    "hi": "दक्षिण भारतीय नाश्ता व भोजन कुक",
    "gu": "દક્ષિણ ભારતીય નાસ્તો અને ભોજન કુક"
  },
  "south indian food": {
    "hi": "दक्षिण भारतीय भोजन कुकिंग",
    "gu": "દક્ષિણ ભારતીય રસોઈ"
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
  "special needs care": {
    "hi": "विशेष देखभाल सेवाएं",
    "gu": "વિશેષ જરૂરિયાત સારસંભાળ"
  },
  "special occasion makeup": {
    "hi": "विशेष अवसरों का मेकअप",
    "gu": "ખાસ પ્રસંગો માટે મેકઅપ"
  },
  "specialty cuisine cook": {
    "hi": "विशेष व्यंजन शेफ",
    "gu": "વિશેષ વાનગી શેફ"
  },
  "split ac": {
    "hi": "स्प्लिट एसी",
    "gu": "સ્પ્લિટ એસી"
  },
  "spoken english": {
    "hi": "स्पोकन इंग्लिश व वार्तालाप",
    "gu": "સ્પોકન ઇંગ્લિશ અને વાતચીત"
  },
  "spoken english & professional business communication": {
    "hi": "स्पोकन इंग्लिश व बिजनेस कम्युनिकेशन",
    "gu": "સ્પોકન ઇંગ્લિશ અને બિઝનેસ કોમ્યુનિકેશન"
  },
  "sports conditioning": {
    "hi": "स्पोर्ट्स कंडीशनिंग व स्टेमिना",
    "gu": "સ્પોર્ટ્સ કન્ડિશનિંગ અને સ્ટેમિના"
  },
  "sql database performance tuning & query optimization": {
    "hi": "एसक्यूएल डेटाबेस ट्यूनिंग व ऑप्टिमाइजेशन",
    "gu": "એસક્યુએલ ડેટાબેઝ ટ્યુનિંગ અને ઓપ્ટિમાઇઝેશન"
  },
  "sql database performance tuning query optimization": {
    "hi": "एसक्यूएल डेटाबेस ट्यूनिंग व ऑप्टिमाइजेशन",
    "gu": "એસક્યુએલ ડેટાબેઝ ટ્યુનિંગ અને ઓપ્ટિમાઇઝેશન"
  },
  "ssd upgrade & cloning (without data loss)": {
    "hi": "एसएसडी अपग्रेड व क्लोनिंग",
    "gu": "એસએસડી અપગ્રેડ અને ક્લોનિંગ"
  },
  "ssd upgrade cloning without data loss": {
    "hi": "एसएसडी अपग्रेड व क्लोनिंग",
    "gu": "એસએસડી અપગ્રેડ અને ક્લોનિંગ"
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
    "hi": "स्ट्रेंथ ट्रेनिंग व वजन वर्कआउट",
    "gu": "સ્ટ્રેન્થ ટ્રેનિંગ અને વજન વર્કઆઉટ"
  },
  "structural crack repair": {
    "hi": "दीवारों की दरारें मरम्मत",
    "gu": "દિવાલની તિરાડોનું રિપેરિંગ"
  },
  "studio / 1 rk compact shifting service": {
    "hi": "स्टूडियो / 1 आरके शिफ्टिंग",
    "gu": "સ્ટુડિયો / ૧ આરકે શિફ્ટિંગ"
  },
  "studio 1 rk compact shifting service": {
    "hi": "स्टूडियो / 1 आरके शिफ्टिंग",
    "gu": "સ્ટુડિયો / ૧ આરકે શિફ્ટિંગ"
  },
  "swahili": {
    "hi": "स्वाहिली भाषा ट्यूशन",
    "gu": "સ્વાહિલી ભાષા ટ્યુશન"
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
    "hi": "झाड़ू व पोछा सेवा",
    "gu": "ઝાડુ અને પોતા સેવા"
  },
  "sweeping mopping": {
    "hi": "झाड़ू व पोछा सेवा",
    "gu": "ઝાડુ અને પોતા સેવા"
  },
  "swimming": {
    "hi": "तैराकी (स्विमिंग) प्रशिक्षण",
    "gu": "તરવાની તાલીમ (સ્વિમિંગ)"
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
    "hi": "तबला वादन क्लास",
    "gu": "તબલા વાદન ક્લાસ"
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
  "tax advisory": {
    "hi": "कर (टैक्स) सलाह",
    "gu": "ટેક્સ (કરવેરા) સલાહ"
  },
  "tax filing": {
    "hi": "टैक्स रिटर्न फाइलिंग",
    "gu": "ટેક્સ રિટર્ન ફાઇલિંગ"
  },
  "tax return filing": {
    "hi": "इनकम टैक्स रिटर्न फाइलिंग",
    "gu": "ઇન્કમ ટેક્સ રિટર્ન ફાઇલિંગ"
  },
  "tds quarterly return filing (form 24q / 26q)": {
    "hi": "टीडीएस त्रैमासिक रिटर्न फाइलिंग",
    "gu": "ટીડીએસ ત્રિમાસિક રિટર્ન ફાઇલિંગ"
  },
  "tds quarterly return filing form 24q 26q": {
    "hi": "टीडीएस त्रैमासिक रिटर्न फाइलिंग",
    "gu": "ટીડીએસ ત્રિમાસિક રિટર્ન ફાઇલિંગ"
  },
  "teeth cleaning": {
    "hi": "दांतों की सफाई",
    "gu": "દાંતની સફાઈ"
  },
  "tennis": {
    "hi": "टेनिस कोचिंग",
    "gu": "ટેનિસ કોચિંગ"
  },
  "tennis / badminton footwork & stroke coach": {
    "hi": "टेनिस / बैडमिंटन स्ट्रोक कोच",
    "gu": "ટેનિસ / બેડમિન્ટન કોચ"
  },
  "termite treatment": {
    "hi": "दीमक नियंत्रण उपचार",
    "gu": "ઉધઈ નિયંત્રણ સારવાર"
  },
  "terrace & roof high-pressure wash": {
    "hi": "छत व टेरेस हाई-प्रेशर वॉश",
    "gu": "ધાબા અને ટેરેસ હાઇ-પ્રેશર વોશ"
  },
  "terrace deep cleaning": {
    "hi": "छत (टेरेस) डीप क्लीनिंग",
    "gu": "ધાબાની ડીપ ક્લિનિંગ"
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
  "therapeutic massage": {
    "hi": "थेरेप्यूटिक मालिश (दर्द निवारक)",
    "gu": "થેરાપ્યુટિક માલિશ (પીડા રાહત)"
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
    "hi": "टाइल की सफाई",
    "gu": "ટાઇલ્સ સફાઈ"
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
  "touch up painting": {
    "hi": "टच-अप पेंटिंग",
    "gu": "ટચ-અપ પેઇન્ટિંગ"
  },
  "touch-up painting": {
    "hi": "टच-अप पेंटिंग",
    "gu": "ટચ-અપ પેઇન્ટિંગ"
  },
  "trade license": {
    "hi": "ट्रेड लाइसेंस आवेदन व सहायता",
    "gu": "ટ્રેડ લાયસન્સ અરજી અને સહાય"
  },
  "trademark brand name & logo filing": {
    "hi": "ट्रेडमार्क ब्रांड नाम व लोगो फाइलिंग",
    "gu": "ટ્રેડમાર્ક બ્રાન્ડ નેમ અને લોગો ફાઇલિંગ"
  },
  "trademark filing": {
    "hi": "ट्रेडमार्क रजिस्ट्रेशन व फाइलिंग",
    "gu": "ટ્રેડમાર્ક રજિસ્ટ્રેશન અને ફાઇલિંગ"
  },
  "traditional ayurvedic potli therapy": {
    "hi": "पारंपरिक आयुर्वेदिक पोटली थेरेपी",
    "gu": "પરંપરાગત આયુર્વેદિક પોટલી થેરાપી"
  },
  "traditional cooking": {
    "hi": "पारंपरिक भोजन कुकिंग",
    "gu": "પરંપરાગત રસોઈ"
  },
  "traditional fresh flower marigold stage decor": {
    "hi": "गेंदा फूल पारंपरिक स्टेज डेकोरेशन",
    "gu": "ગલગોટા ફૂલોની સ્ટેજ સજાવટ"
  },
  "traditional indian buffet catering (per head)": {
    "hi": "पारंपरिक भारतीय बुफे कैटरिंग",
    "gu": "પરંપરાગત ભારતીય બુફે કેટરિંગ"
  },
  "traditional indian cuisine": {
    "hi": "पारंपरिक भारतीय भोजन",
    "gu": "પરંપરાગત ભારતીય રસોઈ"
  },
  "traditional indian sweet halwai": {
    "hi": "पारंपरिक भारतीय मिठाई हलवाई",
    "gu": "પરંપરાગત ભારતીય મીઠાઈ કંદોઈ"
  },
  "translation": {
    "hi": "भाषा अनुवाद सेवाएं",
    "gu": "ભાષા અનુવાદ સેવાઓ"
  },
  "travel coordination": {
    "hi": "यात्रा समन्वय",
    "gu": "મુસાફરી સંકલન"
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
  "two wheeler carburetor tuning clean": {
    "hi": "दोपहिया कार्बोरेटर ट्यूनिंग व सफाई",
    "gu": "ટૂ-વ્હીલર કાર્બ્યુરેટર ટ્યુનિંગ અને સફાઈ"
  },
  "two wheeler disc brake pad replacement": {
    "hi": "दोपहिया डिस्क ब्रेक पैड रिप्लेसमेंट",
    "gu": "ટૂ-વ્હીલર ડિસ્ક બ્રેક પેડ રિપ્લેસમેન્ટ"
  },
  "two wheeler drive chain slack adjustment": {
    "hi": "दोपहिया ड्राइव चेन एडजस्टमेंट",
    "gu": "ટૂ-વ્હીલર ડ્રાઇવ ચેઇન એડજસ્ટમેન્ટ"
  },
  "two wheeler spark plug clean gap adjustment": {
    "hi": "दोपहिया स्पार्क प्लग सफाई व एडजस्टमेंट",
    "gu": "ટૂ-વ્હીલર સ્પાર્ક પ્લગ સફાઈ"
  },
  "two wheeler throttle cable lubrication": {
    "hi": "दोपहिया थ्रॉटल केबल स्नेहन (ऑयलिंग)",
    "gu": "ટૂ-વ્હીલર થ્રોટલ કેબલ લુબ્રિકેશન"
  },
  "two-hour express city document delivery": {
    "hi": "2-घंटे में एक्सप्रेस शहर दस्तावेज डिलीवरी",
    "gu": "૨-કલાકમાં એક્સપ્રેસ દસ્તાવેજ ડિલિવરી"
  },
  "two-wheeler carburetor tuning & clean": {
    "hi": "दोपहिया कार्बोरेटर ट्यूनिंग व सफाई",
    "gu": "ટૂ-વ્હીલર કાર્બ્યુરેટર ટ્યુનિંગ અને સફાઈ"
  },
  "two-wheeler covered city bike towing": {
    "hi": "टू-व्हीलर कवर्ड सिटी बाइक टोइंग",
    "gu": "ટૂ-વ્હીલર કવર્ડ સિટી બાઇક ટોઇંગ"
  },
  "two-wheeler disc brake pad replacement": {
    "hi": "दोपहिया डिस्क ब्रेक पैड रिप्लेसमेंट",
    "gu": "ટૂ-વ્હીલર ડિસ્ક બ્રેક પેડ રિપ્લેસમેન્ટ"
  },
  "two-wheeler drive chain slack adjustment": {
    "hi": "दोपहिया ड्राइव चेन एडजस्टमेंट",
    "gu": "ટૂ-વ્હીલર ડ્રાઇવ ચેઇન એડજસ્ટમેન્ટ"
  },
  "two-wheeler spark plug clean & gap adjustment": {
    "hi": "दोपहिया स्पार्क प्लग सफाई व एडजस्टमेंट",
    "gu": "ટૂ-વ્હીલર સ્પાર્ક પ્લગ સફાઈ"
  },
  "two-wheeler throttle cable lubrication": {
    "hi": "दोपहिया थ्रॉटल केबल स्नेहन (ऑयलिंग)",
    "gu": "ટૂ-વ્હીલર થ્રોટલ કેબલ લુબ્રિકેશન"
  },
  "ui ux design": {
    "hi": "यूआई / यूएक्स डिजाइनिंग",
    "gu": "યુઆઇ / યુએક્સ ડિઝાઇનિંગ"
  },
  "ui/ux design": {
    "hi": "यूआई / यूएक्स डिजाइनिंग",
    "gu": "યુઆઇ / યુએક્સ ડિઝાઇનિંગ"
  },
  "under sink ro membrane replacement": {
    "hi": "आरओ मेम्ब्रेन रिप्लेसमेंट",
    "gu": "આરઓ મેમ્બ્રેન રિપ્લેસમેન્ટ"
  },
  "under-sink ro membrane replacement": {
    "hi": "आरओ मेम्ब्रेन रिप्लेसमेंट",
    "gu": "આરઓ મેમ્બ્રેન રિપ્લેસમેન્ટ"
  },
  "underarm tan removal & whitening pack": {
    "hi": "अंडरआर्म टैन रिमूवल व व्हाइटनिंग",
    "gu": "અંડરઆર્મ ટેન રિમૂવલ અને વ્હાઇટનિંગ"
  },
  "unfurnished full home painting": {
    "hi": "अनफर्निश्ड फुल होम पेंटिंग",
    "gu": "અનફર્निश्ड સંપૂર્ણ ઘર પેઇન્ટિંગ"
  },
  "upper lip": {
    "hi": "अपर लिप थ्रेडिंग",
    "gu": "અપર લિપ થ્રેડિંગ"
  },
  "upsc": {
    "hi": "यूपीएससी (UPSC) सिविल सेवा परीक्षा",
    "gu": "યુપીએસસી (UPSC) સિવિલ સર્વિસ પરીક્ષા"
  },
  "upsc civil services general studies mentor": {
    "hi": "यूपीएससी सामान्य अध्ययन मेंटर",
    "gu": "યુપીએસસી સામાન્ય અભ્યાસ માર્ગદર્શક"
  },
  "urgent medication pickup & doorstep delivery": {
    "hi": "जरूरी दवाइयों की घर पहुंच डिलीवरी",
    "gu": "તાત્કાલિક દવાઓની હોમ ડિલિવરી"
  },
  "urgent medication pickup doorstep delivery": {
    "hi": "जरूरी दवाइयों की घर पहुंच डिलीवरी",
    "gu": "તાત્કાલિક દવાઓની હોમ ડિલિવરી"
  },
  "vaccination": {
    "hi": "पालतू पशु टीकाकरण",
    "gu": "પાલતુ પ્રાણી રસીકરણ"
  },
  "vacuum cleaning": {
    "hi": "वैक्यूम क्लीनिंग",
    "gu": "વેક્યૂમ ક્લિનિંગ"
  },
  "vedic mathematics & fast mental math trainer": {
    "hi": "वैदिक गणित व फास्ट मैथ ट्रेनर",
    "gu": "વૈદિક ગણિત અને ઝડપી ગણતરી ટ્રેનર"
  },
  "vedic mathematics fast mental math trainer": {
    "hi": "वैदिक गणित व फास्ट मैथ ट्रेनर",
    "gu": "વૈદિક ગણિત અને ઝડપી ગણતરી ટ્રેનર"
  },
  "vegetable cutting": {
    "hi": "सब्जी काटना",
    "gu": "શાકભાજી સમારવા"
  },
  "vegetarian cook": {
    "hi": "शाकाहारी कुक (रसोइया)",
    "gu": "શાકાહારી રસોઇયો"
  },
  "vehicle breakdown assistance": {
    "hi": "वाहन ब्रेकडाउन आपातकालीन सहायता",
    "gu": "વાહન બ્રેકડાઉન કટોકટી સહાય"
  },
  "veterinary consultation": {
    "hi": "पशु चिकित्सक परामर्श",
    "gu": "પશુ ચિકિત્સક સલાહ"
  },
  "video doorbell installation": {
    "hi": "वीडियो डोरबेल इंस्टॉलेशन",
    "gu": "વિડિયો ડોરબેલ ઇન્સ્ટોલેશન"
  },
  "video editing": {
    "hi": "वीडियो एडिटिंग",
    "gu": "વિડિયો એડિટિંગ"
  },
  "violin": {
    "hi": "वायलिन क्लासेस",
    "gu": "વાયોલિન ક્લાસિસ"
  },
  "virtual assistant": {
    "hi": "वर्चुअल असिस्टेंट सेवाएं",
    "gu": "વર્ચ્યુઅલ આસિસ્ટન્ટ સેવાઓ"
  },
  "virus & malware removal deep clean": {
    "hi": "वायरस व मैलवेयर क्लीनिंग",
    "gu": "વાયરસ અને માલવેર ક્લિનિંગ"
  },
  "virus malware troubleshooting": {
    "hi": "वायरस व मैलवेयर समस्या निवारण",
    "gu": "વાયરસ અને માલવેર સમસ્યા નિવારણ"
  },
  "virus scan": {
    "hi": "एंटीवायरस स्कैन व सुरक्षा",
    "gu": "એન્ટિવાયરસ સ્કેન અને સુરક્ષા"
  },
  "virus/malware troubleshooting": {
    "hi": "वायरस व मैलवेयर समस्या निवारण",
    "gu": "વાયરસ અને માલવેર સમસ્યા નિવારણ"
  },
  "vocal training": {
    "hi": "गायन व आवाज प्रशिक्षण",
    "gu": "અવાજ અને સિંગિંગ તાલીમ"
  },
  "voice assistant hub integration (alexa / google)": {
    "hi": "वॉइस असिस्टेंट हब एकीकरण",
    "gu": "વોઇસ આસિસ્ટન્ટ હબ એકીકરણ"
  },
  "voice assistant hub integration alexa google": {
    "hi": "वॉइस असिस्टेंट हब एकीकरण",
    "gu": "વોઇસ આસિસ્ટન્ટ હબ એકીકરણ"
  },
  "wall crack repair": {
    "hi": "दीवार की दरारों की मरम्मत",
    "gu": "દિવાલની તિરાડોનું રિપેરિંગ"
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
  "waterproofing inspection": {
    "hi": "वॉटरप्रूफिंग जांच व निरीक्षण",
    "gu": "વૉટરપ્રૂફિંગ તપાસ અને નિરીક્ષણ"
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
    "hi": "शादी (वेडिंग) सजावट",
    "gu": "લગ્ન (વેડિંગ) સજાવટ"
  },
  "wedding photography": {
    "hi": "वेडिंग फोटोग्राफी",
    "gu": "વેડિંગ ફોટોગ્રાફી"
  },
  "wedding planning": {
    "hi": "शादी (वेडिंग) प्लानिंग व प्रबंधन",
    "gu": "લગ્ન (વેડિંગ) પ્લાનિંગ"
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
  "western cuisine": {
    "hi": "वेस्टर्न भोजन कुकिंग",
    "gu": "વેસ્ટર્ન ફૂડ રસોઈ"
  },
  "western dance": {
    "hi": "वेस्टर्न डांस",
    "gu": "વેસ્ટર્ન ડાન્સ"
  },
  "western pop & playback singing coach": {
    "hi": "वेस्टर्न पॉप व प्लेबैक सिंगिंग कोच",
    "gu": "વેસ્ટર્ન પોપ અને પ્લેબેક સિંગિંગ કોચ"
  },
  "western singing": {
    "hi": "वेस्टर्न गायन",
    "gu": "વેસ્ટર્ન સિંગિંગ"
  },
  "wi fi configuration": {
    "hi": "वाई-फाई कॉन्फ़िगरेशन",
    "gu": "વાઇ-ફાઇ રૂપરેખાંકન"
  },
  "wi fi router configuration dead zone mesh setup": {
    "hi": "वाई-फाई राउटर व मेश नेटवर्क सेटअप",
    "gu": "વાઇ-ફાઇ રાઉટર અને મેશ નેટવર્ક સેટઅપ"
  },
  "wi fi router setup mesh network expansion": {
    "hi": "वाई-फाई राउटर व मेश नेटवर्क विस्तार",
    "gu": "વાઇ-ફાઇ રાઉટર અને મેશ નેટવર્ક વિસ્તરણ"
  },
  "wi fi setup": {
    "hi": "वाई-फाई सेटअप",
    "gu": "વાઇ-ફાઇ સેટઅપ"
  },
  "wi-fi configuration": {
    "hi": "वाई-फाई कॉन्फ़िगरेशन",
    "gu": "વાઇ-ફાઇ રૂપરેખાંકન"
  },
  "wi-fi router configuration & dead zone mesh setup": {
    "hi": "वाई-फाई राउटर व मेश नेटवर्क सेटअप",
    "gu": "વાઇ-ફાઇ રાઉટર અને મેશ નેટવર્ક સેટઅપ"
  },
  "wi-fi router setup & mesh network expansion": {
    "hi": "वाई-फाई राउटर व मेश नेटवर्क विस्तार",
    "gu": "વાઇ-ફાઇ રાઉટર અને મેશ નેટવર્ક વિસ્તરણ"
  },
  "wi-fi setup": {
    "hi": "वाई-फाई सेटअप",
    "gu": "વાઇ-ફાઇ સેટઅપ"
  },
  "window ac": {
    "hi": "विंडो एसी",
    "gu": "વિન્ડો એસી"
  },
  "window cleaning": {
    "hi": "खिड़की की सफाई",
    "gu": "બારીઓની સફાઈ"
  },
  "window glass deep stain & hard water removal": {
    "hi": "खिड़की के कांच से दाग हटाना",
    "gu": "બારીના કાચ પરથી ડાઘ દૂર કરવા"
  },
  "window glass deep stain hard water removal": {
    "hi": "खिड़की के कांच से दाग हटाना",
    "gu": "બારીના કાચ પરથી ડાઘ દૂર કરવા"
  },
  "windows / mac os format & reinstallation": {
    "hi": "विंडोज / मैक ओएस फॉर्मेट व इंस्टॉलेशन",
    "gu": "વિન્ડોઝ / મેક ઓએસ ફોર્મેટ અને ઇન્સ્ટોલેશન"
  },
  "windows mac os format reinstallation": {
    "hi": "विंडोज / मैक ओएस फॉर्मेट व इंस्टॉलेशन",
    "gu": "વિન્ડોઝ / મેક ઓએસ ફોર્મેટ અને ઇન્સ્ટોલેશન"
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
    "hi": "लकड़ी पॉलिशिंग व वार्निश",
    "gu": "લાકડાનું પોલિશિંગ અને વાર્નિશ"
  },
  "wooden flooring deep cleaning & machine buffing": {
    "hi": "लकड़ी के फर्श की डीप क्लीनिंग व बफिंग",
    "gu": "લાકડાના ફ્લોરિંગની ડીપ ક્લિનિંગ"
  },
  "wooden flooring deep cleaning machine buffing": {
    "hi": "लकड़ी के फर्श की डीप क्लीनिंग व बफिंग",
    "gu": "લાકડાના ફ્લોરિંગની ડીપ ક્લિનિંગ"
  },
  "wordpress business website setup & customization": {
    "hi": "वर्डप्रेस वेबसाइट सेटअप व डिजाइन",
    "gu": "વર્ડપ્રેસ વેબસાઇટ સેટઅપ અને ડિઝાઇન"
  },
  "wordpress business website setup customization": {
    "hi": "वर्डप्रेस वेबसाइट सेटअप व डिजाइन",
    "gu": "વર્ડપ્રેસ વેબસાઇટ સેટઅપ અને ડિઝાઇન"
  },
  "wordpress malware removal & security hardening": {
    "hi": "वर्डप्रेस मैलवेयर हटाना व सुरक्षा",
    "gu": "વર્ડપ્રેસ માલવેર દૂર કરવું અને સુરક્ષા"
  },
  "wordpress malware removal security hardening": {
    "hi": "वर्डप्रेस मैलवेयर हटाना व सुरक्षा",
    "gu": "વર્ડપ્રેસ માલવેર દૂર કરવું અને સુરક્ષા"
  },
  "workout plan": {
    "hi": "वर्कआउट प्लान",
    "gu": "વર્કઆઉટ પ્લાન"
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
    "hi": "12V बैटरी जंपस्टार्ट using हैवी-ड्यूटी बूस्टर केबल्स or बैटरी पैक",
    "gu": "૧૨V બેટરી જમ્પસ્ટાર્ટ using હેવી-ડ્યુટી બૂસ્ટર કેબલ્સ or બેટરી પેક"
  },
  "12v battery jumpstart using heavy-duty booster cables or battery pack": {
    "hi": "12V बैटरी जंपस्टार्ट using हैवी-ड्यूटी बूस्टर केबल्स or बैटरी पैक",
    "gu": "૧૨V બેટરી જમ્પસ્ટાર્ટ using હેવી-ડ્યુટી બૂસ્ટર કેબલ્સ or બેટરી પેક"
  },
  "absorption verification": {
    "hi": "अवशोषण सत्यापन",
    "gu": "શોષણ ચકાસણી"
  },
  "academic counseling": {
    "hi": "शैक्षणिक परामर्श",
    "gu": "શૈક્ષણિક સલાહ"
  },
  "accent reduction": {
    "hi": "उच्चारण सुधार",
    "gu": "ઉચ્ચારણ સુધારણા"
  },
  "accompaniment practice": {
    "hi": "संगत अभ्यास",
    "gu": "સંગત રિયાઝ"
  },
  "acid base titrations": {
    "hi": "अम्ल-क्षार अनुमापन (टाइट्रेशन)",
    "gu": "એસિડ-બેઝ ટાઇટ્રેશન"
  },
  "acid free tile cleaning": {
    "hi": "एसिड-मुक्त टाइल सफाई",
    "gu": "એસિડ-મુક્ત ટાઇલ્સ સફાઈ"
  },
  "acid-base titrations": {
    "hi": "अम्ल-क्षार अनुमापन (टाइट्रेशन)",
    "gu": "એસિડ-બેઝ ટાઇટ્રેશન"
  },
  "acid-free tile cleaning": {
    "hi": "एसिड-मुक्त टाइल सफाई",
    "gu": "એસિડ-મુક્ત ટાઇલ્સ સફાઈ"
  },
  "activator mixing": {
    "hi": "एक्टिवेटर मिश्रण",
    "gu": "એક્ટિવેટર મિશ્રણ"
  },
  "administrative support": {
    "hi": "प्रशासनिक कार्यालय सहायता",
    "gu": "વહીવટી ઓફિસ સહાય"
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
    "hi": "उन्नत भौतिक यांत्रिकी",
    "gu": "અદ્યતન ભૌતિક યાંત્રિકી"
  },
  "advanced pumice stone rubbing": {
    "hi": "उन्नत (एडवांस्ड) झांवा पत्थर (प्यूमिस स्टोन) से घिसाई",
    "gu": "અદ્યતન (એડવાન્સ્ડ) પ્યુમિસ સ્ટોન વડે સફાઈ"
  },
  "advanced room mapping": {
    "hi": "उन्नत कक्ष मैपिंग",
    "gu": "અદ્યતન રૂમ મેપિંગ"
  },
  "advanced tool setup": {
    "hi": "उन्नत (एडवांस्ड) सैनिटाइज्ड टूल्स सेटअप",
    "gu": "અદ્યતન (એડવાન્સ્ડ) સેનિટાઇઝ્ડ સાધનો સેટઅપ"
  },
  "after hours and weekend relocation execution to prevent business downtime": {
    "hi": "सप्ताहांत व रात में सुरक्षित शिफ्टिंग",
    "gu": "સપ્તાહાંત અને રાત્રિ શિફ્ટિંગ સેવા"
  },
  "after-hours and weekend relocation execution to prevent business downtime": {
    "hi": "सप्ताहांत व रात में सुरक्षित शिफ्टिंग",
    "gu": "સપ્તાહાંત અને રાત્રિ શિફ્ટિંગ સેવા"
  },
  "aftershave application": {
    "hi": "आफ्टरशेव लोशन लगाना",
    "gu": "આફ્ટરશેવ લોશન લગાવવું"
  },
  "agility ladder drills": {
    "hi": "फुर्ती (एजिलिटी) अभ्यास",
    "gu": "ચપળતાની તાલીમ"
  },
  "airbrush base": {
    "hi": "एयरब्रश मेकअप बेस",
    "gu": "એરબ્રશ મેકઅપ બેઝ"
  },
  "algebraic manipulation": {
    "hi": "बीजगणितीय सरलीकरण",
    "gu": "બીજગણિત સરળીકરણ"
  },
  "algorithm design": {
    "hi": "एल्गोरिदम डिजाइनिंग",
    "gu": "એલ્ગોરિધમ ડિઝાઇનિંગ"
  },
  "alloy wheel rim and spoke detailed cleaning": {
    "hi": "अलॉय व्हील रिम व स्पोक सफाई",
    "gu": "એલોય વ્હીલ રિમ અને સ્પોક સફાઈ"
  },
  "aloe application": {
    "hi": "एलोवेरा जेल लगाना",
    "gu": "એલોવેરા જેલ લગાવવી"
  },
  "aloe gel application": {
    "hi": "एलोवेरा जेल लगाना",
    "gu": "એલોવેરા જેલ લગાવવી"
  },
  "aloe vera gel application": {
    "hi": "एलोवेरा जेल लगाना",
    "gu": "એલોવેરા જેલ લગાવવી"
  },
  "anatomy visualizations": {
    "hi": "शारीरिक रचना (एनाटॉमी) दृश्यीकरण",
    "gu": "શરીર રચના વિઝ્યુઅલાઇઝેશન"
  },
  "anchor bolt fitting": {
    "hi": "एंकर बोल्ट फिटिंग",
    "gu": "એન્કર બોલ્ટ ફિટિંગ"
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
    "hi": "टखने (एंकेल) की मालिश",
    "gu": "ઘૂંટી (એન્કલ) ની માલિશ"
  },
  "answer writing practice": {
    "hi": "उत्तर लेखन अभ्यास",
    "gu": "જવાબ લેખન મહાવરો"
  },
  "anti static bubble wrap protection for computer monitors and desktop towers": {
    "hi": "मॉनिटर व सीपीयू के लिए बबल रैप सुरक्षा",
    "gu": "મોનિટર અને સીપીયુ બબલ રેપ રક્ષણ"
  },
  "anti-static bubble wrap protection for computer monitors and desktop towers": {
    "hi": "मॉनिटर व सीपीयू के लिए बबल रैप सुरक्षा",
    "gu": "મોનિટર અને સીપીયુ બબલ રેપ રક્ષણ"
  },
  "appliance exterior cleaning": {
    "hi": "उपकरणों की बाहरी सफाई",
    "gu": "ઉપકરણોની બહારથી સફાઈ"
  },
  "appointment management": {
    "hi": "अपॉइंटमेंट शेड्यूलिंग व प्रबंधन",
    "gu": "એપોઇન્ટમેન્ટ વ્યવસ્થાપન"
  },
  "aptitude strengthening": {
    "hi": "योग्यता सुदृढ़ीकरण",
    "gu": "યોગ્યતા સુદૃઢીકરણ"
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
    "hi": "तर्कपूर्ण निबंध लेखन",
    "gu": "તાર્કિક નિબંધ લેખન"
  },
  "arpeggio exercises": {
    "hi": "आर्पेगियो संगीत अभ्यास",
    "gu": "આર્પેજિયો સંગીત મહાવરો"
  },
  "arpeggios": {
    "hi": "आर्पेगियो रियाज",
    "gu": "આર્પેજિયો રિયાઝ"
  },
  "assertion reasoning practice": {
    "hi": "अभिकथन-कारण प्रश्न अभ्यास",
    "gu": "વિધાન-કારણ પ્રશ્ન મહાવરો"
  },
  "assertion-reasoning practice": {
    "hi": "अभिकथन-कारण प्रश्न अभ्यास",
    "gu": "વિધાન-કારણ પ્રશ્ન મહાવરો"
  },
  "assistance navigating elevators and ground floor entryways": {
    "hi": "लिफ्ट व प्रवेश द्वार आवागमन सहायता",
    "gu": "લિફ્ટ અને પ્રવેશદ્વાર સહાય"
  },
  "assistance navigating elevators and ground-floor entryways": {
    "hi": "लिफ्ट व प्रवेश द्वार आवागमन सहायता",
    "gu": "લિફ્ટ અને પ્રવેશદ્વાર સહાય"
  },
  "atomic structure review": {
    "hi": "परमाणु संरचना पुनरीक्षण",
    "gu": "પરમાણુ બંધારણ પુનરાવર્તન"
  },
  "audience engagement": {
    "hi": "श्रोता जुड़ाव व सहभागिता",
    "gu": "શ્રોતા જોડાણ અને સંવાદ"
  },
  "backup verification": {
    "hi": "बैकअप सत्यापन",
    "gu": "બેકઅપ ચકાસણી"
  },
  "badminton specific detailing": {
    "hi": "बैडमिंटन कोचिंग विस्तृत कार्य",
    "gu": "બેડમિન્ટન કોચિંગ વિગતવાર સેવા"
  },
  "baking specific detailing": {
    "hi": "baking विशेष विस्तृत कार्य",
    "gu": "baking વિશેષ વિગતવાર કાર્ય"
  },
  "balance techniques": {
    "hi": "संतुलन तकनीक",
    "gu": "સંતુલન તકનીકો"
  },
  "balcony floor scrubbing": {
    "hi": "बालकनी फर्श की घिसाई",
    "gu": "બાલ્કની ફ્લોર સ્ક્રબિંગ"
  },
  "band specific detailing": {
    "hi": "band विशेष विस्तृत कार्य",
    "gu": "band વિશેષ વિગતવાર કાર્ય"
  },
  "banking terminology": {
    "hi": "बैंकिंग शब्दावली ज्ञान",
    "gu": "બેંકિંગ પરિભાષા જ્ઞાન"
  },
  "barre chords": {
    "hi": "बैरे कॉर्ड्स वादन",
    "gu": "બેરે કોર્ડ્સ વાદન"
  },
  "barrier cream application": {
    "hi": "बैरियर क्रीम लगाना",
    "gu": "બેરિયર ક્રીમ લગાવવી"
  },
  "base coat application": {
    "hi": "बेस कोट नेल पॉलिश लगाना",
    "gu": "બેઝ કોટ નેઇલ પોલિશ લગાવવી"
  },
  "baseboard wiping": {
    "hi": "स्कर्टिंग व बेसबोर्ड की सफाई",
    "gu": "સ્કર્ટીંગ અને બેઝબોર્ડ સફાઈ"
  },
  "basic fuse battery terminal and wiring connection inspection": {
    "hi": "फ्यूज, बैटरी व वायरिंग जांच",
    "gu": "ફ્યુઝ, બેટરી અને વાયરિંગ તપાસ"
  },
  "basic fuse, battery terminal, and wiring connection inspection": {
    "hi": "फ्यूज, बैटरी व वायरिंग जांच",
    "gu": "ફ્યુઝ, બેટરી અને વાયરિંગ તપાસ"
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
    "hi": "बाथरूम कीटाणुशोधन व ग्राउट सफाई",
    "gu": "બાથરૂમ સેનિટાઇઝેશન અને ગ્રાઉટ સફાઈ"
  },
  "bathroom tile brushing": {
    "hi": "बाथरूम टाइल्स ब्रशिंग",
    "gu": "બાથરૂમ ટાઇલ્સ બ્રશિંગ"
  },
  "bathroom tile scrubbing": {
    "hi": "बाथरूम टाइल स्क्रबिंग",
    "gu": "બાથરૂમ ટાઇલ્સ સ્ક્રબિંગ"
  },
  "battery health check": {
    "hi": "बैटरी हेल्थ व वोल्टेज जांच",
    "gu": "બેટરી ક્ષમતા અને વોલ્ટેજ તપાસ"
  },
  "bayan modulation": {
    "hi": "बायां तबला मॉड्यूलेशन",
    "gu": "ડાબા તબલા મોડ્યુલેશન"
  },
  "beard conditioning": {
    "hi": "दाढ़ी (बियर्ड) कंडीशनिंग",
    "gu": "દાઢી કન્ડિશનિંગ"
  },
  "beard length assessment": {
    "hi": "दाढ़ी की लंबाई जांच",
    "gu": "દાઢીની લંબાઈ તપાસ"
  },
  "beat matching": {
    "hi": "बीट मैचिंग तकनीक",
    "gu": "બીટ મેચિંગ ટેકનિક"
  },
  "beat synchronization": {
    "hi": "बीट सिंक्रोनाइज़ेशन",
    "gu": "બીટ સિંક્રોનાઇઝેશન"
  },
  "bedroom linen change (optional add on)": {
    "hi": "बेडशीट व तकिया कवर बदलना",
    "gu": "ચાદર અને ઓશીકાં કવર બદલવા"
  },
  "bedroom linen change (optional add-on)": {
    "hi": "बेडशीट व तकिया कवर बदलना",
    "gu": "ચાદર અને ઓશીકાં કવર બદલવા"
  },
  "bedroom linen change optional add on": {
    "hi": "बेडशीट व तकिया कवर बदलना",
    "gu": "ચાદર અને ઓશીકાં કવર બદલવા"
  },
  "behavioral training specific detailing": {
    "hi": "व्यवहार प्रशिक्षण विस्तृत कार्य",
    "gu": "વર્તણૂક તાલીમ વિગતવાર સેવા"
  },
  "bio diagram practice": {
    "hi": "जीव विज्ञान चित्र अभ्यास",
    "gu": "જીવવિજ્ઞાન આકૃતિ મહાવરો"
  },
  "bio-diagram practice": {
    "hi": "जीव विज्ञान चित्र अभ्यास",
    "gu": "જીવવિજ્ઞાન આકૃતિ મહાવરો"
  },
  "biological processes": {
    "hi": "जैविक प्रक्रियाओं की समझ",
    "gu": "જૈવિક પ્રક્રિયાઓની સમજ"
  },
  "biology flashcards": {
    "hi": "बायोलॉजी फ्लैशकार्ड्स",
    "gu": "બાયોલોજી ફ્લેશકાર્ડ્સ"
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
    "hi": "ब्लीच क्रीम मिश्रण",
    "gu": "બ્લીચ ક્રીમ મિશ્રણ"
  },
  "blemish assessment": {
    "hi": "दाग-धब्बों का आकलन",
    "gu": "ડાઘ-ધબ્બાનું મૂલ્યાંકન"
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
    "hi": "ब्लो ड्राई सेटिंग",
    "gu": "બ્લો ડ્રાય સેટિંગ"
  },
  "bluetooth module test": {
    "hi": "bluetooth module test",
    "gu": "bluetooth module test"
  },
  "body language optimization": {
    "hi": "बॉडी language optimization",
    "gu": "બોડી language optimization"
  },
  "bol recitation": {
    "hi": "bol recitation",
    "gu": "bol recitation"
  },
  "bonding theories": {
    "hi": "bonding theories",
    "gu": "bonding theories"
  },
  "boolean algebra": {
    "hi": "boolean algebra",
    "gu": "boolean algebra"
  },
  "botany and zoology memorization": {
    "hi": "botany and zoology memorization",
    "gu": "botany and zoology memorization"
  },
  "botany fundamentals": {
    "hi": "botany fundamentals",
    "gu": "botany fundamentals"
  },
  "bow control": {
    "hi": "वायलिन बो नियंत्रण",
    "gu": "વાયોલિન બો નિયંત્રણ"
  },
  "bowing techniques": {
    "hi": "बोइंग तकनीक",
    "gu": "બોઇંગ તકનીકો"
  },
  "bracket compatibility check": {
    "hi": "bracket compatibility जांच",
    "gu": "bracket compatibility તપાસ"
  },
  "bracket leveling check": {
    "hi": "bracket leveling जांच",
    "gu": "bracket leveling તપાસ"
  },
  "bracket screw tightening": {
    "hi": "bracket screw tightening",
    "gu": "bracket screw tightening"
  },
  "brake cable tension check": {
    "hi": "ब्रेक केबल तनाव जांच",
    "gu": "બ્રેક કેબલ તણાવ તપાસ"
  },
  "brake lever free play adjustment": {
    "hi": "ब्रेक लीवर फ्री प्ले एडजस्टमेंट",
    "gu": "બ્રેક લીવર એડજસ્ટમેન્ટ"
  },
  "breath movement synchronization": {
    "hi": "श्वास-गति समन्वय",
    "gu": "શ્વાસ-હલનચલન સંકલન"
  },
  "breath-movement synchronization": {
    "hi": "श्वास-गति समन्वय",
    "gu": "શ્વાસ-હલનચલન સંકલન"
  },
  "breathing exercises": {
    "hi": "breathing अभ्यास",
    "gu": "breathing કસરતો"
  },
  "breathing mindfulness specific detailing": {
    "hi": "breathing / mindfulness विशेष विस्तृत कार्य",
    "gu": "breathing / mindfulness વિશેષ વિગતવાર કાર્ય"
  },
  "breathing pattern correction": {
    "hi": "श्वास पैटर्न सुधार",
    "gu": "શ્વાસોચ્છવાસ સુધારણા"
  },
  "breathing/mindfulness specific detailing": {
    "hi": "breathing / mindfulness विशेष विस्तृत कार्य",
    "gu": "breathing / mindfulness વિશેષ વિગતવાર કાર્ય"
  },
  "bridal dupatta draping and safety pinning": {
    "hi": "दुपट्टा ड्रेपिंग व पिनिंग",
    "gu": "દુપટ્ટા ડ્રેપિંગ અને પિનિંગ"
  },
  "bridal makeup specific detailing": {
    "hi": "ब्राइडल मेकअप विस्तृत कार्य",
    "gu": "બ્રાઇડલ મેકઅપ વિગતવાર સેવા"
  },
  "brushing and detangling": {
    "hi": "बालों की ब्रशिंग व उलझन सुलझाना",
    "gu": "વાળનું બ્રશિંગ અને ગૂંચ ઉકેલવી"
  },
  "budget management": {
    "hi": "बजट प्रबंधन व निगरानी",
    "gu": "બજેટ સંચાલન અને દેખરેખ"
  },
  "buffing": {
    "hi": "नाखूनों की बफिंग व चमक",
    "gu": "નખનું બફિંગ અને ચમક"
  },
  "bulb holder wiring": {
    "hi": "बल्ब होल्डर वायरिंग",
    "gu": "બલ્બ હોલ્ડર વાયરિંગ"
  },
  "burnout prevention": {
    "hi": "तनाव व बर्नआउट निवारण",
    "gu": "માનસિક થાક અને તણાવ નિવારણ"
  },
  "cable routing": {
    "hi": "केबल routing",
    "gu": "કેબલ routing"
  },
  "calculus derivatives": {
    "hi": "कैलकुलस अवकलन",
    "gu": "કલનશાસ્ત્ર વિકલન"
  },
  "calendar scheduling": {
    "hi": "calendar scheduling",
    "gu": "calendar scheduling"
  },
  "calf massaging": {
    "hi": "पिंडली की मालिश",
    "gu": "પિંડીની માલિશ"
  },
  "call screening": {
    "hi": "call screening",
    "gu": "call screening"
  },
  "callus filing": {
    "hi": "कैलस filing",
    "gu": "કેલસ filing"
  },
  "callus scrubbing": {
    "hi": "कैलस स्क्रबिंग",
    "gu": "કેલસ સ્ક્રબિંગ"
  },
  "caloric burn tracking": {
    "hi": "caloric burn tracking",
    "gu": "caloric burn tracking"
  },
  "camera angle adjustment": {
    "hi": "कैमरा एंगल समायोजन",
    "gu": "કેમેરા એન્ગલ સેટિંગ"
  },
  "camera coverage verification": {
    "hi": "कैमरा coverage सत्यापन",
    "gu": "કેમેરા coverage ચકાસણી"
  },
  "cardio dance routines": {
    "hi": "cardio dance routines",
    "gu": "cardio dance routines"
  },
  "careful cargo handling for boxed goods and e commerce return items": {
    "hi": "careful cargo handling for boxed goods and e-commerce return items",
    "gu": "careful cargo handling for boxed goods and e-commerce return items"
  },
  "careful cargo handling for boxed goods and e-commerce return items": {
    "hi": "careful cargo handling for boxed goods and e-commerce return items",
    "gu": "careful cargo handling for boxed goods and e-commerce return items"
  },
  "careful handling of fresh produce pantry goods and packaged provisions": {
    "hi": "careful handling of fresh produce, pantry goods, and packaged provisions",
    "gu": "careful handling of fresh produce, pantry goods, and packaged provisions"
  },
  "careful handling of fresh produce, pantry goods, and packaged provisions": {
    "hi": "careful handling of fresh produce, pantry goods, and packaged provisions",
    "gu": "careful handling of fresh produce, pantry goods, and packaged provisions"
  },
  "careful transit handling for confidential business papers and envelopes": {
    "hi": "careful transit handling for confidential व्यावसायिक papers and envelopes",
    "gu": "careful transit handling for confidential વ્યાવસાયિક papers and envelopes"
  },
  "careful unloading and placement at new local address": {
    "hi": "careful unloading and placement at new local address",
    "gu": "careful unloading and placement at new local address"
  },
  "careful unloading and placement in designated rooms at destination": {
    "hi": "careful unloading and placement in designated rooms at destination",
    "gu": "careful unloading and placement in designated rooms at destination"
  },
  "carpet deep shampooing": {
    "hi": "कालीन डीप शैम्पूइंग",
    "gu": "કાર્પેટ ડીપ શેમ્પૂઇંગ"
  },
  "carpet vacuuming": {
    "hi": "कारपेट वैक्यूमिंग",
    "gu": "કાર્પેટ વેક્યુમિંગ"
  },
  "case study analysis": {
    "hi": "case study analysis",
    "gu": "case study analysis"
  },
  "casing screw tightening": {
    "hi": "casing screw tightening",
    "gu": "casing screw tightening"
  },
  "catering specific detailing": {
    "hi": "कैटरिंग सेवाएं विस्तृत कार्य",
    "gu": "કેટરિંગ સેવાઓ વિગતવાર સેવા"
  },
  "cctv focus calibration": {
    "hi": "सीसीटीवी फोकस कैलिब्रेशन",
    "gu": "સીસીટીવી ફોકસ કેલિબ્રેશન"
  },
  "ceiling fan wiping": {
    "hi": "ceiling पंखा पोंछना",
    "gu": "ceiling પંખો લૂછવું"
  },
  "cellular structure analysis": {
    "hi": "cellular संरचना analysis",
    "gu": "cellular બંધારણ analysis"
  },
  "center waist pleat creation and tucking": {
    "hi": "center waist pleat creation and tucking",
    "gu": "center waist pleat creation and tucking"
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
    "hi": "chain and sprocket degreasing and grime हटाना",
    "gu": "chain and sprocket degreasing and grime દૂર કરવું"
  },
  "chain tension check": {
    "hi": "चेन टेंशन जांच",
    "gu": "ચેઇન ટેન્શન તપાસ"
  },
  "cheek blush and soft highlighter": {
    "hi": "cheek blush and soft highlighter",
    "gu": "cheek blush and soft highlighter"
  },
  "cheek line shaping": {
    "hi": "cheek line shaping",
    "gu": "cheek line shaping"
  },
  "chemical equation balancing": {
    "hi": "chemical समीकरण संतुलन",
    "gu": "chemical સમીકરણ સંતુલન"
  },
  "chemical equilibrium": {
    "hi": "रासायनिक साम्यावस्था",
    "gu": "રાસાયણિક સંતુલન"
  },
  "chemistry formulas": {
    "hi": "chemistry formulas",
    "gu": "chemistry formulas"
  },
  "chimney cleaning specific detailing": {
    "hi": "किचन चिमनी सफाई विस्तृत कार्य",
    "gu": "કિચન ચીમની સફાઈ વિગતવાર સેવા"
  },
  "chin hair removal": {
    "hi": "ठोड़ी के बाल हटाना",
    "gu": "દાઢીના વાળ દૂર કરવા"
  },
  "chord inversions": {
    "hi": "chord inversions",
    "gu": "chord inversions"
  },
  "chord play": {
    "hi": "chord play",
    "gu": "chord play"
  },
  "chord progressions": {
    "hi": "chord progressions",
    "gu": "chord progressions"
  },
  "choreography": {
    "hi": "कोरियोग्राफी अभ्यास",
    "gu": "કોરિયોગ્રાફી મહાવરો"
  },
  "choreography memorization": {
    "hi": "choreography memorization",
    "gu": "choreography memorization"
  },
  "choreography synchronization review": {
    "hi": "choreography सिंक्रोनाइज़ेशन पुनरीक्षण",
    "gu": "choreography સિંક્રોનાઇઝેશન પુનરાવર્તન"
  },
  "circuit breaker check": {
    "hi": "सर्किट ब्रेकर जांच",
    "gu": "સર્કિટ બ્રેકર તપાસ"
  },
  "circuit breaker reset": {
    "hi": "सर्किट ब्रेकर रीसेट",
    "gu": "સર્કિટ બ્રેકર રિસેટ"
  },
  "circuit solving": {
    "hi": "circuit solving",
    "gu": "circuit solving"
  },
  "circular massage strokes": {
    "hi": "circular मालिश strokes",
    "gu": "circular માલિશ strokes"
  },
  "circular movement drills": {
    "hi": "circular movement drills",
    "gu": "circular movement drills"
  },
  "circular scrubbing strokes": {
    "hi": "गोलाकार स्क्रबिंग",
    "gu": "ગોળાકાર સ્ક્રબિંગ"
  },
  "civics and constitution": {
    "hi": "civics and constitution",
    "gu": "civics and constitution"
  },
  "clapping synchronization": {
    "hi": "clapping सिंक्रोनाइज़ेशन",
    "gu": "clapping સિંક્રોનાઇઝેશન"
  },
  "clarification of doubt": {
    "hi": "संदेह निवारण",
    "gu": "શંકા નિવારણ"
  },
  "classification practice": {
    "hi": "classification अभ्यास",
    "gu": "classification મહાવરો"
  },
  "cleaning coverage verification": {
    "hi": "सफाई coverage सत्यापन",
    "gu": "સફાઈ coverage ચકાસણી"
  },
  "cleanliness stability check": {
    "hi": "cleanliness stability जांच",
    "gu": "cleanliness stability તપાસ"
  },
  "clear room specific labeling and box content categorization": {
    "hi": "clear room-specific labeling and box content categorization",
    "gu": "clear room-specific labeling and box content categorization"
  },
  "clear room-specific labeling and box content categorization": {
    "hi": "clear room-specific labeling and box content categorization",
    "gu": "clear room-specific labeling and box content categorization"
  },
  "clerical aptitude": {
    "hi": "clerical योग्यता",
    "gu": "clerical યોગ્યતા"
  },
  "client consultation": {
    "hi": "ग्राहक परामर्श",
    "gu": "ગ્રાહક પરામર્શ"
  },
  "client coordination": {
    "hi": "client coordination",
    "gu": "client coordination"
  },
  "client requirement review": {
    "hi": "client requirement पुनरीक्षण",
    "gu": "client requirement પુનરાવર્તન"
  },
  "client satisfaction review": {
    "hi": "client satisfaction पुनरीक्षण",
    "gu": "client satisfaction પુનરાવર્તન"
  },
  "client walkthrough": {
    "hi": "ग्राहक वॉकथ्रू (कार्य समीक्षा)",
    "gu": "ક્લાયન્ટ વોકથ્રૂ (કાર્ય નિરીક્ષણ)"
  },
  "clipper blending": {
    "hi": "clipper blending",
    "gu": "clipper blending"
  },
  "closing arguments": {
    "hi": "समापन तर्क व दलीलें",
    "gu": "આખરી દલીલો"
  },
  "clutch lever play check": {
    "hi": "क्लच लीवर प्ले जांच",
    "gu": "ક્લચ લીવર પ્લે તપાસ"
  },
  "clutch play adjustment": {
    "hi": "क्लच प्ले एडजस्टमेंट",
    "gu": "ક્લચ પ્લે એડજસ્ટમેન્ટ"
  },
  "cobweb removal": {
    "hi": "मकड़ी के जाले हटाना",
    "gu": "કરોળિયાના જાળા દૂર કરવા"
  },
  "code optimization": {
    "hi": "code optimization",
    "gu": "code optimization"
  },
  "cognitive reframing": {
    "hi": "सकारात्मक सोच पुनर्गठन",
    "gu": "હકારાત્મક વિચાર પુનર્ગઠન"
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
    "hi": "ठंडा towel पोंछना",
    "gu": "ઠંડું towel લૂછવું"
  },
  "cold water rinse": {
    "hi": "ठंडे पानी से धुलाई",
    "gu": "ઠંડા પાણીથી ધોવું"
  },
  "color application": {
    "hi": "color लगाना",
    "gu": "color લગાવવું"
  },
  "color matching": {
    "hi": "color मैचिंग",
    "gu": "color મેચિંગ"
  },
  "color sealing": {
    "hi": "color sealing",
    "gu": "color sealing"
  },
  "color uniformity check": {
    "hi": "color uniformity जांच",
    "gu": "color uniformity તપાસ"
  },
  "color washing": {
    "hi": "color washing",
    "gu": "color washing"
  },
  "comb styling": {
    "hi": "comb स्टाइलिंग",
    "gu": "comb સ્ટાઇલિંગ"
  },
  "combing and parting": {
    "hi": "कंघी व मांग निकालना",
    "gu": "કાંસકી ફેરવવી અને સેંથો પાડવો"
  },
  "commercial office relocation for workstations chairs and filing units": {
    "hi": "commercial office स्थानांतरण for workstations, chairs, and filing units",
    "gu": "commercial office સ્થળાંતર for workstations, chairs, and filing units"
  },
  "commercial office relocation for workstations, chairs, and filing units": {
    "hi": "commercial office स्थानांतरण for workstations, chairs, and filing units",
    "gu": "commercial office સ્થળાંતર for workstations, chairs, and filing units"
  },
  "communication drills": {
    "hi": "संवाद कौशल अभ्यास",
    "gu": "સંવાદ કૌશલ્ય મહાવરો"
  },
  "communication follow up": {
    "hi": "communication follow-up",
    "gu": "communication follow-up"
  },
  "communication follow-up": {
    "hi": "communication follow-up",
    "gu": "communication follow-up"
  },
  "competition prep": {
    "hi": "प्रतियोगिता तैयारी",
    "gu": "સ્પર્ધા પૂર્વ તૈયારી"
  },
  "complete cabin interior vacuuming (carpets, seats, boot)": {
    "hi": "complete cabin interior vacuuming (carpets, seats, boot)",
    "gu": "complete cabin interior vacuuming (carpets, seats, boot)"
  },
  "complete cabin interior vacuuming carpets seats boot": {
    "hi": "complete cabin interior vacuuming (carpets, seats, boot)",
    "gu": "complete cabin interior vacuuming (carpets, seats, boot)"
  },
  "complete facial makeup (prep, primer, foundation, concealer, powder)": {
    "hi": "complete फेशियल makeup (तैयारी (प्रेप), प्राइमर, फाउंडेशन, कंसीलर, powder)",
    "gu": "complete ફેશિયલ makeup (તૈયારી (પ્રેપ), પ્રાઇમર, ફાઉન્ડેશન, કન્સીલર, powder)"
  },
  "complete facial makeup prep primer foundation concealer powder": {
    "hi": "complete फेशियल makeup (तैयारी (प्रेप), प्राइमर, फाउंडेशन, कंसीलर, powder)",
    "gu": "complete ફેશિયલ makeup (તૈયારી (પ્રેપ), પ્રાઇમર, ફાઉન્ડેશન, કન્સીલર, powder)"
  },
  "complex calculus practice": {
    "hi": "complex calculus अभ्यास",
    "gu": "complex calculus મહાવરો"
  },
  "compliance checking": {
    "hi": "compliance checking",
    "gu": "compliance checking"
  },
  "compost moisture monitoring": {
    "hi": "कम्पोस्ट नमी निगरानी",
    "gu": "કમ્પોસ્ટ ભેજ દેખરેખ"
  },
  "comprehension practice": {
    "hi": "पठन बोध अभ्यास",
    "gu": "વાંચન ગહનતા મહાવરો"
  },
  "comprehensive loading transport and unloading of household belongings": {
    "hi": "comprehensive loading, transport, and unloading of household belongings",
    "gu": "comprehensive loading, transport, and unloading of household belongings"
  },
  "comprehensive loading, transport, and unloading of household belongings": {
    "hi": "comprehensive loading, transport, and unloading of household belongings",
    "gu": "comprehensive loading, transport, and unloading of household belongings"
  },
  "compression testing": {
    "hi": "इंजन कम्प्रेशन टेस्टिंग",
    "gu": "એન્જિન કમ્પ્રેશન ટેસ્ટિંગ"
  },
  "computer aptitude": {
    "hi": "computer योग्यता",
    "gu": "computer યોગ્યતા"
  },
  "concept bridging": {
    "hi": "concept bridging",
    "gu": "concept bridging"
  },
  "concept clarity": {
    "hi": "मूलभूत अवधारणा स्पष्टता",
    "gu": "સંકલ્પના સ્પષ્ટતા"
  },
  "concept mapping": {
    "hi": "concept मैपिंग",
    "gu": "concept મેપિંગ"
  },
  "concept revision": {
    "hi": "concept revision",
    "gu": "concept revision"
  },
  "conceptual depth building": {
    "hi": "conceptual depth building",
    "gu": "conceptual depth building"
  },
  "conditioning": {
    "hi": "डीप कंडीशनिंग",
    "gu": "ડીપ કન્ડિશનિંગ"
  },
  "confidentiality maintenance": {
    "hi": "confidentiality maintenance",
    "gu": "confidentiality maintenance"
  },
  "contact list maintenance": {
    "hi": "contact list maintenance",
    "gu": "contact list maintenance"
  },
  "conversational practice": {
    "hi": "conversational अभ्यास",
    "gu": "conversational મહાવરો"
  },
  "cool down breathing": {
    "hi": "cool-down breathing",
    "gu": "cool-down breathing"
  },
  "cool down period": {
    "hi": "कूल डाउन समय",
    "gu": "કૂલ ડાઉન સમય"
  },
  "cool down stretches": {
    "hi": "कूल-डाउन स्ट्रेचेस",
    "gu": "કૂલ-ડાઉન સ્ટ્રેચિંગ"
  },
  "cool-down breathing": {
    "hi": "cool-down breathing",
    "gu": "cool-down breathing"
  },
  "cool-down stretches": {
    "hi": "कूल-डाउन स्ट्रेचेस",
    "gu": "કૂલ-ડાઉન સ્ટ્રેચિંગ"
  },
  "cooling down period": {
    "hi": "कूल डाउन समय",
    "gu": "કૂલ ડાઉન સમય"
  },
  "cooling massage": {
    "hi": "शीतल मालिश (कूलिंग मसाज)",
    "gu": "કૂલિંગ મસાજ"
  },
  "cooling performance test": {
    "hi": "कूलिंग परफॉर्मेंस टेस्ट",
    "gu": "કૂલિંગ પરફોર્મન્સ ટેસ્ટ"
  },
  "coordinate geometry": {
    "hi": "निर्देशांक ज्यामिति",
    "gu": "યામ ભૂમિતિ"
  },
  "core engagement": {
    "hi": "core जुड़ाव",
    "gu": "core જોડાણ"
  },
  "core engineering concepts": {
    "hi": "core engineering concepts",
    "gu": "core engineering concepts"
  },
  "core strengthening": {
    "hi": "कोर मजबूती कसरत",
    "gu": "કોર મજબૂતાઈ કસરતો"
  },
  "corner detailing": {
    "hi": "कोनों की बारीक सफाई",
    "gu": "ખૂણાઓની ઝીણવટભરી સફાઈ"
  },
  "corner guard protection for fragile edges and glass tabletops": {
    "hi": "corner guard सुरक्षा for fragile edges and glass tabletops",
    "gu": "corner guard રક્ષણ for fragile edges and glass tabletops"
  },
  "corporate video specific detailing": {
    "hi": "कॉर्पोरेट वीडियो विस्तृत कार्य",
    "gu": "કોર્પોરેટ વિડિયો વિગતવાર સેવા"
  },
  "countertop sanitization": {
    "hi": "काउंटरटॉप सैनिटाइजेशन",
    "gu": "કાઉન્ટરટોપ સેનિટાઇઝેશન"
  },
  "cream removal": {
    "hi": "क्रीम हटाना",
    "gu": "ક્રીમ દૂર કરવું"
  },
  "creative writing": {
    "hi": "creative लेखन",
    "gu": "creative લેખન"
  },
  "creative writing prompts": {
    "hi": "रचनात्मक लेखन अभ्यास",
    "gu": "સર્જનાત્મક લેખન મહાવરો"
  },
  "cricket batting drill": {
    "hi": "क्रिकेट बैटिंग अभ्यास",
    "gu": "ક્રિકેટ બેટિંગ મહાવરો"
  },
  "cricket bowling drill": {
    "hi": "क्रिकेट बॉलिंग अभ्यास",
    "gu": "ક્રિકેટ બોલિંગ મહાવરો"
  },
  "cricket specific detailing": {
    "hi": "क्रिकेट कोचिंग विस्तृत कार्य",
    "gu": "ક્રિકેટ કોચિંગ વિગતવાર સેવા"
  },
  "crown layering": {
    "hi": "crown layering",
    "gu": "crown layering"
  },
  "cultural context understanding": {
    "hi": "cultural context understanding",
    "gu": "cultural context understanding"
  },
  "cultural history overview": {
    "hi": "cultural history overview",
    "gu": "cultural history overview"
  },
  "current affairs analysis": {
    "hi": "current affairs analysis",
    "gu": "current affairs analysis"
  },
  "current events": {
    "hi": "current events",
    "gu": "current events"
  },
  "curtain dusting": {
    "hi": "पर्दे (कर्टेन) dusting",
    "gu": "પડદા dusting"
  },
  "custom eyeshadow artistry with subtle shimmer or glam accents": {
    "hi": "कस्टम eyeshadow artistry with subtle shimmer or glam accents",
    "gu": "કસ્ટમ eyeshadow artistry with subtle shimmer or glam accents"
  },
  "cut off analysis": {
    "hi": "cut-off analysis",
    "gu": "cut-off analysis"
  },
  "cut-off analysis": {
    "hi": "cut-off analysis",
    "gu": "cut-off analysis"
  },
  "cuticle care": {
    "hi": "क्यूटिकल देखभाल",
    "gu": "ક્યુટિકલ સંભાળ"
  },
  "cuticle health check": {
    "hi": "क्यूटिकल स्वास्थ्य जांच",
    "gu": "ક્યુટિકલ આરોગ્ય તપાસ"
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
    "hi": "क्यूटिकल smoothing",
    "gu": "ક્યુટિકલ smoothing"
  },
  "cuticle softening": {
    "hi": "क्यूटिकल कोमल बनाना",
    "gu": "ક્યુટિકલ નરમ બનાવવું"
  },
  "cuticle trimming": {
    "hi": "क्यूटिकल trimming",
    "gu": "ક્યુટિકલ trimming"
  },
  "cutting and styling": {
    "hi": "कटिंग व हेयर स्टाइलिंग",
    "gu": "કટિંગ અને હેર સ્ટાઇલિંગ"
  },
  "cv optimization": {
    "hi": "सीवी व बायोडाटा सुधार",
    "gu": "સીવી અને બાયોડેટા સુધારણા"
  },
  "cymbal crashes": {
    "hi": "cymbal crashes",
    "gu": "cymbal crashes"
  },
  "daily briefing setup": {
    "hi": "daily briefing सेटअप",
    "gu": "daily briefing સેટઅપ"
  },
  "daily cook specific detailing": {
    "hi": "दैनिक कुक (रसोइया) विस्तृत कार्य",
    "gu": "દૈનિક રસોઇયો વિગતવાર સેવા"
  },
  "daily health monitoring": {
    "hi": "दैनिक स्वास्थ्य निगरानी",
    "gu": "દૈનિક આરોગ્ય દેખરેખ"
  },
  "damage inspection": {
    "hi": "क्षति व खराबी निरीक्षण",
    "gu": "નુકસાન તપાસ અને નિરીક્ષણ"
  },
  "dancer specific detailing": {
    "hi": "dancer विशेष विस्तृत कार्य",
    "gu": "dancer વિશેષ વિગતવાર કાર્ય"
  },
  "dandiya stick handling": {
    "hi": "dandiya stick handling",
    "gu": "dandiya stick handling"
  },
  "dashboard console and door panel damp wipe down": {
    "hi": "dashboard, console, and दरवाजा panel damp wipe-down",
    "gu": "dashboard, console, and દરવાજો panel damp wipe-down"
  },
  "dashboard, console, and door panel damp wipe-down": {
    "hi": "dashboard, console, and दरवाजा panel damp wipe-down",
    "gu": "dashboard, console, and દરવાજો panel damp wipe-down"
  },
  "data analysis": {
    "hi": "data analysis",
    "gu": "data analysis"
  },
  "data backup initiation": {
    "hi": "data backup initiation",
    "gu": "data backup initiation"
  },
  "data backup verification": {
    "hi": "डेटा बैकअप सत्यापन",
    "gu": "ડેટા બેકઅપ ચકાસણી"
  },
  "data entry processing": {
    "hi": "data entry processing",
    "gu": "data entry processing"
  },
  "data interpretation charts": {
    "hi": "data interpretation charts",
    "gu": "data interpretation charts"
  },
  "data structure implementation": {
    "hi": "data संरचना implementation",
    "gu": "data બંધારણ implementation"
  },
  "data sufficiency": {
    "hi": "data sufficiency",
    "gu": "data sufficiency"
  },
  "database querying": {
    "hi": "database querying",
    "gu": "database querying"
  },
  "date memorization techniques": {
    "hi": "date memorization तकनीक",
    "gu": "date memorization તકનીકો"
  },
  "dayan clarity": {
    "hi": "dayan clarity",
    "gu": "dayan clarity"
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
    "hi": "debris सफाई",
    "gu": "debris સફાઈ"
  },
  "decision making scenarios": {
    "hi": "decision making scenarios",
    "gu": "decision making scenarios"
  },
  "dedicated intra city utility vehicle transport": {
    "hi": "dedicated intra-city utility vehicle transport",
    "gu": "dedicated intra-city utility vehicle transport"
  },
  "dedicated intra-city utility vehicle transport": {
    "hi": "dedicated intra-city utility vehicle transport",
    "gu": "dedicated intra-city utility vehicle transport"
  },
  "dedicated licensed driver for vehicle transit to and from service center": {
    "hi": "dedicated licensed driver for vehicle transit to and from सेवा center",
    "gu": "dedicated licensed driver for vehicle transit to and from સેવા center"
  },
  "dedicated transport assistance for standalone furniture pieces": {
    "hi": "dedicated transport सहायता for standalone furniture pieces",
    "gu": "dedicated transport સહાય for standalone furniture pieces"
  },
  "deep cleansing massage": {
    "hi": "गहन (डीप) cleansing मालिश",
    "gu": "ડીપ cleansing માલિશ"
  },
  "deep conditioning": {
    "hi": "डीप कंडीशनिंग",
    "gu": "ડીપ કન્ડિશનિંગ"
  },
  "deep equipment stain assessment": {
    "hi": "गहन (डीप) equipment दाग आकलन",
    "gu": "ડીપ equipment ડાઘ મૂલ્યાંકન"
  },
  "deep foot exfoliation": {
    "hi": "गहन फुट एक्सफोलिएशन",
    "gu": "ગહન ફૂટ એક્સફોલિએશન"
  },
  "deep stain spot treatment": {
    "hi": "गहन (डीप) दाग spot-treatment",
    "gu": "ડીપ ડાઘ spot-treatment"
  },
  "deep stain spot-treatment": {
    "hi": "गहन (डीप) दाग spot-treatment",
    "gu": "ડીપ ડાઘ spot-treatment"
  },
  "deep tissue massage specific detailing": {
    "hi": "डीप टिशू मसाज विस्तृत कार्य",
    "gu": "ડીપ ટિશ્યુ મસાજ વિગતવાર સેવા"
  },
  "deep tissue pressure": {
    "hi": "डीप टिश्यू दबाव मालिश",
    "gu": "ડીપ ટિશ્યુ દબાણ માલિશ"
  },
  "deep tissue scalp techniques": {
    "hi": "गहन (डीप) टिश्यू स्कैल्प तकनीक",
    "gu": "ડીપ ટિશ્યુ સ્કેલ્પ તકનીકો"
  },
  "defined lip color application": {
    "hi": "defined lip color लगाना",
    "gu": "defined lip color લગાવવું"
  },
  "degreasing": {
    "hi": "चिकनाई व ग्रीस हटाना",
    "gu": "ચીકાશ અને ગ્રીસ દૂર કરવી"
  },
  "demographic data interpretation": {
    "hi": "demographic data interpretation",
    "gu": "demographic data interpretation"
  },
  "deodorizing": {
    "hi": "दुर्गंध निवारण",
    "gu": "દુર્ગંધ નિવારણ"
  },
  "descaling": {
    "hi": "पानी के जमाव (स्केल) की सफाई",
    "gu": "ક્ષાર સફાઈ (ડીસ્કેલિંગ)"
  },
  "detail oriented processing": {
    "hi": "detail-oriented processing",
    "gu": "detail-oriented processing"
  },
  "detail-oriented processing": {
    "hi": "detail-oriented processing",
    "gu": "detail-oriented processing"
  },
  "detailed 4 bhk cleaning execution": {
    "hi": "detailed 4 बीएचके + सफाई निष्पादन",
    "gu": "detailed 4 બીએચકે + સફાઈ અમલ"
  },
  "detailed 4 bhk+ cleaning execution": {
    "hi": "detailed 4 बीएचके + सफाई निष्पादन",
    "gu": "detailed 4 બીએચકે + સફાઈ અમલ"
  },
  "detailed cleaning of wheel rims arches and tyres": {
    "hi": "detailed सफाई of पहिया rims, arches, and tyres",
    "gu": "detailed સફાઈ of વ્હીલ rims, arches, and tyres"
  },
  "detailed cleaning of wheel rims, arches, and tyres": {
    "hi": "detailed सफाई of पहिया rims, arches, and tyres",
    "gu": "detailed સફાઈ of વ્હીલ rims, arches, and tyres"
  },
  "detailed digital lock installation execution": {
    "hi": "detailed digital ताला इंस्टॉलेशन निष्पादन",
    "gu": "detailed digital લોક ઇન્સ્ટોલેશન અમલ"
  },
  "detailed inspection": {
    "hi": "विस्तृत निरीक्षण",
    "gu": "વિગતવાર નિરીક્ષણ"
  },
  "detailed swimming execution": {
    "hi": "detailed swimming निष्पादन",
    "gu": "detailed swimming અમલ"
  },
  "developer mixing": {
    "hi": "developer मिश्रण",
    "gu": "developer મિશ્રણ"
  },
  "device pairing and calibration": {
    "hi": "डिवाइस पेयरिंग व कैलिब्रेशन",
    "gu": "ડિવાઇસ પેરિંગ અને કેલિબ્રેશન"
  },
  "diagnostic step 10": {
    "hi": "diagnostic step 10",
    "gu": "diagnostic step 10"
  },
  "diagnostic step 11": {
    "hi": "diagnostic step 11",
    "gu": "diagnostic step 11"
  },
  "diagnostic step 12": {
    "hi": "diagnostic step 12",
    "gu": "diagnostic step 12"
  },
  "diagnostic step 13": {
    "hi": "diagnostic step 13",
    "gu": "diagnostic step 13"
  },
  "diagnostic step 14": {
    "hi": "diagnostic step 14",
    "gu": "diagnostic step 14"
  },
  "diagram interpretation": {
    "hi": "चित्र interpretation",
    "gu": "આકૃતિ interpretation"
  },
  "diagram labeling": {
    "hi": "चित्र labeling",
    "gu": "આકૃતિ labeling"
  },
  "dialogue role playing": {
    "hi": "dialogue role-playing",
    "gu": "dialogue role-playing"
  },
  "dialogue role-playing": {
    "hi": "dialogue role-playing",
    "gu": "dialogue role-playing"
  },
  "diction improvement": {
    "hi": "diction improvement",
    "gu": "diction improvement"
  },
  "diet consultation specific detailing": {
    "hi": "आहार परामर्श विस्तृत कार्य",
    "gu": "આહાર સલાહ વિગતવાર સેવા"
  },
  "diet plan personalization": {
    "hi": "व्यक्तिगत डाइट चार्ट",
    "gu": "વ્યક્તિગત ડાયેટ ચાર્ટ"
  },
  "digital delivery confirmation and recipient receipt acknowledgment": {
    "hi": "digital delivery confirmation and recipient receipt acknowledgment",
    "gu": "digital delivery confirmation and recipient receipt acknowledgment"
  },
  "digital delivery confirmation notification upon arrival": {
    "hi": "digital delivery confirmation notification upon arrival",
    "gu": "digital delivery confirmation notification upon arrival"
  },
  "digital effects usage": {
    "hi": "digital effects usage",
    "gu": "digital effects usage"
  },
  "digital handover sign off and trip completion notification": {
    "hi": "digital handover sign-off and trip completion notification",
    "gu": "digital handover sign-off and trip completion notification"
  },
  "digital handover sign-off and trip completion notification": {
    "hi": "digital handover sign-off and trip completion notification",
    "gu": "digital handover sign-off and trip completion notification"
  },
  "digital lock installation specific detailing": {
    "hi": "डिजिटल लॉक इंस्टॉलेशन विस्तृत कार्य",
    "gu": "ડિજિટલ લોક ઇન્સ્ટોલેશન વિગતવાર સેવા"
  },
  "digital proof of collection and timestamped handover receipt": {
    "hi": "digital proof of collection and timestamped handover receipt",
    "gu": "digital proof of collection and timestamped handover receipt"
  },
  "direct transit between specified origin and destination addresses": {
    "hi": "direct transit between specified origin and destination addresses",
    "gu": "direct transit between specified origin and destination addresses"
  },
  "direct transit from grocery store to customer residential doorstep": {
    "hi": "direct transit from grocery store to customer residential doorstep",
    "gu": "direct transit from grocery store to customer residential doorstep"
  },
  "direct transit from sender to recipient address": {
    "hi": "direct transit from sender to recipient address",
    "gu": "direct transit from sender to recipient address"
  },
  "disease mechanisms": {
    "hi": "disease mechanisms",
    "gu": "disease mechanisms"
  },
  "dishwashing specific detailing": {
    "hi": "बर्तन धोना विस्तृत कार्य",
    "gu": "વાસણ ધોવા વિગતવાર સેવા"
  },
  "disinfectant application": {
    "hi": "disinfectant लगाना",
    "gu": "disinfectant લગાવવું"
  },
  "disinfection": {
    "hi": "कीटाणुशोधन",
    "gu": "જંતુમુક્ત કરવું"
  },
  "display color accuracy check": {
    "hi": "display color accuracy जांच",
    "gu": "display color accuracy તપાસ"
  },
  "display testing": {
    "hi": "display testing",
    "gu": "display testing"
  },
  "dj specific detailing": {
    "hi": "dj विशेष विस्तृत कार्य",
    "gu": "dj વિશેષ વિગતવાર કાર્ય"
  },
  "dns configuration": {
    "hi": "डीएनएस कॉन्फ़िगरेशन",
    "gu": "ડીએનએસ રૂપરેખાંકન"
  },
  "document compliance review": {
    "hi": "document compliance पुनरीक्षण",
    "gu": "document compliance પુનરાવર્તન"
  },
  "document organization": {
    "hi": "document organization",
    "gu": "document organization"
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
    "hi": "doorstep pickup and verified delivery handover",
    "gu": "doorstep pickup and verified delivery handover"
  },
  "doorstep pickup of pre packed prepaid grocery bags from supermarkets or stores": {
    "hi": "doorstep pickup of pre-packed, prepaid grocery bags from supermarkets or stores",
    "gu": "doorstep pickup of pre-packed, prepaid grocery bags from supermarkets or stores"
  },
  "doorstep pickup of pre-packed, prepaid grocery bags from supermarkets or stores": {
    "hi": "doorstep pickup of pre-packed, prepaid grocery bags from supermarkets or stores",
    "gu": "doorstep pickup of pre-packed, prepaid grocery bags from supermarkets or stores"
  },
  "doorstep two wheeler high pressure foam wash": {
    "hi": "doorstep two-wheeler high-pressure foam धुलाई",
    "gu": "doorstep two-wheeler high-pressure foam ધોવું"
  },
  "doorstep two-wheeler high-pressure foam wash": {
    "hi": "doorstep two-wheeler high-pressure foam धुलाई",
    "gu": "doorstep two-wheeler high-pressure foam ધોવું"
  },
  "doubt clearing": {
    "hi": "संदेह समाधान",
    "gu": "શંકા નિવારણ"
  },
  "doubt clearing sessions": {
    "hi": "doubt clearing sessions",
    "gu": "doubt clearing sessions"
  },
  "doubt solving": {
    "hi": "संदेह निवारण",
    "gu": "શંકા નિવારણ"
  },
  "drain cleaning": {
    "hi": "नाली व ड्रेन सफाई",
    "gu": "ડ્રેનેજ પાઇપ સફાઈ"
  },
  "drain unblocking": {
    "hi": "नाली व ड्रेन अनब्लॉक करना",
    "gu": "ડ્રેનેજ સાફ કરવું"
  },
  "draping": {
    "hi": "draping",
    "gu": "draping"
  },
  "drill hole marking": {
    "hi": "ड्रिल छेद अंकन",
    "gu": "ડ્રિલિંગ માર્કિંગ"
  },
  "drill marking": {
    "hi": "drill अंकन",
    "gu": "drill માર્કિંગ"
  },
  "drilling and wall mounting": {
    "hi": "ड्रिलिंग व दीवार पर माउंटिंग",
    "gu": "ડ્રિલિંગ અને દિવાલ પર ફિટિંગ"
  },
  "driver update verification": {
    "hi": "driver update सत्यापन",
    "gu": "driver update ચકાસણી"
  },
  "drop off at authorized dealership or customer specified repair garage": {
    "hi": "drop-off at authorized dealership or customer-specified मरम्मत garage",
    "gu": "drop-off at authorized dealership or customer-specified રિપેરિંગ garage"
  },
  "drop-off at authorized dealership or customer-specified repair garage": {
    "hi": "drop-off at authorized dealership or customer-specified मरम्मत garage",
    "gu": "drop-off at authorized dealership or customer-specified રિપેરિંગ garage"
  },
  "drum notation reading": {
    "hi": "drum notation reading",
    "gu": "drum notation reading"
  },
  "dry cutting refinement": {
    "hi": "ड्राई कटिंग refinement",
    "gu": "ડ્રાય કટિંગ refinement"
  },
  "dry dusting": {
    "hi": "ड्राई dusting",
    "gu": "ડ્રાય dusting"
  },
  "dry dusting of ceiling": {
    "hi": "छत की डस्टिंग",
    "gu": "છતની ડસ્ટિંગ"
  },
  "dry skin buffing": {
    "hi": "ड्राई skin buffing",
    "gu": "ડ્રાય skin buffing"
  },
  "dry vacuuming": {
    "hi": "ड्राई वैक्यूमिंग",
    "gu": "ડ્રાય વેક્યૂમિંગ"
  },
  "drying time monitoring": {
    "hi": "drying time monitoring",
    "gu": "drying time monitoring"
  },
  "dust clearance from fan": {
    "hi": "धूल clearance from पंखा",
    "gu": "ધૂળ clearance from પંખો"
  },
  "dust removal": {
    "hi": "धूल साफ करना",
    "gu": "ધૂળ સાફ કરવી"
  },
  "dusting and wiping": {
    "hi": "झाड़ना व पोंछना",
    "gu": "ધૂળ ખંખેરવી અને લૂછવું"
  },
  "dusting and wiping of all surfaces shelves and fixtures": {
    "hi": "dusting and पोंछना of all surfaces, shelves, and fixtures",
    "gu": "dusting and લૂછવું of all surfaces, shelves, and fixtures"
  },
  "dusting and wiping of all surfaces, shelves, and fixtures": {
    "hi": "dusting and पोंछना of all surfaces, shelves, and fixtures",
    "gu": "dusting and લૂછવું of all surfaces, shelves, and fixtures"
  },
  "dynamic control": {
    "hi": "dynamic नियंत्रण (कंट्रोल)",
    "gu": "dynamic નિયંત્રણ"
  },
  "dynamic expression": {
    "hi": "dynamic expression",
    "gu": "dynamic expression"
  },
  "ear cleaning": {
    "hi": "कान की सफाई",
    "gu": "કાનની સફાઈ"
  },
  "ear cleaning specific detailing": {
    "hi": "ear सफाई विशेष विस्तृत कार्य",
    "gu": "ear સફાઈ વિશેષ વિગતવાર કાર્ય"
  },
  "ear contouring": {
    "hi": "ear कंटूरिंग",
    "gu": "ear કોન્ટૂરિંગ"
  },
  "ear training": {
    "hi": "ear training",
    "gu": "ear training"
  },
  "earth science topics": {
    "hi": "earth science topics",
    "gu": "earth science topics"
  },
  "ecological concepts": {
    "hi": "ecological concepts",
    "gu": "ecological concepts"
  },
  "economic principles": {
    "hi": "economic principles",
    "gu": "economic principles"
  },
  "economic survey highlights": {
    "hi": "economic survey highlights",
    "gu": "economic survey highlights"
  },
  "edge detailing": {
    "hi": "किनारों की फिनिशिंग",
    "gu": "કિનારીઓની ફિનિશિંગ"
  },
  "edge refinement": {
    "hi": "किनारों की फिनिशिंग",
    "gu": "કિનારી ફિનિશિંગ"
  },
  "elasticity check": {
    "hi": "elasticity जांच",
    "gu": "elasticity તપાસ"
  },
  "elderly vital checks": {
    "hi": "बुजुर्गों के वाइटल्स जांच",
    "gu": "વૃદ્ધોના આરોગ્ય સંકેતો તપાસ"
  },
  "electromagnetism concepts": {
    "hi": "electromagnetism concepts",
    "gu": "electromagnetism concepts"
  },
  "email coordination": {
    "hi": "email coordination",
    "gu": "email coordination"
  },
  "email management": {
    "hi": "email प्रबंधन",
    "gu": "email વ્યવસ્થાપન"
  },
  "emotional support": {
    "hi": "भावनात्मक संबल व परामर्श",
    "gu": "ભાવનાત્મક ટેકો અને પરામર્શ"
  },
  "energy concepts": {
    "hi": "energy concepts",
    "gu": "energy concepts"
  },
  "engine oil check": {
    "hi": "इंजन ऑयल स्तर जांच",
    "gu": "એન્જિન ઓઇલ લેવલ તપાસ"
  },
  "engineering mathematics": {
    "hi": "engineering mathematics",
    "gu": "engineering mathematics"
  },
  "english comprehension": {
    "hi": "english comprehension",
    "gu": "english comprehension"
  },
  "english language basics": {
    "hi": "english language basics",
    "gu": "english language basics"
  },
  "environmental concepts": {
    "hi": "environmental concepts",
    "gu": "environmental concepts"
  },
  "epsom salt mixing": {
    "hi": "एप्सम सॉल्ट मिश्रण",
    "gu": "એપ્સમ સોલ્ટ મિશ્રણ"
  },
  "equation balancing": {
    "hi": "समीकरण संतुलन",
    "gu": "સમીકરણ સંતુલન"
  },
  "equipment skin assessment": {
    "hi": "equipment skin आकलन",
    "gu": "equipment skin મૂલ્યાંકન"
  },
  "equipment stain assessment": {
    "hi": "उपकरण दाग जांच",
    "gu": "સાધન ડાઘ તપાસ"
  },
  "error handling": {
    "hi": "error handling",
    "gu": "error handling"
  },
  "error log analysis": {
    "hi": "एरर लॉग विश्लेषण",
    "gu": "ખામી લોગ વિશ્લેષણ"
  },
  "essay structuring": {
    "hi": "essay structuring",
    "gu": "essay structuring"
  },
  "ethics and integrity case studies": {
    "hi": "ethics and integrity case studies",
    "gu": "ethics and integrity case studies"
  },
  "even application": {
    "hi": "even लगाना",
    "gu": "even લગાવવું"
  },
  "even brushing": {
    "hi": "even ब्रशिंग",
    "gu": "even બ્રશિંગ"
  },
  "event coordination": {
    "hi": "event coordination",
    "gu": "event coordination"
  },
  "event photography specific detailing": {
    "hi": "इवेंट फोटोग्राफी विस्तृत कार्य",
    "gu": "ઇવેન્ટ ફોટોગ્રાફી વિગતવાર સેવા"
  },
  "event planning specific detailing": {
    "hi": "event planning विशेष विस्तृत कार्य",
    "gu": "event planning વિશેષ વિગતવાર કાર્ય"
  },
  "event staff specific detailing": {
    "hi": "event staff विशेष विस्तृत कार्य",
    "gu": "event staff વિશેષ વિગતવાર કાર્ય"
  },
  "event videography specific detailing": {
    "hi": "इवेंट वीडियोग्राफी विस्तृत कार्य",
    "gu": "ઇવેન્ટ વિડિયોગ્રાફી વિગતવાર સેવા"
  },
  "exam pattern familiarization": {
    "hi": "exam pattern familiarization",
    "gu": "exam pattern familiarization"
  },
  "exam strategy": {
    "hi": "परीक्षा रणनीति",
    "gu": "પરીક્ષા વ્યૂહરચના"
  },
  "exfoliating scrub application": {
    "hi": "एक्सफोलिएटिंग स्क्रब लगाना",
    "gu": "એક્સફોલિએટિંગ સ્ક્રબ લગાવવું"
  },
  "exfoliation": {
    "hi": "एक्सफोलिएशन (स्क्रब)",
    "gu": "એક્સફોલિએશન (સ્ક્રબ)"
  },
  "exhaust fan cleaning": {
    "hi": "एग्जॉस्ट फैन की सफाई",
    "gu": "એક્ઝોસ્ટ ફેન સફાઈ"
  },
  "exhaust fan degreasing": {
    "hi": "एग्जॉस्ट फैन की चिकनाई हटाना",
    "gu": "એક્ઝોસ્ટ ફેનની સફાઈ"
  },
  "existing wiring safety assessment": {
    "hi": "वायरिंग सुरक्षा मूल्यांकन",
    "gu": "વાયરિંગ સુરક્ષા તપાસ"
  },
  "expense tracking": {
    "hi": "expense tracking",
    "gu": "expense tracking"
  },
  "experiment discussion": {
    "hi": "experiment discussion",
    "gu": "experiment discussion"
  },
  "expert consultation and advice": {
    "hi": "विशेषज्ञ परामर्श व देखभाल सलाह",
    "gu": "નિષ્ણાત સલાહ અને માર્ગદર્શન"
  },
  "expression (abhinaya/facial)": {
    "hi": "expression (abhinaya / फेशियल)",
    "gu": "expression (abhinaya / ફેશિયલ)"
  },
  "expression abhinaya facial": {
    "hi": "expression (abhinaya / फेशियल)",
    "gu": "expression (abhinaya / ફેશિયલ)"
  },
  "extensive cuticle softening": {
    "hi": "extensive क्यूटिकल softening",
    "gu": "extensive ક્યુટિકલ softening"
  },
  "extensive dead skin removal": {
    "hi": "extensive dead skin हटाना",
    "gu": "extensive dead skin દૂર કરવું"
  },
  "extensive dust removal": {
    "hi": "extensive धूल हटाना",
    "gu": "extensive ધૂળ દૂર કરવું"
  },
  "extensive kitchen counter degreasing": {
    "hi": "extensive किचन counter degreasing",
    "gu": "extensive રસોડું counter degreasing"
  },
  "extensive material preparation": {
    "hi": "extensive material preparation",
    "gu": "extensive material preparation"
  },
  "extensive nail polish removal": {
    "hi": "extensive नाखून (नेल) पॉलिश हटाना",
    "gu": "extensive નખ પોલિશ દૂર કરવું"
  },
  "extensive toilet bowl scaling": {
    "hi": "extensive toilet bowl scaling",
    "gu": "extensive toilet bowl scaling"
  },
  "exterior high pressure snow foam wash and rinse": {
    "hi": "बाहरी भाग high-pressure snow foam धुलाई and धुलाई",
    "gu": "બહારનો ભાગ high-pressure snow foam ધોવું and ધોવું"
  },
  "exterior high-pressure snow foam wash and rinse": {
    "hi": "बाहरी भाग high-pressure snow foam धुलाई and धुलाई",
    "gu": "બહારનો ભાગ high-pressure snow foam ધોવું and ધોવું"
  },
  "eye artistry": {
    "hi": "eye artistry",
    "gu": "eye artistry"
  },
  "eye contact training": {
    "hi": "eye contact training",
    "gu": "eye contact training"
  },
  "eye makeup": {
    "hi": "आंखों का मेकअप",
    "gu": "આંખોનો મેકઅપ"
  },
  "eye makeup (eyeshadow, eyeliner, and mascara)": {
    "hi": "eye makeup (eyeshadow, eyeliner, and mascara)",
    "gu": "eye makeup (eyeshadow, eyeliner, and mascara)"
  },
  "eye makeup eyeshadow eyeliner and mascara": {
    "hi": "eye makeup (eyeshadow, eyeliner, and mascara)",
    "gu": "eye makeup (eyeshadow, eyeliner, and mascara)"
  },
  "eye pad placement": {
    "hi": "कूलिंग आई पैड लगाना",
    "gu": "કૂલિંગ આઇ પેડ લગાવવા"
  },
  "eye shadow eyeliner and mascara styling": {
    "hi": "eye shadow, eyeliner, and mascara स्टाइलिंग",
    "gu": "eye shadow, eyeliner, and mascara સ્ટાઇલિંગ"
  },
  "eye shadow, eyeliner, and mascara styling": {
    "hi": "eye shadow, eyeliner, and mascara स्टाइलिंग",
    "gu": "eye shadow, eyeliner, and mascara સ્ટાઇલિંગ"
  },
  "eyebrow defining and grooming": {
    "hi": "eyebrow defining and grooming",
    "gu": "eyebrow defining and grooming"
  },
  "eyebrow shaping": {
    "hi": "आइब्रो शेपिंग",
    "gu": "આઇબ્રો શેપિંગ"
  },
  "eyebrow shaping and filling": {
    "hi": "eyebrow shaping and filling",
    "gu": "eyebrow shaping and filling"
  },
  "eyebrow shaping assessment": {
    "hi": "आइब्रो शेपिंग जांच",
    "gu": "આઇબ્રો શેપિંગ તપાસ"
  },
  "fabric protection": {
    "hi": "फैब्रिक सुरक्षा स्प्रे",
    "gu": "કાપડ રક્ષણ સ્પ્રે"
  },
  "face coverage": {
    "hi": "फेस coverage",
    "gu": "ફેસ coverage"
  },
  "face framing": {
    "hi": "फेस framing",
    "gu": "ફેસ framing"
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
    "hi": "फेशियल expressions",
    "gu": "ફેશિયલ expressions"
  },
  "facial massage": {
    "hi": "चेहरे की मालिश",
    "gu": "ચહેરાની માલિશ"
  },
  "facial massage with cream": {
    "hi": "क्रीम से चेहरे की मालिश",
    "gu": "ક્રીમ વડે ચહેરાની માલિશ"
  },
  "facial steam": {
    "hi": "चेहरे की भाप (स्टीम)",
    "gu": "ચહેરાની સ્ટીમ"
  },
  "figure of speech identification": {
    "hi": "figure of speech identification",
    "gu": "figure of speech identification"
  },
  "file sorting": {
    "hi": "फाइल sorting",
    "gu": "ફાઇલ sorting"
  },
  "file sorting and filing": {
    "hi": "फाइल sorting and filing",
    "gu": "ફાઇલ sorting and filing"
  },
  "filter cleaning": {
    "hi": "फिल्टर की सफाई",
    "gu": "ફિલ્ટર સફાઈ"
  },
  "filter mesh wash": {
    "hi": "फिल्टर जाली धुलाई",
    "gu": "ફિલ્ટર જાળી સફાઈ"
  },
  "final comfort walking and mobility check": {
    "hi": "final comfort, walking, and mobility जांच",
    "gu": "final comfort, walking, and mobility તપાસ"
  },
  "final comfort, walking, and mobility check": {
    "hi": "final comfort, walking, and mobility जांच",
    "gu": "final comfort, walking, and mobility તપાસ"
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
    "hi": "final security सत्यापन",
    "gu": "final security ચકાસણી"
  },
  "final service assessment": {
    "hi": "अंतिम सेवा मूल्यांकन",
    "gu": "અંતિમ સેવા મૂલ્યાંકન"
  },
  "final service evaluation": {
    "hi": "अंतिम सेवा मूल्यांकन",
    "gu": "અંતિમ સેવા મૂલ્યાંકન"
  },
  "final shape check": {
    "hi": "final shape जांच",
    "gu": "final shape તપાસ"
  },
  "final touch up": {
    "hi": "final टचअप",
    "gu": "final ટચઅપ"
  },
  "final touch-up": {
    "hi": "final टचअप",
    "gu": "final ટચઅપ"
  },
  "final walkthrough": {
    "hi": "अंतिम कार्य समीक्षा (वॉकथ्रू)",
    "gu": "આખરી કાર્ય નિરીક્ષણ"
  },
  "financial awareness": {
    "hi": "financial awareness",
    "gu": "financial awareness"
  },
  "finger joint massage": {
    "hi": "finger joint मालिश",
    "gu": "finger joint માલિશ"
  },
  "finger placement": {
    "hi": "finger placement",
    "gu": "finger placement"
  },
  "finger striking techniques": {
    "hi": "finger striking तकनीक",
    "gu": "finger striking તકનીકો"
  },
  "fingerboard navigation": {
    "hi": "फिंगरबोर्ड नेविगेशन",
    "gu": "ફિંગરબોર્ડ નેવિગેશન"
  },
  "fingering exercises": {
    "hi": "fingering अभ्यास",
    "gu": "fingering કસરતો"
  },
  "fingerpicking styles": {
    "hi": "fingerpicking styles",
    "gu": "fingerpicking styles"
  },
  "firewall setup": {
    "hi": "फ़ायरवॉल सुरक्षा सेटअप",
    "gu": "ફાયરવોલ સુરક્ષા સેટઅપ"
  },
  "firm pressure": {
    "hi": "दृढ़ दबाव मालिश",
    "gu": "મક્કમ દબાણ માલિશ"
  },
  "firm rubbing": {
    "hi": "firm rubbing",
    "gu": "firm rubbing"
  },
  "firmware update": {
    "hi": "फर्मवेयर अपडेट",
    "gu": "ફર્મવેર અપડેટ"
  },
  "first aid assistance": {
    "hi": "प्राथमिक उपचार सहायता",
    "gu": "પ્રાથમિક સારવાર સહાય"
  },
  "fitness assessment": {
    "hi": "फिटनेस स्तर मूल्यांकन",
    "gu": "ફિટનેસ સ્તર મૂલ્યાંકન"
  },
  "fitness coaching specific detailing": {
    "hi": "fitness coaching विशेष विस्तृत कार्य",
    "gu": "fitness coaching વિશેષ વિગતવાર કાર્ય"
  },
  "flexibility training": {
    "hi": "flexibility training",
    "gu": "flexibility training"
  },
  "flexible hold hairspray and shine serum finish": {
    "hi": "flexible hold hairspray and shine सीरम फिनिश",
    "gu": "flexible hold hairspray and shine સીરમ ફિનિશ"
  },
  "floor deep mopping": {
    "hi": "फर्श डीप मोपिंग",
    "gu": "ફ્લોર ડીપ મોપિંગ"
  },
  "floor dry sweeping": {
    "hi": "फर्श ड्राई sweeping",
    "gu": "ફ્લોર ડ્રાય sweeping"
  },
  "floor level threshold protection during entry and exit": {
    "hi": "floor-level threshold सुरक्षा during entry and exit",
    "gu": "floor-level threshold રક્ષણ during entry and exit"
  },
  "floor runners and threshold guards to protect entryway tiles": {
    "hi": "फर्श runners and threshold guards to protect entryway tiles",
    "gu": "ફ્લોર runners and threshold guards to protect entryway tiles"
  },
  "floor scrubbing": {
    "hi": "फर्श की गहरी घिसाई",
    "gu": "ફ્લોર ડીપ સ્ક્રબિંગ"
  },
  "floor scrubbing and polishing (hardwood, tile, laminate)": {
    "hi": "फर्श स्क्रबिंग and पॉलिशिंग (hardwood, टाइल, laminate)",
    "gu": "ફ્લોર સ્ક્રબિંગ and પોલિશિંગ (hardwood, ટાઇલ્સ, laminate)"
  },
  "floor scrubbing and polishing hardwood tile laminate": {
    "hi": "फर्श स्क्रबिंग and पॉलिशिंग (hardwood, टाइल, laminate)",
    "gu": "ફ્લોર સ્ક્રબિંગ and પોલિશિંગ (hardwood, ટાઇલ્સ, laminate)"
  },
  "floor vacuuming": {
    "hi": "फर्श vacuuming",
    "gu": "ફ્લોર vacuuming"
  },
  "floor vacuuming and mopping": {
    "hi": "फर्श वैक्यूमिंग व पोछा",
    "gu": "ફ્લોર વેક્યૂમિંગ અને પોતું"
  },
  "floor wet mopping": {
    "hi": "फर्श wet mopping",
    "gu": "ફ્લોર wet mopping"
  },
  "floor-level threshold protection during entry and exit": {
    "hi": "floor-level threshold सुरक्षा during entry and exit",
    "gu": "floor-level threshold રક્ષણ during entry and exit"
  },
  "floral arrangement": {
    "hi": "पुष्प सज्जा (फ्लोरल डेकोर)",
    "gu": "ફૂલોની સજાવટ"
  },
  "flowchart creation": {
    "hi": "flowchart creation",
    "gu": "flowchart creation"
  },
  "fluid mechanics analysis": {
    "hi": "fluid यांत्रिकी analysis",
    "gu": "fluid યાંત્રિકી analysis"
  },
  "foam wash": {
    "hi": "फोम वॉश धुलाई",
    "gu": "ફોમ વોશ ધોવું"
  },
  "foil placement": {
    "hi": "foil placement",
    "gu": "foil placement"
  },
  "foot exfoliation": {
    "hi": "पैर का एक्सफोलिएशन (स्क्रब)",
    "gu": "પગનું એક્સફોલિએશન"
  },
  "foot hydration sealing": {
    "hi": "फुट hydration sealing",
    "gu": "ફૂટ hydration sealing"
  },
  "foot inspection": {
    "hi": "पैर की जांच",
    "gu": "પગની તપાસ"
  },
  "foot massage": {
    "hi": "पैर की मालिश (फुट मसाज)",
    "gu": "પગની માલિશ"
  },
  "foot reflexology": {
    "hi": "पैर रिफ्लेक्सोलॉजी मालिश",
    "gu": "પગ રિફ્લેક્સોલોજી માલિશ"
  },
  "foot scrub application": {
    "hi": "फुट स्क्रब लगाना",
    "gu": "ફૂટ સ્ક્રબ લગાવવું"
  },
  "foot soaking in warm solution": {
    "hi": "गुनगुने पानी में पैर की सिकाई",
    "gu": "હૂંફાળા પાણીમાં પગ પલાળવા"
  },
  "footwork drills": {
    "hi": "footwork drills",
    "gu": "footwork drills"
  },
  "footwork speed": {
    "hi": "footwork speed",
    "gu": "footwork speed"
  },
  "force analysis": {
    "hi": "force analysis",
    "gu": "force analysis"
  },
  "forehead tension release": {
    "hi": "forehead tension release",
    "gu": "forehead tension release"
  },
  "form and stamina assessment": {
    "hi": "form and stamina आकलन",
    "gu": "form and stamina મૂલ્યાંકન"
  },
  "form correction": {
    "hi": "form correction",
    "gu": "form correction"
  },
  "formula application": {
    "hi": "formula लगाना",
    "gu": "formula લગાવવું"
  },
  "formula cheat sheets": {
    "hi": "formula cheat sheets",
    "gu": "formula cheat sheets"
  },
  "formula derivations": {
    "hi": "सूत्र व्युत्पत्ति",
    "gu": "સૂત્ર તારવણી"
  },
  "formula revision": {
    "hi": "सूत्र पुनरीक्षण",
    "gu": "સૂત્ર પુનરાવર્તન"
  },
  "foundation and concealer base application": {
    "hi": "फाउंडेशन व कंसीलर बेस लगाना",
    "gu": "ફાઉન્ડેશન અને કન્સીલર બેઝ લગાવવું"
  },
  "foundation blending": {
    "hi": "फाउंडेशन ब्लेंडिंग",
    "gu": "ફાઉન્ડેશન બ્લેન્ડિંગ"
  },
  "fresh polish application": {
    "hi": "fresh पॉलिश लगाना",
    "gu": "fresh પોલિશ લગાવવું"
  },
  "fretboard memorization": {
    "hi": "fretboard memorization",
    "gu": "fretboard memorization"
  },
  "fretboard navigation": {
    "hi": "फ्रेटबोर्ड नेविगेशन",
    "gu": "ફ્રેટબોર્ડ નેવિગેશન"
  },
  "fringe trimming": {
    "hi": "fringe trimming",
    "gu": "fringe trimming"
  },
  "frizz control check": {
    "hi": "फ्रिज कंट्रोल जांच",
    "gu": "ફ્રિઝ કંટ્રોલ તપાસ"
  },
  "full body massage specific detailing": {
    "hi": "फुल बॉडी मालिश विशेष विस्तृत कार्य",
    "gu": "સંપૂર્ણ બોડી માલિશ વિશેષ વિગતવાર કાર્ય"
  },
  "full body movement": {
    "hi": "फुल बॉडी movement",
    "gu": "સંપૂર્ણ બોડી movement"
  },
  "full body stretch": {
    "hi": "पूरे शरीर की स्ट्रेचिंग",
    "gu": "આખા શરીરનું સ્ટ્રેચિંગ"
  },
  "full grooming specific detailing": {
    "hi": "फुल grooming विशेष विस्तृत कार्य",
    "gu": "સંપૂર્ણ grooming વિશેષ વિગતવાર કાર્ય"
  },
  "full hair and makeup care": {
    "hi": "संपूर्ण हेयर व मेकअप देखभाल",
    "gu": "સંપૂર્ણ હેર અને મેકઅપ સંભાળ"
  },
  "full hair and makeup consultation": {
    "hi": "फुल बाल and makeup consultation",
    "gu": "સંપૂર્ણ વાળ and makeup consultation"
  },
  "full time cook specific detailing": {
    "hi": "full-time cook विशेष विस्तृत कार्य",
    "gu": "full-time cook વિશેષ વિગતવાર કાર્ય"
  },
  "full-time cook specific detailing": {
    "hi": "full-time cook विशेष विस्तृत कार्य",
    "gu": "full-time cook વિશેષ વિગતવાર કાર્ય"
  },
  "furniture alignment": {
    "hi": "फर्नीचर पुनर्व्यवस्था",
    "gu": "ફર્નિચર ગોઠવણી"
  },
  "furniture exterior wiping": {
    "hi": "फर्नीचर बाहरी सफाई",
    "gu": "ફર્નિચર સફાઈ"
  },
  "garbage disposal": {
    "hi": "कचरा निस्तारण",
    "gu": "કચરાનો નિકાલ"
  },
  "gas leakage test": {
    "hi": "गैस रिसाव परीक्षण",
    "gu": "ગેસ લિકેજ ટેસ્ટ"
  },
  "gas pressure check": {
    "hi": "गैस प्रेशर जांच",
    "gu": "ગેસ પ્રેશર તપાસ"
  },
  "gasket replacement": {
    "hi": "वॉशर / गैस्केट बदलना",
    "gu": "વોશર / ગાસ્કેટ બદલવું"
  },
  "gate specific mock tests": {
    "hi": "gate विशेष mock tests",
    "gu": "gate વિશેષ mock tests"
  },
  "gear shifting check": {
    "hi": "गियर शिफ्टिंग जांच",
    "gu": "ગિયર શિફ્ટિંગ તપાસ"
  },
  "gel polish compatibility": {
    "hi": "जेल पॉलिश compatibility",
    "gu": "જેલ પોલિશ compatibility"
  },
  "general aptitude": {
    "hi": "general योग्यता",
    "gu": "general યોગ્યતા"
  },
  "general awareness": {
    "hi": "general awareness",
    "gu": "general awareness"
  },
  "general knowledge quizzes": {
    "hi": "general knowledge quizzes",
    "gu": "general knowledge quizzes"
  },
  "genetics and inheritance": {
    "hi": "genetics and inheritance",
    "gu": "genetics and inheritance"
  },
  "gentle hand scrubbing of engine exterior and mudguards": {
    "hi": "gentle हाथ स्क्रबिंग of engine बाहरी भाग and mudguards",
    "gu": "gentle હાથ સ્ક્રબિંગ of engine બહારનો ભાગ and mudguards"
  },
  "gentle head massage": {
    "hi": "हल्की सिर की मालिश",
    "gu": "હળવી માથાની માલિશ"
  },
  "gentle scalp massage": {
    "hi": "हल्की स्कैल्प मालिश",
    "gu": "હળવી સ્કેલ્પ માલિશ"
  },
  "geography and environment": {
    "hi": "geography and environment",
    "gu": "geography and environment"
  },
  "geography concepts": {
    "hi": "geography concepts",
    "gu": "geography concepts"
  },
  "geometry proofs": {
    "hi": "ज्यामितीय उपपत्तियां",
    "gu": "ભૂમિતિ સાબિતીઓ"
  },
  "glass cleaning": {
    "hi": "कांच की सफाई",
    "gu": "કાચની સફાઈ"
  },
  "glow enhancement": {
    "hi": "ग्लो enhancement",
    "gu": "ગ્લો enhancement"
  },
  "glucometer reading": {
    "hi": "ब्लड शुगर स्तर जांच",
    "gu": "બ્લડ શુગર લેવલ તપાસ"
  },
  "goal setting": {
    "hi": "लक्ष्य निर्धारण",
    "gu": "ધ્યેય નિર્ધારણ"
  },
  "governance structures": {
    "hi": "governance structures",
    "gu": "governance structures"
  },
  "grammar improvement": {
    "hi": "grammar improvement",
    "gu": "grammar improvement"
  },
  "grammar rules": {
    "hi": "व्याकरण नियम अभ्यास",
    "gu": "વ્યાકરણ નિયમો"
  },
  "graph interpretation": {
    "hi": "graph interpretation",
    "gu": "graph interpretation"
  },
  "graph plotting": {
    "hi": "ग्राफ आलेखन",
    "gu": "ગ્રાફ આલેખન"
  },
  "grease removal": {
    "hi": "ग्रीस व मैल हटाना",
    "gu": "ગ્રીસ અને મેલ દૂર કરવો"
  },
  "grocery pickup specific detailing": {
    "hi": "grocery pickup विशेष विस्तृत कार्य",
    "gu": "grocery pickup વિશેષ વિગતવાર કાર્ય"
  },
  "groove creation": {
    "hi": "groove creation",
    "gu": "groove creation"
  },
  "group coordination": {
    "hi": "group coordination",
    "gu": "group coordination"
  },
  "group discussion prep": {
    "hi": "group discussion तैयारी (प्रेप)",
    "gu": "group discussion તૈયારી (પ્રેપ)"
  },
  "group yoga specific detailing": {
    "hi": "group yoga विशेष विस्तृत कार्य",
    "gu": "group yoga વિશેષ વિગતવાર કાર્ય"
  },
  "grout brushing": {
    "hi": "ग्राउट जोड़ों की ब्रशिंग",
    "gu": "ગ્રાઉટ સાંધાની બ્રશિંગ"
  },
  "grout cleaning": {
    "hi": "ग्राउट जोड़ों की सफाई",
    "gu": "ગ્રાઉટ સાંધાની સફાઈ"
  },
  "grout line scrubbing": {
    "hi": "ग्राउट line स्क्रबिंग",
    "gu": "ગ્રાઉટ line સ્ક્રબિંગ"
  },
  "gua sha massage": {
    "hi": "गुआ शा मसाज",
    "gu": "ગુઆ શા મસાજ"
  },
  "gujarati food specific detailing": {
    "hi": "gujarati food विशेष विस्तृत कार्य",
    "gu": "gujarati food વિશેષ વિગતવાર કાર્ય"
  },
  "hair consultation": {
    "hi": "हेयर परामर्श",
    "gu": "હેર સલાહ"
  },
  "hair consultation and style planning": {
    "hi": "बाल consultation and style planning",
    "gu": "વાળ consultation and style planning"
  },
  "hair consultation style assessment": {
    "hi": "हेयर स्टाइल मूल्यांकन",
    "gu": "હેર સ્ટાઇલ મૂલ્યાંકન"
  },
  "hair disposal": {
    "hi": "बाल disposal",
    "gu": "વાળ disposal"
  },
  "hair length assessment": {
    "hi": "बाल लंबाई आकलन",
    "gu": "વાળ લંબાઈ મૂલ્યાંકન"
  },
  "hair mapping": {
    "hi": "हेयर मैपिंग",
    "gu": "હેર મેપિંગ"
  },
  "hair pins hairspray and makeup setting seal": {
    "hi": "बाल pins, hairspray, and makeup सेटिंग seal",
    "gu": "વાળ pins, hairspray, and makeup સેટિંગ seal"
  },
  "hair pins, hairspray, and makeup setting seal": {
    "hi": "बाल pins, hairspray, and makeup सेटिंग seal",
    "gu": "વાળ pins, hairspray, and makeup સેટિંગ seal"
  },
  "hair sectioning": {
    "hi": "बालों का सेक्शनिंग (विभाजन)",
    "gu": "વાળનું સેક્શનિંગ (વિભાગ)"
  },
  "hair straightening / smoothening specific detailing": {
    "hi": "बाल straightening / smoothening विशेष विस्तृत कार्य",
    "gu": "વાળ straightening / smoothening વિશેષ વિગતવાર કાર્ય"
  },
  "hair straightening smoothening specific detailing": {
    "hi": "बाल straightening / smoothening विशेष विस्तृत कार्य",
    "gu": "વાળ straightening / smoothening વિશેષ વિગતવાર કાર્ય"
  },
  "hair styling (curls, waves, straight, or half-updo)": {
    "hi": "हेयर स्टाइलिंग (कर्ल्स, वेव्स, स्ट्रेट)",
    "gu": "હેર સ્ટાઇલિંગ (કલ્સ, વેવ્સ, સ્ટ્રેટ)"
  },
  "hair styling curls waves straight or half updo": {
    "hi": "हेयर स्टाइलिंग (कर्ल्स, वेव्स, स्ट्रेट)",
    "gu": "હેર સ્ટાઇલિંગ (કલ્સ, વેવ્સ, સ્ટ્રેટ)"
  },
  "hair styling specific detailing": {
    "hi": "हेयर स्टाइलिंग विस्तृत कार्य",
    "gu": "હેર સ્ટાઇલિંગ વિગતવાર સેવા"
  },
  "hair texture check": {
    "hi": "बाल texture जांच",
    "gu": "વાળ texture તપાસ"
  },
  "hair texturizing": {
    "hi": "बाल texturizing",
    "gu": "વાળ texturizing"
  },
  "hair wash": {
    "hi": "बाल धोना (हेयर वॉश)",
    "gu": "વાળ ધોવા (હેર વોશ)"
  },
  "hair wipe down": {
    "hi": "बाल पोंछना down",
    "gu": "વાળ લૂછવું down"
  },
  "hairline cleanup": {
    "hi": "हेयरलाइन सफाई",
    "gu": "હેરલાઇન સફાઈ"
  },
  "hand exfoliation": {
    "hi": "हाथ एक्सफोलिएशन",
    "gu": "હાથ એક્સફોલિએશન"
  },
  "hand independence": {
    "hi": "हाथ independence",
    "gu": "હાથ independence"
  },
  "hand massage": {
    "hi": "हाथ की मालिश",
    "gu": "હાથની માલિશ"
  },
  "hand positioning": {
    "hi": "हाथ positioning",
    "gu": "હાથ positioning"
  },
  "hand scrub": {
    "hi": "हाथ स्क्रब",
    "gu": "હાથ સ્ક્રબ"
  },
  "hard drive sector scan": {
    "hi": "hard drive sector scan",
    "gu": "hard drive sector scan"
  },
  "hard water stain removal": {
    "hi": "खारे पानी के दाग हटाना",
    "gu": "ખારા પાણીના ડાઘ દૂર કરવા"
  },
  "hardware diagnostic": {
    "hi": "हार्डवेयर खराबी जांच",
    "gu": "હાર્ડવેર ડાયગ્નોસ્ટિક"
  },
  "hardware diagnostic verification": {
    "hi": "hardware diagnostic सत्यापन",
    "gu": "hardware diagnostic ચકાસણી"
  },
  "hardware verification": {
    "hi": "hardware सत्यापन",
    "gu": "hardware ચકાસણી"
  },
  "harmonium accompaniment": {
    "hi": "हारमोनियम संगत",
    "gu": "હાર્મોનિયમ સંગત"
  },
  "harmonization": {
    "hi": "harmonization",
    "gu": "harmonization"
  },
  "head massage": {
    "hi": "सिर की मालिश (हेड मसाज)",
    "gu": "માથાની માલિશ (હેડ મસાજ)"
  },
  "healthy diet food specific detailing": {
    "hi": "healthy / diet food विशेष विस्तृत कार्य",
    "gu": "healthy / diet food વિશેષ વિગતવાર કાર્ય"
  },
  "healthy/diet food specific detailing": {
    "hi": "healthy / diet food विशेष विस्तृत कार्य",
    "gu": "healthy / diet food વિશેષ વિગતવાર કાર્ય"
  },
  "heat dissipation check": {
    "hi": "heat dissipation जांच",
    "gu": "heat dissipation તપાસ"
  },
  "heat protection spray": {
    "hi": "हीट प्रोटेक्शन स्प्रे",
    "gu": "હીટ પ્રોટેક્શન સ્પ્રે"
  },
  "heavy duty transport in clean weather protected commercial trucks": {
    "hi": "हैवी-ड्यूटी transport in सफाई, weather-protected commercial trucks",
    "gu": "હેવી-ડ્યુટી transport in સફાઈ, weather-protected commercial trucks"
  },
  "heavy-duty transport in clean, weather-protected commercial trucks": {
    "hi": "हैवी-ड्यूटी transport in सफाई, weather-protected commercial trucks",
    "gu": "હેવી-ડ્યુટી transport in સફાઈ, weather-protected commercial trucks"
  },
  "heel smoothness": {
    "hi": "एड़ी की सूंवाळप जांच",
    "gu": "એડીની સુંવાળપ તપાસ"
  },
  "heel smoothness check": {
    "hi": "एड़ी की सूंवाळप जांच",
    "gu": "એડીની સુંવાળપ તપાસ"
  },
  "height alignment": {
    "hi": "height alignment",
    "gu": "height alignment"
  },
  "hi hat control": {
    "hi": "hi-hat नियंत्रण (कंट्रोल)",
    "gu": "hi-hat નિયંત્રણ"
  },
  "hi-hat control": {
    "hi": "hi-hat नियंत्रण (कंट्रोल)",
    "gu": "hi-hat નિયંત્રણ"
  },
  "high definition camera ready skin prep and priming": {
    "hi": "एचडी स्किन प्रेप व प्राइमर",
    "gu": "એચડી સ્કિન પ્રેપ અને પ્રાઇમર"
  },
  "high energy pacing": {
    "hi": "high-energy pacing",
    "gu": "high-energy pacing"
  },
  "high grade safety sanitized tools": {
    "hi": "उच्च-स्तरीय सुरक्षा व सैनिटाइज्ड उपकरण",
    "gu": "ઉચ્ચ-સ્તરીય સુરક્ષા અને સેનિટાઇઝ્ડ સાધનો"
  },
  "high performance makeup setting spray": {
    "hi": "high-performance makeup सेटिंग spray",
    "gu": "high-performance makeup સેટિંગ spray"
  },
  "high pressure wash": {
    "hi": "हाई-प्रेशर वाटर वॉश",
    "gu": "હાઇ-પ્રેશર વોટર વોશ"
  },
  "high weightage topic focus": {
    "hi": "high-weightage topic focus",
    "gu": "high-weightage topic focus"
  },
  "high yield topic revision": {
    "hi": "high-yield topic revision",
    "gu": "high-yield topic revision"
  },
  "high-definition camera-ready skin prep and priming": {
    "hi": "एचडी स्किन प्रेप व प्राइमर",
    "gu": "એચડી સ્કિન પ્રેપ અને પ્રાઇમર"
  },
  "high-energy pacing": {
    "hi": "high-energy pacing",
    "gu": "high-energy pacing"
  },
  "high-grade safety & sanitized tools": {
    "hi": "उच्च-स्तरीय सुरक्षा व सैनिटाइज्ड उपकरण",
    "gu": "ઉચ્ચ-સ્તરીય સુરક્ષા અને સેનિટાઇઝ્ડ સાધનો"
  },
  "high-performance makeup setting spray": {
    "hi": "high-performance makeup सेटिंग spray",
    "gu": "high-performance makeup સેટિંગ spray"
  },
  "high-pressure wash": {
    "hi": "हाई-प्रेशर वाटर वॉश",
    "gu": "હાઇ-પ્રેશર વોટર વોશ"
  },
  "high-weightage topic focus": {
    "hi": "high-weightage topic focus",
    "gu": "high-weightage topic focus"
  },
  "high-yield topic revision": {
    "hi": "high-yield topic revision",
    "gu": "high-yield topic revision"
  },
  "hindi grammar": {
    "hi": "hindi grammar",
    "gu": "hindi grammar"
  },
  "hinge lubrication": {
    "hi": "कब्जों में ऑयलिंग व ग्रीसिंग",
    "gu": "મિજાગરામાં ઓઇલિંગ"
  },
  "historical timeline memorization": {
    "hi": "historical timeline memorization",
    "gu": "historical timeline memorization"
  },
  "history and polity basics": {
    "hi": "history and polity basics",
    "gu": "history and polity basics"
  },
  "history timeline mapping": {
    "hi": "history timeline मैपिंग",
    "gu": "history timeline મેપિંગ"
  },
  "home automation setup specific detailing": {
    "hi": "होम automation सेटअप विशेष विस्तृत कार्य",
    "gu": "ઘર automation સેટઅપ વિશેષ વિગતવાર કાર્ય"
  },
  "home workout trainer specific detailing": {
    "hi": "होम workout trainer विशेष विस्तृत कार्य",
    "gu": "ઘર workout trainer વિશેષ વિગતવાર કાર્ય"
  },
  "hot towel steam": {
    "hi": "गर्म तौलिया भाप",
    "gu": "ગરમ ટુવાલ સ્ટીમ"
  },
  "hot towel wrap": {
    "hi": "hot towel रैप",
    "gu": "hot towel રેપ"
  },
  "household cleaning assistance specific detailing": {
    "hi": "household सफाई सहायता विशेष विस्तृत कार्य",
    "gu": "household સફાઈ સહાય વિશેષ વિગતવાર કાર્ય"
  },
  "human anatomy review": {
    "hi": "human शरीर रचना पुनरीक्षण",
    "gu": "human શરીર રચના પુનરાવર્તન"
  },
  "human physiology deep dive": {
    "hi": "human physiology गहन (डीप) dive",
    "gu": "human physiology ડીપ dive"
  },
  "hydration guidance": {
    "hi": "हाइड्रेशन मार्गदर्शन",
    "gu": "હાઇડ્રેશન માર્ગદર્શન"
  },
  "hydration sealing": {
    "hi": "हाइड्रेशन सील करना",
    "gu": "હાઇડ્રેશન જાળવી રાખવું"
  },
  "hygienic disposable tools": {
    "hi": "स्वच्छ डिस्पोजेबल उपकरण",
    "gu": "હાઈજેનિક ડિસ્પોઝેબલ સાધનો"
  },
  "hypothesis formation": {
    "hi": "hypothesis formation",
    "gu": "hypothesis formation"
  },
  "ice roller application": {
    "hi": "आइस रोलर थेरेपी",
    "gu": "આઇસ રોલર થેરાપી"
  },
  "idiom usage": {
    "hi": "idiom usage",
    "gu": "idiom usage"
  },
  "impedance matching": {
    "hi": "प्रतिबाधा मिलान (इम्पीडेंस)",
    "gu": "ઇમ્પિડન્સ મેચિંગ"
  },
  "impromptu speaking": {
    "hi": "impromptu speaking",
    "gu": "impromptu speaking"
  },
  "infant feeding assistance": {
    "hi": "शिशु आहार सहायता",
    "gu": "બાળક આહાર સહાય"
  },
  "information retrieval": {
    "hi": "information retrieval",
    "gu": "information retrieval"
  },
  "ingredient prep": {
    "hi": "सामग्री तैयारी",
    "gu": "સામગ્રી પૂર્વ તૈયારી"
  },
  "ingrown hair check": {
    "hi": "ingrown बाल जांच",
    "gu": "ingrown વાળ તપાસ"
  },
  "inhalation techniques": {
    "hi": "श्वास तकनीक",
    "gu": "શ્વાસ તકનીકો"
  },
  "initial area assessment": {
    "hi": "initial क्षेत्र आकलन",
    "gu": "initial વિસ્તાર મૂલ્યાંકન"
  },
  "injury prevention": {
    "hi": "चोट रोकथाम सलाह",
    "gu": "ઈજા નિવારણ સલાહ"
  },
  "injury prevention advice": {
    "hi": "चोट रोकथाम सलाह",
    "gu": "ઈજા નિવારણ સલાહ"
  },
  "input source check": {
    "hi": "input source जांच",
    "gu": "input source તપાસ"
  },
  "insole cleaning": {
    "hi": "इनसोल सफाई",
    "gu": "ઇન્સોલ સફાઈ"
  },
  "inspection": {
    "hi": "निरीक्षण व जांच",
    "gu": "તપાસ અને નિરીક્ષણ"
  },
  "instrument tuning": {
    "hi": "वाद्ययंत्र ट्यूनिंग",
    "gu": "વાદ્ય ટ્યુનિંગ"
  },
  "insulation check": {
    "hi": "इंसुलेशन जांच",
    "gu": "ઇન્સ્યુલેશન તપાસ"
  },
  "intensive scrub": {
    "hi": "गहरी घिसाई व सफाई",
    "gu": "ઊંડાણપૂર્વક સફાઈ"
  },
  "interactive learning": {
    "hi": "interactive learning",
    "gu": "interactive learning"
  },
  "international relations updates": {
    "hi": "international relations updates",
    "gu": "international relations updates"
  },
  "interval training flow": {
    "hi": "interval training flow",
    "gu": "interval training flow"
  },
  "intonation checking": {
    "hi": "intonation checking",
    "gu": "intonation checking"
  },
  "ip address configuration": {
    "hi": "आईपी एड्रेस कॉन्फ़िगरेशन",
    "gu": "આઇપી એડ્રેસ રૂપરેખાંકન"
  },
  "ironing": {
    "hi": "इस्त्री करना (प्रेस)",
    "gu": "ઇસ્ત્રી કરવી"
  },
  "ironing specific detailing": {
    "hi": "ironing विशेष विस्तृत कार्य",
    "gu": "ironing વિશેષ વિગતવાર કાર્ય"
  },
  "isolation techniques": {
    "hi": "isolation तकनीक",
    "gu": "isolation તકનીકો"
  },
  "itinerary creation": {
    "hi": "itinerary creation",
    "gu": "itinerary creation"
  },
  "jain food specific detailing": {
    "hi": "jain food विशेष विस्तृत कार्य",
    "gu": "jain food વિશેષ વિગતવાર કાર્ય"
  },
  "joint mobility": {
    "hi": "जोड़ों की गतिशीलता",
    "gu": "સાંધાઓની હલનચલન ક્ષમતા"
  },
  "key orientation": {
    "hi": "key orientation",
    "gu": "key orientation"
  },
  "keyboard chord practice": {
    "hi": "कीबोर्ड कॉर्ड्स अभ्यास",
    "gu": "કીબોર્ડ કોર્ડ્સ મહાવરો"
  },
  "keyboard continuity testing": {
    "hi": "keyboard continuity testing",
    "gu": "keyboard continuity testing"
  },
  "kick drum technique": {
    "hi": "kick drum तकनीक",
    "gu": "kick drum તકનીક"
  },
  "kinematics breakdowns": {
    "hi": "kinematics breakdowns",
    "gu": "kinematics breakdowns"
  },
  "kinetic theory review": {
    "hi": "गतिज सिद्धांत पुनरीक्षण",
    "gu": "ગતિવાદ સિદ્ધાંત પુનરાવર્તન"
  },
  "kitchen counter degreasing": {
    "hi": "किचन काउंटर डीग्रीजिंग",
    "gu": "રસોડા કાઉન્ટર ડીગ્રીઝિંગ"
  },
  "kitchen deep cleaning specific detailing": {
    "hi": "किचन गहन (डीप) सफाई विशेष विस्तृत कार्य",
    "gu": "રસોડું ડીપ સફાઈ વિશેષ વિગતવાર કાર્ય"
  },
  "knife sharpening": {
    "hi": "चाकू की धार लगाना",
    "gu": "છરીની ધાર કાઢવી"
  },
  "lab activity guidance": {
    "hi": "lab activity guidance",
    "gu": "lab activity guidance"
  },
  "labeling and categorization": {
    "hi": "लेबलिंग व वर्गीकरण",
    "gu": "લેબલિંગ અને વર્ગીકરણ"
  },
  "laboratory concepts": {
    "hi": "laboratory concepts",
    "gu": "laboratory concepts"
  },
  "lash application": {
    "hi": "lash लगाना",
    "gu": "lash લગાવવું"
  },
  "latin rhythm sync": {
    "hi": "latin rhythm sync",
    "gu": "latin rhythm sync"
  },
  "laundry folding": {
    "hi": "कपड़े समेटना व तह लगाना",
    "gu": "કપડાં ઘડી કરવા"
  },
  "laundry specific detailing": {
    "hi": "laundry विशेष विस्तृत कार्य",
    "gu": "laundry વિશેષ વિગતવાર કાર્ય"
  },
  "lawn mowing": {
    "hi": "घास की कटाई (लॉन मोइंग)",
    "gu": "ઘાસ કાપવું"
  },
  "layer cutting": {
    "hi": "लेयर कटिंग तकनीक",
    "gu": "લેયર કટિંગ ટેકનિક"
  },
  "layering sounds": {
    "hi": "layering sounds",
    "gu": "layering sounds"
  },
  "leak detection": {
    "hi": "लीकेज की पहचान",
    "gu": "લીકેજ તપાસ"
  },
  "leak test": {
    "hi": "लीकेज परीक्षण",
    "gu": "લિકેજ ટેસ્ટ"
  },
  "leakage inspection": {
    "hi": "रिसाव (लीकेज) जांच",
    "gu": "લિકેજ તપાસ"
  },
  "leash manners": {
    "hi": "पट्टे पर चलने का शिष्टाचार",
    "gu": "પટ્ટો પકડી ચાલવાની તાલીમ"
  },
  "length wise color coating": {
    "hi": "length-wise color coating",
    "gu": "length-wise color coating"
  },
  "length-wise color coating": {
    "hi": "length-wise color coating",
    "gu": "length-wise color coating"
  },
  "lens cleaning": {
    "hi": "कैमरा लेंस सफाई",
    "gu": "કેમેરા લેન્સ સફાઈ"
  },
  "leveling tool placement": {
    "hi": "leveling tool placement",
    "gu": "leveling tool placement"
  },
  "life science concepts": {
    "hi": "life science concepts",
    "gu": "life science concepts"
  },
  "lighting setup": {
    "hi": "लाइटिंग व्यवस्था",
    "gu": "લાઇટિંગ સેટઅપ"
  },
  "limb independence": {
    "hi": "limb independence",
    "gu": "limb independence"
  },
  "linen change": {
    "hi": "चादर व तकिया कवर बदलना",
    "gu": "ચાદર અને કવર બદલવા"
  },
  "lip scrub": {
    "hi": "होंठों का स्क्रब",
    "gu": "હોઠનું સ્ક્રબ"
  },
  "listening comprehension": {
    "hi": "listening comprehension",
    "gu": "listening comprehension"
  },
  "literature analysis": {
    "hi": "literature analysis",
    "gu": "literature analysis"
  },
  "live music specific detailing": {
    "hi": "live music विशेष विस्तृत कार्य",
    "gu": "live music વિશેષ વિગતવાર કાર્ય"
  },
  "loading of packed cartons mattresses desks and small appliances": {
    "hi": "loading of packed cartons, mattresses, desks, and small appliances",
    "gu": "loading of packed cartons, mattresses, desks, and small appliances"
  },
  "loading of packed cartons, mattresses, desks, and small appliances": {
    "hi": "loading of packed cartons, mattresses, desks, and small appliances",
    "gu": "loading of packed cartons, mattresses, desks, and small appliances"
  },
  "local errands specific detailing": {
    "hi": "local errands विशेष विस्तृत कार्य",
    "gu": "local errands વિશેષ વિગતવાર કાર્ય"
  },
  "lock installation": {
    "hi": "ताला फिटिंग (लॉक इंस्टॉलेशन)",
    "gu": "લોક ફિટિંગ"
  },
  "locking mechanism engagement": {
    "hi": "locking mechanism जुड़ाव",
    "gu": "locking mechanism જોડાણ"
  },
  "logic gate analysis": {
    "hi": "logic gate analysis",
    "gu": "logic gate analysis"
  },
  "logical reasoning puzzles": {
    "hi": "logical reasoning puzzles",
    "gu": "logical reasoning puzzles"
  },
  "long wear foundation concealer and contouring": {
    "hi": "लॉन्ग-वेयर फाउंडेशन व कंसीलर",
    "gu": "લોંગ-વેર ફાઉન્ડેશન અને કન્સીલર"
  },
  "long-wear foundation, concealer, and contouring": {
    "hi": "लॉन्ग-वेयर फाउंडेशन व कंसीलर",
    "gu": "લોંગ-વેર ફાઉન્ડેશન અને કન્સીલર"
  },
  "loose hair dusting": {
    "hi": "loose बाल dusting",
    "gu": "loose વાળ dusting"
  },
  "lubrication": {
    "hi": "स्नेहन व ऑयलिंग",
    "gu": "લુબ્રિકેશન અને ઓઇલિંગ"
  },
  "luxury ceiling fan wiping": {
    "hi": "लक्जरी ceiling पंखा पोंछना",
    "gu": "લક્ઝરી ceiling પંખો લૂછવું"
  },
  "luxury floor dry sweeping": {
    "hi": "लक्जरी फर्श ड्राई sweeping",
    "gu": "લક્ઝરી ફ્લોર ડ્રાય sweeping"
  },
  "luxury fresh polish application": {
    "hi": "लक्जरी fresh पॉलिश लगाना",
    "gu": "લક્ઝરી fresh પોલિશ લગાવવું"
  },
  "luxury hand exfoliation": {
    "hi": "लक्जरी हाथ exfoliation",
    "gu": "લક્ઝરી હાથ exfoliation"
  },
  "luxury safety protocol adherence": {
    "hi": "लक्जरी सुरक्षा नियम पालन",
    "gu": "લક્ઝરી સુરક્ષા નિયમો પાલન"
  },
  "luxury tile scrubbing": {
    "hi": "लक्जरी टाइल स्क्रबिंग",
    "gu": "લક્ઝરી ટાઇલ્સ સ્ક્રબિંગ"
  },
  "luxury window track brushing": {
    "hi": "लक्जरी खिड़की track ब्रशिंग",
    "gu": "લક્ઝરી બારી track બ્રશિંગ"
  },
  "lymphatic drainage": {
    "hi": "लिम्फैटिक ड्रेनेज मालिश",
    "gu": "લિમ્ફેટિક ડ્રેનેજ માલિશ"
  },
  "lymphatic drainage strokes": {
    "hi": "लिम्फैटिक ड्रेनेज स्ट्रोक्स",
    "gu": "લિમ્ફેટિક ડ્રેનેજ સ્ટ્રોક્સ"
  },
  "magician specific detailing": {
    "hi": "magician विशेष विस्तृत कार्य",
    "gu": "magician વિશેષ વિગતવાર કાર્ય"
  },
  "maid specific detailing": {
    "hi": "maid विशेष विस्तृत कार्य",
    "gu": "maid વિશેષ વિગતવાર કાર્ય"
  },
  "mains answer formatting": {
    "hi": "mains उत्तर formatting",
    "gu": "mains જવાબ formatting"
  },
  "makeup removal": {
    "hi": "मेकअप हटाना",
    "gu": "મેકઅપ દૂર કરવો"
  },
  "makeup setting mist": {
    "hi": "makeup सेटिंग mist",
    "gu": "makeup સેટિંગ mist"
  },
  "makeup setting verification": {
    "hi": "makeup सेटिंग सत्यापन",
    "gu": "makeup સેટિંગ ચકાસણી"
  },
  "malware scan": {
    "hi": "malware scan",
    "gu": "malware scan"
  },
  "manicure": {
    "hi": "हाथों का मेनिक्योर",
    "gu": "હાથનું મેનિક્યોર"
  },
  "map reading skills": {
    "hi": "map reading skills",
    "gu": "map reading skills"
  },
  "martial arts specific detailing": {
    "hi": "martial arts विशेष विस्तृत कार्य",
    "gu": "martial arts વિશેષ વિગતવાર કાર્ય"
  },
  "massage pressure reduction": {
    "hi": "मालिश दबाव सुधार",
    "gu": "માલિશ દબાણ સુધારણા"
  },
  "mat work": {
    "hi": "योगा मैट वर्कआउट",
    "gu": "યોગા મેટ કસરતો"
  },
  "material application": {
    "hi": "material लगाना",
    "gu": "material લગાવવું"
  },
  "material preparation": {
    "hi": "सामग्री तैयारी",
    "gu": "સામગ્રી તૈયારી"
  },
  "mathematical modeling": {
    "hi": "गणितीय मॉडलिंग",
    "gu": "ગાણિતિક મોડેલિંગ"
  },
  "matrix operations": {
    "hi": "मैट्रिक्स संक्रियाएं",
    "gu": "શ્રેણિક ગણતરીઓ"
  },
  "matter properties": {
    "hi": "matter properties",
    "gu": "matter properties"
  },
  "mattress cleaning specific detailing": {
    "hi": "गद्दे (मैट्रेस) सफाई विस्तृत कार्य",
    "gu": "ગાદલા (મેટ્રેસ) સફાઈ વિગતવાર સેવા"
  },
  "mattress sanitization": {
    "hi": "गद्दे का कीटाणुशोधन",
    "gu": "ગાદલાનું સેનિટાઇઝેશન"
  },
  "mcq practice": {
    "hi": "mcq अभ्यास",
    "gu": "mcq મહાવરો"
  },
  "measurement verification": {
    "hi": "माप सत्यापन",
    "gu": "માપ ચકાસણી"
  },
  "medical physics concepts": {
    "hi": "medical भौतिकी concepts",
    "gu": "medical ભૌતિકશાસ્ત્ર concepts"
  },
  "medicine pickup specific detailing": {
    "hi": "medicine pickup विशेष विस्तृत कार्य",
    "gu": "medicine pickup વિશેષ વિગતવાર કાર્ય"
  },
  "meditation guidance": {
    "hi": "ध्यान मार्गदर्शन",
    "gu": "ધ્યાન માર્ગદર્શન"
  },
  "meditation specific detailing": {
    "hi": "meditation विशेष विस्तृत कार्य",
    "gu": "meditation વિશેષ વિગતવાર કાર્ય"
  },
  "meeting scheduling": {
    "hi": "meeting scheduling",
    "gu": "meeting scheduling"
  },
  "melody and harmony blending": {
    "hi": "melody and harmony blending",
    "gu": "melody and harmony blending"
  },
  "melody arrangement": {
    "hi": "melody arrangement",
    "gu": "melody arrangement"
  },
  "mental calculation speed": {
    "hi": "mental calculation speed",
    "gu": "mental calculation speed"
  },
  "mental math tricks": {
    "hi": "मानसिक गणित ट्रिक्स",
    "gu": "માનસિક ગણિત ટ્રિક્સ"
  },
  "metabolic pathway tracing": {
    "hi": "metabolic pathway tracing",
    "gu": "metabolic pathway tracing"
  },
  "metronome practice": {
    "hi": "metronome अभ्यास",
    "gu": "metronome મહાવરો"
  },
  "mic check": {
    "hi": "माइक टेस्टिंग व आवाज जांच",
    "gu": "માઇક ટેસ્ટિંગ અને અવાજ તપાસ"
  },
  "microbiology basics": {
    "hi": "microbiology basics",
    "gu": "microbiology basics"
  },
  "microphone recording test": {
    "hi": "microphone recording test",
    "gu": "microphone recording test"
  },
  "microphone technique": {
    "hi": "microphone तकनीक",
    "gu": "microphone તકનીક"
  },
  "minor roadside troubleshooting to restore vehicle mobility": {
    "hi": "minor roadside troubleshooting to restore vehicle mobility",
    "gu": "minor roadside troubleshooting to restore vehicle mobility"
  },
  "mirror and glass polishing": {
    "hi": "कांच व शीशे की पॉलिशिंग",
    "gu": "કાચ અને અરીસાનું પોલિશિંગ"
  },
  "mirror glass polishing": {
    "hi": "दर्पण व कांच पॉलिशिंग",
    "gu": "અરીસા અને કાચ પોલિશિંગ"
  },
  "mirror polishing": {
    "hi": "शीशे की पॉलिशिंग",
    "gu": "અરીસાનું પોલિશિંગ"
  },
  "mobile app pairing": {
    "hi": "mobile app pairing",
    "gu": "mobile app pairing"
  },
  "mobile app sync": {
    "hi": "मोबाइल ऐप सिंक",
    "gu": "મોબાઇલ એપ સિંક"
  },
  "mobile sync": {
    "hi": "मोबाइल कनेक्टिविटी सिंक",
    "gu": "મોબાઇલ કનેક્ટિવિટી સિંક"
  },
  "mock interviews": {
    "hi": "mock interviews",
    "gu": "mock interviews"
  },
  "mock test analysis": {
    "hi": "mock test analysis",
    "gu": "mock test analysis"
  },
  "mock test review": {
    "hi": "मॉक टेस्ट समीक्षा",
    "gu": "મોક ટેસ્ટ સમીક્ષા"
  },
  "mock test simulation": {
    "hi": "mock test simulation",
    "gu": "mock test simulation"
  },
  "mock tests": {
    "hi": "mock tests",
    "gu": "mock tests"
  },
  "moisture barrier check": {
    "hi": "नमी अवरोधक जांच",
    "gu": "ભેજ રક્ષક તપાસ"
  },
  "moisture locking": {
    "hi": "moisture locking",
    "gu": "moisture locking"
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
    "hi": "moisturizing क्रीम",
    "gu": "moisturizing ક્રીમ"
  },
  "mole calculations": {
    "hi": "mole calculations",
    "gu": "mole calculations"
  },
  "molecular geometry mapping": {
    "hi": "molecular geometry मैपिंग",
    "gu": "molecular geometry મેપિંગ"
  },
  "monthly cook specific detailing": {
    "hi": "monthly cook विशेष विस्तृत कार्य",
    "gu": "monthly cook વિશેષ વિગતવાર કાર્ય"
  },
  "mosquito control specific detailing": {
    "hi": "mosquito नियंत्रण (कंट्रोल) विशेष विस्तृत कार्य",
    "gu": "mosquito નિયંત્રણ વિશેષ વિગતવાર કાર્ય"
  },
  "motherboard inspection": {
    "hi": "motherboard निरीक्षण",
    "gu": "motherboard નિરીક્ષણ"
  },
  "motion calculations": {
    "hi": "motion calculations",
    "gu": "motion calculations"
  },
  "motion detection testing": {
    "hi": "motion detection testing",
    "gu": "motion detection testing"
  },
  "motivation sessions": {
    "hi": "motivation sessions",
    "gu": "motivation sessions"
  },
  "mount stability verification": {
    "hi": "mount stability सत्यापन",
    "gu": "mount stability ચકાસણી"
  },
  "multi layer bubble wrapping for glassware chinaware and fragile decor": {
    "hi": "multi-layer बबल wrapping for glassware, chinaware, and fragile decor",
    "gu": "multi-layer બબલ wrapping for glassware, chinaware, and fragile decor"
  },
  "multi-layer bubble wrapping for glassware, chinaware, and fragile decor": {
    "hi": "multi-layer बबल wrapping for glassware, chinaware, and fragile decor",
    "gu": "multi-layer બબલ wrapping for glassware, chinaware, and fragile decor"
  },
  "music beat matching": {
    "hi": "music बीट मैचिंग",
    "gu": "music બીટ મેચિંગ"
  },
  "music tempo adaptation": {
    "hi": "music tempo adaptation",
    "gu": "music tempo adaptation"
  },
  "music theory basics": {
    "hi": "music theory basics",
    "gu": "music theory basics"
  },
  "mustache detailing": {
    "hi": "mustache विस्तृत कार्य",
    "gu": "mustache વિગતવાર કાર્ય"
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
    "hi": "नाखून (नेल) क्यूटिकल विस्तृत कार्य",
    "gu": "નખ ક્યુટિકલ વિગતવાર કાર્ય"
  },
  "nail edge refinement": {
    "hi": "नाखून (नेल) edge refinement",
    "gu": "નખ edge refinement"
  },
  "nail filing and shaping": {
    "hi": "नाखून फाइल व शेपिंग",
    "gu": "નખ ફાઇલિંગ અને શેપિંગ"
  },
  "nail polish evenness check": {
    "hi": "नाखून (नेल) पॉलिश evenness जांच",
    "gu": "નખ પોલિશ evenness તપાસ"
  },
  "nail polish removal": {
    "hi": "नेल पॉलिश हटाना",
    "gu": "નેઇલ પોલિશ દૂર કરવી"
  },
  "nail shaping": {
    "hi": "नाखूनों को आकार देना",
    "gu": "નખને આકાર આપવો"
  },
  "nail surface smoothing": {
    "hi": "नाखून (नेल) surface smoothing",
    "gu": "નખ surface smoothing"
  },
  "nail trimming": {
    "hi": "नाखून (नेल) trimming",
    "gu": "નખ trimming"
  },
  "nail trimming and shaping": {
    "hi": "नाखून काटना व आकार देना",
    "gu": "નખ કાપવા અને શેપ આપવો"
  },
  "ncert line by line review": {
    "hi": "ncert line-by-line पुनरीक्षण",
    "gu": "ncert line-by-line પુનરાવર્તન"
  },
  "ncert line-by-line review": {
    "hi": "ncert line-by-line पुनरीक्षण",
    "gu": "ncert line-by-line પુનરાવર્તન"
  },
  "neck coverage": {
    "hi": "गर्दन coverage",
    "gu": "ગરદન coverage"
  },
  "neck massage": {
    "hi": "गर्दन की मालिश",
    "gu": "ગરદનની માલિશ"
  },
  "neck relaxation": {
    "hi": "गर्दन को आराम",
    "gu": "ગળાનો આરામ"
  },
  "neckline cleanup": {
    "hi": "neckline सफाई",
    "gu": "neckline સફાઈ"
  },
  "neckline shaping": {
    "hi": "neckline shaping",
    "gu": "neckline shaping"
  },
  "negative marking avoidance": {
    "hi": "negative अंकन avoidance",
    "gu": "negative માર્કિંગ avoidance"
  },
  "negative marking strategy": {
    "hi": "negative अंकन strategy",
    "gu": "negative માર્કિંગ strategy"
  },
  "nerve stimulation": {
    "hi": "तंत्रिका उत्तेजना (नर्व स्टिमुलेशन)",
    "gu": "ચેતા ઉત્તેજના"
  },
  "nervousness management": {
    "hi": "nervousness प्रबंधन",
    "gu": "nervousness વ્યવસ્થાપન"
  },
  "network diagnostic": {
    "hi": "नेटवर्क खराबी जांच",
    "gu": "નેટવર્ક ડાયગ્નોસ્ટિક"
  },
  "network protocols": {
    "hi": "नेटवर्क protocols",
    "gu": "નેટવર્ક protocols"
  },
  "network signal strength test": {
    "hi": "नेटवर्क सिग्नल स्ट्रेंथ जांच",
    "gu": "નેટવર્ક સિગ્નલ ક્ષમતા તપાસ"
  },
  "newspaper reading techniques": {
    "hi": "newspaper reading तकनीक",
    "gu": "newspaper reading તકનીકો"
  },
  "number theory": {
    "hi": "संख्या सिद्धांत",
    "gu": "સંખ્યા સિદ્ધાંત"
  },
  "numerical answer type practice": {
    "hi": "numerical उत्तर type अभ्यास",
    "gu": "numerical જવાબ type મહાવરો"
  },
  "numerical chemistry practice": {
    "hi": "numerical chemistry अभ्यास",
    "gu": "numerical chemistry મહાવરો"
  },
  "numerical derivation": {
    "hi": "numerical derivation",
    "gu": "numerical derivation"
  },
  "nutrition consultation specific detailing": {
    "hi": "nutrition consultation विशेष विस्तृत कार्य",
    "gu": "nutrition consultation વિશેષ વિગતવાર કાર્ય"
  },
  "obedience training specific detailing": {
    "hi": "obedience training विशेष विस्तृत कार्य",
    "gu": "obedience training વિશેષ વિગતવાર કાર્ય"
  },
  "object oriented programming": {
    "hi": "object-oriented programming",
    "gu": "object-oriented programming"
  },
  "object-oriented programming": {
    "hi": "object-oriented programming",
    "gu": "object-oriented programming"
  },
  "objective question elimination": {
    "hi": "objective question elimination",
    "gu": "objective question elimination"
  },
  "observation recording": {
    "hi": "observation recording",
    "gu": "observation recording"
  },
  "octave stretching": {
    "hi": "octave stretching",
    "gu": "octave stretching"
  },
  "odor neutralization": {
    "hi": "odor neutralization",
    "gu": "odor neutralization"
  },
  "oil change": {
    "hi": "तेल बदलना (ऑयल चेंज)",
    "gu": "ઓઇલ બદલવું"
  },
  "oil distribution": {
    "hi": "तेल distribution",
    "gu": "તેલ distribution"
  },
  "on demand point to point intra city package pickup and delivery": {
    "hi": "on-demand point-to-point intra-city पैकेज pickup and delivery",
    "gu": "on-demand point-to-point intra-city પેકેજ pickup and delivery"
  },
  "on demand roadside assistance for immobilized passenger cars and bikes": {
    "hi": "on-demand roadside सहायता for immobilized passenger cars and bikes",
    "gu": "on-demand roadside સહાય for immobilized passenger cars and bikes"
  },
  "on-demand point-to-point intra-city package pickup and delivery": {
    "hi": "on-demand point-to-point intra-city पैकेज pickup and delivery",
    "gu": "on-demand point-to-point intra-city પેકેજ pickup and delivery"
  },
  "on-demand roadside assistance for immobilized passenger cars and bikes": {
    "hi": "on-demand roadside सहायता for immobilized passenger cars and bikes",
    "gu": "on-demand roadside સહાય for immobilized passenger cars and bikes"
  },
  "one time cook specific detailing": {
    "hi": "one-time cook विशेष विस्तृत कार्य",
    "gu": "one-time cook વિશેષ વિગતવાર કાર્ય"
  },
  "one-time cook specific detailing": {
    "hi": "one-time cook विशेष विस्तृत कार्य",
    "gu": "one-time cook વિશેષ વિગતવાર કાર્ય"
  },
  "operating system boot test": {
    "hi": "operating system boot test",
    "gu": "operating system boot test"
  },
  "optics diagrams": {
    "hi": "optics diagrams",
    "gu": "optics diagrams"
  },
  "optional unboxing assistance and packing material debris removal staging": {
    "hi": "optional unboxing सहायता and packing material debris हटाना staging",
    "gu": "optional unboxing સહાય and packing material debris દૂર કરવું staging"
  },
  "organic synthesis routes": {
    "hi": "organic synthesis routes",
    "gu": "organic synthesis routes"
  },
  "organized unloading and zone by zone distribution at new office": {
    "hi": "organized unloading and zone-by-zone distribution at new office",
    "gu": "organized unloading and zone-by-zone distribution at new office"
  },
  "organized unloading and zone-by-zone distribution at new office": {
    "hi": "organized unloading and zone-by-zone distribution at new office",
    "gu": "organized unloading and zone-by-zone distribution at new office"
  },
  "outline trimming": {
    "hi": "outline trimming",
    "gu": "outline trimming"
  },
  "oxidation states calculation": {
    "hi": "oxidation states calculation",
    "gu": "oxidation states calculation"
  },
  "pack drying time monitoring": {
    "hi": "पैक सुखाने की निगरानी",
    "gu": "પેક સુકાવાની દેખરેખ"
  },
  "pack removal": {
    "hi": "पैक हटाना",
    "gu": "પેક હટાવવું"
  },
  "paint application": {
    "hi": "पेंट लगाना",
    "gu": "પેઇન્ટ લગાવવો"
  },
  "palm hydration": {
    "hi": "palm hydration",
    "gu": "palm hydration"
  },
  "paradiddle exercises": {
    "hi": "paradiddle अभ्यास",
    "gu": "paradiddle કસરતો"
  },
  "part time cook specific detailing": {
    "hi": "part-time cook विशेष विस्तृत कार्य",
    "gu": "part-time cook વિશેષ વિગતવાર કાર્ય"
  },
  "part-time cook specific detailing": {
    "hi": "part-time cook विशेष विस्तृत कार्य",
    "gu": "part-time cook વિશેષ વિગતવાર કાર્ય"
  },
  "parting alignment": {
    "hi": "parting alignment",
    "gu": "parting alignment"
  },
  "party decoration specific detailing": {
    "hi": "party decoration विशेष विस्तृत कार्य",
    "gu": "party decoration વિશેષ વિગતવાર કાર્ય"
  },
  "party event cook specific detailing": {
    "hi": "party / event cook विशेष विस्तृत कार्य",
    "gu": "party / event cook વિશેષ વિગતવાર કાર્ય"
  },
  "party makeup specific detailing": {
    "hi": "party makeup विशेष विस्तृत कार्य",
    "gu": "party makeup વિશેષ વિગતવાર કાર્ય"
  },
  "party/event cook specific detailing": {
    "hi": "party / event cook विशेष विस्तृत कार्य",
    "gu": "party / event cook વિશેષ વિગતવાર કાર્ય"
  },
  "passage summarization": {
    "hi": "passage summarization",
    "gu": "passage summarization"
  },
  "patch test": {
    "hi": "स्किन पैच टेस्ट",
    "gu": "સ્કિન પેચ ટેસ્ટ"
  },
  "pause utilization": {
    "hi": "pause utilization",
    "gu": "pause utilization"
  },
  "pedal techniques": {
    "hi": "pedal तकनीक",
    "gu": "pedal તકનીકો"
  },
  "pedicure": {
    "hi": "पैरों का पेडीक्योर",
    "gu": "પગનું પેડિક્યોર"
  },
  "performance analysis": {
    "hi": "performance analysis",
    "gu": "performance analysis"
  },
  "performance etiquette": {
    "hi": "performance etiquette",
    "gu": "performance etiquette"
  },
  "performance stage presence": {
    "hi": "performance stage-presence",
    "gu": "performance stage-presence"
  },
  "performance stage-presence": {
    "hi": "performance stage-presence",
    "gu": "performance stage-presence"
  },
  "periodic trend analysis": {
    "hi": "periodic trend analysis",
    "gu": "periodic trend analysis"
  },
  "personal shopping assistance": {
    "hi": "personal shopping सहायता",
    "gu": "personal shopping સહાય"
  },
  "personal trainer specific detailing": {
    "hi": "personal trainer विशेष विस्तृत कार्य",
    "gu": "personal trainer વિશેષ વિગતવાર કાર્ય"
  },
  "personal yoga specific detailing": {
    "hi": "personal yoga विशेष विस्तृत कार्य",
    "gu": "personal yoga વિશેષ વિગતવાર કાર્ય"
  },
  "personalized feedback": {
    "hi": "personalized feedback",
    "gu": "personalized feedback"
  },
  "personalized hair consultation": {
    "hi": "व्यक्तिगत हेयर परामर्श",
    "gu": "વ્યક્તિગત હેર કન્સલ્ટેશન"
  },
  "pest spray": {
    "hi": "कीट नियंत्रण स्प्रे",
    "gu": "જંતુનાશક દવા છંટકાવ"
  },
  "pet boarding specific detailing": {
    "hi": "pet boarding विशेष विस्तृत कार्य",
    "gu": "pet boarding વિશેષ વિગતવાર કાર્ય"
  },
  "pet comfort and hygiene check": {
    "hi": "pet comfort and hygiene जांच",
    "gu": "pet comfort and hygiene તપાસ"
  },
  "pet feeding specific detailing": {
    "hi": "pet feeding विशेष विस्तृत कार्य",
    "gu": "pet feeding વિશેષ વિગતવાર કાર્ય"
  },
  "pet sitting specific detailing": {
    "hi": "pet sitting विशेष विस्तृत कार्य",
    "gu": "pet sitting વિશેષ વિગતવાર કાર્ય"
  },
  "phonetics training": {
    "hi": "phonetics training",
    "gu": "phonetics training"
  },
  "photo editing": {
    "hi": "फोटो एडिटिंग",
    "gu": "ફોટો એડિટિંગ"
  },
  "photo editing specific detailing": {
    "hi": "photo editing विशेष विस्तृत कार्य",
    "gu": "photo editing વિશેષ વિગતવાર કાર્ય"
  },
  "physical chemistry numerics": {
    "hi": "physical chemistry numerics",
    "gu": "physical chemistry numerics"
  },
  "physiotherapy specific detailing": {
    "hi": "physiotherapy विशेष विस्तृत कार्य",
    "gu": "physiotherapy વિશેષ વિગતવાર કાર્ય"
  },
  "pick handling": {
    "hi": "pick handling",
    "gu": "pick handling"
  },
  "pigmentation softening": {
    "hi": "pigmentation softening",
    "gu": "pigmentation softening"
  },
  "pipe fitting verification": {
    "hi": "पाइप फिटिंग जांच",
    "gu": "પાઇપ ફિટિંગ તપાસ"
  },
  "pipe joint sealing": {
    "hi": "पाइप जोड़ों की सीलिंग",
    "gu": "પાઇપ સાંધા સીલ કરવા"
  },
  "pitch and tone modulation": {
    "hi": "pitch and tone मॉड्यूलेशन",
    "gu": "pitch and tone મોડ્યુલેશન"
  },
  "pitch bend practice": {
    "hi": "pitch bend अभ्यास",
    "gu": "pitch bend મહાવરો"
  },
  "pitch correction": {
    "hi": "pitch correction",
    "gu": "pitch correction"
  },
  "plant physiology": {
    "hi": "plant physiology",
    "gu": "plant physiology"
  },
  "poetry interpretation": {
    "hi": "poetry interpretation",
    "gu": "poetry interpretation"
  },
  "point to point secure document pickup and direct delivery": {
    "hi": "point-to-point secure document pickup and direct delivery",
    "gu": "point-to-point secure document pickup and direct delivery"
  },
  "point-to-point secure document pickup and direct delivery": {
    "hi": "point-to-point secure document pickup and direct delivery",
    "gu": "point-to-point secure document pickup and direct delivery"
  },
  "polishing": {
    "hi": "पॉलिशिंग व चमक",
    "gu": "પોલિશિંગ અને ચમક"
  },
  "political science theories": {
    "hi": "political science theories",
    "gu": "political science theories"
  },
  "polity and governance": {
    "hi": "polity and governance",
    "gu": "polity and governance"
  },
  "polymer chemistry": {
    "hi": "polymer chemistry",
    "gu": "polymer chemistry"
  },
  "pore opening check": {
    "hi": "pore opening जांच",
    "gu": "pore opening તપાસ"
  },
  "pore opening steam": {
    "hi": "रोमछिद्र खोलने वाली भाप",
    "gu": "છીંદ્રો ખોલવા માટે સ્ટીમ"
  },
  "pore soothing": {
    "hi": "pore soothing",
    "gu": "pore soothing"
  },
  "pore tightening": {
    "hi": "रोमछिद्र कसना",
    "gu": "છીંદ્રો કડક કરવા"
  },
  "portrait photography specific detailing": {
    "hi": "portrait photography विशेष विस्तृत कार्य",
    "gu": "portrait photography વિશેષ વિગતવાર કાર્ય"
  },
  "post cut styling": {
    "hi": "हेयरकट उपरांत स्टाइलिंग",
    "gu": "કટ પછી સ્ટાઇલિંગ"
  },
  "post cut wash": {
    "hi": "post-cut धुलाई",
    "gu": "post-cut ધોવું"
  },
  "post service inspection and cleanup": {
    "hi": "सेवा उपरांत निरीक्षण व सफाई",
    "gu": "સેવા પછી તપાસ અને સફાઈ"
  },
  "post-cut wash": {
    "hi": "post-cut धुलाई",
    "gu": "post-cut ધોવું"
  },
  "posture alignment": {
    "hi": "posture alignment",
    "gu": "posture alignment"
  },
  "posture and alignment": {
    "hi": "posture and alignment",
    "gu": "posture and alignment"
  },
  "posture and fingering": {
    "hi": "posture and fingering",
    "gu": "posture and fingering"
  },
  "posture and holding": {
    "hi": "posture and holding",
    "gu": "posture and holding"
  },
  "posture correction": {
    "hi": "आसन व मुद्रा सुधार",
    "gu": "શરીર મુદ્રા સુધારણા"
  },
  "potting soil mix": {
    "hi": "गमले की मिट्टी मिश्रण",
    "gu": "કુંડાની માટીનું મિશ્રણ"
  },
  "powder application": {
    "hi": "पाउडर लगाना",
    "gu": "પાવડર લગાવવો"
  },
  "power connection verification": {
    "hi": "power कनेक्शन सत्यापन",
    "gu": "power કનેક્શન ચકાસણી"
  },
  "power isolation safety check": {
    "hi": "पावर आइसोलेशन सुरक्षा जांच",
    "gu": "પાવર આઇસોલેશન સુરક્ષા તપાસ"
  },
  "practical examples": {
    "hi": "practical examples",
    "gu": "practical examples"
  },
  "pre cleansing": {
    "hi": "प्रारंभिक सफाई",
    "gu": "પ્રારંભિક સફાઈ"
  },
  "pre cut wash": {
    "hi": "pre-cut धुलाई",
    "gu": "pre-cut ધોવું"
  },
  "pre treatment wash": {
    "hi": "उपचार पूर्व धुलाई",
    "gu": "ટ્રીટમેન્ટ પૂર્વે ધોવું"
  },
  "pre trip vehicle condition inspection odometer fuel level scratch log": {
    "hi": "pre-trip vehicle स्थिति निरीक्षण (odometer, fuel level, scratch log)",
    "gu": "pre-trip vehicle સ્થિતિ નિરીક્ષણ (odometer, fuel level, scratch log)"
  },
  "pre-cleansing": {
    "hi": "प्रारंभिक सफाई",
    "gu": "પ્રારંભિક સફાઈ"
  },
  "pre-cut wash": {
    "hi": "pre-cut धुलाई",
    "gu": "pre-cut ધોવું"
  },
  "pre-treatment wash": {
    "hi": "उपचार पूर्व धुलाई",
    "gu": "ટ્રીટમેન્ટ પૂર્વે ધોવું"
  },
  "pre-trip vehicle condition inspection (odometer, fuel level, scratch log)": {
    "hi": "pre-trip vehicle स्थिति निरीक्षण (odometer, fuel level, scratch log)",
    "gu": "pre-trip vehicle સ્થિતિ નિરીક્ષણ (odometer, fuel level, scratch log)"
  },
  "precise waist tucking and height alignment": {
    "hi": "precise waist tucking and height alignment",
    "gu": "precise waist tucking and height alignment"
  },
  "precision base coat application": {
    "hi": "precision बेस कोट लगाना",
    "gu": "precision બેઝ કોટ લગાવવું"
  },
  "precision baseboard wiping": {
    "hi": "precision बेसबोर्ड पोंछना",
    "gu": "precision બેઝબોર્ડ લૂછવું"
  },
  "precision calf massaging": {
    "hi": "precision calf massaging",
    "gu": "precision calf massaging"
  },
  "precision cotton threading": {
    "hi": "सटीक कॉटन थ्रेडिंग",
    "gu": "સટીક કોટન થ્રેડિંગ"
  },
  "precision cutting": {
    "hi": "precision कटिंग",
    "gu": "precision કટિંગ"
  },
  "precision execution step": {
    "hi": "precision निष्पादन step",
    "gu": "precision અમલ step"
  },
  "precision fading": {
    "hi": "precision fading",
    "gu": "precision fading"
  },
  "precision grout line scrubbing": {
    "hi": "precision ग्राउट line स्क्रबिंग",
    "gu": "precision ગ્રાઉટ line સ્ક્રબિંગ"
  },
  "precision haircutting": {
    "hi": "सटीक हेयरकटिंग",
    "gu": "ચોક્કસ હેરકટિંગ"
  },
  "precision lip shaping and long lasting lipstick": {
    "hi": "precision lip shaping and लॉन्ग-लास्टिंग lipstick",
    "gu": "precision lip shaping and લાંબો સમય ટકનાર lipstick"
  },
  "precision lip shaping and long-lasting lipstick": {
    "hi": "precision lip shaping and लॉन्ग-लास्टिंग lipstick",
    "gu": "precision lip shaping and લાંબો સમય ટકનાર lipstick"
  },
  "precision service standard verification": {
    "hi": "precision सेवा मानक सत्यापन",
    "gu": "precision સેવા ધોરણ ચકાસણી"
  },
  "precision tool setup": {
    "hi": "precision tool सेटअप",
    "gu": "precision tool સેટઅપ"
  },
  "precision wall drilling": {
    "hi": "precision दीवार drilling",
    "gu": "precision દિવાલ drilling"
  },
  "prelims elimination tricks": {
    "hi": "prelims elimination tricks",
    "gu": "prelims elimination tricks"
  },
  "premium cuticle softening": {
    "hi": "प्रीमियम क्यूटिकल softening",
    "gu": "પ્રીમિયમ ક્યુટિકલ softening"
  },
  "premium grout line scrubbing": {
    "hi": "प्रीमियम ग्राउट line स्क्रबिंग",
    "gu": "પ્રીમિયમ ગ્રાઉટ line સ્ક્રબિંગ"
  },
  "premium nail trimming": {
    "hi": "प्रीमियम नाखून (नेल) trimming",
    "gu": "પ્રીમિયમ નખ trimming"
  },
  "premium service standard verification": {
    "hi": "प्रीमियम सेवा मानक सत्यापन",
    "gu": "પ્રીમિયમ સેવા ધોરણ ચકાસણી"
  },
  "presentation formatting": {
    "hi": "presentation formatting",
    "gu": "presentation formatting"
  },
  "presentation skills": {
    "hi": "presentation skills",
    "gu": "presentation skills"
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
    "hi": "previous year gate questions",
    "gu": "previous year gate questions"
  },
  "previous year paper analysis": {
    "hi": "previous year paper analysis",
    "gu": "previous year paper analysis"
  },
  "previous year paper solving": {
    "hi": "previous year paper solving",
    "gu": "previous year paper solving"
  },
  "previous year problem solving": {
    "hi": "previous year problem solving",
    "gu": "previous year problem solving"
  },
  "previous year question analysis": {
    "hi": "विगत वर्ष प्रश्न विश्लेषण",
    "gu": "ગત વર્ષના પ્રશ્નોનું વિશ્લેષણ"
  },
  "probability calculations": {
    "hi": "प्रायिकता गणना",
    "gu": "સંભાવના ગણતરી"
  },
  "processing time monitoring": {
    "hi": "processing time monitoring",
    "gu": "processing time monitoring"
  },
  "product photography specific detailing": {
    "hi": "product photography विशेष विस्तृत कार्य",
    "gu": "product photography વિશેષ વિગતવાર કાર્ય"
  },
  "professional room by room packing of household or office belongings": {
    "hi": "professional room-by-room packing of household or office belongings",
    "gu": "professional room-by-room packing of household or office belongings"
  },
  "professional room-by-room packing of household or office belongings": {
    "hi": "professional room-by-room packing of household or office belongings",
    "gu": "professional room-by-room packing of household or office belongings"
  },
  "progress tracking": {
    "hi": "progress tracking",
    "gu": "progress tracking"
  },
  "promotional video specific detailing": {
    "hi": "promotional video विशेष विस्तृत कार्य",
    "gu": "promotional video વિશેષ વિગતવાર કાર્ય"
  },
  "pronunciation correction": {
    "hi": "pronunciation correction",
    "gu": "pronunciation correction"
  },
  "pronunciation practice": {
    "hi": "pronunciation अभ्यास",
    "gu": "pronunciation મહાવરો"
  },
  "proofreading skills": {
    "hi": "proofreading skills",
    "gu": "proofreading skills"
  },
  "protective cargo tie downs during transit": {
    "hi": "protective cargo tie-downs during transit",
    "gu": "protective cargo tie-downs during transit"
  },
  "protective cargo tie-downs during transit": {
    "hi": "protective cargo tie-downs during transit",
    "gu": "protective cargo tie-downs during transit"
  },
  "protective handling in moisture resistant transport pouch": {
    "hi": "protective handling in moisture-resistant transport pouch",
    "gu": "protective handling in moisture-resistant transport pouch"
  },
  "protective handling in moisture-resistant transport pouch": {
    "hi": "protective handling in moisture-resistant transport pouch",
    "gu": "protective handling in moisture-resistant transport pouch"
  },
  "protective handling in weather resistant courier cargo carriers": {
    "hi": "protective handling in weather-resistant courier cargo carriers",
    "gu": "protective handling in weather-resistant courier cargo carriers"
  },
  "protective handling in weather-resistant courier cargo carriers": {
    "hi": "protective handling in weather-resistant courier cargo carriers",
    "gu": "protective handling in weather-resistant courier cargo carriers"
  },
  "protective quilted blankets for major appliances and large furniture items": {
    "hi": "protective quilted blankets for major appliances and large furniture items",
    "gu": "protective quilted blankets for major appliances and large furniture items"
  },
  "protective quilted moving blanket wrapping for polished wooden surfaces": {
    "hi": "protective quilted moving blanket wrapping for polished wooden surfaces",
    "gu": "protective quilted moving blanket wrapping for polished wooden surfaces"
  },
  "protective transport to designated local recipient address or courier hub": {
    "hi": "protective transport to designated local recipient address or courier hub",
    "gu": "protective transport to designated local recipient address or courier hub"
  },
  "protective tyre dressing and exterior vinyl trim conditioning": {
    "hi": "protective tyre dressing and बाहरी भाग vinyl trim कंडीशनिंग",
    "gu": "protective tyre dressing and બહારનો ભાગ vinyl trim કન્ડિશનિંગ"
  },
  "protective tyre dressing and vinyl polish application": {
    "hi": "protective tyre dressing and vinyl पॉलिश लगाना",
    "gu": "protective tyre dressing and vinyl પોલિશ લગાવવું"
  },
  "protein pack application": {
    "hi": "protein पैक लगाना",
    "gu": "protein પેક લગાવવું"
  },
  "pumice stone rubbing": {
    "hi": "झांवा पत्थर (प्यूमिस स्टोन) से घिसाई",
    "gu": "પ્યુમિસ સ્ટોન વડે સફાઈ"
  },
  "punjabi food specific detailing": {
    "hi": "punjabi food विशेष विस्तृत कार्य",
    "gu": "punjabi food વિશેષ વિગતવાર કાર્ય"
  },
  "puppy training specific detailing": {
    "hi": "puppy training विशेष विस्तृत कार्य",
    "gu": "puppy training વિશેષ વિગતવાર કાર્ય"
  },
  "puzzle solving": {
    "hi": "puzzle solving",
    "gu": "puzzle solving"
  },
  "quality adherence check": {
    "hi": "quality पालन जांच",
    "gu": "quality પાલન તપાસ"
  },
  "quality assurance": {
    "hi": "quality assurance",
    "gu": "quality assurance"
  },
  "quantitative aptitude": {
    "hi": "quantitative योग्यता",
    "gu": "quantitative યોગ્યતા"
  },
  "quantitative aptitude tricks": {
    "hi": "quantitative योग्यता tricks",
    "gu": "quantitative યોગ્યતા tricks"
  },
  "radiance blush and highlighter application": {
    "hi": "radiance blush and highlighter लगाना",
    "gu": "radiance blush and highlighter લગાવવું"
  },
  "radiator coolant and engine oil level visual check": {
    "hi": "radiator coolant and engine तेल level visual जांच",
    "gu": "radiator coolant and engine તેલ level visual તપાસ"
  },
  "raga taal basics": {
    "hi": "raga / taal basics",
    "gu": "raga / taal basics"
  },
  "raga/taal basics": {
    "hi": "raga / taal basics",
    "gu": "raga / taal basics"
  },
  "ram seating check": {
    "hi": "ram seating जांच",
    "gu": "ram seating તપાસ"
  },
  "rapid budget friendly relocation for 1 bhk flats studio apartments or pg rooms": {
    "hi": "rapid, budget-friendly स्थानांतरण for 1 बीएचके flats, studio apartments, or pg rooms",
    "gu": "rapid, budget-friendly સ્થળાંતર for 1 બીએચકે flats, studio apartments, or pg rooms"
  },
  "rapid, budget-friendly relocation for 1 bhk flats, studio apartments, or pg rooms": {
    "hi": "rapid, budget-friendly स्थानांतरण for 1 बीएचके flats, studio apartments, or pg rooms",
    "gu": "rapid, budget-friendly સ્થળાંતર for 1 બીએચકે flats, studio apartments, or pg rooms"
  },
  "razor finish": {
    "hi": "razor फिनिश",
    "gu": "razor ફિનિશ"
  },
  "reaction pathways": {
    "hi": "reaction pathways",
    "gu": "reaction pathways"
  },
  "reading comprehension": {
    "hi": "reading comprehension",
    "gu": "reading comprehension"
  },
  "reading comprehension speed": {
    "hi": "reading comprehension speed",
    "gu": "reading comprehension speed"
  },
  "reading fluency": {
    "hi": "reading fluency",
    "gu": "reading fluency"
  },
  "reading practice": {
    "hi": "reading अभ्यास",
    "gu": "reading મહાવરો"
  },
  "real estate photography specific detailing": {
    "hi": "real estate photography विशेष विस्तृत कार्य",
    "gu": "real estate photography વિશેષ વિગતવાર કાર્ય"
  },
  "real time dispatch and collection confirmation updates": {
    "hi": "real-time dispatch and collection confirmation updates",
    "gu": "real-time dispatch and collection confirmation updates"
  },
  "real time dispatch status notification": {
    "hi": "real-time dispatch status notification",
    "gu": "real-time dispatch status notification"
  },
  "real-time dispatch and collection confirmation updates": {
    "hi": "real-time dispatch and collection confirmation updates",
    "gu": "real-time dispatch and collection confirmation updates"
  },
  "real-time dispatch status notification": {
    "hi": "real-time dispatch status notification",
    "gu": "real-time dispatch status notification"
  },
  "reasoning ability": {
    "hi": "reasoning ability",
    "gu": "reasoning ability"
  },
  "reasoning practice": {
    "hi": "reasoning अभ्यास",
    "gu": "reasoning મહાવરો"
  },
  "receipt handover and digital delivery confirmation": {
    "hi": "receipt handover and digital delivery confirmation",
    "gu": "receipt handover and digital delivery confirmation"
  },
  "record keeping": {
    "hi": "record keeping",
    "gu": "record keeping"
  },
  "redness reduction": {
    "hi": "लालिमा कम करना",
    "gu": "લાલાશ ઘટાડવી"
  },
  "redness reduction wipe": {
    "hi": "लालिमा कम करने वाला वाइप",
    "gu": "લાલાશ ઘટાડતો વાઇપ"
  },
  "registry cleanup": {
    "hi": "registry सफाई",
    "gu": "registry સફાઈ"
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
    "hi": "remote monitoring सत्यापन",
    "gu": "remote monitoring ચકાસણી"
  },
  "remote pairing": {
    "hi": "remote pairing",
    "gu": "remote pairing"
  },
  "report generation": {
    "hi": "report generation",
    "gu": "report generation"
  },
  "research assistance": {
    "hi": "research सहायता",
    "gu": "research સહાય"
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
    "hi": "resonance नियंत्रण (कंट्रोल)",
    "gu": "resonance નિયંત્રણ"
  },
  "result stability check": {
    "hi": "result stability जांच",
    "gu": "result stability તપાસ"
  },
  "return collection and delivery back to customer residence or office": {
    "hi": "return collection and delivery back to customer residence or office",
    "gu": "return collection and delivery back to customer residence or office"
  },
  "revision tests": {
    "hi": "revision tests",
    "gu": "revision tests"
  },
  "rhythm accompaniment": {
    "hi": "rhythm संगत",
    "gu": "rhythm સંગત"
  },
  "rhythm control": {
    "hi": "rhythm नियंत्रण (कंट्रोल)",
    "gu": "rhythm નિયંત્રણ"
  },
  "rhythm patterns": {
    "hi": "rhythm patterns",
    "gu": "rhythm patterns"
  },
  "rhythm rudiments": {
    "hi": "rhythm rudiments",
    "gu": "rhythm rudiments"
  },
  "rhythm synchronization": {
    "hi": "rhythm सिंक्रोनाइज़ेशन",
    "gu": "rhythm સિંક્રોનાઇઝેશન"
  },
  "ro filter replacement": {
    "hi": "आरओ फिल्टर बदलना",
    "gu": "આરઓ ફિલ્ટર બદલવું"
  },
  "room by room distribution of boxes and furniture at destination": {
    "hi": "room-by-room distribution of boxes and furniture at destination",
    "gu": "room-by-room distribution of boxes and furniture at destination"
  },
  "room mapping": {
    "hi": "कक्ष मैपिंग",
    "gu": "રૂમ મેપિંગ"
  },
  "room-by-room distribution of boxes and furniture at destination": {
    "hi": "room-by-room distribution of boxes and furniture at destination",
    "gu": "room-by-room distribution of boxes and furniture at destination"
  },
  "root to tip application": {
    "hi": "जड़ से सिरे तक पोषण",
    "gu": "મૂળથી છેડા સુધી પોષણ"
  },
  "root touch up": {
    "hi": "root टचअप",
    "gu": "root ટચઅપ"
  },
  "root touch-up": {
    "hi": "root टचअप",
    "gu": "root ટચઅપ"
  },
  "root-to-tip application": {
    "hi": "जड़ से सिरे तक पोषण",
    "gu": "મૂળથી છેડા સુધી પોષણ"
  },
  "rosin application": {
    "hi": "rosin लगाना",
    "gu": "rosin લગાવવું"
  },
  "safe disciplined driving following all local traffic rules": {
    "hi": "safe, disciplined driving following all local traffic rules",
    "gu": "safe, disciplined driving following all local traffic rules"
  },
  "safe, disciplined driving following all local traffic rules": {
    "hi": "safe, disciplined driving following all local traffic rules",
    "gu": "safe, disciplined driving following all local traffic rules"
  },
  "safety grounding test": {
    "hi": "सुरक्षा ग्राउंडिंग टेस्ट",
    "gu": "સુરક્ષા અર્થિંગ ટેસ્ટ"
  },
  "safety protocol adherence": {
    "hi": "सुरक्षा नियमों का पालन",
    "gu": "સુરક્ષા નિયમોનું પાલન"
  },
  "safety protocol implementation": {
    "hi": "सुरक्षा नियम implementation",
    "gu": "સુરક્ષા નિયમો implementation"
  },
  "sanitized tools disposable cape": {
    "hi": "सैनिटाइज्ड उपकरण व डिस्पोजेबल केप",
    "gu": "સેનિટાઇઝ્ડ સાધનો અને કેપ"
  },
  "sanitized tools setup": {
    "hi": "सैनिटाइज्ड उपकरणों का सेटअप",
    "gu": "સેનિટાઇઝ્ડ સાધનો સેટઅપ"
  },
  "saree draping specific detailing": {
    "hi": "saree draping विशेष विस्तृत कार्य",
    "gu": "saree draping વિશેષ વિગતવાર કાર્ય"
  },
  "saree fabric assessment and styling consultation": {
    "hi": "saree fabric आकलन and स्टाइलिंग consultation",
    "gu": "saree fabric મૂલ્યાંકન and સ્ટાઇલિંગ consultation"
  },
  "scale practice": {
    "hi": "scale अभ्यास",
    "gu": "scale મહાવરો"
  },
  "scale running": {
    "hi": "scale running",
    "gu": "scale running"
  },
  "scalp condition assessment": {
    "hi": "स्कैल्प स्थिति की जांच",
    "gu": "સ્કેલ્પ સ્થિતિ તપાસ"
  },
  "scalp massage": {
    "hi": "सिर की मालिश (स्कैल्प मसाज)",
    "gu": "સ્કેલ્પ માલિશ"
  },
  "scalp pressure massage": {
    "hi": "स्कैल्प दबाव मालिश",
    "gu": "સ્કેલ્પ દબાણ માલિશ"
  },
  "scalp stimulation": {
    "hi": "स्कैल्प stimulation",
    "gu": "સ્કેલ્પ stimulation"
  },
  "scheduled doorstep collection of pre packed courier parcels and return boxes": {
    "hi": "scheduled doorstep collection of pre-packed courier parcels and return boxes",
    "gu": "scheduled doorstep collection of pre-packed courier parcels and return boxes"
  },
  "scheduled doorstep collection of pre-packed courier parcels and return boxes": {
    "hi": "scheduled doorstep collection of pre-packed courier parcels and return boxes",
    "gu": "scheduled doorstep collection of pre-packed courier parcels and return boxes"
  },
  "science fundamentals": {
    "hi": "science fundamentals",
    "gu": "science fundamentals"
  },
  "scientific concept explanation": {
    "hi": "scientific concept explanation",
    "gu": "scientific concept explanation"
  },
  "scientific reasoning": {
    "hi": "scientific reasoning",
    "gu": "scientific reasoning"
  },
  "scissor over comb technique": {
    "hi": "scissor over comb तकनीक",
    "gu": "scissor over comb તકનીક"
  },
  "scissor stray hair cutting": {
    "hi": "scissor stray बाल कटिंग",
    "gu": "scissor stray વાળ કટિંગ"
  },
  "scratch free microfiber cloth drying and air blower dusting": {
    "hi": "scratch-free microfiber cloth drying and air blower dusting",
    "gu": "scratch-free microfiber cloth drying and air blower dusting"
  },
  "scratch-free microfiber cloth drying and air blower dusting": {
    "hi": "scratch-free microfiber cloth drying and air blower dusting",
    "gu": "scratch-free microfiber cloth drying and air blower dusting"
  },
  "screen ribbon cable seating": {
    "hi": "screen ribbon केबल seating",
    "gu": "screen ribbon કેબલ seating"
  },
  "scrubbing intensity reduction": {
    "hi": "स्क्रबिंग intensity सुधार",
    "gu": "સ્ક્રબિંગ intensity સુધારણા"
  },
  "secondary execution phase": {
    "hi": "secondary निष्पादन phase",
    "gu": "secondary અમલ phase"
  },
  "section by section coating": {
    "hi": "section-by-section coating",
    "gu": "section-by-section coating"
  },
  "section-by-section coating": {
    "hi": "section-by-section coating",
    "gu": "section-by-section coating"
  },
  "sectional mock tests": {
    "hi": "sectional mock tests",
    "gu": "sectional mock tests"
  },
  "sectioning and heat protectant application": {
    "hi": "विभाजन and heat protectant लगाना",
    "gu": "વિભાગ પાળવા and heat protectant લગાવવું"
  },
  "secure carton sealing with heavy duty packaging tape": {
    "hi": "secure carton sealing with हैवी-ड्यूटी packaging tape",
    "gu": "secure carton sealing with હેવી-ડ્યુટી packaging tape"
  },
  "secure carton sealing with heavy-duty packaging tape": {
    "hi": "secure carton sealing with हैवी-ड्यूटी packaging tape",
    "gu": "secure carton sealing with હેવી-ડ્યુટી packaging tape"
  },
  "secure fastening": {
    "hi": "secure fastening",
    "gu": "secure fastening"
  },
  "secure lashing and vehicle transportation to new residential address": {
    "hi": "secure lashing and vehicle transportation to new residential address",
    "gu": "secure lashing and vehicle transportation to new residential address"
  },
  "secure loading tie down strapping and vehicle transport": {
    "hi": "secure loading, tie-down strapping, and vehicle transport",
    "gu": "secure loading, tie-down strapping, and vehicle transport"
  },
  "secure loading, tie-down strapping, and vehicle transport": {
    "hi": "secure loading, tie-down strapping, and vehicle transport",
    "gu": "secure loading, tie-down strapping, and vehicle transport"
  },
  "secure pin placement (bobby pins, u-pins if needed)": {
    "hi": "secure pin placement (bobby pins, u-pins if needed)",
    "gu": "secure pin placement (bobby pins, u-pins if needed)"
  },
  "secure pin placement bobby pins u pins if needed": {
    "hi": "secure pin placement (bobby pins, u-pins if needed)",
    "gu": "secure pin placement (bobby pins, u-pins if needed)"
  },
  "secure placement of safety pins for day long hold": {
    "hi": "secure placement of सुरक्षा pins for day-long hold",
    "gu": "secure placement of સુરક્ષા pins for day-long hold"
  },
  "secure placement of safety pins for day-long hold": {
    "hi": "secure placement of सुरक्षा pins for day-long hold",
    "gu": "secure placement of સુરક્ષા pins for day-long hold"
  },
  "security system configuration": {
    "hi": "security system configuration",
    "gu": "security system configuration"
  },
  "sentence formation": {
    "hi": "sentence formation",
    "gu": "sentence formation"
  },
  "sentence structuring": {
    "hi": "sentence structuring",
    "gu": "sentence structuring"
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
    "hi": "सेवा क्षेत्र preparation",
    "gu": "સેવા વિસ્તાર preparation"
  },
  "service standard verification": {
    "hi": "सेवा मानक सत्यापन",
    "gu": "સેવા ધોરણ ચકાસણી"
  },
  "shade selection": {
    "hi": "shade selection",
    "gu": "shade selection"
  },
  "sheet music interpretation": {
    "hi": "sheet music interpretation",
    "gu": "sheet music interpretation"
  },
  "shine enhancement": {
    "hi": "shine enhancement",
    "gu": "shine enhancement"
  },
  "shortcut math tricks": {
    "hi": "shortcut math tricks",
    "gu": "shortcut math tricks"
  },
  "shot quality review": {
    "hi": "shot quality पुनरीक्षण",
    "gu": "shot quality પુનરાવર્તન"
  },
  "shoulder pallu pleating and border alignment": {
    "hi": "शोल्डर (कंधा) pallu pleating and border alignment",
    "gu": "ખભા pallu pleating and border alignment"
  },
  "shoulder rest adjustment": {
    "hi": "शोल्डर (कंधा) rest adjustment",
    "gu": "ખભા rest adjustment"
  },
  "shoulder tension release": {
    "hi": "शोल्डर (कंधा) tension release",
    "gu": "ખભા tension release"
  },
  "sideburn trimming": {
    "hi": "sideburn trimming",
    "gu": "sideburn trimming"
  },
  "sight reading": {
    "hi": "sight-reading",
    "gu": "sight-reading"
  },
  "sight-reading": {
    "hi": "sight-reading",
    "gu": "sight-reading"
  },
  "singer specific detailing": {
    "hi": "singer विशेष विस्तृत कार्य",
    "gu": "singer વિશેષ વિગતવાર કાર્ય"
  },
  "sink and tap descaling": {
    "hi": "नल व सिंक की डीस्केलिंग",
    "gu": "નળ અને સિંકની સફાઈ"
  },
  "sink drain cleaning": {
    "hi": "सिंक ड्रेन सफाई",
    "gu": "સિંક ડ્રેન સફાઈ"
  },
  "sink polishing": {
    "hi": "sink पॉलिशिंग",
    "gu": "sink પોલિશિંગ"
  },
  "site cleanup": {
    "hi": "site सफाई",
    "gu": "site સફાઈ"
  },
  "site inspection and power isolation": {
    "hi": "साइट निरीक्षण व पावर कट",
    "gu": "સાઇટ તપાસ અને પાવર બંધ"
  },
  "skin analysis": {
    "hi": "त्वचा का विश्लेषण",
    "gu": "ત્વચાનું વિશ્લેષણ"
  },
  "skin cleansing": {
    "hi": "त्वचा की सफाई (क्लींजिंग)",
    "gu": "ત્વચા સફાઈ (ક્લીનિંગ)"
  },
  "skin elasticity check": {
    "hi": "skin elasticity जांच",
    "gu": "skin elasticity તપાસ"
  },
  "skin hydration check": {
    "hi": "skin hydration जांच",
    "gu": "skin hydration તપાસ"
  },
  "skin monitoring": {
    "hi": "skin monitoring",
    "gu": "skin monitoring"
  },
  "skin prep": {
    "hi": "skin तैयारी (प्रेप)",
    "gu": "skin તૈયારી (પ્રેપ)"
  },
  "skin prep and primer application": {
    "hi": "स्किन प्रेप व प्राइमर लगाना",
    "gu": "સ્કિન પ્રેપ અને પ્રાઇમર લગાવવું"
  },
  "skin preparation": {
    "hi": "skin preparation",
    "gu": "skin preparation"
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
    "hi": "smart कैमरा इंस्टॉलेशन विशेष विस्तृत कार्य",
    "gu": "smart કેમેરા ઇન્સ્ટોલેશન વિશેષ વિગતવાર કાર્ય"
  },
  "smart doorbell installation specific detailing": {
    "hi": "smart doorbell इंस्टॉलेशन विशेष विस्तृत कार्य",
    "gu": "smart doorbell ઇન્સ્ટોલેશન વિશેષ વિગતવાર કાર્ય"
  },
  "smart home setup specific detailing": {
    "hi": "smart होम सेटअप विशेष विस्तृत कार्य",
    "gu": "smart ઘર સેટઅપ વિશેષ વિગતવાર કાર્ય"
  },
  "smart lighting installation specific detailing": {
    "hi": "smart lighting इंस्टॉलेशन विशेष विस्तृत कार्य",
    "gu": "smart lighting ઇન્સ્ટોલેશન વિશેષ વિગતવાર કાર્ય"
  },
  "smart lock installation specific detailing": {
    "hi": "smart ताला इंस्टॉलेशन विशेष विस्तृत कार्य",
    "gu": "smart લોક ઇન્સ્ટોલેશન વિશેષ વિગતવાર કાર્ય"
  },
  "smart lock replacement specific detailing": {
    "hi": "smart ताला replacement विशेष विस्तृत कार्य",
    "gu": "smart લોક replacement વિશેષ વિગતવાર કાર્ય"
  },
  "smart lock setup specific detailing": {
    "hi": "smart ताला सेटअप विशेष विस्तृत कार्य",
    "gu": "smart લોક સેટઅપ વિશેષ વિગતવાર કાર્ય"
  },
  "smart lock troubleshooting specific detailing": {
    "hi": "smart ताला troubleshooting विशेष विस्तृत कार्य",
    "gu": "smart લોક troubleshooting વિશેષ વિગતવાર કાર્ય"
  },
  "smart sensor installation specific detailing": {
    "hi": "smart सेंसर इंस्टॉलेशन विशेष विस्तृत कार्य",
    "gu": "smart સેન્સર ઇન્સ્ટોલેશન વિશેષ વિગતવાર કાર્ય"
  },
  "smart switch installation specific detailing": {
    "hi": "smart स्विच इंस्टॉलेशन विशेष विस्तृत कार्य",
    "gu": "smart સ્વિચ ઇન્સ્ટોલેશન વિશેષ વિગતવાર કાર્ય"
  },
  "smart tv setup": {
    "hi": "smart tv सेटअप",
    "gu": "smart tv સેટઅપ"
  },
  "snare and tom fills": {
    "hi": "snare and tom fills",
    "gu": "snare and tom fills"
  },
  "social media video specific detailing": {
    "hi": "social media video विशेष विस्तृत कार्य",
    "gu": "social media video વિશેષ વિગતવાર કાર્ય"
  },
  "social structures": {
    "hi": "social structures",
    "gu": "social structures"
  },
  "sofa cleaning specific detailing": {
    "hi": "सोफा सफाई विस्तृत कार्य",
    "gu": "સોફા સફાઈ વિગતવાર સેવા"
  },
  "sofa dry vacuuming": {
    "hi": "सोफा ड्राई वैक्यूमिंग",
    "gu": "સોફા ડ્રાય વેક્યૂમિંગ"
  },
  "sofa vacuuming": {
    "hi": "सोफा वैक्यूमिंग",
    "gu": "સોફા વેક્યુમિંગ"
  },
  "software development lifecycle": {
    "hi": "software development lifecycle",
    "gu": "software development lifecycle"
  },
  "sole smoothing": {
    "hi": "sole smoothing",
    "gu": "sole smoothing"
  },
  "soothing oil application": {
    "hi": "soothing तेल लगाना",
    "gu": "soothing તેલ લગાવવું"
  },
  "south indian food specific detailing": {
    "hi": "south indian food विशेष विस्तृत कार्य",
    "gu": "south indian food વિશેષ વિગતવાર કાર્ય"
  },
  "spare wheel replacement for flat tyres (using customer's inflated spare wheel)": {
    "hi": "spare पहिया replacement for flat tyres (using customer's inflated spare पहिया)",
    "gu": "spare વ્હીલ replacement for flat tyres (using customer's inflated spare વ્હીલ)"
  },
  "spare wheel replacement for flat tyres using customer s inflated spare wheel": {
    "hi": "spare पहिया replacement for flat tyres (using customer's inflated spare पहिया)",
    "gu": "spare વ્હીલ replacement for flat tyres (using customer's inflated spare વ્હીલ)"
  },
  "spatial awareness": {
    "hi": "spatial awareness",
    "gu": "spatial awareness"
  },
  "speaker audio test": {
    "hi": "speaker audio test",
    "gu": "speaker audio test"
  },
  "specialized ankle massage": {
    "hi": "specialized टखना मालिश",
    "gu": "specialized ઘૂંટી (એન્કલ) માલિશ"
  },
  "specialized cuticle softening": {
    "hi": "specialized क्यूटिकल softening",
    "gu": "specialized ક્યુટિકલ softening"
  },
  "specialized furniture exterior wiping": {
    "hi": "specialized furniture बाहरी भाग पोंछना",
    "gu": "specialized furniture બહારનો ભાગ લૂછવું"
  },
  "specialized surface spotlessness verification": {
    "hi": "specialized surface spotlessness सत्यापन",
    "gu": "specialized surface spotlessness ચકાસણી"
  },
  "specialty cuisine cook specific detailing": {
    "hi": "specialty cuisine cook विशेष विस्तृत कार्य",
    "gu": "specialty cuisine cook વિશેષ વિગતવાર કાર્ય"
  },
  "speech structuring": {
    "hi": "speech structuring",
    "gu": "speech structuring"
  },
  "speed and accuracy drills": {
    "hi": "speed and accuracy drills",
    "gu": "speed and accuracy drills"
  },
  "speed and accuracy training": {
    "hi": "गति और सटीकता प्रशिक्षण",
    "gu": "ઝડપ અને ચોકસાઈ તાલીમ"
  },
  "speed drills": {
    "hi": "speed drills",
    "gu": "speed drills"
  },
  "speed math": {
    "hi": "speed math",
    "gu": "speed math"
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
    "hi": "split-end trimming",
    "gu": "split-end trimming"
  },
  "split-end assessment": {
    "hi": "दोमुंहे बालों की जांच",
    "gu": "બે મોઢાવાળા વાળની તપાસ"
  },
  "split-end trimming": {
    "hi": "split-end trimming",
    "gu": "split-end trimming"
  },
  "spoken fluency": {
    "hi": "spoken fluency",
    "gu": "spoken fluency"
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
    "hi": "spreader usage",
    "gu": "spreader usage"
  },
  "spreadsheet management": {
    "hi": "spreadsheet प्रबंधन",
    "gu": "spreadsheet વ્યવસ્થાપન"
  },
  "staccato legato bowing": {
    "hi": "staccato / legato bowing",
    "gu": "staccato / legato bowing"
  },
  "staccato/legato bowing": {
    "hi": "staccato / legato bowing",
    "gu": "staccato / legato bowing"
  },
  "stage movement": {
    "hi": "stage movement",
    "gu": "stage movement"
  },
  "stain spot treatment": {
    "hi": "दाग spot-treatment",
    "gu": "ડાઘ spot-treatment"
  },
  "stain spot-treatment": {
    "hi": "दाग spot-treatment",
    "gu": "ડાઘ spot-treatment"
  },
  "stamina building": {
    "hi": "स्टेमिना निर्माण",
    "gu": "સ્ટેમિના વધારવી"
  },
  "stamina endurance": {
    "hi": "stamina endurance",
    "gu": "stamina endurance"
  },
  "standard tools and supplies included": {
    "hi": "मानक उपकरण व सामग्री शामिल",
    "gu": "પ્રમાણિત સાધનો અને સામગ્રી શામેલ"
  },
  "static gk memorization": {
    "hi": "static gk memorization",
    "gu": "static gk memorization"
  },
  "statistical analysis": {
    "hi": "सांख्यिकीय विश्लेषण",
    "gu": "આંકડાકીય વિશ્લેષણ"
  },
  "steam application": {
    "hi": "भाप (स्टीम) लगाना",
    "gu": "વરાળ (સ્ટીમ) આપવી"
  },
  "steam assisted absorption": {
    "hi": "steam-assisted अवशोषण",
    "gu": "steam-assisted શોષણ"
  },
  "steam machine setup": {
    "hi": "भाप (स्टीम) machine सेटअप",
    "gu": "સ્ટીમ machine સેટઅપ"
  },
  "steam treatment": {
    "hi": "भाप (स्टीम) उपचार",
    "gu": "સ્ટીમ સારવાર"
  },
  "steam-assisted absorption": {
    "hi": "steam-assisted अवशोषण",
    "gu": "steam-assisted શોષણ"
  },
  "step by step problem solving": {
    "hi": "step-by-step problem solving",
    "gu": "step-by-step problem solving"
  },
  "step combinations": {
    "hi": "step combinations",
    "gu": "step combinations"
  },
  "step-by-step problem solving": {
    "hi": "step-by-step problem solving",
    "gu": "step-by-step problem solving"
  },
  "stick grip and posture": {
    "hi": "stick grip and posture",
    "gu": "stick grip and posture"
  },
  "sticky residue wiping": {
    "hi": "sticky अवशेष पोंछना",
    "gu": "sticky અવશેષો લૂછવું"
  },
  "stoichiometry": {
    "hi": "stoichiometry",
    "gu": "stoichiometry"
  },
  "storytelling techniques": {
    "hi": "storytelling तकनीक",
    "gu": "storytelling તકનીકો"
  },
  "strand test": {
    "hi": "strand test",
    "gu": "strand test"
  },
  "stray hair tweezing": {
    "hi": "अवांछित बाल निकालना",
    "gu": "અનિચ્છનીય વાળ દૂર કરવા"
  },
  "streak free interior and exterior window glass cleaning": {
    "hi": "streak-free interior and बाहरी भाग खिड़की glass सफाई",
    "gu": "streak-free interior and બહારનો ભાગ બારી glass સફાઈ"
  },
  "streak-free interior and exterior window glass cleaning": {
    "hi": "streak-free interior and बाहरी भाग खिड़की glass सफाई",
    "gu": "streak-free interior and બહારનો ભાગ બારી glass સફાઈ"
  },
  "strength assessment": {
    "hi": "strength आकलन",
    "gu": "strength મૂલ્યાંકન"
  },
  "strength training specific detailing": {
    "hi": "strength training विशेष विस्तृत कार्य",
    "gu": "strength training વિશેષ વિગતવાર કાર્ય"
  },
  "stress relief": {
    "hi": "stress रिलीफ (राहत)",
    "gu": "stress રાહત"
  },
  "string tuning": {
    "hi": "string tuning",
    "gu": "string tuning"
  },
  "structured boxing in heavy duty 5 ply corrugated cardboard cartons": {
    "hi": "structured boxing in हैवी-ड्यूटी 5-ply corrugated cardboard cartons",
    "gu": "structured boxing in હેવી-ડ્યુટી 5-ply corrugated cardboard cartons"
  },
  "structured boxing in heavy-duty 5-ply corrugated cardboard cartons": {
    "hi": "structured boxing in हैवी-ड्यूटी 5-ply corrugated cardboard cartons",
    "gu": "structured boxing in હેવી-ડ્યુટી 5-ply corrugated cardboard cartons"
  },
  "strumming techniques": {
    "hi": "strumming तकनीक",
    "gu": "strumming તકનીકો"
  },
  "stud finding": {
    "hi": "stud finding",
    "gu": "stud finding"
  },
  "study material sharing": {
    "hi": "study material sharing",
    "gu": "study material sharing"
  },
  "style longevity assessment": {
    "hi": "स्टाइल टिकाऊपन आकलन",
    "gu": "સ્ટાઇલ ટકાઉપણું મૂલ્યાંકન"
  },
  "styling adjustment": {
    "hi": "स्टाइलिंग adjustment",
    "gu": "સ્ટાઇલિંગ adjustment"
  },
  "subject wise weightage strategy": {
    "hi": "subject-wise weightage strategy",
    "gu": "subject-wise weightage strategy"
  },
  "subject-wise weightage strategy": {
    "hi": "subject-wise weightage strategy",
    "gu": "subject-wise weightage strategy"
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
    "hi": "सहायता for packages up to 15 kg फिटिंग मानक delivery carriers",
    "gu": "સહાય for packages up to 15 kg ફિટિંગ ધોરણ delivery carriers"
  },
  "surface cleansing": {
    "hi": "surface cleansing",
    "gu": "surface cleansing"
  },
  "surface spotlessness verification": {
    "hi": "surface spotlessness सत्यापन",
    "gu": "surface spotlessness ચકાસણી"
  },
  "sweeping & mopping specific detailing": {
    "hi": "sweeping & mopping विशेष विस्तृत कार्य",
    "gu": "sweeping & mopping વિશેષ વિગતવાર કાર્ય"
  },
  "sweeping mopping specific detailing": {
    "hi": "sweeping & mopping विशेष विस्तृत कार्य",
    "gu": "sweeping & mopping વિશેષ વિગતવાર કાર્ય"
  },
  "swimming specific detailing": {
    "hi": "swimming विशेष विस्तृत कार्य",
    "gu": "swimming વિશેષ વિગતવાર કાર્ય"
  },
  "switchboard dusting": {
    "hi": "switchboard dusting",
    "gu": "switchboard dusting"
  },
  "switchboard earthing verification": {
    "hi": "अर्थिंग सत्यापन",
    "gu": "અર્થિંગ ચકાસણી"
  },
  "syllabus deconstruction": {
    "hi": "syllabus deconstruction",
    "gu": "syllabus deconstruction"
  },
  "syllogism practice": {
    "hi": "syllogism अभ्यास",
    "gu": "syllogism મહાવરો"
  },
  "symmetry assessment": {
    "hi": "समरूपता आकलन",
    "gu": "સપ્રમાણતા મૂલ્યાંકન"
  },
  "symmetry check": {
    "hi": "समरूपता जांच",
    "gu": "સપ્રમાણતા તપાસ"
  },
  "syntax correction": {
    "hi": "syntax correction",
    "gu": "syntax correction"
  },
  "syntax debugging": {
    "hi": "syntax debugging",
    "gu": "syntax debugging"
  },
  "synthesizer basics": {
    "hi": "synthesizer basics",
    "gu": "synthesizer basics"
  },
  "systematic crate loading according to department floor tagging": {
    "hi": "systematic crate loading according to department / फर्श tagging",
    "gu": "systematic crate loading according to department / ફ્લોર tagging"
  },
  "systematic crate loading according to department/floor tagging": {
    "hi": "systematic crate loading according to department / फर्श tagging",
    "gu": "systematic crate loading according to department / ફ્લોર tagging"
  },
  "systematic room by room box and carton handling": {
    "hi": "systematic room-by-room box and carton handling",
    "gu": "systematic room-by-room box and carton handling"
  },
  "systematic room-by-room box and carton handling": {
    "hi": "systematic room-by-room box and carton handling",
    "gu": "systematic room-by-room box and carton handling"
  },
  "taal memorization": {
    "hi": "taal memorization",
    "gu": "taal memorization"
  },
  "tabla tuning": {
    "hi": "tabla tuning",
    "gu": "tabla tuning"
  },
  "tablature reading": {
    "hi": "tablature reading",
    "gu": "tablature reading"
  },
  "tail point alignment": {
    "hi": "टेल पॉइंट एलाइनमेंट",
    "gu": "ટેઇલ પોઇન્ટ સંરેખણ"
  },
  "targeted area refinement": {
    "hi": "targeted क्षेत्र refinement",
    "gu": "targeted વિસ્તાર refinement"
  },
  "task prioritization": {
    "hi": "task prioritization",
    "gu": "task prioritization"
  },
  "taxonomy memorization": {
    "hi": "taxonomy memorization",
    "gu": "taxonomy memorization"
  },
  "tds level testing": {
    "hi": "टीडीएस स्तर जांच",
    "gu": "ટીડીએસ સ્તર તપાસ"
  },
  "teflon tape wrapping": {
    "hi": "टेफ्लॉन टेप रैपिंग",
    "gu": "ટેફલોન ટેપ લગાવવી"
  },
  "temperature testing": {
    "hi": "temperature testing",
    "gu": "temperature testing"
  },
  "temple massage": {
    "hi": "temple मालिश",
    "gu": "temple માલિશ"
  },
  "tempo acceleration (laya)": {
    "hi": "tempo acceleration (laya)",
    "gu": "tempo acceleration (laya)"
  },
  "tempo acceleration laya": {
    "hi": "tempo acceleration (laya)",
    "gu": "tempo acceleration (laya)"
  },
  "tempo control": {
    "hi": "tempo नियंत्रण (कंट्रोल)",
    "gu": "tempo નિયંત્રણ"
  },
  "tempo keeping": {
    "hi": "tempo keeping",
    "gu": "tempo keeping"
  },
  "tempo synchronization": {
    "hi": "tempo सिंक्रोनाइज़ेशन",
    "gu": "tempo સિંક્રોનાઇઝેશન"
  },
  "tennis specific detailing": {
    "hi": "tennis विशेष विस्तृत कार्य",
    "gu": "tennis વિશેષ વિગતવાર કાર્ય"
  },
  "tense applications": {
    "hi": "tense applications",
    "gu": "tense applications"
  },
  "terminal testing": {
    "hi": "टर्मिनल लोड टेस्टिंग",
    "gu": "ટર્મિનલ ટેસ્ટિંગ"
  },
  "test inclusion": {
    "hi": "test inclusion",
    "gu": "test inclusion"
  },
  "test series evaluation": {
    "hi": "test series मूल्यांकन",
    "gu": "test series મૂલ્યાંકન"
  },
  "test stamina building": {
    "hi": "test stamina building",
    "gu": "test stamina building"
  },
  "theme extraction": {
    "hi": "theme extraction",
    "gu": "theme extraction"
  },
  "thermal insulated bag crate handling for temperature sensitive items": {
    "hi": "thermal insulated bag / crate handling for temperature-sensitive items",
    "gu": "thermal insulated bag / crate handling for temperature-sensitive items"
  },
  "thermal insulated bag/crate handling for temperature-sensitive items": {
    "hi": "thermal insulated bag / crate handling for temperature-sensitive items",
    "gu": "thermal insulated bag / crate handling for temperature-sensitive items"
  },
  "thermal paste reapplication": {
    "hi": "thermal paste reapplication",
    "gu": "thermal paste reapplication"
  },
  "thermal styling (curls, waves, straightening, or simple party updo)": {
    "hi": "thermal स्टाइलिंग (कर्ल्स, वेव्स, straightening, or simple party updo)",
    "gu": "thermal સ્ટાઇલિંગ (કલ્સ, વેવ્સ, straightening, or simple party updo)"
  },
  "thermal styling curls waves straightening or simple party updo": {
    "hi": "thermal स्टाइलिंग (कर्ल्स, वेव्स, straightening, or simple party updo)",
    "gu": "thermal સ્ટાઇલિંગ (કલ્સ, વેવ્સ, straightening, or simple party updo)"
  },
  "thermodynamics principles": {
    "hi": "thermodynamics principles",
    "gu": "thermodynamics principles"
  },
  "thickness assessment": {
    "hi": "thickness आकलन",
    "gu": "thickness મૂલ્યાંકન"
  },
  "thickness matching": {
    "hi": "मोटाई का मिलान",
    "gu": "જાડાઈનું સમાનતા મેચિંગ"
  },
  "thorough cleaning of all rooms including bedrooms living areas kitchen and bathrooms": {
    "hi": "thorough सफाई of all rooms, including bedrooms, living areas, किचन, and bathrooms",
    "gu": "thorough સફાઈ of all rooms, including bedrooms, living areas, રસોડું, and bathrooms"
  },
  "thorough cleaning of all rooms, including bedrooms, living areas, kitchen, and bathrooms": {
    "hi": "thorough सफाई of all rooms, including bedrooms, living areas, किचन, and bathrooms",
    "gu": "thorough સફાઈ of all rooms, including bedrooms, living areas, રસોડું, and bathrooms"
  },
  "thread clipping": {
    "hi": "थ्रेड क्लिपिंग",
    "gu": "થ્રેડ ક્લિપિંગ"
  },
  "tile cleaning specific detailing": {
    "hi": "टाइल सफाई विशेष विस्तृत कार्य",
    "gu": "ટાઇલ્સ સફાઈ વિશેષ વિગતવાર કાર્ય"
  },
  "tile scrubbing": {
    "hi": "टाइल स्क्रबिंग",
    "gu": "ટાઇલ્સ સ્ક્રબિંગ"
  },
  "time bound practice": {
    "hi": "time bound अभ्यास",
    "gu": "time bound મહાવરો"
  },
  "time management": {
    "hi": "time प्रबंधन",
    "gu": "time વ્યવસ્થાપન"
  },
  "time management strategies": {
    "hi": "time प्रबंधन strategies",
    "gu": "time વ્યવસ્થાપન strategies"
  },
  "time management tips": {
    "hi": "समय प्रबंधन टिप्स",
    "gu": "સમય વ્યવસ્થાપન ટિપ્સ"
  },
  "time optimization": {
    "hi": "time optimization",
    "gu": "time optimization"
  },
  "timing control": {
    "hi": "timing नियंत्रण (कंट्रोल)",
    "gu": "timing નિયંત્રણ"
  },
  "toe separator insertion": {
    "hi": "टो सेपरेटर लगाना",
    "gu": "ટો સેપરેટર લગાવવું"
  },
  "toenail finish inspection": {
    "hi": "पैर के नाखूनों का फिनिश निरीक्षण",
    "gu": "પગના નખનું ફિનિશિંગ નિરીક્ષણ"
  },
  "toilet bowl disinfection": {
    "hi": "शौचालय कीटाणुशोधन",
    "gu": "શૌચાલય જંતુમુક્ત કરવું"
  },
  "toilet bowl scaling": {
    "hi": "toilet bowl scaling",
    "gu": "toilet bowl scaling"
  },
  "tone balancing": {
    "hi": "tone संतुलन",
    "gu": "tone સંતુલન"
  },
  "tone evening check": {
    "hi": "स्किन टोन एकरूपता जांच",
    "gu": "સ્કિન ટોન સમાનતા તપાસ"
  },
  "tone projection": {
    "hi": "tone projection",
    "gu": "tone projection"
  },
  "tone selection": {
    "hi": "tone selection",
    "gu": "tone selection"
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
    "hi": "tool and equipment सेटअप",
    "gu": "tool and equipment સેટઅપ"
  },
  "tool sanitization": {
    "hi": "tool कीटाणुशोधन",
    "gu": "tool સેનિટાઇઝેશન"
  },
  "tool setup": {
    "hi": "सैनिटाइज्ड टूल्स सेटअप",
    "gu": "સેનિટાઇઝ્ડ સાધનો સેટઅપ"
  },
  "top coat sealing": {
    "hi": "top कोट sealing",
    "gu": "top કોટ sealing"
  },
  "top texturizing": {
    "hi": "top texturizing",
    "gu": "top texturizing"
  },
  "topography reading": {
    "hi": "topography reading",
    "gu": "topography reading"
  },
  "towel drying": {
    "hi": "तौलिये से सुखाना",
    "gu": "ટુવાલથી સૂકવવું"
  },
  "trackpad alignment": {
    "hi": "trackpad alignment",
    "gu": "trackpad alignment"
  },
  "traditional compositions": {
    "hi": "पारंपरिक compositions",
    "gu": "પરંપરાગત compositions"
  },
  "traditional garba forms": {
    "hi": "पारंपरिक garba forms",
    "gu": "પરંપરાગત garba forms"
  },
  "traditional step practice": {
    "hi": "पारंपरिक step अभ्यास",
    "gu": "પરંપરાગત step મહાવરો"
  },
  "translation basics": {
    "hi": "translation basics",
    "gu": "translation basics"
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
    "hi": "trash disposal",
    "gu": "trash disposal"
  },
  "trash removal": {
    "hi": "trash हटाना",
    "gu": "trash દૂર કરવું"
  },
  "travel planning": {
    "hi": "travel planning",
    "gu": "travel planning"
  },
  "treatment cream mixing": {
    "hi": "ट्रीटमेंट क्रीम मिश्रण",
    "gu": "ટ્રીટમેન્ટ ક્રીમ મિશ્રણ"
  },
  "trigonometry identities": {
    "hi": "त्रिकोणमिति समीकरण",
    "gu": "ત્રિકોણમિતિ સમીકરણો"
  },
  "trimmer edge detailing": {
    "hi": "trimmer edge विस्तृत कार्य",
    "gu": "trimmer edge વિગતવાર કાર્ય"
  },
  "tv backplate attachment": {
    "hi": "tv backplate attachment",
    "gu": "tv backplate attachment"
  },
  "tv lifting and seating": {
    "hi": "tv lifting and seating",
    "gu": "tv lifting and seating"
  },
  "twirl techniques": {
    "hi": "twirl तकनीक",
    "gu": "twirl તકનીકો"
  },
  "user access setup": {
    "hi": "user access सेटअप",
    "gu": "user access સેટઅપ"
  },
  "vaccination specific detailing": {
    "hi": "vaccination विशेष विस्तृत कार्य",
    "gu": "vaccination વિશેષ વિગતવાર કાર્ય"
  },
  "vacuuming": {
    "hi": "वैक्यूमिंग",
    "gu": "વેક્યૂમિંગ"
  },
  "vector resolution": {
    "hi": "vector resolution",
    "gu": "vector resolution"
  },
  "vegetarian cook specific detailing": {
    "hi": "vegetarian cook विशेष विस्तृत कार्य",
    "gu": "vegetarian cook વિશેષ વિગતવાર કાર્ય"
  },
  "vendor coordination": {
    "hi": "vendor coordination",
    "gu": "vendor coordination"
  },
  "verbal ability": {
    "hi": "verbal ability",
    "gu": "verbal ability"
  },
  "verification of external bag count and receipt against customer order token": {
    "hi": "सत्यापन of external bag count and receipt against customer order token",
    "gu": "ચકાસણી of external bag count and receipt against customer order token"
  },
  "verification of external shipping label address barcode or return token": {
    "hi": "सत्यापन of external shipping label, address barcode, or return token",
    "gu": "ચકાસણી of external shipping label, address barcode, or return token"
  },
  "verification of external shipping label, address barcode, or return token": {
    "hi": "सत्यापन of external shipping label, address barcode, or return token",
    "gu": "ચકાસણી of external shipping label, address barcode, or return token"
  },
  "version control basics": {
    "hi": "version नियंत्रण (कंट्रोल) basics",
    "gu": "version નિયંત્રણ basics"
  },
  "veterinary consultation specific detailing": {
    "hi": "veterinary consultation विशेष विस्तृत कार्य",
    "gu": "veterinary consultation વિશેષ વિગતવાર કાર્ય"
  },
  "vibrato practice": {
    "hi": "vibrato अभ्यास",
    "gu": "vibrato મહાવરો"
  },
  "video doorbell installation specific detailing": {
    "hi": "video doorbell इंस्टॉलेशन विशेष विस्तृत कार्य",
    "gu": "video doorbell ઇન્સ્ટોલેશન વિશેષ વિગતવાર કાર્ય"
  },
  "viewing angle alignment": {
    "hi": "viewing angle alignment",
    "gu": "viewing angle alignment"
  },
  "virtual assistance": {
    "hi": "virtual सहायता",
    "gu": "virtual સહાય"
  },
  "virtual calculator training": {
    "hi": "virtual calculator training",
    "gu": "virtual calculator training"
  },
  "vocabulary building": {
    "hi": "vocabulary building",
    "gu": "vocabulary building"
  },
  "vocal range expansion": {
    "hi": "vocal range expansion",
    "gu": "vocal range expansion"
  },
  "vocal warm ups": {
    "hi": "vocal warm-ups",
    "gu": "vocal warm-ups"
  },
  "vocal warm-ups": {
    "hi": "vocal warm-ups",
    "gu": "vocal warm-ups"
  },
  "voice modulation": {
    "hi": "voice मॉड्यूलेशन",
    "gu": "voice મોડ્યુલેશન"
  },
  "voice projection": {
    "hi": "voice projection",
    "gu": "voice projection"
  },
  "voltage and current testing": {
    "hi": "वोल्टेज व करंट टेस्टिंग",
    "gu": "વોલ્ટેજ અને કરંટ ટેસ્ટિંગ"
  },
  "voltage assessment": {
    "hi": "वोल्टेज जांच",
    "gu": "વોલ્ટેજ તપાસ"
  },
  "voltage test": {
    "hi": "वोल्टेज परीक्षण",
    "gu": "વોલ્ટેજ ટેસ્ટ"
  },
  "volume enhancement cutting": {
    "hi": "volume enhancement कटिंग",
    "gu": "volume enhancement કટિંગ"
  },
  "wall anchor installation": {
    "hi": "दीवार में एंकर फिटिंग",
    "gu": "દિવાલમાં એન્કર ફિટિંગ"
  },
  "wall measurement": {
    "hi": "दीवार measurement",
    "gu": "દિવાલ measurement"
  },
  "wall plug insertion": {
    "hi": "दीवार plug insertion",
    "gu": "દિવાલ plug insertion"
  },
  "warm oil application": {
    "hi": "warm तेल लगाना",
    "gu": "warm તેલ લગાવવું"
  },
  "warm steam application": {
    "hi": "हल्की भाप (स्टीम)",
    "gu": "હૂંફાળી વરાળ (સ્ટીમ)"
  },
  "warm up and mobility drills": {
    "hi": "वार्म-अप व स्ट्रेचिंग",
    "gu": "વાર્મ-અપ અને સ્ટ્રેચિંગ"
  },
  "warm up routines": {
    "hi": "warm-up routines",
    "gu": "warm-up routines"
  },
  "warm up stretching": {
    "hi": "warm-up stretching",
    "gu": "warm-up stretching"
  },
  "warm water foot soak": {
    "hi": "warm पानी फुट soak",
    "gu": "warm પાણી ફૂટ soak"
  },
  "warm water soak": {
    "hi": "गुनगुने पानी में सिकाई",
    "gu": "હૂંફાળા પાણીમાં સિકાઈ"
  },
  "warm-up and mobility drills": {
    "hi": "वार्म-अप व स्ट्रेचिंग",
    "gu": "વાર્મ-અપ અને સ્ટ્રેચિંગ"
  },
  "warm-up routines": {
    "hi": "warm-up routines",
    "gu": "warm-up routines"
  },
  "warm-up stretching": {
    "hi": "warm-up stretching",
    "gu": "warm-up stretching"
  },
  "waste disposal": {
    "hi": "कचरा निपटान",
    "gu": "કચરાનો યોગ્ય નિકાલ"
  },
  "water pressure check": {
    "hi": "पानी के दबाव की जांच",
    "gu": "પાણીનું પ્રેશર તપાસ"
  },
  "water pressure test": {
    "hi": "जल दबाव परीक्षण",
    "gu": "પાણીનું પ્રેશર ટેસ્ટ"
  },
  "wave analysis": {
    "hi": "wave analysis",
    "gu": "wave analysis"
  },
  "wax heating": {
    "hi": "wax heating",
    "gu": "wax heating"
  },
  "web technologies": {
    "hi": "web technologies",
    "gu": "web technologies"
  },
  "webcam functionality test": {
    "hi": "webcam functionality test",
    "gu": "webcam functionality test"
  },
  "wedding decoration specific detailing": {
    "hi": "wedding decoration विशेष विस्तृत कार्य",
    "gu": "wedding decoration વિશેષ વિગતવાર કાર્ય"
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
    "hi": "weekly assignments",
    "gu": "weekly assignments"
  },
  "weight management specific detailing": {
    "hi": "वजन प्रबंधन विस्तृत कार्य",
    "gu": "વજન વ્યવસ્થાપન વિગતવાર સેવા"
  },
  "wet wipe cleaning": {
    "hi": "wet पोंछना सफाई",
    "gu": "wet લૂછવું સફાઈ"
  },
  "whitehead extraction": {
    "hi": "व्हाइटहेड्स हटाना",
    "gu": "વ્હાઇટહેડ્સ દૂર કરવા"
  },
  "wi fi antenna check": {
    "hi": "wi-fi antenna जांच",
    "gu": "wi-fi antenna તપાસ"
  },
  "wi fi connectivity check": {
    "hi": "wi-fi connectivity जांच",
    "gu": "wi-fi connectivity તપાસ"
  },
  "wi-fi antenna check": {
    "hi": "wi-fi antenna जांच",
    "gu": "wi-fi antenna તપાસ"
  },
  "wi-fi connectivity check": {
    "hi": "wi-fi connectivity जांच",
    "gu": "wi-fi connectivity તપાસ"
  },
  "window cleaning (interior glass) and tracks": {
    "hi": "खिड़की सफाई (interior glass) and tracks",
    "gu": "બારી સફાઈ (interior glass) and tracks"
  },
  "window cleaning interior glass and tracks": {
    "hi": "खिड़की सफाई (interior glass) and tracks",
    "gu": "બારી સફાઈ (interior glass) and tracks"
  },
  "window glass wiping": {
    "hi": "खिड़की glass पोंछना",
    "gu": "બારી glass લૂછવું"
  },
  "window sill wiping": {
    "hi": "खिड़की की चौखट पोंछना",
    "gu": "બારીની સફાઈ"
  },
  "window track brushing": {
    "hi": "खिड़की track ब्रशिंग",
    "gu": "બારી track બ્રશિંગ"
  },
  "wire insulation check": {
    "hi": "वायर इंसुलेशन जांच",
    "gu": "વાયર ઇન્સ્યુલેશન તપાસ"
  },
  "wire stripping and connection": {
    "hi": "वायर जोड़ना व कनेक्शन",
    "gu": "વાયરિંગ જોડાણ"
  },
  "wiring continuity check": {
    "hi": "वायरिंग निरंतरता टेस्ट",
    "gu": "વાયરિંગ ટેસ્ટિંગ"
  },
  "wood buffing": {
    "hi": "लकड़ी की बफिंग",
    "gu": "લાકડાનું બફિંગ"
  },
  "work area marking": {
    "hi": "कार्य क्षेत्र अंकન",
    "gu": "કાર્ય વિસ્તાર માર્કિંગ"
  },
  "workflow optimization": {
    "hi": "workflow optimization",
    "gu": "workflow optimization"
  },
  "writing exercises": {
    "hi": "लेखन अभ्यास",
    "gu": "લેખન કસરતો"
  },
  "writing practice": {
    "hi": "लेखन अभ्यास",
    "gu": "લેખન મહાવરો"
  },
  "zoology basics": {
    "hi": "zoology basics",
    "gu": "zoology basics"
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
