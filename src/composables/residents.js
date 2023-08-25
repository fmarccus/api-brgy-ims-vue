import axios from "axios";
import { ref } from "vue";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

export default function useResidents() {
  axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/residents/";
  const errors = ref({});
  const router = useRouter();
  const residents = ref({});
  const address = ref({});

  const indexResidents = async (id) => {
    try {
      const response = await axios.get(id + "/residents");
      residents.value = response.data.residents;
      address.value = response.data.address;
      console.log(response.data.house_number);
    } catch (error) {}
  };

  const storeResident = async (data) => {
    try {
      const response = await axios.post("store", data);
      if (response.status == 201) {
        await router.push({ name: "ResidentsIndexView" });
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
    indexResidents,
    residents,
    address,
    storeResident,
    errors,
  };
}
