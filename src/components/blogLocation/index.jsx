"use client"

import { useEffect, useState } from "react";

const BlogLocation = ({ BlogID }) => {
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await fetch(`/api/location/read?BlogID=${BlogID}`);
                if (!response.ok) {
                    throw error;
                }
                const data = await response.json();
                setLocation(data);
                console.log(data);
            } catch (error) {
                alert(`Error in fetching location: ${error}`);
            } finally {
                setLoading(false);
            }
        };

        fetchLocation();
    }, [BlogID]);

    if (loading)
        return <div>Loading location...</div>;

    return (
        <div>
            {location && location.length>0 && `${location[0]?.country}, ${location[0]?.name}`}
        </div>
    );
};

export default BlogLocation;