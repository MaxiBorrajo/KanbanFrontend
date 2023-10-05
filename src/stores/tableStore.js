import { defineStore } from "pinia";
import axios from "../config/axios";

export const useTableStore = defineStore("tableStore", () => {

  /**
   * Function that creates a table
   * @param {Object} data - Object with:
   * {String} tableName - Is required
   * @returns {Object} A object with a message or the resource requested
   * @throws {Object} If something goes wrong returns an object with specifications
   * of the error
   */
  async function createTable(data) {
    try {
      const result = await axios.post("/api/tables", data);

      return result.data.success;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Function that gets a specific table
   * @param {Number} id - Table's id
   * @returns {Object} A object with a message or the resource requested
   * @throws {Object} If something goes wrong returns an object with specifications
   * of the error
   */
  async function getTableById(id) {
    try {
      const result = await axios.get(`/api/tables/${id}`);

      return result.data.resource;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Function that gets all tables
   * @returns {Object} A object with a message or the resource requested
   * @throws {Object} If something goes wrong returns an object with specifications
   * of the error
   */
  async function getTables() {
    try {
      const result = await axios.get(`/api/tables`);

      return result.data.resource;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Function that updates a specific table
   * @param {Number} id - Table's id
   * @param {Object} data - Object with:
   * {String} tableName - Table's name
   * @returns {Object} A object with a message or the resource requested
   * @throws {Object} If something goes wrong returns an object with specifications
   * of the error
   */
  async function updateTableById(id, data) {
    try {
      const result = await axios.put(`/api/tables/${id}`, data);

      return result.data.success;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Function that deletes a specific table
   * @param {Number} id - Table's id
   * @returns {Object} A object with a message or the resource requested
   * @throws {Object} If something goes wrong returns an object with specifications
   * of the error
   */
  async function deleteTableById(id) {
    try {
      const result = await axios.delete(`/api/tables/${id}`);

      return result.data.success;
    } catch (error) {
      throw error;
    }
  }


  return {
    createTable,
    deleteTableById,
    getTableById,
    getTables,
    updateTableById
  };
});
