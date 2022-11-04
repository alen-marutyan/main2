const fs = require('fs');
const path = require('path');
const http = require('http');


http.createServer((req,res)=>{

    const uploadFile = (req, filePath) => {
        return new Promise((resolve, reject) => {
            const stream = fs.createWriteStream(filePath);

            stream.on('open', () => {
                req.pipe(stream);
            });

            stream.on('close', () => {
                resolve(filePath);
            });

            stream.on('error', err => {
                reject(err);
            });
        });
    };

    if(req.url === '/upload'){
        if(req.method === 'POST') {
            const filePath = path.join(__dirname, `./static/${Date.now()}.jpg`);

            uploadFile(req, filePath)
                .then(() => res.end('success'))
                .catch(()=> res.end('error'))

        }else {
            res.writeHead(200,{'Content-Type' : 'text/html'});
            res.end('<a href="http://localhost:3000">')
        }
    }else {
        res.writeHead(200,{'Content-Type' : 'text/html'});
        res.end('<a href="http://localhost:3000">')
    }
}).listen(5050, ()=>{
    console.log('5050')
})




