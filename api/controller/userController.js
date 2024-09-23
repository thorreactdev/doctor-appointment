export const signOutUser = async(req, res , next) =>{
    res.clearCookie("token").status(200).json({
        success : true,
        message : "Logout Successfull"
    });
}
