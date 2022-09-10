CREATE TABLE transaction (
	transaction_id VARCHAR(36) NOT NULL PRIMARY KEY,
	amount DECIMAL(13, 2) NOT NULL,
	type ENUM("TED", "DOC", "PIX", "DEPOSIT", "WITHDRAW")
);