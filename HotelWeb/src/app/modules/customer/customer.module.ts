import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { DemoNgZorroAntdModuleTsModule } from 'src/app/demo-ng-zorro-antd-module.ts.module';


@NgModule({
  declarations: [
    CustomerComponent,
    RoomsComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    DemoNgZorroAntdModuleTsModule
  ]
})
export class CustomerModule { }
