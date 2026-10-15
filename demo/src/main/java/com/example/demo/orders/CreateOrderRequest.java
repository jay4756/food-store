package com.example.demo.orders;

import java.util.List;

public record CreateOrderRequest(String customerName, String deliveryAddress, List<OrderItemRequest> items) {
	public record OrderItemRequest(Long foodItemId, int quantity) {
	}
}