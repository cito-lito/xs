import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import DisplayShortedUrl from './DisplayShortedUrl'
import { nanoid } from 'nanoid'
import { UrlRequest, UrlResponse } from '../dtos'
import { API_URL } from '../api';

const ShortenUrlForm: React.FC = () => {
  const [longUrl, setLongUrl] = useState('')
  const queryClient = useQueryClient()

  const shortenUrlMutation = useMutation(
    async (urlData: UrlRequest): Promise<UrlResponse> => {
      const response = await fetch(`${API_URL}/api/v1/url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(urlData),
      })
      if (!response.ok) {
        throw new Error('Failed to shorten URL')
      }
      return response.json()
    }
  )

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const userId = localStorage.getItem('user_id') || nanoid(8)
    // new user
    if (!localStorage.getItem('user_id')) {
      localStorage.setItem('user_id', userId)
    }
    shortenUrlMutation.mutateAsync(
      { longUrl, userId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['userUrls'])
          setLongUrl('')
        },
      }
    )
  }

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='longUrl'>Enter URL to shorten:</label>
        <input
          type='url'
          id='longUrl'
          name='longUrl'
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder='https://example.com/looong/url'
          required
        />
        <button type='submit' disabled={shortenUrlMutation.isLoading}>
          SHORTEN
        </button>
      </form>
      {shortenUrlMutation.isError && (
        <div className='error-message'>
          Error:{' '}
          {shortenUrlMutation.error instanceof Error
            ? shortenUrlMutation.error.message
            : 'An error occurred'}
        </div>
      )}
      {shortenUrlMutation.isSuccess && shortenUrlMutation.data && (
        <DisplayShortedUrl urlResponse={shortenUrlMutation.data} />
      )}
    </div>
  )
}

export default ShortenUrlForm
