import { Project } from "ts-morph"

/**
 * abstract syntax tree
 * @param opts
 * @returns
 */
export function commanderAbstractSyntaxTree(opts) {
  if (opts === undefined) {
    return
  }
  try {
    if (opts) {
      const project = new Project()
      const sourceFile = project.createSourceFile(
        "sample.ts",
        `
function greet(name: string) {
    console.log('Hello, ' + name);
}
function greet2(name: string) {
    console.log('Hello, ' + name);
}
`
      )
      sourceFile.getFunctions().forEach((functionDeclaration) => {
        console.log("Function name:", functionDeclaration.getName())
      })
    } else {
      console.log("沒有 abstract syntax tree 參數內容")
    }
  } catch (error) {
    console.error(error)
  }
}
