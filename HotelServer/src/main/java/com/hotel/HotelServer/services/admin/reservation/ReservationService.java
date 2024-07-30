package com.hotel.HotelServer.services.admin.reservation;

import com.hotel.HotelServer.dto.ReservationResponseDto;

public interface ReservationService {
    ReservationResponseDto getAllReservations(int pageNumber);

}
