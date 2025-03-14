
// document.addEventListener("DOMContentLoaded", async function () {
//     const donorsContainer = document.getElementById("donorsContainer"); // مكان عرض المتبرعين
//     const searchForm = document.querySelector(".search-form");
//     const bloodTypeSelect = document.getElementById("departement");

//     async function fetchDonors(bloodType = "") {
//         try {
//             let url = "http://localhost:6500/api/donar/getAvailableDonors?page=1&limit=6";
//             if (bloodType) {
//                 url += `&bloodType=${bloodType}`;
//             }

//             const response = await fetch(url, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error("فشل في جلب البيانات من السيرفر");
//             }

//             const data = await response.json();
//             console.log("📥 بيانات المتبرعين:", data);

//             // تنظيف المحتوى قبل إعادة تحميل المتبرعين
//             donorsContainer.innerHTML = "";

//             if (data.data.donors.length === 0) {
//                 donorsContainer.innerHTML = "<p class='text-center'>لا يوجد متبرعين متاحين.</p>";
//                 return;
//             }

//             // عرض المتبرعين في الواجهة
//             data.data.donors.forEach((donor) => {
//                 const donorCard = `
//                     <div class="col-sm-4 py-3">
//                         <div class="card-doctor wow zoomIn">
//                             <div class="header">
//                                 <img src="../assets/img/blog/blog_1.jpg" alt="">
//                                 <div class="meta">
//                                     <p class="text-xl mb-0">${donor.name || "متبرع مجهول"}</p>
//                                 </div>
//                             </div>
//                             <div class="body" style="padding: 15px;">
//                                 <div class="content hlite">
//                                     <div class="icon" style="margin-right: 10px;">
//                                         <img src="../assets/icon/water.svg" style="width: 20px; height: 20px;">
//                                     </div>
//                                     <div class="data">
//                                         <p class="post-title">Blood Type: ${donor.bloodType}</p>
//                                     </div>
//                                 </div>
//                                 <div class="content hlite">
//                                     <div class="icon" style="margin-right: 10px;">
//                                         <img src="../assets/icon/location.svg" style="width: 20px; height: 20px;">
//                                     </div>
//                                     <div class="data">
//                                         <p class="post-title">Location: ${donor.address || "غير متوفر"}</p>
//                                     </div>
//                                 </div>
//                                 <div class="content hlite">
//                                     <div class="icon" style="margin-right: 10px;">
//                                         <img src="../assets/icon/call.svg" style="width: 20px; height: 20px;">
//                                     </div>
//                                     <div class="data">
//                                         <p class="post-title">Phone: ${donor.phone || "غير متوفر"}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 `;
//                 donorsContainer.innerHTML += donorCard;
//             });

//         } catch (error) {
//             console.error("❌ خطأ في جلب المتبرعين:", error);
//         }
//     }

//     // تحميل المتبرعين عند فتح الصفحة
//     fetchDonors();

//     // البحث عن المتبرعين عند تغيير فصيلة الدم
//     searchForm.addEventListener("submit", function (event) {
//         event.preventDefault();
//         const selectedBloodType = bloodTypeSelect.value;
//         fetchDonors(selectedBloodType);
//     });
// });





/////////////////////////////////////////////////////


// تحديث كود الجافا سكريبت لتضمين البحث والتحديث التلقائي للصفحات
// document.addEventListener("DOMContentLoaded", async function () {
//     const donorsContainer = document.getElementById("donorsContainer");
//     const searchForm = document.querySelector(".search-form");
//     const bloodTypeSelect = document.getElementById("departement");
//     const paginationContainer = document.querySelector(".pagination");

//     async function fetchDonors(bloodType = "", page = 1) {
//         try {
//             let url = `http://localhost:6500/api/donar/getAvailableDonors?page=${page}&limit=6`;
//             if (bloodType) {
//                 url += `&bloodType=${bloodType}`;
//             }

//             const response = await fetch(url, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error("فشل في جلب البيانات من السيرفر");
//             }

