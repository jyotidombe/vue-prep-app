<script setup lang="ts">
import { throttle } from '../utils/throttle';
import { debounce } from '../utils/debounce';
import { ref } from 'vue';
import logoutBtn from '../components/common/logoutBtn.vue';

const text = ref('');

const handleInput = debounce(()=> {
    console.log('inputvalue', text.value);
  },100)

const handleScroll = throttle(() => {
  console.log('Scroll triggered')
}, 1000)

window.addEventListener('scroll', handleScroll)

</script>
<template>
  <main class="container py-4">
    <div class="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
      <div>
        <h2 class="fw-bold text-primary">Welcome to the Dashboard</h2>
        <p class="text-muted mb-0">This is the main dashboard for users.</p>
      </div>
      <logoutBtn/>
    </div>
    <div class="card shadow-sm border-0">
      <div class="card-body p-4">
        <!-- SEARCH / INPUT -->
        <div class="mb-4">
          <label class="form-label fw-semibold">
            Search / Type Something
          </label>

          <input
            type="text"
            class="form-control form-control-lg"
            placeholder="Start typing..."
            v-model="text"
            @input="handleInput"
          />

          <small class="text-muted">
            Debounced input example using utility function.
          </small>
        </div>

         <!-- QUICK ACTIONS -->
        <div class="row g-3 mb-4">
          <div class="col-md-4">
            <div class="card bg-primary text-white shadow-sm h-100">
              <div class="card-body">
                <h5 class="card-title">Tasks</h5>

                <p class="card-text">
                  Manage and organize your daily tasks efficiently.
                </p>

                <RouterLink
                  to="/tasks"
                  class="btn btn-light btn-sm"
                >
                  Go to Tasks
                </RouterLink>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card bg-success text-white shadow-sm h-100">
              <div class="card-body">
                <h5 class="card-title">Performance</h5>

                <p class="card-text">
                  Scroll throttling and optimized input handling enabled.
                </p>

                <span class="badge bg-light text-success">
                  Optimized UI
                </span>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card bg-dark text-white shadow-sm h-100">
              <div class="card-body">
                <h5 class="card-title">Utilities</h5>

                <p class="card-text">
                  Reusable utility functions improve application performance.
                </p>

                <span class="badge bg-warning text-dark">
                  Reusable Code
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- INFO SECTION -->
        <div class="alert alert-info mb-0">
          <strong>Tip:</strong>
          Try scrolling the page and typing inside the input field to test
          throttle and debounce functionality.
        </div>
      </div>
    </div>
  </main>
</template>