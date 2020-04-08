
import{upImg} from '@/js/mzl.js'

export default {


  methods: {
    preview(src, e) {
      uni.previewImage({
        urls: src,
      })
    },
    navigate(href, e) {
      // 如允许点击超链接跳转，则应该打开一个新页面，并传入href，由新页面内嵌webview组件负责显示该链接内容
      // #ifdef APP-PLUS
      plus.runtime.openURL(href)
      // #endif
      // #ifdef MP-WEIXIN
      uni.setClipboardData({
        data: href,
        success: function () {
          uni.showModal({
            content: "网址已复制,请在浏览器中粘贴打开",
            showCancel: false
          })
        }
      })
      // #endif
    },
    toolBarClick(type) {
      if (type == 'bold') {
        this.textareaData += "**粗体文字** "
      } else if (type == "italic") {
        this.textareaData += "*斜体* "
      } else if (type == "header") {
        uni.showActionSheet({
          itemList: ["标题1", "标题2", "标题3", "标题4", "标题5", "标题6"],
          success: res => {
            switch (res.tapIndex) {
              case 0:
                this.textareaData += "# 标题1\r";
                return;
              case 1:
                this.textareaData += "## 标题2\r";
                return;
              case 2:
                this.textareaData += "### 标题3\r";
                return;
              case 3:
                this.textareaData += "#### 标题4\r";
                return;
              case 4:
                this.textareaData += "##### 标题5\r";
                return;
              case 5:
                this.textareaData += "###### 标题6\r";
                return;
            }
          }
        })
      } else if (type == "underline") {
        this.textareaData += "++下划线++ "
      } else if (type == "strike") {
        this.textareaData += "~~中划线~~ "
      } else if (type == "sup") {
        this.textareaData += "^上角标^ "
      } else if (type == "sub") {
        this.textareaData += "~下角标~ "
      } else if (type == "alignleft") {
        this.textareaData += "\n::: hljs-left\n\n左对齐\n\n:::\n"
      } else if (type == "aligncenter") {
        this.textareaData += "\n::: hljs-center\n\n居中对齐\n\n:::\n"
      } else if (type == "alignright") {
        this.textareaData += "\n::: hljs-right\n\n\n\n右对齐\n\n:::\n"
      } else if (type == "link") {
        this.textareaData += "[在此输入网址描述](在此输入网址) "
      } else if (type == "imgage") {
        //"![]("+'http://card-1254165941.cosgz.myqcloud.com/1545991470261.png'+") "
        let that=this
        upImg(res=>{
          that.textareaData += "![]("+res+") "
        })
      } else if (type == "code") {
        this.textareaData += "\n``` 代码块 \n\n```\n"
      } else if (type == "table") {
        this.textareaData += "\n|列1|列2|列3|\n|-|-|-|\n|单元格1|单元格2|单元格3|\n"
      } else if (type == "clear") {
        uni.showModal({
          title: "提示",
          content: "确定清空?",
          success: res => {
            if (res.confirm) {
              this.textareaData = "";
            }
          }
        })
      }
    },
    getCursor(e) {
      //安卓失去焦点获取不到cursor位置,暂不使用
      //this.cursor = e.detail.cursor;
    }
  },

}