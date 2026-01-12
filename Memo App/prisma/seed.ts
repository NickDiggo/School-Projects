import 'dotenv/config'
import {PrismaClient} from '@/generated/prisma/client'
import {faker} from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  const userId = 'c135e06b-cbe5-4041-b9e1-9f67a50aecac' // bestaande user

  // --- MAPS (10) ---
  const mapNames = [
    'Werk',
    'School',
    'Privé',
    'Projecten',
    'Ideeën',
    'Backend',
    'Frontend',
    'Database',
    'Notities',
    'Archief',
  ]

  const maps = []
  for (const name of mapNames) {
    const map = await prisma.map.create({
      data: {name, userId},
    })
    maps.push(map)
  }

  // --- TAGS (10) ---
  const tagNames = ['urgent', 'todo', 'bug', 'feature', 'idee', 'backend', 'frontend', 'school', 'werk', 'database']
  const tags = []
  for (const name of tagNames) {
    const tag = await prisma.tag.create({data: {name}})
    tags.push(tag)
  }

  // --- MEMOS (30) ---
  const memos = []
  for (let i = 0; i < 30; i++) {
    const memo = await prisma.memo.create({
      data: {
        title: faker.hacker.phrase(),
        content: faker.lorem.paragraph(3),
        userId,
        mapId: maps[faker.number.int({min: 0, max: maps.length - 1})].id,
      },
    })
    memos.push(memo)
  }

  // --- IMAGES ---
  for (const memo of memos) {
    const numImages = faker.number.int({min: 1, max: 5})
    for (let i = 0; i < numImages; i++) {
      await prisma.image.create({
        data: {
          url: `https://picsum.photos/seed/${faker.string.uuid()}/800/600`,
          description: faker.commerce.productDescription(),
          memoId: memo.id,
        },
      })
    }
  }

  // --- COMMENTS ---
  for (const memo of memos) {
    const numComments = faker.number.int({min: 0, max: 5})
    for (let i = 0; i < numComments; i++) {
      await prisma.comment.create({
        data: {
          content: faker.hacker.phrase(),
          memoId: memo.id,
          userId,
        },
      })
    }
  }

  // --- MEMO TAGS ---
  for (const memo of memos) {
    const numTags = faker.number.int({min: 1, max: 3})
    const selectedTags = faker.helpers.arrayElements(tags, numTags)
    for (const tag of selectedTags) {
      await prisma.memoTag.create({
        data: {memoId: memo.id, tagId: tag.id},
      })
    }
  }

  console.log('✅ Seeding finished.')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
