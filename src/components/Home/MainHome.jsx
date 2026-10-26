'use client';
import AdmissionTimeline from './AdmissionTimeline';
import CaseStudies from './CaseStudies';
import FaqSection from './FaqSection';
import HomeHero from './HomeHero';
import OurServices from './OurServices';
import TeamSection from './TeamSection';
import Testimonials from './Testmonials';
import WhyMediagarh from './Whymediagarh';

export default function MainHome() {
  return (
    <>
      <HomeHero />
      <CaseStudies />
      <OurServices />
      <Testimonials />
      <AdmissionTimeline />
      <WhyMediagarh />
      <TeamSection />
      <FaqSection />
    </>
  );
}
