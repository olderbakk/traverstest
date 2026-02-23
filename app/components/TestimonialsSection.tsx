export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: 'Utrolig bra opplevelse. Vi hadde en intern spørreundersøkelse og turen fikk 5,5 av 6!',
      company: 'Eviny',
      details: 'Teambuilding, 40 personer'
    },
    {
      quote: 'Fantastisk service, nydelig natur, veldig god mat! Beliggenhet midt mellom Bergen og Oslo var perfekt.',
      company: 'Meteorologisk institutt',
      details: 'Konferanse, 29 personer'
    },
    {
      quote: 'Alt fra service, mat, personal og sted var helt suverent. Vi leide hele hotellet – helt magisk.',
      company: 'Verdane',
      details: 'Privat feiring, 110 gjester'
    },
    {
      quote: 'Det at lokasjonen var lukket var en ukjent fordel – alle snakket med hverandre.',
      company: 'Eviny',
      details: 'Firmatur, 40 personer'
    },
    {
      quote: 'Å starte turen i egen leid togvogn var genialt. Kjempe flott hotell med flott natur rundt.',
      company: 'SYSTRA',
      details: 'Julebord, 44 personer'
    },
    {
      quote: 'Fantastisk! Personalet var veldig hyggelige og behjelpelig, rommene var store, fine og rene og maten var av topp klasse. 100% fornøyde.',
      company: 'Bryn Byggkontroll',
      details: 'Avdelingstur, 15 personer'
    },
    {
      quote: 'Utrolig fin opplevelse. Polartime på Framheim, skiseilekurs, god matopplevelse, fine rom og ikke minst hyggelig personale.',
      company: 'Pandion Energy',
      details: 'Firmatur, 20 personer'
    },
    {
      quote: 'Veldig flott, god tilrettelegging fra Finse 1222 fra vi kom til vi dro. Praktisk med matpakke til Rallarvegen og bagasjesending.',
      company: '7analytics',
      details: 'Blåtur, 17 personer'
    },
    {
      quote: 'Det var utrolig fint! Vi ville være der hvert år hvis vi kunne. Alt har vært helt suverent.',
      company: 'Norfund',
      details: 'Jobbtur, 8 personer'
    },
    {
      quote: 'Vi var veldig fornøyde med alt, våre kriterier ble møtt og et meget hyggelig personale. Super møterom og mat – nydelige kanelboller!',
      company: 'Tribia',
      details: 'Ledersamling, 8 personer'
    },
    {
      quote: 'Meget god opplevelse. Hotellet leverte godt på restaurantopplevelse, hyggelig personell, beliggenhet og komfort.',
      company: 'NorgesGruppen',
      details: 'Fellestur, 10 personer'
    },
    {
      quote: 'Meget bra. Utrolig bra mat og veldig fint at dere hadde en sommelier som var interessert i mat og vin.',
      company: 'Forsvaret',
      details: 'Samling, 15 personer'
    }
  ]

  const doubled = [...testimonials, ...testimonials]

  return (
    <section className="content-section section-testimonials">
      <div className="testimonial-track">
        {doubled.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <blockquote>{testimonial.quote}</blockquote>
            <div className="card-footer">
              <div className="card-author">
                <span className="author-name">{testimonial.company}</span>
                <span className="author-role">{testimonial.details}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
