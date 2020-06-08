const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();

app.use(express.urlencoded({ extended: false }));

// app.engine('hbs', hbs());
app.set('view engine', 'hbs');
app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './views', defaultLayout: 'main' }));

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { layout: false, name: req.params.name });
});

app.get('/dark.css', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/dark.css'));
});

app.get('/about', (req, res) => {
  res.render('about');
});

// app.post('/contact/send-message', (req, res) => {
//   res.json(req.body);
// });

app.post('/contact/send-message', (req, res) => {

  const { author, sender, title, message, file} = req.body;

  if(author && sender && title && message && file) {
    res.render('contact', { isSent: true, file});
  }
  else {
    res.render('contact', { isError: true });
  }

});

app.get('/dark', (req, res) => {
    res.render('dark');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});