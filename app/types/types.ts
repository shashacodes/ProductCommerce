export interface ImageSources {
    id: number;
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  }
  
  export interface Product {
    image: ImageSources;
    name: string;
    category: string;
    price: number;
    quantity?: number; 
  }
  