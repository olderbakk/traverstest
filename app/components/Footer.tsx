import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer-epic">
      <div className="footer-bg" style={{ backgroundImage: "url('/assets/images/image.png')" }}></div>
      <div className="footer-overlay"></div>
      <div className="container footer-container">
        <div className="footer-tagline">
          <h2>"[...] da siver noget av det ægte, uforfalskede høyfjellstemning inn i sindene"</h2>
          <p className="footer-quote-source">– Edvard Welle-Strand, 1914, om peisen på Finse 1222</p>
        </div>
        <div className="footer-bottom">
          <div className="footer-contact">
            <p>Finse stasjon, 5765 Finse</p>
            <p>post@finse1222.no · +47 56 52 71 00</p>
          </div>
          <div className="footer-cta">
            <Link href="/configurator" className="footer-nav-btn">
              Planlegg opphold
            </Link>
          </div>
          <div className="footer-social">
            <a href="#" className="footer-social-link">Instagram</a>
            <a href="#" className="footer-social-link">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
