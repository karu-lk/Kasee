import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs/Rx"
import { ISpec } from '../../models/ISpec';
import { ConfigurationService } from './../configuration.service';
import { ISpecVersion } from '../../models/ISpecVersion';

let baseUrl;

@Injectable()
export class SpecService {
  constructor(private http: HttpClient, private serviceConfig: ConfigurationService) {
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

  public getSpec(specCustomerNumber, specVersionNo): Observable<any> {
    let res: Observable<ISpec>;

    res = this.http.get<ISpec>(baseUrl + 'specifications/customer/' + specCustomerNumber + '/version/' + specVersionNo);
    return res;
  }

  createSpecVersion(newSpecVersion): any {
    let headers = new Headers();
    return this.http.post(baseUrl + 'specificationversions', newSpecVersion);
  }

  public getSpecVersion(): Observable<any> {
    let res: Observable<ISpecVersion>;

    res = this.http.get<ISpecVersion>(baseUrl + 'specificationversions');
    return res;
  }

  public getAllSpecVersions(): Observable<any> {
    let res: Observable<ISpecVersion>;

    res = this.http.get<ISpecVersion>(baseUrl + 'specificationversions');
    return res;
  }

  public getCustomerSpecVersions(customerNumber): Observable<any> {
    let res: Observable<ISpecVersion>;

    res = this.http.get<ISpecVersion>(baseUrl + 'specificationversions/' + customerNumber);
    return res;
  }

  public getCurrentSpecVersion(specCustomerNumber): Observable<any> {
    let res: Observable<ISpecVersion>;

    res = this.http.get<ISpecVersion>(baseUrl + 'specificationversions/getmax/' + specCustomerNumber);
    return res;
  }

  public getVersion(customerNumber, versionNumber): Observable<any> {
    let res: Observable<ISpecVersion>;

    res = this.http.get<ISpecVersion>(baseUrl + 'specificationversions/customer/' + customerNumber + '/version/' + versionNumber);
    return res;
  }
}