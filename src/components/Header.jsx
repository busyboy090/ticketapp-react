import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header relative">
      <div>
        <h2 className="logo">🎟️ TicketApp</h2>
        <button
          className="menu-btn lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu />
        </button>
        <nav className={`${isMenuOpen ? 'max-lg:block' : 'max-lg:hidden'} max-lg:h-[150px] max-lg:absolute max-lg:top-15 max-lg:bg-white max-lg:w-full max-lg:translate-x-[-50%] max-lg:left-[50%] lg:block`}>
          <ul className='flex max-lg:flex-col justify-center lg:justify-end items-center h-full gap-6'>
            <li>
              <Link to="/auth/login" className="nav-btn">Login</Link>
            </li>
            <li>
              <Link to="/auth/signup" className="nav-btn primary">Get Started</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header