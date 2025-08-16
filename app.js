const fs = require('fs');

fs.readdir('./test', (error, files) => {
    files.forEach(file => {
        console.log('name: ' + file);
    });
});

// fs.rmdir("test", function(error)
// {
//     if(error)
//     {
//         console.log("error");
//     }
//     else 
//     {
//         console.log('delete');
//     }
// });

// fs.mkdir('test', function(error)
// {
//     if(error && error == "EEXIST")
//     {
//         console.log(error);
//     }
//     else 
//     {
//         console.log('folder create'); 
//     }
// });

// let arr;

// arr = fs.readFileSync('./text.txt');
// arr = arr.toString();
// console.log(arr);


// fs.readFile('./text.txt', function(err, data)
// {
//     if(err) throw err;
//     arr = data.toString();
//     arr = arr.split("\n");
//     console.log(arr);
// });

// fs.readFile('./test.json', function(err, data)
// {
//     if(err) throw err;
//     let arr = data.toString();
//     arr = JSON.parse(arr);
//     console.log(arr.name);
// });

// fs.readFile('./text.txt', 'utf-8', (error, data) => {
//     fs.mkdirSync('./files', () => {});

//     fs.writeFileSync('./files/text2.txt', `${data} New text!`, (error) => {
//         error ? console.log(error) : null;
//     });  
// });

// setTimeout(() => {
//     if(fs.existsSync('./files/text2.txt'))
//     {
//         fs.unlink('./files/text2.txt', () => {});
//     }
// }, 4000);

// setTimeout(() => {
//     if(fs.existsSync('./files'))
//     {
//         fs.rmdir('./files', () => {});
//     }
// }, 6000);