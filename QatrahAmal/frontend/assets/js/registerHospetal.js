document.getElementById("userForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    console.log("📤 بيانات التسجيل المرسلة:", data);
    console.log("📤 بيانات التسجيل:", JSON.stringify(data, null, 2));

    try {
        const response = await fetch("http://localhost:6500/api/hospital/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("✅ التسجيل ناجح:", responseData);

        // إظهار رسالة نجاح
        Swal.fire({
            title: "تم تسجيل المستشفى بنجاح!",
            text: "يمكنك الآن تسجيل الدخول.",
            icon: "success",
            confirmButtonText: "حسنًا"
        }).then(() => {
            showTab('login');
        });

    } catch (error) {
        console.error("❌ خطأ في التسجيل:", error);
        document.getElementById("masage").innerHTML = "حدث خطأ: " + error.message;
    }
});
