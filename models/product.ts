class Product {
  id: string;
  ownerId: string;
  title: string;
  imageUrl: string;
  description: string;
  price: string;
  constructor(id, ownerId, title, imageUrl, description, price) {
    this.id = id;
    this.ownerId = ownerId;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
}

export default Product;
