const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const {User} = require("./models/User");
const {Board} = require("./models/Board");
const {BoardIndex} = require("./models/BoardIndex");
const {auth} = require('./middleware/auth');

const app = express()
const port = 5000

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://sharping:9025@cluster0.ucs8j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

//app.get('/', (req, res) => {res.send('Hello World!~~ ')})

//app.get('/api/hello', (req, res) => {res.send("안녕하세요~")})

app.get('/api/users/auth', auth , (req,res) => {
  res.status(200).json({
      _id: req.user._id,
      isAdmin: req.user.role === 0 ? false : true,
      isAuth: true,
      email: req.user.email,
      name: req.user.name,
      lastname: req.user.lastname,
      role: req.user.role,
      image: req.user.image
  });
})

app.post('/api/users/register', (req, res) => {
  const user = new User(req.body);
  
  user.save((err, userInfo) => {
    if (err) return res.json({success: false, err})
    return res.status(200).json({
      success: true
    })
  });
})

app.post('/api/boards/register', (req, res) => {
  BoardIndex.findOne({}, (err, boardIndex) => {

    if(boardIndex == null){
      req.body.id = 0;

      const bIndex = new BoardIndex({id: req.body.id+1});
      bIndex.save((err, bIndex) => {
      });
    }
    else{
      req.body.id = boardIndex.id;
    }

    BoardIndex.findOneAndUpdate({}, {id: req.body.id+1}, (err, boardIndex) => {
      const board = new Board(req.body);

      board.save((err, boardInfo) => {
        if (err) return res.json({success: false, err});
        return res.status(200).json({
          success: true
        });
      });
    });
  });
})

app.get('/api/boards/loadall', (req, res) => {
  Board.find({}, (err,board) => {
    return res.status(200).send(board);
  });
})

app.get('/api/boards/loadinfo', (req,res) => {
  console.log(req.body);  // Error: empty json array
  Board.findOne({id: req.body.ids}, (err,board) => {
    return res.status(200).send(board);
  });
})

app.post('/api/users/login',(req,res) => {
  User.findOne({email: req.body.email}, (err,user) => {
      if(!user) {
          return res.json({
              loginSuccess: false,
              message: "제공된 이메일에 해당하는 유저가 없습니다."
          })
      }
  
      user.comparePassword(req.body.password, (err,isMatch) => {
          if(!isMatch)
              return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다." })

          user.generateToken((err, user) => {
              if(err) return res.status(400).send(err);
              
              res.cookie("x_auth", user.token)
              .status(200)
              .json({loginSuccess: true, userId: user._id})
          })    
      })
  })
})

app.get('/api/users/logout', auth, (req,res) => {
  User.findOneAndUpdate({_id: req.user._id},
      {token: ""}
      , (err,user) => {
          if(err) return res.json({success: false, err});
          return res.status(200).send({
              success: true
          })
      })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))