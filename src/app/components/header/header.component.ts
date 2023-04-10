import { Component, Input } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: `./header.component.html`,
})
export class HeaderComponent{
  
  private _cart: Cart = { items: []};
  itemsQuantity = 0;
  @Input()
  
    get cart(): Cart {
        return this._cart;
    }

    set cart(cart: Cart){
      this._cart = cart;

      //Usings the cart.items array to only pick the quantity from the object.
      this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev,current) => prev + current, 0);   
    }

    //private method shall not be used with the Html file only use it in cartService
    constructor(private cartService:CartService){}

    getTotal(items: Array<CartItem>):number {
      return this.cartService.getTotal(items);
    }

    onClearCart(){
      this.cartService.clearCart();
    }

  // cols = 3;

  

  // onColumnsCountChange(colsNum: number):void {
  //   this.cols = colsNum;
  // }

}
