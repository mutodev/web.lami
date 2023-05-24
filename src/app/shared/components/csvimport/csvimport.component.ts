import { Component, Input, OnInit } from '@angular/core';
import { NotifyService } from 'app/core/notify/notify.service';
import { HttpMethodService } from 'app/core/services/http-method.service';
import { FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { Uhbt } from 'app/shared/interfaces/UHBT';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
@Component({
  selector: 'app-csvimport',
  templateUrl: './csvimport.component.html',
  styleUrls: ['./csvimport.component.scss']
})
export class CsvimportComponent implements OnInit {
  subscription: Subscription;
  private _refresh$ = new Subject<void>();

  SearchformGroup  = new FormGroup({
    search: new FormControl(''),

  });

  STATES: Uhbt[] = [];
  CITIES: Uhbt[] = [];
  tem_CITIES : Uhbt[] = [];
  formGroup  = new FormGroup({
    city: new FormControl(),
    state: new FormControl(),
    name: new FormControl(),
  });

  disabledForm: boolean = false;
  filterPost = '';
  posts : any[] = [];
  filter: string;
 public barrios: any[] = [];
 array_to_insert : any[] = [];
  file: File;
  constructor( private _notifyService: NotifyService,   private _httpService: HttpMethodService, private _router: Router) { }

  ngOnInit(): void {
    this.formGroup.controls.state.valueChanges.subscribe((val) => {
      this.CITIES = this.tem_CITIES.filter(value => value.value == val );
    });

    this.getbarrios();

    this.subscription = this._refresh$.subscribe(() => {
      console.log("Clg");
    });
    this.cities();
    this.states();
  }
  public changeListener(files: FileList) {

    console.log(files);


    if(files && files.length > 0) {
      let file: File = files.item(0);
      this.file = file;
         console.log(file.name);
         console.log(file.size);
         console.log(file.type);
      let reader: FileReader = new FileReader();
      let reader2: FileReader = new FileReader();
      reader.readAsText(file);
      reader2.readAsArrayBuffer(file);
         reader.onload = (e) => {
           let csv: string = reader.result as string;

          // let arr =  JSON.parse(csv);

           console.log(csv);




         }




      }
  }

  async search() {
    var found: any[] = [];
    console.log("Buscando", this.SearchformGroup.controls.search.value);

    this.filter = this.SearchformGroup.controls.search.value;
    found = this.barrios.find(e => e.name === this.filter);


    if (found == null) {
      console.log("nada que asignar");
    } else {
      this.barrios = found;
      //this._refresh$.next();
      console.log("asignando",this.barrios);
    }

  }

  async saveDatafromCSV() {

let testData:FormData = new FormData();
    testData.append('file', this.file, this.file.name);
    const rest = await this._httpService.postyFormData<any>('/neighborhood/import',testData);

    console.log("Respuesta", rest);
    this._notifyService.successOrdenAlert(rest.message);
//file
    console.log("Salvando Barrios");
    if (rest.status == "success") {
      this._router.navigateByUrl('/settings/csvimport/Upload');
     }

  }
//test

  async save() {
    const rest = await this._httpService.post<any>('/neighborhood', this.formGroup.getRawValue());
    console.log("Respuesta", rest);
    this._notifyService.successOrdenAlert(rest.message);
    console.log("object", this.formGroup);
    if (rest.status == "success") {
      this._router.navigateByUrl('/settings/csvimport/Upload');
     }

  }



 async removeItemRowBtn(id) {
    const rest = await this._httpService.delete<any>('/neighborhood/'+id );
      console.log("Respuesta", rest);
      this._notifyService.successOrdenAlert(rest.message);
    console.log("Borrando Barrios",id);


   if (rest.status == "success") {
    window.location.reload();
   }
  }
  async getbarrios() {

    const rest = await this._httpService.get<any>(`/neighborhood`);

    this.barrios = rest.data;
    this.posts = rest.data;
        console.log('barrios', rest);
    }

    async cities() {

      const rest = await this._httpService.get<any>(`/setting/CITIES`);
      this.CITIES = rest['settingDetail'];
      this.tem_CITIES = rest['settingDetail'];
          console.log('cities',this.CITIES);
      }
      async states() {

        const rest = await this._httpService.get<any>(`/setting/County`);
        this.STATES = rest['settingDetail'];
        console.log('states', this.STATES );
        }

}
