package com.hotel.HotelServer.services.admin.rooms;

import com.hotel.HotelServer.dto.RoomDto;
import com.hotel.HotelServer.entity.Room;
import com.hotel.HotelServer.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoomsServiceImpl implements RoomsService{

    private final RoomRepository roomRepository;

    public boolean postRoom(RoomDto roomDto){
        try{
            Room room = new Room();
            room.setName(roomDto.getName());
            room.setPrice(roomDto.getPrice());
            room.setType(roomDto.getType());
            room.setAvailable(true);
            roomRepository.save(room);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
