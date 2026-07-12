// タブ切り替え
const tabButtons = document.querySelectorAll(".tab-button");
const tabPanels = document.querySelectorAll(".tab-panel");

function activateTab(targetButton, shouldFocus = false) {
  const targetPanelId = targetButton.getAttribute("aria-controls");
  const targetPanel = document.getElementById(targetPanelId);

  tabButtons.forEach((button) => {
    button.classList.remove("is-active");
    button.setAttribute("aria-selected", "false");
    button.setAttribute("tabindex", "-1");
  });

  tabPanels.forEach((panel) => {
    panel.classList.remove("is-show");
    panel.hidden = true;
  });

  targetButton.classList.add("is-active");
  targetButton.setAttribute("aria-selected", "true");
  targetButton.setAttribute("tabindex", "0");

  targetPanel.classList.add("is-show");
  targetPanel.hidden = false;

  if (shouldFocus) {
    targetButton.focus();
  }
}

tabButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    activateTab(button);
  });

  button.addEventListener("keydown", (event) => {
    const lastIndex = tabButtons.length - 1;
    let nextIndex;

    if (event.key === "ArrowRight") {
      nextIndex = index === lastIndex ? 0 : index + 1;
    } else if (event.key === "ArrowLeft") {
      nextIndex = index === 0 ? lastIndex : index - 1;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = lastIndex;
    } else {
      return;
    }

    event.preventDefault();
    activateTab(tabButtons[nextIndex], true);
  });
});

// モーダル
const modalOpenBtn = document.getElementById("pricing-modal-open");

const pricingModal = document.getElementById("pricing-modal");

const modalCloseBtn = document.getElementById("pricing-modal-close");

modalOpenBtn.addEventListener("click", () => {
  pricingModal.showModal();
  modalCloseBtn.focus();
});

modalCloseBtn.addEventListener("click", () => {
  pricingModal.close();
});

pricingModal.addEventListener("click", (event) => {
  const rect = pricingModal.getBoundingClientRect();

  const isInsideDialog =
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom;

  if (!isInsideDialog) {
    pricingModal.close();
  }
});

pricingModal.addEventListener("close", () => {
  modalOpenBtn.focus();
});

// フォームバリデーション
const contactForm = document.getElementById("contact-form");

const contactNameInput = document.getElementById("contact-name");
const contactEmailInput = document.getElementById("contact-email");
const contactEmailConfirmInput = document.getElementById("contact-email-confirm");
const contactMessageInput = document.getElementById("contact-message");

const submitBtn = document.getElementById("contact-submit");

const contactModal = document.getElementById("contact-complete-modal");
const contactModalCloseBtn = document.getElementById("contact-complete-close");

const contactCompleteName = document.getElementById("complete-name");
const contactCompleteEmail = document.getElementById("complete-email");
const contactCompleteInquiryType = document.getElementById("complete-inquiry-type");
const contactCompleteMenus = document.getElementById("complete-menus");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const emailConfirmError = document.getElementById("email-confirm-error");
const inquiryTypeError = document.getElementById("inquiry-type-error");
const menuError = document.getElementById("menu-error");
const messageError = document.getElementById("message-error");

const emailPattern = /^[a-zA-Z0-9_+-]+(\.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*\.)+[a-zA-Z]{2,}$/;

