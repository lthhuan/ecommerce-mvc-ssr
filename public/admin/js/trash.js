const buttonRestore = document.querySelectorAll("[button-restore]")
// console.log(buttonRestore)
if (buttonRestore.length > 0) {
    const formRestore = document.querySelector("#form-restore-item")
    const path = formRestore.getAttribute("data-path")
    buttonRestore.forEach(button => {

        button.addEventListener("click", () => {
            const isConfirm = confirm("Bạn có chắc khôi phục sản phẩm này không?")
            if (isConfirm) {
                const id = button.getAttribute("data-id")
                const action = path + `/${id}?_method=PATCH`
                formRestore.action = action
                formRestore.submit()

            }

        })




    })
}

const buttonDeleteHard = document.querySelectorAll("[button-delete-hard]")

if (buttonDeleteHard.length > 0) {
    const formDeleteHard = document.querySelector("#form-delete-hard-item")

    const path = formDeleteHard.getAttribute("data-path")

    buttonDeleteHard.forEach(button => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("Bạn có chắc khôi phục sản phẩm này không?")
            if (isConfirm) {
                const id = button.getAttribute("data-id")
                const action = path + `/${id}/?_method=DELETE`
                formDeleteHard.action = action
                formDeleteHard.submit()
            }



        })
    })
}