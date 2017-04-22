/**
 * src: ng-ui-bs paging
 */
export function buildPages(
  currentPage,
  totalPages,
  {
    maxSize = null,
    rotate = true,
    forceEllipses = false,
    boundaryLinkNumbers = false,
    pageLabel = idx => idx,
    makePage = (number, text, active) => ({number, text, active}),
  } = {}
) {
  const pages = [];

  // Default page limits
  let startPage = 1,
      endPage = totalPages;
  const isMaxSized = maxSize !== null && maxSize < totalPages;

  // recompute if maxSize
  if (isMaxSized) {
    if (rotate) {
      // Current page is displayed in the middle of the visible ones
      startPage = Math.max(currentPage - Math.floor(maxSize / 2), 1);
      endPage = startPage + maxSize - 1;

      // Adjust if limit is exceeded
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = endPage - maxSize + 1;
      }
    } else {
      // Visible pages are paginated with maxSize
      startPage = (Math.ceil(currentPage / maxSize) - 1) * maxSize + 1;

      // Adjust last page if limit is exceeded
      endPage = Math.min(startPage + maxSize - 1, totalPages);
    }
  }

  // Add page number links
  for (let number = startPage; number <= endPage; number++) {
    const page = makePage(number, pageLabel(number), number === currentPage);
    pages.push(page);
  }

  // Add links to move between page sets
  if (isMaxSized && maxSize > 0 && (!rotate || forceEllipses || boundaryLinkNumbers)) {
    if (startPage > 1) {
      if (!boundaryLinkNumbers || startPage > 3) { //need ellipsis for all options unless range is too close to beginning
        const previousPageSet = makePage(startPage - 1, '...', false);
        pages.unshift(previousPageSet);
      }
      if (boundaryLinkNumbers) {
        if (startPage === 3) { //need to replace ellipsis when the buttons would be sequential
          const secondPageLink = makePage(2, '2', false);
          pages.unshift(secondPageLink);
        }
        //add the first page
        const firstPageLink = makePage(1, '1', false);
        pages.unshift(firstPageLink);
      }
    }

    if (endPage < totalPages) {
      if (!boundaryLinkNumbers || endPage < totalPages - 2) { //need ellipsis for all options unless range is too close to end
        const nextPageSet = makePage(endPage + 1, '...', false);
        pages.push(nextPageSet);
      }
      if (boundaryLinkNumbers) {
        if (endPage === totalPages - 2) { //need to replace ellipsis when the buttons would be sequential
          const secondToLastPageLink = makePage(totalPages - 1, totalPages - 1, false);
          pages.push(secondToLastPageLink);
        }
        //add the last page
        const lastPageLink = makePage(totalPages, totalPages, false);
        pages.push(lastPageLink);
      }
    }
  }

  return pages;
}
