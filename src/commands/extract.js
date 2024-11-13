
import EmlParser from 'eml-parser/index.js'
import * as fs from 'node:fs'
import chalk from 'chalk'

function extract(filename) {
   
    const ext = filename.split('.').pop();
    if(!ext) {
        console.log(chalk.red('Imput file has no supported file extension'));
        return;
    }

    console.log(chalk.green('File extension is: '+ ext))
    const ea = new EmlParser(fs.createReadStream(filename))
    if (ext === 'eml') {
            ea.parseEml()
            .then(result => {
                result.attachments.forEach((attachment) =>
                    fs.writeFile(attachment.filename, attachment.content, (err) => err && console.error(err))
                ) 
            })
            .catch( err => {
                console.log(err)
            })
    }
    if (ext === 'msg') {
        ea.parseMsg()
            .then(result => {
                result.attachments.forEach((attachment) => {
                    var buffer = Buffer.from(attachment.content)
                    fs.writeFile(attachment.fileName, buffer, (err) => err && console.error(err))
                }) 
            })
            .catch( err => {
                console.log(err)
            })
    }
}
export default extract