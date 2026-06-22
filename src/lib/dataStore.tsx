"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface SiteEvent {
  id: string;
  day: string;
  month: string;
  year: string;
  title: string;
  place: string;
  time: string;
  detail: string;
  level: "national" | "state";
  image?: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  type: "image" | "video";
  category: string;
  title: string;
  year: number;
}

export interface NewsItem {
  id: string;
  image: string;
  text: string;
  badge: string;
  author: string;
  role: string;
  date: string;
}

export interface PressRelease {
  id: string;
  date: string;
  title: string;
  category: "press" | "policy" | "organization" | "speech";
}

export interface Supporter {
  id: string;
  name: string;
  email: string;
  phone: string;
  state: string;
  district: string;
  role: "Volunteer" | "Member";
  status: "Active" | "Pending";
  joinedDate: string;
}

export interface Donation {
  id: string;
  name: string;
  amount: number;
  method: "upi" | "card" | "netbanking";
  date: string;
  status: "completed" | "pending" | "failed";
}

// ── Initial Data ─────────────────────────────────────────────────────────────

export const INITIAL_EVENTS: SiteEvent[] = [
  { id: "1", day: "15", month: "JUN", year: "2025", title: "National Executive Meeting", place: "New Delhi", time: "11:00 AM", detail: "Strategic discussion on strengthening organization and future roadmap.", level: "national", image: "/assets/dharna1.jpeg" },
  { id: "2", day: "20", month: "JUN", year: "2025", title: "Farmers' Convention", place: "Lucknow, UP", time: "02:00 PM", detail: "Empowering farmers, discussing issues and sustainable solutions.", level: "state", image: "/assets/dharna3.jpeg" },
  { id: "3", day: "28", month: "JUN", year: "2025", title: "Youth Leadership Summit", place: "Bhopal, MP", time: "10:30 AM", detail: "Inspiring young minds, building leadership for tomorrow.", level: "state", image: "/assets/join.jpg" },
  { id: "4", day: "05", month: "JUL", year: "2025", title: "Public Outreach Program", place: "Patna, Bihar", time: "03:00 PM", detail: "Connecting with communities, listening to people, working for change.", level: "state", image: "/assets/samman-2.jpg" },
  { id: "5", day: "12", month: "JUL", year: "2025", title: "National Council Meeting", place: "New Delhi", time: "11:00 AM", detail: "Reviewing progress and planning next steps for nation-building.", level: "national", image: "/assets/kisan.jpg" },
  { id: "6", day: "18", month: "JUL", year: "2025", title: "Kisan Samman Rally", place: "New Delhi", time: "10:00 AM", detail: "Honouring farmers and discussing national agricultural policy reforms.", level: "national", image: "/assets/dharna5.jpeg" },
  { id: "7", day: "25", month: "JUL", year: "2025", title: "Lokdal Annual Convention", place: "New Delhi", time: "09:30 AM", detail: "Annual gathering of leaders to chart Lokdal's vision for a stronger India.", level: "national", image: "/assets/samman-2.jpg" },
  { id: "8", day: "08", month: "JUL", year: "2025", title: "Gram Vikas Abhiyan", place: "Varanasi, UP", time: "09:00 AM", detail: "Village outreach to understand rural challenges and drive development.", level: "state", image: "/assets/6.jpg" },
];

