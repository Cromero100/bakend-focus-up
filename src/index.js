// import multer from "multer";
// import server from "/config";


// const app = express();


// app.use(express.json())
// app.use(express.urlencoded({extended: true}))
// const upload = multer({
//     dest: "/upload"
// }   
//     )


// app.get('/', upload.none ,(req,res) => {
//     res.status(200).send("<h1>Hola mundo</h1>")
// })


// app.post('/home',(req,res) => {
// res.status(200).json({

//     msn:"Metodo Post",
//     //tipos de req
//     query:req.query,
//     body: req.body,
//     header: req.headers,
//     params: req.params,

// })
// })

// app.get('/home',(req,res) => {
//     req.
//     res.status(200).json({
//         success: true ,
//         msn: 'hola mundo GET'
//     })
// })

// app.listen(4000, ()=> {
//     console.log('Hola servidor', 4000);
// })


// app.post('/home',(req,res) => {
//     res.status(200).json({
//         success: true ,
//         msn: 'hola mundo por post'

//     })
// })

import Server from "./config/server.js";

const run = new Server()

run.runServer()