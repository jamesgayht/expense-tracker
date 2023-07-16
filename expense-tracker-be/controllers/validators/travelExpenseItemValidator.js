const Joi = require("joi");

 
currency_list = ["ADP", "AED", "AFA", "ALL", "AMD", "ANG", "AOA", "ARS", "ATS", "AUD", "AWG", "AZM", "BAM", "BBD",
                 "BDT", "BEF", "BGL", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BOV", "BRL", "BSD", "BTN", "BWP",
                 "BYB", "BZD", "CAD", "CDF", "CHF", "CLF", "CLP", "CNH", "CNY", "COP", "CRC", "CUP", "CVE", "CYP",
                 "CZK", "DEM", "DJF", "DKK", "DOP", "DZD", "ECS", "ECV", "EEK", "EGP", "ERN", "ESP", "ETB", "EUR",
                 "FIM", "FJD", "FKP", "FRF", "GBP", "GEL", "GHC", "GIP", "GMD", "GNF", "GRD", "GTQ", "GWP", "GYD",
                 "HKD", "HNL", "HRK", "HTG", "HUF", "IDE", "IDR", "IEP", "ILS", "INR", "IQD", "IRR", "ISK", "ITL",
                 "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KMF", "KPW", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP",
                 "LKR", "LRD", "LSL", "LTL", "LUF", "LVL", "LYD", "MAD", "MDL", "MGF", "MKD", "MMK", "MNT", "MOP",
                 "MRO", "MTL", "MUR", "MVR", "MWK", "MXN", "MXV", "MYR", "MZM", "NAD", "NGN", "NIO", "NLG", "NOK",
                 "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PTE", "PYG", "QAR", "RMB", "RON",
                 "RUB", "RUR", "RWF", "RYR", "SAR", "SBD", "SCR", "SDP", "SEK", "SGD", "SHP", "SIT", "SKK", "SLL",
                 "SOS", "SRG", "STD", "SVC", "SYP", "SZL", "THB", "TJR", "TMM", "TND", "TOP", "TPE", "TRL", "TRY",
                 "TTD", "TWD", "TZS", "UAH", "UGX", "USD", "USN", "USS", "UYU", "UZS", "VEB", "VND", "VUV", "WST",
                 "XAF", "XAG", "XAU", "XCD", "XDR", "XEU", "XOF", "XPD", "XPF", "XPT", "YER", "YUN", "ZAR", "ZMK",
                 "ZRN", "ZWD"]


const travelExpenseItemValidators = {
  createExpenseItemSchema: Joi.object({
    userID: Joi.string().required(),
    date: Joi.date().required(),
    // date: Joi.date().greater(Joi.ref('from')).required(),
    // date: Joi.date().raw().required(),
    name: Joi.string().required(),
    category: Joi.string().required(),
    amount: Joi.number().required(),
    fx:Joi.number().required(),
    ccy:Joi.string().valid(...currency_list).required(), //validate currency based on currency_list so that we don't have to import joi-currency-code, we only accept ISO for now
    trip:Joi.string().required(),
    baseCCY:Joi.string().valid(...currency_list).required()
  }),
};

module.exports = travelExpenseItemValidators;
