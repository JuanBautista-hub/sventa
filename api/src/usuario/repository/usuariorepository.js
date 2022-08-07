const {Usuario} = require('../../sqlserver');

const getAll = async()=>Usuario.findAll()
const login = async(user)=> Usuario.findOne({where:{username:user}})

module.exports = {getAll,login}