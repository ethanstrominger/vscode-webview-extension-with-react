try {
	require("module-alias/register");
} catch (e) {
	console.log("module-alias import error !");
}
import * as vscode from "vscode";
import { EXTENSION_CONSTANT } from "constant";
import { LeftPanelWebview } from "providers/left-webview-provider";
import { VscodeMobTimer } from "vscode-mobtimer";
export function activate(context: vscode.ExtensionContext) {
  const debug = context.extensionMode === vscode.ExtensionMode.Development;
  if (debug) {
		process.env.REACT_APP_WEBSOCKET_URL = `ws://localhost:${
			process.env.REACT_APP_WEBSOCKET_PORT || "4000"
		}`;
  }
  console.log(
		"In extension.ts, process.env.REACT_APP_WEBSOCKET_URL = ",
		process.env.REACT_APP_WEBSOCKET_URL
  );
  console.log('"mobtimer.display" is now active!');
  let vscodeMobTimer = new VscodeMobTimer();
  console.log("Done");

  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand("mobtimer.display", () => {
		vscodeMobTimer.update();
  });

  context.subscriptions.push(vscodeMobTimer);
  context.subscriptions.push(disposable);
	let helloWorldCommand = vscode.commands.registerCommand(
		"mobtimer.helloWorld",
		() => {
			vscode.window.showInformationMessage(
				"Hello World from vscode-webview-extension-with-react!"
			);
		}
	);
	context.subscriptions.push(helloWorldCommand);

	// Register view
	const leftPanelWebViewProvider = new LeftPanelWebview(context?.extensionUri, {});
	let view = vscode.window.registerWebviewViewProvider(
		EXTENSION_CONSTANT.LEFT_PANEL_WEBVIEW_ID,
		leftPanelWebViewProvider,
	);
	context.subscriptions.push(view);

};

// this method is called when your extension is deactivated
export function deactivate() {}
