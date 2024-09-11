// script.js
document.getElementById('taskForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const task = document.getElementById('taskInput').value;

  // Send task to the backend
  const response = await fetch('/api/generate-steps', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ task })
  });

  const data = await response.json();
  const steps = data.steps;

  const stepsContainer = document.getElementById('stepsContainer');
  stepsContainer.innerHTML = '';  // Clear previous steps

  steps.forEach(step => {
    const stepItem = document.createElement('div');
    stepItem.classList.add('step-item');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const stepText = document.createElement('span');
    stepText.textContent = step;

    stepItem.appendChild(checkbox);
    stepItem.appendChild(stepText);
    stepsContainer.appendChild(stepItem);
  });
});
