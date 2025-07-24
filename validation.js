document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.needs-validation');

  const fullName = document.getElementById('fullName');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');
  const terms = document.getElementById('terms');

  const togglePassword = document.getElementById('togglePassword');
  const passwordStrength = document.getElementById('passwordStrength');

  // Correct password regex
  const PASSWORD_RE = /^(?=.*[A-Z])(?=.*\d)(?=.*\*)(?=.{8,})/;

  const setInvalid = (el) => {
    el.classList.add('is-invalid');
    el.classList.remove('is-valid');
  };

  const setValid = (el) => {
    el.classList.remove('is-invalid');
    el.classList.add('is-valid');
  };

  const calcStrength = (pwd) => {
    let s = 0;
    if (pwd.length >= 8) s += 25;
    if (/[A-Z]/.test(pwd)) s += 25;
    if (/\d/.test(pwd)) s += 25;
    if (/\*/.test(pwd)) s += 25;
    return s;
  };

  const updateStrength = (strength) => {
    passwordStrength.style.width = strength + '%';
    passwordStrength.className = 'progress-bar';
    if (strength < 50) passwordStrength.classList.add('bg-danger');
    else if (strength < 75) passwordStrength.classList.add('bg-warning');
    else passwordStrength.classList.add('bg-success');
  };

  const validateFullName = () => {
    if (fullName.value.trim() === '') {
      setInvalid(fullName);
      return false;
    }
    setValid(fullName);
    return true;
  };

  const validateEmail = () => {
    if (!email.checkValidity()) {
      setInvalid(email);
      return false;
    }
    setValid(email);
    return true;
  };

  const validatePassword = () => {
    const val = password.value.trim();
    const ok = PASSWORD_RE.test(val);
    updateStrength(calcStrength(val));

    if (!ok) {
      setInvalid(password);
      return false;
    }
    setValid(password);
    return true;
  };

  const validateConfirmPassword = () => {
    if (confirmPassword.value !== password.value || confirmPassword.value === '') {
      setInvalid(confirmPassword);
      return false;
    }
    setValid(confirmPassword);
    return true;
  };

  const validateTerms = () => {
    if (!terms.checked) {
      terms.classList.add('is-invalid');
      return false;
    }
    terms.classList.remove('is-invalid');
    return true;
  };

  if (togglePassword) {
    togglePassword.addEventListener('click', () => {
      const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
      password.setAttribute('type', type);
      togglePassword.textContent = type === 'password' ? 'Show' : 'Hide';
    });
  }

  fullName.addEventListener('input', validateFullName);
  email.addEventListener('input', validateEmail);
  password.addEventListener('input', () => {
    validatePassword();
    validateConfirmPassword();
  });
  confirmPassword.addEventListener('input', validateConfirmPassword);
  terms.addEventListener('change', validateTerms);

  form.addEventListener('submit', function (event) {
    const ok =
      validateFullName() &
      validateEmail() &
      validatePassword() &
      validateConfirmPassword() &
      validateTerms();

    if (!ok || !form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');
  }, false);
});
