import React from 'react';
import { UrlResponse } from '../dtos';

interface Props {
    urlResponse: UrlResponse;
}

const DisplayShortedUrl: React.FC<Props> = ({ urlResponse }) => {
    return (
        <div>
            <p>original URL:</p>
            <a href={urlResponse.longUrl} target="_blank" rel="noopener noreferrer">
                {urlResponse.longUrl}
            </a>
            <p>shortened URL:</p>
            <a href={urlResponse.shortUrl} target="_blank" rel="noopener noreferrer">
                {urlResponse.shortUrl}
            </a>
        </div>
    );
};

export default DisplayShortedUrl;
