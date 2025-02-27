const { registerService,loginService } = require("../services/member.service");


const register = async (req,res) => {
    const data = await registerService(req.body);
    return res.status(200).json(data);
}

const login = async (req,res) => {
    const { membername,password } = req.body;
    const data = await loginService(membername,password);
    return res.status(200).json(data);
}

module.exports = {
    register,
    login
}