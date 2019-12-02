//複雑な情報の処理
//テンプレートファイルを用いて表を表示する。複数の情報を持つ構造の表示

const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring');


const index_page = fs.readFileSync('./public/index.ejs', 'utf8');
const other_page = fs.readFileSync('./public/other.ejs', 'utf8');
const style_css = fs.readFileSync('./public/style.css', 'utf8');

var server = http.createServer(getFromClient);
server.listen(3000);
console.log('Server Start!');

function getFromClient(request, response){
    var url_parts = url.parse(request.url, true);
    switch(url_parts.pathname){
        case '/':
            response_index(request, response);
            break;
        case '/public/other':
            response_other(request, response);
            break;
        case '/public/style.css':
            response.writeHead(200, {'Content-Type': 'text/css'});
            response.write(style_css);
            response.end();
            break;
        default:
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.end("no pages ...");
            break;
    }
}

function response_index(request, response){
    var data = {
        'Taro':'090-1234-5667',
        'Hanako':'080-5347-1738',
        'Sachiko':'090-2749-2848',
        'Ichiro':'070-2736-1927'
    };

    var msg = "This is index page!";
    var content = ejs.render(index_page, {
        title:"index",
        content:msg,
        data:data,
    });
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(content);
    response.end();
}

function response_other(request, response){
    var msg = "this is Other page.";

    if(request.method == 'POST'){
        var body = '';
        request.on('data', (data) =>{
            body += data;
        });

        request.on('end', () => {
            var post_data = qs.parse(body);
            msg += "You send me '" + post_data.msg + "'";
            var content = ejs.render(other_page,{
                title:"Other",
                content:msg,
            });
            response.writeHead(200, {'Content-Type':'text/html'});
            response.write(content);
            response.end();
        });
    }else{
        var msg = "no page ....";
        var content = ejs.render(other_page,{
            title:"Other",
            content:msg,
        });
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(content);
        response.end();
    }
}


/*
//GETでメッセージを送るクエリーパラメータの受取処理を実装する
//POSTで受信した際の処理を追加する。GETに関してはクエリーパラメータの認識で事足りるがPOSTは自力実装する必要がある

const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring');


const index_page = fs.readFileSync('./public/index.ejs', 'utf8');
const other_page = fs.readFileSync('./public/other.ejs', 'utf8');
const style_css = fs.readFileSync('./public/style.css', 'utf8');

var server = http.createServer(getFromClient);
server.listen(3000);
console.log('Server Start!');

function getFromClient(request, response){
    var url_parts = url.parse(request.url, true);
    switch(url_parts.pathname){
        case '/':
            response_index(request, response);
            break;
        case '/public/other':
            response_other(request, response);
            break;
        /*
        case '/':
            var content = "This is Index Page!"
            var query = url_parts.query;
            if(query.msg != undefined){
                content = "You send me '" + query.msg + "'"; 
            }
            var content = ejs.render(index_page, {
                title:'Index',
                content:content,
            });
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(content);
            response.end();
            break;
        
        case 'public/style.css':
            response.writeHead(200, {'Content-Type': 'text/css'});
            response.write(style_css);
            response.end();
            break;
        default:
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.end("no pages ...");
            break;
    }
}

function response_index(request, response){
    var msg = "This is Index Pages";
    var content = ejs.render(index_page, {
        title:'index',
        content:msg,
    });
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(content);
    response.end();
}

function response_other(request, response){
    var msg = "this is Other page.";

    if(request.method == 'POST'){
        var body = '';
        request.on('data', (data) =>{
            body += data;
        });

        request.on('end', () => {
            var post_data = qs.parse(body);
            msg += "You send me '" + post_data.msg + "'";
            var content = ejs.render(other_page,{
                title:"Other",
                content:msg,
            });
            response.writeHead(200, {'Content-Type':'text/html'});
            response.write(content);
            response.end();
        });
    }else{
        var msg = "no page ....";
        var content = ejs.render(other_page,{
            title:"Other",
            content:msg,
        });
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(content);
        response.end();
    }
}
*/

/*
//ルーティングの理解
//ejsファイルだけでなくCSSファイルも読み込めるサーバ機能を実装する
const http = require('http');
const fs = require('fs');
const url = require('url');
const ejs = require('ejs');

const index_page = fs.readFileSync('./public/index.ejs', 'utf8');
const other_page = fs.readFileSync('./public/other.ejs', 'utf8');
const style_css = fs.readFileSync('./public/style.css', 'utf8');

var server = http.createServer(getFromClient);
server.listen(3000);
console.log("Server Start!");

function getFromClient(request, response){
    var url_parts = url.parse(request.url);
    switch(url_parts.pathname){
        case '/':
            var content = ejs.render(index_page, {
                title:'Index',
                content:'これはテンプレートを使ったサンプルページです。',
            })
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(content);
            response.end();
            break;
        case '/public/other':
            var content = ejs.render(other_page,{
                title:'Other',
                content:'これは新しく作成したページです。',
            });
            response.writeHead(200,{'Content-Type': 'text/html'});
            response.write(content);
            response.end();
            break;
        case '/public/style.css':
            response.writeHead(200,{'Content-Type': 'text/css'});
            response.write(style_css);
            response.end();
            break;
        
        default:
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.end('no pages ...');
            break;
    }
}
*/

/*
//ejsファイルを用いたWebページの表示方法を理解する
const http = require("http");
const fs = require('fs');
const ejs = require('ejs');

const index_page = fs.readFileSync("./public/index.ejs", "utf8");

let server = http.createServer(getFromClient);

server.listen(3000);
console.log("Server Start!");

function getFromClient(request, response){
    let content = ejs.render(index_page,{
        title:'Index',
        content:"これはテンプレートを利用したサンプルページです。",
    });
    response.writeHead(200, {"Content-Type": 'text/html'});
    response.write(content);
    response.end();
}
*/

/*
//HTMLの動的な処理を実装。HTMLの表示をJavascritから操作する
 const http = require("http");
 const fs = require('fs');

 var server = http.createServer(getFromClient);

 server.listen(3000);
 console.log('Server Start!');

 function getFromClient(request, response){
     fs.readFile("./public/index.html", 'UTF-8', (error, data)=>{
         var content = data.
             replace(/dummy_title/g, 'タイトルです').
             replace(/dummy_content/g, 'これがコンテンツです');

         response.writeHead(200, {'Content-Type': 'text/html'});
         response.write(content);
         response.end();
     });
 }
 */


/*
//createServerからHTMLの読み込み関連の処理を切り離した形式
//以前よりもスッキリして可読性の高い処理になっている
const http = require('http');
const fs = require('fs');

var server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server Start!');
//HTMLを読み込んで出力するまでの最小形式
//読み込みファイルが書かれていないので何も表示されない。

function getFromClient(req, res){
    request = req;
    response = res;
    fs.readFile('./public/index.html', 'UTF-8', (error, data) => {
        response.writeHead(200,{'Content-Type': 'text/html'});
        response.write(data);
        response.end();
    });
}
*/


/*
//最も基本的な形で作るサーバー
//htmlファイルの読み込みをすることが可能だが、関数の入れ子構造が多くわかりにくい
const http = require('http');
const fs = require('fs');

var server = http.createServer(
    (request, response)=>{
        fs.readFile('./public/index.html', 'UTF-8', (error, data) => {
            response.writeHead(200, {'Content-type': 'text/html'});
            response.write(data);
            response.end();
        });
    }
);

server.listen(3000);
console.log("Server Start!");
*/  
