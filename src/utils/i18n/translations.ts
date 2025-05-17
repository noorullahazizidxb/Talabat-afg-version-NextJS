// Define all supported languages
export const SUPPORTED_LANGUAGES = {
  en: {
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: 'h:mm A',
  },
  ar: {
    name: 'Arabic',
    nativeName: 'العربية',
    direction: 'rtl',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'h:mm A',
  },
  hi: {
    name: 'Hindi',
    nativeName: 'हिन्दी',
    direction: 'ltr',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'h:mm A',
  },
  ur: {
    name: 'Urdu',
    nativeName: 'اردو',
    direction: 'rtl',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'h:mm A',
  }
}

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES

// Define translation namespaces
export const NAMESPACES = {
  common: 'common',
  auth: 'auth',
  restaurants: 'restaurants',
  checkout: 'checkout',
  profile: 'profile',
  errors: 'errors',
}

// Define translation keys by namespace
export type TranslationKeys = {
  [NAMESPACES.common]: {
    'app.name': string
    'app.tagline': string
    'nav.home': string
    'nav.restaurants': string
    'nav.offers': string
    'nav.orders': string
    'nav.profile': string
    'nav.help': string
    'nav.language': string
    'nav.logout': string
    'nav.login': string
    'footer.about': string
    'footer.contact': string
    'footer.terms': string
    'footer.privacy': string
    'footer.copyright': string
    'actions.search': string
    'actions.filter': string
    'actions.sort': string
    'actions.apply': string
    'actions.cancel': string
    'actions.save': string
    'actions.edit': string
    'actions.delete': string
    'actions.confirm': string
    'actions.back': string
    'actions.next': string
    'actions.submit': string
    'actions.close': string
  }
  [NAMESPACES.auth]: {
    'login.title': string
    'login.email': string
    'login.password': string
    'login.forgotPassword': string
    'login.rememberMe': string
    'login.submit': string
    'login.noAccount': string
    'login.createAccount': string
    'login.socialLogin': string
    'login.continueWith': string
    'signup.title': string
    'signup.firstName': string
    'signup.lastName': string
    'signup.email': string
    'signup.phone': string
    'signup.password': string
    'signup.confirmPassword': string
    'signup.terms': string
    'signup.submit': string
    'signup.haveAccount': string
    'signup.login': string
    'logout.confirm': string
    'logout.success': string
    'errors.invalidCredentials': string
    'errors.requiredField': string
    'errors.invalidEmail': string
    'errors.invalidPhone': string
    'errors.passwordMismatch': string
    'errors.weakPassword': string
    'errors.termsRequired': string
  }
  [NAMESPACES.restaurants]: {
    'list.title': string
    'list.filter': string
    'list.sort': string
    'list.search': string
    'list.noResults': string
    'list.loading': string
    'filter.cuisine': string
    'filter.price': string
    'filter.rating': string
    'filter.delivery': string
    'filter.offers': string
    'sort.recommended': string
    'sort.rating': string
    'sort.deliveryTime': string
    'sort.price': string
    'details.menu': string
    'details.reviews': string
    'details.info': string
    'details.hours': string
    'details.address': string
    'details.delivery': string
    'details.minimum': string
    'menu.categories': string
    'menu.popular': string
    'menu.addToCart': string
    'menu.customize': string
    'menu.quantity': string
  }
  [NAMESPACES.checkout]: {
    'cart.title': string
    'cart.empty': string
    'cart.items': string
    'cart.subtotal': string
    'cart.delivery': string
    'cart.tax': string
    'cart.total': string
    'cart.checkout': string
    'cart.clear': string
    'cart.continue': string
    'address.title': string
    'address.select': string
    'address.add': string
    'address.edit': string
    'address.delete': string
    'address.default': string
    'payment.title': string
    'payment.methods': string
    'payment.card': string
    'payment.cash': string
    'payment.add': string
    'review.title': string
    'review.items': string
    'review.address': string
    'review.payment': string
    'review.submit': string
    'success.title': string
    'success.message': string
    'success.tracking': string
    'success.continue': string
  }
  [NAMESPACES.profile]: {
    'title': string
    'info': string
    'addresses': string
    'payments': string
    'orders': string
    'preferences': string
    'info.name': string
    'info.email': string
    'info.phone': string
    'info.update': string
    'addresses.title': string
    'addresses.add': string
    'addresses.edit': string
    'addresses.delete': string
    'addresses.default': string
    'addresses.form.title': string
    'addresses.form.street': string
    'addresses.form.building': string
    'addresses.form.apartment': string
    'addresses.form.city': string
    'addresses.form.instructions': string
    'orders.title': string
    'orders.past': string
    'orders.upcoming': string
    'orders.noOrders': string
    'orders.reorder': string
    'orders.track': string
    'orders.details': string
    'preferences.title': string
    'preferences.notifications': string
    'preferences.email': string
    'preferences.sms': string
    'preferences.language': string
    'preferences.theme': string
  }
  [NAMESPACES.errors]: {
    'general': string
    'network': string
    'notFound': string
    'unauthorized': string
    'forbidden': string
    'server': string
    'validation': string
    'timeout': string
    'retry': string
    'offline': string
  }
}

