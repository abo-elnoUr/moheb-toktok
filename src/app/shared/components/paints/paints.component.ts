import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { Products } from './../../models/products';
import { Observable, OperatorFunction, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-paints',
  templateUrl: './paints.component.html',
  styleUrls: ['./paints.component.scss'],
})
export class PaintsComponent implements OnInit {
  subscribtion = new Subscription() ;
  // pagination variable
  totalLenght: any;
  page: number = 1;
  paints: any[] = [];
  searchedPaints: Products[] = [];
  searchValue: any;
  paintsNames: string[] = [];
  paintData: any = {};
  sellValue = new FormControl('');

  // editable table for invoice
  productsBill: Array<any> = [];
  newProductsBill: any = {};

  constructor(private _DashboardService: DashboardService) {}

  ngOnInit(): void {
    this.findAllPaints();
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
          : this.paintsNames
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
  getpaintData(paint: Products) {
    this.newProductsBill = paint;
  }

  addBill() {
    const clientData = this.clientForm.value;
    if (this.productsBill.length > 0) {
      const formData = new FormData();
      formData.append('client', JSON.stringify(clientData));
      formData.append('paints', JSON.stringify(this.productsBill));
       this.subscribtion.add(this._DashboardService.addPaintBill(formData).subscribe((res) => {
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

  getNewpaint(event: Event) {
    const paintName = (event.target as HTMLInputElement).value;
    this.newProductsBill = this.paints.find(
      (element) => element.product_name == paintName
    );
  }

  getPaint() {
    if (this.searchValue && this.paints.length > 0) {
      this.paints = this.paints.filter(
        (element) =>
          element.code == this.searchValue ||
          element.product_name == this.searchValue ||
          element.parcode == this.searchValue
      );
    } else {
      this.paints = [];
      this.findAllPaints()
    }
  }

  showImage(paint: Products) {
    this.paintData = paint;
  }
  findAllPaints() {
    this.paintsNames = []
     this.subscribtion.add(this._DashboardService.findAllPaints().subscribe((res) => {
      if (res) {
        res.forEach((element: any) => {
          if (element in res) {
          } else {
            this.paints.push(element);
            this.paintsNames.push(element.product_name);
          }
        });
      }
    }));
  }
  sell(sellValue: any, paintsData: any) {
    if (paintsData.amount >= sellValue) {
      paintsData.amount = paintsData.amount - sellValue;
    }

     this.subscribtion.add(this._DashboardService.sellPaint(paintsData).subscribe((res: any) => {
      if (res) {
        this.paints = [];
        this.sellValue.setValue('');
        res.forEach((element: any) => {
          this.paints.push(element);
        });
        alert('تم بيع ' + sellValue + ' علبة دهان');
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
