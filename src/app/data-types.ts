export interface SignUp{
    Name: string,
    Password: string,
    Email: string
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