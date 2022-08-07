import { Component, OnInit, ViewChild } from '@angular/core';
import {  PrimeNGConfig } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { FormProductoComponent } from '../componentes/form-producto/form-producto.component';
import { ProductoService } from '../service/producto.service';
import { Product } from '../shared/producto';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.scss'],
  providers: [ConfirmationService]
})
export class ListaProductoComponent implements OnInit {
  products: Product[] = [];
  cols: any[] = []
  ProductoID: number = 0

  displayBasic: boolean = false;

  msgs: any[] = [];

  position: string = '';
  @ViewChild(FormProductoComponent) formulario!: FormProductoComponent
  constructor(private _productoService: ProductoService, private primengConfig: PrimeNGConfig,private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this._productoService.getProducto().subscribe({
      next: (res) => {
        this.products = res.map((element: Product) => {
          return this.mapData(element)
        })
      }, error: (error) => { console.log(error) }
    })
    this.cols = [
      { field: 'Nombre', header: 'Producto' },
      { field: 'Descripcion', header: 'Descripcion' },
      { field: 'PrecioCamion', header: 'Precio fabrica' },
      { field: 'PrecioPublico', header: 'Precio publico' }
    ];
  }

  mapData(data: Product) {

    return {
      ProductoID: data.ProductoID,
      Nombre: data.Nombre,
      Descripcion: data.Descripcion,
      PrecioCamion: "$" + data.PrecioCamion,
      PrecioPublico: "$" + data.PrecioPublico
    }
  }
  createProduct(){
    this.formulario.displayBasic = true;
    this.formulario.formProducto.reset()
    this.formulario.ProductoID = 0
  }
  editProduct(event: Product) {
    this.formulario.displayBasic = true;

    this.formulario.ProductoID = event.ProductoID
    this.formulario.ProductEdit()
  }

  deleteProduct(product: any) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this product?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
          this.msgs = [{severity:'info', summary:'Confirmed', detail:'Record deleted'}];
      },
      reject: () => {
          this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }
  });
  }


}
