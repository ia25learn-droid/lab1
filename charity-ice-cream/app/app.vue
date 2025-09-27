<template>
  <div>
    <!-- Header -->
    <header class="header">
      <nav class="navbar">
        <div class="nav-container">
          <div class="logo">
            <i class="fas fa-ice-cream"></i>
            <span>Sweet Scoops for Lions</span>
          </div>
          <ul class="nav-menu" :class="{ active: mobileMenuOpen }">
            <li><a href="#home" @click="scrollToSection('home')">Home</a></li>
            <li><a href="#menu" @click="scrollToSection('menu')">Ice Cream Menu</a></li>
            <li><a href="#cause" @click="scrollToSection('cause')">Our Cause</a></li>
            <li><a href="#contact" @click="scrollToSection('contact')">Contact</a></li>
            <li><a href="#order" @click="scrollToSection('order')" class="cta-btn">Order Now</a></li>
          </ul>
          <div class="hamburger" @click="toggleMobileMenu" :class="{ active: mobileMenuOpen }">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
    </header>

    <!-- Hero Section -->
    <section id="home" class="hero">
      <div class="hero-content">
        <div class="hero-text">
          <h1>Sweet Scoops for a <span class="highlight">Sweet Cause</span></h1>
          <p class="hero-subtitle">Join us in raising funds for Lion Clubs by enjoying delicious, handcrafted ice cream!</p>
          <div class="hero-stats">
            <div class="stat">
              <h3>${{ goalAmount.toLocaleString() }}</h3>
              <p>Fundraising Goal</p>
            </div>
            <div class="stat">
              <h3>50+</h3>
              <p>Ice Cream Flavors</p>
            </div>
            <div class="stat">
              <h3>100%</h3>
              <p>Goes to Charity</p>
            </div>
          </div>
          <div class="hero-buttons">
            <button @click="scrollToSection('menu')" class="btn btn-primary">View Menu</button>
            <button @click="scrollToSection('cause')" class="btn btn-secondary">Learn More</button>
          </div>
        </div>
        <div class="hero-image">
          <div class="ice-cream-stack">
            <div class="scoop scoop-strawberry"></div>
            <div class="scoop scoop-vanilla"></div>
            <div class="scoop scoop-chocolate"></div>
            <div class="cone"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Menu Section -->
    <section id="menu" class="menu-section">
      <div class="container">
        <h2 class="section-title">Our Delicious Menu</h2>
        <p class="section-subtitle">Every scoop makes a difference!</p>
        
        <div class="menu-grid">
          <div v-for="(item, index) in menuItems" :key="index" class="menu-item" :class="{ featured: item.featured }">
            <div class="menu-icon">{{ item.icon }}</div>
            <h3>{{ item.title }}</h3>
            <ul>
              <li v-for="flavor in item.flavors" :key="flavor">{{ flavor }}</li>
            </ul>
            <div class="price">${{ item.price }} per scoop</div>
            <div v-if="item.featured" class="featured-badge">Most Popular</div>
          </div>
        </div>

        <div class="toppings-section">
          <h3>Available Toppings</h3>
          <div class="toppings-grid">
            <span v-for="topping in toppings" :key="topping" class="topping">{{ topping }}</span>
          </div>
          <p class="toppings-note">Each topping: $1 extra</p>
        </div>
      </div>
    </section>

    <!-- Cause Section -->
    <section id="cause" class="cause-section">
      <div class="container">
        <div class="cause-content">
          <div class="cause-text">
            <h2>Supporting Lion Clubs International</h2>
            <p class="lead">Lion Clubs International is the world's largest service club organization, with 1.4 million members in over 200 countries and geographic areas.</p>
            
            <div class="cause-points">
              <div v-for="(point, index) in causePoints" :key="index" class="point">
                <i :class="point.icon"></i>
                <div>
                  <h4>{{ point.title }}</h4>
                  <p>{{ point.description }}</p>
                </div>
              </div>
            </div>

            <div class="progress-bar">
              <div class="progress-label">
                <span>Fundraising Progress</span>
                <span>${{ currentAmount.toLocaleString() }} / ${{ goalAmount.toLocaleString() }}</span>
              </div>
              <div class="progress">
                <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
              </div>
            </div>
          </div>
          <div class="cause-image">
            <div class="lion-logo">
              <i class="fas fa-paw"></i>
              <h3>Lions Club</h3>
              <p>We Serve</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact-section">
      <div class="container">
        <h2 class="section-title">Get Your Sweet Scoops Today!</h2>
        
        <div class="contact-grid">
          <div class="contact-info">
            <h3>Event Details</h3>
            <div v-for="info in eventInfo" :key="info.label" class="info-item">
              <i :class="info.icon"></i>
              <div>
                <strong>{{ info.label }}:</strong>
                <span>{{ info.value }}</span>
              </div>
            </div>
          </div>

          <div class="order-form" id="order">
            <h3>Pre-Order Your Ice Cream</h3>
            <form @submit.prevent="submitOrder" class="contact-form">
              <div class="form-group">
                <label for="name">Full Name</label>
                <input type="text" id="name" v-model="orderForm.name" required>
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="orderForm.email" required>
              </div>
              <div class="form-group">
                <label for="flavor">Preferred Flavor</label>
                <select id="flavor" v-model="orderForm.flavor" @change="calculatePrice" required>
                  <option value="">Select a flavor</option>
                  <option v-for="flavor in flavors" :key="flavor.value" :value="flavor.value">
                    {{ flavor.emoji }} {{ flavor.label }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label for="quantity">Number of Scoops</label>
                <input type="number" id="quantity" v-model.number="orderForm.quantity" min="1" max="10" @input="calculatePrice" required>
              </div>
              <div class="price-display">
                Estimated Total: ${{ estimatedTotal }}
              </div>
              <button type="submit" class="btn btn-primary full-width">Place Pre-Order</button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <div class="logo">
              <i class="fas fa-ice-cream"></i>
              <span>Sweet Scoops for Lions</span>
            </div>
            <p>Every scoop counts towards making a difference in our community through Lion Clubs International.</p>
          </div>
          <div class="footer-section">
            <h4>Event Info</h4>
            <ul>
              <li>Every Weekend in October</li>
              <li>11:00 AM - 8:00 PM</li>
              <li>Community Park, Main Street</li>
              <li>(555) 123-4567</li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 Sweet Scoops for Lions. All rights reserved. | A charity initiative supporting Lion Clubs International</p>
        </div>
      </div>
    </footer>

    <!-- Success Message -->
    <div v-if="showSuccessMessage" class="notification notification-success show">
      <div class="notification-content">
        <i class="fas fa-check-circle"></i>
        <span>Thank you! Your pre-order has been received. We'll contact you soon!</span>
        <button @click="hideSuccessMessage" class="notification-close">&times;</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// SEO
useHead({
  title: 'Sweet Scoops for Lions - Charity Ice Cream Event',
  meta: [
    { name: 'description', content: 'Join us in raising funds for Lion Clubs by enjoying delicious, handcrafted ice cream! Every scoop makes a difference.' }
  ],
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap' },
    { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css' }
  ]
})

// Reactive data
const mobileMenuOpen = ref(false)
const currentAmount = ref(1250)
const goalAmount = ref(5000)
const progressPercentage = computed(() => (currentAmount.value / goalAmount.value) * 100)
const showSuccessMessage = ref(false)

const menuItems = [
  {
    icon: '🍓',
    title: 'Classic Flavors',
    flavors: ['Vanilla Bean', 'Chocolate Fudge', 'Strawberry Swirl', 'Mint Chocolate Chip'],
    price: 5,
    featured: false
  },
  {
    icon: '🦁',
    title: 'Lion\'s Pride Special',
    flavors: ['Golden Caramel', 'Royal Chocolate', 'Brave Berry Blast', 'Courage Cookie Crunch'],
    price: 7,
    featured: true
  },
  {
    icon: '🌟',
    title: 'Premium Selection',
    flavors: ['Salted Caramel Pretzel', 'Lavender Honey', 'Pistachio Rose', 'Dark Chocolate Sea Salt'],
    price: 8,
    featured: false
  }
]

const toppings = [
  'Hot Fudge', 'Caramel Sauce', 'Rainbow Sprinkles', 'Crushed Oreos',
  'Fresh Berries', 'Whipped Cream', 'Chopped Nuts', 'Cherry on Top'
]

const causePoints = [
  {
    icon: 'fas fa-heart',
    title: 'Community Service',
    description: 'Supporting local communities through various charitable initiatives and volunteer work.'
  },
  {
    icon: 'fas fa-eye',
    title: 'Vision Care',
    description: 'Providing eye care services and fighting preventable blindness worldwide.'
  },
  {
    icon: 'fas fa-hands-helping',
    title: 'Disaster Relief',
    description: 'Offering immediate assistance and long-term recovery support for disaster-affected communities.'
  }
]

const eventInfo = [
  { icon: 'fas fa-calendar', label: 'Date', value: 'Every Weekend in October' },
  { icon: 'fas fa-clock', label: 'Time', value: '11:00 AM - 8:00 PM' },
  { icon: 'fas fa-map-marker-alt', label: 'Location', value: 'Community Park, Main Street' },
  { icon: 'fas fa-phone', label: 'Phone', value: '(555) 123-4567' },
  { icon: 'fas fa-envelope', label: 'Email', value: 'sweetscoops@lionscharity.org' }
]

const flavors = [
  { value: 'vanilla', label: 'Vanilla Bean', emoji: '🍦', price: 5 },
  { value: 'chocolate', label: 'Chocolate Fudge', emoji: '🍫', price: 5 },
  { value: 'strawberry', label: 'Strawberry Swirl', emoji: '🍓', price: 5 },
  { value: 'mint', label: 'Mint Chocolate Chip', emoji: '🌿', price: 5 },
  { value: 'caramel', label: 'Golden Caramel (Lion\'s Pride)', emoji: '🍯', price: 7 },
  { value: 'royal', label: 'Royal Chocolate (Lion\'s Pride)', emoji: '👑', price: 7 },
  { value: 'premium', label: 'Premium Selection', emoji: '⭐', price: 8 }
]

const orderForm = reactive({
  name: '',
  email: '',
  phone: '',
  flavor: '',
  quantity: 1,
  message: ''
})

const estimatedTotal = ref(5)

// Methods
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const scrollToSection = (sectionId) => {
  mobileMenuOpen.value = false
  
  if (process.client) {
    const targetElement = document.getElementById(sectionId)
    if (targetElement) {
      const headerHeight = document.querySelector('.header')?.offsetHeight || 80
      const targetPosition = targetElement.offsetTop - headerHeight - 20
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
  }
}

const calculatePrice = () => {
  const selectedFlavor = flavors.find(f => f.value === orderForm.flavor)
  const pricePerScoop = selectedFlavor ? selectedFlavor.price : 5
  estimatedTotal.value = orderForm.quantity * pricePerScoop
}

const submitOrder = () => {
  if (!orderForm.name || !orderForm.email || !orderForm.flavor) {
    alert('Please fill in all required fields!')
    return
  }
  
  showSuccessMessage.value = true
  
  // Reset form
  Object.keys(orderForm).forEach(key => {
    if (key === 'quantity') {
      orderForm[key] = 1
    } else {
      orderForm[key] = ''
    }
  })
  
  calculatePrice()
}

const hideSuccessMessage = () => {
  showSuccessMessage.value = false
}

// Initialize
onMounted(() => {
  calculatePrice()
})

// Watch for quantity changes
watch(() => orderForm.quantity, () => {
  calculatePrice()
})
</script>

<style>
/* Reset and Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  line-height: 1.6;
  color: #333;
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Color Variables */
:root {
  --primary-color: #FF6B6B;
  --secondary-color: #4ECDC4;
  --accent-color: #FFE66D;
  --text-dark: #2C3E50;
  --text-light: #7F8C8D;
  --white: #FFFFFF;
  --gradient-primary: linear-gradient(135deg, #FF6B6B, #FFE66D);
  --gradient-secondary: linear-gradient(135deg, #4ECDC4, #44A08D);
  --shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  --shadow-hover: 0 15px 40px rgba(0, 0, 0, 0.15);
}

/* Header */
.header {
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  transition: all 0.3s ease;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

.navbar {
  padding: 1rem 0;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
}

.logo i {
  font-size: 2rem;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
  align-items: center;
}

.nav-menu a {
  text-decoration: none;
  color: var(--text-dark);
  font-weight: 500;
  transition: color 0.3s ease;
  cursor: pointer;
}

.nav-menu a:hover {
  color: var(--primary-color);
}

.cta-btn {
  background: var(--gradient-primary);
  color: var(--white) !important;
  padding: 10px 20px;
  border-radius: 25px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
}

.hamburger {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

.hamburger span {
  width: 25px;
  height: 3px;
  background: var(--text-dark);
  margin: 3px 0;
  transition: 0.3s;
}

/* Hero Section */
.hero {
  min-height: 100vh;
  background: linear-gradient(135deg, #FFE5E5 0%, #E5F9F6 100%);
  display: flex;
  align-items: center;
  padding: 120px 0 80px;
  position: relative;
  overflow: hidden;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
}

.hero-text h1 {
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 1rem;
  line-height: 1.2;
}

.highlight {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: var(--text-light);
  margin-bottom: 2rem;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat {
  text-align: center;
  padding: 1rem;
  background: var(--white);
  border-radius: 15px;
  box-shadow: var(--shadow);
}

.stat h3 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.stat p {
  color: var(--text-light);
  font-weight: 500;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 12px 30px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.btn-primary {
  background: var(--gradient-primary);
  color: var(--white);
}

.btn-secondary {
  background: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-hover);
}

.full-width {
  width: 100%;
}

/* Ice cream visual */
.hero-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.ice-cream-stack {
  position: relative;
  animation: float 6s ease-in-out infinite;
}

.scoop {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: -20px auto;
  position: relative;
  box-shadow: var(--shadow);
}

.scoop-strawberry {
  background: radial-gradient(circle at 30% 30%, #FFB3BA, #FF9A9E);
}

.scoop-vanilla {
  background: radial-gradient(circle at 30% 30%, #FFFACD, #FFF5B7);
}

.scoop-chocolate {
  background: radial-gradient(circle at 30% 30%, #D2691E, #8B4513);
}

.cone {
  width: 0;
  height: 0;
  border-left: 60px solid transparent;
  border-right: 60px solid transparent;
  border-top: 150px solid #DEB887;
  margin: 0 auto;
  position: relative;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

/* Menu Section */
.menu-section {
  padding: 80px 0;
  background: var(--white);
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 1rem;
}

.section-subtitle {
  text-align: center;
  font-size: 1.2rem;
  color: var(--text-light);
  margin-bottom: 3rem;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.menu-item {
  background: var(--white);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: var(--shadow);
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  border: 2px solid transparent;
}

.menu-item:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-hover);
}

.menu-item.featured {
  border: 2px solid var(--primary-color);
  background: linear-gradient(135deg, #FFF8E1 0%, #FFE5E5 100%);
}

.featured-badge {
  position: absolute;
  top: -10px;
  right: 20px;
  background: var(--gradient-primary);
  color: var(--white);
  padding: 5px 15px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
}

.menu-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.menu-item h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 1rem;
}

.menu-item ul {
  list-style: none;
  margin-bottom: 1.5rem;
}

.menu-item li {
  padding: 0.5rem 0;
  color: var(--text-light);
  border-bottom: 1px solid #f0f0f0;
}

.price {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
}

.toppings-section {
  background: #F8F9FA;
  padding: 3rem;
  border-radius: 20px;
  text-align: center;
}

.toppings-section h3 {
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 2rem;
}

.toppings-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1rem;
}

.topping {
  background: var(--white);
  padding: 0.5rem 1rem;
  border-radius: 25px;
  color: var(--text-dark);
  font-weight: 500;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.topping:hover {
  background: var(--gradient-primary);
  color: var(--white);
  transform: translateY(-2px);
}

.toppings-note {
  color: var(--text-light);
  font-style: italic;
}

/* Cause Section */
.cause-section {
  padding: 80px 0;
  background: linear-gradient(135deg, #E5F9F6 0%, #FFE5E5 100%);
}

.cause-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  align-items: center;
}

.cause-text h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 1rem;
}

.lead {
  font-size: 1.2rem;
  color: var(--text-light);
  margin-bottom: 2rem;
}

.cause-points {
  margin-bottom: 3rem;
}

.point {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: flex-start;
}

.point i {
  background: var(--gradient-primary);
  color: var(--white);
  padding: 1rem;
  border-radius: 50%;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.point h4 {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 0.5rem;
}

.point p {
  color: var(--text-light);
}

.progress-bar {
  background: var(--white);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: var(--shadow);
}

.progress-label {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-weight: 600;
  color: var(--text-dark);
}

.progress {
  background: #E0E0E0;
  height: 10px;
  border-radius: 5px;
  overflow: hidden;
}

.progress-fill {
  background: var(--gradient-primary);
  height: 100%;
  border-radius: 5px;
  transition: width 0.8s ease;
}

.cause-image {
  display: flex;
  justify-content: center;
}

.lion-logo {
  background: var(--white);
  padding: 3rem;
  border-radius: 20px;
  box-shadow: var(--shadow);
  text-align: center;
  transform: rotate(-5deg);
  transition: transform 0.3s ease;
}

.lion-logo:hover {
  transform: rotate(0deg);
}

.lion-logo i {
  font-size: 4rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.lion-logo h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 0.5rem;
}

.lion-logo p {
  color: var(--text-light);
  font-style: italic;
}

/* Contact Section */
.contact-section {
  padding: 80px 0;
  background: var(--white);
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
}

.contact-info h3 {
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 2rem;
}

.info-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: center;
}

.info-item i {
  background: var(--gradient-secondary);
  color: var(--white);
  padding: 1rem;
  border-radius: 50%;
  font-size: 1rem;
  flex-shrink: 0;
}

.info-item strong {
  color: var(--text-dark);
  display: block;
  margin-bottom: 0.25rem;
}

.info-item span {
  color: var(--text-light);
}

.order-form {
  background: #F8F9FA;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: var(--shadow);
}

.order-form h3 {
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 2rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-dark);
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #E0E0E0;
  border-radius: 10px;
  font-family: inherit;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
}

.price-display {
  margin: 1rem 0;
  padding: 1rem;
  background: #f0f0f0;
  border-radius: 10px;
  text-align: center;
  font-weight: 600;
  color: var(--primary-color);
  font-size: 1.1rem;
}

/* Footer */
.footer {
  background: var(--text-dark);
  color: var(--white);
  padding: 3rem 0 1rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h4 {
  margin-bottom: 1rem;
  font-weight: 600;
}

.footer-section ul {
  list-style: none;
}

.footer-section li {
  margin-bottom: 0.5rem;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid #34495E;
  color: #BDC3C7;
}

/* Notification */
.notification {
  position: fixed;
  top: 100px;
  right: 20px;
  z-index: 10000;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  max-width: 400px;
}

.notification-success {
  background: #4CAF50;
}

.notification.show {
  transform: translateX(0);
}

.notification-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.notification-close {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  margin-left: auto;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .nav-menu {
    position: fixed;
    left: -100%;
    top: 70px;
    flex-direction: column;
    background-color: var(--white);
    width: 100%;
    text-align: center;
    transition: 0.3s;
    box-shadow: var(--shadow);
    padding: 2rem 0;
  }

  .nav-menu.active {
    left: 0;
  }

  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }

  .hero-text h1 {
    font-size: 2.5rem;
  }

  .hero-stats {
    grid-template-columns: 1fr;
  }

  .menu-grid {
    grid-template-columns: 1fr;
  }

  .cause-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .contact-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .hero-text h1 {
    font-size: 2rem;
  }

  .container {
    padding: 0 15px;
  }

  .menu-item,
  .order-form {
    padding: 1.5rem;
  }
}
</style>
