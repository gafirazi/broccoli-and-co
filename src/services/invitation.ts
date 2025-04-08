import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL

export interface InvitationPayload {
  name: string
  email: string
  emailConfirm: string
}

export const submitInvitationForm = async (payload: InvitationPayload) => {
  const response = await axios.post(`${BASE_URL}/fake-auth`, payload)
  return response;
};