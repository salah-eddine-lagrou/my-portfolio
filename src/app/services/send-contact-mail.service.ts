import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mail } from '../models/mail.model';

@Injectable({
  providedIn: 'root'
})
export class SendContactMailService {

  http :string = '';

  constructor(private httpClien: HttpClient) { }

  sendToMe(mail :Mail) :Observable<any>{
    
    return this.httpClien.post(this.http,mail);
  }

}
