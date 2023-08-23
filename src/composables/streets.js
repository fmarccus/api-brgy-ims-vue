import { ref } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

export default function useStreets() {
  axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/streets/";
  const router = useRouter();

  const streets = ref([]);
  const street = ref([]);
  const households = ref([]);
  const errors = ref({});

  let page = ref(1);
  let streetsCount = ref(0);
  let pageCount = ref(null);

  let pageHouseholds = ref(1);
  let householdsCount = ref(0);
  let pageCountHouseholds = ref(null);
  let streetName = ref(null);

  const getStreets = async () => {
    try {
      const response = await axios.get("index?page=" + page.value);
      pageCount.value = response.data.page_count;
      streets.value = response.data.streets.data;
      streetsCount.value = response.data.streets_count;
    } catch (error) {
      console.log(error);
    }
  };

  const storeStreet = async (data) => {
    try {
      const response = await axios.post("store", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        await router.push({ name: "StreetsIndexView" });
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

  const editStreet = async (id) => {
    try {
      await router.push({ name: "StreetsEditView", params: { id: id } });
    } catch (error) {
      console.log(error);
    }
  };

  const getStreet = async (id) => {
    try {
      const response = await axios.get("edit/" + id);
      street.value = await response.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateStreet = async (id) => {
    try {
      const response = await axios.post("update/" + id, street.value, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        await router.push({ name: "StreetsIndexView" });
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

  const deleteStreet = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Delete this street?",
        showDenyButton: true,
        showConfirmButton: false,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Yes, delete this street`,
      });
      if (result.isDenied) {
        const response = await axios.delete("destroy/" + id);
        if (response.status === 200) {
          await getStreets();
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
  };

  const getHouseholds = async (id) => {
    const response = await axios.get(
      id + "/households?page=" + pageHouseholds.value
    );
    households.value = await response.data.households;
    pageCountHouseholds.value = response.data.page_count;
    householdsCount.value = response.data.households_count;
    streetName.value = response.data.street_name;
  };

  return {
    streets,
    street,
    getStreets,
    page,
    pageCount,
    streetsCount,
    storeStreet,
    editStreet,
    getStreet,
    updateStreet,
    deleteStreet,
    errors,
    getHouseholds,
    households,
    pageHouseholds,
    pageCountHouseholds,
    householdsCount,
    streetName,
  };
}
