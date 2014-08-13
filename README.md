gulp-po-json
============

## Information

<table>
<tr> 
<td>Package</td><td>gulp-po-json</td>
</tr>
<tr>
<td>Description</td>
<td>Utility to convert PO files to JSON files with Gulp</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 0.10</td>
</tr>
</table>

### Usage

```
var gulp = require('gulp'),
    pojson = require('gulp-po-json');

gulp.task('i18n', function() {
    return gulp 
        .src('locales/*.po')
        .pipe(pojson())
        .dest('dist/locales');
});

```