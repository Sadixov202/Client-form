import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressInfo } from 'src/app/interfaces/addressInfo';
import { Cities } from 'src/app/interfaces/cities';

@Component({
  selector: 'app-client-address',
  templateUrl: './client-address.component.html',
  styleUrls: ['./client-address.component.scss']
})
export class ClientAddressComponent implements OnInit {

  clientAddressForm!: FormGroup;
  addressInfo!: AddressInfo;
  countryArr = [
    {
      name: 'Украина',
      cities: [
        {
          name: 'Киев',
        },
        {
          name: 'Львов',
        }
      ]
    },
    {
      name: 'Азербайджан',
      cities: [
        {
          name: 'Баку',
        },
        {
          name: 'Шуша',
        }
      ]
    },
    {
      name: 'Турция',
      cities: [
        {
          name: 'Стамбул',
        },
        {
          name: 'Анкара',
        }
      ]
    }
  ];
  citiesArr: Cities[] | undefined;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.createForm();
    if (localStorage.getItem('addressInfo')) {
      this.addressInfo = JSON.parse(localStorage.getItem('addressInfo') ?? '')
      let selectedCountry = this.countryArr.find(c => c.name == this.addressInfo.country);
      this.citiesArr = selectedCountry?.cities
      this.clientAddressForm.patchValue({
        index: this.addressInfo.index,
        country: this.addressInfo.country,
        city: this.addressInfo.city,
        region: this.addressInfo.region,
        street: this.addressInfo.street,
        house: this.addressInfo.house,
      });
    }
  }

  createForm() {
    this.clientAddressForm = this.fb.group({
      index: [null],
      country: ['', Validators.required],
      city: ['', Validators.required],
      region: [''],
      street: [''],
      house: ['']
    });
  }



  countrySelect(event: any){
    let selectedCountry = this.countryArr.find(c => c.name == event.value);
    this.citiesArr = selectedCountry?.cities
  }

  get formControls() {
    return this.clientAddressForm.controls;
  }

  submitClientForm(){
    if(this.clientAddressForm.valid) {
      localStorage.setItem('addressInfo', JSON.stringify(this.clientAddressForm.value));
      this.router.navigate(['/client-form/identity']);
    }
    
  }

}
