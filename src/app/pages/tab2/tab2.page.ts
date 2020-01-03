import { Component, ViewChild, OnInit, } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from 'src/app/Interfaces/interface';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  @ViewChild(IonSegment, { static: true }) segment: IonSegment;
  categorias = [
    'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'
  ];

  noticas: Article[] = [];
  constructor( private noticiasServices: NoticiasService) {}
  ngOnInit() {
    this.segment.value = this.categorias[0];
    console.log(this.categorias[0]);
    this.cargarNoticias(this.segment.value);
  }

   cambioCategoria( ev: any ) {
     this.noticas = [];
     this.cargarNoticias(ev.detail.value);
  }

  cargarNoticias( categoria: string, event?) {
    this.noticiasServices.getTopHeadlinesCategorias(categoria)
      .subscribe( resp => {
        this.noticas.push( ...resp.articles);
        if ( event ) {
          event.target.complete();
        }
      });
  }

  loadData(event) {
    this.cargarNoticias(this.segment.value, event);
  }
}
