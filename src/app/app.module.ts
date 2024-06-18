import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { GameComponent } from './game/game.component';
import { CardScanComponent } from './cardScan/card-scan.component';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { ClassBackgroundDirective } from './shared/directive/class-background.directive';

@NgModule({
  declarations: [AppComponent, MenuComponent, GameComponent, CardScanComponent, ClassBackgroundDirective],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxScannerQrcodeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
