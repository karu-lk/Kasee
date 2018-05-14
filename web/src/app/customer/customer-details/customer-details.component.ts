import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CustomerService } from '../../services/customer/customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

@Component({
  selector: 'app-customer',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  customerNoForEdit: string;
  addNewFlag: boolean = false;

  constructor(private customerService: CustomerService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.disableControls(true);
    this.route.queryParams.subscribe(params => {
      this.customerNoForEdit = params.customerNo;

      this.loadCustomerForEdit(this.customerNoForEdit);
    });

  }

  customerForm = new FormGroup({
    customerNumber: new FormControl({ value: '', disabled: this.disableControls }),
    firstName: new FormControl({ value: '', disabled: this.disableControls }),
    lastName: new FormControl({ value: '', disabled: this.disableControls }),
    email: new FormControl({ value: '', disabled: this.disableControls }),
    mobileNumber: new FormControl({ value: '', disabled: this.disableControls }),
    identificationComment: new FormControl({ value: '', disabled: this.disableControls })
  })

  submitCustomer() {
    let _self = this;
    this.customerService.createCustomer(this.customerForm.value)
      .subscribe(res => {
        console.log('res at customer service ' + JSON.stringify(res));
        if (res) {
          _self.router.navigate(['/customer-list']);
        }
      }, (err) => {
        console.log(err);
      });
  }

  loadCustomerForEdit(customerNumber) {
    if (customerNumber) {
      this.customerService.getCustomer(customerNumber).subscribe(
        res => {
          console.log('----' + JSON.stringify(res));
          //_self.data = res.result;
          this.customerForm.patchValue(res.data);
        });
    }
  }

  addNewCustomerClick() {
    this.disableControls(false);
    this.customerForm.reset();
    this.addNewFlag = true;
  }

  editCustomerClick() {
    this.disableControls(false);
    this.customerForm.controls.customerNumber.disable();
    this.addNewFlag = false;
  }

  cancelCustomerClick() {
    this.router.navigate(['/customer-list']);
  }

  disableControls(controlStatus: boolean) {
    if (controlStatus) {
      this.customerForm.controls.customerNumber.disable();
      this.customerForm.controls.email.disable();
      this.customerForm.controls.firstName.disable();
      this.customerForm.controls.lastName.disable();
      this.customerForm.controls.mobileNumber.disable();
      this.customerForm.controls.identificationComment.disable();
    } else {
      this.customerForm.controls.customerNumber.enable();
      this.customerForm.controls.email.enable();
      this.customerForm.controls.firstName.enable();
      this.customerForm.controls.lastName.enable();
      this.customerForm.controls.mobileNumber.enable();
      this.customerForm.controls.identificationComment.enable();
    }
  }
}
