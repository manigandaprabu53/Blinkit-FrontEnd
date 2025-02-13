const displayPriceInRupees = (price)=>{
    return new Intl.NumberFormat("en-IN",{
        style: "currency",
        currency: "INR"
    }).format(price)
}

export default displayPriceInRupees;