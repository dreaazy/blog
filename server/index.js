const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

/* models */

const User = require('./models/User');


require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

const mongoString = process.env.DATABASE_URL;

/* application use */
app.use(express.json());
app.use(cors());

/* db connection */
async function connectToDatabase() {
  try {
    await mongoose.connect(mongoString,{});
    console.log("CONNECTED TO DATABASE SUCCESSFULLY");
  } catch (error) {
    console.error("COULD NOT CONNECT TO DATABASE:", error.message);
  }
}

connectToDatabase();

app.get("/", async (req, res) => {


  try{
    const newUser = new User({
      name: 'Johdawdan',
      surname: 'Dawdadwawoe',
      email: 'joawdawhn@adawdawwdawexample.com',
      password: 'paawdawssword123'
    })


    await newUser.save();

    res.send("Utente Inserito");

  } catch(error)
  {
    console.error("si è verificato un errore",error);
    res.status(500).send('Error creating user');
  }
  
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
