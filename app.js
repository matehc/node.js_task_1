let http = require('http');
let fs = require('fs');
let qs = require('querystring');



let server = http.createServer((req, res) => {
    // if POST request was made, the code below will run.
    if (req.method === 'POST') {

        let body = '';

        req.on('data', data => {
            body += data;

            if (body.length > 1e6)
                req.connection.destroy();
        });

        req.on('end', () => {
            let post = qs.parse(body);

            let inputMsg = post.message;

            fs.writeFile('message.txt', inputMsg, err => {
            if (err) throw err;
            console.log('File created...');
        });
        });

        
    } else {

    // html file that will render when request localhost:8080
    res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <style>
                    form {
                        background-color: #f1f1f1;
                        border-radius: 3px;
                        width: 30%;
                        padding: 20px;
                        margin: auto;
                        transform: translateX(50%);
                        transform: translateY(50%);
                        border: 1px solid #e5e5e5;
                        box-sizing: border-box;

                    }
                    label {
                        font-weight: 400;
                        margin-bottom: 5px;
                        margin-left: 15px;
                        display: block;
                        color: #555555;
                    }
                    button {
                        background-color: #14b57d;
                        margin-left: 15px;
                        height: 27px;
                        border: none;
                        border-radius: 2px;
                        outline: none;
                        width: 90%;
                        color: #ffffff;
                    }
                    input {
                        height: 27px;
                        margin-left: 15px;
                        border-radius: 2px;
                        outline: none;
                        width: 90%;
                        border: 1px solid #E5E5E5;
                    }
                </style>
            </head>
            <body>
                <form action="/message" method="post">
                <label>Please Enter a Message Below:</label>
                <input type="text" name="message"><br><br>
                <button type="submit">Submit</button>
                </form>
            </body>
            </html>
        `);
    }
    
});

server.listen(8080);
console.log('Listening to port 8080');


