(function () {
  var html = document.documentElement;
  var btn = document.getElementById('langToggle');
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  function apply(lang) {
    var en = lang === 'en';
    html.lang = en ? 'en' : 'ar';
    html.dir = en ? 'ltr' : 'rtl';
    document.querySelectorAll('[data-ar][data-en]').forEach(function (el) {
      el.textContent = en ? el.getAttribute('data-en') : el.getAttribute('data-ar');
    });
    if (btn) {
      btn.textContent = en ? 'ع' : 'EN';
      btn.setAttribute('aria-label', en ? 'التبديل إلى العربية' : 'Switch to English');
    }
  }

  var pref = (navigator.language || '').toLowerCase().indexOf('ar') === 0 ? 'ar' : 'en';
  if (pref === 'en') apply('en');

  var form = document.getElementById('bookForm');
  if (form) {
    var today = new Date().toISOString().slice(0, 10);
    form.checkin.min = today; form.checkout.min = today;
    form.checkin.addEventListener('change', function () { form.checkout.min = form.checkin.value || today; });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var en = html.lang === 'en';
      var err = document.getElementById('formError');
      var ci = form.checkin.value, co = form.checkout.value, nm = form.name.value.trim();
      var msg = '';
      if (!ci || !co || !nm) msg = en ? 'Please fill in your dates and name.' : 'يرجى إدخال التواريخ والاسم.';
      else if (co <= ci) msg = en ? 'Check-out must be after check-in.' : 'يجب أن يكون تاريخ المغادرة بعد تاريخ الوصول.';
      if (msg) { err.textContent = msg; err.hidden = false; return; }
      err.hidden = true;
      var room = form.room.options[form.room.selectedIndex].text;
      var text = en
        ? 'Hello Bubble Castle, I would like to book.\nName: ' + nm + '\nCheck-in: ' + ci + '\nCheck-out: ' + co + '\nGuests: ' + form.guests.value + '\nStay: ' + room + (form.notes.value.trim() ? '\nNotes: ' + form.notes.value.trim() : '')
        : 'مرحبًا Bubble Castle، أرغب بالحجز.\nالاسم: ' + nm + '\nالوصول: ' + ci + '\nالمغادرة: ' + co + '\nعدد الضيوف: ' + form.guests.value + '\nالإقامة: ' + room + (form.notes.value.trim() ? '\nملاحظات: ' + form.notes.value.trim() : '');
      window.open('https://wa.me/962795711268?text=' + encodeURIComponent(text), '_blank', 'noopener');
    });
  }

  if (btn) btn.addEventListener('click', function () {
    apply(html.lang === 'en' ? 'ar' : 'en');
  });
})();
