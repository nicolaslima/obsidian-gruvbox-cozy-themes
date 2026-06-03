# Palette

![Gruvbox Cozy color palette](screenshots/palette-colors.png)

Gruvbox Cozy maps Pavel Pertsev's [Gruvbox](https://github.com/morhetz/gruvbox) palette onto
Obsidian's CSS variables. Dark mode uses the **bright** accent variants; light mode uses the
**neutral/faded** variants so they stay legible on cream.

## Backgrounds & foreground

### Dark

| Token | Hex | Used for |
| --- | --- | --- |
| `dark0_hard` | `#1d2021` | Hard background / sidebars |
| `dark0` | `#282828` | Medium background |
| `dark0_soft` | `#32302f` | Soft background |
| `dark1` | `#3c3836` | Raised surfaces |
| `dark2` | `#504945` | Borders |
| `dark3` | `#665c54` | Strong borders, faint text |
| `dark4` | `#7c6f64` | — |
| `gray` | `#928374` | Faint text, comments |
| `light4` | `#a89984` | Muted text |
| `light3` | `#bdae93` | — |
| `light2` | `#d5c4a1` | Code text |
| `light1` | `#ebdbb2` | **Body text** |
| `light0` | `#fbf1c7` | **Bright text** (bold, titles) |

### Light (cream)

| Token | Hex | Used for |
| --- | --- | --- |
| `light0_hard` | `#f9f5d7` | Hard background |
| `light0` | `#fbf1c7` | Medium background |
| `light0_soft` | `#f2e5bc` | Soft background |
| `light1` | `#ebdbb2` | Raised surfaces |
| `light2` | `#d5c4a1` | Borders |
| `dark2` | `#504945` | Muted text |
| `dark1` | `#3c3836` | **Body text** |
| `dark0` | `#282828` | **Bright text** |

## Accents

| Color | Dark (bright) | Light (neutral) | Mapped to |
| --- | --- | --- | --- |
| Red | `#fb4934` | `#cc241d` | `--color-red`, errors, H1 |
| Orange | `#fe8019` | `#d65d0e` | `--color-orange`, **default accent**, H2 |
| Yellow | `#fabd2f` | `#d79921` | `--color-yellow`, H3, highlight |
| Green | `#b8bb26` | `#98971a` | `--color-green`, strings, H4, success |
| Aqua | `#8ec07c` | `#689d6a` | `--color-cyan`, tags, H5 |
| Blue | `#83a598` | `#458588` | `--color-blue`, properties, H6 |
| Purple | `#d3869b` | `#b16286` | `--color-purple` / `--color-pink`, inline code |

## Syntax highlighting

| Token | Color |
| --- | --- |
| Comment | gray |
| Keyword | red |
| String | green |
| Function | aqua |
| Property | blue |
| Tag | yellow |
| Constant/value | purple |
| Operator | orange |

## Callouts

Each callout type is tinted with a palette color: `note`/`info` → aqua-blue, `tip` → aqua,
`success` → green, `question` → yellow, `warning` → orange, `danger` → red, `quote` → purple.
