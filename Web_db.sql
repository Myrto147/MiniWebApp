CREATE TABLE user (
username VARCHAR(30) NOT NULL,
password varchar(30) NOT NULL,
email VARCHAR(50) NOT NULL PRIMARY KEY
)

CREATE TABLE movie (
ID varchar(10) primary key,
title varchar(50),
email VARCHAR(50),
FOREIGN KEY (email) REFERENCES user(email)
)