const inquiryTypeField = inquiryTypeError.closest(".choice-field");
const menuField = menuError.closest(".choice-field");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // 送信のたびに、まず前回のエラー表示をリセットする
  nameError.hidden = true;
  emailError.hidden = true;
  emailConfirmError.hidden = true;
  inquiryTypeError.hidden = true;
  menuError.hidden = true;
  messageError.hidden = true;

  contactNameInput.removeAttribute("aria-invalid");
  contactEmailInput.removeAttribute("aria-invalid");
  contactEmailConfirmInput.removeAttribute("aria-invalid");
  contactMessageInput.removeAttribute("aria-invalid");
  inquiryTypeField.removeAttribute("aria-invalid");
  menuField.removeAttribute("aria-invalid");

  const contactName = contactNameInput.value.trim();
  const contactEmail = contactEmailInput.value.trim();
  const contactEmailConfirm = contactEmailConfirmInput.value.trim();
  const contactMessage = contactMessageInput.value.trim();

  const selectedInquiryTypeInput = document.querySelector('input[name="inquiryType"]:checked');

  const selectedMenuInputs = document.querySelectorAll('input[name="menus"]:checked');

  let firstErrorElement = null;

  if (contactName === "") {
    nameError.textContent = "お名前を入力してください。";
    nameError.hidden = false;
    contactNameInput.setAttribute("aria-invalid", "true");

    if (firstErrorElement === null) {
      firstErrorElement = contactNameInput;
    }
  }

  if (contactEmail === "") {
    emailError.textContent = "メールアドレスを入力してください。";
    emailError.hidden = false;
    contactEmailInput.setAttribute("aria-invalid", "true");

    if (firstErrorElement === null) {
      firstErrorElement = contactEmailInput;
    }
  } else if (!emailPattern.test(contactEmail)) {
    emailError.textContent = "有効なメールアドレスを入力してください。";
    emailError.hidden = false;
    contactEmailInput.setAttribute("aria-invalid", "true");

    if (firstErrorElement === null) {
      firstErrorElement = contactEmailInput;
    }
  }

  if (contactEmailConfirm === "") {
    emailConfirmError.textContent = "確認用メールアドレスを入力してください。";
    emailConfirmError.hidden = false;
    contactEmailConfirmInput.setAttribute("aria-invalid", "true");

    if (firstErrorElement === null) {
      firstErrorElement = contactEmailConfirmInput;
    }
  } else if (contactEmail !== contactEmailConfirm) {
    emailConfirmError.textContent = "メールアドレスが一致しません。";
    emailConfirmError.hidden = false;
    contactEmailConfirmInput.setAttribute("aria-invalid", "true");

    if (firstErrorElement === null) {
      firstErrorElement = contactEmailConfirmInput;
    }
  }

  if (!selectedInquiryTypeInput) {
    inquiryTypeError.textContent = "お問い合わせの種類を選択してください。";
    inquiryTypeError.hidden = false;
    inquiryTypeField.setAttribute("aria-invalid", "true");

    if (firstErrorElement === null) {
      firstErrorElement = document.querySelector('input[name="inquiryType"]');
    }
  }

  if (selectedMenuInputs.length === 0) {
    menuError.textContent = "希望メニューを1つ以上選択してください。";
    menuError.hidden = false;
    menuField.setAttribute("aria-invalid", "true");

    if (firstErrorElement === null) {
      firstErrorElement = document.querySelector('input[name="menus"]');
    }
  }

  if (contactMessage === "") {
    messageError.textContent = "お問い合わせ内容を入力してください。";
    messageError.hidden = false;
    contactMessageInput.setAttribute("aria-invalid", "true");

    if (firstErrorElement === null) {
      firstErrorElement = contactMessageInput;
    }
  } else if (contactMessage.length < 10) {
    messageError.textContent = "お問い合わせ内容は10文字以上で入力してください。";
    messageError.hidden = false;
    contactMessageInput.setAttribute("aria-invalid", "true");

    if (firstErrorElement === null) {
      firstErrorElement = contactMessageInput;
    }
  }

  // エラーが1つでもあれば、最初のエラー項目にフォーカスして送信処理を止める
  if (firstErrorElement !== null) {
    firstErrorElement.focus();
    return;
  }

  // ここから下は、エラーがなかった場合だけ実行される
  const selectedInquiryType = selectedInquiryTypeInput.value;

  const selectedMenus = Array.from(selectedMenuInputs)
    .map((input) => input.value)
    .join("、");

  submitBtn.disabled = true;
  submitBtn.textContent = "送信中...";

  setTimeout(function () {
    contactCompleteName.textContent = contactName;
    contactCompleteEmail.textContent = contactEmail;
    contactCompleteInquiryType.textContent = selectedInquiryType;
    contactCompleteMenus.textContent = selectedMenus;

    submitBtn.disabled = false;
    submitBtn.textContent = "送信する";

    contactModal.showModal();
    contactModalCloseBtn.focus();
  }, 1000);
});

