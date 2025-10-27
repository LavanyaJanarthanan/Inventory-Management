package edu.infosys.inventoryApplication.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.infosys.inventoryApplication.bean.StockTransaction;
import edu.infosys.inventoryApplication.bean.ProductSales;
import edu.infosys.inventoryApplication.bean.Product;

public interface StockTransactionRepository extends JpaRepository<StockTransaction, Long> {
    
    @Query("SELECT a FROM StockTransaction a WHERE a.transactionType = ?1")
    public List<StockTransaction> findTransactionsByType(String type);
    
    @Query("SELECT MAX(a.transactionId) FROM StockTransaction a")
    public Long findMaxTransactionId();

    @Query("SELECT new edu.infosys.inventoryApplication.bean.ProductSales(p.productName, SUM(s.transactionValue)) " +
           "FROM Product p JOIN StockTransaction s ON p.productId = s.productId " +
           "WHERE s.transactionType = 'OUT' " +
           "GROUP BY p.productId, p.productName")
    public List<ProductSales> getProductWiseTotalSale();
    
    @Query("SELECT s.transactionValue FROM StockTransaction s " +"WHERE s.transactionType = 'OUT' AND s.productId = ?1")
    public List<Double> getDemandByProduct(String productId);
}

