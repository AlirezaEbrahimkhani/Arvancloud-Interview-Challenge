import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingBarComponent } from './components';

@NgModule({
  declarations: [LoadingBarComponent],
  imports: [CommonModule],
  exports: [LoadingBarComponent],
})
export class LoadingBarModule {}
