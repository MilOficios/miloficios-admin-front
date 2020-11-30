import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable()
export class BaseService {

    constructor() {

    }

    simpleHeaderOAuth(token: string): RequestOptions {
        console.log('token: ', token);
        const headers = new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        });
        const options = new RequestOptions({ headers: headers });

        return options;
    }

    simpleHeaderNoOAuth(): RequestOptions {
        const headers = new Headers({
            'Content-Type': 'application/json'
        });
        const options = new RequestOptions({ headers: headers });

        return options;
    }

    public loadResponse(res: Response | any): any {
        return res;
    }

    public loadError(error: Response | any): Observable<any> {
        return throwError(error);
    }
}
