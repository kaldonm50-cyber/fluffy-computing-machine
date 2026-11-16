document.addEventListener('DOMContentLoaded', function () {
  // 1. تحديث سنة حقوق النشر تلقائياً في الفوتر
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. آلية تبديل اللغة (عربي / إنجليزي) بكل سلاسة
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', function () {
      const htmlEl = document.documentElement;
      const isCurrentlyAr = htmlEl.lang === 'ar';
      const newLang = isCurrentlyAr ? 'en' : 'ar';

      htmlEl.lang = newLang;
      htmlEl.dir = newLang === 'ar' ? 'rtl' : 'ltr';
      langToggle.textContent = newLang === 'ar' ? 'EN' : 'عربي';

      document.querySelectorAll('[data-ar][data-en]').forEach(function (el) {
        el.textContent = el.getAttribute('data-' + newLang);
      });
    });
  }

  // 3. حساب تاريخ اليوم المحلي بدقة تامة (لتجنب فروق التوقيت العالمي UTC)
  function getTodayLocalISO() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // 4. معالج نماذج الحجز الاحترافي (يدعم جميع النماذج على الصفحة تلقائياً)
  function setupBookingForm(form) {
    if (!form) return;

    const checkinInput = form.querySelector('input[name="checkin"]');
    const checkoutInput = form.querySelector('input[name="checkout"]');
    const guestsSelect = form.querySelector('select[name="guests"]');
    const roomSelect = form.querySelector('select[name="room"]');
    const nameInput = form.querySelector('input[name="name"]');
    const notesInput = form.querySelector('textarea[name="notes"]');
    const errorEl = form.querySelector('.form-error');

    const today = getTodayLocalISO();
    if (checkinInput) checkinInput.min = today;
    if (checkoutInput) checkoutInput.min = today;

    // ربط تاريخ المغادرة بتشغيل تاريخ الوصول ديناميكياً
    if (checkinInput && checkoutInput) {
      checkinInput.addEventListener('change', function () {
        if (checkinInput.value) {
          checkoutInput.min = checkinInput.value;
          if (checkoutInput.value && checkoutInput.value <= checkinInput.value) {
            checkoutInput.value = '';
          }
        }
      });
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const isArabic = document.documentElement.lang === 'ar';

      // رسائل التحقق ثنائية اللغة
      const messages = {
        checkin: isArabic ? 'يرجى تحديد تاريخ الوصول.' : 'Please select a check-in date.',
        checkout: isArabic ? 'يرجى تحديد تاريخ المغادرة.' : 'Please select a check-out date.',
        name: isArabic ? 'يرجى إدخال الاسم بشكل صحيح.' : 'Please enter a valid name.',
        dates: isArabic ? 'يجب أن يكون تاريخ المغادرة بعد تاريخ الوصول.' : 'Check-out date must be after check-in date.'
      };

      // التحقق من الحقول الإجبارية
      if (!checkinInput || !checkinInput.value) {
        showError(errorEl, messages.checkin, checkinInput);
        return;
      }

      if (!checkoutInput || !checkoutInput.value) {
        showError(errorEl, messages.checkout, checkoutInput);
        return;
      }

      if (!nameInput || !nameInput.value.trim()) {
        showError(errorEl, messages.name, nameInput);
        return;
      }

      if (checkoutInput.value <= checkinInput.value) {
        showError(errorEl, messages.dates, checkoutInput);
        return;
      }

      hideError(errorEl);

      // بيانات الفندق الرسمية المعتمدة
      const hotelName = 'Bubble Castel Boutique Hotel';
      const phone = '962795711268';

      const checkin = checkinInput.value;
      const checkout = checkoutInput.value;
      const guests = guestsSelect ? guestsSelect.value : '2';
      const room = roomSelect ? roomSelect.value : 'خيمة الفقاعة على السطح';
      const name = nameInput.value.trim();
      const notes = notesInput ? notesInput.value
