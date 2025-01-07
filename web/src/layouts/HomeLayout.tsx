import React from "react";

interface HomeLayoutProps {
    children: React.ReactNode;
}

const HomeLayout = ({children}: HomeLayoutProps) => {
    return (
        <div>
            <main>
                {children}
            </main>
        </div>
    )
}

export default HomeLayout;