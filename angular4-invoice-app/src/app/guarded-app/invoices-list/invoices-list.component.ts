import { Component, Input, OnInit, OnChanges, ElementRef, ViewChild } from '@angular/core';
import { Invoice } from './models/Invoice';
import { InvoiceService } from '../../services/invoices.service';
import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

@Component({
    selector: 'invoices-list',
    templateUrl: './invoices-list.component.html',
    styleUrls: ['./invoices-list.component.scss']
})
export class InvoicesListComponent implements OnInit, OnChanges {
    @Input() cacheVersion: number;
    public invoicesList: Array<Invoice> = [];
    public isLoading: boolean = false;
    public searchString: string = '';

    @ViewChild('searchInput')
    public inputField: ElementRef;

    constructor(private _invoiceService: InvoiceService) {

    }

    ngOnChanges() {
        this.init();
    }

    ngOnInit() {
        this.init(false);
        
        // Added debounce delay for search input changes during data queries
        fromEvent(this.inputField.nativeElement, 'keyup').pipe(
            map((event: any) => event.target.value),
            debounceTime(700)
        )
        .subscribe(searchToken => {
            this.searchString = searchToken;
            this.init();
        });
    }

    public init(doSeed = false) {
        this.isLoading = true;
        this._invoiceService.getInvoicesList(this.searchString, doSeed).then((response: Array<Invoice>) => {
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