var self;

class BottomLoad {
    constructor({ele = 'body', callback, toBottom = 200, isScrolling, eleClientHeight = 'body', screenHeight = window.innerHeight} = {}) {
        self                 = this;
        this.ele             = document.querySelector(ele);
        this.toBottom        = toBottom;
        this.eleClientHeight = eleClientHeight;
        this.screenHeight    = screenHeight;
        this.startTime       = new Date().getTime();
        if (callback && typeof callback == 'function') {
            this.callback = callback;
        }
        if (isScrolling && typeof isScrolling == 'function') {
            this.isScrolling = isScrolling;
        }
        this.addEvent();
    }

    addEvent() {
        this.ele.addEventListener('scroll', this.loadHandler, false);
    }

    loadHandler(e) {
        let endTime   = new Date().getTime();
        let startTime = self.startTime;
        // 27ms内不触发
        if (endTime - startTime < 27) {
            return;
        }
        if (self.isScrolling) {
            self.isScrolling(e);
        }
        // 总得高 = 屏幕上的高 + 滚动的高
        if (self.callback && (document.querySelector(self.eleClientHeight).clientHeight - self.toBottom <= self.screenHeight +
                e.srcElement.scrollTop)) {
            self.callback();
        }
        self.startTime = endTime;
    }

    remove() {
        console.log('解除bottom-load事件');
        this.ele.removeEventListener('scroll', this.loadHandler, false);
    }
}

export default BottomLoad