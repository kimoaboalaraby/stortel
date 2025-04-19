// التحقق من صحة النماذج
document.addEventListener('DOMContentLoaded', function() {
    // نموذج تسجيل الدخول
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = loginForm.querySelector('input[type="email"]');
            const password = loginForm.querySelector('input[type="password"]');
            let isValid = true;
            
            // التحقق من البريد الإلكتروني
            if (!email.value || !email.value.includes('@')) {
                showError(email, 'يرجى إدخال بريد إلكتروني صحيح');
                isValid = false;
            } else {
                clearError(email);
            }
            
            // التحقق من كلمة المرور
            if (!password.value || password.value.length < 6) {
                showError(password, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل');
                isValid = false;
            } else {
                clearError(password);
            }
            
            if (isValid) {
                // إرسال النموذج (في الواقع الفعلي سيكون إلى الخادم)
                loginForm.querySelector('.submit-btn').innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري تسجيل الدخول...';
                
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            }
        });
    }
    
    // نموذج إضافة منتج
    const addProductForm = document.getElementById('addProductForm');
    if (addProductForm) {
        addProductForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = addProductForm.querySelector('input[name="title"]');
            const price = addProductForm.querySelector('input[name="price"]');
            const category = addProductForm.querySelector('select[name="category"]');
            const description = addProductForm.querySelector('textarea[name="description"]');
            const images = addProductForm.querySelector('input[name="images"]');
            let isValid = true;
            
            // التحقق من عنوان المنتج
            if (!title.value || title.value.length < 5) {
                showError(title, 'عنوان المنتج يجب أن يكون 5 أحرف على الأقل');
                isValid = false;
            } else {
                clearError(title);
            }
            
            // التحقق من السعر
            if (!price.value || isNaN(price.value)) {
                showError(price, 'يرجى إدخال سعر صحيح');
                isValid = false;
            } else {
                clearError(price);
            }
            
            // التحقق من الفئة
            if (!category.value) {
                showError(category, 'يرجى اختيار فئة المنتج');
                isValid = false;
            } else {
                clearError(category);
            }
            
            // التحقق من الوصف
            if (!description.value || description.value.length < 20) {
                showError(description, 'وصف المنتج يجب أن يكون 20 حرفًا على الأقل');
                isValid = false;
            } else {
                clearError(description);
            }
            
            // التحقق من الصور
            if (!images.files || images.files.length === 0) {
                showError(images, 'يرجى إضافة صورة واحدة على الأقل');
                isValid = false;
            } else {
                clearError(images);
            }
            
            if (isValid) {
                // إرسال النموذج (في الواقع الفعلي سيكون إلى الخادم)
                addProductForm.querySelector('.submit-btn').innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري نشر المنتج...';
                
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 2000);
            }
        });
    }
    
    // دالة عرض رسالة الخطأ
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        let errorElement = formGroup.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        formGroup.classList.add('has-error');
    }
    
    // دالة إزالة رسالة الخطأ
    function clearError(input) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.remove();
        }
        
        formGroup.classList.remove('has-error');
    }
    
    // عرض معاينة الصور قبل الرفع
    const imageUpload = document.querySelector('input[name="images"]');
    if (imageUpload) {
        imageUpload.addEventListener('change', function() {
            const previewContainer = document.querySelector('.images-preview');
            previewContainer.innerHTML = '';
            
            if (this.files && this.files.length > 0) {
                for (let i = 0; i < Math.min(this.files.length, 5); i++) {
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        const preview = document.createElement('div');
                        preview.className = 'image-preview-item';
                        preview.innerHTML = `
                            <img src="${e.target.result}" alt="معاينة الصورة">
                            <button class="remove-image"><i class="fas fa-times"></i></button>
                        `;
                        previewContainer.appendChild(preview);
                        
                        // إزالة الصورة عند النقر على الزر
                        preview.querySelector('.remove-image').addEventListener('click', function() {
                            preview.remove();
                            
                            // إنشاء جديد لـ DataTransfer لإزالة الملف
                            const newFiles = new DataTransfer();
                            for (let j = 0; j < imageUpload.files.length; j++) {
                                if (j !== i) {
                                    newFiles.items.add(imageUpload.files[j]);
                                }
                            }
                            imageUpload.files = newFiles.files;
                        });
                    }
                    
                    reader.readAsDataURL(this.files[i]);
                }
            }
        });
    }
});