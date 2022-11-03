
export type accounts = {
    id: number,
    email: string,
    name: string,
    idState: number,
    password: string,
    token: string

}

export type erroLogin = {
    email?: {
        value?: string,
        msg?: string,
        param?: string,
        location?: string
    },
    password?: {
        value: string,
        msg: string,
        param: string,
        location: string
    },
    confirmPassword?: string
}

export type ErrorMessage = {
    error: string
}

export type states = {
    id: number,
    name: string
}

export type categories = {
    id: number,
    name: string,
    slug: string,
    img: string
}

export type ad = {
    id: number,
    idCategory: number,
    idState: number,
    idUser: number,
    title: string,
    description: string,
    dateCreated: Date,
    price: number,
    priceNegotiable: boolean,
    views: number,
    Images: [{
        default: string,
        id: number,
        idAd: number,
        url: string,
        location: string
    }],
    User: {
        id: number,
        name: string,
        email: string,
        idState: number,
    },
    State: {
        id: number,
        name: string
    },
    Category: {
        id: number,
        name: string,
        slug: string
    }

}

export type category = {
    id: number,
    name: string,
    slug: string,
    img: string
}

export type PriceValuesType = {
    formattedValue: string;
    value: string;
    floatValue: number;
}

export type UserInfo = {
    id: number,
    idState: number,
    name: string,
    email: string
    State: {
        id: number,
        name: string
    }
}

export type Images = {
    id: number,
    idAd: number,
    url: string,
    default: string
    location: string
}