import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer/customer.service';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { ICustomer } from '../../models/ICustomer';
import { ISpec } from '../../models/ISpec';
import { SpecService } from '../../services/specification/spec.service';
import { promise } from 'protractor';
import { resolve } from 'url';
import { reject } from 'q';

@Component({
  selector: 'app-spec-list',
  templateUrl: './spec-list.component.html',
  styleUrls: ['./spec-list.component.css']
})
export class SpecListComponent implements OnInit {
  public specs: any;
  private _self = this;
  specList;

  constructor(private customerService: CustomerService, private specService: SpecService, private router: Router) { }

  ngOnInit() {
    this.loadSpecs();
  }

  loadSpecs() {
    let _self = this;
    let spec;
    let specList: any[] = [];

    _self.specService.getSpecs().subscribe(
      res => {
        _self.specs = res.result;
        res.result.forEach(element => {
          _self.getCustomerNameByNumber(element.customerNumber).subscribe(
            cus => {
              _self.getSpecVersionNameByNumber(element.customerNumber,element.specificationVersionNumber).subscribe(
                specVersion => {
                  let name = cus.data.firstName + ' ' + cus.data.lastName;
                  spec = {
                    "customerNumber": element.customerNumber, "customerName": name, "specVersionNumber": element.specificationVersionNumber,
                    "specVersionName": specVersion.data.specificationVersionName, "mobileNumber": cus.data.mobileNumber
                  };
                  specList.push(spec);
                  _self.specList = specList;
                });
            });
        });
      });
  }

  getCustomerNameByNumber(customerNumber) {
    return this.customerService.getCustomer(customerNumber);
  }

  getSpecVersionNameByNumber(customerNumber, specNumber) {
      return this.specService.getVersion(customerNumber, specNumber);
  }

  viewSpec(customerNumber, specVersionNumber) {
    this.router.navigate(['/spec-details'], { queryParams: { "customerNumber": customerNumber, "specVersionNumber":specVersionNumber } });
  }

  addSpec() {
    this.router.navigate(['/spec-details'], { queryParams: { "mode": "new" } });
  }
}