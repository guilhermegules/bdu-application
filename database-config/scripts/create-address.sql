CREATE TABLE address (
	address_id VARCHAR(36) NOT NULL PRIMARY KEY,
	city VARCHAR(50) NOT NULL,
	neighborhood VARCHAR(100) NOT NULL,
	state VARCHAR(50) NOT NULL,
	cep VARCHAR(8) NOT NULL,
	number varchar(8) NOT NULL,
	additional_info VARCHAR(100) NULL
);