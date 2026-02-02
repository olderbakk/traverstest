import Link from 'next/link'
import Header from '../components/Header'

export default function PakkeFokusPaaVidda() {
  return (
    <div className="package-page">
      <Header variant="dark" showBackButton={true} />
      
      <main className="package-detail">
        <div className="container">
          <div className="package-layout">
            <div className="package-gallery">
              <div className="gallery-grid">
                <div className="gallery-item gallery-large">
                  <img src="/assets/images/R1-04554-0028.jpg" alt="Fokus på vidda" />
                </div>
                <div className="gallery-item">
                  <img src="/assets/images/finse1222__182.JPG" alt="Interiør" />
                </div>
                <div className="gallery-item">
                  <img src="/assets/images/tak.png" alt="Utsikt" />
                </div>
                <div className="gallery-item">
                  <img src="/assets/images/finse.jpg" alt="Finse landskap" />
                </div>
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
                  <li><span className="include-icon">🚂</span><span>Togtur fra Oslo eller Bergen</span></li>
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
