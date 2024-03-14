import React from 'react';
import { UrlResponse } from '../dtos';

interface Props {
    urlResponse: UrlResponse;
}

const DisplayShortedUrl: React.FC<Props> = ({ urlResponse }) => {
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
        }).catch(err => console.error('Failed to copy text: ', err));
    };
    return (
        <div className='url-item'>
            <div>
                <a href={urlResponse.longUrl} target="_blank" rel="noopener noreferrer" title={urlResponse.longUrl}>
                    {urlResponse.longUrl}
                </a>
            </div>
            <div>
                <a href={urlResponse.shortUrl} target="_blank" rel="noopener noreferrer" title={urlResponse.shortUrl}>
                    {urlResponse.shortUrl}
                </a>
                <button onClick={() => copyToClipboard(urlResponse.shortUrl)} className="copy-button">
                    copy
                </button>
            </div>
        </div>
    );
};

export default DisplayShortedUrl;
