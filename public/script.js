(function () {
  'use strict';

  var html = document.documentElement;
  var langToggle = document.getElementById('langToggle');
  var yearEl = document.getElementById('year');
  var STORAGE_KEY = 'bubble_castel_language';
  var WHATSAPP_NUMBER = '962795711268';
  var HOTEL_NAME_AR = 'فندق بابل كاستل بوتيك';
  var HOTEL_NAME_EN = 'Bubble Castel Boutique Hotel';

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  function safeStorage(action, key, value) {
    try {
      if (action === 'get') {
        return localStorage.getItem(key);
      }

      if (action === 'set') {
        localStorage.setItem(key, value);
      }
    } catch (error) {
      return null;
    }
  }

  function applyLanguage(language, savePreference) {
    var isArabic = language === 'ar';

    html.lang = isArabic ? 'ar' : 'en';
    html.dir = isArabic ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-ar][data-en]').forEach(function (element) {
      var text = element.getAttribute(isArabic ? 'data-ar' : 'data-en');

      if (!text) {
        return;
      }

      var textTarget = element.querySelector('span[data-ar], span[data-en]');

      if (textTarget) {
        textTarget.textContent = text;
      } else if (!element.querySelector('svg')) {
        element.textContent = text;
      }
    });

    if (langToggle) {
      langToggle.textContent = isArabic ? 'EN' : 'عربي';
      langToggle.setAttribute(
        'aria-label',
        isArabic ? 'Switch to English' : 'التبديل إلى العربية'
      );
    }

    if (savePreference) {
      safeStorage('set', STORAGE_KEY, language);
    }
  }

  var savedLanguage = safeStorage('get', STORAGE_KEY);

  if (savedLanguage === 'ar' || savedLanguage === 'en') {
    applyLanguage(savedLanguage, false);
  }

  if (langToggle) {
    langToggle.addEventListener('click', function () {
      applyLanguage(html.lang === 'ar' ? 'en' : 'ar', true);
    });
  }

  var form = document.getElementById('bookFormAr');
  var errorElement = document.getElementById('formErrorAr');

  if (!form || !errorElement) {
    console.error('Booking form or error message element was not found.');
    return;
  }

  var checkinInput = form.querySelector('input[name="checkin"]');
  var checkoutInput = form.querySelector('input[name="checkout"]');
  var guestsSelect = form.querySelector('select[name="guests"]');
  var roomSelect = form.querySelector('select[name="room"]');
  var nameInput = form.querySelector('input[name="name"]');
  var notesInput = form.querySelector('textarea[name="notes"]');
  var submitButton = form.querySelector('button[type="submit"]');

  function getAmmanToday() {
    var formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Amman',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      calendar: 'gregory',
      numberingSystem: 'latn'
    });

    var parts = formatter.formatToParts(new Date());
    var values = {};

    parts.forEach(function (part) {
      values[part.type] = part.value;
    });

    return values.year + '-' + values.month + '-' + values.day;
  }

  function getNextDay(dateString) {
    var dateParts = dateString.split('-').map(Number);
    var date = new Date(Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2]));

    date.setUTCDate(date.getUTCDate() + 1);

    var year = date.getUTCFullYear();
    var month = String(date.getUTCMonth() + 1).padStart(2, '0');
    var day = String(date.getUTCDate()).padStart(2, '0');

    return year + '-' + month + '-' + day;
  }

  function showMessage(message, type) {
    errorElement.textContent = message;
    errorElement.hidden = false;
    errorElement.classList.remove('form-error', 'form-success');
    errorElement.classList.add(type === 'success' ? 'form-success' : 'form-error');
    errorElement.focus();
  }

  function hideMessage() {
    errorElement.textContent = '';
    errorElement.hidden = true;
    errorElement.classList.remove('form-error', 'form-success');
  }

  function setInvalidState(input, hasError) {
    if (!input) {
      return;
    }

    if (hasError) {
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', 'formErrorAr');
    } else {
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedby');
    }
  }

  var today = getAmmanToday();

  if (checkinInput) {
    checkinInput.min = today;
  }

  if (checkoutInput) {
    checkoutInput.min = today;
  }

  if (checkinInput && checkoutInput) {
    checkinInput.addEventListener('change', function () {
      if (!checkinInput.value) {
        return;
      }

      var nextDay = getNextDay(checkinInput.value);
      checkoutInput.min = nextDay;

      if (checkoutInput.value && checkoutInput.value <= checkinInput.value) {
        checkoutInput.value = nextDay;
      }
    });
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var isArabic = html.lang === 'ar';
    var checkin = checkinInput ? checkinInput.value : '';
    var checkout = checkoutInput ? checkoutInput.value : '';
    var guests = guestsSelect ? guestsSelect.value : '';
    var room = roomSelect ? roomSelect.value : '';
    var guestName = nameInput ? nameInput.value.trim() : '';
    var notes = notesInput ? notesInput.value.trim() : '';
    var currentToday = getAmmanToday();
    var errorMessage = '';

    if (!checkin) {
      errorMessage = isArabic
        ? 'يرجى تحديد تاريخ الوصول.'
        : 'Please select a check-in date.';
      setInvalidState(checkinInput, true);
    } else if (checkin < currentToday) {
      errorMessage = isArabic
        ? 'لا يمكن أن يكون تاريخ الوصول في الماضي.'
        : 'Check-in date cannot be in the past.';
      setInvalidState(checkinInput, true);
    } else if (!checkout) {
      errorMessage = isArabic
        ? 'يرجى تحديد تاريخ المغادرة.'
        : 'Please select a check-out date.';
      setInvalidState(checkoutInput, true);
    } else if (checkout <= checkin) {
      errorMessage = isArabic
        ? 'يجب أن يكون تاريخ المغادرة بعد تاريخ الوصول.'
        : 'Check-out date must be after check-in date.';
      setInvalidState(checkoutInput, true);
    } else if (!guests) {
      errorMessage = isArabic
        ? 'يرجى تحديد عدد الضيوف.'
        : 'Please select the number of guests.';
      setInvalidState(guestsSelect, true);
    } else if (!room) {
      errorMessage = isArabic
        ? 'يرجى اختيار الإقامة المفضلة.'
        : 'Please select your preferred stay.';
      setInvalidState(roomSelect, true);
    } else if (!guestName) {
      errorMessage = isArabic
        ? 'يرجى إدخال الاسم.'
        : 'Please enter your name.';
      setInvalidState(nameInput, true);
    }

    if (errorMessage) {
      showMessage(errorMessage, 'error');
      return;
    }

    setInvalidState(checkinInput, false);
    setInvalidState(checkoutInput, false);
    setInvalidState(guestsSelect, false);
    setInvalidState(roomSelect, false);
    setInvalidState(nameInput, false);

    var roomText = roomSelect.options[roomSelect.selectedIndex].textContent;

    var message = isArabic
      ? 'مرحبًا ' + HOTEL_NAME_AR + '،\n' +
        'أرغب في الاستفسار عن الحجز.\n\n' +
        'الاسم: ' + guestName + '\n' +
        'تاريخ الوصول: ' + checkin + '\n' +
        'تاريخ المغادرة: ' + checkout + '\n' +
        'عدد الضيوف: ' + guests + '\n' +
        'الإقامة المفضلة: ' + roomText +
        (notes ? '\nملاحظات: ' + notes : '')
      : 'Hello ' + HOTEL_NAME_EN + ',\n' +
        'I would like to inquire about a booking.\n\n' +
        'Name: ' + guestName + '\n' +
        'Check-in: ' + checkin + '\n' +
        'Check-out: ' + checkout + '\n' +
        'Guests: ' + guests + '\n' +
        'Preferred stay: ' + roomText +
        (notes ? '\nNotes: ' + notes : '');

    var whatsappUrl =
      'https://wa.me/' + WHATSAPP_NUMBER +
      '?text=' + encodeURIComponent(message);

    if (submitButton) {
      submitButton.disabled = true;
    }

    var whatsappWindow = window.open(whatsappUrl, '_blank', 'noopener');

    if (whatsappWindow) {
      showMessage(
        isArabic
          ? 'تم تجهيز طلبك في واتساب. يرجى الضغط على إرسال لإكمال الطلب.'
          : 'Your booking request is ready in WhatsApp. Please press send to complete your request.',
        'success'
      );
    } else {
      showMessage(
        isArabic
          ? 'تعذر فتح واتساب. يرجى السماح بالنوافذ المنبثقة أو استخدام زر واتساب في الصفحة.'
          : 'WhatsApp could not be opened. Please allow pop-ups or use the WhatsApp button on this page.',
        'error'
      );
    }

    if (submitButton) {
      setTimeout(function () {
        submitButton.disabled = false;
      }, 1500);
    }
  });
})();
