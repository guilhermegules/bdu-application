SELECT * FROM 'transaction' t 
	INNER JOIN transaction_aggregation ta ON t.transaction_id = ta.transaction_id
	INNER JOIN account a 
		ON a.account_number = ta.transaction_sender 
		OR a.account_number = ta.transaction_receiver 
	WHERE a.account_number = '966552';