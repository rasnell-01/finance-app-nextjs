export const types = [
    'Income', 'Expense', 'Investment', 'Saving'
]

export const categories = [
    {
        group: "Housing & Utilities",
        items: [
            'Cable/Satellite TV',
            'Cell Phone',
            'CDD Fees',
            'Electricity',
            'Gas',
            'HOA Fees',
            'Home Cleaning',
            'Home Improvements',
            'Home Maintenance & Repairs',
            'Home Security',
            'Homeowners Insurance',
            'Internet',
            'Landscaping & Lawn Care',
            'Mortgage',
            'Moving Expenses',
            'Pest Control',
            'Phone',
            'Property Taxes',
            'Rent',
            'Renters Insurance',
            'Streaming Services',
            'Trash Service',
            'Water & Sewer',
        ],
    },
    {
        group: "Transportation",
        items: [
            'Auto Loan Interest',
            'Auto Repairs',
            'Bicycle Maintenance',
            'Car Insurance',
            'Car Payment',
            'Car Washes',
            'Fuel',
            'Motorcycle Expenses',
            'Parking',
            'Parking Tickets',
            'Public Transit',
            'Ridesharing',
            'Taxis',
            'Tolls',
            'Traffic Fines',
            'Vehicle License & Fees',
            'Vehicle Maintenance',
            'Vehicle Registration',
        ],
    },
    {
        group: "Health & Medical",
        items: [
            'Chiropractic Care',
            'Dental',
            'Fitness/Gym Memberships',
            'Health Supplements',
            'Hospital Stay',
            'Medical',
            'Medical Bills',
            'Medical Equipment',
            'Medical Insurance',
            'Mental Health/Counseling',
            'Over-the-Counter Medications',
            'Personal Trainer',
            'Physical Therapy',
            'Prescriptions',
            'Specialist Visit',
            'Surgery',
            'Urgent Care',
            'Vision',
        ],
    },
    {
        group: "Food & Groceries",
        items: [
            'Alcohol',
            'Coffee Shops',
            'Farmer\'s Market',
            'Fast Food',
            'Groceries',
            'Meal Kit Delivery',
            'Office Coffee/Snacks',
            'Restaurants',
            'Snacks',
            'Takeout/Delivery',
            'Work Lunches',
        ],
    },
    {
        group: "Education & Childcare",
        items: [
            'After-School Programs',
            'Babysitter',
            'Books & Supplies',
            'Childcare',
            'Courses & Certifications',
            'Daycare',
            'School Activity Fees',
            'School Lunches',
            'Student Loans',
            'Summer Camp',
            'Tuition',
            'Tutoring',
        ],
    },
    {
        group: "Savings & Investments",
        items: [
            '401(k) Contributions',
            '529 Plan',
            'Bonds',
            'Brokerage Account',
            'CDs',
            'College Fund',
            'Dividends Received',
            'Emergency Fund',
            'Investments',
            'IRA Contributions',
            'Retirement Contributions',
            'Savings',
        ],
    },
    {
        group: "Personal Care & Shopping",
        items: [
            'Accessories',
            'Clothing',
            'Haircuts',
            'Hygiene',
            'Laundry & Dry Cleaning',
            'Makeup & Cosmetics',
            'Nail Care',
            'Personal Care',
            'Salon & Spa',
            'Shoes',
            'Skincare Products',
            'Toiletries',
        ],
    },
    {
        group: "Shopping & Household",
        items: [
            'Appliances',
            'Bedding & Linens',
            'Books & Media',
            'Cleaning Supplies',
            'Computers & Accessories',
            'Decor',
            'Electronics',
            'Furniture',
            'Gadgets',
            'Gifts',
            'Home Goods',
            'Household Supplies',
            'Magazines',
            'Movies',
            'Music',
            'Online Purchases',
            'Phones & Tablets',
        ],
    },
    {
        group: "Entertainment & Leisure",
        items: [
            'Amusement Parks',
            'Arcade & Games',
            'Board Games',
            'Clubs & Memberships',
            'Concerts & Shows',
            'Craft Supplies',
            'Entertainment',
            'Hobbies',
            'Movies & Events',
            'Outdoor Gear',
            'Social Events',
            'Sporting Events',
            'Sports & Recreation',
            'Streaming Services',
        ],
    },
    {
        group: "Travel",
        items: [
            'Flights',
            'Hotels',
            'Luggage',
            'Passport Fees',
            'Rental Cars',
            'Travel',
            'Travel Insurance',
            'Travel Supplies',
            'Vacations',
        ],
    },
    {
        group: "Gifts, Donations, & Giving",
        items: [
            'Birthday Gifts',
            'Charitable Donations',
            'Fundraisers',
            'Gifts',
            'GoFundMe/Online Giving',
            'Holiday Gifts',
            'Religious Donations',
            'Wedding Gifts',
        ],
    },
    {
        group: "Pets",
        items: [
            'Adoption Fees',
            'Pet Boarding',
            'Pet Food',
            'Pet Grooming',
            'Pet Insurance',
            'Pet Medications',
            'Pet Supplies',
            'Pets',
            'Vet Bills',
        ],
    },
    {
        group: "Insurance",
        items: [
            'Auto Insurance',
            'Health Insurance',
            'Home Insurance',
            'Life Insurance',
            'Pet Insurance',
            'Renters Insurance',
            'Travel Insurance',
        ],
    },
    {
        group: "Taxes",
        items: [
            'Capital Gains Tax',
            'Federal Income Tax',
            'Local Income Tax',
            'Other Taxes',
            'Property Taxes',
            'Sales Tax',
            'Self-Employment Tax',
            'State Income Tax',
            'Tax Preparation Fees',
        ],
    },
    {
        group: "Miscellaneous & Fees",
        items: [
            'App Subscriptions',
            'ATM Fees',
            'Bank Fees',
            'Credit Card Interest',
            'Fees & Charges',
            'Late Fees',
            'Legal Fees',
            'Loan Interest',
            'Miscellaneous/Other',
            'Returned Check Fee',
            'Subscriptions',
        ],
    },
    {
        group: "Business/Work Related",
        items: [
            'Business Travel',
            'Client Entertainment',
            'Commuting',
            'Conference Fees',
            'Continuing Education',
            'Home Office Expenses',
            'Office Supplies',
            'Professional Dues',
            'Work Supplies',
            'Work Uniforms',
        ],
    },
];

