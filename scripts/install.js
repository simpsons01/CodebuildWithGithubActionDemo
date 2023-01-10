const fs = require("fs")
const path = require("path")
const { exec } = require("child_process")

const getMergeRangeCommitId = () => {
  const start = process.env.CODEBUILD_WEBHOOK_PREV_COMMIT
  const end = process.env.CODEBUILD_RESOLVED_SOURCE_VERSION
  return {
    start,
    end
  }
} 

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

const deleteNodeModules = () => {
  return new Promise((resolve, reject) => {
    exec("rm -rf node_modules", (error, stdout, stderr) => {
      if(error) return  reject(error)
      if(stderr) return reject(stderr)
      resolve()
    })
  })
}

const installNodeModules = () => {
  return new Promise((resolve, reject) => {
    exec("npm install", (error, stdout, stderr) => {
      if(error) reject(error)
      if(stderr) console.log(stderr)
      else if(stdout) console.log(stdout)
      resolve()
    })
  })
}

const checkPackageJsonModified = (start, end) => {
  return new Promise((resolve, reject) => {
    exec(`git log ${start}..${end} --oneline --pretty='format:' --name-only`, (error, stdout, stderr) => {
      if(error) reject(error)
      if(stderr) {
        reject(stderr)
      }else {
        const isPackageJsonChanged = stdout.split("\n").some(str => str === "package.json")
        resolve(isPackageJsonChanged)
      }
    })
  })
}

const run = async () => {
  try {
    const isNodeModuleExist = await checkNodeModulesExist()
    if(isNodeModuleExist) {
      const { start: startCommitId, end: endCommitId } = getMergeRangeCommitId()
      const isPackageJsonModified = await checkPackageJsonModified(startCommitId, endCommitId)
      if(isPackageJsonModified) {
        console.log("package.json has been modified, delete cache and install node_modules")
        console.log("delete node_modules......")
        await deleteNodeModules()
        console.log("install node_modules......")
        await installNodeModules()
      }else {
        console.log("use codebuild s3 cache node_modules")
      }
    }else {
      console.log("node modules does not exist, install node_modules......")
      await installNodeModules()
    }
    process.exit(0)
  }catch(error) {
    console.log(error)
    process.exit(1)
  }
}

run()

