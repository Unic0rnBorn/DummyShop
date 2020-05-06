class CartItem {
  quantity: string;
  productPrice: string;
  productTitle: string;
  sum: string;
  constructor(quantity, productPrice, productTitle, sum) {
    this.quantity = quantity;
    this.productPrice = productPrice;
    this.productTitle = productTitle;
    this.sum = sum;
  }
}

export default CartItem;
