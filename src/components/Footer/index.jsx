import React from "react";
import "./Footer.css";
import BackToTop from "./Backtotop";

const Footer = () => {
  return (
    <>
      <BackToTop />
      <footer className="footer">
        <div className="footer__top">
          <div className="footer__column">
            <h4>Get to Know Us</h4>
            <ul>
              <li>About Us</li>
              <li>Careers</li>
              <li>Press Releases</li>
              <li>Amazon Cares</li>
              <li>Gift a Smile</li>
            </ul>
          </div>
          <div className="footer__column">
            <h4>Connect with Us</h4>
            <ul>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
            </ul>
          </div>
          <div className="footer__column">
            <h4>Make Money with Us</h4>
            <ul>
              <li>Sell on Amazon</li>
              <li>Sell under Amazon Accelerator</li>
              <li>Become an Affiliate</li>
              <li>Fulfilment by Amazon</li>
              <li>Advertise Your Products</li>
              <li>Amazon Pay on Merchants</li>
            </ul>
          </div>
          <div className="footer__column">
            <h4>Let Us Help You</h4>
            <ul>
              <li>Your Account</li>
              <li>Returns Centre</li>
              <li>100% Purchase Protection</li>
              <li>Amazon App Download</li>
              <li>Help</li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <div className="footer__bottomColumn">
            <ul>
              <li>Conditions of Use & Sale</li>
              <li>Privacy Notice</li>
              <li>Interest-Based Ads</li>
            </ul>
          </div>
          <div className="footer__bottomColumn">
            <span>&copy; {new Date().getFullYear()} AmazonClone</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
