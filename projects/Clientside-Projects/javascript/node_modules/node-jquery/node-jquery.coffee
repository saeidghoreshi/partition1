(->
window = require("jsdom").jsdom().createWindow()
$ = require("jQuery").create(window)
global.window = window
global.jQuery = $
global.$ = $
)()
