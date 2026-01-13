// ================== RESTORE ==================
const buttonsRestore = document.querySelectorAll("[button-restore]");

if (buttonsRestore.length > 0) {
  const formRestore = document.querySelector("#form-restore-item");
  const path = formRestore.dataset.path;

  buttonsRestore.forEach(button => {
    button.addEventListener("click", () => {
      const confirmText =
        button.dataset.confirm || "Bạn có chắc muốn khôi phục mục này không?";
      if (!confirm(confirmText)) return;

      const id = button.dataset.id;

      formRestore.action = `${path}/${id}?_method=PATCH`;
      formRestore.submit();
    });
  });
}

// ================== DELETE HARD ==================
const buttonsDeleteHard = document.querySelectorAll("[button-delete-hard]");

if (buttonsDeleteHard.length > 0) {
  const formDeleteHard = document.querySelector("#form-delete-hard-item");
  const path = formDeleteHard.dataset.path;

  buttonsDeleteHard.forEach(button => {
    button.addEventListener("click", () => {
      const confirmText =
        button.dataset.confirm || "Bạn có chắc muốn xóa vĩnh viễn mục này không?";
      if (!confirm(confirmText)) return;

      const id = button.dataset.id;

      formDeleteHard.action = `${path}/${id}?_method=DELETE`;
      formDeleteHard.submit();
    });
  });
}
