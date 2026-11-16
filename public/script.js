(function () {
  'use strict';

  var html = document.documentElement;
  var langToggle = document.getElementById('langToggle');
  var yearEl = document.getElementById('year');
  var STORAGE_KEY = 'bubble_castle_language';
  var WHATSAPP_NUMBER = '962795711268';
  var HOTEL_NAME_AR = 'فندق بابل كاستل البوتيكي';
  var HOTEL_NAME_EN = 'Bubble Castle Boutique Hotel';

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
