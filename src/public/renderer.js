    /** START PAGE ELEMENTS */

    const pagesNav = document.querySelector("#pages-nav ul");
    const newPageModal = document.getElementById("new-page-modal");
    const newPageSubmitBtn = document.getElementById("new-page-submit-button");
    const newPageModalBtn = document.getElementById("new-page-modal-button");
    const newPageForm = document.getElementById("new-page-form");
    const newPageInput = document.querySelector("#new-page-form input");
    const newPageError = document.getElementById("new-page-form-error");
    const deletePageModalBtn = document.getElementById("delete-page-modal-button");
    const deletePageBtn = document.getElementById("delete-page-submit-button");
    const deletePageModal = document.getElementById("delete-page-modal");
    const notesBody = document.getElementById("notes-body");
    const pageTitle = document.getElementById("page-title");
    const notesContainer = document.getElementById("notes-container");
    const notesContent = document.getElementById("notes-content");
    const editorToggleBtn = document.getElementById("editor-toggle-btn");

    /** END PAGE ELEMENTS */

    /////////////////////////////////////////////////////////////////////////////////////////////////

    /** START STATE */

    let pages =  notesManager.getPages();
    let currentPage = null;
    let currentNotes = [];

    /** END STATE */

    /////////////////////////////////////////////////////////////////////////////////////////////////

    /** START FUNCTIONS */

    const handleToggleEditor = () => {
      notesContainer.classList.toggle("open");
    }

    const createNote = (note) => {
      const div = document.createElement("div");
      div.classList.add("single-note");
      div.innerHTML = note.Text;
      notesContent.append(div);
    }

    const setPage = (page) => {
      pageTitle.innerText = page.Title;
      currentPage = page;
      deletePageModalBtn.disabled = false;
      const response = notesManager.getPageNotes(page.PageId);
      notesContent.innerHTML = "";
      if (response.success) {
        currentNotes = response.data;
        response.data.forEach(note => {
          createNote(note);
        })
      } else {
        notesContent.innerHTML = response.error;
      }
    }

    const clearNotesBody = () => {
      pageTitle.innerText = "Select or create a page to continue."
      notesBody.innerHTML = "";
    }

    const handleDeletePage = () => {
      const response = notesManager.deletePage(currentPage.PageId);
      if (response.success == true) {
        deletePageModalBtn.disabled = true;
        const navItem = document.getElementById(`page-nav-${currentPage.PageId}`);
        navItem.remove();
        currentPage = null;
        clearNotesBody();
        deletePageModal.classList.remove("show");
      } else {
        alert(response.error);
      }
    }

    const createNavItem = (page) => {
      const item = document.createElement("li");
      item.setAttribute("pageId", page.PageId);
      item.id = `page-nav-${page.PageId}`
      item.innerText = page.Title;
      item.onclick = () => setPage(page);
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
        const response = notesManager.addPage(title);
        if (response.success == true) {
          pages.push(response.data);
          createNavItem(response.data);
          handleModalError();
          setPage(response.data);
          newPageModal.classList.remove("show");
        } else {
          handleModalError(response.error);
        }
      }

    /** END FUNCTIONS */

    /////////////////////////////////////////////////////////////////////////////////////////////////

    /** START PAGES NAVIGATION */
    
    pages.forEach(page => {
      const item = createNavItem(page);
    });

    /** END PAGES NAVIGATION */
    
    /////////////////////////////////////////////////////////////////////////////////////////////////
    
    /** START MENU BUTTONs */

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

      deletePageModalBtn.onclick = () => deletePageModal.classList.add("show");
      deletePageModal.onclick = (e) => {
        if (e.target.id == "delete-page-modal") {
            deletePageModal.classList.remove("show");
        }
      }

      deletePageBtn.onclick = () => {
        handleDeletePage();
      }

    /** END MENU BUTTONs */

    /////////////////////////////////////////////////////////////////////////////////////////////////

    /** START EDITOR */

    editorToggleBtn.onclick = handleToggleEditor;

    /** END EDITOR */
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////