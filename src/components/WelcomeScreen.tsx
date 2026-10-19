import React from 'react';

export const WelcomeScreen: React.FC = () => {
  return (
    <div className="welcome-container p-6 max-w-4xl mx-auto text-right" dir="rtl">
      {/* الترويسة الرئيسية */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">فندق بابل كاسل هاوس (Bubble Castle Boutique Hotel)</h1>
        <p className="text-gray-600 text-lg">بإطلالة ساحرة ومباشرة على قلعة الكرك التاريخية</p>
      </div>

      {/* قسم الغرف والخيارات المتاحة */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* الغرفة المزدوجة */}
        <div className="border rounded-xl p-5 shadow-sm bg-white border-amber-100 hover:shadow-md transition">
          <h2 className="text-xl font-bold mb-2 text-amber-900">الغرفة المزدوجة (Double Room)</h2>
          <p className="text-sm text-gray-700 mb-3 leading-relaxed">
            غرفة استثنائية ومريحة بمساحة واسعة (75 م²) تمتاز بإطلالة على برج الأسد، وتضم صالة أنيقة وتراساً بانورامياً مطلّاً على قلعة الكرك وكامل المدينة.
          </p>
          <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 text-xs text-amber-900 font-medium">
            ✨ <strong>مزايا الحجز المباشر:</strong> سعر تفضيلي يقل تلقائياً بدينارين عن منصة بوكينج، مع مياه معدنية ومشروبات ساخنة مجانية (شاي وكابتشينو).
          </div>
        </div>

        {/* الغرفة الثلاثية الفاخرة */}
        <div className="border rounded-xl p-5 shadow-sm bg-white border-amber-100 hover:shadow-md transition">
          <h2 className="text-xl font-bold mb-2 text-amber-900">الغرفة الثلاثية الفاخرة (Deluxe Triple)</h2>
          <p className="text-sm text-gray-700 mb-3 leading-relaxed">
            مصممة لراحة الضيوف بمساحة 80 م² مع حمام عصري بتصميم راقٍ، وتحتوي على أجمل تراس في الفندق بإطلالة مباشرة وكاملة على قلعة الكرك والمدينة.
          </p>
          <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 text-xs text-amber-900 font-medium">
            ✨ <strong>مزايا الحجز المباشر:</strong> سعر تفضيلي يقل بدينارين عن المنصات الخارجية، وضيافة مجانية تشمل المياه المعدنية والمشروبات الساخنة.
          </div>
        </div>

        {/* الجناح الفاخر */}
        <div className="border rounded-xl p-5 shadow-sm bg-white border-amber-100 hover:shadow-md transition">
          <h2 className="text-xl font-bold mb-2 text-amber-900">الجناح الفاخر (Suite - Code b1)</h2>
          <p className="text-sm text-gray-700 mb-3 leading-relaxed">
            جناح ملكي فاخر بمساحة 80 م² يتكون من غرفتي نوم مع مطبخ خاص وإطلالة خلابة ومباشرة على قلعة الكرك، يضم أنظمة إضاءة متعددة تناسب الجميع <em>(مكتمل 90% وجاري استكمال الموكيت)</em>.
          </p>
          <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 text-xs text-amber-900 font-medium">
            ✨ <strong>مزايا الحجز المباشر:</strong> السعر الأفضل بفارق دينارين عن المنصات، مع مياه معدنية ومشروبات ساخنة مجانية.
          </div>
        </div>

      </div>
    </div>
  );
};

export default WelcomeScreen;
