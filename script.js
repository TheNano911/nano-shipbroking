(() => {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');
  if (navToggle && nav) {
    const close = () => { nav.classList.remove('open'); navToggle.setAttribute('aria-expanded','false'); navToggle.setAttribute('aria-label','Open navigation'); document.body.classList.remove('menu-open'); };
    navToggle.addEventListener('click', () => {
      const open = !nav.classList.contains('open');
      nav.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      document.body.classList.toggle('menu-open', open);
    });
    nav.addEventListener('click', e => { if (e.target.closest('a')) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    window.addEventListener('resize', () => { if (window.innerWidth > 850) close(); });
  }
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = String(new Date().getFullYear()); });
  const form = document.getElementById('enquiry-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const val = k => String(data.get(k) || '').trim();
      const subject = `Nano Shipbroking - ${val('type')}`;
      const body = [
        `Enquiry type: ${val('type')}`, `Name: ${val('name')}`, `Company: ${val('company') || 'Not specified'}`,
        `Email: ${val('email')}`, `Phone / WhatsApp: ${val('phone') || 'Not specified'}`,
        '', 'Enquiry details:', val('details'), '', 'Sent via the Nano Shipbroking website email template.'
      ].join('\n');
      const mailto = `mailto:alinano@nanoshipbroking.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const status = document.getElementById('form-status');
      if (status) status.textContent = 'Your email application should open with the prepared enquiry. Please press Send there to complete it.';
      window.location.href = mailto;
    });
  }
})();