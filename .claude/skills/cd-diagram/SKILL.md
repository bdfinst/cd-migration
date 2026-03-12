---
name: cd-diagram
description: >
  Generate SVG diagrams for the CD migration documentation site (beyond.minimumcd.org).
  Use this skill whenever the user asks for a diagram, visual, workflow illustration,
  before/after comparison, or any figure to embed in a content page. Also use it when
  adding a diagram would meaningfully improve a content page being written or edited,
  even if the user has not explicitly asked for one. This skill is the single source of
  truth for the site's diagram color palette, layout conventions, and SVG output format.
---

Generate production-quality SVG diagrams for the CD migration documentation site.
SVG is the required output format. Do not generate Mermaid for new diagrams unless
the user explicitly asks for it.

## Workflow

1. Understand the diagram's communicative goal: what should the reader understand after
   seeing it? Design around that, not around data completeness.
2. Choose a diagram type (see below), then plan the layout on paper before writing SVG.
3. Write the SVG, apply the color palette and conventions in this skill.
4. Verify text fits inside every shape before finalizing (critical - see Text Fitting).
5. Save the file to the correct location and add the Hugo `figure` shortcode reference.

## File Conventions

Save SVGs to `static/images/` in a contextually appropriate subdirectory:

| Content section | SVG subdirectory |
|---|---|
| Symptoms | `static/images/symptoms/` |
| Anti-patterns | `static/images/anti-patterns/` |
| Testing reference | `static/images/testing/` |
| Pipeline reference | `static/images/` (root) |
| Migrate to CD | `static/images/` (root) |

Filename: kebab-case slug matching the content page, e.g. `test-automation-lags-development.svg`.

Reference in markdown using the Hugo figure shortcode:

```
{{< figure src="/images/[subdirectory]/[filename].svg" alt="[full text description]" >}}
```

The `alt` text must be a complete prose description of the diagram — enough for a
screen reader user or search engine to understand the content without seeing the image.

## Color Palette

This is the canonical palette for all site diagrams. Do not invent new colors.

| Token | Hex fill | Hex stroke | Semantic meaning |
|---|---|---|---|
| `navy` | `#224968` | `#1a3a54` | Primary stage, active team, development |
| `green` | `#0d7a32` | `#0a6128` | Success, done, positive outcome |
| `green-muted` | `#4a6741` | `#3a5331` | Static analysis, first gate |
| `steel` | `#30648e` | `#224968` | Secondary stage, QA, parallel step |
| `gray` | `#6c757d` | `#565e64` | Neutral, passive, optional step |
| `red` | `#a63123` | `#8a2518` | Problem state, risk, production failure |
| `red-light` | `#FEF2F2` | `#FECACA` | Anti-pattern zone background |
| `container-bg` | `#edf2f7` | `#224968` | Group/container background |
| `canvas-bg` | `#fafafa` | — | Diagram background |
| `title` | `#1a2a3a` | — | Title text |
| `label` | `#556` | — | Caption, legend text |
| `white` | `#ffffff` | — | Text on colored nodes |
| `divider` | `#e5e7eb` | — | Panel dividers, grid lines, separators |
| `annotation` | `#556` | — | Axis labels, tick marks, callout text |

All colored nodes use `color: #ffffff` for their text labels.
Do not use generic CSS grays (`#ccc`, `#999`, `#555`, `#888`) for any element.
Use `divider` for grid lines and structural separators; use `annotation` for small labels and captions.

## SVG Structure

Every diagram follows this shell:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 [W] [H]"
     role="img" aria-labelledby="[id]-title [id]-desc"
     font-family="system-ui, -apple-system, sans-serif" font-size="13">

  <title id="[id]-title">[Short diagram title]</title>
  <desc id="[id]-desc">[Full prose description for accessibility]</desc>

  <!-- Background -->
  <rect width="[W]" height="[H]" fill="#fafafa" rx="4"/>

  <!-- Arrow marker definitions (if needed) -->
  <defs>
    <marker id="[id]-arr" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0,8 3,0 6" fill="#224968"/>
    </marker>
  </defs>

  <!-- Title -->
  <text x="[W/2]" y="30" text-anchor="middle" font-size="17"
        font-weight="bold" fill="#1a2a3a">[Diagram title]</text>

  <!-- Content -->
  [nodes, connectors, labels, legend]

