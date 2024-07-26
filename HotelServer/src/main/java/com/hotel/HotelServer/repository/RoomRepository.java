package com.hotel.HotelServer.repository;

import com.hotel.HotelServer.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {
}
