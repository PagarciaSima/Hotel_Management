import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin-services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  currentPage = 1;
  rooms = [];
  total: any;
  loading = false;

  constructor(
    private adminService: AdminService,
    private message: NzMessageService,
    private modalService: NzModalService
  ){}

  ngOnInit(): void {
    this.getRooms();
  }

  getRooms(){
    this.adminService.getRooms(this.currentPage -1).subscribe({
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

  showConfirm(roomId: number) {
    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Do you want to delete this room?',
      nzOkText: 'Delete',
      nzCancelText: 'Cancel',
      nzOnOk: () => this.deleteRoom(roomId)
    })
  }

  deleteRoom(roomId: number) {
    this.adminService.deleteRoom(roomId).subscribe({
      next: () => {
        this.message.success(`Room deleted successfully`, {nzDuration: 5000});
        this.getRooms();
      }, error: (error) => {
        this.message.error(`${error.error}`, {nzDuration: 5000});

      }
    })
  }
}
