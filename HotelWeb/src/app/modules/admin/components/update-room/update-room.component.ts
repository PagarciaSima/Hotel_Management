import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminService } from '../../admin-services/admin.service';

@Component({
  selector: 'app-update-room',
  templateUrl: './update-room.component.html',
  styleUrls: ['./update-room.component.scss']
})
export class UpdateRoomComponent {

  updateRoomForm: FormGroup;
  id = this.activatedRoute.snapshot.params['id'];

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute
  ){
    this.updateRoomForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', Validators.required]
    });
    this.getRoomById();
  }

  submitForm(){

  }

  getRoomById() {
    this.adminService.getRoomById(this.id).subscribe({
      next: (res) => {
        this.updateRoomForm.patchValue(res);
      }, error: (error) => {
        this.message.error(`${error.error}`, {nzDuration: 5000})
      }
    })
  }
}
