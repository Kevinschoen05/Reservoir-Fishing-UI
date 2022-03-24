import axios from "axios";
const url = "https://reservoir-fishing.herokuapp.com/api/record";

export default class API {
  //add record
  static async addRecord(record) {
    const res = await axios.post(url, record);
    return res.data;
  }

  //get all the records
  static async getAllRecords() {
    const res = await axios.get(url);
    return res.data;
  }

  //get records by reservoir
  static async getRecordsByReservoir(reservoir) {
    const res = await axios.get(`${url}/${reservoir}`);
    return res.data;
  }

  //get records for reservoir by date
  static async getRecordsByDate(reservoir, date) {
    const res = await axios.get(`${url}/${reservoir}/${date}`);
    return res.data;
  }

  static async getWeather(startDateTime, endDateTime) {
    const res = await axios.get(
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/history",
      {
        params: {
          aggregateHours: "24",
          startDateTime: startDateTime,
          endDateTime: endDateTime,
          unitGroup: "us",
          contentType: "json",
          location: "Yorktown Heights, NY",
          key: process.env.VUE_APP_WEATHER_API,
        },
      }
    );
    return res.data;
  }

  //get records by ID
  static async getRecordsByID(id) {
    const res = await axios.post(`${url}/${id}`);
    return res.data;
  }
  //update record
  static async updateRecord(id, record) {
    const res = await axios.patch(`${url}/${id}`, record);
    return res.data;
  }
  //delete record
  static async deleteRecord(id, record) {
    const res = await axios.delete(`${url}/${id}`, record);
    return res.data;
  }
}
