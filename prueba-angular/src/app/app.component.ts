import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, Observable, shareReplay } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'prueba-empresa';
  withLogo = '80%';

  faEyeSlash = faEyeSlash;
  faEye= faEye;
  visblePasswor= false; 
  @ViewChild('password') password!: ElementRef;
 

  registerForm!: FormGroup;
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );


  public errorsMessages = {
    email: [
      { type: 'required', message: 'Correo electrónico es obligatorio.' },
      { type: 'minlength', message: 'Debe introducir como mínimo 15 caracteres.'},
      { type: 'maxlength', message: 'Debe introducir como máximo 50 caracteres.'},
      { type: 'email', message: 'Debe ingresar un correo electrónico con el siguiente formato: elemplo@ejemplo.com.'},
      { type: 'pattern', message: 'Solo se permite letras de la (a-z), caracteres numéricos del (0-9), y el caracter especial del punto "."'},
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatorio.' },
      { type: 'minlength', message: 'Debe introducir como mínimo 8 caracteres.'},
      { type: 'maxlength', message: 'Debe introducir como máximo 25 caracteres.'},
    ],
  }


  constructor(
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private breakpointObserver: BreakpointObserver,
  ) {

    this.buildForm();
  }
  


  private buildForm(): void {
    this.registerForm = this.formBuilder.group({
      name: ['',
      [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(50),
      ]],
      email: ['',
      [
        Validators.required,
        Validators.email,
        Validators.minLength(15),
        Validators.maxLength(50),
        Validators.pattern('[a-z0-9.A-Z@]*')
      ]],
      password: ['',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(25)
      ]]
    });
  }

  changeIcon(){
      this.visblePasswor = true;
      this.renderer.setAttribute(this.password.nativeElement, 'type', 'text');
  }

  changeIconOpen(){
    this.visblePasswor = false;
    this.renderer.setAttribute(this.password.nativeElement, 'type', 'password');
  }

  register(){
    
  }
  
}
