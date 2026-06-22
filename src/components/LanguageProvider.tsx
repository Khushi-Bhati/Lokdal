"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type LanguageCode = "en" | "hi";

type LanguageOption = {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
  shortLabel: string;
};

type LanguageContextValue = {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  options: LanguageOption[];
};

const STORAGE_KEY = "lokdal-language";

export const languageOptions: LanguageOption[] = [
  { code: "en", label: "English", nativeLabel: "English", shortLabel: "EN" },
  { code: "hi", label: "Hindi", nativeLabel: "हिंदी", shortLabel: "HI" },
];

const translations: Record<string, Record<LanguageCode, string>> = {
  "लोकदल": { en: "Lokdal", hi: "लोकदल" },
  "परिवर्तन है, विकल्प है": { en: "Change is here, Lokdal is the alternative", hi: "परिवर्तन है, विकल्प है" },
  "होम": { en: "Home", hi: "होम" },
  "लोकदल के बारे में": { en: "About Lokdal", hi: "लोकदल के बारे में" },
  "कार्यक्रम": { en: "Events", hi: "कार्यक्रम" },
  "संगठन": { en: "Organization", hi: "संगठन" },
  "विचारधारा": { en: "Ideology", hi: "विचारधारा" },
  "समाज के मुद्दे": { en: "Social Issues", hi: "समाज के मुद्दे" },
  "दान करें": { en: "Donate", hi: "दान करें" },
  "Join Lokdal": { en: "Join Lokdal", hi: "लोकदल से जुड़ें" },
  "परिवर्तन है, विकल्प है लोकदल": { en: "Change is here, Lokdal is the alternative", hi: "परिवर्तन है, विकल्प है लोकदल" },
  "शिक्षा का अधिकार": { en: "Right to Education", hi: "शिक्षा का अधिकार" },
  "भ्रष्टाचार का विरोध": { en: "Against Corruption", hi: "भ्रष्टाचार का विरोध" },
  "किसान का सम्मान": { en: "Respect for Farmers", hi: "किसान का सम्मान" },
  "समाज का उत्थान": { en: "Social Upliftment", hi: "समाज का उत्थान" },
  "हमारे साथ जुड़ें": { en: "Join Us", hi: "हमारे साथ जुड़ें" },
  "Join Us": { en: "Join Us", hi: "हमारे साथ जुड़ें" },
  "Be a part of the movement for positive change.": { en: "Be a part of the movement for positive change.", hi: "सकारात्मक परिवर्तन के आंदोलन का हिस्सा बनें।" },
  "Join the Organization": { en: "Join the Organization", hi: "संगठन से जुड़ें" },
  "Connect with the team": { en: "Connect with the team", hi: "टीम से जुड़ें" },
  "Become a Member": { en: "Become a Member", hi: "सदस्य बनें" },
  "Member of Lokdal": { en: "Member of Lokdal", hi: "लोकदल के सदस्य" },
  "Empower Youth": { en: "Empower Youth", hi: "युवा सशक्तिकरण" },
  "Walk with the youth": { en: "Walk with the youth", hi: "युवाओं के साथ चलें" },
  "Strengthen Org": { en: "Strengthen Org", hi: "संगठन मजबूत करें" },
  "For society & change": { en: "For society & change", hi: "समाज और बदलाव के लिए" },
  "Join Now": { en: "Join Now", hi: "अभी जुड़ें" },
  "Support for Change": { en: "Support for Change", hi: "बदलाव के लिए समर्थन" },
  "Your support gives strength to public welfare work.": { en: "Your support gives strength to public welfare work.", hi: "आपका सहयोग जनकल्याण कार्यों को शक्ति देता है।" },
  "Public Campaigns": { en: "Public Campaigns", hi: "जन अभियान" },
  "Raising voice for issues": { en: "Raising voice for issues", hi: "मुद्दों के लिए आवाज उठाना" },
  "Rural Development": { en: "Rural Development", hi: "ग्रामीण विकास" },
  "Building villages": { en: "Building villages", hi: "गांवों का निर्माण" },
  "Youth & Education": { en: "Youth & Education", hi: "युवा और शिक्षा" },
  "New thinking, bright future": { en: "New thinking, bright future", hi: "नई सोच, उज्ज्वल भविष्य" },
  "Accountability": { en: "Accountability", hi: "जवाबदेही" },
  "Contribution with honesty": { en: "Contribution with honesty", hi: "ईमानदारी से योगदान" },
  "Donate Now": { en: "Donate Now", hi: "अभी दान करें" },
  "हर बच्चे को बेहतर शिक्षा": { en: "Better education for every child", hi: "हर बच्चे को बेहतर शिक्षा" },
  "किसानों के साथ, किसानों के लिए": { en: "With farmers, for farmers", hi: "किसानों के साथ, किसानों के लिए" },
  "समानता, न्याय और विकास": { en: "Equality, justice and development", hi: "समानता, न्याय और विकास" },
  "स्वच्छ राजनीति, साफ प्रशासन": { en: "Clean politics, transparent governance", hi: "स्वच्छ राजनीति, साफ प्रशासन" },
  "मुख्य गतिविधियों": { en: "Main Activities", hi: "मुख्य गतिविधियों" },
  "सभी देखें": { en: "View All", hi: "सभी देखें" },
  "ताजा": { en: "Latest", hi: "ताजा" },
  "जनसभा/सम्मेलन कार्यक्रम": { en: "Public Meetings / Conferences", hi: "जनसभा/सम्मेलन कार्यक्रम" },
  "समारोह/पुरस्कार वितरण": { en: "Ceremony / Award Distribution", hi: "समारोह/पुरस्कार वितरण" },
  "और जानें": { en: "Learn More", hi: "और जानें" },
  "श्री सुनील सिंह": { en: "Shri Sunil Singh", hi: "श्री सुनील सिंह" },
  "राष्ट्रीय अध्यक्ष, लोकदल": { en: "National President, Lokdal", hi: "राष्ट्रीय अध्यक्ष, लोकदल" },
  "समर्थक": { en: "Supporters", hi: "समर्थक" },
  "जिले में सक्रिय": { en: "Active Districts", hi: "जिले में सक्रिय" },
  "संगठन इकाईयों": { en: "Organization Units", hi: "संगठन इकाईयों" },
  "जन कल्याण कार्यक्रम": { en: "Public Welfare Programs", hi: "जन कल्याण कार्यक्रम" },
  "वर्ष का जनसेवा अनुभव": { en: "Years of Public Service", hi: "वर्ष का जनसेवा अनुभव" },
  "Recent Activities": { en: "Recent Activities", hi: "हाल की गतिविधियां" },
  "Dharna Pradershan": { en: "Dharna Pradarshan", hi: "धरना प्रदर्शन" },
  "By Chaudhary Sunil Singh": { en: "By Chaudhary Sunil Singh", hi: "चौधरी सुनील सिंह द्वारा" },
  "Cash Prize Distribution": { en: "Cash Prize Distribution", hi: "नकद पुरस्कार वितरण" },
  "Cricket Match": { en: "Cricket Match", hi: "क्रिकेट मैच" },
  "Our Inspiration": { en: "Our Inspiration", hi: "हमारी प्रेरणा" },
  "Choudhary Charan Singh": { en: "Chaudhary Charan Singh", hi: "चौधरी चरण सिंह" },
  "Choudhary Sunil Singh": { en: "Chaudhary Sunil Singh", hi: "चौधरी सुनील सिंह" },
  "About Lokdal": { en: "About Lokdal", hi: "लोकदल के बारे में" },
  "Presently senior social activist and politician Mr. Sunil Singh Ji is its national president, who is born in a patriotic elite family in Aligarh district of Uttar Pradesh. Mr. Sunil Singh has graduated in Engineering and Masters in Management. Mr. Sunil Singh has also been a member of Uttar Pradesh Legislative Council.": { en: "Presently senior social activist and politician Mr. Sunil Singh Ji is its national president, who was born in a patriotic family in Aligarh district of Uttar Pradesh. Mr. Sunil Singh graduated in Engineering and holds a Masters in Management. He has also been a member of the Uttar Pradesh Legislative Council.", hi: "वर्तमान में वरिष्ठ सामाजिक कार्यकर्ता और राजनेता श्री सुनील सिंह जी इसके राष्ट्रीय अध्यक्ष हैं। उनका जन्म उत्तर प्रदेश के अलीगढ़ जिले के एक देशभक्त परिवार में हुआ। वे इंजीनियरिंग स्नातक और प्रबंधन में परास्नातक हैं तथा उत्तर प्रदेश विधान परिषद के सदस्य भी रहे हैं।" },
  "Top Profiles": { en: "Top Profiles", hi: "प्रमुख प्रोफाइल" },
  "Choudhary Rajinder Singh": { en: "Chaudhary Rajinder Singh", hi: "चौधरी राजिंदर सिंह" },
  "Stay connected": { en: "Stay Connected", hi: "जुड़े रहें" },
  "Today's Pick": { en: "Today's Pick", hi: "आज की पसंद" },
  "Meet Our Leaders": { en: "Meet Our Leaders", hi: "हमारे नेताओं से मिलें" },
  "Dedicated leaders working day and night for the welfare of farmers, youth, and every citizen together, we are building a stronger, self-reliant and progressive India": { en: "Dedicated leaders working day and night for the welfare of farmers, youth, and every citizen. Together, we are building a stronger, self-reliant and progressive India.", hi: "किसानों, युवाओं और हर नागरिक के कल्याण के लिए दिन-रात काम करने वाले समर्पित नेता। हम मिलकर एक मजबूत, आत्मनिर्भर और प्रगतिशील भारत बना रहे हैं।" },
  "View All Leaders": { en: "View All Leaders", hi: "सभी नेता देखें" },
  "Founder & Inspiration": { en: "Founder & Inspiration", hi: "संस्थापक और प्रेरणा" },
  "National President": { en: "National President", hi: "राष्ट्रीय अध्यक्ष" },
  "National General Secretary": { en: "National General Secretary", hi: "राष्ट्रीय महासचिव" },
  "National Vice President": { en: "National Vice President", hi: "राष्ट्रीय उपाध्यक्ष" },
  "National Secretary": { en: "National Secretary", hi: "राष्ट्रीय सचिव" },
  "Footprints of Lokdal": { en: "Footprints of Lokdal", hi: "लोकदल की पहुंच" },
  "Footprints of": { en: "Footprints of", hi: "की पहुंच" },
  "A strong presence across India, working for people, for progress and for a better tomorrow.": { en: "A strong presence across India, working for people, for progress and for a better tomorrow.", hi: "पूरे भारत में मजबूत उपस्थिति, लोगों, प्रगति और बेहतर कल के लिए कार्यरत।" },
  "Districts": { en: "Districts", hi: "जिले" },
  "Active Presence": { en: "Active Presence", hi: "सक्रिय उपस्थिति" },
  "Blocks": { en: "Blocks", hi: "ब्लॉक" },
  "Our Reach": { en: "Our Reach", hi: "हमारी पहुंच" },
  "Active Workers": { en: "Active Workers", hi: "सक्रिय कार्यकर्ता" },
  "Strong Organization": { en: "Strong Organization", hi: "मजबूत संगठन" },
  "Years": { en: "Years", hi: "वर्ष" },
  "Of Public Service": { en: "Of Public Service", hi: "जनसेवा के" },
  "At National Level": { en: "At National Level", hi: "राष्ट्रीय स्तर पर" },
  "National Level": { en: "National Level", hi: "राष्ट्रीय स्तर" },
  "In States": { en: "In States", hi: "राज्यों में" },
  "Nationwide Presence": { en: "Nationwide Presence", hi: "देशव्यापी उपस्थिति" },
  "Working in every region, every community.": { en: "Working in every region, every community.", hi: "हर क्षेत्र और हर समुदाय में कार्यरत।" },
  "People First Approach": { en: "People First Approach", hi: "जन प्रथम दृष्टिकोण" },
  "Policies and programs focused on people's welfare.": { en: "Policies and programs focused on people's welfare.", hi: "लोगों के कल्याण पर केंद्रित नीतियां और कार्यक्रम।" },
  "Strong Grassroots Network": { en: "Strong Grassroots Network", hi: "मजबूत जमीनी नेटवर्क" },
  "From village to nation, we stand together.": { en: "From village to nation, we stand together.", hi: "गांव से राष्ट्र तक, हम साथ खड़े हैं।" },
  "Commitment to Change": { en: "Commitment to Change", hi: "बदलाव के लिए प्रतिबद्धता" },
  "Dedicated to building an inclusive and progressive India.": { en: "Dedicated to building an inclusive and progressive India.", hi: "समावेशी और प्रगतिशील भारत के निर्माण के लिए समर्पित।" },
  "Upcoming Events": { en: "Upcoming Events", hi: "आगामी कार्यक्रम" },
  "Join us in our journey towards a stronger, self-reliant and progressive India.": { en: "Join us in our journey towards a stronger, self-reliant and progressive India.", hi: "मजबूत, आत्मनिर्भर और प्रगतिशील भारत की यात्रा में हमारे साथ जुड़ें।" },
  "Stay Updated": { en: "Stay Updated", hi: "अपडेट रहें" },
  "Don't miss important events. Be a part of the movement.": { en: "Don't miss important events. Be a part of the movement.", hi: "महत्वपूर्ण कार्यक्रमों को न छोड़ें। आंदोलन का हिस्सा बनें।" },
  "National Executive Meeting": { en: "National Executive Meeting", hi: "राष्ट्रीय कार्यकारिणी बैठक" },
  "Farmers' Convention": { en: "Farmers' Convention", hi: "किसान सम्मेलन" },
  "Youth Leadership Summit": { en: "Youth Leadership Summit", hi: "युवा नेतृत्व शिखर सम्मेलन" },
  "Public Outreach Program": { en: "Public Outreach Program", hi: "जनसंपर्क कार्यक्रम" },
  "National Council Meeting": { en: "National Council Meeting", hi: "राष्ट्रीय परिषद बैठक" },
  "New Delhi": { en: "New Delhi", hi: "नई दिल्ली" },
  "Lucknow, UP": { en: "Lucknow, UP", hi: "लखनऊ, उत्तर प्रदेश" },
  "Bhopal, MP": { en: "Bhopal, MP", hi: "भोपाल, मध्य प्रदेश" },
  "Patna, Bihar": { en: "Patna, Bihar", hi: "पटना, बिहार" },
  "Strategic discussion on strengthening organization and future roadmap.": { en: "Strategic discussion on strengthening organization and future roadmap.", hi: "संगठन को मजबूत करने और भविष्य की रूपरेखा पर रणनीतिक चर्चा।" },
  "Empowering farmers, discussing issues and sustainable solutions.": { en: "Empowering farmers, discussing issues and sustainable solutions.", hi: "किसानों को सशक्त बनाना, मुद्दों और स्थायी समाधानों पर चर्चा।" },
  "Inspiring young minds, building leadership for tomorrow.": { en: "Inspiring young minds, building leadership for tomorrow.", hi: "युवा सोच को प्रेरित करना और कल का नेतृत्व बनाना।" },
  "Connecting with communities, listening to people, working for change.": { en: "Connecting with communities, listening to people, working for change.", hi: "समुदायों से जुड़ना, लोगों को सुनना और बदलाव के लिए काम करना।" },
  "Reviewing progress and planning next steps for nation-building.": { en: "Reviewing progress and planning next steps for nation-building.", hi: "प्रगति की समीक्षा और राष्ट्र निर्माण के अगले कदमों की योजना।" },
  "View Details": { en: "View Details", hi: "विवरण देखें" },
  "Be a Part of Change": { en: "Be a Part of Change", hi: "बदलाव का हिस्सा बनें" },
  "Your participation can build a stronger and better India for generations to come.": { en: "Your participation can build a stronger and better India for generations to come.", hi: "आपकी भागीदारी आने वाली पीढ़ियों के लिए एक मजबूत और बेहतर भारत बना सकती है।" },
  "View All Events": { en: "View All Events", hi: "सभी कार्यक्रम देखें" },
  "Our Achievement": { en: "Our Achievement", hi: "हमारी उपलब्धियां" },
  "Our commitment to public welfare, farmers, youth, and grassroots development continues to create measurable impact across India.": { en: "Our commitment to public welfare, farmers, youth, and grassroots development continues to create measurable impact across India.", hi: "जनकल्याण, किसानों, युवाओं और जमीनी विकास के प्रति हमारी प्रतिबद्धता पूरे भारत में स्पष्ट प्रभाव पैदा कर रही है।" },
  "Districts Reached": { en: "Districts Reached", hi: "जिलों तक पहुंच" },
  "Public Meetings Conducted": { en: "Public Meetings Conducted", hi: "जनसभाएं आयोजित" },
  "Farmers Benefited": { en: "Farmers Benefited", hi: "लाभान्वित किसान" },
  "Youth Volunteers": { en: "Youth Volunteers", hi: "युवा स्वयंसेवक" },
  "Organized National Farmers Convention": { en: "Organized National Farmers Convention", hi: "राष्ट्रीय किसान सम्मेलन आयोजित" },
  "Expanded presence in 20+ districts": { en: "Expanded presence in 20+ districts", hi: "20+ जिलों में उपस्थिति बढ़ाई" },
  "Youth Leadership Campaign launched": { en: "Youth Leadership Campaign launched", hi: "युवा नेतृत्व अभियान शुरू" },
  "Public welfare initiatives across multiple states": { en: "Public welfare initiatives across multiple states", hi: "कई राज्यों में जनकल्याण पहल" },
  "Membership drive crossed major milestone": { en: "Membership drive crossed major milestone", hi: "सदस्यता अभियान ने बड़ा मील का पत्थर पार किया" },
  "State-level organizational expansion": { en: "State-level organizational expansion", hi: "राज्य स्तर पर संगठन विस्तार" },
  "Farmers Welfare": { en: "Farmers Welfare", hi: "किसान कल्याण" },
  "Education Support": { en: "Education Support", hi: "शिक्षा सहायता" },
  "Social Welfare": { en: "Social Welfare", hi: "सामाजिक कल्याण" },
  "Grassroots Development": { en: "Grassroots Development", hi: "जमीनी विकास" },
  "Supporting farmers through awareness campaigns and policy advocacy.": { en: "Supporting farmers through awareness campaigns and policy advocacy.", hi: "जागरूकता अभियानों और नीति वकालत के माध्यम से किसानों का समर्थन।" },
  "Scholarships, awareness programs, and youth development initiatives.": { en: "Scholarships, awareness programs, and youth development initiatives.", hi: "छात्रवृत्ति, जागरूकता कार्यक्रम और युवा विकास पहल।" },
  "Community outreach and public welfare activities across regions.": { en: "Community outreach and public welfare activities across regions.", hi: "क्षेत्रों में सामुदायिक पहुंच और जनकल्याण गतिविधियां।" },
  "Strengthening local leadership and organizational networks.": { en: "Strengthening local leadership and organizational networks.", hi: "स्थानीय नेतृत्व और संगठनात्मक नेटवर्क को मजबूत करना।" },
  "Stay updated with our latest campaigns and events across the state.": { en: "Stay updated with our latest campaigns and events across the state.", hi: "राज्य भर में हमारे नवीनतम अभियानों और कार्यक्रमों से अपडेट रहें।" },
  "Read More": { en: "Read More", hi: "और पढ़ें" },
  "Quick Links": { en: "Quick Links", hi: "त्वरित लिंक" },
  "Important Links": { en: "Important Links", hi: "महत्वपूर्ण लिंक" },
  "Contact Us": { en: "Contact Us", hi: "संपर्क करें" },
  "Our Activities": { en: "Our Activities", hi: "हमारी गतिविधियां" },
  "Our Leaders": { en: "Our Leaders", hi: "हमारे नेता" },
  "Join as Member": { en: "Join as Member", hi: "सदस्य बनें" },
  "Become a Volunteer": { en: "Become a Volunteer", hi: "स्वयंसेवक बनें" },
  "Media Gallery": { en: "Media Gallery", hi: "मीडिया गैलरी" },
  "Press Releases": { en: "Press Releases", hi: "प्रेस विज्ञप्ति" },
  "All Rights Reserved.": { en: "All Rights Reserved.", hi: "सर्वाधिकार सुरक्षित।" },
  "Privacy Policy": { en: "Privacy Policy", hi: "गोपनीयता नीति" },
  "Terms of Service": { en: "Terms of Service", hi: "सेवा की शर्तें" },
};

const translationLookup = new Map<string, Record<LanguageCode, string>>();

Object.values(translations).forEach((entry) => {
  translationLookup.set(entry.en, entry);
  translationLookup.set(entry.hi, entry);
});

Object.entries(translations).forEach(([source, entry]) => {
  translationLookup.set(source, entry);
});

const LanguageContext = createContext<LanguageContextValue | null>(null);

function translateText(text: string, language: LanguageCode) {
  const trimmed = text.trim();
  if (!trimmed) return text;
  const entry = translationLookup.get(trimmed);
  if (!entry) return text;
  return text.replace(trimmed, entry[language]);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("en");

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(STORAGE_KEY);
    if (savedLanguage === "en" || savedLanguage === "hi") {
      queueMicrotask(() => setLanguageState(savedLanguage));
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const setLanguage = useCallback((nextLanguage: LanguageCode) => {
    setLanguageState(nextLanguage);
  }, []);

  const value = useMemo(
    () => ({ language, setLanguage, options: languageOptions }),
    [language, setLanguage]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}

export function useTranslation() {
  const { language } = useLanguage();
  const t = useCallback((text: string) => translateText(text, language), [language]);
  return { t, language };
}
