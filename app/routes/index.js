var express = require('express');
var router = express.Router();
var formidable = require('formidable')
var fs = require('fs')//mexe com o sisttema de arquivos

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });

});

router.get('/file',(req,res)=>{
  let path = './' + req.query.path
  if(fs.existsSync(path)){//verifica a existencia
    
    fs.readFile(path,(err,data)=>{

      if(err){
        console.error(err)
        res.status(400).json({error:err})
      }else{
        res.status(200).end(data)
      }
    })
  
  }else{
    res.status(404).json({
      error: 'File not found'
    })
  }
})


router.delete('/file',(req,res)=>{

  let form = new formidable.IncomingForm({
    uploadDir : './upload',//pasta onde vai enviado o arquivo
    keepExtensions: true
  })

  form.parse(req,(err,fields,files)=>{

    let path = "./" /*a parti do diretorio atual*/ + fields.path//concatena aqui

    if(fs.existsSync(path)){//verifica a existencia

      fs.unlink(path/*unlink--> remove o arquivo fisico*/,err =>{//
         if(err){res.status(400).json({err})
         }else{
           res.json({fields})
          }
      })
    } 
  }) 
})


router.post('/upload',(req,res)=>{
  let form = new formidable.IncomingForm({
    uploadDir : './upload',//pasta onde vai enviado o arquivo
    keepExtensions: true
  })

  form.parse(req,(err,fields,files)=>{

    res.json({
      files
    })
  })
})






module.exports = router;
