import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeleteProductPageRoutingModule } from './delete-product-routing.module';

import { DeleteProductPage } from './delete-product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeleteProductPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DeleteProductPage]
})
export class DeleteProductPageModule {}
