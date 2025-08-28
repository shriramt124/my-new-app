import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
const { exec } = require('child_process'); // Keep this for now, though we'll adjust its usage

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation:true
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.


// Handle IPC: Run PowerShell command
ipcMain.handle('run-powershell', async (event, scriptName, args = []) => {
  return new Promise((resolve, reject) => {
    let scriptPath;
    if (app.isPackaged) {
      // In packaged app, scripts are in the resources/scripts folder
      // We need to find the correct path to the 'scripts' directory within the unpacked resources
      // This is typically next to the 'app.asar' or 'app.asar.unpacked' folder
      scriptPath = path.join(process.resourcesPath, 'scripts', scriptName);
      // Ensure the script path is correct for packaged applications
      if (!fs.existsSync(scriptPath)) {
           // If the script is in the root of the scripts folder
          scriptPath = path.join(process.resourcesPath, 'scripts', scriptName);
      }
    } else {
      // In development, scripts are in the project root's 'scripts' folder
      // Adjust the path relative to the current file (__dirname)
      scriptPath = path.join(__dirname, '..', '..', 'scripts', scriptName);
    }

    // Check if the script file actually exists
    if (!fs.existsSync(scriptPath)) {
      console.error(`Script not found at: ${scriptPath}`);
      return resolve({ success: false, error: `Script not found: ${scriptName}`, output: '' });
    }

    // Construct the command to execute
    // For PowerShell scripts, use powershell.exe -File
    const command = 'powershell.exe';
    const commandArgs = ['-File', scriptPath, ...args];

    const scriptProcess = spawn(command, commandArgs, {
      cwd: path.dirname(scriptPath), // Set the working directory to the script's directory
      shell: true // Use shell to ensure powershell.exe can be found and executed correctly
    });

    let stdoutData = '';
    let stderrData = '';

    scriptProcess.stdout.on('data', (data) => {
      stdoutData += data.toString();
    });

    scriptProcess.stderr.on('data', (data) => {
      stderrData += data.toString();
    });

    scriptProcess.on('error', (err) => {
      console.error(`Failed to start script process: ${err}`);
      resolve({ success: false, error: `Failed to start script: ${err.message}`, output: '' });
    });

    scriptProcess.on('close', (code) => {
      if (code === 0) {
        resolve({ success: true, output: stdoutData.trim() });
      } else {
        console.error(`Script exited with code ${code}`);
        console.error('Stderr:', stderrData);
        resolve({ success: false, error: `Script execution failed with code ${code}`, output: stderrData.trim() });
      }
    });
  });
});

// Helper function to get script path based on packaging
const getScriptPath = (scriptName) => {
  if (app.isPackaged) {
    // In packaged app, scripts are in the resources/scripts folder
    return path.join(process.resourcesPath, 'scripts', scriptName);
  } else {
    // In development, scripts are in the project root's 'scripts' folder
    return path.join(__dirname, '..', '..', 'scripts', scriptName);
  }
};