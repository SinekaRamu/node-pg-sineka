-- ddl script

create table account_users (
	id SERIAL primary key,
	first_name VARCHAR not null,
	last_name VARCHAR ,
	user_name VARCHAR not null unique,
	email VARCHAR not null,
	user_password VARCHAR not null,
	phone_no VARCHAR,
	created_at TIMESTAMP default current_timestamp
) 

CREATE TABLE items (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR not null,
    item_content VARCHAR,
    price integer not null,
    item_count integer not null
);

CREATE TABLE favourites (
    fav_id SERIAL PRIMARY KEY,
    item_id SERIAL references items(item_id) on delete cascade on update cascade,
    user_id SERIAL references account_users(id) on delete cascade on update cascade,
);

CREATE TABLE ratings (
    rating_id SERIAL PRIMARY KEY,
    item_id integer references items(item_id),
    rating integer,
);