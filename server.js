var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)
/*每次请求都会执行 */
  if(path === '/'){
    response.statusCode = 200;
    /*成功返回状态码200*/
    response.setHeader('Content-Type', 'text/html;charset=utf-8');
    /*响应的描述信息，text/html我是文本，语法是html*/
    response.setHeader('dw', 'sb');
    response.write(`
    <!DOCTYPE html>
    <head>
    <link rel="stylesheet" href="/x">
    </head>
    `)
    response.write(`
    <body>
    <h1>如果路径是/，就发送这段内容，格式为html</h1>
    <h2>我请求了路径为/x的css
    </body>
    `)
        /*浏览器请求了localhost根目录后，发现根目录要请求一个/x的css，
    于是再次发送请求请求/x，这就是html和css通过http传送到浏览器的整个过程，
    一个路径返回html字符串，一个路径返回css字符串*/
    /* 注意：``和''是不同的，``里可以加回车 ，''里回车用\n表示*/
    response.end()
  } else if(path === '/x'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/css;charset=utf-8')
    response.write(`h2{color: green;}`)
    response.end()
  } else {
    response.statusCode = 404
    /*访问的路径不存在返回状态码为404*/
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`你访问的页面不存在`)
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)

