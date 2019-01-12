var { TextAnalyser } = require('./text-analyser.js');

describe('TextAnalyser', function () {
    describe('FindInProgressEmoji', function () {
        it('Given the cursor is at the start of a string', function () {
            var result = TextAnalyser.FindInProgressEmoji(":fox", 0);

            expect(result.inProgress).toEqual(false);
            expect(result.incompleteEmojiCode).toEqual("");
        });

        describe('In progress emoji', function () {
            it('Given a cursor position after the colon', function () {
                var result = TextAnalyser.FindInProgressEmoji(":fo", 1);

                expect(result.inProgress).toEqual(true);
                expect(result.incompleteEmojiCode).toEqual("fo");
            });

            it('Given a cursor position inside the code', function () {
                var result = TextAnalyser.FindInProgressEmoji(":fo", 2);

                expect(result.inProgress).toEqual(true);
                expect(result.incompleteEmojiCode).toEqual("fo");
            });

            it('Given a cursor position at the end of the string', function () {
                var result = TextAnalyser.FindInProgressEmoji(":fo", 3);

                expect(result.inProgress).toEqual(true);
                expect(result.incompleteEmojiCode).toEqual("fo");
            });
        });

        describe('Emoji code ends with :', function () {
            it('Given a cursor position inside the code', function () {
                var result = TextAnalyser.FindInProgressEmoji(":fox:", 3);

                expect(result.inProgress).toEqual(false);
                expect(result.incompleteEmojiCode).toEqual("");
            });

            it('Given a cursor position at the end of the code', function () {
                var result = TextAnalyser.FindInProgressEmoji(":fox:", 4);

                expect(result.inProgress).toEqual(false);
                expect(result.incompleteEmojiCode).toEqual("");
            });

            it('Given a cursor position at the end of the string', function () {
                var result = TextAnalyser.FindInProgressEmoji(":fox:", 5);

                expect(result.inProgress).toEqual(false);
                expect(result.incompleteEmojiCode).toEqual("");
            });
        });

        describe('Emoji code ends with space', function () {
            it('Given a cursor position inside the code', function () {
                var result = TextAnalyser.FindInProgressEmoji(":fo cat", 2);

                expect(result.inProgress).toEqual(true);
                expect(result.incompleteEmojiCode).toEqual("fo");
            });

            it('Given a cursor position at the end of the code', function () {
                var result = TextAnalyser.FindInProgressEmoji(":fo cat", 3);

                expect(result.inProgress).toEqual(true);
                expect(result.incompleteEmojiCode).toEqual("fo");
            });

            it('Given a cursor position after the code', function () {
                var result = TextAnalyser.FindInProgressEmoji(":fo cat", 4);

                expect(result.inProgress).toEqual(false);
                expect(result.incompleteEmojiCode).toEqual("");
            });
        });

        describe("Short in progress emoji", function () {
            it('Given a cursor position after the colon', function () {
                var result = TextAnalyser.FindInProgressEmoji(":f", 1);

                expect(result.inProgress).toEqual(true);
                expect(result.incompleteEmojiCode).toEqual("f");
            });

            it('Given a cursor position at the end of the code', function () {
                var result = TextAnalyser.FindInProgressEmoji(":f", 2);

                expect(result.inProgress).toEqual(true);
                expect(result.incompleteEmojiCode).toEqual("f");
            });
        });

        describe("Emoji code contains whitespace", function () {
            it('Given a cursor position at the end of the emoji', function () {
                var result = TextAnalyser.FindInProgressEmoji(":long code", 10);

                expect(result.inProgress).toEqual(false);
                expect(result.incompleteEmojiCode).toEqual("");
            });

            it('Given a cursor position after the whitespace', function () {
                var result = TextAnalyser.FindInProgressEmoji(":long code", 6);

                expect(result.inProgress).toEqual(false);
                expect(result.incompleteEmojiCode).toEqual("");
            });
        });

        describe("Emoji starts with :", function () {
            it('Given the : is at the start of the string', function () {
                var result = TextAnalyser.FindInProgressEmoji(":badger", 7);

                expect(result.inProgress).toEqual(true);
                expect(result.incompleteEmojiCode).toEqual("badger");
            });

            it('Given the : is preceeded by whitespace', function () {
                var result = TextAnalyser.FindInProgressEmoji(" :badger", 8);

                expect(result.inProgress).toEqual(true);
                expect(result.incompleteEmojiCode).toEqual("badger");
            });

            it('Given the : is preceeded by text and whitespace', function () {
                var result = TextAnalyser.FindInProgressEmoji("junk :badger", 12);

                expect(result.inProgress).toEqual(true);
                expect(result.incompleteEmojiCode).toEqual("badger");
            });

            it('Given the : is preceeded by just text', function () {
                var result = TextAnalyser.FindInProgressEmoji("junk:badger", 11);

                expect(result.inProgress).toEqual(false);
                expect(result.incompleteEmojiCode).toEqual("");
            });
        });

        describe("Emoji does not start with :", function () {
            it('Given an emoji that does not start with : and is at the start of the string', function () {
                var result = TextAnalyser.FindInProgressEmoji("badger", 6);

                expect(result.inProgress).toEqual(false);
                expect(result.incompleteEmojiCode).toEqual("");
            });
        });

        describe("Bad current positions", function () {
            it('Given a current position before the start of the string', function () {
                var result = TextAnalyser.FindInProgressEmoji(":badger", -1);

                expect(result.inProgress).toEqual(false);
                expect(result.incompleteEmojiCode).toEqual("");
            });

            it('Given a current position after the end of the string', function () {
                var result = TextAnalyser.FindInProgressEmoji(":badger", 8);

                expect(result.inProgress).toEqual(false);
                expect(result.incompleteEmojiCode).toEqual("");
            });
        });

        describe("Misc cases", function () {

            it('Given an empty emoji code followed by whitespace', function () {
                var result = TextAnalyser.FindInProgressEmoji(": ", 1);

                expect(result.inProgress).toEqual(false);
                expect(result.incompleteEmojiCode).toEqual("");
            });

            it('Given a long emoji code', function () {
                var result = TextAnalyser.FindInProgressEmoji(":this_is-very-cool", 7);

                expect(result.inProgress).toEqual(true);
                expect(result.incompleteEmojiCode).toEqual("this_is-very-cool");
            });

            it('Given an in progress emoji and cursor position at the end of the code and whitespace with some text preceeding and following', function () {
                var result = TextAnalyser.FindInProgressEmoji("cat :fo banana", 7);

                expect(result.inProgress).toEqual(true);
                expect(result.incompleteEmojiCode).toEqual("fo");
            });
            it('Given an in progress emoji somewhere else in the string', function () {
                var result = TextAnalyser.FindInProgressEmoji("cat :fo banana", 9);

                expect(result.inProgress).toEqual(false);
                expect(result.incompleteEmojiCode).toEqual("");
            });
        });
    });

    describe('FindInProgressPlayerName', function () {
        it('Given the cursor is at the start of a string', function () {
            var result = TextAnalyser.FindInProgressPlayerName("@bad", 0);

            expect(result.inProgress).toEqual(false);
            expect(result.incompletePlayerName).toEqual("");
        });

        describe('In progress player name', function () {
            it('Given a cursor position after the @', function () {
                var result = TextAnalyser.FindInProgressPlayerName("@OTHER TEXT", 1);

                expect(result.inProgress).toEqual(true);
                expect(result.incompletePlayerName).toEqual("");
            });

            it('Given text after the cusor position', function () {
                var result = TextAnalyser.FindInProgressPlayerName("@bOTHER TEXT", 2);

                expect(result.inProgress).toEqual(true);
                expect(result.incompletePlayerName).toEqual("b");
            });

            it('Given a cursor position at the end of the string', function () {
                var result = TextAnalyser.FindInProgressPlayerName("@bad", 4);

                expect(result.inProgress).toEqual(true);
                expect(result.incompletePlayerName).toEqual("bad");
            });

            it('Given a space and a colon in a player name', function () {
                var result = TextAnalyser.FindInProgressPlayerName("OTHER TEXT@b:ad gerOTHER TEXT", 19);

                expect(result.inProgress).toEqual(true);
                expect(result.incompletePlayerName).toEqual("b:ad ger");
            });
        });

        describe("Bad current positions", function () {
            it('Given a current position before the start of the string', function () {
                var result = TextAnalyser.FindInProgressPlayerName("@badger", -1);

                expect(result.inProgress).toEqual(false);
                expect(result.incompletePlayerName).toEqual("");
            });

            it('Given a current position after the end of the string', function () {
                var result = TextAnalyser.FindInProgressPlayerName("@badger", 8);

                expect(result.inProgress).toEqual(false);
                expect(result.incompletePlayerName).toEqual("");
            });
        });
    });
});
