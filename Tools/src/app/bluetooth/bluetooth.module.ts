import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BLE } from '@ionic-native/ble/ngx';

import { IonicModule } from '@ionic/angular';

import { BluetoothPageRoutingModule } from './bluetooth-routing.module';

import { BluetoothPage } from './bluetooth.page';
// import { Device } from '@capacitor/device';
import { File } from '@ionic-native/file/ngx';
// import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
// import { BluetoothLE } from '@ionic-native/bluetooth-le/ngx';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BluetoothPageRoutingModule
  ],
  declarations: [BluetoothPage],
  providers: [BLE]
})
export class BluetoothPageModule {}
