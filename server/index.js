const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

const FoodModel = require('./models/Food')

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

mongoose.connect('mongodb+srv://bortizjr84:Silent84@mernapp2.8h4rl.mongodb.net/food?retryWrites=true&w=majority', {
    useNewUrlParser: true,
})

app.get('/read', async (req, res) => {
    FoodModel.find({}, (err, result) => {
        if (err) {
            res.send(err)
        }
        res.send(result)
    })
})

app.post('/insert', async (req, res) => {
    const foodName = req.body.foodName
    const days = req.body.days
    
    const food = new FoodModel({ foodName: foodName, daysSinceIAte: days })
    
    try {
        await food.save()
        res.send("inserted data")
    } catch (err) {
        console.log(err)
    }
})

app.put('/update', async (req, res) => {
    const newFoodName = req.body.newFoodName
    const id = req.body.id
    
    try {
        await FoodModel.findById(id, (err, updatedFood) => {
            updatedFood.foodName = newFoodName
            updatedFood.save()
            res.send("update")
        })
    } catch (err) {
        console.log(err)
    }
})

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id

    await FoodModel.findByIdAndRemove(id).exec()
    res.send('deleted')
})



app.listen(3001, () => {
    console.log('Server is running on port 3001...')
})
