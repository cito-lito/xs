import React, { useState } from 'react';
import { useQuery } from 'react-query';
import DisplayShortedUrl from './DisplayShortedUrl';
import { UserUrlsResponse } from '../dtos';

const fetchUserUrls = async (userId: string, page: number): Promise<UserUrlsResponse> => {
    const response = await fetch(`http://localhost:3003/user/${userId}/urls?offset=${page}`);
    if (!response.ok) {
        throw new Error('Failed to fetch URLs');
    }
    return response.json();
};

const UserShortenedURLs: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [fetchUrls, setFetchUrls] = useState(false);
    const userId = localStorage.getItem('user_id');

    const { data, isLoading, isError, error } = useQuery(
        ['userUrls', userId, currentPage],
        () => fetchUserUrls(userId!, currentPage), {
        keepPreviousData: true,
        enabled: fetchUrls && !!userId,
    });

    const handleFetchUrlsClick = () => setFetchUrls(true);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error instanceof Error ? error.message : 'An error occurred'}</div>;
    return (
        <div>
            {(!data || data.urls.length === 0) && (
                <div className="center-container">
                    <button onClick={handleFetchUrlsClick} className="fetch-urls-button">My URLs</button>
                </div>
            )}

            {data && data.urls.length > 0 && (
                <>
                    <ul>
                        {data.urls.map((url) => (
                            <DisplayShortedUrl key={url.shortCode} urlResponse={url} />
                        ))}
                    </ul>
                    <div className="pagination">
                        {data.pagination.currentPage > 1 && (
                            <button onClick={() => setCurrentPage((page) => page - 1)}>Previous</button>
                        )}
                        {data.pagination.currentPage < data.pagination.totalPages && (
                            <button onClick={() => setCurrentPage((page) => page + 1)}>Next</button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default UserShortenedURLs;
