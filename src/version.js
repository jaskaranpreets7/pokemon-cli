export function version(){
    const packageJson = require('../package.json')
    console.log(packageJson.version)
}