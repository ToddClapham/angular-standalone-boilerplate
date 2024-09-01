import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {
  private isDesktop = new BehaviorSubject<boolean>(window.innerWidth >= 768);
  public isDesktop$ = this.isDesktop.asObservable();

  constructor() {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize.bind(this));
  }

  private checkScreenSize() {
    this.isDesktop.next(window.innerWidth >= 768);
  }
}
