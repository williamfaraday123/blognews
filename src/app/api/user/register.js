import connectToDatabase from '../db';

export default async function handler (req, res) {
    if (req.method == 'POST') {
        const { formData } = req.body;
        const { username, password } = formData;
        try {
            const db = await connectToDatabase();
            await db.run('INSERT INTO user (username, password) VALUES (?, ?)', [username, password]);
            res.status(200).json({ success: true });
        } catch (err) {
            res.status(500).json({ error: 'Database error' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}