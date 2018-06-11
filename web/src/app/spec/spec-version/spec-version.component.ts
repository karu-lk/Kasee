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
    this.loadCustomers();
  }

  submitSpecVersion(){
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
    customerName: new FormControl({ value: ''}),
    specVersionNumber: new FormControl({ value: ''}),
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

  customerNameChange(dropDownValue){
    this.specVersionForm.controls.customerNumber.setValue(dropDownValue);
  }
}