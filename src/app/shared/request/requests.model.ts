import { Timestamp } from 'rxjs';
import { StringifyOptions } from 'querystring';

export class RequestsModel {
    reqEventId?: string;
    reqNo: string;
    reqDate: string;
    reqOffice: string;
    reqProductName: string;
    reqColor: string;
    reqFabric: string;
    reqGender: string;
    reqSize: string;
    reqCount: string;
    reqPriority: string;
    reqUser: string;
    reqNote: string;
    reqStatus: string;
}

export class ProductsModel {
    id: number;
    value: string;
}

