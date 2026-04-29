# Oylkka IT — Design System

A reference document for replicating the visual language, animation patterns, and component conventions used across the Oylkka IT Next.js / shadcn-ui codebase.

---

## 1. Design Philosophy

| Principle | Description |
|---|---|
| **Editorial / Magazine** | Generous whitespace, ruled dividers, eyebrow labels, restrained hierarchy |
| **Motion-first** | Every section animates in via `useInView` — nothing is static on load |
| **Grid discipline** | `max-w-7xl` container, consistent `px-4 sm:px-6 lg:px-8` gutters |
| **Accent economy** | One primary color does all the heavy lifting; muted-foreground fills the rest |

---

## 2. Color Tokens

All colors are consumed via Tailwind / shadcn CSS variables. Never hard-code hex values.

```
bg-background          — page background
bg-primary / text-primary — brand accent (used sparingly)
bg-primary/10          — tinted icon backgrounds
bg-primary/15          — hover-state tint
text-muted-foreground  — secondary text, icons, labels
border-border          — all dividers and card borders
border-primary/30      — hover border on cards
text-white / text-gray-300 — text on dark/image backgrounds
```

### Usage pattern
- **Primary** → values icon bg, stat numbers, eyebrow lines, animated rule, tag borders on hover
- **Muted-foreground** → body copy, icon labels, secondary headings (`italic font-light`)
- **White** → hero text, image overlay captions
- **Black overlays** → `from-black/95 via-black/70 to-black/20` (hero), `from-black/70 via-black/20` (cards)

---

## 3. Typography

```
Font stack: Tailwind defaults (customise via next/font if needed)
```

### Scale

| Role | Classes |
|---|---|
| Hero H1 | `text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight` |
| Section H2 | `text-3xl md:text-4xl font-bold leading-tight tracking-tight` |
| Card H3 | `text-base font-bold leading-snug` |
| Body | `text-sm md:text-base leading-relaxed` |
| Eyebrow label | `text-xs font-semibold tracking-[0.2em] uppercase text-primary` |
| Caption / tag | `text-[10px] font-semibold tracking-[0.18em] uppercase` |
| Stat number | `text-4xl md:text-5xl font-bold tabular-nums text-primary` |

### Italic contrast pattern
All headings use `italic font-bold text-primary` for the contrast word — no exceptions. This applies to both H1 heroes and H2 section headings.
```jsx
<h1>Let&apos;s{' '}
  <span className='italic font-bold text-primary'>create</span>{' '}
  something great<span className='text-primary'>.</span>
</h1>
```


### Punctuation accent
Terminal period always in `text-primary` on section headings.

---

## 4. Spacing & Layout

```
Container:   max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
Section gap: py-20 md:py-28
Card gap:    gap-5 (20px)
Card pad:    p-6 (cards) / p-5 (team cards body)
```

### Section anatomy
Every content section follows this structure:
1. **Eyebrow** — `h-px w-10 bg-primary` rule + small caps label
2. **Heading** — bold + italic contrast + primary period
3. **Body / grid**
4. `border-b border-border` bottom separator

---

## 5. Animation System

### Easing curve
```ts
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
// Custom cubic-bezier: fast start, elastic settle
```

### Core variants

```ts
// Fade + slide up — used for all text blocks and images
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: EASE, delay },
  }),
};

// Stagger container — wraps card grids
const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

// Card child — triggered by stagger parent
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};
```

### Scroll trigger pattern
```ts
const ref = useRef<HTMLDivElement>(null);
const inView = useInView(ref, { once: true, margin: '-60px' });

// Attach ref to the section header wrapper
// Pass inView to animate prop: animate={inView ? 'show' : 'hidden'}
```

### Stagger delay convention (within a section)
```
Eyebrow row   → custom={0}
Heading       → custom={0.1}
First para    → custom={0.15}
Second para   → custom={0.2}
CTA / avatar  → custom={0.3}
```

### Hover interactions on cards
```ts
whileHover={{ y: -4 }}
transition={{ type: 'spring', stiffness: 280, damping: 22 }}
```

---

## 6. Component Patterns

### 6.1 Eyebrow row
```jsx
<div className='flex items-center gap-3 mb-5'>
  <div className='h-px w-10 bg-primary' />
  <span className='text-xs font-semibold tracking-[0.2em] uppercase text-primary'>
    Section Label
  </span>
</div>
```

### 6.2 Full-bleed hero section
```jsx
<section className='relative min-h-[70vh] flex items-center overflow-hidden border-b border-border'>
  {/* Background image + overlay */}
  <div className='absolute inset-0 z-0'>
    <Image src={img} alt='' fill className='object-cover' priority />
    <div className='absolute inset-0 bg-linear-to-r from-black/95 via-black/70 to-black/20' />
  </div>
  {/* Content max-w container, z-10 */}
</section>
```
Gradient direction: `to-r` keeps the left edge nearly opaque for text legibility and fades to transparency on the right.

