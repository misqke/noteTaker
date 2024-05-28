    /** START PAGE ELEMENTS */

    const pagesNav = document.querySelector("#pages-nav ul");
    const newPageModal = document.getElementById("new-page-modal");
    const newPageSubmitBtn = document.getElementById("new-page-submit-button");
    const newPageModalBtn = document.getElementById("new-page-modal-button");
    const newPageForm = document.getElementById("new-page-form");
    const newPageInput = document.querySelector("#new-page-form input");
    const newPageError = document.getElementById("new-page-form-error");

    /** END PAGE ELEMENTS */

    /////////////////////////////////////////////////////////////////////////////////////////////////

    /** START STATE */

    let pages =  notesManager.getPages();

    /** END STATE */

    /////////////////////////////////////////////////////////////////////////////////////////////////

    /** START FUNCTIONS */

    const createNavItem = (page) => {
      const item = document.createElement("li");
      item.setAttribute("pageId", page.PageId);
      item.innerText = page.Title;
      pagesNav.append(item);
      return item;
    }

    const handleModalError = (error) => {
      if (error == undefined || error == null) {
        newPageError.innerText = "";
      } else {
        newPageError.innerText = error;
      }
    }

    const handleNewPage = (title) => {
        const newPage = notesManager.addPage(title);
        if (newPage.success == true) {
          pages.push(newPage.data);
          createNavItem(newPage.data);
          handleModalError();
          newPageModal.classList.remove("show");
        } else {
          handleModalError(newPage.error);
        }
      }

    /** END FUNCTIONS */

    /////////////////////////////////////////////////////////////////////////////////////////////////

    /** START PAGES NAVIGATION */
    
    pages.forEach(page => {
      console.log(page);
      const item = createNavItem(page);
    });

    /** END PAGES NAVIGATION */
    
    /////////////////////////////////////////////////////////////////////////////////////////////////
    
    /** START NEW PAGE BUTTON */

      newPageModalBtn.onclick = () => newPageModal.classList.add("show");
      newPageModal.onclick = (e) => {
        if (e.target.id == "new-page-modal") {
            newPageModal.classList.remove("show");
        }
      }

      newPageForm.onsubmit = (e) => {
        e.preventDefault();
        handleNewPage(newPageInput.value);
        newPageForm.reset();
      }

    /** END NEW PAGE BUTTON */

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////