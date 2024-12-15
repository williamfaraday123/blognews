"use client"

import axios from "axios";
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

    const handleDelete = async (table, rowId) => {
        try {
            const formData = {
                table,
                rowId
            };
            const response = await axios.post(`/api/database/delete`, formData);
            alert(`Successfully deleted from ${table} where id = ${rowId}, ${response.data.message}`);
        } catch (error) {
            alert(`Error in deleting, ${error.message}`);
        }
    };
    
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            {Object.keys(data).map((table, index) => (
                <div key={index}>
                    <h3>{table}</h3>
                    {data[table].map((row) => (
                        <div key={row.id}>
                            <pre>{JSON.stringify(row, null, 2)}</pre>
                            <button onClick={() => handleDelete(table, row.id)}>Delete</button>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default DataTable;