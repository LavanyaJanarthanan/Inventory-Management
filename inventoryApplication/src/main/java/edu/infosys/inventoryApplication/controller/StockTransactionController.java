package edu.infosys.inventoryApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import edu.infosys.inventoryApplication.bean.StockTransaction;
import edu.infosys.inventoryApplication.dao.StockTransactionDao;
import edu.infosys.inventoryApplication.bean.ProductSales;

@RestController
@RequestMapping("/inventory")
@CrossOrigin(origins="http://localhost:3838")
public class StockTransactionController {

    @Autowired
    private StockTransactionDao transactionDao;

    
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
    public List<ProductSales> getProductWiseTotalSale(){
    	return transactionDao.getProductWiseTotalSale();
    }
    
    @GetMapping("/analysis/{id}")
    public List<Double> getDemandByProduct(@PathVariable String id){
    	return transactionDao.getDemandByProduct(id);
    }
    
    
   
    
}
