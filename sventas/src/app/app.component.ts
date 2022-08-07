import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private config: PrimeNGConfig){}
  title = 'stream';
  ngOnInit() {
    this.config.setTranslation({
      accept: 'Accept',
      reject: 'Cancel',
      //translations
  });
}
}
