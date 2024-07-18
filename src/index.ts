#!/usr/bin/env node

import { Command } from "commander"
import { commanderDemo } from "./commander/demo"

/**
 * 單元測試用
 *
 * @param name 名子
 * @returns
 */
export function hello(name: string): string {
  return `Hello ${name}`
}

let message: string = "Hello, World!"
console.log(message)

async function run() {
  const program = new Command()

  program
    .version("1.0.0")
    .option("-d, --demo <number>", "Demo 把輸入數值加 5")
    .showHelpAfterError("<使用 -h 參數可以提示更多使用功能>") // 錯誤提示訊息
    .configureOutput({
      // 此处使输出变得容易区分
      writeOut: (str) => process.stdout.write(`[OUT] ${str}`),
      writeErr: (str) => process.stdout.write(`[ERR] ${str}`),
      // 将错误高亮显示
      outputError: (str, write) => write(str),
    })
    .parse(process.argv)

  const opts = program.opts()

  /**
   * Demo 把輸入數值加 5
   */
  commanderDemo(opts.demo)
}

run()
