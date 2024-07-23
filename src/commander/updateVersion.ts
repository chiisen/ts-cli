import { readFileSync, writeFileSync } from "fs"
import { format } from "date-fns"
import * as dotenv from 'dotenv';
dotenv.config();

/**
 * 更新 appapi 的 DEV 環境版號
 * @param opts
 * @returns
 */
export function commanderUpdateVersion(replaceValue: string): void {
  if (replaceValue === undefined) {
    return
  }
  try {
    var replace = replaceValue.trim()
    if (replace) {
      process.env.UPDATE_PATH
      // 將 filePath 變數改為一個陣列，包含多個檔案路徑
      const filePaths = [
        `${process.env.UPDATE_PATH}appapi/appapi-deployment.yaml`,
        `${process.env.UPDATE_PATH}appapi/appapi-schedule.yaml`,
        `${process.env.UPDATE_PATH}appapi-xf/appapi-xf-deployment.yaml`,
        `${process.env.UPDATE_PATH}appapi-kline/appapi-kline-deployment.yaml`,
        `${process.env.UPDATE_PATH}appapi-asia/appapi-asia-deployment.yaml`,
        // 可以繼續添加更多檔案路徑
      ]
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
          const searchValue = findMatchingContent(line)
          if (searchValue) {
            console.log("找到了: " + searchValue)

            // 獲取今天的日期並格式化為 YYYYMMDD 的格式
            const today = format(new Date(), "yyyyMMdd")

            // 使用正則表達式匹配 h1-appapi:DEV 後面跟隨的日期
            const regex = /(h1-appapi:DEV)(\d{8})-(\d+)/
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
function findMatchingContent(line: string): string | null {
  // 修改正則表達式以匹配行中的任何位置
  const regex = /h1-appapi:DEV\d{8}-\d+/

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
