const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const blogPosts = [];

app.get('/', (req, res) => {
  res.render('home', { blogPosts });
});
app.post('/blog/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = blogPosts.find(post => post.id === id);
  res.render('blogpost', { post });
});

app.get('/add-blog', (req, res) => {
  res.render('addblog');
});

app.post('/add-blog', (req, res) => {
  const { title, content } = req.body;

  const newPost = {
    id: blogPosts.length + 1,
    title,
    content,
  };

  blogPosts.push(newPost);

  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
