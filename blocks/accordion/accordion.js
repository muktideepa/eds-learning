/**
 * loads and decorates the accordion block
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const items = [...block.children];
  block.innerHTML = '';

  items.forEach((row, i) => {
    const [summaryCell, bodyCell] = [...row.children];

    const details = document.createElement('details');
    details.name = 'accordion'; // links items so only one opens at a time (native HTML behavior)

    const summary = document.createElement('summary');
    summary.id = `accordion-summary-${i}`;
    summary.append(...summaryCell.childNodes);

    const body = document.createElement('div');
    body.className = 'accordion-item-body';
    body.setAttribute('role', 'region');
    body.setAttribute('aria-labelledby', summary.id);
    if (bodyCell) body.append(...bodyCell.childNodes);

    details.append(summary, body);
    block.append(details);
  });
}
