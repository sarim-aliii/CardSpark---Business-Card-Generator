import './ControlPanel.css';
import { FaUser, FaBriefcase, FaEnvelope, FaPhone, FaGlobe, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import QRCode from "react-qr-code";


export default function ControlPanel({ cardData, onInputChange, onLogoChange, onDownload, onGenerateLogo, isLogoLoading, template, onTemplateChange, style, onSaveVCard, qrCodeValue }) {
    return (
        <div className="control-panel" style={style}>
            <h2>Craft Your Card</h2>

            <div className="form-group">
                <label htmlFor="template">Template Style</label>
                <select 
                    id="template" 
                    value={template} 
                    onChange={onTemplateChange}
                    className="template-select"
                >
                    <option value="modern">Modern</option>
                    <option value="classic">Classic</option>
                    <option value="minimalist">Minimalist</option>
                    <option value="corporate">Corporate</option>
                    <option value="creative">Creative</option>
                    <option value="vertical">Vertical</option>
                    <option value="onyx">Onyx (Dark)</option>
                    <option value="luxe">Luxe</option>
                    <option value="geo-stripe">Geo-Stripe</option>
                    <option value="glassmorphic">Glassmorphic</option>
                    <option value="bold-block">Bold-Block</option>
                </select>
            </div>

            <form>
                <div className="form-group">
                    <label htmlFor="name"><FaUser /> Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={cardData.name}
                        onChange={onInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="title"><FaBriefcase /> Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={cardData.title}
                        onChange={onInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <div className='company-input-group'>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            value={cardData.company}
                            onChange={onInputChange}
                            placeholder="e.g., Aqua Solutions"
                        />
                        <button 
                            type='button'
                            onClick={onGenerateLogo} className='generate-logo-btn'
                            disabled={isLogoLoading}
                        >
                            {isLogoLoading ? 'Generating...' : 'Generate Logo'}
                        </button>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="email"><FaEnvelope /> Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={cardData.email}
                        onChange={onInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone"><FaPhone /> Phone</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={cardData.phone}
                        onChange={onInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="website"><FaGlobe /> Website</label>
                    <input
                        type="text"
                        id="website"
                        name="website"
                        value={cardData.website}
                        onChange={onInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="logo">Logo</label>
                    <input
                        type="file"
                        id="logo"
                        name="logo"
                        accept="image/png, image/jpeg"
                        onChange={onLogoChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="instagram"><FaInstagram /> Instagram </label>
                    <input
                        type="text"
                        id="instagram"
                        name="instagram"
                        value={cardData.instagram}
                        onChange={onInputChange}
                        placeholder="e.g., sarim"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="twitter"><FaTwitter /> Twitter </label>
                    <input
                        type="text"
                        id="twitter"
                        name="twitter"
                        value={cardData.twitter}
                        onChange={onInputChange}
                        placeholder="e.g., sarim"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="youtube"><FaYoutube /> Youtube </label>
                    <input
                        type="text"
                        id="youtube"
                        name="youtube"
                        value={cardData.youtube}
                        onChange={onInputChange}
                        placeholder="e.g., sarim"
                    />
                </div>
            </form>

            <div className="qr-code-section">
                <h3>Scan to Save</h3>
                <div className="qr-code-bg">
                    <QRCode value={qrCodeValue} size={150} />
                </div>
            </div>

            <div className="download-section">
                <button onClick={onSaveVCard} className="download-btn vcard-btn">Save to Contacts</button>
                <button onClick={() => onDownload('png')} className="download-btn">Download as PNG</button>
                <button onClick={() => onDownload('jpeg')} className="download-btn">Download as JPEG</button>
                <button onClick={() => onDownload('pdf')} className="download-btn">Download as PDF</button>
            </div>
        </div>
    );
}