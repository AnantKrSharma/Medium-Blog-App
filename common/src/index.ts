import z, { string } from 'zod';


export const signupBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})

export const signinBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export const createBlogSchema = z.object({
    title: z.string(),
    content: z.string()
})

export const updateBlogSchema = z.object({
    id: string(),
    title: string(),
    content: string()
})


export type SignupBodyInput = z.infer<typeof signupBodySchema> // type inference in zod

export type SigninBodyInput = z.infer<typeof signinBodySchema>

export type CreateBlogInput = z.infer<typeof createBlogSchema>

export type UpdateBlogInput = z.infer<typeof updateBlogSchema>
