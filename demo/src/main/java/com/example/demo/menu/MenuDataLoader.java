package com.example.demo.menu;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MenuDataLoader {
	@Bean
	CommandLineRunner loadMenu(FoodItemRepository repository) {
		return args -> {
			if (repository.count() > 0) {
				return;
			}

			repository.saveAll(List.of(
				FoodItem.builder().name("The Good Burger").description("Aged cheddar, house sauce, crisp lettuce").category("Burgers").price(12.50).imageUrl("https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85").rating(4.9).prepTime(20).popular(true).build(),
				FoodItem.builder().name("Truffle Mushroom Melt").description("Roasted mushrooms, truffle aioli, swiss").category("Burgers").price(14.00).imageUrl("https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=85").rating(4.8).prepTime(25).popular(false).build(),
				FoodItem.builder().name("Garden Glow Bowl").description("Avocado, quinoa, greens, lemon tahini").category("Healthy").price(13.25).imageUrl("https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85").rating(4.9).prepTime(15).popular(true).build(),
				FoodItem.builder().name("Sunday Margherita").description("San Marzano tomato, basil, fior di latte").category("Pizza").price(15.00).imageUrl("https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85").rating(4.8).prepTime(25).popular(true).build(),
				FoodItem.builder().name("Golden Hour Fries").description("Sea salt, rosemary, parmesan dust").category("Sides").price(6.00).imageUrl("https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85").rating(4.6).prepTime(12).popular(false).build(),
				FoodItem.builder().name("Strawberry Cloud Cake").description("Vanilla sponge, fresh berries, soft cream").category("Dessert").price(8.50).imageUrl("https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=900&q=85").rating(4.9).prepTime(5).popular(true).build(),
				FoodItem.builder().name("Peach Iced Tea").description("Brewed tea, ripe peach, a little sunshine").category("Drinks").price(4.50).imageUrl("https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=85").rating(4.7).prepTime(3).popular(false).build()
			));
		};
	}
}