'use client';
import AdmissionTimeline from './AdmissionTimeline';
import CaseStudies from './CaseStudies';
import HomeHero from './HomeHero';
import OurServices from './OurServices';
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
    </>
  );
}
