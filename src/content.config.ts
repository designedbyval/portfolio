import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Case studies: one Markdown file per project in src/content/work/.
 * The file name (minus .md) becomes the URL slug: /work/<file-name>.
 */
const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      year: z.string(),
      summary: z.string(),
      role: z.string(),
      timeline: z.string(),
      tools: z.array(z.string()).or(z.string()),
      /** blue | yellow | green | pink, or any CSS colour (e.g. "#c9b6ff") */
      cardColor: z.string().default('blue'),
      /** Optional. Path relative to the .md file, e.g. ../../assets/work/my-project/cover.png */
      cover: image().optional(),
      coverAlt: z.string().optional(),
      order: z.number(),
      featured: z.boolean().default(false),
    }),
});

export const collections = { work };
