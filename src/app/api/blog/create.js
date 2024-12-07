import connectToDatabase from '../db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, publishDate, content } = req.body;

    try {
      const db = await connectToDatabase();
      await db.run(
        'INSERT INTO Blog (username, publishDate, content) VALUES (?, ?, ?)',
        [username, publishDate, content]
      );
      res.status(200).json({ message: 'Blog post created successfully!' });
    } catch (error) {
      res.status(500).json({ error: 'Database error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
