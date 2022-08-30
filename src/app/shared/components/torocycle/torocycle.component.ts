import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { Products } from './../../models/products';
import { Observable, OperatorFunction, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-torocycle',
  templateUrl: './torocycle.component.html',
  styleUrls: ['./torocycle.component.scss'],
})
export class TorocycleComponent implements OnInit {
  subscribtion = new Subscription();
  // pagination variable
  totalLenght: any;
  page: number = 1;
  torocycles: any[] = [];
  searchedTorocycles: Products[] = [];
  searchValue: any;
  torocyclesNames: string[] = [];
  torocycleData: any = {};
  sellValue = new FormControl('');

  // editable table for invoice
  productsBill: Array<any> = [];
  newProductsBill: any = {};

  constructor(private _DashboardService: DashboardService) {}

  ngOnInit(): void {
    this.findAllTorocycles();
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
          : this.torocyclesNames
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
  gettorocycleData(torocycle: Products) {
    this.newProductsBill = torocycle;
  }

  addBill() {
    const clientData = this.clientForm.value;
    if (this.productsBill.length > 0) {
      const formData = new FormData();
      formData.append('client', JSON.stringify(clientData));
      formData.append('torocycles', JSON.stringify(this.productsBill));
      this.subscribtion.add(
        this._DashboardService.addTorocycleBill(formData).subscribe((res) => {
          if (res) {
            alert('تم صرف الفاتورة بنجاح');
            this.productsBill = [];
            this.newProductsBill = {};
            this.clientForm.reset();
          }
        })
      );
    } else {
      alert('يوجد خطأ في عملية البيع');
    }
  }

  getNewtorocycle(event: Event) {
    const torocycleName = (event.target as HTMLInputElement).value;
    this.newProductsBill = this.torocycles.find(
      (element) => element.product_name == torocycleName
    );
  }
  getTorocycle() {
    if (this.searchValue && this.torocycles.length > 0) {
      this.torocycles = this.torocycles.filter(
        (element) =>
          element.code == this.searchValue ||
          element.product_name == this.searchValue ||
          element.parcode == this.searchValue
      );
    } else {
      this.torocycles = [];
      this.findAllTorocycles()
    }
  }

  showImage(torocycle: Products) {
    this.torocycleData = torocycle;
  }
  findAllTorocycles() {
    this.torocyclesNames = []
    this.subscribtion.add(
      this._DashboardService.findAllTorocycles().subscribe((res) => {
        if (res) {
          res.forEach((element: any) => {
            if (element in res) {
            } else {
              this.torocycles.push(element);
              this.torocyclesNames.push(element.product_name);
            }
          });
        }
      })
    );
  }

  sell(sellValue: any, torocycleData: any) {
    if (torocycleData.amount >= sellValue) {
      torocycleData.amount = torocycleData.amount - sellValue;
    }
    this.subscribtion.add( this._DashboardService
      .sellTorocycle(torocycleData)
      .subscribe((res: any) => {
        if (res) {
          this.torocycles = [];
          this.sellValue.setValue('');
          res.forEach((element: any) => {
            this.torocycles.push(element);
          });
          alert('تم بيع عدد ' + sellValue + ' توروسيكل');
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
