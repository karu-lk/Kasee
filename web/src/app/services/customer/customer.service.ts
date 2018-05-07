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

  createCustomer(newCustomer) {
    // return new Promise((resolve, reject) => {
    //   let headers = new Headers();
    //   this.http.post(baseUrl + 'customers', newCustomer, { headers: headers })
    //     .subscribe(res => {
    //       console.log('res at customer service ' + JSON.stringify(res.json()));
    //       resolve(res);
    //     }, (err) => {
    //       reject(err);
    //     });
    // });
  }

  public getCustomers(): Observable<ICustomer[]> {
    let res: Observable<ICustomer[]>;

    //res = this.http.get<ICustomer[]>(baseUrl + 'customers');
    res = this.http.get(baseUrl + 'customers').map(res=>res.data as ICustomer[] || []);
    return res;
  }
}