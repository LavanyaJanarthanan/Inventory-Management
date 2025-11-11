package edu.infosys.inventoryApplication.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.infosys.inventoryApplication.bean.ProductSales;
import edu.infosys.inventoryApplication.bean.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction,Long>{

	@Query("select max(transactionId) from Transaction")
	public Long findMaxId();
	
	@Query("select t from Transaction t where t.transactionType=?1")
	public List<Transaction> findTransactionByTransactionType(String type);

	@Query("SELECT new edu.infosys.inventoryApplication.bean.ProductSales(p.productName, SUM(s.transactionValue)) " +
	           "FROM Product p JOIN Transaction s ON p.productId = s.productId " +
	           "WHERE s.transactionType='OUT' GROUP BY p.productId ")
	 public List<ProductSales> getProductWiseTotalSale();
	
	@Query("SELECT s.transactionValue from Transaction s WHERE s.transactionType='OUT' and productId=?1")
	 public List<Double> getDemandByProduct(String productId);
	
}
