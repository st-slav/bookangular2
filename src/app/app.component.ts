import { Component } from '@angular/core';

@Component({
    selector: 'hello-angular',
    template: '<h1>{{greeting}}</h1>'
})

export class AppComponent {
    greeting: string;
    constructor() {
        this.greeting = 'Hello Angular 2!';
    }
}