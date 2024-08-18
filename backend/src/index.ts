import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Motherfu*ker!')
})

app.get('/api/v1/user/signup', (c) => {
  return c.json({
    msg: "BRO ?" 
  })
})

export default app
