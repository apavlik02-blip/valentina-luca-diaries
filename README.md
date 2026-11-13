# Valentina & Luca Diaries

A static editorial site for Valentina &amp; Luca Diaries, published with GitHub Pages.

Tagline: *A love story told in slow mornings, faraway cities, and quiet luxury.*

Valentina & Luca are fictional characters created with AI.

## Local preview

From the repository root:

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080/ — or, to mimic the GitHub Pages project path, browse http://localhost:8080/ after placing the site in a `/valentina-luca-diaries/` folder. Asset paths are relative, so both a server root and the project path `/valentina-luca-diaries/` work.

## Site structure

```
index.html              Home (hero, diary teasers, about teaser, subscribe)
about/index.html        About page — live URL ends in /about/
css/style.css           Shared styles
js/site-config.js       SITE_BASE and BUTTONDOWN_USERNAME (edit these here)
js/subscribe.js         Shows the Buttondown form only when a username is set
images/                 Existing editorial photographs
posts/_template.html    Post template (not published; noindex; not linked)
feed.xml                RSS 2.0 (channel only until posts are published)
sitemap.xml             Home and About
```

## Public URL (SITE_BASE)

The public site URL, with no trailing slash, is defined in one obvious place:

**`js/site-config.js`** → `window.SITE_BASE`

Current value:

```
https://apavlik02-blip.github.io/valentina-luca-diaries
```

Canonical, Open Graph, Twitter, and RSS `rel="alternate"` tags are also written as absolute URLs in each HTML page so crawlers can read them without JavaScript. `feed.xml` and `sitemap.xml` use the same base.

### Adding a custom domain

1. In the repository, add a `CNAME` file containing the domain (for example `www.example.com`).
2. In GitHub: Settings → Pages → Custom domain, and follow GitHub’s DNS instructions.
3. Change `SITE_BASE` in `js/site-config.js` to `https://www.example.com` (no trailing slash, unless the site lives in a subpath).
4. Update every canonical, `og:url`, `og:image`, Twitter image, and RSS alternate URL in the HTML pages, plus the URLs in `feed.xml` and `sitemap.xml`, to the new base.
5. After the domain is live, Medium canonical links should point at the custom-domain URLs.

## Subscribe (Buttondown)

The footer-adjacent subscribe section uses Buttondown’s documented HTML embed:

- `action`: `https://buttondown.com/api/emails/embed-subscribe/USERNAME`
- `method`: `post`
- `target`: `popupwindow`
- email input `name="email"`
- hidden input `name="embed"` value `1`

**To go live:** in `js/site-config.js`, replace the placeholder:

```js
window.BUTTONDOWN_USERNAME = "BUTTONDOWN_USERNAME";
```

with your Buttondown username (the slug in `https://buttondown.com/your-username`). That is the only line you need to change. Until it is set, the form stays hidden and the page shows “Subscriptions opening soon,” so nothing is submitted to a broken URL.

## Adding a post

1. Copy `posts/_template.html` to `posts/your-slug.html` (no leading underscore).
2. Replace `YOUR-SLUG`, `YOUR POST TITLE`, `YOUR-DESCRIPTION`, and the date.
3. Set the canonical, `og:url`, and social image URLs to:
   `https://apavlik02-blip.github.io/valentina-luca-diaries/posts/your-slug.html`
   (or your custom domain + `/posts/your-slug.html`).
4. Remove the `<meta name="robots" content="noindex, nofollow">` tag when the post should be indexed.
5. On the home page, turn the matching teaser card into a link to the new post and remove its “Coming soon” label.
6. Add an `<item>` to `feed.xml` (see the comment in that file for the shape).
7. Add the post’s absolute URL to `sitemap.xml`.

Do not link to `posts/_template.html`, and do not add it to the feed or sitemap. Keep unpublished draft text out of this public repository until a post is ready.

## GitHub Pages

The live site is served from the `main` branch, `/` (root), at:

https://apavlik02-blip.github.io/valentina-luca-diaries/

Work on a branch and review it before merging to `main`. A merge or push to `main` updates the live site.

GoatCounter analytics are already included on every page.
