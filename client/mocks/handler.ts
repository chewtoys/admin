import { rest } from 'msw'
import { menu } from './contents/menu'

export const handlers = [
  rest.get('https://myapi.dev/menus', (_, res, ctx) => {
    return res(
      ctx.json(menu)
    )
  })
]
