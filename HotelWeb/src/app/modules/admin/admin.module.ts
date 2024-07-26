import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostRoomComponent } from './components/post-room/post-room.component';
import { DemoNgZorroAntdModuleTsModule } from 'src/app/demo-ng-zorro-antd-module.ts.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    PostRoomComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DemoNgZorroAntdModuleTsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
