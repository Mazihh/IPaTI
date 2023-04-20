import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../api/product.service';
import { Product } from '../models/product';
import { MenuController, NavController } from '@ionic/angular';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  list_products: Observable<Product[]>
  totalAmount: number = 0;
  token:string;
  constructor(
    private product_service: ProductService,
    private menu: MenuController,
    private dataService: DataService,
    public navCtrl: NavController,
    ) {

      this.calcTotalAmount()
    setTimeout(  async () => {
      this.list_products = await this.loadProduct()
      this.getToken()
  },2000)

   
  }


  openMainMenu() {
    this.menu.enable(true, 'main-menu');
    this.menu.open('main-menu');
  }

  async getToken(){

    const token = await this.dataService.getToken('token')
    if(token === null){
      this.navCtrl.navigateForward('login');
    }else{
      this.token = token;
      console.log(this.token)
    }
   }
   
   ionViewWillEnter(){
    this.getToken()
    console.log(this.token)
   }
   


  async calcTotalAmount(){
    const listPrice =  await this.product_service.getData('price')
    //this.totalAmount =
    if(listPrice){

      for (let i of listPrice) {
        console.log(i)
        this.totalAmount += await i
      }

    } 
    
  }

async loadProduct(){

  const products = await this.product_service.get_all_products()
  return products;
}




}
