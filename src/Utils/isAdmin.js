const isAdmin = (role) => {
    if(role === "Admin"){
        return true;
    }else{
        return false;
    }
}

export default isAdmin;