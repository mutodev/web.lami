import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderStatus'
})
export class OrderStatusPipe implements PipeTransform {

  transform(value: any, args?: any): String {
   console.log(value, args)
    if(value == "open")
      return "Pendiente por pago";
    if(value == "closed")
      return "pagado";
    if(value == "sent")
      return "enviado";
      return "";
  }

}