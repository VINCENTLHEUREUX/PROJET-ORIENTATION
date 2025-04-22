import React from 'react';

const Footer = () => (
  <footer className="bg-gray-800 text-white mt-12 bottom-0 right-0 left-0">
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <div>
          <h3 className="text-lg font-bold mb-4">École de technologie supérieure</h3>
          <p className="mb-2">1100, rue Notre-Dame Ouest</p>
          <p className="mb-2">Montréal (Québec) H3C 1K3</p>
          <p className="mb-2">Canada</p>
          <p className="mb-2">Téléphone: 514 396-8800</p>
        </div>


        <div className="md:col-start-3 md:text-right">
          <h3 className="text-lg font-bold mb-4">Restez connectés</h3>
            <div className="flex space-x-4 mb-4 md:justify-end">
            <a href="https://www.facebook.com/etsmtl/" target="_blank" rel="noopener noreferrer" className="hover:text-ets-red">Facebook</a>
            <a href="https://x.com/etsmtl?lang=fr" target="_blank" rel="noopener noreferrer" className="hover:text-ets-red">Twitter</a>
            <a href="https://www.instagram.com/etsmtl/?hl=fr" target="_blank" rel="noopener noreferrer" className="hover:text-ets-red">Instagram</a>
            <a href="https://ca.linkedin.com/school/etsmtl/" target="_blank" rel="noopener noreferrer" className="hover:text-ets-red">LinkedIn</a>
          </div>
          <p>Abonnez-vous à notre infolettre pour rester informé des dernières nouvelles et événements.</p>
        </div>

      </div>

      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
        <p>© 2025 École de technologie supérieure. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
);

export default Footer;

