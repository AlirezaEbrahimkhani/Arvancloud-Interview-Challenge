import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent {

  onOk = new EventEmitter<any>();
  onCancel = new EventEmitter<any>();
  
  private backdrop: HTMLElement;
  style: any;

  constructor(@Inject(DOCUMENT) private readonly _document: Document) {}

  okClicked() {
    this.onOk.emit();
  }

  cancelClicked() {
    this.onCancel.emit();
  }

  show() {
    this._document.body.classList.add('modal-open');
    this.style = { display: 'block' };
    this.showBackdrop();
  }

  hide() {
    this._document.body.classList.remove('modal-open');
    this.style = { display: 'none' };
    this.hideBackdrop();
  }

  showBackdrop() {
    this.backdrop = this._document.createElement('div');
    this.backdrop.classList.add('modal-backdrop');
    this.backdrop.classList.add('show');
    this._document.body.appendChild(this.backdrop);
  }

  hideBackdrop() {
    this.backdrop.remove();
  }
}
