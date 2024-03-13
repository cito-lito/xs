import React, { useState } from 'react';
import { useQuery } from 'react-query';
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
    const [fetchUrls, setFetchUrls] = useState(false); // State to control when to fetch URLs
    const userId = localStorage.getItem('user_id');

    const { data, isLoading, isError, error } = useQuery(
        ['userUrls', userId, currentPage], 
        () => fetchUserUrls(userId!, currentPage), {
            keepPreviousData: true,
            enabled: fetchUrls && !!userId,
    });

    // if (!userId) return <div>Please shorten a URL to see your URLs.</div>;

    const handleFetchUrlsClick = () => setFetchUrls(true); // Handler to set fetchUrls to true when "My URLs" button is clicked

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error instanceof Error ? error.message : 'An error occurred'}</div>;
    if (!data || data.urls.length === 0) return <button onClick={handleFetchUrlsClick}>My URLs</button>;

    return (
        <div>
            <h3>My URLs</h3>
            <ul>
                {data.urls.map(url => (
                    <li key={url.shortCode}>
                        <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">{url.shortUrl}</a>
                        (<a href={url.longUrl} target="_blank" rel="noopener noreferrer">{url.longUrl}</a>)
                    </li>
                ))}
            </ul>
            <div>
                {data.pagination.currentPage > 1 && (
                    <button onClick={() => setCurrentPage(page => page - 1)}>Previous</button>
                )}
                {data.pagination.currentPage < data.pagination.totalPages && (
                    <button onClick={() => setCurrentPage(page => page + 1)}>Next</button>
                )}
            </div>
        </div>
    );
};

export default UserShortenedURLs;