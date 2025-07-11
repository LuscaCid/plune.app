import { app, BrowserWindow, ipcMain } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import express from "express";
import { autoUpdater } from "electron-updater"
const __dirname = path.dirname(fileURLToPath(import.meta.url))
// import { ChildProcessWithoutNullStreams, spawn } from "child_process";
process.env.APP_ROOT = path.join(__dirname, '..')

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST
let win: BrowserWindow | null
// let backendProcess : ChildProcessWithoutNullStreams |null = null; 
function createWindow() {
  const serverProcess = express();
  const staticPath = path.join(__dirname, '..', 'dist');
  serverProcess.use(express.static(staticPath));

  //em proceso de build, o redirecionamento dos arquivos estaticos (index.html) esta para dist/index.html
  serverProcess.listen(3002, () => console.log('Serving the dist application in: http://localhost:3002'));
  serverProcess.get("*", (_, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  })
 
  win = new BrowserWindow({
    frame: false,
    transparent : false,
    show :false,
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      
      nodeIntegration : true,
      contextIsolation : true,
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })
  win.webContents.on('before-input-event', (event, input) => {
  if (input.key === 'F12' || (input.control && input.key === 'I')) {
    event.preventDefault(); // Impede que o DevTools seja aberto
  }
});
  ipcMain.on('minimize', () => {
    win?.minimize()
  })
  ipcMain.on('resize', () => {
    if (win?.isMaximized()) 
    {
      win.unmaximize();
      return;
    }
    win?.maximize()
  });
  ipcMain.on('close', () => {
    win?.close()
  })
  win.setMinimumSize(1000, 600);
  win.setSize(1200, 700);
  win.webContents.on('did-finish-load', () => {
    win?.show();
    win?.focus();
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadURL("http://localhost:3002")
  }
}
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
  autoUpdater.checkForUpdatesAndNotify();
    createWindow()
  }
})

app.whenReady().then(createWindow)
// app.on('quit', () => backendProcess?.kill())

