import { Document, Model, Types, UpdateQuery } from "mongoose";

type BaseModel<T> = Model<
  T,
  {},
  {},
  {},
  Document<unknown, {}, T> &
    T & {
      _id: Types.ObjectId;
    },
  any
>;

interface PaginatedDataQuery {
  limit: number;
  page: number;
}

export class BaseService<ModelType> {
  constructor(private readonly model: BaseModel<ModelType>) {}

  findOne(id: Partial<ModelType>) {
    return this.model.findOne(id);
  }

  async find({ limit, page }: PaginatedDataQuery) {
    const total = await this.model.countDocuments();
    const skip = limit * (page - 1);
    const docs = await this.model.find().skip(skip).limit(limit).exec();

    return {
      total,
      page,
      data: docs,
    };
  }

  create(inputs: Partial<ModelType>) {
    const delivery = new this.model(inputs);

    return delivery.save();
  }

  update(id: Partial<ModelType>, inputs: UpdateQuery<ModelType>) {
    return this.model.updateOne(id, inputs);
  }

  delete(id: Partial<ModelType>) {
    return this.model.deleteOne(id);
  }
}
