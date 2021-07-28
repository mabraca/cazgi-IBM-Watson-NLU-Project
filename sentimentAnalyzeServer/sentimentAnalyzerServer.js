const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = new express();


app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());


function getNLUInstance(){
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL
    const NaturalLaguageUnderstangingV1 = require('ibm-watson/natural-language-understanding/v1')
    const { IamAuthenticator } = require('ibm-watson/auth')
    const naturalLaguageUnderstanging = new NaturalLaguageUnderstangingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key
        }),
        serviceUrl: api_url
    });
    return naturalLaguageUnderstanging;
}


app.get("/",(req,res)=>{
    res.render('index.html');
  });

// Dummy urls

app.get("/url/emotion", (req,res) => {
    var url = req.query.url;

    const analyzeParams = {
        'url': url,
        'features': {
            'keywords': {
              'sentiment': false,
              'emotion': true
            }
        }
    };

    getNLUInstance().analyze(analyzeParams)
        .then(analysisResults => {
            return res.send(analysisResults.result.keywords);
        })
        .catch(err => {
            return res.status(500).send({"error": err});
        });

});

app.get("/url/sentiment", (req,res) => {
    var url = req.query.url;

    const analyzeParams = {
        'url': url,
        'features': {
            'keywords': {
              'sentiment': true,
              'limit': 1
            }
        }
    };

    getNLUInstance().analyze(analyzeParams)
        .then(analysisResults => {
            return res.send(analysisResults.result.keywords[0]);
        })
        .catch(err => {
            return res.status(500).send({"error": err});
        });

});

app.get("/text/emotion", (req,res) => {
    var text = req.query.text;

    const analyzeParams = {
        'text': text,
        'features': {
            'keywords': {
              'sentiment': false,
              'emotion': true
            }
        }
    };

    getNLUInstance().analyze(analyzeParams)
        .then(analysisResults => {
            return res.send(analysisResults.result.keywords);
        })
        .catch(err => {
            return res.status(500).send({"error": err});
        });

});

app.get("/text/sentiment", (req,res) => {

    var text = req.query.text;

    const analyzeParams = {
        'text': text,
        'features': {
            'keywords': {
              'sentiment': true,
              'limit': 1
            }
        }
    };

    getNLUInstance().analyze(analyzeParams)
        .then(analysisResults => {
            return res.send(analysisResults.result.keywords[0]);
        })
        .catch(err => {
            return res.status(500).send({"error": err});
        });

    
});



let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

