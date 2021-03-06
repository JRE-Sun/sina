var self;

/**
 * vue滑动到底部自动加载
 *
 * ele:滚动的元素                          必填
 * isScrolling:在滑动过程中触发的方法       (选)
 * callback:滑动到底部,会触发              (选)
 * toBottom:还差多少px到达底部             (选)默认200px
 * eleClientHeight:元素滚动的总高度        (选)默认body高度
 * screenHeight:屏幕的高                  (选)默认窗口可视区高
 */
class BottomLoad {
    constructor({ele = window, callback, toBottom = Math.ceil(window.innerHeight / 5), isScrolling, eleClientHeight = 'body', screenHeight = window.innerHeight} = {}) {
        self                 = this;
        this.ele             = ele != window ? document.querySelector(ele) : window;
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
        //todo 这里还需要考虑滚动的巨快
        let endTime   = new Date().getTime();
        let startTime = self.startTime;
        // 27ms内不触发
        if (endTime - startTime < 27) {
            return;
        }
        let scrollTop = self.ele == window ? self.ele.scrollY : e.srcElement.scrollTop;
        if (self.isScrolling) {
            self.isScrolling({
                screenHeight: self.screenHeight,
                scrollTop   : scrollTop,
            });
        }
        // 总得高 = 屏幕上的高 + 滚动的高
        if (self.callback && (document.querySelector(self.eleClientHeight).clientHeight - self.toBottom <= self.screenHeight + scrollTop)) {
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