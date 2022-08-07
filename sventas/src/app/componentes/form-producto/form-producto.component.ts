import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, PrimeNGConfig } from 'primeng/api';
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

  @Output() action = new EventEmitter<string>();
  displayBasic: boolean = false;

  position: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private primengConfig: PrimeNGConfig,
    private productoService: ProductoService,
    private service: MessageService) { }

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
      this.productoService.pachtProducto(body, this.ProductoID).subscribe((res) => {
        this.displayBasic = false
        this.action.emit();
        this.service.add({ key: 'info', severity: 'info', summary: 'Repuesta', detail: res.message });
      })
    }
    else {

      if (this.formProducto.invalid) {
        return;
      }

      this.productoService.create(body).subscribe((res) => {
        this.displayBasic = false
        this.action.emit();
        this.service.add({ key: 'info', severity: 'info', summary: 'Repuesta', detail: res.message });
      })
    }

  }

  ProductEdit() {

    this.productoService.getProductoByID(this.ProductoID).subscribe((res) => {
      this.formProducto.patchValue({
        Nombre: res.Nombre,
        Descripcion: res.Descripcion,
        PrecioCamion: res.PrecioCamion,
        PrecioPublico: res.PrecioPublico
      });
    })
  }
}

