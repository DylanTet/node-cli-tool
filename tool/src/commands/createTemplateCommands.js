const logger = require('../logger')('commands:start');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

function createServerFile(config, port) {
    logger.highlight('  Creating a template server file...    ');

    setTimeout(() => {
        const templatePath = path.join(__dirname, '../templates/create-server.js.ejs');
        const template = fs.readFileSync(templatePath, 'utf-8');
        const renderedCode = ejs.render(template, { port });
        fs.writeFileSync('./index.js', renderedCode);
        logger.log("server index.js file created successfully");
    }, 0);
}

module.exports = { createServerFile };