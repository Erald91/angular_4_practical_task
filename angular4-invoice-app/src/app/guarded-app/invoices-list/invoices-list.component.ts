import { Component, OnInit } from '@angular/core';
import { Invoice } from './models/Invoice';
import { InvoiceService } from '../../services/invoices.service';

@Component({
    selector: 'invoices-list',
    templateUrl: './invoices-list.component.html',
    styleUrls: ['./invoices-list.component.scss']
})
export class InvoicesListComponent {
    public invoicesList: Array<Invoice> = [];
    public isLoading: boolean = false;

    constructor(private _invoiceService: InvoiceService) {

    }

    ngOnInit() {
        this.init(true);
    }

    public init(doSeed = false) {
        this.isLoading = true;
        this._invoiceService.getInvoicesList(doSeed).then((response: Array<Invoice>) => {
            this.invoicesList = response;
            this.isLoading = false;
        });
    }

    public async onInvoiceAltered({ id, action }) {
        switch(action) {
            case 'delete':
                this._invoiceService.deleteAction(id).then(response => this.init());
                break;
            case 'duplicate':
                this._invoiceService.duplicateAction(id).then(response => this.init());
                break;
            default:
                console.error('Wrong action provided');
        }
    }
}