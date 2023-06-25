import { Component } from '@angular/core';
import { RealTimeService } from './core/services/real-time.service';
import { NotifyService } from './core/notify/notify.service';
import { ListenerService } from './core/services/listener.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    /**
     * Constructor
     */
    constructor(private realTime: RealTimeService,
                private _notifyService: NotifyService,
                private listener: ListenerService) {
        console.log("Appcomponent");
       console.log(window.innerWidth);
        this.initGeneralSocket();
        this.listener.addListener('initGeneralSocket', this.initGeneralSocket.bind(this));
    }


    initGeneralSocket() {
        console.log("entro a initGeneralSocket");
        // if (localStorage.getItem('accessToken')) {
        //     console.log("inicializo initGeneralSocket");
        //     this.realTime.getServerSentEvent(`${environment.endPoint}/order/sse/order-created?token=${localStorage.getItem('accessToken')}`)
        //         .subscribe(event => {

        //             const order = JSON.parse(event.data);
        //             console.log("event data", event.data.docNumber);

        //             this._notifyService.successOrdenAlert("Guardado con exito: Pedido No " + " " + order.docNumber);
        //         });

        //     this.realTime.getServerSentEvent(`${environment.endPoint}/order/sse/order-updated?token=${localStorage.getItem('accessToken')}`)
        //         .subscribe(event => {

        //             const order = JSON.parse(event.data);
        //             console.log("event data", event.data.docNumber);

        //             this._notifyService.successOrdenAlert("Actualizada con exito: Pedido No " + " " + order.docNumber);
        //         });
        // }
    }




}
