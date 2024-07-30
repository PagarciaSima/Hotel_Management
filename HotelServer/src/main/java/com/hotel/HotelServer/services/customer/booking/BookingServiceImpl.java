package com.hotel.HotelServer.services.customer.booking;

import com.hotel.HotelServer.dto.ReservationDto;
import com.hotel.HotelServer.entity.Reservation;
import com.hotel.HotelServer.entity.Room;
import com.hotel.HotelServer.entity.User;
import com.hotel.HotelServer.enums.ReservationStatus;
import com.hotel.HotelServer.repository.ReservationRepository;
import com.hotel.HotelServer.repository.RoomRepository;
import com.hotel.HotelServer.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService{

    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final ReservationRepository reservationRepository;

    public boolean postReservation(ReservationDto reservationDto){
        Optional<User> optionalUser = userRepository.findById(reservationDto.getUserId());
        Optional<Room> optionalRoom = roomRepository.findById(reservationDto.getRoomId());
        if(optionalRoom.isPresent() && optionalUser.isPresent()){
            Reservation reservation = new Reservation();
            reservation.setRoom(optionalRoom.get());
            reservation.setUser(optionalUser.get());
            reservation.setCheckInDate(reservationDto.getCheckInDate());
            reservation.setCheckOutDate(reservationDto.getCheckOutDate());
            reservation.setReservationStatus(ReservationStatus.PENDING);

            Long days = ChronoUnit.DAYS.between(reservationDto.getCheckInDate(), reservationDto.getCheckOutDate());
            reservation.setPrice(optionalRoom.get().getPrice()*days);

            reservationRepository.save(reservation);
            return true;
        }
        return false;
    }
}
