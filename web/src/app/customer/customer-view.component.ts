import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer/customer.service';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { ICustomer } from '../models/ICustomer';

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

  public customers: ICustomer[];
  private _self = this;
  loadCustomers() {
    let _self = this;
    console.log('starting load customers...');

    this.customerService.getCustomers().subscribe(
      res => {
        console.log(JSON.stringify(res));
        // res.forEach(element => {
        //   console.log('res is' + JSON.stringify(element));
        // });

        _self.customers = res;
      });

    // this.customerService.loadCustomers().then(function (result:Response) {
    //   console.log(result);
    //   _self.customers = result.data;
    // });
  }
}
