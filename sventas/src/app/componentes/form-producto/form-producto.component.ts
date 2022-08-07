import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.css']
})
export class FormProductoComponent implements OnInit {
  submitted: boolean = false;
  formProducto: FormGroup = new FormGroup({});
  @Input('ProductoID') ProductoID: number = 0
  displayBasic: boolean = false;

  position: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private primengConfig: PrimeNGConfig,
    private productoService: ProductoService) { }

  ngOnInit(): void {

    this.formProducto = this.formBuilder.group({
      Nombre: ["",],
      Descripcion: ["",],
      PrecioCamion: ["",],
      PrecioPublico: ["",]
    });

  }
  onSubmit() {
    this.submitted = true;
    let body = {
      Nombre: this.formProducto.value.Nombre,
      Descripcion: this.formProducto.value.Descripcion,
      PrecioCamion: this.formProducto.value.PrecioCamion,
      PrecioPublico: this.formProducto.value.PrecioPublico
    };
    if (this.ProductoID > 0) {
      this.productoService.pachtProducto(body,this.ProductoID).subscribe((data) => {
       this.displayBasic=false
      })
    }
    else{

      if (this.formProducto.invalid) {
        return;
      }

      this.productoService.create(body).subscribe((data) => {
        this.displayBasic=false
      })
    }

  }

  ProductEdit() {
    console.log(this.ProductoID)
    this.productoService.getProductoByID(this.ProductoID).subscribe((res) => {
      this.formProducto.patchValue({
        Nombre: res.Nombre,
        Descripcion: res.Descripcion,
        PrecioCamion: res.PrecioCamion,
        PrecioPublico: res.PrecioPublico
      })
    })
  }
}