export const INITIAL_GALLERY: GalleryItem[] = [
  { id: "1", src: "/assets/dharna1.jpeg", type: "image", category: "Dharna Pradershan", title: "Dharna Pradarshan Campaign", year: 2024 },
  { id: "2", src: "/assets/dharna3.jpeg", type: "image", category: "Dharna Pradershan", title: "Farmer Demands Rally", year: 2024 },
  { id: "3", src: "/assets/dharna5.jpeg", type: "image", category: "Karkarta Sambhelan", title: "Karkarta Sammelan Meetup", year: 2024 },
  { id: "4", src: "/assets/kisan.jpg", type: "image", category: "Posters", title: "Kisan Rights Manifesto", year: 2024 },
  { id: "5", src: "/assets/join.jpg", type: "image", category: "Lokdal Jansabha", title: "Lokdal Jansabha", year: 2024 },
  { id: "6", src: "/assets/gallery-5.jpg", type: "image", category: "Lokdal Jansabha", title: "Lokdal Jansabha", year: 2023 },
  { id: "7", src: "/assets/gallery-9.jpg", type: "image", category: "T-20 Championship", title: "T-20 Championship", year: 2023 },
  { id: "8", src: "/assets/gallery head.jpeg", type: "image", category: "Lokdal Haryana President with Anna Hazare", title: "Lokdal Haryana President with Anna Hazare", year: 2023 },
  { id: "9", src: "/assets/hazare1.jpg", type: "image", category: "Lokdal Haryana President with Anna Hazare", title: "Lokdal Haryana President with Anna Hazare", year: 2023 },
  { id: "10", src: "/assets/hazare2.jpg", type: "image", category: "Lokdal Haryana President with Anna Hazare", title: "Lokdal Haryana President with Anna Hazare", year: 2022 },
  { id: "11", src: "/assets/hazare3.jpg", type: "image", category: "Lokdal Haryana President with Anna Hazare", title: "Lokdal Haryana President with Anna Hazare", year: 2022 },
  { id: "12", src: "/assets/delhichalo-16.jpg", type: "image", category: "Delhi Chalo", title: "Delhi Chalo", year: 2022 },
  { id: "13", src: "/assets/samman-2.jpg", type: "image", category: "Posters", title: "Posters", year: 2024 },
  { id: "14", src: "/assets/6.jpg", type: "image", category: "Karkarta Sambhelan", title: "Karkarta Sambhelan", year: 2023 },
  { id: "15", src: "/assets/4.jpg", type: "image", category: "Lokdal Jansabha", title: "Lokdal Jansabha", year: 2022 },
  { id: "16", src: "/assets/3.jpg", type: "image", category: "T-20 Championship", title: "T-20 Championship", year: 2022 },
  { id: "17", src: "/assets/2.jpg", type: "image", category: "Posters", title: "Posters", year: 2022 },
  { id: "18", src: "/assets/delhichalo-9.jpg", type: "image", category: "Delhi Chalo", title: "Delhi Chalo", year: 2022 },
  { id: "19", src: "/assets/delhichalo-12.jpg", type: "image", category: "Delhi Chalo", title: "Delhi Chalo", year: 2022 },
  { id: "20", src: "/assets/dharna6.jpg", type: "image", category: "Dharna Pradershan", title: "Dharna Pradershan", year: 2022 },
  { id: "21", src: "/assets/6 (2).jpg", type: "image", category: "Dharna Pradershan", title: "Dharna Pradershan", year: 2022 },
  { id: "22", src: "/assets/4 (1).jpg", type: "image", category: "Dharna Pradershan", title: "Dharna Pradershan", year: 2022 },
  { id: "23", src: "/assets/2 (1).jpg", type: "image", category: "Dharna Pradershan", title: "Dharna Pradershan", year: 2022 },
  { id: "24", src: "/assets/hazare4.jpg", type: "image", category: "Dharna Pradershan", title: "Dharna Pradershan", year: 2022 },
  { id: "25", src: "/assets/delhichalo-10.jpg", type: "image", category: "Delhi Chalo", title: "Delhi Chalo", year: 2022 },
  { id: "26", src: "/assets/delhichalo-6.jpg", type: "image", category: "Delhi Chalo", title: "Delhi Chalo", year: 2022 },
  { id: "27", src: "/assets/delhichalo-3.jpg", type: "image", category: "Delhi Chalo", title: "Delhi Chalo", year: 2022 },
  { id: "28", src: "/assets/delhichalo-15.jpg", type: "image", category: "Delhi Chalo", title: "Delhi Chalo", year: 2022 },
  { id: "29", src: "/assets/hazare2 (1).jpg", type: "image", category: "Lokdal Haryana President with Anna Hazare", title: "Lokdal Haryana President with Anna Hazare", year: 2022 },
  { id: "v1", src: "/videos/6.mp4", type: "video", category: "Videos", title: "Yuva Hunkar Rally", year: 2024 },
  { id: "v2", src: "/videos/8.mp4", type: "video", category: "Videos", title: "Press Conference Patna", year: 2024 },
  { id: "v3", src: "/videos/10.mp4", type: "video", category: "Videos", title: "National Executive Address", year: 2023 },
  { id: "v4", src: "/videos/14.mp4", type: "video", category: "Videos", title: "Organization Meeting", year: 2023 },
  { id: "v5", src: "/videos/15.mp4", type: "video", category: "Videos", title: "Kisan Mahapanchayat", year: 2024 },
];

export const INITIAL_NEWS: NewsItem[] = [
  { id: "1", image: "/assets/dharna3.jpeg", text: "किसान आंदोलन: किसानों की मांगों को लेकर लोकदल का देशव्यापी प्रदर्शन शुरू।", badge: "लोकदल अपडेट", author: "सुनील सिंह", role: "राष्ट्रीय अध्यक्ष, लोकदल", date: "2026-06-20" },
  { id: "2", image: "/assets/join.jpg", text: "सदस्यता अभियान ने रिकॉर्ड स्तर छुआ, लाखों युवा संगठन से जुड़े।", badge: "प्रेस विज्ञप्ति", author: "सुनील सिंह", role: "राष्ट्रीय अध्यक्ष, लोकदल", date: "2026-06-18" },
];

