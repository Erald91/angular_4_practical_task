import { Component } from '@angular/core';
import { InvoiceService } from '../../services/invoices.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent {
    public invoiceNameInputValue: string = '';
    public isAdding: boolean = false;
    public cacheVersion: number = 1;

    constructor(private _invoiceService: InvoiceService) {}

    public onAddInvoice(event) {
        this.isAdding = true;
        this._invoiceService.addInvoiceRecord(this.invoiceNameInputValue.trim()).then(response => {
            this.isAdding = false;
            this.invoiceNameInputValue = '';
            this.cacheVersion++;
        });
    }
}