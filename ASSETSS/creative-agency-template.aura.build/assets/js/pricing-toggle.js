/* Toggle monthly / yearly pricing on Growth & Scale plan cards */
function updatePricing(plan, period) {
  const pricingData = {
    growth: { monthly: '3.000', yearly: '2.400' },
    scale:  { monthly: '5.000', yearly: '4.000' },
  };

  const descData = {
    monthly: 'Pause ou cancele a qualquer momento.',
    yearly:  'Cobrança anual. Economize 20%.',
  };

  const priceElement = document.getElementById(`price-${plan}`);
  const descElement  = document.getElementById(`desc-${plan}`);

  if (priceElement && pricingData[plan] && pricingData[plan][period]) {
    priceElement.style.opacity = '0.5';
    if (descElement) descElement.style.opacity = '0.5';

    setTimeout(() => {
      priceElement.textContent = pricingData[plan][period];
      priceElement.style.opacity = '1';

      if (descElement) {
        descElement.textContent = descData[period];
        descElement.style.opacity = '1';
      }
    }, 150);
  }

  const toggleContainer = document.getElementById(`toggle-${plan}`);
  if (toggleContainer) {
    const buttons = toggleContainer.querySelectorAll('button');
    buttons.forEach((btn) => {
      const isSelected = btn.dataset.period === period;
      btn.className = isSelected
        ? 'px-4 py-1.5 bg-zinc-700 text-white text-xs font-semibold font-sans rounded-sm shadow-sm transition-all'
        : 'px-4 py-1.5 text-xs font-medium text-zinc-500 font-sans bg-transparent rounded-sm hover:text-zinc-300 transition-colors';
    });
  }
}
