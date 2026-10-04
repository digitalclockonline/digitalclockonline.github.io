# Publish from WSL (Ubuntu)

Download digital-clock-examples.zip to your Windows Downloads folder. Use a fresh directory for this example project. The ZIP contains no .git directory, so these steps create new history.

## 1. Check your existing GitHub CLI setup

GitHub CLI is already configured in your WSL. No installation or new login is required.

```sh
gh auth status
gh api user --jq .login
```

Use your personal GitHub account with permission to create repositories in the `digitalclockonline` organization. The organization name is not a separate sign-in account.

## 2. Extract the package

Replace WINDOWS_USERNAME with the folder name under C:\Users. If your Downloads folder is elsewhere, use that path instead.

```sh
mkdir -p ~/personal/digital-clock-public
unzip /mnt/c/Users/WINDOWS_USERNAME/Downloads/digital-clock-examples.zip -d ~/personal/digital-clock-public
cd ~/personal/digital-clock-public/digital-clock-examples
ls -la
```

Use an empty destination on the first extraction. Do not extract into the production checkout. You should see README.md, docs/, and the other public example files.

Optional local preview:

```sh
python3 -m http.server 8000 --directory docs
```

Open http://localhost:8000/ in Windows. Press Ctrl+C when finished.

## 3. Create fresh Git history and publish

```sh
git init -b main
git config user.name "Muhammad Arif"
git config user.email "29769352+marif0025@users.noreply.github.com"
git add README.md PUBLISHING.md WSL-PUBLISH.md VERIFICATION.md LICENSE .gitignore docs tests
git diff --cached --stat
git commit -m "Add public clock examples and Pages documentation"

gh repo create digitalclockonline/digitalclockonline.github.io \
  --public --source=. --remote=origin --push \
  --description "Public clock integration examples and setup documentation for Digital Clock Online."

gh repo edit digitalclockonline/digitalclockonline.github.io \
  --homepage https://www.onlinedigitalclock.com/ \
  --add-topic clock --add-topic iframe --add-topic timezone \
  --add-topic github-pages --add-topic examples
```

If GitHub reports that the repository already exists, stop and inspect it rather than replacing its contents or changing another repository's visibility.

## 4. Enable Pages

```sh
gh api --method POST repos/digitalclockonline/digitalclockonline.github.io/pages \
  -f 'build_type=legacy' \
  -f 'source[branch]=main' \
  -f 'source[path]=/docs'
```

If Pages is already configured, inspect the settings rather than repeating the creation request. If this command is rejected, use GitHub's repository Settings → Pages: choose Deploy from a branch, main, /docs, then Save.

## 5. Check publication

```sh
gh api repos/digitalclockonline/digitalclockonline.github.io/pages \
  --jq '{status: .status, url: .html_url, source: .source}'
gh run list --repo digitalclockonline/digitalclockonline.github.io --limit 5
```

The expected URL is https://digitalclockonline.github.io/. Allow a few minutes for the first deployment. A queued build is not a successful launch: check the Actions result and open the live URL. Verify the clock renders, ticks, and uses `https://www.onlinedigitalclock.com/flip-clock/?embed=1`; also test Copy HTML and mobile layout.

## Later changes

From this same example project:

```sh
git add docs README.md
git commit -m "Update clock examples"
git push origin main
```

After successful launch, update the README's pre-publication wording and VERIFICATION.md, then commit and push those changes too. See PUBLISHING.md for Search Console verification and sitemap submission.
