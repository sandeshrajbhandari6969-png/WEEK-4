const express = require('express');
const app = express();
const path = require('path');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/StudentInfo', function(req, res) {
  res.sendFile('StudentInfo.html', { root: __dirname });
});
app.post('/submit-data', function(req, res) {
  const name = req.body.firstName + ' ' + req.body.lastName;
  const age = req.body.myAge;
  const gender = req.body.gender;
  const qual = req.body.Qual;

  console.log('Form submitted:', req.body);

  res.send({
    status: true,
    message: 'Form Details',
    data: {
      name: name,
      age: age,
      gender: gender,
      qualification: qual
    }
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
