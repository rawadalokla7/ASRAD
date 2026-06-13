# ASRAD — Premium Design Studio Website

موقع ويب متكامل لاستوديو تصميم فاخر (**ASRAD Premium Design Studio**)، مبني بالكامل بـ **HTML, CSS, JavaScript** بدون أي إطار عمل (Framework-free)، مع دعم كامل للغة العربية (RTL) وتجربة بصرية فاخرة بأنيميشن ثلاثي الأبعاد وتفاعلات حركية متقدمة.

🔗 **Live Demo:** [asrad.design](https://asrad.design)

---

## ✨ المميزات (Features)

- **تصميم فاخر بالكامل** بهوية بصرية ذهبية/خضراء داكنة (Forest Green & Gold).
- **دعم اللغة العربية (RTL)** بشكل كامل ومتسق عبر كل الموقع.
- **الوضع الليلي / النهاري (Dark & Light Mode)** مع تبديل سلس وألوان متناسقة بالكامل بكل وضع.
- **خلفية تفاعلية ثلاثية الأبعاد** باستخدام **Three.js**.
- **أنيميشن وتمرير سلس (Smooth Scroll)** عبر **GSAP** و **ScrollTrigger** و **Lenis**.
- **قسم أعمالنا (Portfolio Grid)** بتصميم Bento متوازن (8/4) يعرض أعمال الاستوديو.
- **قسم آراء العملاء (Testimonials)** بكروت متحركة عند التمرير.
- **فورم تواصل حقيقي ومباشر** عبر [Web3Forms](https://web3forms.com) — الرسائل توصل مباشرة على الإيميل بدون أي تحويل أو باك إند.
- **تحسين SEO** كامل (Meta Tags, Open Graph, Twitter Cards).
- **تصميم متجاوب (Responsive)** يعمل على جميع الأجهزة (موبايل، تابلت، ديسكتوب).
- **أيقونات حديثة** عبر [Lucide Icons](https://lucide.dev).

---

## 🛠️ التقنيات المستخدمة (Tech Stack)

| التقنية | الاستخدام |
|---|---|
| **HTML5** | البنية الأساسية للموقع |
| **CSS3** | التنسيق والتصميم المخصص |
| **Tailwind CSS (CDN)** | نظام التصميم السريع (Utility-first) |
| **JavaScript (Vanilla)** | كل التفاعلات والمنطق |
| **GSAP + ScrollTrigger** | أنيميشن العناصر عند التمرير |
| **Three.js** | الخلفية التفاعلية ثلاثية الأبعاد |
| **Lenis** | تمرير سلس (Smooth Scrolling) |
| **Lucide Icons** | الأيقونات |
| **Web3Forms** | استقبال رسائل فورم التواصل |

---

## 📁 هيكل المشروع (Project Structure)

```
asrad-website/
├── index.html          # الصفحة الرئيسية وكل الأقسام
├── style.css           # التنسيقات المخصصة (Dark & Light Mode)
├── script.js           # كل التفاعلات والأنيميشن ومنطق الفورم
├── images/              # جميع صور الموقع وأعمال الاستوديو
└── README.md
```

---

## 🚀 التشغيل المحلي (Run Locally)

المشروع لا يحتاج أي تثبيت (Build) أو حزم (Dependencies) — مجرد ملفات ثابتة (Static Files).

```bash
# 1. استنسخ المشروع
git clone https://github.com/rawadalokla7/ASRAD.git

# 2. ادخل للمجلد
cd asrad-website

# 3. شغّل سيرفر محلي بسيط (أي خيار من التالي)
python -m http.server 5500
# أو
npx serve .
```

ثم افتح المتصفح على: `http://localhost:5500`

> ⚠️ ملاحظة: لا تفتح `index.html` مباشرة عبر `file://`، لأن فورم التواصل (Web3Forms) يحتاج بروتوكول `http(s)` للعمل بشكل صحيح.

---

## 📬 إعداد فورم التواصل (Web3Forms Setup)

فورم "تواصل معنا" يستخدم [Web3Forms](https://web3forms.com) لإرسال الرسائل مباشرة إلى البريد الإلكتروني دون أي باك إند:

1. اذهب إلى [web3forms.com](https://web3forms.com) وأدخل بريدك الإلكتروني للحصول على **Access Key** مجاني فوري.
2. فعّل المفتاح من خلال رابط التأكيد المُرسَل إلى بريدك.
3. ضع المفتاح في `script.js`:

```javascript
const WEB3FORMS_ACCESS_KEY = 'YOUR_ACCESS_KEY_HERE';
```

عند الضغط على "إرسال"، تصل الرسالة فوراً إلى البريد الإلكتروني المرتبط بالمفتاح، دون أي تحويل أو إعادة توجيه للمستخدم.

---

## 🌐 النشر (Deployment)

المشروع متوافق مع أي استضافة للملفات الثابتة (Static Hosting):

- **[Netlify](https://netlify.com)** — Drag & Drop مباشر للمجلد، أو ربط المستودع لنشر تلقائي مستمر (Continuous Deployment).
- **[Vercel](https://vercel.com)**
- **[GitHub Pages](https://pages.github.com)**
- **[Cloudflare Pages](https://pages.cloudflare.com)**

---

## 📄 الترخيص (License)

هذا المشروع جزء من بورتفوليو شخصي لعرض المهارات في التطوير الواجهي (Front-End Development).
جميع الحقوق محفوظة © ASRAD Premium Design Studio.

---

## 👤 المطور (Developer)

تم تطوير هذا الموقع كاملاً (التصميم، التطوير، الأنيميشن، والتكامل) كمشروع ضمن بورتفوليو **Rawad Khaled Al-Oqla** — مطور واجهات أمامية (Front-End Developer).
