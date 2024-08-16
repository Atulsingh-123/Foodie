import React, { useState } from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaCcVisa, FaCcMastercard, FaCcAmex, FaApplePay } from 'react-icons/fa';

const Footer: React.FC = () => {
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const [isQuickLinksOpen, setIsQuickLinksOpen] = useState(false);
    const [isFollowUsOpen, setIsFollowUsOpen] = useState(false);

    return (
        <footer className="bg-black text-white py-8">
            <div className="container w-full md:w-[95%] lg:w-[90%] mx-auto mt-5">
                {/* Main Flex Container */}
                <div className="flex flex-col lg:flex-row justify-between">
                    {/* Subscribe Section */}
                    <div className="lg:w-1/3 mb-8 lg:mb-0">
                        <h2 className="text-lg font-semibold mb-4">Stay Updated</h2>
                        <p>Sign up for the latest updates on your favorite meals.</p>
                        <form className="mt-4 flex">
                            <input
                                type="email"
                                placeholder="Enter your e-mail..."
                                className="w-full px-4 py-2 rounded-l-md text-black"
                            />
                            <button
                                type="submit"
                                className="bg-white text-black px-4 py-2 rounded-r-md"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>

                    {/* Contact Section */}
                    <div className="lg:w-1/3 mb-8 lg:mb-0">
                        <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
                        <p>+91 9120599747</p>
                        <p>atul@gmail.com</p>
                    </div>
                </div>

                <hr className="my-8 border-gray-300" />

                {/* Sections */}
                <div className="flex flex-col lg:flex-row justify-between">
                    <div className="lg:w-1/3 mb-8 lg:mb-0">
                        <h2
                            className="text-lg font-semibold mb-4 cursor-pointer"
                            onClick={() => setIsAboutOpen(!isAboutOpen)}
                        >
                            About Us
                        </h2>
                        {(isAboutOpen || window.innerWidth >= 1024) && (
                            <ul className="space-y-2">
                                <li>Our Story</li>
                                <li>Chefs</li>
                                <li>Restaurants</li>
                                <li>Careers</li>
                                <li>Contact</li>
                            </ul>
                        )}
                    </div>

                    <div className="lg:w-1/3 mb-8 lg:mb-0">
                        <h2
                            className="text-lg font-semibold mb-4 cursor-pointer"
                            onClick={() => setIsQuickLinksOpen(!isQuickLinksOpen)}
                        >
                            Quick Links
                        </h2>
                        {(isQuickLinksOpen || window.innerWidth >= 1024) && (
                            <ul className="space-y-2">
                                <li>Menu</li>
                                <li>Order Tracking</li>
                                <li>FAQs</li>
                                <li>Privacy Policy</li>
                                <li>Terms & Conditions</li>
                            </ul>
                        )}
                    </div>

                    <div className="lg:w-1/3 mb-8 lg:mb-0">
                        <h2
                            className="text-lg font-semibold mb-4 cursor-pointer"
                            onClick={() => setIsFollowUsOpen(!isFollowUsOpen)}
                        >
                            Follow Us
                        </h2>
                        {(isFollowUsOpen || window.innerWidth >= 1024) && (
                            <>
                                <div className="flex space-x-4">
                                    <a href="#"><FaFacebook size={24} /></a>
                                    <a href="#"><FaInstagram size={24} /></a>
                                    <a href="#"><FaTwitter size={24} /></a>
                                </div>
                                <h2 className="text-lg font-semibold mb-4 mt-8">Payment Methods</h2>
                                <div className="flex space-x-4">
                                    <FaCcVisa size={32} />
                                    <FaCcMastercard size={32} />
                                    <FaCcAmex size={32} />
                                    <FaApplePay size={32} />
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-8 flex flex-col lg:flex-row justify-between items-center">
                    <p>&copy; 2024 FoodOrderApp. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
