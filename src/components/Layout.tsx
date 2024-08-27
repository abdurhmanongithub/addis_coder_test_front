import React from 'react';
import NavBar from './NavBar';
interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-100">
            <NavBar />
            <main className="container mx-auto px-4 py-6">
                {children}
            </main>
            <footer className="bg-gray-800 text-white py-4 mt-6">
                <div className="container mx-auto text-center">
                    <p className="text-sm">Developed by Abdurhman Abrar</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
