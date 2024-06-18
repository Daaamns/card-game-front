import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import {
  NgxScannerQrcodeComponent,
  ScannerQRCodeConfig,
  ScannerQRCodeResult,
} from 'ngx-scanner-qrcode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-scan',
  templateUrl: './card-scan.component.html',
  styleUrl: './card-scan.component.scss',
})
export class CardScanComponent {
  @Output() scannedData: EventEmitter<number> = new EventEmitter();
  scannedCard!: number;

  @ViewChild('action') action!: NgxScannerQrcodeComponent;

  public config: ScannerQRCodeConfig = {
    constraints: {
      video: {
        width: window.innerWidth,
      },
    },
  };

  constructor(private router: Router) {}

  public onEvent(e: ScannerQRCodeResult[], action?: any): void {
    if (e.length > 0) {
      const scannedDataString = e[0].value;

      this.scannedCard = JSON.parse(scannedDataString);
      console.log(this.scannedCard);
      this.scannedData.emit(this.scannedCard);

      // Stop the scanner after scanning a card
      this.handle(action, 'stop');
    }
  }

  public handle(action: any, fn: string): void {
    const playDeviceFacingBack = (devices: any[]) => {
      const device = devices.find((f) =>
        /back|rear|environment/gi.test(f.label)
      );
      action.playDevice(device ? device.deviceId : devices[0].deviceId);
    };

    if (fn === 'start') {
      action[fn](playDeviceFacingBack);
    } else {
      action[fn]();
    }
  }
}
