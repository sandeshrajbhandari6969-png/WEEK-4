var express = require('express') 
var fs = require('fs') 
const bodyParser = require('body-parser'); 
var app = express() 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

const port = 3000 
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`)); 


app.get('/GetStudents', (req, res) => { 
  studentdata = {} 
  fs.readFile(__dirname + "/" + "Students.json", 'utf8', function (err, data) { 
    res.json({ 
      'status': true, 
      'Status_Code': 200, 
      'requested at': req.localtime, 
      'requrl': req.url, 
      'request Method': req.method,       
      'studentdata': JSON.parse(data)
    }); 
  }); 
})     

app.get('/GetStudent/:id', (req, res) => {
    console.log("getid called");
    fs.readFile(__dirname + "/" + "Students.json", 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(500).json({
                status: false,
                Status_Code: 500,
                message: "Internal Server Error"
            });
        }

        const students = JSON.parse(data);
        const student = students["Student" + req.params.id];

        console.log(student);

        if (student) {
            res.json(student);
        } else {
            res.json({
                status: true,
                Status_Code: 200,
                Student: 'Not Found',
                'requested at': req.localtime,
                'requr1': req.url,
                'request Method': req.method
            });
        }
    });
});
app.post('/AddStudent/:id/:name/:Age/:Qual/:Email', (req, res) => { 
    console.log("post called");

    fs.readFile( __dirname + "/" + "Students.json", 'utf8', function (err, data) { 
        data = JSON.parse(data);        

        newstudent = { 
            'name': req.params.name, 
            'Age': req.params.Age, 
            'Qualification': req.params.Qual, 
            'Email': req.params.Email, 
            'id': req.params.id 
        };     

        studentdata = "Student" + req.params.id;

        data[studentdata] = newstudent
        res.json(data);  
    }); 
});
app.delete('/delete/:id', (req, res) => {
  fs.readFile(__dirname + "/" + "Students.json", 'utf8', function (err, data) {
    data = JSON.parse(data);


    delete data["Student" + req.params.id];

    res.json({
      'status': true,
      'Status_Code': 200,
      'requested at': req.localtime,
      'requrl': req.url,
      'request Method': req.method,
      'studentdata': data
    });
  });
});