//             const data = await response.json();
//             console.log("📥 بيانات المتبرعين:", data);

//             donorsContainer.innerHTML = "";
//             paginationContainer.innerHTML = "";

//             if (data.data.donors.length === 0) {
//                 donorsContainer.innerHTML = "<p class='text-center'>لا يوجد متبرعين متاحين.</p>";
//                 return;
//             }

//             data.data.donors.forEach((donor) => {
//                 const donorCard = `
//                     <div class="col-sm-4 py-3">
//                         <div class="card-doctor wow zoomIn">
//                             <div class="header">
//                                 <img src="../assets/img/blog/blog_1.jpg" alt="">
//                                 <div class="meta">
//                                     <p class="text-xl mb-0">${donor.name || "متبرع مجهول"}</p>
//                                 </div>
//                             </div>
//                             <div class="body" style="padding: 15px;">
//                                 <p class="post-title">Blood Type: ${donor.bloodType}</p>
//                                 <p class="post-title">Location: ${donor.address || "غير متوفر"}</p>
//                                 <p class="post-title">Phone: ${donor.phone || "غير متوفر"}</p>
//                             </div>
//                         </div>
//                     </div>
//                 `;
//                 donorsContainer.innerHTML += donorCard;
//             });

//             for (let i = 1; i <= data.data.totalPages; i++) {
//                 paginationContainer.innerHTML += `<li class="page-item ${i === data.data.currentPage ? 'active' : ''}"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
//             }

//         } catch (error) {
//             console.error("❌ خطأ في جلب المتبرعين:", error);
//         }
//     }

//     fetchDonors();

//     searchForm.addEventListener("submit", function (event) {
//         event.preventDefault();
//         fetchDonors(bloodTypeSelect.value);
//     });

//     paginationContainer.addEventListener("click", function (event) {
//         if (event.target.tagName === "A") {
//             event.preventDefault();
//             fetchDonors(bloodTypeSelect.value, parseInt(event.target.dataset.page));
//         }
//     });
// });



/////////////////////////////////////////



// تحديث كود الجافا سكريبت لتضمين البحث والتحديث التلقائي للصفحات
// document.addEventListener("DOMContentLoaded", async function () {
//     const donorsContainer = document.getElementById("donorsContainer");
//     const searchForm = document.querySelector(".search-form");
//     const bloodTypeSelect = document.getElementById("departement");
//     const paginationContainer = document.querySelector(".pagination");

//     // إضافة خيار "جميع الفصائل"
//     bloodTypeSelect.innerHTML = '<option value="all">All blood</option>' + bloodTypeSelect.innerHTML;

//     async function fetchDonors(bloodType = "all", page = 1) {
//         try {
//             let url = `http://localhost:6500/api/donar/getAvailableDonors?page=${page}&limit=6`;
//             if (bloodType && bloodType !== "all") {
//                 url += `&bloodType=${bloodType}`;
//             }

//             const response = await fetch(url, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error("فشل في جلب البيانات من السيرفر");
//             }

//             const data = await response.json();
//             console.log("📥 بيانات المتبرعين:", data);

//             donorsContainer.innerHTML = "";
//             paginationContainer.innerHTML = "";

//             if (data.data.donors.length === 0) {
//                 donorsContainer.innerHTML = "<p class='text-center'>لا يوجد متبرعين متاحين.</p>";
//                 return;
//             }

//             data.data.donors.forEach((donor) => {
//                 const donorCard = `
//                     <div class="col-sm-4 py-3">
//                         <div class="card-doctor wow zoomIn">
//                             <div class="header">
//                                 <img src="../assets/img/blog/blog_1.jpg" alt="">
//                                 <div class="meta">
//                                     <p class="text-xl mb-0">${donor.name || "متبرع مجهول"}</p>
//                                 </div>
//                             </div>
//                             <div class="body" style="padding: 15px;">
//                                 <p class="post-title">Blood Type: ${donor.bloodType}</p>
//                                 <p class="post-title">Location: ${donor.address || "غير متوفر"}</p>
//                                 <p class="post-title">Phone: ${donor.phone || "غير متوفر"}</p>
//                             </div>
//                         </div>
//                     </div>
//                 `;
//                 donorsContainer.innerHTML += donorCard;
//             });

