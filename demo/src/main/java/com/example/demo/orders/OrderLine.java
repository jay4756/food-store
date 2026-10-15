package com.example.demo.orders;

import com.example.demo.menu.FoodItem;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class OrderLine {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "food_order_id", nullable = false)
	private FoodOrder foodOrder;
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "food_item_id", nullable = false)
	private FoodItem foodItem;
	private int quantity;
	private double unitPrice;

	public OrderLine(FoodItem foodItem, int quantity) {
		this.foodItem = foodItem;
		this.quantity = quantity;
		this.unitPrice = foodItem.getPrice();
	}
}