package edu.infosys.inventoryApplication.dao;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import edu.infosys.inventoryApplication.bean.ProductSales;
import edu.infosys.inventoryApplication.bean.StockTransaction;


@Repository
@Service
public class StockTransactionDaoImpl implements StockTransactionDao {
	
	@Autowired
	private StockTransactionRepository repository;
	
	
	@Override
	public void save(StockTransaction transaction) {
		repository.save(transaction);
		
	}
	
	
	
	@Override
    public StockTransaction findStockTransactionById(Long id) {
    	return repository.findById(id).get();
    	
    }
	
	@Override
    public Long generateId() {
    	Long maxId = repository.findMaxTransactionId();
    	if( maxId==null) {
    		return 1001L;
    	}
    
        return (maxId + 1);
    	
    }
	
	@Override
    public List<StockTransaction> showAllTransaction(){
    	return repository.findAll();
    	
    }
	
	@Override
	public List<StockTransaction> findTransactionsByType(String type){
		return repository.findTransactionsByType(type);
		
	}
	
	@Override
    public void removeTransactionById(Long id) {
    	repository.deleteById(id);
    	
    }
	

	@Override
    public List<ProductSales> getProductWiseTotalSale(){
		return repository.getProductWiseTotalSale();
	}
	
	@Override
    public List<Double> getDemandByProduct(String productId){
    	return repository.getDemandByProduct(productId);
    }


}
