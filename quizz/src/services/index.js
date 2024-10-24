import axios from 'axios'

const baseURL = import.meta.env.VITE_BACKEND_URI

export const getAllPlayers = async() => {
  const response = await axios.get(`${baseURL}/players`)
  return response.data
}

export const createPlayer = async( newPlayer) => {
  const response = await axios.post(`${baseURL}/players`, newPlayer)
  return response.data
}