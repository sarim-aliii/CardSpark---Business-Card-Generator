import { useState, useRef, useEffect, useCallback } from "react";
import BusinessCardPreview from "./BusinessCardPreview";
import ControlPanel from "./ControlPanel";

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import vCard from 'vcard-creator'; 


export default function EditorPage() {
    // States
    const [editorWidth, setEditorWidth] = useState(350);
    const [cardData, setCardData] = useState({
        name: 'Your Name',
        title: 'Your Title',
        company: 'Your Company',
        email: 'your.email@example.com',
        phone: '123-456-7890',
        website: 'yourwebsite.com',
        logo: null,
        instagram: '',
        twitter: '',
        youtube: '',
    });
    const [isLogoLoading, setIsLogoLoading] = useState(false);
    const [template, setTemplate] = useState('modern');
    const [qrCodeValue, setQrCodeValue] = useState('');


    // References
    const businessCardRef = useRef(null);
    const isResizing = useRef(false);

    useEffect(() => {
        const savedCard = localStorage.getItem('savedCardData');
        if(savedCard){
            setCardData(JSON.parse(savedCard));
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const newCardData = { ...cardData, [name]: value };
        setCardData(newCardData);
        
        localStorage.setItem('savedCardData', JSON.stringify(newCardData));
    };
    
    const handleLogoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                const newCardData = { ...cardData, logo: reader.result };
                setCardData(newCardData);
                localStorage.setItem('savedCardData', JSON.stringify(newCardData));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDownload = (format) => {
        const cardElement = businessCardRef.current;
        if (!cardElement){
            return;
        }

        html2canvas(cardElement, {
            scale: 2,
            useCORS: true // Important for images from other origins
        }).then(canvas => {
            const imageDataUrl = canvas.toDataURL(`image/${format === 'pdf'}`);

            const dataToSave = { ...cardData, savedImage: imageDataUrl };
            localStorage.setItem('savedCard', JSON.stringify(dataToSave));
            console.log("Card data saved to local storage!");

            if (format === 'pdf') {
                const pdf = new jsPDF('l', 'mm', [85.6, 53.98]);
                const width = pdf.internal.pageSize.getWidth();
                const height = pdf.internal.pageSize.getHeight();
                pdf.addImage(imageDataUrl, 'PNG', 0, 0, width, height);
                pdf.save("business-card.pdf");
            } 
            else {
                const link = document.createElement('a');
                link.href = imageDataUrl;
                link.download = `business-card.${format}`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        });
    };

    // Resizing
    const handleMouseMove = useCallback((e) => {
        if(!isResizing.current){
            return;
        }

        // Size ranges b/w 300-600
        const newWidth = Math.min(Math.max(e.clientX, 300), 600);
        setEditorWidth(newWidth);
    }, []);

    const handleMouseUp = useCallback(() => {
        isResizing.current = false;
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    }, [handleMouseMove]);

    const handleMouseDown = (e) => {
        isResizing.current = true;
        e.preventDefault();  // Prevent text selection while dragging

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    }


    // Generating Logo
    const handleGenerateLogo = async () => {
        if (!cardData.company || cardData.company === 'Your Company') {
            alert('Please enter a company name first.');
            return;
        }
        setIsLogoLoading(true);

        const apiKey = import.meta.env.VITE_STABILITY_API_KEY;
        const prompt = `A minimalist flat vector logo for a company named '${cardData.company}'. Clean background, professional, corporate branding, high quality.`;


        const formData = new FormData();
        formData.append('prompt', prompt);
        formData.append('output_format', 'png');
        formData.append('aspect_ratio', '1:1');

        try {
            const response = await fetch("https://api.stability.ai/v2beta/stable-image/generate/core", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Accept': 'image/*' 
                },
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Logo generation failed: ${response.statusText} - ${errorText}`);
            }

            const imageBlob = await response.blob();
            const reader = new FileReader();
            reader.onloadend = () => {
                const logoDataUrl = reader.result;
                const newCardData = { ...cardData, logo: logoDataUrl };
                setCardData(newCardData);
                localStorage.setItem('savedCardData', JSON.stringify(newCardData));
            };
            reader.readAsDataURL(imageBlob);

        } 
        catch (error) {
            console.error("Error generating logo:", error);
            alert(error.message);
        } 
        finally {
            setIsLogoLoading(false);
        }
    };


    // Template Change
    const handleTemplateChange = (e) => {
        setTemplate(e.target.value);
    };


    // Saving vCard
    const updateVCardData = () => {
        const myVCard = new vCard();
        const [firstName, ...lastNameParts] = cardData.name.split(' ');

        myVCard
            .addName(lastNameParts.join(' '), firstName)
            .addCompany(cardData.company)
            .addJobtitle(cardData.title)
            .addEmail(cardData.email)
            .addPhoneNumber(cardData.phone)
            .addURL(cardData.website);
        
        // Add social media URLs if they exist
        if (cardData.linkedin) myVCard.addURL(`https://www.linkedin.com/in/${cardData.linkedin}`);
        if (cardData.twitter) myVCard.addURL(`https://twitter.com/${cardData.twitter}`);
        if (cardData.github) myVCard.addURL(`https://github.com/${cardData.github}`);

        return myVCard;
    };

     const handleSaveVCard = () => {
        const myVCard = updateVCardData(); 
        const vcardString = myVCard.toString();
        const blob = new Blob([vcardString], { type: "text/vcard;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${cardData.name.replace(' ', '_')}.vcf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        const myVCard = updateVCardData(); // Use the helper function
        setQrCodeValue(myVCard.toString());
    }, [cardData]);


    return (
        <div className="app-container">
            <ControlPanel 
                cardData={cardData} 
                onInputChange={handleInputChange}
                onLogoChange={handleLogoChange}
                onDownload={handleDownload}
                onGenerateLogo={handleGenerateLogo}
                isLogoLoading={isLogoLoading}
                template={template}
                onTemplateChange={handleTemplateChange}
                style={{ width: `${editorWidth}px` }}
                onSaveVCard={handleSaveVCard}
                qrCodeValue={qrCodeValue}
            />

            <div 
                className="resizer"
                onMouseDown={handleMouseDown}
            />

            <BusinessCardPreview 
                ref={businessCardRef} 
                cardData={cardData} 
                template={template}
            />
        </div>
    );
}