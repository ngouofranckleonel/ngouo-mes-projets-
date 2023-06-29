import { Component } from '@angular/core';
import { Device } from "@capacitor/device";
// import { App } from '@capacitor/app';
import { Globalization, GlobalizationOptions } from '@ionic-native/globalization/ngx';
// import { Storage } from '@ionic/storage';
import { Plugins } from '@capacitor/core';


const { Modals, Battery } = Plugins;

@Component({
  selector: 'app-device',
  templateUrl: 'device.page.html',
  styleUrls: ['device.page.scss']
})
export class DevicePage {
  deviceName!: string;
  deviceModel!: string;
  osVersion!: string;
  platform!: string;
  manufacturer!: string;
  chargingStatus!: string;
  deviceInfo: any;
  batteryLevel!: number;
  memUsed!: number;
  realDiskFree!: number;
  realDiskTotal!: number;
  memoireOC!:number;
  language!: string ;
  serialNumber!: string;
  constructor( private globalization: Globalization) { }

  async ionViewDidEnter() {
    // Récupérer les informations sur le disposition
    try {
      const info = await Device.getInfo();
      this.deviceName = info.name || 'Unknown';
      this.deviceModel = info.model;
      this.osVersion = `${info.platform} ${info.osVersion}`;
      this.platform = info.platform;
      this.manufacturer = info.manufacturer;
      this.language = navigator.language;
      if (info.memUsed !== undefined) {
        this.memUsed = info.memUsed/(1024*1024);
      }

      if (info.realDiskFree !== undefined) {
        this.realDiskFree = info.realDiskFree/(1024*1024*2024);
      }
      if (info.realDiskTotal !== undefined) {
        this.realDiskTotal = info.realDiskTotal/(1024*1024*2024);
      }

      this.memoireOC = this.realDiskTotal - this.realDiskFree/(1024*1024*2024);



      // this.usedMemory = info.memory.used;
      // this.totalMemory = info.memory.total;
      // this.freeMemory = this.totalMemory - this.usedMemory;

    } catch (err) {
      console.error('Erreur lors de la récupération des informations sur le dispositif :', JSON.stringify(err));
    }

    // Récupérer le niveau de la batterie
    try {
      const batteryInfo = await Device.getBatteryInfo();
      if (batteryInfo.batteryLevel !== undefined) {
        this.batteryLevel = batteryInfo.batteryLevel * 100;
      }
      this.chargingStatus = batteryInfo.isCharging ? "Charging" : "Not Charging";
    } catch (err) {
      console.error('Erreur lors de la récupération du niveau de la batterie :', JSON.stringify(err));
    }
  }


  // async getMemoryUsage() {
  //   try {
  //     const usage = await this.memoryUsage.getMemoryUsage();
  //     const info = {
  //       totalMemory: usage.totalMemory,
  //       availableMemory: usage.availableMemory,
  //       deviceMemory: this.device.memory,
  //       isLowMemory: usage.isLowMemory
  //     };
  //     console.log(info);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

}





// import { Component } from '@angular/core';
// import {  Device } from "@capacitor/device";
// import { Device } from '@ionic-native/device/ngx';
// import { Globalization, GlobalizationOptions } from '@ionic-native/globalization/ngx';
// import { Storage } from '@ionic/storage';

// const {  Modals } = Plugins;

// import { Plugins } from '@capacitor/core';
// const { Battery } = Plugins;
// @Component({
//   selector: 'app-device',
//   templateUrl: 'device.page.html',
//   styleUrls: ['device.page.scss'],
// })
// export class DevicePage {
//   deviceName!: string;
//   deviceModel!: string;
//   osVersion!: string;
//   platform!:string;
//   manufacturer!: string;
//   chargingStatus!: string;
//   deviceInfo: any;
//   batteryLevel!: number;
//   // usedMemory!: number;
//   // freeMemory!: number;
//   // totalMemory!: number;
//   memory!: any;
//   language!: any;
//   serialNumber!:string;
//   constructor(
//     private device: Device,
//     private globalization: Globalization
//   ) { }
//   async ionViewDidEnter() {


//     // Récupérer les informations sur le disposition
//     try {
//       const info = await Device.getInfo();
//        this.deviceName = info.name|| 'Unknown';
//       this.deviceModel = info.model;
//       this.osVersion = `${info.platform} ${info.osVersion}`;
//        this.platform = info.platform;
//        this.manufacturer = info.manufacturer;

//        this.memory = {
//         total: this.device.getTotalMemory(),
//         available: this.device.getAvailableMemory(),
//         isVirtual: this.device.isVirtual()
//       };

//       // Get system language
//       const options: GlobalizationOptions = {
//         formatLength: 'short',
//         selector: 'language'
//       };

//       this.globalization.getLocaleName(options)
//         .then(res => this.language = res.value)
//         .catch(err => console.log(err));

//       //  this.usedMemory = this.device.memory.used;
//       // this.freeMemory = this.device.memory.free;
//       // this.totalMemory = this.device.memory.total;
//       // this.language = navigator.language;
//       // this.serialNumber = info.serial||'Unknown';

//    } catch (err) {
//       console.error('Erreur lors de la récupération des informations sur le dispositif :', JSON.stringify(err));
//     }

//     // Récupérer le niveau de la batterie



