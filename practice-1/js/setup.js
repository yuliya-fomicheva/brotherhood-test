
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


// событие при вводе номера телефона
phoneInput.addEventListener('input', (e) => {
  const newPhoneNumber = e.target.value.replace(/\D+/g, ''); 
  const newFormattedPhoneNumber = formatPhoneNumber(newPhoneNumber);
  e.target.value = newFormattedPhoneNumber;
  phoneInput.value = newFormattedPhoneNumber;
  phoneInput.setAttribute('value', phoneInput.value);

});


// событие при удалении цифр в номере телефона
phoneInput.addEventListener('keydown', (e) => {
  if (e.key === 'Backspace' || e.key === 'Delete') {
    const phoneNumber = e.target.value.replace(/\D+/g, ''); 
    const phoneNumberArray = phoneNumber.split('');
    const phoneNumberArrayLength = phoneNumberArray.length;
    if (phoneNumberArrayLength > 1) {
      phoneNumberArray.pop();
      const newPhoneNumber = phoneNumberArray.join('');
      const newFormattedPhoneNumber = formatPhoneNumber(newPhoneNumber);
      e.target.value = newFormattedPhoneNumber;
      phoneInput.value = newFormattedPhoneNumber;
    }

  } else if (e.key !== 'Backspace' && e.key !== 'Delete' && isNaN(e.key)) {
    e.preventDefault();
  }
});

// Ввод номера по маске
function formatPhoneNumber(phoneNumber) {
  const maskArray = '+_ ___ ___-__-__'.split('');
  let formattedPhoneNumber = '';
  let digitIndex = 0;
  for (let i = 0; i < maskArray.length; i++) {
    if (maskArray[i] === '_') {
      if (digitIndex < phoneNumber.length) {
        formattedPhoneNumber += phoneNumber[digitIndex++];
      } else {
        formattedPhoneNumber += '_';
      }
    } else {
      formattedPhoneNumber += maskArray[i];
    }
  }
  return formattedPhoneNumber;
}

phoneInput.addEventListener('invalid', () => {
    phoneInput.setSelectionRange(phoneInput.value.length, phoneInput.value.length);
  })