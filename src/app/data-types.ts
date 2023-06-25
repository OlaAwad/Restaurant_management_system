export interface SignUp{
    Name: string,
    Password: string,
    Email: string,
    EmployeeType: string,
    RegistrationDate: string,
    id: number
}

export interface Login{
    Email: string,
    Password: string
}

export interface SideNavToggle{
    ScreenWidth: number,
    Collapsed: boolean
}

export interface Category{
    CategoryName: string,
    CategoryImage: string,
    id: number
}

export interface Product{
    ProductName: string,
    ProductImage: string,
    ProductPrice: number,
    ProductQuantity?: number,
    ProductAvailableQuantity: number,
    ProductCategory: string
    id: number,
    // ProductCartId?: number
}

export interface CartItem{
    ProductName: string,
    ProductPrice: number,
    ProductAvailableQuantity: number,
    ProductImage: string,
    // id: number,
    // ProductCartId: number
}

export interface Order{
    OrderType: string,
    ProductName: string,
    ProductQuantity: number,
    ProductPrice: number,
    TotalPrice: number
}