import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isModalVisible=false;
  name: String = '';

  constructor() { }

  ngOnInit(): void {
  }

  cancel() {
    this.isModalVisible=false;
  }

  logOut(){
    // this.tokenStorageService.logOut();
    window.location.reload();
  }

}
