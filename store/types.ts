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
export interface Product {
    id: string;
    category: Category;
    brand: Brand
    name: String;
    price: string
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
}