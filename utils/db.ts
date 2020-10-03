import { connect } from 'mongoose';

const {
  MONGO_USER,
  MONGO_PASSWORD,
} = process.env;

export const connectDB = () => {
  connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.oj6kf.mongodb.net/proactive?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
