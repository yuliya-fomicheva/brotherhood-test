//главная страница
const openModulBtn = document.querySelector('.project__button');
const title = document.querySelector('.project__title');

//модуль формы
const modalForm = document.querySelector(".modal");
const form = modalForm.querySelector(".modal__form");
const closeModalBtn = modalForm.querySelector(".form__button_cancel");

const phoneInput = document.getElementById('phone');
const avatarInput = document.getElementById('avatar');
const avatar = document.querySelector('.form__background-avatar');
const avatarIcon = document.querySelector('.background-avatar__icon');

const deleteImg = document.querySelector('.form__add-avatar-delete')



// открыть модуль формы
openModulBtn.addEventListener('click', function  (evt) {
    evt.preventDefault();
    modalForm.classList.add("modal_active");
 
}) 


//закрытие модуль формы
const closeModal = () => {
    modalForm.classList.remove("modal_active");
}

// закрытие модуль формы по кнопку Отменить
closeModalBtn.addEventListener ("click", function (evt) {
    evt.preventDefault();
    closeModal();
})

// закрытие модуль формы по нажатию вне формы
modalForm.addEventListener("click", function (evt) {
    if (evt.target === modalForm) {
        closeModal();
        title.textContent = 'Нажмите на кнопку, чтобы октрыть модальное окно';
    }
});

//Загрузка аватара
avatarInput.addEventListener('change', function() {
    var reader = new FileReader();
    reader.onload = function(e) {
        avatar.style.backgroundImage = 'url(' + e.target.result + ')';
        avatarIcon.classList.add('visually-hidden');
    };
    reader.readAsDataURL(this.files[0]);
  });

// удаление аватар
deleteImg.addEventListener('click', function  () { 
    avatarInput.value = '';
    avatar.style.backgroundImage = 'url(' + './img/avatar.jpg'+')';
    avatarIcon.classList.remove('visually-hidden');

  })




// проверка валидности формы и добавление нового значения в массив
form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    title.textContent = 'Заявка успешно отправлена!';
    closeModal();
});

//вврд номера телефона
phoneInput.addEventListener('input', function (e) {
  const x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
  e.target.value = !x[2] ? '+7 ' : '+7 ' + x[2] +  (x[3] ? ' ' + x[3] : '') + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
  phoneInput.setAttribute('value', phoneInput.value);

});
