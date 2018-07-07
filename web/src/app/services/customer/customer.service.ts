import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs/Rx"
import { ICustomer } from '../../models/ICustomer';
import { ConfigurationService } from './../configuration.service';

let baseUrl;

@Injectable()
export class CustomerService {
  constructor(private http: HttpClient, private serviceConfig: ConfigurationService) {
    baseUrl = serviceConfig.protocol + "://" + serviceConfig.hostName + ":" + serviceConfig.apiPort + "/api/" + serviceConfig.apiVersion + "/";
  }

  createCustomer(newCustomer): any {
    let headers = new Headers();
    return this.http.post(baseUrl + 'customers', newCustomer);
  }

  updateCustomer(modifiedCustomer): any {
    let headers = new Headers();
    return this.http.put(baseUrl + 'customers/' + modifiedCustomer.customerNumber, modifiedCustomer);
  }

  deleteCustomer(deletedCustomerNumber) {
    let headers = new Headers();
    return this.http.delete(baseUrl + 'customers/' + deletedCustomerNumber);
  }

  public getCustomers(): Observable<any> {
    let res: Observable<ICustomer>;

    res = this.http.get<ICustomer>(baseUrl + 'customers');
    return res;
  }

  public getCustomer(customerNumber): Observable<any> {
    let res: Observable<ICustomer>;

    res = this.http.get<ICustomer>(baseUrl + 'customers/' + customerNumber);
    return res;
  }
}