// Define the translation type
export type Translation = {
  [K in keyof TranslationKeys]: TranslationKeys[K]
}

// English translations
export const en: Translation = {
  common: {
    'app.name': 'Talabat',
    'app.tagline': 'Order food online from your favorite restaurants',
    'nav.home': 'Home',
    'nav.restaurants': 'Restaurants',
    'nav.offers': 'Offers',
    'nav.orders': 'Orders',
    'nav.profile': 'Profile',
    'nav.help': 'Help',
    'nav.language': 'Language',
    'nav.logout': 'Logout',
    'nav.login': 'Login',
    'footer.about': 'About Us',
    'footer.contact': 'Contact Us',
    'footer.terms': 'Terms of Service',
    'footer.privacy': 'Privacy Policy',
    'footer.copyright': '© 2025 Talabat. All rights reserved.',
    'actions.search': 'Search',
    'actions.filter': 'Filter',
    'actions.sort': 'Sort',
    'actions.apply': 'Apply',
    'actions.cancel': 'Cancel',
    'actions.save': 'Save',
    'actions.edit': 'Edit',
    'actions.delete': 'Delete',
    'actions.confirm': 'Confirm',
    'actions.back': 'Back',
    'actions.next': 'Next',
    'actions.submit': 'Submit',
    'actions.close': 'Close',
  },
  auth: {
    'login.title': 'Sign in to your account',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.forgotPassword': 'Forgot your password?',
    'login.rememberMe': 'Remember me',
    'login.submit': 'Sign in',
    'login.noAccount': 'Don\'t have an account?',
    'login.createAccount': 'Create a new account',
    'login.socialLogin': 'Or continue with',
    'login.continueWith': 'Continue with',
    'signup.title': 'Create a new account',
    'signup.firstName': 'First Name',
    'signup.lastName': 'Last Name',
    'signup.email': 'Email',
    'signup.phone': 'Phone Number (optional)',
    'signup.password': 'Password',
    'signup.confirmPassword': 'Confirm Password',
    'signup.terms': 'I agree to the Terms of Service and Privacy Policy',
    'signup.submit': 'Create Account',
    'signup.haveAccount': 'Already have an account?',
    'signup.login': 'Sign in',
    'logout.confirm': 'Are you sure you want to logout?',
    'logout.success': 'You have been logged out successfully',
    'errors.invalidCredentials': 'Invalid email or password',
    'errors.requiredField': 'This field is required',
    'errors.invalidEmail': 'Please enter a valid email address',
    'errors.invalidPhone': 'Please enter a valid phone number',
    'errors.passwordMismatch': 'Passwords do not match',
    'errors.weakPassword': 'Password must be at least 8 characters with at least 1 letter and 1 number',
    'errors.termsRequired': 'You must agree to the terms and conditions',
  },
  restaurants: {
    'list.title': 'Restaurants',
    'list.filter': 'Filter',
    'list.sort': 'Sort',
    'list.search': 'Search restaurants',
    'list.noResults': 'No restaurants found',
    'list.loading': 'Loading restaurants',
    'filter.cuisine': 'Cuisine',
    'filter.price': 'Price Range',
    'filter.rating': 'Rating',
    'filter.delivery': 'Delivery Time',
    'filter.offers': 'Offers',
    'sort.recommended': 'Recommended',
    'sort.rating': 'Rating',
    'sort.deliveryTime': 'Delivery Time',
    'sort.price': 'Price',
    'details.menu': 'Menu',
    'details.reviews': 'Reviews',
    'details.info': 'Information',
    'details.hours': 'Opening Hours',
    'details.address': 'Address',
    'details.delivery': 'Delivery Time',
    'details.minimum': 'Minimum Order',
    'menu.categories': 'Categories',
    'menu.popular': 'Popular Items',
    'menu.addToCart': 'Add to Cart',
    'menu.customize': 'Customize',
    'menu.quantity': 'Quantity',
  },
  checkout: {
    'cart.title': 'Your Cart',
    'cart.empty': 'Your cart is empty',
    'cart.items': 'Items',
    'cart.subtotal': 'Subtotal',
    'cart.delivery': 'Delivery Fee',
    'cart.tax': 'Tax',
    'cart.total': 'Total',
    'cart.checkout': 'Checkout',
    'cart.clear': 'Clear Cart',
    'cart.continue': 'Continue Shopping',
    'address.title': 'Delivery Address',
    'address.select': 'Select Address',
    'address.add': 'Add New Address',
    'address.edit': 'Edit Address',
    'address.delete': 'Delete Address',
    'address.default': 'Default Address',
    'payment.title': 'Payment Method',
    'payment.methods': 'Payment Methods',
    'payment.card': 'Credit/Debit Card',
    'payment.cash': 'Cash on Delivery',
    'payment.add': 'Add Payment Method',
    'review.title': 'Review Order',
    'review.items': 'Order Items',
    'review.address': 'Delivery Address',
    'review.payment': 'Payment Method',
    'review.submit': 'Place Order',
    'success.title': 'Order Placed Successfully',
    'success.message': 'Your order has been placed successfully',
    'success.tracking': 'Track Order',
    'success.continue': 'Continue Shopping',
  },
  profile: {
    'title': 'Profile',
    'info': 'Personal Information',
    'addresses': 'Addresses',
    'payments': 'Payment Methods',
    'orders': 'Orders',
    'preferences': 'Preferences',
    'info.name': 'Name',
    'info.email': 'Email',
    'info.phone': 'Phone',
    'info.update': 'Update Information',
    'addresses.title': 'Saved Addresses',
    'addresses.add': 'Add New Address',
    'addresses.edit': 'Edit Address',
    'addresses.delete': 'Delete Address',
    'addresses.default': 'Set as Default',
    'addresses.form.title': 'Address Title',
    'addresses.form.street': 'Street',
    'addresses.form.building': 'Building',
    'addresses.form.apartment': 'Apartment',
    'addresses.form.city': 'City',
    'addresses.form.instructions': 'Delivery Instructions',
    'orders.title': 'Your Orders',
    'orders.past': 'Past Orders',
    'orders.upcoming': 'Upcoming Orders',
    'orders.noOrders': 'No orders found',
    'orders.reorder': 'Reorder',
    'orders.track': 'Track Order',
    'orders.details': 'Order Details',
    'preferences.title': 'Preferences',
    'preferences.notifications': 'Notifications',
    'preferences.email': 'Email Notifications',
    'preferences.sms': 'SMS Notifications',
    'preferences.language': 'Language',
    'preferences.theme': 'Theme',
  },
  errors: {
    'general': 'Something went wrong',
    'network': 'Network error. Please check your connection',
    'notFound': 'Page not found',
    'unauthorized': 'You need to login to access this page',
    'forbidden': 'You do not have permission to access this page',
    'server': 'Server error. Please try again later',
    'validation': 'Please check the form for errors',
    'timeout': 'Request timed out. Please try again',
    'retry': 'Retry',
    'offline': 'You are offline. Please check your connection',
  }
}

