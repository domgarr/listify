import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of, EMPTY }  from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/* TODO: Maybe we would want to move the service that fetches and saves completed tasks here
but for now the implementation I used - using router-events - seems to do the job. */
export class HomeRouterResolverService implements Resolve<any> {
  constructor() { }

   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
      console.log("Called HomeRouterResolver.");
   }
}
