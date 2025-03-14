document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:5500/donor?page=1")
    .then((response) => {
      if (!response.ok) {
        throw new Error("حدث خطأ أثناء جلب البيانات");
      }
      return response.json();
    })
    .then((data) => {
      document
        .getElementById("departement")
        .addEventListener("change", function () {
          let selectedValue = this.value;
          let content = ""; // إعادة تعيين المحتوى مع كل تغيير

          if (selectedValue === "O+") {
            data.data.forEach((donor, index) => {
              if (donor.bloodType === "O+") {
                content += `
                <tr>
                  <td>${index + 1}</td>
                  <td>${donor.name}</td>
                  <td>${donor.bloodType}</td>
                  <td>
                    <a onClick="get('${donor._id}')">
                      <button class="btn btn-sm btn-primary" onClick="window.location.href = 'profileDonor.html'">
                        عرض التفاصيل
                      </button>
                    </a>
                  </td>
                </tr>
              `;
              }
            });
          } else if (selectedValue === "O-") {
            data.data.forEach((donor, index) => {
              if (donor.bloodType === "O-") {
                content += `
                <tr>
                  <td>${index + 1}</td>
                  <td>${donor.name}</td>
                  <td>${donor.bloodType}</td>
                  <td>
                    <a onClick="get('${donor._id}')">
                      <button class="btn btn-sm btn-primary" onClick="window.location.href = 'profileDonor.html'">
                        عرض التفاصيل
                      </button>
                    </a>
                  </td>
                </tr>
              `;
              }
            });
          } else if (selectedValue === "A-") {
            data.data.forEach((donor, index) => {
              if (donor.bloodType === "A-") {
                content += `
                <tr>
                  <td>${index + 1}</td>
                  <td>${donor.name}</td>
                  <td>${donor.bloodType}</td>
                  <td>
                    <a onClick="get('${donor._id}')">
                      <button class="btn btn-sm btn-primary" onClick="window.location.href = 'profileDonor.html'">
                        عرض التفاصيل
                      </button>
                    </a>
                  </td>
                </tr>
              `;
              }
            });
          } else if (selectedValue === "A+") {
            data.data.forEach((donor, index) => {
              if (donor.bloodType === "A+") {
                content += `
                <tr>
                  <td>${index + 1}</td>
                  <td>${donor.name}</td>
                  <td>${donor.bloodType}</td>
                  <td>
                    <a onClick="get('${donor._id}')">
                      <button class="btn btn-sm btn-primary" onClick="window.location.href = 'profileDonor.html'">
                        عرض التفاصيل
                      </button>
                    </a>
                  </td>
                </tr>
              `;
              }
            });
          } else if (selectedValue === "AB+") {
            data.data.forEach((donor, index) => {
              if (donor.bloodType === "AB+") {
                content += `
                <tr>
                  <td>${index + 1}</td>
                  <td>${donor.name}</td>
                  <td>${donor.bloodType}</td>
                  <td>
                    <a onClick="get('${donor._id}')">
                      <button class="btn btn-sm btn-primary" onClick="window.location.href = 'profileDonor.html'">
                        عرض التفاصيل
                      </button>
                    </a>
                  </td>
                </tr>
              `;
              }
            });
          } else if (selectedValue === "AB-") {
            data.data.forEach((donor, index) => {
              if (donor.bloodType === "AB-") {
                content += `
                <tr>
                  <td>${index + 1}</td>
                  <td>${donor.name}</td>
                  <td>${donor.bloodType}</td>
                  <td>
                    <a onClick="get('${donor._id}')">
                      <button class="btn btn-sm btn-primary" onClick="window.location.href = 'profileDonor.html'">
                        عرض التفاصيل
                      </button>
                    </a>
                  </td>
                </tr>
              `;
              }
            });
          } else if (selectedValue === "B-") {
            data.data.forEach((donor, index) => {
              if (donor.bloodType === "B-") {
                content += `
                <tr>
                  <td>${index + 1}</td>
                  <td>${donor.name}</td>
                  <td>${donor.bloodType}</td>
                  <td>
                    <a onClick="get('${donor._id}')">
                      <button class="btn btn-sm btn-primary" onClick="window.location.href = 'profileDonor.html'">
                        عرض التفاصيل
                      </button>
                    </a>
                  </td>
                </tr>
              `;
              }
            });
          } else if (selectedValue === "B+") {
            data.data.forEach((donor, index) => {
              if (donor.bloodType === "B+") {
                content += `
                <tr>
                  <td>${index + 1}</td>
                  <td>${donor.name}</td>
                  <td>${donor.bloodType}</td>
                  <td>
                    <a onClick="get('${donor._id}')">
                      <button class="btn btn-sm btn-primary" onClick="window.location.href = 'profileDonor.html'">
                        عرض التفاصيل
                      </button>
                    </a>
                  </td>
                </tr>
              `;
              }
            });
          } else {
            data.data.forEach((donor, index) => {
              content += `
                  <tr>
                    <td>${index + 1}</td>
                    <td>${donor.name}</td>
                    <td>${donor.bloodType}</td>
                    <td>
                      <a onClick="get('${donor._id}')">
                        <button class="btn btn-sm btn-primary" onClick="window.location.href = 'profileDonor.html'">
                          عرض التفاصيل
                        </button>
                      </a>
                    </td>
                  </tr>
                `;
            });
          }
          document.getElementById("donorTableBody").innerHTML = content;
        });
    })
    .catch((error) => console.error("Error fetching data:", error));
});
