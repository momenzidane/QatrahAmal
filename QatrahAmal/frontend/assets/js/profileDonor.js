// document.addEventListener("DOMContentLoaded", async function () {
//     const token = localStorage.getItem("token");
//     const donorId = localStorage.getItem("selectedDonorId");

//     console.log("🔍 Token:", token);
//     console.log("🔍 Selected Donor ID:", donorId);

//     if (!token) {
//         Swal.fire({
//             title: "غير مصرح!",
//             text: "يجب تسجيل الدخول للوصول إلى الصفحة.",
//             icon: "warning",
//             confirmButtonText: "تسجيل الدخول"
//         }).then(() => {
//             window.location.href = "index.html"; 
//         });
//         return;
//     }

//     try {
//         const response = await fetch("http://localhost:6500/api/donar/me", {
//             method: "GET",
//             headers: {
//                 "Authorization": `Bearer ${token}`,
//                 "Content-Type": "application/json",
//             },
//         });

//         console.log("🔍 Fetch Response Status:", response.status);
        
//         if (!response.ok) {
//             throw new Error(`فشل في تحميل بيانات المتبرع! Status: ${response.status}`);
//         }

//         const donor = await response.json();
//         console.log("✅ بيانات المتبرع:", donor);

//         if (!donor.data) {
//             throw new Error("❌ البيانات غير موجودة!");
//         }

//         document.getElementById("name").innerText = donor.data.name || "غير متوفر";
//         document.getElementById("bloodtype").innerText = donor.data.bloodType || "غير متوفر";
//         document.getElementById("Address").innerText = donor.data.address || "غير متوفر";
//         document.getElementById("phone").innerText = donor.data.phone || "غير متوفر";
//         document.getElementById("age").innerText = donor.data.age || "غير متوفر";

//     } catch (error) {
//         console.error("❌ خطأ أثناء جلب بيانات المتبرع:", error);
//         Swal.fire({
//             title: "خطأ!",
//             text: error.message || "لم نتمكن من تحميل البيانات.",
//             icon: "error",
//             confirmButtonText: "إعادة المحاولة"
//         });
//     }
// });


//  // تسجيل الخروج ومسح التوكن
//  document.getElementById("logoutButton").addEventListener("click", function () {
//     localStorage.removeItem("token");
//     localStorage.removeItem("selectedDonorId");
//     window.location.href = "index.html";
// });











document.addEventListener("DOMContentLoaded", async function () {
    const token = localStorage.getItem("token");
    const donorId = localStorage.getItem("selectedDonorId");

    if (!token) {
        Swal.fire({
            title: "غير مصرح!",
            text: "يجب تسجيل الدخول للوصول إلى الصفحة.",
            icon: "warning",
            confirmButtonText: "تسجيل الدخول"
        }).then(() => {
            window.location.href = "index.html"; 
        });
        return;
    }

    try {
        const response = await fetch("http://localhost:6500/api/donar/me", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`فشل في تحميل بيانات المتبرع! Status: ${response.status}`);
        }

        const donor = await response.json();

        document.getElementById("name").innerText = donor.data.name || "غير متوفر";
        document.getElementById("bloodtype").innerText = donor.data.bloodType || "غير متوفر";
        document.getElementById("Address").innerText = donor.data.address || "غير متوفر";
        document.getElementById("phone").innerText = donor.data.phone || "غير متوفر";
        document.getElementById("age").innerText = donor.data.age || "غير متوفر";
        document.getElementById("availability").innerText = donor.data.isAvailable ? "متاح" : "غير متاح";

        // إضافة وظيفة السحب والإفلات لتغيير حالة التوفر
        document.getElementById("availability").addEventListener("click", async function () {
            const newAvailability = donor.data.isAvailable ? false : true;
            const updateResponse = await fetch("http://localhost:6500/api/donar/me", {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    isAvailable: newAvailability
                })
            });

            if (updateResponse.ok) {
                donor.data.isAvailable = newAvailability; // تحديث الحالة محليًا
                const availabilityText = newAvailability ? "متاح" : "غير متاح";
                
                // تحديث النص
                const availabilityElement = document.getElementById("availability");
                availabilityElement.innerText = availabilityText;
            
                // تحديث اللون بناءً على التوفر
                if (newAvailability) {
                    availabilityElement.style.backgroundColor = "#4caf50"; // اللون الأخضر عندما يكون متاح
                } else {
                    availabilityElement.style.backgroundColor = "#f44336"; // اللون الأحمر عندما يكون غير متاح
                }
                Swal.fire({
                    title: "تم التحديث!",
                    text: `تم تحديث حالة التوفر بنجاح!`,
                    icon: "success",
                    confirmButtonText: "موافق"
                });
            } else {
                Swal.fire({
                    title: "خطأ!",
                    text: "لم نتمكن من تحديث حالة التوفر.",
                    icon: "error",
                    confirmButtonText: "إعادة المحاولة"
                });
            }
        });

    } catch (error) {
        Swal.fire({
            title: "خطأ!",
            text: error.message || "لم نتمكن من تحميل البيانات.",
            icon: "error",
            confirmButtonText: "إعادة المحاولة"
        });
    }
});
