import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CustomerService } from '../../services/customer/customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

@Component({
  selector: 'app-spec-details',
  templateUrl: './spec-details.component.html',
  styleUrls: ['./spec-details.component.css']
})
export class SpecDetailsComponent implements OnInit {
  addNewFlag: boolean = false;

  constructor(private customerService: CustomerService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.disableControls(true);
    this.route.queryParams.subscribe(params => {
      if (params.mode && params.mode === "new") {
        this.disableControls(false);
        this.specForm.reset();
        this.addNewFlag = true;
      }
      else {
        // this.customerNoForEdit = params.customerNo;
        // this.loadCustomerForEdit(this.customerNoForEdit);
      }
    });
  }

  specForm = new FormGroup({
    customerNumber: new FormControl({ value: '', disabled: this.disableControls }),
    name: new FormControl({ value: '', disabled: this.disableControls }),
    shoulder: new FormControl({ value: '', disabled: this.disableControls }),
    shoulderToBust: new FormControl({ value: '', disabled: this.disableControls }),
    shoulderToWaist: new FormControl({ value: '', disabled: this.disableControls }),
    shoulderToBracut: new FormControl({ value: '', disabled: this.disableControls }),
    bust: new FormControl({ value: '', disabled: this.disableControls }),
    blouseWaist: new FormControl({ value: '', disabled: this.disableControls }),
    bracut: new FormControl({ value: '', disabled: this.disableControls }),
    frontNeck: new FormControl({ value: '', disabled: this.disableControls }),
    backNeck: new FormControl({ value: '', disabled: this.disableControls }),
    lengthBack: new FormControl({ value: '', disabled: this.disableControls }),
    sleaveLength: new FormControl({ value: '', disabled: this.disableControls }),
    sleaveWidth: new FormControl({ value: '', disabled: this.disableControls }),
    armCut: new FormControl({ value: '', disabled: this.disableControls }),
    armPit: new FormControl({ value: '', disabled: this.disableControls }),
    underskirtWaist: new FormControl({ value: '', disabled: this.disableControls }),
    underskirtHip: new FormControl({ value: '', disabled: this.disableControls }),
    underskirtLength: new FormControl({ value: '', disabled: this.disableControls })
  })

  submitCustomer() {
    let _self = this;
    if (this.addNewFlag) {//ADD NEW
      this.customerService.createCustomer(this.specForm.value)
        .subscribe(res => {
          if (res) {
            _self.router.navigate(['/customer-list']);
          }
        }, (err) => {
          console.log(err);
        });
    } else {//MODIFY
      this.customerService.updateCustomer(this.specForm.getRawValue())
        .subscribe(res => {
          if (res) {
            _self.router.navigate(['/customer-list']);
          }
        }, (err) => {
          console.log(err);
        });
    }
  }

  loadCustomerForEdit(customerNumber) {
    if (customerNumber) {
      this.customerService.getCustomer(customerNumber).subscribe(
        res => {
          this.specForm.patchValue(res.data);
        });
    }
  }

  addNewCustomerClick() {
    this.disableControls(false);
    this.specForm.reset();
    this.addNewFlag = true;
    this.specForm.controls.customerNumber.disable();
    this.specForm.controls.customerNumber.disable();

  }

  editCustomerClick() {
    this.disableControls(false);
    this.specForm.controls.customerNumber.disable();
    this.addNewFlag = false;
  }

  cancelCustomerClick() {
    this.router.navigate(['/customer-list']);
  }

  deleteCustomerClick() {
    if (this.specForm.controls.customerNumber.value) {
      this.customerService.deleteCustomer(this.specForm.controls.customerNumber.value).subscribe(
        res => {
          this.router.navigate(['/customer-list']);
        });
    }
  }

  disableControls(controlStatus: boolean) {
    if (controlStatus) {
      this.specForm.controls.customerNumber.disable();
      this.specForm.controls.name.disable();
      this.specForm.controls.shoulder.disable();
      this.specForm.controls.shoulderToBust.disable();
      this.specForm.controls.shoulderToWaist.disable();
      this.specForm.controls.shoulderToBracut.disable();
      this.specForm.controls.bust.disable();
      this.specForm.controls.blouseWaist.disable();
      this.specForm.controls.bracut.disable();
      this.specForm.controls.frontNeck.disable();
      this.specForm.controls.backNeck.disable();
      this.specForm.controls.lengthBack.disable();
      this.specForm.controls.sleaveLength.disable();
      this.specForm.controls.sleaveWidth.disable();
      this.specForm.controls.armCut.disable();
      this.specForm.controls.armPit.disable();
      this.specForm.controls.underskirtWaist.disable();
      this.specForm.controls.underskirtHip.disable();
      this.specForm.controls.underskirtLength.disable();
    } else {
      this.specForm.controls.customerNumber.enable();
      this.specForm.controls.name.enable();
      this.specForm.controls.shoulder.enable();
      this.specForm.controls.shoulderToBust.enable();
      this.specForm.controls.shoulderToWaist.enable();
      this.specForm.controls.shoulderToBracut.enable();
      this.specForm.controls.bust.enable();
      this.specForm.controls.blouseWaist.enable();
      this.specForm.controls.bracut.enable();
      this.specForm.controls.frontNeck.enable();
      this.specForm.controls.backNeck.enable();
      this.specForm.controls.lengthBack.enable();
      this.specForm.controls.sleaveLength.enable();
      this.specForm.controls.sleaveWidth.enable();
      this.specForm.controls.armCut.enable();
      this.specForm.controls.armPit.enable();
      this.specForm.controls.underskirtWaist.enable();
      this.specForm.controls.underskirtHip.enable();
      this.specForm.controls.underskirtLength.enable();
    }
  }
}