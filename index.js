

var through = require('through2'),
    gutil = require('gulp-util'),
    po = require('node-po'),
    PluginError = gutil.PluginError;

module.exports = function () {

    function write (f, enc, cb){
        if (f.isNull()) {
            this.push(f);
            return cb();
        }

        if (f.isStream()) {
            this.emit('error', new PluginError('gulp-po-json', 
                'Streaming not supported'));
            return cb();
        }

        var pofile = po.parse(f.contents.toString('utf-8')),
            res = {},
            dic = {},
            i,
            l;

        if (!pofile) {
            this.emit('error', new PluginError('gulp-po-json', 
                'Unable to parse file ' + f.path));
            return cb();
        }

        res.meta = pofile.headers;
        res.dic = dic;

        for (i = 0, l = pofile.items.length; i < l; i += 1) {
            res.dic[pofile.items[i].msgid] = pofile.items[i].msgstr[0];
        }

        f.path = f.path.replace(/\.po$/gi, '.json');
        f.contents = new Buffer(JSON.stringify(res));
        this.push(f);
        cb();
    }

    function end (cb) {
        cb();
    }

    return through.obj(write, end);
};
