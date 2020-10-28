# Frontend дипломного проекта (JavaScript).
## Версия: v.0.0.1 "my first version".
### автор: *Андрей Бородин*, e-mail: _flyer29@bk.ru._
#### ссылка на репозиторий проекта: https://github.com/flyer29/news-explorer-frontend
#### ссылка на проект: https://mynewsapp.tk/
-------------------------------------------------------

Эта часть дипломного проекта создана для закрепления навыков работы с **JavaScript**. Проект представляет
собой веб-приложение, использующее стороннее API для получения контентных данных, и собственное серверное API
для регистрации, авторизации и хранения данных пользователя.
Технологии, использованные в проекте:
+ HTML5;
+ CSS3;
+ Java Script;
+ RegExp;
+ Git;
+ GitHub;
+ NPM;
+ Webpack;
+ Babel.

---------------------------------------------------------

Запуск проекта:
1. Клонируйте репозиторий на свой компьютер:
    * нажать **_Clone_** на странице репозитория;
    * скопировать команду в буфер обмена;
    * открыть терминмал на Вашем компьютере;
    * создать директорию(папку) для проекта;
    * с помощью терминала выполнить команду _'git clone [скопированная ссылка на репозиторий]'_ в
     созданной директории;
2. Если у Вас не установлен Node.js, то скачайте соответствующую вашей операционной системе версию
 по ссылке: https://nodejs.org/ и установите её на свой компьютер.
3. Перейдите с помощью терминала в папку со скачанным репозиторием ( _'cd news-explorer-frontend'_ ) и выполните команду _'npm install'_.
4. Запустите Webpack для сборки проекта в режиме разработки командой _'npm run dev'_, в режиме
 production командой _'npm run start'_.

 В проекте использовано стороннее API **NewsApi**(https://newsapi.org/), которое позволяет получать по запросу с ключевым словом подборку
 новостей за определённый период времени.
 Прилоение позволяет отправлять запросы к стороннему, API, обрабатывать и рендерить на странице информацию от
 API.
 В приложении реализован функционал регистрации нового пользователя и его аутентификация.
 Поиск статей доступен всем пользователям, а сохраненять статьи может только зарегистрированный пользователь.
 Удаление статей возможно как из главной страницы, так и со страницы с сохранёнными статьями.
Приложение всегда доступно по ссылке https://mynewsapp.tk/

Приятного использования! 
