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
    navToggle.dataset.ready = 'true';
  }
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = String(new Date().getFullYear()); });
  const form = document.getElementById('enquiry-form');
  if (!form) return;

  const type = document.getElementById('enquiry-type');
  const guidance = document.getElementById('enquiry-guidance');
  const status = document.getElementById('form-status');
  const copyText = document.getElementById('enquiry-copy-text');
  const whatsapp = document.getElementById('direct-whatsapp');
  const email = document.getElementById('direct-email');
  const defaultGuidance = guidance.textContent;
  const guidanceByType = {
    'Cargo / Chartering': 'Commodity, quantity (MT), loading and discharge ports, laycan, and loading and discharge rates if known.',
    'Vessel Availability': 'Vessel name or IMO, DWT or DWCC, open port and dates, gear, and preferred trading area.',
    'Bunker / Marine Fuels': 'Vessel name or IMO, supply port, ETA, fuel grades, and quantity per grade.'
  };

  form.addEventListener('submit', event => event.preventDefault());
  type.addEventListener('change', () => {
    guidance.textContent = guidanceByType[type.value] || defaultGuidance;
  });
  form.addEventListener('input', () => {
    status.textContent = '';
    copyText.hidden = true;
  });

  const prepare = () => {
    const fields = new FormData(form);
    const value = name => String(fields.get(name) || '').trim();
    for (const name of ['name', 'details']) {
      form.elements.namedItem(name).setCustomValidity(
        value(name) ? '' : 'Please fill in this field.'
      );
    }
    if (!form.reportValidity()) return null;

    return {
      subject: 'Nano Shipbroking - ' + value('type'),
      body: [
        'Nano Shipbroking website enquiry',
        'Type: ' + value('type'),
        'Name: ' + value('name'),
        value('email') && 'Email: ' + value('email'),
        value('company') && 'Company: ' + value('company'),
        value('phone') && 'Phone: ' + value('phone'),
        'Details:\n' + value('details')
      ].filter(Boolean).join('\n')
    };
  };

  document.getElementById('send-whatsapp-enquiry').addEventListener('click', () => {
    const message = prepare();
    if (!message) return;
    const url = new URL(whatsapp.href);
    url.searchParams.set('text', message.body);
    status.textContent = 'Review your draft and press Send in WhatsApp.';
    window.location.assign(url.href);
  });
  document.getElementById('send-email-enquiry').addEventListener('click', () => {
    const message = prepare();
    if (!message) return;
    const subject = encodeURIComponent(message.subject);
    const body = encodeURIComponent(message.body.replace(/\r?\n/g, '\r\n'));
    status.textContent = 'Review your draft and press Send in your email app.';
    window.location.href = email.href + '?subject=' + subject + '&body=' + body;
  });
  document.getElementById('copy-enquiry').addEventListener('click', async () => {
    const message = prepare();
    if (!message) return;
    try {
      await navigator.clipboard.writeText(message.body);
      status.textContent = 'Enquiry copied. Paste it into WhatsApp or webmail.';
    } catch {
      copyText.value = message.body;
      copyText.hidden = false;
      copyText.focus();
      copyText.select();
      status.textContent = 'Copy the selected text and paste it into WhatsApp or webmail.';
    }
  });

  document.getElementById('enquiry-copy-help').hidden = false;
  form.hidden = false;
})();
