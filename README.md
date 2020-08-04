**Требуемые пакеты:**
- micro
- nodemon

**Команда установки пакета:**
> npm install <package_name>

**Запуск сервера:**
> node index.js			// Server started on http://localhost:3000
>
> npx nodemon index.js	// Альтернатива при разработке. Для отслеживания изменений

**Запуск туннелера ngrok:**
> ngrok http <port>


*Ближайшее:*
- [X] Добавить к структуре отдельный ключ для голосовых сообщений
- [X] Добавить интересные факты
- [ ] Добавить картинки и музыкальные эффекты к фактам
- [ ] Отслеживать состояние с помощью сессий
- [ ] Воспользоваться instans для ключевых слов

***

###Шпаргалка###

> - Можно вставлять отрывки вопроса в ответ? 
> - Сделать один обработчик ответов на ключевые слова ..Запихнуть в switch параметры у каждого ID
> - Факты реализовать через обращение к файлу с информацие. В сессии проверять просмотренные факты
> и присылать иные

*Ошибки:*
- Если не использовать кнопки, state не сохраняется
- Базовые интенты игнорируют аудио ответ
