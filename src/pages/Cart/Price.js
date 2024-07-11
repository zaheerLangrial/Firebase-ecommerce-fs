export const TotlePrice = (products) => {
    let price = 0;
    products.map((product) => {
        price += product.quantity * product.price
    })
    return price
}