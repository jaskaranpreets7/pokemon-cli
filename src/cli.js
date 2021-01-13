import minimist from 'minimist' 
import chalk from 'chalk'
import figlet from 'figlet'

import { help } from './help';
import { version } from './version';
import { pokemonBySerialNo, pokemonByName, getAllPokemons } from './utils';


export async function cli(argsArray){
    const args = minimist(argsArray.slice(2));
    let cmd = args._[0] || 'help';
  
    if (args.version || args.v) {
      cmd = 'version';
    }
  
    if (args.help || args.h) {
      cmd = 'help';
    }

    console.log(
        chalk.redBright(
            figlet.textSync('POKEMON CLI',{ horizontalLayout: 'full'})
        )
    )

    switch(cmd){
        case "version":
            version()
            break

        case "help":
            help(args)
            break

        case "all-pokemons":
            getAllPokemons(args)
            break

        case "poke-by-serial-no":
            if(args.serialID || args['serial-id'] || args.s){
                pokemonBySerialNo(args)
            }else{
                help(args)
            }

            break

        case "poke-by-name":
            if(args.name || args['name'] || args.n){
                pokemonByName(args)
            }else{
                help(args)
            }
            break

        default:
            console.error(`"${cmd}" is not a valid command!`);
            break;
    }
}