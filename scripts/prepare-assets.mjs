import { mkdir } from 'node:fs/promises'
import sharp from 'sharp'

await mkdir('public/images', { recursive: true })
const source = 'assets/source'
await Promise.all([
  sharp(`${source}/festive.jpg`).resize({ width: 1100, withoutEnlargement: true }).webp({ quality: 86 }).toFile('public/images/hero.webp'),
  sharp(`${source}/festive.jpg`).resize(720, 760, { fit: 'cover' }).webp({ quality: 82 }).toFile('public/images/celebration.webp'),
  sharp(`${source}/love.jpg`).resize(720, 760, { fit: 'cover' }).webp({ quality: 82 }).toFile('public/images/little-love.webp'),
  sharp(`${source}/team.jpg`).resize(720, 760, { fit: 'cover' }).webp({ quality: 82 }).toFile('public/images/thank-you.webp'),
  sharp(`${source}/love.jpg`).resize(1000, 780, { fit: 'cover' }).webp({ quality: 83 }).toFile('public/images/story.webp'),
])
console.log('Prepared five optimised local images.')
