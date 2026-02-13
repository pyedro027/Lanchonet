/*
  ==================== CONFIGURAÇÕES RÁPIDAS ====================
  Edite aqui quando precisar atualizar dados fixos da lanchonete:
  - WHATSAPP_NUMBER: número para links e finalização
  - INSTAGRAM_HANDLE: @ do Instagram
  - STORE_ADDRESS: endereço completo
  - OPENING_HOURS: horários de funcionamento
  - MENU_ITEMS: itens do cardápio (nome, preço, descrição, ingredientes)
*/

const WHATSAPP_NUMBER = "5527981194230";
const INSTAGRAM_HANDLE = "@Pyedropereira";
const STORE_ADDRESS = "Rua Montevideu 640, Araçás, Vila Velha";
const OPENING_HOURS = {
  week: "Seg a Sáb 18:00–23:30",
  sunday: "Dom 18:00–21:00",
};

const CART_STORAGE_KEY = "pyedro_lanches_cart";
const NAME_STORAGE_KEY = "pyedro_lanches_customer_name";

/*
  ==================== ITENS DO CARDÁPIO ====================
  Para editar preços, nomes, descrições e ingredientes, altere o array MENU_ITEMS.
*/
const MENU_ITEMS = [
  {
    id: 1,
    categoria: "Hambúrgueres",
    nome: "X-Burger",
    descricao: "Clássico, direto ao ponto.",
    preco: 18.9,
    ingredientes: ["pão", "hambúrguer", "queijo", "molho da casa"],
  },
  {
    id: 2,
    categoria: "Hambúrgueres",
    nome: "X-Salada",
    descricao: "Leve e caprichado.",
    preco: 21.9,
    ingredientes: ["pão", "hambúrguer", "queijo", "alface", "tomate", "molho da casa"],
  },
  {
    id: 3,
    categoria: "Hambúrgueres",
    nome: "X-Bacon",
    descricao: "Bacon pra chamar de seu.",
    preco: 24.9,
    ingredientes: ["pão", "hambúrguer", "queijo", "bacon", "molho da casa"],
  },
  {
    id: 4,
    categoria: "Hambúrgueres",
    nome: "X-Tudo",
    descricao: "Pra quem não veio brincar.",
    preco: 29.9,
    ingredientes: [
      "pão",
      "2 hambúrgueres",
      "queijo",
      "bacon",
      "presunto",
      "ovo",
      "alface",
      "tomate",
      "molho da casa",
    ],
  },
  { id: 5, categoria: "Salgados", nome: "Coxinha", descricao: "Salgado crocante e recheado.", preco: 8 },
  { id: 6, categoria: "Salgados", nome: "Enroladinho", descricao: "Massa macia com recheio saboroso.", preco: 8 },
  { id: 7, categoria: "Porções de Batata", nome: "Batata Frita P", descricao: "Porção pequena para matar a vontade.", preco: 16 },
  { id: 8, categoria: "Porções de Batata", nome: "Batata Frita M", descricao: "Porção média para dividir.", preco: 22 },
  { id: 9, categoria: "Porções de Batata", nome: "Batata Frita G", descricao: "Porção grande para a galera.", preco: 28 },
  { id: 10, categoria: "Bebidas", nome: "Refrigerante Lata (350ml)", descricao: "Gelado para acompanhar seu lanche.", preco: 6 },
  { id: 11, categoria: "Bebidas", nome: "Refrigerante 600ml", descricao: "Ideal para dividir.", preco: 9 },
  { id: 12, categoria: "Bebidas", nome: "Água Mineral", descricao: "Leve e refrescante.", preco: 3.5 },
  { id: 13, categoria: "Bebidas", nome: "Água com Gás", descricao: "Refrescante com gás.", preco: 4.5 },
  { id: 14, categoria: "Bebidas", nome: "Suco (Copo 400ml)", descricao: "Suco do dia no copo.", preco: 7 },
  { id: 15, categoria: "Bebidas", nome: "Energético (250ml)", descricao: "Energia extra para sua noite.", preco: 12 },
];

const categories = ["Todos", "Hambúrgueres", "Porções de Batata", "Bebidas", "Salgados"];

const formatCurrencyBRL = (value) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

const parseJSON = (value, fallback) => {
  try {
    return JSON.parse(value) ?? fallback;
  } catch {
    return fallback;
  }
};

