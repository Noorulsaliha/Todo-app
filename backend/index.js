const express = require('express');
const App = express();
const PORT = 3000;
const cors = require('cors')
const { createTodo, updateTodo } = require('./types'); 
const todo = require('./db');

//Body-Parser Middleware
App.use(express.json())
//cors 
App.use(cors({
    origin:"http://localhost:5173"
}))

App.post('/todos', async (req,res)=>{
    const createPayload = req.body;
    const parsePayload = createTodo.safeParse(createPayload);

    if(!parsePayload.success){
        res.status(411).json({
            msg : "You sent the wrong inputs"
        })
        return;
    }
    try{
        await todo.create({
            title : createPayload.title,
            description : createPayload.description,
            boolean : false
        })
        res.json({
            msg : "Todo created successfully"
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            msg : "Failed to create Todo"
        })
    }
}) 

App.get('/todos', async (req,res)=>{
    const response = await todo.find({});
    res.json(response)
})

App.put('/completed', async (req,res)=>{
    const UpdatePayload = req.body;
    const parsePayload = updateTodo.safeParse(UpdatePayload);
    console.log(parsePayload);
    if(!parsePayload.success){
        res.status(411).json({
            msg : "You sent the wrong input"
        })
        return;
    }
    const response = await todo.updateOne({
        _id : req.body.id
    }, {
        completed : true
    })
    res.json({
        msg : "Mark as completed",
        response
    })
})


App.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
})