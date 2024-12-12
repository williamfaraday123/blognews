"use client"

import { createContext, useContext, useState } from "react";

const BlogContext = createContext();

export const BlogContextProvider = ({ children }) => {

    const [blogsChanged, setBlogsChanged] = useState(false);

    const toggleBlogsList = () => {
        setBlogsChanged(prevState => !prevState);
    };

    return (
        <BlogContext.Provider value={{ blogsChanged, toggleBlogsList }}>
            {children}
        </BlogContext.Provider>
    );
};

export const useBlogContext = () => useContext(BlogContext);