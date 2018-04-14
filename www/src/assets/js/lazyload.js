let self;

/**
 * 图片懒加载
 */
class LazyLoad {
    constructor({scroller = window, selector, toBottom = 200, eleClientHeight = 'body',} = {}) {
        this.selector = selector;
        if (!selector) {
            console.log('lazyload运行失败->必须传入selector');
            return;
        }
        this.installSelector = `*[${selector}]`;
        this.imgArray        = document.querySelectorAll(this.installSelector);
        this.scroller        = scroller;
        this.toBottom        = toBottom;
        this.eleClientHeight = eleClientHeight;
        this.windowHeight    = window.innerHeight; // 屏幕的高度
        this.isScroll        = false;  // 是否正在滚动
        this.timer           = '';
        this.startTime       = new Date().getTime(); // 开始滚动的时间
        self                 = this;
        this.autoLoad();
        this.addEvent();
    }

    reset() {
        this.imgArray = document.querySelectorAll(this.installSelector);
        this.autoLoad();
    }

    getScroller() {
        let scroller, scrollTop;
        console.log(this.scroller == window);
        if (this.scroller == window) {
            scroller  = this.scroller;
            scrollTop = this.scroller.scrollY;
        } else {
            scroller  = document.querySelector(this.scroller);
            scrollTop = scroller.scrollTop;
        }
        return {
            scroller : scroller,
            scrollTop: scrollTop,
        }
    }

    addEvent() {
        this.getScroller().scroller.addEventListener('scroll', this.loadHandler, false);
    }

    autoLoad() {
        let imgArray  = this.imgArray;
        let imgLength = imgArray.length;
        for (let i = 0; i < imgLength; i++) {
            let selfImg = imgArray[i];
            if (selfImg.tagName.toLocaleLowerCase() != 'img') {
                return;
            }
            if (selfImg.getAttribute(this.selector) == null) {
                return;
            }
            if (selfImg.getAttribute(this.selector) == '') {
                return;
            }

            var eleTop          = selfImg.offsetTop,
                windowScrollTop = this.getScroller().scrollTop;

            // 判断元素是否到达窗口底部
            if (eleTop - this.toBottom <= windowScrollTop + this.windowHeight) {
                selfImg.setAttribute('src', selfImg.getAttribute(this.selector));
                selfImg.removeAttribute('data-src');
            }
        }
    }

    loadHandler(e) {
        var endTime = new Date().getTime();
        // 节流函数
        // 当两次间隔300ms才会触发懒加载
        if (endTime - self.startTime > 100) {
            self.startTime = endTime;
            self.autoLoad(e);
        } else {
            // 如果连续n个滚动事件都 300ms
            clearTimeout(self.timer);
            // 那么在500ms内自动触发懒加载
            self.timer = setTimeout(function () {
                self.autoLoad(e);
            }, 500);
        }
        if (!self.isScroll) {
            // 确保在滚动的过程中会自动扫描全部selector
            self.isScroll = true;
            setTimeout(function () {
                self.isScroll = false;
                self.imgArray = document.querySelectorAll(self.installSelector);
            }, 500);
        }
    }

    remove() {
        console.log('解除lazyload事件');
        this.getScroller().scroller.removeEventListener('scroll', this.loadHandler, false);
    }
}

export default LazyLoad;