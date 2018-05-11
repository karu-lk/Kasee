import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CustomerService } from '../services/customer/customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

@Component({
  selector: 'app-customer',
  templateUrl: './customer-modify.component.html',
  styleUrls: ['./customer-modify.component.css']
})
export class CustomerModifyComponent implements OnInit {
  customerNoForEdit: string;

  constructor(private customerService: CustomerService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.customerNoForEdit = params.customerNo;
    });

    this.loadCustomerForEdit(this.customerNoForEdit);
  }

  customerForm = new FormGroup({
    customerNumber: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    mobileNumber: new FormControl(),
    identificationComment: new FormControl()
  })

  submitCustomer() {
    //console.log(this.customerForm.value);
    let _self = this;
    this.customerService.createCustomer(this.customerForm.value)
      .subscribe(res => {
        console.log('res at customer service ' + JSON.stringify(res));
        if (res) {
          _self.router.navigate(['/customer-view']);
        }
      }, (err) => {
        console.log(err);
      });
  }

  loadCustomerForEdit(customerNumber) {
    this.customerService.getCustomer(customerNumber).subscribe(
      res => {
        console.log('----' + JSON.stringify(res));
        //_self.data = res.result;
        //this.customerForm = res.data;
      });
  }
}
