
export interface IUser{
    _id: string;
    name: string;
    surname: string;
    number: string;
    movil: string;
    email: string;
    email_verified: boolean;
    image: string;
}


export interface IProperty{
    createdBy?: string
    _id?: string
    searchType: string;
    poblation: string;
    neighborhood: string;
    propertyType: string;
    title: string;
    bedrooms: string;
    address: string;
    m2: string;
    propertyHeight: string;
    buildingHeight: string;
    bathrooms: string;
    price: string;
    garage: string;
    pool: string;
    furnished: string;
    pets: string;
    terrace: string;
    garden: string;
    elevator: string;
    accessibleProperty: string;
    a_c: string;
    heating: string;
    floorsType: string;
    windowsType: string;
    doorsType: string;
    mainDoor: string;
    antique: string;
    status: string;
    independentLiving: string;
    hotWater: string;
    laundry: string;
    bail: string;
    images: (File | Images)[];
}

export interface IPropertyCard {
    _id?: string;
    bail: string;
    price: string;
    m2: string;
    title: string;
    searchType: string;
    bedrooms: string;
    bathrooms: string;
    address: string;
    neighborhood?: string;
    poblation: string;
    propertyType?: string;
    images: (File | Images)[]
}

export interface Images{
    data: string;
    _id: string;
}

export interface ISearch {
    searchType: string;
    city: string;
    neighborhood: string;
    price: IPrice;
    propertyType: string;
    searchTypeForHome?: string;
}

export interface ISetSearchState {
    setSearchState: React.Dispatch<React.SetStateAction<ISearch>>
}


export interface IPrice{
    lowestPrice: number;
    highestPrice: number;
}

export interface SignInButtonProps {
    role: string;
    text: string;
    setRole: React.Dispatch<React.SetStateAction<string | null>>
}



export interface IPropertyState { properties: IProperty[], filter: IProperty[], loading: boolean, noMatches: boolean }
export interface IUserState { users: IUser[] }
