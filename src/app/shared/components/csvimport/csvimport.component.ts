import { Component, Input, OnInit } from '@angular/core';
import { HttpMethodService } from 'app/core/services/http-method.service';

@Component({
  selector: 'app-csvimport',
  templateUrl: './csvimport.component.html',
  styleUrls: ['./csvimport.component.scss']
})
export class CsvimportComponent implements OnInit {
  barrios;
  constructor(    private _httpService: HttpMethodService) { }

  ngOnInit(): void {
    this.getbarrios();
  }
  public changeListener(files: FileList){
    console.log(files);
    if(files && files.length > 0) {
       let file : File = files.item(0);
         console.log(file.name);
         console.log(file.size);
         console.log(file.type);
         let reader: FileReader = new FileReader();
         reader.readAsText(file);
         reader.onload = (e) => {
            let csv: string = reader.result as string;
            console.log(csv);
         }
      }
  }
  async getbarrios() {

    const rest = await this._httpService.get<any>(`/neighborhood`);
    const rest2 = await this._httpService.get<any>(`/setting`);
    this.barrios = rest.data;
        console.log('barrios', rest);
        console.log('Settings', rest2.data);
    }

}
