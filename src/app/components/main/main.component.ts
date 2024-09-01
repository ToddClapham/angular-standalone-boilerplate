import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { ScreenSizeService } from 'src/app/services/screen-size.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  screenSizeSub!: Subscription;
  isDesktop = false;

  constructor(
    private screenSizeService: ScreenSizeService
  ) {}

  ngOnInit(): void {
    this.resizeHandler();
    window.addEventListener('resize', this.resizeHandler);

    this.screenSizeSub = this.screenSizeService.isDesktop$.subscribe(desktop => {
      this.isDesktop = desktop;
    });
  }

  resizeHandler() {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
  }

  ngOnDestroy(): void {
    if (this.screenSizeSub) this.screenSizeSub.unsubscribe();
  }
}
