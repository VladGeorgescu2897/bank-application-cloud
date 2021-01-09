CREATE TABLE IF NOT EXISTS clients (
    client_id serial PRIMARY KEY,
    username varchar NOT NULL,
    password varchar NOT NULL,
    email varchar NOT NULL,
    role varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS accounts (
    account_id serial PRIMARY KEY,
    client_id int NOT NULL,
    iban int NOT NULL,
    balance int NOT NULL,
    currency varchar NOT NULL,
    type varchar NOT NULL,
    FOREIGN KEY (client_id)
            REFERENCES clients (client_id)
);
