document.getElementById("userForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    data.age = Number(data.age);

    console.log("📤 بيانات التسجيل المرسلة:", data);

    try {
        const response = await fetch("http://localhost:6500/api/donar/regisiter", {
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

        // إظهار تنبيه تسجيل ناجح باستخدام SweetAlert2
        Swal.fire({
            title: "تم التسجيل بنجاح!",
            text: "يمكنك الآن تسجيل الدخول باستخدام بياناتك.",
            icon: "success",
            confirmButtonText: "حسنًا"
        }).then(() => {
            // بعد إغلاق التنبيه، الانتقال إلى شاشة تسجيل الدخول
            showTab('login');
        });

    } catch (error) {
        console.error("❌ خطأ في التسجيل:", error);
        document.getElementById("masage").innerHTML = "حدث خطأ: " + error.message;
    }
});
