class Timing {
    static After(durationInMs) {
        return new IncompleteTimer(durationInMs, false, true);
    }

    static AfterEvery(durationInMs) {
        return new IncompleteTimer(durationInMs, true, true);
    }
}

class IncompleteTimer {
    constructor(durationInMs, isLooping, runImmediately) {
        this.durationInMs = durationInMs;
        this.isLooping = isLooping;
        this.runImmediately = runImmediately;
    }

    Until(stopWhen) {
        this.stopWhen = stopWhen;
        return this;
    }

    Do(durationPassedFunc) {
        var timer = new Timer(this.durationInMs, this.isLooping, this.stopWhen, durationPassedFunc);

        if (typeof (this.onCreate) === "function")
            this.onCreate(timer);
        if (this.runImmediately)
            timer.Start();
        return timer;
    }
}

class Timer {
    constructor(durationInMs, isLooping, stopWhen, durationPassedFunc) {
        this.durationInMs = durationInMs;
        this.isLooping = isLooping;
        this.stopWhen = stopWhen;
        this.durationPassedFunc = durationPassedFunc;
        this.finished = false;
        this.childTimers = [];
    }

    Start() {
        var timer = this;
        if (timer.finished)
            return;

        timer.onFinish = function () {
            timer.finished = true;
            timer.childTimers.forEach(childTimer => childTimer.Start());
        };

        if (!timer.isLooping) {
            setTimeout(() => { timer.durationPassedFunc(); timer; timer.onFinish(); }, timer.durationInMs);
            return timer;
        }

        timer.previousIterationTime = new Date();
        timer.iterationNumber = 0;

        timer.intervalId = setInterval(function () {
            var actualDuration = new Date() - timer.previousIterationTime
            timer.iterationNumber++;

            timer.durationPassedFunc();

            if (typeof (timer.stopWhen) === "function" && timer.stopWhen(timer.iterationNumber, actualDuration)) {
                clearInterval(timer.intervalId);
                timer.onFinish();
                return;
            }
            timer.previousIterationTime = new Date();
        }, timer.durationInMs);
        return timer;
    }

    ThenAfter(durationInMs) {
        if (this.finished) {
            return new IncompleteTimer(durationInMs, false, true);
        }

        var timer = new IncompleteTimer(durationInMs, false, false);
        timer.onCreate = realTimer => this.childTimers.push(realTimer);
        return timer;
    }

    ThenAfterEvery(durationInMs) {
        if (this.finished) {
            return new IncompleteTimer(durationInMs, true, true);
        }

        var timer = new IncompleteTimer(durationInMs, true, false);
        timer.onCreate = realTimer => this.childTimers.push(realTimer);
        return timer;
    }
}


function milliseconds(durationInMs) { return durationInMs; }




module.exports = {
    Timing: Timing,
    milliseconds: milliseconds
}