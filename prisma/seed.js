const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function seed() {
    const john = await prisma.user.create({
        data: {
            username: 'john',
            //Password = twixrox
            passwordHash: '$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u'
        }
    })
    await Promise.all(
        getPosts().map(post => {
            const data = { userId: john.id, ...post }
            return prisma.post.create({
                data
            })
        })
    )
}

seed()

function getPosts() {
    return [
        {
            title: 'Lorem Ipsum Dolor',
            body: '"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."'
        }, {
            title: 'Lorem Ipsum Dolor',
            body: '"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."'
        }, {
            title: 'Lorem Ipsum Dolor',
            body: '"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."'
        },
    ]
}