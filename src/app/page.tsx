import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Agenda from '@/components/Agenda';
import Leaders from '@/components/Leaders';
import MeetLeaders from '@/components/MeetLeaders';
import Footprints from '@/components/Footprints';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />
      <Hero />
      <About />
      <Agenda />
      <Leaders />
      <MeetLeaders />
      <Footprints />
      <Footer />
    </main>
  );
}
