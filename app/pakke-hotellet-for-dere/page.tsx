import Link from 'next/link'
import Header from '../components/Header'

export default function PakkeHotelletForDere() {
  return (
    <div className="package-page">
      <Header variant="dark" showBackButton={true} />
      
      <main className="package-detail">
        <div className="container">
          <div className="package-layout">
            <div className="package-gallery">
              <div className="gallery-grid">
                <div className="gallery-item gallery-large">
                  <img src="/assets/images/finse1222__242.JPG" alt="Hotellet for dere selv" />
                </div>
                <div className="gallery-item">
                  <img src="/assets/images/finse1222__182.JPG" alt="Interiør" />
                </div>
                <div className="gallery-item">
                  <img src="/assets/images/tog.png" alt="Tog" />
                </div>
                <div className="gallery-item">
                  <img src="/assets/images/finse.jpg" alt="Finse landskap" />
                </div>
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
                  <li><span className="include-icon">🚂</span><span>Togtur fra Oslo eller Bergen</span></li>
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
