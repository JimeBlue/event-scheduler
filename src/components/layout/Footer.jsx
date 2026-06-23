import { Link } from 'react-router';
import { FaInstagram, FaFacebookF, FaXTwitter, FaTiktok } from 'react-icons/fa6';
import logo from '../../assets/logo.png';
import dottedLine from '../../assets/blue-dotted-line-with-asterik.png';

// Social channels. Links are intentionally empty (#) until real URLs exist;
// defined once so the icon row stays in sync with whatever we add later.
const socialLinks = [
  { label: 'Instagram', href: '#', Icon: FaInstagram },
  { label: 'Facebook', href: '#', Icon: FaFacebookF },
  { label: 'X', href: '#', Icon: FaXTwitter },
  { label: 'TikTok', href: '#', Icon: FaTiktok },
];

const Footer = () => {
  return (
    <footer className="bg-brand-brown-dark font-heading text-white">
      <div className="container py-12">
        {/* Top: logo + social. From lg they sit on opposite ends of one row;
            below lg everything stacks and centers (logo, then social). */}
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
          <Link to="/" aria-label="EventBox home">
            <img src={logo} alt="EventBox" className="h-28 w-auto" />
          </Link>

          <nav aria-label="Social media">
            <ul className="flex items-center gap-6">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="text-white/70 transition-colors hover:text-white"
                  >
                    <social.Icon className="h-6 w-6" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <hr className="my-8 border-white/15" />

        {/* Trademark phrase, then the decorative dotted line — both centered. */}
        <p className="text-center tracking-wide text-white/70">
          © {new Date().getFullYear()} EventBox. All rights reserved.
        </p>

        <img src={dottedLine} alt="" className="mx-auto mt-6 h-auto w-48" />
      </div>
    </footer>
  );
};

export default Footer;
