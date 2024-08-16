#!/usr/bin/env node

import { Command } from "commander"
import { commanderDemo } from "./commander/demo"
import { commanderUpdateVersion } from "./commander/updateVersion"
import { commanderAbstractSyntaxTree } from "./commander/abstractSyntaxTree"

/**
 * 單元測試用
 *
 * @param name 名子
 * @returns
 */
export function hello(name: string): string {
  return `Hello ${name}`
}

async function run() {
  const program = new Command()

  program
    .version("1.0.1")
    .option("-d, --demo <number>", "Demo 把輸入數值加 5")
    .option("-u, --updateVersion <string>", "更新 appapi 的 DEV 環境版號")
    .option("-a, --ast <string>", "abstract syntax tree")
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

  /**
   * 更新 appapi 的 DEV 環境版號
   */
  commanderUpdateVersion(opts.updateVersion)

  /**
   * abstract syntax tree
   */
  commanderAbstractSyntaxTree(opts.ast)
}

run()
