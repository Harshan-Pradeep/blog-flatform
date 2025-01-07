import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">BlogApp</h3>
                        <p className="text-gray-600 text-sm">
                            Discover stories, thinking, and expertise from writers on any topic.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                                <Facebook className="h-5 w-5" />
                                <span className="sr-only">Facebook</span>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                                <Linkedin className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-600 hover:text-blue-600 text-sm">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-600 hover:text-blue-600 text-sm">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/blog" className="text-gray-600 hover:text-blue-600 text-sm">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-600 hover:text-blue-600 text-sm">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/category/technology" className="text-gray-600 hover:text-blue-600 text-sm">
                                    Technology
                                </Link>
                            </li>
                            <li>
                                <Link to="/category/lifestyle" className="text-gray-600 hover:text-blue-600 text-sm">
                                    Lifestyle
                                </Link>
                            </li>
                            <li>
                                <Link to="/category/travel" className="text-gray-600 hover:text-blue-600 text-sm">
                                    Travel
                                </Link>
                            </li>
                            <li>
                                <Link to="/category/food" className="text-gray-600 hover:text-blue-600 text-sm">
                                    Food & Cooking
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Stay Updated</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Subscribe to our newsletter for the latest updates and stories.
                        </p>
                        <form className="space-y-2">
                            <div className="flex">
                                <div className="relative flex-grow">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-l-md 
                             text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 
                             focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded-r-md 
                           hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                           focus:ring-blue-500"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-200 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-sm text-gray-600">
                            © {currentYear} BlogApp. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <Link to="/privacy" className="text-sm text-gray-600 hover:text-blue-600">
                                Privacy Policy
                            </Link>
                            <Link to="/terms" className="text-sm text-gray-600 hover:text-blue-600">
                                Terms of Service
                            </Link>
                            <Link to="/cookies" className="text-sm text-gray-600 hover:text-blue-600">
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;