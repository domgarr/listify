import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';

//Remember to add the HttpClientModule in imports to make it accessible everywhere.
import {HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS, HttpHandler, HttpRequest } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { TaskListComponent } from './task-list/task-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { NewTaskComponent } from './new-task/new-task.component';
import { NewTaskListComponent } from './new-task-list/new-task-list.component';
import { TaskListContainerComponent } from './task-list-container/task-list-container.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import {LoginService} from './login.service';
import { TaskListsPageComponent } from './task-lists-page/task-lists-page.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [

  { path: 'user/login', component: LoginComponent},
  { path: 'home', component: TaskListsPageComponent},
  { path: 'sign-up', component: SignUpComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });
    return next.handle(xhr);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    TaskListComponent,
    NewTaskComponent,
    NewTaskListComponent,
    TaskListContainerComponent,
    HeaderComponent,
    LoginComponent,
    TaskListsPageComponent,
    FooterComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    FormsModule,
    RouterModule.forRoot(routes),
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [LoginService, { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
