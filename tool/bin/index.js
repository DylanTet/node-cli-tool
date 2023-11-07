#!/usr/bin/env node
const arg = require('arg');
const logger = require('../src/logger')('bin');
const getConfig = require('../src/config/config-mgr');
const templateCommands = require('../src/commands/createTemplateCommands');

try {
    const args = arg({
        '--template': String,
        '--port': Number
    });

    logger.debug('Received args', args);
    console.log(args);
    const command = args['--template'];

    if (command === undefined) {
        logger.warning(`Please provide a command to the tool.`);
        console.log();
        usage();
    }

    if (command === 'create-server') {
        const config = getConfig();

        if (args['--port'] === undefined) {
            console.log(args);
            logger.warning("Need to provide --port with --create-server.");
            console.log();
            usage();
        } else {
            const port = args['--port'];
            templateCommands.createServerFile(config, port);
        }
    }

} catch (e) {
    logger.warning(e.message);
    console.log();
    usage();
}

function usage() {
    console.log(`tool [CMD]
    --create-server\tCreates a server template index.js file.
        --port\tSpecify the port number when creating the server. Or default 80 is used.`);
}