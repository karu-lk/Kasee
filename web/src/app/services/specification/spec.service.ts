import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs/Rx"
import { ISpec } from '../../models/ISpec';
import { ConfigurationService } from './../configuration.service';

let baseUrl;// = "http://localhost:3001/api/v1/";

@Injectable()
export class SpecService {
  constructor(private http: HttpClient, private serviceConfig:ConfigurationService) { 
    baseUrl = serviceConfig.protocol + "://" + serviceConfig.hostName + ":" + serviceConfig.apiPort + "/api/" + serviceConfig.apiVersion + "/";
  }

  createSpec(newSpec): any {
    let headers = new Headers();
    return this.http.post(baseUrl + 'specifications', newSpec);
  }

  updateSpec(modifiedSpec): any {
    let headers = new Headers();
    return this.http.put(baseUrl + 'specifications/' + modifiedSpec.customerNumber, modifiedSpec);
  }

  deleteSpec(deletedSpecCustomerNumber) {
    let headers = new Headers();
    return this.http.delete(baseUrl + 'specifications/' + deletedSpecCustomerNumber);
  }

  public getSpecs(): Observable<any> {
    let res: Observable<ISpec>;

    res = this.http.get<ISpec>(baseUrl + 'specifications');
    return res;
  }

  public getSpec(specCustomerNumber): Observable<any> {
    let res: Observable<ISpec>;

    res = this.http.get<ISpec>(baseUrl + 'specifications/' + specCustomerNumber);
    return res;
  }
}