USE postdb;
 
CREATE TABLE users (
  user_id INT AUTO_INCREMENT,
  lastName varchar(50) NOT NULL,
  firstName varchar(50) NOT NULL,
  email varchar(100) NOT NULL,
  phone varchar(10) NOT NULL,
  PRIMARY KEY (user_id)
);

CREATE TABLE passwords (
  user_id INT,
  password varchar(300) NOT NULL,
  PRIMARY KEY (user_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id)
 );
 
  CREATE TABLE addresses (
  user_id INT,
  city varchar(50) NOT NULL,
  street varchar(50) NOT NULL,
  PRIMARY KEY (user_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id)
 );
 
 CREATE TABLE posts (
  id INT AUTO_INCREMENT,
  user_id INT,
  title varchar(50),
  body varchar(500),
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users (user_id)
 );
 
  CREATE TABLE comments (
  id INT AUTO_INCREMENT,
  post_id INT,
  email varchar(100) NOT NULL,
  name varchar(50),
  body varchar(500),
  PRIMARY KEY (id),
  FOREIGN KEY (post_id) REFERENCES posts (id)
  );
  
  CREATE TABLE todos (
  id INT AUTO_INCREMENT,
  user_id INT,
  title varchar(50),
  completed boolean,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users (user_id)
 );
 
 
 -- Insert data into users table
INSERT INTO users (lastName, firstName, email, phone) VALUES
('Doe', 'John', 'john.doe@example.com', '1234567890'),
('Smith', 'Jane', 'jane.smith@example.com', '0987654321');

-- Insert data into passwords table
INSERT INTO passwords (user_id, password) VALUES
(1, 'password123'),
(2, 'securepassword456');

-- Insert data into addresses table
INSERT INTO addresses (user_id, city, street) VALUES
(1, 'New York', '123 Main St'),
(2, 'Los Angeles', '456 Elm St');

-- Insert data into albums table
INSERT INTO albums (user_id, title) VALUES
(1, 'Summer Vacation'),
(2, 'Family Reunion');

-- Insert data into posts table
INSERT INTO posts (user_id, title, body) VALUES
(10, 'My Trip to hhhh', 'Had an vvvv time snorkeling and enjoying the beach!'),
(1, 'My Trip to Hawaii', 'Had an amazing time snorkeling and enjoying the beach!'),
(2, 'Cooking Adventures', 'Tried out a new recipe today and it was delicious!');

-- Insert data into comments table
INSERT INTO comments (post_id, email, name, body) VALUES
(6, 'commenter@example.com', 'Commenter', 'Sounds like a fantastic trip!'),
(1, 'commenter@example.com', 'Commenter', 'Sounds like a fantastic trip!'),
(2, 'another@example.com', 'Another Commenter', 'I love trying out new recipes too!');

-- Insert data into todos table
INSERT INTO todos (user_id, title, completed) VALUES
(1, 'Grocery Shopping', false),
(2, 'Finish Project', true);
 select * from passwords;
  select * from addresses;
   select * from users ;
   select * from todos ;
select * from posts ;
select * from comments ;
SELECT * FROM users NATURAL JOIN addresses NATURAL JOIN passwords WHERE users.user_id =10;


 
 
 
 