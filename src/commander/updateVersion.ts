import { readFileSync, writeFileSync } from "fs"
import { format } from "date-fns"
import * as dotenv from "dotenv"
dotenv.config()
import { exec } from "child_process"
import * as path from "path"
import { createClient } from "redis"

/**
 * 更新 appapi 的 DEV 環境版號
 * @param opts
 * @returns
 */
export async function commanderUpdateVersion(environment: string): Promise<void> {
  if (environment === undefined) {
    return
  }
  try {
    var UPDATE_DEV_PATH = ""
    var UPDATE_UAT_PATH = ""

    if (process.env.UPDATE_DEV_PATH === undefined || process.env.UPDATE_UAT_PATH === undefined) {
      console.error(".env 檔案中未設定 UPDATE_DEV_PATH 和 UPDATE_UAT_PATH 環境變數。")

      // 使用範例
      await readRedisKeyAsJson("ts-cli:env")
        .then((data) => {
          console.log("Data:", data)
          UPDATE_DEV_PATH = data.UPDATE_DEV_PATH
          UPDATE_UAT_PATH = data.UPDATE_UAT_PATH
        })
        .catch((error) => {
          console.error("Error:", error)
          return
        })
    }
    else{
      UPDATE_DEV_PATH = process.env.UPDATE_DEV_PATH
      UPDATE_UAT_PATH = process.env.UPDATE_UAT_PATH
    }
    var env = environment.trim()
    if (env) {
      // 將 filePath 變數改為一個陣列，包含多個檔案路徑
      let filePaths = []
      if (env.toLowerCase() === "dev") {
        filePaths = [
          `${UPDATE_DEV_PATH}appapi/appapi-deployment.yaml`,
          `${UPDATE_DEV_PATH}appapi/appapi-schedule.yaml`,
          `${UPDATE_DEV_PATH}appapi-xf/appapi-xf-deployment.yaml`,
          `${UPDATE_DEV_PATH}appapi-kline/appapi-kline-deployment.yaml`,
          `${UPDATE_DEV_PATH}appapi-asia/appapi-asia-deployment.yaml`,
          // 可以繼續添加更多檔案路徑
        ]
        // 呼叫函數並指定路徑
        await updateAndContinue(process.env.UPDATE_DEV_PATH)
      } else {
        filePaths = [
          `${UPDATE_UAT_PATH}appapi/h1-appapi-deployment.yaml`,
          `${UPDATE_UAT_PATH}appapi/h1-appapi-schedule.yaml`,
          `${UPDATE_UAT_PATH}appapi-xf/appapi-xf-deployment.yaml`,
          `${UPDATE_UAT_PATH}appapi-kline/h1-appapi-kline-deployment.yaml`,
          `${UPDATE_UAT_PATH}appapi-asia/h1-appapi-asia-deployment.yaml`,
          // 可以繼續添加更多檔案路徑
        ]
        // 呼叫函數並指定路徑
        await updateAndContinue(process.env.UPDATE_UAT_PATH)
      }

      // 使用迴圈遍歷每個檔案路徑
      filePaths.forEach((filePath) => {
        // 在這裡對每個檔案執行修改操作
        // 例如，讀取檔案、修改內容、保存檔案等
        console.log(`正在處理檔案: ${filePath}`)
        // 假設的修改操作，您需要根據實際需求實現具體的檔案處理邏輯
        // 讀取檔案內容
        let content = readFileSync(filePath, "utf8")

        const contentArray = content.split("\n")
        contentArray.forEach((line, index) => {
          const searchValue = findMatchingContent(env, line)
          if (searchValue) {
            console.log("找到了: " + searchValue)

            // 獲取今天的日期並格式化為 YYYYMMDD 的格式
            const today = format(new Date(), "yyyyMMdd")

            // 使用正則表達式匹配 h1-appapi:DEV 後面跟隨的日期
            let regex
            if (env.toLowerCase() === "dev") {
              regex = /(h1-appapi:DEV)(\d{8})-(\d+)/
            } else {
              regex = /(h1-appapi:UAT)(\d{8})-(\d+)/
            }
            const match = line.match(regex)

            if (match && match[2] !== today) {
              // 如果日期不是今天，則替換為今天的日期
              line = line.replace(regex, `$1${today}-01`)
              contentArray[index] = line.replace(searchValue, newVersion)

              // 取出新的版號
              const matchNewVersion = line.match(regex)
              console.log("日期已更新為今天的日期:", matchNewVersion[0])
            } else {
              console.log("日期已是今天，無需更新。")
              // 使用正則表達式替換 -01 為 -02
              var newVersion = incrementVersionInString(searchValue)
              console.log("修改為: " + newVersion)
              contentArray[index] = line.replace(searchValue, newVersion)
            }
          }
        })

        const oneLineString = contentArray.join("\n")
        // 將修改後的內容寫回檔案
        writeFileSync(filePath, oneLineString, "utf8")
        console.log(filePath + "\n檔案更新成功。")
      })
    }
  } catch (error) {
    console.error(error)
  }
}

// 將版本號加 1 的函數
function incrementVersionInString(foundString: string): string {
  return foundString.replace(/-(\d+)$/, (match, num) => {
    const incrementedNum = parseInt(num, 10) + 1
    return `-${incrementedNum.toString().padStart(num.length, "0")}`
  })
}

// 從一行文字中找到匹配的字符串
function findMatchingContent(env: string, line: string): string | null {
  // 修改正則表達式以匹配行中的任何位置
  let regex
  if (env.toLowerCase() === "dev") {
    regex = /(h1-appapi:DEV)(\d{8})-(\d+)/
  } else {
    regex = /(h1-appapi:UAT)(\d{8})-(\d+)/
  }

  // 使用 match 方法尋找匹配的內容
  const matches = line.match(regex)

  // 如果找到匹配，返回第一個匹配的結果
  if (matches && matches.length > 0) {
    return matches[0]
  } else {
    // 如果沒有找到匹配，返回 null
    return null
  }
}

// 修改 fetchLatestGitUpdate 函數以返回 Promise
function fetchLatestGitUpdate(directoryPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // 確保路徑是絕對的
    const fullPath = path.resolve(directoryPath)

    // 使用指定的目錄路徑作為工作目錄來執行 git pull
    exec("git pull", { cwd: fullPath }, (error, stdout, stderr) => {
      if (error) {
        console.error(`執行時出錯: ${error}`)
        reject(error)
        return
      }
      if (stdout) {
        console.log(`標準輸出: ${stdout}`)
      }
      if (stderr) {
        console.log(`錯誤輸出: ${stderr}`)
      }
      resolve()
    })
  })
}

// 確定執行完 git pull
async function updateAndContinue(directoryPath: string) {
  try {
    await fetchLatestGitUpdate(directoryPath)
    // 在這裡繼續後續操作
    console.log("git pull 完成，現在繼續後續操作...")
  } catch (error) {
    console.error("無法完成 git pull", error)
  }
}

/**
 * 
 * @param key 查詢 Redis 的 key
 * @returns 
 */
async function readRedisKeyAsJson(key: string): Promise<any> {
  const client = createClient()

  client.on("error", (err) => console.log("Redis Client Error", err))

  await client.connect()

  try {
    const value = await client.get(key)
    if (value) {
      return JSON.parse(value)
    } else {
      throw new Error(`Key ${key} does not exist`)
    }
  } catch (error) {
    console.error("Error reading key from Redis:", error)
    throw error
  } finally {
    await client.disconnect()
  }
}
