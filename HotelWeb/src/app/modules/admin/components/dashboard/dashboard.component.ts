import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin-services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  currentPage = 1;
  rooms = [];

  constructor(
    private adminService: AdminService,
    private message: NzMessageService
  ){}

  ngOnInit(): void {
    this.getRooms();
  }

  getRooms(){
    this.adminService.getRooms(this.currentPage -1).subscribe({
      next: (res) => {
        console.log(res);
        this.rooms = res;
      }
    })
  }
}
