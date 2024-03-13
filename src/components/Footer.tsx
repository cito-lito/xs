import React from 'react';
import './../index.css';

const Footer: React.FC = () => {
    const year = new Date().getFullYear();
    return (
        <footer>
            <div>
                <p>
                    {year} url-xs -- <></>
                    <a href="https://github.com/cito-lito/url-xs"
                        target="_blank" rel="noopener noreferrer">Github</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
