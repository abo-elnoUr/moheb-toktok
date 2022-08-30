import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { Products } from './../../models/products';
import { Observable, OperatorFunction, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-motocycle',
  templateUrl: './motocycle.component.html',
  styleUrls: ['./motocycle.component.scss'],
})
export class MotocycleComponent implements OnInit {
  subscribtion = new Subscription() ;
  // pagination variable
  totalLenght: any;
  page: number = 1;

  motocycles: any[] = [];
  searchedMotocycles: Products[] = [];
  searchValue: any;
  motocyclesNames: string[] = [];
  motocycleData: any = {};
  sellValue = new FormControl('');

  // editable table for invoice
  productsBill: Array<any> = [];
  newProductsBill: any = {};

  constructor(private _DashboardService: DashboardService) {}
  ngOnInit(): void {
    this.findAllMotocycles();
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
          : this.motocyclesNames
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
  getmotocycleData(motocycle: Products) {
    this.newProductsBill = motocycle;
  }

  addBill() {
    const clientData = this.clientForm.value;
    console.log(this.productsBill);
    if (this.productsBill.length > 0) {
      const formData = new FormData();
      formData.append('client', JSON.stringify(clientData));
      formData.append('motocycles', JSON.stringify(this.productsBill));
       this.subscribtion.add(this._DashboardService.addMotocycleBill(formData).subscribe((res) => {
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

  getNewmotocycle(event: Event) {
    const motocycleName = (event.target as HTMLInputElement).value;
    this.newProductsBill = this.motocycles.find(
      (element) => element.product_name == motocycleName
    );
  }
  getMotocycle() {
    if (this.searchValue && this.motocycles.length > 0) {
      this.motocycles = this.motocycles.filter(
        (element) =>
          element.code == this.searchValue ||
          element.product_name == this.searchValue ||
          element.parcode == this.searchValue
      );
    } else {
      this.motocycles = [];
      this.findAllMotocycles() ;
    }
  }

  showImage(motocycle: Products) {
    this.motocycleData = motocycle;
  }
  findAllMotocycles() {
    this.motocyclesNames = []
     this.subscribtion.add(this._DashboardService.findAllMototcycles().subscribe((res) => {
      if (res) {
        res.forEach((element: any) => {
          if (element in res) {
          } else {
            this.motocycles.push(element);
            this.motocyclesNames.push(element.product_name);
          }
        });
      }
    }));
  }

  sell(sellValue: any, motocycleData: any) {
    if (motocycleData.amount > sellValue) {
      motocycleData.amount = motocycleData.amount - sellValue;
    }
    this.subscribtion.add( this._DashboardService
      .sellMototcycle(motocycleData)
      .subscribe((res: any) => {
        if (res) {
          this.motocycles = [];
          this.sellValue.setValue('');
          res.forEach((element: any) => {
            this.motocycles.push(element);
          });
          alert('تم بيع عدد ' + sellValue + ' موتوسيكل');
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
