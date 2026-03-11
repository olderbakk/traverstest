'use client'

import { useEffect, useState } from 'react'
import './reise.css'

const ACTIVITY_DATA: Record<string, { bilde: string; desc: string }> = {
  'Guidet tur på vidda':    { bilde: '/assets/images/Finse_pakker00007.jpg', desc: 'Utforsk Hardangervidda med lokal guide. Hotellet inkluderer guide, kart og termos-lunsj underveis. En opplevelse som gir perspektiv – på naturen og på hverandre.' },
  'Skitur':                 { bilde: '/assets/images/Finse_pakker00002.jpg', desc: 'Løypene starter rett utenfor døren. Hotellet låner ut ski og staver, og pakker sekken for dere om dere ønsker det. Ingen logistikk – bare frisk luft fra første steg.' },
  'Sykling på Rallarvegen': { bilde: '/assets/images/Finse_pakker00004.jpg', desc: 'En ikonisk rute med dramatisk fjelllandskap. Hotellet ordner sykkel, hjelm og ruteplanlegging tilpasset gruppen. Mestring og snakkestoff garantert.' },
  'Breføring':              { bilde: '/assets/images/Finse_pakker00005.jpg', desc: 'Gå på Hardangerjøkulen med erfarne guidere. Hotellet inkluderer guide, brodder og sikringsutstyr. En aktivitet som løfter turen fra hyggelig til uforglemmelig.' },
  'Astrokveld':             { bilde: '/assets/images/Finse_configurator_background.jpg', desc: 'Stjernehimmel langt fra bylys. Hotellet serverer varm drikke og stiller med kikkert og stjernekart. Et naturlig rom for gode samtaler.' },
  'Historiestund':          { bilde: '/assets/images/Finse_pakker00010.jpg', desc: 'Finses historie – fra polfarere til filminnspillinger – fortalt rundt bålet. Hotellet arrangerer guidet fortelling med noe varmt å drikke. Gir reisen et felles ankerpunkt.' },
  'Vinsmaking':             { bilde: '/assets/images/mat_finse.jpg', desc: 'Kurerte viner med historiene bak glasset, ledet av hotellets personale. Inkluderer smaksprøver og småretter. En avslappet avslutning på dagen.' },
}

interface TripData {
  id: string
  anledning: string
  moterom: boolean
  moteromVarighet: string
  dato: string
  varighet: string
  antall: string
  romtype: string
  dagAktiviteter: string[]
  kveldAktiviteter: string[]
  navn: string
  bedrift: string
  epost: string
  telefon: string
  merknad: string
  createdAt: string
}

