import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SpecService } from '../../services/specification/spec.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';
import { CustomerService } from '../../services/customer/customer.service';

@Component({
  selector: 'app-spec-details',
  templateUrl: './spec-details.component.html',
  styleUrls: ['./spec-details.component.css']
})
export class SpecDetailsComponent implements OnInit {
  addNewFlag: boolean = false;
  customerNoForSpec;
  versionNoForSpec;
  customerList;
  specVersionList;

  constructor(private specService: SpecService, private customerService: CustomerService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadCustomers();

    this.disableControls(true);
    this.route.queryParams.subscribe(params => {
      if (params.mode && params.mode === "new") {
        this.disableControls(false);
        this.specForm.reset();
        this.addNewFlag = true;
      }
      else {
        this.customerNoForSpec = params.customerNumber;
        this.versionNoForSpec = params.specVersionNumber;
        this.loadCustomerSpec(this.customerNoForSpec, this.versionNoForSpec);
      }
    });
  }

  specForm = new FormGroup({
    customerNumber: new FormControl({ value: '', disabled: true }),
    customerName: new FormControl({ value: '', disabled: this.disableControls }),
    specificationVersionNumber: new FormControl({ value: '', disabled: this.disableControls }),
    specVersionName: new FormControl({ value: '', disabled: this.disableControls }),
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

  saveSpec() {
    let _self = this;
    if (this.addNewFlag) {//ADD NEW
      this.specService.createSpec(this.specForm.value)
        .subscribe(res => {
          if (res) {
            _self.router.navigate(['/spec-list']);
          }
        }, (err) => {
          console.log(err);
        });
    } else {//MODIFY
      this.specService.updateSpec(this.specForm.getRawValue())
        .subscribe(res => {
          if (res) {
            _self.router.navigate(['/spec-list']);
          }
        }, (err) => {
          console.log(err);
        });
    }
  }

  loadCustomerSpec(customerNumber, versionNoForSpec) {
    if (customerNumber && versionNoForSpec) {
      this.specService.getSpec(customerNumber, versionNoForSpec).subscribe(
        res => {
          this.specForm.patchValue(res.data);
          this.specForm.controls['customerName'].setValue(res.data['customerNumber'], { onlySelf: true });

          this.getSpecVersionNameByNumber(res.data.specificationVersionNumber).subscribe(
            version => {
              this.specForm.controls['specVersionName'].setValue(version.specificationVersionName, { onlySelf: true });
            }
          )
        });
    }
  }

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

  loadSpecVersions(customerNumber) {
    let _self = this;
    let enhancedSpecVersionList: any[] = [];
    let enhancedSpecVersion;

    this.specService.getCustomerSpecVersions(customerNumber).subscribe(
      res => {
        _self.specVersionList = res.data;
        this.specForm.controls.specVersionName.enable();
      });
  }

  addNewSpecVersion() {
    this.router.navigate(['/spec-version'], { queryParams: { "customerNumber": this.specForm.controls.customerNumber.value } });
  }

  getSpecVersionNameByNumber(specNumber) {
    return this.specService.getVersion(specNumber);
  }

  addNewCustomerClick() {
    this.disableControls(false);
    this.specForm.reset();
    this.addNewFlag = true;
    this.specForm.controls.customerNumber.disable();
  }

  editCustomerClick() {
    this.disableControls(false);
    this.specForm.controls.customerNumber.disable();
    this.specForm.controls.customerName.disable();
    this.addNewFlag = false;
  }

  customerNameChange(dropDownValue) {
    this.specForm.controls.customerNumber.setValue(dropDownValue);
    this.loadSpecVersions(dropDownValue);
  }

  specVersionNameChange(dropDownValue) {
    this.specForm.controls.specVersionNumber.setValue(dropDownValue);
  }

  cancelCustomerClick() {
    this.router.navigate(['/spec-list']);
  }

  deleteCustomerClick() {
    if (this.specForm.controls.customerNumber.value) {
      this.specService.deleteSpec(this.specForm.controls.customerNumber.value).subscribe(
        res => {
          this.router.navigate(['/spec-list']);
        });
    }
  }

  disableControls(controlStatus: boolean) {
    if (controlStatus) {
      this.specForm.controls.customerName.disable();
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
      this.specForm.controls.customerName.enable();
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