var fs = require('fs');

function LogInfo(message) { console.log('%s\n', message); }
function LogSuccess(message) { console.log('\x1b[32m%s\x1b[0m\n', message); }
function LogFailure(message) { console.log('\x1b[31m%s\x1b[0m\n', message); }

const LUA_MAX_FILE_SIZE = 65536 - 100;
const LUA_FILES_PATH = '../emojichat/lua/emojichat/';
const LUA_INCLUDES_FILE = 'sh_html_init.lua';
const LUA_INCLUDES_FILE_PATTERN = `
if SERVER then
    AddCSLuaFile()
    {SERVER_LINES}
elseif CLIENT then
    emojichatHTML = { }
    {CLIENT_LINES}
end`;

const LUA_HTML_FILES_PATH = LUA_FILES_PATH + 'cl_html/';
const LUA_FILE_NAME_PREFIX = 'html';
const LUA_FILE_NAME_SUFFIX = '.lua';
const HTML_FILE = './dist/index.html';

var args = require('minimist')(process.argv.slice(2));
var watchForChanges = args["watch"] == true;


function UpdateLuaFile() {
    fs.readFile(HTML_FILE, 'utf8', function (err, htmlFileContents) {
        if (err != null) {
            LogFailure("LUA: error reading file");
            console.log(err);
        }

        var numLuaFiles = Math.ceil(htmlFileContents.length / LUA_MAX_FILE_SIZE);
        var htmlLuaFileNames = [];

        for (let f = 0; f < numLuaFiles; f++) {
            let htmlSegement = htmlFileContents.substring(f * LUA_MAX_FILE_SIZE, (f + 1) * LUA_MAX_FILE_SIZE);
            let fileContents = `table.insert(emojichatHTML, [===[${htmlSegement}]===])`;
            let fileName = LUA_FILE_NAME_PREFIX + f + LUA_FILE_NAME_SUFFIX;

            htmlLuaFileNames.push(fileName);
            fs.writeFile(LUA_HTML_FILES_PATH + fileName, fileContents, function (err) {
                if (err != null) {
                    LogFailure("LUA: error writing file " + fileName)
                    console.log(err);
                }
                else {
                    LogSuccess("LUA: UPDATED " + fileName);
                }
            });
        }


        fs.writeFile(LUA_FILES_PATH + LUA_INCLUDES_FILE, BuildLuaIncludesFile(htmlLuaFileNames), function (err) {
            if (err != null) {
                LogFailure("LUA: error writing includes file")
                console.log(err);
            }
            else {
                LogSuccess("LUA: UPDATED " + LUA_INCLUDES_FILE);
            }
        });
    });
}

function BuildLuaIncludesFile(htmlFileNames) {
    var serverLines = "";
    var clientLines = "";

    htmlFileNames.forEach(htmlFileName => {
        serverLines += `\n\tAddCSLuaFile('emojichat/cl_html/${htmlFileName}')`;
        clientLines += `\n\tinclude('emojichat/cl_html/${htmlFileName}')`;
    });

    return LUA_INCLUDES_FILE_PATTERN.replace("{SERVER_LINES}", serverLines).replace("{CLIENT_LINES}", clientLines);
}



if (!fs.existsSync(HTML_FILE)) {
    LogFailure("LUA-ERROR: HTML file not compiled!")
    process.exit();
    return;
}


if (watchForChanges) {
    var watcher = fs.watch(HTML_FILE, (event, filename) => {
        if (filename) {
            LogInfo(`LUA: ${filename} file changed`);
            UpdateLuaFile();
        }
    });

    process.on('SIGINT', function () {
        watcher.close();
        process.exit();
    });
}
else {
    UpdateLuaFile();
}

