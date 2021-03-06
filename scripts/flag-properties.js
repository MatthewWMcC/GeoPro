const countryFlagProperties = [
  { countryCode: "BD", name: "Bangladesh", properties: [] },
  { countryCode: "BE", name: "Belgium", properties: [] },
  { countryCode: "BF", name: "Burkina Faso", properties: [] },
  { countryCode: "BG", name: "Bulgaria", properties: [] },
  { countryCode: "BA", name: "Bosnia and Herzegovina", properties: [] },
  { countryCode: "BB", name: "Barbados", properties: [] },
  { countryCode: "BM", name: "Bermuda", properties: [] },
  { countryCode: "BN", name: "Brunei", properties: [] },
  { countryCode: "BO", name: "Bolivia", properties: [] },
  { countryCode: "BH", name: "Bahrain", properties: [] },
  { countryCode: "BI", name: "Burundi", properties: [] },
  { countryCode: "BJ", name: "Benin", properties: [] },
  { countryCode: "BT", name: "Bhutan", properties: [] },
  { countryCode: "JM", name: "Jamaica", properties: [] },
  { countryCode: "BV", name: "Bouvet ", properties: [] },
  { countryCode: "BW", name: "Botswana", properties: [] },
  { countryCode: "WS", name: "Samoa", properties: [] },
  { countryCode: "BR", name: "Brazil", properties: [] },
  { countryCode: "BS", name: "Bahamas", properties: [] },
  { countryCode: "JE", name: "Jersey", properties: [] },
  { countryCode: "BY", name: "Belarus", properties: [] },
  { countryCode: "BZ", name: "Belize", properties: [] },
  { countryCode: "RU", name: "Russia", properties: [] },
  { countryCode: "RW", name: "Rwanda", properties: [] },
  { countryCode: "RS", name: "Serbia", properties: [] },
  { countryCode: "TL", name: "East Timor", properties: [] },
  { countryCode: "RE", name: "Reunion", properties: [] },
  { countryCode: "TM", name: "Turkmenistan", properties: [] },
  { countryCode: "TJ", name: "Tajikistan", properties: [] },
  { countryCode: "RO", name: "Romania", properties: [] },
  { countryCode: "GW", name: "Guinea-Bissau", properties: [] },
  { countryCode: "GT", name: "Guatemala", properties: [] },
  { countryCode: "GR", name: "Greece", properties: [] },
  { countryCode: "GQ", name: "Equatorial Guinea", properties: [] },
  { countryCode: "JP", name: "Japan", properties: [] },
  { countryCode: "GY", name: "Guyana", properties: [] },
  { countryCode: "GG", name: "Guernsey", properties: [] },
  { countryCode: "GE", name: "Georgia", properties: [] },
  { countryCode: "GD", name: "Grenada", properties: [] },
  { countryCode: "GB", name: "United Kingdom", properties: [] },
  { countryCode: "GA", name: "Gabon", properties: [] },
  { countryCode: "SV", name: "El Salvador", properties: [] },
  { countryCode: "GN", name: "Guinea", properties: [] },
  { countryCode: "GM", name: "Gambia", properties: [] },
  { countryCode: "GL", name: "Greenland", properties: [] },
  { countryCode: "GH", name: "Ghana", properties: [] },
  { countryCode: "OM", name: "Oman", properties: [] },
  { countryCode: "TN", name: "Tunisia", properties: [] },
  { countryCode: "JO", name: "Jordan", properties: [] },
  { countryCode: "HR", name: "Croatia", properties: [] },
  { countryCode: "HT", name: "Haiti", properties: [] },
  { countryCode: "HU", name: "Hungary", properties: [] },
  { countryCode: "HK", name: "Hong Kong", properties: [] },
  { countryCode: "HN", name: "Honduras", properties: [] },
  { countryCode: "VE", name: "Venezuela", properties: [] },
  { countryCode: "PR", name: "Puerto Rico", properties: [] },
  { countryCode: "PS", name: "Palestine", properties: [] },
  { countryCode: "PW", name: "Palau", properties: [] },
  { countryCode: "PT", name: "Portugal", properties: [] },
  { countryCode: "SJ", name: "Svalbard and Jan Mayen", properties: [] },
  { countryCode: "PY", name: "Paraguay", properties: [] },
  { countryCode: "IQ", name: "Iraq", properties: [] },
  { countryCode: "PA", name: "Panama", properties: [] },
  { countryCode: "PG", name: "Papua New Guinea", properties: [] },
  { countryCode: "PE", name: "Peru", properties: [] },
  { countryCode: "PK", name: "Pakistan", properties: [] },
  { countryCode: "PH", name: "Philippines", properties: [] },
  { countryCode: "PL", name: "Poland", properties: [] },
  { countryCode: "ZM", name: "Zambia", properties: [] },
  { countryCode: "EH", name: "Western Sahara", properties: [] },
  { countryCode: "EE", name: "Estonia", properties: [] },
  { countryCode: "EG", name: "Egypt", properties: [] },
  { countryCode: "ZA", name: "South Africa", properties: [] },
  { countryCode: "EC", name: "Ecuador", properties: [] },
  { countryCode: "IT", name: "Italy", properties: [] },
  { countryCode: "VN", name: "Vietnam", properties: [] },
  { countryCode: "SB", name: "Solomon Islands", properties: [] },
  { countryCode: "ET", name: "Ethiopia", properties: [] },
  { countryCode: "SO", name: "Somalia", properties: [] },
  { countryCode: "ZW", name: "Zimbabwe", properties: [] },
  { countryCode: "SA", name: "Saudi Arabia", properties: [] },
  { countryCode: "ES", name: "Spain", properties: [] },
  { countryCode: "ER", name: "Eritrea", properties: [] },
  { countryCode: "ME", name: "Montenegro", properties: [] },
  { countryCode: "MD", name: "Moldova", properties: [] },
  { countryCode: "MG", name: "Madagascar", properties: [] },
  { countryCode: "MF", name: "Saint Martin", properties: [] },
  { countryCode: "MA", name: "Morocco", properties: [] },
  { countryCode: "MC", name: "Monaco", properties: [] },
  { countryCode: "UZ", name: "Uzbekistan", properties: [] },
  { countryCode: "MM", name: "Myanmar", properties: [] },
  { countryCode: "ML", name: "Mali", properties: [] },
  { countryCode: "MO", name: "Macao", properties: [] },
  { countryCode: "MN", name: "Mongolia", properties: [] },
  { countryCode: "MH", name: "Marshall ", properties: [] },
  { countryCode: "MK", name: "Macedonia", properties: [] },
  { countryCode: "MU", name: "Mauritius", properties: [] },
  { countryCode: "MT", name: "Malta", properties: [] },
  { countryCode: "MW", name: "Malawi", properties: [] },
  { countryCode: "MV", name: "Maldives", properties: [] },
  { countryCode: "MR", name: "Mauritania", properties: [] },
  { countryCode: "IM", name: "Isle of Man", properties: [] },
  { countryCode: "UG", name: "Uganda", properties: [] },
  { countryCode: "TZ", name: "Tanzania", properties: [] },
  { countryCode: "MY", name: "Malaysia", properties: [] },
  { countryCode: "MX", name: "Mexico", properties: [] },
  { countryCode: "IL", name: "Israel", properties: [] },
  { countryCode: "FR", name: "France", properties: [] },
  { countryCode: "SH", name: "Saint Helena", properties: [] },
  { countryCode: "FI", name: "Finland", properties: [] },
  { countryCode: "FJ", name: "Fiji", properties: [] },
  { countryCode: "FK", name: "Falkland ", properties: [] },
  { countryCode: "FM", name: "Micronesia", properties: [] },
  { countryCode: "FO", name: "Faroe ", properties: [] },
  { countryCode: "NI", name: "Nicaragua", properties: [] },
  { countryCode: "NL", name: "Netherlands", properties: [] },
  { countryCode: "NO", name: "Norway", properties: [] },
  { countryCode: "NA", name: "Namibia", properties: [] },
  { countryCode: "VU", name: "Vanuatu", properties: [] },
  { countryCode: "NE", name: "Niger", properties: [] },
  { countryCode: "NF", name: "Norfolk ", properties: [] },
  { countryCode: "NG", name: "Nigeria", properties: [] },
  { countryCode: "NZ", name: "New Zealand", properties: [] },
  { countryCode: "NP", name: "Nepal", properties: [] },
  { countryCode: "NR", name: "Nauru", properties: [] },
  { countryCode: "XK", name: "Kosovo", properties: [] },
  { countryCode: "CI", name: "Ivory Coast", properties: [] },
  { countryCode: "CH", name: "Switzerland", properties: [] },
  { countryCode: "CO", name: "Colombia", properties: [] },
  { countryCode: "CN", name: "China", properties: [] },
  { countryCode: "CM", name: "Cameroon", properties: [] },
  { countryCode: "CL", name: "Chile", properties: [] },
  { countryCode: "CA", name: "Canada", properties: [] },
  { countryCode: "CG", name: "Republic of the Congo", properties: [] },
  { countryCode: "CF", name: "Central African Republic", properties: [] },
  {
    countryCode: "CD",
    name: "Democratic Republic of the Congo",
    properties: [],
  },
  { countryCode: "CZ", name: "Czech Republic", properties: [] },
  { countryCode: "CY", name: "Cyprus", properties: [] },
  { countryCode: "CR", name: "Costa Rica", properties: [] },
  { countryCode: "CV", name: "Cape Verde", properties: [] },
  { countryCode: "CU", name: "Cuba", properties: [] },
  { countryCode: "SZ", name: "Eswatini", properties: [] },
  { countryCode: "SY", name: "Syria", properties: [] },
  { countryCode: "KG", name: "Kyrgyzstan", properties: [] },
  { countryCode: "KE", name: "Kenya", properties: [] },
  { countryCode: "SS", name: "South Sudan", properties: [] },
  { countryCode: "SR", name: "Suriname", properties: [] },
  { countryCode: "KI", name: "Kiribati", properties: [] },
  { countryCode: "KH", name: "Cambodia", properties: [] },
  { countryCode: "KN", name: "Saint Kitts and Nevis", properties: [] },
  { countryCode: "KM", name: "Comoros", properties: [] },
  { countryCode: "ST", name: "Sao Tome and Principe", properties: [] },
  { countryCode: "SK", name: "Slovakia", properties: [] },
  { countryCode: "KR", name: "South Korea", properties: [] },
  { countryCode: "SI", name: "Slovenia", properties: [] },
  { countryCode: "KP", name: "North Korea", properties: [] },
  { countryCode: "KW", name: "Kuwait", properties: [] },
  { countryCode: "SN", name: "Senegal", properties: [] },
  { countryCode: "SM", name: "San Marino", properties: [] },
  { countryCode: "SL", name: "Sierra Leone", properties: [] },
  { countryCode: "SC", name: "Seychelles", properties: [] },
  { countryCode: "KZ", name: "Kazakhstan", properties: [] },
  { countryCode: "SG", name: "Singapore", properties: [] },
  { countryCode: "SE", name: "Sweden", properties: [] },
  { countryCode: "SD", name: "Sudan", properties: [] },
  { countryCode: "DO", name: "Dominican Republic", properties: [] },
  { countryCode: "DM", name: "Dominica", properties: [] },
  { countryCode: "DJ", name: "Djibouti", properties: [] },
  { countryCode: "DK", name: "Denmark", properties: [] },
  { countryCode: "DE", name: "Germany", properties: [] },
  { countryCode: "YE", name: "Yemen", properties: [] },
  { countryCode: "DZ", name: "Algeria", properties: [] },
  { countryCode: "US", name: "United States", properties: [] },
  { countryCode: "UY", name: "Uruguay", properties: [] },
  { countryCode: "LB", name: "Lebanon", properties: [] },
  { countryCode: "LC", name: "Saint Lucia", properties: [] },
  { countryCode: "LA", name: "Laos", properties: [] },
  { countryCode: "TV", name: "Tuvalu", properties: [] },
  { countryCode: "TW", name: "Taiwan", properties: [] },
  { countryCode: "TT", name: "Trinidad and Tobago", properties: [] },
  { countryCode: "TR", name: "Turkey", properties: [] },
  { countryCode: "LK", name: "Sri Lanka", properties: [] },
  { countryCode: "LI", name: "Liechtenstein", properties: [] },
  { countryCode: "LV", name: "Latvia", properties: [] },
  { countryCode: "TO", name: "Tonga", properties: [] },
  { countryCode: "LT", name: "Lithuania", properties: [] },
  { countryCode: "LU", name: "Luxembourg", properties: [] },
  { countryCode: "LR", name: "Liberia", properties: [] },
  { countryCode: "LS", name: "Lesotho", properties: [] },
  { countryCode: "TH", name: "Thailand", properties: [] },
  { countryCode: "TG", name: "Togo", properties: [] },
  { countryCode: "TD", name: "Chad", properties: [] },
  { countryCode: "LY", name: "Libya", properties: [] },
  { countryCode: "VA", name: "Vatican", properties: [] },
  {
    countryCode: "VC",
    name: "Saint Vincent and the Grenadines",
    properties: [],
  },
  { countryCode: "AE", name: "United Arab Emirates", properties: [] },
  { countryCode: "AD", name: "Andorra", properties: [] },
  { countryCode: "AG", name: "Antigua and Barbuda", properties: [] },
  { countryCode: "AF", name: "Afghanistan", properties: [] },
  { countryCode: "IS", name: "Iceland", properties: [] },
  { countryCode: "IR", name: "Iran", properties: [] },
  { countryCode: "AM", name: "Armenia", properties: [] },
  { countryCode: "AL", name: "Albania", properties: [] },
  { countryCode: "AO", name: "Angola", properties: [] },
  { countryCode: "AQ", name: "Antarctica", properties: [] },
  { countryCode: "AR", name: "Argentina", properties: [] },
  { countryCode: "AU", name: "Australia", properties: [] },
  { countryCode: "AT", name: "Austria", properties: [] },
  { countryCode: "AW", name: "Aruba", properties: [] },
  { countryCode: "IN", name: "India", properties: [] },
  { countryCode: "AX", name: "Aland ", properties: [] },
  { countryCode: "AZ", name: "Azerbaijan", properties: [] },
  { countryCode: "IE", name: "Ireland", properties: [] },
  { countryCode: "ID", name: "Indonesia", properties: [] },
  { countryCode: "UA", name: "Ukraine", properties: [] },
  { countryCode: "QA", name: "Qatar", properties: [] },
  { countryCode: "MZ", name: "Mozambique", properties: [] },
];
