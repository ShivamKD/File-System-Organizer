const fs = require('fs')
const chalk = require('chalk')
const path = require('path')


function treeFn(dirPath){

    if(dirPath == undefined){
        treeHelper(process.cwd(),"")
        return 
    }
    else{
        let doesExist = fs.existsSync(dirPath)
        if( doesExist){
            treeHelper(dirPath, "")
            return 
        }
        else{
            console.log(chalk.red("Provided Path is Invalid"))
            return
        }
    }
}

function treeHelper(dirPath, indent){
    let isFile = fs.lstatSync(dirPath).isFile()

    if(isFile){
        let fileName = path.basename(dirPath)
        console.log(chalk.green(indent + "├──" + fileName))
    }
    else{
        //console.log("In Else")
        let dirName = path.basename(dirPath)
        console.log(chalk.blue(indent + "└──" + dirName))
        let childrens = fs.readdirSync(dirPath)
        //console.log(childrens.length)

        for(let i = 0; i < childrens.length; i++){
            let childPath = path.join(dirPath, childrens[i])
            //console.log(childPath)
            treeHelper(childPath, indent + "\t")
            //console.log(indent, i)
        }
    }
}
module.exports = {
    treeKey : treeFn
}