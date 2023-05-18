import { Component, Input, OnInit } from '@angular/core';
import { NotifyService } from 'app/core/notify/notify.service';
import { HttpMethodService } from 'app/core/services/http-method.service';
import { FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { Uhbt } from 'app/shared/interfaces/UHBT';
@Component({
  selector: 'app-csvimport',
  templateUrl: './csvimport.component.html',
  styleUrls: ['./csvimport.component.scss']
})
export class CsvimportComponent implements OnInit {


  STATES: Uhbt[] = [];
  CITIES: Uhbt[] = [];

  formGroup  = new FormGroup({
    city: new FormControl(),
    state: new FormControl(),
    name: new FormControl(),
  });

  disabledForm: boolean = false;

 public barrios: any[] = [];
 array_to_insert : any[] = [];
  constructor( private _notifyService: NotifyService,   private _httpService: HttpMethodService) { }

  ngOnInit(): void {
    this.getbarrios();
    this.cities();
    this.states();
  }
  public changeListener(files: FileList) {

    console.log(files);
    if(files && files.length > 0) {
       let file : File = files.item(0);
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
           this.array_to_insert = this.csvToArray(csv);
           console.log(csv);




         }




      }
  }

  csvToArray(strData, delimiter = ",") {
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    let strDelimiter =  delimiter ;
    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp((
        // Delimiters.
    "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
        // Quoted fields.
    "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
        // Standard fields.
    "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];
    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;
    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec(strData)) {
        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[1];
        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push([]);
        }
        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[2]) {
            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            var strMatchedValue = arrMatches[2].replace(
                    new RegExp("\"\"", "g"), "\"");
        } else {
            // We found a non-quoted value.
            var strMatchedValue = arrMatches[3];
        }
        // Now that we have our value string, let's add
        // it to the data array.
        arrData[arrData.length - 1].push(strMatchedValue);
    }
    // Return the parsed data.
    //organizar los datos para el insert




    return (arrData);
  }



  saveDatafromCSV() {
    console.log(this.array_to_insert);


    this.array_to_insert.forEach(function (value,index) {

      if (index > 0) {

        let value_insert = {
          name: value[0], state: value[1] ,city:value[2]
        };
        this.save_array_csv(value_insert);
      }

    });

    console.log("Salvando Barrios");

  }
  async save() {
    const rest = await this._httpService.post<any>('/neighborhood', this.formGroup.getRawValue());
    console.log("Respuesta", rest);
    this._notifyService.successOrdenAlert(rest.message);
    console.log("object", this.formGroup);


  }

  async save_array_csv(barrios) {
    const rest = await this._httpService.post<any>('/neighborhood',barrios);
    console.log("Respuesta", rest);
    this._notifyService.successOrdenAlert(rest.message);
    console.log("object", this.formGroup);


  }


 async removeItemRowBtn(id) {
    const rest = await this._httpService.delete<any>('/neighborhood/'+id );
      console.log("Respuesta", rest);
      this._notifyService.successOrdenAlert(rest.message);
    console.log("Borrando Barrios",id);

  }
  async getbarrios() {

    const rest = await this._httpService.get<any>(`/neighborhood`);

    this.barrios = rest.data;
        console.log('barrios', rest);
    }

    async cities() {

      const rest = await this._httpService.get<any>(`/setting/CITIES`);
      this.CITIES= rest['settingDetail'];
          console.log('cities',this.CITIES);
      }
      async states() {

        const rest = await this._httpService.get<any>(`/setting/County`);
        this.STATES = rest['settingDetail'];
        console.log('states', this.STATES );
        }

}
