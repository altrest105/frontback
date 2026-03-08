document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    if (!form) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        document.querySelectorAll('.input.is-danger, .textarea.is-danger').forEach(el => {
            el.classList.remove('is-danger');
        });
        document.querySelectorAll('.help.is-danger').forEach(el => el.remove());

        let isValid = true;

        // Проверка ФИО (минимум 2 слова)
        const fullname = document.getElementById('fullname');
        const fullnameValue = fullname.value.trim();
        const words = fullnameValue.split(' ').filter(word => word.length > 0);
        if (fullnameValue === '' || words.length < 2) {
            showError(fullname, 'Введите фамилию и имя');
            isValid = false;
        }

        // Проверка телефона
        const phone = document.getElementById('phone');
        const phoneValue = phone.value.trim();
        const phoneDigits = phoneValue.replace(/\D/g, ''); 
        if (phoneValue === '' || phoneDigits.length < 10) {
            showError(phone, 'Введите корректный номер (минимум 10 цифр)');
            isValid = false;
        }

        // Проверка email
        const email = document.getElementById('email');
        const emailValue = email.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailValue)) {
            showError(email, 'Введите корректный email');
            isValid = false;
        }

        if (isValid) {
            const formData = {
                fullname: fullnameValue,
                phone: phoneValue,
                email: emailValue,
                message: document.getElementById('message').value.trim() || '(не заполнено)'
            };

            const event = new CustomEvent('formValid', { detail: formData });
            document.dispatchEvent(event);
            
            alert('Форма успешно прошла валидацию!');
            form.reset();
        }
    });

    // Функция для вывода ошибки под полем
    function showError(input, message) {
        input.classList.add('is-danger');
        const help = document.createElement('p');
        help.classList.add('help', 'is-danger');
        help.textContent = message;
        input.closest('.control').parentNode.appendChild(help);
    }
});