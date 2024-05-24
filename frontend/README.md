Made with:
Windows, Visual Studio Code
-----------------------------------------------------
Computer language: JavaScript, React, Chakra Ui, Vite
------------------------------------------------------
Set up:
```npm install, npm run dev, (2e) terminal: json-server events.json  ```
-----------------------------------------------------------------------------------
# React-Advanced-Project

1e time in your 1e terminal: npm install

2e time or else: npm run dev

To run the virtual server in your 2e terminal use: json-server events.json  


**** Please make sure your events.json file is located on your desktop or somewhere else, but not in your "starter" folder....! Otherwise you get an loop ******

![React 0](https://github.com/aelyakoubi/React-Advanced-Project/assets/115151631/b67d12cf-ca33-4ca2-89ad-f3f4f42a5f33)


Having problems to starting up the server:

Install json-server globally using npm: If you haven't installed json-server yet, you can do so globally using npm (Node Package Manager). Open your terminal (PowerShell) and run the following command:

Copy code:
```npm install -g json-server```
This command will install json-server globally on your system, making it available as a command-line tool.

Verify Installation: After installation, verify if json-server is correctly installed by running the following command:

css
Copy code:
```json-server --version```

Still having problems? Then see under here:

Open PowerShell as Administrator: Right-click on the PowerShell icon and choose "Run as administrator" to ensure you have the necessary permissions to modify the execution policy.

Set Execution Policy: Run the following command to set the execution policy to allow script execution:

powershell
Copy code:
```Set-ExecutionPolicy RemoteSigned```
This command sets the execution policy to RemoteSigned, which allows you to run scripts that you've written yourself without needing them to be digitally signed. You might need to confirm the change by typing "Y" and pressing Enter.

Verify Execution Policy: You can verify that the execution policy has been set correctly by running:

powershell
Copy code:
```Get-ExecutionPolicy```
It should return "RemoteSigned".

Try Running json-server Again: After adjusting the execution policy, try running the json-server command again:

powershell
Copy code:
```json-server --version```
This time, it should execute without encountering the previous error.

![React1](https://github.com/aelyakoubi/React-Advanced-Project/assets/115151631/3f360556-d80b-4ed9-a47c-7a0016f8b28a)

![React2](https://github.com/aelyakoubi/React-Advanced-Project/assets/115151631/486e52e1-849f-4d38-adf7-f0824aa334c5)

Thanks and credits to the Winc Academy in Amsterdam the Netherlands!
