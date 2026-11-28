# Naveen Chauhan - Portfolio (React + Vite)

## Run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Change content from ONE place
Everything on the site comes from **`src/data/portfolio.json`**:

| Key | Controls |
| --- | --- |
| `site` | tab title, logo text, footer text |
| `theme` | `dark` and `light` colours (bg + 2 accents) and the `default` mode |
| `nav`, `sectionTitles` | menu items and section headings |
| `profile` | name, typed roles, intro, photo, resume, email, phone, location, buttons |
| `socials` | round icons in the hero (icons: mail, phone, external, code) |
| `stats`, `about`, `skills`, `techMarquee` | numbers, bio, skill bars, scrolling tags |
| `experience`, `education` | timeline + cards |
| `projects`, `projectFilters` | project cards and filter buttons |
| `contact.formEndpoint` | paste a Formspree URL to send mail from the form; empty = opens mail app |

Add a new project = add one object to `projects`. The card appears automatically.

## Files in /public
- `photo.png` - your photo (change `profile.photo` if you rename it)
- `resume.pdf` - resume for the Download button

## Deploy
Upload the `dist` folder to Netlify, Vercel or GitHub Pages (`base` is already `./`).

## New in v2
- **Dark / Light toggle** (sun/moon button in navbar, remembers the choice)
- **Custom cursor** (dot + ring that grows on links; auto-off on touch devices)
- **Project detail modal** - click any project card (Esc or backdrop click closes)
- **Scramble effect** on section headings, hero scroll fade, animated gradient blobs

### Project screenshots
Put an image in `public/projects/` and add one line to the project in `portfolio.json`:
```json
"image": "projects/asklex.png"
```
It then shows as the banner inside that project's modal.
now install all changes
