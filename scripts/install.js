const fs = require("fs")
const path = require("path")
const { exec } = require("child_process")

const checkNodeModulesExist = () => {
  return new Promise((resolve) => {
    const nodeModulesPath = path.join(__dirname, "../node_modules")
    fs.readdir(nodeModulesPath, (err) => {
      if(err) {
        return resolve(false)
      }
      resolve(true)
    })
  })
}

const doInstallNodeModules = () => {
  return new Promise((resolve, reject) => {
    exec("npm install", (error, stdout, stderr) => {
      if(error) reject(error)
      let stream
      if(stderr) {
        console.log(stderr)
        stream = stderr
      }else {
        console.log(stdout)
        stream = stdout
      }
      resolve(stream)
    })
  })
}

const run = async () => {
  try {
    const isNodeModuleExist = await checkNodeModulesExist()
    if(isNodeModuleExist) {
      console.log("node modules exist but install")
      await doInstallNodeModules()
    }else {
      console.log("node modules not exist and do install")
      await doInstallNodeModules()
    }
  }catch(error) {
    console.log(error)
    process.exit(1)
  }
}

run()

