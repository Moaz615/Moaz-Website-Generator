import React, { useState, useEffect, useRef, useCallback } from 'react';

// Custom Alert/Notification Component
const Notification = ({ message, type, onClose }) => {
    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-blue-500';
    const borderColor = type === 'success' ? 'border-green-700' : 'border-blue-700';

    if (!message) return null;

    return (
        <div className={`fixed top-5 right-5 z-50 p-4 rounded-lg shadow-lg text-white ${bgColor} border-b-4 ${borderColor} animate-fade-in`}>
            <div className="flex items-center justify-between">
                <span>{message}</span>
                <button onClick={onClose} className="ml-4 text-white hover:text-gray-200 focus:outline-none">
                    &times;
                </button>
            </div>
        </div>
    );
};

// Define predefined themes with more comprehensive styling properties
const THEMES = {
    'modern': {
        primaryColor: '#3b82f6', // blue-500
        fontFamily: 'Inter',
        layoutStyle: 'modern',
        headerBg: 'bg-blue-700',
        headerText: 'text-white',
        footerBg: 'bg-gray-800',
        footerText: 'text-white',
        bodyBg: 'bg-gray-100',
        bodyText: 'text-gray-800',
        sectionBgLight: 'bg-gray-50', // For features, gallery, team
        sectionBgDark: 'bg-white',    // For about, contact
        buttonBg: 'bg-blue-600',
        buttonHover: 'hover:bg-blue-700',
        buttonText: 'text-white',
    },
    'corporate': {
        primaryColor: '#047857', // emerald-700
        fontFamily: 'Roboto',
        layoutStyle: 'modern',
        headerBg: 'bg-emerald-800',
        headerText: 'text-white',
        footerBg: 'bg-gray-900',
        footerText: 'text-gray-300',
        bodyBg: 'bg-white',
        bodyText: 'text-gray-900',
        sectionBgLight: 'bg-emerald-50',
        sectionBgDark: 'bg-white',
        buttonBg: 'bg-emerald-700',
        buttonHover: 'hover:bg-emerald-800',
        buttonText: 'text-white',
    },
    'vibrant': {
        primaryColor: '#ef4444', // red-500
        fontFamily: 'Poppins',
        layoutStyle: 'modern',
        headerBg: 'bg-red-700',
        headerText: 'text-white',
        footerBg: 'bg-red-900',
        footerText: 'text-white',
        bodyBg: 'bg-red-50',
        bodyText: 'text-red-900',
        sectionBgLight: 'bg-white',
        sectionBgDark: 'bg-red-100',
        buttonBg: 'bg-red-600',
        buttonHover: 'hover:bg-red-700',
        buttonText: 'text-white',
    },
    'minimalist': {
        primaryColor: '#4b5563', // gray-600
        fontFamily: 'Open Sans',
        layoutStyle: 'minimal',
        headerBg: 'bg-white',
        headerText: 'text-gray-800',
        footerBg: 'bg-gray-700',
        footerText: 'text-gray-200',
        bodyBg: 'bg-white',
        bodyText: 'text-gray-800',
        sectionBgLight: 'bg-gray-50',
        sectionBgDark: 'bg-white',
        buttonBg: 'bg-gray-600',
        buttonHover: 'hover:bg-gray-700',
        buttonText: 'text-white',
    },
    'dark-mode': {
        primaryColor: '#6366f1', // indigo-500
        fontFamily: 'Lato',
        layoutStyle: 'modern',
        headerBg: 'bg-gray-900',
        headerText: 'text-white',
        footerBg: 'bg-gray-950',
        footerText: 'text-gray-400',
        bodyBg: 'bg-gray-800',
        bodyText: 'text-gray-100',
        sectionBgLight: 'bg-gray-700',
        sectionBgDark: 'bg-gray-900',
        buttonBg: 'bg-indigo-600',
        buttonHover: 'hover:bg-indigo-700',
        buttonText: 'text-white',
    },
};

// Define a default configuration to easily reset values
const DEFAULT_CONFIG = {
    websiteTitle: 'Moaz Website Generator',
    websiteDescription: 'A beautifully designed website created with my generator.',
    heroHeading: 'Welcome to Moaz Website Generator!',
    heroSubheading: 'Craft stunning web experiences with ease and speed.',
    themeName: 'modern', // Default theme
    // Inherit initial theme properties from THEMES.modern
    primaryColor: THEMES.modern.primaryColor,
    fontFamily: THEMES.modern.fontFamily,
    layoutStyle: THEMES.modern.layoutStyle,
    headerBg: THEMES.modern.headerBg,
    headerText: THEMES.modern.headerText,
    footerBg: THEMES.modern.footerBg,
    footerText: THEMES.modern.footerText,
    bodyBg: THEMES.modern.bodyBg,
    bodyText: THEMES.modern.bodyText,
    sectionBgLight: THEMES.modern.sectionBgLight,
    sectionBgDark: THEMES.modern.sectionBgDark,
    buttonBg: THEMES.modern.buttonBg,
    buttonHover: THEMES.modern.buttonHover,
    buttonText: THEMES.modern.buttonText,
    pages: {
        home: true,
        about: true,
        contact: true,
        services: false,
        gallery: false,
        blog: false,
    },
    sections: {
        hero: true,
        features: true,
        testimonials: false,
        gallery: false,
        cta: false,
        contactForm: false,
        team: false, // New team section checkbox
        blog: false, // New blog section checkbox
        faq: false, // New FAQ section checkbox
        portfolio: false, // New Portfolio section checkbox
        timeline: false, // New Timeline section checkbox
    },

    aboutInfo: {
        title: 'About me',
        description: 'I am Moaz (pronounced Mu\'adh), or Abulbara\', a G12 student at STEM October. I am into tech, problem-solving, and I enjoy building projects that make a real difference',
        image: '',
    },

    contactInfo: {
        email: 'mazmhmd493@gmail.com',
        phone: '+1 234 567 8900',
        address: '123 Main St, Anytown, Egypt',
    },
    socialMedia: {
        facebook: 'https://facebook.com/yourprofile',
        twitter: 'https://twitter.com/yourprofile',
        linkedin: 'https://linkedin.com/in/yourprofile',
        instagram: 'https://instagram.com/yourprofile',
    },
    images: {
        aboutPage: '', // Can be base64 string or URL
        galleryImage1: '',
        galleryImage2: '',
        galleryImage3: '',
        galleryImage4: '',
    },
    // New editable content sections
    featuresContent: [
        { heading: 'Responsive Design', description: 'Your website will look stunning on any device, from desktops to mobile phones.' },
        { heading: 'Easy Customization', description: 'Effortlessly change colors, fonts, and layouts to match your brand.' },
        { heading: 'High Performance', description: 'Built with clean code for fast loading times and a smooth user experience.' },
    ],
    testimonialsContent: [
        { quote: '"This generator is a game-changer! I created a beautiful website in minutes without any coding knowledge. Highly recommend!"', name: 'Jane Doe', title: 'CEO, Example Corp', image: '' },
        { quote: '"Fantastic tool for rapid prototyping. The clean code and responsive design saved me so much time."', name: 'Alex Smith', title: 'Developer', image: '' },
    ],
    ctaContent: {
        heading: 'Ready to Get Started?',
        subheading: 'Join us today and experience the difference!',
        buttonText: 'Contact Us Now',
    },
    footerCopyright: `&copy; ${new Date().getFullYear()} Moaz Website Generator. All rights reserved.`,
    // New: Team section with one default member
    team: [{ name: 'Abulbara', imageUrl: 'https://placehold.co/60x60/cccccc/ffffff?text=AB' }],
    // New: Blog Posts
    blogPosts: [
        { title: 'My First Blog Post', content: 'This is the content of my first blog post. You can write about anything here!', imageUrl: '' },
        { title: 'Exploring New Web Technologies', content: 'Dive into the latest trends and tools shaping the web development landscape.', imageUrl: '' },
    ],
    // New: FAQ Items
    faqItems: [
        { question: 'What services do you offer?', answer: 'We offer a wide range of web development, design, and marketing services tailored to your needs.' },
        { question: 'How can I contact support?', answer: 'You can reach our support team via email, phone, or by filling out the contact form on our website.' },
    ],
    // New: Portfolio Items
    portfolioItems: [
        { title: 'E-commerce Redesign', description: 'Modernizing an online store for better user experience and conversion rates.', imageUrl: '', projectLink: '#' },
        { title: 'Mobile App Development', description: 'Building a native mobile application for iOS and Android platforms.', imageUrl: '', projectLink: '#' },
    ],
    // New: Timeline Events
    timelineEvents: [
        { year: '2020', title: 'Company Founded', description: 'Established with a vision to revolutionize web development.' },
        { year: '2022', title: 'Launched Flagship Product', description: 'Introduced our core web application to the market, gaining significant traction.' },
    ],
};

// Key for local storage
const LOCAL_STORAGE_KEY = 'websiteGeneratorConfig';
const PANEL_WIDTH_KEY = 'websiteGeneratorPanelWidth';

