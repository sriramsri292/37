const express = require('express');
const fs = require('fs').promises;

const app = express();
const port = 3000;

app.use(express.json());

const filesFolder = './files'; // Specify the folder for storing text files

async function createFile() {
  try {
    const content = new Date().toString();
    const fileName = `${new Date().toISOString().replace(/:/g, '-')}.txt`;
    const filePath = `${filesFolder}/${fileName}`;
    
    await fs.writeFile(filePath, content);
    console.log(`File "${fileName}" created successfully at ${new Date().toLocaleString()}`);
  } catch (err) {
    console.error(err);
  }
}

// API endpoint to create a text file
app.post('/createFile', async (req, res) => {
  try {
    await createFile();
    res.status(200).json({ message: 'File created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// API endpoint to retrieve all text files
app.get('/getAllFiles', async (req, res) => {
  try {
    const files = await fs.readdir(filesFolder);
    res.status(200).json({ files });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Call createFile once to check if it logs correctly
createFile();
