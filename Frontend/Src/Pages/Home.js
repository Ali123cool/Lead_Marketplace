import React from 'react';
import HomePage_HeroSection from '../Components/HomePage_HeroSection';
import HomePage_CallToAction from '../Components/HomePage_CallToAction';
import HomePage_Features from '../Components/HomePage_Features';
import HomePage_Testimonials from '../Components/HomePage_Testimonials';

function HomePage() {
    return (
        <div>
            <HomePage_HeroSection />
            <HomePage_Features />
            <HomePage_CallToAction />
            
        </div>
    );
}

export default HomePage;
