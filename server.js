var PORT = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var SERVER = process.env.OPENSHIFT_NODEJS_IP || 'localhost';
var db_name = 'wieect';
var MONGO_URL;

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD)
    MONGO_URL = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
                process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
                process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
                process.env.OPENSHIFT_MONGODB_DB_PORT + '/';
else MONGO_URL = 'localhost:27017/';

MONGO_URL = MONGO_URL + db_name;
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var moment = require('moment');
var multipart = require('connect-multiparty');

app.use(multipart());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

var mongoose = require('mongoose');
var mega = require('mega');
var fs = require('fs');

var db = mongoose.connect('mongodb://' + MONGO_URL);
var Schema = mongoose.Schema;

var data1 = new Schema({
    subjectName: {type: String},
    title: {type: String},
    fileName: {type: String},
    href: {type: String},
    date: {type: String, default: moment().format('MMMM Do YYYY, h:mm:ss a')}
});

var files = mongoose.model('files',data1);

app.get('/home',function(req,res){
    //Find contents of model by subjectName
    files.find({},function(err,docs){
        if(err) return err;
        res.json(docs);
    });
});

app.post('/', function(req, res){
    var body = req.body;
    var config = require('./config.json');
    if(typeof body !== 'undefined')
    {
        if(config.email === body.email && config.password === body.password)
        {
        var storage = mega({email: config.email, password: config.password}, function(err) {
          // storage.files
          // storage.mounts
        });
        var fileName = req.files.uploadFile.originalFilename;
        var uploadFile = req.files.uploadFile.path;

        fs.createReadStream(uploadFile).pipe(storage.upload({name: fileName}, function(err, file) {
            if(err) throw err;
            console.log('File Uploaded');
            var href;
            file.link(function(err, link) {
                  if (err) throw err;
                  href = link;
                  console.log('Download from:\n' + link);
                var storedData = new files({
                        subjectName: body.subjectName,
                        title: body.title,
                        fileName: fileName,
                        href: href
                    });
                    storedData.save(function(err){
                        if(err) return err;
                        else console.log('User Data Inserted !!!');
                        res.redirect('/');
                    });
                });
            }));
        }
        else res.redirect('/#/error');
    }
    else res.redirect('/#/error');
});

app.listen(PORT,SERVER,function(){
    console.log('Server listening on PORT ' + PORT);
});