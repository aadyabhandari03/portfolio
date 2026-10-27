# Webpage Audit: Personal Profile

This file reviews the personal profile page in this folder (`index.html`, `style.css`, and `script.js`).

## What the page includes

- A document title in the browser tab: `PLACEHOLDER Full Name | Personal Profile`
- One main heading (`h1`) introducing the person
- An **About** section with placeholder biography text and contact facts
- A **Skills** section written as a list
- A **Projects** section with three cards and external links
- A contact area and footer
- Styling kept in `style.css` (no inline `style` attributes)
- JavaScript in `script.js` for the current year, mobile menu, and active nav highlighting

## Structure and semantics

| Requirement | Status | Notes |
| --- | --- | --- |
| Page title | Pass | Set in `<title>` |
| One main heading | Pass | Single `h1` in the hero |
| About section | Pass | `#about` with heading and paragraphs |
| Skills as a list | Pass | Unordered list `.skill-list` |
| Projects with links | Pass | Three articles, each with a link |
| Separate CSS file | Pass | Linked from the document head |
| No inline styles | Pass | Presentation is in `style.css` |
| PLACEHOLDER markers | Pass | Unknown personal details are labeled |

## Accessibility

- Landmarks: `header`, `nav`, `main`, `footer`
- Navigation has an accessible name (`aria-label="Primary"`)
- The menu button uses `aria-expanded` and `aria-controls`
- Project links that open a new tab include `rel="noopener noreferrer"`
- Color contrast is generally readable on the warm off-white background
- Headings follow a logical order: `h1` then `h2` then `h3`

## Responsive layout

- The layout is centered and readable on a typical desktop width
- Below 700px, the navigation collapses behind a Menu button
- Skill items use a wrapping grid so they stack on smaller screens

## JavaScript behavior

- Footer year is filled automatically
- Mobile menu opens and closes
- Nav links close the menu after a click
- The current section is highlighted in the nav while scrolling

## Placeholders to replace

Search the project for the word `PLACEHOLDER` and update:

- Full name (title, heading, footer)
- First name (logo)
- Introduction and About paragraphs
- Location, role, and email
- Skill names
- Project titles, descriptions, and URLs
- Contact email and profile URL

## Suggested next improvements

- Replace example.com links with real GitHub, live demos, or assignment repos
- Add a real photo only if you want one; keep alt text meaningful
- Add more specific skills once your assignment details are known
- Check the page in a browser after replacing placeholders