// Arabic translations (partial example)
export const ar: Partial<Translation> = {
  common: {
    'app.name': 'طلبات',
    'app.tagline': 'اطلب الطعام عبر الإنترنت من مطاعمك المفضلة',
    'nav.home': 'الرئيسية',
    'nav.restaurants': 'المطاعم',
    'nav.offers': 'العروض',
    'nav.orders': 'الطلبات',
    'nav.profile': 'الملف الشخصي',
    'nav.help': 'المساعدة',
    'nav.language': 'اللغة',
    'nav.logout': 'تسجيل الخروج',
    'nav.login': 'تسجيل الدخول',
    'footer.about': 'من نحن',
    'footer.contact': 'اتصل بنا',
    'footer.terms': 'شروط الخدمة',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.copyright': '© 2025 طلبات. جميع الحقوق محفوظة.',
    'actions.search': 'بحث',
    'actions.filter': 'تصفية',
    'actions.sort': 'ترتيب',
    'actions.apply': 'تطبيق',
    'actions.cancel': 'إلغاء',
    'actions.save': 'حفظ',
    'actions.edit': 'تعديل',
    'actions.delete': 'حذف',
    'actions.confirm': 'تأكيد',
    'actions.back': 'رجوع',
    'actions.next': 'التالي',
    'actions.submit': 'إرسال',
    'actions.close': 'إغلاق',
  },
  auth: {
    'login.title': 'تسجيل الدخول إلى حسابك',
    'login.email': 'البريد الإلكتروني',
    'login.password': 'كلمة المرور',
    'login.forgotPassword': 'نسيت كلمة المرور؟',
    'login.rememberMe': 'تذكرني',
    'login.submit': 'تسجيل الدخول',
    'login.noAccount': 'ليس لديك حساب؟',
    'login.createAccount': 'إنشاء حساب جديد',
    'login.socialLogin': 'أو المتابعة باستخدام',
    'login.continueWith': 'المتابعة باستخدام',
    'signup.title': 'إنشاء حساب جديد',
    'signup.firstName': 'الاسم الأول',
    'signup.lastName': 'اسم العائلة',
    'signup.email': 'البريد الإلكتروني',
    'signup.phone': 'رقم الهاتف (اختياري)',
    'signup.password': 'كلمة المرور',
    'signup.confirmPassword': 'تأكيد كلمة المرور',
    'signup.terms': 'أوافق على شروط الخدمة وسياسة الخصوصية',
    'signup.submit': 'إنشاء حساب',
    'signup.haveAccount': 'لديك حساب بالفعل؟',
    'signup.login': 'تسجيل الدخول',
    'logout.confirm': 'هل أنت متأكد أنك تريد تسجيل الخروج؟',
    'logout.success': 'تم تسجيل الخروج بنجاح',
    'errors.invalidCredentials': 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
    'errors.requiredField': 'هذا الحقل مطلوب',
    'errors.invalidEmail': 'يرجى إدخال عنوان بريد إلكتروني صالح',
    'errors.invalidPhone': 'يرجى إدخال رقم هاتف صالح',
    'errors.passwordMismatch': 'كلمات المرور غير متطابقة',
    'errors.weakPassword': 'يجب أن تكون كلمة المرور 8 أحرف على الأقل مع حرف واحد ورقم واحد على الأقل',
    'errors.termsRequired': 'يجب أن توافق على الشروط والأحكام',
  }
}

// Load translations based on language
export const getTranslations = (lang: SupportedLanguage): Translation => {
  switch (lang) {
    case 'ar':
      return { ...en, ...ar } as Translation
    case 'hi':
    case 'ur':
      // In a real app, these would be implemented
      return en
    default:
      return en
  }
}