//             for (let i = 1; i <= data.data.totalPages; i++) {
//                 paginationContainer.innerHTML += `<li class="page-item ${i === data.data.currentPage ? 'active' : ''}"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
//             }

//         } catch (error) {
//             console.error("❌ خطأ في جلب المتبرعين:", error);
//         }
//     }

//     fetchDonors();

//     searchForm.addEventListener("submit", function (event) {
//         event.preventDefault();
//         fetchDonors(bloodTypeSelect.value);
//     });

//     paginationContainer.addEventListener("click", function (event) {
//         if (event.target.tagName === "A") {
//             event.preventDefault();
//             fetchDonors(bloodTypeSelect.value, parseInt(event.target.dataset.page));
//         }
//     });
// });





////////////////////////


// تحديث كود الجافا سكريبت لتضمين البحث والتحديث التلقائي للصفحات
// document.addEventListener("DOMContentLoaded", async function () {
//     const donorsContainer = document.getElementById("donorsContainer");
//     const searchForm = document.querySelector(".search-form");
//     const bloodTypeSelect = document.getElementById("departement");
//     const paginationContainer = document.querySelector(".pagination");

//     // إضافة خيار "جميع الفصائل"
//     bloodTypeSelect.innerHTML = '<option value="all">جميع الفصائل</option>' + bloodTypeSelect.innerHTML;

//     async function fetchDonors(bloodType = "all", page = 1) {
//         try {
//             let url = `http://localhost:6500/api/donar/getAvailableDonors?page=${page}&limit=6`;
//             if (bloodType && bloodType !== "all") {
//                 url += `&bloodType=${bloodType}`;
//             }

//             const response = await fetch(url, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error("فشل في جلب البيانات من السيرفر");
//             }

//             const data = await response.json();
//             console.log("📥 بيانات المتبرعين:", data);

//             donorsContainer.innerHTML = "";
//             paginationContainer.innerHTML = "";

//             if (data.data.donors.length === 0) {
//                 donorsContainer.innerHTML = "<p class='text-center'>لا يوجد متبرعين متاحين.</p>";
//                 return;
//             }

//             data.data.donors.forEach((donor) => {
//                 const donorCard = `
//                     <div class="col-sm-4 py-3">
//                         <div class="card-doctor wow zoomIn">
//                             <div class="header">
//                                 <img src="../assets/img/blog/blog_1.jpg" alt="">
//                                 <div class="meta">
//                                     <p class="text-xl mb-0">${donor.name || "متبرع مجهول"}</p>
//                                 </div>
//                             </div>
//                             <div class="body" style="padding: 15px;">
//                                 <p class="post-title">Blood Type: ${donor.bloodType}</p>
//                                 <p class="post-title">Location: ${donor.address || "غير متوفر"}</p>
//                                 <p class="post-title">Phone: ${donor.phone || "غير متوفر"}</p>
//                             </div>
//                         </div>
//                     </div>
//                 `;
//                 donorsContainer.innerHTML += donorCard;
//             });

//             for (let i = 1; i <= data.data.totalPages; i++) {
//                 paginationContainer.innerHTML += `<li class="page-item ${i === data.data.currentPage ? 'active' : ''}"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
//             }

//         } catch (error) {
//             console.error("❌ خطأ في جلب المتبرعين:", error);
//         }
//     }

//     fetchDonors();

//     searchForm.addEventListener("submit", function (event) {
//         event.preventDefault();
//         fetchDonors(bloodTypeSelect.value);
//     });

//     paginationContainer.addEventListener("click", function (event) {
//         if (event.target.tagName === "A") {
//             event.preventDefault();
//             fetchDonors(bloodTypeSelect.value, parseInt(event.target.dataset.page));
//         }
//     });
// });



