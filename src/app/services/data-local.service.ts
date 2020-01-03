import { Injectable } from '@angular/core';
import { Storage  } from '@ionic/Storage';
import { Article } from '../Interfaces/interface';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  naticias: Article[] = [];
  constructor(private storage: Storage, public toastController: ToastController) {
    this.cargarFavoritos();
  }
async presentToast( mensaje: string ) {
  const toast = await this.toastController.create({
    message: mensaje,
    duration: 1500
  });

  toast.present();
}
  guardarNoticias( noticia: Article) {
    const existe = this.naticias.find( noti => noti.title === noticia.title);
    if (! existe ) {
        this.naticias.unshift(noticia);
        this.storage.set('favoritos', this.naticias);
    }

    this.presentToast('Agreado a favorito');
  }
  async cargarFavoritos() {
    const favoritos = await this.storage.get('favoritos');
    if (favoritos) {
      this.naticias = favoritos;
    }

  }

  BorrarNoticias(noticia: Article) {
    this.naticias = this.naticias.filter(noti => noti.title !== noticia.title);
    this.storage.set('favoritos', this.naticias);
    this.presentToast('Borrado de  favorito');
  }
  
}
