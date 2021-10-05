import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'button-renderer',
  template: `
    <nb-select [selected]="selectedOption" (selectedChange)="changeOption($event)" status="primary">
      <nb-option *ngFor="let option of options" [value]="option.value"> {{ option.label }}</nb-option>
    </nb-select>
    `
})

export class DropDownRenderer implements ICellRendererAngularComp {

  params;
  selectedOption: any;
  options: any;

  agInit(params): void {
    this.params = params;
    this.selectedOption = params.value;
    this.options = params.options;
  }

  refresh(params?: any): boolean {
    return true;
  }

  changeOption($event) {
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
