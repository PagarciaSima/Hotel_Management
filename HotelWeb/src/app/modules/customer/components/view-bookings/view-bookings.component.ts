import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-view-bookings',
  templateUrl: './view-bookings.component.html',
  styleUrls: ['./view-bookings.component.scss']
})
export class ViewBookingsComponent implements OnInit{

  currentPage: any = 1;
  total: any;
  bookings: any;

  constructor(
    private customerService: CustomerService,
    private message: NzMessageService
  ){

  }

  ngOnInit(): void {
    this.getBookings();
  }

  getBookings() {
    this.customerService.getMyBookings(this.currentPage - 1).subscribe({
      next:(res) => {
        console.log(res);
        this.bookings = res.reservationDtoList;
        this.total = res.totalPages*5;
      }, error: (error) => {
        this.message.error(`${error.error}`, {nzDuration: 5000})
      }
    })
  }

  pageIndexChange(value: any){
    this.currentPage = value;
    this.getBookings();
  }
}
