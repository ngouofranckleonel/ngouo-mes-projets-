import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Globalization } from '@ionic-native/globalization/ngx';

import { IonicModule } from '@ionic/angular';

import { DevicePageRoutingModule } from './device-routing.module';

import { DevicePage } from './device.page';
import { Device } from "@capacitor/device";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevicePageRoutingModule
  ],
  declarations: [DevicePage],
  providers: [Globalization]
})
export class DevicePageModule {}
