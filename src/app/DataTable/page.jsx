import { useEffect, useState } from "react";
import connectToDatabase from "../api/db";

const DataTable = () => {
    const tables = ["User", "Blog"];
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = await connectToDatabase();
                const tableData = {};
                tables.forEach((table) => {
                    const rows = await db.all(`SELECT * FROM ${table}`);
                    tableData[table] = rows;
                });
                setData(tableData);
            } catch (err) {
                alert('Error fetching data from database', err);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            {tables.map((table, index) => (
                <div key={index}>
                    <h3>{table}</h3>
                    <pre>{JSON.stringify(data[table], null, 2)}</pre>
                </div>
            ))}
        </div>
    );
};

export default DataTable;