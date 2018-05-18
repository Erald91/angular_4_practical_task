import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Invoice } from '../models/Invoice';

@Component({
    selector: 'app-invoice',
    templateUrl: './invoice.component.html',
    styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent {
    @Input() invoice: Invoice;
    @Input() selected: boolean = false;
    @Output() action: EventEmitter<any> = new EventEmitter();

    constructor() {

    }

    public manageAction(event, actionType) {
        this.action.emit({ id: this.invoice.id, action: actionType });
    }
}