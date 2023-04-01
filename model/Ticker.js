import mongoose from 'mongoose'

const tickerSchema = new mongoose.Schema({
  tname: {
    type: String,
    required: true
  },
  last: {
    type: Number,
    required: true
  },
  buy: {
    type: Number,
    required: true
  },
  sell: {
    type: Number,
    required: true
  },
  volume: {
    type: Number,
    required: true
  },
  base_unit: {
    type: String,
    required: true
  }
})

export default mongoose.model('Ticker', tickerSchema)
