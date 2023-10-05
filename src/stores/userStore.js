import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "../config/axios";

export const useUserStore = defineStore("userStore", () => {
  const loginError = ref(false)

  /**
   * Function that allows user to login
   * @param {Object} data - Object with:
   * {String} username - Is required
   * {String} password - Is required and must have
   * at least one lowercase letter, one uppercase letter,
   * one digit, one special character, and be 8 characters or longer
   *
   * @returns {Object} A object with a message or the resource requested
   * @throws {Object} If something goes wrong returns an object with specifications
   * of the error
   */
  async function login(data) {
    try {
      const result = await axios.post("/api/users/credentials", data);

      return result.data.resource;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Function that allows user to create a new account
   * @param {Object} data - Object with:
   * {String} email - Is required and must be a valid email
   * {String} password - Is required and must have
   * at least one lowercase letter, one uppercase letter,
   * one digit, one special character, and be 8 characters or longer
   * {String} username - Is required
   *
   * @returns {Object} A object with a message or the resource requested
   * @throws {Object} If something goes wrong returns an object with specifications
   * of the error
   */
  async function register(data) {
    try {
      const result = await axios.post("/api/users/", data);

      return result.data.resource;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Function that gets the current user
   * @returns {Object} A object with a message or the resource requested
   * @throws {Object} If something goes wrong returns an object with specifications
   * of the error
   */
  async function getActualUser() {
    try {
      const result = await axios.get("/api/users");

      return result.data.resource;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Function that sign out the current user
   * @returns {Object} A object with a message or the resource requested
   * @throws {Object} If something goes wrong returns an object with specifications
   * of the error
   */
  async function logout() {
    try {
      const result = await axios.delete("/api/users/credentials");

      return result.data.success;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Function that sends an email to allows to change the user's password
   * @param {Object} data - Object with:
   * {String} email - Is required and must be a valid email
   * @returns {Object} A object with a message or the resource requested
   * @throws {Object} If something goes wrong returns an object with specifications
   * of the error
   */
  async function forgotPassword(data) {
    try {
      const result = await axios.post("/api/users/changePassword", data);

      return result.data.success;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Function that changes the user's password with the new one
   * @param {String} token - Security token given by the email
   * @param {Object} data - Object with:
   * {String} password - Is required and must have
   * at least one lowercase letter, one uppercase letter,
   * one digit, one special character, and be 8 characters or longer
   * @returns {Object} A object with a message or the resource requested
   * @throws {Object} If something goes wrong returns an object with specifications
   * of the error
   */
  async function resetPassword(token, data) {
    try {
      const result = await axios.put(
        `/api/users/changePassword/${token}`,
        data
      );

      return result.data.success;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Function that updates user's information
   * @param {FormData} data - Form data with:
   * Attributes allow to change:
   * {String} email. Must be valid and not be stored in database
   * {String} username. Must not be stored in database
   * {String} theme. Must be 'light' or 'dark'
   * {String} toDoColor
   * {String} doingColor
   * {String} doneColor
   * {File} image. This will be interpreted as wanting to change the profile picture
   *
   * @returns {Object} A object with a message or the resource requested
   * @throws {Object} If something goes wrong returns an object with specifications
   * of the error
   */
  async function updateActualUser(data) {
    try {
      const result = await axios.put("/api/users", data);

      return result.data.success;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Function that deletes the current user's account
   * @returns {Object} A object with a message or the resource requested
   * @throws {Object} If something goes wrong returns an object with specifications
   * of the error
   */
  async function deleteUser() {
    try {
      const result = await axios.delete("/api/users");

      return result.data.success;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Function that send feedback
   * @param {Object} data - Object with:
   * {String} comment - Is required
   * @returns {Object} A object with a message or the resource requested
   * @throws {Object} If something goes wrong returns an object with specifications
   * of the error
   */
  async function sendFeedback(data) {
    try {
      const result = await axios.post("/api/users/feedback", data);

      return result.data.success;
    } catch (error) {
      throw error;
    }
  }

  //Exports
  return {
    deleteUser,
    forgotPassword,
    getActualUser,
    login,
    logout,
    register,
    resetPassword,
    sendFeedback,
    updateActualUser,
    loginError
  };
});
