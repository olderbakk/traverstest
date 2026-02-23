'use client'

import { useState } from 'react'

const faqs = [
  {
    question: 'Hvordan kommer vi oss til Finse?',
    answer: 'Finse nås kun med tog. Bergensbanen stopper på Finse stasjon, og hotellet ligger rett ved. Togturen fra Bergen tar ca. 2,5 timer og fra Oslo ca. 4,5 timer.'
  },
  {
    question: 'Hvor mange gjester kan dere ta imot?',
    answer: 'Vi har plass til opptil 110 gjester. Hotellet kan også bookes eksklusivt for deres gruppe, slik at dere får hele Finse 1222 for dere selv.'
  },
  {
    question: 'Hvilken tid på året er best for bedriftsopphold?',
    answer: 'Finse er fantastisk hele året. Vinteren byr på ski, truger og nordlys. Sommeren gir midnattssol, sykling på Rallarvegen og brevandring. Høsten er rolig og perfekt for fokus.'
  },
  {
    question: 'Har dere møterom og fasiliteter for seminarer?',
    answer: 'Ja, vi har flere rom som kan tilpasses møter, workshops og presentasjoner. Vi har prosjektor, whiteboard og god wifi. Rommene har utsikt over vidda.'
  },
  {
    question: 'Hva er inkludert i oppholdet?',
    answer: 'Alle opphold inkluderer overnatting, frokost, lunsj og middag med lokale råvarer. Aktiviteter og spesielle arrangementer kan skreddersys etter behov.'
  },
  {
    question: 'Kan vi tilpasse programmet?',
    answer: 'Absolutt. Vi skreddersyr oppholdet basert på deres ønsker og behov. Bruk konfiguratoren vår eller ta kontakt direkte, så lager vi et forslag sammen.'
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="content-section section-faq">
      <div className="container">
        <div className="faq-layout">
          <div className="faq-header">
            <h2 className="faq-title">Disse spørsmålene<br />dukker gjerne opp.</h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${openIndex === index ? 'faq-item-open' : ''}`}
              >
                <button className="faq-question" onClick={() => toggle(index)}>
                  <span>{faq.question}</span>
                  <span className="faq-icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      {openIndex === index
                        ? <path d="M4 8h8" />
                        : <><path d="M4 8h8" /><path d="M8 4v8" /></>
                      }
                    </svg>
                  </span>
                </button>
                {openIndex === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                    <div className="faq-avatar">
                      <img src="/assets/images/oss.JPG" alt="Henriette" className="faq-avatar-img" />
                      <div className="faq-avatar-info">
                        <span className="faq-avatar-name">Henriette</span>
                        <span className="faq-avatar-email">henriette@finse1222.no</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