export const allCategories = categories.flatMap(g => g.items);

export const dateRangeValues = [
    'last24hours',
    'last7days',
    'last30days',
    'last90days',
    'last180days',
    'last365days',
    'all_time'
]

export const initialState = {
    message: '',
    error: false,
    errors: {},
}

export const themeColors = {
    'system': 'system',
    'light': 'light',
    'dark': 'dark',
}

export const CURRENCY_SYMBOLS = [
    { code: "USD", symbol: "$", label: "US Dollar" },
    { code: "EUR", symbol: "€", label: "Euro" },
    { code: "GBP", symbol: "£", label: "British Pound" },
    { code: "JPY", symbol: "¥", label: "Japanese Yen" },
    { code: "CAD", symbol: "$", label: "Canadian Dollar" },
    { code: "AUD", symbol: "$", label: "Australian Dollar" },
    { code: "CHF", symbol: "CHF", label: "Swiss Franc" },
    { code: "CNY", symbol: "¥", label: "Chinese Yuan" },
    { code: "INR", symbol: "₹", label: "Indian Rupee" },
    { code: "KRW", symbol: "₩", label: "South Korean Won" },
    { code: "RUB", symbol: "₽", label: "Russian Ruble" },
    { code: "BRL", symbol: "R$", label: "Brazilian Real" },
    { code: "ZAR", symbol: "R", label: "South African Rand" },
    { code: "MXN", symbol: "$", label: "Mexican Peso" },
    { code: "SGD", symbol: "$", label: "Singapore Dollar" },
];
