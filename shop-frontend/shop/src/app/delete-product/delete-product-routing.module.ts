import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteProductPage } from './delete-product.page';

const routes: Routes = [
  {
    path: '',
    component: DeleteProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeleteProductPageRoutingModule {}
