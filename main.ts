// A working news-image-daily entry (Node 22, standard library only): its image is
// the entry.png beside this file, drawn for Friday 20 November 2026, and the program
// copies it to /output/entry.png. The gate takes a whole PNG or JPEG of at most
// 1 MiB and 1024 by 1024 pixels, and the judge sees exactly the bytes copied.
//
// The image itself is rendered from page.html (the newspaper layout, all 50 stories
// researched and written for this day) with shot.mjs, then committed beside this file.
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync } from 'node:fs';
import { join } from 'node:path';

copyFileSync(new URL('./entry.png', import.meta.url), join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png'));
