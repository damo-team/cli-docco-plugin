# Damo Docco Plugin

docco的文档点击：https://github.com/jashkenas/docco

### 使用

```javascript
    var DoccoPlugin = require('@damo/cli-docco-plugin');
    config.plugins.unshift(new DoccoPlugin(options.docco));
```

docco初始化的配置项：

```javascript
    docco: {
        dir                 //文件的来源目录
        extension           //编译文档的语言文件，默认是js文件
        template            //自定义docco.jst
        output              //编译的文档放置的目录，默认是dist/docs
        test                //过滤文件
        exclude             //过滤文件
        include             //包含的文件
        css                 //docco.jst中使用css的地址
        'public'            //css文件需要的静态文件
    }
```