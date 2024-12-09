-- User
CREATE TABLE IF NOT EXISTS User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

--Blog
CREATE TABLE IF NOT EXISTS Blog (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    publishDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT,
    FOREIGN KEY (username) REFERENCES User(username)
);

--Comment
CREATE TABLE IF NOT EXISTS Comment (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    BlogID INTEGER NOT NULL,
    content TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (username) REFERENCES User(username),
    FOREIGN KEY (BlogID) REFERENCES Blog(id)
);

CREATE INDEX IF NOT EXISTS idx_blog_username ON Blog(username);