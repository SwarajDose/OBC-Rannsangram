/**
 * Utility function to smoothly scroll to a section by ID
 * @param {string} sectionId - The ID of the section to scroll to
 * @param {number} offset - Optional offset in pixels (default: 0)
 */
export const scrollToSection = (sectionId, offset = 0) => {
  const section = document.getElementById(sectionId);
  if (section) {
    const headerHeight = 85; // Height of sticky header
    const sectionPosition = section.offsetTop - headerHeight - offset;
    window.scrollTo({
      top: sectionPosition,
      behavior: 'smooth'
    });
  }
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
  }, 100);
};

