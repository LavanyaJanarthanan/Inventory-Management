package edu.infosys.inventoryApplication.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

import edu.infosys.inventoryApplication.bean.InventoryUser;

public interface InventoryUserRepository extends JpaRepository<InventoryUser, String> {
	
	@Query("select username from InventoryUser where role=?1")
    public List<String> getUsersByRole(String role);


}
