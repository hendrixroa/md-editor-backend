DROP DATABASE IF EXISTS md_editor;
CREATE DATABASE md_editor;

use md_editor;

CREATE TABLE posts (
    id integer primary key NOT NULL AUTO_INCREMENT,
    post text,
    create_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp ON UPDATE CURRENT_TIMESTAMP
);