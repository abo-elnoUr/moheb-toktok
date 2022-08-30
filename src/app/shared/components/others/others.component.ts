import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { Products } from './../../models/products';
import { Observable, OperatorFunction, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.scss'],
})
export class OthersComponent implements OnInit {
  subscribtion = new Subscription() ;
  // pagination variable
  totalLenght: any;
  page: number = 1;
  others: any[] = [];
  searchedOthers: Products[] = [];
  searchValue: any;
  othersNames: string[] = [];
  otherData: any = {};
  sellValue = new FormControl('');

  // editable table for invoice
  productsBill: Array<any> = [];
  newProductsBill: any = {};

  constructor(private _DashboardService: DashboardService) {}

  ngOnInit(): void {
    this.findAllOthers();
    this.findAllReciever()
  }
  clientNames: string[] = [];
  searchClientName: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      map((term) =>
        term.length < 1
          ? []
          : this.clientNames
              .filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10)
      )
    );

  findAllReciever() {
    this.clientNames = [];
    this.subscribtion.add(
      this._DashboardService.findAllReciever().subscribe((res) => {
        if (res) {
          res.forEach((element: any) => {
            if (!this.clientNames.includes(element.recieverName)) {
              this.clientNames.push(element.recieverName);
            }
          });
        }
      })
    );
  }
  search: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      map((term) =>
        term.length < 1
          ? []
          : this.othersNames
              .filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10)
      )
    );

  clientForm = new FormGroup({
    address: new FormControl(''),
    phoneNumber: new FormControl(''),
    recieverName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });
  getotherData(other: Products) {
    this.newProductsBill = other;
  }

  addBill() {
    const clientData = this.clientForm.value;
    if (this.productsBill.length > 0) {
      const formData = new FormData();
      formData.append('client', JSON.stringify(clientData));
      formData.append('others', JSON.stringify(this.productsBill));
       this.subscribtion.add(this._DashboardService.addOtherBill(formData).subscribe((res) => {
        if (res) {
          alert('تم صرف الفاتورة بنجاح');
          this.productsBill = [];
          this.newProductsBill = {};
          this.clientForm.reset() ;
        }
      }));
    } else {
      alert('يوجد خطأ في عملية البيع');
    }
  }

  getNewother(event: Event) {
    const otherName = (event.target as HTMLInputElement).value;
    this.newProductsBill = this.others.find(
      (element) => element.product_name == otherName
    );
  }

  getOther() {
    if (this.searchValue && this.others.length > 0) {
      this.others = this.others.filter(
        (element) =>
          element.code == this.searchValue ||
          element.product_name == this.searchValue ||
          element.parcode == this.searchValue
      );
    } else {
      this.others = [];
      this.findAllOthers() ;
    }
  }

  showImage(other: Products) {
    this.otherData = other;
  }
  findAllOthers() {
    this.othersNames = [] ;
     this.subscribtion.add(this._DashboardService.findAllOthers().subscribe((res) => {
      if (res) {
        res.forEach((element: any) => {
          if (element in res) {
          } else {
            this.others.push(element);
            this.othersNames.push(element.product_name);
          }
        });
      }
    }));
  }

  sell(sellValue: any, otherData: any) {
    if (otherData.amount >= sellValue) {
      otherData.amount = otherData.amount - sellValue;
    }
     this.subscribtion.add(this._DashboardService.sellOther(otherData).subscribe((res: any) => {
      if (res) {
        this.others = [];
        this.sellValue.setValue('');
        res.forEach((element: any) => {
          this.others.push(element);
        });
        alert('تم بيع ' + sellValue + ' كماليات');
      }
    }));
  }

  // invoice editale table

  addRow() {
    this.productsBill.push(this.newProductsBill);
    this.newProductsBill = {};
  }

  deleteRow(index: any) {
    this.productsBill.splice(index, 1);
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
