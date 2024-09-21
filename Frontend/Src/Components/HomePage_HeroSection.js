import React from 'react';

function HomePage_HeroSection() {
    return (
        <section className="flex justify-between items-center bg-gray-900 text-white py-16 px-8">
            <div className="max-w-md">
                <h1 className="text-4xl font-bold mb-6">The #1 Exclusive Lead Marketplace</h1>
                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Shop Leads</button>
            </div>
            <div className="max-w-md bg-blue-700 text-white p-8 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">How Our Platform Works</h2>
                <p className="mb-4">
                    We partner with a wide range of vendors who supply us with exclusive leads. Our database ensures each lead remains exclusive for 72 hours.
                </p>
                <p className="mb-6">
                    You can browse and purchase only the leads that fit your needs!
                </p>
                <div className="flex justify-between">
                    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">Create A Vendor Account</button>
                    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Create A Customer Account</button>
                </div>
            </div>
        </section>
    );
}

export default HomePage_HeroSection;
