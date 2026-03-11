'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './configurator.css'

const STEP_IMAGES = [
  '/assets/images/finse.jpg',
  '/assets/images/finse1222__182.JPG',
  '/assets/images/finse1222__242.JPG',
  '/assets/images/oss.JPG',
  '/assets/images/Finseskilt.jpg',
]

const DAG_AKTIVITETER = [
  { navn: 'Guidet tur på vidda',    bilde: '/assets/images/Finse_pakker00007.jpg', beskrivelse: 'Utforsk Hardangervidda med lokal guide. Hotellet inkluderer guide, kart og termos-lunsj underveis. En opplevelse som gir perspektiv – på naturen og på hverandre.' },
  { navn: 'Skitur',                 bilde: '/assets/images/Finse_pakker00002.jpg', beskrivelse: 'Løypene starter rett utenfor døren. Hotellet låner ut ski og staver, og pakker sekken for dere om dere ønsker det. Ingen logistikk – bare frisk luft fra første steg.' },
  { navn: 'Sykling på Rallarvegen', bilde: '/assets/images/Finse_pakker00004.jpg', beskrivelse: 'En ikonisk rute med dramatisk fjelllandskap. Hotellet ordner sykkel, hjelm og ruteplanlegging tilpasset gruppen. Mestring og snakkestoff garantert.' },
  { navn: 'Breføring',              bilde: '/assets/images/Finse_pakker00005.jpg', beskrivelse: 'Gå på Hardangerjøkulen med erfarne guidere. Hotellet inkluderer guide, brodder og sikringsutstyr. En aktivitet som løfter turen fra hyggelig til uforglemmelig.' },
]

const KVELD_AKTIVITETER = [
  { navn: 'Astrokveld',    bilde: '/assets/images/Finse_configurator_background.jpg', beskrivelse: 'Stjernehimmel langt fra bylys. Hotellet serverer varm drikke og stiller med kikkert og stjernekart. Et naturlig rom for gode samtaler.' },
  { navn: 'Historiestund', bilde: '/assets/images/Finse_pakker00010.jpg',             beskrivelse: 'Finses historie – fra polfarere til filminnspillinger – fortalt rundt bålet. Hotellet arrangerer guidet fortelling med noe varmt å drikke. Gir reisen et felles ankerpunkt.' },
  { navn: 'Vinsmaking',    bilde: '/assets/images/mat_finse.jpg',                     beskrivelse: 'Kurerte viner med historiene bak glasset, ledet av hotellets personale. Inkluderer smaksprøver og småretter. En avslappet avslutning på dagen.' },
]

const AKTIVITETER = [
  ...DAG_AKTIVITETER.map(a => ({ ...a, type: 'dag' as const })),
  ...KVELD_AKTIVITETER.map(a => ({ ...a, type: 'kveld' as const })),
]

const MONTHS = [
  'Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Desember',
]

const isoDate = (y: number, m: number, d: number) =>
  `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`

const formatDate = (iso: string) => {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  return `${d}.${m}.${y}`
}

