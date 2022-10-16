const Question = require('../models/Question')

module.exports = {
    getIndex: async (req,res)=>{
        const question = await Question.aggregate([ { $sample: { size: 1} } ]);
        res.render('index', {question: question});
    },
    getQs: async (req,res) => {
        const questions = await Question.find({});
        return questions
    }
}