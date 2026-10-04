# Digital Clock Online — examples

Public integration examples and setup documentation for [Digital Clock Online](https://www.onlinedigitalclock.com/).

Use the hosted clock in a page, select a named time zone, or install the existing Chrome extension. This repository contains only newly written example files and documentation. The production website and browser extension source code remain private.

**Demo:** [Clock examples on GitHub Pages](https://digitalclockonline.github.io/) — available after Pages is enabled and deployment completes.

## Try the clock

- [Digital Clock Online](https://www.onlinedigitalclock.com/)
- [Fullscreen flip clock](https://www.onlinedigitalclock.com/flip-clock/)
- [Check your clock against server time](https://www.onlinedigitalclock.com/clock-accuracy/)
- [Install from the Chrome Web Store](https://chromewebstore.google.com/detail/lcaglchajnkhhfpkfejkbilndlkppbjb)
- [Extension features and privacy](https://www.onlinedigitalclock.com/extension/)

## Embed a public clock page

```html
<iframe
  src="https://www.onlinedigitalclock.com/flip-clock/?embed=1"
  title="Digital Clock Online — Flip clock"
  width="100%"
  height="560"
  style="border: 0; display: block; border-radius: 16px;"
  loading="lazy"
  allow="fullscreen"
  referrerpolicy="strict-origin-when-cross-origin"
></iframe>
<p>Clock by <a href="https://www.onlinedigitalclock.com/">Digital Clock Online</a>.</p>
```

The flip-clock example uses the embed URL supplied by the project owner: `https://www.onlinedigitalclock.com/flip-clock/?embed=1`. Local digital and named time zone examples still frame their existing public pages. Cross-origin iframe rendering still needs a browser check on the published Pages site.

Start with a 560 px frame height and test at your intended width. Use the controls inside the hosted clock for its display settings. The parent page can change frame dimensions but cannot modify the hosted page's DOM. Retain a direct clock link in case a browser or network blocks the frame.

Complete examples:

- [Basic HTML example](docs/examples/basic.html)
- [Named time zone example](docs/examples/timezone.html)
- [Interactive builder source](docs/index.html)

## Named time zones

Use a dedicated time zone page instead of hard-coding UTC offsets. Daylight-saving rules can change an offset during the year.

| Place | IANA zone | Public page |
| --- | --- | --- |
| Karachi | `Asia/Karachi` | [Karachi clock](https://www.onlinedigitalclock.com/timezone/asia-karachi/) |
| London | `Europe/London` | [London clock](https://www.onlinedigitalclock.com/timezone/europe-london/) |
| New York | `America/New_York` | [New York clock](https://www.onlinedigitalclock.com/timezone/america-new-york/) |

[Browse all time zones](https://www.onlinedigitalclock.com/timezones/).

## Run locally

Requires Python 3 for a local web server. No package installation or build step is needed.

```sh
python3 -m http.server 8000 --directory docs
```

Open `http://localhost:8000/`. Use HTTP rather than opening the file directly, because the builder uses JavaScript modules. The embedded clock requires internet access.

Run the dependency-free code checks with Node.js 20 or later:

```sh
node --test tests/embed.test.mjs
python3 tests/check_site.py
```

## Publish

See [PUBLISHING.md](PUBLISHING.md) for the fresh public repository, `main` → `/docs` Pages setup, About field, privacy boundary, and Search Console instructions.

For copyable WSL commands, see [WSL-PUBLISH.md](WSL-PUBLISH.md).

See [VERIFICATION.md](VERIFICATION.md) for completed checks and pending browser/publication checks.

GitHub Pages serves only `docs/`. Do not attach a production remote, import production Git history, or add production bundles, maps, settings, vault notes, or credentials to this project.

## Privacy and limits

This documentation page adds no analytics, account sign-in, or extension permissions. The iframe runs the production website; its [privacy policy](https://www.onlinedigitalclock.com/privacy/) applies, including its own cookies, analytics, and advertising. Frame permissions and browser policies can change. Keep the direct link available.

## License

[MIT](LICENSE) applies only to the files in this example repository. It grants no rights to the private production application, extension source, or branding.

Questions about the hosted product? [Contact Digital Clock Online](https://www.onlinedigitalclock.com/contact/).
