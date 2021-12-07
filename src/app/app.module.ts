// angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// app
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { CoreModule } from '@core/core.module';
import { ToastNotificationsModule } from '@shared/toast-notification';
import { ConfirmationDialogModule } from '@shared/confirmation-dialog';

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
    ConfirmationDialogModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
