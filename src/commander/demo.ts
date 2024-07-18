/**
 * Demo 把輸入數值加 5
 * @param opts 
 * @returns 
 */
export function commanderDemo(opts) {
  if (opts === undefined) {
    return
  }
  try {
    if (opts) {
      console.log("you ordered:" + opts)
    } else {
      console.log("沒有 demo 參數內容")
    }
  } catch (error) {
    console.error(error)
  }
}