### 6.3 Stats strip (divided table)
```jsx
<div className='grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border'>
  {stats.map(stat => (
    <div className='py-10 px-6 flex flex-col items-center justify-center gap-2'>
      <p className='text-4xl md:text-5xl font-bold text-primary tabular-nums'>{stat.value}</p>
      <div className='flex items-center gap-1.5'>
        <stat.icon className='w-3.5 h-3.5 text-muted-foreground' />
        <p className='text-xs text-muted-foreground tracking-wide uppercase font-medium'>{stat.label}</p>
      </div>
    </div>
  ))}
</div>
```

### 6.4 Value / feature card
```jsx
<div className='group rounded-2xl border border-border p-6
  hover:border-primary/30 hover:bg-primary/2 transition-colors duration-300
  flex flex-col gap-4'>

  {/* Header row: icon + tag pill */}
  <div className='flex items-center justify-between'>
    <div className='w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center
      group-hover:bg-primary/15 transition-colors duration-300'>
      <Icon className='w-5 h-5 text-primary' />
    </div>
    <span className='text-[10px] font-semibold tracking-[0.18em] uppercase
      border border-border rounded-full px-2.5 py-1 text-muted-foreground
      group-hover:border-primary/30 transition-colors duration-300'>
      Tag
    </span>
  </div>

  <h3 className='text-base font-bold leading-snug'>Title</h3>
  <p className='text-sm text-muted-foreground leading-relaxed flex-1'>Description</p>

  {/* Animated rule + index */}
  <div className='flex items-center gap-2'>
    <div className='h-px w-5 bg-primary/40 group-hover:w-8 transition-all duration-300' />
    <span className='text-[10px] text-primary/60 font-semibold tracking-wide uppercase'>01</span>
  </div>
</div>
```

### 6.5 Team / media card
```jsx
<div className='group rounded-2xl border border-border overflow-hidden
  hover:border-primary/30 hover:shadow-xl hover:shadow-black/5 transition-all duration-300'>

  {/* Photo */}
  <div className='relative h-56 overflow-hidden'>
    <Image src={img} alt='' fill className='object-cover group-hover:scale-105 transition-transform duration-700' />
    <div className='absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent' />
  </div>

  {/* Body */}
  <div className='p-5 flex flex-col gap-3'>
    <div>
      <h3 className='text-base font-bold leading-tight'>Name</h3>
      <div className='flex items-center gap-2 mt-2'>
        <div className='h-px w-5 bg-primary/40 group-hover:w-8 transition-all duration-300' />
        <span className='text-[10px] font-semibold tracking-[0.18em] uppercase text-primary/60'>Role</span>
      </div>
    </div>
    <p className='text-sm text-muted-foreground leading-relaxed'>Bio</p>
  </div>
</div>
```

### 6.6 Image card with floating caption (story block)
```jsx
<div className='relative h-105 md:h-130 rounded-2xl overflow-hidden border border-border'>
  <Image src={img} alt='' fill className='object-cover' />
  <div className='absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent' />

  {/* Caption */}
  <div className='absolute bottom-0 left-0 right-0 p-6'>
    <div className='flex items-center gap-2 mb-2'>
      <div className='h-px w-5 bg-white/60' />
      <span className='text-[10px] font-semibold tracking-[0.18em] uppercase text-white/60'>Label</span>
    </div>
    <p className='text-white text-xl font-bold leading-snug'>Caption text</p>
  </div>
</div>
```

### 6.7 Avatar stack
```jsx
<div className='flex -space-x-2.5'>
  {members.slice(0, 3).map(m => (
    <div key={m.name} className='relative w-9 h-9 rounded-full border-2 border-background overflow-hidden'>
      <Image src={m.image} alt={m.name} fill className='object-cover' />
    </div>
  ))}
  {/* Overflow count bubble */}
  <div className='relative w-9 h-9 rounded-full border-2 border-background bg-primary/10 flex items-center justify-center'>
    <span className='text-[10px] font-bold text-primary'>200+</span>
  </div>
</div>
```

---

## 7. Animated Rule (micro-detail)

The expanding horizontal rule is the most repeated micro-interaction in the system. Use it beneath any role/category label inside a card.

```jsx
<div className='flex items-center gap-2'>
  <div className='h-px w-5 bg-primary/40 group-hover:w-8 transition-all duration-300' />
  <span className='text-[10px] font-semibold tracking-[0.18em] uppercase text-primary/60'>
    {label}
  </span>
</div>
```

---

## 8. Button Conventions

