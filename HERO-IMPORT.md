# WS Code Heroes — component library

Three components extracted only from `Code-Blocks/heros/default.aspx`:

| Component ID | Name | Files required on your website |
| --- | --- | --- |
| ws-hero-single-image | Hero — Single Background Image | template.html + style.css |
| ws-hero-image-fader | Hero — Image Fader | template.html + style.css + script.js |
| ws-hero-video | Hero — Video Background | template.html + style.css + script.js + your video files |

Every component is category **Heroes**, version **1.0.0**. This bundle has a root manifest and can be uploaded as its own public GitHub component repository. A merged version also exists in the component-repository-starter output, preserving the three-column sample.

## Use in the installed extension

These entries have also been added to the default persistent local library. Run **Component Library: Refresh Library** in VS Code, then expand **Heroes**. If you are browsing a GitHub source, first run **Select Repository → Local library**.

Use H to insert HTML at your cursor, C to insert CSS into your stylesheet (or an existing style block), and J to insert JavaScript into your script file (or an existing script block). Each button inserts only that part and replaces selected text if present. The extension does not create asset files or links: create the destination files and link them manually. Keep the files separate; do not paste JavaScript into the extension or execute it in an extension preview.

Example layout for the single-image hero:

```text
website/
  index.html
  assets/components/ws-hero-single-image/style.css
```

Add this link inside your page's `<head>`:

```html
<link rel="stylesheet" href="assets/components/ws-hero-single-image/style.css">
```

For the fader or video hero, use that component's folder name in the stylesheet link, copy its script.js alongside style.css, and add a deferred script reference to your page:

```html
<script src="assets/components/ws-hero-image-fader/script.js" defer></script>
```

Include each component type's stylesheet/script once per page, even if its HTML appears multiple times. Insert markup before deferred initialization runs (or refresh the page after saving). Initializers are idempotent for already initialized elements; no dynamic insertion observer or lifecycle/disposal framework was added.

## Media and source dependencies

- **Video:** replace the three `data-mobile-src`, `data-tablet-src`, and `data-desktop-src` values on the `<video>` element. The `/path/to/*.mp4` paths are intentionally retained source placeholders, not included video files. You may point all three at the same local MP4. The original preview's signed Vimeo URL was not imported.
- **Image fader:** the original three `picsum.photos` placeholder image URLs are retained. Replace them with your project's local images for an offline website. It advances every six seconds and starts paused when reduced motion is requested.
- **Single image:** the original `placehold.co` image URL is retained; replace it with your own image. Its empty alt/aria-hidden combination treats it as decorative. If the image conveys content, provide meaningful alt text and remove aria-hidden.
- **All variants:** edit heading text and heading level for the destination page. Font family inherits from your website. Images and video files are not included or downloaded.

The extension can browse and insert these snippets offline. A rendered website still needs its own media and the manually linked CSS/JS.

## Adaptations and preserved source

Each component includes an `original/` directory with the exact decoded HTML/CSS/JS code blocks from the source page. The ASP.NET page/header registrations, page search UI, rendered demo wrappers, signed demo video link, and global site scripts/styles were excluded. No other Code-Blocks folders were scraped.

The active component files are lightly adapted for reuse:

- Replaced shared `id="hero"`, video IDs, and generic CSS classes with component-specific `cl-hero-*` classes. No duplicate fixed IDs are introduced when inserting multiple instances.
- Scoped JavaScript to each component root instead of selecting the first matching element on the page; added initialization guards.
- Added local heading/overlay/control/screen-reader support CSS so these snippets do not depend on `/Code-Blocks/includes/style.css`.
- Video paths are configurable per instance using data attributes. Programmatic source-change pauses no longer reset the user's playback choice, and playback promise failures are caught.
- Added a fader empty-slide guard, timer reentry guard, and reduced-motion transition rule.

The optional manifest javascript fields point to the adapted scripts. Original files are provenance references, not runtime dependencies; GitHub sync caches only manifest-declared files. `provenance.json` records the source path, source-file checksum, and sections used.

## Verification

Manifest metadata and all declared paths/files were checked with the extension's validator. The preserved blocks were checked against the original source. Adapted templates contain no ASP.NET directives or embedded scripts. JavaScript files were syntax-checked only; imported JavaScript was not executed and browser behavior has not been tested in this import.
