var express = require("express");
const article = require("./../models/article");
var router = express.Router();
var Article = require('./../models/article')

router.get('/new',(req,res)=>{
    res.render('articles/new',{ article: new Article() })
});
//new one

router.get('/a',(req,res)=>{
    res.render('articles/new',{ article: new Article() })
});

router.get('/edit/:id', async (req,res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit',{ article: article })
})

router.get("/:slug" ,async (req,res) => {
      const article = await Article.findOne({ slug: req.params.slug })
     if ( article ==null) res.redirect('/')
  res.render('articles/show',{article : article })
});

router.post('/', async (req, res, next) => {
    req.article = new Article()
    next()
}, saveArticleAndRedirect('new'))

router.put('/:id', async (req,res, next) => {
    req.article = await Article.findByIdAndUpdate(req.params.id)
    next()
}, saveArticleAndRedirect('edit'))

router.delete('/:id', async (req,res) =>{
 await Article.findByIdAndDelete(req.params.id)
 res.redirect('/a')
})

function saveArticleAndRedirect(path){
    return async (req,res) => {
        var article = req.article
           article.title= req.body.title
           article.description= req.body.description
           article.author= req.body.author 
    try{
        article = await article.save()
        res.redirect(`/articles/${article.slug}` )
       }catch (e){
        res.render(`articles/${path}`, { article: article })
    }
    }
}

module.exports=router

