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

const invalidateCodeBuildCache = () => {
  return new Promise((resolve, reject) => {
    const codeBuildProjectName = process.env.CODEBUILD_BUILD_ID.split(":")[0]
    exec(`aws codebuild invalidate-project-cache --project-name ${codeBuildProjectName}`, (error, stdout, stderr) => {
      if(error) reject(error)
      if(stderr) {
        reject(stderr)
      }else {
        resolve()
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
        console.log("package.json has been modified, reinstall node_modules")
        await installNodeModules()
        // console.log("invalidate codebuild cache")
        // await invalidateCodeBuildCache()
      }else {
        console.log("use codebuild cache node_modules")
      }
    }else {
      console.log("node modules does not exist install")
      await installNodeModules()
    }
    process.exit(0)
  }catch(error) {
    console.log(error)
    process.exit(1)
  }
}

run()

