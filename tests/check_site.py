"""Validate static links and project-path compatibility without third-party packages."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import xml.etree.ElementTree as ET

root = Path(__file__).resolve().parents[1]
docs = root / 'docs'
expected = 'https://digitalclockonline.github.io/'
errors = []

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.refs = []
        self.canonical = []
        self.h1 = 0
        self.iframes = 0
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a:
            if a['id'] in self.ids: errors.append('Duplicate id: ' + a['id'])
            self.ids.add(a['id'])
        if tag == 'h1': self.h1 += 1
        if tag == 'link' and a.get('rel') == 'canonical': self.canonical.append(a['href'])
        if tag == 'iframe':
            self.iframes += 1
            if not a.get('title'): errors.append('Iframe missing title')
            if a.get('allow') != 'fullscreen': errors.append('Iframe missing fullscreen permission')
        for attr in ['href', 'src']:
            if attr in a: self.refs.append(a[attr])

pages = {}
for path in docs.rglob('*.html'):
    parser = Page()
    parser.feed(path.read_text())
    pages[path] = parser
    if parser.h1 != 1: errors.append(f'{path.name}: expected one h1')
    if parser.iframes != 1: errors.append(f'{path.name}: expected one iframe')

for path, page in pages.items():
    for ref in page.refs:
        url = urlsplit(ref)
        if url.scheme or url.netloc: continue
        if url.path.startswith('/'): errors.append(f'Root-relative path breaks project Pages: {ref}')
        target = (path.parent / unquote(url.path)).resolve() if url.path else path
        if not target.is_relative_to(docs): errors.append(f'Link outside Pages artifact: {ref}')
        if not target.exists(): errors.append(f'Missing local file: {ref}')
        if url.fragment and target in pages and url.fragment not in pages[target].ids:
            errors.append(f'Missing fragment: {ref}')

assert pages[docs/'index.html'].canonical == [expected], 'Wrong Pages canonical'
tree = ET.parse(docs/'sitemap.xml')
assert [e.text for e in tree.findall('.//{*}loc')] == [expected], 'Wrong sitemap'
assert (docs/'.nojekyll').exists(), 'Missing .nojekyll'
assert 'Sitemap: ' + expected + 'sitemap.xml' in (docs/'robots.txt').read_text(), 'Wrong robots sitemap'
assert not list(docs.rglob('*.map')), 'Source maps in public files'
if errors: raise SystemExit('\n'.join(errors))
print(f'PASS: {len(pages)} HTML pages; local links, fragments, iframe titles, Pages paths, canonical, and sitemap.')
