Set-Location -LiteralPath "C:\Users\acer\Downloads\3d animation bhuvanesh portfolio\bhuvanesh-portfolio"
git fetch origin main
git reset --soft origin/main
git rm -r -f --ignore-unmatch -- source-assets extras/bhuvanesh-portfolio-design-skill.zip
git add -A
git commit -m "Replace portfolio with updated project"
git push -u origin main# S. Bhuvanesh — Data Analyst Portfolio

Cinematic portfolio with a story intro, a 3D data globe, a sample-data dashboard demo and **SPIDY AI**, an assistant that runs entirely in the browser (no API key, no server).
It is a static site: no framework and no database. Vercel only runs `node build.js`, which copies the site into `dist/` and fills in your website address.

## What is in this folder

| Path | What it is |
|---|---|
| `index.html` | The whole portfolio (HTML, CSS and JavaScript). Your content lives in the `D` object near the top of the script. |
| `assets/img/` | Hero and portal art, the watermarked profile photos, the cosmic background (`cosmic.webp`), the lock images (`lock-ring.webp`, `lock-sides.webp`, `bolt.webp`) made from the supplied fire-and-ice and lightning images, the project-network background (`network.webp`, a blue recolour of the supplied thread image), the data-vision layer (`hero-data.jpg`), the project-network background (`network.webp`, a blue recolour of the supplied thread image), profile photo (small and full), share image (`og-image.jpg`), SPIDY logo |
| `assets/video/lock.mp4` | The generated fire-and-ice ring clip used by the lock (10.4 s, 1344x756, scrub-friendly keyframes every 4 frames; the explosion starts at 4.7 s, set as `TB` in the script) |
| `assets/video/story.mp4` | The story video (1600x900, 30 fps, about 4.6 MB, 10 seconds) |
| `resume/S_Bhuvanesh_Resume.pdf` | The file behind every "Download résumé" button |
| `favicon.svg` | Browser tab icon (the SPIDY logo) |
| `build.js`, `package.json`, `vercel.json` | Build step and Vercel settings |
| `docs/` | Figma-ready design spec for the thread network, the fire-and-ice lock and the story (`INTERACTION-SPEC.md`) |
| `source-assets/` | Original 2560x1440 trailer. **Not deployed.** Safe to delete. |
| `extras/` | The Claude skill ZIP with your design rules. **Not deployed.** |

## Deploy on Vercel (recommended: GitHub)

1. Create a new GitHub repository and upload everything in this folder. If you do not want the 37 MB original trailer on GitHub, delete `source-assets/` first.
2. Go to https://vercel.com/new, sign in, and import that repository.
3. Leave every setting as it is. `vercel.json` already sets the build command (`node build.js`) and the output folder (`dist`). Click **Deploy**.
4. Open the address Vercel gives you, for example `https://your-project.vercel.app`.

Every later push to GitHub redeploys the site automatically.

## Deploy with the Vercel CLI instead

```
npm i -g vercel
cd bhuvanesh-portfolio
vercel          # first run: follow the prompts, answer the questions with the defaults
vercel --prod   # publish to your production address
```

## Use your own domain

1. In Vercel, open the project, then Settings, then Domains, and add your domain.
2. Open Settings, then Environment Variables, and add `SITE_URL` with your full address, for example `https://yourname.com`.
3. Redeploy. The share-preview image, canonical link, sitemap and robots file will now use that address.

Without `SITE_URL`, the build uses the Vercel address automatically, so share previews work from the first deploy.

## Edit your content

- Text, projects, skills, education, certifications, contact details and links: edit the `D` object at the top of the `<script>` in `index.html`. Every section, the search box and SPIDY read from it, so change a fact once.
- Résumé: replace `resume/S_Bhuvanesh_Resume.pdf` and keep the file name.
- Photos: replace the files in `assets/img/` and keep the names.
- The story video: replace `assets/video/story.mp4` (keep it under about 10 MB) and `assets/img/poster.jpg`, then update the chapter times in `D.chapters`.

