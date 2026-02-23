'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '../components/Header'

export default function PakkeFokusPaaVidda() {
  const images = [
    { src: '/assets/images/R1-04554-0028.jpg', alt: 'Fokus på vidda' },
    { src: '/assets/images/finse1222__182.JPG', alt: 'Interiør' },
    { src: '/assets/images/tak.png', alt: 'Utsikt' },
    { src: '/assets/images/finse.jpg', alt: 'Finse landskap' },
  ]
  const [activeImage, setActiveImage] = useState(0)

  return (
    <div className="package-page">
      <Header variant="dark" showBackButton={true} />
      
      <main className="package-detail">
        <div className="container">
          <div className="package-layout">
            <div className="package-gallery">
              <div className="gallery-main">
                <img src={images[activeImage].src} alt={images[activeImage].alt} />
              </div>
              <div className="gallery-thumbs">
                {images.map((img, i) => (
                  <button
                    key={i}
                    className={`gallery-thumb ${i === activeImage ? 'gallery-thumb-active' : ''}`}
                    onClick={() => setActiveImage(i)}
                  >
                    <img src={img.src} alt={img.alt} />
                  </button>
                ))}
              </div>
            </div>

            <div className="package-info">
              <div className="package-header">
                <h1 className="package-title">Fokus på vidda</h1>
                <p className="package-tagline">For team som trenger tid til de viktige samtalene – langt unna alt som maser</p>
              </div>

              <div className="package-meta">
                <div className="meta-tags">
                  <span className="meta-tag">2-4 netter</span>
                  <span className="meta-tag">Ledergrupper</span>
                  <span className="meta-tag">Strategi</span>
                </div>
              </div>

              <div className="package-description">
                <p>På Finse er det toget som tar deg frem. Gå på toget i byen, og gå av på vidda. Vi møter deg og din bedrift på perrongen.</p>
                <p>Perfekt for ledergrupper som trenger fokusert tid sammen for strategiske samtaler og viktige beslutninger.</p>
              </div>

              <div className="package-includes">
                <h3>Dette er inkludert</h3>
                <ul className="includes-list">
                  <li><span className="include-icon">🛏️</span><span>Overnatting i komfortable rom</span></li>
                  <li><span className="include-icon">🍽️</span><span>Fullpensjon med god mat</span></li>
                  <li><span className="include-icon">💼</span><span>Møterom og fasiliteter</span></li>
                  <li><span className="include-icon">🔥</span><span>Kvelder ved peisen</span></li>
                </ul>
              </div>

              <div className="package-host">
                <div className="host-avatar">
                  <img src="/assets/images/oss.JPG" alt="Henriette og Daniel" />
                </div>
                <div className="host-info">
                  <span className="host-name">Henriette & Daniel</span>
                  <span className="host-role">Dine verter på Finse 1222</span>
                </div>
              </div>

              <div className="package-cta">
                <Link href="/configurator" className="btn btn-primary btn-large">
                  Start planleggingen
                </Link>
                <p className="cta-note">Vi tilpasser oppholdet etter deres behov</p>
              </div>
            </div>
          </div>

          <section className="package-itinerary">
            <h2>Eksempel på program</h2>
            <div className="itinerary-grid">
              <div className="itinerary-day">
                <div className="day-header">
                  <span className="day-number">Dag 1</span>
                  <span className="day-title">Ankomst og innsjekk</span>
                </div>
                <div className="day-timeline">
                  <div className="timeline-item"><span className="timeline-time">14:00</span><div className="timeline-content"><strong>Ankomst Finse</strong><p>Innsjekk og kaffe i lobbyen</p></div></div>
                  <div className="timeline-item"><span className="timeline-time">15:30</span><div className="timeline-content"><strong>Kort vandring</strong><p>Bli kjent med omgivelsene</p></div></div>
                  <div className="timeline-item"><span className="timeline-time">19:00</span><div className="timeline-content"><strong>Middag</strong><p>Lokal meny med sesongvarer</p></div></div>
                </div>
              </div>

              <div className="itinerary-day">
                <div className="day-header">
                  <span className="day-number">Dag 2</span>
                  <span className="day-title">Fokus og refleksjon</span>
                </div>
                <div className="day-timeline">
                  <div className="timeline-item"><span className="timeline-time">08:00</span><div className="timeline-content"><strong>Frokost</strong><p>Rolig start på dagen</p></div></div>
                  <div className="timeline-item"><span className="timeline-time">09:30</span><div className="timeline-content"><strong>Arbeidsøkt</strong><p>Strategimøte i møterommet</p></div></div>
                  <div className="timeline-item"><span className="timeline-time">12:30</span><div className="timeline-content"><strong>Lunsj og frisk luft</strong><p>Pause med tur på vidda</p></div></div>
                  <div className="timeline-item"><span className="timeline-time">14:30</span><div className="timeline-content"><strong>Arbeidsøkt</strong><p>Oppsummering og veien videre</p></div></div>
                  <div className="timeline-item"><span className="timeline-time">19:00</span><div className="timeline-content"><strong>Middag ved peisen</strong><p>God mat og gode samtaler</p></div></div>
                </div>
              </div>

              <div className="itinerary-day">
                <div className="day-header">
                  <span className="day-number">Dag 3</span>
                  <span className="day-title">Avreise</span>
                </div>
                <div className="day-timeline">
                  <div className="timeline-item"><span className="timeline-time">08:30</span><div className="timeline-content"><strong>Frokost</strong><p>Siste måltid på Finse</p></div></div>
                  <div className="timeline-item"><span className="timeline-time">10:00</span><div className="timeline-content"><strong>Oppsummering</strong><p>Ta med innsiktene hjem</p></div></div>
                  <div className="timeline-item"><span className="timeline-time">12:00</span><div className="timeline-content"><strong>Tog hjem</strong><p>Fornyet energi og klare mål</p></div></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="package-footer">
        <div className="container">
          <div className="footer-simple">
            <p>Finse stasjon, 5765 Finse · post@finse1222.no · +47 56 52 71 00</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
