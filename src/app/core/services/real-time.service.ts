import { Injectable, NgZone } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { SseService } from './sse.service';

@Injectable({
    providedIn: 'root'
})
export class RealTimeService {

    /**
     *
     */
    constructor(private _zone: NgZone,
                private sseService: SseService) {
        
    }

    getServerSentEvent(url: string) {
        return new Observable((observer: Observer<MessageEvent<any>>) => {
            const eventSource = this.sseService.getEventSource(url);

            eventSource.onmessage = event => {
                this._zone.run(() => {
                    observer.next(event);
                })
            }

            eventSource.onerror = error => {
                this._zone.run(() => {
                    observer.error(error);
                })
            }
            
        })
    }

}