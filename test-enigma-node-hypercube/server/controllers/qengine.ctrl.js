const enigma = require('enigma.js');
const WebSocket = require('ws');
const schema = require('enigma.js/schemas/12.67.2.json');
var qixGlobal=null;
var qixSession=null

const qix_config = {
    schema,
    url: 'ws://localhost:4848/app/engineData',
    createSocket: url => new WebSocket(url)
    };

module.exports = {
    /**
    * Get All Apps
    */
    getApps: (req, res, next) => {

        var qParam =  {
            "qInfo": {
            "qType": "DimensionList",
            "qId": ""
            },
            "qDimensionListDef": {
            "qType": "dimension",
            "qData": {
            "title": "/qMetaDef/title",
            "tags": "/qMetaDef/tags",
            "grouping": "/qDim/qGrouping",
            "info": "/qDimInfos"
            }
            }
            }
            var qOptionsSheet={
                "qOptions": {
                "qTypes": [
                "sheet"
                ],
                "qIncludeSessionObjects": false,
                "qData": {}
                }
                }
                

        qixSession=enigma.create(qix_config);
        qixSession.open().then((global) => {
        qixGlobal=global;
        var docId = "C:\\Users\\RAMU\\Documents\\Qlik\\Sense\\Apps\\temp.qvf";
        qixGlobal.openDoc(docId).then(docs => {
            console.log("app0", docs);
            currApp = docs;
            currApp.createSessionObject(qParam).then(function(qObject){
                console.log("created object");
                qObject.getLayout().then(function(qProp){
                    console.log("qProp.qDimensionList.qItems", qProp);
                // res.json({msg:qProp.qDimensionList.qItems})
                },
                (e)=> {console.log(err);res.json(err)});

                currApp.getObjects(qOptionsSheet).then(qProp => {
                    console.log("qProp", qProp);
                    res.json({msg:qProp})
                },
                   e=>console.log("eee",e))
        })

        // console.log(qixSession.qDimensionListDef)
        // qixGlobal.getDocList().then(function(list){
        //     // console.log("list is ", list);
        //     res.json({msg:list})
        // });
        });   
    })
}
}