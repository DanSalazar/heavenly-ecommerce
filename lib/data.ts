export interface Product {
  img_src: string;
  title: string;
  price: number;
  discount: boolean;
  discount_number: number;
  department: string;
  category: string;
}

export const product: Product = {
  img_src:
    'https://utfs.io/f/581dce5b-a7cb-4407-999a-989883cee2d0-9l3n4k.webp',
  title: "New ANINE BING 100% cashmere slim knit sweater women's sweater",
  price: 100,
  discount: false,
  discount_number: 0,
  department: 'men',
  category: 'shoes'
}