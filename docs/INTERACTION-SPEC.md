# Handoff spec: Thread network, fire-and-ice lock, story

Figma-ready. Use it to rebuild the frames or to check the code in `index.html` (search for "openLock" and "Project thread network").

## 1. Project thread network (Projects section)
Interactive map on a blue thread image. Nodes are the 8 projects, a thread joins two projects that share a tool.

| Frame | Size | Notes |
|---|---|---|
| Network / Desktop / Overview | 1440x900 | Map width 1124px, centre node = S. Bhuvanesh |
| Network / Desktop / Node open | 1440x900 | Card right (370px), camera moves the node to 32% of the width |
| Network / Phone / Overview and Node open | 390x844 | Card below the map |
| List view | 1440x900, 390x844 | Indexed rows plus preview card |

| Component | Variants |
|---|---|
| Node | default, hover, active (red ring), core (magenta) |
| Thread | default (dashed, flowing), highlighted, dim |
| Card | project, centre |
| Tool legend chip | default, on |

Interactions: tap/click a node opens its card and flies the camera there. Drag pans. Pinch, double-tap, Ctrl+scroll and the + / - buttons zoom. Tool chips highlight every thread made by one tool. "Play tour" visits each project. The map only animates while visible.

## 2. Fire-and-ice lock (page transition for far jumps)
| Stage | What the visitor sees | Time |
|---|---|---|
| 1. Strike | Forking lightning bolts (amber-white from the left, blue-white from the right) grow towards the centre, background dims, a blue glow builds | 640 ms |
| 2. Lock | Cosmic backdrop fades in, side lightning and the ring appear, the bolt sits inside. Label "Opening <Section>" and hint "Rotate the ring to open it. Press Esc to skip." | 350 ms |
| 3. Wait / rotate | The visitor rotates the ring (drag in a circle). About 1.35 half-turns opens it. If untouched for 1.3 s it opens by itself over 1 s. | 0 to 2 s |
| 4. Open | The ring splits into a left (fire) and right (ice) half that slide apart along the rotated axis and fade, the blue core fades gradually, the bolt grows and fades, side lightning fades | 420 ms |
| 5. Arrive | The cosmic image fades in bright (scale 1.14 to 1, 500 ms) with rotating light rays and three neon bolt flashes, the page jumps to the section behind the overlay at 640 ms, then the whole overlay fades slowly (1200 ms) while sparkles keep twinkling | 1200 ms |

States: closed, grabbing (cursor), opening, done. Input: mouse drag round the ring, mouse drag sideways (0.006 rad per px), mouse wheel (0.004 rad per unit, max 0.4 per event), touch drag, tap (nudges 1/3 open), Enter / Space / arrow keys (nudge), Esc (open now).
Edge cases: "reduce motion" skips the whole thing (instant jump). Nearby jumps (under 60% of a screen) scroll normally. Clicks during the sequence are ignored until it ends. Images are decoded in advance so the first frame is smooth.
Accessibility: the overlay is a modal dialog with a live label, keyboard operable, never traps the visitor for more than about 3.5 seconds.

| Token | Value |
|---|---|
| Fire thread colours | #FF8A1F, #FFB347, #FF5A1F |
| Ice thread colours | #2F8BFF, #5AA2FF, #22D3EE |
| Backdrop | cosmic image under rgba(3,6,15,.82 to .93) |
| Core glow | radial rgba(70,150,255,.7) to transparent, 720px max |
| Ring | 62vmin, max 440px |

### 2a. Video version of the lock (computers, Cinematic)
| Stage | Behaviour |
|---|---|
| Waiting | Clip 0.3 to 4.6 s loops (closed ring, crackling lightning). The ring spins slowly on its own layer. The neon bolt image sits in the ring, sparkles twinkle, a thin guide circle surrounds the ring with three dots circling it until the first turn |
| Holding and rotating | The ring layer (feathered circle, opaque to 0.47 of the height, faded out by 0.58) turns with the hand while the side lightning stays still. Video pauses and is scrubbed by rotation progress (0 to 4.6 s). A dial arc (amber to ice) with a handle grows around the ring. Letting go keeps the ring spinning with decaying momentum. Phones tick (5 ms vibration) every 0.35 rad |
| Windup | 0.4x slow motion from 4.55 s to 4.70 s, the screen trembles (2px), sound unmutes if Sound is on |
| Explosion | Clip plays from 4.70 s. Chromatic split (R +7px, B -7px) for 300 ms, camera shake 16px decaying, shock rings, sparks, vibration on phones, cosmic image and light rays |
| Layout | Computers: the clip covers the screen. Phones (portrait): the ring is fitted to 84% of the width and centred at 47% of the height, the clip edges are feathered, and the explosion zooms to cover the whole screen over 0.9 s |
| Landing | Page jumps 650 ms after the explosion starts, overlay fades over 2 s, the clip keeps playing to 10.3 s over the page, then hides |
| Controls | Sound (off by default), Cinematic / Smooth. Saved in the browser |
| Geometry | Ring centre at 52% / 53.7% of the frame, outer radius 0.44 of the height, hole radius 0.298 |
| Fallback | Phones, slow computers, Smooth, reduced motion, or a video that cannot play use the image-and-lightning lock |

