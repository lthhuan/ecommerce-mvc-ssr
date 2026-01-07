const buttonStatus = document.querySelectorAll("[button-status]")
if(buttonStatus.length > 0 ){
    let url = new URL(window.location.href)    
    buttonStatus.forEach(button => {
        // console.log(button)
        button.addEventListener("click", () =>{
            const status = button.getAttribute("button-status");
            // console.log(status)
            if(status){
                url.searchParams.set("status", status)
            }else{
                url.searchParams.delete("status")
            }
            window.location.href = url.href
        })
    })
}


//Form Search
const formSearch = document.querySelector("#form-search");

if(formSearch) {
    let url = new URL (window.location.href)
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault()
        const keyword = e.target.elements.keyword.value
        if (keyword) {
            url.searchParams.set("keyword", keyword)

        }else{
            url.searchParams.delete("keyword")

        }
        window.location.href = url.href
    })
}

//Pagination
const buttonPagination = document.querySelectorAll("[button-pagination]")
if(buttonPagination){
    let url = new URL(window.location.href)
    buttonPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination")
            console.log(page)
            url.searchParams.set("page", page)
            window.location.href = url.href
        })
    })
    }

//Alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
    const time = parseInt(showAlert.getAttribute("data-time"));

    setTimeout(() => {
        showAlert.classList.add("alert-hidden");


        setTimeout(() => {
            showAlert.remove();
        }, 500);
    }, time);
}

//Upload img
const uploadImage = document.querySelector("[upload-image]")
if(uploadImage) {
    const uploadImageInput = document.querySelector("[upload-image-input]")
    const uploadImagePreview = document.querySelector("[upload-image-preview]")



    uploadImageInput.addEventListener("change", (e) => {


        const file = uploadImageInput.files[0]
        if(file){
            uploadImagePreview.src = URL.createObjectURL(file)
        }
    })

    const uploadImageRemove = document.querySelector("[upload-image-remove]")

    console.log(uploadImageRemove)
   
    if(uploadImageRemove){
        uploadImageRemove.addEventListener("click", () =>{
            uploadImageInput.value=""
            uploadImagePreview.src=""
        })
    }
   
}

// Sort
const sort = document.querySelector("[sort]")
if(sort){
    let url = new URL(window.location.href)
    const sortSelect = sort.querySelector("[sort-select]")
    const clearSort = sort.querySelector("[sort-clear]")

    sortSelect.addEventListener("change", (e) => {
        const value = e.target.value
        const [sortKey, sortValue]=value.split("-")
        console.log(sortKey)
        console.log(sortValue)
        url.searchParams.set("sortKey", sortKey)
        url.searchParams.set("sortValue", sortValue)

        window.location.href = url.href

    })
    // Delete sort
    clearSort.addEventListener("click", () => {
        url.searchParams.delete("sortKey")
        url.searchParams.delete("sortValue")
        window.location.href = url.href

    })

    //Selected
    const sortKey = url.searchParams.get("sortKey")
    const sortValue = url.searchParams.get("sortValue")

    if(sortKey && sortValue){
        const stringSort = `${sortKey}-${sortValue}`

        const optionSelected = sortSelect.querySelector(`option[value='${stringSort}']`)

        optionSelected.selected = true
    }
}



