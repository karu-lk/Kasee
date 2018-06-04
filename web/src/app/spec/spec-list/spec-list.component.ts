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
              let name = cus.data.firstName + cus.data.lastName;
              spec = { "customerNumber": element.customerNumber, "customerName": cus.data.firstName + ' ' + cus.data.lastName, "mobileNumber": cus.data.mobileNumber };
              specList.push(spec);
              _self.specList = specList;
            });
        });
      });
  }

  getCustomerNameByNumber(customerNumber) {
    return this.customerService.getCustomer(customerNumber);
  }

  viewSpec(customerNumber) {
    this.router.navigate(['/spec-details'], { queryParams: { "customerNumber": customerNumber } });
  }

  addSpec() {
    this.router.navigate(['/spec-details'], { queryParams: { "mode": "new" } });
  }
}