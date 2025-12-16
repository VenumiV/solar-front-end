import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-200 px-20 pt-16">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

        {/* Brand */}
        <div className="space-y-4">
          <a className="flex items-center gap-2 text-xl font-bold text-blue-600" href="/">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-lime-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
              </svg>
            </div>
            <span className="truncate">Smart Energy</span>
          </a>

          <p className="text-sm leading-relaxed text-gray-600">
            Revolutionizing wind farm management through advanced digital twin technology and predictive insights.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
  {[
    {
      name: "facebook",
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        </svg>
      )
    },
    {
      name: "twitter",
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
        </svg>
      )
    },
    {
      name: "linkedin",
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <rect width="4" height="12" x="2" y="9"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      )
    },
    {
      name: "github",
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
          <path d="M9 18c-4.51 2-5-2-7-2"/>
        </svg>
      )
    }
  ].map((item) => (
    <a
      key={item.name}
      href="#"
      className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-600 transition hover:bg-blue-500 hover:text-white"
    >
      {item.svg}
    </a>
  ))}
</div>

        </div>

        {/* Solutions */}
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-lime-400 font-bold"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12.8 19.6A2 2 0 1 0 14 16H2" />
              <path d="M17.5 8a2.5 2.5 0 1 1 2 4H2" />
              <path d="M9.8 4.4A2 2 0 1 1 11 8H2" />
            </svg>
            <span>Solutions</span>
          </h3>

          <ul className="space-y-2">
            {[
              "Digital Twin Platform",
              "Predictive Analytics",
              "Remote Monitoring",
              "Performance Optimization",
              "Real-time Alerts",
              "Maintenance Planning",
            ].map((item) => (
              <li key={item}>
                <a className="block text-sm text-gray-600 hover:text-blue-600">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Resources</h3>
          <ul className="space-y-2">
            {[
              "Documentation",
              "API Reference",
              "Case Studies",
              "White Papers",
              "Blog",
              "Support Center",
            ].map((item) => (
              <li key={item}>
                <a className="block text-sm text-gray-600 hover:text-blue-600">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Get in Touch</h3>

          <div className="space-y-3">
            {/* Address */}
            <div className="flex items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mt-0.5 text-lime-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>

              <div className="text-sm text-gray-600">
                <p>123 Innovation Drive</p>
                <p>Energy Tech Park</p>
                <p>Copenhagen, Denmark</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-lime-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path>
              </svg>
              <a className="text-sm text-gray-600 hover:text-blue-600">
                +45 33 22 11 00
              </a>
            </div>

            {/* Email */}
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-lime-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
              </svg>
              <a className="text-sm text-gray-600 hover:text-blue-600">
                contact@smartenergy.com
              </a>
            </div>
          </div>

          {/* Subscribe */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-900">Stay Updated</h4>
            <input
              placeholder="Enter your email"
              className="w-full rounded-lg border px-3 py-2 text-sm border-gray-500"
              type="email"
            />
            <button className="w-full rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
              Subscribe
            </button>
          </div>
        </div>

      </div>
      <div className="container mx-auto max-w-7xl px-4 pt-12 py-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between border-t border-gray-300 pt-6">
          
          <div className="flex flex-wrap gap-4 text-xs text-gray-500">
            <a className="whitespace-nowrap transition-colors hover:text-blue-600" href="/">Privacy Policy</a>
            <a className="whitespace-nowrap transition-colors hover:text-blue-600" href="/">Terms of Service</a>
            <a className="whitespace-nowrap transition-colors hover:text-blue-600" href="/">Cookie Policy</a>
            <a className="whitespace-nowrap transition-colors hover:text-blue-600" href="/">Accessibility</a>
          </div>

          <div className="text-xs whitespace-nowrap text-gray-500">
            © 2025 Smart Energy. All rights reserved.
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