```jsx
/* Primary CTA */
<Button size='lg' asChild className='h-12 px-8 gap-2'>
  <Link href='/packages'>Label</Link>
</Button>

/* Secondary CTA */
<Button size='lg' variant='outline' asChild className='h-12 px-8'>
  <Link href='#anchor'>Label</Link>
</Button>

/* Side-by-side layout (always, never stacked) */
<div className='flex flex-row gap-3'>
  <Button className='flex-1 sm:flex-none'>Primary</Button>
  <Button variant='outline' className='flex-1 sm:flex-none'>Secondary</Button>
</div>
```

---

## 9. Image Overlay Gradients

| Context | Gradient |
|---|---|
| Hero (left-heavy) | `bg-linear-to-r from-black/95 via-black/70 to-black/20` |
| Card / story image (bottom-up) | `bg-linear-to-t from-black/70 via-black/20 to-transparent` |
| Lighter card scrim | `bg-linear-to-t from-black/70 via-black/20 to-transparent` |

---

## 10. Footer

### Structure
```
<footer>
  <Newsletter />          ← border-b stripe
  <div py-12>             ← main content
    grid lg:grid-cols-5   ← brand col (col-span-2) + 3 nav cols
    <bottom-bar />        ← border-t pt-8, copyright + trust badges
  </div>
</footer>
```

### Brand column (col-span-2)
Four stacked blocks with `space-y-6`:
1. **Logo** — icon square + wordmark (see §11)
2. **Tagline** — `text-sm text-muted-foreground leading-relaxed max-w-xs`
3. **Contact list** — icon + label, links use `hover:text-primary transition-colors duration-200`
4. **Social icon row** — square icon buttons (see §12)

### Contact item pattern
```jsx
// Linked item
<a href={href} className='flex items-center gap-2.5 text-sm text-muted-foreground
  hover:text-primary transition-colors duration-200 group'>
  <Icon className='w-3.5 h-3.5 text-primary shrink-0' />
  {label}
</a>

// Non-linked item (e.g. address)
<div className='flex items-center gap-2.5 text-sm text-muted-foreground'>
  <Icon className='w-3.5 h-3.5 text-primary shrink-0' />
  {label}
</div>
```
Icon size is `w-3.5 h-3.5`, always `text-primary`, always `shrink-0`.

### Nav columns
Each column uses the eyebrow rule pattern as the column header (rule width `w-5`, not `w-10`):
```jsx
<div className='flex items-center gap-2.5 mb-5'>
  <div className='h-px w-5 bg-primary' />
  <span className='text-[10px] font-semibold tracking-[0.2em] uppercase text-primary'>
    Company
  </span>
</div>
<ul className='space-y-3'>
  <li>
    <Link className='text-sm text-muted-foreground hover:text-primary transition-colors duration-200'>
      Link
    </Link>
  </li>
</ul>
```

### Bottom bar
```jsx
<div className='border-t border-border pt-8'>
  <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
    <p className='text-xs text-muted-foreground'>
      © {new Date().getFullYear()} GoShareBD. All rights reserved.
    </p>

    {/* Trust badge row — dot separator pattern */}
    <div className='flex items-center gap-1.5 text-xs text-muted-foreground'>
      <span className='w-1 h-1 rounded-full bg-primary/50' />
      <span>Secure Payment</span>
      <span className='w-1 h-1 rounded-full bg-primary/50 ml-1' />
      <span>100% Verified Tours</span>
      <span className='w-1 h-1 rounded-full bg-primary/50 ml-1' />
      <span>Local Guides</span>
    </div>
  </div>
</div>
```
The `w-1 h-1 rounded-full bg-primary/50` dot is the system's inline separator — reuse it anywhere trust badges or metadata tags appear in a row.

---

## 11. Logo / Brand Mark

Consistent across navbar and footer:
```jsx
<div className='flex items-center gap-2.5'>
  <div className='w-9 h-9 bg-primary rounded-xl flex items-center justify-center shrink-0'>
    <Compass className='w-5 h-5 text-primary-foreground' />
  </div>
  <span className='font-bold text-lg tracking-tight'>GoShareBD</span>
</div>
```
- Icon container: `w-9 h-9 bg-primary rounded-xl` — same shape as social icon buttons but filled
- Inner icon: `w-5 h-5 text-primary-foreground` (inverted)
- Wordmark: `font-bold text-lg tracking-tight`

---

## 12. Social Icon Button

```jsx
<a
  href={href}
  target='_blank'
  rel='noopener noreferrer'
  aria-label={label}
  className='w-9 h-9 rounded-xl border border-border flex items-center justify-center
    text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5
    transition-all duration-200'
>
  <Icon className='w-4 h-4' />
</a>
```
Three-state hover: text → primary, border → primary/30, bg → primary/5. Always `transition-all duration-200`.

---

## 13. Newsletter Strip

