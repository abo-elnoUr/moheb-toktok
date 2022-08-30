import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DashboardService } from '../../../core/services/dashboard.service';
import { Products } from '../../models/products';
import { Observable, OperatorFunction, Subscription, TeardownLogic, Unsubscribable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  subscribtion = new Subscription() ;
  editMode: boolean = false;
  showHideControls: boolean = false;
  products: Products[] = [];
  Product: any = {};

  categoryName: any;

  // editable table for add bill
  productsBill: Array<any> = [];
  newProductsBill: any = {};
  tuktuksNames: string[] = [];
  paintsNames: string[] = [];
  othersNames: string[] = [];
  visbasNames: string[] = [];
  motocyclesNames: string[] = [];
  torocyclesNames: string[] = [];

  // tuktuk
  tuktuks: Products[] = [];
  tuktuk: any = {};
  tuktukFile: any = File;
  allTuktukFiles: any = [];

  // motocycle
  motocycles: Products[] = [];
  motocycle: any = {};
  motocycleFile: any = File;
  allMotocycleFiles: any = [];

  // torocycle
  torocycles: Products[] = [];
  torocycle: any = {};
  torocycleFile: any = File;
  allTorocycleFiles: any = [];

  // visba
  visbas: Products[] = [];
  visba: any = {};
  visbaFile: any = File;
  allVisbaFiles: any = [];

  // others
  others: Products[] = [];
  other: any = {};
  otherFile: any = File;
  allOtherFiles: any = [];

  // paint
  paints: Products[] = [];
  paint: any = {};
  paintFile: any = File;
  allPaintFiles: any = [];

  constructor(private _DashboardService: DashboardService) {}

  // tuktuk
  tuktukForm = new FormGroup({
    productType: new FormControl(''),
    parcode: new FormControl(''),
    product_name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    code: new FormControl(''),
    buy_price: new FormControl('', [Validators.required]),
    sell_price: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    shelf_name_or_number: new FormControl('', [Validators.required]),
    trader_name: new FormControl('', [Validators.required]),
    createdDate: new FormControl(''),
  });

  // motocycle
  motocycleForm = new FormGroup({
    productType: new FormControl(''),
    parcode: new FormControl(''),
    product_name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    code: new FormControl(''),
    buy_price: new FormControl('', [Validators.required]),
    sell_price: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    shelf_name_or_number: new FormControl('', [Validators.required]),
    trader_name: new FormControl('', [Validators.required]),
    createdDate: new FormControl(''),
  });

  // torocycle
  torocycleForm = new FormGroup({
    productType: new FormControl(''),
    parcode: new FormControl(''),
    product_name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    code: new FormControl(''),
    buy_price: new FormControl('', [Validators.required]),
    sell_price: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    shelf_name_or_number: new FormControl('', [Validators.required]),
    trader_name: new FormControl('', [Validators.required]),
    createdDate: new FormControl(''),
  });

  // visba
  visbaForm = new FormGroup({
    productType: new FormControl(''),
    parcode: new FormControl(''),
    product_name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    code: new FormControl(''),
    buy_price: new FormControl('', [Validators.required]),
    sell_price: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    shelf_name_or_number: new FormControl('', [Validators.required]),
    trader_name: new FormControl('', [Validators.required]),
    createdDate: new FormControl(''),
  });

  // other
  otherForm = new FormGroup({
    productType: new FormControl(''),
    parcode: new FormControl(''),
    product_name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    code: new FormControl(''),
    buy_price: new FormControl('', [Validators.required]),
    sell_price: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    shelf_name_or_number: new FormControl('', [Validators.required]),
    trader_name: new FormControl('', [Validators.required]),
    createdDate: new FormControl(''),
  });

  // paint
  paintForm = new FormGroup({
    productType: new FormControl(''),
    parcode: new FormControl(''),
    product_name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    code: new FormControl(''),
    buy_price: new FormControl('', [Validators.required]),
    sell_price: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    shelf_name_or_number: new FormControl('', [Validators.required]),
    trader_name: new FormControl('', [Validators.required]),
    createdDate: new FormControl(''),
  });

  ngOnInit(): void {
    this.findAllTuktuks();
    this.findAllMotocycles();
    this.findAllTorocycles();
    this.findAllVisbas();
    this.findAllOthers();
    this.findAllPaints();
  }

  AddBill() {
    if (this.categoryName == 'tuktuk') {
      if (this.productsBill.length > 0) {
        const formData = new FormData();
        const productType = 'tuktuk';
        formData.append('productCategory', JSON.stringify(productType));
        formData.append('products', JSON.stringify(this.productsBill));
        this.subscribtion.add(this._DashboardService.saveTuktuks(formData).subscribe(
          (res: any) => {
            if (res) {
              console.log(res);

              alert('تم ادخال الفاتورة بنجاح');
              this.productsBill = [];
              this.newProductsBill = {};
            }
          },
          (err) => {
            alert('هناك خطأ في عملية الاضافة ' + err);
          }
        ));
      }
    }
    if (this.categoryName == 'motocycle') {
      if (this.productsBill.length > 0) {
        const formData = new FormData();
        const productType = 'motocycle';
        formData.append('productCategory', JSON.stringify(productType));
        formData.append('products', JSON.stringify(this.productsBill));
        this.subscribtion.add(this._DashboardService.saveMototcycles(formData).subscribe(
          (res: any) => {
            if (res) {
              alert('تم ادخال الفاتورة بنجاح');
              this.productsBill = [];
              this.newProductsBill = {};
            }
          },
          (err) => {
            alert('هناك خطأ في عملية الاضافة ' + err);
          }
        ));
      }
    }
    if (this.categoryName == 'visba') {
      if (this.productsBill.length > 0) {
        const formData = new FormData();
        const productType = 'visba';
        formData.append('productCategory', JSON.stringify(productType));
        formData.append('products', JSON.stringify(this.productsBill));
        this.subscribtion.add(this._DashboardService.saveVisbas(formData).subscribe(
          (res: any) => {
            if (res) {
              alert('تم ادخال الفاتورة بنجاح');
              this.productsBill = [];
              this.newProductsBill = {};
            }
          },
          (err) => {
            alert('هناك خطأ في عملية الاضافة ' + err);
          }
        ));
      }
    }
    if (this.categoryName == 'torocycle') {
      if (this.productsBill.length > 0) {
        const formData = new FormData();
        const productType = 'torocycle';
        formData.append('productCategory', JSON.stringify(productType));
        formData.append('products', JSON.stringify(this.productsBill));
        this.subscribtion.add(this._DashboardService.saveTorocycles(formData).subscribe(
          (res: any) => {
            if (res) {
              alert('تم ادخال الفاتورة بنجاح');
              this.productsBill = [];
              this.newProductsBill = {};
            }
          },
          (err) => {
            alert('هناك خطأ في عملية الاضافة ' + err);
          }
        ));
      }
    }
    if (this.categoryName == 'other') {
      if (this.productsBill.length > 0) {
        const formData = new FormData();
        const productType = 'other';
        formData.append('productCategory', JSON.stringify(productType));
        formData.append('products', JSON.stringify(this.productsBill));
        this.subscribtion.add(this._DashboardService.saveOthers(formData).subscribe(
          (res: any) => {
            if (res) {
              alert('تم ادخال الفاتورة بنجاح');
              this.productsBill = [];
              this.newProductsBill = {};
            }
          },
          (err) => {
            alert('هناك خطأ في عملية الاضافة ' + err);
          }
        ));
      }
    }
    if (this.categoryName == 'paint') {
      if (this.productsBill.length > 0) {
        const formData = new FormData();
        const productType = 'paint';
        formData.append('productCategory', JSON.stringify(productType));
        formData.append('products', JSON.stringify(this.productsBill));
        this.subscribtion.add(this._DashboardService.savePaintss(formData).subscribe(
          (res: any) => {
            if (res) {
              alert('تم ادخال الفاتورة بنجاح');
              this.productsBill = [];
              this.newProductsBill = {};
            }
          },
          (err) => {
            alert('هناك خطأ في عملية الاضافة ' + err);
          }
        ));
      }
    }
  }
  getCategoryType(event: Event) {
    this.categoryName = (event.target as HTMLInputElement).value;
  }

  // editale table

  addRow() {
    this.productsBill.push(this.newProductsBill);
    this.newProductsBill = {};
  }

  deleteRow(index: any) {
    this.productsBill.splice(index, 1);
  }

  // tuktuk
  onSelectTuktukFile(event: any) {
    // profile image
    const file = event.target.files[0];
    // multiple file
    const files = event.target.files;
    for (let index = 0; index < files.length; index++) {
      this.allTuktukFiles.push(files[index]);
    }
    this.tuktukFile = file;
  }

  findAllTuktuks() {
    this.tuktuksNames = []
    this.subscribtion.add(this._DashboardService.findAllTuktuks().subscribe((res: any) => {
      if (res) {
        this.tuktuks = res ;
        res.forEach((element: any) => {
          if (element in res) {
          } else {
            this.tuktuksNames.push(element.product_name);
          }
        });
      }
    }));
  }

  saveTuktuk(dataForm: FormGroup) {
    if (this.tuktukForm.valid) {
      const formData = new FormData();
      const formValue = dataForm.value;
      formValue.productType = 'tuktuk';
      formData.append('product', JSON.stringify(formValue));
      formData.append('productFile', this.tuktukFile);
       this.subscribtion.add(this._DashboardService.saveTuktuk(formData).subscribe(
        (res: any) => {
          if (res) {
            alert('تم الحفظ بنجاح') ;
            dataForm.reset();
          }
        },
        (err) => {
          alert('هناك خطأ في عملية الاضافة ' + err);
        }
      ));
    }
  }

  updateTuktuk(dataForm: FormGroup) {
    if (this.tuktukForm.valid) {
      const formData = new FormData();
      const formValue = dataForm.value;
      formValue.tuktukId = this.tuktuk.tuktukId;
      formValue.productType = 'tuktuk';
      formData.append('product', JSON.stringify(formValue));
      formData.append('productFile', this.tuktukFile);
       this.subscribtion.add(this._DashboardService.updateTuktuk(formData).subscribe(
        (res: any) => {
          if (res) {
            alert('تم التعديل بنجاح') ;
            this.tuktuk = {};
            dataForm.reset();
          }
        },
        (err) => {
          alert('هناك خطأ في عملية الاضافة ' + err);
        }
      ));
    }
  }

  deleteTuktuk(id: any) {
    if (confirm('هل انت متاكد من حذف هذا المنتج ؟')) {
       this.subscribtion.add(this._DashboardService.deleteTuktuk(id).subscribe((res: any) => {
        if (res) {
          this.tuktuk = {};
        }
      }));
    }
  }

  onSearchTuktukChange(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value;
    if (searchValue.length > 0) {
      this.tuktuk = this.tuktuks.find(
        (element) => (element.product_name == searchValue) || (element.code == searchValue)
      );
      if (this.tuktuk.tuktukId) {
        this.showHideControls = true;
      } else {
        this.showHideControls = false;
      }
    } else {
      this.tuktuk = {} ;
    }
  }

  getTuktuk(tuktuk: Products) {
    this.tuktukForm.patchValue(tuktuk);
  }
  changeTuktukMode(mode: boolean) {
    this.editMode = mode;
  }

  // motocycle
  onSelectMotocycleFile(event: any) {
    // profile image
    const file = event.target.files[0];
    // multiple file
    const files = event.target.files;
    for (let index = 0; index < files.length; index++) {
      this.allMotocycleFiles.push(files[index]);
    }
    this.motocycleFile = file;
  }

  findAllMotocycles() {
    this.motocyclesNames = []
     this.subscribtion.add(this._DashboardService.findAllMototcycles().subscribe((res: any) => {
      if (res) {
        this.motocycles = res ;
        res.forEach((element: any) => {
          if (element in res) {
          } else {
            this.motocyclesNames.push(element.product_name);
          }
        });
      }
    }));
  }

  saveMotocycle(dataForm: FormGroup) {
    if (this.motocycleForm.valid) {
      const formData = new FormData();
      const formValue = dataForm.value;
      formValue.productType = 'motocycle';
      formData.append('product', JSON.stringify(formValue));
      formData.append('productFile', this.motocycleFile);
       this.subscribtion.add(this._DashboardService.saveMototcycle(formData).subscribe(
        (res: any) => {
          if (res) {
            alert('تم الحفظ بنجاح') ;
            dataForm.reset();
          }
        },
        (err) => {
          alert('هناك خطأ في عملية الاضافة ' + err);
        }
      ));
    }
  }

  updateMotocycle(dataForm: FormGroup) {
    if (this.motocycleForm.valid) {
      const formData = new FormData();
      const formValue = dataForm.value;
      formValue.mototcycleId = this.motocycle.mototcycleId;
      formValue.productType = 'motocycle';
      formData.append('product', JSON.stringify(formValue));
      formData.append('productFile', this.motocycleFile);
       this.subscribtion.add(this._DashboardService.updateMototcycle(formData).subscribe(
        (res: any) => {
          if (res) {
            alert('تم التعديل بنجاح') ;
            this.motocycle = {};
            dataForm.reset();
          }
        },
        (err) => {
          alert('هناك خطأ في عملية الاضافة ' + err);
        }
      ));
    }
  }

  deleteMotocycle(id: any) {
    if (confirm('هل انت متاكد من حذف هذا المنتج ؟')) {
       this.subscribtion.add(this._DashboardService.deleteMotocycle(id).subscribe((res: any) => {
        if (res) {
          this.motocycle = {};
        }
      }));
    }
  }

  onSearchMotocycleChange(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value;
    if (searchValue.length > 0) {
      this.motocycle = this.motocycles.find(
        (element) => (element.product_name == searchValue) || (element.code == searchValue)
      );
      if (this.motocycle.motocycleId) {
        this.showHideControls = true;
      } else {
        this.showHideControls = false;
      }
    } else {
      this.motocycle = {} ;
    }
  }

  getMotocycle(motocycle: Products) {
    this.motocycleForm.patchValue(motocycle);
  }
  changeMotocycleMode(mode: boolean) {
    this.editMode = mode;
  }

  // torocycle
  onSelectTorocycleFile(event: any) {
    // profile image
    const file = event.target.files[0];
    // multiple file
    const files = event.target.files;
    for (let index = 0; index < files.length; index++) {
      this.allTorocycleFiles.push(files[index]);
    }
    this.torocycleFile = file;
  }

  findAllTorocycles() {
    this.torocyclesNames = []
     this.subscribtion.add(this._DashboardService.findAllTorocycles().subscribe((res: any) => {
      if (res) {
        this.torocycles = res ;
        res.forEach((element: any) => {
          if (element in res) {
          } else {
            this.torocyclesNames.push(element.product_name);
          }
        });
      }
    }));
  }

  saveTorocycle(dataForm: FormGroup) {
    if (this.torocycleForm.valid) {
      const formData = new FormData();
      const formValue = dataForm.value;
      formValue.productType = 'torocycle';
      formData.append('product', JSON.stringify(formValue));
      formData.append('productFile', this.torocycleFile);
       this.subscribtion.add(this._DashboardService.saveTorocycle(formData).subscribe(
        (res: any) => {
          if (res) {
            alert('تم الحفظ بنجاح') ;
            dataForm.reset();
          }
        },
        (err) => {
          alert('هناك خطأ في عملية الاضافة ' + err);
        }
      ));
    }
  }

  updateTorocycle(dataForm: FormGroup) {
    if (dataForm.valid) {
      const formData = new FormData();
      const formValue = dataForm.value;
      formValue.torocycleId = this.torocycle.torocycleId;
      formValue.productType = 'torocycle';
      formData.append('product', JSON.stringify(formValue));
      formData.append('productFile', this.torocycleFile);
       this.subscribtion.add(this._DashboardService.updateTorocycle(formData).subscribe(
        (res: any) => {
          if (res) {
            alert('تم التعديل بنجاح') ;
            this.torocycle = {};
            dataForm.reset();
          }
        },
        (err) => {
          alert('هناك خطأ في عملية الاضافة ' + err);
        }
      ));
    }
  }

  deleteTorocycle(id: any) {
    if (confirm('هل انت متاكد من حذف هذا المنتج ؟')) {
       this.subscribtion.add(this._DashboardService.deleteTorocycle(id).subscribe((res: any) => {
        if (res) {
          this.torocycle = {};
        }
      }));
    }
  }

  onSearchTorocycleChange(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value;
    if (searchValue.length > 0) {
      this.torocycle = this.torocycles.find(
        (element) => (element.product_name == searchValue) || (element.code == searchValue)
      );
      if (this.torocycle.torocycleId) {
        this.showHideControls = true;
      } else {
        this.showHideControls = false;
      }
    } else {
      this.torocycle = {} ;
    }
  }

  getTorocycle(torocycle: Products) {
    this.torocycleForm.patchValue(torocycle);
  }
  changeTorocycleMode(mode: boolean) {
    this.editMode = mode;
  }

  // visba

  onSelectVisbaFile(event: any) {
    // profile image
    const file = event.target.files[0];
    // multiple file
    const files = event.target.files;
    for (let index = 0; index < files.length; index++) {
      this.allVisbaFiles.push(files[index]);
    }
    this.visbaFile = file;
  }

  findAllVisbas() {
    this.visbasNames = []
     this.subscribtion.add(this._DashboardService.findAllVisbas().subscribe((res: any) => {
      if (res) {
        this.visbas = res ;
        res.forEach((element: any) => {
          if (element in res) {
          } else {
            this.visbasNames.push(element.product_name);
          }
        });
      }
    }));
  }

  saveVisba(dataForm: FormGroup) {
    if (this.visbaForm.valid) {
      const formData = new FormData();
      const formValue = dataForm.value;
      formValue.productType = 'visba';
      formData.append('product', JSON.stringify(formValue));
      formData.append('productFile', this.visbaFile);
       this.subscribtion.add(this._DashboardService.saveVisba(formData).subscribe(
        (res: any) => {
          if (res) {
            alert('تم الحفظ بنجاح') ;
            dataForm.reset();
          }
        },
        (err) => {
          alert('هناك خطأ في عملية الاضافة ' + err);
        }
      ));
    }
  }

  updateVisba(dataForm: FormGroup) {
    if (this.visbaForm.valid) {
      const formData = new FormData();
      const formValue = dataForm.value;
      formValue.visbaId = this.visba.visbaId;
      formValue.productType = 'visba';
      formData.append('product', JSON.stringify(formValue));
      formData.append('productFile', this.visbaFile);
       this.subscribtion.add(this._DashboardService.updateVisba(formData).subscribe(
        (res: any) => {
          if (res) {
            alert('تم التعديل بنجاح') ;
            this.visba = {};
            dataForm.reset();
          }
        },
        (err) => {
          alert('هناك خطأ في عملية الاضافة ' + err);
        }
      ));
    }
  }

  deleteVisba(id: any) {
    if (confirm('هل انت متاكد من حذف هذا المنتج ؟')) {
       this.subscribtion.add(this._DashboardService.deleteVisba(id).subscribe((res: any) => {
        if (res) {
          this.visba = {};
        }
      }));
    }
  }

  onSearchVisbaChange(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value;
    if (searchValue.length > 0) {
      this.visba = this.visbas.find(
        (element) => (element.product_name == searchValue) || (element.code == searchValue)
      );
      if (this.visba.visbaId) {
        this.showHideControls = true;
      } else {
        this.showHideControls = false;
      }
    } else {
      this.visba = {} ;
    }
  }

  getVisba(visba: Products) {
    this.visbaForm.patchValue(visba);
  }
  changeVisbaMode(mode: boolean) {
    this.editMode = mode;
  }

  // other
  onSelectOtherFile(event: any) {
    // profile image
    const file = event.target.files[0];
    // multiple file
    const files = event.target.files;
    for (let index = 0; index < files.length; index++) {
      this.allOtherFiles.push(files[index]);
    }
    this.otherFile = file;
  }

  findAllOthers() {
    this.othersNames
     this.subscribtion.add(this._DashboardService.findAllOthers().subscribe((res: any) => {
      if (res) {
        this.others = res ;
        res.forEach((element: any) => {
          if (element in res) {
          } else {
            this.othersNames.push(element.product_name);
          }
        });
      }
    }));
  }

  saveOther(dataForm: FormGroup) {
    if (this.otherForm.valid) {
      const formData = new FormData();
      const formValue = dataForm.value;
      formValue.productType = 'other';
      formData.append('product', JSON.stringify(formValue));
      formData.append('productFile', this.otherFile);
       this.subscribtion.add(this._DashboardService.saveOther(formData).subscribe(
        (res: any) => {
          if (res) {
            alert('تم الحفظ بنجاح') ;
            dataForm.reset();
          }
        },
        (err) => {
          alert('هناك خطأ في عملية الاضافة ' + err);
        }
      ));
    }
  }

  updateOther(dataForm: FormGroup) {
    if (this.otherForm.valid) {
      const formData = new FormData();
      const formValue = dataForm.value;
      formValue.otherId = this.other.otherId;
      formValue.productType = 'other';
      formData.append('product', JSON.stringify(formValue));
      formData.append('productFile', this.otherFile);
       this.subscribtion.add(this._DashboardService.updateOther(formData).subscribe(
        (res: any) => {
          if (res) {
            alert('تم التعديل بنجاح') ;
            this.other = {};
            dataForm.reset();
          }
        },
        (err) => {
          alert('هناك خطأ في عملية الاضافة ' + err);
        }
      ));
    }
  }

  deleteOther(id: any) {
    if (confirm('هل انت متاكد من حذف هذا المنتج ؟')) {
       this.subscribtion.add(this._DashboardService.deleteOther(id).subscribe((res: any) => {
        if (res) {
          this.other = {};
        }
      }));
    }
  }

  onSearchOtherChange(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value;
    if (searchValue.length > 0) {
      this.other = this.others.find(
        (element) => (element.product_name == searchValue) || (element.code == searchValue)
      );
      if (this.other.otherId) {
        this.showHideControls = true;
      } else {
        this.showHideControls = false;
      }
    } else {
      this.other = {} ;
    }
  }

  getOther(other: Products) {
    this.otherForm.patchValue(other);
  }
  changeOtherMode(mode: boolean) {
    this.editMode = mode;
  }

  // paint

  onSelectPaintFile(event: any) {
    // profile image
    const file = event.target.files[0];
    // multiple file
    const files = event.target.files;
    for (let index = 0; index < files.length; index++) {
      this.allPaintFiles.push(files[index]);
    }
    this.paintFile = file;
  }

  findAllPaints() {
    this.paintsNames = [] ;
     this.subscribtion.add(this._DashboardService.findAllPaints().subscribe((res: any) => {
      if (res) {
        this.paints = res ;
        res.forEach((element: any) => {
          if (element in res) {
          } else {
            this.paintsNames.push(element.product_name);
          }
        });
      }
    }));
  }

  savePaint(dataForm: FormGroup) {
    if (this.paintForm.valid) {
      const formData = new FormData();
      const formValue = dataForm.value;
      formValue.productType = 'paint';
      formData.append('product', JSON.stringify(formValue));
      formData.append('productFile', this.paintFile);
       this.subscribtion.add(this._DashboardService.savePaints(formData).subscribe(
        (res: any) => {
          if (res) {
            alert('تم الحفظ بنجاح') ;
            dataForm.reset();
          }
        },
        (err) => {
          alert('هناك خطأ في عملية الاضافة ' + err);
        }
      ));
    }
  }

  updatePaint(dataForm: FormGroup) {
    if (this.paintForm.valid) {
      const formData = new FormData();
      const formValue = dataForm.value;
      formValue.paintsId = this.paint.paintsId;
      formValue.productType = 'paint';
      formData.append('product', JSON.stringify(formValue));
      formData.append('productFile', this.paintFile);
       this.subscribtion.add(this._DashboardService.updatePaints(formData).subscribe(
        (res: any) => {
          if (res) {
            alert('تم التعديل بنجاح') ;
            this.paint = {};
            dataForm.reset();
          }
        },
        (err) => {
          alert('هناك خطأ في عملية الاضافة ' + err);
        }
      ));
    }
  }

  deletePaint(id: any) {
    if (confirm('هل انت متاكد من حذف هذا المنتج ؟')) {
       this.subscribtion.add(this._DashboardService.deletePaints(id).subscribe((res: any) => {
        if (res) {
          this.paint = {};
        }
      }));
    }
  }
  onSearchPaintChange(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value;
    if (searchValue.length > 0) {
      this.paint = this.paints.find(
        (element) => (element.product_name == searchValue) || (element.code == searchValue)
      );
      if (this.paint.paintId) {
        this.showHideControls = true;
      } else {
        this.showHideControls = false;
      }
    } else {
      this.paint = {} ;
    }
  }

  getPaint(paint: Products) {
    this.paintForm.patchValue(paint);
  }
  changePaintMode(mode: boolean) {
    this.editMode = mode;
  }

  searchTuktuk: OperatorFunction<string, readonly string[]> = (
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

  searchVisba: OperatorFunction<string, readonly string[]> = (
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

  searchPaints: OperatorFunction<string, readonly string[]> = (
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

  searchOther: OperatorFunction<string, readonly string[]> = (
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

  searchMotocycle: OperatorFunction<string, readonly string[]> = (
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

  searchTotocycls: OperatorFunction<string, readonly string[]> = (
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

    ngOnDestroy(): void {
      this.subscribtion.unsubscribe();
    }
}
