const priceWithDiscount = (price, discount=1)=>{

    const discountAmount = Math.floor((Number(price) * Number(discount))/100);
    const actualPrice = Number(price) - Number(discountAmount);

    return actualPrice;
}

export default priceWithDiscount;