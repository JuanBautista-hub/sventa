
const { Request, Response, NextFunction } = require('express');
const JWToken = require('jsonwebtoken');
const config = require('../../config/configSecret')

const checkJWT = (Request, Response, NextFunction) => {

let token;
token = Request.headers['token'];
 if(token === undefined){
     token = Request.params.token;
    
 }
    let jwtPayload;

    try {
        
        jwtPayload = JWToken.verify(token, config.jwtSecret);
        Response.locals.jwtPayload = jwtPayload
       
    } catch (error) {
        return Response.status(401).json({ message: 'Not Authorized'} );
    }
    const { userId, email,rol } = jwtPayload;
    const newToken = JWToken.sign({ userId, email ,rol}, config.jwtSecret, { expiresIn: '5' });
    Response.setHeader('token', newToken);
    NextFunction()
}

module.exports = checkJWT