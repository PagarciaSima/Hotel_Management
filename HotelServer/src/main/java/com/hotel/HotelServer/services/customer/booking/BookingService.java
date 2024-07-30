package com.hotel.HotelServer.services.customer.booking;

import com.hotel.HotelServer.dto.ReservationDto;

public interface BookingService {
     boolean postReservation(ReservationDto reservationDto);

}
