import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { FormProductoComponent } from './componentes/form-producto/form-producto.component'
import { ListaProductoComponent } from './lista-producto/lista-producto.component';

const routes: Routes = [
{path:'producto',component:FormProductoComponent},
{path:'lista-producto',component:ListaProductoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
