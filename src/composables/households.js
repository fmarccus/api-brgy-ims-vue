import { ref } from "vue";
import useStreets from "./streets";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
const { getHouseholds } = useStreets();
export default function useHouseholds() {
  axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/households/";
  const router = useRouter();
  const household = ref({});
  const errors = ref({});

  const storeHousehold = async (data) => {
    try {
      const response = await axios.post("store", data);
      console.log(response.status);
      if (response.status === 201) {
        await router.push({ name: "StreetsHouseholdsView" });
        await Swal.fire({
          position: "center",
          icon: "success",
          title: response.data.msg,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      if (error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    }
  };

  const editHousehold = async (id) => {
    try {
      const response = await axios.get("edit/" + id);
      household.value = await response.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateHousehold = async (id) => {
    try {
      const response = await axios.post("update/" + id, household.value);
      if (response.status === 200) {
        await router.push({ name: "StreetsHouseholdsView" });
        await Swal.fire({
          position: "center",
          icon: "success",
          title: response.data.msg,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      if (error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    }
  };

  return {
    storeHousehold,
    editHousehold,
    household,
    updateHousehold,
    errors,
  };
}
