package edu.infosys.inventoryApplication.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import edu.infosys.inventoryApplication.bean.ProductSales;
import edu.infosys.inventoryApplication.bean.Transaction;
import edu.infosys.inventoryApplication.service.TransactionService;

@Repository
@Service
public class TransactionDaoImpl implements TransactionDao{
	
	@Autowired
	TransactionRepository repository;
	
	@Autowired
	TransactionService service;
	
	@Override
	public Transaction save(Transaction transaction,String pid,String type) {
		Transaction finalTransaction=service.setTransactionValue(transaction,pid,type);
		repository.save(transaction);
		return finalTransaction;
	}

	@Override
	public List<Transaction> getAllTransactions() {
		return repository.findAll();
	}

	@Override
	public Long generateId() {
		Long id=repository.findMaxId();
		if(id==null) {
			id=100001L;
		}
		else {
			id++;
		}
		return id;
	}

	@Override
	public Transaction getTransactionById(Long id) {
		return repository.findById(id).get();
	}

	@Override
	public List<Transaction> findTransactionsByType(String type) {
		return repository.findTransactionByTransactionType(type);
	}

	@Override
	public void deleteTransactionById(Long id) {
		repository.deleteById(id);
	}

	@Override
	public List<ProductSales> getProductWiseTotalSale() {
		return repository.getProductWiseTotalSale();
	}

	@Override
	public List<Double> getDemandByProduct(String productId) {
		return repository.getDemandByProduct(productId);
	}

	
}
