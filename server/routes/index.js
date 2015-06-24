/**
 * User Routes
 */

'use strict';

var indexController = require('../controllers/index');
var multer = require('multer');
var path = require('path');
var fs = require('fs');
var exec = require('child_process').exec;
var done = false;
var newName = '';
var uploadFile;
var flag = true;

var routes = function (app) {


    app.use(multer({
        dest: './client/uploads/',
        rename: function (fieldname, filename) {
            newName = filename + Date.now();
            return newName;
        },
        onFileUploadStart: function (file) {
            console.log(file.originalname + ' is starting ...');
        },
        onFileUploadComplete: function (file) {
            uploadFile = file;
            console.log(file.fieldname + ' uploaded to  ' + file.path);
            done = true;
        }
    }));



    //    // Dynamically load all routes
    //    fs.readdirSync(__dirname).forEach(function(file) {
    //        // Dont load this index.js file
    //        if (!/index/.test(file)) {
    //            var route = path.join(__dirname, file);
    //            require(route)(app);
    //        }
    //    });






    app.get('/', function (req, res) {
        res.render('index', {
            title: 'Home',
            env: process.env.NODE_ENV || 'development'
        });
    });

    app.get('/calc', function (req, res) {
        var last = exec('server\\libs\\test',
            function (error, stdout, stderr) {
                console.log(error);
                console.log(stdout);
                console.log(stderr);
            });
        var finalLine = "";
        last.stdout.on('data', function (data) {
            finalLine += data;
            data = "test";
            console.log("data:" + data);
        });
        last.on('exit', function () {
            
            //while(flag){}
            res.send(finalLine);
        });
        res.send("get success");
    });

    app.post('/upload', function (req, res) {
        var finalLine = "";
        if (done == true) {
            console.log(req.files);
            res.json(newName);
            res.end(finalLine);
        }
    });



    //     app.get('/calc/:file/:type/:node/:count', function (req, res) {
    //         var type = req.params.type;
    //         var file = req.params.file;
    //         var node = req.params.node;
    //         if (req.params.count != -1) {
    //             nodesCount = req.params.count;
    //         }




    //         var als = ['R', 'B', 'P', 'G', 'M', 'E'];
    //         var finalLine = '';

    //         var last = exec('server/libs/graph ' + als[type] + ' ./uploads/' + file + '.txt ' + nodesCount + ' ' + node);
    //         last.stdout.on('data', function (data) {

    //             flag = false;
    //             finalLine += data;

    //         });
 
 
    //         last.on('exit', function (code) { 
    //             while (flag) { }
    //             res.json(convert2Json(finalLine));
    //         });
    //     });

};


function convert2Json(text) {
    var lines = text.split('\n');
    var nodes = lines[0].split(" ");

    var vets = lines[1].split(" ");


    var sigData = {
        nodes: [],
        edges: []
    };
    var resultData = {
        graph: sigData,
        data: []
    };
    for (var i = 0; i < nodes.length - 1; i++) {
        var node = nodes[i].split(':');
        var sigNode = {
            id: node[0],
            label: node[1],
            x: node[2],
            y: node[3],
            size: node[4],
            color: node[5]
        };
        sigData.nodes.push(sigNode);
    }

    for (var j = 0; j < vets.length - 1; j++) {
        var edge = vets[j].split(':');
        var sigEdge = {
            id: edge[0],
            source: edge[1],
            target: edge[2],
            color: edge[3]
        };
        sigData.edges.push(sigEdge);
    }

    if (lines.length > 2) {
        var coms = lines[2].split(" ");
        for (var k = 0; k < coms.length - 1; k++) {
            resultData.data.push(coms[k]);

        }
    }

    return resultData;
}
module.exports = routes;
