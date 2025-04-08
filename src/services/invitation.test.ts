import { describe, test, expect, vi } from 'vitest'
import axios from 'axios'

import { submitInvitationForm } from './invitation'

vi.mock('axios')

const mockedAxiosPost = vi.mocked(axios.post)

describe('submitInvitationForm', () => {
  test('successfully post data', async () => {
    const payload = {
      name: 'Gafirazi Irfandi',
      email: 'gafirazi@example.com',
      emailConfirm: 'gafirazi@example.com',
    }

    const mockResponse = { data: {} }
    mockedAxiosPost.mockResolvedValueOnce(mockResponse)

    const response = await submitInvitationForm(payload)
    expect(mockedAxiosPost).toHaveBeenCalledWith(
      `${import.meta.env.VITE_BASE_URL}/fake-auth`,
      payload
    )
    expect(response).toEqual(mockResponse)
  })
})
