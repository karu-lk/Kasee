import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SpecService } from '../../services/specification/spec.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';
import { CustomerService } from '../../services/customer/customer.service';

@Component({
  selector: 'app-spec-version',
  templateUrl: './spec-version.component.html',
  styleUrls: ['./spec-version.component.css']
})
export class SpecVersionComponent implements OnInit {
  customerList;

  constructor(private specService: SpecService, private customerService: CustomerService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    //this.loadCustomers();

    this.route.queryParams.subscribe(params => {
      if (params.customerNumber) {
        this.loadCustomer(params.customerNumber);
      }
    });
  }

  submitSpecVersion() {
    let _self = this;
    this.specService.createSpecVersion(this.specVersionForm.value)
      .subscribe(res => {
        if (res) {
          _self.router.navigate(['/spec-details']);
        }
      }, (err) => {
        console.log(err);
      });
  };

  specVersionForm = new FormGroup({
    customerNumber: new FormControl({ value: '', disabled: true }),
    customerName: new FormControl({ value: '' }),
    specVersionNumber: new FormControl({ value: '' }),
    specVersionName: new FormControl({ value: '' })
  });

  loadCustomers() {
    let _self = this;
    let enhancedCustomerList: any[] = [];
    let enhancedCustomer;

    this.customerService.getCustomers().subscribe(
      res => {
        res.result.forEach(element => {
          enhancedCustomer = { "customerNumber": element.customerNumber, "customerName": element.firstName + ' ' + element.lastName };
          enhancedCustomerList.push(enhancedCustomer);
        });
        _self.customerList = enhancedCustomerList;
      });
  }

  loadNextSpecVersionNumber() {
    this.specService.getSpecVersion(this.specVersionForm.controls['customerNumber'].value, null, true)
      .subscribe(res => {
        console.error('max version no', res);
      });
  }

  loadCustomer(customerNumber) {
    this.customerService.getCustomer(customerNumber).subscribe(
      res => {
        this.specVersionForm.controls['customerNumber'].setValue(res.data['customerNumber'], { onlySelf: true });
        this.specVersionForm.controls['customerName'].setValue(res.data['firstName'] + ' ' + res.data['lastName'], { onlySelf: true });
        this.loadNextSpecVersionNumber();
      });
  }

  customerNameChange(dropDownValue) {
    this.specVersionForm.controls.customerNumber.setValue(dropDownValue);
  }
}