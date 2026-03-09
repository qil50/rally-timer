<div align="center">

# Spark — تطبيق المواعدة الذكي

**تطبيق مواعدة يعتمد على الشخصية مع لحظات صور بنمط Locket ومطابقة توافق ذكية**

مبني بـ Flutter و Supabase

[![Flutter](https://img.shields.io/badge/Flutter-3.38.5-02569B?logo=flutter)](https://flutter.dev)
[![Dart](https://img.shields.io/badge/Dart-3.10.4-0175C2?logo=dart)](https://dart.dev)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3FCF8E?logo=supabase)](https://supabase.com)
[![Platform](https://img.shields.io/badge/المنصات-iOS%20%7C%20Android-lightgrey)]()
[![Riverpod](https://img.shields.io/badge/State-Riverpod-blue)]()
[![Sentry](https://img.shields.io/badge/Errors-Sentry-362D59?logo=sentry)](https://sentry.io)

</div>

---

## فهرس المحتويات

- [نبذة عامة عن المشروع](#نبذة-عامة-عن-المشروع)
- [متطلبات النظام وبيئة التطوير](#متطلبات-النظام-وبيئة-التطوير)
- [تهيئة بيئة التطوير المحلية](#تهيئة-بيئة-التطوير-المحلية)
- [هيكل المشروع والملفات](#هيكل-المشروع-والملفات)
- [آلية الاتصال بـ Supabase](#آلية-الاتصال-بـ-supabase)
- [ميزات التطبيق ووظائفه](#ميزات-التطبيق-ووظائفه)
- [نماذج البيانات](#نماذج-البيانات)
- [إدارة الحالة وتدفق البيانات](#إدارة-الحالة-وتدفق-البيانات)
- [نظام التوجيه والملاحة](#نظام-التوجيه-والملاحة)
- [خدمات البنية التحتية](#خدمات-البنية-التحتية)
- [قاعدة البيانات والترحيلات](#قاعدة-البيانات-والترحيلات)
- [التشغيل والبناء](#التشغيل-والبناء)
- [الاختبارات](#الاختبارات)
- [التوسعة والصيانة](#التوسعة-والصيانة)
- [المراجع والموارد](#المراجع-والموارد)

---

## نبذة عامة عن المشروع

**Spark** هو تطبيق مواعدة متعدد المنصات (iOS و Android) يتجاوز مفهوم التمرير التقليدي. يجمع التطبيق بين محرك مطابقة توافق ذكي ولحظات صور يومية بنمط Locket ونظام مراسلة فوري ونظام تحقق تدريجي لإنشاء علاقات ذات معنى وآمنة.

### التقنيات الأساسية

| التقنية | الدور |
|---------|-------|
| **Flutter** | إطار العمل لبناء واجهات المستخدم المتعددة المنصات |
| **Dart** | لغة البرمجة الأساسية |
| **Supabase** | الخلفية (قاعدة بيانات PostgreSQL، المصادقة، الاشتراكات الفورية، التخزين السحابي) |
| **Flutter Riverpod** | إدارة الحالة باستخدام نمط AsyncNotifier |
| **GoRouter** | نظام التوجيه مع إعادة توجيه ذكية مبنية على حالة المصادقة |
| **Firebase** | App Check للأمان و Cloud Messaging للإشعارات |
| **Sentry** | تتبع الأخطاء ومراقبة الأداء |

### فلسفة التصميم

- **العربية أولاً** — التطبيق مصمم بدعم RTL أصلي مع دعم كامل للإنجليزية.
- **Warm Dark** — لغة تصميم داكنة دافئة باستخدام Material 3 وخط Poppins.
- **بنية وحدوية** — كل ميزة مستقلة في مجلدها الخاص مع Provider و UI و Widgets.
- **طبقة مزدوجة** — مستودعات محلية للتطوير بدون Supabase، ومستودعات Supabase للإنتاج.

---

## متطلبات النظام وبيئة التطوير

### الإصدارات المطلوبة

| الأداة | الإصدار المطلوب | ملاحظات |
|--------|----------------|---------|
| **Flutter SDK** | `>= 3.0.0 < 4.0.0` | يُنصح باستخدام 3.38.5 (stable) |
| **Dart SDK** | `>= 3.0.0 < 4.0.0` | يأتي مع Flutter SDK |
| **Supabase CLI** | أحدث إصدار | للترحيلات وإدارة القاعدة |
| **Xcode** | آخر إصدار | لتطوير iOS |
| **Android Studio** | آخر إصدار | لتطوير Android (أو Android SDK) |
| **Git** | أي إصدار حديث | لإدارة الكود المصدري |

### أدوات إضافية

- **Firebase CLI** — لإعداد Firebase (App Check + Cloud Messaging)
- **CocoaPods** — لإدارة تبعيات iOS (`pod install`)

---

## تهيئة بيئة التطوير المحلية

### 1. استنساخ المستودع

```bash
git clone https://github.com/your-username/spark-app.git
cd spark-app
```

### 2. تثبيت التبعيات

```bash
flutter pub get
```

### 3. إعداد متغيرات البيئة

```bash
cp .env.example .env.dev
```

حرّر الملف `.env.dev` بالقيم الخاصة بمشروعك:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
SENTRY_DSN=https://xxx@sentry.io/xxx
GOOGLE_WEB_CLIENT_ID=xxx.apps.googleusercontent.com
ENV=development
```

| المتغير | الوصف | مطلوب |
|---------|-------|-------|
| `SUPABASE_URL` | رابط مشروع Supabase | نعم |
| `SUPABASE_ANON_KEY` | مفتاح Supabase العام (anon) | نعم |
| `SENTRY_DSN` | معرّف Sentry لتتبع الأخطاء | لا (يعمل بدونه) |
| `GOOGLE_WEB_CLIENT_ID` | معرّف Google OAuth | لا (مطلوب لتسجيل Google) |
| `ENV` | البيئة: `development` / `staging` / `production` | نعم |

> **ملاحظة:** يدعم المشروع ثلاث بيئات عبر ملفات `.env.dev`، `.env.staging`، `.env.production`. كل بيئة تحمل إعداداتها الخاصة.

### 4. إعداد Supabase

```bash
cd supabase

# ربط المشروع المحلي بمشروع Supabase
supabase link --project-ref YOUR_PROJECT_REF

# تطبيق جميع ترحيلات قاعدة البيانات (61 ترحيل)
supabase db push

cd ..
```

### 5. إعداد Firebase

- ضع ملف `google-services.json` في `android/app/`
- ضع ملف `GoogleService-Info.plist` في `ios/Runner/`
- فعّل App Check في Firebase Console

> **ملاحظة:** إذا لم يكن Firebase متوفراً، يعمل التطبيق بشكل طبيعي بدون إشعارات Push و App Check.

### 6. توليد الكود (Code Generation)

```bash
dart run build_runner build --delete-conflicting-outputs
```

للتوليد المستمر أثناء التطوير:

```bash
dart run build_runner watch --delete-conflicting-outputs
```

### 7. تشغيل التطبيق

```bash
# باستخدام سكريبت التشغيل (الطريقة الموصى بها)
./run.sh dev                          # بيئة التطوير
./run.sh dev -d <device-id>           # مع تحديد الجهاز
./run.sh staging -d chrome            # بيئة الاختبار
./run.sh prod --release               # بيئة الإنتاج (مع تأكيد)
```

أو يدوياً:

```bash
flutter run \
  --dart-define=SUPABASE_URL=https://xxx.supabase.co \
  --dart-define=SUPABASE_ANON_KEY=eyJ... \
  --dart-define=ENV=development
```

> **ملاحظة أمان:** في بيئة الإنتاج، يتطلب سكريبت `run.sh` تأكيداً يدوياً قبل التشغيل لمنع التشغيل العرضي على قاعدة بيانات الإنتاج.

---

## هيكل المشروع والملفات

### الشجرة الهيكلية الكاملة

```
spark-app/
├── lib/                              # الكود المصدري الرئيسي
│   ├── main.dart                     # نقطة الدخول وتهيئة الخدمات
│   ├── app.dart                      # Widget الجذر (SparkApp)
│   ├── firebase_options.dart         # إعدادات Firebase المولّدة
│   │
│   ├── core/                         # البنية التحتية الأساسية
│   │   ├── config/
│   │   │   └── app_config.dart       # إعدادات البيئة (dart-define)
│   │   ├── constants/
│   │   │   ├── app_sizing.dart       # ثوابت الأبعاد
│   │   │   └── app_spacing.dart      # ثوابت التباعد
│   │   ├── di/
│   │   │   └── providers.dart        # حقن التبعيات (Riverpod Providers)
│   │   ├── extensions/
│   │   │   └── context_extensions.dart
│   │   ├── l10n/                     # الترجمة (عربي/إنجليزي)
│   │   │   ├── app_localizations.dart
│   │   │   ├── locale_provider.dart
│   │   │   └── strings/             # نصوص مترجمة لكل ميزة (20+ ملف)
│   │   ├── services/                 # الخدمات المركزية
│   │   │   ├── analytics_service.dart
│   │   │   ├── supabase_analytics_service.dart
│   │   │   ├── app_lifecycle_service.dart
│   │   │   ├── error_reporting.dart  # تكامل Sentry
│   │   │   ├── notification_service.dart
│   │   │   ├── offline_cache_service.dart
│   │   │   ├── realtime_service.dart # اشتراكات Supabase Realtime
│   │   │   └── sound_service.dart
│   │   ├── theme/
│   │   │   ├── app_theme.dart        # ThemeData (Warm Dark)
│   │   │   ├── colors.dart           # رموز الألوان
│   │   │   ├── gradients.dart        # التدرجات اللونية
│   │   │   └── animations.dart       # منحنيات الحركة
│   │   └── utils/
│   │       ├── image_utils.dart
│   │       └── validators.dart
│   │
│   ├── data/                         # طبقة البيانات
│   │   ├── datasources/              # مصادر بيانات محلية (للتطوير فقط)
│   │   │   ├── chat_datasource.dart
│   │   │   ├── likes_datasource.dart
│   │   │   ├── match_datasource.dart
│   │   │   └── profile_datasource.dart
│   │   ├── models/                   # نماذج البيانات (14+ نموذج)
│   │   │   ├── profile.dart
│   │   │   ├── match_model.dart
│   │   │   ├── chat_conversation.dart
│   │   │   ├── message.dart
│   │   │   ├── photo_share.dart      # لحظات بنمط Locket
│   │   │   ├── friendship.dart
│   │   │   ├── streak.dart
│   │   │   ├── moment_reaction.dart
│   │   │   ├── moment_comment.dart
│   │   │   ├── message_reaction.dart
│   │   │   ├── daily_prompt.dart
│   │   │   ├── explore_moment.dart
│   │   │   ├── notification_payload.dart
│   │   │   └── ...
│   │   ├── repositories/             # المستودعات (واجهات + تنفيذات)
│   │   │   ├── chat_repository.dart           # واجهة
│   │   │   ├── supabase_chat_repository.dart   # تنفيذ Supabase
│   │   │   ├── match_repository.dart
│   │   │   ├── supabase_match_repository.dart
│   │   │   ├── profile_repository.dart
│   │   │   ├── supabase_profile_repository.dart
│   │   │   ├── friends_repository.dart
│   │   │   ├── supabase_friends_repository.dart
│   │   │   ├── moments_repository.dart
│   │   │   ├── supabase_moments_repository.dart
│   │   │   ├── streak_repository.dart
│   │   │   ├── supabase_streak_repository.dart
│   │   │   ├── privacy_repository.dart
│   │   │   ├── supabase_privacy_repository.dart
│   │   │   ├── safety_repository.dart
│   │   │   ├── supabase_safety_repository.dart
│   │   │   ├── likes_repository.dart
│   │   │   ├── supabase_likes_repository.dart
│   │   │   └── feedback_repository.dart
│   │   └── services/
│   │       ├── camera_service.dart
│   │       ├── storage_service.dart
│   │       └── photo_storage_service.dart
│   │
│   ├── features/                     # الميزات (23 وحدة)
│   │   ├── auth/                     # المصادقة
│   │   ├── chat/                     # قائمة المحادثات
│   │   ├── conversation/             # المحادثة الفردية
│   │   ├── explore/                  # اكتشاف الملفات الشخصية
│   │   ├── camera/                   # الكاميرا والفلاتر والمحرر
│   │   ├── moments/                  # لحظات الصور
│   │   ├── feed/                     # خلاصة اللحظات العامة
│   │   ├── friends/                  # نظام الصداقة
│   │   ├── likes/                    # الإعجابات
│   │   ├── streaks/                  # سلاسل المراسلة
│   │   ├── privacy/                  # إعدادات الخصوصية
│   │   ├── safety/                   # الحظر والإبلاغ
│   │   ├── verification/             # التحقق من الهوية
│   │   ├── account/                  # إعدادات الحساب
│   │   ├── profile_setup/            # إعداد الملف الشخصي
│   │   ├── onboarding/               # تجربة البدء
│   │   ├── dashboard/                # لوحة التحكم الإدارية
│   │   ├── spark_check/              # فحص Spark
│   │   ├── feedback/                 # ملاحظات المستخدمين
│   │   ├── splash/                   # شاشة البدء
│   │   └── widget/                   # iOS Home Widget
│   │
│   ├── navigation/
│   │   ├── app_router.dart           # تهيئة GoRouter
│   │   └── transitions.dart          # انتقالات صفحات مخصصة
│   │
│   ├── shared/                       # مكونات مشتركة
│   │   ├── mixins/
│   │   ├── utils/
│   │   └── widgets/                  # 22+ عنصر واجهة قابل لإعادة الاستخدام
│   │
│   └── widgets/
│       └── bottom_nav_bar.dart       # شريط التنقل السفلي (5 تبويبات)
│
├── test/                             # اختبارات الوحدة (165+ ملف)
├── integration_test/                 # اختبارات التكامل
├── supabase/                         # إعدادات Supabase
│   ├── config.toml                   # إعدادات CLI
│   ├── migrations/                   # ترحيلات قاعدة البيانات (61 ملف SQL)
│   ├── seed_data.sql                 # بيانات اختبارية
│   └── reset_database.sql            # إعادة تعيين القاعدة
│
├── assets/                           # الأصول
│   ├── fonts/                        # خط Poppins (5 أوزان)
│   ├── images/                       # أيقونات SVG وصور اختبارية
│   ├── shaders/                      # 12 فلتر GLSL للكاميرا
│   ├── lottie/                       # رسوم متحركة Lottie
│   └── sounds/                       # مؤثرات صوتية
│
├── .github/workflows/                # CI/CD (GitHub Actions)
│   ├── pr_checks.yml                 # فحوصات طلبات الدمج
│   ├── device_tests.yml              # اختبارات على أجهزة حقيقية
│   └── release.yml                   # بناء إصدارات تلقائي
│
├── android/                          # إعدادات Android
├── ios/                              # إعدادات iOS + SparkWidget
├── pubspec.yaml                      # التبعيات
├── run.sh                            # سكريبت التشغيل متعدد البيئات
├── .env.example                      # قالب متغيرات البيئة
├── .env.dev                          # بيئة التطوير
├── .env.staging                      # بيئة الاختبار
└── .env.production                   # بيئة الإنتاج
```

### شرح المجلدات الرئيسية

#### `core/` — البنية التحتية الأساسية

يحتوي على جميع الخدمات والأدوات المشتركة التي تعتمد عليها الميزات:

- **`config/app_config.dart`** — يقرأ متغيرات البيئة المحقونة عبر `--dart-define` ويحدد البيئة الحالية (تطوير/اختبار/إنتاج). لا يحتوي على أي أسرار مباشرة.
- **`di/providers.dart`** — نقطة حقن التبعيات المركزية. يُنشئ جميع مزودات المستودعات والخدمات مع التبديل التلقائي بين التنفيذ المحلي و Supabase.
- **`services/`** — الخدمات المركزية: التحليلات، الإشعارات، الاشتراكات الفورية، التخزين المؤقت، تقارير الأخطاء.
- **`l10n/strings/`** — نصوص مترجمة مفصولة حسب الميزة (20+ ملف) لدعم العربية والإنجليزية.
- **`theme/`** — نظام التصميم الموحد بما في ذلك الألوان والتدرجات ومنحنيات الحركة.

#### `data/` — طبقة البيانات

تتبع نمط Repository Pattern:

- **`models/`** — نماذج البيانات غير القابلة للتغيير (immutable) مع دعم Freezed و JSON Serializable.
- **`repositories/`** — كل مستودع له واجهة مجردة (`XRepository`) وتنفيذ Supabase (`SupabaseXRepository`). المستودعات المحلية (`LocalX`) متوفرة للتطوير بدون Supabase.
- **`datasources/`** — بيانات محلية وهمية للتطوير فقط.

#### `features/` — الوحدات الوظيفية

كل ميزة في مجلدها المستقل بنمط موحد:

```
features/feature_name/
├── feature_page.dart          # صفحة الواجهة الرئيسية
├── feature_provider.dart      # مزود الحالة (Riverpod AsyncNotifier)
└── widgets/                   # عناصر واجهة خاصة بالميزة
    ├── widget_a.dart
    └── widget_b.dart
```

---

## آلية الاتصال بـ Supabase

### تهيئة الاتصال

يتم تهيئة Supabase في `main.dart` قبل بدء التطبيق:

```dart
// main.dart — مقتطف مبسط
if (AppConfig.isAppConfigured) {
  await Supabase.initialize(
    url: AppConfig.supabaseUrl,
    anonKey: AppConfig.supabaseAnonKey,
    authOptions: const FlutterAuthClientOptions(
      authFlowType: AuthFlowType.pkce,  // تدفق PKCE آمن
    ),
    debug: AppConfig.enableSupabaseDebugLogs,
  );
}
```

- **`AppConfig.isAppConfigured`** — يتحقق من أن `SUPABASE_URL` و `SUPABASE_ANON_KEY` ليسا فارغين وليسا قيماً افتراضية (placeholders).
- **PKCE Flow** — يُستخدم تدفق PKCE للمصادقة لتعزيز الأمان.
- **سجلات التصحيح** — تُفعّل فقط في بيئتي التطوير والاختبار في وضع Debug.

### مزود عميل Supabase

```dart
// core/di/providers.dart
final supabaseClientProvider = Provider<SupabaseClient>((ref) {
  return Supabase.instance.client;
});
```

جميع المستودعات تحصل على العميل عبر هذا المزود، مما يضمن نقطة وصول واحدة.

### نمط التبديل التلقائي (Auto-Switch Pattern)

```dart
// مثال: مزود مستودع المحادثات
final chatRepositoryProvider = Provider<ChatRepository>((ref) {
  if (AppConfig.isAppConfigured) {
    return SupabaseChatRepository(ref.watch(supabaseClientProvider));
  }
  return LocalChatRepository();  // بيانات وهمية للتطوير
});
```

> **ملاحظة إنتاجية:** في بيئة الإنتاج، `AppConfig.isAppConfigured` يكون دائماً `true`، ولا يتم إنشاء المستودعات المحلية أبداً.

### خدمات Supabase المستخدمة

| الخدمة | الاستخدام |
|--------|----------|
| **Auth** | تسجيل الدخول (بريد/كلمة مرور، Google OAuth، OTP عبر SMS/البريد)، إنشاء الحسابات، إعادة تعيين كلمة المرور، حذف الحساب |
| **Database (PostgreSQL)** | 61 ترحيل تغطي: الملفات الشخصية، المطابقات، المحادثات، الرسائل، اللحظات، الصداقات، السلاسل، التحليلات، وأكثر |
| **Realtime** | اشتراكات فورية للمطابقات الجديدة واللحظات والرسائل والتفاعلات عبر قنوات متعددة |
| **Storage** | تخزين الصور الشخصية ولحظات الصور في Buckets مخصصة |
| **RPC (Remote Procedure Calls)** | دوال مخصصة: `get_user_conversations`، `mark_messages_read`، `process_swipe`، `delete_user_account`، وأخرى |
| **Row Level Security (RLS)** | سياسات أمان على مستوى الصف لحماية بيانات المستخدمين |

### الاشتراكات الفورية (Realtime)

يستخدم المشروع بنية **قناة مركزية (Hub Channel)** لتحسين الأداء:

```dart
// core/services/realtime_service.dart — مقتطف مبسط
class RealtimeService {
  // قناة واحدة مُضاعَفة للمطابقات + اللحظات + التفاعلات
  RealtimeChannel? _hubChannel;

  // قنوات محادثة فردية (قصيرة العمر — تُفتح وتُغلق مع شاشة المحادثة)
  final Map<String, RealtimeChannel> _conversationChannels = {};

  void subscribeToHub({
    void Function(Map<String, dynamic>)? onNewMatch,
    void Function(Map<String, dynamic>)? onNewMoment,
    void Function(Map<String, dynamic>)? onNewReaction,
    void Function(Map<String, dynamic>)? onNewComment,
  }) {
    // قناة واحدة بدلاً من 3 قنوات منفصلة
    // عند 100K مستخدم: ~400K قناة بدلاً من ~800K
  }
}
```

> **تحسين الأداء:** عند 100,000 مستخدم متزامن، تقلل البنية المُضاعَفة عدد القنوات من ~800,000 إلى ~400,000.

---

## ميزات التطبيق ووظائفه

### 1. نظام المصادقة (`features/auth/`)

| الوظيفة | الوصف |
|---------|-------|
| تسجيل الدخول بالبريد | بريد إلكتروني + كلمة مرور عبر `signInWithPassword` |
| تسجيل الدخول بـ Google | OAuth عبر Google Sign-In SDK + Supabase `signInWithIdToken` |
| إنشاء حساب | تسجيل بالبريد مع إرسال OTP للتحقق |
| التحقق من البريد | إدخال رمز OTP المرسل للبريد عبر `verifyOTP` |
| OTP عبر SMS | تسجيل الدخول برقم الهاتف |
| استعادة كلمة المرور | تدفق ثلاثي: إرسال OTP → التحقق → تعيين كلمة مرور جديدة |
| حذف الحساب | استدعاء RPC `delete_user_account` مع تنظيف شامل |
| تسجيل الخروج | تنظيف الجلسة + إزالة Push Token + مسح التخزين المحلي |

**متطلبات كلمة المرور:** 8 أحرف على الأقل، حرف كبير، حرف صغير، رقم.

**حالات المصادقة:**

```
unknown → unauthenticated → emailVerificationPending → authenticated
```

### 2. اكتشاف الملفات الشخصية (`features/explore/`)

- واجهة تمرير بطاقات (Card Swiper) مع إعجاب وتمرير و Super Like.
- محرك توصيات ذكي يأخذ بالاعتبار: الاهتمامات المشتركة، النشاط، الشهرة، اكتمال الملف، المسافة.
- تصفية حسب الجنس والعمر والموقع الجغرافي (PostGIS).

### 3. المحادثات والمراسلة (`features/chat/` + `features/conversation/`)

- قائمة محادثات مع عدد الرسائل غير المقروءة.
- مراسلة فورية مع مؤشرات الكتابة.
- إرسال صور ورسائل نصية.
- تفاعلات Emoji على الرسائل.
- ردود على اللحظات (Moment Replies).
- تحديثات فورية عبر Supabase Realtime مع آلية إعادة المحاولة.

### 4. لحظات الصور — Locket Style (`features/camera/` + `features/moments/`)

- كاميرا مدمجة مع 12 فلتر GLSL (warm, cool, vintage, film, b&w, dreamy, vivid, golden_hour, night, soft, hdr, noir).
- أدوات تحرير: رسم حر، طبقات نصية، ملصقات.
- مشاركة اللحظات مع المطابقات أو الأصدقاء أو الجميع.
- اقتراحات يومية ("Spark of the Day").
- تفاعلات Emoji وتعليقات على اللحظات.

### 5. نظام الصداقة (`features/friends/`)

- إرسال واستقبال طلبات الصداقة.
- نظام Spark Code لمشاركة الملف الشخصي.
- مزامنة جهات الاتصال.
- أصدقاء مقربون (Close Friends).

### 6. سلاسل المراسلة (`features/streaks/`)

- تتبع سلاسل المراسلة اليومية بين المستخدمين.
- فترات سماح (Grace Periods) لمنع فقدان السلسلة.
- احتفالات عند بلوغ معالم (3, 7, 14, 30, 50, 100 يوم).
- تذكيرات عبر إشعارات محلية قبل انتهاء السلسلة.

### 7. الخصوصية والأمان (`features/privacy/` + `features/safety/`)

- **تحقق تدريجي** — 5 مستويات: `none` → `emailVerified` → `phoneVerified` → `photoVerified` → `idVerified`.
- **إخفاء الصور** — الصور تظهر ضبابية حتى الوصول لمستوى التحقق المطلوب.
- **طلبات الكشف** — يمكن للمستخدم طلب رؤية الصور المخفية بموافقة الطرف الآخر.
- **حظر وإبلاغ** — نظام كامل مع حظر ظلي (shadowban) عند التكرار.

### 8. إعدادات الحساب (`features/account/`)

- تحرير الملف الشخصي (الاسم، العمر، السيرة، الاهتمامات، الصور).
- تفضيلات الاكتشاف (الجنس، العمر، المسافة).
- إعدادات الإشعارات.
- صفحة المساعدة والدعم.

### 9. لوحة التحكم الإدارية (`features/dashboard/`)

- مقاييس صحة الخوارزمية (معدل المطابقة، زمن الاستجابة).
- تقارير العدالة.
- إدارة التجارب (A/B Testing).

### 10. التدفق المنطقي للتطبيق

```
┌──────────────────────────────────────────────────────────┐
│                     المستخدم (UI)                         │
│  LoginPage → ExplorePage → ChatPage → ConversationPage   │
└─────────────────────┬────────────────────────────────────┘
                      │ أحداث المستخدم (تسجيل، تمرير، إرسال)
                      ▼
┌──────────────────────────────────────────────────────────┐
│               مزودات الحالة (Providers)                   │
│  AuthNotifier → ExploreNotifier → ChatNotifier           │
│  (AsyncNotifier + Riverpod)                              │
└─────────────────────┬────────────────────────────────────┘
                      │ استدعاءات المستودعات
                      ▼
┌──────────────────────────────────────────────────────────┐
│              المستودعات (Repositories)                    │
│  SupabaseChatRepository  ←→  ChatRepository (interface)  │
│  SupabaseMatchRepository ←→  MatchRepository (interface) │
└─────────────────────┬────────────────────────────────────┘
                      │ استعلامات SQL / RPC
                      ▼
┌──────────────────────────────────────────────────────────┐
│                  Supabase Backend                         │
│  PostgreSQL + Auth + Realtime + Storage                  │
└──────────────────────────────────────────────────────────┘
```

---

## نماذج البيانات

### الجدول المرجعي لنماذج البيانات الأساسية

| النموذج | الموقع | الحقول الرئيسية | الغرض |
|---------|--------|----------------|-------|
| **Profile** | `data/models/profile.dart` | `id`, `name`, `age`, `imageAssetPath`, `photos`, `interests`, `personalityTraits`, `bio`, `gender`, `dateOfBirth`, `locationLat/Lng`, `verificationLevel`, `photoVisibility`, `sparkCode`, `recommendationScore` | الملف الشخصي مع مستويات التحقق وإعدادات الخصوصية |
| **Match** | `data/models/match_model.dart` | `id`, `profile`, `matchedAt`, `hasUnreadMessage`, `hasNewPhoto` | مطابقة بين مستخدمين |
| **ChatConversation** | `data/models/chat_conversation.dart` | `id`, `match`, `messages`, `friendshipId`, `relation`, `unreadCount`, `lastMomentUrl` | محادثة مع نوع العلاقة (صديق/مطابقة/كلاهما) |
| **Message** | `data/models/message.dart` | `id`, `senderId`, `type`, `text`, `photoPath`, `sentAt`, `isRead`, `replyToMomentId`, `reactions` | رسالة نصية/صورة/رد على لحظة |
| **PhotoShare** | `data/models/photo_share.dart` | `id`, `senderProfileId`, `receiverProfileId`, `photoPath`, `sharedAt`, `caption`, `isPublic` | لحظة صورة بنمط Locket |
| **Friendship** | `data/models/friendship.dart` | `id`, `senderId`, `receiverId`, `status`, `isCloseFriend` | علاقة صداقة بحالات (معلق/مقبول/محظور) |
| **Streak** | `data/models/streak.dart` | `id`, `user1Id`, `user2Id`, `currentCount`, `expiresAt`, `graceUsedCount` | سلسلة مراسلة يومية مع فترات سماح |

### التعدادات (Enums) المهمة

```dart
enum AuthStatus { unknown, unauthenticated, authenticated, emailVerificationPending }
enum VerificationLevel { none, emailVerified, phoneVerified, photoVerified, idVerified }
enum PhotoVisibility { everyone, matchesOnly, hidden }
enum MessageType { text, photo, momentReply }
enum ConversationRelation { friend, match, both }
enum FriendshipStatus { pending, accepted, blocked }
```

---

## إدارة الحالة وتدفق البيانات

يستخدم المشروع **Flutter Riverpod** مع نمط **AsyncNotifier** لإدارة الحالة بشكل موحد عبر جميع الميزات.

### مزودات الحالة الرئيسية

| المزود | النوع | الحالة | الغرض |
|--------|------|--------|-------|
| `authProvider` | `AsyncNotifier<AuthStatus>` | حالة المصادقة | تحكم بتسجيل الدخول/الخروج والتوجيه |
| `currentUserProvider` | `Notifier<Profile>` | الملف الشخصي الحالي | مزامنة مع Supabase عند المصادقة |
| `chatProvider` | `AsyncNotifier<ChatState>` | قائمة المحادثات + المطابقات | اشتراكات فورية + تخزين مؤقت |
| `conversationProvider` | `AutoDisposeFamilyAsyncNotifier` | رسائل المحادثة الفردية | تُنشأ وتُدمّر مع شاشة المحادثة |
| `exploreProvider` | `AsyncNotifier` | بطاقات الاكتشاف | محرك التوصيات والتمرير |
| `momentsProvider` | `AsyncNotifier` | خلاصة اللحظات | اشتراكات فورية للحظات والتفاعلات |
| `friendsProvider` | `AsyncNotifier` | قائمة الأصدقاء والطلبات | إدارة الصداقات |
| `streakProvider` | `AsyncNotifier` | السلاسل النشطة | تتبع وتذكيرات |
| `localeProvider` | `StateNotifier<Locale>` | اللغة الحالية | عربي/إنجليزي |

### مزودات البنية التحتية

| المزود | الغرض |
|--------|-------|
| `supabaseClientProvider` | مثيل `SupabaseClient` المشترك |
| `realtimeServiceProvider` | خدمة الاشتراكات الفورية (auto-dispose) |
| `analyticsServiceProvider` | خدمة التحليلات المركبة (auto-dispose) |
| `offlineCacheProvider` | خدمة التخزين المؤقت للعمل بدون إنترنت |
| `appLifecycleServiceProvider` | خدمة دورة حياة التطبيق |
| `camerasProvider` | قائمة الكاميرات المتاحة |

---

## نظام التوجيه والملاحة

يستخدم التطبيق **GoRouter** مع إعادة توجيه ذكية مبنية على حالة المصادقة واكتمال الملف الشخصي.

### خريطة المسارات

```
/splash                     # شاشة البدء (التحميل الأولي)
/login                      # تسجيل الدخول
/signup                     # إنشاء حساب
/forgot-password            # استعادة كلمة المرور
/email-verification         # التحقق من البريد
/profile-setup              # إعداد الملف الشخصي
/onboarding                 # تجربة البدء

/                           # StatefulShellRoute (شريط التنقل السفلي)
├── /feed                   # تبويب 0: خلاصة اللحظات
├── /chat                   # تبويب 1: المحادثات
│   └── /chat/:id           # محادثة فردية
├── /camera                 # تبويب 2: الكاميرا
├── /explore                # تبويب 3: الاكتشاف
└── /account                # تبويب 4: الحساب
    ├── /account/edit
    ├── /account/notifications
    ├── /account/privacy
    ├── /account/help
    ├── /account/verification
    ├── /account/dashboard
    ├── /account/discovery
    └── /account/friends

/feedback                   # صفحة الملاحظات
/likes                      # الإعجابات
/spark-check/:checkId       # فحص Spark
/take-photo                 # حوار كاميرا بملء الشاشة
```

### منطق إعادة التوجيه

1. **غير مصادق + على splash** → يُوجَّه إلى `/login`
2. **بانتظار تحقق البريد** → يُوجَّه إلى `/email-verification`
3. **مصادق + ملف غير مكتمل** → يُوجَّه إلى `/profile-setup`
4. **مصادق + ملف مكتمل** → يُوجَّه إلى `/feed`
5. **مصادق + على صفحة مصادقة** → يُوجَّه حسب اكتمال الملف

### معالجة الإشعارات (Deep Linking)

```dart
// أنواع الإشعارات المدعومة
'new_moment'    → /feed
'new_message'   → /chat/:conversationId
'new_match'     → /chat
'streak_reminder' → /feed
'spark_check'   → /spark-check/:checkId
```

> **أمان:** يتم التحقق من صحة معرّفات الإشعارات عبر نمط UUID/ID لمنع هجمات Path Traversal.

---

## خدمات البنية التحتية

### 1. خدمة الإشعارات (`notification_service.dart`)

تدمج Firebase Cloud Messaging مع Flutter Local Notifications:

- **5 قنوات Android** — Matches, Messages, Moments, Streaks, Default.
- **وضع محلي** — يعمل بدون Firebase عبر إشعارات محلية فقط.
- **معالجة APNS** — انتظار Token على iOS قبل طلب FCM Token.
- **تسجيل Token** — يُسجَّل في جدول `push_tokens` في Supabase.

### 2. خدمة التحليلات (`analytics_service.dart`)

نظام تحليلات مركب يدعم عدة خلفيات:

**الأحداث المتتبعة (21 حدث):**

| الفئة | الأحداث |
|-------|---------|
| أساسي | `appOpen`, `swipe`, `match`, `messageSent`, `profileView`, `photoShare` |
| مصادقة | `signUp`, `signIn`, `signOut` |
| لحظات | `momentShared`, `momentViewed`, `momentReacted`, `commentAdded` |
| أمان | `userBlocked`, `userUnblocked`, `userReported` |
| أصدقاء | `friendRequestSent`, `friendAccepted` |
| تفاعل | `streakMilestone`, `profileUpdated`, `discoveryPrefsChanged` |

### 3. خدمة التخزين المؤقت (`offline_cache_service.dart`)

- تخزين المحادثات والرسائل محلياً للعمل بدون إنترنت.
- يُستخدم كـ fallback عند فشل استعلامات Supabase.
- مؤشر `isOfflineData` في حالة المحادثات لعرض تنبيه للمستخدم.

### 4. خدمة تقارير الأخطاء (`error_reporting.dart`)

- تكامل Sentry مع إرسال PII معطّل (`sendDefaultPii: false`).
- نسبة أخذ العينات: 100% في التطوير/الاختبار، 30% في الإنتاج.
- لقطات شاشة مرفقة في البيئات غير الإنتاجية فقط.
- تعيين معرّف المستخدم عند المصادقة وإزالته عند الخروج.

### 5. خدمة دورة الحياة (`app_lifecycle_service.dart`)

- تتبع حالة التطبيق (foreground/background/detached).
- تُبقي اشتراكات اللحظات نشطة حتى أثناء التنقل بين التبويبات.

---

## قاعدة البيانات والترحيلات

يحتوي المشروع على **61 ترحيل SQL** في `supabase/migrations/`:

### الفئات الرئيسية للترحيلات

| الفئة | الترحيلات | الوصف |
|-------|-----------|-------|
| **المخطط الأساسي** | `000000_base_schema` | الجداول الأساسية: profiles, matches, conversations, messages |
| **محرك التوصيات** | `000100` – `000500` | أعمدة التقييم، التوصيات الذكية، معالجة التمرير، نقاط النشاط |
| **الأمان** | `000600` – `000700`, `005500` – `005800` | مكافحة الإساءة، نقاط الثقة، تقوية RLS، تحديد المعدل |
| **الإشعارات** | `000800`, `005200` | Push Tokens، تفضيلات الإشعارات |
| **اللحظات** | `002000` – `002600` | تفاعلات اللحظات، ردود، تعليقات، لحظات عامة |
| **الصداقة** | `004000` – `004200`, `005400` | جدول الصداقات، محادثات الأصدقاء، أصدقاء مقربون |
| **المراسلة** | `004300` – `004600` | تتبع القراءة، ملخص المحادثة، دوال مساعدة |
| **السلاسل** | `002300` | سلاسل المراسلة مع فترات السماح |
| **الأداء** | `001600` – `001800`, `003500` – `003900` | فهارس، قيود، توسعة، PostGIS، معالجة دفعية |
| **التخزين** | `004700` | إعداد Buckets للصور واللحظات |
| **التحليلات** | `001900`, `003400` | أحداث التحليلات، لوحة القياسات |

### ملفات SQL المساعدة

| الملف | الغرض |
|-------|-------|
| `seed_data.sql` | بيانات اختبارية لبيئة التطوير |
| `reset_database.sql` | إعادة تعيين كاملة لقاعدة البيانات |
| `load_simulation.sql` | محاكاة حمل لاختبار الأداء |
| `verify_and_restore.sql` | التحقق من سلامة القاعدة واستعادتها |

### الدوال المخزنة (RPCs) الرئيسية

| الدالة | الوصف |
|--------|-------|
| `get_user_conversations` | جلب محادثات المستخدم مع بيانات مُثرية (RPC أساسي) |
| `mark_messages_read` | تعليم الرسائل كمقروءة |
| `process_swipe` | معالجة التمرير وإنشاء مطابقة عند التوافق |
| `delete_user_account` | حذف الحساب مع تتابع شامل |
| `create_moment_message` | إنشاء رسالة لحظة في المحادثة |
| `create_reaction_message` | إنشاء رسالة تفاعل في المحادثة |
| `find_or_create_conversation` | إيجاد أو إنشاء محادثة بين مستخدمين |

---

## التشغيل والبناء

### التشغيل في بيئة التطوير

```bash
# الطريقة الموصى بها — سكريبت التشغيل
./run.sh dev                          # تطوير
./run.sh dev -d <device-id>           # مع تحديد الجهاز
./run.sh staging -d chrome            # اختبار على المتصفح
./run.sh prod --release               # إنتاج (يتطلب تأكيد)
```

### البناء للإنتاج

```bash
# Android APK
flutter build apk --release \
  --dart-define=SUPABASE_URL=https://xxx.supabase.co \
  --dart-define=SUPABASE_ANON_KEY=eyJ... \
  --dart-define=ENV=production

# Android App Bundle (لـ Google Play)
flutter build appbundle --release

# iOS
flutter build ios --release
```

### التحليل الثابت

```bash
flutter analyze --fatal-infos
```

### تهيئة صور الكاميرا (Shaders)

يحتوي المشروع على 12 فلتر GLSL يتم تحميلها بشكل مؤجل بعد الإطار الأول:

```
assets/shaders/
├── warm.frag       # دافئ
├── cool.frag       # بارد
├── vintage.frag    # عتيق
├── film.frag       # فيلم
├── bw.frag         # أبيض وأسود
├── dreamy.frag     # حالم
├── vivid.frag      # حيوي
├── golden_hour.frag # الساعة الذهبية
├── night.frag      # ليلي
├── soft.frag       # ناعم
├── hdr.frag        # HDR
└── noir.frag       # نوار
```

---

## الاختبارات

يحتوي المشروع على **165+ ملف اختبار** موزعة كالتالي:

### اختبارات الوحدة (`test/`)

| الفئة | العدد | أمثلة |
|-------|-------|-------|
| مزودات الحالة | 39+ | `auth_provider_test`, `chat_provider_test`, `explore_provider_test` |
| الميزات | 60+ | اختبارات UI لكل ميزة |
| الخدمات | 3+ | `analytics_service_test`, `notification_test`, `lifecycle_test` |
| النماذج | 5+ | `moment_model_test`, `message_test` |
| الترجمة | 24 | اختبار نصوص كل وحدة ترجمة |
| الإعدادات | 2+ | `app_config_test`, `app_theme_test` |

### اختبارات التكامل (`integration_test/`)

| الاختبار | الغرض |
|---------|-------|
| `auth_flow_test.dart` | تدفقات تسجيل الدخول والتسجيل والتحقق |
| `core_journey_test.dart` | رحلة المستخدم الأساسية |
| `navigation_flow_test.dart` | التنقل بين الشاشات |
| `screenshot_test.dart` | التقاط لقطات شاشة للاختبار البصري |

### تشغيل الاختبارات

```bash
# جميع اختبارات الوحدة مع التغطية
flutter test --coverage

# اختبار ملف محدد
flutter test test/providers/chat_provider_test.dart

# اختبارات التكامل
flutter test integration_test/
```

### CI/CD (GitHub Actions)

| سير العمل | الغرض |
|-----------|-------|
| `pr_checks.yml` | فحص Lint + اختبارات + بناء على كل طلب دمج |
| `device_tests.yml` | اختبارات تكامل على أجهزة حقيقية |
| `release.yml` | بناء إصدارات تلقائي لـ iOS و Android |

---

## التوسعة والصيانة

### إرشادات إضافة ميزة جديدة

1. **إنشاء مجلد الميزة** بالبنية المعيارية:

```
lib/features/new_feature/
├── new_feature_page.dart          # صفحة الواجهة
├── new_feature_provider.dart      # مزود الحالة
└── widgets/                       # عناصر واجهة خاصة
```

2. **إنشاء النموذج** في `data/models/` إذا كانت الميزة تتطلب بيانات جديدة.

3. **إنشاء المستودع** بكلا الطبقتين:
   - واجهة مجردة في `data/repositories/new_feature_repository.dart`
   - تنفيذ Supabase في `data/repositories/supabase_new_feature_repository.dart`

4. **تسجيل المزود** في `core/di/providers.dart`:

```dart
final newFeatureRepositoryProvider = Provider<NewFeatureRepository>((ref) {
  if (AppConfig.isAppConfigured) {
    return SupabaseNewFeatureRepository(ref.watch(supabaseClientProvider));
  }
  return LocalNewFeatureRepository();
});
```

5. **إضافة المسار** في `navigation/app_router.dart`.

6. **إضافة النصوص المترجمة** في `core/l10n/strings/new_feature_strings.dart`.

7. **كتابة الاختبارات** في `test/providers/` و `test/features/`.

### إرشادات تعديل خدمات Supabase

| العملية | الإجراء |
|---------|---------|
| إضافة جدول جديد | أنشئ ترحيل SQL جديد باسم تسلسلي في `supabase/migrations/` |
| تعديل جدول موجود | أنشئ ترحيل `ALTER TABLE` — **لا تعدّل الترحيلات السابقة** |
| إضافة RPC جديد | أنشئ ترحيل يحتوي على `CREATE OR REPLACE FUNCTION` |
| تعديل سياسات RLS | أنشئ ترحيل منفصل مع `DROP POLICY` و `CREATE POLICY` |
| إضافة Realtime | عدّل `RealtimeService` لإضافة اشتراك جديد في القناة المركزية |

> **تحذير:** لا تعدّل ترحيلات SQL مطبقة سابقاً. أنشئ دائماً ترحيلات جديدة.

### إرشادات الجودة

- **التحليل الثابت:** تأكد من مرور `flutter analyze --fatal-infos` بدون أخطاء.
- **الاختبارات:** اكتب اختبارات لكل ميزة جديدة ولكل Provider.
- **التسمية:** اتبع اتفاقيات Dart الرسمية (`lowerCamelCase` للمتغيرات، `UpperCamelCase` للأصناف).
- **الالتزام:** رسائل Commit وصفية ومختصرة بصيغة: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`.
- **المراجعة:** كل تعديل يمر عبر Pull Request مع فحوصات CI.

### ملاحظات أداء مهمة

- **حد ذاكرة الصور:** مُحدد بـ 100 صورة و 50 ميغابايت لتجنب OOM على الأجهزة الضعيفة.
- **تحميل Shaders المؤجل:** يتم تحميل فلاتر GLSL بعد الإطار الأول لعدم حجب بدء التطبيق.
- **تحديد عدد المحادثات في الفلتر:** حد أقصى 100 محادثة في فلتر `inFilter` لمنع timeouts في الاشتراكات الفورية.
- **نسبة مقياس النص:** مُقيّد بين 0.8x و 1.3x لمنع كسر التخطيط.

---

## المراجع والموارد

### الوثائق الرسمية

| المصدر | الرابط |
|--------|--------|
| **Flutter** | [docs.flutter.dev](https://docs.flutter.dev) |
| **Dart** | [dart.dev/guides](https://dart.dev/guides) |
| **Supabase** | [supabase.com/docs](https://supabase.com/docs) |
| **Supabase Flutter SDK** | [supabase.com/docs/reference/dart](https://supabase.com/docs/reference/dart/introduction) |
| **Supabase Realtime** | [supabase.com/docs/guides/realtime](https://supabase.com/docs/guides/realtime) |
| **Supabase Auth** | [supabase.com/docs/guides/auth](https://supabase.com/docs/guides/auth) |
| **Supabase Storage** | [supabase.com/docs/guides/storage](https://supabase.com/docs/guides/storage) |
| **Flutter Riverpod** | [riverpod.dev](https://riverpod.dev) |
| **GoRouter** | [pub.dev/packages/go_router](https://pub.dev/packages/go_router) |
| **Sentry Flutter** | [docs.sentry.io/platforms/flutter](https://docs.sentry.io/platforms/flutter/) |
| **Firebase Cloud Messaging** | [firebase.google.com/docs/cloud-messaging](https://firebase.google.com/docs/cloud-messaging) |

### تبعيات المشروع الأساسية

| الحزمة | الإصدار | الغرض |
|--------|---------|-------|
| `flutter_riverpod` | ^2.6.1 | إدارة الحالة |
| `supabase_flutter` | ^2.8.2 | عميل Supabase |
| `go_router` | ^14.8.1 | التوجيه |
| `camera` | ^0.11.0+2 | الكاميرا |
| `sentry_flutter` | ^8.12.0 | تتبع الأخطاء |
| `firebase_messaging` | ^16.1.1 | الإشعارات |
| `firebase_core` | ^4.4.0 | Firebase الأساسي |
| `firebase_app_check` | ^0.4.1+4 | أمان Firebase |
| `google_sign_in` | ^6.2.1 | تسجيل Google |
| `cached_network_image` | ^3.4.1 | تخزين الصور مؤقتاً |
| `flutter_card_swiper` | ^7.0.0 | واجهة التمرير |
| `flutter_secure_storage` | ^9.2.3 | تخزين آمن مشفّر |
| `shared_preferences` | ^2.3.3 | تخزين محلي بسيط |
| `freezed_annotation` | ^2.4.4 | توليد نماذج بيانات |
| `home_widget` | ^0.7.0 | iOS/Android Home Widget |
| `lottie` | ^3.3.1 | رسوم متحركة |
| `image` | ^4.5.2 | معالجة الصور |

---

<div align="center">

**مبني بـ Flutter و Supabase**

</div>
