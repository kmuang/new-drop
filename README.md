# Officelite

Officelite is a responsive early-access landing page for a team collaboration platform. It introduces the product, explains key benefits, compares three plans, and lets visitors request waitlist access.

## Features

- Responsive hero with a clear early-access call to action
- Product benefit section and illustrative dashboard visuals
- Basic, Pro, and Ultimate plan comparison
- Plan-specific waitlist requests
- Accessible email signup form with client-side validation and submission feedback
- Reduced-motion support and keyboard-visible focus indicators

## Run locally

This is a static website and does not require a build step or package installation.

1. Open `index.html` in a browser, or serve the project directory with a local static web server.
2. To test the signup form end to end, use a local or hosted HTTP server and submit a valid email address.

## Waitlist form

The signup form posts to the configured [Formspree endpoint]. It sends the visitor's email address and the selected plan (or “Early access”) and displays success or error feedback on the page. For production, confirm that the Formspree project is active and configure its notification, spam protection, and data-retention settings.

## Project files

- `index.html` — page content, navigation, pricing, and signup form
- `styles.css` — visual styles, responsive layouts, animations, and accessibility preferences
- `script.js` — waitlist submission and pricing-button interactions
- `img/` — site image assets, including the favicon

## Customization

- Update the product copy, plan names, and pricing in `index.html`.
- Change colors, spacing, and responsive breakpoints in `styles.css`.
- Replace the Formspree form action in `index.html` if the signup destination changes.
