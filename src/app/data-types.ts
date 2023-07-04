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
    // canAdd?: boolean,
    ProductNotes?: string,
    ProductId?: number
    // ProductCartId?: number
}

export interface CartItem{
    ProductName: string,
    ProductPrice: number,
    ProductAvailableQuantity: number,
    ProductImage: string,
    ProductNotes?: string,
    ProductId?: number[]
    // id: number,
    // ProductCartId: number
}

export interface Order{
    OrderType: string,
    ProductName: string,
    ProductQuantity: string,
    ProductPrice: string,
    ProductNotes: string,
    TotalPrice: number,
    OrderDate: Date,
    // CardHolderName?: string,
    // CardNumber?: number,
    // ExpirationDate?: Date,
    // CVV?: number,
    CustomerName?: String,
    CustomerMobile?: number,
    TableNo?: number,
    Address?: string,
    DeliveryFees?: number,
    ServiceFees?: number,
    // ProductId: number[],
    OrderStatus: string,
    id?: string
}

export interface SalesData{
    [Date: string]:{
        [Category: string]:{
            Quantity: number,
            Revenue: number
        }
    }
}