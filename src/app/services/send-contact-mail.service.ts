import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mail } from '../models/mail.model';

@Injectable({
  providedIn: 'root'
})
export class SendContactMailService {

  http :string = 'http://127.0.0.1:8000/api/send-mail';

  constructor(private httpClien: HttpClient) { }

  sendToMe(mail :Mail) :Observable<any>{ 

    return this.httpClien.post(this.http,mail);
  }

}
