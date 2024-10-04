import { config } from 'dotenv'
config()

export const PORT = process.env.PORT

export let MongoDB

if (process.env.NODE_ENV === 'production') {
  MongoDB = process.env.DATABASE_PRODUCTION
} else if (process.env.NODE_ENV === 'development') {
  MongoDB = process.env.DATABASE_DEV
} else {
  console.log('Error, NODE_ENV is invalid')
}
