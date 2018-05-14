import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer/customer.service';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { ICustomer } from '../../models/ICustomer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit() {
    this.loadCustomers();
  }

  public customers: ICustomer;
  public data: ICustomer[];
  private _self = this;

  loadCustomers() {
    let _self = this;
    this.customerService.getCustomers().subscribe(
      res => {
        _self.data = res.result;
      });
  }

  editCustomer(customerNo){
    this.router.navigate(['/customer-details'], { queryParams: { "customerNo": customerNo } });
  }
}
