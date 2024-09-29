import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // Exclude booked rooms
  excludeBooked() {
    this.modelQuery = this.modelQuery.find({ isBooked: false });
    return this;
  }

  // Exclude deleted rooms
  excludeDeleted() {
    this.modelQuery = this.modelQuery.find({ isDeleted: false });
    return this;
  }

  // Filter by search parameters: date, roomId, name, price range, capacity
  filterByParams() {
    const { date, roomId, name, minPrice, maxPrice, minCapacity, maxCapacity } = this.query;

    const filters: FilterQuery<T> = {};

    if (typeof date === "string") {
      (filters as any).date = date;
    }

    if (typeof roomId === "string") {
      (filters as any).room = roomId;
    }

    // Search by name (case-insensitive partial match)
    if (typeof name === "string") {
      (filters as any).name = { $regex: new RegExp(name, "i") };
    }

    // Filter by price range
    if (minPrice && maxPrice) {
      (filters as any).pricePerSlot = { $gte: minPrice, $lte: maxPrice };
    }

    // Filter by capacity range
    if (minCapacity && maxCapacity) {
      (filters as any).capacity = { $gte: minCapacity, $lte: maxCapacity };
    }

    this.modelQuery = this.modelQuery.find(filters);
    return this;
  }

  // Sort by price
  sortByPrice() {
    const { sortByPrice } = this.query;

    if (sortByPrice === "asc") {
      this.modelQuery = this.modelQuery.sort({ pricePerSlot: 1 });
    } else if (sortByPrice === "desc") {
      this.modelQuery = this.modelQuery.sort({ pricePerSlot: -1 });
    }

    return this;
  }
}

export default QueryBuilder;
