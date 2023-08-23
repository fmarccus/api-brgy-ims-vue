import axios from "axios";
export default function useResidents() {
  const storeResident = async (data) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/residents/store",
        data
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    storeResident,
  };
}
