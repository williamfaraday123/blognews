import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <div>dashboard1</div>
            {children}
        </div>
    );
}

export default Layout