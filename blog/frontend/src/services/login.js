import axios from 'axios'
const baseUrl = `${process.env.REACT_APP_BLOG_URL}/login`

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}


// eslint-disable-next-line import/no-anonymous-default-export
export default { login }