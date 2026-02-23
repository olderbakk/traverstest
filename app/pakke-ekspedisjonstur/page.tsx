'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '../components/Header'

export default function PakkeEkspedisjonstur() {
  const images = [
    { src: '/assets/images/R1 04555 0014.jpg', alt: 'Ekspedisjonstur på Finse' },
    { src: '/assets/images/tur.png', alt: 'På tur' },
    { src: '/assets/images/kart.png', alt: 'Historisk kart' },
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
                <h1 className="package-title">Ekspedisjonstur</h1>
                <p className="package-tagline">Følg i fotsporene til Nansen og Amundsen – på eventyr i Norges villeste natur</p>
              </div>

              <div className="package-meta">
                <div className="meta-tags">
                  <span className="meta-tag">2-4 netter</span>
                  <span className="meta-tag">Eventyr</span>
                  <span className="meta-tag">Friluftsliv</span>
                </div>
              </div>

              <div className="package-description">
                <p>Opplev Hardangervidda på sitt beste. Enten det er ski, brevandring eller Rallarvegen – her skapes minner og sterke bånd mellom kolleger.</p>
                <p>Denne pakken kombinerer fysisk aktivitet med god mat og hyggelige kvelder. Perfekt for team som ønsker opplevelser utenom det vanlige.</p>
              </div>

              <div className="package-includes">
                <h3>Dette er inkludert</h3>
                <ul className="includes-list">
                  <li><span className="include-icon">🛏️</span><span>Overnatting i komfortable rom</span></li>
                  <li><span className="include-icon">🍽️</span><span>Fullpensjon med energirik mat</span></li>
                  <li><span className="include-icon">⛷️</span><span>Guidede turer (ski, bre, eller sykkel)</span></li>
                  <li><span className="include-icon">🎿</span><span>Utstyr kan leies på stedet</span></li>
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
                <p className="cta-note">Vi tilpasser aktivitetene etter sesong og ønsker</p>
              </div>
            </div>
          </div>

          <section className="package-itinerary">
            <h2>Eksempel på program</h2>
            <div className="itinerary-grid">
              <div className="itinerary-day">
                <div className="day-header">
                  <span className="day-number">Dag 1</span>
                  <span className="day-title">Ankomst</span>
                </div>
                <div className="day-timeline">
                  <div className="timeline-item"><span className="timeline-time">14:00</span><div className="timeline-content"><strong>Tog til Finse</strong><p>Nyt turen gjennom fjellet</p></div></div>
                  <div className="timeline-item"><span className="timeline-time">16:00</span><div className="timeline-content"><strong>Innsjekk og briefing</strong><p>Gjennomgang av morgendagens tur</p></div></div>
                  <div className="timeline-item"><span className="timeline-time">19:00</span><div className="timeline-content"><strong>Middag</strong><p>Kraftig og god mat før eventyret</p></div></div>
                </div>
              </div>

              <div className="itinerary-day">
                <div className="day-header">
                  <span className="day-number">Dag 2</span>
                  <span className="day-title">Eventyr på vidda</span>
                </div>
                <div className="day-timeline">
                  <div className="timeline-item"><span className="timeline-time">07:30</span><div className="timeline-content"><strong>Tidlig frokost</strong><p>Energi til dagens tur</p></div></div>
                  <div className="timeline-item"><span className="timeline-time">09:00</span><div className="timeline-content"><strong>Guidet tur</strong><p>Ski, brevandring eller Rallarvegen</p></div></div>
                  <div className="timeline-item"><span className="timeline-time">16:00</span><div className="timeline-content"><strong>Avslapning</strong><p>Velfortjent hvile etter turen</p></div></div>
                  <div className="timeline-item"><span className="timeline-time">19:30</span><div className="timeline-content"><strong>Festmiddag</strong><p>Feiring av dagens bragder</p></div></div>
                </div>
              </div>

              <div className="itinerary-day">
                <div className="day-header">
                  <span className="day-number">Dag 3</span>
                  <span className="day-title">Avreise</span>
                </div>
                <div className="day-timeline">
                  <div className="timeline-item"><span className="timeline-time">09:00</span><div className="timeline-content"><strong>Sen frokost</strong><p>Ta det med ro før hjemreisen</p></div></div>
                  <div className="timeline-item"><span className="timeline-time">11:00</span><div className="timeline-content"><strong>Utsjekk</strong><p>Siste fotostop ved stasjonen</p></div></div>
                  <div className="timeline-item"><span className="timeline-time">12:00</span><div className="timeline-content"><strong>Tog hjem</strong><p>Med gode minner i bagasjen</p></div></div>
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
