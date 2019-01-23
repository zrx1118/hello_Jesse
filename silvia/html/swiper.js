var Swiper = function (options) {
    this.data = {
        direction: 'horizontal', // horizontal or vertical
        effects: 'fade', // fade or scroll
        autoplay: true,
        speed: 3000,
        lazyload: true,
        swiperContainer: null,
        pagination: true,
        paginationClick: true,
        clickButton: false,
        slideIndex: 0
    };
    this.timer = null;
    for (var key in this.data) {
        if (typeof options[key] === 'undefined') {
            options[key] = this.data[key];
        }
    }
    options = options || {};
    this.options = options;
    this.swiperWrapper = this.options.swiperContainer.getElementsByClassName('swiper-wrapper')[0];
    this.lis = this.options.swiperContainer.getElementsByTagName('li');
    this.spanItem = null;
    this.soffX = this.options.swiperContainer.offsetWidth;
    this.soffY = this.options.swiperContainer.offsetHeight;
    this.saveIndex = this.options.slideIndex;
    this.init();
}

Swiper.prototype = {
    constructor: Swiper,
    init: function () {
        var o = this.options,
            _this = this;
        
        if (o.effects === 'scroll') {
            if (o.direction === 'vertical') {
                o.swiperContainer.classList.add('swiper-container-vertical');
                this.verticalScroll();
            } else if (o.direction === 'horizontal') {
                o.swiperContainer.classList.add('swiper-container-horizontal');
                swiperWrapper.style.width = this.soffX*this.lis.length + 'px';
                this.horizontalScroll();
            }
        } else if (o.effects === 'fade') {
            var classes = o.direction === 'vertical'? 'swiper-container-fade-vertical' : 'swiper-container-fade-horizontal';
            o.swiperContainer.classList.add(classes);
            this.fadeEvents();
        }

        if (o.pagination) this.createPagination();
        if (o.paginationClick) this.pageClick();
        if (o.lazyload) this.lazyloadImage();
        if (o.autoplay) this.startAutoplay();
        if (o.clickButton) this.createBtn();
        o.swiperContainer.addEventListener('mouseenter', function() {
            _this.stopAutoplay();
        }, false)
        o.swiperContainer.addEventListener('mouseleave', function() {
            _this.startAutoplay();
        }, false)
    },
    createPagination: function () {
        var o = this.options,
            oDiv = document.createElement('div');

        oDiv.className = 'swiper-pagination';
        for (var i = 0; i < this.lis.length; i++) {
            var oSpan = document.createElement('span');
            if (o.slideIndex === i) {
                oSpan.className = 'swiper-pagination-active';
            }
            oDiv.appendChild(oSpan);
        }
        o.swiperContainer.appendChild(oDiv);
        this.spanItem = oDiv.getElementsByTagName('span');
        
    },
    pageClick: function() {
        var o = this.options,
            _this = this;
            _this.saveIndex = o.slideIndex;

        for (var i = 0, len = _this.spanItem.length; i < len; i++) {
            ;(function () {
                var num = i;
                _this.spanItem[i].addEventListener('mouseenter', function () {
                    for (var j = 0; j < len; j++) {
                        if (num === j) {
                            o.slideIndex = num;
                            o.effects === 'fade'? _this.fadeEvents(): _this.scrollEvents();
                            _this.changePage();
                        }
                    }
                });
                _this.spanItem[i].addEventListener('mouseleave', function () {
                    _this.saveIndex = o.slideIndex;
                });
            }())
        }
    },
    changePage: function () {
        this.spanItem[this.saveIndex].className = '';
        this.spanItem[this.options.slideIndex].className = 'swiper-pagination-active';
    },
    scrollEvents: function () {
        this.options.direction === 'vertical'? this.verticalScroll() : this.horizontalScroll();
        this.lazyloadImage();
    },
    fadeEvents: function () {
        this.lazyloadImage();
        this.lis[this.saveIndex].className = '';
        this.lis[this.options.slideIndex].className = 'swiper-slide-active';
    },
    verticalScroll: function () {
        this.swiperWrapper.style.transitionDuration = '2000ms';
        this.swiperWrapper.style.transform = 'translateY(' + (-this.options.slideIndex*this.soffY) + 'px)';
    },
    horizontalScroll: function () {
        this.swiperWrapper.style.transitionDuration = '2000ms';
        this.swiperWrapper.style.transform = 'translateX(' + (-this.options.slideIndex*this.soffX) + 'px)';
    },
    lazyloadImage: function () {
        var o = this.options,
            aImg = this.lis[o.slideIndex].getElementsByTagName('img')[0],
            src = aImg.getAttribute("data-src");
        if (src) {
            aImg.src = src;
            aImg.removeAttribute('data-src');
        }
    },
    createBtn: function () {
        var _this = this,
            o = this.options,
            oA1 = document.createElement('a'),
            oA2 = document.createElement('a');
        oA1.className = 'swiper-btn-prev';
        oA2.className = 'swiper-btn-next';
        o.swiperContainer.appendChild(oA1);
        o.swiperContainer.appendChild(oA2);
        oA1.addEventListener('click', function () {
            _this.prevClick();
        }, false);
        
        oA2.addEventListener('click', function () {
            _this.nextClick();
        }, false)
    },
    prevClick: function () {
        this.saveIndex = this.options.slideIndex;
        this.options.slideIndex--;
        if (this.options.slideIndex === -1) {
            this.options.slideIndex = this.lis.length - 1;
        }
        this.options.effects === 'fade'? this.fadeEvents(): this.scrollEvents();
        this.lazyloadImage();
        if (this.options.pagination) this.changePage();
    },
    nextClick: function () {
        this.saveIndex = this.options.slideIndex;
        this.options.slideIndex++;
        if (this.options.slideIndex === this.lis.length) {
            this.options.slideIndex = 0;
        }
        this.options.effects === 'fade'? this.fadeEvents(): this.scrollEvents();
        this.lazyloadImage();
        if (this.options.pagination) this.changePage();
    },
    startAutoplay: function () {
        var _this = this;
        _this.timer = setInterval(function () {
            _this.autoplay();
            _this.saveIndex = _this.options.slideIndex;
        }, _this.options.speed);
    },
    stopAutoplay: function () {
        clearInterval(this.timer);
    },
    autoplay: function () {
        this.saveIndex = this.options.slideIndex;
        this.options.slideIndex++;
        if (this.options.slideIndex === this.lis.length) {
            this.options.slideIndex = 0;
        }
        this.options.effects === 'fade'? this.fadeEvents(): this.scrollEvents();
        if (this.options.pagination) this.changePage();
    }
}