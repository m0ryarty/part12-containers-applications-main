import axios from 'axios'
const baseUrl = `${process.env.REACT_APP_BLOG_URL}/users`




export const getAllUsers = async () => {
  const request = axios.get(baseUrl)
    const response = await request    
  return response.data
}


// eslint-disable-next-line import/no-anonymous-default-export
export default {getAllUsers}