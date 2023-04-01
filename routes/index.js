import express from 'express'
import axios from 'axios'
import Ticker from '../model/Ticker'
const router = express.Router()

router.get('/fetchFromAPI', async (req, res, next) => {
  const apiUrl = 'https://api.wazirx.com/api/v2/tickers'

  axios
    .get(apiUrl)
    .then(response => response.data)
    .then(data => {
      Object.entries(data)
        .slice(0, 10)
        .forEach(([tname, ticker]) => {
          const { last, buy, sell, volume, base_unit } = ticker
          const newTicker = new Ticker({
            tname,
            last,
            buy,
            sell,
            volume,
            base_unit
          })
          try {
            const tickers = newTicker
              .save()
              .then(() => {
                console.log(`Stored ${tname} ticker data`)
              })
              .catch(error =>
                console.error(`Error storing ${tname} ticker data`, error)
              )
          } catch (error) {
            return next(error)
          }
        })
    })
    .catch(error => console.error('Error fetching ticker data', error))
   
})

router.get('/fetchFromDatabase', async (req, res) => {
  try {
    const tickers = await Ticker.find().limit(10).select('-__v -_id')
    res.render('data', { tickers: tickers })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
