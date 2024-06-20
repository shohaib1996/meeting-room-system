/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  excludeBooked() {
    this.modelQuery = this.modelQuery.find({ isBooked: false });
    return this;
  }
  excludeDeleted() {
    this.modelQuery = this.modelQuery.find({ isDeleted: false });
    return this;
  }

  filterByParams() {
    const { date, roomId } = this.query;

    const filters: FilterQuery<T> = {};

    if (typeof date === "string") {
      (filters as any).date = date;
    }

    if (typeof roomId === "string") {
      (filters as any).room = roomId;
    }

    this.modelQuery = this.modelQuery.find(filters);
    return this;
  }
}

export default QueryBuilder;