export const INITIAL_PRESS: PressRelease[] = [
  { id: "1", date: "13-06-2026", title: "Hon'ble Sunil Singh जी की प्रेस वार्ता के मुख्य बिंदु", category: "press" },
  { id: "2", date: "11-06-2026", title: "किसान, युवा और ग्रामीण विकास पर लोकदल की प्राथमिकताएं", category: "policy" },
  { id: "3", date: "10-06-2026", title: "Hon'ble Sunil Singh जी ने केंद्र सरकार की नीतियों पर उठाए प्रश्न", category: "press" },
  { id: "4", date: "09-06-2026", title: "NDA बैठक में लोकदल की अहम प्रस्तावनाएं", category: "policy" },
  { id: "5", date: "08-06-2026", title: "मीडिया के सवालों के जवाब में लोकदल का आधिकारिक बयान", category: "press" },
  { id: "6", date: "07-06-2026", title: "लोकदल की संगठनात्मक बैठक सफलतापूर्वक संपन्न", category: "organization" },
  { id: "7", date: "06-06-2026", title: "दिल्ली अधिवेशन में Sunil Singh जी का प्रेरणादायक संबोधन", category: "speech" },
  { id: "8", date: "05-06-2026", title: "बिहार दौरे पर Hon'ble Sunil Singh जी, कई जनसभाओं को किया संबोधित", category: "speech" },
  { id: "9", date: "02-06-2026", title: "Hon'ble Sunil Singh जी का युवा सम्मेलन को संबोधन", category: "speech" },
];

export const INITIAL_SUPPORTERS: Supporter[] = [
  { id: "1", name: "Rajesh Kumar", email: "rajesh.k@gmail.com", phone: "+91 98100 23412", state: "Uttar Pradesh", district: "Meerut", role: "Volunteer", status: "Active", joinedDate: "2026-06-18" },
  { id: "2", name: "Sunita Chaudhary", email: "sunita.c@yahoo.com", phone: "+91 94520 88219", state: "Haryana", district: "Rohtak", role: "Member", status: "Active", joinedDate: "2026-06-17" },
  { id: "3", name: "Mukesh Yadav", email: "mukesh.yadav@outlook.com", phone: "+91 88229 10452", state: "Bihar", district: "Patna", role: "Volunteer", status: "Pending", joinedDate: "2026-06-20" },
  { id: "4", name: "Anjali Sharma", email: "anjali.sh@gmail.com", phone: "+91 70129 99042", state: "Rajasthan", district: "Jaipur", role: "Member", status: "Active", joinedDate: "2026-06-15" },
  { id: "5", name: "Deepak Tomar", email: "deepak.tomar@gmail.com", phone: "+91 99102 54321", state: "Uttar Pradesh", district: "Aligarh", role: "Volunteer", status: "Pending", joinedDate: "2026-06-19" },
  { id: "6", name: "Preeti Singh", email: "preeti.s@gmail.com", phone: "+91 98765 43210", state: "Uttar Pradesh", district: "Lucknow", role: "Member", status: "Active", joinedDate: "2026-06-14" },
];

export const INITIAL_DONATIONS: Donation[] = [
  { id: "1", name: "Ramesh Kumar", amount: 5000, method: "upi", date: "2026-06-20", status: "completed" },
  { id: "2", name: "Sunita Devi", amount: 1000, method: "card", date: "2026-06-19", status: "completed" },
  { id: "3", name: "Manoj Yadav", amount: 2100, method: "netbanking", date: "2026-06-18", status: "completed" },
  { id: "4", name: "Priya Sharma", amount: 500, method: "upi", date: "2026-06-17", status: "pending" },
  { id: "5", name: "Deepak Tomar", amount: 11000, method: "upi", date: "2026-06-16", status: "completed" },
  { id: "6", name: "Kavita Singh", amount: 21000, method: "netbanking", date: "2026-06-15", status: "completed" },
];

// ── Context ───────────────────────────────────────────────────────────────────

interface DataStore {
  events: SiteEvent[];
  setEvents: (v: SiteEvent[]) => void;
  gallery: GalleryItem[];
  setGallery: (v: GalleryItem[]) => void;
  news: NewsItem[];
  setNews: (v: NewsItem[]) => void;
  press: PressRelease[];
  setPress: (v: PressRelease[]) => void;
  supporters: Supporter[];
  setSupporters: (v: Supporter[]) => void;
  donations: Donation[];
  setDonations: (v: Donation[]) => void;
}

const DataContext = createContext<DataStore | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<SiteEvent[]>(INITIAL_EVENTS);
  const [gallery, setGallery] = useState<GalleryItem[]>(INITIAL_GALLERY);
  const [news, setNews] = useState<NewsItem[]>(INITIAL_NEWS);
  const [press, setPress] = useState<PressRelease[]>(INITIAL_PRESS);
  const [supporters, setSupporters] = useState<Supporter[]>(INITIAL_SUPPORTERS);
  const [donations, setDonations] = useState<Donation[]>(INITIAL_DONATIONS);

  return (
    <DataContext.Provider value={{ events, setEvents, gallery, setGallery, news, setNews, press, setPress, supporters, setSupporters, donations, setDonations }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
