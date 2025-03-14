
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

document
  .getElementById("userForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    try {
      const response = await axios.post(
        "http://localhost:5500/api/donar/regisiter",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Success:", response.data);
      localStorage.setItem("selectedDonorId", response.data.data._id);

      window.location.href = "profileDonor.html";
    } catch (error) {
      if (error.response) {
        console.error(
          "Failed to send data:",
          error.response.status,
          error.response.data
        );
        document.getElementById("masage").innerHTML =
          error.response.data.status.message;
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  });

//

document
  .getElementById("Loginform")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    var value2;
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
      if (key === "email") {
        value2 = data[key];
      }
    });

    try {
      const response = await axios.post(
        "http://localhost:5500/donor/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Success:", response.data);
      fetch("http://localhost:5500/donor?page=1")
        .then((response) => {
          if (!response.ok) {
            throw new Error("حدث خطأ أثناء جلب البيانات");
          }
          return response.json();
        })
        .then((data) => {
          data.data.forEach((donor) => {
            if (donor.email == value2) {
              console.log("success");
              localStorage.setItem("selectedDonorId", donor._id);
            }
          });
        })
        .catch((error) => console.error("Error fetching data:", error));
      window.location.href = "profileDonor.html";
    } catch (error) {
      if (error.response) {
        console.error(
          "Failed to send data:",
          error.response.status,
          error.response.data
        );
        document.getElementById("masage2").innerHTML =
          error.response.data.status.message;
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  });
