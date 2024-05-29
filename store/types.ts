export interface Billboard {
    id: string;
    label: string;
    imageUrl: string;
};

export interface Category {
    id: string;
    name: any;
    billBoard: Billboard;
}

export interface ProductDescription {
    id: string
    productId:string
    generalDescription: string
    caracteristics: string
    createdAt:Date
    updatedAt:Date
}
export interface Caracteristics {
    title : string
    description: string
}

export interface Stock {
    quantity: Number
}
export interface Product {
    id: string;
    category: Category;
    brand: Brand
    name: String;
    productDescription: ProductDescription
    price: string
    stock?: Stock
    colors: Color[]
    isFeatured: boolean
    images: Images[];
}
export interface Brand {
    id: string
    name: string
}
export interface Images {
    id: string
    url: string
}
export interface Color {
    id: string
    value: string
    quantity:number
}