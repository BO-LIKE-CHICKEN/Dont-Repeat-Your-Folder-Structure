import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "dryfs.makeMyFolder",
    (uri: vscode.Uri) => {
      let folderPath: string;
      if (fs.lstatSync(uri.fsPath).isDirectory()) {
        // 선택한 리소스가 폴더일 때
        folderPath = uri.fsPath;
      } else {
        // 선택한 리소스가 파일일 때
        folderPath = path.dirname(uri.fsPath);
      }

      // 사용자로부터 폴더 이름을 입력 받음
      vscode.window
        .showInputBox({ prompt: "Enter the folder name" })
        .then((folderName) => {
          if (folderName) {
            let newFolderPath = path.join(folderPath, folderName);

            // 폴더 생성
            if (!fs.existsSync(newFolderPath)) {
              fs.mkdirSync(newFolderPath);
            }

            // index.tsx 및 styles.ts 파일 생성
            fs.writeFileSync(path.join(newFolderPath, "index.tsx"), "");
            fs.writeFileSync(path.join(newFolderPath, "styles.ts"), "");

            vscode.window.showInformationMessage(
              "Folder and files created successfully!"
            );
          }
        });
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
