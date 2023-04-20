import { Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListenerService {
  events = {};
  modifier = {};

  constructor() { }

  addListener(event, payload) {
    this.events[event] && this.removeEvent(event);
    this.events[event] = {};
    this.events[event].evento = document.createEvent('Event');
    this.events[event].evento.initEvent(event, true, true);
    this.events[event].funcion = () => {
      if (typeof payload === 'object') { 
        this.updateObject(payload, this.modifier);
      } else if (typeof payload === 'function') {
        payload(this.modifier);
      }
    }
    
    document.addEventListener(event, this.events[event].funcion, false);
  }

  dispatchEvent(event, object?: any) {
    this.modifier = object;
    this.events[event] && document.dispatchEvent(this.events[event].evento);
  }

  removeEvent(type) {
    this.events[type] && document.removeEventListener(type, this.events[type].funcion, false);
    this.events[type] && delete this.events[type];
  }

  updateObject(objeto, modifier) {
    modifier && Object.keys(modifier).map((item) => {
      if (typeof objeto[item] === 'object' && !(objeto[item] instanceof Date)) {
        this.updateObject(objeto[item], modifier[item]);
      } else {
        objeto[item] = modifier[item];
      }
    });
  }

  /**
   * one to many
   */

   /**
    * this emit the eventData by the evenName
    * @param eventName event name
    * @param eventData event data
    */
  dispatchMultiEvent(eventName: string, eventData?: any) {
    if (this.events[eventName]) {
      this.events[eventName].next(eventData);
    }
  }

  /**
   * this create a Subject to listen the events emmited by eventName
   * @param eventName event name
   */
  addMultiListener(eventName: string): Subject<any> {
    if (!this.events[eventName]) {
      this.events[eventName] = new Subject<any>();
    }
    return this.events[eventName];
  }

  /**
   * 
   * @param eventName Event Name
   * @param buffer Number of old values we want
   */
  oldValuesListenerSubscribe(eventName: string, buffer?:number): ReplaySubject<any>{
    if (!this.events[eventName]) {
      this.events[eventName] = new ReplaySubject<any>();
    }
    return this.events[eventName];
  }
}
