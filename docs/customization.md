# Customization

Gruvbox Cozy is built to be tweaked. There are two ways: the **Style Settings** plugin
(no code) or a **CSS snippet** (full control).

## Style Settings (no code)

Install the community plugin **[Style Settings](https://github.com/mgmeyers/obsidian-style-settings)**,
then open its panel from the command palette or settings. Each edition exposes:

| Setting | Options | Default |
| --- | --- | --- |
| **Accent color** | Orange · Yellow · Aqua · Blue · Purple · Green · Red | Orange |
| **Colored headings** | On / Off — tint H1–H6 with the palette | On |
| **Reading font** | Sans-serif · Serif · Monospace | Sans-serif |
| **Italic emphasis** | On / Off — render `*text*` italic, Vim-style | On |
| **Sidebar maple leaf** | On / Off — subtle pixel-art watermark in the file explorer | On |
| **Maple leaf opacity** | 0 – 0.25 | 0.03 |
| **Dotted note background** | On / Off — subtle dot-grid paper behind notes | On |
| **Dot grid strength** | 0 – 14% | 5% |
| **Colored task states** | On / Off — color & label `/ ! ? > -` checkboxes (Tasks plugin) | On |

> The contrast (Soft / Medium / Hard) is **fixed per edition** — that's the whole point of
> shipping three. Install the edition you want, or install all three and switch from the
> theme picker.

## CSS snippets (full control)

Every color in the theme flows from a small set of `--gb-*` variables. Override any of them
in a snippet (`.obsidian/snippets/my-tweaks.css`, then enable it under
**Settings → Appearance → CSS snippets**) and the whole UI updates.

```css
/* Example: yellow accent + larger body text + tighter line height */
.theme-dark {
  --gb-accent: #fabd2f;
}
body {
  --font-text-size: 18px;
  --line-height-normal: 1.6;
}
```

Because the theme avoids `!important` almost everywhere, your snippet wins without a fight.

### Key variables

These are defined per mode on `.theme-dark` / `.theme-light`, then mapped onto Obsidian's
own variables.

| Variable | Role |
| --- | --- |
| `--gb-bg` | Editor background (the contrast tone) |
| `--gb-bg-alt` | Sidebars, code blocks, raised surfaces |
| `--gb-bg-raised` | Hovered/secondary surfaces |
| `--gb-bg1` … `--gb-bg4` | Borders and dividers (low → high) |
| `--gb-fg1` | Body text |
| `--gb-fg0` | Bright text (bold, titles) |
| `--gb-fg3`, `--gb-fg4`, `--gb-gray` | Muted / faint text |
| `--gb-accent` | The active accent (links, cursor, buttons) |
| `--gb-red` `--gb-orange` `--gb-yellow` `--gb-green` `--gb-aqua` `--gb-blue` `--gb-purple` | Named palette colors |

### Common recipes

```css
/* Neutral (cream) headings instead of colored */
body.gruvbox-heading-colors {
  --h1-color: var(--gb-fg0); --h2-color: var(--gb-fg0); --h3-color: var(--gb-fg0);
  --h4-color: var(--gb-fg0); --h5-color: var(--gb-fg0); --h6-color: var(--gb-fg0);
}

/* Squared-off code blocks */
body { --code-radius: 0; }

/* Stronger text selection */
body { --text-selection: color-mix(in srgb, var(--gb-accent) 40%, transparent); }
```

## Building your own edition

Want a contrast between two presets? Copy any `themes/gruvbox-cozy-*/theme.css`, then edit
the three lines under `/* fixed background tone */` in both the `.theme-dark` and
`.theme-light` blocks. Everything else is shared.
