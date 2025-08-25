import path from 'node:path'
import http from 'node:http'
import fs from 'node:fs/promises'
import { sendData } from './utils/sendData.js'
import { getContentType } from './utils/getContentType.js'

const PORT = 2000

const __dirname = import.meta.dirname

const server = http.createServer(async (req, res) => {
  const publicDir = path.join(__dirname, 'public');

  const pathToResource = path.join(publicDir, req.url === '/' ? 'index.html' : req.url)
  const ext = path.extname(pathToResource)
  const contentTypes = getContentType(ext);
  const content = await fs.readFile(pathToResource)
 sendData(res, 200,contentTypes, content)

})

server.listen(PORT, ()=> console.log(`Connected on port: http://localhost:${PORT}`))
