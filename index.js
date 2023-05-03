const express = require('express')
const axios = require('axios')
const { topMaps, mapsData } = require('./data')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')

dotenv.config()

const corsOptions = {
  origin:'http://localhost:3000',
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

app.use(cors(corsOptions))

app.get('/init', async (_, response) => {
  axios.get(`https://api-maps.yandex.ru/3.0/?apikey=${process.env.YMAPS_API_KEY}&lang=ru_RU`)
  .then((mapsResponse) => {
    response.send(mapsResponse.data)
  })
  .catch((err) => {
    console.log(err)
  })
})

app.get('/top', (_, response) => {
  response.send(topMaps)
})

app.get('/map/:id', (request, response) => {
  response.send(mapsData[request.params.id])
})

app.get('/preview/:id', (request, response) => {
  response.sendFile(`${__dirname}/preview/${request.params.id}.jpg`)
})

app.get('/map/:id/tiles/:zoom/:x/:y', (request, response) => {
  const params = request.params
  response.sendFile(`${__dirname}/tiles/${params.id}/${params.zoom}/tile-${params.x}-${params.y}.jpg`)
})

app.listen(5555, () => {
  console.log('Listening!')
})