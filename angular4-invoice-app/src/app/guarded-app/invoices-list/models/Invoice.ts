import uuid from 'uuid/v1';

export class Invoice {
    public id: string;
    public name: string;

    constructor(name: string = 'Empty Invoice Value') {
        Object.assign(this, { id: uuid(), name });
    }
}
