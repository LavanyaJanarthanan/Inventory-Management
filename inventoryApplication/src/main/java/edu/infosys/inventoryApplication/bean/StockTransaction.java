package edu.infosys.inventoryApplication.bean;

import jakarta.persistence.Entity;

import jakarta.persistence.Id;

@Entity
public class StockTransaction {
	
@Id
private long transactionId;
	private String transactionType;
	private String productId;
	private Double quantity;
	private Double rate;
	private Double transactionValue;
	private String userId;
	private String transactionDate;
	
	public StockTransaction() {
		super();
	}
		
	
	
	public StockTransaction(Long transactionId, String transactionType, String productId, Double quantity, Double rate, Double transactionValue,String userId, String transactionDate) {
	this.transactionId=transactionId;
	this.transactionType=transactionType;
	this.productId=productId;
	this.rate=rate;
	this.quantity=quantity;
	this.transactionValue=transactionValue;
	this.userId=userId;
	this.transactionDate=transactionDate;
}



	public Long getTransactionId() {
		return transactionId;
	}



	public void setTransactionId(Long transactionId) {
		this.transactionId = transactionId;
	}
	
		public String getTransactionType() {
		return transactionType;
	}



	public void setTransactionType(String transactionType) {
		this.transactionType = transactionType;
	}



	public String getProductId() {
		return productId;
	}



	public void setProductId(String productId) {
		this.productId = productId;
	}



	public Double getQuantity() {
		return quantity;
	}



	public void setQuantity(Double quantity) {
		this.quantity = quantity;
	}
	
	



	public Double getRate() {
		return rate;
	}



	public void setRate(Double rate) {
		this.rate = rate;
	}



	public Double getTransactionValue() {
		return transactionValue;
	}



	public void setTransactionValue(Double transactionValue) {
		this.transactionValue = transactionValue;
	}



	public String getUserId() {
		return userId;
	}



	public void setUserId(String userId) {
		this.userId = userId;
	}



	public String getTransactionDate() {
		return transactionDate;
	}



	public void setTransactionDate(String transactionDate) {
		this.transactionDate = transactionDate;
	}
	
	
	
}