
localStorage.clear();

document.getElementById("Loginform").addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    console.log("📤 إرسال بيانات تسجيل الدخول:", data);

    try {
        // إرسال طلب تسجيل الدخول
        const response = await fetch("http://localhost:6500/api/donar/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        // طباعة الاستجابة للتحقق من الخطأ
        const responseText = await response.text(); // الحصول على النص الخام للاستجابة
        console.log("🔍 Response Status:", response.status);
        console.log("🔍 Response Text:", responseText);

        

        if (!response.ok) {
            throw new Error(responseText || `فشل تسجيل الدخول: ${response.status}`);
        }

        const responseData = JSON.parse(responseText);
        console.log("✅ تسجيل الدخول ناجح:", responseData);

        // حفظ التوكين في Local Storage
        // localStorage.setItem("authToken", responseData.status.message);

        // حفظ التوكن و ID المستخدم في localStorage
        // localStorage.setItem("token", responseData.status.message);

        const token = responseData.status.message.replace(/^token:\s*/, ""); 
localStorage.setItem("token", token);


        localStorage.setItem("selectedDonorId", responseData.data._id);


        window.location.href = "profileDonor.html";
    } catch (error) {
        console.error("❌ خطأ:", error);
        document.getElementById("masage2").innerHTML = "خطأ: " + error.message;
    }
});
