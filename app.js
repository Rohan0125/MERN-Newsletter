const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app= express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",(req,res)=>{
  const firstname= req.body.fname;
  const lastname= req.body.lname;
  const emailid= req.body.email;
  const data={
    members:[
      {
        email_address:emailid,
        status:"subscribed",
        marge_fields:{
           FNAME:firstname,
           LNAME:lastname
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);
  const url='https://us20.api.mailchimp.com/3.0/lists/2372cd8d06';//d0a58a641e7c6cd9721b74641c9f67db-us20
  //apikey:d0a58a641e7c6cd9721b74641c9f67db-us20 listid:2372cd8d06
  const options={
    method:"POST",
    auth:"rohan:d0a58a641e7c6cd9721b74641c9f67db-us20"
  }

  const request = https.request(url, options, (response) => {
   if (response.statusCode === 20) {
     res.sendFile(__dirname + "/success.html");
   } else {
     res.sendFile(__dirname + "/failure.html");
   }
 });
  // const request =  https.request(url,options,(response)=>{
  //   response.on("data",(data)=>{
  //     console.log(JSON.parse(data));
  //   })
  // });

  request.write(jsonData);
  request.end();
});

app.post("/failure", (req, res) => {
  res.redirect("/");
});

app.listen(3000, ()=>{
  console.log("server running on:3000");
})
