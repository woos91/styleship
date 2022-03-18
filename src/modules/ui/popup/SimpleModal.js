"use strict";
import Vue from 'vue'

class SimpleModal {
    constructor(options) {
        this.title = options.title||'';
        this.id = options.id||`modal${new Date().getTime()}`;
        this.className = options.className||'';
        this.bgColor = options.bgColor||'rgba(0,0,0,0.3)';
        this.bgBlur = options.bgBlur||'3px';
        this.zIndex = options.zIndex|| 10000;
        this.width = options.width||'fit-content';
        this.height = options.height||'fit-content';
        this.contents = options.contents;
        this.padding = options.padding||'';
        this.bgExit = options.bgExit!==false?true:false;
        this.boxColor = options.boxColor||'';
        this.header = options.header||false;
        this.headerBg = options.headerBg||'';
        this.border = options.border||'';
        this.borderRadius = options.borderRadius||'5px';
        this.closeButton = options.closeButton||true;
        this.callback = options.callback||function(){};
        this.color = options.color|| '';
        this.el = null;
        this.closeUI = null;
        this.bg = null;
        // this.useComponunt = null
        if (typeof this.width == "number") this.width = this.width+"px";
        if (typeof this.height == "number") this.height = this.height+"px";
        if (typeof this.bgBlur == "number") this.bgBlur = this.bgBlur+"px";
        if (typeof this.padding == "number") this.padding = this.padding+"px";
        if (typeof this.borderRadius == "number") this.borderRadius = this.borderRadius+"px";
    }
    #cssStr = ` <style id="simpleModalStyle">
        ._simple_modal_area {
            position:fixed; left:0; top:0; right:0; bottom:0; z-index:1000;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
        }
        ._simple_modal_area ._simple_modal_bg {
            position:absolute; left:0; top:0; right:0; bottom:0; backdrop-filter:blur(2px);
        }
        ._simple_modal_area ._simple_modal_wrap {
            border:1px solid var(--light-theme-color); 
            border-radius:5px; 
            background-color:rgba(255,255,255,1); 
            position:relative;
            max-width: calc(100vw - 20px);
            max-height: calc(100vh - 20px);
        }
        ._simple_modal_area ._simple_modal_wrap ._simple_modal_header {
            border-bottom:1px solid var(--light-theme-color); background-color:rgba(250,250,250,1); font-weight:bold;
            height:30px; font-size:14px;  line-height:30px; text-align:center; color:rgba(0,0,0,0.7);
        }
        ._simple_modal_area ._simple_modal_wrap ._simple_modal_close {
            position:absolute; right:0px; top:0px; width:30px; height:30px; border:0 none; outline:0 none; font-size:0;
            background-repeat:no-repeat; background-position:center; background-color:transparent; background-size:30px 30px;
            background-image:url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI0LjIuMywgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAzMCAzMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzAgMzAiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8bGluZSBvcGFjaXR5PSIwLjgiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiB4MT0iMTAiIHkxPSIxMCIgeDI9IjIwIiB5Mj0iMjAiLz4KPGxpbmUgb3BhY2l0eT0iMC44IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgeDE9IjIwIiB5MT0iMTAiIHgyPSIxMCIgeTI9IjIwIi8+Cjwvc3ZnPgo=');
        }
        ._simple_modal_area ._simple_modal_wrap ._simple_modal_contents {
            padding:20px; 
            line-height:200%;
            width:100%;
            overflow:auto;
        }
    </style>`;
    #conStr = `<div class="_simple_modal_area __added_simple_modal{{className}}" id="{{id}}" style="z-index:{{zIndex}};">
            <div class="_simple_modal_bg" style="{{bgColor}}{{bgBlur}}"></div>
            <div class="_simple_modal_wrap" style="{{width}}{{height}}">
                <div class="_simple_modal_header" style="{{color}}{{isHeader}}">{{title}}</div>
                <button type="button" class="_simple_modal_close" {{isCloseButton}}>close</button>
                <div class="_simple_modal_contents" style="{{padding}}{{color}}{{contentHeight}}">{{contents}}</div>
            </div>
    </div>`;
    #buildStyleSheet() {
        if (!document.querySelector('#simpleModalStyle')) {
            document.head.insertAdjacentHTML('beforeend', this.#cssStr);
        }
    }
    open() {
        if (!this.el) {
            this.#buildStyleSheet();
            let str = this.#conStr;
            str = str.split("{{className}}").join(this.className?' '+this.className:'');
            str = str.split("{{id}}").join(this.id);
            str = str.split("{{zIndex}}").join(this.zIndex);
            str = str.split("{{bgColor}}").join(this.bgColor?'background-color:'+this.bgColor+';':'');
            str = str.split("{{color}}").join(this.color?'color:'+this.color+';':'');
            str = str.split("{{bgBlur}}").join(this.bgBlur?'backdrop-filter:blur('+this.bgBlur+');':'');
            str = str.split("{{isHeader}}").join(this.header?'display:block;':'display:none;');
            str = str.split("{{title}}").join(this.title);
            str = str.split("{{isCloseButton}}").join(this.closeButton?'style="display:block;"':'style="display:none;"');
            str = str.split("{{padding}}").join(this.padding?'padding:'+this.padding+';':'');
            str = str.split("{{width}}").join(this.width?'width:'+this.width+';':'');
            str = str.split("{{height}}").join(this.height?'height:'+this.height+';':'');
            str = str.split("{{contentHeight}}").join(this.header?'height:calc(100% - 30px);':'height:100%;');
            
            if (typeof this.contents =="string") str = str.split("{{contents}}").join(this.contents);
            else {
                str = str.split("{{contents}}").join('<div class="componunt_area"></div>');
                this.useComponunt = true;
            }
            document.body.insertAdjacentHTML('beforeend', str);
            this.el = document.querySelector(".__added_simple_modal");
            this.el.classList.remove("__added_simple_modal");
            this.closeUI = this.el.querySelector("button._simple_modal_close");
            this.bg = this.el.querySelector("._simple_modal_bg");
            this.closeUI.addEventListener("click", ()=>{this.close()});
            // if (this.useComponunt) {
            //     // Vue.componunt('simple-modal-contents', this.contents).$mount('#'+this.id+' .componunt_area');
            //     new Vue({ 
            //         render: h => h(this.contents),
            //         attrs:{
            //             callback:this.callback,
            //         }
            //     }).$mount('#'+this.id+' .componunt_area');
            // }
            let compArea = this.el.querySelector("._simple_modal_contents>*");
            console.log(compArea);
            compArea.addEventListener("complete", (e)=>{
                this.close();
                this.callback.call(this, e.detail);
            });
            if (this.bgExit) this.bg.addEventListener("click", ()=>{this.close()});
        } else {
            document.body.append(this.el);
        }
    }
    close() {
        this.el.remove();
    }

}


export default SimpleModal;