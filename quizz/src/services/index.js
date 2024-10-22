import axios from 'axios'

const baseURL = import.meta.env.VITE_BACKEND_URI

export const getAllPlayersService = async () => {
  const response = await axios.get(`${baseURL}/players`)
  return response.data
}

export const createNewPlayerService = async newPlayer => {
  const response = await axios.post(`${baseURL}/players`, newPlayer)
  return response.data
}

export const updateScoreService = async (id, score) => {
  console.log(score)
  const response = await axios.put(`${baseURL}/players/score/${id}`, {score})
  console.log(response.data)
  return response.data
}
