# Publication checklist

## 1. Fresh repository

Create `digitalclockonline/digitalclockonline.github.io` as a new **public** repository. Do not change the visibility of any production repository and do not fork or mirror production history. The reviewed files here were written from scratch.

Description: `Public clock integration examples and setup documentation for Digital Clock Online.`

About website: `https://www.onlinedigitalclock.com/`

Suggested topics: `clock`, `iframe`, `html`, `timezone`, `github-pages`, `examples`.

If uploading through GitHub, preserve the folder structure and include the empty `docs/.nojekyll` file. Do not initialize a second README or license.

For local Git/CLI publication, first check that `gh` is authenticated to the intended account. From this project directory:

```sh
git status --short
git add README.md PUBLISHING.md WSL-PUBLISH.md VERIFICATION.md LICENSE .gitignore docs tests
git commit -m "Add public clock examples and Pages documentation"
gh repo create digitalclockonline/digitalclockonline.github.io --public --source=. --remote=origin --push --description "Public clock integration examples and setup documentation for Digital Clock Online."
gh repo edit digitalclockonline/digitalclockonline.github.io --homepage https://www.onlinedigitalclock.com/ --add-topic clock --add-topic iframe --add-topic timezone --add-topic github-pages --add-topic examples
```

These commands are for an authenticated machine with GitHub CLI installed. No token needs to be added to the repository.

## 2. Enable GitHub Pages

In **Settings → Pages → Build and deployment**, choose:

- Source: **Deploy from a branch**
- Branch: **main**
- Folder: **/docs**

Save and wait for the Pages deployment to finish. The intended URL is:

`https://digitalclockonline.github.io/`

GitHub documentation: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

Once the demo is confirmed live, remove the pre-publication qualifier next to the demo link in README.md.

## 3. Browser verification

- Load the Pages URL on desktop and at a 375 px mobile width; check horizontal overflow and keyboard navigation.
- Confirm the framed clock renders and advances. Test local, Karachi, London, and New York views. HTTP 200 and iframe `load` are not proof of successful rendering.
- Copy the HTML and paste it into a separate test page. Check the manual-copy fallback with clipboard access blocked.
- Test 420, 560, and 720 px frame heights; scrolling inside a full-page embed is expected.
- Confirm the documentation theme control does not claim to change the cross-origin clock theme.
- Check website, accuracy, Store, and standalone-example links.
- Capture a real screenshot only after the live embed renders, and add it to the README if useful.

The production host may change framing policies. If embedding fails, retain direct links and resolve it in the private production project before advertising a working widget. Do not copy production code into this repository as a workaround.

## 4. Indexing

The page has a self-referencing Pages canonical and a sitemap at:

`https://digitalclockonline.github.io/sitemap.xml`

Add `https://digitalclockonline.github.io/` as a Search Console URL-prefix property. Insert Google's exact verification meta tag into `docs/index.html` after Search Console supplies it. No invented verification token is included.

Submit the sitemap and inspect the page URL to request indexing. This organization site publishes at the origin root, so docs/robots.txt serves as https://digitalclockonline.github.io/robots.txt and advertises the sitemap. Search Console verification and indexing are pending until performed in the account.

Do not canonicalize the examples page to the production homepage; they have distinct content and purposes. Do not claim guaranteed indexing, followed links, ranking credit, or a particular backlink value.

## 5. Measurement

Record the launch date, public repository URL, Pages URL, and a current backlink baseline in the private outreach tracker. Check GitHub/Pages referrals and indexing after launch, then compare backlink reports over the following 4–8 weeks. No analytics or tracker credentials are included here.
