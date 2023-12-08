DROP TABLE IF EXISTS books;

CREATE TABLE books (
    ID SERIAL NOT NULL,
    title VARCHAR(255),
    author VARCHAR(255)
);

INSERT INTO books (title, author)
VALUES
    ('To Kill a Mockingbird', 'Harper Lee'),
    ('1984', 'George Orwell'),
    ('The Great Gatsby', 'F. Scott Fitzgerald'),
    ('One Hundred Years of Solitude', 'Gabriel Garcia Marquez'),
    ('A Passage to India', 'E.M. Forster'),
    ('Invisible Man', 'Ralph Ellison'),
    ('Don Quixote', 'Miguel de Cervantes'),
    ('Beloved', 'Toni Morrison'),
    ('Mrs. Dalloway', 'Virginia Woolf'),
    ('Things Fall Apart', 'Chinua Achebe');