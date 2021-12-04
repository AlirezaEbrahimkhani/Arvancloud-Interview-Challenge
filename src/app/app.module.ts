import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { CoreModule } from '@core/core.module';
import { ToastNotificationsModule } from '@shared/toast-notification';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // angular
    BrowserModule,
    BrowserAnimationsModule,

    // core
    CoreModule,

    // app
    AppRoutingModule,

    // shared
    ToastNotificationsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
