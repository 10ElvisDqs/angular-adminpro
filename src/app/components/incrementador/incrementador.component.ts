import { Component, Input, Output, EventEmitter, OnInit  } from '@angular/core';
import { } from 'stream';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrl: './incrementador.component.css'
})
export class IncrementadorComponent implements OnInit {
  ngOnInit(){
     this.btnClass=`btn ${ this.btnClass}`
  }

  @Input()
  public progress:number = 10;
  @Input()
  public btnClass:string='btn-primary';
  @Output() valorSalida:EventEmitter<number> = new EventEmitter();

  get getProgress(){
    return `${this.progress}%`;
  }

  setProgress( valor: number){
    if( this.progress >=100 && valor>=0){
       this.valorSalida.emit(100);
       return this.progress = 100;
    }
    if( this.progress <=0 && valor<0){
      this.valorSalida.emit(0);
      return this.progress = 0;
    }

     this.progress = this.progress + valor;
     return this.valorSalida.emit(this.progress);
  }

  onChange( nuevoValor:number){
    if (nuevoValor >= 100) {
       this.progress=100;
    }else if ( nuevoValor <= 0){
       this.progress=0;
    }else{
      this.progress = nuevoValor;
    }
    this.valorSalida.emit( this.progress );
  }
}
