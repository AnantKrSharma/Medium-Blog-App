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

// --- Middleware ---
app.use('/api/v1/blog/*', async (c, next) => {
  try{
    const header = c.req.header('authorization') || "";
    const token = header.split(" ")[1];

    const verified = await verify(token, c.env.JWT_SECRET);

    if(verified.userId){
      
      await next();
    }
    else{
      c.status(403);
      return c.json({ error: "Unauthorized." })
    }
  }
  catch(error){
    c.status(403);
    return c.json({ error: "Internal server error." })
  }
})


app.post('/api/v1/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const body = await c.req.json();

  try {
    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password
      }
    });

    const jwt = await sign({ userId: newUser.id }, c.env.JWT_SECRET);

    return c.json({ jwt })
  } catch (error) {
    c.status(403)
    return c.json({ error: "Error while signing-up." })
  }
})


app.post('/api/v1/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const body = await c.req.json();

  try {
    const userFound = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password
      }
    });

    if( !userFound ){
      c.status(403)
      return c.json({ error: "Incorrect email or password."})
    }

    const jwt = await sign({ userId: userFound.id }, c.env.JWT_SECRET)

    return c.json({ jwt })
  } catch (error) {
    c.status(403)
    return c.json({ error: "Error while signing-in." })
  }
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
