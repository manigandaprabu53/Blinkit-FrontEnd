const ApiRoutes = {
    register: {
        path: "/user/signup",
        authenticate: false
    },

    login: {
        path: "/user/login",
        authenticate: false
    },

    forgot_password: {
        path: "/user/forgot-password",
        authenticate: false
    },

    verify_OTP: {
        path: "/user/verify-otp",
        authenticate: false
    },

    reset_password: {
        path: "/user/reset-password",
        authenticate: false
    },

    refresh_token: {
        path: "/refresh-token",
        authenticate: true
    },

    user_details: {
        path: "/user/user-details",
        authenticate: true
    },

    logout: {
        path: "/user/logout",
        authenticate: true
    },

    uploadAvatar: {
        path: "/user/upload-avatar",
        authenticate: true
    },

    updateUser: {
        path: "/user/update-user",
        authenticate: true
    },

    addCategory: {
        path: "/category/add-category",
        authenticate: true
    },

    uploadImage: {
        path: "/file/upload-image",
        authenticate: true
    },

    getCategory: {
        path: "/category/get-category",
        authenticate: false
    },

    updateCategory: {
        path: "/category/update",
        authenticate: true
    },

    deleteCategory: {
        path: "/category/delete",
        authenticate: true
    },

    createSubCategory: {
        path: "/subcategory/create",
        authenticate: true
    },

    getSubCategory: {
        path: "/subcategory/get",
        authenticate: false
    },

    updateSubCategory: {
        path: "/subcategory/update",
        authenticate: true
    },

    deleteSubCategory: {
        path: "/subcategory/delete",
        authenticate: true
    },

    createProduct: {
        path: "/product/create",
        authenticate: true
    },

    getProducts: {
        path: "/product/get",
        authenticate: false
    },

    getProductsByCategory: {
        path: "/product/get-product-by-category",
        authenticate: false
    },

    getProductByCategoryAndSubCategory: {
        path: "/product/get-product-by-category-and-subcategory",
        authenticate: false
    },

    getProductDetails: {
        path: "/product/get-product-details",
        authenticate: false
    },

    updateProductDetails: {
        path: "/product/update-product-details",
        authenticate: true
    },

    deleteProduct: {
        path: "/product/delete-product",
        authenticate: true
    },

    searchProduct: {
        path: "/product/search-product",
        authenticate: false
    },

    addToCart: {
        path: "/cart/add-to-cart",
        authenticate: true
    },

    getCartItem: {
        path: "/cart/get"
    },

    updateCartItem: {
        path: "/cart/update-quantity"
    },

    deleteCartItem: {
        path: "/cart/delete-cart-item"
    },

    createAddress: {
        path: "/address/create"
    },

    getAddress: {
        path: "/address/get"
    },

    updateAddress: {
        path: "/address/update"
    },

    deleteAddress: {
        path: "/address/disable"
    },

    cashOnDelivery: {
        path: "/order/cash-on-delivery"
    },

    payment_url: {
        path: "/order/checkout"
    },

    getOrderItem: {
        path: "/order/get-order-list"
    }
}

export default ApiRoutes;