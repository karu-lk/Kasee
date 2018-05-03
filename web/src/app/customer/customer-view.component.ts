import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer/customer.service';
import { Router } from '@angular/router';
import { Response } from '@angular/http';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css']
})
export class CustomerViewComponent implements OnInit {

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit() {
    this.loadCustomers();
  }

  public customers;
  private _self = this;
  loadCustomers() {
    let _self = this;
    this.customerService.loadCustomers().then(function (result:Response) {
      console.log(result);
      _self.customers = result.data;
    });
  }
}
