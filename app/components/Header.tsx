import Link from 'next/link'

interface HeaderProps {
  variant?: 'light' | 'dark'
  showBackButton?: boolean
}

export default function Header({ variant = 'light', showBackButton = false }: HeaderProps) {
  return (
    <header className={`header ${variant === 'dark' ? 'header-dark' : ''}`}>
      <nav className="nav nav-left">
        {showBackButton ? (
          <Link href="/" className="nav-link">← Tilbake</Link>
        ) : (
          <a href="#" className="nav-link">Kontakt oss</a>
        )}
      </nav>
      <Link href="/" className="logo">
        <img src="/assets/logo/image.png" alt="Hotel Finse 1222" className="logo-img" />
      </Link>
      <nav className="nav nav-right">
        <a href="#faq" className="btn-planlegg">Ofte stilte spørsmål</a>
      </nav>
    </header>
  )
}
