package edu.infosys.inventoryApplication.dao;

import java.util.List;

import edu.infosys.inventoryApplication.bean.ProductSales;
import edu.infosys.inventoryApplication.bean.Transaction;

public interface TransactionDao {
	public Transaction save(Transaction transaction,String pid,String type);
	public List<Transaction> getAllTransactions();
	public Long generateId();
	public List<ProductSales> getProductWiseTotalSale();
	public List<Double> getDemandByProduct(String productId);
	public Transaction getTransactionById(Long id);
	public List<Transaction> findTransactionsByType(String type);
	public void deleteTransactionById(Long id);
}
