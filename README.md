# CardSpark - Digital Business Card Generator ✨

**Live Demo:** https://cardsparkbusinesscardgenerator.netlify.app/


## 📋 Overview

CardSpark is a modern, feature-rich web application that allows users to create, customize, and share stunning digital business cards. Built with React and Vite, this project showcases a dynamic frontend with real-time updates and a wide array of personalization options. From multiple design templates to AI-powered logo generation and digital sharing features, CardSpark is a comprehensive tool for personal and professional branding.

## 🔥 Features

*   **🎨 Real-Time Customization:** Instantly see your changes on the business card preview as you type.
*   **🖼️ 12+ Professional Templates:** Choose from a wide variety of styles, including Modern, Classic, Corporate, Onyx (Dark Mode), and more.
*   **🖌️ Dynamic Accent Color:** A color picker allows you to select an accent color that is intelligently applied across all templates.
*   **🤖 AI Logo Generation:** Don't have a logo? Enter your company name and generate one on the fly using the Stability AI API.
*   **📁 Multiple Download Options:** Export your finished card as a high-quality **PNG**, **JPEG**, or print-ready **PDF**.
*   **📲 Digital Card Functionality:**
    *   **Save to Contacts:** Generate a `.vcf` (vCard) file that can be instantly imported into phone contacts.
    *   **Live QR Code:** A QR code is generated in real-time, containing all your vCard information for easy sharing.
*   **🔗 Social Media Integration:** Add optional links for LinkedIn, Twitter, and GitHub, with corresponding icons appearing on the card.
*   **💾 Local Persistence:** Your design is automatically saved to your browser's local storage, so you'll never lose your work.
*   **↔️ Responsive Resizable Editor:** The editor panel can be resized for a customized workspace.

## 🛠️ Technologies Used

| Technology | Description |
| :--- | :--- |
| **React** | A JavaScript library for building user interfaces. |
| **Vite** | Next-generation frontend tooling for a fast development experience. |
| **CSS** | Custom styling for all components and dynamic templates. |
| **html2canvas** | For capturing the card component to generate PNG/JPEG images. |
| **jsPDF** | For converting the captured image into a downloadable PDF. |
| **vcard-creator** | To generate `.vcf` files for the "Save to Contacts" feature. |
| **react-qr-code** | To render the dynamic QR code from vCard data. |
| **react-icons** | For a comprehensive library of high-quality UI icons. |
| **Stability AI API**| For the AI-powered logo generation feature. |
| **Netlify** | For seamless, continuous deployment from GitHub. |

## 🚀 Getting Started

To run this project on your local machine, follow these steps.

### Prerequisites

Make sure you have Node.js (version 18 or higher) and npm installed on your system.

### Installation & Setup

1.  **Clone the repository:**
    git clone https://github.com/sarim-aliii/CardSpark---Business-Card-Generator.git

2.  **Navigate to the project directory:**
    cd CardSpark---Business-Card-Generator

3.  **Install NPM packages:**
    npm install

4.  **Set up Environment Variables:**
    This project uses the Stability AI API to generate logos. You need to provide your own API key.
    *   Create a new file in the root of your project named `.env.local`.
    *   Add the following line to it, replacing `YOUR_API_KEY_HERE` with your actual key:
        ```
        VITE_STABILITY_API_KEY=YOUR_API_KEY_HERE
        ```

### Running the Application

Once the setup is complete, you can run the application in development mode:
npm run dev
Open http://localhost:5173 (or whatever port it specifies) to view it in your browser.


🚀 **Deployment**
This application is deployed on Netlify and configured for continuous deployment. Every push to the main branch on GitHub automatically triggers a new build and deploy.

📜 **License**
Distributed under the MIT License. See LICENSE for more information.
👤 Contact
Saim Ali – sarimali8549@gmail.com
Project Link: https://github.com/sarim-aliii/CardSpark---Business-Card-Generator