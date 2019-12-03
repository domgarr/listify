import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/* TODO: Move logic that determines if a user is authenicated here. That way before a user attemps
to move to /home - which requires a authenticated user - can be redirect or stopped before the navigation
begins, for now my app uses logic found in ngOnit that will redirect. */
export class HomeGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log("HomeGuard is called!");
    return true;
  }

}
