import React from 'react';

const Footer: React.FC = () => {
    const year = new Date().getFullYear(); // Dynamic year for copyright notice

    return (
        <footer className="footer">
            <div className="container mx-auto px-4 py-4">
                <p className="text-white text-center">
                    © {year} url-xs.
                </p>
                {/* You can add additional footer content here like links or social media icons */}
                <a href="https://github.com/cito-lito/url-xs" className="text-white py-2 px-4 hover:text-gray-300" target="_blank"  >Github</a>
            </div>
        </footer>
    );
};

export default Footer;
