# 🎨 מדריך ויזואלי ומפתח - גרסה 3.3

## 📋 תוכן עניינים
1. [תכונות חדשות בגרסה 3.3](#תכונות-חדשות-בגרסה-33)
2. [ווידג'ט מידע כלכלי](#ווידגט-מידע-כלכלי)
3. [סטטוס נתונים](#סטטוס-נתונים)
4. [מחשבון שכר נוסף](#מחשבון-שכר-נוסף)
5. [ערכים ריאליים אינפלציוניים](#ערכים-ריאליים-אינפלציוניים)
6. [הנחיות מפתח מתקדמות](#הנחיות-מפתח-מתקדמות)
7. [ייצוא נתונים](#ייצוא-נתונים)

---

## 🆕 תכונות חדשות בגרסה 3.3

### ✨ שכר נוסף ללא הפרשות סוציאליות
- הוספת שכר נוסף ללא ניכויים סוציאליים
- אפשרות להגדיר אם השכר קבוע או לא
- שמירה ב-localStorage

### 🎯 ניווט משופר
- לחיצה על סליידר מובילה ישירות לכותרת המחשבון
- תיקון בעיית הסתרת כותרות מתחת לסליידר

### 💸 ערכים ריאליים אינפלציוניים
- כפתור הצגה/הסתרה לערכים ריאליים
- חישוב שחיקה אינפלציונית במחשבוני חיסכון ופרישה

### 💱 מידע כלכלי בכותרת
- הצגת שער דולר ואינפלציה בראש הדף
- תאריכי עדכון לכל נתון

---

## 📱 ווידג'ט מידע כלכלי

### תצוגה בכותרת הסליידר:
```
┌───────────────────────────────────────────┐
│  שער דולר    │    אינפלציה שנתית        │
│  ₪3.62       │       2.8%                │
│  5/2         │       5/2                 │
├───────────────────────────────────────────┤
│   💰        📈         🏖️                │
│   שכר      חיסכון     פרישה              │
└───────────────────────────────────────────┘
```

**תכונות:**
- ✅ **תצוגה קומפקטית** - בראש הדף עם הסליידר
- ✅ **עדכון אוטומטי** - בטעינת הדף
- ✅ **תאריכים** - תאריך עדכון עבור כל נתון
- ✅ **רספונסיבי** - מתאים לנייד ודסקטופ

### קוד HTML:
```html
<div class="economic-header">
    <div class="economic-item">
        <div class="economic-label">שער דולר</div>
        <div class="economic-value" id="usdRateDisplay">טוען...</div>
        <div class="economic-date" id="usdRateDate"></div>
    </div>
    <div class="economic-item">
        <div class="economic-label">אינפלציה שנתית</div>
        <div class="economic-value" id="inflationRateDisplay">טוען...</div>
        <div class="economic-date" id="inflationRateDate"></div>
    </div>
</div>
```

---

## 💼 מחשבון שכר נוסף

### תצוגה:
```
┌─────────────────────────────────────────┐
│  ➕ הוסף שכר ללא הפרשות סוציאליות ▼  │
└─────────────────────────────────────────┘
          ↓ (לאחר לחיצה)
┌─────────────────────────────────────────┐
│  שכר נוסף ללא הפרשות (₪):             │
│  [________]                             │
│                                         │
│  ☑ שכר זה הוא קבוע (יחושב בסה"כ שנתי)│
│                                         │
│  💡 שכר זה לא יופקדו בגינו ניכויים     │
│     סוציאליים (פנסיה, קה"ש, ב"ל)     │
└─────────────────────────────────────────┘
```

### תוצאות:
```
┌─────────────────────────────────────────┐
│  נטו בבנק (חודשי):        ₪15,234     │
│  מס הכנסה:                ₪5,432      │
│  בט"ל ובריאות:            ₪1,234      │
│  ═════════════════════════════════      │
│  💡 שכר נוסף (ללא הפרשות):            │
│     ₪3,000 (קבוע - נכלל בסה"כ שנתי)  │
└─────────────────────────────────────────┘
```

### לוגיקת חישוב:
```javascript
// שכר נוסף מתווסף לחישוב מס בלבד
const totalIncome = bruto + additionalSalary;
const tax = calculateIncomeTax(totalIncome);

// ניכויים סוציאליים רק על השכר הרגיל
const btl = bruto * deductions.BTL_RATE;
const totalPensionDeduction = bruto * deductions.TOTAL_PENSION_DEDUCTION;

// נטו = הכנסה כוללת - מס - ניכויים (רק על שכר רגיל)
const neto = totalIncome - tax - btl - totalPensionDeduction;

// בסיכום שנתי - השכר הנוסף נכלל רק אם מסומן כקבוע
const yearlyAdditional = isAdditionalRegular ? (additionalSalary * 12) : 0;
const yearlyTotal = yearlyNeto + yearlyPension + yearlyProvident + yearlyAdditional;
```

---

## 💸 ערכים ריאליים אינפלציוניים

### מחשבון תחזית חיסכון:
```
┌───────────────────────────────────────────┐
│  פנסיה צפויה:           ₪1,234,567      │
│  קה"ש צפויה:            ₪456,789        │
│  ══════════════════════════════════       │
│  הון בפרישה:            ₪1,691,356      │
│                                           │
│  [💸 הצג ערך ריאלי (לאחר אינפלציה)]    │
└───────────────────────────────────────────┘
          ↓ (לאחר לחיצה)
┌───────────────────────────────────────────┐
│  ╔═══════════════════════════════════╗   │
│  ║ 💸 ערך ריאלי (לאחר שחיקה         ║   │
│  ║    אינפלציונית)                   ║   │
│  ║                                    ║   │
│  ║    ₪1,234,567                     ║   │
│  ║                                    ║   │
│  ║ מחושב לפי אינפלציה ממוצעת של     ║   │
│  ║ 2.8% לשנה                         ║   │
│  ╚═══════════════════════════════════╝   │
│                                           │
│  [💸 הסתר ערך ריאלי]                    │
└───────────────────────────────────────────┘
```

### נוסחת חישוב:
```javascript
// ערך נומינלי (מה שנצבר בחשבון)
const nominalValue = 1691356;

// שנות חיסכון
const years = 20;

// שיעור אינפלציה שנתי
const inflationRate = 0.028; // 2.8%

// ערך ריאלי (כוח קנייה של היום)
const realValue = nominalValue / Math.pow(1 + inflationRate, years);
// = 1,691,356 / 1.7317 = ₪976,540

console.log(`אובדן כוח קנייה: ₪${nominalValue - realValue}`);
// אובדן: ₪714,816 (42.3%)
```

---

## 🔧 הנחיות מפתח מתקדמות

### 1. שינוי תצורת מס הכנסה

**מיקום:** שורות 907-915

```javascript
TAX_BRACKETS: [
    { limit: 7010, rate: 0.10 },    // מדרגה 1: עד 7,010 - 10%
    { limit: 10060, rate: 0.14 },   // מדרגה 2: 7,010-10,060 - 14%
    { limit: 15712, rate: 0.20 },   // מדרגה 3: 10,060-15,712 - 20%
    { limit: 22160, rate: 0.31 },   // מדרגה 4: 15,712-22,160 - 31%
    { limit: 37970, rate: 0.35 },   // מדרגה 5: 22,160-37,970 - 35%
    { limit: 54300, rate: 0.47 },   // מדרגה 6: 37,970-54,300 - 47%
    { limit: Infinity, rate: 0.50 } // מדרגה 7: מעל 54,300 - 50%
]
```

**דוגמה - עדכון לשנת 2027 (הערכה):**
```javascript
TAX_BRACKETS: [
    { limit: 7500, rate: 0.10 },
    { limit: 10800, rate: 0.14 },
    { limit: 16800, rate: 0.20 },
    { limit: 23700, rate: 0.31 },
    { limit: 40600, rate: 0.35 },
    { limit: 58100, rate: 0.47 },
    { limit: Infinity, rate: 0.50 }
]
```

### 2. שינוי שיעורי ניכויים סוציאליים

**מיקום:** שורות 925-932

```javascript
DEDUCTIONS: {
    BTL_RATE: 0.067,                    // ביטוח לאומי + בריאות (6.7%)
    TOTAL_PENSION_DEDUCTION: 0.186,     // פנסיה כולל (18.6%)
    EMPLOYEE_PENSION: 0.07,             // חלק העובד בפנסיה (7%)
    EMPLOYER_PENSION: 0.083,            // חלק המעסיק בפנסיה (8.3%)
    EMPLOYEE_STUDY_FUND: 0.025,         // חלק העובד בקה"ש (2.5%)
    EMPLOYER_STUDY_FUND: 0.075          // חלק המעסיק בקה"ש (7.5%)
}
```

**דוגמה - הורדת שיעורי פנסיה:**
```javascript
DEDUCTIONS: {
    BTL_RATE: 0.067,
    TOTAL_PENSION_DEDUCTION: 0.165,     // הופחת מ-18.6% ל-16.5%
    EMPLOYEE_PENSION: 0.06,             // הופחת מ-7% ל-6%
    EMPLOYER_PENSION: 0.07,             // הופחת מ-8.3% ל-7%
    EMPLOYEE_STUDY_FUND: 0.025,
    EMPLOYER_STUDY_FUND: 0.075
}
```

### 3. שינוי מקדמי המרה לפנסיה

**מיקום:** שורות 939-957 (פונקציית `getPensionFactor`)

```javascript
function getPensionFactor(age) {
    // מקדמים עבור פנסיה
    const factors = {
        60: 190, 61: 198, 62: 206, 63: 215,
        64: 224, 65: 233, 66: 243, 67: 253,
        68: 264, 69: 275, 70: 287
    };
    return factors[age] || 253; // ברירת מחדל לגיל 67
}
```

**דוגמה - עדכון מקדמים:**
```javascript
function getPensionFactor(age) {
    const factors = {
        60: 185, 61: 193, 62: 201, 63: 210,
        64: 219, 65: 228, 66: 238, 67: 248,
        68: 259, 69: 270, 70: 282
    };
    return factors[age] || 248;
}
```

### 4. שינוי ברירות מחדל

**מיקום:** שורות 960-967

```javascript
DEFAULTS: {
    INFLATION_RATE: 0.025,      // 2.5% אינפלציה
    USD_RATE: 3.6,              // שער דולר ברירת מחדל
    LIFE_EXPECTANCY: 90,        // תוחלת חיים
    DEFAULT_INTEREST: 0.03      // ריבית ברירת מחדל 3%
}
```

### 5. הוספת מדרגת מס חדשה

```javascript
// שלב 1: הוסף את המדרגה החדשה
TAX_BRACKETS: [
    { limit: 7010, rate: 0.10 },
    { limit: 10060, rate: 0.14 },
    { limit: 15712, rate: 0.20 },
    { limit: 22160, rate: 0.31 },
    { limit: 30000, rate: 0.33 },   // ← מדרגה חדשה
    { limit: 37970, rate: 0.35 },
    { limit: 54300, rate: 0.47 },
    { limit: Infinity, rate: 0.50 }
]

// שלב 2: הפונקציה calculateIncomeTax תעבוד אוטומטית
// אין צורך בשינויים נוספים!
```

### 6. שינוי ערכי ברירת מחדל לשדות קלט

**בטעינת הדף (שורות 1984-1987):**
```javascript
document.getElementById('dep_years').value = d.dY || "10";  // שנות הפקדה
document.getElementById('total_years').value = d.tY || "20"; // שנות חיסכון
document.getElementById('roi').value = d.roi || "3";         // ריבית
```

**שינוי:**
```javascript
document.getElementById('dep_years').value = d.dY || "15";   // ← שונה ל-15
document.getElementById('total_years').value = d.tY || "25"; // ← שונה ל-25
document.getElementById('roi').value = d.roi || "4";         // ← שונה ל-4%
```

### 7. שינוי סף מינימום לחישוב שכר

**מיקום:** שורה 1596

```javascript
if (bruto < 5000) {  // ← סף נוכחי: 5,000 ₪
    resBox.style.display = 'none'; 
    return; 
}
```

**שינוי:**
```javascript
if (bruto < 7000) {  // ← סף חדש: 7,000 ₪
    resBox.style.display = 'none'; 
    return; 
}
```

### 8. הוספת שדה קלט חדש

**דוגמה: הוספת גיל נוכחי למחשבון הפרישה**

```html
<!-- HTML - הוסף אחרי גיל פרישה -->
<div>
    <label>גיל נוכחי:</label>
    <input type="number" id="currentAge" value="30" 
           oninput="calculateSplitPension()">
</div>
```

```javascript
// JavaScript - עדכן את החישוב (שורה 1752)
// במקום:
const currentAge = 30; // ערך קבוע

// שנה ל:
const currentAge = parseInt(document.getElementById('currentAge').value) || 30;
```

```javascript
// localStorage - הוסף שמירה (שורה 1968)
stopAge: document.getElementById('stopDepositAge').value,
retireAge: document.getElementById('retirementAge').value,
currentAge: document.getElementById('currentAge').value,  // ← הוסף
withdrawals: document.getElementById('withdrawalCount').value,
```

```javascript
// localStorage - הוסף טעינה (שורה 1991)
if(d.stopAge) document.getElementById('stopDepositAge').value = d.stopAge;
if(d.retireAge) document.getElementById('retirementAge').value = d.retireAge;
if(d.currentAge) document.getElementById('currentAge').value = d.currentAge; // ← הוסף
if(d.withdrawals) document.getElementById('withdrawalCount').value = d.withdrawals;
```

### 9. שינוי צבעים ועיצוב

**כותרות מחשבונים:**
```css
.salary-title { color: #007aff; }   /* כחול */
.savings-title { color: #5856d6; }  /* סגול */
.pension-title { color: #2c3e50; }  /* אפור כהה */
```

**תיבות סיכום:**
```css
.summary-box { 
    background: #5856d6; /* סגול */
    color: white; 
}
```

**שינוי ל-gradient:**
```css
.summary-box { 
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white; 
}
```

### 10. שינוי פורמט תאריכים

**מיקום:** שורה 1095 (פונקציית `fetchUSDRate`)

```javascript
// פורמט נוכחי: 5/2
const now = new Date();
headerDate.innerHTML = `${now.getDate()}/${now.getMonth() + 1}`;
```

**שינוי לפורמט מלא:**
```javascript
const now = new Date();
const day = String(now.getDate()).padStart(2, '0');
const month = String(now.getMonth() + 1).padStart(2, '0');
const year = now.getFullYear();
headerDate.innerHTML = `${day}/${month}/${year}`;
// תוצאה: 05/02/2026
```

**שינוי לפורמט עברי:**
```javascript
const now = new Date();
headerDate.innerHTML = now.toLocaleDateString('he-IL', {
    day: 'numeric',
    month: 'short'
});
// תוצאה: 5 בפבר׳
```

---

## 📤 ייצוא נתונים

### פונקציה לייצוא כל הנתונים

```javascript
/**
 * פונקציה לייצוא כל הנתונים של המשתמש
 * @returns {Object} אובייקט JSON עם כל הנתונים
 */
function exportUserData() {
    return {
        version: "3.3",
        timestamp: new Date().toISOString(),
        salary: {
            bruto: parseNumber(document.getElementById('bruto_display').value),
            additionalSalary: parseNumber(document.getElementById('additional_salary')?.value || "0"),
            additionalIsRegular: document.getElementById('additional_salary_regular')?.checked || false,
            neto: parseNumber(document.getElementById('r_neto')?.innerText.replace('₪', '') || "0"),
            yearlyNeto: parseNumber(document.getElementById('s_neto')?.innerText.replace('₪', '') || "0"),
            yearlyPension: parseNumber(document.getElementById('s_pension')?.innerText.replace('₪', '') || "0"),
            yearlyProvident: parseNumber(document.getElementById('s_ksh')?.innerText.replace('₪', '') || "0"),
            yearlyTotal: parseNumber(document.getElementById('s_yearly_total')?.innerText.replace('₪', '') || "0")
        },
        savings: {
            pensionStart: parseNumber(document.getElementById('p_start').value),
            providentStart: parseNumber(document.getElementById('k_start').value),
            pensionMonthly: parseNumber(document.getElementById('p_mon').value),
            providentMonthly: parseNumber(document.getElementById('k_mon').value),
            depositYears: parseInt(document.getElementById('dep_years').value) || 0,
            totalYears: parseInt(document.getElementById('total_years').value) || 0,
            roi: parseFloat(document.getElementById('roi').value) || 0,
            expectedPension: parseNumber(document.getElementById('res_p')?.innerText.replace('₪', '') || "0"),
            expectedProvident: parseNumber(document.getElementById('res_k')?.innerText.replace('₪', '') || "0"),
            totalExpected: parseNumber(document.getElementById('res_total')?.innerText.replace('₪', '') || "0")
        },
        retirement: {
            pensionFund: parseNumber(document.getElementById('pensionFund').value),
            providentFund: parseNumber(document.getElementById('providentFund').value),
            stopDepositAge: parseInt(document.getElementById('stopDepositAge').value) || 0,
            retirementAge: parseInt(document.getElementById('retirementAge').value) || 0,
            withdrawalCount: parseInt(document.getElementById('withdrawalCount').value) || 0,
            gender: document.getElementById('gender').value,
            avgMonthlyIncome: parseNumber(document.getElementById('avgIncome')?.innerText.replace('₪', '') || "0")
        },
        economic: {
            usdRate: APP_STATE.usdRate || 3.6,
            inflationRate: APP_STATE.inflationRate || 0.025,
            lastUpdate: {
                usd: APP_STATE.lastDataUpdate.usd,
                inflation: APP_STATE.lastDataUpdate.inflation
            }
        }
    };
}

/**
 * הורדת הנתונים כקובץ JSON
 */
function downloadUserData() {
    const data = exportUserData();
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `financial-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
}
```

### שמירת היסטוריה וניתוח מגמות

```javascript
/**
 * שמירת snapshot חודשי של הנתונים
 */
function saveMonthlySnapshot() {
    const snapshots = JSON.parse(localStorage.getItem('monthlySnapshots') || '[]');
    const currentData = exportUserData();
    
    snapshots.push({
        date: new Date().toISOString(),
        data: currentData
    });
    
    // שמור רק 24 חודשים אחרונים
    if (snapshots.length > 24) {
        snapshots.shift();
    }
    
    localStorage.setItem('monthlySnapshots', JSON.stringify(snapshots));
}

/**
 * ניתוח מגמות לאורך זמן
 */
function analyzeTrends() {
    const snapshots = JSON.parse(localStorage.getItem('monthlySnapshots') || '[]');
    
    if (snapshots.length < 2) {
        return {
            message: "אין מספיק נתונים היסטוריים לניתוח מגמות",
            minRequired: 2,
            current: snapshots.length
        };
    }
    
    const first = snapshots[0].data;
    const last = snapshots[snapshots.length - 1].data;
    
    const savingsGrowth = last.savings.totalExpected - first.savings.totalExpected;
    const monthlyIncomeChange = last.salary.neto - first.salary.neto;
    
    return {
        period: `${snapshots.length} חודשים`,
        savingsGrowth: savingsGrowth,
        savingsGrowthPercent: ((savingsGrowth / first.savings.totalExpected) * 100).toFixed(1),
        monthlyIncomeChange: monthlyIncomeChange,
        monthlyIncomeChangePercent: ((monthlyIncomeChange / first.salary.neto) * 100).toFixed(1),
        snapshots: snapshots
    };
}

/**
 * קבלת דוח מגמות בפורמט קריא
 */
function getTrendsReport() {
    const trends = analyzeTrends();
    
    if (trends.message) {
        return trends.message;
    }
    
    return `
📊 דוח מגמות פיננסיות - ${trends.period}

💰 שינויים בחיסכון:
   גידול: ₪${trends.savingsGrowth.toLocaleString()} (${trends.savingsGrowthPercent}%)

💵 שינויים בהכנסה:
   שינוי בנטו חודשי: ₪${trends.monthlyIncomeChange.toLocaleString()} (${trends.monthlyIncomeChangePercent}%)
    `.trim();
}
```

### שימוש בפונקציות

```html
<!-- כפתור ייצוא נתונים -->
<button onclick="downloadUserData()" 
        style="width: 100%; padding: 12px; 
               background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
               color: white; border: none; border-radius: 12px; 
               font-weight: bold; cursor: pointer; margin-top: 15px;">
    📥 ייצא נתונים ל-JSON
</button>

<!-- כפתור הצגת מגמות -->
<button onclick="alert(getTrendsReport())" 
        style="width: 100%; padding: 12px; 
               background: linear-gradient(135deg, #34c759 0%, #32d74b 100%); 
               color: white; border: none; border-radius: 12px; 
               font-weight: bold; cursor: pointer; margin-top: 15px;">
    📈 הצג ניתוח מגמות
</button>

<!-- כפתור שמירת snapshot -->
<button onclick="saveMonthlySnapshot(); alert('✅ הנתונים נשמרו בהצלחה!');" 
        style="width: 100%; padding: 12px; 
               background: linear-gradient(135deg, #ff9500 0%, #ff6b00 100%); 
               color: white; border: none; border-radius: 12px; 
               font-weight: bold; cursor: pointer; margin-top: 15px;">
    💾 שמור snapshot חודשי
</button>
```

---

## 🔐 אבטחה ופרטיות

### הגנה על נתונים רגישים:

```javascript
/**
 * ייצוא נתונים מאובטח (ללא פרטים מזהים)
 */
function exportUserDataSafely() {
    const data = exportUserData();
    
    // הסר נתונים רגישים אם יש
    delete data.personalInfo;
    delete data.identifiers;
    
    // המר למספרים יחסיים במקום מוחלטים (אופציונלי)
    const salaryBase = data.salary.bruto;
    if (salaryBase > 0) {
        data.salary = {
            bruto: 100, // בסיס
            additionalPercent: (data.salary.additionalSalary / salaryBase * 100).toFixed(1),
            netoPercent: (data.salary.neto / salaryBase * 100).toFixed(1),
            yearlyTotalPercent: (data.salary.yearlyTotal / (salaryBase * 12) * 100).toFixed(1)
        };
    }
    
    return data;
}
```

### גיבוי אוטומטי

```javascript
/**
 * גיבוי אוטומטי של הנתונים
 */
function enableAutoBackup() {
    // שמור snapshot אוטומטית כל חודש
    const lastBackup = localStorage.getItem('lastBackupDate');
    const now = new Date();
    
    if (!lastBackup || isNewMonth(lastBackup, now)) {
        saveMonthlySnapshot();
        localStorage.setItem('lastBackupDate', now.toISOString());
        console.log('✅ גיבוי אוטומטי בוצע בהצלחה');
    }
}

function isNewMonth(lastDate, currentDate) {
    const last = new Date(lastDate);
    const current = new Date(currentDate);
    
    return last.getMonth() !== current.getMonth() || 
           last.getFullYear() !== current.getFullYear();
}

// הפעל בטעינת הדף
window.addEventListener('load', enableAutoBackup);
```

---

**עודכן לאחרונה: 05/02/2026**  
**גרסה: 3.3**  
**מחבר: Claude + Human Collaboration**
