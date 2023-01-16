import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserAuthComponent } from './users/user-auth/user-auth.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { CdkColumnDef } from '@angular/cdk/table';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { LoginComponent } from './components/login/login.component';
import { TokenInterceptor } from './helpers/token.interceptor';
import { RouterModule } from '@angular/router';
import { TemplateComponent } from './components/template/template.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserAuthComponent,
    UserListComponent,
    UserCreateComponent,
    LoginComponent,
    TemplateComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    HttpClientModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSidenavModule ,
    MatListModule
  ],
  providers: [
    { provide : HTTP_INTERCEPTORS, useClass: TokenInterceptor,multi: true },
    CdkColumnDef
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
