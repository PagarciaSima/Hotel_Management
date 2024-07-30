import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent {
  currentPage = 1;
  rooms = [];
  total: any;
  loading = false;

  constructor(
    private customerService: CustomerService,
    private message: NzMessageService,
    private modalService: NzModalService
  ){}

  ngOnInit(): void {
    this.getRooms();
  }

  getRooms(){
    this.customerService.getRooms(this.currentPage -1).subscribe({
      next: (res) => {
        console.log(res);
        this.rooms = res.roomDtoList;
        this.total = res.totalPages * 1;
      }
    })
  }

  pageIndexChange(value: any) {
    this.currentPage = value;
    this.getRooms();
  }
}
