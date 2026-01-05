/**
 * Utility function to smoothly scroll to a section by ID
 * @param {string} sectionId - The ID of the section to scroll to
 * @param {number} offset - Optional offset in pixels (default: 0)
 */
export const scrollToSection = (sectionId, offset = 0) => {
  if (!sectionId) return;

  const section = document.getElementById(sectionId);
  if (!section) {
    console.warn(`[scrollToSection] Section not found: ${sectionId}`);
    return;
  }

  const headerHeight = 85; // Sticky header height
  const sectionPosition = section.offsetTop - headerHeight - offset;

  window.scrollTo({
    top: sectionPosition,
    behavior: 'smooth',
  });
};

/**
 * Navigate to home page and scroll to section
 * @param {Function} navigate - React Router navigate function
 * @param {string} sectionId - The ID of the section to scroll to
 */
export const navigateAndScroll = (navigate, sectionId) => {
  navigate('/');
  setTimeout(() => {
    scrollToSection(sectionId);
  }, 120);
};
