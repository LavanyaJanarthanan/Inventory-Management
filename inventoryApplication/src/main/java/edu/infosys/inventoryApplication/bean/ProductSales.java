package edu.infosys.inventoryApplication.bean;

public class ProductSales {
	
	private String productName;
	private Double totalSalesValue;
	
	public ProductSales() {
		super();
		// TODO Auto-generated constructor stub
	}
	public ProductSales(String productName, Double totalSalesValue) {
		super();
		this.productName = productName;
		this.totalSalesValue = totalSalesValue;
	}
	
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public Double getTotalSalesValue() {
		return totalSalesValue;
	}
	public void setTotalSalesValue(Double totalSalesValue) {
		this.totalSalesValue = totalSalesValue;
	}
	
	@Override
	public String toString() {
		return "ProductSales [productName=" + productName + ", totalSalesValue=" + totalSalesValue + "]";
	}
	
	
		
}
