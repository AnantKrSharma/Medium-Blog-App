import { Hono } from "hono"
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: any
    }
}>();


// --- middleware ---
blogRouter.use('/*', async (c, next) => {
    const header = c.req.header('authorization') || "";
    const token = header.split(" ")[1];
    try {
        const verified = await verify(token, c.env.JWT_SECRET);
        
        if(verified.userId){
            c.set("userId", verified.userId)
            await next();
        }
        else{
            c.status(403);
            return c.json({ error: "Unauthorized." })
        }
    } catch (error) {
        console.log(error);
        
        c.status(403);
        return c.json({ error: "Internal server error." })
    }
})


blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const body = await c.req.json();
            
        const newBlog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: c.get('userId')
            }
        });

        return c.json({ id: newBlog.id });
    } catch (error) {
        c.status(403);
        return c.json({ error: "Error while creating a new blog." })
    }

})


blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();
        
        const updatedBlog = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content
            }
        });

        return c.json({ id: updatedBlog.id })
    } catch (error) {
        c.status(403);
        return c.json({ error: "Error while updating the blog." })
    }
})


blogRouter.get('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();

        const blog = await prisma.post.findFirst({
            where: {
                id: body.id 
            }
        })

        return c.json({ blog })
    } catch (error) {
        c.status(403)
        return c.json({ error: "Error while fetching the blog post." })
    }
})

// Todo: add pagination
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const allBlogs = await prisma.post.findMany();

        return c.json({ allBlogs })
    } catch (error) {
        c.status(403);
        return c.json({ error: "Error while fetching the blogs." })
    }
})
