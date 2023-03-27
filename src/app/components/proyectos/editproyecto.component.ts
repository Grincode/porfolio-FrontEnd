import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from 'src/app/model/proyecto';
import { ImageService } from 'src/app/service/image.service';
import { ProyectosService } from 'src/app/service/proyectos.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-editproyecto',
  templateUrl: './editproyecto.component.html',
  styleUrls: ['./editproyecto.component.css']
})
export class EditProyectoComponent implements OnInit {

  proyecto: Proyecto = null;

  constructor(private proyectoS: ProyectosService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              public imageService: ImageService,
              private tokenService: TokenService) { }

  isLogged = false;

  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.params['id'];

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }

    this.imageService.clearUrl();

    this.proyectoS.detail(id).subscribe(
      data => {
        this.proyecto = data;
      }, err => {
        alert("Error al modificar proyecto");
        this.router.navigate(['']);
      }
    )

    

  }

  onUpdate(): void {

    const id = this.activatedRoute.snapshot.params['id'];
    if(this.imageService.url != "") {
      this.proyecto.imagenP = this.imageService.url;
    }
    this.proyectoS.update(id, this.proyecto).subscribe(
      data => {
        this.router.navigate(['']);
      }, err => {
        alert("Error al modificar proyecto");
        this.router.navigate(['']);
      }
    )
    

  }

  uploadImage($event:any) {

    const carpeta = "imagenProy"
    this.imageService.uploadImage($event, carpeta);

  }

  cancel(): void {

    
    this.router.navigate(['']);

  }

}
