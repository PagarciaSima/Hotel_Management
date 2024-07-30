import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CustomerService } from '../../service/customer.service';
import { UserStorageService } from 'src/app/auth/services/storage/user-storage.service';

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
  isVisibleMiddle = false;
  date: Date[] = [];
  checkInDate: Date;
  checkOutDate: Date;
  id: number;

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

  onChange(result: Date[]){
    if(result.length === 2){
      this.checkInDate = result[0];
      this.checkOutDate = result[1];
    }
  }

  handleCancelMiddle(){
    this.isVisibleMiddle = false;
  }

  handleOkMiddle(): void {
    const obj = {
      userId: UserStorageService.getUserId(),
      roomId: this.id,
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate
    }
    this.customerService.bookRoom(obj).subscribe({
      next: () => {
        this.message.success(`Request submited for approval!`, {nzDuration: 5000});
        this.isVisibleMiddle = false;

      }, error: (error) => {
        this.message.error(`${error.error}`, {nzDuration: 5000})
      }
    })
  }

  showModalMiddle(id: number){
    this.id = id;
    this.isVisibleMiddle = true;
  }


}
