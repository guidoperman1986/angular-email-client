import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { EmailService } from '../email.service';
import { Email } from '../interfaces/email';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent implements OnInit {
  email: Email;

  constructor(private activatedRoute: ActivatedRoute, private emailService: EmailService) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({email})=>this.email = email)
    
    // this.activatedRoute.params
    //     .pipe(switchMap(({id})=> this.emailService.getEmail(id)))
    //     .subscribe(email=>{
    //       this.email = email;
    //     }
    // )
  }

}
