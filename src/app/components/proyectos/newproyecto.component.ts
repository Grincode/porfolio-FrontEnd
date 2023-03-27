import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/model/proyecto';
import { ImageService } from 'src/app/service/image.service';
import { ProyectosService } from 'src/app/service/proyectos.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-newproyecto',
  templateUrl: './newproyecto.component.html',
  styleUrls: ['./newproyecto.component.css'],
})
export class NewProyectoComponent implements OnInit {
  nombreP: string = '';
  descripcionP: string = '';
  imagenP: string = '';
  fechaP: string = '';
  linkP: string = '';

  constructor(
    private proyectoS: ProyectosService,
    private router: Router,
    public imageService: ImageService,
    private tokenService: TokenService
  ) {}

  isLogged = false;

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }

    
  }

  onCreate(): void {
    this.imagenP = this.imageService.url;
    const proyecto = new Proyecto(
      this.nombreP,
      this.descripcionP,
      this.imagenP,
      this.fechaP,
      this.linkP
    );
    this.proyectoS.save(proyecto).subscribe(
      (data) => {
        alert('Proyecto añadido');
        this.router.navigate(['']);
      },
      (err) => {
        alert('Falló');
        this.router.navigate(['']);
      }
    );

    this.imageService.clearUrl();
  }

  uploadImage($event: any) {
    const carpeta = 'imagenProy';
    this.imageService.uploadImage($event, carpeta);
    this.imageService.clearUrl();
  }
}
