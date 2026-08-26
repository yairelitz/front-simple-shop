import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-section footer-brand">
          <h2>Simple Shop</h2>

          <p>
            חוויית קנייה פשוטה, מהירה ובטוחה.
            <br />
            כל מה שאתה צריך במקום אחד.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>קישורים מהירים</h3>

          <ul>
            <li>דף הבית</li>
            <li>מוצרים</li>
            <li>העגלה שלי</li>
            <li>החשבון שלי</li>
          </ul>
        </div>

        {/* Customer Service */}
        <div className="footer-section">
          <h3>שירות לקוחות</h3>

          <ul>
            <li>שאלות נפוצות</li>
            <li>משלוחים</li>
            <li>החזרות וביטולים</li>
            <li>מדיניות פרטיות</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>צור קשר</h3>

          <p>📧 support@simpleshop.com</p>
          <p>📞 050-1234567</p>
          <p>📍 ישראל</p>
        </div>

      </div>

      {/* Trust badges */}
      <div className="footer-features">

        <div className="footer-feature">
          <span>🔒</span>
          <div>
            <strong>תשלום מאובטח</strong>
            <small>הפרטים שלך מוגנים</small>
          </div>
        </div>

        <div className="footer-feature">
          <span>🚚</span>
          <div>
            <strong>משלוח מהיר</strong>
            <small>משלוח עד הבית</small>
          </div>
        </div>

        <div className="footer-feature">
          <span>↩</span>
          <div>
            <strong>החזרה פשוטה</strong>
            <small>תהליך החזרה נוח</small>
          </div>
        </div>

      </div>

      {/* Technologies */}
      <div className="footer-tech">
        <span>Built with</span>
        <strong>React</strong>
        <span>•</span>
        <strong>TypeScript</strong>
        <span>•</span>
        <strong>Node.js</strong>
        <span>•</span>
        <strong>MongoDB</strong>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} Simple Shop. כל הזכויות שמורות.
        </span>

        <span className="footer-made">
          Made with ❤️
        </span>
      </div>

    </footer>
  );
}

export default Footer;