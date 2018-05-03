import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { promise } from 'protractor';

let baseUrl = "http://localhost:3001/api/v1/";

@Injectable()
export class CustomerService {
  constructor(private http: Http) { }

  createCustomer(newCustomer) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      this.http.post(baseUrl + 'customers', newCustomer, { headers: headers })
        .subscribe(res => {
          console.log('res at customer service ' + JSON.stringify(res.json()));
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  loadCustomers() {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      this.http.get(baseUrl + 'customers', { headers: headers })
        .subscribe(res => {
          console.log('res at customer service ' + JSON.stringify(res.json()));
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

}