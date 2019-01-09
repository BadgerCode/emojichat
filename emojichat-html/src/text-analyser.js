class TextAnalyser {
    static FindInProgressEmoji(currentText, currentPosition) {
        var errorResponse = {
            inProgress: false,
            incompleteEmojiCode: ""
        };

        if (currentPosition <= 0 || currentPosition > currentText.length)
            return errorResponse;

        // Right grab
        var emojiRightEndExcl = currentPosition;

        for (; emojiRightEndExcl < currentText.length; emojiRightEndExcl++) {
            var currentChar = currentText.charAt(emojiRightEndExcl);

            if (currentChar === ' ')
                break;
            if (currentChar === ':')
                return errorResponse;
        }

        // left grab
        var emojiLeftStartExcl = currentPosition - 1;
        for (; emojiLeftStartExcl >= 0; emojiLeftStartExcl--) {
            var currentChar = currentText.charAt(emojiLeftStartExcl);

            if (currentChar === ' ')
                return errorResponse;
            if (currentChar === ':')
                break;
            if (emojiLeftStartExcl === 0)
                return errorResponse;
        }

        if (emojiLeftStartExcl + 1 >= emojiRightEndExcl)
            return errorResponse;

        return {
            inProgress: true,
            incompleteEmojiCode: currentText.substring(emojiLeftStartExcl + 1, emojiRightEndExcl),
            startPos: emojiLeftStartExcl,
            endPos: emojiRightEndExcl - 1
        };
    }

    static FindInProgressPlayerName(currentText, currentPosition) {
        var errorResponse = {
            inProgress: false,
            incompletePlayerName: ""
        };

        if (currentPosition <= 0 || currentPosition > currentText.length)
            return errorResponse;

        // left grab
        var leftStartPosExcl = currentPosition - 1;
        for (; leftStartPosExcl >= 0; leftStartPosExcl--) {
            var currentChar = currentText.charAt(leftStartPosExcl);

            if (currentChar === '@')
                break;
            if (leftStartPosExcl === 0)
                return errorResponse;
        }

        return {
            inProgress: true,
            incompletePlayerName: currentText.substring(leftStartPosExcl + 1, currentPosition),
            startPos: leftStartPosExcl,
            endPos: currentPosition
        };
    }
}


module.exports = {
    TextAnalyser: TextAnalyser
}