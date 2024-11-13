#! /usr/bin/env node

import * as cmd from 'commander'
import chalk from 'chalk'
import extract from './commands/extract.js'

/**
 * @class
 *
 * <h3>Parse and extract email attachements</h3>
 *
 *
 * @constructor
 * @public
 */
class EmailAutomator {
    constructor() {
        
        const program = new cmd.Command();
        program
          .name('a-xtract')
          .description('CLI which extracts attachments from msg or eml files')
          .version('0.0.1')

        program.command('extract')
          .description('Extracts all attachments from given mail file')
          .argument('<string>', 'Filename of message file')
          .action(extract)  

        program.parse()
    }
    test() {
        console.log(chalk.green('test'))
    }
}


try {
    const ea = new EmailAutomator()
} catch (error) {
     console.error('Ups:', error.message)
}


export default EmailAutomator