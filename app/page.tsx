'use client'

import Link from 'next/link'
import Header from './components/Header'
import Hero from './components/Hero'
import ContentSections from './components/ContentSections'
import PackagesSection from './components/PackagesSection'
import TestimonialsSection from './components/TestimonialsSection'
import TeamSection from './components/TeamSection'
import Footer from './components/Footer'
import FAQSection from './components/FAQSection'

export default function Home() {
  return (
    <div className="landing-page">
      <Header />
      {/* <Hero /> */}
      {/* <ContentSections /> */}
      <PackagesSection />
      <TestimonialsSection />
      <TeamSection />
      <FAQSection />
      {/* <Footer /> */}
    </div>
  )
}
