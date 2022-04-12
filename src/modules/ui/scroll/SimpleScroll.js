"use strict";
class SimpleScroll {
	constructor(el, _xy) {
		this.el = el;
		this.xy = _xy|| 'y';
		this.scrollHg=0;
		this.scrollWd=0;
		this.scrollTop=0;
		this.scrollLeft=0;
		this.barHg=0;
		this.barWd=0;
		this.scrollBar=null;
		this.start();
	}
    #cssStr = ` <style id="simpleScrollStyle">
		._simple_scroll_area {
			-ms-overflow-style: none; scrollbar-width: none; overflow: scroll;
		}
		._simple_scroll_area::-webkit-scrollbar {display: none;}
		._simple_scroll_area ._simple_scroll_bar {
			position:absolute; background-color:rgba(0,0,0,0.3); border-radius:5px; pointer-events:none; user-select: none; opacity:0; transition:opacity 0.5s linear 2s;
		}
		._simple_scroll_area ._simple_scroll_bar._changed {
			opacity:1; transition: opacity 0s linear 0s;
		}
		._simple_scroll_area ._simple_scroll_bar_y {
			right:2px; top:0; width:5px;
		}
		._simple_scroll_area ._simple_scroll_bar_x {
			bottom:2px; left:0; height:5px;
		}
    </style>`;
	#buildStyleSheet() {
        if (!document.querySelector('#simpleScrollStyle')) {
            document.head.insertAdjacentHTML('beforeend', this.#cssStr);
        }
    }
	#hasClass =(elem, css)=>{
		return elem.classList.contains(css);
	}
	#scrollY=()=>{
		let viewSize=(this.el.tagName=="HTML")?window.innerHeight:this.el.offsetHeight, barHg = Math.min(1, viewSize / this.el.scrollHeight) * viewSize,
		sy = (this.el.scrollTop / this.el.scrollHeight) * viewSize + this.el.scrollTop;
		this.scrollHg = this.el.scrollHeight + viewSize;
		if (Math.abs(this.scrollTop-sy) >1 || Math.abs(this.barHg-barHg) >1 ) {
			this.scrollBar.style.height=Math.round(barHg)+"px";
			this.scrollBar.style.transform='translateY('+Math.round(sy)+"px)";
			this.scrollTop = sy;
			this.barHg = barHg;
			if (!this.#hasClass(this.scrollBar, "_changed")){
				this.scrollBar.classList.add("_changed");
				setTimeout(()=>{this.scrollBar.classList.remove("_changed");}, 10);
			}
		}
	}
	#scrollX=()=>{
		let viewSize=(this.el.tagName=="HTML")?window.innerWidth:this.el.offsetWidth, barWd = Math.min(1, viewSize / this.el.scrollWidth) * viewSize,
		sx = (this.el.scrollLeft / this.el.scrollWidth) * viewSize + this.el.scrollLeft;
		this.scrollWd = this.el.scrollWidth + viewSize;
		if (Math.abs(this.scrollLeft-sx) >1 || Math.abs(this.barWd-barWd) >1 ) {
			this.scrollBar.style.width=Math.round(barWd)+"px";
			this.scrollBar.style.transform='translateX('+Math.round(sx)+"px)";
			this.scrollLeft = sx;
			this.barWd = barWd;
			if (!this.#hasClass(this.scrollBar, "_changed")){
				this.scrollBar.classList.add("_changed");
				setTimeout(()=>{this.scrollBar.classList.remove("_changed");}, 10);
			}
		}
	}
	#watcher = setInterval(()=>{
		if (!this.el) {
			clearInterval(this.#watcher);
			return;
		}
		if (this.xy=="y") {
			if (this.scrollHg != this.el.scrollHeight + this.el.offsetHeight) this.#scrollY();
		}
		if (this.xy=="x") {
			if (this.scrollWd != this.el.scrollWidth + this.el.offsetWidth) this.#scrollX();
		}
	}, 1000);
	
	start() {
		this.#buildStyleSheet();
		if (getComputedStyle(this.el).position=="static") {
			this.el.style.position="relative";
		}
		this.el.classList.add("_simple_scroll_area");
		if (this.xy=="y") {
			this.el.classList.add("_simple_scroll_area_y");
			if (this.el.tagName != "HTML") {
				this.el.insertAdjacentHTML('beforeend', '<div class="_simple_scroll_bar _simple_scroll_bar_y _added_simple_scroll_bar"></div>');
				this.el.addEventListener("scroll",this.#scrollY);
			} else {
				this.el.querySelector("body").insertAdjacentHTML('beforeend', '<div class="_simple_scroll_bar _simple_scroll_bar_y _added_simple_scroll_bar"></div>');
				window.addEventListener("scroll",this.#scrollY);
			}
			this.scrollBar = this.el.querySelector("._added_simple_scroll_bar");
			this.scrollBar.classList.remove("_added_simple_scroll_bar");
			this.#scrollY();
		} else if (this.xy=="x") {
			this.el.classList.add("_simple_scroll_area_x");
			if (this.el.tagName != "HTML") {
				this.el.insertAdjacentHTML('beforeend', '<div class="_simple_scroll_bar _simple_scroll_bar_x _added_simple_scroll_bar"></div>');
				this.el.addEventListener("scroll",this.#scrollX);
			} else {
				this.el.querySelector("body").insertAdjacentHTML('beforeend', '<div class="_simple_scroll_bar _simple_scroll_bar_x _added_simple_scroll_bar"></div>');
				window.addEventListener("scroll",this.#scrollX);
			}
			this.scrollBar = this.el.querySelector("._added_simple_scroll_bar");
			this.scrollBar.classList.remove("_added_simple_scroll_bar");
			this.#scrollX();
		}
	}
	stop() {
		this.el.classList.remove("_simple_scroll_area");
		clearInterval(this.#watcher);
		if (this.xy=="y") {
			this.el.classList.remove("_simple_scroll_area_y");
			this.el.removeChild(this.scrollBar);
			this.el.removeEventListener("scroll",this.#scrollY);
		} else if (this.xy=="x") {
			this.el.classList.remove("_simple_scroll_area_x");
			this.el.removeChild(this.scrollBar);
			this.el.removeEventListener("scroll",this.#scrollX);
		}
	}
}
export default SimpleScroll;
