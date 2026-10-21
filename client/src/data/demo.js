export const demoMetrics = [
  { id: 'm1', category: 'Environmental', name: 'Scope 1 emissions', value: 128, unit: 'tCO₂e', period: 'Oct 2026', site: 'Chennai Plant', status: 'Reviewed' },
  { id: 'm2', category: 'Environmental', name: 'Scope 2 emissions', value: 422, unit: 'tCO₂e', period: 'Oct 2026', site: 'Chennai Plant', status: 'Verified' },
  { id: 'm3', category: 'Environmental', name: 'Renewable energy', value: 42, unit: '%', period: 'Oct 2026', site: 'All sites', status: 'Reviewed' },
  { id: 'm4', category: 'Environmental', name: 'Water withdrawal', value: 12500, unit: 'm³', period: 'Oct 2026', site: 'Chennai Plant', status: 'Verified' },
  { id: 'm5', category: 'Environmental', name: 'Waste recycled', value: 76, unit: '%', period: 'Oct 2026', site: 'All sites', status: 'Reviewed' },
  { id: 'm6', category: 'Social', name: 'Training completion', value: 91, unit: '%', period: 'Oct 2026', site: 'All sites', status: 'Verified' },
  { id: 'm7', category: 'Social', name: 'Employee engagement', value: 84, unit: 'score', period: 'Q3 2026', site: 'All sites', status: 'Reviewed' },
  { id: 'm8', category: 'Governance', name: 'Ethics training', value: 96, unit: '%', period: 'Oct 2026', site: 'All sites', status: 'Verified' },
]

export const emissions = [
  { month: 'May', scope1: 180, scope2: 490, target: 690 },
  { month: 'Jun', scope1: 166, scope2: 475, target: 670 },
  { month: 'Jul', scope1: 158, scope2: 460, target: 650 },
  { month: 'Aug', scope1: 150, scope2: 448, target: 630 },
  { month: 'Sep', scope1: 142, scope2: 438, target: 610 },
  { month: 'Oct', scope1: 128, scope2: 422, target: 590 },
]

export const energyMix = [
  { name: 'Renewable', value: 42, color: '#5c806b' },
  { name: 'Grid', value: 46, color: '#d7b56d' },
  { name: 'Other', value: 12, color: '#b9c5b8' },
]

export const targets = [
  { name: 'Reduce carbon emissions', current: 68, target: 80, due: 'Dec 2026', category: 'Environmental', color: 'green' },
  { name: 'Renewable energy adoption', current: 42, target: 50, due: 'Mar 2027', category: 'Environmental', color: 'gold' },
  { name: 'Waste diverted from landfill', current: 76, target: 80, due: 'Dec 2026', category: 'Environmental', color: 'green' },
  { name: 'Workforce training completion', current: 91, target: 95, due: 'Dec 2026', category: 'Social', color: 'lavender' },
]

export const insights = [
  { id: 1, type: 'Opportunity', title: 'Renewable energy has room to scale', text: 'Renewables now supply 42% of tracked electricity. A 8-point increase would bring the portfolio to its 50% near-term goal.', impact: 'High impact', icon: 'sun', tone: 'gold' },
  { id: 2, type: 'Trend detected', title: 'Emissions trending in the right direction', text: 'Combined Scope 1 and 2 emissions declined across the last six reporting periods. Validate the trend against production volume.', impact: 'Positive signal', icon: 'chart', tone: 'green' },
  { id: 3, type: 'Action suggested', title: 'Close the water-efficiency gap', text: 'Water withdrawal is still above the annual target. Start with a site-level leak audit and cooling-system review.', impact: 'Medium impact', icon: 'droplet', tone: 'blue' },
]