// Main App Component for the Website Generator
const App = () => {
    // Initialize state from local storage or use default config
    const [config, setConfig] = useState(() => {
        try {
            const savedConfig = localStorage.getItem(LOCAL_STORAGE_KEY);
            // Merge saved config with default to ensure new fields are present if not in old save
            const initialConfig = savedConfig ? { ...DEFAULT_CONFIG, ...JSON.parse(savedConfig) } : DEFAULT_CONFIG;
            // Ensure theme properties are loaded correctly
            if (initialConfig.themeName && THEMES[initialConfig.themeName]) {
                const themeProps = THEMES[initialConfig.themeName];
                // Apply theme properties, but let manual overrides (if present in savedConfig) take precedence
                Object.keys(themeProps).forEach(key => {
                    // Only apply theme property if it's not explicitly set in savedConfig
                    // or if the saved value is an empty string (meaning it was not customized)
                    if (initialConfig[key] === undefined || (savedConfig && JSON.parse(savedConfig)[key] === undefined) || (initialConfig[key] === DEFAULT_CONFIG[key] && DEFAULT_CONFIG[key] !== themeProps[key])) {
                        initialConfig[key] = themeProps[key];
                    }
                });
            }
            return initialConfig;
        } catch (error) {
            console.error("Error loading config from local storage:", error);
            return DEFAULT_CONFIG;
        }
    });

    const {
        websiteTitle, websiteDescription, heroHeading, heroSubheading, primaryColor,
        fontFamily, layoutStyle, pages, sections, contactInfo, socialMedia, images, themeName,
        headerBg, headerText, footerBg, footerText, bodyBg, bodyText, sectionBgLight, sectionBgDark,
        buttonBg, buttonHover, buttonText,
        featuresContent, testimonialsContent, ctaContent, footerCopyright, team,
        blogPosts, faqItems, portfolioItems, timelineEvents
    } = config;

    // State for panel resizing
    const [leftPanelWidth, setLeftPanelWidth] = useState(() => {
        try {
            const savedWidth = localStorage.getItem(PANEL_WIDTH_KEY);
            return savedWidth ? parseFloat(savedWidth) : 33.33; // Default 1/3 width
        } catch (error) {
            console.error("Error loading panel width from local storage:", error);
            return 33.33;
        }
    });
    const [isResizing, setIsResizing] = useState(false);
    const resizerRef = useRef(null);

    // State for notification messages
    const [notification, setNotification] = useState({ message: '', type: '' });

    // State for the generated HTML, CSS, and JS code
    const [generatedHtml, setGeneratedHtml] = useState('');
    const [generatedCss, setGeneratedCss] = useState('');
    const [generatedJs, setGeneratedJs] = useState('');

    const previewIframeRef = useRef(null);

    // State for managing the view between Live Preview and Code Viewer
    const [currentView, setCurrentView] = useState('preview'); // 'preview' or 'code'
    const [currentCodeView, setCurrentCodeView] = useState('html'); // 'html', 'css', 'js'

    // State for managing collapsible sections
    const [openSections, setOpenSections] = useState({
        basicInfoHero: true,
        themeSelector: true,
        aboutSection: false,
        contactInfo: false,
        socialMedia: false,
        imageUrls: false,
        featuresContent: false,
        testimonialsContent: false,
        ctaContent: false,
        teamSection: false,
        blogSection: false, // New
        faqSection: false, // New
        portfolioSection: false, // New
        timelineSection: false, // New
        footerCopyright: false,
        styleOverrides: false,
        pageStructure: false,
        contentSections: false,
    });

    const toggleSection = (sectionName) => {
        setOpenSections(prevState => ({
            ...prevState,
            [sectionName]: !prevState[sectionName]
        }));
    };

    // Function to generate the complete HTML for the website preview and update code states
    const generatePreviewAndCode = useCallback(() => {
        const html = generateWebsiteHtml(config);
        setGeneratedHtml(html);
        setGeneratedCss(getGeneratedCss(config.fontFamily));
        setGeneratedJs(getGeneratedJs(config.websiteTitle));
    }, [config]); // Re-create only if config changes

    // Effect hook to regenerate the website preview and code whenever customization options change
    // Also saves config to local storage
    useEffect(() => {
        generatePreviewAndCode();
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(config));
        } catch (error) {
            console.error("Error saving config to local storage:", error);
        }
    }, [config, generatePreviewAndCode]);

    // Effect hook for saving panel width to local storage
    useEffect(() => {
        try {
            localStorage.setItem(PANEL_WIDTH_KEY, leftPanelWidth.toString());
        } catch (error) {
            console.error("Error saving panel width to local storage:", error);
        }
    }, [leftPanelWidth]);


    // Helper to show notifications
    const showNotification = (message, type = 'info') => {
        setNotification({ message, type });
        setTimeout(() => setNotification({ message: '', type: '' }), 3000); // Hide after 3 seconds
    };

    // --- Resizing Logic ---
    const handleMouseDown = useCallback((e) => {
        setIsResizing(true);
        // Prevent text selection during drag
        e.preventDefault();
    }, []);

    const handleMouseMove = useCallback((e) => {
        if (!isResizing) return;

        // Calculate new width based on mouse position relative to the whole window
        const newLeftWidthPercentage = (e.clientX / window.innerWidth) * 100;

        // Apply constraints for minimum and maximum width
        const minWidthPercentage = 20; // 20%
        const maxWidthPercentage = 80;  // 80%

        const clampedWidth = Math.min(Math.max(newLeftWidthPercentage, minWidthPercentage), maxWidthPercentage);
        setLeftPanelWidth(clampedWidth);
    }, [isResizing]);

    const handleMouseUp = useCallback(() => {
        setIsResizing(false);
    }, []);

    // Attach/detach global mouse listeners
    useEffect(() => {
        if (isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing, handleMouseMove, handleMouseUp]);


    // --- HTML Section Generation Helper Functions ---

    // Generates the HTML for the Hero section
    const getHeroSection = (config) => `
        <!-- Hero Section -->
        <section class="relative bg-gradient-to-r from-${getColorClass(config.primaryColor)}-600 to-${getColorClass(config.primaryColor)}-800 ${config.headerText} py-20 px-4 sm:px-6 lg:px-8 shadow-lg rounded-lg mb-8 overflow-hidden">
            <div class="container mx-auto text-center relative z-10">
                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in-up">
                    ${config.heroHeading}
                </h1>
                <p class="text-lg sm:text-xl lg:text-2xl mb-8 opacity-90 animate-fade-in-up delay-200">
                    ${config.heroSubheading}
                </p>
                <a href="#features" class="inline-block bg-white ${config.buttonText} hover:${config.buttonHover} font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
                    Explore More
                </a>
            </div>
            <!-- Background Blob/Shape -->
            <div class="absolute inset-0 opacity-20">
                <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path fill="currentColor" class="text-${getColorClass(config.primaryColor)}-500" d="M0,0 Q50,100 100,0 T0,0 Z"></path>
                </svg>
            </div>
        </section>
    `;

    // Generates the HTML for the Features section
    const getFeaturesSection = (config) => `
        <!-- Features Section -->
        <section id="features" class="py-16 px-4 sm:px-6 lg:px-8 ${config.sectionBgLight} rounded-lg shadow-md mb-8">
            <div class="container mx-auto text-center">
                <h2 class="text-3xl sm:text-4xl font-bold mb-12 ${config.bodyText}">Key Features</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
                    ${config.featuresContent.map(feature => `
                        <div class="p-6 ${config.sectionBgDark} rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
                            <div class="text-${getColorClass(config.primaryColor)}-500 mb-4">
                            <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L12 19.25M12 19.25L14.25 17M12 19.25V5M12 5C7.5 5 4 8.5 4 13S7.5 21 12 21 20 17.5 20 13 16.5 5 12 5Z"></path></svg>
                        </div>
                            <h3 class="text-xl font-semibold mb-3 ${config.bodyText}">${feature.heading}</h3>
                            <p class="${config.bodyText.replace('text-', 'text-opacity-90 text-')}">${feature.description}</p>
                    </div>
                    `).join('')}
                </div>
            </div>
        </section>
    `;

    // Generates the HTML for the Contact page content
    const getContactPageContent = (config) => `
        <!-- Contact Section -->
        <section class="py-16 px-4 sm:px-6 lg:px-8 ${config.sectionBgDark} rounded-lg shadow-md mb-8">
            <div class="container mx-auto text-center">
                <h2 class="text-3xl sm:text-4xl font-bold mb-8 ${config.bodyText}">Get in Touch</h2>
                <div class="max-w-xl mx-auto">
                    <p class="${config.bodyText.replace('text-', 'text-opacity-90 text-')} leading-relaxed mb-8">
                        Have a question or want to work with us? Fill out the form below or reach us directly:
                    </p>
                    <div class="mb-6 ${config.bodyText.replace('text-', 'text-opacity-90 text-')}">
                        <p class="flex items-center justify-center mb-2"><svg class="w-5 h-5 mr-2 text-${getColorClass(config.primaryColor)}-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>${config.contactInfo.email}</p>
                        <p class="flex items-center justify-center mb-2"><svg class="w-5 h-5 mr-2 text-${getColorClass(config.primaryColor)}-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>${config.contactInfo.phone}</p>
                        <p class="flex items-center justify-center"><svg class="w-5 h-5 mr-2 text-${getColorClass(config.primaryColor)}-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>${config.contactInfo.address}</p>
                    </div>
                    <form class="space-y-6">
                        <div>
                            <input type="text" placeholder="Your Name" class="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-${getColorClass(config.primaryColor)}-500 focus:border-transparent transition-all duration-200 shadow-sm" />
                        </div>
                        <div>
                            <input type="email" placeholder="Your Email" class="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-${getColorClass(config.primaryColor)}-500 focus:border-transparent transition-all duration-200 shadow-sm" />
                        </div>
                        <div>
                            <textarea placeholder="Your Message" rows="6" class="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-${getColorClass(config.primaryColor)}-500 focus:border-transparent transition-all duration-200 shadow-sm"></textarea>
                        </div>
                        <button type="submit" class="w-full ${config.buttonBg} ${config.buttonText} font-semibold py-4 rounded-lg ${config.buttonHover} transition duration-300 ease-in-out transform hover:scale-105 shadow-md">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    `;

    // Generates the HTML for the Testimonials section
    const getTestimonialsSection = (config) => `
        <!-- Testimonials Section -->
        <section class="py-16 px-4 sm:px-6 lg:px-8 ${config.sectionBgLight} rounded-lg shadow-md mb-8">
            <div class="container mx-auto text-center">
                <h2 class="text-3xl sm:text-4xl font-bold mb-12 ${config.bodyText}">What Our Clients Say</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                    ${config.testimonialsContent.map(testimonial => `
                        <div class="${config.sectionBgDark} p-8 rounded-xl shadow-lg relative">
                            <p class="${config.bodyText.replace('text-', 'text-opacity-90 text-')} italic mb-6">"${testimonial.quote}"</p>
                        <div class="flex items-center justify-center">
                                <img src="${testimonial.image || `https://placehold.co/60x60/${getColorHex(config.primaryColor)}/ffffff?text=${testimonial.name.substring(0, 2).toUpperCase()}`}" alt="${testimonial.name}" class="w-16 h-16 rounded-full mr-4 object-cover" onerror="this.onerror=null;this.src='https://placehold.co/60x60/${getColorHex(config.primaryColor)}/ffffff?text=${testimonial.name.substring(0, 2).toUpperCase()}';">
                            <div>
                                    <p class="font-semibold ${config.bodyText}">${testimonial.name}</p>
                                    <p class="text-sm ${config.bodyText.replace('text-', 'text-opacity-70 text-')}">${testimonial.title}</p>
                            </div>
                        </div>
                    </div>
                    `).join('')}
                </div>
            </div>
        </section>
    `;

    // Generates the HTML for the Gallery section
    const getGallerySection = (config) => {
        const imageElements = [
            config.images.galleryImage1,
            config.images.galleryImage2,
            config.images.galleryImage3,
            config.images.galleryImage4
        ].map((imageUrl, index) => {
            const fallbackUrl = `https://placehold.co/400x300/${getColorHex(config.primaryColor)}/ffffff?text=Image+${index + 1}`;
            const src = imageUrl || fallbackUrl;
            return `
                <div class="relative overflow-hidden rounded-lg shadow-lg group">
                    <img src="${src}" alt="Gallery Image ${index + 1}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" onerror="this.onerror=null;this.src='${fallbackUrl}';">
                    <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p class="text-white text-lg font-semibold">Project ${['One', 'Two', 'Three', 'Four'][index]}</p>
                    </div>
                </div>
            `;
        }).join('');

        return `
        <!-- Gallery Section -->
            <section class="py-16 px-4 sm:px-6 lg:px-8 ${config.sectionBgLight} rounded-lg shadow-md mb-8">
            <div class="container mx-auto text-center">
                    <h2 class="text-3xl sm:text-4xl font-bold mb-12 ${config.bodyText}">Our Work</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        ${imageElements}
                        </div>
                    </div>
            </section>
        `;
    };

    // Generates the HTML for the Call to Action (CTA) section
    const getCtaSection = (config) => `
        <!-- Call to Action Section -->
        <section class="${config.buttonBg} ${config.buttonText} py-16 px-4 sm:px-6 lg:px-8 text-center rounded-lg shadow-md mb-8">
            <div class="container mx-auto">
                <h2 class="text-3xl sm:text-4xl font-bold mb-6">${config.ctaContent.heading}</h2>
                <p class="text-lg opacity-90 mb-8">${config.ctaContent.subheading}</p>
                <a href="#contact" class="inline-block ${config.sectionBgDark} ${config.buttonBg.replace('bg-', 'text-')} font-semibold py-3 px-8 rounded-full shadow-lg ${config.buttonHover.replace('hover:bg-', 'hover:text-')} transition duration-300 ease-in-out transform hover:scale-105">
                    ${config.ctaContent.buttonText}
                </a>
                        </div>
        </section>
    `;

    // Generates the HTML for the Team section
    const getTeamSection = (config) => {
        const teamMembersHtml = config.team.map((member, index) => `
            <div class="p-6 ${config.sectionBgDark} rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
                <img src="${member.imageUrl || `https://placehold.co/60x60/${getColorHex(config.primaryColor)}/ffffff?text=${member.name.substring(0, 2).toUpperCase()}`}" alt="${member.name}" class="w-24 h-24 rounded-full mx-auto mb-4 object-cover" onerror="this.onerror=null;this.src='https://placehold.co/60x60/${getColorHex(config.primaryColor)}/ffffff?text=${member.name.substring(0, 2).toUpperCase()}';">
                <h3 class="text-xl font-semibold ${config.bodyText} mb-1">${member.name}</h3>
                <p class="${config.bodyText.replace('text-', 'text-opacity-90 text-')}">Team Member</p>
                    </div>
        `).join('');

        return `
            <!-- Team Section -->
            <section id="team" class="py-16 px-4 sm:px-6 lg:px-8 ${config.sectionBgLight} rounded-lg shadow-md mb-8">
                <div class="container mx-auto text-center">
                    <h2 class="text-3xl sm:text-4xl font-bold mb-12 ${config.bodyText}">Meet Our Team</h2>
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                        ${teamMembersHtml}
                        </div>
                    </div>
            </section>
        `;
    };

    // New: Generates the HTML for the Blog section
    const getBlogSection = (config) => {
        const blogPostsHtml = config.blogPosts.map((post, index) => `
            <article class="${config.sectionBgDark} rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300">
                <img src="${post.imageUrl || `https://placehold.co/600x400/${getColorHex(config.primaryColor)}/ffffff?text=Blog+Post+${index + 1}`}" alt="${post.title}" class="w-full h-56 object-cover" onerror="this.onerror=null;this.src='https://placehold.co/600x400/${getColorHex(config.primaryColor)}/ffffff?text=Blog+Post+${index + 1}';">
                <div class="p-6">
                    <h3 class="text-xl font-semibold mb-2 ${config.bodyText}">${post.title}</h3>
                    <p class="${config.bodyText.replace('text-', 'text-opacity-90 text-')} text-sm mb-4">By Admin | ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    <p class="${config.bodyText.replace('text-', 'text-opacity-90 text-')} mb-4">${post.content.substring(0, 150)}...</p>
                    <a href="#" class="text-${getColorClass(config.primaryColor)}-600 hover:underline">Read More &rarr;</a>
                        </div>
            </article>
        `).join('');

        return `
            <!-- Blog Section -->
            <section id="blog" class="py-16 px-4 sm:px-6 lg:px-8 ${config.sectionBgLight} rounded-lg shadow-md mb-8">
                <div class="container mx-auto text-center">
                    <h2 class="text-3xl sm:text-4xl font-bold mb-12 ${config.bodyText}">Latest Blog Posts</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        ${blogPostsHtml}
                    </div>
                </div>
            </section>
        `;
    };

    // New: Generates the HTML for the FAQ section
    const getFaqSection = (config) => {
        const faqItemsHtml = config.faqItems.map((item, index) => `
            <details class="mb-4 bg-white p-5 rounded-lg shadow-md cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg">
                <summary class="font-semibold text-lg ${config.bodyText} flex justify-between items-center">
                    ${item.question}
                    <svg class="w-6 h-6 text-${getColorClass(config.primaryColor)}-500 ml-2 transform rotate-0 details-arrow transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </summary>
                <p class="mt-4 ${config.bodyText.replace('text-', 'text-opacity-90 text-')}">
                    ${item.answer}
                </p>
            </details>
        `).join('');

        // Add a small script to rotate the arrow on details open/close
        const detailsScript = `
            document.querySelectorAll('details').forEach(detail => {
                detail.addEventListener('toggle', () => {
                    const arrow = detail.querySelector('.details-arrow');
                    if (arrow) {
                        if (detail.open) {
                            arrow.classList.add('rotate-180');
                        } else {
                            arrow.classList.remove('rotate-180');
                        }
                    }
                });
            });
        `;

        return `
            <!-- FAQ Section -->
            <section id="faq" class="py-16 px-4 sm:px-6 lg:px-8 ${config.sectionBgLight} rounded-lg shadow-md mb-8">
                <div class="container mx-auto text-center">
                    <h2 class="text-3xl sm:text-4xl font-bold mb-12 ${config.bodyText}">Frequently Asked Questions</h2>
                    <div class="max-w-3xl mx-auto text-left">
                        ${faqItemsHtml}
            </div>
                </div>
                <script>${detailsScript}</script>
        </section>
    `;
    };

    // New: Generates the HTML for the Portfolio/Projects section
    const getPortfolioSection = (config) => {
        const portfolioItemsHtml = config.portfolioItems.map((project, index) => `
            <div class="${config.sectionBgDark} rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300">
                <img src="${project.imageUrl || `https://placehold.co/400x300/${getColorHex(config.primaryColor)}/ffffff?text=Project+${index + 1}`}" alt="${project.title}" class="w-full h-48 object-cover" onerror="this.onerror=null;this.src='https://placehold.co/400x300/${getColorHex(config.primaryColor)}/ffffff?text=Project+${index + 1}';">
                <div class="p-6">
                    <h3 class="text-xl font-semibold mb-2 ${config.bodyText}">${project.title}</h3>
                    <p class="${config.bodyText.replace('text-', 'text-opacity-90 text-')} mb-4">${project.description}</p>
                    <a href="${project.projectLink}" target="_blank" rel="noopener noreferrer" class="text-${getColorClass(config.primaryColor)}-600 hover:underline">View Project &rarr;</a>
                </div>
            </div>
        `).join('');

        return `
            <!-- Portfolio Section -->
            <section id="portfolio" class="py-16 px-4 sm:px-6 lg:px-8 ${config.sectionBgLight} rounded-lg shadow-md mb-8">
                <div class="container mx-auto text-center">
                    <h2 class="text-3xl sm:text-4xl font-bold mb-12 ${config.bodyText}">Our Portfolio</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        ${portfolioItemsHtml}
                    </div>
            </div>
        </section>
    `;
    };

    // New: Generates the HTML for the Timeline section
    const getTimelineSection = (config) => {
        const timelineEventsHtml = config.timelineEvents.map((event, index) => `
            <div class="flex items-center mb-8 last:mb-0">
                <div class="w-1/4 text-right pr-8">
                    <h3 class="text-2xl font-bold ${config.bodyText}">${event.year}</h3>
                </div>
                <div class="w-3/4 flex items-center">
                    <div class="w-4 h-4 bg-${getColorClass(config.primaryColor)}-500 rounded-full flex-shrink-0 relative">
                        <div class="absolute w-0.5 bg-gray-300 h-full left-1/2 -translate-x-1/2 top-4 bottom-0"></div>
                    </div>
                    <div class="ml-8 p-4 ${config.sectionBgDark} rounded-lg shadow-md w-full">
                        <h4 class="text-xl font-semibold mb-2 ${config.bodyText}">${event.title}</h4>
                        <p class="${config.bodyText.replace('text-', 'text-opacity-90 text-')}">${event.description}</p>
                    </div>
                </div>
            </div>
        `).join('');

        return `
            <!-- Timeline Section -->
            <section id="timeline" class="py-16 px-4 sm:px-6 lg:px-8 ${config.sectionBgLight} rounded-lg shadow-md mb-8">
                <div class="container mx-auto text-center">
                    <h2 class="text-3xl sm:text-4xl font-bold mb-12 ${config.bodyText}">Our Journey</h2>
                    <div class="max-w-4xl mx-auto">
                        ${timelineEventsHtml}
                    </div>
                </div>
            </section>
        `;
    };


    // Generates the HTML for the Footer section
    const getFooter = (config) => {
        const socialLinksHtml = Object.keys(config.socialMedia)
            .filter(platform => config.socialMedia[platform]) // Only include links if a URL is provided
            .map(platform => `
                <a href="${config.socialMedia[platform]}" target="_blank" rel="noopener noreferrer" class="${config.footerText.replace('text-', 'text-opacity-70 text-')} hover:${config.footerText} transition duration-300 mx-2">
                    <span class="text-xl">${getSocialIcon(platform)}</span>
                </a>
            `).join('');

        return `
            <!-- Footer -->
            <footer class="${config.footerBg} ${config.footerText} py-8 px-4 sm:px-6 lg:px-8 mt-auto rounded-t-lg shadow-inner">
                <div class="container mx-auto text-center text-sm">
                    <p>${config.footerCopyright}</p>
                    <div class="flex justify-center space-x-4 mt-4">
                        <a href="#" class="${config.footerText.replace('text-', 'text-opacity-70 text-')} hover:${config.footerText} transition duration-300">Privacy Policy</a>
                        <span class="text-gray-500">|</span>
                        <a href="#" class="${config.footerText.replace('text-', 'text-opacity-70 text-')} hover:${config.footerText} transition duration-300">Terms of Service</a>
                    </div>
                    <div class="flex justify-center mt-4">
                        ${socialLinksHtml}
                    </div>
                </div>
            </footer>
        `;
    };

    // Helper function to get simple social media icons (emojis or text for simplicity)
    const getSocialIcon = (platform) => {
        switch (platform) {
            case 'facebook': return '📘'; // Facebook icon
            case 'twitter': return '🐦'; // Twitter icon
            case 'linkedin': return '💼'; // LinkedIn icon
            case 'instagram': return '📸'; // Instagram icon
            default: return '';
        }
    };


    // Function to map hex color to a Tailwind color class name (e.g., #3b82f6 -> 'blue')
    const getColorClass = (hexColor) => {
        // This function needs to return a string like 'blue', 'emerald', etc.
        // It's used for dynamic Tailwind classes like `bg-blue-600`.
        // The THEMES object now directly provides the full Tailwind classes.
        // However, some SVG colors still use hex, so this remains useful for those.
        switch (hexColor) {
            case '#3b82f6': return 'blue'; // blue-500
            case '#047857': return 'emerald'; // emerald-700
            case '#ef4444': return 'red'; // red-500
            case '#f59e0b': return 'amber'; // amber-500
            case '#6366f1': return 'indigo'; // indigo-500
            case '#4b5563': return 'gray'; // gray-600
            default: return 'blue';
        }
    };

    // Function to get the hex value for use in placeholder images
    const getColorHex = (hexColor) => {
        // Remove '#' and take the first 6 characters for a valid hex color
        return hexColor.replace('#', '').substring(0, 6);
    };

    // Function to generate the Google Font URL based on selected font family
    const getFontUrl = (font) => {
        switch (font) {
            case 'Roboto': return 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap';
            case 'Open Sans': return 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap';
            case 'Montserrat': return 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap';
            case 'Lato': return 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap';
            case 'Poppins': return 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap';
            default: return 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap'; // Default Inter
        }
    };

    // Function to get the Tailwind font class
    const getTailwindFontClass = (font) => {
        switch (font) {
            case 'Roboto': return 'font-roboto';
            case 'Open Sans': return 'font-open-sans';
            case 'Montserrat': return 'font-montserrat';
            case 'Lato': return 'font-lato';
            case 'Poppins': return 'font-poppins';
            default: return 'font-inter';
        }
    };

    // Generates CSS content (mostly placeholder as Tailwind is CDN based)
    const getGeneratedCss = (font) => `
/* Basic global styles and custom animations */
body {
    font-family: '${font}', sans-serif;
}
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
}
.animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards;
}
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }

