package edu.infosys.inventoryApplication.dao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

import edu.infosys.inventoryApplication.bean.SKU;


public interface SKURepository extends JpaRepository<SKU,String> {
	@Query("select skuId from SKU")
	public List<String> getSkuList();
	
	

}
