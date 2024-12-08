"use client"

import { useEffect, useState } from "react";

const DataTable = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/database/getAll");
                if(!response.ok) {
                    throw error;
                }
                const tableData = await response.json();
                setData(tableData);
                setLoading(false);
            } catch (err) {
                alert('Error fetching data from database', err);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            {Object.keys(data).map((table, index) => (
                <div key={index}>
                    <h3>{table}</h3>
                    <pre>{JSON.stringify(data[table], null, 2)}</pre>
                </div>
            ))}
        </div>
    );
};

export default DataTable;