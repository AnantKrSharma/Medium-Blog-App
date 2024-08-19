import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Motherfu*ker!')
})

app.post('/api/v1/signup', (c) => {
  return c.text('signup')
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
