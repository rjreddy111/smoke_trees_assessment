const express = require("express")
const { response } = require("../app")
const router = express.Router()


router.get("/", async(req,res)=> {
    const db = req.app.locals.db 
    
    const getUserDb =await db.all(`SELECT Address.id as addressId, Address.address, User.id as userId, user.name  FROM Address  LEFT JOIN User ON User.id = Address.userId  `)
    res.status(200).json({data:getUserDb})
})


router.post("/register", async(req,res)=> {

    const db = req.app.locals.db
    const {name,address} = req.body 
    console.log(name,address)

    if (!name || !address) {
        return res.status(400).json({error:"Name and Address should not be empty"})
    }

    try {

        const checkUserExisting = await db.get(`SELECT * FROM User WHERE name = ?`, [name]);
        console.log(checkUserExisting)
        let lastUserId 
        if (checkUserExisting) {
            lastUserId= checkUserExisting.id
        }
        else {

        const addQuerry = await db.run(`INSERT INTO User (name) VALUES (?)`, [name]); 
         lastUserId = addQuerry.lastID  
        console.log(lastUserId)
        }

        const checkAddressexisting = await db.get(`SELECT * FROM Address where address=? AND userId = ?`, [address,lastUserId]);
        if (checkAddressexisting) {
           return  res.status(400).json({message:"Address already exists for this user, add different address"})
        }

        await db.run(`INSERT INTO Address (address, userId) VALUES (?, ?)`, [address,lastUserId]); 
        res.status(201).json({
            message: "User and address registered successfully", 
            userId : lastUserId,
            name: name , 
            address : address

        })


    }

    catch (e) {
        res.status(500).json({error : "Error registering user and address"})
        console.log("Error message", e.message)

    }
})



module.exports= router