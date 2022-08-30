import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { Products } from './../../models/products';
import { Observable, OperatorFunction, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-visba',
  templateUrl: './visba.component.html',
  styleUrls: ['./visba.component.scss'],
})
export class VisbaComponent implements OnInit {
  subscribtion = new Subscription();
  // pagination variable
  totalLenght: any;
  page: number = 1;
  visbas: any[] = [];
  searchedVisbas: Products[] = [];
  searchValue: any;
  visbasNames: string[] = [];
  visbaData: any = {};
  sellValue = new FormControl('');

  // editable table for invoice
  productsBill: Array<any> = [];
  newProductsBill: any = {};

  constructor(private _DashboardService: DashboardService) {}

  ngOnInit(): void {
    this.findAllVisbas();
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
          : this.visbasNames
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
  getvisbaData(visba: Products) {
    this.newProductsBill = visba;
  }

  addBill() {
    const clientData = this.clientForm.value;
    if (this.productsBill.length > 0) {
      const formData = new FormData();
      formData.append('client', JSON.stringify(clientData));
      formData.append('visbas', JSON.stringify(this.productsBill));
      this.subscribtion.add(
        this._DashboardService.addVisbaBill(formData).subscribe((res) => {
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

  getNewvisba(event: Event) {
    const visbaName = (event.target as HTMLInputElement).value;
    this.newProductsBill = this.visbas.find(
      (element) => element.product_name == visbaName
    );
  }

  getVisba() {
    if (this.searchValue && this.visbas.length > 0) {
      this.visbas = this.visbas.filter(
        (element) =>
          element.code == this.searchValue ||
          element.product_name == this.searchValue ||
          element.parcode == this.searchValue
      );
    } else {
      this.visbas = [];
      this.findAllVisbas()
    }
  }

  showImage(visba: Products) {
    this.visbaData = visba;
  }
  sell(sellValue: any, visbaData: any) {
    if (visbaData.amount >= sellValue) {
      visbaData.amount = visbaData.amount - sellValue;
    }
    this.subscribtion.add(
      this._DashboardService.sellVisba(visbaData).subscribe((res: any) => {
        if (res) {
          this.visbas = [];
          this.sellValue.setValue('');
          res.forEach((element: any) => {
            this.visbas.push(element);
          });
          alert('تم بيع عدد ' + sellValue + ' فيزبا');
        }
      })
    );
  }

  findAllVisbas() {
    this.visbasNames = []
    this.subscribtion.add(
      this._DashboardService.findAllVisbas().subscribe((res) => {
        if (res) {
          res.forEach((element: any) => {
            if (element in res) {
            } else {
              this.visbas.push(element);
              this.visbasNames.push(element.product_name);
            }
          });
        }
      })
    );
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
