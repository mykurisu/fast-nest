import fs from 'fs'
import path from 'path'
import chalk from 'chalk'


const REG = new RegExp('_script/moduleCreator')
const ARGS = process.argv
const newModuleName = ARGS.pop() || 'Not Found'


const _fileName = newModuleName.slice(0, 1).toLocaleLowerCase() + newModuleName.slice(1)
const _moduleName = newModuleName.slice(0, 1).toLocaleUpperCase() + newModuleName.slice(1)
const modulesDir = path.join(__dirname, `../modules/${_fileName}`)
const moduleContent = templateCreator('module')
const controllerContent = templateCreator('controller')
const serviceContent = templateCreator('service')

function templateCreator(type: string) {
    const template = fs.readFileSync(path.join(__dirname, `./template/${type}.template`), 'utf-8')
    const content = template.replace(/{{_moduleName}}/g, _moduleName).replace(/{{_fileName}}/g, _fileName)
    return content
}

function moduleCreate() {
    if (REG.test(newModuleName) || newModuleName === 'Not Found') {
        return console.log(chalk.red('请输入待新建的模块名'))
    }

    fs.stat(modulesDir, (err, stat) => {
        if (!err) {
            return console.log(chalk.red('模块重名，请更改'))
        }

        
        if (stat) {
            const isFile = stat.isFile()
            if (isFile) return console.log(chalk.red('模块重名，请更改'))
        }

        fs.mkdir(modulesDir, (err) => {
            if (err) {
                return console.log(chalk.red('模块创建失败'))
            }

            try {
                fs.writeFileSync(path.join(modulesDir, `./${_fileName}.module.ts`), moduleContent)
                fs.writeFileSync(path.join(modulesDir, `./${_fileName}.controller.ts`), controllerContent)
                fs.writeFileSync(path.join(modulesDir, `./${_fileName}.service.ts`), serviceContent)
                console.log(chalk.green('模块创建完毕'))
            } catch (error) {
                console.log(error)
            }
            
        })


    })
}

moduleCreate()