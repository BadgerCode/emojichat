const SuggestionMode = {
    None: 0,
    Emoji: 1,
    PlayerName: 2
};




class State { }

State.PlayerList = [];
State.CurrentLine = 0;
State.Active = false;
State.FadeTimeSeconds = 5;
State.SuggestionMode = SuggestionMode.None;



module.exports = {
    State: State,
    SuggestionMode: SuggestionMode
}