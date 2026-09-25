import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://fairscape.github.io',
  trailingSlash: 'ignore',
  integrations: [
    starlight({
      title: 'FAIRSCAPE',
      description: 'A Framework for FAIR and Reproducible Biomedical Analytics.',
      social: {
        github: 'https://github.com/fairscape',
      },
      customCss: ['./src/styles/fairscape.css'],
      components: {
        TableOfContents: './src/components/TableOfContents.astro',
      },
      sidebar: [
        { label: 'Home', link: '/' },
        { label: 'Quick start', link: '/getting-started/quick-start/' },
        {
          label: 'Create',
          items: [
            { label: 'fairscape-models', link: '/tools/models/' },
            { label: 'fairscape-conversion', link: '/tools/conversion/' },
          ],
        },
        {
          label: 'View & assess',
          items: [
            { label: 'fairscape-artifacts', link: '/tools/artifacts/' },
            { label: 'AI-Readiness grader', link: '/tools/grader/' },
          ],
        },
        {
          label: 'Publish',
          items: [
            { label: 'fairscape-publish', link: '/tools/publish/' },
            { label: 'fairscape-lite', link: '/tools/lite/' },
          ],
        },
        {
          label: 'Resources',
          items: [
            { label: 'RO-Crate Profile', link: 'https://fairscape.github.io/profile/' },
            { label: 'FAIRSCAPE on GitHub', link: 'https://github.com/fairscape' },
          ],
        },
      ],
    }),
  ],
});
