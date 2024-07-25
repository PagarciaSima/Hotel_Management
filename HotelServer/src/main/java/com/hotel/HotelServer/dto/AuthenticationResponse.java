package com.hotel.HotelServer.dto;

import com.hotel.HotelServer.enums.UserRole;
import lombok.Data;

@Data
public class AuthenticationResponse {
    private String jwt;
    private Long userId;
    private UserRole userRole;
}
