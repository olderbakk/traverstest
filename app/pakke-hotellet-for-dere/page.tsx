'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '../components/Header'

export default function PakkeHotelletForDere() {
  const images = [
    { src: '/assets/images/finse1222__242.JPG', alt: 'Hotellet for dere selv' },
    { src: '/assets/images/finse1222__182.JPG', alt: 'Interiør' },
    { src: '/assets/images/tog.png', alt: 'Tog' },
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
                <h1 className="package-title">Hotellet for dere selv</h1>
                <p className="package-tagline">For jubileer, kickoffs og feiringer der dere vil ha Finse 1222 for dere selv</p>
              </div>

              <div className="package-meta">
                <div className="meta-tags">
                  <span className="meta-tag">2-4 netter</span>
                  <span className="meta-tag">Opp til 110 gjester</span>
                  <span className="meta-tag">Eksklusivt</span>
                </div>
              </div>

              <div className="package-description">
                <p>For jubileer, kickoffs og feiringer der dere vil ha Finse 1222 for dere selv. Opplev magien av å ha hele hotellet for deres gruppe.</p>
                <p>Perfekt for større arrangementer hvor dere ønsker privatliv og mulighet til å skape deres helt egen opplevelse.</p>
              </div>

              <div className="package-includes">
                <h3>Dette er inkludert</h3>
                <ul className="includes-list">
                  <li><span className="include-icon">🏨</span><span>Hele hotellet for deres gruppe</span></li>
                  <li><span className="include-icon">🍽️</span><span>Fullpensjon tilpasset deres ønsker</span></li>
                  <li><span className="include-icon">🎉</span><span>Fleksibel arrangementshåndtering</span></li>
                  <li><span className="include-icon">👥</span><span>Dedikert personale</span></li>
                  <li><span className="include-icon">🔥</span><span>Privat bruk av alle fasiliteter</span></li>
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
                <p className="cta-note">Kontakt oss for tilgjengelighet og priser</p>
              </div>
            </div>
          </div>

          <section className="package-itinerary">
            <h2>Eksempel på program</h2>
            <div className="itinerary-grid">
              <div className="itinerary-day">
                <div className="day-header">
                  <span className="day-number">Dag 1</span>
                  <span className="day-title">Ankomst og feiring</span>
                </div>
                <div className="day-timeline">
                  <div className="timeline-item"><span className="timeline-time">14:00</span><div className="timeline-content"><strong>Ankomst Finse</strong><p>Velkomstdrink på perrongen</p></div></div>
                  <div className="timeline-item"><span className="timeline-time">15:00</span><div className="timeline-content"><strong>Innsjekk</strong><p>Hotellet er deres – utforsk fritt</p></div></div>
                  <div className="timeline-item"><span className="timeline-time">17:00</span><div className="timeline-content"><strong>Aktivitet</strong><p>Felles tur eller teambuilding</p></div></div>
                  <div className="timeline-item"><span className="timeline-time">19:30</span><div className="timeline-content"><strong>Gallamiddag</strong><p>Festmåltid med lokale råvarer</p></div></div>
                </div>
              </div>

              <div className="itinerary-day">
                <div className="day-header">
                  <span className="day-number">Dag 2</span>
                  <span className="day-title">Opplevelser</span>
                </div>
                <div className="day-timeline">
                  <div className="timeline-item"><span className="timeline-time">08:00</span><div className="timeline-content"><strong>Frokostbuffet</strong><p>Alt dere trenger for en aktiv dag</p></div></div>
                  <div className="timeline-item"><span className="timeline-time">10:00</span><div className="timeline-content"><strong>Valgfri aktivitet</strong><p>Tur, ski, brevandring eller møte</p></div></div>
                  <div className="timeline-item"><span className="timeline-time">15:00</span><div className="timeline-content"><strong>Badstu og avslapning</strong><p>Tid for ro og restitusjon</p></div></div>
                  <div className="timeline-item"><span className="timeline-time">19:00</span><div className="timeline-content"><strong>Middag og underholdning</strong><p>Kveld tilpasset deres ønsker</p></div></div>
                </div>
              </div>

              <div className="itinerary-day">
                <div className="day-header">
                  <span className="day-number">Dag 3</span>
                  <span className="day-title">Avreise</span>
                </div>
                <div className="day-timeline">
                  <div className="timeline-item"><span className="timeline-time">09:00</span><div className="timeline-content"><strong>Brunch</strong><p>Langsom start med god mat</p></div></div>
                  <div className="timeline-item"><span className="timeline-time">11:00</span><div className="timeline-content"><strong>Siste tur</strong><p>Kort vandring for de som ønsker</p></div></div>
                  <div className="timeline-item"><span className="timeline-time">12:30</span><div className="timeline-content"><strong>Tog hjem</strong><p>Et uforglemmelig opphold er over</p></div></div>
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
