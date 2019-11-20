import { Injectable } from '@nestjs/common'
import fs from 'fs'
import path from 'path'

@Injectable()
export class FileService {
    
    async handleUpload2Local(files: any[]) {
        const fileList = files.slice(0)
        const file = fileList[0]
        const filePath = path.join('../../', 'uploads/', file.originalname)
        fs.writeFileSync(filePath, file.buffer)
    }

}
