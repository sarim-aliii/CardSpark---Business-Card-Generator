import React from 'react';
import "./BusinessCardPreview.css"
import { FaInstagram, FaTwitter, FaYoutube, FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';


const BusinessCardPreview = React.forwardRef(({ cardData, template }, businessCardRef) => {
    const { name, title, company, email, phone, website, logo, instagram, twitter, youtube } = cardData;

    const formatUrl = (url) => {
        if(!url){
            return '#';
        }
        if(url.startsWith('http://') || url.startsWith('https://')){
            return url;
        }
        return `https://${url}`
    }

    return (
        <div className="preview-container">
            <h1 className="brand-title">CardSpark</h1>
            <h2>Business Card Preview</h2>

            <div className={`business-card ${template}`} ref={businessCardRef}>
                <div className="card-header">
                    {
                        logo && <img src={logo} alt={`${company} logo`} className="logo" />
                    }
                    <div className="name-section">
                        <h3 className="name">{name || 'Your Name'}</h3>
                        <p className="title">{title || 'Your Title'}</p>
                        <p className="company">{company || 'Your Company'}</p>
                    </div>
                </div>
                <div className="card-body">
                    <p className="contact-info">
                        <a href={`tel:${phone}`}>{phone || '123-456-7890'}</a>
                    </p>
                    <p className="contact-info">
                        <a href={`mailto:${email}`}>{email || 'your.email@example.com'}</a>
                    </p>
                    <p className="contact-info">
                        <a href={formatUrl(website)} target="_blank" rel="noopener noreferrer">
                            {website || 'yourwebsite.com'}
                        </a>
                    </p>

                    {(instagram || twitter || youtube) && (
                        <div className="social-links">
                            {instagram && (
                                <a href={`https://www.linkedin.com/in/${instagram}`} target="_blank" rel="noopener noreferrer">
                                    <FaInstagram />
                                </a>
                            )}
                            {twitter && (
                                <a href={`https://twitter.com/${twitter}`} target="_blank" rel="noopener noreferrer">
                                    <FaTwitter />
                                </a>
                            )}
                            {youtube && (
                                <a href={`https://github.com/${youtube}`} target="_blank" rel="noopener noreferrer">
                                    <FaYoutube />
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <footer className="preview-footer">
                <p>
                    Copyright © {new Date().getFullYear()} CardSpark. All Rights Reserved.
                </p>
                <div className="footer-social-links">
                    <a href="https://github.com/sarim-aliii" target="_blank" rel="noopener noreferrer" title="GitHub">
                        <FaGithub />
                    </a>
                    <a href="https://www.linkedin.com/in/sarim-ali-0a7102295" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                        <FaLinkedin />
                    </a>
                    <a href="https://leetcode.com/u/_thelearninguy/" target="_blank" rel="noopener noreferrer" title="LeetCode">
                        <SiLeetcode />
                    </a>
                </div>
            </footer>
        </div>
    );
});

export default BusinessCardPreview;