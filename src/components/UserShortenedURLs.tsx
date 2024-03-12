import React, { useState } from 'react';
import { UserUrlsResponse } from '../dtos';



const UserShortenedURLs: React.FC = () => {
    const [showUrls, setShowUrls] = useState(false);
    const [userUrls, setUserUrls] = useState<UserUrlsResponse | null>(null);

    const fetchUserUrls = async (userId: string) => {
        try {
            const response = await fetch(`http://localhost:3003/user/${userId}/urls`);
            const data: UserUrlsResponse = await response.json();
            setUserUrls(data);
        } catch (error) {
            console.error("Failed to fetch user's URLs", error);
        }
    };
    const userId = localStorage.getItem('user_id');
    if (!userId) {
        return <div>no urls for this user</div>
    }
    const handleFetchUrls = async () => {
        await fetchUserUrls(userId);
        setShowUrls(true);
    };

    return (
        <div>
            <button onClick={handleFetchUrls}>My URLs</button>
            {showUrls && userUrls && (
                <>
                    <h2>Your Shortened URLs</h2>
                    <ul>
                        {userUrls.urls.map((url) => (
                            <li key={url.shortCode}>
                                <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">
                                    {url.shortUrl}
                                </a> - {url.longUrl}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default UserShortenedURLs;
