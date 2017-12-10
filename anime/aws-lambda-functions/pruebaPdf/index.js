let conversion = require("phantom-html-to-pdf");

exports.handler = function(evento, context, callback) {

    conversion({ html: "<h1>Hello World</h1>" }, function(err, pdf) {
        console.log(pdf.logs);
        console.log(pdf.numberOfPages);
        pdf.stream.pipe(res);
    });
};