# Nano Shipbroking

Static GitHub Pages website for Nano Shipbroking, an independent shipbroker
based in Istanbul, Türkiye. The site covers cargo and chartering, vessel
availability, and marine fuel enquiries.

- Website — https://nanoshipbroking.com
- Enquiries — https://nanoshipbroking.com/contact.html#enquiry
- Email — ali@nanoshipbroking.com
- Phone and WhatsApp — +90 552 457 4088

## Local preview

Run `python3 -m http.server 8000` at the repository root and open
`http://localhost:8000`.

## Contact flow

`contact.html` contains the form and direct contact links. `script.js` uses
those links to open a draft in WhatsApp or an email app. Visitors review the
draft and press Send there, or copy it into WhatsApp or webmail.

Before publishing, check the phone, email and WhatsApp links and footers on all
pages. Try both draft buttons and Copy enquiry with multiline text containing
Arabic and ampersands. At mobile width with JavaScript disabled, check that
navigation and direct contact links are available and that the form is hidden.
