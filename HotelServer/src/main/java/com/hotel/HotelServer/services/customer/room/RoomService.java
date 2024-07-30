package com.hotel.HotelServer.services.customer.room;

import com.hotel.HotelServer.dto.RoomsResponseDto;

public interface RoomService {

    public RoomsResponseDto getAvailableRooms(int pageNumber);
}