export default function ReisePage() {
  const [data, setData] = useState<TripData | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')
    if (!id) return
    const raw = localStorage.getItem(id)
    if (raw) {
      try { setData(JSON.parse(raw)) } catch { /* noop */ }
    }
  }, [])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  if (!data) {
    return (
      <div className="reise-page">
        <div className="reise-empty">
          <h1 className="reise-empty-title">Reisen ble ikke funnet</h1>
          <p className="reise-empty-text">Lenken kan ha utløpt eller data er slettet fra nettleseren.</p>
          <a href="/configurator" className="reise-btn reise-btn--dark">Start ny konfigurasjon</a>
        </div>
      </div>
    )
  }

  const aktiviteter = [...(data.dagAktiviteter || []), ...(data.kveldAktiviteter || [])].filter(Boolean)

  const details: { label: string; value: string }[] = [
    { label: 'Anledning',  value: data.anledning },
    { label: 'Dato',       value: data.dato },
    { label: 'Deltakere',  value: data.antall },
    { label: 'Møterom',    value: data.moterom ? (data.moteromVarighet || 'Inkludert') : '' },
  ].filter(d => d.value)

  return (
    <div className="reise-page">

      {/* ── Hero ── */}
      <section className="reise-hero">
        <img src="/assets/images/finse.jpg" alt="Finse 1222" className="reise-hero-img" />
        <div className="reise-hero-overlay" />
        <nav className="reise-hero-nav">
          <a href="/" className="reise-logo-link">
            <img src="/assets/logo/logo.png" alt="Hotel Finse 1222" className="reise-logo-img" />
          </a>
        </nav>
        <div className="reise-hero-body">
          <p className="reise-hero-eyebrow">Forespørsel mottatt</p>
          <h1 className="reise-hero-title">
            {data.bedrift ? `${data.bedrift} på Finse 1222` : 'Deres opphold på Finse 1222'}
          </h1>
          <p className="reise-hero-intro">
            Dette er et forslag til hvordan turen til Finse 1222 kan se ut. Send det gjerne til de andre og hør hva de tenker.
          </p>
          <div className="reise-hero-btns no-print">
            <button className="reise-btn reise-btn--dark" onClick={handleCopy}>
              {copied ? '✓ Lenke kopiert!' : 'Del med kollegaer'}
            </button>
            <button className="reise-btn reise-btn--ghost" onClick={() => window.print()}>
              Last ned som PDF
            </button>
          </div>
        </div>
      </section>

      {/* ── Welcome + Facts ── */}
      <section className="reise-welcome">
        <div className="reise-welcome-text">
          <p className="reise-welcome-body">
            Finse 1222 ligger der jernbanen slutter og vidda begynner, Norges høyestliggende fjellstasjon, omgitt av Hardangerjøkulen og stille kilometer med is og lys. Her finnes ingen biler, ingen støy – bare det som virkelig betyr noe.
          </p>
          <p className="reise-welcome-body">
            Dette er oppsummeringen av {data.bedrift ? `${data.bedrift}s` : 'deres'} tur til Finse 1222 – en reise dere vil tenke på lenge etter at dere er tilbake.
          </p>
        </div>

        {details.length > 0 && (
          <div className="reise-facts">
            {details.map(d => (
              <div key={d.label} className="reise-fact">
                <span className="reise-fact-label">{d.label}</span>
                <span className="reise-fact-value">{d.value}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Activities ── */}
      {aktiviteter.length > 0 && (
        <section className="reise-program">
          <span className="reise-eyebrow">Planlagte opplevelser</span>
          <div className="reise-act-editorial">
            {aktiviteter.map(navn => {
              const act = ACTIVITY_DATA[navn]
              return (
                <div key={navn} className="reise-act-card">
                  <div className="reise-act-card-img">
                    <img src={act?.bilde || '/assets/images/Finse_pakker00002.jpg'} alt={navn} />
                  </div>
                  <div className="reise-act-card-body">
                    <h3 className="reise-act-title">{navn}</h3>
                    {act?.desc && <p className="reise-act-desc">{act.desc}</p>}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* ── Merknad ── */}
      {data.merknad && (
        <section className="reise-merknad">
          <span className="reise-eyebrow">Merknad fra dere</span>
          <p className="reise-merknad-text">{data.merknad}</p>
        </section>
      )}

      {/* ── Pull quote ── */}
      <section className="reise-quote">
        <blockquote className="reise-quote-text">
          «Seier venter den, som har alt i orden – hell kaller man det. Nederlag er en absolutt følge for den, som har forsømt å ta de nødvendige forholdsregler i tide – uhell kalles det.»
        </blockquote>
        <cite className="reise-quote-attr">— Fridtjof Nansen</cite>
      </section>

      {/* ── Room type ── */}
      {data.romtype && (
        <section className="reise-romtype">
          <div className="reise-romtype-body">
            <span className="reise-eyebrow">Romtyper</span>
            <p className="reise-romtype-copy">
              {data.romtype === 'Enkeltrom'
                ? 'Alle får sitt eget rom. Hvert rom har eget bad, friskt sengetøy og utsikt mot Finse.'
                : data.romtype === 'Dobbeltrom'
                ? 'Det er lagt opp til dobbeltrom — to og to deler. Hvert rom har eget bad og utsikt mot Finse.'
                : 'Det er lagt opp til en blanding av enkelt- og dobbeltrom. Hvert rom har eget bad og utsikt mot Finse.'}
            </p>
          </div>
          <div className="reise-romtype-img-wrap">
            <img src="/assets/images/finse1222__242.JPG" alt="Romtype" className="reise-romtype-img" />
          </div>
        </section>
      )}

      {/* ── Share card ── */}
      <div className="reise-share-wrap no-print">
        <section className="reise-share">
          <h2 className="reise-share-title">Del med teamet</h2>
          <p className="reise-share-desc">
            Send lenken til kollegaene dine — la dem se hva som venter på Finse.
          </p>
          <div className="reise-share-btns">
            <button className="reise-btn reise-btn--light" onClick={handleCopy}>
              {copied ? '✓ Lenke kopiert!' : 'Kopier lenke'}
            </button>
            <button className="reise-btn reise-btn--ghost" onClick={() => window.print()}>
              Last ned PDF
            </button>
          </div>
          <p className="reise-share-note">Vi svarer innen én arbeidsdag · Ingen binding</p>
        </section>
      </div>

      {/* ── Footer ── */}
      <footer className="reise-footer">
        <img src="/assets/logo/logo.png" alt="Hotel Finse 1222" className="reise-footer-logo" />
        <a href="/configurator" className="reise-footer-link no-print">Start en ny forespørsel →</a>
      </footer>

    </div>
  )
}
