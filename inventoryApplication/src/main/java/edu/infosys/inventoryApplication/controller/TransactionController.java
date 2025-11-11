package edu.infosys.inventoryApplication.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.infosys.inventoryApplication.bean.ProductSales;
import edu.infosys.inventoryApplication.bean.Transaction;
import edu.infosys.inventoryApplication.dao.TransactionDao;


@RestController
@RequestMapping("/inventory/")
@CrossOrigin(origins = "http://localhost:3838")
public class TransactionController {
	
	@Autowired
	TransactionDao transactionDao;
	
	@DeleteMapping("/transaction/{id}")
	public void deleteTransaction(@PathVariable Long id) {
		transactionDao.deleteTransactionById(id);
	}
	
	@PostMapping("/transaction/{pid}/{type}")
	public Transaction save(@RequestBody Transaction transaction,@PathVariable String pid,@PathVariable String type) {
		return transactionDao.save(transaction,pid,type);
	}
	
	@GetMapping("/transaction/{id}")
	public Transaction getTransactionById(@PathVariable Long id) {
		return transactionDao.getTransactionById(id);
	}
	
	@GetMapping("/transaction")
	public List<Transaction> showAllTransactions(){
		return transactionDao.getAllTransactions();
	}
	
	@GetMapping("/trans/{type}")
	public List<Transaction> getAllTransactionsByType(@PathVariable String type){
		return transactionDao.findTransactionsByType(type);
	}
	
	
	@GetMapping("/id")
	public Long generateId() {
		return transactionDao.generateId();
	}
	
	@GetMapping("/analysis")
	public Map<String,Double> getProductWiseTotalSale(){
		List<ProductSales> sales= transactionDao.getProductWiseTotalSale();
		Map<String,Double> salesMap=new HashMap<>();
		for(ProductSales p:sales) {
			salesMap.put(p.getProductName(),p.getTotalSalesValue());
		}
		return salesMap;
	}
	
	@GetMapping("/analysis/{id}")
	public List<Double> getDemandByProduct(@PathVariable String id){
		return transactionDao.getDemandByProduct(id);
	}
}
