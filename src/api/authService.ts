import api from "./axiosApi";

export interface loginPayload {
  email: string;
  password: string;
}

export const loginRequest = async (payload: loginPayload) => {
  try {
    const response = await api.get('/users', {
      params: {
        email: payload.email,
        password: payload.password
      }
    })

    console.log('API RESPONSE:', response.data)

    return response.data[0] || null
  } catch (error) {
    console.error('Login failed:', error)
    throw error
  }
}