/* Tailwind CSS classes are applied directly in HTML.
   To include them here, you would typically use a build process (e.g., PostCSS with Tailwind CLI).
   For this generator, consider the Tailwind CDN script in index.html as the primary CSS source. */
`;

    // Generates JS content
    const getGeneratedJs = (title) => `
// Simple JavaScript for any future interactivity.
// For example, could add smooth scrolling or form validation here.
document.addEventListener('DOMContentLoaded', () => {
    console.log('${title} website loaded!');
});
`;

    // --- Main HTML Generation Logic ---

    // Generates the full HTML document based on the current configuration
    const generateWebsiteHtml = (currentConfig) => {
        const { websiteTitle, heroHeading, heroSubheading, primaryColor, fontFamily, pages, sections, layoutStyle, contactInfo, socialMedia, images,
            headerBg, headerText, footerBg, footerText, bodyBg, bodyText, sectionBgLight, sectionBgDark, buttonBg, buttonHover, buttonText,
            featuresContent, testimonialsContent, ctaContent, footerCopyright, team,
            blogPosts, faqItems, portfolioItems, timelineEvents
        } = currentConfig;

        const colorClass = getColorClass(primaryColor);
        const fontUrl = getFontUrl(fontFamily);
        const tailwindFontClass = getTailwindFontClass(fontFamily);

        const customAnimationsCss = getGeneratedCss(fontFamily);
        const customJs = getGeneratedJs(websiteTitle);

        // Generate navigation links based on selected pages
        const navLinks = Object.keys(pages).filter(page => pages[page]).map(page => `
            <a href="#${page}" class="${headerText} hover:${headerText.replace('text-', 'text-opacity-80 text-')} transition duration-300 px-3 py-2 rounded-md hover:${headerBg.replace('bg-', 'bg-opacity-90 bg-')}">
                ${page.charAt(0).toUpperCase() + page.slice(1)}
            </a>
        `).join('');

        // Adjust header and body classes based on layoutStyle and theme properties
        let headerHtmlClass = `${headerBg} ${headerText} p-4 shadow-md rounded-b-lg mb-8`;
        let bodyHtmlClass = `${bodyBg} ${tailwindFontClass} ${bodyText} min-h-screen flex flex-col`;
        let mainContentWrapperClass = 'container mx-auto p-4 flex-grow';

        switch (layoutStyle) {
            case 'minimal':
                headerHtmlClass = `bg-white text-gray-800 p-4 shadow-sm mb-4 border-b border-gray-100`;
                bodyHtmlClass = `bg-white ${tailwindFontClass} text-gray-800 min-h-screen flex flex-col`;
                mainContentWrapperClass = 'container mx-auto max-w-4xl p-4 flex-grow'; // Narrower content for minimal
                break;
            case 'portfolio':
                headerHtmlClass = `bg-gray-900 text-white p-4 shadow-lg mb-8`;
                bodyHtmlClass = `bg-gray-50 ${tailwindFontClass} text-gray-800 min-h-screen flex flex-col`;
                mainContentWrapperClass = 'container mx-auto p-4 flex-grow';
                break;
            case 'blog':
                headerHtmlClass = `bg-gray-800 text-white p-4 shadow-md mb-8`;
                bodyHtmlClass = `bg-white ${tailwindFontClass} text-gray-800 min-h-screen flex flex-col`;
                mainContentWrapperClass = 'container mx-auto max-w-3xl p-4 flex-grow'; // Blog content usually narrower
                break;
            case 'modern':
            default:
                // Default to modern, already defined above using theme values
                break;
        }

        // Generate main content sections based on selections
        let mainContent = '';
        if (pages.home) {
            if (sections.hero) mainContent += getHeroSection(currentConfig);
            if (sections.features) mainContent += getFeaturesSection(currentConfig);
            if (sections.testimonials) mainContent += getTestimonialsSection(currentConfig);
            if (sections.gallery) mainContent += getGallerySection(currentConfig);
            if (sections.team) mainContent += getTeamSection(currentConfig); // Add Team section
            if (sections.blog) mainContent += getBlogSection(currentConfig); // Add Blog section
            if (sections.faq) mainContent += getFaqSection(currentConfig); // Add FAQ section
            if (sections.portfolio) mainContent += getPortfolioSection(currentConfig); // Add Portfolio section
            if (sections.timeline) mainContent += getTimelineSection(currentConfig); // Add Timeline section
            if (sections.cta) mainContent += getCtaSection(currentConfig);
            if (sections.contactForm && !pages.contact) mainContent += getContactPageContent(currentConfig); // Only add contact form if contact page isn't separate
        }
        if (pages.about && layoutStyle !== 'portfolio' && layoutStyle !== 'blog') { // If About is a separate page, add its content
            mainContent += `<section id="about" class="py-16 px-4 sm:px-6 lg:px-8 ${sectionBgLight} rounded-lg shadow-md mb-8">
                                <div class="container mx-auto">
                                    <h2 class="text-3xl sm:text-4xl font-bold mb-12 text-center ${bodyText}">About Us</h2>
                                    ${getAboutPageContent(currentConfig)}
                                </div>
                            </section>`;
        }
        if (pages.contact) { // Contact page content always includes contact info now
            mainContent += `<section id="contact" class="py-16 px-4 sm:px-6 lg:px-8 ${sectionBgLight} rounded-lg shadow-md mb-8">
                                <div class="container mx-auto">
                                    <h2 class="text-3xl sm:text-4xl font-bold mb-12 text-center ${bodyText}">Contact Us</h2>
                                    ${getContactPageContent(currentConfig)}
                                </div>
                            </section>`;
        }
        // Specific content for portfolio/blog layouts (these will now use theme colors where applicable)
        if (layoutStyle === 'portfolio' && pages.home) {
            mainContent = `
                ${getHeroSection(currentConfig)}
                ${sections.portfolio ? getPortfolioSection(currentConfig) : `
                    <section class="py-16 px-4 sm:px-6 lg:px-8 ${sectionBgLight} rounded-lg shadow-md mb-8">
                    <div class="container mx-auto text-center">
                            <h2 class="text-3xl sm:text-4xl font-bold mb-12 ${bodyText}">Our Portfolio</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <!-- Default Portfolio Item 1 if no custom ones -->
                                <div class="${sectionBgDark} rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300">
                                    <img src="${images.galleryImage1 || `https://placehold.co/400x300/${getColorHex(primaryColor)}/ffffff?text=Project+Alpha`}" alt="Project Alpha" class="w-full h-48 object-cover" onerror="this.onerror=null;this.src='https://placehold.co/400x300/${getColorHex(primaryColor)}/ffffff?text=Project+Alpha';">
                                <div class="p-6">
                                        <h3 class="text-xl font-semibold mb-2 ${bodyText}">Project Alpha</h3>
                                        <p class="${bodyText.replace('text-', 'text-opacity-90 text-')} mb-4">A stunning web design for a modern startup.</p>
                                        <a href="#" class="text-${getColorClass(primaryColor)}-600 hover:underline">View Project &rarr;</a>
                                </div>
                            </div>
                                <!-- Default Portfolio Item 2 if no custom ones -->
                                <div class="${sectionBgDark} rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300">
                                    <img src="${images.galleryImage2 || `https://placehold.co/400x300/${getColorHex(primaryColor)}/ffffff?text=Project+Beta`}" alt="Project Beta" class="w-full h-48 object-cover" onerror="this.onerror=null;this.src='https://placehold.co/400x300/${getColorHex(primaryColor)}/ffffff?text=Project+Beta';">
                                <div class="p-6">
                                        <h3 class="text-xl font-semibold mb-2 ${bodyText}">Project Beta</h3>
                                        <p class="${bodyText.replace('text-', 'text-opacity-90 text-')} mb-4">Mobile app development with a focus on UX.</p>
                                        <a href="#" class="text-${getColorClass(primaryColor)}-600 hover:underline">View Project &rarr;</a>
                                </div>
                            </div>
                                <!-- Default Portfolio Item 3 if no custom ones -->
                                <div class="${sectionBgDark} rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300">
                                    <img src="${images.galleryImage3 || `https://placehold.co/400x300/${getColorHex(primaryColor)}/ffffff?text=Project+Gamma`}" alt="Project Gamma" class="w-full h-48 object-cover" onerror="this.onerror=null;this.src='https://placehold.co/400x300/${getColorHex(primaryColor)}/ffffff?text=Project+Gamma';">
                                <div class="p-6">
                                        <h3 class="text-xl font-semibold mb-2 ${bodyText}">Project Gamma</h3>
                                        <p class="${bodyText.replace('text-', 'text-opacity-90 text-')} mb-4">Branding and identity design for a new company.</p>
                                        <a href="#" class="text-${getColorClass(primaryColor)}-600 hover:underline">View Project &rarr;</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                `}
                ${sections.testimonials ? getTestimonialsSection(currentConfig) : ''}
                ${sections.cta ? getCtaSection(currentConfig) : ''}
            `;
        } else if (layoutStyle === 'blog' && pages.home) {
            mainContent = `
                    ${getHeroSection(currentConfig)}
                    ${sections.blog ? getBlogSection(currentConfig) : `
                        <section class="py-16 px-4 sm:px-6 lg:px-8 ${sectionBgLight} rounded-lg shadow-md mb-8">
                    <div class="container mx-auto">
                                <h2 class="text-3xl sm:text-4xl font-bold mb-12 ${bodyText}">Latest Blog Posts</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <!-- Default Blog Post 1 if no custom ones -->
                                    <article class="${sectionBgDark} rounded-lg shadow-md overflow-hidden">
                                        <img src="${images.galleryImage1 || `https://placehold.co/600x400/${getColorHex(primaryColor)}/ffffff?text=Blog+Post+1`}" alt="Blog Post 1" class="w-full h-56 object-cover" onerror="this.onerror=null;this.src='https://placehold.co/600x400/${getColorHex(primaryColor)}/ffffff?text=Blog+Post+1';">
                                <div class="p-6">
                                            <h3 class="text-xl font-semibold mb-2 ${bodyText}">Understanding Responsive Design</h3>
                                            <p class="${bodyText.replace('text-', 'text-opacity-90 text-')} text-sm mb-4">By John Doe | June 26, 2025</p>
                                            <p class="${bodyText.replace('text-', 'text-opacity-90 text-')} mb-4">Learn the fundamentals of creating websites that adapt seamlessly to any screen size...</p>
                                            <a href="#" class="text-${getColorClass(primaryColor)}-600 hover:underline">Read More &rarr;</a>
                                </div>
                            </article>
                                    <!-- Default Blog Post 2 if no custom ones -->
                                    <article class="${sectionBgDark} rounded-lg shadow-md overflow-hidden">
                                        <img src="${images.galleryImage2 || `https://placehold.co/600x400/${getColorHex(primaryColor)}/ffffff?text=Blog+Post+2`}" alt="Blog Post 2" class="w-full h-56 object-cover" onerror="this.onerror=null;this.src='https://placehold.co/600x400/${getColorHex(primaryColor)}/ffffff?text=Blog+Post+2';">
                                <div class="p-6">
                                            <h3 class="text-xl font-semibold mb-2 ${bodyText}">The Power of Tailwind CSS</h3>
                                            <p class="${bodyText.replace('text-', 'text-opacity-90 text-')} text-sm mb-4">By Jane Smith | June 20, 2025</p>
                                            <p class="${bodyText.replace('text-', 'text-opacity-90 text-')} mb-4">Discover how utility-first CSS frameworks like Tailwind can supercharge your development workflow...</p>
                                            <a href="#" class="text-${getColorClass(primaryColor)}-600 hover:underline">Read More &rarr;</a>
                                </div>
                            </article>
                        </div>
                    </div>
                </section>
                    `}
                    ${sections.cta ? getCtaSection(currentConfig) : ''}
            `;
        }


        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${websiteTitle}</title>
                <!-- Tailwind CSS CDN -->
                <script src="https://cdn.tailwindcss.com"></script>
                <!-- Google Fonts -->
                <link href="${fontUrl}" rel="stylesheet">
                <style>
                    /* Custom styles for the chosen font */
                    body {
                        font-family: '${fontFamily}', sans-serif;
                    }
                    /* Custom animations */
                    ${customAnimationsCss}
                    /* Smooth scrolling for anchor links */
                    html {
                        scroll-behavior: smooth;
                    }
                    /* Apply the selected font family to all elements */
                    .${tailwindFontClass} * {
                        font-family: '${fontFamily}', sans-serif;
                    }
                </style>
                <script>
                    tailwind.config = {
                        theme: {
                            extend: {
                                colors: {
                                    ${colorClass}: {
                                        50: '${primaryColor}10',
                                        100: '${primaryColor}20',
                                        200: '${primaryColor}30',
                                        300: '${primaryColor}40',
                                        400: '${primaryColor}50',
                                        500: '${primaryColor}',
                                        600: '${primaryColor}d0',
                                        700: '${primaryColor}a0',
                                        800: '${primaryColor}80',
                                        900: '${primaryColor}60',
                                    }
                                },
                                fontFamily: {
                                    inter: ['Inter', 'sans-serif'],
                                    roboto: ['Roboto', 'sans-serif'],
                                    'open-sans': ['Open Sans', 'sans-serif'],
                                    montserrat: ['Montserrat', 'sans-serif'],
                                    lato: ['Lato', 'sans-serif'],
                                    poppins: ['Poppins', 'sans-serif'],
                                }
                            }
                        }
                    }
                </script>
            </head>
                <body class="${bodyHtmlClass}">
                <!-- Header -->
                    <header class="${headerHtmlClass}">
                    <div class="container mx-auto flex justify-between items-center flex-wrap">
                        <h1 class="text-2xl font-bold">
                                <a href="#home" class="hover:${headerText.replace('text-', 'text-opacity-80 text-')} transition duration-300">${websiteTitle}</a>
                        </h1>
                        <nav class="mt-2 md:mt-0">
                            ${navLinks}
                        </nav>
                    </div>
                </header>

                <main class="${mainContentWrapperClass}">
                    ${mainContent}
                </main>

                    ${getFooter(currentConfig)}

                <script>
                    ${customJs}
                </script>
            </body>
            </html>
        `;
    };

    // --- Handlers for Config Changes ---

    // Generic handler to update any part of the config state
    const handleConfigChange = (field, value) => {
        setConfig(prevConfig => {
            // Handle nested objects (like pages, sections, contactInfo, socialMedia, images, ctaContent)
            if (typeof prevConfig[field] === 'object' && prevConfig[field] !== null && !Array.isArray(prevConfig[field])) {
                return {
                    ...prevConfig,
                    [field]: {
                        ...prevConfig[field],
                        ...value // Value here would be an object like { subField: newValue }
                    }
                };
            }
            // For simple fields (string, boolean, number) or arrays
            return {
                ...prevConfig,
                [field]: value
            };
        });
    };

    // Specific handlers for sub-objects/arrays
    const handlePageChange = (event) => {
        handleConfigChange('pages', { [event.target.name]: event.target.checked });
    };

    const handleSectionChange = (event) => {
        handleConfigChange('sections', { [event.target.name]: event.target.checked });
    };

    const handleContactInfoChange = (e) => {
        handleConfigChange('contactInfo', { [e.target.name]: e.target.value });
    };

    const handleSocialMediaChange = (e) => {
        handleConfigChange('socialMedia', { [e.target.name]: e.target.value });
    };

    // Updated handleImageChange to support file uploads
    const handleImageChange = (e) => {
        const { name, value, files, type } = e.target;
        if (type === 'file' && files && files[0]) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (uploadEvent) => {
                handleConfigChange('images', { [name]: uploadEvent.target.result });
            };
            reader.onerror = () => {
                showNotification('Error reading image file!', 'error');
                handleConfigChange('images', { [name]: '' }); // Clear the input on error
            };
            reader.readAsDataURL(file);
        } else {
            handleConfigChange('images', { [name]: value }); // For URL inputs
        }
    };

    const handleFeatureContentChange = (index, field, value) => {
        setConfig(prevConfig => {
            const newFeaturesContent = [...prevConfig.featuresContent];
            newFeaturesContent[index] = { ...newFeaturesContent[index], [field]: value };
            return { ...prevConfig, featuresContent: newFeaturesContent };
        });
    };

    // Updated handleTestimonialContentChange to support file uploads for image
    const handleTestimonialContentChange = (index, field, value, file) => {
        setConfig(prevConfig => {
            const newTestimonialsContent = [...prevConfig.testimonialsContent];
            if (field === 'image' && file) {
                const reader = new FileReader();
                reader.onload = (uploadEvent) => {
                    newTestimonialsContent[index] = { ...newTestimonialsContent[index], [field]: uploadEvent.target.result };
                    setConfig({ ...prevConfig, testimonialsContent: newTestimonialsContent });
                };
                reader.onerror = () => {
                    showNotification('Error reading testimonial image file!', 'error');
                    newTestimonialsContent[index] = { ...newTestimonialsContent[index], [field]: '' };
                    setConfig({ ...prevConfig, testimonialsContent: newTestimonialsContent });
                };
                reader.readAsDataURL(file);
            } else {
                newTestimonialsContent[index] = { ...newTestimonialsContent[index], [field]: value };
                return { ...prevConfig, testimonialsContent: newTestimonialsContent };
            }
            return prevConfig; // Return prevConfig until file reading is complete
        });
    };


    const handleCtaContentChange = (field, value) => {
        handleConfigChange('ctaContent', { [field]: value });
    };

    // Updated handleTeamMemberChange to support file uploads for image
    const handleTeamMemberChange = (index, field, value, file) => {
        setConfig(prevConfig => {
            const newTeam = [...prevConfig.team];
            if (field === 'imageUrl' && file) {
                const reader = new FileReader();
                reader.onload = (uploadEvent) => {
                    newTeam[index] = { ...newTeam[index], [field]: uploadEvent.target.result };
                    setConfig({ ...prevConfig, team: newTeam });
                };
                reader.onerror = () => {
                    showNotification('Error reading team member image file!', 'error');
                    newTeam[index] = { ...newTeam[index], [field]: '' };
                    setConfig({ ...prevConfig, team: newTeam });
                };
                reader.readAsDataURL(file);
            } else {
                newTeam[index] = { ...newTeam[index], [field]: value };
                return { ...prevConfig, team: newTeam };
            }
            return prevConfig; // Return prevConfig until file reading is complete
        });
    };

    const handleAddTeamMember = () => {
        setConfig(prevConfig => ({
            ...prevConfig,
            team: [...prevConfig.team, { name: '', imageUrl: '' }]
        }));
    };

    const handleRemoveTeamMember = (indexToRemove) => {
        setConfig(prevConfig => ({
            ...prevConfig,
            team: prevConfig.team.filter((_, index) => index !== indexToRemove)
        }));
        showNotification('Team member removed!', 'info');
    };

    // New: Blog Post handlers
    const handleBlogPostChange = (index, field, value, file) => {
        setConfig(prevConfig => {
            const newBlogPosts = [...prevConfig.blogPosts];
            if (field === 'imageUrl' && file) {
                const reader = new FileReader();
                reader.onload = (uploadEvent) => {
                    newBlogPosts[index] = { ...newBlogPosts[index], [field]: uploadEvent.target.result };
                    setConfig({ ...prevConfig, blogPosts: newBlogPosts });
                };
                reader.onerror = () => {
                    showNotification('Error reading blog post image file!', 'error');
                    newBlogPosts[index] = { ...newBlogPosts[index], [field]: '' };
                    setConfig({ ...prevConfig, blogPosts: newBlogPosts });
                };
                reader.readAsDataURL(file);
            } else {
                newBlogPosts[index] = { ...newBlogPosts[index], [field]: value };
                return { ...prevConfig, blogPosts: newBlogPosts };
            }
            return prevConfig;
        });
    };

    const handleAddBlogPost = () => {
        setConfig(prevConfig => ({
            ...prevConfig,
            blogPosts: [...prevConfig.blogPosts, { title: '', content: '', imageUrl: '' }]
        }));
    };

    const handleRemoveBlogPost = (indexToRemove) => {
        setConfig(prevConfig => ({
            ...prevConfig,
            blogPosts: prevConfig.blogPosts.filter((_, index) => index !== indexToRemove)
        }));
        showNotification('Blog post removed!', 'info');
    };

    // New: FAQ Item handlers
    const handleFaqItemChange = (index, field, value) => {
        setConfig(prevConfig => {
            const newFaqItems = [...prevConfig.faqItems];
            newFaqItems[index] = { ...newFaqItems[index], [field]: value };
            return { ...prevConfig, faqItems: newFaqItems };
        });
    };

    const handleAddFaqItem = () => {
        setConfig(prevConfig => ({
            ...prevConfig,
            faqItems: [...prevConfig.faqItems, { question: '', answer: '' }]
        }));
    };

    const handleRemoveFaqItem = (indexToRemove) => {
        setConfig(prevConfig => ({
            ...prevConfig,
            faqItems: prevConfig.faqItems.filter((_, index) => index !== indexToRemove)
        }));
        showNotification('FAQ item removed!', 'info');
    };

    // New: Portfolio Item handlers
    const handlePortfolioItemChange = (index, field, value, file) => {
        setConfig(prevConfig => {
            const newPortfolioItems = [...prevConfig.portfolioItems];
            if (field === 'imageUrl' && file) {
                const reader = new FileReader();
                reader.onload = (uploadEvent) => {
                    newPortfolioItems[index] = { ...newPortfolioItems[index], [field]: uploadEvent.target.result };
                    setConfig({ ...prevConfig, portfolioItems: newPortfolioItems });
                };
                reader.onerror = () => {
                    showNotification('Error reading project image file!', 'error');
                    newPortfolioItems[index] = { ...newPortfolioItems[index], [field]: '' };
                    setConfig({ ...prevConfig, portfolioItems: newPortfolioItems });
                };
                reader.readAsDataURL(file);
            } else {
                newPortfolioItems[index] = { ...newPortfolioItems[index], [field]: value };
                return { ...prevConfig, portfolioItems: newPortfolioItems };
            }
            return prevConfig;
        });
    };

    const handleAddPortfolioItem = () => {
        setConfig(prevConfig => ({
            ...prevConfig,
            portfolioItems: [...prevConfig.portfolioItems, { title: '', description: '', imageUrl: '', projectLink: '#' }]
        }));
    };

    const handleRemovePortfolioItem = (indexToRemove) => {
        setConfig(prevConfig => ({
            ...prevConfig,
            portfolioItems: prevConfig.portfolioItems.filter((_, index) => index !== indexToRemove)
        }));
        showNotification('Portfolio item removed!', 'info');
    };

    // New: Timeline Event handlers
    const handleTimelineEventChange = (index, field, value) => {
        setConfig(prevConfig => {
            const newTimelineEvents = [...prevConfig.timelineEvents];
            newTimelineEvents[index] = { ...newTimelineEvents[index], [field]: value };
            return { ...prevConfig, timelineEvents: newTimelineEvents };
        });
    };

    const handleAddTimelineEvent = () => {
        setConfig(prevConfig => ({
            ...prevConfig,
            timelineEvents: [...prevConfig.timelineEvents, { year: '', title: '', description: '' }]
        }));
    };

    const handleRemoveTimelineEvent = (indexToRemove) => {
        setConfig(prevConfig => ({
            ...prevConfig,
            timelineEvents: prevConfig.timelineEvents.filter((_, index) => index !== indexToRemove)
        }));
        showNotification('Timeline event removed!', 'info');
    };


    // Handler for theme selection
    const handleThemeSelect = (e) => {
        const selectedThemeName = e.target.value;
        const selectedTheme = THEMES[selectedThemeName];
        if (selectedTheme) {
            setConfig(prevConfig => ({
                ...prevConfig,
                themeName: selectedThemeName,
                primaryColor: selectedTheme.primaryColor,
                fontFamily: selectedTheme.fontFamily,
                layoutStyle: selectedTheme.layoutStyle,
                headerBg: selectedTheme.headerBg,
                headerText: selectedTheme.headerText,
                footerBg: selectedTheme.footerBg,
                footerText: selectedTheme.footerText,
                bodyBg: selectedTheme.bodyBg,
                bodyText: selectedTheme.bodyText,
                sectionBgLight: selectedTheme.sectionBgLight,
                sectionBgDark: selectedTheme.sectionBgDark,
                buttonBg: selectedTheme.buttonBg,
                buttonHover: selectedTheme.buttonHover,
                buttonText: selectedTheme.buttonText,
            }));
        }
    };

    // Function to reset all inputs to their default values
    const handleReset = () => {
        setConfig(DEFAULT_CONFIG);
        setLeftPanelWidth(33.33); // Reset panel width as well
        showNotification('All settings reset to default!', 'info');
    };

    // --- Download and Copy Functions ---

    const handleDownload = () => {
        const blob = new Blob([generatedHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'index.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showNotification('HTML file downloaded!', 'success');
    };

    const copyToClipboard = (text, message) => {
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = text;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextArea);
        showNotification(message, 'success');
    };

    const handleCopyHtml = () => copyToClipboard(generatedHtml, 'HTML code copied to clipboard!');
    const handleCopyCss = () => copyToClipboard(getGeneratedCss(config.fontFamily), 'CSS placeholder copied to clipboard!'); // ensure it uses current config
    const handleCopyJs = () => copyToClipboard(getGeneratedJs(config.websiteTitle), 'JavaScript code copied to clipboard!'); // ensure it uses current config


    const codeToDisplay = {
        html: generatedHtml,
        css: generatedCss,
        js: generatedJs,
    }[currentCodeView];

    // Helper for collapsible section headers
    const SectionHeader = ({ title, sectionName, isOpen, toggle }) => (
        <div
            className="flex justify-between items-center px-4 py-3 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 transition-colors shadow-sm mb-4"
            onClick={() => toggle(sectionName)}
        >
            <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
            <svg
                className={`w-5 h-5 text-gray-600 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
        </div>
    );

    const [sidebarPercent, setSidebarPercent] = useState(30); // 30% by default
    const minSidebarPercent = 15;
    const maxSidebarPercent = 60;
    const isDragging = useRef(false);

    // Drag logic for resizer
    function startDragging(e) {
        isDragging.current = true;
        document.body.style.cursor = 'col-resize';
    }

    useEffect(() => {
        function handleMouseMove(e) {
            if (!isDragging.current) return;
            const totalWidth = window.innerWidth;
            let newPercent = (e.clientX / totalWidth) * 100;
            newPercent = Math.max(minSidebarPercent, Math.min(maxSidebarPercent, newPercent));
            setSidebarPercent(newPercent);
        }
        function handleMouseUp() {
            isDragging.current = false;
            document.body.style.cursor = '';
        }
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);


    const getAboutPageContent = (config) => `
    <!-- About Section -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 bg-white rounded-lg shadow-md mb-8">
        <div class="container mx-auto flex flex-col md:flex-row items-center gap-10">
        <div class="md:w-1/2">
            ${config.aboutInfo.image ? `<img src="${config.aboutInfo.image}" alt="About Us" class="rounded-lg shadow-xl object-cover w-full h-auto">` : ''}
        </div>
        <div class="md:w-1/2 text-center md:text-left">
            <h2 class="text-3xl sm:text-4xl font-bold mb-6 text-gray-800">${config.aboutInfo.title}</h2>
            <p class="text-gray-700 leading-relaxed mb-4">
            ${config.aboutInfo.description}
            </p>
        </div>
        </div>
    </section>
    `;

    return (
        <div className="flex w-screen h-screen min-w-0 bg-gray-50 font-inter text-gray-800">
            <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: '', type: '' })} />

            {/* Left Panel: Customization Controls */}
            <div
                className="p-6 bg-white shadow-xl overflow-y-auto border-r border-gray-200 rounded-lg md:rounded-l-lg md:rounded-r-none"
                style={{
                    width: `${sidebarPercent}%`,
                    minWidth: `${minSidebarPercent}%`,
                    maxWidth: `${maxSidebarPercent}%`,
                    transition: 'width 0.1s',
                    flexShrink: 0
                }}
            >
                <h2 className={`text-3xl font-bold mb-8 text-center ${headerBg.replace('bg-', 'text-')}`}>Website Generator</h2>

                {/* Theme Selector */}
                <SectionHeader
                    title="Choose Theme"
                    sectionName="themeSelector"
                    isOpen={openSections.themeSelector}
                    toggle={toggleSection}
                />
                {openSections.themeSelector && (
                    <div className="mb-8 p-4 bg-gray-50 rounded-lg shadow-inner animate-fade-in-up">
                        <select
                            id="themeSelect"
                            className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-${getColorClass(primaryColor)}-500 focus:border-transparent transition-colors shadow-sm`}
                            value={themeName}
                            onChange={handleThemeSelect}
                        >
                            {Object.keys(THEMES).map(themeKey => (
                                <option key={themeKey} value={themeKey}>
                                    {themeKey.charAt(0).toUpperCase() + themeKey.slice(1).replace('-', ' ')}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Basic Info & Hero Content */}
                <SectionHeader
                    title="Basic Info & Hero"
                    sectionName="basicInfoHero"
                    isOpen={openSections.basicInfoHero}
                    toggle={toggleSection}
                />
                {openSections.basicInfoHero && (
                    <div className="mb-8 p-4 bg-gray-50 rounded-lg shadow-inner animate-fade-in-up">
                        <div className="mb-4">
                            <label htmlFor="websiteTitle" className="block text-sm font-medium text-gray-600 mb-1">Website Title</label>
                            <input
                                type="text"
                                id="websiteTitle"
                                className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-${getColorClass(primaryColor)}-500 focus:border-transparent transition-colors shadow-sm`}
                                value={websiteTitle}
                                onChange={(e) => handleConfigChange('websiteTitle', e.target.value)}
                                placeholder="Your Website Title"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="websiteDescription" className="block text-sm font-medium text-gray-600 mb-1">Website Description</label>
                            <textarea
                                id="websiteDescription"
                                rows="3"
                                className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-${getColorClass(primaryColor)}-500 focus:border-transparent transition-colors shadow-sm resize-y`}
                                value={websiteDescription}
                                onChange={(e) => handleConfigChange('websiteDescription', e.target.value)}
                                placeholder="A short description of your website"
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="heroHeading" className="block text-sm font-medium text-gray-600 mb-1">Hero Heading</label>
                            <input
                                type="text"
                                id="heroHeading"
                                className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-${getColorClass(primaryColor)}-500 focus:border-transparent transition-colors shadow-sm`}
                                value={heroHeading}
                                onChange={(e) => handleConfigChange('heroHeading', e.target.value)}
                                placeholder="Main title for your hero section"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="heroSubheading" className="block text-sm font-medium text-gray-600 mb-1">Hero Subheading</label>
                            <textarea
                                id="heroSubheading"
                                rows="2"
                                className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-${getColorClass(primaryColor)}-500 focus:border-transparent transition-colors shadow-sm resize-y`}
                                value={heroSubheading}
                                onChange={(e) => handleConfigChange('heroSubheading', e.target.value)}
                                placeholder="Descriptive text for your hero section"
                            ></textarea>
                        </div>
                    </div>
                )}
                {/* About Information */}
                <SectionHeader
                    title="About Section"
                    sectionName="aboutSection"
                    isOpen={openSections.aboutSection}
                    toggle={toggleSection}
                />
                {openSections.aboutSection && (
                    <div className="mb-8 p-4 bg-gray-50 rounded-lg shadow-inner animate-fade-in-up">
                        <div className="mb-4">
                            <label htmlFor="aboutTitle" className="block text-sm font-medium text-gray-600 mb-1">About Title</label>
                            <input
                                type="text"
                                id="aboutTitle"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors shadow-sm"
                                value={config.aboutInfo.title}
                                onChange={e => handleConfigChange('aboutInfo', { title: e.target.value })}
                                placeholder="About section title"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="aboutDescription" className="block text-sm font-medium text-gray-600 mb-1">About Description</label>
                            <textarea
                                id="aboutDescription"
                                rows="3"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors shadow-sm resize-y"
                                value={config.aboutInfo.description}
                                onChange={e => handleConfigChange('aboutInfo', { description: e.target.value })}
                                placeholder="About section description"
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="aboutImage" className="block text-sm font-medium text-gray-600 mb-1">About Image</label>
                            <input
                                type="file"
                                id="aboutImage"
                                accept="image/*"
                                onChange={e => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onload = evt => handleConfigChange('aboutInfo', { image: evt.target.result });
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                            {config.aboutInfo.image && (
                                <img src={config.aboutInfo.image} alt="About Preview" className="mt-2 rounded shadow w-full max-h-40 object-contain" />
                            )}
                        </div>
                    </div>
                )}

                {/* Contact Information */}
                <SectionHeader
                    title="Contact Information"
                    sectionName="contactInfo"
                    isOpen={openSections.contactInfo}
                    toggle={toggleSection}
                />
                {openSections.contactInfo && (
                    <div className="mb-8 p-4 bg-gray-50 rounded-lg shadow-inner animate-fade-in-up">
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-${getColorClass(primaryColor)}-500 focus:border-transparent transition-colors shadow-sm`}
                                value={contactInfo.email}
                                onChange={handleContactInfoChange}
                                placeholder="your.email@example.com"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-${getColorClass(primaryColor)}-500 focus:border-transparent transition-colors shadow-sm`}
                                value={contactInfo.phone}
                                onChange={handleContactInfoChange}
                                placeholder="+1 234 567 8900"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="address" className="block text-sm font-medium text-gray-600 mb-1">Address</label>
                            <textarea
                                id="address"
                                name="address"
                                rows="2"
                                className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-${getColorClass(primaryColor)}-500 focus:border-transparent transition-colors shadow-sm resize-y`}
                                value={contactInfo.address}
                                onChange={handleContactInfoChange}
                                placeholder="123 Main St, City, Country"
                            ></textarea>
                        </div>
                    </div>
                )}

                {/* Social Media Links */}
                <SectionHeader
                    title="Social Media Links"
                    sectionName="socialMedia"
                    isOpen={openSections.socialMedia}
                    toggle={toggleSection}
                />
                {openSections.socialMedia && (
                    <div className="mb-8 p-4 bg-gray-50 rounded-lg shadow-inner animate-fade-in-up">
                        {Object.keys(socialMedia).map((platform) => (
                            <div className="mb-4" key={platform}>
                                <label htmlFor={platform} className="block text-sm font-medium text-gray-600 mb-1">{platform.charAt(0).toUpperCase() + platform.slice(1)} URL</label>
                                <input
                                    type="url"
                                    id={platform}
                                    name={platform}
                                    className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-${getColorClass(primaryColor)}-500 focus:border-transparent transition-colors shadow-sm`}
                                    value={socialMedia[platform]}
                                    onChange={handleSocialMediaChange}
                                    placeholder={`https://${platform}.com/yourprofile`}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Image Uploads / URLs */}
                <SectionHeader
                    title="Image Uploads / URLs"
                    sectionName="imageUrls"
                    isOpen={openSections.imageUrls}
                    toggle={toggleSection}
                />
                {openSections.imageUrls && (
                    <div className="mb-8 p-4 bg-gray-50 rounded-lg shadow-inner animate-fade-in-up">
                        <div className="mb-4">
                            <label htmlFor="aboutPage" className="block text-sm font-medium text-gray-600 mb-1">About Page Image (Upload or URL)</label>
                            <input
                                type="file"
                                id="aboutPageFile"
                                name="aboutPage"
                                accept="image/*"
                                className="w-full text-gray-700 bg-white border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer mb-2"
                                onChange={handleImageChange}
                            />
                            <input
                                type="url"
                                id="aboutPageUrl"
                                name="aboutPage"
                                className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-${getColorClass(primaryColor)}-500 focus:border-transparent transition-colors shadow-sm`}
                                value={images.aboutPage.startsWith('data:image/') ? '' : images.aboutPage} // Clear URL if base64 is set
                                onChange={handleImageChange}
                                placeholder="Or enter image URL (e.g., https://example.com/about.jpg)"
                            />
                            {images.aboutPage && <p className="text-xs text-gray-500 mt-1">Current: {images.aboutPage.substring(0, 50)}...</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600 mb-2">Gallery Images (Upload or URL, up to 4)</label>
                            {[1, 2, 3, 4].map((num) => (
                                <div key={`galleryImage${num}`} className="mb-3 border-b border-gray-200 pb-3 last:border-b-0 last:pb-0">
                                    <label htmlFor={`galleryImage${num}File`} className="block text-sm font-medium text-gray-600 mb-1">Gallery Image {num}</label>
                                    <input
                                        type="file"
                                        id={`galleryImage${num}File`}
                                        name={`galleryImage${num}`}
                                        accept="image/*"
                                        className="w-full text-gray-700 bg-white border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer mb-2"
                                        onChange={handleImageChange}
                                    />
                                    <input
                                        type="url"
                                        id={`galleryImage${num}Url`}
                                        name={`galleryImage${num}`}
                                        className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-${getColorClass(primaryColor)}-500 focus:border-transparent transition-colors shadow-sm`}
                                        value={images[`galleryImage${num}`].startsWith('data:image/') ? '' : images[`galleryImage${num}`]} // Clear URL if base64 is set
                                        onChange={handleImageChange}
                                        placeholder={`Or enter image URL for gallery image ${num}`}
                                    />
                                    {images[`galleryImage${num}`] && <p className="text-xs text-gray-500 mt-1">Current: {images[`galleryImage${num}`].substring(0, 50)}...</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Features Content */}
                <SectionHeader
                    title="Features Content"
                    sectionName="featuresContent"
                    isOpen={openSections.featuresContent}
                    toggle={toggleSection}
                />
                {openSections.featuresContent && (
                    <div className="mb-8 p-4 bg-gray-50 rounded-lg shadow-inner animate-fade-in-up">
                        {featuresContent.map((feature, index) => (
                            <div key={index} className="mb-4 border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                                <label htmlFor={`featureHeading${index}`} className="block text-sm font-medium text-gray-600 mb-1">Feature {index + 1} Heading</label>
                                <input
                                    type="text"
                                    id={`featureHeading${index}`}
                                    className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-${getColorClass(primaryColor)}-500 focus:border-transparent transition-colors shadow-sm mb-2`}
                                    value={feature.heading}
                                    onChange={(e) => handleFeatureContentChange(index, 'heading', e.target.value)}
                                    placeholder={`Heading for feature ${index + 1}`}
                                />
                                <label htmlFor={`featureDescription${index}`} className="block text-sm font-medium text-gray-600 mb-1">Feature {index + 1} Description</label>
                                <textarea
                                    id={`featureDescription${index}`}
                                    rows="2"
                                    className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-${getColorClass(primaryColor)}-500 focus:border-transparent transition-colors shadow-sm resize-y`}
                                    value={feature.description}
                                    onChange={(e) => handleFeatureContentChange(index, 'description', e.target.value)}
                                    placeholder={`Description for feature ${index + 1}`}
                                ></textarea>
                            </div>
                        ))}
                    </div>
                )}

                {/* Testimonials Content */}
                <SectionHeader
                    title="Testimonials Content"
                    sectionName="testimonialsContent"
                    isOpen={openSections.testimonialsContent}
                    toggle={toggleSection}
                />
                {openSections.testimonialsContent && (
                    <div className="mb-8 p-4 bg-gray-50 rounded-lg shadow-inner animate-fade-in-up">
                        {testimonialsContent.map((testimonial, index) => (
                            <div key={index} className="mb-4 border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                                <label htmlFor={`testimonialQuote${index}`} className="block text-sm font-medium text-gray-600 mb-1">Testimonial {index + 1} Quote</label>
                                <textarea
                                    id={`testimonialQuote${index}`}
                                    rows="3"
                                    className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-${getColorClass(primaryColor)}-500 focus:border-transparent transition-colors shadow-sm mb-2 resize-y`}
                                    value={testimonial.quote}
                                    onChange={(e) => handleTestimonialContentChange(index, 'quote', e.target.value)}
                                    placeholder={`Quote for testimonial ${index + 1}`}
                                ></textarea>
                                <label htmlFor={`testimonialName${index}`} className="block text-sm font-medium text-gray-600 mb-1">Testimonial {index + 1} Name</label>
                                <input
                                    type="text"
                                    id={`testimonialName${index}`}
                                    className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-${getColorClass(primaryColor)}-500 focus:border-transparent transition-colors shadow-sm mb-2`}
                                    value={testimonial.name}
                                    onChange={(e) => handleTestimonialContentChange(index, 'name', e.target.value)}
                                    placeholder={`Name for testimonial ${index + 1}`}
                                />
                                <label htmlFor={`testimonialTitle${index}`} className="block text-sm font-medium text-gray-600 mb-1">Testimonial {index + 1} Title</label>
                                <input
                                    type="text"
                                    id={`testimonialTitle${index}`}
                                    className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-${getColorClass(primaryColor)}-500 focus:border-transparent transition-colors shadow-sm mb-2`}
                                    value={testimonial.title}
                                    onChange={(e) => handleTestimonialContentChange(index, 'title', e.target.value)}
                                    placeholder={`Title for testimonial ${index + 1}`}
                                />
                                <label htmlFor={`testimonialImage${index}File`} className="block text-sm font-medium text-gray-600 mb-1">Testimonial {index + 1} Image (Upload or URL)</label>
                                <input
                                    type="file"
                                    id={`testimonialImage${index}File`}
                                    accept="image/*"
                                    className="w-full text-gray-700 bg-white border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer mb-2"
                                    onChange={(e) => handleTestimonialContentChange(index, 'image', null, e.target.files[0])}
                                />
                                <input
                                    type="url"
                                    id={`testimonialImage${index}Url`}
                                    className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-${getColorClass(primaryColor)}-500 focus:border-transparent transition-colors shadow-sm`}
                                    value={testimonialsContent[index].image.startsWith('data:image/') ? '' : testimonialsContent[index].image} // Clear URL if base64 is set
                                    onChange={(e) => handleTestimonialContentChange(index, 'image', e.target.value)}
                                    placeholder={`Or enter image URL for testimonial ${index + 1}`}
                                />
                                {testimonialsContent[index].image && <p className="text-xs text-gray-500 mt-1">Current: {testimonialsContent[index].image.substring(0, 50)}...</p>}
                            </div>
                        ))}
                    </div>
                )}

                {/* Call to Action (CTA) Content */}
                <SectionHeader
                    title="Call to Action (CTA) Content"
                    sectionName="ctaContent"
                    isOpen={openSections.ctaContent}
                    toggle={toggleSection}
                />
                {openSections.ctaContent && (
                    <div className="mb-8 p-4 bg-gray-50 rounded-lg shadow-inner animate-fade-in-up">
                        <div className="mb-4">
                            <label htmlFor="ctaHeading" className="block text-sm font-medium text-gray-600 mb-1">CTA Heading</label>
                            <input
                                type="text"
                                id="ctaHeading"
                                className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-${getColorClass(primaryColor)}-500 focus:border-transparent transition-colors shadow-sm mb-2`}
                                value={ctaContent.heading}
                                onChange={(e) => handleCtaContentChange('heading', e.target.value)}
                                placeholder="Heading for Call to Action"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="ctaSubheading" className="block text-sm font-medium text-gray-600 mb-1">CTA Subheading</label>
                            <textarea
                                id="ctaSubheading"
                                rows="2"
                                className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-${getColorClass(primaryColor)}-500 focus:border-transparent transition-colors shadow-sm resize-y`}
                                value={ctaContent.subheading}
                                onChange={(e) => handleCtaContentChange('subheading', e.target.value)}
                                placeholder="Subheading for Call to Action"
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="ctaButtonText" className="block text-sm font-medium text-gray-600 mb-1">CTA Button Text</label>
                            <input
                                type="text"
                                id="ctaButtonText"
                                className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-${getColorClass(primaryColor)}-500 focus:border-transparent transition-colors shadow-sm`}
                                value={ctaContent.buttonText}
                                onChange={(e) => handleCtaContentChange('buttonText', e.target.value)}
                                placeholder="Button text for Call to Action"
                            />
                        </div>
                    </div>
                )}

                {/* Team Section */}
                <SectionHeader
                    title="Team Members"
                    sectionName="teamSection"
                    isOpen={openSections.teamSection}
                    toggle={toggleSection}
                />
                {openSections.teamSection && (
                    <div className="mb-8 p-4 bg-gray-50 rounded-lg shadow-inner animate-fade-in-up">
                        {team.map((member, index) => (
                            <div key={index} className="mb-4 border-b border-gray-200 pb-4 last:border-b-0 last:pb-0 flex flex-col md:flex-row items-center md:space-x-4">
                                <div className="flex-grow w-full md:w-auto">
                                    <label htmlFor={`teamName${index}`} className="block text-sm font-medium text-gray-600 mb-1">Member {index + 1} Name</label>
                                    <input
                                        type="text"
                                        id={`teamName${index}`}
                                        className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-${getColorClass(primaryColor)}-500 focus:border-transparent transition-colors shadow-sm mb-2`}
                                        value={member.name}
                                        onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
                                        placeholder={`Name of member ${index + 1}`}
                                    />
                                    <label htmlFor={`teamImage${index}File`} className="block text-sm font-medium text-gray-600 mb-1">Member {index + 1} Image (Upload or URL)</label>
                                    <input
                                        type="file"
                                        id={`teamImage${index}File`}
                                        accept="image/*"
                                        className="w-full text-gray-700 bg-white border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer mb-2"
                                        onChange={(e) => handleTeamMemberChange(index, 'imageUrl', null, e.target.files[0])}
                                    />
                                    <input
                                        type="url"
                                        id={`teamImage${index}Url`}
                                        className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-${getColorClass(primaryColor)}-500 focus:border-transparent transition-colors shadow-sm`}
                                        value={member.imageUrl.startsWith('data:image/') ? '' : member.imageUrl} // Clear URL if base64 is set
                                        onChange={(e) => handleTeamMemberChange(index, 'imageUrl', e.target.value)}
                                        placeholder={`Or enter image URL for member ${index + 1}`}
                                    />
                                    {member.imageUrl && <p className="text-xs text-gray-500 mt-1">Current: {member.imageUrl.substring(0, 50)}...</p>}
                                </div>
                                {team.length > 1 && ( // Only show remove button if more than one member
                                    <button
                                        onClick={() => handleRemoveTeamMember(index)}
                                        className="mt-4 md:mt-0 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors self-end md:self-center"
                                        title="Remove team member"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            onClick={handleAddTeamMember}
                            className={`w-full mt-4 ${buttonBg} ${buttonText} font-semibold py-3 px-6 rounded-full shadow-lg ${buttonHover} transition duration-300 ease-in-out transform hover:scale-105`}
                        >
                            Add Team Member
                        </button>
                    </div>
                )}

                {/* Blog Section */}
                <SectionHeader
                    title="Blog Posts"
                    sectionName="blogSection"
                    isOpen={openSections.blogSection}
                    toggle={toggleSection}
                />
                {openSections.blogSection && (
                    <div className="mb-8 p-4 bg-gray-50 rounded-lg shadow-inner animate-fade-in-up">
                        {blogPosts.map((post, index) => (
                            <div key={index} className="mb-4 border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                                <label htmlFor={`blogTitle${index}`} className="block text-sm font-medium text-gray-600 mb-1">Blog Post {index + 1} Title</label>
                                <input
                                    type="text"
                                    id={`blogTitle${index}`}
                                    className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-${getColorClass(primaryColor)}-500 focus:border-transparent transition-colors shadow-sm mb-2`}
                                    value={post.title}
                                    onChange={(e) => handleBlogPostChange(index, 'title', e.target.value)}
                                    placeholder={`Title for blog post ${index + 1}`}
                                />
                                <label htmlFor={`blogContent${index}`} className="block text-sm font-medium text-gray-600 mb-1">Blog Post {index + 1} Content</label>
                                <textarea
                                    id={`blogContent${index}`}
                                    rows="4"
                                    className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-${getColorClass(primaryColor)}-500 focus:border-transparent transition-colors shadow-sm resize-y mb-2`}
                                    value={post.content}
                                    onChange={(e) => handleBlogPostChange(index, 'content', e.target.value)}
                                    placeholder={`Content for blog post ${index + 1}`}
                                ></textarea>
                                <label htmlFor={`blogImage${index}File`} className="block text-sm font-medium text-gray-600 mb-1">Blog Post {index + 1} Image (Upload or URL)</label>
                                <input
                                    type="file"
                                    id={`blogImage${index}File`}
                                    accept="image/*"
                                    className="w-full text-gray-700 bg-white border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer mb-2"
                                    onChange={(e) => handleBlogPostChange(index, 'imageUrl', null, e.target.files[0])}
                                />
                                <input
                                    type="url"
                                    id={`blogImage${index}Url`}
                                    className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-${getColorClass(primaryColor)}-500 focus:border-transparent transition-colors shadow-sm`}
                                    value={blogPosts[index].imageUrl.startsWith('data:image/') ? '' : blogPosts[index].imageUrl}
                                    onChange={(e) => handleBlogPostChange(index, 'imageUrl', e.target.value)}
                                    placeholder={`Or enter image URL for blog post ${index + 1}`}
                                />
                                {blogPosts[index].imageUrl && <p className="text-xs text-gray-500 mt-1">Current: {blogPosts[index].imageUrl.substring(0, 50)}...</p>}
                                <button
                                    onClick={() => handleRemoveBlogPost(index)}
                                    className="mt-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors text-sm"
                                    title="Remove blog post"
                                >
                                    <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                    <span className="ml-1">Remove Post</span>
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={handleAddBlogPost}
                            className={`w-full mt-4 ${buttonBg} ${buttonText} font-semibold py-3 px-6 rounded-full shadow-lg ${buttonHover} transition duration-300 ease-in-out transform hover:scale-105`}
                        >
                            Add Blog Post
                        </button>
                    </div>
                )}

                {/* FAQ Section */}
                <SectionHeader
                    title="Frequently Asked Questions"
                    sectionName="faqSection"
                    isOpen={openSections.faqSection}
                    toggle={toggleSection}
                />
                {openSections.faqSection && (
                    <div className="mb-8 p-4 bg-gray-50 rounded-lg shadow-inner animate-fade-in-up">
                        {faqItems.map((item, index) => (
                            <div key={index} className="mb-4 border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                                <label htmlFor={`faqQuestion${index}`} className="block text-sm font-medium text-gray-600 mb-1">Question {index + 1}</label>
                                <input
                                    type="text"
                                    id={`faqQuestion${index}`}
                                    className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-${getColorClass(primaryColor)}-500 focus:border-transparent transition-colors shadow-sm mb-2`}
                                    value={item.question}
                                    onChange={(e) => handleFaqItemChange(index, 'question', e.target.value)}
                                    placeholder={`Question ${index + 1}`}
                                />
                                <label htmlFor={`faqAnswer${index}`} className="block text-sm font-medium text-gray-600 mb-1">Answer {index + 1}</label>
                                <textarea
                                    id={`faqAnswer${index}`}
                                    rows="3"
                                    className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-${getColorClass(primaryColor)}-500 focus:border-transparent transition-colors shadow-sm resize-y mb-2`}
                                    value={item.answer}
                                    onChange={(e) => handleFaqItemChange(index, 'answer', e.target.value)}
                                    placeholder={`Answer for question ${index + 1}`}
                                ></textarea>
                                <button
                                    onClick={() => handleRemoveFaqItem(index)}
                                    className="mt-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors text-sm"
                                    title="Remove FAQ item"
                                >
                                    <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                    <span className="ml-1">Remove FAQ</span>
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={handleAddFaqItem}
                            className={`w-full mt-4 ${buttonBg} ${buttonText} font-semibold py-3 px-6 rounded-full shadow-lg ${buttonHover} transition duration-300 ease-in-out transform hover:scale-105`}
                        >
                            Add FAQ Item
                        </button>
                    </div>
                )}

                {/* Portfolio Section */}
                <SectionHeader
                    title="Portfolio / Projects"
                    sectionName="portfolioSection"
                    isOpen={openSections.portfolioSection}
                    toggle={toggleSection}
                />
                {openSections.portfolioSection && (
                    <div className="mb-8 p-4 bg-gray-50 rounded-lg shadow-inner animate-fade-in-up">
                        {portfolioItems.map((project, index) => (
                            <div key={index} className="mb-4 border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                                <label htmlFor={`portfolioTitle${index}`} className="block text-sm font-medium text-gray-600 mb-1">Project {index + 1} Title</label>
                                <input
                                    type="text"
                                    id={`portfolioTitle${index}`}
                                    className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-${getColorClass(primaryColor)}-500 focus:border-transparent transition-colors shadow-sm mb-2`}
                                    value={project.title}
                                    onChange={(e) => handlePortfolioItemChange(index, 'title', e.target.value)}
                                    placeholder={`Title for project ${index + 1}`}
                                />
                                <label htmlFor={`portfolioDescription${index}`} className="block text-sm font-medium text-gray-600 mb-1">Project {index + 1} Description</label>
                                <textarea
                                    id={`portfolioDescription${index}`}
                                    rows="3"
                                    className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-${getColorClass(primaryColor)}-500 focus:border-transparent transition-colors shadow-sm resize-y mb-2`}
                                    value={project.description}
                                    onChange={(e) => handlePortfolioItemChange(index, 'description', e.target.value)}
                                    placeholder={`Description for project ${index + 1}`}
                                ></textarea>
                                <label htmlFor={`portfolioImage${index}File`} className="block text-sm font-medium text-gray-600 mb-1">Project {index + 1} Image (Upload or URL)</label>
                                <input
                                    type="file"
                                    id={`portfolioImage${index}File`}
                                    accept="image/*"
                                    className="w-full text-gray-700 bg-white border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer mb-2"
                                    onChange={(e) => handlePortfolioItemChange(index, 'imageUrl', null, e.target.files[0])}
                                />
                                <input
                                    type="url"
                                    id={`portfolioImage${index}Url`}
                                    className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-${getColorClass(primaryColor)}-500 focus:border-transparent transition-colors shadow-sm mb-2`}
                                    value={portfolioItems[index].imageUrl.startsWith('data:image/') ? '' : portfolioItems[index].imageUrl}
                                    onChange={(e) => handlePortfolioItemChange(index, 'imageUrl', e.target.value)}
                                    placeholder={`Or enter image URL for project ${index + 1}`}
                                />
                                {portfolioItems[index].imageUrl && <p className="text-xs text-gray-500 mt-1">Current: {portfolioItems[index].imageUrl.substring(0, 50)}...</p>}
                                <label htmlFor={`portfolioLink${index}`} className="block text-sm font-medium text-gray-600 mb-1">Project {index + 1} Link</label>
                                <input
                                    type="url"
                                    id={`portfolioLink${index}`}
                                    className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-${getColorClass(primaryColor)}-500 focus:border-transparent transition-colors shadow-sm mb-2`}
                                    value={project.projectLink}
                                    onChange={(e) => handlePortfolioItemChange(index, 'projectLink', e.target.value)}
                                    placeholder={`Link for project ${index + 1}`}
                                />
                                <button
                                    onClick={() => handleRemovePortfolioItem(index)}
                                    className="mt-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors text-sm"
                                    title="Remove portfolio item"
                                >
                                    <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                    <span className="ml-1">Remove Project</span>
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={handleAddPortfolioItem}
                            className={`w-full mt-4 ${buttonBg} ${buttonText} font-semibold py-3 px-6 rounded-full shadow-lg ${buttonHover} transition duration-300 ease-in-out transform hover:scale-105`}
                        >
                            Add Project
                        </button>
                    </div>
                )}

                {/* Timeline Section */}
                <SectionHeader
                    title="Timeline / Milestones"
                    sectionName="timelineSection"
                    isOpen={openSections.timelineSection}
                    toggle={toggleSection}
                />
                {openSections.timelineSection && (
                    <div className="mb-8 p-4 bg-gray-50 rounded-lg shadow-inner animate-fade-in-up">
                        {timelineEvents.map((event, index) => (
                            <div key={index} className="mb-4 border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                                <label htmlFor={`timelineYear${index}`} className="block text-sm font-medium text-gray-600 mb-1">Event {index + 1} Year</label>
                                <input
                                    type="text"
                                    id={`timelineYear${index}`}
                                    className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-${getColorClass(primaryColor)}-500 focus:border-transparent transition-colors shadow-sm mb-2`}
                                    value={event.year}
                                    onChange={(e) => handleTimelineEventChange(index, 'year', e.target.value)}
                                    placeholder={`Year for event ${index + 1}`}
                                />
                                <label htmlFor={`timelineTitle${index}`} className="block text-sm font-medium text-gray-600 mb-1">Event {index + 1} Title</label>
                                <input
                                    type="text"
                                    id={`timelineTitle${index}`}
                                    className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-${getColorClass(primaryColor)}-500 focus:border-transparent transition-colors shadow-sm mb-2`}
                                    value={event.title}
                                    onChange={(e) => handleTimelineEventChange(index, 'title', e.target.value)}
                                    placeholder={`Title for event ${index + 1}`}
                                />
                                <label htmlFor={`timelineDescription${index}`} className="block text-sm font-medium text-gray-600 mb-1">Event {index + 1} Description</label>
                                <textarea
                                    id={`timelineDescription${index}`}
                                    rows="3"
                                    className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-${getColorClass(primaryColor)}-500 focus:border-transparent transition-colors shadow-sm resize-y mb-2`}
                                    value={event.description}
                                    onChange={(e) => handleTimelineEventChange(index, 'description', e.target.value)}
                                    placeholder={`Description for event ${index + 1}`}
                                ></textarea>
                                <button
                                    onClick={() => handleRemoveTimelineEvent(index)}
                                    className="mt-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors text-sm"
                                    title="Remove timeline event"
                                >
                                    <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                    <span className="ml-1">Remove Event</span>
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={handleAddTimelineEvent}
                            className={`w-full mt-4 ${buttonBg} ${buttonText} font-semibold py-3 px-6 rounded-full shadow-lg ${buttonHover} transition duration-300 ease-in-out transform hover:scale-105`}
                        >
                            Add Timeline Event
                        </button>
                    </div>
                )}

                {/* Footer Copyright */}
                <SectionHeader
                    title="Footer Copyright Text"
                    sectionName="footerCopyright"
                    isOpen={openSections.footerCopyright}
                    toggle={toggleSection}
                />
                {openSections.footerCopyright && (
                    <div className="mb-8 p-4 bg-gray-50 rounded-lg shadow-inner animate-fade-in-up">
                        <input
                            type="text"
                            id="footerCopyright"
                            className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-${getColorClass(primaryColor)}-500 focus:border-transparent transition-colors shadow-sm`}
                            value={footerCopyright}
                            onChange={(e) => handleConfigChange('footerCopyright', e.target.value)}
                            placeholder="Your copyright text"
                        />
                    </div>
                )}


                {/* Style Customization (Manual Overrides) */}
                <SectionHeader
                    title="Style Overrides (Advanced)"
                    sectionName="styleOverrides"
                    isOpen={openSections.styleOverrides}
                    toggle={toggleSection}
                />
                {openSections.styleOverrides && (
                    <div className="mb-8 p-4 bg-gray-50 rounded-lg shadow-inner animate-fade-in-up">
                        <p className="text-sm text-gray-600 mb-4">These will override selected theme settings.</p>
                        <div className="mb-4">
                            <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-600 mb-1">Primary Color</label>
                            <input
                                type="color"
                                id="primaryColor"
                                className={`w-full h-12 rounded-md border border-gray-300 cursor-pointer shadow-sm`}
                                value={primaryColor}
                                onChange={(e) => handleConfigChange('primaryColor', e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="fontFamily" className="block text-sm font-medium text-gray-600 mb-1">Font Family</label>
                            <select
                                id="fontFamily"
                                className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-${getColorClass(primaryColor)}-500 focus:border-transparent transition-colors shadow-sm`}
                                value={fontFamily}
                                onChange={(e) => handleConfigChange('fontFamily', e.target.value)}
                            >
                                <option value="Inter">Inter</option>
                                <option value="Roboto">Roboto</option>
                                <option value="Open Sans">Open Sans</option>
                                <option value="Montserrat">Montserrat</option>
                                <option value="Lato">Lato</option>
                                <option value="Poppins">Poppins</option>
                            </select>
                        </div>
                        {/* Layout and Design Style */}
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold mb-4 text-gray-700">Layout Style Override</h3>
                            <div className="flex flex-wrap gap-4">
                                {['modern', 'minimal', 'portfolio', 'blog'].map(style => (
                                    <label key={style} className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="layoutStyle"
                                            value={style}
                                            checked={layoutStyle === style}
                                            onChange={(e) => handleConfigChange('layoutStyle', e.target.value)}
                                            className={`form-radio text-${getColorClass(primaryColor)}-600 h-5 w-5`}
                                        />
                                        <span className="text-gray-700">{style.charAt(0).toUpperCase() + style.slice(1)}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Structure & Content Checkboxes */}
                <SectionHeader
                    title="Page & Section Structure"
                    sectionName="pageStructure"
                    isOpen={openSections.pageStructure}
                    toggle={toggleSection}
                />
                {openSections.pageStructure && (
                    <div className="mb-8 p-4 bg-gray-50 rounded-lg shadow-inner animate-fade-in-up">
                        <h3 className="text-xl font-semibold mb-4 text-gray-700">Page Structure</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {Object.keys(pages).map((pageKey) => (
                                <label key={pageKey} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name={pageKey}
                                        checked={pages[pageKey]}
                                        onChange={handlePageChange}
                                        className={`form-checkbox text-${getColorClass(primaryColor)}-600 h-5 w-5 rounded`}
                                    />
                                    <span className="text-gray-700">{pageKey.charAt(0).toUpperCase() + pageKey.slice(1)}</span>
                                </label>
                            ))}
                        </div>

                        <h3 className="text-xl font-semibold mt-6 mb-4 text-gray-700">Content Sections (Home Page)</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {Object.keys(sections).map((sectionKey) => (
                                <label key={sectionKey} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name={sectionKey}
                                        checked={sections[sectionKey]}
                                        onChange={handleSectionChange}
                                        className={`form-checkbox text-${getColorClass(primaryColor)}-600 h-5 w-5 rounded`}
                                    />
                                    <span className="text-gray-700">{sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1).replace('cta', 'CTA').replace('contactForm', 'Contact Form')}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}


                {/* Action Buttons */}
                <div className="mt-8 flex flex-col space-y-4">
                    <button
                        onClick={generatePreviewAndCode}
                        className={`w-full ${buttonBg} ${buttonText} font-semibold py-3 px-6 rounded-full shadow-lg ${buttonHover} transition duration-300 ease-in-out transform hover:scale-105`}
                    >
                        Generate Website
                    </button>
                    <button
                        onClick={handleDownload}
                        className="w-full bg-gray-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-gray-800 transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Download Code (HTML)
                    </button>
                    <button
                        onClick={handleReset}
                        className="w-full bg-red-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Reset All
                    </button>
                </div>
            </div>

            {/* Draggable Divider */}
            <div
                style={{
                    width: 8,
                    cursor: 'col-resize',
                    background: 'linear-gradient(to bottom, #e0e7ef 60%, #c7d2fe 100%)',
                    zIndex: 10,
                    height: '100vh'
                }}
                onMouseDown={startDragging}
            />

            {/* Right Panel: Real-time Preview & Code Viewer */}
            <div className="flex-1 min-w-0 flex flex-col h-full">
                {/* Tabs for Preview/Code */}
                <div className="flex justify-center mb-4">
                    <button
                        onClick={() => setCurrentView('preview')}
                        className={`px-6 py-3 rounded-l-lg font-semibold transition duration-300 ${currentView === 'preview' ? `${buttonBg} ${buttonText}` : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                    >
                        Live Preview
                    </button>
                    <button
                        onClick={() => setCurrentView('code')}
                        className={`px-6 py-3 rounded-r-lg font-semibold transition duration-300 ${currentView === 'code' ? `${buttonBg} ${buttonText}` : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                    >
                        View Code
                    </button>
                </div>

                {/* Content based on selected view */}
                {currentView === 'preview' ? (
                    <div className="relative flex-grow w-full bg-white border border-gray-300 rounded-lg shadow-inner overflow-hidden min-h-0">
                        <iframe
                            ref={previewIframeRef}
                            title="Website Preview"
                            srcDoc={generatedHtml}
                            className="w-full h-full border-0"
                        />
                    </div>
                ) : (
                    <div className="flex-1 min-h-0 flex flex-col bg-gray-800 rounded-lg shadow-inner overflow-hidden">
                        {/* Code Type Tabs */}
                        <div className="flex justify-start p-2 bg-gray-700 rounded-t-lg">
                            <button
                                onClick={() => setCurrentCodeView('html')}
                                className={`px-4 py-2 rounded-md font-semibold text-sm transition duration-300 mr-2 ${currentCodeView === 'html' ? `${buttonBg} ${buttonText}` : 'bg-gray-600 text-gray-200 hover:bg-gray-500'}`}
                            >
                                HTML
                            </button>
                            <button
                                onClick={() => setCurrentCodeView('css')}
                                className={`px-4 py-2 rounded-md font-semibold text-sm transition duration-300 mr-2 ${currentCodeView === 'css' ? `${buttonBg} ${buttonText}` : 'bg-gray-600 text-gray-200 hover:bg-gray-500'}`}
                            >
                                CSS
                            </button>
                            <button
                                onClick={() => setCurrentCodeView('js')}
                                className={`px-4 py-2 rounded-md font-semibold text-sm transition duration-300 ${currentCodeView === 'js' ? `${buttonBg} ${buttonText}` : 'bg-gray-600 text-gray-200 hover:bg-gray-500'}`}
                            >
                                JavaScript
                            </button>
                        </div>
                        {/* Code Display Area */}
                        <textarea
                            className="flex-1 w-full p-4 bg-gray-900 text-gray-50 font-mono text-sm resize-none outline-none"
                            value={codeToDisplay}
                            readOnly
                            style={{ minHeight: 0 }}
                        />
                        {/* Copy buttons for the code viewer */}
                        <div className="p-2 bg-gray-700 flex justify-end space-x-2 rounded-b-lg">
                            <button onClick={
                                () => {
                                    if (currentCodeView === 'html') handleCopyHtml();
                                    else if (currentCodeView === 'css') handleCopyCss();
                                    else if (currentCodeView === 'js') handleCopyJs();
                                }
                            } className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors text-sm">Copy {currentCodeView.toUpperCase()}</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
