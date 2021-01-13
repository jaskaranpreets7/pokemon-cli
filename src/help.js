import chalk from 'chalk'

const menus = {
    main: `
        ${chalk.greenBright('pokemon [command] <options>')}
        ${chalk.blueBright('version')} ............ show package version
        ${chalk.blueBright('help')} ............... show help menu for a command
        ${chalk.blueBright('all-pokemons')} ............... get all pokemons
        ${chalk.blueBright('poke-by-serial-no')} ............... get pokemon's detail by serial number
        ${chalk.blueBright('poke-by-name')} ............... get pokemon's detail by name
    `,
    'all-pokemons':`
        ${chalk.greenBright('pokemon all-pokemons <options>')}
        --limit, -l ..... get all pokemon with limit.
        --offset, -o ..... get all pokemon with some offset.
    `,
    'poke-by-serial-no': `
        ${chalk.greenBright('pokemon poke-by-serial-no <options>')}
        --serialID, -s ..... get pokemon details by serial number.
    `,
    'poke-by-name': `
        ${chalk.greenBright('pokemon poke-by-name <options>')}
        --name, -n ..... get pokemon details by name.
    `
  }

  export function help(args) {
    const subCmd = args._[0] === 'help' ? args._[1] : args._[0]
    console.log(menus[subCmd] || menus.main)
  }