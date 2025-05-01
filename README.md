# Rally Timer (Node Edition)

حساب توقيت الحشود المتزامنة مع حماية تشويش الكود.

## أوامر سريعة

| أمر                | وظيفة                           |
| ------------------ | ------------------------------ |
| `npm install`      | تنزيل الاعتمادات                |
| `npm run build`    | بناء النسخة الإنتاجية + تشويش   |
| `npm run dev`      | تشغيل الخادم (تقرأ من `dist/`) |
| `npm start`        | نفس dev للبيئة الإنتاجية        |

## نشر سريع

```bash
# Railway
railway init
railway run npm run build
railway up
