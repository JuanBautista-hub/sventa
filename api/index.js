
const express = require('express');
const development = require('./config/development');
const route = require('./src/route/index');
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');
const nocache = require("nocache");
const path = require('path');
const toobusy = require('toobusy-js');

const start = async () => {
    try {
        const app = express();
        app.use(cors());
        app.use(nocache());
        app.use(helmet());
        //parsea los json
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        //evita ataques de cambio de encabezado x-content
        app.use(helmet.noSniff());
        app.use(helmet.hidePoweredBy());
        //engaña de la tecnologia usada back
        app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }));
        //evita ataque DoS
        app.use(function (req, res, next) {
            if (toobusy()) {
                res.send(503, "Server Too Busy");
            } else {
                next();
            }
        })
        //evita atque contaminacion de parametros
        app.use(hpp());
        app.use('/', route);
        app.listen(development.PORT, () => { console.log(development.PORT) });
        app.use('/public', express.static(path.join(__dirname, 'public')))
        console.log(__dirname)

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
start();
