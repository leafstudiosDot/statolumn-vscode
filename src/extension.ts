// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

class StatolumnViewProvider implements vscode.WebviewViewProvider {
	public static readonly viewType = 'statolumn.home';
	private _view?: vscode.WebviewView;

	constructor(
		private readonly _extensionUri: vscode.Uri,
	) { }

	public resolveWebviewView(
		webviewView: vscode.WebviewView,
		_context: vscode.WebviewViewResolveContext,
		_token: vscode.CancellationToken
	) {
		this._view = webviewView;

		webviewView.webview.options = {
			enableScripts: true,
			localResourceRoots: [this._extensionUri],
		};

		webviewView.webview.html = `<html></html>`;

		webviewView.webview.onDidReceiveMessage((data) => {
			switch (data.type) {
				case 'alert':
					vscode.window.showErrorMessage(data.value);
					return;
			}
		});
	}
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Statolumn for VSCode is running...');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('statolumn-vscode.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Statolumn for Visual Studio Code!');
	});

	context.subscriptions.push(disposable);

	const statolumn_provider = new StatolumnViewProvider(context.extensionUri);

	context.subscriptions.push(vscode.window.registerWebviewViewProvider(StatolumnViewProvider.viewType, statolumn_provider));
}

// This method is called when your extension is deactivated
export function deactivate() {}
