const calculateTax = (req, res) => {
    const { income, deductions } = req.body;

    // Example tax slabs
    const taxSlabs = [
        { limit: 250000, rate: 0 },
        { limit: 500000, rate: 0.05 },
        { limit: 1000000, rate: 0.2 },
        { limit: Infinity, rate: 0.3 },
    ];

    let taxableIncome = income - deductions;
    let tax = 0;

    for (let i = 0; i < taxSlabs.length; i++) {
        const { limit, rate } = taxSlabs[i];
        const prevLimit = i > 0 ? taxSlabs[i - 1].limit : 0;

        if (taxableIncome > limit) {
            tax += (limit - prevLimit) * rate;
        } else {
            tax += (taxableIncome - prevLimit) * rate;
            break;
        }
    }

    res.json({ taxableIncome, tax });
};

const getTaxProjection = (req, res) => {
    const { currentIncome, growthRate } = req.body;
    const projections = [];

    let income = currentIncome;
    for (let year = 1; year <= 5; year++) {
        income += income * (growthRate / 100);
        projections.push({ year, income });
    }

    res.json({ projections });
};

module.exports = { calculateTax, getTaxProjection };
