# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

A personal study collection of system design diagrams. There is **no source code, build, test, or lint step** — the repository contains only `.excalidraw` files (JSON), their exported PNGs, and `README.md`. Do not scaffold tooling (package.json, CI, linters) unless explicitly asked.

## Structure and the README index

- `README.md` is the entry point and the effective table of contents. Every diagram is a checkbox item under one of four headings — **Core Concepts**, **System Design**, **Patterns**, **Key Technologies** — usually linked to a public excalidraw.com share URL (`https://excalidraw.com/#json=<sceneId>,<key>`).
- The unchecked AI/ML entries at the end of each of the four lists (Transformer Inference & KV Cache, Design a RAG System, Continuous Batching, vLLM, …) are backlog items with no files yet, kept inline rather than in a separate AI section — this repo's through-line is system design, and those topics are treated as ordinary entries in it. Order within each list is roughly the intended study order; keep new entries appended rather than resorting the list.
- Directories mirror three of those headings: `Core Concepts/`, `Patterns/`, `Key Technologies/`. The **System Design** diagrams live at the repository root, not in a subdirectory.
- `images/` holds PNG exports.

When adding a diagram, the change is normally three parts: the `.excalidraw` file in the right location, the PNG in `images/`, and the README line flipped from `[ ]` to `[x]` with the share link filled in. Missing any one of these leaves the index out of sync — several entries already are (e.g. `Kafka.excalidraw` and `Realtime Updates.excalidraw` have no PNG; `RabbitMQ` and `Networking Essentials` are checked with no file at all).

## Naming

Names are inconsistent across the three places a diagram appears, so **never assume the `.excalidraw` basename matches the PNG or README label**. PNG filenames follow the README's descriptive title; the `.excalidraw` filename is often shorter or differently worded:

| README / PNG | `.excalidraw` |
|---|---|
| Design A URL Shortener (TinyURL or Bitly) | `Design A URL Shortener` |
| Design A File Storage Service (Dropbox or Google Drive) | `Design Dropdox A File Storage Service` |
| Real-time Updates | `Patterns/Realtime Updates` |

Existing typos in committed filenames (`Dropdox`, `Delpoyment Strategies`) are load-bearing — renaming them breaks the README links and the PNG pairing, so only rename if asked to fix all three sides together.

## Working with `.excalidraw` files

These are Excalidraw scene JSON written by the **Obsidian Excalidraw plugin** (`"source"` names the plugin release). Top-level keys: `type`, `version`, `source`, `elements`, `appState`, `files`.

- Files are large (thousands of lines) and are single-line-per-key pretty-printed JSON. Never read one whole into context — parse with `python3 -c` / `jq` and extract what you need (`elements[].type`, `originalText`, `containerId`).
- Diagram text lives in `text` elements; labels bound to a shape carry `containerId` pointing at that shape, and `originalText` holds the unwrapped string. To summarize a diagram, pull `originalText` from the text elements rather than trying to render it.
- `files` embeds pasted raster images as base64 data URIs, which is what makes a few scenes disproportionately large (`Caching`, `Database Indexing`, `DynamoDB`).
- Editing by hand is possible but hostile — element geometry, `boundElements`, and arrow bindings must stay consistent. Prefer describing the change for the user to make in Excalidraw over hand-patching JSON, unless the edit is purely textual.
- Scenes are mixed-version (plugin 2.15.2 and 2.20.4); do not normalize them.

## Diagram conventions

Every root-level system design scene follows the same five numbered sections, in order: **Requirements → Core Entities → API → High-level Design → Deep Dives**. New system design diagrams should keep that spine. Core Concepts / Key Technologies scenes are freeform explainers and do not use it.

## Repository hygiene

- `.DS_Store` files are committed at the root and in `Core Concepts/`. Leave them alone unless asked to clean up.
- PNG exports run 0.5–5 MB each (`images/` is ~38 MB); the repo has no LFS or `.gitignore`. Expect large diffs — that is normal here.
- Every commit in history is titled `update`.
