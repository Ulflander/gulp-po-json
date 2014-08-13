
'use strict';

var should = require('should'),
    es = require('event-stream'),
    gutil = require('gulp-util'),
    path = require('path'),
    Vinyl = require('vinyl'),
    fs = require('fs'),
    pojson = require('../');


describe('gulp-po-json', function() {
    it('should convert po file into JSON', function(done) {
        var stream = pojson();

        stream.on('data', function(newFile) {
            var res = JSON.parse(newFile.contents, 'utf-8');
            res.should.have.property('meta');
            res.should.have.property('dic');
            res.dic.should.have.property('Credits', 'Crédits');
        });

        stream.on('end', function() {
            done();
        });

        stream.write(new gutil.File({
            path: 'test/text.po',
            contents: fs.readFileSync(path.join(__dirname, 'text.po'))
        }));

        stream.end();
    });
});