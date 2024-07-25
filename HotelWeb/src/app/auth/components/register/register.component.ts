import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, Validators.required],
      name: [null, Validators.required]
    })
  }

  submitForm() {
    this.authService.register(this.registerForm.value).subscribe( res => {
      if(res.id != null) {
        this.message.success("Signup successful", {nzDuration: 5000});
        this.router.navigateByUrl("/");
      } else {
        this.message.error(`${res.message}`, {nzDuration: 5000});

      }
    })
  }
}
