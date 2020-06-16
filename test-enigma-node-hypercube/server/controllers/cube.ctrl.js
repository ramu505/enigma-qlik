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

    const properties = {
        qInfo: {
          qType: 'hypercube',
        },
        qHyperCubeDef: {
          qDimensions: [
            {
              qDef: { qFieldDefs: ['OrderDate'] },
            },
          ],
          qMeasures: [
            {
              qDef: { qDef: '=count(OrderID)' },
            },
          ],
          qInitialDataFetch: [
            {
              qHeight: 5,
              qWidth: 2,
            },
          ],
        },
      };

module.exports = {
   getHperCube: (req, res, next) => {        
        qixSession=enigma.create(qix_config);
        qixSession.open().then((global) => {
        qixGlobal=global;
        var docId = "temp.qvf";
        qixGlobal.openDoc(docId).then(docs => {
            console.log("app0123", docs);
            currApp = docs;     
           currApp.createObject(properties)
            .then(object => object.getLayout())
            .then(layout => {                
                res.send(layout.qHyperCube.qDataPages[0].qMatrix);
        });          
        });   
    })
}
}