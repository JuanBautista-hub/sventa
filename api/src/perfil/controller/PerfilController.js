
let respuesta;
let user;

/* =======Promesa para enviar y recibir datos en el async await =========*/

const perfilCrud = {
        //2 request getAll getOne
    PerfilGet: (req, res, next) => {
        const { userID } = req.params;
        PerfilGetByIdAndALl(userID).then((user) => { response.success(req, res, user, 200) }).catch(next)
    },
    //2 request post patch
    PerfilPostAndPacth: (req, res, next) => {
        const { userID } = req.params
        const userData = req.body

        const avatarRuta = req.file

        PerfilCreate(userData, userID, avatarRuta).then((user) => {

            response.success(req, res, user, 200)
        }).catch(next)
    },

    PerfilDelete: (req, res, next) => {
        const { userID } = req.params
        PerfilDestroy(userID).then((resp) => { response.success(req, res, resp, 200) }).catch(next)
    },


}

module.exports = perfilCrud;