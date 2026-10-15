package com.example.demo;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(properties = {
	"spring.datasource.url=jdbc:h2:mem:quickbite-test;DB_CLOSE_DELAY=-1",
	"spring.datasource.driver-class-name=org.h2.Driver",
	"spring.datasource.username=sa",
	"spring.datasource.password="
})
@AutoConfigureMockMvc
class DemoApplicationTests {
	@Autowired
	private MockMvc mockMvc;

	@Test
	void menuEndpointReturnsSeededItems() throws Exception {
		mockMvc.perform(get("/api/menu"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.length()").value(7));
	}

	@Test
	void orderEndpointPersistsAnOrder() throws Exception {
		mockMvc.perform(post("/api/orders")
					.contentType("application/json")
					.content("""
						{
						  "customerName": "Casey",
						  "deliveryAddress": "42 Market Street",
						  "items": [{ "foodItemId": 1, "quantity": 2 }]
						}
						"""))
				.andExpect(status().isCreated())
				.andExpect(jsonPath("$.id").isNumber())
				.andExpect(jsonPath("$.total").value(25.0));
	}

}
