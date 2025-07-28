import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-2 mt-auto">
      <small>© {new Date().getFullYear()} Job Portal. All rights reserved.</small>
    </footer>
  );
};

export default Footer;