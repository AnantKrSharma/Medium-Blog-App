import { Hono } from 'hono'
import { sign, decode, verify } from 'hono/jwt'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>();


// --- routes ---
app.route('/api/v1/user', userRouter)
app.route('/api/v1/blog', blogRouter)

export default app
