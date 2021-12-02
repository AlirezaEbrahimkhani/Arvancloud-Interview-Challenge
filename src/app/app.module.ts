import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { CoreModule } from '@core/core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // angular
    BrowserModule,

    // core
    CoreModule,

    // app
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
