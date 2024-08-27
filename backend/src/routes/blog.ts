import { Hono } from "hono"
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogSchema, updateBlogSchema } from "@100xanant/medium-common";

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
            return c.json({ message: "Unauthorized request." })
        }
    } catch (error) {
        c.status(403);
        return c.json({ message: "Unauthorized request." })
    }
})


blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const body = await c.req.json();
        const { success } = createBlogSchema.safeParse(body);
        if(!success){
            c.status(411);
            return c.json({ message: "Inputs not correct." })
        }
            
        const newBlog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: c.get('userId')
            }
        });

        return c.json({ 
            id: newBlog.id,
            message: "New blog post created." 
        });
    } catch (error) {
        c.status(403);
        return c.json({ message: "Error while creating a new blog." })
    }
})


blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();
        const { success } = updateBlogSchema.safeParse(body);
        if(!success){
            c.status(411);
            return c.json({ message: "Inputs not correct. "})
        }
        
        const updatedBlog = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content
            }
        });

        return c.json({ 
            id: updatedBlog.id,
            message: "Blog updated." 
        })
    } catch (error) {
        c.status(403);
        return c.json({ message: "Error while updating the blog." })
    }
})


blogRouter.get('/get/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const blogId = c.req.param('id') 
        
        const blog = await prisma.post.findFirst({
            where: {
                id: blogId
            }
        })

        return c.json({ blog })
    } catch (error) {
        c.status(403)
        return c.json({ message: "Error while fetching the blog post." })
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
        return c.json({ message: "Error while fetching the blogs." })
    }
})