</svg>
```

Use a unique short prefix for all IDs within a diagram (e.g., `ta` for test-automation)
to avoid conflicts when multiple SVGs appear on the same page.

## Standard Canvas Sizes

| Layout | viewBox |
|---|---|
| Wide single flow (LR) | `0 0 720 320` |
| Tall single flow (TB) | `0 0 560 480` |
| Before/after side-by-side | `0 0 720 400` |
| Two-panel comparison | `0 0 700 300` |
| Complex multi-group | `0 0 720 520` |

Always add ~40px of bottom margin for the legend.

## Text Fitting (Critical)

Text that overflows a shape breaks the diagram. Follow these rules:

**Estimate character width by font size:**
- font-size 13: ~7.5px per character
- font-size 12: ~7px per character
- font-size 11: ~6.5px per character

**Calculate minimum node width:**
`min_width = (longest_line_chars × char_width) + 32`  (16px padding each side)

**Example:** "Dev codes story" = 15 chars × 7.5 = 112.5 + 32 = 145px minimum.
Round up to the nearest clean number; 160px is a safe default for short labels.

**Rules:**
- If a label needs two lines, use two `<text>` elements: first at `y = center - 8`,
  second at `y = center + 8`. Increase node height to accommodate (standard two-line
  height: 48px).
- Never use more than two lines in a standard node. Split the concept or use a
  larger node with a subtitle.
- `text-anchor="middle"` with `x` at the node center handles horizontal centering.
- Test mentally: if the longest word in a label is over 12 characters, the node
  probably needs to be at least 160px wide.

## Node Types

### Standard node (primary action or state)
```svg
<rect x="[x]" y="[y]" width="160" height="44" rx="4"
      fill="#224968" stroke="#1a3a54" stroke-width="1"/>
<text x="[cx]" y="[cy]" text-anchor="middle" font-size="13"
      font-weight="600" fill="#fff">[Label]</text>
```

### Two-line node
```svg
<rect x="[x]" y="[y]" width="160" height="48" rx="4"
      fill="#224968" stroke="#1a3a54" stroke-width="1"/>
<text x="[cx]" y="[cy-8]" text-anchor="middle" font-size="13"
      font-weight="600" fill="#fff">[Line 1]</text>
<text x="[cx]" y="[cy+8]" text-anchor="middle" font-size="13"
      font-weight="600" fill="#fff">[Line 2]</text>
```

### Node with subtitle (action + clarifying note)
```svg
<rect x="[x]" y="[y]" width="200" height="52" rx="4"
      fill="#224968" stroke="#1a3a54" stroke-width="1"/>
<text x="[cx]" y="[cy-7]" text-anchor="middle" font-size="13"
      font-weight="600" fill="#fff">[Label]</text>
<text x="[cx]" y="[cy+9]" text-anchor="middle" font-size="10"
      fill="rgba(255,255,255,0.8)">[Subtitle]</text>
```

### Group container with header
```svg
<!-- Container background -->
<rect x="[x]" y="[y]" width="[w]" height="[h]" rx="6"
      fill="#edf2f7" stroke="#224968" stroke-width="1.5"/>
<!-- Header bar -->
<rect x="[x]" y="[y]" width="[w]" height="32" rx="6"
      fill="#224968"/>
<!-- Header bar bottom fill (hides top radius on bottom of header) -->
<rect x="[x]" y="[y+18]" width="[w]" height="14" fill="#224968"/>
<!-- Header label -->
<text x="[cx]" y="[y+20]" text-anchor="middle" font-size="13"
      font-weight="600" fill="#fff">[Group title]</text>
```

## Connectors

### Solid arrow (normal flow)
```svg
<line x1="[x1]" y1="[y1]" x2="[x2]" y2="[y2]"
      stroke="#224968" stroke-width="2" marker-end="url(#[id]-arr)"/>
```

### Dashed arrow (optional, conditional, or negative path)
```svg
<line x1="[x1]" y1="[y1]" x2="[x2]" y2="[y2]"
      stroke="#224968" stroke-width="1.5" stroke-dasharray="5,4"
      marker-end="url(#[id]-arr)"/>
```

### Arrow label
```svg
<text x="[midpoint-x]" y="[midpoint-y - 6]" text-anchor="middle"
      font-size="10" fill="#556">[label]</text>
```

## Before/After Layout

Place the "before" (problem state) on the left, "after" (target state) on the right.
Use a vertical divider between them.

Label each panel clearly:
```svg
<text x="[left-center]" y="55" text-anchor="middle" font-size="12"
      font-weight="700" fill="#a63123">Before</text>
<text x="[right-center]" y="55" text-anchor="middle" font-size="12"
      font-weight="700" fill="#0d7a32">After</text>
```

Divider:
```svg
<line x1="360" y1="60" x2="360" y2="[H - 50]"
      stroke="#e5e7eb" stroke-width="1.5"/>
```

"Before" nodes use `red` palette; "After" nodes use `green` and `navy` palette.

## Legend

Place a legend at the bottom if the diagram uses more than two colors. Keep it
compact - one row of small colored squares and labels.

```svg
<!-- 12×12 swatch -->
<rect x="[x]" y="[H-26]" width="12" height="12" rx="2"
      fill="[color]" stroke="[stroke]" stroke-width="1"/>
