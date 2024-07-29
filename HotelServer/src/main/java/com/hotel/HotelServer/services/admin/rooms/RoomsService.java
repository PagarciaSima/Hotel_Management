package com.hotel.HotelServer.services.admin.rooms;

import com.hotel.HotelServer.dto.RoomDto;
import com.hotel.HotelServer.dto.RoomsResponseDto;

public interface RoomsService {
    boolean postRoom(RoomDto roomDto);

    RoomsResponseDto getAllRooms(int pageNumber);

    RoomDto getRoomById(Long id);

    boolean updateRoom(Long id, RoomDto roomDto);

    public void deleteRoom(Long id);
}
