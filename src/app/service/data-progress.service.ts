import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class DataProgressService {
  private dataProgressSubject = new Subject<any>();
  public dataProgressObs = this.dataProgressSubject.asObservable();

  constructor() {}

  public set dataProgress (value : any) {
    this.dataProgressSubject.next(value);
  }
}