## Run it on your computer

```
node build.js
npx serve dist
```

Then open the address it prints. Opening `index.html` directly also works, but the share-preview tags will not be filled in.

## Things to know

- **"See an example" and every other "go to this project" button** (the Skills panel, search results, SPIDY, the Proof section) now take the visitor there with the lock transition and open that project in the network automatically. They no longer leave the visitor to find the node by hand. The functions are `goProject(id)` and `openProject(id)` near the end of the network script, and `threadTo(id, after)` runs a follow-up the moment the page has jumped.
- **Search has a close button** (a 44px X), and clicking outside the box or pressing Esc also closes it.
- **The lock opens three ways with a mouse:** drag round the ring, drag sideways, or turn the mouse wheel. Touch works the same way, and Esc, Enter, three taps or an idle second still open it.
- **Loads only when needed:** the lock video, its images and the optional Three.js bloom scripts are not fetched until the visitor first scrolls or taps (or after 7 seconds), so they never compete with the opening story.
- **Proof in 30 seconds (new section after the hero):** built for hiring teams, and worked out only from the `D` object, so nothing is invented. It has proof cards (project count with public code, the live app, certificates, the demo), a **"I'm hiring for…" selector** (Any team, Microsoft, Google, Anthropic, IT services and MNCs, Product startups) that shows which tools those teams' public job posts ask for, which of them are on the résumé (a tick), which are not yet (a dashed "gap" chip, so it stays honest), which two projects to open first, a one-line pitch you can copy, and highlights the matching chips in Skills. A **"Match a job description"** box compares pasted text with the résumé in the browser only (a keyword match, nothing is sent or stored). The asks per company are in `CO` and the keyword list is `KW` near the end of `index.html`. They come from public job posts and interview guides read in 2026 and should be refreshed from time to time.
- **Dated milestones:** a timeline built only from dated facts in `D` (education years, certificate months). Add `date:"2025-03"` to a project in `D.projects` and it joins the timeline.
- **How I work with AI:** a section that appears only when real cases are added to `D.aiCases`, for example `{project:"Financial Analytics Dashboard",tool:"Claude",ask:"…",wrong:"…",check:"…",fix:"…",lesson:"…"}`. Write the first draft yourself and only list things that really happened.
- **Demo assumptions:** the demo has an "Assumptions and limits" list that states how Net savings and Expense ratio are calculated and that the numbers are generated.
- **Cinematic lock (generated video):** the lock uses `assets/video/lock.mp4`, the fire-and-ice ring clip generated in MiniMax, on computers and on phones (it only starts on Smooth for visitors with Data Saver on or a device with 2 GB of memory or less). The clip is drawn on a canvas in two layers: the whole frame, and the ring on its own layer that **turns with the visitor's hand** (with momentum when they let go, and a slow idle spin) while the side lightning stays still. Holding and turning also scrubs the clip and fills a rotation dial around the ring; three dots circle the dial until the first turn, and phones tick with a tiny vibration while turning. Opening runs a short slow-motion windup (the ring trembles), then the explosion plays and the picture zooms to fill the screen (on phones the ring is first fitted to 84% of the screen width), with a chromatic split on the flash on computers, a camera shake, the cosmic image with light rays, and shards and sparks drifting over the page you land on while the overlay fades out over two seconds. Two small buttons sit in the lock: **Sound** (off by default; on plays the clip's own sound) and **Cinematic / Smooth** (Smooth uses the lighter image-and-lightning lock). If the video cannot play, the image-and-lightning lock is used automatically. The preferences are remembered in the browser.
- **Profile photo protection:** there is no "View photo" button and no large version of the photo anywhere in the site. Only the small avatar is shown. It cannot be saved, dragged or right-clicked, long-press save is off, and a diagonal "© S. BHUVANESH" watermark is baked into the pixels, so a screenshot carries it. A web page cannot block screenshots; the watermark is the real protection. To change the photo, run the same watermark over the new file (`assets/img/portrait.jpg`).
- **Cinematic intro:** letterbox bars and a soft vignette frame the story video on wide screens.
- **Cosmic background:** in the dark theme a fixed blue star-field sits behind the whole page (under a dark overlay so text stays readable), and also behind the loader and the story tour. The light theme keeps its plain light background.
- **Reveal on scroll:** page blocks rise into place as they enter the screen, and nothing is hidden for visitors who use "reduce motion".
- **Clock-dial loader:** the first screen is a dial with 60 ticks and a thread that fills as the percentage counts up. The number follows real readiness (images, fonts, the story video), takes about a second when everything is ready, never waits more than a few seconds, and a tap or key press skips it. It is skipped for visitors who use "reduce motion".
- **Project index:** the List view is an indexed list. Hovering or focusing a row previews that project.
- **Reading effects:** the hero line rises in word by word, and the About summary lights up word by word as you scroll to it (all words are visible straight away for "reduce motion").
- **Thread rail readout:** a scroll percentage sits under the thread rail, and thread transitions show the name of the section they are going to.
- **Fire-and-ice lock transition (Three.js + neon lightning):** a far jump (menu, buttons, search, SPIDY) starts with forking neon lightning from the left (fire) and the right (ice) striking the centre. A fire-and-ice ring with the neon lightning bolt inside it sits there like a lock, a real 3D ring (Three.js r128) when WebGL works, or the supplied fire-and-ice image otherwise. On top runs a lightning engine: fractal bolts with forks, a wide haze, glow, a cyan-white core and crackling wisps (the look of the supplied neon bolt), arcs crawling round the ring, embers and ice motes, twinkling sparkles, an anamorphic light streak and letterbox bars. Rotating the ring with a finger or the mouse opens it, the lightning gets stronger as it turns, and on opening there is a discharge: bolts from both sides, three large neon bolt flashes, a white flash, two shock rings, sparks and a camera shake. Then the cosmic image rushes in bright with light rays and sparkles, and fades away slowly (about 1.2 s) to reveal where the visitor was going. If nobody touches the ring it opens by itself after about a second; three taps, Enter or Esc also open it. Phones get a lighter version (fewer bolts, no light rays, one bolt flash). Nearby jumps scroll normally, and "reduce motion" visitors get an instant jump.
- **Project thread network:** the Projects section is an interactive map built on a glowing thread image (a blue recolour of the supplied thread image). Each node is a project, and a thread joins two projects that share a tool (Excel, Power BI, Python, MCP, RAG, JavaScript), calculated from each project's stack. Tap or click a node to fly to it and open its details, drag to move, pinch / double-tap / Ctrl + scroll / the + and - buttons to zoom, highlight links by tool, or press "Play tour". A List view keeps the plain tabs. It works with the keyboard, and the map only animates while it is on screen.
- **Data lens:** moving a cursor (or a finger) over the hero scene reveals a "data vision" layer underneath, a cyan wireframe with grid, numbers and mini charts.
- **The story** plays every time the page opens: the clock loader, then the video (muted, about 10 seconds: the portal, the run, the tunnel, the data world), then a short tour of projects, skills and education that talks only about the projects, then the portfolio. It can be skipped at any time, and "Replay story" is in the menu. Visitors who use "reduce motion" get a "Play the story" button instead of autoplay.
- **SPIDY's microphone** needs a secure address. Vercel provides one, and `vercel.json` allows the microphone for your own site only.
- **Online services used:** Google Fonts and the Three.js library (from cdnjs). If either is blocked, the page still works. The globe hides itself without Three.js, and plain fonts are used.
- **Not deployed by me:** I tested the built site over HTTP on my side, but I could not run a real Vercel deployment. After your first deploy, open it on your phone, watch the story, tap Download résumé, and send yourself the link to check the share preview.
- **Content rules:** the portfolio only states facts from your résumé and GitHub. The dashboard demo uses generated sample data and says so on the page.
