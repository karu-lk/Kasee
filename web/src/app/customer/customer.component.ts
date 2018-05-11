import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CustomerService } from '../services/customer/customer.service';
import { Router } from '@angular/router';
import { Response } from '@angular/http';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit() {
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
    console.log(this.customerForm.value);
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
}
