import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, decode, verify } from 'hono/jwt'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>();


app.post('/api/v1/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const body = await c.req.json();

  const response = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password
    }
  })

  const token = sign({ id: response.id }, c.env.JWT_SECRET)

  return c.json({
    jwt: token
  })
})


app.post('/api/v1/signin', (c) => {
  return c.text('signin')
})


app.post('/api/v1/blog', (c) => {
  return c.text('post - blog')
})


app.put('/api/v1/blog', (c) => {
  return c.text('put - blog')
})


app.get('/api/v1/blog/:id', (c) => {
  return c.text('get - blog')
})


app.get('/api/v1/blogs', (c) => {
  return c.text('all the blogs!')
})


export default app
