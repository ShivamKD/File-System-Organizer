const fs = require('fs')
const path = require('path')

let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"],
    image: ['jpg', 'jpeg']
}

function organizeFn(currentPath) {

    if (currentPath == undefined) {
        console.log('Will be Working in the Current Working Directory')
        organizeFn(process.cwd())
        return
    }
    else {

        let doesExit = fs.existsSync(currentPath)
        
        if (doesExit) {
            destinationPath = path.join(currentPath, 'OrganizedData')
            if (fs.existsSync(destinationPath) == false) {
                fs.mkdirSync(destinationPath)
                console.log(destinationPath)
            }
        }
        else {
            console.log('Provided Path doesnot exists')
            return
        }
    }

    organizeHelper(currentPath, destinationPath)
}

function getCategory(name) {
    ext = path.extname(name)
    ext = ext.slice(1)

    for (t in types) {
        categoryType = types[t]
        for (i = 0; i < categoryType.length; i++) {
            if (ext == categoryType[i])
                return t
        }
    }

    return "others"
}

function copyFile(fileAddress, destination) {
    category = getCategory(fileAddress)

    destinationAddress = path.join(destination, category)

    if (!fs.existsSync(destinationAddress)) {
        fs.mkdirSync(destinationAddress)
    }

    fileName = path.basename(fileAddress)
    destFileAdd = path.join(destinationAddress, fileName)

    fs.copyFileSync(fileAddress, destFileAdd)
    fs.unlinkSync(fileAddress)
    console.log(fileName, "copied to", category)


}

function organizeHelper(source, destination) {

    let files = fs.readdirSync(source)

    for (file in files) {
        fileAddress = path.join(source, files[file])
        console.log(fileAddress)
        let isFile = fs.lstatSync(fileAddress).isFile()

        if (isFile) {
            copyFile(fileAddress, destination)
        }
    }
}


module.exports = {
    organizeKey: organizeFn
}

