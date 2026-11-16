document.addEventListener('DOMContentLoaded', function () {
  // 1. تحديث سنة حقوق النشر تلقائياً في الفوتر
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. آلية تبديل اللغة (عربي / إنجليزي) مع حماية الروابط والأيقونات الداخلية
  const langToggle = document.getElementById('langToggle');
  if (langToggle && !langToggle.dataset.listenerInitialized) {
    langToggle.dataset.listenerInitialized = 'true';
    langToggle.addEventListener('click', function () {
      const htmlEl = document.documentElement;
      const currentLang = htmlEl.lang || 'ar';
      const isCurrentlyAr = currentLang.startsWith('ar');
      const newLang = isCurrentlyAr ? 'en' : 'ar';

      htmlEl.lang = newLang;
      htmlEl.dir = newLang === 'ar' ? 'rtl' : 'ltr';
      langToggle.textContent = newLang === 'ar' ? 'EN' : 'عربي';

      // تحديث العناصر التي تملك وسوم النص الداخلي span أو data-* بدقة دون مساس بالأيقونات
      document.querySelectorAll('[data-ar][data-en]').forEach(function (el) {
        const text = el.getAttribute('data-' + newLang);
        if (text) {
          // إذا كان العنصر يحتوي على عنصر داخلي span مخصص للنص، نقوم بتحديثه، وإلا نحدث النص المباشر أو الـ textContent بأمان
          const textSpan = el.querySelector('span[data-ar]');
          if (textSpan) {
            textSpan.textContent = text;
          } else if (el.tagName === 'SPAN' || !el.querySelector('svg')) {
            el.textContent = text;
          } else {
            // للعناصر التي تحتوى أيقونات، نبحث عن أول span نصي أو نحدث النص بعد الأيقونة
            const spans = el.querySelectorAll('span');
            if (spans.length > 0) {
              spans[spans.length - 1].textContent = text;
            }
          }
        }
      });
    });
  }

  // 3. حساب تاريخ اليوم بدقة وفق توقيت الأردن (Asia/Amman) حصراً باستخدام formatToParts() والأرقام اللاتينية
  function getAmmanTodayISO() {
    try {
      const formatter = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Amman',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        calendar: 'gregory',
        numberingSystem: 'latn'
      });
      const parts = formatter.formatToParts(new Date());
      let year = '', month = '', day = '';
      for (const p of parts) {
        if (p.type === 'year') year = p.value;
        if (p.type === 'month') month = p.value;
        if (p.type === 'day') day = p.value;
      }
      if (year && month && day) {
        return `${year}-${month}-${day}`;
      }
    } catch (e) {
      console.error('Error formatting Amman time:', e);
    }
    // سلوك فشل واضح وموثق بدلاً من التحول الصامت المضلل لجهاز الزائر
    throw new Error('Could not reliably determine Amman date. Please check system configuration.');
  }

  // 4. حساب اليوم التالي باستخدام عمليات UTC المتسقة (تجنب مشاكل التوقيت المحلي/الصيفي)
  function getNextDayISO(dateString) {
    const [year, month, day] = dateString.split('-').map(Number);
    // بناء التاريخ بتوقيت UTC منتصف الليل
    const dateUTC = new Date(Date.UTC(year, month - 1, day));
    dateUTC.setUTCDate(dateUTC.getUTCDate() + 1);
    
    const y = dateUTC.getUTCFullYear();
    const m = String(dateUTC.getUTCMonth() + 1).padStart(2, '0');
    const d = String(dateUTC.getUTCDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  // 5. معالجة نماذج الحجز بشكل مستقل ومنع تكرار التهيئة للمستمعات
  const forms = document.querySelectorAll('form.book-form');
  
  forms.forEach(function (form) {
    if (form.dataset.bookingInitialized === 'true') return;
    form.dataset.bookingInitialized = 'true';

    const checkinInput = form.querySelector('input[name="checkin"]');
    const checkoutInput = form.querySelector('input[name="checkout"]');
    const guestsSelect = form.querySelector('select[name="guests"]');
    const roomSelect = form.querySelector('select[name="room"]');
    const nameInput = form.querySelector('input[name="name"]');
    const notesInput = form.querySelector('textarea[name="notes"]');
    const errorEl = form.querySelector('.form-error');

    // إعداد الحد الأدنى للتواريخ عند التحميل بناءً على توقيت عمّان
    let today;
    try {
      today = getAmmanTodayISO();
      if (checkinInput) checkinInput.min = today;
      if (checkoutInput) checkoutInput.min = today;
    } catch (err) {
      console.warn(err);
    }

    // تحديث الحد الأدنى للمغادرة ديناميكياً عند اختيار تاريخ الوصول
    if (checkinInput && checkoutInput) {
      checkinInput.addEventListener('change', function () {
        if (checkinInput.value) {
          const nextDay = getNextDayISO(checkinInput.value);
          checkoutInput.min = nextDay;
          if (checkoutInput.value && checkoutInput.value <= checkinInput.value) {
            checkoutInput.value = nextDay;
          }
        }
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const htmlLang = document.documentElement.lang || 'ar';
      const isArabic = htmlLang.startsWith('ar');

      // رسائل التحقق الثنائية الدقيقة
      const messages = {
        checkin: isArabic ? 'يرجى تحديد تاريخ الوصول.' : 'Please select a check-in date.',
        checkout: isArabic ? 'يرجى تحديد تاريخ المغادرة.' : 'Please select a check-out date.',
        name: isArabic ? 'يرجى إدخال الاسم بشكل صحيح.' : 'Please enter a valid name.',
        pastDate: isArabic ? 'تاريخ الوصول لا يمكن أن يكون في الماضي.' : 'Check-in date cannot be in the past.',
        dates: isArabic ? 'يجب أن يكون تاريخ المغادرة بعد تاريخ الوصول.' : 'Check-out date must be after check-in date.'
      };

      // إعادة حساب تاريخ اليوم عند الإرسال حصراً للمقارنة الدقيقة
      let currentAmmanToday;
      try {
        currentAmmanToday = getAmmanTodayISO();
      } catch (err) {
        showError(errorEl, isArabic ? 'تعذر التحقق من التوقيت الحالي. يرجى المحاولة لاحقاً.' : 'Could not verify current time. Please try later.', null);
        return;
      }

      // التحقق من الحقول والتواريخ الصارمة
      if (!checkinInput || !checkinInput.value) {
        showError(errorEl, messages.checkin, checkinInput);
        return;
      }

      if (checkinInput.value < currentAmmanToday) {
        showError(errorEl, messages.pastDate, checkinInput);
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

      // إزالة الخطأ والحالات السابقة عند اجتياز التحقق بنجاح
      hideError(errorEl, [checkinInput, checkoutInput, nameInput]);

      // بيانات المنشأة الموثقة
      const hotelName = 'Bubble Castle';
      const phone = '962795711268';

      const checkin = checkinInput.value;
      const checkout = checkoutInput.value;
      
      // معالجة الضيوف ونوع الإقامة دون قيم افتراضية مخفية غير مدخلة
      const guests = guestsSelect ? guestsSelect.value : '';
      const room = roomSelect ? roomSelect.value : '';
      const name = nameInput.value.trim();
      const notes = notesInput ? notesInput.value.trim() : '';

      // ترجمة خيار الإقامة للغة الواجهة الحالية
      let roomDisplay = room;
      if (room === 'Rooftop Bubble') {
        roomDisplay = isArabic ? 'خيمة الفقاعة على السطح' : 'Rooftop Bubble';
      } else if (room === 'Upper-floor room') {
        roomDisplay = isArabic ? 'غرفة الطابق العلوي' : 'Upper-floor room';
      } else if (room === 'Not sure yet') {
        roomDisplay = isArabic ? 'لم أقرر بعد' : 'Not sure yet';
      }

      // بناء رسالة الاستفسار عبر واتساب بصيغة دقيقة مطابقة للمتطلبات
      let message = '';
      if (isArabic) {
        message =
          `مرحبًا، أرغب بالاستفسار عن التوفّر والسعر في ${hotelName}.\n` +
          `تاريخ الوصول: ${checkin}\n` +
          `تاريخ المغادرة: ${checkout}\n`;
        if (guests) message += `عدد الضيوف: ${guests}\n`;
        if (roomDisplay) message += `الإقامة المفضلة: ${roomDisplay}\n`;
        message += `الاسم: ${name}`;
        if (notes) message += `\nملاحظات: ${notes}`;
        message += `\n\nيرجى تزويدي بالتوفّر والسعر. شكرًا.`;
      } else {
        message =
          `Hello, I would like to inquire about availability and rates at ${hotelName}.\n` +
          `Check-in: ${checkin}\n` +
          `Check-out: ${checkout}\n`;
        if (guests) message += `Guests: ${guests}\n`;
        if (roomDisplay) message += `Preferred stay: ${roomDisplay}\n`;
        message += `Name: ${name}`;
        if (notes) message += `\nNotes: ${notes}`;
        message += `\n\nPlease let me know availability and rates. Thank you.`;
      }

      const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.location.href = whatsappUrl;
    });
  });

  // دوال إدارة الأخطاء وإمكانية الوصول مع ربط aria-describedby وإزالتها بعد التصحيح
  function showError(errorEl, message, inputEl) {
    if (errorEl) {
      errorEl.hidden = false;
      errorEl.textContent = message;
      errorEl.setAttribute('aria-live', 'assertive');
    }
    if (inputEl) {
      inputEl.focus();
      inputEl.setAttribute('aria-invalid', 'true');
      if (errorEl && errorEl.id) {
        inputEl.setAttribute('aria-describedby', errorEl.id);
      }
    }
  }

  function hideError(errorEl, inputs) {
    if (errorEl) {
      errorEl.hidden = true;
      errorEl.textContent = '';
      errorEl.removeAttribute('aria-live');
    }
    if (inputs && Array.isArray(inputs)) {
      inputs.forEach(input => {
        if (input) {
          input.removeAttribute('aria-invalid');
          input.removeAttribute('aria-describedby');
        }
      });
    }
  }
});
