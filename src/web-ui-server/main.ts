import Hapi from 'hapi';
import path from 'path';
import Inert from 'inert';
import { appHandler } from './AppHandler';

async function startServer() {
    const server = Hapi.server({
        port: 3000
    });

    await server.register(Inert);

    server.route({
        method: 'GET',
        path: '/static/{param*}',
        handler: {
            directory: {
                path: path.resolve(__dirname, '../../ui-static')
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/src/{param*}',
        handler: {
            directory: {
                path: path.resolve(__dirname, '../web-ui')
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/favicon.ico',
        handler: {
            file: path.resolve(__dirname, '../../ui-static/favicon.ico')
        }
    });

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: appHandler
    });

    await server.start();
}

startServer();