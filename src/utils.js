import axios from 'axios'
import Table from 'cli-table3'
import CLI from 'clui'

const Spinner = CLI.Spinner
const baseURL = 'https://pokeapi.co/api/v2/pokemon'

// get all pokemons 
export async function getAllPokemons(args){
    let limit = args.limit || args.l;
    let offset = args.offset || args.o
    const status = new Spinner("fetching information, please wait....")

    status.start()

    try {
        const response = await axios.get(`${baseURL}`,{
            params : {
                limit,
                offset
            }
        })
    
        const table = new Table({ head: ["Serial No.", "Name"], colWidths: [20,20], wordWrap:true })
    
        if(response.data && response.data.results ){
            const { results } = response.data
            let ids = {} 
            results.map((pokemon) => {
                pokemon.url.split('/').map((item) => {
                    if(!ids[pokemon.name] && Number(item) !== 'NaN'){
                        ids[pokemon.name] = Number(item)
                    }
                })
                table.push([
                    ids[pokemon.name],
                    pokemon.name,
                ])
            })
        }
        status.stop()
        console.log(table.toString())
    } catch (error) {
        status.stop()
        console.log("Request got failed with status code: " + error.response.status)
    }finally{
        status.stop()
    }
}

// get pokemon by id 
export async function pokemonBySerialNo( args ){
    let serialId = args.serialID || args.s;
    const status = new Spinner("fetching information, please wait....")

    status.start()

    try {

        const response = await axios.get(`${baseURL}/${serialId}`)

        const table = new Table({ head: ["Name", "Weight", "Height","Base XP", "Type"], colWidths: [15, 15, 15,15,15], wordWrap:true })

        const { name, weight, height, base_experience, types } = response.data
        table.push([ name, weight, height, base_experience, getTypes(types) ])

        status.stop()
        console.log(table.toString())
    } catch (error) {
        status.stop()
        console.log("Request got failed with status code: " + error.response.status +'\n'+ "Please provide valid argumnets")
    }finally{
        status.stop()
    }
    
}

// get pokemon by name
export async function pokemonByName(args){
    let name = args.name || args['name'] || args.n;
    const status = new Spinner("fetching information, please wait....")

    status.start()

    try {
        const response = await axios.get(`${baseURL}/${name}`)

        const table = new Table({
            head: ["Serial No.", "Weight", "Height","Base XP", "Type"],
            colWidths: [15, 15, 15,15,15],
            wordWrap:true
        })
    
    
        const { id, weight, height, base_experience, types } = response.data
        table.push([ id, weight, height, base_experience, getTypes(types) ])

        status.stop()
        console.log(table.toString())
    } catch (error) {
        status.stop()
        console.log("Request got failed with status code: " + error.response.status)
    }finally{
        status.stop()
    }

}


const getTypes = function ( types ) {
    return types.map((item) => item.type.name).reduce((a,b)=> a +'/'+ b)
}