const axios = require('axios')
const path = require('path')
const express = require('express')
const app = express()
require('dotenv').config()

// Body parser
app.use(express.json())

// Send mail API
app.post('/sendmail', async (req, res) => {
  const data = {
    service_id: process.env.SERVICE_ID,
    template_id: process.env.TEMPLATE_ID,
    user_id: process.env.PUBLIC_KEY,
    accessToken: process.env.PRIVATE_KEY,
    template_params: req.body,
  }

  try {
    await axios.post('https://api.emailjs.com/api/v1.0/email/send', data)
    res.status(200).send('Email sent successfully')
  } catch (error) {
    console.error(error)
    res.status(400).send({ error: 'Unable to send email' })
  }
})

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.get('/', (req, res) => {
  res.send('API is running!')
})

const PORT = process.env.PORT || 5000 // heroku port

app.listen(PORT, () => console.log('Server is running'))
