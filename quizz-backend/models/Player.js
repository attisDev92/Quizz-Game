import { Schema, model } from 'mongoose'

const playerSchema = new Schema({
  nickname: {
    type: 'String',
    required: true,
  },
  score: {
    type: 'Number',
    default: 0,
  },
})

playerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export default model('Player', playerSchema)
