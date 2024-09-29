const express = require("express")
const path = require("path")
const sqlite3 = require("sqlite3")
const {open} = require("sqlite")
const cors = require("cors")




const app = express()

app.use(cors())
app.use(express.json())

const routePath = require("./routes/register")

const dbPath = path.join(__dirname,"table.db")


let db = null 


const tablesCreate = async()=> {
    try {
        await db.exec (
            `CREATE TABLE IF NOT EXISTS User (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name TEXT NOT NULL
         );`
            ); 
        
            await db.exec (`
                CREATE TABLE IF NOT EXISTS Address (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                address TEXT NOT NULL , 
                userId INTEGER, 
                FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
                );`
                );
            console.log("created table successfully")

    }
    catch (error) {
        console.log(`Error creating tables : ${error.message}`)

    }
}


const initializeSeverConnection = async()=> {
   try {
   
    db =  await open ({
        filename:dbPath, 
        driver:sqlite3.Database
    })


    await tablesCreate()
    app.locals.db = db 
    


        app.listen(5001,()=> {
        console.log("server is runing on 5001")
        
})
   }
   catch (error) {
        console.log(`DB Error: ${error.message}`)
        process.exit(1)

   }

}

initializeSeverConnection()


app.use("/api", routePath)


module.exports = app