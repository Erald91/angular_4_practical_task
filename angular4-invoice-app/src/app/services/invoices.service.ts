import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import { Invoice } from '../guarded-app/invoices-list/models/Invoice';
import { of, from } from 'rxjs';
import { delay, map, debounceTime } from 'rxjs/operators';
import { findIndex } from 'lodash';

const INVOICES_LIST_KEY = 'invoices';

@Injectable()
export class InvoiceService {
    constructor(@Inject(LOCAL_STORAGE) private _localStorage: StorageService) {

    }

    public getInvoicesList(searchToken: string = '', seed: boolean = false) {
        // Seed mock data
        seed && this._seedData();
        let invoicesRecords = this._getInvoicesRecords();

        if(!searchToken) return this._parseToPromise(invoicesRecords);
        else return this._parseToFilteredPromise(invoicesRecords, searchToken);
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

    public addInvoiceRecord(invoiceName: string) {
        let invoiceRecords = this._getInvoicesRecords();
        // Add the new record at beginning of the array
        invoiceRecords.unshift(new Invoice(invoiceName));
        let responseObject = { success: true };

        try {
            this._localStorage.set(INVOICES_LIST_KEY, invoiceRecords);
        } catch(e) {
            responseObject.success = false;
        }

        return this._parseToPromise(responseObject);
    }

    private _getInvoicesRecords() {
        return <Array<Invoice>>this._localStorage.get(INVOICES_LIST_KEY) || [];        
    }

    private _parseToPromise(data: any) {
        return of(data).pipe(delay(300)).toPromise();
    }

    private _parseToFilteredPromise(data: Array<Invoice>, searchToken: string) {
        return of(data).pipe(
            delay(500), 
            map(list => list.filter(invoice => invoice.name.startsWith(searchToken)))
        ).toPromise();
    }

    private _seedData() {
        this._localStorage.set(INVOICES_LIST_KEY, [
            new Invoice('Invoice 1'),
            new Invoice('Invoice 2'),
            new Invoice('Invoice 3'),
            new Invoice('Invoice 4'),
            new Invoice('Invoice 5'),
            new Invoice('Invoice 6'),
        ]);
    }
}