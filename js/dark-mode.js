// التحكم بالوضع المظلم
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    // تطبيق الوضع الحالي عند التحميل
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        themeToggle.querySelector('.fa-moon').style.opacity = '0';
        themeToggle.querySelector('.fa-sun').style.opacity = '1';
    } else {
        document.body.classList.remove('dark-mode');
        themeToggle.querySelector('.fa-moon').style.opacity = '1';
        themeToggle.querySelector('.fa-sun').style.opacity = '0';
    }

    // تبديل الوضع عند النقر
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        const isNowDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isNowDarkMode);
        
        // تحريك الأيقونات
        const moonIcon = this.querySelector('.fa-moon');
        const sunIcon = this.querySelector('.fa-sun');
        
        if (isNowDarkMode) {
            moonIcon.style.opacity = '0';
            sunIcon.style.opacity = '1';
        } else {
            moonIcon.style.opacity = '1';
            sunIcon.style.opacity = '0';
        }
        
        // إضافة تأثير حركي
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
});