class BottomLoad {
    constructor({ele = 'body', callback, toBottom = 200, eleClientHeight = 'body', screenHeight = window.innerHeight} = {}) {
        this.ele             = document.querySelector(ele);
        this.toBottom        = toBottom;
        this.eleClientHeight = eleClientHeight;
        this.screenHeight    = screenHeight;
        if (callback && typeof callback == 'function') {
            this.callback = callback;
        }
        this.addEvent();
    }

    addEvent() {
        let startTime = new Date().getTime();
        this.ele.addEventListener('scroll', (e) => {
            let endTime = new Date().getTime();
            // 27ms内不触发
            if (endTime - startTime < 27) {
                return;
            }
            // 总得高 = 屏幕上的高 + 滚动的高
            if (this.callback && (document.querySelector(this.eleClientHeight).clientHeight - this.toBottom <= this.screenHeight +
                    e.srcElement.scrollTop)) {
                this.callback();
            }
            startTime = endTime;
        });
    }
}

export default BottomLoad