# Installation guide

Gruvbox Cozy ships as three independent editions — **Soft**, **Medium** and **Hard**. Each
is a normal Obsidian theme folder containing `theme.css`, `manifest.json` and `versions.json`.
Install one, or all three side by side.

---

## 1. Get the files

Download this repository:

- **Code → Download ZIP** on GitHub, then unzip, **or**
- `git clone https://github.com/your-username/gruvbox-cozy.git`

The themes live in [`themes/`](../themes/):

```
themes/
├── gruvbox-cozy-soft/      → Gruvbox Cozy Soft
├── gruvbox-cozy-medium/    → Gruvbox Cozy Medium   (classic)
└── gruvbox-cozy-hard/      → Gruvbox Cozy Hard
```

## 2. Find your vault's themes folder

Every vault has a hidden `.obsidian` folder at its root. Themes go in `.obsidian/themes/`.

| OS | Path |
| --- | --- |
| macOS | `~/YourVault/.obsidian/themes/` |
| Windows | `C:\Users\You\YourVault\.obsidian\themes\` |
| Linux | `~/YourVault/.obsidian/themes/` |

**The easy way:** in Obsidian open **Settings → Appearance**, scroll to **Themes**, and click the
small **folder icon** — it opens `.obsidian/themes/` directly, no hidden-file hunting required.

> If you browse manually and can't see `.obsidian`, enable "show hidden files":
> macOS Finder `⌘ + ⇧ + .` · Windows Explorer **View → Show → Hidden items**.

## 3. Copy a theme in

Copy the edition folder you want into `.obsidian/themes/` and rename it to the theme's name so
it's easy to recognise:

```
.obsidian/themes/
└── Gruvbox Cozy Medium/
    ├── theme.css
    ├── manifest.json
    └── versions.json
```

Repeat for the other editions if you want all three.

## 4. Enable it

In Obsidian: **Settings → Appearance → Themes** → choose **Gruvbox Cozy Medium** (or Soft / Hard)
from the dropdown. The theme applies instantly. 🎉

---

## Optional: Style Settings

For accent color, reading font, colored headings and italic emphasis without touching code,
install the community plugin **[Style Settings](https://github.com/mgmeyers/obsidian-style-settings)**:

1. **Settings → Community plugins → Browse**, search **Style Settings**, install and enable it.
2. Open it from the command palette (`⌘/Ctrl + P` → "Style Settings") or its settings tab.
3. Find the **Gruvbox Cozy** section and tweak away.

See [customization.md](customization.md) for every option.

## Mobile (iOS / Android)

Community themes work on mobile too. The simplest path is to keep your vault on **Obsidian Sync**
or any synced folder (iCloud, Dropbox, etc.) — install the theme on desktop and it syncs over.
To install directly on device, use a file manager to drop the theme folder into
`YourVault/.obsidian/themes/`, then enable it under **Settings → Appearance**.

## Updating

Themes don't auto-update when installed manually. To update, download the latest release and
replace the files in your theme folder, then reload Obsidian (`⌘/Ctrl + R`).

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Theme doesn't appear in the dropdown | Make sure the folder is **directly** inside `.obsidian/themes/` and contains `theme.css` + `manifest.json`. Then reload Obsidian (`⌘/Ctrl + R`). |
| It applied but looks plain | Confirm you selected it under **Appearance → Themes**, not just "Base color scheme". |
| Colors look off in light mode | Toggle **Appearance → Base color scheme** to Light — Gruvbox Cozy styles both. |
| Accent won't change | Install **Style Settings**, or set `--gb-accent` in a CSS snippet (see customization.md). |
| Want a different contrast | Install another edition (Soft / Medium / Hard) and switch in the theme picker. |

Still stuck? Open an issue on the repository.
