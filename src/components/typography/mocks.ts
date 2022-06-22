import { TypographyUsageI } from './TypographyGuideline';

export const typographyForDesktop: TypographyUsageI[] = [
  {
    name: 'Headline (xxl)',
    font: '50px / 1.2',
    style: 'Bold (700)',
    availability: '.headline-xxl,\n @mixin headline-xxl',
    useCase:
      'The largest headline available. Use in big hero layouts, like Summit or campaign pages. Reserved for marketing use cases only.',
    className: 'headline-xxl',
  },
  {
    name: 'Sub headline (xxl)',
    font: '24px / 1.5',
    style: 'Medium (500),\n all caps,\n 2px letter spacing',
    availability: '.sub-headline-xxl,\n @mixin sub-headline-xxl',
    useCase:
      'The largest headline available. Use in big hero layouts, like Summit or campaign pages. Reserved for marketing use cases only.',
    className: 'sub-headline-xxl',
  },
  {
    name: 'Headline, (xl)',
    font: '30px / 1.2',
    style: 'Bold (700)',
    availability: '.headline-xl,\n @mixin headline-xl',
    useCase:
      'The second largest headline available. Use in hero layouts, like the home page or a product page. Reserved for marketing use cases only.',
    className: 'headline-xl',
  },
  {
    name: 'Sub headline, (xl)',
    font: '20px / 1.5',
    style: 'Medium (500),\n all caps,\n 2px letter spacing',
    availability: '.sub-headline-xl,\n @mixin sub-headline-xl',
    useCase:
      'The larger style for an important title. Use this style above larger headlines or above important content in any layout.',
    className: 'sub-headline-xl',
  },
  {
    name: 'Headline, (lg)',
    font: '24px / 1.2',
    style: 'Semibold (600)',
    availability: '.headline-lg,\n @mixin headline-lg',
    useCase:
      'The larger style for an important title. Use this style above larger headlines or above important content in any layout.',
    className: 'headline-lg',
  },
  {
    name: 'Sub headline, (lg)',
    font: '16px / 1.5',
    style: 'Medium (500)',
    availability: '.sub-headline-lg,\n @mixin sub-headline-lg',
    useCase:
      'The smaller style for less important titles. Use this style above headlines in smaller layouts only, like a Card.',
    className: 'sub-headline-lg',
  },
  {
    name: 'Headline, (md)',
    font: '20px / 1.2',
    style: 'Semibold (600)',
    availability: '.headline-md,\n @mixin headline-md',
    useCase:
      'The secondary headline for important layouts that are lower in hierarchy. Use this style multiple times per page.',
    className: 'headline-md',
  },
  {
    name: 'Headline, (sm)',
    font: '18px / 1.2',
    style: 'Medium (500)',
    availability: '.headline-sm,\n @mixin headline-sm',
    useCase:
      'The tertiary headline for other layouts lower in hierarchy. Use this style in components like a Card or in multiple layouts per page.',
    className: 'headline-sm',
  },
  {
    name: 'Headline, (xs)',
    font: '16px / 1.5',
    style: 'Medium (500)',
    availability: '.headline-xs,\n @mixin headline-xs',
    useCase:
      'The smallest headline available. Use this style under larger headlines or in select components, like an Accordion.',
    className: 'headline-xs',
  },
  {
    name: 'Body, (xl)',
    font: '20px / 1.5',
    style: 'Regular (400)',
    availability: '.text-xl,\n @mixin text-xl',
    useCase:
      'The largest body copy style. Use this style for long-form content only, like Topic and Article pages. Text should not exceed 8 columns in width for optimal readability.',
    className: 'text-xl',
  },
  {
    name: 'Body, (lg)',
    font: '18px / 1.5',
    style: 'Regular (400)',
    availability: '.text-lg,\n @mixin text-lg',
    useCase:
      'The base body copy style for marketing use cases only, unless an app interface calls for a larger text size. Text should not exceed 8 columns in width for optimal readability.',
    className: 'text-lg',
  },
  {
    name: 'Body (md)',
    font: '16px / 1.5',
    style: 'Regular (400)',
    availability: '.text-md,\n @mixin text-md',
    useCase:
      'The base body copy style for app interfaces or some smaller components, unless a marketing use case calls for a smaller text size. Text should not exceed 7 columns in width for optimal readability.',
    className: 'text-md',
  },
  {
    name: 'Body (sm)',
    font: '14px / 1.5',
    style: 'Regular (400)',
    availability: '.text-sm,\n @mixin text-sm',
    useCase:
      'The supporting body copy style for all use cases, like under Form fields or for attribution purposes. Text should not exceed 7 columns in width for optimal readability.',
    className: 'text-sm',
  },
  {
    name: 'Body (xs)',
    font: '12px / 1.5',
    style: 'Regular (400)',
    availability: '.text-xs,\n @mixin text-xs',
    useCase:
      'The smallest body copy style for legal or footnote use cases only. Text should not exceed 7 columns in width for optimal readability.',
    className: 'text-xs',
  },
  {
    name: 'Link',
    font: 'Inherit',
    style: 'Regular (400)',
    availability: '.text-link,\n @mixin text-link',
    useCase: 'Calls to action use variations of the Body copy, md text style.',
    className: 'text-link',
  },
];

