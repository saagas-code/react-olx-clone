
export const formatPrice = (price: number) => {
    const formatPrice = price.toString().replace('.',',')
    return formatPrice
}
export const currencyFormat = (num: number) => {
    return 'R$ ' + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

// function currencyFormat(num: string) {
//     return '$' + num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
// }