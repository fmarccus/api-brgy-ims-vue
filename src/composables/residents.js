import axios from "axios";
import { ref } from "vue";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

export default function useResidents() {
  axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/residents/";
  const errors = ref({});
  const router = useRouter();
  const residents = ref({});
  const resident = ref({});

  const address = ref({});

  const indexResidents = async (id) => {
    try {
      const response = await axios.get(id + "/residents");
      residents.value = response.data.residents;
      address.value = response.data.address;
    } catch (error) {}
  };

  const editResident = async (id) => {
    try {
      const response = await axios.get("edit/" + id);
      resident.value = response.data.data;
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

  const updateResident = async (id) => {
    try {
      const response = await axios.post("update/" + id, resident.value);
      if (response.status == 200) {
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

  async function deleteResident(id, householdId) {
    try {
      const result = await Swal.fire({
        title: "Delete this resident?",
        showDenyButton: true,
        showConfirmButton: false,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Yes, delete this resident`,
      });
      if (result.isDenied) {
        const response = await axios.delete(
          "http://127.0.0.1:8000/api/v1/residents/destroy/" + id
        );
        if (response.status === 200) {
          await indexResidents(householdId);
          await Swal.fire({
            position: "center",
            icon: "success",
            title: response.data.msg,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    } catch (error) {
      await Swal.fire({
        position: "center",
        icon: "error",
        title: error.response.data.msg,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  return {
    indexResidents,
    residents,
    resident,
    address,
    storeResident,
    errors,
    editResident,
    deleteResident,
    updateResident,
  };
}
