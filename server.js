// httpのモジュールを用意
const http = require('http');
const fs = require('fs');
const path = require('path');

//サーバーの作成
const server = http.createServer((request, response) => {
  console.log('request ', request.url);

  let filePath = '.' + request.url;
  if (filePath == './') {
    filePath = './index.html';
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
  };

  const contentType = mimeTypes[extname] || 'application/octet-stream';

  // リクエストされたURLに従い、ファイルの中身を読み込む。
  fs.readFile(filePath, (error, content) => {
    if(error){
      if(error.code == 'ENOENT') {
        fs.readFile('./404.html', (error, content) => {
          response.writeHead(404, { 'Content-Type': 'text/html' });
          response.end(content, 'utf-8');
        });
        // 見つからなかった場合404エラーを返す。
      } else {
        response.writeHead(500);
        response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
      }
    } else {
      // ファイルが存在する場合htmlファイルの中身が格納されたdataを書き出す。
      // ヘッダ
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(content, 'utf-8');
    }
  });
});
// ポートの指定
server.listen(8000);
console.log('Server running at http://127.0.0.1:8000/');
