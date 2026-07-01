# Changelog

All notable changes to Gruvbox Cozy are documented here.
This project adheres to [Semantic Versioning](https://semver.org).

## [1.1.0] — 2026-07-01

### Added
- Full `--color-*-rgb` variable support for callouts, canvas, and Obsidian's rgba() usage
- `--caret-color`, `--text-on-accent-inverted`, `--text-error`, `--text-success`, `--text-warning`
- `--background-modifier-message`, `--background-modifier-error-rgb`, `--background-modifier-success-rgb`
- Complete **Properties (metadata)** styling — all `--metadata-*` variables
- Complete **Canvas** plugin support — `--canvas-background`, `--canvas-card-label-color`, `--canvas-dot-pattern`, `--canvas-color-1` through `--canvas-color-6`
- Complete **Navigation** variables — `--nav-item-*`, `--nav-indentation-*`, `--nav-collapse-*`, `--nav-heading-*`
- Complete **Tabs** variables — `--tab-*` including stacked tab support
- **Divider** variables — `--divider-color`, `--divider-width`, `--divider-vertical-height`
- **Ribbon** variables — `--ribbon-background`, `--ribbon-width`, `--ribbon-padding`
- **Titlebar** variables — `--titlebar-*`, `--header-height`
- **Vault profile** variables — `--vault-profile-*`
- **Embed** variables — `--embed-background`, `--embed-border-*`, `--embed-padding`, `--embed-font-style`
- **Workspace** translucent background — `--workspace-background-translucent`
- **Sidebar** variables — `--sidebar-markdown-font-size`, `--sidebar-tab-text-display`

### Changed
- Bumped `minAppVersion` to `1.6.0` for full compatibility with current Obsidian
- Consolidated duplicate `--background-modifier-error`, `--text-error` etc. into the main `body` block
- All three editions (Soft, Medium, Hard) now share the same complete variable set — only background tones differ

### Removed
- `uploads/` directory (contained corrupted/unusable file)

## [1.0.0] — 2026-06-03

### Added
- Initial release in three editions: **Soft**, **Medium**, and **Hard** contrast.
- Full dark **and** light mode built on the Gruvbox palette.
- Colored headings (H1–H6), syntax highlighting, warm callouts, accent blockquotes,
  colored checkboxes and tags.
- Optional pixel-art **maple-leaf watermark** in the file explorer (Style Settings toggle + opacity).
- Optional **dot-grid note background** — subtle dotted paper texture (Style Settings toggle + strength).
- Optional **colored task states** for the Tasks plugin (`/` `!` `?` `>` `-`) — Style Settings toggle.
- The maple leaf also ships as reusable **ASCII art** in `art/maple-leaf.txt`.
- [Style Settings](https://github.com/mgmeyers/obsidian-style-settings) support:
  accent color (7 options), reading font (sans / serif / mono), colored headings toggle,
  italic emphasis toggle.
- Interactive HTML preview under `preview/` covering the editor, command palette,
  quick switcher, settings, graph view and context menu.
- Documentation: customization guide and full palette reference.

[1.0.0]: https://github.com/your-username/gruvbox-cozy/releases/tag/1.0.0
