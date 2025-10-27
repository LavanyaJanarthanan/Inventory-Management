package edu.infosys.inventoryApplication.dao;

import java.util.List;
import edu.infosys.inventoryApplication.bean.StockTransaction;
import edu.infosys.inventoryApplication.bean.ProductSales;
public interface StockTransactionDao {
	
    public void save(StockTransaction transaction);
    public StockTransaction findStockTransactionById(Long id);
    public Long generateId();
    public List<StockTransaction> showAllTransaction();
    public List<StockTransaction> findTransactionsByType(String type);
    public void removeTransactionById(Long id);
    public List<ProductSales> getProductWiseTotalSale();
    public List<Double> getDemandByProduct(String productId);



}
