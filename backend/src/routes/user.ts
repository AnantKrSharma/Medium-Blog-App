import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from 'hono/jwt';
import { signinBodySchema, signupBodySchema } from "@100xanant/medium-common";

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
    
    try {
      const body = await c.req.json();
      const { success } = signupBodySchema.safeParse(body)
      if( !success ){
        c.status(411)
        return c.json({ error: "Inputs not correct." })
      }

      const newUser = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password,
          name: body.name
        }
      });
  
      const jwt = await sign({ userId: newUser.id }, c.env.JWT_SECRET);
  
      return c.json({ 
        jwt,
        message: "Signed up successfully."
      })
    } catch (error) {
      c.status(403)
      return c.json({ error: "Error while signing-up." })
    }
})


userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
  
    try {
      const body = await c.req.json();
      const { success } = signinBodySchema.safeParse(body);
      if(!success){
        c.status(411);
        return c.json({ error: "Inputs not correct." })
      }

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
  
      return c.json({ 
        jwt,
        message: "Signed in successfully."
      })
    } catch (error) {
      c.status(403)
      return c.json({ error: "Error while signing-in." })
    }
})
