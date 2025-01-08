const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-200">
            

                <div className="border-t border-gray-200 py-6">
                    <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
                        <p className="text-sm text-gray-600">
                            © {currentYear} BlogApp. All rights reserved.
                        </p>
                    </div>
                </div>
        </footer>
    );
};

export default Footer;