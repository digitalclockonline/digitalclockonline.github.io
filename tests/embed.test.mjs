import test from 'node:test';
import assert from 'node:assert/strict';
import { views, embedCode } from '../docs/assets/embed.mjs';

test('all named views generate a public HTTPS clock frame with attribution', () => {
  for (const key of Object.keys(views)) {
    const url = new URL(views[key].url);
    assert.equal(url.origin, 'https://www.onlinedigitalclock.com');
    assert.equal(url.search, key === 'flip' ? '?embed=1' : '');
    const code = embedCode(key, 720);
    assert.ok(code.includes(`src="${url.href}"`));
    assert.ok(code.includes('height="720"'));
    assert.ok(code.includes('allow="fullscreen"'));
    assert.ok(code.includes('<a href="https://www.onlinedigitalclock.com/">'));
  }
});

test('builder rejects arbitrary URLs, prototype properties, and invalid dimensions', () => {
  for (const key of ['<script>', 'https://example.com', 'missing', '__proto__', 'constructor']) {
    assert.throws(() => embedCode(key));
  }
  for (const height of [0, -1, 359, 1201, 560.5, '560', NaN, Infinity]) {
    assert.throws(() => embedCode('flip', height));
  }
});
