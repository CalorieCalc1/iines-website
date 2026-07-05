# IINES Ltd — Website

Static website for **IINES Ltd**, a London-based web development, AI SEO, and online reputation management agency.

Live at **[iines.co.uk](https://iines.co.uk)**

## Tech Stack

- Plain HTML, CSS, and vanilla JavaScript (no framework, no build step)
- Hosted on Vercel (Hobby plan)
- Deployed automatically via GitHub integration
- Domain registered at Hostinger, DNS managed at Hostinger
- Contact forms powered by Web3Forms (free tier)

## Pages

| Page | Path | Description |
|------|------|-------------|
| Homepage | `/` | Hero, services, stats, results, testimonials, founder, contact |
| Pricing | `/pricing` | Three service tiers (Rapid Launch, Visibility Audit, Revenue Engine) |
| Reputation Management | `/reputation-management` | DMCA takedowns, content removal, three pricing tiers |
| Contact | `/contact` | Contact form and details |
| Blog Hub | `/blog` | All blog articles |
| Blog Articles | `/blog/*` | 8 articles on AI SEO, reputation management, content removal |
| Privacy Policy | `/privacy` | GDPR-compliant privacy policy |
| Terms of Service | `/terms` | Service terms and limitations |
| 404 | `/404` | Custom not-found page |

## Blog Articles

1. How to Remove Leaked Content From the Internet
2. How Does a DMCA Takedown Work?
3. What Is AI SEO (And Why Traditional SEO Is Dying)
4. How to Check If Your Brand Appears in ChatGPT & Gemini
5. What Is Online Reputation Management?
6. Why Zero-Click Search Changes Everything for B2B
7. Why Most Businesses Fail Within 5 Years
8. How Website Speed Kills Your Conversions and Rankings

## File Structure

```
iines-website/
├── index.html              # Homepage
├── pricing.html            # Pricing page
├── reputation-management.html
├── contact.html
├── privacy.html
├── terms.html
├── 404.html
├── styles.css              # Main stylesheet
├── reputation.css          # Reputation page overrides
├── script.js               # Sticky CTA, mobile nav, scroll reveal, form handling
├── favicon.svg
├── founder.jpg             # Founder photo
├── og-image.png            # Open Graph share image (1200x630)
├── robots.txt
├── sitemap.xml
├── vercel.json             # Clean URLs, cache headers, security headers
└── blog/
    ├── index.html          # Blog hub
    ├── blog.css            # Article layout styles
    ├── what-is-ai-seo.html
    ├── how-to-check-brand-in-chatgpt.html
    ├── what-is-reputation-management.html
    ├── zero-click-search-b2b.html
    ├── why-businesses-fail-first-year.html
    ├── website-speed-kills-conversions.html
    ├── how-dmca-takedown-works.html
    └── how-to-remove-leaked-content.html
```

## Local Development

No build step required. Clone and open `index.html` in a browser, or run a local server:

```bash
npx serve .
```

## Deployment

Pushes to `master` are automatically deployed to Vercel. The production domain is `iines.co.uk` (apex), with `www.iines.co.uk` redirecting via 308.

## Configuration

- **Web3Forms access key** is set in `script.js` for contact form delivery to `IINES.LTD@proton.me`
- **WhatsApp Business** integration is built but disabled (`WHATSAPP_ENABLED = false` in `script.js`) until the business number is live
- **Google Search Console** verified via DNS TXT record at Hostinger
- **Vercel Web Analytics** and **Speed Insights** enabled via script tags on all pages

## SEO Features

- Clean URLs (no `.html` extensions) via `vercel.json`
- `sitemap.xml` submitted to Google Search Console
- `robots.txt` pointing to sitemap
- Organization schema on homepage
- Service schema on reputation management page
- BlogPosting schema on all blog articles
- Open Graph tags on all pages
- Internal cross-linking across all blog posts

## Contact

**IINES Ltd**  
London, UK  
Email: IINES.LTD@proton.me  
Website: [iines.co.uk](https://iines.co.uk)  
LinkedIn: [linkedin.com/in/ian-silva-seo1](https://www.linkedin.com/in/ian-silva-seo1/)

## License

© 2026 IINES Ltd. All rights reserved. This codebase is proprietary and not licensed for redistribution or reuse.