///////////////////

// تحديث كود الجافا سكريبت لتضمين البحث والتحديث التلقائي للصفحات
// document.addEventListener("DOMContentLoaded", async function () {
//     const donorsContainer = document.getElementById("donorsContainer");
//     const searchForm = document.querySelector(".search-form");
//     const bloodTypeSelect = document.getElementById("departement");
//     const paginationContainer = document.querySelector(".pagination");

//     // إضافة خيار "جميع الفصائل"
//     bloodTypeSelect.innerHTML = '<option value="all">جميع الفصائل</option>' + bloodTypeSelect.innerHTML;

//     async function fetchDonors(bloodType = "all", page = 1) {
//         try {
//             let url = `http://localhost:6500/api/donar/getAvailableDonors?page=${page}&limit=6`;
//             if (bloodType && bloodType !== "all") {
//                 url += `&bloodType=${bloodType}`;
//             }

//             const response = await fetch(url, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error("فشل في جلب البيانات من السيرفر");
//             }

//             const data = await response.json();
//             console.log("📥 بيانات المتبرعين:", data);

//             donorsContainer.innerHTML = "";
//             paginationContainer.innerHTML = "";

//             if (data.data.donors.length === 0) {
//                 donorsContainer.innerHTML = `
//                     <div class="alert alert-warning text-center" role="alert">
//                         <h4 class="alert-heading">عذرًا!</h4>
//                         <p>لا يوجد متبرعين متاحين لهذه الفصيلة حاليًا.</p>
//                         <hr>
//                         <p class="mb-0">حاول مرة أخرى لاحقًا أو اختر فصيلة دم أخرى.</p>
//                     </div>
//                 `;
//                 return;
//             }

//             data.data.donors.forEach((donor) => {
//                 const donorCard = `
//                     <div class="col-sm-4 py-3">
//                         <div class="card-doctor wow zoomIn">
//                             <div class="header">
//                                 <img src="../assets/img/blog/blog_1.jpg" alt="">
//                                 <div class="meta">
//                                     <p class="text-xl mb-0">${donor.name || "متبرع مجهول"}</p>
//                                 </div>
//                             </div>
//                             <div class="body" style="padding: 15px;">
//                                 <p class="post-title">Blood Type: ${donor.bloodType}</p>
//                                 <p class="post-title">Location: ${donor.address || "غير متوفر"}</p>
//                                 <p class="post-title">Phone: ${donor.phone || "غير متوفر"}</p>
//                             </div>
//                         </div>
//                     </div>
//                 `;
//                 donorsContainer.innerHTML += donorCard;
//             });

//             for (let i = 1; i <= data.data.totalPages; i++) {
//                 paginationContainer.innerHTML += `<li class="page-item ${i === data.data.currentPage ? 'active' : ''}"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
//             }

//         } catch (error) {
//             console.error("❌ خطأ في جلب المتبرعين:", error);
//         }
//     }

//     fetchDonors();

//     searchForm.addEventListener("submit", function (event) {
//         event.preventDefault();
//         fetchDonors(bloodTypeSelect.value);
//     });

