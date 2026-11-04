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
  const whatsappButton = document.getElementById('send-whatsapp-enquiry');
  const enquiryForm = document.getElementById('enquiry-form');
  if (whatsappButton && enquiryForm) {
    whatsappButton.addEventListener('click', () => {
      if (!enquiryForm.reportValidity()) return;
      const fields = new FormData(enquiryForm);
      const value = (name) => String(fields.get(name) || '').trim();
      const message = [
        'Nano Shipbroking website enquiry',
        'Type: ' + value('type'),
        'Name: ' + value('name'),
        'Email: ' + value('email'),
        'Company: ' + (value('company') || 'Not specified'),
        'Phone: ' + (value('phone') || 'Not specified'),
        'Details: ' + value('details')
      ].join('\n');
      window.location.href = 'https://wa.me/905524574088?text=' + encodeURIComponent(message);
    });
  }
  // The contact form posts directly to FormSubmit from its HTML action.
  // Do not intercept submit: blocking it prevents delivery.
})();