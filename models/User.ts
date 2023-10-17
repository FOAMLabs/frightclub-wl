// models/User.ts
import mongoose, { Document, Model, Schema } from 'mongoose';

const modelName = 'User';

interface IUser extends Document {
  twitterId: string;
  name: string;
  username: string;
}

interface IUserModel extends Model<IUser> {
  findOrCreate: (
    condition: object,
    doc: object,
    callback: (err: any, result: IUser) => void
  ) => void;
}

const userSchema = new mongoose.Schema({
  twitterId: { type: String, unique: true },
  name: String,
  username: String,
});

userSchema.statics.findOrCreate = function (
  condition: object,
  doc: object,
  callback: (err: any, result: IUser) => void
): void  {
  const self = this;
  self.findOne(condition, (err: any, result: IUser | null) => {
    return result
      ? callback(err, result)
      : self.create(doc, (err: any, result: IUser) => {
          return callback(err, result);
        });
  });
};

export default mongoose.models[modelName] || mongoose.model<IUser, IUserModel>(modelName, userSchema);
