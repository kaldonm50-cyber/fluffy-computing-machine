document.addEventListener('DOMContentLoaded', function () {
  // 1. تحديث السنة في الفوتر تلقائياً
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. آلية تبديل اللغة (العربية / الإنجليزية)
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', function () {
      const htmlEl = document.documentElement;
      const isCurrentlyAr = htmlEl.lang === 'ar';
      const newLang = isCurrentlyAr ? 'en' : 'ar';

      htmlEl.lang = newLang;
      htmlEl.dir = newLang === 'ar' ? 'rtl' : 'ltr';
      langToggle.textContent = newLang === 'ar' ? 'EN' : 'عربي';
      langToggle.setAttribute('aria-label', newLang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');

      document.querySelectorAll('[data-ar][data-en]').forEach(function (el) {
        el.textContent = el.getAttribute('data-' + newLang);
      });
    });
  }

  // 3. حساب تاريخ اليوم المحلي بدقة (لتجنب خطأ التوقيت العالمي UTC)
  function getTodayLocalISO() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // 4. تهيئة ومعالجة نموذج الحجز (يدعم #bookForm و #bookFormAr)
  function initBookingForm(formId, errorId) {
    const form = document.getElementById(formId);
    if (!form) return;

    const errorEl = document.getElementById(errorId);
    const checkinInput = form.querySelector('input[name="checkin"]');
    const checkoutInput = form.querySelector('input[name="checkout"]');
    const guestsSelect = form.querySelector('select[name="guests"]');
    const roomSelect = form.querySelector('select[name="room"]');
    const nameInput = form.querySelector('input[name="name"]');
    const notesInput = form.querySelector('textarea[name="notes"]');

    const today = getTodayLocalISO();
    if (checkinInput) checkinInput.min = today;
    if (checkoutInput) checkoutInput.min = today;

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

      const messages = {
        checkin: isArabic ? 'يرجى تحديد تاريخ الوصول.' : 'Please select a check-in date.',
        checkout: isArabic ? 'يرجى تحديد تاريخ المغادرة.' : 'Please select a check-out date.',
        name: isArabic ? 'يرجى إدخال الاسم بشكل صحيح.' : 'Please enter a valid name.',
        dates: isArabic ? 'يجب أن يكون تاريخ المغادرة بعد تاريخ الوصول.' : 'Check-out date must be after check-in date.'
      };

      if (!checkinInput || !checkinInput.value) {
        showError(errorEl, messages.checkin);
        checkinInput?.focus();
        return;
      }

      if (!checkoutInput || !checkoutInput.value) {
        showError(errorEl, messages.checkout);
        checkoutInput?.focus();
        return;
      }

      if (!nameInput || !nameInput.value.trim()) {
        showError(errorEl, messages.name);
        nameInput?.focus();
        return;
      }

      if (checkoutInput.value <= checkinInput.value) {
        showError(errorEl, messages.dates);
        checkoutInput.focus();
        return;
      }

      hideError(errorEl);

      const hotelName = 'Bubble Castel Boutique Hotel';
      const phone = '962795711268';

      const checkin = checkinInput.value;
      const checkout = checkoutInput.value;
      const guests = guestsSelect ? guestsSelect.value : '2';
      const room = roomSelect ? roomSelect.value : 'Not sure yet';
      const name = nameInput.value.trim();
      const notes = notesInput ? notesInput.value.trim() : '';

      let message = '';
      if (isArabic) {
        message =
          `مرحباً ${hotelName}،\n` +
          'أرغب بالاستفسار عن التوفّر والسعر.\n\n' +
          `تاريخ الوصول: ${checkin}\n` +
          `تاريخ المغادرة: ${checkout}\n` +
          `عدد الضيوف: ${guests}\n` +
          `الإقامة المفضلة: ${room}\n` +
          `الاسم: ${name}`;
        if (notes) message += `\nملاحظات: ${notes}`;
      } else {
        message =
          `Hello ${hotelName},\n` +
          'I would like to inquire about availability and rates.\n\n' +
          `Check-in: ${checkin}\n` +
          `Check-out: ${checkout}\n` +
          `Guests: ${guests}\n` +
          `Preferred stay: ${room}\n` +
          `Name: ${name}`;
        if (notes) message += `\nNotes: ${notes}`;
      }

      const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

      const tempLink = document.createElement('a');
      tempLink.href = whatsappUrl;
      tempLink.target = '_blank';
      tempLink.rel = 'noopener noreferrer';
      tempLink.style.display = 'none';

      document.body.appendChild(tempLink);
      tempLink.click();
      tempLink.remove();
    });
  }

  function showError(errorEl, message) {
    if (!errorEl) return;
    errorEl.hidden = false;
    errorEl.textContent = message;
    errorEl.focus();
  }

  function hideError(errorEl) {
    if (!errorEl) return;
    errorEl.hidden = true;
    errorEl.textContent = '';
  }

  initBookingForm('bookForm', 'formError');
  initBookingForm('bookFormAr', 'formErrorAr');
});
