package com.hotel.HotelServer.services.customer.booking;

import com.hotel.HotelServer.dto.ReservationDto;
import com.hotel.HotelServer.dto.ReservationResponseDto;

public interface BookingService {
     boolean postReservation(ReservationDto reservationDto);

     ReservationResponseDto getAllReservationByUserId(Long userId, int pageNumber);
}