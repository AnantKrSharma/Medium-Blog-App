import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate"
import { sign } from 'hono/jwt'

export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_SECRET: string,
    }
}>();


userRouter.post('/signup', async (c) => {
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
  
  
userRouter.post('/signin', async (c) => {
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
