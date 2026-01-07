Make your agent start from a deliberate “design vibe + component architecture” and only then generate React/Tailwind, because AI-looking UIs usually come from default aesthetic choices plus className “stacking” that turns into uneditable spaghetti. The goal is to force specificity (visual tokens, spacing rules, interaction rules) and to avoid the recurring patterns people instantly associate with vibe-coded React.

## Define a design vibe first
Human-designed frontends typically lock in a design language first (fonts, radius, color scheme, design system) before writing components, while AI tends to jump straight to assembling familiar patterns. Require the agent to create a small “UI contract” file (tokens + rules) before it writes any JSX so the output can’t default to the common AI look.[1]

Agent rules:
- Create `designTokens.ts` (or CSS variables) with: 6–10 neutrals, 1 accent, 1 danger, 3 radius values, 3 shadow levels, 2 border widths.
- Choose typography intentionally; avoid defaulting to Inter/Geist unless the project already uses them, because AI frontends often “only know” those two fonts.[1]
- For every new page/component, reference tokens (no ad-hoc colors/radii).

## Avoid “AI-default” visuals
AI-generated UIs are often recognizable from repetitive styling motifs: purple/blue or pink/purple gradients, shadows everywhere, and overly “fancy” hover animations that appear on every button. The most obvious interaction tell is the repeated `hover:scale-110`, plus hover states that turn the whole button into the accent color and add glow effects.[1]

Agent rules (don’ts):
- Don’t use gradient backgrounds unless a ticket explicitly asks for it; especially avoid purple→blue and pink→purple gradients.[1]
- Don’t apply drop shadows globally; use them only on elevated surfaces and only from your shadow scale.[1]
- Don’t add hover scale/glow by default; hover states should usually be subtle (color/underline/outline) and consistent across the app.[1]

## Reduce Tailwind “class soup”
A common AI giveaway is generating working components that are hard to edit because Tailwind classes keep stacking with each prompt, creating tech debt and “spaghetti code”. AI tools also frequently default to shadcn/ui and then pile more Tailwind classes on top of those components in a repetitive pattern.[1]

Agent rules:
- Prefer variants over piles of classes: centralize styling in `cva`/variants (or CSS Modules) and keep JSX `className` short.
- If using shadcn/ui, fork/customize base components once, then use variants—don’t keep re-styling per-callsite.[1]
- Enforce a “max className length” heuristic (example: if a `className` exceeds ~120 chars, refactor into a variant or utility).

## Add human code signals
Research comparing machine- vs human-authored code finds machine code tends to be more concise, more “natural” (i.e., more statistically predictable), uses a narrower token spectrum, and shows especially distinctive regularity in whitespace tokens. It also tends to use fewer identifiers (less naming variety) and can include more comments at higher-generation randomness, which can feel performative rather than purposeful.[2]

Agent rules:
- Use richer, domain-specific identifiers (prefer `billingAddress`, `invoiceLineItems`, `selectedPlanId` over `data`, `items`, `value`) because machine code skews toward fewer identifiers and narrower vocabulary.[2]
- Avoid “over-optimized concision” in JSX; extract named subcomponents where it improves scanning (even if it adds lines), since humans often accept more lines for readability.[2]
- Comments: only add comments that explain a non-obvious decision/tradeoff; avoid narrating what the code already says because machine outputs can over-comment in a way that feels synthetic.[2]

## Agent checklist (paste into your prompt)
- Before coding: write tokens + interaction rules (hover, focus, elevation).[1]
- Visual bans: no default gradients, no shadow-on-everything, no `hover:scale-110` everywhere.[1]
- Architecture: variants over long `className`; refactor if “class soup” grows.[1]
- Human signals: specific naming, readable decomposition, purposeful comments (not filler).[2]

