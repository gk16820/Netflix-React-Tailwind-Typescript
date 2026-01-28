import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="max-w-[1000px] mx-auto text-gray-400 text-sm py-20 px-4 border-t border-gray-800 mt-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-4">
                <ul className="space-y-2">
                    <li className="hover:underline cursor-pointer">Audio and Subtitles</li>
                    <li className="hover:underline cursor-pointer">Media Center</li>
                    <li className="hover:underline cursor-pointer">Privacy</li>
                    <li className="hover:underline cursor-pointer">Contact Us</li>
                </ul>
                <ul className="space-y-2">
                    <li className="hover:underline cursor-pointer">Audio Description</li>
                    <li className="hover:underline cursor-pointer">Investor Relations</li>
                    <li className="hover:underline cursor-pointer">Legal Notices</li>
                </ul>
                <ul className="space-y-2">
                    <li className="hover:underline cursor-pointer">Help Center</li>
                    <li className="hover:underline cursor-pointer">Jobs</li>
                    <li className="hover:underline cursor-pointer">Cookie Preferences</li>
                </ul>
                <ul className="space-y-2">
                    <li className="hover:underline cursor-pointer">Gift Cards</li>
                    <li className="hover:underline cursor-pointer">Terms of Use</li>
                    <li className="hover:underline cursor-pointer">Corporate Information</li>
                </ul>
            </div>
            <div className="text-[11px]">&copy; 2026 Netflix Clone.</div>
        </footer>
    );
};

export default Footer;
