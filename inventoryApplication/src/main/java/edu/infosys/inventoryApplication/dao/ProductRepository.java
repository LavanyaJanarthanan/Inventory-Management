package edu.infosys.inventoryApplication.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.infosys.inventoryApplication.bean.Product;

public interface ProductRepository extends JpaRepository<Product,String>{
	
	@Query("select max(p.productId) from Product p")
	public String findMaxProductId();
	
	@Query("select p.reorderLevel from Product p where p.productId=?1")
	public Double findReorderLevelByProductId(String id);
}