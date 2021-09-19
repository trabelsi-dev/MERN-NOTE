

const express = require("express");
//const notes = require("./data/notes")

const dotenv = require('dotenv');
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
// cette pour nous permt d'utiliser .env
dotenv.config();
// to read json
app.use(express.json( ))
connectDB();
//create api 
//req jeya mil front w res mil back
/*
app.get('/',(req,res) => {
    log("api running ")
 
})*/
/*
app.get('/api/notes',(req,res)=> {
    res.json(notes)

})
*/

/*
app.get("/api/notes/:id", (req,res) => {
    // req.params hedi traja3 les variable ili fil path 
    // _id hejka imajla fi données te3an ili fi wisit find haka ya3ni ki yibda id fil path kima fi données raja3li contenu te3ou 
    const note = notes.find((n)=> n._id === req.params.id);
    res.send(note)

})
*/

//route heda yibda lil ay haja teb3ab3a user w ba3id  a3mlna call lil userRoutes w fi userRoutes 
// hawka 8adi a3mlna zeda route w in3awtou lil controllers 
app.use('/api/users',userRoutes);
app.use('/api/notes',noteRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
//créer server 
app.listen(PORT,console.log(`server started on port ${PORT}`));













