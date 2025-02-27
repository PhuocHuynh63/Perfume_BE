
const successResponse = (res,data,message = SUCESS) => {
    return res.status(200).json({
        success: true,
        message: message,
        data: data
    });
}