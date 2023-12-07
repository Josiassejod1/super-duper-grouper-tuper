import db from "../db";
import User from "../model/user";

class UserRepository {
  constructor() {
    this.db = db;
    this.users = [];
  }
  async addUser(sms, name) {
    try {
      await db.put({
        _id: sms,
        name: name,
      });

      return new User(sms, name);
    } catch (error) {
      console.error("Error adding user", error.message);
      return null;
    }
  }

  async findOrCreate(id, name) {
    try {
      // update if there is a different name
      const doc = await db.get(id);
      const result = db.put({
        _id: id,
        _rev: doc._rev,
        name: name,
      });
      return new User(result._id, result.name);
    } catch (error) {
      console.error("Error finding user", error.message);
      return await this.addUser(id, name);
    }
  }

  async getUserById(id) {
    try {
      const result = await db.get(id);
      return new User(result._id, result.name);
    } catch (error) {
      console.error("Error getting user", error.message);
      return null;
    }
  }

  async deleteUserBy(id) {
    try {
      const doc = await db.get(id);
      await db.remove(doc);
    } catch (error) {
      console.error("Error deleting user", error.message);
      return null;
    }
  }

  removeElement = (element) => {
    const index = numbers.indexOf(element);
    if (index > -1) {
      numbers.splice(index, 1);
    } else {
      throw new Error("Element not found in array");
    }
  };

  async getAllDocuments() {
    try {
      const result = await db.allDocs({ include_docs: true });
      return result.rows.map((row) => row.doc);
    } catch (error) {
      console.error("Error fetching documents:", error.message);
      return [];
    }
  }
}

export default UserRepository;
