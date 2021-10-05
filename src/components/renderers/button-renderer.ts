import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'button-renderer',
  template: `
    <button type="button" *ngIf="!isBtnIcon" class="{{btnClass}}" (click)="onClick($event)">{{label}}</button>
    <a type="button" *ngIf="isBtnIcon" (click)="onClick($event)"><i class="{{iconClass}}"></i></a>
    `
})

export class ButtonRendererComponent implements ICellRendererAngularComp {

  params;
  label: string;
  btnClass: string;
  isBtnIcon: boolean;
  iconClass: string;

  agInit(params): void {
    this.params = params;
    this.label = this.params.label || null;
    this.btnClass = this.params.btnClass || null;
    this.iconClass = this.params.iconClass || null;
    this.isBtnIcon = this.params.isBtnIcon || false;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onClick(params);

    }
  }
}
