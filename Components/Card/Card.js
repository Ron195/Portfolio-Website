// components/Card/Card.js

document.addEventListener('DOMContentLoaded', function () {
    const mediaContent = document.querySelector('.media-content');
    const scrollbarThumb = mediaContent.querySelector('.scrollbar-thumb'); // Scoped within .media-content
    const customScrollbar = mediaContent.querySelector('.custom-scrollbar'); // Scoped within .media-content

    function updateScrollbar() {
        const contentHeight = mediaContent.scrollHeight;  // Full scrollable height
        const visibleHeight = mediaContent.clientHeight;  // Visible height
        const scrollTop = mediaContent.scrollTop;
    
        // Set the height of .custom-scrollbar to match the full scrollable content height
        customScrollbar.style.height = `${contentHeight}px`;
    
        // Guard clause to prevent issues when content height is less than or equal to visible height
        if (contentHeight <= visibleHeight) {
            scrollbarThumb.style.height = `${visibleHeight}px`;
            scrollbarThumb.style.top = '0px';
            return;
        }
    
        // Calculate the thumb height proportionally based on visible and total content height
        const thumbHeight = Math.max((visibleHeight / contentHeight) * visibleHeight, 20); // Reduced minimum height
        scrollbarThumb.style.height = `${thumbHeight}px`;
    
        // Calculate the thumb position based on how far you've scrolled
        const maxThumbTop = customScrollbar.clientHeight - thumbHeight;
        const thumbTop = (scrollTop / (contentHeight - visibleHeight)) * maxThumbTop;
        scrollbarThumb.style.top = `${thumbTop}px`;
    }
    
    // Initial update
    updateScrollbar();

    // Update on scroll
    mediaContent.addEventListener('scroll', updateScrollbar);

    // Update on window resize
    window.addEventListener('resize', updateScrollbar);

    // Function to handle thumb dragging
    let isDragging = false;
    let startY;
    let startScrollTop;

    scrollbarThumb.addEventListener('mousedown', function (e) {
        isDragging = true;
        startY = e.clientY;
        startScrollTop = mediaContent.scrollTop;
        document.body.classList.add('no-select'); // Prevent text selection
        e.preventDefault();
    });

    document.addEventListener('mousemove', function (e) {
        if (!isDragging) return;
        const deltaY = e.clientY - startY;
        const contentHeight = mediaContent.scrollHeight;
        const visibleHeight = mediaContent.clientHeight;
        const maxScrollTop = contentHeight - visibleHeight;

        const thumbHeight = scrollbarThumb.clientHeight;
        const maxThumbTop = visibleHeight - thumbHeight;

        const scrollRatio = maxScrollTop / maxThumbTop;
        mediaContent.scrollTop = startScrollTop + deltaY * scrollRatio;
    });

    document.addEventListener('mouseup', function () {
        if (isDragging) {
            isDragging = false;
            document.body.classList.remove('no-select');
        }
    });
});
