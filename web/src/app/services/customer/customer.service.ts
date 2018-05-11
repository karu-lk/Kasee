import { Injectable } from '@angular/core';
//import { Http, Response, Headers } from '@angular/http';
import { promise } from 'protractor';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Rx"
import { ICustomer } from '../../models/ICustomer';

let baseUrl = "http://localhost:3001/api/v1/";

@Injectable()
export class CustomerService {
  constructor(private http: HttpClient) { }

  createCustomer(newCustomer):any {
      let headers = new Headers();
      return this.http.post(baseUrl + 'customers', newCustomer);
  }

  public getCustomers(): Observable<any> {
    let res: Observable<ICustomer>;

    res = this.http.get<ICustomer>(baseUrl + 'customers');
    // res = this.http.get(baseUrl + 'customers').map(res=> <ICustomer[]>res);
    return res;
  }
}