function initNavbar() {
  const toggle = document.querySelector(".menu-toggle");
  const navLinks = document.getElementById("nav-links");
  if (!toggle || !navLinks) return;

  toggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

function initQuickContactForm() {
  const form = document.getElementById("quick-contact-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = form.querySelector("#nome")?.value.trim() || "";
    const whatsappCliente = form.querySelector("#whatsapp")?.value.trim() || "";
    const mensagem = form.querySelector("#mensagem")?.value.trim() || "";

    if (!nome || !whatsappCliente || !mensagem) {
      alert("Por favor, preencha nome, WhatsApp e mensagem para continuar.");
      return;
    }

    const text = `Olá! Sou ${nome}. Meu WhatsApp: ${whatsappCliente}. Mensagem: ${mensagem}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    form.reset();
  });
}


function initHeroNightButton() {
  const trigger = document.getElementById("hero-night-btn");
  const menu = document.getElementById("hero-night-menu");
  if (!trigger || !menu) return;

  trigger.addEventListener("click", () => {
    const isOpen = trigger.getAttribute("aria-expanded") === "true";
    trigger.setAttribute("aria-expanded", String(!isOpen));
    menu.hidden = isOpen;
  });

  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Node)) return;
    if (trigger.contains(event.target) || menu.contains(event.target)) return;
    trigger.setAttribute("aria-expanded", "false");
    menu.hidden = true;
  });
}

function initMenuPage() {
  const menuGrid = document.getElementById("menu-grid");
  const filtersContainer = document.getElementById("filters");
  const searchInput = document.getElementById("search-input");
  const cartItemsList = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout-btn");
  const customerNameInput = document.getElementById("customer-name");
  const cartToggleBtn = document.getElementById("cart-toggle");
  const cartCount = document.getElementById("cart-count");
  const cartPanel = document.getElementById("cart-panel");
  const cartCloseBtn = document.getElementById("cart-close");

  if (!menuGrid || !filtersContainer || !searchInput || !cartItemsList || !cartTotal || !checkoutBtn || !customerNameInput) {
    return;
  }

  let selectedCategory = "Todos";
  let searchTerm = "";
  let cart = parseJSON(localStorage.getItem(CART_STORAGE_KEY), []);

  customerNameInput.value = localStorage.getItem(NAME_STORAGE_KEY) || "";
  customerNameInput.addEventListener("input", () => {
    localStorage.setItem(NAME_STORAGE_KEY, customerNameInput.value.trim());
  });

  const persistCart = () => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  };

  const findItemById = (id) => MENU_ITEMS.find((item) => item.id === id);

  const updateTotal = () => {
    const total = cart.reduce((sum, item) => sum + item.preco * item.quantidade, 0);
    cartTotal.textContent = formatCurrencyBRL(total);
  };

  const updateCartCount = () => {
    if (!cartCount) return;
    const qty = cart.reduce((sum, item) => sum + item.quantidade, 0);
    cartCount.textContent = String(qty);
  };

  const renderCart = () => {
    if (!cart.length) {
      cartItemsList.innerHTML = "<li>Seu carrinho está vazio.</li>";
      updateTotal();
      updateCartCount();
      return;
    }

    cartItemsList.innerHTML = "";

    cart.forEach((item) => {
      const li = document.createElement("li");
      li.className = "cart-item";
      li.innerHTML = `
        <strong>${item.nome}</strong>
        <p>${formatCurrencyBRL(item.preco)} x ${item.quantidade}</p>
        <div class="qty-controls">
          <button type="button" data-action="decrease" data-id="${item.id}" aria-label="Diminuir quantidade de ${item.nome}">-</button>
          <span>${item.quantidade}</span>
          <button type="button" data-action="increase" data-id="${item.id}" aria-label="Aumentar quantidade de ${item.nome}">+</button>
          <button type="button" class="remove-btn" data-action="remove" data-id="${item.id}">Remover</button>
        </div>
      `;
      cartItemsList.appendChild(li);
    });

    updateTotal();
    updateCartCount();
  };

  const addToCart = (id) => {
    const item = findItemById(id);
    if (!item) return;

    const existing = cart.find((cartItem) => cartItem.id === id);
    if (existing) {
      existing.quantidade += 1;
    } else {
      cart.push({ ...item, quantidade: 1 });
    }

    persistCart();
    renderCart();
  };

  const addPromotedItemFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    const addParam = params.get("add");
    if (!addParam) return;

    addParam
      .split(",")
      .map((value) => Number(value.trim()))
      .filter((id) => Number.isInteger(id))
      .forEach((id) => addToCart(id));

    params.delete("add");
    const cleanQuery = params.toString();
    const cleanURL = `${window.location.pathname}${cleanQuery ? `?${cleanQuery}` : ""}`;
    window.history.replaceState({}, "", cleanURL);
  };

  const changeQuantity = (id, action) => {
    const cartItem = cart.find((item) => item.id === id);
    if (!cartItem) return;

    if (action === "increase") cartItem.quantidade += 1;
    if (action === "decrease") cartItem.quantidade -= 1;

    if (action === "remove" || cartItem.quantidade <= 0) {
      cart = cart.filter((item) => item.id !== id);
    }

    persistCart();
    renderCart();
  };

  const renderMenuItems = () => {
    const filteredItems = MENU_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === "Todos" || item.categoria === selectedCategory;
      const matchesSearch = item.nome.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (!filteredItems.length) {
      menuGrid.innerHTML = "<p>Nenhum item encontrado para este filtro.</p>";
      return;
    }

    menuGrid.innerHTML = "";

    filteredItems.forEach((item) => {
      const card = document.createElement("article");
      card.className = "menu-item";

      const ingredientsHTML = item.ingredientes?.length
        ? `<p class="ingredients"><strong>Ingredientes:</strong> ${item.ingredientes.join(", ")}</p>`
        : "";

      card.innerHTML = `
        <h3>${item.nome}</h3>
        <p>${item.descricao}</p>
        ${ingredientsHTML}
        <p class="price">${formatCurrencyBRL(item.preco)}</p>
        <button class="btn btn-primary add-btn" type="button" data-id="${item.id}">Adicionar</button>
      `;

      menuGrid.appendChild(card);
    });
  };

  const renderFilters = () => {
    filtersContainer.innerHTML = "";

    categories.forEach((category) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `filter-btn ${selectedCategory === category ? "active" : ""}`;
      button.textContent = category;

      button.addEventListener("click", () => {
        selectedCategory = category;
        renderFilters();
        renderMenuItems();
      });

      filtersContainer.appendChild(button);
    });
  };

  menuGrid.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    const addButton = target.closest(".add-btn");
    if (!addButton) return;

    const id = Number(addButton.getAttribute("data-id"));
    addToCart(id);
  });

  cartItemsList.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    const button = target.closest("button[data-action]");
    if (!button) return;

    const id = Number(button.getAttribute("data-id"));
    const action = button.getAttribute("data-action") || "";
    changeQuantity(id, action);
  });

  searchInput.addEventListener("input", () => {
    searchTerm = searchInput.value.trim();
    renderMenuItems();
  });

  checkoutBtn.addEventListener("click", () => {
    if (!cart.length) {
      alert("Adicione itens ao carrinho antes de finalizar.");
      return;
    }

    const total = cart.reduce((sum, item) => sum + item.preco * item.quantidade, 0);

    const itemLines = cart.map((item) => {
      const subtotal = item.preco * item.quantidade;
      return `- ${item.quantidade}x ${item.nome} (${formatCurrencyBRL(item.preco)}) = ${formatCurrencyBRL(subtotal)}`;
    });

    const customerName = (customerNameInput.value || localStorage.getItem(NAME_STORAGE_KEY) || "").trim();

    const message = [
      "Pedido - Pyedro Lanches",
      "Itens:",
      ...itemLines,
      `Total: ${formatCurrencyBRL(total)}`,
      `Entrega ou retirada? 
Meu nome é: ${customerName}`,
    ].join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  });


  if (cartToggleBtn && cartPanel) {
    cartToggleBtn.addEventListener("click", () => {
      const isOpen = cartPanel.classList.toggle("open");
      cartToggleBtn.setAttribute("aria-expanded", String(isOpen));
    });
  }

  if (cartCloseBtn && cartPanel && cartToggleBtn) {
    cartCloseBtn.addEventListener("click", () => {
      cartPanel.classList.remove("open");
      cartToggleBtn.setAttribute("aria-expanded", "false");
    });
  }

  renderFilters();
  renderMenuItems();
  addPromotedItemFromURL();
  renderCart();
}

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initHeroNightButton();
  initQuickContactForm();
  initMenuPage();
});
