export class PlayerOption {
    constructor(name){
        this.name = name;
    }
}

export function search(players, partialName) {
    var possibleNames = [];

    if(players.length < 1)
        return possibleNames;
    
    if(partialName.length < 1) {
        return players.map(player => new PlayerOption(player.name));
    }

    var lowerPartialName = partialName.toLocaleLowerCase();
    var exactMatches = [];
    var startsWith = [];
    var contains = [];
    
    players.forEach(player => {
        var lowerPlayerName = player.name.toLocaleLowerCase();

        if(lowerPlayerName == lowerPartialName)
            exactMatches.push(new PlayerOption(player.name));
        else {
            var indexOfPartialName = lowerPlayerName.indexOf(lowerPartialName);

            if(indexOfPartialName === 0)
                startsWith.push(new PlayerOption(player.name));
            else if(indexOfPartialName !== -1)
                contains.push(new PlayerOption(player.name))
        }
    });

    exactMatches.sort();
    startsWith.sort();
    contains.sort();

    return exactMatches.concat(startsWith.concat(contains));
}
