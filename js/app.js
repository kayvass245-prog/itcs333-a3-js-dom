document.addEventListener('DOMContentLoaded', function () {
  let form = document.querySelector('#todo-form');
  let input = document.querySelector('#todo-input');
  let list = document.querySelector('#todo-list');
  let errorMsg = document.querySelector('#error-msg');
  let counter = document.querySelector('#counter');
  let currentFilter = 'all';

  function showError(show) {
    errorMsg.classList.toggle('hidden', !show);
  }

  function updateCounter() {
    let left = list.querySelectorAll('li:not(.completed)').length;

    counter.textContent = left + (left === 1 ? ' item left' : ' items left');
  }

  function applyFilter() {
    let items = list.querySelectorAll('li');

    items.forEach(function (item) {
      let done = item.classList.contains('completed');

      let visible =
        currentFilter === 'all' ||
        (currentFilter === 'active' && !done) ||
        (currentFilter === 'done' && done);

      item.hidden = !visible;
    });
  }

  function refresh() {
    applyFilter();
    updateCounter();
  }

  function addItem(e) {
    e.preventDefault();

    let text = input.value.trim();

    if (text === '') {
      showError(true);
      return;
    }

    showError(false);

    let li = document.createElement('li');

    let span = document.createElement('span');
    span.textContent = text;

    let delBtn = document.createElement('button');
    delBtn.type = 'button';
    delBtn.className = 'delete-btn';
    delBtn.textContent = 'Delete';

    li.appendChild(span);
    li.appendChild(delBtn);

    list.appendChild(li);

    input.value = '';

    refresh();
  }

  function handleListClick(e) {
    let li = e.target.closest('li');

    if (li == null) {
      return;
    }

    if (e.target.classList.contains('delete-btn')) {
      li.remove();
    } else if (e.target.tagName === 'SPAN') {
      li.classList.toggle('completed');
    }

    refresh();
  }

  function handleFilterClick(e) {
    currentFilter = e.target.id.replace('filter-', '');
    refresh();
  }

  form.addEventListener('submit', addItem);

  list.addEventListener('click', handleListClick);

  document.querySelector('#filter-all').addEventListener('click', handleFilterClick);

  document.querySelector('#filter-active').addEventListener('click', handleFilterClick);

  document.querySelector('#filter-done').addEventListener('click', handleFilterClick);

  showError(false);
  refresh();
});
