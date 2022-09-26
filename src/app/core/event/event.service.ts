import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EventService {

    public events: IEvent = {} as any;
    constructor() { }

    addEvent(event: IEvent) {
        this.events[event.name] = event.event;
    }

    removeEvent(nameEvent: string) {
        delete this.events[nameEvent];
    }

    getEvent<T>(nameEvent: string): () => Observable<IResult<T>> {
        return this.events[nameEvent];
    }
}

export interface IEvent {
    name: string;
    event: any;
}

export interface IResult<T> {
    success: boolean;
    message?: string;
    data: T;
}
