'use strict';
const fs = require('fs');

const blExcelDownload = (request, response) => {
    var file = "BLUploadFormat.xlsx";
    var filePath = "./downLoadFile/excelFiles/";
    console.log(filePath ,' ', file)
    fs.exists(filePath, function(exists) {
        console.log('exists',exists);
        if(exists) {
            response.writeHead(200, {
                "Centent-Type": "application/octet-stream",
                "Content-Disposition" : "attachment; filename=" + file
            });
            fs.createReadStream(filePath + file).pipe(response);
        }else {
            response.writeHead(400, {"Content-Type":"text/plain"});
            response.end("Error File does NOT Exists.ipa");
        }
    })

}


module.exports = {
    blExcelDownload
}
