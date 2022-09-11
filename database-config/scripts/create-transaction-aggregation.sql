CREATE TABLE transaction_aggregation (
	aggregation_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	transaction_sender VARCHAR(17) NOT NULL,
	transaction_receiver VARCHAR(17) NOT NULL,
	transaction_id VARCHAR(36) NOT NULL,
	CONSTRAINT fk_transaction_sender FOREIGN KEY (transaction_sender) REFERENCES account(account_number),
	CONSTRAINT fk_transaction_receiver FOREIGN KEY (transaction_receiver) REFERENCES account(account_number),
	CONSTRAINT fk_transaction FOREIGN KEY (transaction_id) REFERENCES transaction(transaction_id)
);