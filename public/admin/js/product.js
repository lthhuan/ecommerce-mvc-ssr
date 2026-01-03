const buttonChangeStatus = document.querySelectorAll("[button-change-status]");

if (buttonChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("#form-change-status")
    const path = formChangeStatus.getAttribute("data-path")
    buttonChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const statusCurrent = button.getAttribute("data-status")
            const id = button.getAttribute("data-id")

            let statusChange = statusCurrent == "active" ? "inactive" : "active";

            const action = path + `/${statusChange}/${id}?_method=PATCH`

            formChangeStatus.action = action
            formChangeStatus.submit()
        })
    })
}

const checkboxMulti = document.querySelector("[checkbox-multi]")

if (checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']")
    const inputsId = checkboxMulti.querySelectorAll("input[name='id']")

    inputCheckAll.addEventListener("click", () => {
        if (inputCheckAll.checked) {
            inputsId.forEach(input => {
                input.checked = true;
            })
        } else {
            inputsId.forEach(input => {
                input.checked = false;
            })
        }
    })

    inputsId.forEach(input => {
        input.addEventListener("click", () => {
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length
            if (countChecked == inputsId.length) {
                inputCheckAll.checked = true
            } else {
                inputCheckAll.checked = false
            }
        })
    })

}

const formChangeMulti = document.querySelector("[form-change-multi]")
if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault()
        const checkboxMulti = document.querySelector("[checkbox-multi]")
        const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");

        const typeChange = e.target.elements.type.value;
        if (typeChange == "deleted") {
            const isConfirm = confirm("Bạn chắc chắn muốn xóa (các)sản phẩm này?")
            if (!isConfirm) {
                return;
            }
        }

        if (inputsChecked.length > 0) {
            let ids = [];

            const inputIds = formChangeMulti.querySelector("input[name='ids']")
            inputsChecked.forEach(input => {
                const id = input.value;


                if (typeChange == "change-position") {
                    const position = input.closest("tr").querySelector("input[name='position']").value
               
                    ids.push(`${id}-${position}`)
              
                }else

                ids.push(id)
            });
            inputIds.value = ids.join(", ");
            formChangeMulti.submit();

        } else {
            alert("Vui lòng chọn ít nhất 1 bảng ghi!")
        }


    });


}

const buttonDelete = document.querySelectorAll("[button-delete]")
if (buttonDelete.length > 0) {
    const formDeleteItem = document.querySelector("#form-delete-item")
    const path = formDeleteItem.getAttribute("data-path")

    buttonDelete.forEach(button => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")
            if (isConfirm) {
                const id = button.getAttribute("data-id");

                const action = `${path}/${id}?_method=DELETE`

                formDeleteItem.action = action;

                formDeleteItem.submit()

            }
        })
    })
}
