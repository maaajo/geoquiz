import React from 'react';
import { Link } from 'react-router-dom';

const headerCustomStyle = {
  height: '120px',
  borderBottomLeftRadius: '230px 145px',
  borderBottomRightRadius: '230px 145px',
};

const Header = ({ handleLanguageChange, language }) => {
  return (
    <header style={headerCustomStyle} className="w-full bg-green shadow-lg">
      <section className="flex justify-end pt-1">
        <div className="pr-3">
          <button
            data-language="pl"
            className={
              language === 'pl'
                ? `border-2 border-white rounded-lg px-1 transition-all duration-200 ease-in text-white text-sm hover:underline tracking-custom`
                : 'text-white text-sm hover:underline tracking-custom'
            }
            onClick={handleLanguageChange}
          >
            pl
          </button>
          <span className="text-white"> | </span>
          <button
            data-language="en"
            className={
              language === 'en'
                ? `border-2 border-white rounded-lg px-1 transition-all duration-200 ease-in text-white text-sm hover:underline tracking-custom`
                : 'text-white text-sm hover:underline tracking-custom'
            }
            onClick={handleLanguageChange}
          >
            en
          </button>
        </div>
      </section>
      <h1
        className="font-bold text-white font-logo text-center antialiased tracking-custom"
        animate={{ fontSize: '40px', paddingTop: '16px' }}
      >
        <Link to="/">GeoQuiz</Link>
      </h1>
    </header>
  );
};

export default Header;
