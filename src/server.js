import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import checklistItemRoutes from './routes/checklistItemRoutes.js';
import checklistSubmissionRoutes from './routes/checklistSubmissionRoutes.js';
import timesheetRoutes from './routes/timesheetRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());

const openApiPath = new URL('../docs/openapi.yaml', import.meta.url);
const openApiSpec = yaml.load(fs.readFileSync(openApiPath, 'utf8'));

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));
app.get('/api/openapi.yaml', (req, res) => {
  res.type('yaml').send(fs.readFileSync(openApiPath, 'utf8'));
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/checklist-items', checklistItemRoutes);
app.use('/api/checklist-submissions', checklistSubmissionRoutes);
app.use('/api/timesheets', timesheetRoutes);

app.get('/', (req,res) => {
    res.send('Welcome to the Property Management API');
    res.json({message: 'Api Running successfully'});
})
app.use((req,res,next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
});

app.use((err,req,res,next) => {
    console.error(err.stack);
    if(!err.status){
        err.status = 500;
        err.message = 'Internal Server Error';
    }

    res.status(err.status).json({error: err.message});
});


  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


export default app;