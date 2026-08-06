// Learn — the research library, plus the single-article reader.

import { store } from '../store.js';
import { esc } from '../ui.js';
import { articles, categories, articleById, catById } from '../data/learn.js';

export function render(el) {
  const read = new Set(store.get().readArticles);

  el.innerHTML = `
    <h1 class="page-title">Learn</h1>
    <p class="page-sub">Short reads, real science. Every claim cites its source — because trust is the whole point.</p>

    ${categories.map(cat => {
      const list = articles.filter(a => a.cat === cat.id);
      if (!list.length) return '';
      return `
        <h2 class="section-title">${esc(cat.name)}</h2>
        ${list.map(a => `
          <a class="card card-link session-card" href="#/article/${a.id}">
            <div class="session-art" style="background:var(--${cat.color}-soft)">${a.em}</div>
            <div class="session-body">
              <h3>${esc(a.title)}</h3>
              <p>${esc(a.lede)}</p>
              <div class="session-meta">${a.read} min read${read.has(a.id) ? ' · ✓ read' : ''}</div>
            </div>
          </a>`).join('')}`;
    }).join('')}

    <p class="tiny center mt16" style="padding:0 12px">Movement is education, not medical advice. If you have a condition or take medication that movement affects, loop in your clinician — they will almost certainly be delighted.</p>
  `;
}

export function renderArticle(el, params) {
  const a = articleById(params.articleId);
  if (!a) { location.hash = '#/learn'; return; }
  const cat = catById(a.cat);

  store.update(s => {
    if (!s.readArticles.includes(a.id)) s.readArticles.push(a.id);
  });

  el.innerHTML = `
    <div class="article">
      <a class="backlink" href="#/learn">← Learn</a>
      <div><span class="tag ${cat.color}">${esc(cat.name)}</span> <span class="tiny">${a.read} min read</span></div>
      <h1>${a.em} ${esc(a.title)}</h1>
      <p class="lede">${esc(a.lede)}</p>
      <div class="article-body">${a.body}</div>
      <div class="trythis"><b>Try this →</b> ${esc(a.tryThis)}</div>
      <div class="refs">
        <h4>Sources</h4>
        <ul>${a.refs.map(r => `<li>${esc(r)}</li>`).join('')}</ul>
      </div>
    </div>
  `;
  window.scrollTo(0, 0);
}
