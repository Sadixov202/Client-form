import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IdentityInfo } from 'src/app/interfaces/identityInfo';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-identity',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.scss']
})
export class IdentityComponent implements OnInit {

  identityForm!: FormGroup;
  indentityInfo!: IdentityInfo;
  url!: any;
  @ViewChild('fileupload') myFileInput!: ElementRef;
  isImageSaved!: boolean;
  cardImageBase64!: string;
  documentType = [
    { name: 'Паспорт' },
    { name: 'Свидетельство о рождении' },
    { name: 'Вод. удостоверение' }
  ]

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.createIdentityForm();
    if (localStorage.getItem('identityInfo')) {
      this.indentityInfo = JSON.parse(localStorage.getItem('identityInfo') ?? '');
      this.url = this.indentityInfo?.file;
      this.identityForm.patchValue({
        documentType: this.indentityInfo.documentType,
        passportNumber: this.indentityInfo.passportNumber,
        serial: this.indentityInfo.serial,
        issuer: this.indentityInfo.issuer,
        date: this.indentityInfo.date,
        file: this.indentityInfo.file,
      });
    }
  }

  createIdentityForm() {
    this.identityForm = this.fb.group({
      documentType: ['', Validators.required],
      passportNumber: ['', Validators.required],
      serial: [''],
      issuer: [''],
      date: ['', Validators.required],
      file: [null]
    })
  }

  get formControls() {
    return this.identityForm.controls;
  }

  onFileChanged(event: any) {
    const files = event.target.files;
    if (files.length === 0)
      return;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
    }
  }

  submitClientForm() {
    if (this.identityForm.valid) {
      this.identityForm.patchValue({
        date: formatDate(this.identityForm.controls['date'].value, 'yyyy-MM-dd', 'en')
      });
      localStorage.setItem('identityInfo', JSON.stringify(this.identityForm.value));
      this.router.navigate(['/created-client']);
      Swal.fire({
        title: 'Новый клиент успешно создан',
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'Продолжить',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'btn btn-success btn-lg'
        },
      });
    }

    
  }


  fileChangeEvent(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = () => {
          const imgBase64Path = e.target.result;
          this.url = imgBase64Path;
          this.identityForm.patchValue({
            file: this.url
          })
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  deleteImage() {
    this.identityForm.patchValue({
      file: null
    });
    this.myFileInput.nativeElement.value = '';
    this.url = null;
    localStorage.removeItem('image');
  }

}
