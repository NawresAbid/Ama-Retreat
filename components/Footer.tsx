import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#5C4033] text-white py-12 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
        
        {/* GAUCHE : Contact Section */}
        <div className="flex flex-col items-start">
          <h3 className="text-2xl font-bold mb-4 text-[#F0D597]">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-3 text-[#F0D597]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 0110.049 0A7 7 0 0115.95 15.95L10 20l-5.95-4.05a7 7 0 010-10.049zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              Genève, Suisse
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-3 text-[#F0D597]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.774a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              0041 79 668 15 26
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-3 text-[#F0D597]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              info.amaretreat@gmail.com
            </li>
          </ul>
        </div>

        {/* MILIEU : Logo (Agrandi) */}
        <div className="flex justify-center order-first md:order-none">
          <img 
            src="/logo.jpeg" 
            alt="AMA Retreat Logo" 
            className="w-48 h-48 md:w-56 md:h-56 object-contain rounded-full border-2 border-[#F0D597]/30 shadow-2xl"
          />
        </div>

        {/* Follow Us Section */}
        <div className="col-span-1 flex flex-col items-end ">
          <h3 className="text-2xl font-bold mb-4 text-[#F0D597]">Suivez-nous</h3>
          <div className="flex space-x-4 mb-8  ">
            <a href="https://www.instagram.com/ama.retreat?igsh=MXYwdXN4dWF6bmE5Yg==" className="text-white hover:text-[#F0D597] transition duration-300">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 4c-2.717 0-3.192.01-4.322.06-1.12.05-1.745.218-2.228.403-.483.186-.856.446-1.229.819-.374.373-.634.746-.82 1.229-.184.483-.352 1.107-.403 2.228-.05 1.13-.06 1.605-.06 4.322s.01 3.192.06 4.322c.05 1.12.218 1.745.403 2.228.186.483.446.856.819 1.229.373.374.746.634 1.229.82.483.184 1.107.352 2.228.403 1.13.05 1.605.06 4.322.06s3.192-.01 4.322-.06c1.12-.05 1.745-.218 2.228-.403.483-.186.856-.446 1.229-.819.374-.373.634-.746.82-1.229.184-.483.352-1.107.403-2.228.05-1.13.06-1.605.06-4.322s-.01-3.192-.06-4.322c-.05-1.12-.218-1.745-.403-2.228-.186-.483-.446-.856-.819-1.229-.373-.374-.746-.634-.82-1.229-.184-.483-.352-1.107-.403-2.228-.05-1.13-.06-1.605-.06-4.322zM12 16c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm0-6c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm6.5-.5c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://wa.me/41796681526" 
              className="text-white hover:text-[#F0D597] transition duration-300"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Envoyer un message WhatsApp"
              title="WhatsApp"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.52 3.48A11.88 11.88 0 0012.06 1C6.05 1 1.28 5.77 1.28 11.78c0 2.08.55 4.12 1.6 5.93L1 23l5.57-1.46a11.73 11.73 0 005.5 1.2h.01c6.01 0 10.78-4.77 10.78-10.78 0-2.89-1.13-5.6-3.34-7.48zM12.06 20.18c-1.7 0-3.36-.46-4.84-1.33l-.35-.21-3.31.87.88-3.22-.23-.33a8.4 8.4 0 01-1.3-4.57c0-4.62 3.76-8.38 8.38-8.38 4.62 0 8.38 3.76 8.38 8.38 0 4.62-3.76 8.38-8.38 8.38z"/>
                <path d="M16.1 13.6c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15s-.77.96-.94 1.16c-.17.2-.34.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2 0-.38-.01-.53-.01-.15-.67-1.62-.92-2.22-.24-.6-.49-.52-.67-.53-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.8.38-.27.31-1.04 1.02-1.04 2.47 0 1.44 1.07 2.84 1.22 3.04.15.2 2.1 3.2 5.09 4.49 2.99 1.28 2.99.85 3.53.79.54-.07 1.75-.71 2-1.39.25-.68.25-1.26.18-1.39-.07-.13-.27-.2-.57-.35z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#7B5E4F] mt-12 pt-8 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} AMA Retreat. Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;