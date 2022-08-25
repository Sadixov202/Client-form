import { Component, OnInit } from '@angular/core';
import { AddressInfo } from 'src/app/interfaces/addressInfo';
import { IdentityInfo } from 'src/app/interfaces/identityInfo';
import { MainInfo } from 'src/app/interfaces/mainInfo';

@Component({
  selector: 'app-created-client',
  templateUrl: './created-client.component.html',
  styleUrls: ['./created-client.component.scss']
})
export class CreatedClientComponent implements OnInit {

  constructor(
  ) { }

  
  addressInfo!: AddressInfo;
  clientMainInfo!: MainInfo;
  identityInfo!: IdentityInfo;
  ngOnInit() {
    if (localStorage.getItem('addressInfo')) {
      this.addressInfo = JSON.parse(localStorage.getItem('addressInfo') ?? '');
    }
  
    if (localStorage.getItem('clientMainInfo')) {
      this.clientMainInfo = JSON.parse(localStorage.getItem('clientMainInfo') ?? '');
    }
   
    if (localStorage.getItem('identityInfo')) {
        this.identityInfo = JSON.parse(localStorage.getItem('identityInfo') ?? '');
    }
  }

}
