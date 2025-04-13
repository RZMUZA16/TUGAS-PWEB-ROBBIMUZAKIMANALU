import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-700 to-green-900 text-white py-6 mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-xl font-semibold">Al-Qur'an Digital</h2>
          <p className="text-sm">Sumber bacaan dan terjemahan Al-Qur’an</p>
        </div>
        <div className="text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Qur'an Web. All rights reserved.</p>
          <p className="text-xs mt-1">Dibuat dengan <span className="text-red-400">❤️</span> oleh komunitas Muslim</p>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="https://github.com/RZMUZA16" className="hover:text-green-300 transition">GitHub</a>
          <a href="https://alquran.cloud" className="hover:text-green-300 transition">API</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
