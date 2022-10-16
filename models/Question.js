const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  qtype: {
    type: String,
    required: true,
  },
  qsource: {
    type: String,
    required: true
  },
  response: String
},  {timestamps: true} )

module.exports = mongoose.model('Question', QuestionSchema)