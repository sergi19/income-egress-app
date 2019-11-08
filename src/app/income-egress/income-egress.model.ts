export class IncomeEgress {

    description: string;
    amount: number;
    type: string;
    uid?: string;

    constructor(obj: any) {
        this.description = obj && obj.description || null;
        this.amount = obj && obj.amount || null;
        this.type = obj && obj.type || null;
    }

}