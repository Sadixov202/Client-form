import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainInfo } from 'src/app/interfaces/mainInfo';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  clientType = [
    'VIP клиенты',
    'Постоянные клиенты',
    'Новые клиенты'
  ];
  cordinators = [
    'Иванов',
    'Захаров',
    'Чернышева'
  ]

  clientMainInfo!: MainInfo;
  clientForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) { }


  ngOnInit() {
    this.createClientForm();
    if (localStorage.getItem('clientMainInfo')) {
      this.clientMainInfo = JSON.parse(localStorage.getItem('clientMainInfo') ?? '')
      this.clientForm.patchValue({
        lastname: this.clientMainInfo.lastname,
        name: this.clientMainInfo.name,
        middleName: this.clientMainInfo.middleName,
        birthday: this.clientMainInfo.birthday,
        phone: this.clientMainInfo.phone,
        gender: this.clientMainInfo.gender,
        clientType: this.clientMainInfo.clientType,
        cordinator: this.clientMainInfo.cordinator,
        sendMessage: this.clientMainInfo.sendMessage,
      });
    }
  }

  createClientForm() {
    this.clientForm  = this.fb.group({
      lastname: ['', Validators.required],
      name: ['', Validators.required],
      middleName: [''],
      birthday: [null, Validators.required],
      phone: [null, [Validators.required, Validators.maxLength(11), Validators.minLength(11)]],
      gender: [''],
      clientType: ['', Validators.required],
      cordinator: [],
      sendMessage: [true]
    });
  }

  get formControls() {
    return this.clientForm.controls;
  }

  submitClientForm() {
    if (this.clientForm.valid) {
      this.clientForm.patchValue({
        birthday: formatDate(this.clientForm.controls['birthday'].value, 'yyyy-MM-dd', 'en')
      });
      localStorage.setItem('clientMainInfo', JSON.stringify(this.clientForm.value));
      this.router.navigate(['/client-form/client-address']);
    }
       
  }

}
