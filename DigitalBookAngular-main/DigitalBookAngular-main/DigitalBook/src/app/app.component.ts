import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DigitalBook';
  showHomePage: boolean = true;


  diableHome() {
    return this.showHomePage = !this.showHomePage;
  }
}
