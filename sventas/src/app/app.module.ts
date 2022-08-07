import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { AdminInterceptor } from './interceptor/admin-interceptors';
import { SuscriptoresComponent } from './suscriptores/suscriptores.component';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';

import { PasswordModule } from 'primeng/password';
import { FormProductoComponent } from './componentes/form-producto/form-producto.component';
import { ListaProductoComponent } from './lista-producto/lista-producto.component';
import { DialogModule } from "primeng/dialog";
import {TableModule} from 'primeng/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TabMenuModule} from 'primeng/tabmenu';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SuscriptoresComponent,
    FormProductoComponent,
    ListaProductoComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    TableModule,
    DialogModule,
    BrowserAnimationsModule,
    TabMenuModule,
    ConfirmDialogModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AdminInterceptor, multi: true, }],
  bootstrap: [AppComponent]
})
export class AppModule { }
