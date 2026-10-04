export const views = Object.freeze({
  flip: { label: 'Flip clock', url: 'https://www.onlinedigitalclock.com/flip-clock/?embed=1' },
  local: { label: 'Local digital clock', url: 'https://www.onlinedigitalclock.com/' },
  karachi: { label: 'Karachi · Asia/Karachi', url: 'https://www.onlinedigitalclock.com/timezone/asia-karachi/' },
  london: { label: 'London · Europe/London', url: 'https://www.onlinedigitalclock.com/timezone/europe-london/' },
  newYork: { label: 'New York · America/New_York', url: 'https://www.onlinedigitalclock.com/timezone/america-new-york/' },
});

export function embedCode(key = 'flip', height = 560) {
  if (!Object.hasOwn(views, key)) throw new Error('Unknown clock view');
  const view = views[key];
  if (!Number.isInteger(height) || height < 360 || height > 1200) throw new Error('Height must be 360–1200 pixels');
  return `<iframe\n  src="${view.url}"\n  title="Digital Clock Online — ${view.label}"\n  width="100%"\n  height="${height}"\n  style="border: 0; display: block; border-radius: 16px;"\n  loading="lazy"\n  allow="fullscreen"\n  referrerpolicy="strict-origin-when-cross-origin"\n></iframe>\n<p>Clock by <a href="https://www.onlinedigitalclock.com/">Digital Clock Online</a>.</p>`;
}
