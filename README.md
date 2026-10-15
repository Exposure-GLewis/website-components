# Website Components

Fresh library containing only the two heroes supplied from Code-Blocks/heros.

## Upload to GitHub

Upload the contents of this folder to the repository root, so manifest.json is directly at the top level. Do not upload this enclosing folder or the ZIP itself.

The new manifest lists only these two heroes. Replacing the old root manifest removes earlier components from browsing after a successful sync. Old unlisted component folders can be removed separately.

## Insert into a website

- H inserts markup.html at the active HTML cursor.
- C inserts styles.css at the current cursor in your stylesheet (or inside an existing style block).
- J inserts the full javascript.js content, including its script tags, into your HTML after the hero markup. Insert outside any existing script block.
- Link your stylesheet from the HTML yourself.

Both supplied heroes use id="hero" and global CSS selectors; use one hero per page unless you adapt the IDs and selectors. Each script initializes one instance.

Replace /path/to/mobile.mp4, /path/to/tablet.mp4, and /path/to/desktop.mp4 in the video JavaScript with real video paths. The image fader uses external picsum.photos placeholders; replace these with project-local images for an offline website.

The supplied styles rely on additional site styles for .wrap, .sr-only, and the play/pause buttons. Include your site's supporting styles or add those before use. The image fader heading may also need positioning and z-index styles to appear above its images.

## Source handling and validation

All HTML, CSS, and JavaScript files are preserved byte-for-byte, including script tags, whitespace, IDs, and classes. Source files on Desktop are unchanged. Source hashes are recorded in SOURCE-HASHES.json.

Manifest paths and exact source-file copies are checked during packaging. Browser behavior and visual layout have not been tested; the supplied code has not been executed. No files have been pushed to GitHub.

## Future updates

Keep component IDs stable. Increment the changed component version and libraryVersion in manifest.json, upload the changed files, and sync in VS Code. Already-inserted website code is updated manually.
