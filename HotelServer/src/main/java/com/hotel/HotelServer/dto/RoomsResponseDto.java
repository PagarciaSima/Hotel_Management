package com.hotel.HotelServer.dto;

import lombok.Data;

import java.util.List;

@Data
public class RoomsResponseDto {

    private List<RoomDto> roomDtoList;

    private Integer totalPages;

    private Integer pageNumber;
}