//     paginationContainer.addEventListener("click", function (event) {
//         if (event.target.tagName === "A") {
//             event.preventDefault();
//             fetchDonors(bloodTypeSelect.value, parseInt(event.target.dataset.page));
//         }
//     });
// });
document.addEventListener("DOMContentLoaded", async function () {
    const donorsContainer = document.getElementById("donorsContainer");
    const searchForm = document.querySelector(".search-form");
    const bloodTypeSelect = document.getElementById("departement");
    const paginationContainer = document.querySelector(".pagination");

    // إضافة خيار "جميع الفصائل"
    bloodTypeSelect.innerHTML = '<option value="all">جميع الفصائل</option>' + bloodTypeSelect.innerHTML;

    async function fetchDonors(bloodType = "all", page = 1) {
        try {
            let url = `http://localhost:6500/api/donar/getAvailableDonors?page=${page}&limit=6`;
            if (bloodType && bloodType !== "all") {
                url += `&bloodType=${bloodType}`;
            }

            console.log("🔍 طلب البيانات من:", url);

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

             // ✅ التحقق من حالة الاستجابة قبل محاولة استخدام `data`
        if (!response.ok) {
            donorsContainer.innerHTML = `
            <div class="d-flex justify-content-center" style="margin-left: 367px;">
    <div class="card text-center shadow-lg p-4">
        <div class="card-body">
            <h3 class="text-danger fw-bold">
                <i class="fas fa-exclamation-circle"></i> نأسف جدًا!
            </h3>
            <p class="text-dark fw-semibold fs-4">🚫 لا يوجد متبرعون متاحون لهذه الفصيلة حاليًا.</p>
            <p class="text-secondary">حاول مرة أخرى لاحقًا أو جرّب البحث بفصيلة دم أخرى.</p>
        </div>  
    </div>
</div>

            `;
            throw new Error("❌ فشل في جلب البيانات من السيرفر");
        }

            const data = await response.json();
            console.log("📥 استجابة السيرفر:", data);

            // تنظيف الحاويات
            donorsContainer.innerHTML = "";
            paginationContainer.innerHTML = "";

            // التحقق مما إذا كان لا يوجد متبرعين
            if (!data || !data.status || data.status.status === false || !data.data || data.data.length === 0) {
                console.warn("⚠️ لا يوجد متبرعين متاحين.");
                donorsContainer.innerHTML = `
                    <div class="card text-center shadow-lg p-4">
                        <div class="card-body">
                            <h4 class="text-danger"><i class="fas fa-exclamation-triangle"></i> عذرًا!</h4>
                            <p class="text-muted">${data.status?.message || "لا يوجد متبرعين متاحين حاليًا."}</p>
                            <p>حاول مرة أخرى لاحقًا أو اختر فصيلة دم أخرى.</p>
                            <button class="btn btn-primary mt-2" onclick="fetchDonors('all')">
                                🔄 إعادة البحث
                            </button>
                        </div>
                    </div>
                `;
                return;
            }

            // عرض المتبرعين إذا كان هناك بيانات
            if (Array.isArray(data.data.donors)) {
                data.data.donors.forEach((donor) => {
                    const donorCard = `
                        <div class="col-sm-4 py-3">
                            <div class="card-doctor wow zoomIn">
                                <div class="header">
                                    <img src="../assets/img/blog/blog_1.jpg" alt="">
                                    <div class="meta">
                                        <p class="text-xl mb-0">${donor.name || "متبرع مجهول"}</p>
                                    </div>
                                </div>
                                <div class="body" style="padding: 15px;">
                                    <p class="post-title">Blood Type: ${donor.bloodType}</p>
                                    <p class="post-title">Location: ${donor.address || "غير متوفر"}</p>
                                    <p class="post-title">Phone: ${donor.phone || "غير متوفر"}</p>
                                </div>
                            </div>
                        </div>
                    `;
                    donorsContainer.innerHTML += donorCard;
                });
            } else {
                console.warn("⚠️ تنسيق البيانات غير متوقع، لم يتم العثور على متبرعين.");
            }

            // إنشاء صفحات الترقيم
            if (data.data.totalPages) {
                for (let i = 1; i <= data.data.totalPages; i++) {
                    paginationContainer.innerHTML += `<li class="page-item ${i === data.data.currentPage ? 'active' : ''}"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
                }
            }

        } catch (error) {
            console.error("❌ خطأ في جلب المتبرعين:", error);
        }
    }

    fetchDonors();

    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();
        fetchDonors(bloodTypeSelect.value);
    });

    paginationContainer.addEventListener("click", function (event) {
        if (event.target.tagName === "A") {
            event.preventDefault();
            fetchDonors(bloodTypeSelect.value, parseInt(event.target.dataset.page));
        }
    });
});
