import { Component } from '@angular/core';
import { RealTimeService } from './core/services/real-time.service';
import { environment } from 'environments/environment';
import { NotifyService } from './core/notify/notify.service';
@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent
{
    /**
     * Constructor
     */
    constructor( private realTime: RealTimeService, private _notifyService: NotifyService)
    {
        console.log("Appcomponent");
        this.realTime.getServerSentEvent(`${environment.endPoint}/order/sse/order-created?token=${localStorage.getItem('accessToken')}`)
            .subscribe(event => {

                const order = JSON.parse(event.data);
            console.log("event data", event.data.docNumber);

            this._notifyService.successOrdenAlert("Guardado con exito: Pedido No "+ order.docNumber);
        });


    }







}
