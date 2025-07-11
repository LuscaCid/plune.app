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
  const port = Math.round(Math.random() * 60_000)
  const serverProcess = express();
  const staticPath = path.join(__dirname, '..', 'dist');
  serverProcess.use(express.static(staticPath));

  //em proceso de build, o redirecionamento dos arquivos estaticos (index.html) esta para dist/index.html
  serverProcess.listen(port, () => console.log('Serving the dist application in: http://localhost:' + port));
  serverProcess.get("*", (_, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  })

  win = new BrowserWindow({
    frame: Boolean(process.env.VITE_PUBLIC),
    transparent: false,
    show: false,
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
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
    if (win?.isMaximized()) {
      win.unmaximize();
      return;
    }
    win?.maximize()
  });
  ipcMain.on('close', () => {
    win?.close()
  })
  win.setMinimumSize(1000, 650);
  win.setSize(1200, 700);
  win.webContents.on('did-finish-load', () => {
    win?.show();
    win?.focus();
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadURL("http://localhost:" + port)
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
    createWindow()
  }
})

app.whenReady().then(() => {
  setupAutoUpdater()
  createWindow()
})
// app.on('quit', () => backendProcess?.kill())

function setupAutoUpdater() {
  autoUpdater.checkForUpdatesAndNotify();

  autoUpdater.on("update-available", () => {
    console.log("🔄 Atualização disponível.");
  });

  autoUpdater.on("update-downloaded", () => {
    console.log("✅ Atualização baixada.");
    autoUpdater.quitAndInstall();
  });

  autoUpdater.on("error", (err) => {
    console.error("❌ Erro no auto-updater:", err);
  });
}