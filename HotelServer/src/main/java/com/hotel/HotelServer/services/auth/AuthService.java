package com.hotel.HotelServer.services.auth;

import com.hotel.HotelServer.dto.SignupRequest;
import com.hotel.HotelServer.dto.UserDto;

public interface AuthService {
    public UserDto createUSer(SignupRequest signupRequest);

}
