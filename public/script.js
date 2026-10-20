(function () {
  'use strict';

  var html = document.documentElement;
  var btn = document.getElementById('langToggle');
  var year = document.getElementById('year');

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  function apply(lang) {
    var en = lang === 'en';

    html.lang = en ? 'en' : 'ar';
    html.dir = en ? 'ltr' : 'rtl';

    document.querySelectorAll('[data-ar][data-en]').forEach(function (el) {
      el.textContent = en
        ? el.getAttribute('data-en')
        : el.getAttribute('data-ar');
    });

    if (btn) {
      btn.textContent = en ? 'ع' : 'EN';
      btn.setAttribute(
        'aria-label',
        en ? 'التبديل إلى العربية' : 'Switch to English'
      );
    }
  }

  var pref = (navigator.language || '')
    .toLowerCase()
    .indexOf('ar') === 0 ? 'ar' : 'en';

  apply(pref);

  if (btn) {
    btn.addEventListener('click', function () {
      apply(html.lang === 'en' ? 'ar' : 'en');
    });
  }

  var form = document.getElementById('bookForm');
  if (!form) return;

  var fields = form.elements;
  var checkin = fields.namedItem('checkin');
  var checkout = fields.namedItem('checkout');
  var nameInput = fields.namedItem('name');
  var guests = fields.namedItem('guests');
  var room = fields.namedItem('room');
  var notes = fields.namedItem('notes');
  var error = document.getElementById('formError');

  if (
    !checkin || !checkout || !nameInput ||
    !guests || !room || !notes || !error
  ) {
    console.error('Booking form is missing required fields.');
    return;
  }

  // Use the current calendar date in Jordan.
  function jordanToday() {
    var parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Amman',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).formatToParts(new Date());

    var values = {};
    parts.forEach(function (part) {
      values[part.type] = part.value;
    });

    return values.year + '-' + values.month + '-' + values.day;
  }

  function updateDateLimits() {
    var today = jordanToday();
    checkin.min = today;

    checkout.min = checkin.value && checkin.value >= today
      ? checkin.value
      : today;

    if (checkin.value && checkin.value < today) {
      checkin.value = '';
    }

    if (checkout.value && checkout.value < checkout.min) {
      checkout.value = '';
    }
  }

  updateDateLimits();

  checkin.addEventListener('change', updateDateLimits);

  checkout.addEventListener('change', function () {
    updateDateLimits();
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var en = html.lang === 'en';
    var ci = checkin.value;
    var co = checkout.value;
    var nm = nameInput.value.trim();
    var guestCount = Number(guests.value);
    var today = jordanToday();
    var message = '';

    if (!ci || !co || !nm) {
      message = en
        ? 'Please enter your dates and name.'
        : 'يرجى إدخال تواريخ الإقامة والاسم.';
    } else if (ci < today) {
      message = en
        ? 'Check-in cannot be in the past.'
        : 'لا يمكن أن يكون الوصول في تاريخ سابق لليوم.';
    } else if (co <= ci) {
      message = en
        ? 'Check-out must be after check-in.'
        : 'يجب أن يكون تاريخ المغادرة بعد تاريخ الوصول.';
    } else if (
      !Number.isInteger(guestCount) ||
      guestCount < 1 ||
      guestCount > 6
    ) {
      message = en
        ? 'Please select a valid number of guests.'
        : 'يرجى اختيار عدد صحيح للضيوف.';
    }

    if (message) {
      error.textContent = message;
      error.hidden = false;
      return;
    }

    error.hidden = true;

    var selectedRoom = room.options[room.selectedIndex].text;
    var noteText = notes.value.trim();

    var text = en
      ? 'Hello Bubble Castle, I would like to request a booking.\n' +
        'Name: ' + nm + '\n' +
        'Check-in: ' + ci + '\n' +
        'Check-out: ' + co + '\n' +
        'Guests: ' + guestCount + '\n' +
        'Preferred stay: ' + selectedRoom +
        (noteText ? '\nNotes: ' + noteText : '')
      : 'مرحبًا Bubble Castle، أرغب في طلب حجز.\n' +
        'الاسم: ' + nm + '\n' +
        'الوصول: ' + ci + '\n' +
        'المغادرة: ' + co + '\n' +
        'عدد الضيوف: ' + guestCount + '\n' +
        'الإقامة المفضلة: ' + selectedRoom +
        (noteText ? '\nملاحظات: ' + noteText : '');

    var url = 'https://wa.me/962795711268?text=' +
      encodeURIComponent(text);

    var whatsappWindow = window.open(url, '_blank');

    if (whatsappWindow) {
      whatsappWindow.opener = null;
    } else {
      error.textContent = en
        ? 'WhatsApp could not be opened. Please allow pop-ups or use the WhatsApp contact link.'
        : 'تعذر فتح واتساب. يرجى السماح بالنوافذ المنبثقة أو استخدام رابط التواصل عبر واتساب.';
      error.hidden = false;
    }
  });
})();
