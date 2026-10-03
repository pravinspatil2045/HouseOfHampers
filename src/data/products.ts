export const occasions = ['All hampers', 'Birthdays', 'Just because', 'Thank you', 'Celebrations'] as const
export type Occasion = (typeof occasions)[number]
export const ribbons = ['Cobalt', 'Rose', 'Ivory'] as const
export type Ribbon = (typeof ribbons)[number]

export interface Product {
  id: string
  name: string
  description: string
  detail: string
  price: number
  image: string
  imageAlt: string
  category: string
  occasions: Occasion[]
  contents: string[]
}

// Illustrative catalog. Replace with the approved inventory before enabling checkout.
export const products: Product[] = [
  {
    id: 'big-little-celebration',
    name: 'The Big Little Celebration',
    description: 'For their main-character moment.',
    detail: 'A little sweet, a little sparkly, and very much about them. A cheerful collection for birthdays, new beginnings, and every reason to celebrate.',
    price: 2499,
    image: '/images/celebration.webp',
    imageAlt: 'Bright pink gift box with a golden ribbon and heart-shaped confetti',
    category: 'Bring on the happy',
    occasions: ['Birthdays', 'Celebrations'],
    contents: ['Artisan chocolate truffles', 'Celebration candle', 'Butter cookies', 'Your personal note'],
  },
  {
    id: 'little-love',
    name: 'A Little Box of Love',
    description: 'A long-distance hug, but better.',
    detail: 'For the person you wish you could pop round and see. Something lovely to sip, something sweet to share, and a little reminder that you are thinking of them.',
    price: 1899,
    image: '/images/little-love.webp',
    imageAlt: 'A kraft-paper gift wrapped with a bright pink satin bow',
    category: 'Just add a little love',
    occasions: ['Just because', 'Birthdays'],
    contents: ['Chamomile tea blend', 'Honey shortbread', 'Rose-scented candle', 'Your personal note'],
  },
  {
    id: 'thank-you',
    name: 'The Very Good Thank You',
    description: 'Because a text won’t quite do it.',
    detail: 'For the helpers, the cheerleaders, and the people who always show up. A thoughtful thank you with a few very good reasons to take a well-earned break.',
    price: 2899,
    image: '/images/thank-you.webp',
    imageAlt: 'Black gift boxes finished with golden satin ribbons',
    category: 'A proper appreciation',
    occasions: ['Thank you', 'Celebrations'],
    contents: ['Single-origin ground coffee', 'Dark chocolate almonds', 'Everyday ceramic mug', 'Your personal note'],
  },
]

export const shop = { currency: 'INR', locale: 'en-IN', name: 'House of Hampers' } as const
export const money = (value: number) => new Intl.NumberFormat(shop.locale, {
  style: 'currency', currency: shop.currency, maximumFractionDigits: 0,
}).format(value)
