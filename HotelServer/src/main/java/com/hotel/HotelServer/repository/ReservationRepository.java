package com.hotel.HotelServer.repository;

import com.hotel.HotelServer.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
}
