var fs = require('fs');

function LogInfo(message) { console.log('%s\n', message);}
function LogSuccess(message) { console.log('\x1b[32m%s\x1b[0m\n', message);}
function LogFailure(message) { console.log('\x1b[31m%s\x1b[0m\n', message);}

const luaFile = '../emojichat/lua/emojichat/cl_html.lua';
const htmlFile = './dist/index.html';

var args = require('minimist')(process.argv.slice(2));
var watchForChanges = args["watch"] == true;


function UpdateLuaFile()
{
    fs.readFile(htmlFile, 'utf8', function(err, contents) {
        if(err != null) {
            LogFailure("LUA: error reading file");
            console.log(err);
        }

        var luaFileContents = `eChat.config.html = [===[\n${contents}\n]===]`;

        fs.writeFile(luaFile, luaFileContents, function(err) {
            if(err != null) {
                LogFailure("LUA: error writing file")
                console.log(err);
            }
            else {
                LogSuccess("LUA: UPDATED cl_html.lua");
            }
        });
    });
}

if(!fs.existsSync(htmlFile)) {
    LogFailure("LUA-ERROR: HTML file not compiled!")
    process.exit();
    return;
}


if(watchForChanges) {
    var watcher = fs.watch(htmlFile, (event, filename) => {
        if (filename) {
            LogInfo(`LUA: ${filename} file changed`);
            UpdateLuaFile();
        }
    });

    process.on('SIGINT', function() {
        watcher.close();
        process.exit();
    });
}
else {
    UpdateLuaFile();
}

