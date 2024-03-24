export interface Billboard {
    id : string;
    label : string;
    imageUrl: string;
};

export interface Category {
    id: string;
    billBoard: Billboard;
}''