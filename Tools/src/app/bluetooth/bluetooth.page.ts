import { BLE } from '@ionic-native/ble/ngx';
import { Component } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-bluetooth',
  templateUrl: './bluetooth.page.html',
  styleUrls: ['./bluetooth.page.scss'],
})
export class BluetoothPage {

  devices: any[] = [];
  connectedDevice: any = null;
  searching: boolean = false;
  message: string = "";
  data: string = "";

  constructor(private ble: BLE, private toastCtrl: ToastController, private loadingCtrl: LoadingController) { }

  async scan() {
    this.searching = true;
    this.devices = [];

    const loading = await this.loadingCtrl.create({
      message: 'Searching for devices...',
      spinner: 'circles'
    });

    await loading.present();

    this.ble.scan([], 5).subscribe(device => {
      if (!this.devices.some((existingDevice) => existingDevice.id === device.id))
        this.devices.push(device);
    });

    setTimeout(() => {
      this.searching = false;
      loading.dismiss();
    }, 5000);
  }

  async connect(device:any) {
    const loading = await this.loadingCtrl.create({
      message: 'Connecting to ' + device.name + '...',
      spinner: 'circles'
    });

    await loading.present();

    this.ble.connect(device.id).subscribe(
      (peripheral) => {
        this.connectedDevice = peripheral;
        loading.dismiss();
        this.showToast("Connected to " + peripheral.name);
      },
      (error) => {
        this.showToast("Error connecting to device");
        loading.dismiss();
      }
    );
  }

  async disconnect() {
    const loading = await this.loadingCtrl.create({
      message: 'Disconnecting from ' + this.connectedDevice.name + '...',
      spinner: 'circles'
    });

    await loading.present();

    this.ble.disconnect(this.connectedDevice.id).then(() => {
      this.connectedDevice = null;
      loading.dismiss();
      this.showToast("Disconnected from device");
    }).catch((error) => {
      this.showToast("Error disconnecting from device");
      loading.dismiss();
    });
  }

  stringToArrayBuffer(str:string) {
    var buf = new ArrayBuffer(str.length*2); // 2 octets pour chaque caractère
    var bufView = new Uint16Array(buf);
    for (var i=0, strLen=str.length; i<strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }
  async send(data:string) {
    const loading = await this.loadingCtrl.create({
      message: 'Sending data to ' + this.connectedDevice.name + '...',
      spinner: 'circles'
    });

    await loading.present();

    let encodedData = btoa(data);
    let encodedDataArrayBuffer = this.stringToArrayBuffer(encodedData);

    this.ble.write(this.connectedDevice.id, "FFE0", "FFE1", encodedDataArrayBuffer).then(() => {
      this.message = "Sent data successfully";
      loading.dismiss();
    }).catch((error) => {
      this.showToast("Error sending data");
      loading.dismiss();
    });
  }
  

  async showToast(message:string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000
    });

    toast.present();
  }

}

