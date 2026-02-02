'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import StorySlider from './StorySlider'

export default function ContentSections() {
  return (
    <>
      {/* Seksjon 1: Toget */}
      <section id="utforsk" className="content-section">
        <div className="container">
          <div className="content-grid">
            <div className="content-text">
              <h2 className="content-title">Gå på toget i byen,<br />gå av på vidda.</h2>
              <p className="content-description">
                På Finse er det toget som tar deg frem. Gå på toget i byen, og gå 
                av på vidda. Vi møter deg og din bedrift på perrongen.
              </p>
              <Link href="/configurator" className="btn btn-outline">
                Skreddersy din pakke
              </Link>
            </div>
            <StorySlider 
              sliderId="1"
              images={[
                { src: '/assets/images/tog.png', alt: 'Tog til Finse' },
                { src: '/assets/images/finse1222__242.JPG', alt: 'Restaurant' },
                { src: '/assets/images/tur.png', alt: 'På tur' }
              ]}
            />
          </div>
        </div>
      </section>

      {/* Seksjon 2: Natur */}
      <section className="content-section">
        <div className="container">
          <div className="content-grid">
            <div className="content-text">
              <h2 className="content-title">Stillhet og ro møter rå<br />natur og oppdagerlyst</h2>
              <p className="content-description">
                Ingen biler, ingen forstyrrelser. Bare vidda, himmelen og gode 
                samtaler. Her får teamet rom til å tenke stort – og koble av skikkelig.
              </p>
              <Link href="/configurator" className="btn btn-outline">
                Lag din bedriftspakke
              </Link>
            </div>
            <StorySlider 
              sliderId="2"
              images={[
                { src: '/assets/images/finse1222__182.JPG', alt: 'Avslapning' },
                { src: '/assets/images/tak.png', alt: 'Utsikt fra Finse' }
              ]}
            />
          </div>
        </div>
      </section>

      {/* Seksjon 3: Historie */}
      <section className="content-section">
        <div className="container">
          <div className="content-grid">
            <div className="content-text">
              <h2 className="content-title">Over 100 år med<br />eventyrlyst og ambisjoner</h2>
              <p className="content-description">
                Siden 1909 har Finse 1222 vært samlingspunkt for oppdagere, visionære og 
                ledere. Fridtjof Nansen trente her før Sydpolen. Roald Amundsen planla 
                ekspedisjoner. I dag samles Norges fremste bedrifter for å tenke stort.
              </p>
              <Link href="/configurator" className="btn btn-outline">
                Skriv din historie
              </Link>
            </div>
            <StorySlider 
              sliderId="3"
              images={[
                { src: '/assets/images/kart.png', alt: 'Historisk kart' },
                { src: '/assets/images/nansen.png', alt: 'Fridtjof Nansen' }
              ]}
            />
          </div>
        </div>
      </section>
    </>
  )
}
