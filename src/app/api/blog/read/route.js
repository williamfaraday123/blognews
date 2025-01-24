import { pool } from "@/app/api/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);

        // Extract filters from query string
        const category = searchParams.get("category");
        const username = searchParams.get("username");
        
        const country = searchParams.get("country") || null;
        const name = searchParams.get("name") || null;
        const minLatitude = searchParams.get("minLatitude") === "null" ? null : parseFloat(searchParams.get("minLatitude"));
        const minLongitude = searchParams.get("minLongitude") === "null" ? null : parseFloat(searchParams.get("minLongitude"));
        const maxLatitude = searchParams.get("maxLatitude") === "null" ? null : parseFloat(searchParams.get("maxLatitude"));
        const maxLongitude = searchParams.get("maxLongitude") === "null" ? null : parseFloat(searchParams.get("maxLongitude"));
        console.log('Received:', country, name, minLatitude, maxLatitude, minLongitude, maxLongitude);
        
        const client = await pool.connect();

        // Step 1: Query Location Table
        let locationQuery = `SELECT BlogID FROM "Location"`;
        const locationConditions = [];
        const locationValues = [];

        if (country) {
            locationConditions.push(`country = $${locationValues.length + 1}`);
            locationValues.push(country);
        }
        if (name) {
            locationConditions.push(`name = $${locationValues.length + 1}`);
            locationValues.push(name);
        }
        if (minLatitude) {
            locationConditions.push(`latitude >= $${locationValues.length + 1}`);
            locationValues.push(minLatitude);
        }
        if (minLongitude) {
            locationConditions.push(`longitude >= $${locationValues.length + 1}`);
            locationValues.push(minLongitude);
        }
        if (maxLatitude) {
            locationConditions.push(`latitude <= $${locationValues.length + 1}`);
            locationValues.push(maxLatitude);
        }
        if (maxLongitude) {
            locationConditions.push(`longitude <= $${locationValues.length + 1}`);
            locationValues.push(maxLongitude);
        }

        if (locationConditions.length > 0) {
            locationQuery += ` WHERE ${locationConditions.join(" AND ")}`;
        }

        console.log('locationQuery:', locationQuery);
        const locationResult = await client.query(locationQuery, locationValues);
        const blogIDs = locationResult.rows.map((row) => row.blogid);
        console.log('locationResult:', locationResult);
        console.log('blogIDs:', blogIDs);

        // Step 2: Query Blog Table
        let blogQuery = `SELECT * FROM "Blog"`;
        const blogConditions = [];
        const blogValues = [];

        if (category) {
            blogConditions.push(`category = $${blogValues.length + 1}`);
            blogValues.push(category);
        }
        if (username) {
            blogConditions.push(`username = $${blogValues.length + 1}`);
            blogValues.push(username);
        }
        if (blogIDs.length > 0) {
            blogConditions.push(`id = ANY($${blogValues.length + 1})`);
            blogValues.push(blogIDs);
        } else {
            // If no blogIDs, return an empty response
            client.release();
            return NextResponse.json([], { status: 200 });
        }

        if (blogConditions.length > 0) {
            blogQuery += ` WHERE ${blogConditions.join(" AND ")}`;
        }

        const blogResult = await client.query(blogQuery, blogValues);
        const blogs = blogResult.rows;
        console.log('blogs:', blogs);
        
        // Step 3: Respond with Blogs
        client.release();
        return NextResponse.json(blogs, { status: 200 });

    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: `Error fetching blogs from database, ${err.message}` },
            { status: 500 }
        );
    }
}
