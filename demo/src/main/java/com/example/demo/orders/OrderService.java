package com.example.demo.orders;

import java.time.Instant;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.menu.FoodItem;
import com.example.demo.menu.FoodItemRepository;

@Service
public class OrderService {
	private final FoodOrderRepository orderRepository;
	private final FoodItemRepository foodItemRepository;

	public OrderService(FoodOrderRepository orderRepository, FoodItemRepository foodItemRepository) {
		this.orderRepository = orderRepository;
		this.foodItemRepository = foodItemRepository;
	}

	@Transactional
	public OrderResponse placeOrder(CreateOrderRequest request) {
		validateRequest(request);

		FoodOrder order = createOrder(request);
		addRequestedItems(order, request.items());
		order.setTotal(calculateTotal(order.getItems()));

		FoodOrder savedOrder = orderRepository.save(order);
		return createResponse(savedOrder);
	}

	private void validateRequest(CreateOrderRequest request) {
		if (request == null
				|| request.customerName() == null || request.customerName().isBlank()
				|| request.deliveryAddress() == null || request.deliveryAddress().isBlank()
				|| request.items() == null || request.items().isEmpty()) {
			throw new IllegalArgumentException("Name, delivery address, and at least one item are required.");
		}
	}

	private FoodOrder createOrder(CreateOrderRequest request) {
		FoodOrder order = new FoodOrder();
		order.setCustomerName(request.customerName().trim());
		order.setDeliveryAddress(request.deliveryAddress().trim());
		order.setCreatedAt(Instant.now());
		return order;
	}

	private void addRequestedItems(FoodOrder order, List<CreateOrderRequest.OrderItemRequest> requestedItems) {
		for (CreateOrderRequest.OrderItemRequest requestedItem : requestedItems) {
			if (requestedItem == null || requestedItem.foodItemId() == null) {
				throw new IllegalArgumentException("Each order item must include a menu item.");
			}
			validateQuantity(requestedItem.quantity());

			FoodItem foodItem = findFoodItem(requestedItem.foodItemId());
			order.addItem(new OrderLine(foodItem, requestedItem.quantity()));
		}
	}

	private void validateQuantity(int quantity) {
		if (quantity < 1 || quantity > 50) {
			throw new IllegalArgumentException("Item quantity must be between 1 and 50.");
		}
	}

	private FoodItem findFoodItem(Long foodItemId) {
		return foodItemRepository.findById(foodItemId)
				.orElseThrow(() -> new IllegalArgumentException("A selected menu item was not found."));
	}

	private double calculateTotal(List<OrderLine> orderItems) {
		double total = 0;
		for (OrderLine item : orderItems) {
			total += item.getUnitPrice() * item.getQuantity();
		}
		return Math.round(total * 100.0) / 100.0;
	}

	private OrderResponse createResponse(FoodOrder order) {
		return new OrderResponse(order.getId(), order.getCustomerName(), order.getTotal(), order.getCreatedAt());
	}
}