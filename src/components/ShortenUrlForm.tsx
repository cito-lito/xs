import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import DisplayShortedUrl from './DisplayShortedUrl';
import { UrlResponse } from '../dtos';

const ShortenUrlForm: React.FC = () => {
    const [longUrl, setLongUrl] = useState('');
    const [urlResponse, setUrlResponse] = useState<UrlResponse | null>(null);

    const getUserId = () => {
        let userId = localStorage.getItem('user_id');
        if (!userId) {
            userId = nanoid(8);
            localStorage.setItem('user_id', userId);
        }
        return userId;
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        let userId = getUserId();
        event.preventDefault();
        const response = await fetch('http://localhost:3003/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ longUrl, userId }),
        });

        if (response.ok) {
            const data: UrlResponse = await response.json();
            setUrlResponse(data);
            setLongUrl('');
        } else {
            console.error('Failed to shorten URL');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="longUrl" className="visually-hidden">Enter URL to shorten:</label>
                <input
                    type="url"
                    id="longUrl"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    placeholder="https://example.com/looong/url"
                    required
                />
                <button type="submit">Short it!</button>
            </form>
            {urlResponse && <DisplayShortedUrl urlResponse={urlResponse} />}
        </div>
    );
};

export default ShortenUrlForm;
