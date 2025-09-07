import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#5C4033] text-white py-12 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* AMA Retreat Section */}
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-2xl font-bold mb-4 text-[#F0D597]">AMA Retreat</h3>
          <p className="text-sm leading-relaxed">
            Votre destination privilégiée pour une retraite de bien-être authentique. Reconnectez-vous avec votre essence dans un cadre naturel exceptionnel.
          </p>

          {/* Newsletter Section 
          <div className="mt-8">
            <h4 className="text-lg font-semibold mb-3 text-[#F0D597]">Newsletter</h4>
            <p className="text-sm mb-4">
              Recevez nos conseils bien-être et nos offres exclusives
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-grow p-3 rounded-lg bg-[#7B5E4F] border border-[#7B5E4F] focus:outline-none focus:ring-2 focus:ring-[#F0D597] text-white placeholder-gray-300"
              />
              <button className="bg-[#F0D597] text-[#5C4033] font-bold py-3 px-6 rounded-lg shadow-md hover:bg-[#E0C587] transition duration-300">
                S&#39;abonner
              </button>
            </div>
          </div>
          */}
        </div>

        {/* Contact Section */}
        <div className="col-span-1">
          <h3 className="text-2xl font-bold mb-4 text-[#F0D597]">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-[#F0D597]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 0110.049 0A7 7 0 0115.95 15.95L10 20l-5.95-4.05a7 7 0 010-10.049zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
             Suisse,
             France,
             Djerba
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-[#F0D597]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.774a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              0041796681526
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-[#F0D597]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
           amaretreate@gmail.com
            </li>
          </ul>
        </div>

        {/* Follow Us & Reservation Section */}
        <div className="col-span-1">
          <h3 className="text-2xl font-bold mb-4 text-[#F0D597]">Suivez-nous</h3>
          <div className="flex space-x-4 mb-8">
            <a href="#" className="text-white hover:text-[#F0D597] transition duration-300">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.776-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V22H12c5.523 0 10-4.477 10-10z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-white hover:text-[#F0D597] transition duration-300">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 4c-2.717 0-3.192.01-4.322.06-1.12.05-1.745.218-2.228.403-.483.186-.856.446-1.229.819-.374.373-.634.746-.82 1.229-.184.483-.352 1.107-.403 2.228-.05 1.13-.06 1.605-.06 4.322s.01 3.192.06 4.322c.05 1.12.218 1.745.403 2.228.186.483.446.856.819 1.229.373.374.746.634 1.229.82.483.184 1.107.352 2.228.403 1.13.05 1.605.06 4.322.06s3.192-.01 4.322-.06c1.12-.05 1.745-.218 2.228-.403.483-.186.856-.446 1.229-.819.374-.373.634-.746.82-1.229.184-.483.352-1.107.403-2.228.05-1.13.06-1.605.06-4.322s-.01-3.192-.06-4.322c-.05-1.12-.218-1.745-.403-2.228-.186-.483-.446-.856-.819-1.229-.373-.374-.746-.634-.82-1.229-.184-.483-.352-1.107-.403-2.228-.05-1.13-.06-1.605-.06-4.322zM12 16c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm0-6c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm6.5-.5c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-white hover:text-[#F0D597] transition duration-300">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.007-.532A8.318 8.318 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 10.702V11c0 4.479 3.188 8.223 7.46 9.029a4.09 4.09 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.006c-.546 0-1.08-.03-1.61-.17a11.644 11.644 0 0015.7 1.65" />
              </svg>
            </a>
          </div>

          
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#7B5E4F] mt-12 pt-8 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} AMA Retreat. Tous droits r&#39;éservés.
      </div>
    </footer>
  );
};

export default Footer;
