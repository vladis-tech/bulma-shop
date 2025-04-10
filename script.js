// BulmaShop JavaScript

// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
      el.addEventListener('click', () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }
  
  // Add to cart functionality
  const addToCartButtons = document.querySelectorAll('.card-footer-item.button');
  
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get product info from parent card
      const card = this.closest('.card');
      const productName = card.querySelector('.title').textContent;
      const productPrice = card.querySelector('.price').textContent;
      
      // Show notification
      showNotification(`${productName} added to cart - ${productPrice}`);
    });
  });
});

// Show notification function
function showNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'notification is-primary is-light';
  notification.style.position = 'fixed';
  notification.style.bottom = '20px';
  notification.style.right = '20px';
  notification.style.zIndex = '999';
  notification.style.maxWidth = '300px';
  
  // Add delete button
  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete';
  deleteButton.addEventListener('click', function() {
    notification.remove();
  });
  
  // Add message and button to notification
  notification.appendChild(deleteButton);
  notification.appendChild(document.createTextNode(message));
  
  // Add notification to document
  document.body.appendChild(notification);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Search functionality
const searchForm = document.querySelector('.navbar-item .field.has-addons');
const searchInput = searchForm.querySelector('input');
const searchButton = searchForm.querySelector('.button');

searchButton.addEventListener('click', function(e) {
  e.preventDefault();
  if (searchInput.value.trim() !== '') {
    // In a real application, this would redirect to search results
    alert(`Searching for: ${searchInput.value}`);
    searchInput.value = '';
  }
});

// Newsletter subscription
const newsletterForm = document.querySelector('.section.has-background-light .field.has-addons');
const emailInput = newsletterForm.querySelector('input[type="email"]');
const subscribeButton = newsletterForm.querySelector('.button');

subscribeButton.addEventListener('click', function(e) {
  e.preventDefault();
  const email = emailInput.value.trim();
  
  if (email !== '' && isValidEmail(email)) {
    showNotification(`Thank you for subscribing with: ${email}`);
    emailInput.value = '';
  } else {
    showNotification('Please enter a valid email address');
  }
});

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}