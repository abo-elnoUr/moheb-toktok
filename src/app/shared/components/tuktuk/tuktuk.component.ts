import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { Products } from './../../models/products';
import { Observable, OperatorFunction, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tuktuk',
  templateUrl: './tuktuk.component.html',
  styleUrls: ['./tuktuk.component.scss'],
})
export class TuktukComponent implements OnInit {
  subscribtion = new Subscription();
  // pagination variable
  totalLenght: any;
  page: number = 1;
  tuktuks: any[] = [];
  searchedTuktuks: Products[] = [];
  searchValue: any;
  tuktuksNames: string[] = [];
  tuktukData: any = {};
  sellValue = new FormControl('');

  // editable table for invoice
  productsBill: Array<any> = [];
  newProductsBill: any = {};

  constructor(private _DashboardService: DashboardService) {}

  clientForm = new FormGroup({
    address: new FormControl(''),
    phoneNumber: new FormControl(''),
    recieverName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });
  ngOnInit(): void {
    this.findAllTuktuks();
    this.findAllReciever()
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
          : this.tuktuksNames
              .filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10)
      )
    );
  clientNames: string[] = [];
  clients: any[] = []
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

    // getReceiverDate() {
    //   let recever = {} ;
    //   clientName
    //   recever = this.clients.find(e => e.recieverName == clientName)
    // }
  findAllReciever() {
    this.clientNames = [];
    this.clients = [] ;
    this.subscribtion.add(
      this._DashboardService.findAllReciever().subscribe((res) => {
        if (res) {
          res.forEach((element: any) => {
            if (!this.clientNames.includes(element.recieverName)) {
              this.clients.push(element) ;
              this.clientNames.push(element.recieverName);
            }
          });
        }
      })
    );
  }
  getTuktukData(tuktuk: Products) {
    this.newProductsBill = tuktuk;
  }

  addBill() {
    const clientData = this.clientForm.value;
    if (this.productsBill.length > 0) {
      const formData = new FormData();
      formData.append('client', JSON.stringify(clientData));
      formData.append('tuktuks', JSON.stringify(this.productsBill));
      this.subscribtion.add(
        this._DashboardService.addTuktukBill(formData).subscribe((res) => {
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

  getNewTuktuk(event: Event) {
    const tuktukName = (event.target as HTMLInputElement).value;
    this.newProductsBill = this.tuktuks.find(
      (element) => element.product_name == tuktukName
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

  getTuktuk() {
    if (this.searchValue.length > 0 && this.tuktuks.length > 0) {
      this.tuktuks = this.tuktuks.filter(
        (element) =>
          element.code == this.searchValue ||
          element.product_name === this.searchValue ||
          element.parcode == this.searchValue
      );
    } else {
      this.tuktuks = [];

      this.findAllTuktuks();
    }
  }

  showImage(tuktuk: Products) {
    this.tuktukData = tuktuk;
  }
  findAllTuktuks() {
    this.tuktuks = [];
    this.tuktuksNames = [];
    this.subscribtion.add(
      this._DashboardService.findAllTuktuks().subscribe(
        (res) => {
          if (res) {
            res.forEach((element: any) => {
              if (element in res) {
              } else {
                this.tuktuks.push(element);
                this.tuktuksNames.push(element.product_name);
              }
            });
          }
        },
        (err) => {
          console.log(err.status);
        }
      )
    );
  }

  sell(sellValue: any, tuktukData: any) {
    if (tuktukData.amount >= sellValue) {
      tuktukData.amount = tuktukData.amount - sellValue;
    }
    this.subscribtion.add(
      this._DashboardService.sellTuktuk(tuktukData).subscribe((res: any) => {
        if (res) {
          this.tuktuks = [];
          this.sellValue.setValue('');
          res.forEach((element: any) => {
            this.tuktuks.push(element);
          });
          alert('تم بيع عدد ' + sellValue + ' توكتوك');
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
