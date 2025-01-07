import React from "react";

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout = ({children}: AdminLayoutProps) => {
    return (
        <div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default AdminLayout;