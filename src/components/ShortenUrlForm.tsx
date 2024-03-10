import { useState } from 'react';
import { nanoid } from 'nanoid';
interface UrlRequest {
    long_url: string;
    user_id: string;
}
interface UrlResponse {
    short_url: string;
    long_url: string;
    user_id: string;
    short_code: string;
    created_at: string;
}

function getUserId(): string {
    let user_id = localStorage.getItem('user_id');
    if (!user_id) {
        user_id = nanoid(8);
        localStorage.setItem('user_id', user_id);
    }
    return user_id;
}

async function fetchShortenedUrl(req: UrlRequest): Promise<UrlResponse> {
    const response = await fetch('http://localhost:3003/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
    });
    const data: UrlResponse = await response.json();
    return data;
}

const ShortenUrlForm = () => {
    const [longUrl, setLongUrl] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        setShortenedUrl('');

        let user_id = getUserId();
        let req: UrlRequest = {
            long_url: longUrl,
            user_id,
        };

        const data = await fetchShortenedUrl(req);
        setShortenedUrl(data.short_url);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="longUrl">Enter URL to shorten:</label>
                <input
                    type="url"
                    id="longUrl"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    placeholder="https://example.com/long/url"
                    required
                />
                <button type="submit">Shorten</button>
            </form>
            {shortenedUrl &&
                <div>
                    <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">{shortenedUrl}
                    </a>
                </div>}
        </div>
    );
};

export default ShortenUrlForm;