<text x="[x+16]" y="[H-16]" font-size="11" fill="#556">[Label]</text>
```

Spacing: place each swatch+label ~120px apart. Start at x=30.

## Diagram Types

### Workflow (left-to-right)
Nodes in a horizontal chain connected by arrows. Use for process steps.
Standard spacing: 160px nodes, 40px gaps. Total width: `n × 200` + margins.

### Before/After (side-by-side panels)
Two vertical stacks or horizontal chains, divided by a center line.
Label panels "Before" (red) and "After" (green).

### Group/container (stages with sub-steps)
Use the container pattern for stages that contain multiple steps.
Nest standard nodes inside containers. Leave 24px padding inside containers.

### Comparison table (side-by-side attributes)
Two columns of aligned rows. Use `#edf2f7` row backgrounds alternating with `#ffffff`.

## Quality Checklist

Before saving:
- [ ] Every text element fits inside its containing shape
- [ ] All colors come from the canonical palette
- [ ] Arrow markers are defined in `<defs>`
- [ ] `<title>` and `<desc>` elements are present for accessibility
- [ ] `role="img"` and `aria-labelledby` are set on `<svg>`
- [ ] No endashes, emdashes, or emoji in text labels
- [ ] The diagram reads left-to-right or top-to-bottom consistently
- [ ] A legend is present if the diagram uses 3 or more colors
- [ ] The `figure` shortcode alt text is a complete prose description

## Example: Before/After Workflow

Below is a complete minimal before/after workflow diagram as a reference.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 360"
     role="img" aria-labelledby="ex-title ex-desc"
     font-family="system-ui, -apple-system, sans-serif" font-size="13">

  <title id="ex-title">Before and After: Example Workflow</title>
  <desc id="ex-desc">
    Before (left): Step A leads to Step B leads to Step C (problem state).
    After (right): Step A and Step B happen together, then Step C (improved state).
  </desc>

  <rect width="720" height="360" fill="#fafafa" rx="4"/>

  <defs>
    <marker id="ex-arr" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0,8 3,0 6" fill="#224968"/>
    </marker>
    <marker id="ex-arr-r" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0,8 3,0 6" fill="#a63123"/>
    </marker>
  </defs>

  <!-- Diagram title -->
  <text x="360" y="32" text-anchor="middle" font-size="17"
        font-weight="bold" fill="#1a2a3a">Example Workflow</text>

  <!-- Panel labels -->
  <text x="178" y="56" text-anchor="middle" font-size="12"
        font-weight="700" fill="#a63123">Before</text>
  <text x="542" y="56" text-anchor="middle" font-size="12"
        font-weight="700" fill="#0d7a32">After</text>

  <!-- Divider -->
  <line x1="360" y1="62" x2="360" y2="310" stroke="#e5e7eb" stroke-width="1.5"/>

  <!-- BEFORE: three sequential steps -->
  <rect x="30" y="120" width="140" height="44" rx="4"
        fill="#a63123" stroke="#8a2518" stroke-width="1"/>
  <text x="100" y="146" text-anchor="middle" font-size="13"
        font-weight="600" fill="#fff">Step A</text>

  <line x1="170" y1="142" x2="196" y2="142"
        stroke="#a63123" stroke-width="2" marker-end="url(#ex-arr-r)"/>

  <rect x="196" y="120" width="140" height="44" rx="4"
        fill="#a63123" stroke="#8a2518" stroke-width="1"/>
  <text x="266" y="146" text-anchor="middle" font-size="13"
        font-weight="600" fill="#fff">Step B</text>

  <!-- AFTER: two steps together, then result -->
  <rect x="378" y="100" width="160" height="48" rx="4"
        fill="#224968" stroke="#1a3a54" stroke-width="1"/>
  <text x="458" y="121" text-anchor="middle" font-size="13"
        font-weight="600" fill="#fff">Step A</text>
  <text x="458" y="139" text-anchor="middle" font-size="13"
        font-weight="600" fill="#fff">+ Step B</text>

  <line x1="538" y1="124" x2="562" y2="124"
        stroke="#224968" stroke-width="2" marker-end="url(#ex-arr)"/>

  <rect x="562" y="104" width="130" height="40" rx="4"
        fill="#0d7a32" stroke="#0a6128" stroke-width="1"/>
  <text x="627" y="128" text-anchor="middle" font-size="13"
        font-weight="600" fill="#fff">Done</text>

  <!-- Legend -->
  <rect x="30" y="320" width="12" height="12" rx="2" fill="#a63123"/>
  <text x="46" y="330" font-size="11" fill="#556">Problem state</text>
  <rect x="160" y="320" width="12" height="12" rx="2" fill="#224968"/>
  <text x="176" y="330" font-size="11" fill="#556">Active step</text>
  <rect x="270" y="320" width="12" height="12" rx="2" fill="#0d7a32"/>
  <text x="286" y="330" font-size="11" fill="#556">Positive outcome</text>

</svg>
```
