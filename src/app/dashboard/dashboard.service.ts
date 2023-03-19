import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';

@Injectable()
export class DashboardService {
    dashboardUrl: string;

    constructor(private http: AuthHttp) {
      this.dashboardUrl = `${environment.apiUrl}/dashboard`;
    }
}
