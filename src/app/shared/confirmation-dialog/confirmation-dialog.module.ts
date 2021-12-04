import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfirmationDialogComponent } from './components';

@NgModule({
  declarations: [ConfirmationDialogComponent],
  imports: [CommonModule],
  exports: [ConfirmationDialogComponent],
})
export class ConfirmationDialogModule {}
