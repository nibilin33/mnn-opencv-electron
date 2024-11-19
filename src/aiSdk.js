import { contextBridge } from 'electron'
import { ipcRenderer } from 'electron'
import { v4 as uuidv4 } from 'uuid'

contextBridge.exposeInMainWorld('aiSdk', {
    callModel: (model, args) => {
        return new Promise((resolve, reject) => {
            const requestId = uuidv4()
            const channel = `ai:callModel:${requestId}`
            ipcRenderer.once(channel, (event, res) => {
                if (res.status === 'fail') return reject(res)
                resolve(res)
            })
            ipcRenderer.send('ai:callModel', { requestId, model, args })
        })
    }
})

