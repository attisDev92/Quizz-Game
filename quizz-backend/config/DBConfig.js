import mongoose from 'mongoose'
import { MongoDB } from '../utils/environment.js'

mongoose.set('strictQuery', false)
console.log('Connectiong Mongodb')

mongoose
  .connect(MongoDB)
  .then(() => {
    console.log('Connect to MongoDB')
  })
  .catch(error => {
    console.error('error to connect MongoDB', error)
  })
