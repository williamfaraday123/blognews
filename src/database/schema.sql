/* -- User
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

--Trigger upon deleting a row in User
CREATE TRIGGER IF NOT EXISTS deleteUserTrigger
AFTER DELETE ON User
FOR EACH ROW
BEGIN
    DELETE FROM Blog
    WHERE username = OLD.username;
    DELETE FROM Comment
    WHERE username = OLD.username;
END;

--Trigger upon deleting a row in Blog
CREATE TRIGGER IF NOT EXISTS deleteBlogTrigger
AFTER DELETE ON Blog
FOR EACH ROW
BEGIN
    DELETE FROM Comment
    WHERE BlogID = OLD.id;
END; */

-- User
CREATE TABLE IF NOT EXISTS "User" (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

-- Blog
CREATE TABLE IF NOT EXISTS "Blog" (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    publishDate TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT,
    FOREIGN KEY (username) REFERENCES "User"(username)
);

-- Comment
CREATE TABLE IF NOT EXISTS "Comment" (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    BlogID INTEGER NOT NULL,
    content TEXT NOT NULL,
    createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (username) REFERENCES "User"(username),
    FOREIGN KEY (BlogID) REFERENCES "Blog"(id)
);

CREATE INDEX IF NOT EXISTS idx_blog_username ON "Blog"(username);

-- Trigger function for deleting related rows in Blog and Comment upon User deletion
CREATE OR REPLACE FUNCTION delete_user_related() RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM "Blog" WHERE username = OLD.username;
    DELETE FROM "Comment" WHERE username = OLD.username;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Trigger function for deleting related rows in Comment upon Blog deletion
CREATE OR REPLACE FUNCTION delete_blog_related() RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM "Comment" WHERE BlogID = OLD.id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Trigger upon deleting a row in User
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger WHERE tgname = 'deleteUserTrigger'
    ) THEN
        DROP TRIGGER IF EXISTS deleteUserTrigger ON "User";
        CREATE TRIGGER deleteUserTrigger
        AFTER DELETE ON "User"
        FOR EACH ROW
        EXECUTE FUNCTION delete_user_related();
    END IF;
END;
$$;

-- Trigger upon deleting a row in Blog

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger WHERE tgname = 'deleteBlogTrigger'
    ) THEN
        DROP TRIGGER IF EXISTS deleteBlogTrigger ON "Blog";
        CREATE TRIGGER deleteBlogTrigger
        AFTER DELETE ON "Blog"
        FOR EACH ROW
        EXECUTE FUNCTION delete_blog_related();
    END IF;
END;
$$;
