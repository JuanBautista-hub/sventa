'use strict'
const nodemailer = require("nodemailer");
const JWToken = require('jsonwebtoken');
const config = require('../../config/configSecret')

const emailSend = async (req, res, next) => {
    let mail = req.correo;
    let pass = req.contrasenia;
    let user = req.username;
    let name = req.nombre
    let respuesta = res
    const token = JWToken.sign({ mail, user }, config.jwtSecret, { expiresIn: '24h' });
    try {
        sendEmail(user, pass, mail, name, token, respuesta).catch(console.error)
    } catch (error) {
        return 'Ubo un error'
    }
    return "Enviado Correctamente"
}


async function sendEmail(dataUser, dataPass, dataMail, dataName, token, respuesta) {

    let testAccount = await nodemailer.createTestAccount();
    let info;
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        // host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "",
            pass: "",
        },

    });
    if (respuesta === undefined) {
        console.log(respuesta + "Entro aqui")
        info = await transporter.sendMail({
            from: '',
            to: `${dataMail}`,
            subject: "BIENVENIDA(O)  SHIFTER",
            text: "Confirma tu cuenta",
            html: `
      <div class="container">
      <h1>Estimado(a) ${dataName}.</h1>
      <P> Te has registrado correctamente a THE SHIFT, solo necesitas verificar tu cuenta.</P>

      <p style="color:back"> User: ${dataUser}</p>

      Verifica tu cuenta  <a href="http://localhost:3000/auth/verification/${token}" target="_blank">aqui </a>
     <p> La url tiene un tiempo de expiracion de 24hrs </p>
      <p>Después, ya puedes disfrutar de los beneficios que THE SHIFT tiene para ti. Asegúrate de utilizar tu usuario que se te proporciono y tu nueva contraseña como metodos de autenticación en la plataforma.</p>

      <p style="color:back">
      <br>¡Gracias formar parte THE SHIFT Shifter!
      <br> El equipo de THE SHIFT
      <br><a href="www.shift.me">www.shift.me</a> 
      </P>

     <p class="small"><span>AVISO IMPORTANTE:</span> Este correo electrónico y/o el material adjunto es para uso exclusivo de la persona o la entidad a la que expresamente se le ha enviado, el cual contiene información confidencial. Si no es el destinatario legítimo del mismo, por favor repórtelo inmediatamente a la cuenta del remitente y elimínelo. Cualquier revisión, almacenamiento, retransmisión, difusión o cualquier otro uso de este correo, por personas o entidades distintas a las del destinatario legítimo, queda expresamente prohibida. Este correo electrónico no pretende ni debe ser considerado como constitutivo de ninguna relación legal, contractual o de otra índole similar.<p>
     <p style="color:back"><a href="https://www.shift.me/files/legales.pdf">Legales</a></p>

     </div>`,
        });

    } else {
        console.log(respuesta + "Entro aqui else")
        info = await transporter.sendMail({
            from: 'gomezperezjuanbautista@gmail.com',
            to: `${dataMail}`,
            subject: "Correo electronico verificado",
            text: `${respuesta}`,
            html: `
      <div class="container">
      <h1>Estimado(a) ${dataName}.</h1>
      <P> Tu cuenta se ha verificado correctamente ya eres parte  THE SHIFT!!
       Asegúrate de utilizar tu usuario que creaste con anterioridad y tu  contraseña como metodos de autenticación
      <p style="color:back">
      <br>¡Gracias por usar THE SHIFT Shifter!
      <br> El equipo de THE SHIFT
      <br><a href="www.shift.me">www.shift.me</a> 
      </P>

     <p class="small"><span>AVISO IMPORTANTE:</span> Este correo electrónico y/o el material adjunto es para uso exclusivo de la persona o la entidad a la que expresamente se le ha enviado, el cual contiene información confidencial. Si no es el destinatario legítimo del mismo, por favor repórtelo inmediatamente a la cuenta del remitente y elimínelo. Cualquier revisión, almacenamiento, retransmisión, difusión o cualquier otro uso de este correo, por personas o entidades distintas a las del destinatario legítimo, queda expresamente prohibida. Este correo electrónico no pretende ni debe ser considerado como constitutivo de ninguna relación legal, contractual o de otra índole similar.<p>
     <p style="color:back"><a href="https://www.shift.me/files/legales.pdf">Legales</a></p>

     </div>`,
        });

    }

    console.log("Message sent : %s", info.messageId);
    console.log("Preview Url", nodemailer.getTestMessageUrl(info))

}


module.exports = emailSend