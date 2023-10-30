import { SendContactMailService } from './../services/send-contact-mail.service';
import { Observable } from 'rxjs';
import { Mail } from './../models/mail.model';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html', 
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  mail: Mail = {};
  myForm!: FormGroup;

  // Custom validator function for body length
  bodyMaxLength = (control: AbstractControl) => {
    if (control.value && control.value.length > 500) {
      return { maxLengthExceeded: true };
    }
    return null;
  };

  constructor(
    private sendContactMailService: SendContactMailService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      from: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      body: ['', [Validators.required, this.bodyMaxLength]],
    });
  }

  sendContact() {
    if (this.myForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Check the fields',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'center-popup',
        },
      });
    } else {
      const formData: Mail = {
        from: this.myForm.get('from')?.value,
        firstName: this.myForm.get('firstName')?.value,
        lastName: this.myForm.get('lastName')?.value,
        body: this.myForm.get('body')?.value,
      };

      this.sendContactMailService.sendToMe(formData).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'Contact Form Submitted',
            showConfirmButton: true,
            timer: 2500,
            customClass: {
              popup: 'center-popup',
            },
          });
        },
        () => {
          Swal.fire({
            icon: 'error',
            title: 'Contact Form not submitted',
            showConfirmButton: true,
            timer: 2500,
            customClass: {
              popup: 'center-popup',
            },
          });
        }
      );
    }
  }
}