export const typographyForMobile: TypographyUsageI[] = [
  {
    name: 'Headline (xxl)',
    font: '36px / 1.2',
    style: 'Bold (700)',
    availability: '.headline-xxl,\n @mixin headline-xxl',
    useCase:
      'The largest headline available. Use in big hero layouts, like Summit or campaign pages. Reserved for marketing use cases only.',
    className: 'headline-xxl',
  },
  {
    name: 'Sub headline (xxl)',
    font: '22px / 1.5',
    style: 'Medium (500),\n all caps,\n 2px letter spacing',
    availability: '.sub-headline-xxl,\n @mixin sub-headline-xxl',
    useCase:
      'The largest headline available. Use in big hero layouts, like Summit or campaign pages. Reserved for marketing use cases only.',
    className: 'sub-headline-xxl',
  },
  {
    name: 'Headline, (xl)',
    font: '26px / 1.2',
    style: 'Bold (700)',
    availability: '.headline-xl,\n @mixin headline-xl',
    useCase:
      'The second largest headline available. Use in hero layouts, like the home page or a product page. Reserved for marketing use cases only.',
    className: 'headline-xl',
  },
  {
    name: 'Sub headline, (xl)',
    font: '18px / 1.5',
    style: 'Medium (500),\n all caps,\n 2px letter spacing',
    availability: '.sub-headline-xl,\n @mixin sub-headline-xl',
    useCase:
      'The larger style for an important title. Use this style above larger headlines or above important content in any layout.',
    className: 'sub-headline-xl',
  },
  {
    name: 'Headline, (lg)',
    font: '22px / 1.2',
    style: 'Semibold (600)',
    availability: '.headline-lg,\n @mixin headline-lg',
    useCase:
      'The larger style for an important title. Use this style above larger headlines or above important content in any layout.',
    className: 'headline-lg',
  },
  {
    name: 'Sub headline, (lg)',
    font: '16px / 1.5',
    style: 'Medium (500)',
    availability: '.sub-headline-lg,\n @mixin sub-headline-lg',
    useCase:
      'The smaller style for less important titles. Use this style above headlines in smaller layouts only, like a Card.',
    className: 'sub-headline-lg',
  },
  {
    name: 'Headline, (md)',
    font: '18px / 1.2',
    style: 'Semibold (600)',
    availability: '.headline-md,\n @mixin headline-md',
    useCase:
      'The secondary headline for important layouts that are lower in hierarchy. Use this style multiple times per page.',
    className: 'headline-md',
  },
  {
    name: 'Headline, (sm)',
    font: '16px / 1.2',
    style: 'Medium (500)',
    availability: '.headline-sm,\n @mixin headline-sm',
    useCase:
      'The tertiary headline for other layouts lower in hierarchy. Use this style in components like a Card or in multiple layouts per page.',
    className: 'headline-sm',
  },
  {
    name: 'Headline, (xs)',
    font: '14px / 1.5',
    style: 'Medium (500)',
    availability: '.headline-xs,\n @mixin headline-xs',
    useCase:
      'The smallest headline available. Use this style under larger headlines or in select components, like an Accordion.',
    className: 'headline-xs',
  },
  {
    name: 'Body, (xl)',
    font: '18px / 1.5',
    style: 'Regular (400)',
    availability: '.text-xl,\n @mixin text-xl',
    useCase:
      'The largest body copy style. Use this style for long-form content only, like Topic and Article pages. Text should not exceed 8 columns in width for optimal readability.',
    className: 'text-xl',
  },
  {
    name: 'Body, (lg)',
    font: '16px / 1.5',
    style: 'Regular (400)',
    availability: '.text-lg,\n @mixin text-lg',
    useCase:
      'The base body copy style for marketing use cases only, unless an app interface calls for a larger text size. Text should not exceed 8 columns in width for optimal readability.',
    className: 'text-lg',
  },
  {
    name: 'Body (md)',
    font: '16px / 1.5',
    style: 'Regular (400)',
    availability: '.text-md,\n @mixin text-md',
    useCase:
      'The base body copy style for app interfaces or some smaller components, unless a marketing use case calls for a smaller text size. Text should not exceed 7 columns in width for optimal readability.',
    className: 'text-md',
  },
  {
    name: 'Body (sm)',
    font: '14px / 1.5',
    style: 'Regular (400)',
    availability: '.text-sm,\n @mixin text-sm',
    useCase:
      'The supporting body copy style for all use cases, like under Form fields or for attribution purposes. Text should not exceed 7 columns in width for optimal readability.',
    className: 'text-sm',
  },
  {
    name: 'Body (xs)',
    font: '12px / 1.5',
    style: 'Regular (400)',
    availability: '.text-xs,\n @mixin text-xs',
    useCase:
      'The smallest body copy style for legal or footnote use cases only. Text should not exceed 7 columns in width for optimal readability.',
    className: 'text-xs',
  },
  {
    name: 'Link',
    font: 'Inherit',
    style: 'Regular (400)',
    availability: '.text-link,\n @mixin text-link',
    useCase: 'Calls to action use variations of the Body copy, md text style.',
    className: 'text-link',
  },
];
