package edu.infosys.inventoryApplication.controller;

import java.util.List;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import edu.infosys.inventoryApplication.bean.StockTransaction;
import edu.infosys.inventoryApplication.dao.StockTransactionDao;
import edu.infosys.inventoryApplication.bean.ProductSales;
import org.springframework.*;
@RestController
@RequestMapping("/inventory")
@CrossOrigin(origins="http://localhost:3838")
public class StockTransactionController {

    @Autowired
    private StockTransactionDao transactionDao;
    
    @Autowired
	private JdbcTemplate jdbcTemplate;


    
    @PostMapping("/transaction")
    public void saveTransaction(@RequestBody StockTransaction t) {
    	System.out.println("Saving transaction: " + t);

        transactionDao.save(t);
        }

    
    @GetMapping("/transaction")
    public List<StockTransaction> getAllTransactions() {
        return transactionDao.showAllTransaction();
    }

    
    @GetMapping("/transaction/{id}")
    public StockTransaction getTransactionById(@PathVariable Long id) {
        return transactionDao.findStockTransactionById(id);
    }

    @GetMapping("/transaction/type/{type}")
    public List<StockTransaction> getTransactionsByType(@PathVariable String type) {
        return transactionDao.findTransactionsByType(type);
    }

    
    @DeleteMapping("/transaction/{id}")
    public void deleteTransaction(@PathVariable Long id) {
        transactionDao.removeTransactionById(id);
        
    }

    @GetMapping("/trans")
	public Long generateId() {
	  return transactionDao.generateId();
	  
	}
    
    @GetMapping("/analysis")
    public Map<String,Double> getProductWiseTotalSale(){
    	List<ProductSales> salesList=transactionDao.getProductWiseTotalSale();
    	Map<String,Double> salesMap=new HashMap<String,Double>();
    	for(ProductSales ps:salesList) {
    		salesMap.put(ps.getProductName(), ps.getTotalSalesValue());
    	}
    	return salesMap;
    }
    
    @GetMapping("/salesByDate")
    public Map<String, Double> getSalesByDate() {
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(
            "SELECT transaction_date, SUM(transaction_value) AS totalSales " +
            "FROM stock_transaction " +
            "WHERE transaction_type = 'OUT' " +
            "GROUP BY transaction_date " +
            "ORDER BY transaction_date"
        );

        Map<String, Double> result = new LinkedHashMap<>();
        for (Map<String, Object> row : rows) {
            String date = (String) row.get("transaction_date");
            Double totalSales = ((Number) row.get("totalSales")).doubleValue();
            result.put(date, totalSales);
        }

        return result;
    }
    
    @GetMapping("/transaction/analysisByType")
    public Map<String, Map<String, Double>> getTransactionAnalysisByType() {
        List<StockTransaction> transactions = transactionDao.showAllTransaction();
        Map<String, Map<String, Double>> result = new HashMap<>();

        for (StockTransaction t : transactions) {
            String productId = t.getProductId();
            String type = t.getTransactionType(); // IN or OUT
            double value = t.getTransactionValue();

            result.putIfAbsent(productId, new HashMap<>());
            Map<String, Double> typeMap = result.get(productId);
            typeMap.put(type, typeMap.getOrDefault(type, 0.0) + value);
        }

        return result;
    }


    @GetMapping("/analysis/{id}")
    public List<Double> getDemandByProduct(@PathVariable String id){
    	return transactionDao.getDemandByProduct(id);
    }
    
    @GetMapping("/transaction/report/in")
    public List<StockTransaction> getInTransactionsReport() {
        return transactionDao.findTransactionsByType("IN");
    }

    @GetMapping("/transaction/report/out")
    public List<StockTransaction> getOutTransactionsReport() {
        return transactionDao.findTransactionsByType("OUT");
    }

    }

    
   
    

