import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Router } from '@angular/router';
import { Email } from './interfaces/email';
import { EmailService } from './email.service';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailResolverService implements Resolve<Email> {

  constructor(private emailService: EmailService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.emailService.getEmail(route.params.id)
                .pipe(
                  catchError(()=> {
                    this.router.navigateByUrl('/inbox/notfound')
                    return EMPTY;
                  })
                )
  }
}
