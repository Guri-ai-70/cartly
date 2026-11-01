// Cartly autofill dictionary (hidden list used only for suggestions).
// Format per line:  department | unit | Hebrew name | English name
// Departments: g = Grocery (מכולת), v = Greengrocery (ירקן), m = Meat & Fish (בשר ודגים), d = Drinks (משקאות), s = Spices (תבלינים)
// Units: u = pcs (יח׳), kg = kg (ק״ג), g = grams (גרם), pk = pack (מארז)
// To add an item later, just add a new line in the same format.
const DICT_RAW = `
v|kg|עגבניה|Tomato
v|pk|עגבניות שרי|Cherry tomatoes
v|kg|עגבניות תמר|Plum tomatoes
v|kg|מלפפון|Cucumber
v|kg|גזר|Carrot
v|kg|בצל|Onion
v|kg|בצל סגול|Red onion
v|u|בצל ירוק|Green onion
v|u|שום|Garlic
v|kg|תפוח אדמה|Potato
v|kg|בטטה|Sweet potato
v|kg|פלפל אדום|Red pepper
v|kg|פלפל צהוב|Yellow pepper
v|kg|פלפל ירוק|Green pepper
v|u|פלפל חריף|Chili pepper
v|kg|קישוא|Zucchini
v|kg|חציל|Eggplant
v|u|כרובית|Cauliflower
v|u|ברוקולי|Broccoli
v|u|כרוב לבן|White cabbage
v|u|כרוב סגול|Red cabbage
v|u|חסה|Lettuce
v|u|חסה ערבית|Romaine lettuce
v|pk|עלי בייבי|Baby leaves
v|pk|רוקט|Arugula
v|pk|תרד|Spinach
v|kg|סלק|Beetroot
v|pk|צנונית|Radishes
v|kg|לפת|Turnip
v|kg|קולרבי|Kohlrabi
v|u|סלרי|Celery
v|kg|שומר|Fennel
v|u|כרישה|Leek
v|kg|ג׳ינג׳ר|Ginger
v|pk|פטריות|Mushrooms
v|pk|פטריות פורטובלו|Portobello mushrooms
v|u|תירס|Corn
v|kg|שעועית ירוקה|Green beans
v|kg|אפונה|Peas
v|kg|במיה|Okra
v|kg|דלעת|Pumpkin
v|u|דלורית|Butternut squash
v|u|ארטישוק|Artichoke
v|u|אבוקדו|Avocado
v|pk|נבטים|Sprouts
v|u|כוסברה|Cilantro
v|u|פטרוזיליה|Parsley
v|u|שמיר|Dill
v|u|נענע|Mint
v|u|בזיליקום|Basil
v|u|רוזמרין|Rosemary
v|u|טימין|Thyme
v|u|עירית|Chives
v|kg|תפוח עץ|Apple
v|kg|תפוח עץ ירוק|Green apple
v|kg|אגס|Pear
v|kg|בננה|Banana
v|kg|תפוז|Orange
v|kg|קלמנטינה|Clementine
v|kg|מנדרינה|Mandarin
v|kg|אשכולית|Grapefruit
v|u|פומלה|Pomelo
v|kg|לימון|Lemon
v|kg|ליים|Lime
v|kg|ענבים|Grapes
v|kg|ענבים ירוקים|Green grapes
v|u|אבטיח|Watermelon
v|u|מלון|Melon
v|kg|אפרסק|Peach
v|kg|נקטרינה|Nectarine
v|kg|שזיף|Plum
v|kg|משמש|Apricot
v|kg|דובדבנים|Cherries
v|pk|תותים|Strawberries
v|pk|אוכמניות|Blueberries
v|pk|פטל|Raspberries
v|u|מנגו|Mango
v|u|אננס|Pineapple
v|kg|קיווי|Kiwi
v|kg|תאנים|Figs
v|kg|רימון|Pomegranate
v|kg|אפרסמון|Persimmon
v|u|פפאיה|Papaya
v|kg|ליצ׳י|Lychee
v|kg|חבוש|Quince
v|kg|פסיפלורה|Passion fruit
v|kg|גויאבה|Guava
v|kg|שסק|Loquat
v|u|קוקוס|Coconut
g|pk|תמרים|Dates
g|u|חלב|Milk
g|u|חלב 3%|Milk 3%
g|u|חלב 1%|Milk 1%
g|u|חלב סויה|Soy milk
g|u|חלב שקדים|Almond milk
g|u|חלב שיבולת שועל|Oat milk
g|u|שוקו|Chocolate milk
g|u|גבינה לבנה|White cheese
g|u|קוטג׳|Cottage cheese
g|u|גבינה צהובה|Yellow cheese
g|pk|גבינה צהובה פרוסה|Sliced yellow cheese
g|u|גבינת שמנת|Cream cheese
g|u|גבינה בולגרית|Bulgarian cheese
g|u|גבינת פטה|Feta cheese
g|u|מוצרלה|Mozzarella
g|pk|גבינה מגוררת|Grated cheese
g|u|פרמזן|Parmesan
g|u|לבנה|Labneh
g|u|יוגורט|Yogurt
g|u|יוגורט יווני|Greek yogurt
g|u|מעדן|Pudding
g|u|אשל|Eshel
g|u|לבן|Leben
g|u|שמנת חמוצה|Sour cream
g|u|שמנת מתוקה|Whipping cream
g|u|שמנת לבישול|Cooking cream
g|u|חמאה|Butter
g|u|מרגרינה|Margarine
g|pk|ביצים|Eggs
g|pk|ביצים L|Eggs L
g|pk|ביצים XL|Eggs XL
g|u|לחם|Bread
g|u|לחם אחיד|Standard bread
g|u|לחם מלא|Whole wheat bread
g|u|לחם שיפון|Rye bread
g|u|לחם פרוס|Sliced bread
g|u|חלה|Challah
g|pk|פיתות|Pitas
g|pk|לחמניות|Rolls
g|u|באגט|Baguette
g|u|לאפה|Laffa
g|pk|טורטיות|Tortillas
g|pk|קרקרים|Crackers
g|pk|פריכיות|Rice cakes
g|u|פירורי לחם|Breadcrumbs
g|u|קרוטונים|Croutons
g|u|אורז|Rice
g|u|אורז בסמטי|Basmati rice
g|u|אורז פרסי|Persian rice
g|u|פסטה|Pasta
g|u|ספגטי|Spaghetti
g|u|פתיתים|Ptitim
g|u|קוסקוס|Couscous
g|u|בורגול|Bulgur
g|u|קינואה|Quinoa
g|u|עדשים|Lentils
g|u|עדשים כתומות|Red lentils
g|u|חומוס יבש|Dried chickpeas
g|u|שעועית לבנה|White beans
g|u|קמח|Flour
g|u|קמח מלא|Whole wheat flour
g|u|סוכר|Sugar
g|u|סוכר חום|Brown sugar
g|u|אבקת סוכר|Powdered sugar
g|u|סוכר וניל|Vanilla sugar
s|u|מלח|Salt
s|u|פלפל שחור|Black pepper
s|u|פפריקה|Paprika
s|u|כמון|Cumin
s|u|כורכום|Turmeric
s|u|קינמון|Cinnamon
g|u|אבקת אפייה|Baking powder
g|u|סודה לשתייה|Baking soda
g|u|שמרים|Yeast
g|u|קקאו|Cocoa
g|u|שיבולת שועל|Oats
g|u|קורנפלקס|Cornflakes
g|u|דגני בוקר|Breakfast cereal
g|u|גרנולה|Granola
g|u|דבש|Honey
g|u|ריבה|Jam
g|u|ממרח שוקולד|Chocolate spread
g|u|חמאת בוטנים|Peanut butter
g|u|טחינה|Tahini
g|u|סילאן|Silan (date syrup)
g|u|שמן|Oil
g|u|שמן זית|Olive oil
g|u|שמן קנולה|Canola oil
g|u|חומץ|Vinegar
g|u|רוטב סויה|Soy sauce
g|u|קטשופ|Ketchup
g|u|מיונז|Mayonnaise
g|u|חרדל|Mustard
g|u|רסק עגבניות|Tomato paste
g|u|עגבניות מרוסקות|Crushed tomatoes
g|u|עגבניות מיובשות|Sun-dried tomatoes
g|u|רוטב עגבניות|Tomato sauce
g|u|אבקת מרק|Soup powder
g|pk|תה|Tea
g|u|קפה|Coffee
g|u|קפה נמס|Instant coffee
g|u|קפה טורקי|Turkish coffee
g|pk|קפסולות קפה|Coffee capsules
g|u|טונה|Tuna
g|u|תירס שימורים|Canned corn
g|u|חומוס שימורים|Canned chickpeas
g|u|זיתים|Olives
g|u|מלפפונים חמוצים|Pickles
g|u|פטריות שימורים|Canned mushrooms
g|u|סרדינים שימורים|Canned sardines
g|u|חומוס|Hummus
g|u|מטבוחה|Matbucha
g|u|סלט חצילים|Eggplant salad
d|pk|מים|Water
d|pk|מים מינרליים|Mineral water
d|pk|סודה|Soda water
d|u|קולה|Cola
d|u|מיץ תפוזים|Orange juice
d|u|מיץ ענבים|Grape juice
d|u|מיץ תפוחים|Apple juice
d|u|לימונדה|Lemonade
d|u|סירופ|Syrup
d|pk|בירה|Beer
d|u|יין אדום|Red wine
d|u|יין לבן|White wine
g|u|במבה|Bamba
g|u|ביסלי|Bissli
g|u|צ׳יפס|Chips
g|u|שוקולד|Chocolate
g|u|עוגיות|Cookies
g|u|ופלים|Wafers
g|u|גרעינים|Seeds
g|u|אגוזים|Nuts
g|u|שקדים|Almonds
g|u|בוטנים|Peanuts
g|u|קשיו|Cashews
g|u|פיסטוקים|Pistachios
g|u|צימוקים|Raisins
g|pk|חטיפי דגנים|Granola bars
g|u|מסטיק|Chewing gum
g|u|סוכריות|Candy
g|u|עוגה|Cake
g|u|פופקורן|Popcorn
g|u|ירקות קפואים|Frozen vegetables
g|u|אפונה קפואה|Frozen peas
g|u|צ׳יפס קפוא|Frozen fries
g|u|פיצה קפואה|Frozen pizza
g|u|בורקס|Bourekas
g|u|גלידה|Ice cream
g|u|בצק עלים|Puff pastry
g|pk|מלאווח|Malawach
g|pk|ג׳חנון|Jachnun
g|pk|קרטיבים|Popsicles
g|pk|נייר טואלט|Toilet paper
g|pk|מגבות נייר|Paper towels
g|pk|מפיות|Napkins
g|u|סבון כלים|Dish soap
g|pk|טבליות למדיח|Dishwasher tablets
g|u|אבקת כביסה|Laundry powder
g|u|ג׳ל כביסה|Laundry gel
g|u|מרכך כביסה|Fabric softener
g|u|אקונומיקה|Bleach
g|u|נוזל לניקוי רצפה|Floor cleaner
g|pk|ספוגים|Sponges
g|pk|מטליות|Cleaning cloths
g|pk|שקיות זבל|Garbage bags
g|u|נייר כסף|Aluminum foil
g|u|ניילון נצמד|Plastic wrap
g|u|נייר אפייה|Baking paper
g|pk|שקיות אוכל|Food bags
g|pk|כוסות חד פעמיות|Disposable cups
g|pk|צלחות חד פעמיות|Disposable plates
g|u|סבון|Soap
g|u|סבון נוזלי|Liquid soap
g|u|שמפו|Shampoo
g|u|מרכך שיער|Conditioner
g|u|משחת שיניים|Toothpaste
g|u|מברשת שיניים|Toothbrush
g|u|חוט דנטלי|Dental floss
g|u|דאודורנט|Deodorant
g|u|ג׳ל רחצה|Shower gel
g|pk|סכיני גילוח|Razors
g|u|קצף גילוח|Shaving foam
g|pk|טישו|Tissues
g|pk|מגבונים|Wet wipes
g|u|צמר גפן|Cotton wool
g|pk|מקלוני אוזניים|Cotton swabs
g|u|קרם ידיים|Hand cream
g|u|קרם הגנה|Sunscreen
g|pk|חיתולים|Diapers
g|u|אוכל לכלבים|Dog food
g|u|אוכל לחתולים|Cat food
m|kg|חזה עוף|Chicken breast
m|kg|שוקיים|Chicken drumsticks
m|kg|כרעיים|Chicken legs
m|kg|כנפיים|Chicken wings
m|kg|פרגיות|Boneless chicken thighs
m|u|עוף שלם|Whole chicken
m|kg|כבד עוף|Chicken liver
m|kg|לבבות עוף|Chicken hearts
m|kg|שניצל|Schnitzel
m|kg|עוף טחון|Ground chicken
m|kg|חזה הודו|Turkey breast
m|kg|שוק הודו|Turkey drumstick
m|kg|בשר טחון|Ground beef
m|kg|אנטריקוט|Entrecote (ribeye)
m|kg|סינטה|Sirloin
m|kg|פילה בקר|Beef fillet
m|kg|צלי כתף|Shoulder roast
m|kg|בשר לגולאש|Goulash beef
m|kg|אסאדו|Asado (short ribs)
m|kg|צלעות טלה|Lamb chops
m|kg|בשר כבש|Lamb
m|kg|קבב|Kebab
m|pk|המבורגרים|Hamburgers
m|kg|מרגז|Merguez
m|kg|עצמות למרק|Soup bones
m|pk|נקניקיות|Hot dogs
m|u|סלמי|Salami
m|g|פסטרמה|Pastrami
m|g|פסטרמה הודו|Turkey pastrami
m|kg|סלמון|Salmon
m|g|פילה סלמון|Salmon fillet
m|g|סלמון מעושן|Smoked salmon
m|kg|אמנון|Tilapia
m|kg|פילה אמנון|Tilapia fillet
m|kg|דניס|Sea bream
m|kg|לברק|Sea bass
m|kg|בורי|Mullet
m|kg|לוקוס|Grouper
m|kg|קרפיון|Carp
m|kg|פילה בקלה|Cod fillet
m|kg|פילה הייק|Hake fillet
m|kg|נסיכת הנילוס|Nile perch
m|kg|טרוטה|Trout
m|kg|מקרל|Mackerel
m|kg|סרדינים|Sardines
m|kg|שרימפס|Shrimp
m|kg|קלמרי|Calamari
m|kg|פילה דג|Fish fillet
m|pk|קציצות דגים|Fish balls
m|u|גפילטע פיש|Gefilte fish
m|u|הרינג|Herring
d|pk|מים בטעמים|Flavored water
d|u|תה קר|Iced tea
d|u|משקה אנרגיה|Energy drink
d|u|מיץ לימון|Lemon juice
d|u|וודקה|Vodka
d|u|ערק|Arak
s|u|פפריקה חריפה|Hot paprika
s|u|פלפל לבן|White pepper
s|u|פלפל אנגלי|Allspice
s|u|צ׳ילי גרוס|Chili flakes
s|u|זעתר|Za'atar
s|u|אורגנו|Oregano
s|u|סומאק|Sumac
s|u|בהרט|Baharat
s|u|ראס אל חנות|Ras el hanout
s|u|חוואיג׳ למרק|Hawaij for soup
s|u|חוואיג׳ לקפה|Hawaij for coffee
s|u|הל|Cardamom
s|u|ציפורן|Cloves
s|u|אגוז מוסקט|Nutmeg
s|u|ג׳ינג׳ר טחון|Ground ginger
s|u|כוסברה טחונה|Ground coriander
s|u|שום גבישי|Garlic granules
s|u|עלי דפנה|Bay leaves
s|u|שומשום|Sesame seeds
s|u|מלח גס|Coarse salt
s|u|מלח לימון|Citric acid
`;

const DICT = DICT_RAW.trim().split('\n').map(function (line) {
  const p = line.split('|');
  return { d: p[0], u: p[1], he: p[2], en: p[3] };
});
