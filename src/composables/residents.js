import axios from "axios";
import { ref } from "vue";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
export default function useResidents() {
  const errors = ref({});
  const router = useRouter();
  const storeResident = async (data) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/residents/store",
        data
      );
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
    storeResident,
    errors,
  };
}
