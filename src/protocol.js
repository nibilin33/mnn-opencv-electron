import os from 'os'
import { app } from 'electron'
import { execFile } from 'child_process'
import fs from 'fs-extra'
import path from 'path'


const isDevelopment = process.env.NODE_ENV !== 'production'


function copyResources() {
    if (!isDevelopment) {
        return
    }
    const resourceDir = path.join(app.getPath('userData'), 'resource')
    if (!fs.existsSync(resourceDir)) {
        fs.mkdirSync(resourceDir, { recursive: true })
    }
    fs.copySync(path.join(__dirname, '..', 'bin'), resourceDir)
}
copyResources()
function executeResource(model,args) {
    let resourcePath
    if (os.platform() === 'win32') {
        resourcePath = path.join(path.dirname(__dirname), 'resource', `${model}-win.exe`)
    } else if (os.platform() === 'darwin') {
        resourcePath = path.join(path.dirname(__dirname), 'resource', `${model}-macos`)
    } else if (os.platform() === 'linux') {
        resourcePath = path.join(path.dirname(__dirname), 'resource', `${model}-linux`)
    }
    return new Promise((resolve, reject) => {
        // 检查文件是否存在
        if (fs.existsSync(resourcePath)) {
            console.log('Resource file exists:', resourcePath)
            execFile(resourcePath, args, (error, stdout, stderr) => {
                if (error) {
                    console.error('\x1b[31m%s\x1b[0m', 'Error executing file:', error)
                    reject(error)
                    return
                }
                if (stderr) {
                    reject(stderr)
                    return
                }
                console.log('stdout:', stdout)
                // 使用正则表达式提取 RESULTJSON
                const resultJsonMatch = stdout.match(/RESULTJSON\[\s*(\{.*\})\s*\]/)
                if (resultJsonMatch) {
                    const resultJson = JSON.parse(resultJsonMatch[1])
                    resolve(resultJson)
                } else {
                    console.error('RESULTJSON not found in stdout')
                    reject('RESULTJSON not found in stdout')
                }
            })
        } else {
            console.error('\x1b[31m%s\x1b[0m', 'Resource file does not exist:', resourcePath)
            reject('Resource file does not exist:'+resourcePath)
        }
    });
}

export async function callAImodel(model, filePath) {
    const args = ['--image', filePath]
    return await executeResource(model,args)
}