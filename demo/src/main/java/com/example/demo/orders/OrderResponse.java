package com.example.demo.orders;

import java.time.Instant;

public record OrderResponse(Long id, String customerName, double total, Instant createdAt) {
}