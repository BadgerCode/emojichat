var fs = require('fs');

const luaFile = '../emojichat/lua/emojichat/cl_html.lua';
const htmlFile = './dist/index.html';

var args = require('minimist')(process.argv.slice(2));
var watchForChanges = args["watch"] == true;


function UpdateLuaFile()
{
    fs.readFile(htmlFile, 'utf8', function(err, contents) {
        if(err != null) {
            console.log("LUA: error reading file");
            console.log(err);
        }

        var luaFileContents = `eChat.config.html = [===[\n${contents}\n]===]`;

        fs.writeFile(luaFile, luaFileContents, function(err) {
            if(err != null) {
                console.log("LUA: error writing file")
                console.log(err);
            }
            else {
                console.log("LUA: UPDATED cl_html.lua\n");
            }
        });
    });
}

if(!fs.existsSync(htmlFile)) {
    console.log("LUA-ERROR: HTML file not compiled!")
    process.exit();
    return;
}


if(watchForChanges) {
    var watcher = fs.watch(htmlFile, (event, filename) => {
        if (filename) {
            console.log(`LUA: ${filename} file changed`);
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
