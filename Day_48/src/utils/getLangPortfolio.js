import fs from 'fs'
import path from 'path'

const getLangPortfolio = (fileJSON) => {
  const filePath = path.join(process.cwd(), 'src', 'database', fileJSON)
  const data = fs.readFileSync(filePath, 'utf8')

  return JSON.parse(data)
}

export default getLangPortfolio
