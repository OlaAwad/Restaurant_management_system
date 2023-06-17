export interface SignUp{
    name: string,
    password: string,
    email: string
}

export interface Login{
    email: string,
    password: string
}

export interface SideNavToggle{
    screenWidth: number,
    collapsed: boolean
}