//     try {
//       const batteryInfo = await Device.getBatteryInfo();
//       if (batteryInfo.batteryLevel !== undefined) {
//         this.batteryLevel = batteryInfo.batteryLevel*100;
//       }
//       this.chargingStatus = batteryInfo.isCharging ? "Charging" : "Not Charging";
//     } catch (err) {
//       console.error('Erreur lors de la récupération du niveau de la batterie :', JSON.stringify(err));

//     }


//   }


//     }





























// import { Component } from '@angular/core';
// import { Plugins } from '@capacitor/core';

// const { Device, Modals } = Plugins;

// @Component({
//   selector: 'app-device',
//   templateUrl: 'device.page.html',
//   styleUrls: ['device.page.scss'],
// })
// export class DevicePage {
//   deviceName!: string;
//   cordovaVersion!: string;
//   osVersion!: string;
//   serialNumber!: string;
//   phoneNumber!: string;

//   constructor() {}

//   async ionViewDidEnter() {
//     // Récupérer les informations sur le dispositif
//     try {
//       const info = await Device['getInfo']();
//       this.deviceName = info.model;
//       console.log('Nom du dispositif :', this.deviceName);

//       this.cordovaVersion = info.appVersion;
//       console.log('Version du Cordova :', this.cordovaVersion);

//       this.osVersion = `${info.platform} ${info.osVersion}`;
//       console.log('Version du système :', this.osVersion);

//       this.serialNumber = info.serial;
//       console.log('Numéro de série :', this.serialNumber);
//     } catch (err) {
//       console.error('Erreur lors de la récupération des informations sur le dispositif :', JSON.stringify(err));
//       await Modals['alert']({
//         title: 'Erreur',
//         message: 'Impossible de récupérer les informations sur le dispositif.',
//       });
//     }

//     // Récupérer le numéro de téléphone
//     try {
//       const { phoneNumber } = await Device['getSimInfo']();
//       this.phoneNumber = phoneNumber;
//       console.log('Numéro de téléphone :', this.phoneNumber);
//     } catch (err) {
//       console.error('Erreur lors de la récupération du numéro de téléphone :', JSON.stringify(err));
//       await Modals['alert']({
//         title: 'Erreur',
//         message: 'Impossible de récupérer le numéro de téléphone.',
//       });
//     }
//   }
// }



// import { Component } from '@angular/core';
// import { Plugins } from '@capacitor/core';


// const { Device, Modals } = Plugins;

// @Component({
//   selector: 'app-device',
//   templateUrl: 'device.page.html',
//   styleUrls: ['device.page.scss'],
// })
// export class DevicePage {

//   deviceName!: string;
//   cordovaVersion!: string;
//   osVersion!: string;
//   serialNumber!: string;
//   phoneNumber!: string;

//   constructor() {}

//   async ionViewDidEnter() {
//     // Récupérer les informations sur le dispositif
//     try {
//       const info = await Device.getInfo();
//       this.deviceName = info.model;
//       console.log('Nom du dispositif :', this.deviceName);

//       this.cordovaVersion = info.appVersion;
//       console.log('Version du Cordova :', this.cordovaVersion);

//       this.osVersion = `${info.platform} ${info.osVersion}`;
//       console.log('Version du système :', this.osVersion);

//       this.serialNumber = info.serial;
//       console.log('Numéro de série :', this.serialNumber);
//     } catch (err) {
//       console.error('Erreur lors de la récupération des informations sur le dispositif :', JSON.stringify(err));
//       await Modals.alert({
//         title: 'Erreur',
//         message: 'Impossible de récupérer les informations sur le dispositif.',
//       });
//     }

//     // Récupérer le numéro de téléphone
//     try {
//       const { phoneNumber } = await Device.getSimInfo();
//       this.phoneNumber = phoneNumber;
//       console.log('Numéro de téléphone :', this.phoneNumber);
//     } catch (err) {
//       console.error('Erreur lors de la récupération du numéro de téléphone :', JSON.stringify(err));
//       await Modals.alert({
//         title: 'Erreur',
//         message: 'Impossible de récupérer le numéro de téléphone.',
//       });
//     }
//   }

// }


// import { Component } from "@angular/core";
// import { Device } from "@capacitor/device";
// import { Plugins } from '@capacitor/core';
// const { Battery } = Plugins;
// @Component({
//   selector: "app-device",
//   templateUrl: "./device.page.html",
//   styleUrls: ["./device.page.scss"],
// })
// export class DevicePage {
//   osVersion!: string;
//   platform!: string;
//   manufacturer!: string;
//   model!: string;
//   batteryLevel!: string;
//   chargingStatus!: string;

//   constructor() {}

//   async ionViewDidEnter() {
//     const info = await Device.getInfo();
//     this.osVersion = info.osVersion;
//     this.platform = info.platform;
//     this.manufacturer = info.manufacturer;
//     this.model = info.model;

//     const batteryInfo = await Battery["getBatteryInfo"]();
//     this.batteryLevel = batteryInfo.batteryLevel;
//     this.chargingStatus = batteryInfo.isCharging ? "Charging" : "Not Charging";
//   }
// }

// import { Device } from '@capacitor/device';

// @Component({
//   selector: 'app-device',
//   templateUrl: './device.page.html',
//   styleUrls: ['./device.page.scss'],
// })
// export class DevicePage {


//     deviceInfo: any;

//     constructor() {
//       this.getDeviceInfo();
//     }

//     async getDeviceInfo() {
//       const info = await Device.getInfo();
//       this.deviceInfo = info;
//     }
//   }

