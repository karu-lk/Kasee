import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer/customer.service';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { ICustomer } from '../../models/ICustomer';
import { ISpec } from '../../models/ISpec';

@Component({
  selector: 'app-spec-list',
  templateUrl: './spec-list.component.html',
  styleUrls: ['./spec-list.component.css']
})
export class SpecListComponent implements OnInit {

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit() {
    this.loadCustomers();
  }
  
  public specs: ISpec[];
  private _self = this;

  loadCustomers() {
    let _self = this;
    this.customerService.getCustomers().subscribe(
      res => {
        _self.specs = res.result;
      });
  }

  viewSpec(specNumber) {
    this.router.navigate(['/spec-details'], { queryParams: { "specNumber": specNumber } });
  }

  addSpec() {
    this.router.navigate(['/spec-details'], { queryParams: { "mode": "new" } });
  }
}