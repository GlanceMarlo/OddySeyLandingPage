import {
  FooterBackgroundGradient,
  TextHoverEffect,
} from '@/components/ui/hover-footer';


const MailIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75A2.25 2.25 0 0 1 4.5 4.5h15a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="m3 7 9 6 9-6" />
  </svg>
);
const PhoneIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
  </svg>
);
const MapPinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
  </svg>
);

const SocialIcon = ({ path }) => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
    <path d={path} />
  </svg>
);

const SOCIAL_PATHS = {
  twitter:
    'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z',
  facebook:
    'M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z',
  instagram:
    'M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.336-2.633 1.311-3.608.975-.975 2.242-1.249 3.608-1.311 1.266-.058 1.646-.07 4.85-.07Zm0 5.838a3.999 3.999 0 1 0 0 7.998 3.999 3.999 0 0 0 0-7.998Zm0 6.598a2.599 2.599 0 1 1 0-5.198 2.599 2.599 0 0 1 0 5.198Zm5.106-6.776a.934.934 0 1 1-1.868 0 .934.934 0 0 1 1.868 0Z',
  dribbble:
    'M12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0Zm7.885 5.536a10.16 10.16 0 0 1 2.304 6.349c-.337-.072-3.717-.756-7.123-.327-.073-.18-.146-.36-.226-.54a18.45 18.45 0 0 0-.435-.96c3.767-1.535 5.479-3.746 5.48-3.748l.02.226Zm-1.39-1.226c-.137.194-1.683 2.262-5.302 3.616-1.668-3.064-3.516-5.576-3.79-5.946a10.13 10.13 0 0 1 9.092 2.33ZM8.05 2.65c.262.355 2.08 2.876 3.766 5.876-4.74 1.262-8.927 1.24-9.378 1.234A10.16 10.16 0 0 1 8.05 2.65ZM2.139 12.01v-.31c.44.01 5.362.073 10.42-1.446.291.566.566 1.142.818 1.722-.13.037-.262.076-.39.117-5.227 1.69-8.006 6.297-8.238 6.69a10.13 10.13 0 0 1-2.61-6.793Zm3.918 8.155c.167-.343 2.04-3.96 7.78-5.96l.066-.022c1.438 3.727 2.026 6.857 2.176 7.757a10.106 10.106 0 0 1-10.022-1.775Zm12.06.78c-.103-.611-.643-3.602-1.985-7.277 3.21-.513 6.018.325 6.37.44a10.157 10.157 0 0 1-4.385 6.837Z',
  globe:
    'M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm6.918 6h-2.95a15.7 15.7 0 0 0-1.257-3.214A8.026 8.026 0 0 1 18.918 8ZM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96ZM4.26 14a7.96 7.96 0 0 1 0-4h3.38a16.5 16.5 0 0 0 0 4H4.26Zm.822 2h2.95c.328 1.144.752 2.224 1.257 3.214A8.026 8.026 0 0 1 5.082 16Zm2.95-8h-2.95a8.026 8.026 0 0 1 4.207-3.214A15.7 15.7 0 0 0 8.032 8ZM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96ZM14.34 14H9.66a14.7 14.7 0 0 1 0-4h4.68a14.7 14.7 0 0 1 0 4Zm.59 5.214c.505-.99.929-2.07 1.257-3.214h2.95a8.026 8.026 0 0 1-4.207 3.214ZM16.36 14a16.5 16.5 0 0 0 0-4h3.38a7.96 7.96 0 0 1 0 4h-3.38Z',
};

export default function OmegaFooter() {
  const footerLinks = [
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Press', href: '#' },
        { label: 'Contact', href: '#' },
      ],
    },
    {
      title: 'Product',
      links: [
        { label: 'Specs', href: '#specs' },
        { label: 'Reserve', href: '#reserve' },
        { label: 'Test ride', href: '#', pulse: true },
      ],
    },
  ];

  const contactInfo = [
    {
      icon: <MailIcon className="h-[18px] w-[18px] text-[#3ca2fa]" />,
      text: 'hello@oddysey.com',
      href: 'mailto:hello@oddysey.com',
    },
    {
      icon: <PhoneIcon className="h-[18px] w-[18px] text-[#3ca2fa]" />,
      text: '+1 (555) 018-2143',
      href: 'tel:+15550182143',
    },
    {
      icon: <MapPinIcon className="h-[18px] w-[18px] text-[#3ca2fa]" />,
      text: 'San Francisco, CA',
    },
  ];

  const socialLinks = [
    { path: SOCIAL_PATHS.facebook, label: 'Facebook', href: '#' },
    { path: SOCIAL_PATHS.instagram, label: 'Instagram', href: '#' },
    { path: SOCIAL_PATHS.twitter, label: 'Twitter', href: '#' },
    { path: SOCIAL_PATHS.dribbble, label: 'Dribbble', href: '#' },
    { path: SOCIAL_PATHS.globe, label: 'Website', href: '#' },
  ];

  return (
    <footer className="relative h-fit overflow-hidden bg-[#0F0F11] text-neutral-400">
      <div className="relative z-40 mx-auto max-w-7xl p-14">
        <div className="grid grid-cols-1 gap-12 pb-12 md:grid-cols-2 md:gap-8 lg:grid-cols-4 lg:gap-16">
          {/* Brand */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-bold tracking-[0.02em] text-white">
                Oddysey
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Premium electric vehicles, built to go further.
            </p>
            {/* Social icons — sit under the brand line */}
            <div className="flex space-x-5 pt-1 text-gray-400">
              {socialLinks.map(({ path, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="transition-colors hover:text-[#3ca2fa]"
                >
                  <SocialIcon path={path} />
                </a>
              ))}
            </div>
          </div>

          {/* Link sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="mb-6 text-lg font-semibold text-white">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label} className="relative">
                    <a
                      href={link.href}
                      className="transition-colors hover:text-[#3ca2fa]"
                    >
                      {link.label}
                    </a>
                    {link.pulse && (
                      <span className="absolute right-[-10px] top-0 h-2 w-2 animate-pulse rounded-full bg-[#3ca2fa]" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="mb-6 text-lg font-semibold text-white">Contact Us</h4>
            <ul className="space-y-4">
              {contactInfo.map((item) => (
                <li key={item.text} className="flex items-center space-x-3">
                  {item.icon}
                  {item.href ? (
                    <a href={item.href} className="transition-colors hover:text-[#3ca2fa]">
                      {item.text}
                    </a>
                  ) : (
                    <span className="transition-colors hover:text-[#3ca2fa]">
                      {item.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      
      {/* Wordmark position knob: -mt-* = pull UP (more negative = higher,
          closes the gap to the links; too high overlaps the columns). */}
      <div className="-mb-12 -mt-44 hidden h-[30rem] lg:flex">
        <TextHoverEffect text="Oddysey" className="z-50" />
      </div>

      <FooterBackgroundGradient />

      {/* Copyright */}
      <p className="pointer-events-none absolute inset-x-0 bottom-6 left-12 z-[60] text-center text-xs text-neutral-400">
        &copy; {new Date().getFullYear()} Oddysey. All rights reserved.
      </p>
    </footer>
  );
}
