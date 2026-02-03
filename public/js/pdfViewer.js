// public/js/pdfViewer.js
// Requires pdf.js loaded on the page

if (!window.pdfjsLib) {
    console.error("pdf.js did not load. Check the <script src=...> URL and Network tab.");
  }

async function initPdfViewer(viewerEl) {
    const url = viewerEl.dataset.pdf;
    if (!url) return;
  
    // Avoid re-initializing the same viewer repeatedly
    if (viewerEl.dataset.loaded === "true") return;
  
    const canvas = viewerEl.querySelector(".pdf-canvas");
    const ctx = canvas.getContext("2d");
  
    const prevBtn = viewerEl.querySelector(".pdf-prev");
    const nextBtn = viewerEl.querySelector(".pdf-next");
    const pageNumEl = viewerEl.querySelector(".pdf-page-num");
    const pageCountEl = viewerEl.querySelector(".pdf-page-count");
  
    let pdfDoc = null;
    let pageNum = 1;
  
    // pdf.js worker setup (important)
    // If your CDN version changes, update this to match.
    window.pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  
  
    pdfDoc = await window.pdfjsLib.getDocument(url).promise;
    pageCountEl.textContent = pdfDoc.numPages;
  
    async function renderPage(num) {
        const page = await pdfDoc.getPage(num);
      
        const viewport = page.getViewport({ scale: 1 });
      
        // Available space inside the viewer
        const toolbar = viewerEl.querySelector(".pdf-toolbar");
        const toolbarH = toolbar ? toolbar.offsetHeight + 12 : 0;
      
        const availableWidth = viewerEl.clientWidth || 800;
        const availableHeight = (viewerEl.clientHeight || 600) - toolbarH;
      
        // Scale to fit BOTH width & height
        const scaleX = availableWidth / viewport.width;
        const scaleY = availableHeight / viewport.height;
        const scale = Math.min(scaleX, scaleY);
      
        const scaledViewport = page.getViewport({ scale });
      
        canvas.width = Math.floor(scaledViewport.width);
        canvas.height = Math.floor(scaledViewport.height);
      
        await page.render({ canvasContext: ctx, viewport: scaledViewport }).promise;
      
        pageNumEl.textContent = num;
        prevBtn.disabled = num <= 1;
        nextBtn.disabled = num >= pdfDoc.numPages;
      }      

    // async function renderPage(num) {
    //   const page = await pdfDoc.getPage(num);
  
    //   // Scale to fit the modal width nicely
    //   const viewport = page.getViewport({ scale: 1 });
    //   const desiredWidth =
    //     viewerEl.clientWidth ||
    //     viewerEl.parentElement?.clientWidth ||
    //     800; // fallback
    //   const scale = desiredWidth / viewport.width;
    //   const scaledViewport = page.getViewport({ scale });
  
    //   canvas.width = Math.floor(scaledViewport.width);
    //   canvas.height = Math.floor(scaledViewport.height);
  
    //   await page.render({ canvasContext: ctx, viewport: scaledViewport }).promise;
  
    //   pageNumEl.textContent = num;
    //   prevBtn.disabled = num <= 1;
    //   nextBtn.disabled = num >= pdfDoc.numPages;
    // }
  
    prevBtn.addEventListener("click", () => {
      if (pageNum <= 1) return;
      pageNum -= 1;
      renderPage(pageNum);
    });
  
    nextBtn.addEventListener("click", () => {
      if (!pdfDoc || pageNum >= pdfDoc.numPages) return;
      pageNum += 1;
      renderPage(pageNum);
    });
  
    viewerEl.dataset.loaded = "true";
    await renderPage(pageNum);
  }
  
  // Hook into your existing openModal function
  window.initPdfInModal = function (modalEl) {
    if (!modalEl) return;
    const viewer = modalEl.querySelector(".pdf-viewer");
    if (viewer) initPdfViewer(viewer);
  };
  