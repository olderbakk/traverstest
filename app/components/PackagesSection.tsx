import Link from 'next/link'

export default function PackagesSection() {
  const packages = [
    {
      href: '/pakke-fokus-paa-vidda',
      image: '/assets/images/R1-04554-0028.jpg',
      tag: 'Ledergrupper',
      title: 'Fokus på vidda',
      description: 'For team som trenger tid til de viktige samtalene – langt unna alt som maser.',
      linkText: 'Mer info'
    },
    {
      href: '/pakke-ekspedisjonstur',
      image: '/assets/images/R1 04555 0014.jpg',
      tag: 'Eventyr',
      title: 'Ekspedisjonstur',
      description: 'Dager fulle av turer, ski eller Rallarvegen – og kveldene foran peisen.',
      linkText: 'Mer info'
    },
    {
      href: '/pakke-hotellet-for-dere',
      image: '/assets/images/finse1222__242.JPG',
      tag: 'Opp til 110 gjester',
      title: 'Hotellet for dere selv',
      description: 'For jubileer, kickoffs og feiringer der dere vil ha Finse 1222 for dere selv.',
      linkText: 'Mer info'
    },
    {
      href: '/configurator',
      image: '/assets/images/finse.jpg',
      tag: 'Lag ditt eget',
      title: 'Skreddersøm',
      description: 'Har du andre ønsker? Vi hjelper deg å skape det perfekte oppholdet.',
      linkText: 'Start planleggingen',
      isCustom: true
    }
  ]

  return (
    <section className="content-section section-packages">
      <div className="container">
        <h2 className="packages-title">Finn pakken som passer deres opphold</h2>
        <div className="packages-grid">
          {packages.map((pkg, index) => (
            <Link
              key={index}
              href={pkg.href}
              className={`package-card ${pkg.isCustom ? 'package-card-custom' : ''}`}
            >
              <div className="package-image">
                <img src={pkg.image} alt={pkg.title} />
                <div className="package-gradient"></div>
              </div>
              <span className="package-tag">{pkg.tag}</span>
              <div className="package-content">
                <h3 className="package-name">{pkg.title}</h3>
                <p className="package-copy">{pkg.description}</p>
                <span className="package-link">{pkg.linkText}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
