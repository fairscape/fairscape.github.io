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
        {
          label: 'Getting Started',
          collapsed: true,
          items: [
            { label: 'Deploying on Localhost', link: '/getting-started/getting-started/' },
            { label: 'Installation', link: '/getting-started/installation/' },
            { label: 'Configuration', link: '/getting-started/configuration/' },
            { label: 'Web Server Install', link: '/getting-started/webserver-install/' },
          ],
        },
        {
          label: 'Component Overviews',
          collapsed: true,
          items: [
            { label: 'FAIRSCAPE Server', link: '/components/server/' },
            { label: 'Command Line Client', link: '/components/cli/' },
            { label: 'Electron GUI Client', link: '/components/gui/' },
            { label: 'Web Client', link: '/components/webserver/' },
          ],
        },
        {
          label: 'Tutorials',
          collapsed: true,
          items: [
            { label: 'Login', link: '/tutorial/login/' },
            { label: 'User', link: '/tutorial/user/' },
            { label: 'Software', link: '/tutorial/software/' },
            { label: 'Dataset', link: '/tutorial/dataset/' },
            { label: 'RO-Crate', link: '/tutorial/rocrate/' },
            { label: 'Publish to Dataverse', link: '/tutorial/publish/' },
          ],
        },
        {
          label: 'API',
          collapsed: true,
          items: [
            { label: 'Overview', link: '/api/' },
            { label: 'REST Reference', link: '/api/resultful/' },
          ],
        },
        {
          label: 'Resources',
          collapsed: true,
          items: [
            { label: 'RO-Crate Profile', link: 'https://fairscape.github.io/profile/' },
            { label: 'FAIRSCAPE on GitHub', link: 'https://github.com/fairscape' },
          ],
        },
      ],
    }),
  ],
});
