/** Contact details used across the site — edit in one place. */
export const site = {
  name: 'Valencia John',
  title: 'Valencia John — Multidisciplinary Designer',
  description:
    'Portfolio of Valencia John, a multidisciplinary designer tinkering in UI/UX, marketing, social media, product, illustration and graphics.',
  email: 'valencia.john@connect.polyu.hk',
  phone: '+852 9427 3439',
  phoneHref: 'tel:+85294273439',
  linkedinHandle: 'linkedin.valencka12',
  linkedinUrl: 'https://www.linkedin.com/in/valencka/',
  resumeUrl: '/resume.pdf',
};

/** Named card colours map to the Figma colour styles; any CSS colour also works. */
export const cardColors: Record<string, string> = {
  blue: 'var(--color-blue)',
  yellow: 'var(--color-yellow)',
  green: 'var(--color-green)',
  pink: 'var(--color-pink)',
};

export const resolveColor = (c: string) => cardColors[c] ?? c;
