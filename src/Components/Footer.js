import React from 'react';

const footerStyle = {
  height: '70px',
  borderTopLeftRadius: '300px 100px',
  borderTopRightRadius: '300px 100px',
};

const Footer = () => (
  <footer
    style={footerStyle}
    className="absolute left-0 right-0 bottom-0 bg-green flex justify-center items-center"
  >
    <p className="text-sm text-white tracking-custom mt-6">
      created by: Mateusz Majchrzak
    </p>
  </footer>
);

export default Footer;
