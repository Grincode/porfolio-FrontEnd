import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { persona } from 'src/app/model/persona.model';
import { ImageService } from 'src/app/service/image.service';
import { PersonaService } from 'src/app/service/persona.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-edit-acerca-de',
  templateUrl: './edit-acerca-de.component.html',
  styleUrls: ['./edit-acerca-de.component.css'],
  
})
export class EditAcercaDeComponent implements OnInit  {
  persona: persona = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private personaService: PersonaService,
    private router: Router,
    public imageService: ImageService,
    private storageService: StorageService) {}
  
   imagenes: any[] = [];
   cargarImagen(event: any){
    let archivos  = event.target.files
    let reader = new FileReader();
    let nombre = "perfil"

    reader.readAsDataURL(archivos[0]);
    reader.onloadend =  () => {
      console.log(reader.result);
      this.imagenes.push(reader.result);
      this.storageService.subirImagen(nombre + "_" + Date.now(), reader.result).then(urlImagen => {
        console.log(urlImagen);
      });
    }
    


    console.log(event.target.files); 

    
  
  }

  funcionDeLectura(){
    console.log("Hola")
  }


  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.personaService.detail(id).subscribe(
      data => {
        this.persona = data;
      },
      err => {
        alert('Error al modificar');
        this.router.navigate(['']);
      }
    )
  }

  onUpdate(): void{
  const id = this.activatedRoute.snapshot.params['id'];
    this.personaService.update(id, this.persona).subscribe(
    data => {
      this.router.navigate(['']);
    }, err => {
      alert("Error al modificar la persona");
      this.router.navigate(['']);
    }
  )
}


  uploadImage($event: any){
    const id = this.activatedRoute.snapshot.params['id'];
    const name = "perfil_" + id;
    this.imageService.uploadImage($event, name)
  }
}





