import mongoose  from 'mongoose';


const projectSchema = mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true,
    },
    projectId: {
        type: String,
        required: true,
        unique: true,
    },
    projectName: {
        type: String,
    },
    gitUrl: {
        type: String,
        required: true, 
    },
    lastDeployDate: {
        type: Date,
        required: true,
    },
    domain: {
        type: String,
        required: true,
        unique: true,
    },
    
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

export default Project;

