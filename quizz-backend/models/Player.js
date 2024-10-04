import { Schema, model } from 'mongoose'

const playerSchema = new Schema({
  name: {
    type: 'String',
    minLength: 5,
    required: true,
  },
  phone: {
    type: 'String',
    default: '',
  },
  email: {
    type: 'String',
    default: '',
  },
  score: {
    type: 'Number',
    min: 0,
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