export default function Configurator() {
  const [step, setStep] = useState(1)
  const [dir, setDir] = useState<1 | -1>(1)

  const [monthOffset, setMonthOffset] = useState(0)
  const MONTH_SLOT = 89    // 81px card + 8px gap
  const MONTH_VISIBLE = 5  // cards shown at once

  const now = new Date()
  const [calYear, setCalYear] = useState(now.getFullYear())
  const [calMonth, setCalMonth] = useState(now.getMonth())
  const [hoverDay, setHoverDay] = useState('')

  const [form, setForm] = useState({
    anledning: '',
    annetAnledning: '',
    moterom: false,
    datoModus: 'datoer' as 'datoer' | 'fleksibel',
    datoFra: '',
    datoTil: '',
    fleksibeltManed: '',
    fleksibeltNetter: '',
    fleksibeltUkeDel: [] as string[],
    moteromVarighet: 'Hel dag',
    antall: '',
    romtype: '',
    dagAktiviteter: [] as string[],
    kveldAktiviteter: [] as string[],
    navn: '',
    bedrift: '',
    epost: '',
    telefon: '',
    merknad: '',
  })

  const TOTAL = 6

  const goTo = (target: number) => {
    setDir(target > step ? 1 : -1)
    setStep(target)
  }
  const next = () => { if (step < TOTAL) goTo(step + 1) }
  const prev = () => { if (step > 1) goTo(step - 1) }

  const set = (field: string, value: string | boolean) =>
    setForm(p => ({ ...p, [field]: value }))

  const toggleDag = (navn: string) => {
    setForm(p => ({
      ...p,
      dagAktiviteter: p.dagAktiviteter.includes(navn)
        ? p.dagAktiviteter.filter(v => v !== navn)
        : [...p.dagAktiviteter, navn],
    }))
  }

  const toggleKveld = (navn: string) => {
    setForm(p => ({
      ...p,
      kveldAktiviteter: p.kveldAktiviteter.includes(navn)
        ? p.kveldAktiviteter.filter(v => v !== navn)
        : [...p.kveldAktiviteter, navn],
    }))
  }

  const toggleAktivitet = (navn: string, type: 'dag' | 'kveld') => {
    if (type === 'dag') toggleDag(navn)
    else toggleKveld(navn)
  }

  const isAktivitetSelected = (navn: string, type: 'dag' | 'kveld') =>
    type === 'dag' ? form.dagAktiviteter.includes(navn) : form.kveldAktiviteter.includes(navn)

  // ── Calendar helpers ──
  const today = now.toISOString().split('T')[0]

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1) }
    else setCalMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1) }
    else setCalMonth(m => m + 1)
  }
  const isAtMinMonth = calYear === now.getFullYear() && calMonth === now.getMonth()

  const handleDayClick = (iso: string) => {
    if (!form.datoFra || form.datoTil) {
      setForm(p => ({ ...p, datoFra: iso, datoTil: '' }))
    } else if (iso > form.datoFra) {
      setForm(p => ({ ...p, datoTil: iso }))
    } else {
      setForm(p => ({ ...p, datoFra: iso, datoTil: '' }))
    }
  }

  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate()
  const firstDayOfWeek = (new Date(calYear, calMonth, 1).getDay() + 6) % 7
  const calCells: (number | null)[] = []
  for (let i = 0; i < firstDayOfWeek; i++) calCells.push(null)
  for (let d = 1; d <= daysInMonth; d++) calCells.push(d)
  while (calCells.length % 7 !== 0) calCells.push(null)

  const nights = form.datoFra && form.datoTil
    ? Math.round((new Date(form.datoTil).getTime() - new Date(form.datoFra).getTime()) / 86400000)
    : 0

  // Upcoming 12 months for flexible mode
  const upcomingMonths = Array.from({ length: 12 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1)
    return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`
  })

  const monthMax = upcomingMonths.length - MONTH_VISIBLE

  const step1Valid = form.anledning && (form.anledning !== 'Annet' || form.annetAnledning.trim() !== '')
  const step2Valid = form.datoModus === 'datoer'
    ? !!(form.datoFra && form.datoTil)
    : !!(form.fleksibeltNetter || form.fleksibeltManed)

  const handleSubmit = () => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    const dato = form.datoModus === 'datoer'
      ? `${formatDate(form.datoFra)} → ${formatDate(form.datoTil)}`
      : form.fleksibeltManed
    const varighet = form.datoModus === 'datoer'
      ? `${nights} ${nights === 1 ? 'natt' : 'netter'}`
      : form.fleksibeltNetter
    const payload = {
      ...form,
      anledning: form.anledning === 'Annet' ? form.annetAnledning : form.anledning,
      dato,
      varighet,
      id,
      createdAt: new Date().toISOString(),
    }
    localStorage.setItem(id, JSON.stringify(payload))
    window.location.href = `/reise?id=${id}`
  }

  return (
    <div className="konfig-bg">
      <div className="konfig-overlay" />
      <a href="/" className="konfig-logo">
        <img src="/assets/logo/logo.png" alt="Hotel Finse 1222" />
      </a>
      <div className="konfig-card">
        <div className="konfig-body">
          <div className="konfig-left">
            <div className="konfig-segments">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className={`konfig-seg ${i <= step ? 'filled' : ''}`} />
              ))}
            </div>

            <div className={`konfig-step ${dir > 0 ? 'slide-right' : 'slide-left'}`} key={step}>
              <span className="konfig-indicator">STEG {step} AV {TOTAL}</span>

              {/* ── Step 1: Anledning ── */}
              {step === 1 && (
                <>
                  <h1 className="konfig-title">Hva er anledningen?</h1>
                  <p className="konfig-subtitle">Velg det som passer best</p>
                  <div className="konfig-pills">
                    {['Ledergruppe', 'Teambuilding', 'Strategisamling', 'Kick-off', 'Julebord/firmafest', 'Konferanse', 'Privat arrangement', 'Annet'].map(opt => (
                      <button
                        key={opt}
                        className={`konfig-pill ${form.anledning === opt ? 'selected' : ''}`}
                        onClick={() => set('anledning', opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {form.anledning === 'Annet' && (
                    <input
                      type="text"
                      className="konfig-input konfig-annet-input"
                      placeholder="Beskriv anledningen din"
                      value={form.annetAnledning}
                      onChange={e => set('annetAnledning', e.target.value)}
                      autoFocus
                    />
                  )}
                </>
              )}

              {/* ── Step 2: Dato ── */}
              {step === 2 && (
                <>
                  <h1 className="konfig-title">Når ønsker dere å komme?</h1>

                  {/* Mode toggle */}
                  <div className="konfig-mode-toggle">
                    <button
                      className={`konfig-mode-btn ${form.datoModus === 'datoer' ? 'active' : ''}`}
                      onClick={() => set('datoModus', 'datoer')}
                    >
                      Datoer
                    </button>
                    <button
                      className={`konfig-mode-btn ${form.datoModus === 'fleksibel' ? 'active' : ''}`}
                      onClick={() => set('datoModus', 'fleksibel')}
                    >
                      Fleksibel
                    </button>
                  </div>

                  {/* ── Exact dates mode ── */}
                  {form.datoModus === 'datoer' && (
                    <>
                      <div className="konfig-cal-header">
                        <button className="konfig-cal-nav" onClick={prevMonth} disabled={isAtMinMonth}>‹</button>
                        <span className="konfig-cal-month">{MONTHS[calMonth]} {calYear}</span>
                        <button className="konfig-cal-nav" onClick={nextMonth}>›</button>
                      </div>

                      <div className="konfig-cal-weekdays">
                        {['Ma', 'Ti', 'On', 'To', 'Fr', 'Lø', 'Sø'].map(d => (
                          <span key={d} className="konfig-cal-wd">{d}</span>
                        ))}
                      </div>

                      <div className="konfig-cal-grid">
                        {calCells.map((day, idx) => {
                          if (!day) return <span key={idx} className="konfig-cal-empty" />
                          const iso = isoDate(calYear, calMonth, day)
                          const isPast = iso < today
                          const isStart = iso === form.datoFra
                          const isEnd = iso === form.datoTil
                          const rangeEnd = form.datoTil || (form.datoFra && !form.datoTil ? hoverDay : '')
                          const isInRange = !!(form.datoFra && rangeEnd && iso > form.datoFra && iso < rangeEnd)
                          const isRangeStart = isStart && !!(form.datoTil || hoverDay)
                          const isRangeEnd = isEnd || !!(form.datoFra && !form.datoTil && iso === hoverDay && hoverDay > form.datoFra)
                          return (
                            <button
                              key={idx}
                              className={[
                                'konfig-cal-day',
                                isPast ? 'is-past' : '',
                                isStart ? 'is-start' : '',
                                isEnd ? 'is-end' : '',
                                isInRange ? 'is-range' : '',
                                isRangeStart ? 'is-range-start' : '',
                                isRangeEnd ? 'is-range-end' : '',
                              ].filter(Boolean).join(' ')}
                              disabled={isPast}
                              onClick={() => handleDayClick(iso)}
                              onMouseEnter={() => { if (form.datoFra && !form.datoTil) setHoverDay(iso) }}
                              onMouseLeave={() => setHoverDay('')}
                            >
                              {day}
                            </button>
                          )
                        })}
                      </div>

                      <div className="konfig-cal-status">
                        {!form.datoFra && (
                          <span className="konfig-cal-hint">Velg ankomstdato</span>
                        )}
                        {form.datoFra && !form.datoTil && (
                          <span className="konfig-cal-hint">
                            Ankomst <strong>{formatDate(form.datoFra)}</strong> — velg avreisedato
                          </span>
                        )}
                        {form.datoFra && form.datoTil && (
                          <span className="konfig-cal-confirmed">
                            {formatDate(form.datoFra)} → {formatDate(form.datoTil)}
                            <em>{nights} {nights === 1 ? 'natt' : 'netter'}</em>
                          </span>
                        )}
                      </div>
                    </>
                  )}

                  {/* ── Flexible mode ── */}
                  {form.datoModus === 'fleksibel' && (
                    <>
                      <p className="konfig-flex-label">Hvor lenge ønsker dere å bli?</p>
                      <div className="konfig-duration-row">
                        {['1 natt', '2-3 netter', '4-5 netter', 'En uke', 'Over en uke'].map(opt => (
                          <button
                            key={opt}
                            className={`konfig-duration-btn ${form.fleksibeltNetter === opt ? 'selected' : ''}`}
                            onClick={() => set('fleksibeltNetter', opt)}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>

                      <p className="konfig-flex-label">Dra når som helst</p>
                      <div className="konfig-month-row">
                        <button
                          className={`konfig-month-arrow ${monthOffset === 0 ? 'disabled' : ''}`}
                          onClick={() => setMonthOffset(o => Math.max(0, o - 1))}
                          disabled={monthOffset === 0}
                          aria-label="Forrige måneder"
                        ><ChevronLeft size={18} /></button>

                        <div className="konfig-month-viewport">
                          <div
                            className="konfig-month-track"
                            style={{ transform: `translateX(-${monthOffset * MONTH_SLOT}px)` }}
                          >
                            {upcomingMonths.map(m => {
                              const [monthName, year] = m.split(' ')
                              return (
                                <button
                                  key={m}
                                  className={`konfig-month-card ${form.fleksibeltManed === m ? 'selected' : ''}`}
                                  onClick={() => set('fleksibeltManed', m)}
                                >
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                                  </svg>
                                  <span className="konfig-month-name">{monthName}</span>
                                  <span className="konfig-month-year">{year}</span>
                                </button>
                              )
                            })}
                          </div>
                        </div>

                        <button
                          className={`konfig-month-arrow ${monthOffset >= monthMax ? 'disabled' : ''}`}
                          onClick={() => setMonthOffset(o => Math.min(monthMax, o + 1))}
                          disabled={monthOffset >= monthMax}
                          aria-label="Neste måneder"
                        ><ChevronRight size={18} /></button>
                      </div>

                      <p className="konfig-flex-label">Når i uken kommer dere?</p>
                      <div className="konfig-ukedel-row">
                        {['Midt i uken', 'Helg'].map(opt => {
                          const active = form.fleksibeltUkeDel.includes(opt)
                          return (
                            <button
                              key={opt}
                              className={`konfig-ukedel-btn ${active ? 'selected' : ''}`}
                              onClick={() => setForm(p => ({
                                ...p,
                                fleksibeltUkeDel: active
                                  ? p.fleksibeltUkeDel.filter(v => v !== opt)
                                  : [...p.fleksibeltUkeDel, opt],
                              }))}
                            >
                              <span className="konfig-ukedel-check">{active ? '✓' : ''}</span>
                              {opt}
                            </button>
                          )
                        })}
                      </div>
                    </>
                  )}

                </>
              )}

              {/* ── Step 3: Hvem kommer ── */}
              {step === 3 && (
                <>
                  <h1 className="konfig-title">Hvor mange kommer?</h1>
                  <label className="konfig-label">Antall gjester</label>
                  <div className="konfig-pills konfig-pills--3col">
                    {['1–4', '5–15', '15–30', '30–60', '60–110', 'Over 110'].map(opt => (
                      <button
                        key={opt}
                        className={`konfig-pill ${form.antall === opt ? 'selected' : ''}`}
                        onClick={() => set('antall', opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* ── Step 4: Romtype + Møterom ── */}
              {step === 4 && (
                <>
                  <h1 className="konfig-title">Hvilke romtype ønsker dere?</h1>

                  <label className="konfig-label">Soverom</label>
                  <div className="konfig-rooms konfig-rooms--horizontal">
                    <button
                      className={`konfig-room ${form.romtype === 'Enkeltrom' ? 'selected' : ''}`}
                      onClick={() => set('romtype', 'Enkeltrom')}
                    >
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 21V7a2 2 0 012-2h14a2 2 0 012 2v14" /><path d="M3 15h18" /><rect x="7" y="9" width="4" height="6" rx="1" />
                      </svg>
                      <span className="konfig-room-name">Enkeltrom</span>
                    </button>
                    <button
                      className={`konfig-room ${form.romtype === 'Dobbeltrom' ? 'selected' : ''}`}
                      onClick={() => set('romtype', 'Dobbeltrom')}
                    >
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 21V7a2 2 0 012-2h14a2 2 0 012 2v14" /><path d="M3 15h18" /><rect x="5" y="9" width="4" height="6" rx="1" /><rect x="11" y="9" width="4" height="6" rx="1" />
                      </svg>
                      <span className="konfig-room-name">Dobbeltrom</span>
                    </button>
                    <button
                      className={`konfig-room ${form.romtype === 'Enkeltrom og dobbeltrom' ? 'selected' : ''}`}
                      onClick={() => set('romtype', 'Enkeltrom og dobbeltrom')}
                    >
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 21V7a2 2 0 012-2h14a2 2 0 012 2v14" /><path d="M3 15h18" /><rect x="4" y="9" width="3" height="6" rx="1" /><rect x="10" y="9" width="3" height="6" rx="1" /><rect x="16" y="9" width="3" height="6" rx="1" />
                      </svg>
                      <span className="konfig-room-name">Enkeltrom og dobbeltrom</span>
                    </button>
                  </div>

                  <label className="konfig-label">Møterom</label>
                  <button
                    className={`konfig-moterom-card ${form.moterom ? 'selected' : ''}`}
                    onClick={() => set('moterom', !form.moterom)}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="14" rx="2" /><path d="M8 20h8" /><path d="M12 18v2" />
                    </svg>
                    <span className="konfig-room-name">Trenger dere møterom?</span>
                    <span className="konfig-moterom-card-check">{form.moterom ? '✓' : ''}</span>
                  </button>

                  {form.moterom && (
                    <div className="konfig-moterom-varighet">
                      {['Hel dag', 'Halv dag'].map(opt => (
                        <button
                          key={opt}
                          className={`konfig-duration-btn ${form.moteromVarighet === opt ? 'selected' : ''}`}
                          onClick={() => set('moteromVarighet', opt)}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                </>
              )}

              {/* ── Step 5: Aktiviteter ── */}
              {step === 5 && (
                <>
                  <h1 className="konfig-title">Hva ønsker dere å oppleve?</h1>

                  <div className="konfig-activity-grid">
                    {AKTIVITETER.map(({ navn, bilde, beskrivelse, type }) => {
                      const selected = isAktivitetSelected(navn, type)
                      return (
                        <button
                          key={navn}
                          className={`konfig-act-card ${selected ? 'selected' : ''}`}
                          onClick={() => toggleAktivitet(navn, type)}
                        >
                          <div className="konfig-act-card-img-wrap">
                            <img src={bilde} alt={navn} className="konfig-act-card-img" />
                          </div>
                          <div className="konfig-act-card-body">
                            <p className="konfig-act-card-title">{navn}</p>
                            <p className="konfig-act-card-desc">{beskrivelse}</p>
                          </div>
                          {selected && (
                            <div className="konfig-act-card-check">
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M2.5 7L5.5 10L11.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>

                </>
              )}

              {/* ── Step 6: Kontakt ── */}
              {step === 6 && (
                <>
                  <h1 className="konfig-title">La oss ta kontakt</h1>
                  <div className="konfig-form-grid">
                    <div className="konfig-field">
                      <label className="konfig-label">Navn</label>
                      <input type="text" className="konfig-input" placeholder="Ditt fulle navn" value={form.navn} onChange={e => set('navn', e.target.value)} />
                    </div>
                    <div className="konfig-field">
                      <label className="konfig-label">Bedrift</label>
                      <input type="text" className="konfig-input" placeholder="Bedriftsnavn" value={form.bedrift} onChange={e => set('bedrift', e.target.value)} />
                    </div>
                    <div className="konfig-field">
                      <label className="konfig-label">E-post</label>
                      <input type="email" className="konfig-input" placeholder="din@epost.no" value={form.epost} onChange={e => set('epost', e.target.value)} />
                    </div>
                    <div className="konfig-field">
                      <label className="konfig-label">Telefon</label>
                      <input type="tel" className="konfig-input" placeholder="+47" value={form.telefon} onChange={e => set('telefon', e.target.value)} />
                    </div>
                  </div>
                  <div className="konfig-field">
                    <textarea className="konfig-input konfig-textarea" placeholder="Noe annet vi bør vite? (valgfritt)" rows={3} value={form.merknad} onChange={e => set('merknad', e.target.value)} />
                  </div>
                  <button className="konfig-submit" disabled={!form.navn || !form.epost} onClick={handleSubmit}>
                    Send forespørsel
                  </button>
                  <p className="konfig-hint">Vi svarer innen én arbeidsdag · Ingen binding</p>
                </>
              )}
            </div>

            {/* ── Shared nav — outside animated step so it never jumps ── */}
            <div className="konfig-nav">
              {step > 1
                ? <button className="konfig-back" onClick={prev}>Tilbake</button>
                : <span />
              }
              {step === 1 && step1Valid && <button className="konfig-next" onClick={next}>Neste</button>}
              {step === 2 && step2Valid && <button className="konfig-next" onClick={next}>Neste</button>}
              {step === 3 && form.antall && <button className="konfig-next" onClick={next}>Neste</button>}
              {step === 4 && form.romtype && <button className="konfig-next" onClick={next}>Neste</button>}
              {step === 5 && <button className="konfig-next" onClick={next}>Neste</button>}
            </div>
          </div>

          {/* ── Right column ── */}
          <div className="konfig-right">
            <div className="konfig-img-wrap">
              {STEP_IMAGES.map((src, i) => (
                <img key={i} src={src} alt="" className={`konfig-img ${step === i + 1 && step < 6 ? 'visible' : ''}`} />
              ))}
              {step === 6 && (
                <div className="konfig-summary">
                  <div className="konfig-summary-hero">
                    <img src="/assets/images/Finse_configurator_background.jpg" alt="" className="konfig-summary-hero-img" />
                    <div className="konfig-summary-hero-overlay" />
                    <img src="/assets/logo/logo.png" alt="Hotel Finse 1222" className="konfig-summary-hero-logo" />
                  </div>
                  <h3 className="konfig-summary-title">Oppsummering</h3>
                  <div className="konfig-summary-list">
                    {[
                      { label: 'Anledning', value: form.anledning === 'Annet' ? form.annetAnledning : form.anledning },
                      { label: 'Ankomst', value: form.datoModus === 'datoer' ? formatDate(form.datoFra) : '' },
                      { label: 'Avreise', value: form.datoModus === 'datoer' ? formatDate(form.datoTil) : '' },
                      { label: 'Ønsket måned', value: form.datoModus === 'fleksibel' ? form.fleksibeltManed : '' },
                      { label: 'Varighet', value: form.datoModus === 'fleksibel' ? form.fleksibeltNetter : '' },
                      { label: 'Antall gjester', value: form.antall },
                      { label: 'Romtype', value: form.romtype },
                      { label: 'Møterom', value: form.moterom ? 'Ja' : '' },
                    ].filter(item => item.value).map(item => (
                      <div key={item.label} className="konfig-summary-row">
                        <span className="konfig-summary-key">{item.label}</span>
                        <span className="konfig-summary-val">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  {(form.dagAktiviteter.length > 0 || form.kveldAktiviteter.length > 0) && (() => {
                    const alleAktiviteter = [...DAG_AKTIVITETER, ...KVELD_AKTIVITETER]
                    const valgte = [...form.dagAktiviteter, ...form.kveldAktiviteter]
                    return (
                      <div className="konfig-summary-activities">
                        <span className="konfig-summary-key">Aktiviteter</span>
                        <div className="konfig-summary-activity-grid">
                          {valgte.map(navn => {
                            const match = alleAktiviteter.find(a => a.navn === navn)
                            return (
                              <div key={navn} className="konfig-summary-activity-item">
                                {match && <img src={match.bilde} alt={navn} />}
                                <span>{navn}</span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })()}

                  <p className="konfig-summary-note">
                    Navneliste og matintoleranser samler vi inn 3 uker før ankomst.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