A full-width `border-b` stripe that sits above the main footer content. Always `py-10`.

### Layout
```jsx
<div className='border-b border-border'>
  <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
    <div className='grid md:grid-cols-2 gap-8 items-center'>
      {/* Left: eyebrow + heading + subtext */}
      {/* Right: form or success state */}
    </div>
  </div>
</div>
```

### Left column
Standard eyebrow → heading → body pattern. Heading is compact (`text-2xl md:text-3xl`) with italic contrast:
```jsx
<div className='space-y-3'>
  <div className='flex items-center gap-3'>
    <div className='h-px w-8 bg-primary' />   {/* w-8 in tight sections */}
    <span className='text-xs font-semibold tracking-[0.2em] uppercase text-primary'>Newsletter</span>
  </div>
  <h3 className='text-2xl md:text-3xl font-bold tracking-tight leading-tight'>
    Stay{' '}
    <span className='italic font-light text-muted-foreground'>inspired</span>
    <span className='text-primary'>.</span>
  </h3>
  <p className='text-sm text-muted-foreground leading-relaxed max-w-sm'>Subtext here.</p>
</div>
```

### Form
```jsx
<div className='flex flex-col sm:flex-row gap-3'>
  <Field className='flex-1' data-invalid={!!errors.email}>
    <Input
      type='email'
      placeholder='your@email.com'
      className='h-11 rounded-xl'
      {...register('email')}
    />
    {errors.email && <FieldError>{errors.email.message}</FieldError>}
  </Field>
  <Button type='submit' className='h-11 px-6 gap-2 whitespace-nowrap self-start'>
    <Send className='w-4 h-4' />
    Subscribe
  </Button>
</div>
```
- Input height `h-11`, border-radius `rounded-xl` (matches card radius vocabulary)
- Button `self-start` so it doesn't stretch vertically when the field has an error below it

### Loading state
```jsx
<Loader2 className='w-4 h-4 animate-spin' />
```
Replace icon with spinner, label becomes `Subscribing…`

### Success state
```jsx
<div className='flex items-center gap-3 rounded-2xl border border-border px-5 py-4'>
  <div className='w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0'>
    <CheckCircle2 className='w-4 h-4 text-primary' />
  </div>
  <div>
    <p className='text-sm font-semibold'>You're subscribed!</p>
    <p className='text-xs text-muted-foreground mt-0.5'>We'll be in touch soon.</p>
  </div>
</div>
```
Uses the same icon-container shape (`w-9 h-9 rounded-xl bg-primary/10`) as feature cards, social buttons, and the logo mark.

### Validation
- Library: `react-hook-form` + `zod` + `@hookform/resolvers/zod`
- Schema: `z.string().min(1, '...').email('...')`
- Error surface: `<Field data-invalid>` + `<FieldError>` (shadcn field primitives)

---

## 14. Eyebrow Rule Width Convention

The `h-px bg-primary` rule before eyebrow labels scales by context:

| Context | Width |
|---|---|
| Full page section header | `w-10` |
| Column header inside footer | `w-5` |
| Compact strip (newsletter, captions) | `w-8` |
| Inside image overlay caption | `w-5 bg-white/60` |
| Animated card rule (hover expand) | `w-5 → w-8 on hover` |

---

## 15. Master Checklist

### Page section
- [ ] Eyebrow row (rule + small caps label in `text-primary`)
- [ ] Heading uses bold + `italic font-light text-muted-foreground` contrast + primary period
- [ ] `useRef` + `useInView({ once: true, margin: '-60px' })` attached to section header wrapper
- [ ] Text blocks use `fadeUp` with staggered `custom` delays
- [ ] Card grids wrapped in `gridVariants` motion container with `cardVariants` children
- [ ] Cards have `whileHover={{ y: -4 }}` spring transition
- [ ] Section ends with `border-b border-border` (except last)
- [ ] Container is `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- [ ] Section padding is `py-20 md:py-28`

### Footer
- [ ] Newsletter strip rendered above main content, separated by `border-b`
- [ ] Brand column spans `col-span-2` in a `lg:grid-cols-5` grid
- [ ] Nav column headers use `w-5` eyebrow rule (not `w-10`)
- [ ] Contact icons are `w-3.5 h-3.5 text-primary shrink-0`
- [ ] Social buttons are `w-9 h-9 rounded-xl border border-border` with three-state hover
- [ ] Bottom bar uses `w-1 h-1 rounded-full bg-primary/50` dot separators between trust badges

### Newsletter / form
- [ ] Input height `h-11 rounded-xl`
- [ ] Submit button carries icon + label; `<Loader2 animate-spin>` replaces icon during pending
- [ ] Success state uses `w-9 h-9 rounded-xl bg-primary/10` icon container
- [ ] Submit button has `self-start` so it doesn't stretch when field error text appears below input