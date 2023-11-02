#!/usr/bin/env node
const arg = require('arg');
const logger = require('../src/logger')('bin');
const getConfig = require('../src/config/config-mgr');
const start = require('../src/commands/start');

try {
    const args = arg({
        '--start': Boolean,
        '--build': Boolean
    });

    logger.debug('Received args', args);

    if (args['--start']) {
        const config = getConfig();
        start(config);
    };
} catch (e) {
    logger.warning(e.message);
    console.log();
    usage();
}

function usage() {
    console.log(`tool [CMD]
    --start\tStarts the app
    --build\tBuilds the app`);
}