import { Component } from '@angular/core';
import { persona } from 'src/app/model/persona.model';

@Component({
  selector: 'app-edit-acerca-de',
  templateUrl: './edit-acerca-de.component.html',
  styleUrls: ['./edit-acerca-de.component.css']
})
export class EditAcercaDeComponent {
  persona: persona = null;
  constructor(){}

  ngOnInit(): void { 
    
  }

  onUpdate(){

  }

  uploadImage($event:any){

  }


}
