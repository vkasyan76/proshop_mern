const formatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
})

export default function formatMoney(price) {
    return formatter.format(price)
}

// uk-UA
// currency: 'UAH'