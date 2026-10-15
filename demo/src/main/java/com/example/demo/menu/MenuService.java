package com.example.demo.menu;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class MenuService {
	private final FoodItemRepository foodItemRepository;

	public MenuService(FoodItemRepository foodItemRepository) {
		this.foodItemRepository = foodItemRepository;
	}

	public List<FoodItem> getMenu() {
		return foodItemRepository.findAllByOrderByIdAsc();
	}
}