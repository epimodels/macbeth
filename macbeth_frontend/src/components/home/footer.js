import React from 'react';

function Footer() {
  return (
    <footer className="bg-light text-center text-lg text-muted" style={{'position':'absolute','bottom':'0', 'left':'0', 'right':'0'}}>
      <section>
        <span>Bird image created by silhouettegarden.com</span>
      </section>
      <section style={{'backgroundColor':'rgba(0, 0, 0, 0.05)'}}>
        <span>Team Nightingale</span>
      </section>
    </footer>
  );
}

export default Footer;