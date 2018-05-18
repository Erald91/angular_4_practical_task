import { Component } from '@angular/core';
import { Invoice } from './models/Invoice';

@Component({
    selector: 'invoices-list',
    templateUrl: './invoices-list.component.html',
    styleUrls: ['./invoices-list.component.scss']
})
export class InvoicesListComponent {
    public invoicesList: Array<Invoice> = [
        // new Invoice('Cras justo odio 1'),
        // new Invoice('Cras justo odio 2'),
        // new Invoice('Cras justo odio 3'),
        // new Invoice('Cras justo odio 4'),
        // new Invoice('Cras justo odio 5'),
        // new Invoice('Cras justo odio 6'),
    ];
    public isLoading: boolean = false;

    constructor() {

    }
}