### 2b. Three.js version of the lock
| Part | Detail |
|---|---|
| Ring | Two half tori (fire left, ice right), metal PBR material with emissive glow, bright edge line, 36 dial ticks on a thin outer ring |
| Centre | Extruded lightning bolt with a pulsing emissive material, blue glow sprite behind it |
| Life | 260 embers and ice sparks orbiting each half (110 on phones), 500 background stars, flickering fire and ice point lights |
| Camera | Slow sway, dollies in as the ring opens, flies through when it finishes |
| Glow | Bloom pass on computers, none on phones |
| Opening | Rotation sets progress. The halves slide apart along the rotated axis, shrink and dim, the core fades |
| Fallback | No WebGL, no Three.js, or any error: the 2D lock is shown instead, even in the middle of the sequence |

## 3. Story (first screen)
Clock loader, then a 10 second video (portal opens, he runs in, tunnel of light, data world with the tagline), then a short tour that talks only about the projects ("8 projects, connected by the tools they share"), then the portfolio. Skip is always available.

### 2c. Lightning engine
| Part | Detail |
|---|---|
| Bolt | Midpoint displacement along the normal, depth 6 (5 on phones), forks at random points (up to 5, each with 2 sub-forks), forks 72% as bright |
| Glow | Neon look: haze 26px at 5%, glow 12px at 15%, inner 4.5px at 42%, core 1.8px cyan-white at 92%, plus a thin jittered wisp line at 40% (phones: 8px glow plus core) |
| Flicker | Each strike lives 90 to 180 ms and re-draws its shape every 45 ms. Previous frames fade out by 42% per frame, which leaves an after-glow |
| Rate | 1.6 strikes per second per side while waiting, up to 8 as the ring turns. Arcs crawl along the ring edge, white bolts jump from the ring to the bolt in the centre |
| Sparkles | Twinkling 4-point glints (5 per second while waiting, 44 per second after opening, max 64, phones 22 and 28) |
| Life | Embers rise on the fire side (70, phones 30), ice motes drift on the ice side, an anamorphic streak pulses, letterbox bars slide in |
| Discharge | 10 large bolts (5 per side) plus inner bolts and arcs, white flash (decays in about 0.45 s), two shock rings (fire then ice), 150 sparks with gravity, camera shake of 16px decaying |
| Colours | Fire #FF7A1F / #FFC27A, ice #2F8BFF / #9FD8FF, centre #6AA8FF / #E4F3FF, core always white |

## 3b. Profile photo
No viewer and no large photo. Only the small avatar. It cannot be saved, dragged, right-clicked or long-press saved. A diagonal "(c) S. BHUVANESH" watermark is part of the image pixels. Screenshots cannot be blocked on the web, so the watermark carries the protection.

## 4. Other tokens
Buttons keep the original look: dark glass with a blue-to-magenta gradient on the primary button. Cosmic background: fixed behind the page in the dark theme under a dark overlay, hidden in the light theme. Tap targets are 44px or more.

## 5. Proof in 30 seconds (section #proof)
| Part | Detail |
|---|---|
| Proof cards | 4 cards computed from data: projects with public code, live app, certificates, demo. Each is a link |
| Hiring context | 6 chips (aria-pressed). Choosing one lists the asks of that team, a tick for each ask found in skills or project stacks, a dashed "gap" chip for each missing one, the two best projects (earlier asks weigh more), a one-line pitch and a copy button. It also outlines matching chips in Skills |
| Job match | Textarea (6000 characters) and Match button. Keywords are found with word boundaries and compared with the same data. Result: matched, gaps, start-with projects, one-line pitch. Runs in the browser only |
| Timeline | Dated facts only, hidden below 3 entries |
| AI cases | Section #ai after Skills, hidden until D.aiCases has entries |
| Demo ledger | Details list under the demo note: generated data, formulas for Net savings and Expense ratio, filters, relation to the real project |
| Rules | No invented facts, numbers or dates. Gaps are shown on purpose. Tap targets 44px or more. Contrast checked in both themes |

## 6. Go-to-project behaviour
Every control that means "show me this project" (See an example, skill panel chips, search results, SPIDY "open this project", Proof "Start with") calls `goProject(id)`: the lock transition to Projects, then the Network view opens with that project selected and its card shown. With reduced motion the jump is instant and the project still opens. Search: 44px close button, outside click and Esc also close.
