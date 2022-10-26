import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Email } from '../interfaces/email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-replay.component.html',
  styleUrls: ['./email-replay.component.css']
})
export class EmailReplayComponent implements OnInit, OnChanges {
  showModal = false;
  @Input() email: Email;

  constructor(private emailService: EmailService) { }

  ngOnChanges(changes: SimpleChanges): void {
    const text = this.email.text.replace(/\n/gi, '\n> ')
  
  
    this.email = {
      ...this.email,
      from: this.email.to,
      to: this.email.from,
      subject: `RE: ${this.email.subject}`,
      text: `\n\n\n----------------------- ${this.email.from} wrote:\n> ${text}`
    }    
  }

  ngOnInit() {
  }

  onSubmit(email: Email) {
    this.emailService.sendEmail(email).subscribe(()=>{
      this.showModal = false;
    })
  }

}
