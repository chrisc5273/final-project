import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());


app.use('/api/auth', authRoutes)
app.use("/api/users", userRoutes), (req, res) => {
  res.json({ message: "Users endpoint" });
}

app.use('/api/properties');

app.use((req,res,next) => {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
}
);


app.use((err,req,res,next) => {
    console.log(err.stack);
    if(!err.status){
        err.status = 500;
        err.message="Internal Server Error";
    }

    res.status(err.status).json({error: err})
});


if (process.env.NODE_ENV !== 'testing') {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

export default app;