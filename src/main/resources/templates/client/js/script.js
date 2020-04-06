window.addEventListener('DOMContentLoaded', () => {

  const request = new XMLHttpRequest()

  const createForm = document.querySelector('.create-form')
  const firstName = document.querySelector('#firstName')
  const lastName = document.querySelector('#lastName')
  const list = document.querySelector('ul')

  let contactsList = []

  //Создание нового контакта
  createForm.addEventListener('submit', (e) => {
    e.preventDefault()

    //Манипуляции с ID
    let contactId = contactsList.length

    contactsList.forEach(item => {
      if (item.id === contactId) {
        contactId++
      }
    })

    //Формирование данных для отправки
    const formData = {
      id: contactId,
      firstName: firstName.value,
      lastName: lastName.value
    }

    //Отправка данных
    request.open('POST', 'http://localhost:8080/api')
    request.setRequestHeader('Content-Type', 'application/json')
    request.send(JSON.stringify(formData))
    request.onload = () => {
      if (request.status != 200) {
        alert(`Ошибка ${request.status}: ${request.statusText}`)
      } else {
        getContactList()
      }
    }

    //Очистка инпутов
    firstName.value = ''
    lastName.value = ''

  })

  //Получение списка контактов с сервера
  const getContactList = () => {
    request.open('GET','http://localhost:8080/api')
    request.setRequestHeader('Content-Type', 'application/json')
    request.send()
    request.onload = () => {
      if (request.status != 200) {
        alert(`Ошибка ${request.status}: ${request.statusText}`)
      } else {
        contactsList = JSON.parse(request.response)

        const listItems = document.querySelectorAll('.collection-item')
        listItems.forEach(item => {
          list.removeChild(item)
        })

        //Рендер контактов на страницу
        contactsList.forEach(item => {
          listItemCreate(item)
        })

      }
    }
  }

  //Создание DOM элемента списка и добавление его на страницу
  const listItemCreate = (item) => {
    const listItem = document.createElement('li')
    listItem.classList.add('collection-item')
    listItem.innerHTML = `
      <div>
        <span>${item.firstName} ${item.lastName}</span>
        <span class="secondary-content">
          <i id="create${item.id}" class="material-icons teal-text text-darken-1">create</i>
          <i id="delete${item.id}"class="material-icons  deep-orange-text text-darken-1">delete</i>
        </span>
      </div>
    `
    list.append(listItem)
  }

  //Первоначальный рендер листа контактов если он есть
  if (contactsList = []) getContactList()

  //Изменение контакта
  list.addEventListener('click', (e) => {
    if (e.target) {
      const target = e.target
      const type = target.id.match(/\w/).join('')
      const targetId = +target.id.match(/\d/g).join('')
      const currentContact = contactsList.find(contact => contact.id === targetId)
      if (type === 'c') {

        const createBlock = document.querySelector('.create-block')
        const changeBlock = document.querySelector('.change-block')

        createBlock.style.display = 'none'
        changeBlock.style.display = 'block'

        const changeForm = document.querySelector('.change-form')
        const changeFirstName = document.querySelector('#changeFirstName')
        const changeLastName = document.querySelector('#changeLastName')

        changeFirstName.value = currentContact.firstName
        changeLastName.value = currentContact.lastName

        changeForm.addEventListener('submit', (e) => {
          e.preventDefault()

          const formDataChange = {
            id: targetId,
            firstName: changeFirstName.value,
            lastName: changeLastName.value
          }

          request.open('PATCH', 'http://localhost:8080/api')
          request.setRequestHeader('Content-Type', 'application/json')
          request.send(JSON.stringify(formDataChange))
          request.onload = () => {
            if (request.status != 200) {
              alert(`Ошибка ${request.status}: ${request.statusText}`)
            } else {
              getContactList()
            }
          }

          firstName.value = ''
          lastName.value = ''

          changeBlock.style.display = 'none'
          createBlock.style.display = 'block'

        })

      //Удаление контакта
      } else if (type === 'd') {

        const data = {
          id: targetId,
          firstName: currentContact.firstName,
          lastName: currentContact.lastName
        }

        request.open('DELETE', 'http://localhost:8080/api')
        request.setRequestHeader('Content-Type', 'application/json')
        request.send(JSON.stringify(data))
        request.onload = () => {
          if (request.status != 200) {
            alert(`Ошибка ${request.status}: ${request.statusText}`)
          } else {
            getContactList()
          }
        }
      }
    }
  })

})
