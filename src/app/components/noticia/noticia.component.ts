import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/Interfaces/interface';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  @Input() noticia: Article;
  @Input() i: number;
  @Input() enFavoritos;
  constructor( private iab: InAppBrowser, private actionSheetController: ActionSheetController,
               private socialSharing: SocialSharing, private dataLocal: DataLocalService ) { }

  ngOnInit() {
    console.log(this.enFavoritos);
    
  }

  abrirNoticia() {
    console.log('noticia', this.noticia.url);
    const browser = this.iab.create(this.noticia.url, '_system');
  }
  async lanzarmenu() {
    let guardarBnt;
    if (this.enFavoritos) {
      guardarBnt = {

        text: 'Delete Favorite',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Del Favorite clicked');
          this.dataLocal.BorrarNoticias(this.noticia);
        }
    };
    } else {
      guardarBnt = {

          text: 'Favorite',
          icon: 'heart',
          cssClass: 'action-dark',
          handler: () => {
            console.log('Favorite clicked');
            this.dataLocal.guardarNoticias(this.noticia);
          }
      };
    }
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Share',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          );
        }
      }, 
      guardarBnt, 
      {
        text: 'Cancel',
        icon: 'close',
        cssClass: 'action-dark',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
