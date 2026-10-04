import { embedCode, views } from './embed.mjs';

const viewSelect = document.querySelector('#view');
const heightSelect = document.querySelector('#height');
const frame = document.querySelector('#clock-preview');
const code = document.querySelector('#embed-code');
const openClock = document.querySelector('#open-clock');
const status = document.querySelector('#copy-status');
const copyButton = document.querySelector('#copy-code');

function update() {
  const view = views[viewSelect.value];
  const height = Number(heightSelect.value);
  if (frame.getAttribute('src') !== view.url) frame.src = view.url;
  frame.title = `Digital Clock Online — ${view.label}`;
  frame.height = String(height);
  openClock.href = view.url;
  code.value = embedCode(viewSelect.value, height);
  status.textContent = '';
}
viewSelect.addEventListener('change', update);
heightSelect.addEventListener('change', update);
copyButton.hidden = false;
copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(code.value);
    status.textContent = 'Embed code copied.';
  } catch {
    code.focus();
    code.select();
    status.textContent = 'Select and copy the highlighted code using your browser’s Copy command.';
  }
});
update();

const themeButton = document.querySelector('#theme');
themeButton.hidden = false;
themeButton.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  themeButton.setAttribute('aria-pressed', String(next === 'dark'));
  themeButton.textContent = next === 'dark' ? 'Light page' : 'Dark page';
});
