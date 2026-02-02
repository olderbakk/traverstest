'use client'

import { useState, useEffect, useRef } from 'react'

export default function TestimonialsSection() {
  const [currentPage, setCurrentPage] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const totalPages = 3

  const testimonials = [
    {
      quote: 'Utrolig bra opplevelse. Vi hadde en intern spørreundersøkelse og turen fikk 5,5 av 6!',
      company: 'Eviny',
      details: 'Teambuilding, 40 personer'
    },
    {
      quote: 'Fantastisk service, nydelig natur, veldig god mat! Beliggenhet midt mellom Bergen og Oslo var perfekt.',
      company: 'Meteorologisk institutt',
      details: 'Konferanse, 29 personer'
    },
    {
      quote: 'Alt fra service, mat, personal og sted var helt suverent. Vi leide hele hotellet – helt magisk.',
      company: 'Verdane',
      details: 'Privat feiring, 110 gjester'
    },
    {
      quote: 'Det at lokasjonen var lukket var en ukjent fordel – alle snakket med hverandre.',
      company: 'Eviny',
      details: 'Firmatur, 40 personer'
    },
    {
      quote: 'Å starte turen i egen leid togvogn var genialt. Kjempe flott hotell med flott natur rundt.',
      company: 'SYSTRA',
      details: 'Julebord, 44 personer'
    }
  ]

  const goToPage = (page: number) => {
    if (page < 0) page = totalPages - 1
    if (page >= totalPages) page = 0
    
    if (trackRef.current) {
      const cards = trackRef.current.querySelectorAll('.testimonial-card')
      if (cards.length > 0) {
        const cardWidth = (cards[0] as HTMLElement).offsetWidth + 16
        const offset = page * cardWidth * 2
        trackRef.current.style.transform = `translateX(-${offset}px)`
      }
    }
    setCurrentPage(page)
  }

  useEffect(() => {
    const handleResize = () => goToPage(currentPage)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [currentPage])

  return (
    <section className="content-section section-testimonials">
      <div className="testimonial-carousel">
        <div className="carousel-track" ref={trackRef}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <blockquote>{testimonial.quote}</blockquote>
              <div className="card-footer">
                <div className="card-author">
                  <span className="author-name">{testimonial.company}</span>
                  <span className="author-role">{testimonial.details}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="carousel-nav">
          <div className="carousel-dots">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentPage ? 'active' : ''}`}
                data-index={index}
                onClick={() => goToPage(index)}
              />
            ))}
          </div>
          <div className="carousel-arrows">
            <button
              className="carousel-arrow carousel-prev"
              aria-label="Forrige"
              onClick={() => goToPage(currentPage - 1)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <button
              className="carousel-arrow carousel-next"
              aria-label="Neste"
              onClick={() => goToPage(currentPage + 1)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
