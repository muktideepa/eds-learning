function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function renderArticle({ title, description, path, date, tag }) {
  const li = document.createElement('li');
  li.className = 'article-list-item';
  li.innerHTML = `
    <a href="${path}" class="article-list-link">
      ${tag ? `<span class="article-list-tag">${tag}</span>` : ''}
      <h3 class="article-list-title">${title}</h3>
      ${description ? `<p class="article-list-description">${description}</p>` : ''}
      ${date ? `<span class="article-list-date">${formatDate(date)}</span>` : ''}
    </a>
  `;
  return li;
}

/**
 * loads and decorates the article-list block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  // the author puts the spreadsheet path as a link in the block
  const anchor = block.querySelector('a');
  const src = anchor ? anchor.href : '/articles.json';

  block.innerHTML = '<p class="article-list-loading">Loading articles…</p>';

  const resp = await fetch(src);
  if (!resp.ok) {
    block.innerHTML = '<p class="article-list-error">Could not load articles.</p>';
    return;
  }

  const json = await resp.json();
  const articles = json.data ?? [];

  const ul = document.createElement('ul');
  ul.className = 'article-list-items';
  articles.forEach((article) => ul.append(renderArticle(article)));

  block.replaceChildren(ul);
}
