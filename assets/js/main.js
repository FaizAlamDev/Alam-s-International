/* ============================================================
   Alam's International — interactions
   ============================================================ */

(function () {
  'use strict';

  const CATEGORIES = {
    belts: {
      index: '01',
      title: 'Belts',
      tag: 'Leather belt',
      formValue: 'Belts',
      cta: 'Enquire about belts',
      description: 'Genuine leather belts, from plain and classic to hand-worked and studded. Made to your width, buckle and colour.',
      detail: 'A genuine leather belt, edge-finished and stitched in our Kanpur workshop. Buckle, width, colour and finish are made to your specification.',
      specs: ['Genuine leather', 'Made to order', 'Custom buckle, width & colour'],
      products: [
        ['BLT-01', 'Stitched Edge Leather Belt'],
        ['BLT-02', 'Classic Black Leather Belt'],
        ['BLT-03', 'Dark Brown Stitched Belt'],
        ['BLT-04', 'Cognac Leather Belt'],
        ['BLT-05', 'Textured Tan Belt'],
        ['BLT-06', 'Brass Buckle Brown Belt'],
        ['BLT-07', 'Embossed Black Belt'],
        ['BLT-08', 'Croc-Embossed Tan Belt'],
        ['BLT-09', 'Black Plaque Buckle Belt'],
        ['BLT-10', 'Textured Black Belt'],
        ['BLT-11', 'Gold Buckle Leather Belt'],
        ['BLT-12', 'Slim Black Leather Belt'],
        ['BLT-13', 'Twin Loop Brown Belt'],
        ['BLT-14', 'Wide Brown Leather Belt'],
        ['BLT-15', 'Rugged Brown Belt'],
        ['BLT-16', 'Rolled Leather Belt'],
        ['BLT-17', 'Red Leather Belt']
      ]
    },
    bags: {
      index: '02',
      title: 'Bags & Purses',
      tag: 'Leather bag',
      formValue: 'Bags & Purses',
      cta: 'Enquire about bags',
      description: 'Backpacks, handbags and travel pieces, cut and stitched in our own workshop. Choose the leather, hardware, lining and finish.',
      detail: 'A hand-finished leather bag with reinforced stitching. Choose the leather, hardware, lining, size and finish for your order.',
      specs: ['Genuine leather', 'Made to order', 'Custom hardware & lining'],
      products: [
        ['BAG-01', 'Two-Tone Leather Backpack'],
        ['BAG-02', 'Black Leather Tote'],
        ['BAG-03', 'Tan Leather Duffel'],
        ['BAG-04', 'Hand-Tooled Beige Bag'],
        ['BAG-05', 'Woven Leather Bucket Bag'],
        ['BAG-06', 'Red Leather Crossbody'],
        ['BAG-07', 'Brown Leather Tote'],
        ['BAG-08', 'Distressed Leather Weekender'],
        ['BAG-09', 'Hand-Tooled Brown Handbag'],
        ['BAG-10', 'Fringed Leather Tote'],
        ['BAG-11', 'Patterned Leather Handbag'],
        ['BAG-12', 'Leather Briefcase'],
        ['BAG-13', 'Fringed Southwestern Bag'],
        ['BAG-14', 'Fringed Leather Pouch']
      ]
    },
    shoes: {
      index: '03',
      title: 'Safety Shoes',
      tag: 'Safety footwear',
      formValue: 'Safety Shoes',
      cta: 'Enquire about shoes',
      description: 'Work and industrial footwear built for long shifts. Tell us your market and we will match the specification.',
      detail: 'Work and industrial footwear built for long shifts. Share your market requirements and we will match the specification.',
      specs: ['Work & industrial footwear', 'Made to order', 'Specification to your market'],
      products: [
        ['SHO-01', 'High-Ankle Safety Boot'],
        ['SHO-02', 'Low-Cut Safety Trainer'],
        ['SHO-03', 'Brown Safety Shoe'],
        ['SHO-04', 'Black Safety Shoe']
      ]
    },
    wallets: {
      index: '04',
      title: 'Wallets',
      tag: 'Leather wallet',
      formValue: 'Wallets',
      cta: 'Enquire about wallets',
      description: 'Compact, hard-wearing wallets with clean edges and precise stitching. Customise leather, colour and embossing.',
      detail: 'A compact leather wallet with clean edges and precise stitching. Customise the leather, colour, lining and embossing.',
      specs: ['Genuine leather', 'Made to order', 'Custom colour & embossing'],
      products: [
        ['WLT-01', 'Folded Leather Wallet'],
        ['WLT-02', 'Classic Bi-Fold Wallet'],
        ['WLT-03', 'Coin Pocket Wallet'],
        ['WLT-04', 'Tan Leather Wallet']
      ]
    },
    hides: {
      index: '05',
      title: 'Leather Hides',
      tag: 'Finished hide',
      formValue: 'Leather Hides',
      cta: 'Enquire about hides',
      description: 'Tell us what you need and we will tan your hides to your demands, so you receive leather made for your product.',
      detail: 'Tanned and finished in our own tannery to your shade, grain and hand-feel requirements.',
      specs: ['Tanned in-house', 'Tanned to your demand', 'Custom shade & finish'],
      products: [
        ['HDE-01', 'Colour Range Leather Hides'],
        ['HDE-02', 'Cognac Finished Hide'],
        ['HDE-03', 'Blue & Tan Hide Selection'],
        ['HDE-04', 'Milled Tan Hide']
      ]
    },
    dogs: {
      index: '06',
      title: 'Dog Collars',
      tag: 'Leather collar',
      formValue: 'Dog Collars & Pet Accessories',
      cta: 'Enquire about collars',
      description: 'Solid leather collars with reinforced stitching and custom hardware. Sizes, colours and finishes made to order.',
      detail: 'A solid leather collar with reinforced stitching and custom hardware. Sizes, colours and finishes are made to order.',
      specs: ['Genuine leather', 'Made to order', 'Custom size & hardware'],
      products: [
        ['DOG-01', 'Red Studded Collar'],
        ['DOG-02', 'Black Padded Collar'],
        ['DOG-03', 'Brown Leather Collar'],
        ['DOG-04', 'Classic Brown Collar']
      ]
    }
  };

  const state = {
    category: 'bags',
    current: null
  };

  const $ = (selector, context) => (context || document).querySelector(selector);
  const $$ = (selector, context) => Array.from((context || document).querySelectorAll(selector));

  const grid = $('#product-grid');
  const count = $('#product-count');
  const intro = $('#category-intro');
  const catIndex = $('#cat-index');
  const catTitle = $('#cat-title');
  const catDesc = $('#cat-desc');
  const catLink = $('#cat-link');
  const catLinkLabel = $('#cat-link-label');

  const productDialog = $('#product-dialog');
  const pdImage = $('#pd-image');
  const pdCode = $('#pd-code');
  const pdCategory = $('#pd-category');
  const pdTitle = $('#pd-title');
  const pdDescription = $('#pd-description');
  const pdSpecs = $('#pd-specs');
  const pdCount = $('#pd-count');
  const pdQuote = $('#pd-quote');
  const pdWa = $('#pd-wa');
  const pdPrev = $('#pd-prev');
  const pdNext = $('#pd-next');

  const catalogueDialog = $('#catalogue-dialog');
  const pdfFrame = $('#pdf-frame');

  const mobileMenu = $('#mobile-menu');
  const navToggle = $('#nav-toggle');
  const mobileClose = $('#mobile-close');
  const header = $('#site-header');
  const form = $('#quote-form');
  const quoteContext = $('#quote-context');
  const categorySelect = $('#category');
  const codeInput = $('#product-code');
  const nameInput = $('#name');
  const fileInput = $('#attachment');
  const fileName = $('#file-name');
  const fileTriggerLabel = $('#file-trigger-label');
  const statusBox = $('#form-status');
  const submitButton = $('#form-submit');
  const formBody = $('.form-body', form);
  const formSuccess = $('#form-success');
  const formNext = $('#form-next');
  const resetFormButton = $('#reset-form');

  /* ---------- Products ---------- */

  function productImage(code) {
    return 'assets/img/products/' + code.toLowerCase() + '.webp';
  }

  function productCard(categoryKey, product) {
    const category = CATEGORIES[categoryKey];
    const code = product[0];
    const name = product[1];
    return [
      '<article class="product-card">',
        '<button class="product-media" type="button" data-open="', code, '" aria-label="View ', name, ', ', code, '">',
          '<img src="', productImage(code), '" alt="', name, ' (', code, ') — ', category.tag, ' made by Alam’s International, Kanpur" loading="lazy" decoding="async">',
          '<span class="product-code">', code, '</span>',
          '<span class="product-hover"><span>Quick view</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>',
        '</button>',
        '<div class="product-info">',
          '<div>',
            '<h4 class="product-name">', name, '</h4>',
            '<p class="product-tag">', category.tag, '</p>',
          '</div>',
          '<button class="product-quote" type="button" data-quote="', code, '">Quote</button>',
        '</div>',
      '</article>'
    ].join('');
  }

  function updateIntro(categoryKey, animate) {
    const category = CATEGORIES[categoryKey];

    const apply = function () {
      catIndex.textContent = category.index;
      catTitle.textContent = category.title;
      catDesc.textContent = category.description;
      catLinkLabel.textContent = category.cta;
      catLink.dataset.catQuote = categoryKey;
    };

    if (!animate) {
      apply();
      return;
    }

    intro.classList.add('is-changing');
    window.setTimeout(function () {
      apply();
      window.requestAnimationFrame(function () {
        intro.classList.remove('is-changing');
      });
    }, 150);
  }

  function renderProducts(categoryKey, animate) {
    const category = CATEGORIES[categoryKey];
    if (!category || !grid) return;

    state.category = categoryKey;
    updateIntro(categoryKey, Boolean(animate));

    $$('.product-tab').forEach(function (tab) {
      const active = tab.dataset.cat === categoryKey;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });

    const tabsEl = $('.product-tabs');
    const activeTab = $('.product-tab.is-active', tabsEl || document);
    if (tabsEl && activeTab) {
      const tabsRect = tabsEl.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();
      if (tabRect.left < tabsRect.left || tabRect.right > tabsRect.right) {
        tabsEl.scrollTo({
          left: tabsEl.scrollLeft + (tabRect.left - tabsRect.left) - (tabsEl.clientWidth - activeTab.offsetWidth) / 2,
          behavior: 'smooth'
        });
      }
    }

    grid.dataset.cat = categoryKey;
    grid.setAttribute('aria-label', category.title + ' products');
    grid.innerHTML = category.products.map(function (product) {
      return productCard(categoryKey, product);
    }).join('');

    if (count) {
      count.textContent = String(category.products.length).padStart(2, '0');
    }
  }

  $$('.product-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      renderProducts(tab.dataset.cat, true);
    });
  });

  const tabs = $('.product-tabs');
  if (tabs) {
    tabs.addEventListener('keydown', function (event) {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      const tabList = $$('.product-tab', tabs);
      const current = tabList.indexOf(document.activeElement);
      if (current === -1) return;
      event.preventDefault();
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      const next = tabList[(current + direction + tabList.length) % tabList.length];
      next.focus();
      next.click();
    });
  }

  if (grid) {
    grid.addEventListener('click', function (event) {
      const openButton = event.target.closest('[data-open]');
      if (openButton) {
        openProduct(openButton.dataset.open, openButton);
        return;
      }

      const quoteButton = event.target.closest('[data-quote]');
      if (quoteButton) {
        requestQuote(quoteButton.dataset.quote);
      }
    });
  }

  /* ---------- Product dialog ---------- */

  function findProduct(code) {
    const keys = Object.keys(CATEGORIES);
    for (let i = 0; i < keys.length; i += 1) {
      const categoryKey = keys[i];
      const products = CATEGORIES[categoryKey].products;
      for (let j = 0; j < products.length; j += 1) {
        if (products[j][0] === code) {
          return { categoryKey: categoryKey, index: j, product: products[j] };
        }
      }
    }
    return null;
  }

  function populateProduct(categoryKey, index) {
    const category = CATEGORIES[categoryKey];
    const product = category.products[index];
    const code = product[0];
    const name = product[1];

    state.current = { categoryKey: categoryKey, index: index };

    pdImage.src = productImage(code);
    pdImage.alt = name + ' (' + code + ') — ' + category.tag + ' made by Alam’s International, Kanpur';
    pdCode.textContent = code;
    pdCategory.textContent = category.title + ' · ' + code;
    pdTitle.textContent = name;
    pdDescription.textContent = category.detail;
    pdSpecs.innerHTML = category.specs.map(function (spec) {
      return '<li>' + spec + '</li>';
    }).join('');
    pdCount.textContent = (index + 1) + ' / ' + category.products.length;
    pdQuote.dataset.quote = code;
    pdWa.href = 'https://wa.me/919918173776?text=' + encodeURIComponent(
      'Hello Alam’s International, I would like a quote for ' + code + ' — ' + name + '.'
    );
  }

  function openProduct(code, trigger) {
    const found = findProduct(code);
    if (!found || !productDialog) return;

    populateProduct(found.categoryKey, found.index);
    if (trigger) productDialog._returnFocus = trigger;

    if (!productDialog.open) {
      productDialog.showModal();
      syncBodyLock();
    }
  }

  function stepProduct(direction) {
    if (!state.current) return;
    const category = CATEGORIES[state.current.categoryKey];
    const nextIndex = (state.current.index + direction + category.products.length) % category.products.length;
    populateProduct(state.current.categoryKey, nextIndex);
  }

  if (pdPrev) pdPrev.addEventListener('click', function () { stepProduct(-1); });
  if (pdNext) pdNext.addEventListener('click', function () { stepProduct(1); });

  if (pdQuote) {
    pdQuote.addEventListener('click', function () {
      if (!state.current) return;
      const product = CATEGORIES[state.current.categoryKey].products[state.current.index];
      requestQuote(product[0]);
    });
  }

  if (productDialog) {
    productDialog.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        stepProduct(-1);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        stepProduct(1);
      }
    });
  }

  /* ---------- Quote prefill ---------- */

  function requestQuote(code, categoryKey) {
    let key = categoryKey || null;

    if (code) {
      const found = findProduct(code);
      if (found) key = found.categoryKey;
    }

    if (!key || !CATEGORIES[key]) return;
    const category = CATEGORIES[key];

    categorySelect.value = category.formValue;
    codeInput.value = code || '';

    if (quoteContext) {
      quoteContext.hidden = false;
      quoteContext.textContent = code
        ? 'Quoting ' + code + ' — ' + findProduct(code).product[1]
        : category.title + ' enquiry';
    }

    closeMenu();
    $$('dialog[open]').forEach(function (dialog) { dialog.close(); });

    const quoteSection = $('#quote');
    window.setTimeout(function () {
      quoteSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.setTimeout(function () {
        nameInput.focus({ preventScroll: true });
      }, 650);
    }, 60);
  }

  if (catLink) {
    catLink.addEventListener('click', function () {
      requestQuote(null, catLink.dataset.catQuote);
    });
  }

  $$('[data-goto-cat]').forEach(function (button) {
    button.addEventListener('click', function () {
      const key = button.dataset.gotoCat;
      if (!CATEGORIES[key]) return;

      renderProducts(key, true);
      closeMenu();
      window.setTimeout(function () {
        $('#products').scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
    });
  });

  /* ---------- Catalogue ---------- */

  $$('[data-open-catalogue]').forEach(function (button) {
    button.addEventListener('click', function () {
      if (!catalogueDialog) return;
      if (pdfFrame && !pdfFrame.getAttribute('src')) {
        pdfFrame.setAttribute('src', pdfFrame.dataset.src);
      }
      if (!catalogueDialog.open) {
        catalogueDialog.showModal();
        syncBodyLock();
      }
    });
  });

  /* ---------- Dialogs: close / focus / lock ---------- */

  function syncBodyLock() {
    const locked = Boolean(document.querySelector('dialog[open]')) || (mobileMenu && mobileMenu.classList.contains('is-open'));
    document.body.classList.toggle('is-locked', locked);
  }

  $$('dialog').forEach(function (dialog) {
    $$('[data-close-dialog]', dialog).forEach(function (button) {
      button.addEventListener('click', function () {
        dialog.close();
      });
    });

    dialog.addEventListener('click', function (event) {
      if (event.target === dialog) dialog.close();
    });

    dialog.addEventListener('close', function () {
      if (dialog._returnFocus && typeof dialog._returnFocus.focus === 'function') {
        dialog._returnFocus.focus({ preventScroll: true });
      }
      window.requestAnimationFrame(syncBodyLock);
    });
  });

  /* ---------- Mobile menu ---------- */

  function openMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('is-open');
    mobileMenu.removeAttribute('inert');
    mobileMenu.setAttribute('aria-hidden', 'false');
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', 'true');
      navToggle.setAttribute('aria-label', 'Close menu');
    }
    syncBodyLock();
    window.setTimeout(function () {
      const firstLink = mobileMenu.querySelector('a');
      if (firstLink) firstLink.focus();
    }, 160);
  }

  function closeMenu() {
    if (!mobileMenu || !mobileMenu.classList.contains('is-open')) return;
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('inert', '');
    mobileMenu.setAttribute('aria-hidden', 'true');
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open menu');
    }
    syncBodyLock();
    if (navToggle) navToggle.focus({ preventScroll: true });
  }

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      if (mobileMenu.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (mobileClose) mobileClose.addEventListener('click', closeMenu);

  $$('.mobile-nav a, .mobile-menu-foot a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      const hash = link.getAttribute('href');
      const target = hash && hash.length > 1 ? document.querySelector(hash) : null;
      if (!target) return;
      event.preventDefault();
      closeMenu();
      window.setTimeout(function () {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('is-open')) {
      closeMenu();
      return;
    }

    if (event.key === 'Tab' && mobileMenu && mobileMenu.classList.contains('is-open')) {
      const focusable = $$('a[href], button:not([disabled])', mobileMenu).filter(function (element) {
        return element.offsetParent !== null;
      });
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  /* ---------- Header + scrollspy ---------- */

  const navLinks = $$('[data-nav]');
  const spySections = ['about', 'factory', 'products', 'catalogue', 'made-to-order', 'why-us', 'contact']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  let scrollQueued = false;

  function onScrollFrame() {
    scrollQueued = false;

    if (header) {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    }

    const position = window.scrollY + 170;
    let currentId = '';

    spySections.forEach(function (section) {
      if (section.offsetTop <= position) currentId = section.id;
    });

    navLinks.forEach(function (link) {
      link.classList.toggle('is-active', link.dataset.nav === currentId);
    });
  }

  window.addEventListener('scroll', function () {
    if (!scrollQueued) {
      scrollQueued = true;
      window.requestAnimationFrame(onScrollFrame);
    }
  }, { passive: true });

  onScrollFrame();

  /* ---------- Reveal on scroll ---------- */

  const revealElements = $$('[data-reveal]');

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    revealElements.forEach(function (element) { revealObserver.observe(element); });
  } else {
    revealElements.forEach(function (element) { element.classList.add('is-visible'); });
  }

  /* ---------- Quote form ---------- */

  if (form) {
    const thankYouUrl = new URL('thank-you.html', window.location.href).href;
    if (formNext) formNext.value = thankYouUrl;

    function resetStatus() {
      if (!statusBox) return;
      statusBox.classList.remove('is-visible');
      statusBox.textContent = '';
    }

    function setLoading(loading) {
      if (!submitButton) return;
      submitButton.classList.toggle('is-loading', loading);
      submitButton.disabled = loading;
    }

    function showSuccess() {
      if (formBody) formBody.hidden = true;
      if (formSuccess) formSuccess.hidden = false;
      if (statusBox) statusBox.classList.remove('is-visible');
      resetStatus();
      if (quoteContext) quoteContext.hidden = true;
      if (formSuccess) {
        window.setTimeout(function () {
          formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 80);
      }
    }

    function resetFileField() {
      if (fileInput) fileInput.value = '';
      if (fileName) {
        fileName.textContent = '';
        fileName.classList.remove('is-error');
      }
      if (fileTriggerLabel) fileTriggerLabel.textContent = 'Choose a file';
    }

    function showError() {
      if (!statusBox) return;
      statusBox.innerHTML = 'We couldn’t send your enquiry just now. Please <a href="mailto:alamsinternational3828@gmail.com">email us</a> or <a href="https://wa.me/919918173776" target="_blank" rel="noopener">message us on WhatsApp</a>.';
      statusBox.classList.add('is-visible');
    }

    if (fileInput && fileName) {
      fileInput.addEventListener('change', function () {
        resetStatus();
        fileName.classList.remove('is-error');
        if (!fileInput.files.length) {
          resetFileField();
          return;
        }
        const file = fileInput.files[0];
        if (file.size > 10 * 1024 * 1024) {
          fileName.textContent = 'This file is over 10 MB. Please choose a smaller file.';
          fileName.classList.add('is-error');
          fileInput.value = '';
          if (fileTriggerLabel) fileTriggerLabel.textContent = 'Choose a file';
          return;
        }
        fileName.textContent = file.name;
        if (fileTriggerLabel) fileTriggerLabel.textContent = 'Change file';
      });
    }

    form.addEventListener('submit', function (event) {
      resetStatus();

      const hasFile = fileInput && fileInput.files && fileInput.files.length > 0;

      // Native submission is needed for attachments; FormSubmit handles the redirect.
      if (hasFile) {
        if (formNext) formNext.value = thankYouUrl;
        setLoading(true);
        return;
      }

      event.preventDefault();
      setLoading(true);

      const payload = new FormData(form);

      fetch(form.dataset.ajax, {
        method: 'POST',
        body: payload,
        headers: { Accept: 'application/json' }
      })
        .then(function (response) {
          return response.json().catch(function () { return {}; }).then(function (data) {
            if (!response.ok || String(data.success) === 'false') {
              throw new Error(data.message || 'Submission failed');
            }
            return data;
          });
        })
        .then(function () {
          showSuccess();
          form.reset();
          if (formNext) formNext.value = thankYouUrl;
          resetFileField();
          setLoading(false);
        })
        .catch(function () {
          setLoading(false);
          showError();
        });
    });

    if (resetFormButton) {
      resetFormButton.addEventListener('click', function () {
        form.reset();
        if (formNext) formNext.value = thankYouUrl;
        resetFileField();
        if (formBody) formBody.hidden = false;
        if (formSuccess) formSuccess.hidden = true;
        if (quoteContext) quoteContext.hidden = true;
        resetStatus();
        nameInput.focus({ preventScroll: true });
        const quoteSection = $('#quote');
        if (quoteSection) quoteSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }

  /* ---------- Initial render ---------- */

  renderProducts('bags', false);
}());
