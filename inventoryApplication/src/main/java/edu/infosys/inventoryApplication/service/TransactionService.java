package edu.infosys.inventoryApplication.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.infosys.inventoryApplication.bean.Product;
import edu.infosys.inventoryApplication.bean.Transaction;
import edu.infosys.inventoryApplication.dao.ProductDao;

@Service
public class TransactionService {
	
	@Autowired
	ProductDao productDao;
	
	public Transaction setTransactionValue(Transaction transaction, String pid, String type) {
		Product product=productDao.findProductById(pid);
		Double quantity=transaction.getQuantity();
		if(type.equals("IN")){
			Double purchasePrice=product.getPurchasePrice();
			Double value=purchasePrice*quantity;
			transaction.setTransactionValue(value);
			transaction.setRate(purchasePrice);
		}
		else if(type.equals("OUT")){
			Double salesPrice=product.getSalesPrice();
			Double value=salesPrice*quantity;
			transaction.setTransactionValue(value);
			transaction.setRate(salesPrice);
		}
		transaction.setProductId(pid);
		transaction.setTransactionType(type);
		return transaction;
	}
		
	
	
}
