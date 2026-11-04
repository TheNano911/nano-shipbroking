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
  const enquiryForm = document.getElementById('enquiry-form');
  const emailButton = document.getElementById('send-email-enquiry');
  if (enquiryForm) {
    const prepare = () => {
      if (!enquiryForm.reportValidity()) return null;
      const fields = new FormData(enquiryForm);
      const value = (name) => String(fields.get(name) || '').trim();
      return {
        subject: 'Nano Shipbroking - ' + value('type'),
        body: [
          'Nano Shipbroking website enquiry',
          'Type: ' + value('type'),
          'Name: ' + value('name'),
          'Email: ' + value('email'),
          'Company: ' + (value('company') || 'Not specified'),
          'Phone: ' + (value('phone') || 'Not specified'),
          '',
          'Details:',
          value('details')
        ].join('\n')
      };
    };
    const status = document.getElementById('form-status');
    enquiryForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const message = prepare();
      if (!message) return;
      if (status) status.textContent = 'WhatsApp will open with a prepared message. Press Send in WhatsApp to deliver your enquiry.';
      window.location.assign('https://wa.me/905524574088?text=' + encodeURIComponent(message.body));
    });
    if (emailButton) emailButton.addEventListener('click', () => {
      const message = prepare();
      if (!message) return;
      if (status) status.textContent = 'Your email app will open with a draft. Press Send there to deliver your enquiry.';
      window.location.href = 'mailto:ali@nanoshipbroking.com?subject=' + encodeURIComponent(message.subject) + '&body=' + encodeURIComponent(message.body);
    });
  }
})();