// 入力修正時のエラー解除
function clearInputError(errorElement, inputElement) {
  errorElement.hidden = true;
  inputElement.removeAttribute("aria-invalid");
}

function clearGroupError(errorElement, groupElement) {
  errorElement.hidden = true;
  groupElement.removeAttribute("aria-invalid");
}

contactNameInput.addEventListener("input", () => {
  if (contactNameInput.value.trim() !== "") {
    clearInputError(nameError, contactNameInput);
  }
});

contactEmailInput.addEventListener("input", () => {
  const contactEmail = contactEmailInput.value.trim();
  const contactEmailConfirm = contactEmailConfirmInput.value.trim();

  if (emailPattern.test(contactEmail)) {
    clearInputError(emailError, contactEmailInput);
  }

  if (contactEmailConfirm !== "" && contactEmail === contactEmailConfirm) {
    clearInputError(emailConfirmError, contactEmailConfirmInput);
  }
});

contactEmailConfirmInput.addEventListener("input", () => {
  const contactEmail = contactEmailInput.value.trim();
  const contactEmailConfirm = contactEmailConfirmInput.value.trim();

  if (contactEmailConfirm !== "" && contactEmail === contactEmailConfirm) {
    clearInputError(emailConfirmError, contactEmailConfirmInput);
  }
});

const inquiryTypeInputs = document.querySelectorAll('input[name="inquiryType"]');

inquiryTypeInputs.forEach((input) => {
  input.addEventListener("change", () => {
    clearGroupError(inquiryTypeError, inquiryTypeField);
  });
});

const menuInputs = document.querySelectorAll('input[name="menus"]');

menuInputs.forEach((input) => {
  input.addEventListener("change", () => {
    const selectedMenuInputs = document.querySelectorAll('input[name="menus"]:checked');

    if (selectedMenuInputs.length > 0) {
      clearGroupError(menuError, menuField);
    }
  });
});

contactMessageInput.addEventListener("input", () => {
  if (contactMessageInput.value.trim().length >= 10) {
    clearInputError(messageError, contactMessageInput);
  }
});

contactModalCloseBtn.addEventListener("click", () => {
  contactModal.close();
});

contactModal.addEventListener("click", (event) => {
  const rect = contactModal.getBoundingClientRect();

  const isInsideDialog =
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom;

  if (!isInsideDialog) {
    contactModal.close();
  }
});

contactModal.addEventListener("close", () => {
  contactForm.reset();
  submitBtn.focus();
});

// トップに戻るボタン
const pagetopBtn = document.querySelector(".pagetop");

if (pagetopBtn) {
  pagetopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  let isScrolling = false;

  window.addEventListener("scroll", () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 100) {
          pagetopBtn.classList.add("is-show");
        } else {
          pagetopBtn.classList.remove("is-show");
        }
        isScrolling = false;
      });
      isScrolling = true;
    }
  });
}

// ハンバーガーメニュー
const menuBtn = document.getElementById("menu-button");
const navMenu = document.getElementById("global-nav");
const navLinks = document.querySelectorAll(".nav-list a");

function openMenu() {
  navMenu.classList.add("is-open");
  menuBtn.classList.add("is-open");
  menuBtn.setAttribute("aria-expanded", "true");
  menuBtn.setAttribute("aria-label", "メニューを閉じる");
}

function closeMenu() {
  navMenu.classList.remove("is-open");
  menuBtn.classList.remove("is-open");
  menuBtn.setAttribute("aria-expanded", "false");
  menuBtn.setAttribute("aria-label", "メニューを開く");
}

menuBtn.addEventListener("click", () => {
  if (navMenu.classList.contains("is-open")) {
    closeMenu();
  } else {
    openMenu();
  }
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navMenu.classList.contains("is-open")) {
    closeMenu();
    menuBtn.focus();
  }
});

document.addEventListener("click", (event) => {
  if (!navMenu.classList.contains("is-open")) {
    return;
  }

  if (menuBtn.contains(event.target)) {
    return;
  }

  if (navMenu.contains(event.target)) {
    return;
  }

  closeMenu();
});
