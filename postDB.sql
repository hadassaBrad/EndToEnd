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
  password varchar(8) NOT NULL,
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
 
CREATE TABLE albums (
  album_id INT AUTO_INCREMENT,
  user_id INT,
  title varchar(50),
  PRIMARY KEY (album_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id)
 );
 
 CREATE TABLE posts (
  post_id INT AUTO_INCREMENT,
  user_id INT,
  title varchar(50),
  body varchar(500),
  PRIMARY KEY (post_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id)
 );
 
  CREATE TABLE comments (
  comment_id INT AUTO_INCREMENT,
  post_id INT,
  email varchar(100) NOT NULL UNIQUE,
  name varchar(50),
  body varchar(500),
  PRIMARY KEY (comment_id),
  FOREIGN KEY (post_id) REFERENCES posts (post_id)
  );

  CREATE TABLE todos (
  todo_id INT AUTO_INCREMENT,
  user_id INT,
  title varchar(50),
  completed boolean,
  PRIMARY KEY (todo_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id)
 );
 
 
 
 
 