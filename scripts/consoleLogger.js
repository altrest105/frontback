document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('formValid', function(event) {
        const formData = event.detail;

        console.clear();
        console.log('%c--- Данные формы InvestMind ---', 'color: #00d1b2; font-weight: bold;');
        console.log('ФИО:', formData.fullname);
        console.log('Телефон:', formData.phone);
        console.log('Email:', formData.email);
        console.log('Сообщение:', formData.message);
        console.log('Время отправки:', new Date().toLocaleString());
        console.log('-------------------------------');
    });
});