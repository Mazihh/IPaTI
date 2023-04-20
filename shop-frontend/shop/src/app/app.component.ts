import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public navCtrl: NavController,
    private menu: MenuController,
    private dataService: DataService,

    ) {}


  goToAddProduct(){
    this.navCtrl.navigateForward('add-product');
    this.menu.close('main-menu');

  }
  goToDeleteProduct(){
    this.navCtrl.navigateForward('delete-product');
    this.menu.close('main-menu');

  }


  logout(){
    this.dataService.removeToken('token')
    this.menu.close('main-menu');
    this.navCtrl.navigateForward('login');
  }



}
