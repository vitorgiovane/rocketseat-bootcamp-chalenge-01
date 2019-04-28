const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

app.get('/', (req, res) => {
  return res.render('age')
})

app.post('/check', (req, res) => {
  if (parseInt(req.body.age) < 18) {
    return res.redirect(`/minor?age=${req.body.age}`)
  }
  return res.redirect(`/major?age=${req.body.age}`)
})

const checkFill = (req, res, next) => {
  if (!req.query.age) {
    return res.redirect('/')
  }
  return next()
}

app.get('/minor', checkFill, (req, res) => {
  const age = req.query.age
  return res.render('minor', { age })
})

app.get('/major', checkFill, (req, res) => {
  const age = req.query.age
  return res.render('major', { age })
})

app.listen(3000)
