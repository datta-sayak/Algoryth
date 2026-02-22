import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true,
  },
  problemSlug: {
    type: String,
    required: true,
    index: true,
  },
  problemId: {
    type: String,
    required: true,
  },
  problemTitle: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
    default: 'javascript',
  },
  verdict: {
    type: String,
    enum: ['Accepted', 'Wrong Answer', 'Runtime Error', 'Compilation Error', 'Time Limit Exceeded', 'Memory Limit Exceeded', 'Error'],
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
  },
  executionTime: {
    type: Number, // milliseconds
    default: 0,
  },
  memoryUsed: {
    type: Number, // bytes
    default: 0,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for quick lookups
submissionSchema.index({ userId: 1, submittedAt: -1 });
submissionSchema.index({ problemSlug: 1, userId: 1 });

// Update the updatedAt field before saving
submissionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Submission = mongoose.models.Submission || mongoose.model('Submission', submissionSchema);

export default Submission;
