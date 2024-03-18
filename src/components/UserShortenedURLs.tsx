import React, { useState } from 'react'
import { useQuery } from 'react-query'
import DisplayShortedUrl from './DisplayShortedUrl'
import { UserUrlsResponse } from '../dtos'
import { API_URL } from '../api'

const fetchUserUrls = async (
  userId: string,
  page: number
): Promise<UserUrlsResponse> => {
  const response = await fetch(
    `${API_URL}/user/${userId}/urls?offset=${page}`
  )
  if (!response.ok) {
    throw new Error('Failed to fetch URLs')
  }
  return response.json()
}

const UserShortenedURLs: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [showUrls, setShowUrls] = useState(false)
  const userId = localStorage.getItem('user_id')

  const { data, isLoading, isError, error } = useQuery(
    ['userUrls', userId, currentPage],
    () => fetchUserUrls(userId as string, currentPage),
    {
      keepPreviousData: true,
      enabled: !!userId,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  )
  const handleFetchUrlsClick = () => setShowUrls(!showUrls)
  return (
    <div className='urls-container'>
      <button onClick={handleFetchUrlsClick} className='fetch-urls-button'>
        {showUrls ? 'HIDE My URLs' : 'SHOW My URLs'}
      </button>

      {isLoading && <div>Loading...</div>}
      {isError && (
        <div>
          Error: {error instanceof Error ? error.message : 'An error occurred'}
        </div>
      )}

      {showUrls && data && data.urls.length > 0 && (
        <>
          <ul>
            {data.urls.map((url) => (
              <DisplayShortedUrl urlResponse={url} />
            ))}
          </ul>
          <div className='pagination'>
            {data.pagination.currentPage > 1 && (
              <button onClick={() => setCurrentPage((page) => page - 1)}>
                Previous
              </button>
            )}
            {data.pagination.currentPage < data.pagination.totalPages && (
              <button onClick={() => setCurrentPage((page) => page + 1)}>
                Next
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default UserShortenedURLs
