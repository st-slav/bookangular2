import {Component} from '@angular/core';

@Component({
  selector: 'pomodoro-timer',
  template: `<div class="text-center">
              <img src="img/tomato.png" width=20% alt="Pomodoro">
              <h1>{{ minutes }}:{{ seconds | number: '2.0' }}</h1>
              <p>
                <button (click)="togglePause()" class="btn btn-danger">{{ buttonLabel }}</button>
              </p>
            </div>`
})

export class AppComponent {
  fixMin: number = 24;
  fixSec: number = 59;
  minutes: number;
  seconds: number;
  isPaused: boolean;
  buttonLabel: string;

  constructor() {
    this.resetTimer();
    setInterval(() => this.tick(), 1000);
  }

  private resetTimer(): void {
    this.minutes = this.fixMin;
    this.seconds = this.fixSec;
    this.buttonLabel = 'Start';
    this.togglePause();
  }

  private tick(): void {
    if (!this.isPaused) {
      this.buttonLabel = 'Pause';
      if (--this.seconds < 0) {
        this.seconds = this.fixSec;
        if (--this.minutes < 0) {
          this.resetTimer();
        }
      }
    }
  }

  private togglePause(): void {
    this.isPaused = !this.isPaused;

    if (this.minutes < this.fixMin || this.seconds < this.fixSec) {
      this.buttonLabel = this.isPaused ? 'Resume' : 'Pause';
    }
  }
}