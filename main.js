const {app, BrowserWindow} = require('electron')
const path = require('path')

let mainWindow

const PROJECT_FOLDER = 'django-visual'
const VENV_FOLDER = 'venv'

const PATH = path.join(__dirname, PROJECT_FOLDER, VENV_FOLDER, 'bin')

let python = path.join(PATH, 'python')

let script = path.join(__dirname, PROJECT_FOLDER, 'django_visual', 'manage.py runserver --noreload')

console.log(python)
console.log(script)

let options = {
  cwd: path.join(__dirname, PROJECT_FOLDER),
  env: {
    "PATH": PATH
  },
  windowsHide: false,
  shell: true
}

let pyProc = require('child_process').spawn(python, [script], options)

if (pyProc != null) {
    console.log(pyProc)
    console.log('Child process success')
}

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: "Visual Django",
    webPreferences: {
      // preload: path.join(__dirname, 'run-django.js')
    }
  })

  mainWindow.loadFile('index.html')

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

app.on('will-quit', function () {
  pyProc.kill()
  pyProc = null
})