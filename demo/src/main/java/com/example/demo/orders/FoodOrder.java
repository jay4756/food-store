package com.example.demo.orders;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "food_orders")
@Getter
@Setter
@NoArgsConstructor
public class FoodOrder {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String customerName;
	private String deliveryAddress;
	private double total;
	private Instant createdAt;

	@OneToMany(mappedBy = "foodOrder", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<OrderLine> items = new ArrayList<>();

	public void addItem(OrderLine item) {
		items.add(item);
		item.setFoodOrder(this);
	}
}