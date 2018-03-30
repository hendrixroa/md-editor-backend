DROP DATABASE IF EXISTS md_docs;
CREATE DATABASE md_docs;

use md_docs;

CREATE TABLE documents (
    id integer primary key NOT NULL AUTO_INCREMENT,
    post text,
    create_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp ON UPDATE CURRENT_TIMESTAMP
);