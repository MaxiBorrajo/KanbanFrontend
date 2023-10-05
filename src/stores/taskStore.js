import { defineStore } from "pinia";
import axios from "../config/axios";

export const useTaskStore = defineStore("taskStore", () => {

  /**
   * Function that creates a task
   * @param {Object} data - Object with:
   * {String} title - Is required
   * {String} order - Is required
   * {String} status - Is required
   * {String} idTable - Is required
   * {String} description
   * @returns {Object} A object with a message or the resource requested
   * @throws {Object} If something goes wrong returns an object with specifications
   * of the error
   */
  async function createTask(data) {
    try {
      const result = await axios.post("/api/tasks", data);

      return result.data.success;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Function that gets a specific task
   * @param {Number} id - Task's id
   * @param {Number} idTable - Table's id
   * @returns {Object} A object with a message or the resource requested
   * @throws {Object} If something goes wrong returns an object with specifications
   * of the error
   */
  async function getTaskByIdAndIdTable(id, idTable) {
    try {
      const result = await axios.get(`/api/tasks/${id}/tables/${idTable}`);

      return result.data.success;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Function that gets all tasks by status and table
   * @returns {Object} A object with a message or the resource requested
   * @throws {Object} If something goes wrong returns an object with specifications
   * of the error
   */
  async function getTasksByStatusAndIdTable(status, idTable) {
    try {
      const result = await axios.get(
        `/api/tasks/status/${status}/tables/${idTable}`
      );

      return result.data.resource;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Function that get count of tasks by status and table
   * @returns {Object} A object with a message or the resource requested
   * @throws {Object} If something goes wrong returns an object with specifications
   * of the error
   */
  async function getTasksCountByStatusAndIdTable(status, idTable) {
    try {
      const result = await axios.get(
        `/api/tasks/count/status/${status}/tables/${idTable}`
      );

      return result.data.resource;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Function that updates a specific task
   * @param {Number} id - Task's id
   * @param {Number} idTable - Table's id
   * @param {Object} data - Object with:
   * {String} title - Task's title
   * {String} order - Task's order
   * {String} description - Task's description
   * {String} status - Task's status
   * @returns {Object} A object with a message or the resource requested
   * @throws {Object} If something goes wrong returns an object with specifications
   * of the error
   */
  async function updateTaskByIdAndIdTable(id, idTable, data) {
    try {
      const result = await axios.put(
        `/api/tasks/${id}/tables/${idTable}`,
        data
      );

      return result.data.success;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Function that deletes a specific table
   * @param {Number} id - Task's id
   * @param {Number} idTable - Table's id
   * @returns {Object} A object with a message or the resource requested
   * @throws {Object} If something goes wrong returns an object with specifications
   * of the error
   */
  async function deleteTaskByIdAndIdTable(id, idTable) {
    try {
      const result = await axios.delete(`/api/tasks/${id}/tables/${idTable}`);

      return result.data.success;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Function that deletes all tasks of table by its status
   * @param {Number} status - Task's status
   * @param {Number} idTable - Table's id
   * @returns {Object} A object with a message or the resource requested
   * @throws {Object} If something goes wrong returns an object with specifications
   * of the error
   */
  async function deleteTasksByStatusAndIdTable(status, idTable) {
    try {
      const result = await axios.delete(
        `/api/tasks/status/${status}/tables/${idTable}`
      );

      return result.data.success;
    } catch (error) {
      throw error;
    }
  }

  return {
    createTask,
    deleteTaskByIdAndIdTable,
    deleteTasksByStatusAndIdTable,
    getTaskByIdAndIdTable,
    getTasksByStatusAndIdTable,
    getTasksCountByStatusAndIdTable,
    updateTaskByIdAndIdTable
  };
});
