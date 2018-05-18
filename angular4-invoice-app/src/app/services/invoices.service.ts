import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import { Invoice } from '../guarded-app/invoices-list/models/Invoice';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { findIndex } from 'lodash';

const INVOICES_LIST_KEY = 'invoices';

@Injectable()
export class InvoiceService {
    constructor(@Inject(LOCAL_STORAGE) private _localStorage: StorageService) {

    }

    public getInvoicesList(seed: boolean = false) {
        // Seed mock data
        seed && this._seedData();
        return this._parseToPromise(this._getInvoicesRecords());
    }

    public deleteAction(id: string) {
        let invoicesList = this._getInvoicesRecords();
        let filteredList = invoicesList.filter(invoice => invoice.id != id);
        let responseObject = { success: true };

        try {
            this._localStorage.set(INVOICES_LIST_KEY, filteredList);
        } catch(e) {
            responseObject.success = false;
        }
        
        return this._parseToPromise(responseObject);
    }

    public duplicateAction(id: string) {
        let invoicesList = this._getInvoicesRecords();
        let responseObject = { success: true };

        try {
            let invoicePosition = findIndex(invoicesList, invoice => invoice.id == id);
            let invoiceData = invoicesList[invoicePosition];

            invoicesList.splice(++invoicePosition, 0, new Invoice(`${invoiceData.name} (Copy)`));

            this._localStorage.set(INVOICES_LIST_KEY, invoicesList);
        } catch(e) {
            responseObject.success = false
        }
        
        return this._parseToPromise(responseObject);
    }

    private _getInvoicesRecords() {
        return <Array<Invoice>>this._localStorage.get(INVOICES_LIST_KEY);
    }

    private _parseToPromise(data: any) {
        return of(data).pipe(delay(300)).toPromise();
    }

    private _seedData() {
        this._localStorage.set(INVOICES_LIST_KEY, [
            new Invoice('Invoice 1'),
            new Invoice('Invoice 2'),
            new Invoice('Invoice 3'),
            new Invoice('Invoice 4'),
            new Invoice('Invoice 5'),
        ]);
    }
}